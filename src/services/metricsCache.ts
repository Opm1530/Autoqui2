// Cache client-side leve pras métricas de analytics do dashboard (JSON puro).
// Evita reler do backend a cada abertura/troca de página. Por aba (sessionStorage)
// e por usuário logado, com TTL curto.
import { auth } from '../firebase/config';

export const METRICS_TTL = 10 * 60 * 1000; // 10 min

export function cachedMetric<T>(name: string, ttl: number, fn: () => Promise<T>): Promise<T> {
  const uid = auth.currentUser?.uid || 'anon';
  const key = `mcache:${uid}:${name}`;
  try {
    const raw = sessionStorage.getItem(key);
    if (raw) {
      const { at, data } = JSON.parse(raw);
      if (Date.now() - at < ttl) return Promise.resolve(data as T);
    }
  } catch { /* ignore */ }
  return fn().then((data) => {
    try { sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data })); } catch { /* ignore */ }
    return data;
  });
}

// Limpa o cache de métricas (ex.: ao trocar de conta/logout).
export function clearMetricsCache() {
  try {
    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const k = sessionStorage.key(i);
      if (k && k.startsWith('mcache:')) sessionStorage.removeItem(k);
    }
  } catch { /* ignore */ }
}
