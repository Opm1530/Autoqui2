// Integração direta com a API do Mercado Pago (sem n8n).
// O access token é por empresa (lido do Firestore, nunca do navegador).

import { getDoc } from './firebase.js';
import { PUBLIC_BASE_URL } from './config.js';

const MP_API = 'https://api.mercadopago.com';

async function tokenOf(companyId: string): Promise<string> {
  const company = await getDoc('companies', companyId);
  const token = company?.mercadoPagoToken || '';
  if (!token) throw new Error('mercadopago_sem_token');
  return token;
}

// Cria a cobrança PIX. external_reference = orderId (a confirmação usa isso).
export async function createPixCharge(
  companyId: string,
  total: number,
  clientName: string,
  orderId: string
): Promise<{ payment_id: string; qr_code_base64: string; qr_code_text: string } | null> {
  const token = await tokenOf(companyId);
  const resp = await fetch(`${MP_API}/v1/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Idempotency-Key': orderId,
    },
    body: JSON.stringify({
      transaction_amount: Number(total.toFixed(2)),
      description: `Pedido ${orderId}`,
      payment_method_id: 'pix',
      external_reference: orderId,
      notification_url: `${PUBLIC_BASE_URL}/api/mp/webhook`,
      payer: {
        email: `pedido-${orderId}@autoqui.com.br`,
        first_name: (clientName || 'Cliente').slice(0, 40),
      },
    }),
  });
  const data = await resp.json().catch(() => null);
  if (!resp.ok || !data) {
    console.error('[mp] erro ao criar cobrança:', resp.status, data);
    throw new Error('mercadopago_erro');
  }
  const tx = data.point_of_interaction?.transaction_data || {};
  return {
    payment_id: String(data.id || ''),
    qr_code_base64: tx.qr_code_base64 || '',
    qr_code_text: tx.qr_code || '',
  };
}

// Consulta o status de um pagamento (usado pelo webhook — fonte da verdade é o MP).
export async function getPayment(companyId: string, paymentId: string): Promise<any | null> {
  const token = await tokenOf(companyId);
  const resp = await fetch(`${MP_API}/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return resp.ok ? await resp.json().catch(() => null) : null;
}

// Estorna (devolve) um pagamento aprovado.
export async function refundPayment(companyId: string, paymentId: string): Promise<boolean> {
  try {
    const token = await tokenOf(companyId);
    const resp = await fetch(`${MP_API}/v1/payments/${paymentId}/refunds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Idempotency-Key': `refund-${paymentId}`,
      },
      body: JSON.stringify({}),
    });
    if (!resp.ok) {
      console.error('[mp] erro ao estornar:', resp.status, await resp.text().catch(() => ''));
      return false;
    }
    return true;
  } catch (err) {
    console.error('[mp] exceção ao estornar:', err);
    return false;
  }
}
