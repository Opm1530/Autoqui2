// Criação de pedido do catálogo — SERVER-SIDE.
// O navegador manda só o carrinho e as escolhas; o servidor recalcula preços,
// taxa e cupom lendo o Firestore (fonte da verdade), valida/baixa estoque,
// cria o pedido e dispara a notificação. O cliente não controla os valores.

import { getAll, getDoc, db } from './firebase.js';
import { notifyNewOrder } from './notify.js';

type CartLine = { id: string; qty: number; isCombo?: boolean };

export interface CreateOrderInput {
  storeId: string;
  cart: CartLine[];
  deliveryType: 'entrega' | 'retirada';
  bairro?: string;
  couponCode?: string | null;
  customer: { name: string; phone: string; address?: string; bairro?: string };
  paymentMethod: 'na_entrega' | 'pix_manual' | 'pix_mercadopago';
  paymentSubMethod?: string | null;
  troco?: number | null;
}

// Cria a cobrança PIX DIRETO na API do Mercado Pago (sem n8n) — com o total do
// SERVIDOR e o token lido do Firestore (não vem mais do navegador).
// Retorna { payment_id, qr_code_base64, qr_code_text }.
async function createMercadoPagoCharge(
  companyId: string,
  _storeId: string,
  _items: any[],
  total: number,
  clientName: string,
  orderRef: string
): Promise<{ payment_id: string; qr_code_base64: string; qr_code_text: string } | null> {
  const company = await getDoc('companies', companyId);
  const accessToken = company?.mercadoPagoToken || '';
  if (!accessToken) throw new Error('mercadopago_sem_token');

  const resp = await fetch('https://api.mercadopago.com/v1/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Idempotency-Key': orderRef,
    },
    body: JSON.stringify({
      transaction_amount: Number(total.toFixed(2)),
      description: `Pedido ${orderRef}`,
      payment_method_id: 'pix',
      external_reference: orderRef,
      payer: {
        email: `pedido-${orderRef}@autoqui.com.br`,
        first_name: (clientName || 'Cliente').slice(0, 40),
      },
    }),
  });

  const data = await resp.json().catch(() => null);
  if (!resp.ok || !data) {
    console.error('[mercadopago] erro ao criar cobrança:', resp.status, data);
    throw new Error('mercadopago_erro');
  }

  const tx = data.point_of_interaction?.transaction_data || {};
  return {
    payment_id: String(data.id || ''),
    qr_code_base64: tx.qr_code_base64 || '',
    qr_code_text: tx.qr_code || '',
  };
}

function num(v: any, def = 0): number {
  const n = parseFloat(v);
  return isNaN(n) ? def : n;
}

// Baixa de estoque agregada (combo + avulso podem abater o mesmo produto).
async function deductStock(deductions: { productId: string; qty: number }[]) {
  const byProduct = new Map<string, number>();
  for (const d of deductions) byProduct.set(d.productId, (byProduct.get(d.productId) || 0) + d.qty);
  for (const [productId, qty] of byProduct) {
    const snap = await db.collection('products').doc(productId).get();
    const stock = snap.exists ? (snap.data() as any).stock : null;
    if (stock != null) {
      await db.collection('products').doc(productId).update({ stock: Math.max(0, stock - qty) });
    }
  }
}

async function findOrCreateLead(
  companyId: string,
  storeId: string,
  name: string,
  phone: string
): Promise<string> {
  let cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length === 13 && cleanPhone.startsWith('55')) cleanPhone = cleanPhone.substring(2);

  let leads = await getAll('leads', [
    { field: 'empresaId', operator: '==', value: companyId },
    { field: 'whatsapp', operator: '==', value: cleanPhone },
  ]);
  if (leads.length === 0) {
    leads = await getAll('leads', [
      { field: 'empresaId', operator: '==', value: companyId },
      { field: 'whatsapp', operator: '==', value: '55' + cleanPhone },
    ]);
  }
  let existing = leads[0];
  if (!existing) {
    const byPhone = await getAll('leads', [
      { field: 'empresaId', operator: '==', value: companyId },
      { field: 'telefone', operator: '==', value: cleanPhone },
    ]);
    existing = byPhone[0];
  }
  if (existing) {
    if (existing.statusLead !== 'cliente_ativo') {
      await db.collection('leads').doc(existing.id).update({ statusLead: 'cliente_ativo' });
    }
    return existing.id;
  }
  const ref = await db.collection('leads').add({
    nome: name,
    telefone: cleanPhone,
    whatsapp: cleanPhone,
    empresaId: companyId,
    lojaId: storeId,
    origem: 'catalogo',
    statusLead: 'cliente_ativo',
    criadoEm: new Date().toISOString(),
  });
  return ref.id;
}

export async function createCatalogOrder(
  input: CreateOrderInput
): Promise<{ orderId: string; total: number; mpData?: any }> {
  const { storeId } = input;

  // 1. Resolve config + companyId a partir da loja (não confia no cliente).
  const configs = await getAll('loja_config', { field: 'lojaId', operator: '==', value: storeId });
  const config = configs[0];
  if (!config) throw new Error('loja_nao_encontrada');
  const companyId = config.empresaId;

  // 2. Carrega produtos e combos da empresa.
  const [products, combos] = await Promise.all([
    getAll('products', { field: 'companyId', operator: '==', value: companyId }),
    getAll('combos', { field: 'empresaId', operator: '==', value: companyId }),
  ]);
  const productById = new Map(products.map((p: any) => [p.id, p]));
  const comboById = new Map(combos.map((c: any) => [c.id, c]));

  // 3. Monta itens com PREÇO DO SERVIDOR e valida estoque.
  const items: any[] = [];
  const deductions: { productId: string; qty: number }[] = [];
  let subtotal = 0;

  if (!Array.isArray(input.cart) || input.cart.length === 0) throw new Error('carrinho_vazio');

  for (const line of input.cart) {
    const qty = Math.max(1, parseInt(String(line.qty)) || 1);

    if (line.isCombo) {
      const combo: any = comboById.get(line.id);
      if (!combo || combo.ativo === false) throw new Error('combo_indisponivel');
      const price = num(combo.preco);
      subtotal += price * qty;
      items.push({
        productId: `combo_${combo.id}`,
        name: combo.nome,
        qty,
        price,
        subtotal: price * qty,
        isCombo: true,
        itensCombo: (combo.produtos || []).map((p: any) => p.name).join(' + '),
      });
      for (const cp of combo.produtos || []) {
        const prod: any = productById.get(cp.id);
        if (prod && prod.stock != null) {
          if (prod.stock < qty) throw new Error(`sem_estoque:${prod.name}`);
          deductions.push({ productId: prod.id, qty });
        }
      }
    } else {
      const prod: any = productById.get(line.id);
      if (!prod || prod.active === false) throw new Error('produto_indisponivel');
      if (prod.stock != null && prod.stock < qty) throw new Error(`sem_estoque:${prod.name}`);
      const price = prod.promotionalActive ? num(prod.promotionalPrice, num(prod.price)) : num(prod.price);
      subtotal += price * qty;
      items.push({ productId: prod.id, name: prod.name, qty, price, subtotal: price * qty });
      if (prod.stock != null) deductions.push({ productId: prod.id, qty });
    }
  }

  // 4. Taxa de entrega (server-side).
  let taxaAplicada = 0;
  let taxaNome = 'Retirada';
  if (input.deliveryType !== 'retirada') {
    const taxaGenerica = num(config.taxaGenerica);
    const flat: { nome: string; preco: number }[] = [];
    for (const b of config.bairrosEntrega || []) {
      const nomes = String(b.bairros || '').split(',').map((s) => s.trim()).filter(Boolean);
      for (const n of nomes) flat.push({ nome: n, preco: num(b.preco) });
    }
    const bairro = (input.bairro || input.customer?.bairro || '').trim();
    const match = flat.find((x) => x.nome.toLowerCase() === bairro.toLowerCase());
    taxaAplicada = match ? match.preco : taxaGenerica;
    taxaNome = bairro ? `Entrega (${bairro})` : 'Taxa de Entrega';
  }

  // 5. Cupom (valida ativo + valor mínimo, server-side).
  let desconto = 0;
  let codigoCupom: string | null = null;
  if (input.couponCode) {
    const code = String(input.couponCode).trim().toUpperCase();
    const found: any = (config.cupons || []).find((c: any) => c.codigo === code && c.ativo !== false);
    if (found && !(num(found.valorMinimo) > 0 && subtotal < num(found.valorMinimo))) {
      desconto = found.tipo === 'percent' ? (subtotal * num(found.desconto)) / 100 : num(found.desconto);
      codigoCupom = found.codigo;
    }
  }

  // 6. Total autoritativo do servidor.
  const total = Math.max(0, subtotal + taxaAplicada - desconto);

  // 7. Baixa estoque e resolve lead.
  await deductStock(deductions);
  const leadId = await findOrCreateLead(companyId, storeId, input.customer.name, input.customer.phone);

  // 8. Cria o pedido com os valores do servidor.
  const pagamento = input.paymentMethod === 'na_entrega' ? 'na_entrega' : 'pagamento_no_pix';
  const orderData: any = {
    lojaId: storeId,
    storeId,
    companyId,
    empresaId: companyId,
    clientName: input.customer.name,
    clientPhone: input.customer.phone,
    endereco: input.customer.address || '',
    bairro: input.customer.bairro || input.bairro || '',
    entrega: input.deliveryType,
    leadId,
    nome: input.customer.name,
    items,
    total,
    taxaAplicada,
    taxaNome,
    desconto,
    codigoCupom,
    paymentMethod: input.paymentMethod,
    pagamento,
    status: 'em_montagem',
    source: 'catalog',
    criadoEm: new Date().toISOString(),
  };
  if (input.paymentMethod === 'na_entrega') {
    orderData.paymentSubMethod = input.paymentSubMethod || null;
    orderData.troco = input.troco != null ? num(input.troco) : null;
  }

  const ref = await db.collection('pedidos').add(orderData);
  const orderId = ref.id;

  // 9. Mercado Pago: cria a cobrança DIRETO na API do MP (external_reference = orderId,
  //    pra a confirmação do pagamento achar o pedido depois). Atualiza o pedido com o payment_id.
  let mpData: any = null;
  if (input.paymentMethod === 'pix_mercadopago') {
    try {
      mpData = await createMercadoPagoCharge(companyId, storeId, items, total, input.customer.name, orderId);
      if (mpData?.payment_id) {
        await db.collection('pedidos').doc(orderId).update({ mpPaymentId: mpData.payment_id });
      }
    } catch (err) {
      console.error('[orders] cobrança MP falhou:', err);
    }
  }

  // 10. Notificação (respeita o template configurado).
  try {
    await notifyNewOrder(orderId);
  } catch (err) {
    console.error('[orders] notify falhou:', err);
  }

  return { orderId, total, mpData };
}
