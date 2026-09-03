import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dbService } from '../../../services/db';

export interface LinkItem { id: string; titulo: string; url: string; ativo?: boolean; imagemPath?: string; downloadToken?: string }
export interface RedeItem { tipo: string; url: string }
export interface LinksTema {
  fundoTipo: 'cor' | 'gradiente' | 'imagem';
  fundoCor: string; fundoCor2: string; bgPath?: string; bgToken?: string;
  texto: string; botaoEstilo: 'arredondado' | 'reto' | 'contorno'; botaoCor: string; botaoTexto: string;
}
export interface LinksPage {
  ativo?: boolean; titulo: string; bio: string; avatarPath?: string; avatarToken?: string;
  tema: LinksTema; links: LinkItem[]; redes: RedeItem[];
}

export const TEMA_PADRAO: LinksTema = { fundoTipo: 'gradiente', fundoCor: '#102a1c', fundoCor2: '#1f5130', texto: '#ffffff', botaoEstilo: 'arredondado', botaoCor: '#84cc16', botaoTexto: '#12250f' };
export const PAGE_PADRAO: LinksPage = { ativo: true, titulo: '', bio: '', tema: TEMA_PADRAO, links: [], redes: [] };

const REDES: Record<string, { icon: string }> = {
  instagram: { icon: 'fa-brands fa-instagram' }, whatsapp: { icon: 'fa-brands fa-whatsapp' },
  facebook: { icon: 'fa-brands fa-facebook' }, tiktok: { icon: 'fa-brands fa-tiktok' },
  youtube: { icon: 'fa-brands fa-youtube' }, site: { icon: 'fa-solid fa-globe' }, email: { icon: 'fa-solid fa-envelope' },
};

export const imgUrl = (path?: string, token?: string): string =>
  path && token ? `https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(path)}?alt=media&token=${token}` : '';

export function fundoStyle(t: LinksTema): React.CSSProperties {
  if (t.fundoTipo === 'imagem' && t.bgPath && t.bgToken) return { backgroundImage: `url(${imgUrl(t.bgPath, t.bgToken)})`, backgroundSize: 'cover', backgroundPosition: 'center' };
  if (t.fundoTipo === 'gradiente') return { background: `linear-gradient(160deg, ${t.fundoCor}, ${t.fundoCor2})` };
  return { background: t.fundoCor };
}
export function botaoStyle(t: LinksTema): React.CSSProperties {
  const base: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '15px 18px', fontWeight: 700, textDecoration: 'none', fontSize: '1rem', transition: 'transform .15s', cursor: 'pointer' };
  const radius = t.botaoEstilo === 'reto' ? 8 : 999;
  if (t.botaoEstilo === 'contorno') return { ...base, borderRadius: radius, background: 'transparent', color: t.texto, border: `2px solid ${t.botaoCor}` };
  return { ...base, borderRadius: radius, background: t.botaoCor, color: t.botaoTexto, border: 'none' };
}

// Render puro (reutilizado no preview do editor).
export function LinksView({ page, company }: { page: LinksPage; company?: any }) {
  const t = { ...TEMA_PADRAO, ...(page.tema || {}) };
  const links = (page.links || []).filter((l) => l.ativo !== false && l.titulo && l.url);
  const avatar = imgUrl(page.avatarPath, page.avatarToken) || (company?.logoUrl || '');
  const nome = page.titulo || company?.name || '';
  return (
    <div style={{ minHeight: '100%', ...fundoStyle(t), display: 'flex', justifyContent: 'center', padding: '48px 18px' }}>
      <div style={{ width: '100%', maxWidth: 480, textAlign: 'center', color: t.texto }}>
        {avatar
          ? <img src={avatar} alt="" style={{ width: 92, height: 92, borderRadius: '50%', objectFit: 'cover', margin: '0 auto', border: `3px solid ${t.botaoCor}` }} />
          : <div style={{ width: 92, height: 92, borderRadius: '50%', margin: '0 auto', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}><i className="fa-solid fa-user" /></div>}
        {nome && <h1 style={{ margin: '16px 0 4px', fontSize: '1.4rem' }}>{nome}</h1>}
        {page.bio && <p style={{ margin: '0 0 20px', opacity: 0.85, lineHeight: 1.5 }}>{page.bio}</p>}

        {(page.redes || []).filter((r) => r.url).length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, margin: '0 0 24px', fontSize: '1.5rem' }}>
            {(page.redes || []).filter((r) => r.url).map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noreferrer" style={{ color: t.texto, opacity: 0.9 }}><i className={REDES[r.tipo]?.icon || 'fa-solid fa-link'} /></a>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {links.map((l) => (
            <a key={l.id} href={l.url} target="_blank" rel="noreferrer" style={botaoStyle(t)}>
              {imgUrl(l.imagemPath, l.downloadToken)
                ? <img src={imgUrl(l.imagemPath, l.downloadToken)} alt="" style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                : <span style={{ width: 32, flexShrink: 0 }} />}
              <span style={{ flex: 1, textAlign: 'center' }}>{l.titulo}</span>
              <span style={{ width: 32, flexShrink: 0 }} />
            </a>
          ))}
          {links.length === 0 && <p style={{ opacity: 0.7 }}>Nenhum link ainda.</p>}
        </div>

        <div style={{ marginTop: 40, opacity: 0.5, fontSize: '0.78rem' }}>feito com AutoQui</div>
      </div>
    </div>
  );
}

// Página pública (rota) — resolve a config pelo storeId.
export function LinksPublic({ storeId: storeIdProp }: { storeId?: string } = {}) {
  const params = useParams();
  const storeId = storeIdProp || params.storeId || '';
  const [state, setState] = useState<{ page: LinksPage; company: any } | null | undefined>(undefined);

  useEffect(() => {
    if (!storeId) { setState(null); return; }
    (async () => {
      try {
        const cfgs = (await dbService.getAll('loja_config', { field: 'lojaId', operator: '==', value: storeId })) as any[];
        const cfg = cfgs[0];
        const page: LinksPage | null = cfg?.linksPage || null;
        if (!page || page.ativo === false) { setState(null); return; }
        let company: any = null;
        if (cfg?.empresaId) company = await dbService.get('companies', cfg.empresaId).catch(() => null);
        setState({ page, company });
      } catch { setState(null); }
    })();
  }, [storeId]);

  useEffect(() => { if (state?.page?.titulo) document.title = state.page.titulo; }, [state]);

  if (state === undefined) return <div style={{ minHeight: '100vh', background: '#102a1c' }} />;
  if (!state) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f6f9f2', color: '#16251c' }}>Página não encontrada.</div>;
  return <div style={{ minHeight: '100vh' }}><LinksView page={state.page} company={state.company} /></div>;
}
