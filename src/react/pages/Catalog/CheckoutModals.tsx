import { useMemo, useRef, useState } from 'react';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase/config';
import { API_BASE_URL } from '../../../services/api';
import { notifications } from '../../../services/notifications';
import { toast } from '../../../services/toast';
import { confirm } from '../../../services/confirm';
import { isStoreOpen, isFreteAbertoAgora } from './helpers';

type Step = 'delivery' | 'customer' | 'payment' | 'pixManual' | 'mpPix' | 'confirmation';

interface Props {
  cart: Map<string, { product: any; qty: number }>;
  subtotal: number;
  storeId: string;
  companyId: string;
  data: any; // { store, config, design, pixKey, isMpActive, flatBairros, taxaGenerica, cuponsList }
  onClose: () => void;
  onClearCart: () => void;
  onClosedAlert: (type: 'store' | 'delivery') => void;
}

const MODAL_CARD: React.CSSProperties = { background: '#1e293b', borderRadius: 24, width: '92%', maxWidth: 460, padding: 28, maxHeight: '90vh', overflowY: 'auto', boxSizing: 'border-box' };
const inputStyle: React.CSSProperties = { width: '100%', padding: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: 'white', fontSize: '0.95rem', boxSizing: 'border-box' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 };

export function CheckoutModals({ cart, subtotal, storeId, companyId, data, onClose, onClearCart, onClosedAlert }: Props) {
  const { config, pixKey, isMpActive, flatBairros, taxaGenerica, cuponsList } = data;
  // Dados salvos do cliente (preenche o formulário automaticamente)
  const savedUser = useMemo(() => {
    try { return JSON.parse(localStorage.getItem(`cat_user_${companyId}`) || '{}'); } catch { return {}; }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const savedBairroIsKnown = savedUser.bairro && flatBairros.some((b: any) => b.nome.toLowerCase() === String(savedUser.bairro).toLowerCase());

  const [step, setStep] = useState<Step>('delivery');
  const [deliveryType, setDeliveryType] = useState<'entrega' | 'retirada' | ''>('');
  const [name, setName] = useState(savedUser.name || '');
  const [phone, setPhone] = useState(savedUser.phone || '');
  const [address, setAddress] = useState(savedUser.address || '');
  const [complemento, setComplemento] = useState(savedUser.complemento || '');
  const [bairroSel, setBairroSel] = useState(savedUser.bairro ? (savedBairroIsKnown ? flatBairros.find((b: any) => b.nome.toLowerCase() === String(savedUser.bairro).toLowerCase()).nome : '__outro__') : '');
  const [bairroOutro, setBairroOutro] = useState(savedUser.bairro && !savedBairroIsKnown ? savedUser.bairro : '');
  const [coupon, setCoupon] = useState<{ codigo: string; desconto: number; tipo: string } | null>(null);
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [showCoupon, setShowCoupon] = useState(false);
  const [showDeliveryPay, setShowDeliveryPay] = useState(false);
  const [subMethod, setSubMethod] = useState<'dinheiro' | 'cartao' | null>(null);
  const [troco, setTroco] = useState('');
  const [busy, setBusy] = useState('');
  const [orderId, setOrderId] = useState('');
  const [mpData, setMpData] = useState<any>(null);
  const [comprovanteFile, setComprovanteFile] = useState<File | null>(null);
  const [comprovantePreview, setComprovantePreview] = useState<string | null>(null);
  const comprovanteRef = useRef<HTMLInputElement>(null);

  const store = data.store;
  const permitirEntrega = isFreteAbertoAgora(config, store);

  // Bairro/taxa resolvidos
  const resolvedBairro = useMemo(() => {
    if (deliveryType !== 'entrega') return { nome: '', preco: 0 };
    if (flatBairros.length === 0) return { nome: '', preco: 0 };
    if (bairroSel === '__outro__') return { nome: bairroOutro.trim(), preco: taxaGenerica };
    const found = flatBairros.find((b: any) => b.nome === bairroSel);
    return { nome: bairroSel, preco: found ? found.preco : taxaGenerica };
  }, [deliveryType, bairroSel, bairroOutro, flatBairros, taxaGenerica]);

  // Endereço final = endereço + complemento (campo separado força o cliente a lembrar).
  const fullAddress = complemento.trim() ? `${address.trim()}, ${complemento.trim()}` : address.trim();

  const taxa = deliveryType === 'retirada' ? 0 : resolvedBairro.preco;
  const desconto = !coupon ? 0 : coupon.tipo === 'percent' ? subtotal * coupon.desconto / 100 : coupon.desconto;
  const total = subtotal + taxa - desconto;

  const buildCartPayload = () => Array.from(cart.entries()).map(([id, { qty, product }]) =>
    product.isCombo ? { id: id.replace(/^combo_/, ''), qty, isCombo: true } : { id, qty });

  async function postOrder(paymentMethod: string, extra: any = {}) {
    const resp = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        storeId, cart: buildCartPayload(), deliveryType, bairro: resolvedBairro.nome,
        couponCode: coupon?.codigo || null,
        customer: { name, phone, address: fullAddress, bairro: resolvedBairro.nome },
        paymentMethod, ...extra,
      }),
    });
    const d = await resp.json().catch(() => ({}));
    if (!resp.ok) throw new Error(d.error || 'erro_ao_criar_pedido');
    return d as { orderId: string; total: number; mpData?: any };
  }

  function OrderSummary() {
    return (
      <>
        {Array.from(cart.values()).map(({ product, qty }, i) => {
          const price = product.promotionalActive ? (product.promotionalPrice || product.price) : product.price;
          return <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', padding: '4px 0' }}><span>{qty}x {product.name}</span><span>R$ {(price * qty).toFixed(2)}</span></div>;
        })}
        {taxa > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '4px 0', color: '#94a3b8' }}><span><i className="fa-solid fa-truck" style={{ marginRight: 4 }} />{resolvedBairro.nome ? `Entrega (${resolvedBairro.nome})` : 'Taxa de Entrega'}</span><span>+ R$ {taxa.toFixed(2)}</span></div>}
        {desconto > 0 && coupon && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '4px 0', color: '#10b981' }}><span><i className="fa-solid fa-tag" style={{ marginRight: 4 }} />Cupom {coupon.codigo}</span><span>- R$ {desconto.toFixed(2)}</span></div>}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 8, paddingTop: 8 }}><span>Total</span><span style={{ color: 'var(--primary-cat)' }}>R$ {total.toFixed(2)}</span></div>
      </>
    );
  }

  async function goToPayment() {
    if (deliveryType === 'entrega' && flatBairros.length > 0) {
      if (!bairroSel) { toast.warning('Selecione seu bairro para entrega.'); return; }
      if (bairroSel === '__outro__' && !bairroOutro.trim()) { toast.warning('Digite o nome do seu bairro.'); return; }
    }
    if (!name.trim() || !phone.trim()) { toast.warning('Preencha nome e telefone.'); return; }
    let cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length === 13 && cleanPhone.startsWith('55')) cleanPhone = cleanPhone.substring(2);
    if (cleanPhone.length !== 11) { notifications.showPhoneError(); return; }
    if (deliveryType === 'entrega' && !address.trim()) { toast.warning('Preencha o endereço de entrega completo.'); return; }
    // Reforço: endereço sem número costuma ser endereço incompleto.
    if (deliveryType === 'entrega' && !/\d/.test(address) && !/s\/?n/i.test(address)) {
      const ok = await confirm.show({
        title: 'Endereço sem número?',
        message: 'Seu endereço parece estar <strong>sem número</strong>. Endereço incompleto pode impedir a entrega. Deseja continuar mesmo assim?',
        confirmText: 'Continuar assim',
        cancelText: 'Corrigir',
        type: 'warning',
      });
      if (!ok) return;
    }
    try { localStorage.setItem(`cat_user_${companyId}`, JSON.stringify({ name, phone, address, complemento, bairro: resolvedBairro.nome })); } catch { /* ignore */ }
    setStep('payment');
  }

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    const found = cuponsList.find((c: any) => c.codigo === code && c.ativo !== false);
    if (!found) { setCouponMsg({ text: 'Cupom inválido ou expirado.', ok: false }); return; }
    if (found.valorMinimo > 0 && subtotal < found.valorMinimo) { setCouponMsg({ text: `Gasto mínimo de R$ ${found.valorMinimo.toFixed(2)} necessário.`, ok: false }); return; }
    setCoupon(found);
    const d = found.tipo === 'percent' ? subtotal * found.desconto / 100 : found.desconto;
    setCouponMsg({ text: `✓ Cupom aplicado! Desconto: R$ ${d.toFixed(2)}`, ok: true });
  }

  // Revalida loja/entrega em tempo real antes de criar o pedido
  function guardOpen(): boolean {
    if (!isStoreOpen(config, store)) { onClosedAlert('store'); return false; }
    if (deliveryType === 'entrega' && !isFreteAbertoAgora(config, store)) { onClosedAlert('delivery'); return false; }
    return true;
  }

  async function payDelivery() {
    if (!guardOpen()) return;
    setBusy('delivery');
    try {
      const { orderId } = await postOrder('na_entrega', { paymentSubMethod: subMethod, troco: subMethod === 'dinheiro' && troco ? parseFloat(troco) : null });
      setOrderId(orderId); onClearCart(); setStep('confirmation');
    } catch (err: any) { toast.error('Erro ao processar pedido: ' + (err.message || 'Erro desconhecido') + '. Tente novamente ou fale com a loja.'); }
    finally { setBusy(''); }
  }

  async function payPixManual() {
    if (!guardOpen()) return;
    setBusy('pixManual');
    try {
      const { orderId } = await postOrder('pix_manual');
      setOrderId(orderId); onClearCart(); setStep('pixManual');
    } catch (err: any) { toast.error('Erro ao gerar pedido PIX: ' + (err.message || 'Erro de conexão') + '. Tente novamente.'); }
    finally { setBusy(''); }
  }

  async function confirmPixManual() {
    setBusy('confirmPix');
    try {
      if (comprovanteFile) {
        const path = `comprovantes/${companyId}/${Date.now()}_${comprovanteFile.name}`;
        const r = storageRef(storage, path);
        await uploadBytes(r, comprovanteFile);
        const url = await getDownloadURL(r);
        await fetch(`${API_BASE_URL}/api/orders/comprovante`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderId, comprovanteUrl: url }) });
      }
      setStep('confirmation');
    } catch (err: any) { toast.error('Erro ao enviar comprovante: ' + (err.message || 'Erro de conexão') + '. Tente novamente.'); }
    finally { setBusy(''); }
  }

  async function payPixMp() {
    if (!guardOpen()) return;
    setBusy('mp');
    try {
      const res = await postOrder('pix_mercadopago');
      setOrderId(res.orderId); onClearCart();
      if (res.mpData?.qr_code_base64 || res.mpData?.qr_code_text) { setMpData(res.mpData); setStep('mpPix'); }
      else setStep('confirmation');
    } catch (err: any) { toast.error('Erro ao gerar PIX Mercado Pago: ' + (err.message || 'Erro de resposta') + '. Tente novamente.'); }
    finally { setBusy(''); }
  }

  const isMandatoryPickupPay = config?.pagamentoObrigatorioRetirada === true;
  const isDeliveryPayDisabled = config?.desativarPagamentoEntrega === true;
  const showPayDelivery = !(deliveryType === 'retirada' && isMandatoryPickupPay) && !(deliveryType === 'entrega' && isDeliveryPayDisabled);

  const backdrop = (children: React.ReactNode, align: 'center' | 'flex-start' = 'flex-start') => (
    <div className="cat-modal-base" style={{ alignItems: align }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>{children}</div>
  );
  const Header = ({ title, onX }: { title: React.ReactNode; onX: () => void }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
      <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>{title}</h3>
      <button onClick={onX} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer' }}><i className="fa-solid fa-xmark" /></button>
    </div>
  );

  // ── DELIVERY ──
  if (step === 'delivery') return backdrop(
    <div style={MODAL_CARD}>
      <Header title={<><i className="fa-solid fa-box" /> Como deseja receber?</>} onX={onClose} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
        <div className="delivery-card" onClick={() => { if (permitirEntrega !== false && flatBairros.length > 0) setDeliveryType('entrega'); }}
          style={{ padding: 18, borderRadius: 16, border: `2px solid ${deliveryType === 'entrega' ? 'var(--primary-cat)' : 'rgba(255,255,255,0.1)'}`, background: deliveryType === 'entrega' ? 'rgba(99,102,241,0.08)' : 'transparent', cursor: permitirEntrega !== false && flatBairros.length > 0 ? 'pointer' : 'not-allowed', opacity: permitirEntrega !== false && flatBairros.length > 0 ? 1 : 0.5, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><i className="fa-solid fa-truck" style={{ fontSize: '1.3rem', color: 'var(--primary-cat)' }} /></div>
          <div><p style={{ margin: 0, fontWeight: 700 }}>Entrega</p><p style={{ margin: '4px 0 0', color: permitirEntrega !== false && flatBairros.length > 0 ? '#94a3b8' : '#ef4444', fontSize: '0.85rem' }}>{permitirEntrega !== false && flatBairros.length > 0 ? 'Receber no endereço informado' : 'Entrega indisponível no momento'}</p></div>
        </div>
        <div className="delivery-card" onClick={() => setDeliveryType('retirada')}
          style={{ padding: 18, borderRadius: 16, border: `2px solid ${deliveryType === 'retirada' ? 'var(--primary-cat)' : 'rgba(255,255,255,0.1)'}`, background: deliveryType === 'retirada' ? 'rgba(99,102,241,0.08)' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><i className="fa-solid fa-store" style={{ fontSize: '1.3rem', color: 'var(--primary-cat)' }} /></div>
          <div><p style={{ margin: 0, fontWeight: 700 }}>Retirada na Loja</p><p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>Buscar pessoalmente no estabelecimento</p></div>
        </div>
      </div>
      <button disabled={!deliveryType} onClick={() => { if (deliveryType === 'entrega' && !permitirEntrega) { onClosedAlert('delivery'); return; } setStep('customer'); }}
        style={{ width: '100%', padding: 14, borderRadius: 14, background: 'var(--primary-cat)', color: 'white', border: 'none', cursor: deliveryType ? 'pointer' : 'not-allowed', fontWeight: 700, fontSize: '1rem', opacity: deliveryType ? 1 : 0.4 }}><i className="fa-solid fa-arrow-right" /> Continuar</button>
    </div>
  );

  // ── CUSTOMER ──
  if (step === 'customer') return backdrop(
    <div style={MODAL_CARD}>
      <Header title={<><i className="fa-solid fa-user" /> Seus Dados</>} onX={onClose} />
      <div style={{ marginBottom: 16 }}><label style={labelStyle}>Nome Completo</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" style={inputStyle} /></div>
      <div style={{ marginBottom: 16 }}><label style={labelStyle}>WhatsApp</label><input value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))} placeholder="DDD + 9 dígitos" maxLength={11} style={inputStyle} /></div>
      {deliveryType === 'entrega' && (
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Endereço</label>
          <div style={{ padding: '10px 12px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 10, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="fa-solid fa-location-dot" style={{ color: '#fbbf24', fontSize: '0.9rem', flexShrink: 0 }} />
            <span style={{ color: '#fbbf24', fontSize: '0.82rem', lineHeight: 1.4 }}>Confira com atenção: rua e <strong>número</strong>. Endereço errado atrasa ou impede a entrega.</span>
          </div>
          <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Ex: Rua das Flores, 123" style={{ ...inputStyle, marginBottom: 12 }} />
          <label style={labelStyle}>Complemento <span style={{ fontWeight: 400, textTransform: 'none' }}>(apartamento? informe o número!)</span></label>
          <input value={complemento} onChange={(e) => setComplemento(e.target.value)} placeholder="Ex: Apto 42, Bloco B / casa dos fundos / próximo ao mercado" style={{ ...inputStyle, marginBottom: 12 }} />
          {flatBairros.length > 0 && <>
            <label style={labelStyle}>Bairro</label>
            <div style={{ padding: '10px 12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="fa-solid fa-triangle-exclamation" style={{ color: '#ef4444', fontSize: '0.9rem', flexShrink: 0 }} />
              <span style={{ color: '#ef4444', fontSize: '0.82rem', lineHeight: 1.4 }}>Selecione o bairro <strong>correto</strong> do seu endereço. A taxa será cobrada conforme o bairro informado.</span>
            </div>
            <select value={bairroSel} onChange={(e) => setBairroSel(e.target.value)} style={{ ...inputStyle, background: '#1e293b', cursor: 'pointer' }}>
              <option value="">Selecione seu bairro...</option>
              {flatBairros.map((b: any) => <option key={b.nome} value={b.nome}>{b.nome}</option>)}
              <option value="__outro__">Outro Bairro</option>
            </select>
            {bairroSel === '__outro__' && <input value={bairroOutro} onChange={(e) => setBairroOutro(e.target.value)} placeholder="Digite o nome do seu bairro..." style={{ ...inputStyle, marginTop: 10 }} />}
          </>}
        </div>
      )}
      <button onClick={goToPayment} style={{ width: '100%', padding: 14, borderRadius: 14, background: 'var(--primary-cat)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', marginTop: 8 }}>Escolher Pagamento →</button>
    </div>
  );

  // ── PAYMENT ──
  if (step === 'payment') return backdrop(
    <div style={MODAL_CARD}>
      <Header title={<><i className="fa-solid fa-credit-card" /> Forma de Pagamento</>} onX={onClose} />
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 14, marginBottom: 14, fontSize: '0.9rem' }}><OrderSummary /></div>

      {/* Confirmação do endereço antes de pagar */}
      {deliveryType === 'entrega' && (
        <div style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 12, padding: '12px 14px', marginBottom: 14, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <i className="fa-solid fa-location-dot" style={{ color: 'var(--primary-cat)', marginTop: 3, flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 2 }}>Entregar em</div>
            <div style={{ fontSize: '0.88rem', lineHeight: 1.45, wordBreak: 'break-word' }}>{fullAddress}{resolvedBairro.nome ? ` — ${resolvedBairro.nome}` : ''}</div>
          </div>
          <button onClick={() => setStep('customer')} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: 8, padding: '6px 12px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>
            <i className="fa-solid fa-pen" /> Corrigir
          </button>
        </div>
      )}

      {deliveryType === 'retirada' && isMandatoryPickupPay && <div style={{ padding: 12, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 12, marginBottom: 14, color: '#fbbf24', fontSize: '0.85rem', lineHeight: 1.4 }}><i className="fa-solid fa-circle-info" /> Atenção: para pedidos de retirada é obrigatório o pagamento adiantado pois o produto será reservado.</div>}

      {cuponsList.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <button onClick={() => setShowCoupon((s) => !s)} style={{ background: 'none', border: 'none', color: 'var(--primary-cat)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', padding: '4px 0', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}><i className="fa-solid fa-tag" /> {showCoupon ? 'Ocultar cupom' : 'Tenho um cupom de desconto'}</button>
          {showCoupon && <div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="Código do cupom" style={{ ...inputStyle, textTransform: 'uppercase' }} />
              <button onClick={applyCoupon} style={{ padding: '10px 16px', background: 'rgba(99,102,241,0.2)', color: 'var(--primary-cat)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 10, cursor: 'pointer', fontWeight: 700, whiteSpace: 'nowrap' }}><i className="fa-solid fa-check" /> Aplicar</button>
            </div>
            {couponMsg && <p style={{ fontSize: '0.8rem', margin: '4px 0 0', color: couponMsg.ok ? '#10b981' : '#ef4444' }}>{couponMsg.text}</p>}
          </div>}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {showPayDelivery && (
          <>
            <button onClick={() => setShowDeliveryPay((s) => !s)} style={{ padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12 }}><i className="fa-solid fa-handshake" style={{ fontSize: '1.2rem' }} /> <span>Pagar na Entrega / Retirada</span></button>
            {showDeliveryPay && (
              <div style={{ marginTop: -4, padding: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Escolha como pagar:</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn-sub-method" onClick={() => setSubMethod('dinheiro')} style={{ background: subMethod === 'dinheiro' ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)', borderColor: subMethod === 'dinheiro' ? 'var(--primary-cat)' : 'rgba(255,255,255,0.1)' }}><i className="fa-solid fa-money-bill-1" style={{ marginRight: 6 }} /> Dinheiro</button>
                  <button className="btn-sub-method" onClick={() => setSubMethod('cartao')} style={{ background: subMethod === 'cartao' ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)', borderColor: subMethod === 'cartao' ? 'var(--primary-cat)' : 'rgba(255,255,255,0.1)' }}><i className="fa-solid fa-credit-card" style={{ marginRight: 6 }} /> Cartão</button>
                </div>
                {subMethod === 'dinheiro' && <div style={{ padding: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: 8, fontWeight: 600 }}>Precisa de troco para quanto?</label><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ color: '#94a3b8', fontWeight: 700 }}>R$</span><input type="number" value={troco} onChange={(e) => setTroco(e.target.value)} placeholder="Ex: 50,00" style={{ ...inputStyle, fontWeight: 700 }} /></div></div>}
                <button disabled={!subMethod || !!busy} onClick={payDelivery} style={{ opacity: subMethod ? 1 : 0.5, padding: 14, borderRadius: 12, background: 'var(--primary-cat)', color: 'white', border: 'none', cursor: subMethod ? 'pointer' : 'not-allowed', fontWeight: 800, fontSize: '1rem' }}>{busy === 'delivery' ? <><i className="fa-solid fa-spinner fa-spin" /> Processando...</> : <><i className="fa-solid fa-check" style={{ marginRight: 8 }} /> Confirmar Pedido</>}</button>
              </div>
            )}
          </>
        )}
        {pixKey && <button disabled={!!busy} onClick={payPixManual} style={{ padding: 16, borderRadius: 14, background: 'rgba(16,185,129,0.08)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12 }}>{busy === 'pixManual' ? <><i className="fa-solid fa-spinner fa-spin" /> Gerando...</> : <><i className="fa-brands fa-pix" style={{ fontSize: '1.2rem' }} /> <span>PIX Manual</span></>}</button>}
        {isMpActive && <button disabled={!!busy} onClick={payPixMp} style={{ padding: 16, borderRadius: 14, background: '#009ee3', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12 }}>{busy === 'mp' ? <><i className="fa-solid fa-spinner fa-spin" /> Gerando PIX...</> : <><i className="fa-solid fa-credit-card" style={{ fontSize: '1.2rem' }} /> <span>Pagar via Mercado Pago (PIX)</span></>}</button>}
      </div>
    </div>
  );

  // ── PIX MANUAL ──
  if (step === 'pixManual') return backdrop(
    <div style={MODAL_CARD}>
      <Header title={<><i className="fa-brands fa-pix" /> Pagamento via PIX</>} onX={onClose} />
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 14, marginBottom: 16, fontSize: '0.9rem' }}><OrderSummary /></div>
      <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 14, padding: 16, marginBottom: 16 }}>
        <p style={{ margin: '0 0 6px', fontWeight: 700, fontSize: '0.9rem', color: '#10b981' }}><i className="fa-brands fa-pix" /> Chave PIX:</p>
        <p style={{ margin: '0 0 12px', fontFamily: 'monospace', fontSize: '1rem', color: 'white', wordBreak: 'break-all' }}>{pixKey}</p>
        <CopyBtn text={pixKey} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}><i className="fa-solid fa-receipt" /> Comprovante de Pagamento <span style={{ fontWeight: 400 }}>(opcional)</span></label>
        <div onClick={() => comprovanteRef.current?.click()} style={{ border: '2px dashed rgba(255,255,255,0.15)', borderRadius: 12, padding: 18, textAlign: 'center', cursor: 'pointer' }}>
          <input ref={comprovanteRef} type="file" accept="image/*,application/pdf" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) { setComprovanteFile(f); const r = new FileReader(); r.onload = (ev) => setComprovantePreview(ev.target?.result as string); r.readAsDataURL(f); } }} />
          {comprovantePreview && <img src={comprovantePreview} style={{ maxWidth: '100%', maxHeight: 140, borderRadius: 8, display: 'block', margin: '0 auto 8px' }} />}
          <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: '1.5rem', color: 'var(--primary-cat)', display: 'block', marginBottom: 6 }} />
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>{comprovanteFile ? comprovanteFile.name : 'Clique para anexar o comprovante'}</p>
        </div>
      </div>
      <button disabled={!!busy} onClick={confirmPixManual} style={{ width: '100%', padding: 14, borderRadius: 14, background: 'var(--primary-cat)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1rem' }}>{busy === 'confirmPix' ? <><i className="fa-solid fa-spinner fa-spin" /> Enviando...</> : <><i className="fa-solid fa-check" /> Enviar Comprovante</>}</button>
    </div>
  );

  // ── MERCADO PAGO PIX ──
  if (step === 'mpPix') return backdrop(
    <div style={MODAL_CARD}>
      <Header title={<><i className="fa-solid fa-qrcode" /> PIX — Mercado Pago</>} onX={onClose} />
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 14, marginBottom: 16, fontSize: '0.9rem' }}><OrderSummary /></div>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        {mpData?.qr_code_base64 && <img src={`data:image/png;base64,${mpData.qr_code_base64}`} style={{ width: 180, height: 180, borderRadius: 12, background: 'white', padding: 8, display: 'block', margin: '0 auto 12px' }} />}
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: 12 }}>Ou copie o código abaixo:</p>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: 12, marginBottom: 10 }}><p style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.75rem', color: '#94a3b8', wordBreak: 'break-all', maxHeight: 80, overflowY: 'auto' }}>{mpData?.qr_code_text}</p></div>
        <CopyBtn text={mpData?.qr_code_text || ''} label="Copiar código" />
      </div>
      <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem' }}>Após o pagamento, seu pedido será processado automaticamente.</p>
    </div>
  );

  // ── CONFIRMATION ──
  if (step === 'confirmation') return backdrop(
    <div style={{ ...MODAL_CARD, textAlign: 'center' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><i className="fa-solid fa-circle-check" style={{ fontSize: '2.5rem', color: '#10b981' }} /></div>
      <h2 style={{ margin: '0 0 10px', fontSize: '1.4rem', fontWeight: 800 }}>Pedido Confirmado!</h2>
      <p style={{ color: '#94a3b8', marginBottom: 20 }}>Seu pedido foi recebido com sucesso.</p>
      <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 12, padding: 16, marginBottom: 20 }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Número do Pedido</span>
        <p style={{ margin: '6px 0 0', fontSize: '1.5rem', fontWeight: 800, letterSpacing: 3, color: 'var(--primary-cat)' }}>#{orderId.slice(0, 8).toUpperCase()}</p>
      </div>
      <button onClick={onClose} style={{ width: '100%', padding: 14, borderRadius: 14, background: 'var(--primary-cat)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Continuar Comprando</button>
    </div>
  );

  return null;
}

function CopyBtn({ text, label = 'Copiar' }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return <button onClick={() => navigator.clipboard.writeText(text).then(() => { setDone(true); setTimeout(() => setDone(false), 2000); })} style={{ padding: '8px 16px', borderRadius: 8, background: 'rgba(16,185,129,0.2)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}>{done ? '✓ Copiado!' : label}</button>;
}
