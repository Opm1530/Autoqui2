import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { resolveTrackedLinkPublic } from '../../../services/linkTrackerApi';

// 1º clique do visitante hoje neste código? (contagem de cliques únicos)
function firstClickToday(code: string): boolean {
  try {
    const key = `rl_${code}_${new Date().toISOString().slice(0, 10)}`;
    if (localStorage.getItem(key)) return false;
    localStorage.setItem(key, '1');
    return true;
  } catch { return false; }
}

// Anexa ?fonte=CODIGO ao destino pra propagar a origem (catálogo/links leem isso).
function comFonte(destino: string, codigo: string): string {
  try {
    const u = new URL(destino, window.location.origin);
    u.searchParams.set('fonte', codigo);
    return u.toString();
  } catch { return destino; }
}

// Rota pública: autoqui.com.br/r/CODIGO → conta o clique e redireciona.
export function RedirectLink() {
  const { code = '' } = useParams();
  const [erro, setErro] = useState(false);

  useEffect(() => {
    if (!code) { setErro(true); return; }
    (async () => {
      const r = await resolveTrackedLinkPublic(code, firstClickToday(code));
      if (!r) { setErro(true); return; }
      window.location.replace(comFonte(r.destino, r.codigo));
    })();
  }, [code]);

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#102a1c', color: '#fff', flexDirection: 'column', gap: 14, fontFamily: 'system-ui, sans-serif' }}>
      {erro ? (
        <>
          <i className="fa-solid fa-link-slash" style={{ fontSize: '2rem', opacity: 0.7 }} />
          <p>Link não encontrado ou desativado.</p>
          <a href="https://autoqui.com.br" style={{ color: '#a3e635' }}>Ir para autoqui.com.br</a>
        </>
      ) : (
        <>
          <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '1.6rem' }} />
          <p style={{ opacity: 0.8 }}>Redirecionando…</p>
        </>
      )}
    </div>
  );
}
