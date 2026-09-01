// Coleta leve de métricas da vitrine (fire-and-forget).
import { API_BASE_URL } from '../../../services/api';

function visitorId(): string {
  try {
    let v = localStorage.getItem('vt_vid');
    if (!v) { v = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('vt_vid', v); }
    return v;
  } catch { return 'anon'; }
}

// Marca se é a 1ª visita do visitante hoje (para contar visitantes únicos).
function firstToday(): boolean {
  try {
    const key = 'vt_seen_' + new Date().toISOString().slice(0, 10);
    if (localStorage.getItem(key)) return false;
    localStorage.setItem(key, '1');
    return true;
  } catch { return false; }
}

export function trackVitrine(tipo: 'view' | 'produto' | 'whatsapp' | 'cart_add' | 'checkout' | 'pay_start', empresaId: string, lojaId: string, produtoId?: string) {
  if (!empresaId) return;
  try {
    const body: any = { empresaId, lojaId, tipo, visitorId: visitorId() };
    if (tipo === 'view') body.firstToday = firstToday();
    if (produtoId) body.produtoId = produtoId;
    fetch(`${API_BASE_URL}/api/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
    }).catch(() => {});
  } catch { /* ignore */ }
}
