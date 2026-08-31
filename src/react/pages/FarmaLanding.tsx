import { useEffect, useRef, useState } from 'react';
import { API_BASE_URL } from '../../services/api';

function lpFirstToday(): boolean {
  try {
    const key = 'lp_seen_' + new Date().toISOString().slice(0, 10);
    if (localStorage.getItem(key)) return false;
    localStorage.setItem(key, '1');
    return true;
  } catch { return false; }
}
function lpTrack(tipo: 'lp_view' | 'lp_cta', companyId?: string) {
  if (!companyId) return;
  try {
    const body: any = { empresaId: companyId, tipo };
    if (tipo === 'lp_view') body.firstToday = lpFirstToday();
    fetch(`${API_BASE_URL}/api/track`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), keepalive: true }).catch(() => {});
  } catch { /* ignore */ }
}

// Página pública de landing (FarmaQui). Renderizada por host/subdomínio ou preview.
export function FarmaLanding({ companyId, data: dataProp }: { companyId?: string; data?: any }) {
  const [l, setL] = useState<any>(dataProp || null);
  const [loading, setLoading] = useState(!dataProp);
  const tracked = useRef(false);

  useEffect(() => {
    if (dataProp || !companyId) return;
    fetch(`${API_BASE_URL}/api/farmaqui/public-landing?companyId=${encodeURIComponent(companyId)}`)
      .then((r) => r.json()).then((d) => { setL(d && d.titulo ? d : null); setLoading(false); })
      .catch(() => setLoading(false));
  }, [companyId, dataProp]);

  // Métrica de visita (só na página pública real, não no preview do painel).
  useEffect(() => {
    if (dataProp || !companyId || !l?.titulo || tracked.current) return;
    tracked.current = true;
    lpTrack('lp_view', companyId);
  }, [l, companyId, dataProp]);

  if (loading) return null;
  if (!l || !l.titulo) return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: '#666', fontFamily: 'system-ui' }}>Página não encontrada.</div>;

  const cor = l.corPrimaria || '#84cc16';
  const zap = String(l.whatsapp || '').replace(/\D/g, '');
  const waLink = zap ? `https://wa.me/${zap.length <= 11 ? '55' + zap : zap}?text=${encodeURIComponent(l.mensagemWhatsapp || '')}` : '#';

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', background: '#fff', color: '#1a2e35' }}>
      <header style={{ background: `linear-gradient(135deg, ${cor} 0%, ${shade(cor, -20)} 100%)`, color: '#fff', padding: '56px 20px 64px', textAlign: 'center' }}>
        {l.logoUrl && <img src={l.logoUrl} alt="" style={{ maxHeight: 72, marginBottom: 20, borderRadius: 12 }} />}
        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', margin: '0 0 14px', fontWeight: 800, lineHeight: 1.15 }}>{l.titulo}</h1>
        <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', margin: '0 auto', maxWidth: 620, opacity: 0.95 }}>{l.subtitulo}</p>
        {zap && <a href={waLink} onClick={() => lpTrack('lp_cta', companyId)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 30, background: '#fff', color: cor, fontWeight: 700, padding: '15px 32px', borderRadius: 999, textDecoration: 'none', fontSize: '1.05rem', boxShadow: '0 8px 24px rgba(0,0,0,0.18)' }}>💬 {l.ctaTexto || 'Chamar no WhatsApp'}</a>}
      </header>

      {Array.isArray(l.destaques) && l.destaques.length > 0 && (
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '48px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {l.destaques.filter((d: any) => d.texto).map((d: any, i: number) => (
            <div key={i} style={{ background: '#f7fafa', border: '1px solid #e6efef', borderRadius: 16, padding: '28px 22px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', marginBottom: 10 }}>{d.icone || '✅'}</div>
              <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{d.texto}</div>
            </div>
          ))}
        </section>
      )}

      <section style={{ textAlign: 'center', padding: '20px 20px 60px' }}>
        {l.endereco && <p style={{ color: '#5a6b70', margin: '0 0 24px' }}>📍 {l.endereco}</p>}
        {zap && <a href={waLink} onClick={() => lpTrack('lp_cta', companyId)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: cor, color: '#fff', fontWeight: 700, padding: '15px 32px', borderRadius: 999, textDecoration: 'none', fontSize: '1.05rem' }}>💬 {l.ctaTexto || 'Chamar no WhatsApp'}</a>}
      </section>

      <footer style={{ textAlign: 'center', padding: '24px', color: '#9aa8ab', fontSize: '0.8rem', borderTop: '1px solid #eef2f2' }}>Feito com AutoQui</footer>
    </div>
  );
}

// Escurece/clareia uma cor hex por um percentual.
function shade(hex: string, pct: number): string {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  const adj = (v: number) => Math.max(0, Math.min(255, Math.round(v + (v * pct) / 100)));
  const [r, g, b] = [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)].map(adj);
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}
