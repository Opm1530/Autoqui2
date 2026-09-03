import { useEffect, useMemo, useState } from 'react';
import { dbService } from '../../../services/db';
import { dataApi } from '../../../services/dataApi';
import { toast } from '../../../services/toast';
import { useAuth } from '../../useAuth';
import { SkeletonCards } from '../../components/Skeleton';
import { uploadImage } from '../Products/helpers';
import { LinksView, PAGE_PADRAO, TEMA_PADRAO, type LinksPage, type LinkItem } from './LinksPublic';

const lid = () => `l_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 5)}`;
const CORES = ['#102a1c', '#84cc16', '#0ea5e9', '#a855f7', '#ef4444', '#f59e0b', '#ec4899', '#111827', '#ffffff'];
const REDES_OPC = [
  { tipo: 'instagram', label: 'Instagram' }, { tipo: 'whatsapp', label: 'WhatsApp' }, { tipo: 'facebook', label: 'Facebook' },
  { tipo: 'tiktok', label: 'TikTok' }, { tipo: 'youtube', label: 'YouTube' }, { tipo: 'site', label: 'Site' }, { tipo: 'email', label: 'E-mail' },
];

export function LinksEditor() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const [company, setCompany] = useState<any>(null);
  const [stores, setStores] = useState<any[]>([]);
  const [storeId, setStoreId] = useState('');
  const [cfgId, setCfgId] = useState<string | null>(null);
  const [page, setPage] = useState<LinksPage | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const c = (await dbService.get('companies', companyId).catch(() => null)) as any;
      setCompany(c);
      const st = c?.stores || [];
      setStores(st);
      setStoreId(st[0]?.id || '');
    })();
  }, [companyId]);

  useEffect(() => {
    if (!storeId) return;
    (async () => {
      const cfgs = (await dbService.getAll('loja_config', { field: 'lojaId', operator: '==', value: storeId }).catch(() => [])) as any[];
      const cfg = cfgs[0];
      setCfgId(cfg?.id || null);
      setPage(cfg?.linksPage ? { ...PAGE_PADRAO, ...cfg.linksPage, tema: { ...TEMA_PADRAO, ...(cfg.linksPage.tema || {}) } } : { ...PAGE_PADRAO, tema: { ...TEMA_PADRAO } });
    })();
  }, [storeId]);

  const store = useMemo(() => stores.find((s) => s.id === storeId), [stores, storeId]);
  const shareUrl = store?.subdominio ? `https://${store.subdominio}/links` : `${window.location.origin}/links/${storeId}`;

  const set = (p: Partial<LinksPage>) => setPage((x) => (x ? { ...x, ...p } : x));
  const setTema = (p: Partial<LinksPage['tema']>) => setPage((x) => (x ? { ...x, tema: { ...x.tema, ...p } } : x));
  const setLink = (i: number, p: Partial<LinkItem>) => set({ links: page!.links.map((l, j) => (j === i ? { ...l, ...p } : l)) });
  const addLink = () => set({ links: [...(page!.links || []), { id: lid(), titulo: '', url: '', ativo: true }] });
  const rmLink = (i: number) => set({ links: page!.links.filter((_, j) => j !== i) });
  const moveLink = (i: number, dir: -1 | 1) => { const j = i + dir; if (j < 0 || j >= page!.links.length) return; const arr = [...page!.links]; [arr[i], arr[j]] = [arr[j], arr[i]]; set({ links: arr }); };

  async function uploadAvatar(file: File) { const img = await uploadImage(file, companyId); set({ avatarPath: img.imagemPath, avatarToken: img.downloadToken }); }
  async function uploadBg(file: File) { const img = await uploadImage(file, companyId); setTema({ fundoTipo: 'imagem', bgPath: img.imagemPath, bgToken: img.downloadToken }); }
  async function uploadLinkImg(i: number, file: File) { const img = await uploadImage(file, companyId); setLink(i, { imagemPath: img.imagemPath, downloadToken: img.downloadToken }); }

  async function salvar() {
    if (!page) return;
    setSaving(true);
    try {
      if (cfgId) await dataApi.update('loja_config', cfgId, { linksPage: page });
      else { const { id } = await dataApi.create('loja_config', { lojaId: storeId, linksPage: page }); setCfgId(id); }
      toast.success('Página de links salva!');
    } catch (e: any) { toast.error('Erro ao salvar: ' + (e.message || e)); }
    finally { setSaving(false); }
  }

  if (!page) return <SkeletonCards count={2} lines={4} />;

  const lbl: React.CSSProperties = { display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 5 };
  const inp: React.CSSProperties = { width: '100%', padding: '9px 11px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-color,#f8fafc)', color: 'var(--text-main)', boxSizing: 'border-box' };
  const swatch = (val: string, on: string, click: (c: string) => void) => (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{CORES.map((c) => <button key={c} type="button" onClick={() => click(c)} style={{ width: 26, height: 26, borderRadius: 7, background: c, border: on === c ? '2px solid var(--text-main)' : '2px solid var(--border-color)', cursor: 'pointer' }} />)}<input type="color" value={val} onChange={(e) => click(e.target.value)} style={{ width: 34, height: 26, padding: 0, border: 'none', background: 'none', cursor: 'pointer' }} /></div>
  );

  return (
    <div>
      <div className="page-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
        <div><h1>Página de Links</h1><p>Sua página de links (estilo Linktree) personalizável.</p></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {stores.length > 1 && <select value={storeId} onChange={(e) => setStoreId(e.target.value)} className="form-control">{stores.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>}
          <a href={shareUrl} target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none' }}><i className="fa-solid fa-up-right-from-square" /> Ver página</a>
          <button className="btn-primary" disabled={saving} onClick={salvar}>{saving ? 'Salvando...' : <><i className="fa-solid fa-floppy-disk" /> Salvar</>}</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 20, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Perfil */}
          <div className="card">
            <h4 style={{ marginTop: 0 }}><i className="fa-solid fa-id-badge" style={{ color: 'var(--primary)' }} /> Perfil</h4>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12 }}>
              <label style={{ width: 64, height: 64, borderRadius: '50%', flexShrink: 0, border: '1px dashed var(--border-color)', cursor: 'pointer', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', background: 'var(--bg-color,#f8fafc)' }}>
                {page.avatarPath ? <img src={require0(page)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className="fa-solid fa-camera" />}
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadAvatar(f); e.target.value = ''; }} />
              </label>
              <div style={{ flex: 1 }}>
                <label style={lbl}>Título</label>
                <input value={page.titulo} onChange={(e) => set({ titulo: e.target.value })} placeholder={company?.name || 'Nome / marca'} style={inp} />
              </div>
            </div>
            <label style={lbl}>Bio</label>
            <textarea value={page.bio} onChange={(e) => set({ bio: e.target.value })} rows={2} placeholder="Uma frase sobre você/negócio" style={{ ...inp, resize: 'vertical' }} />
          </div>

          {/* Tema */}
          <div className="card">
            <h4 style={{ marginTop: 0 }}><i className="fa-solid fa-palette" style={{ color: 'var(--primary)' }} /> Aparência</h4>
            <label style={lbl}>Fundo</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
              {(['cor', 'gradiente', 'imagem'] as const).map((f) => (
                <button key={f} type="button" onClick={() => setTema({ fundoTipo: f })} className={page.tema.fundoTipo === f ? 'btn-primary' : 'btn-secondary'} style={{ padding: '5px 12px', fontSize: '0.82rem', textTransform: 'capitalize' }}>{f}</button>
              ))}
              {page.tema.fundoTipo === 'imagem' && <label className="btn-secondary" style={{ padding: '5px 12px', fontSize: '0.82rem', cursor: 'pointer' }}><i className="fa-solid fa-image" /> Enviar<input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadBg(f); e.target.value = ''; }} /></label>}
            </div>
            {page.tema.fundoTipo !== 'imagem' && <div style={{ marginBottom: 10 }}><label style={lbl}>Cor do fundo</label>{swatch(page.tema.fundoCor, page.tema.fundoCor, (c) => setTema({ fundoCor: c }))}</div>}
            {page.tema.fundoTipo === 'gradiente' && <div style={{ marginBottom: 10 }}><label style={lbl}>Cor do fundo (2)</label>{swatch(page.tema.fundoCor2, page.tema.fundoCor2, (c) => setTema({ fundoCor2: c }))}</div>}
            <div style={{ marginBottom: 10 }}><label style={lbl}>Cor do texto</label>{swatch(page.tema.texto, page.tema.texto, (c) => setTema({ texto: c }))}</div>
            <label style={lbl}>Estilo dos botões</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              {(['arredondado', 'reto', 'contorno'] as const).map((b) => (
                <button key={b} type="button" onClick={() => setTema({ botaoEstilo: b })} className={page.tema.botaoEstilo === b ? 'btn-primary' : 'btn-secondary'} style={{ padding: '5px 12px', fontSize: '0.82rem', textTransform: 'capitalize' }}>{b}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div><label style={lbl}>Cor do botão</label>{swatch(page.tema.botaoCor, page.tema.botaoCor, (c) => setTema({ botaoCor: c }))}</div>
              <div><label style={lbl}>Texto do botão</label>{swatch(page.tema.botaoTexto, page.tema.botaoTexto, (c) => setTema({ botaoTexto: c }))}</div>
            </div>
          </div>

          {/* Links */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><h4 style={{ margin: 0 }}><i className="fa-solid fa-link" style={{ color: 'var(--primary)' }} /> Links</h4><button className="btn-secondary" onClick={addLink}><i className="fa-solid fa-plus" /> Adicionar</button></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
              {page.links.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Nenhum link ainda.</p>}
              {page.links.map((l, i) => (
                <div key={l.id} style={{ display: 'flex', gap: 8, alignItems: 'center', background: 'var(--bg-color,#f8fafc)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 8 }}>
                  <label style={{ width: 38, height: 38, borderRadius: 8, flexShrink: 0, border: '1px dashed var(--border-color)', cursor: 'pointer', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }}>
                    {l.imagemPath ? <img src={imgUrlLocal(l.imagemPath, l.downloadToken)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className="fa-solid fa-image" style={{ fontSize: '0.8rem' }} />}
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadLinkImg(i, f); e.target.value = ''; }} />
                  </label>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <input value={l.titulo} onChange={(e) => setLink(i, { titulo: e.target.value })} placeholder="Título (ex: Meu WhatsApp)" style={{ ...inp, padding: '6px 9px' }} />
                    <input value={l.url} onChange={(e) => setLink(i, { url: e.target.value })} placeholder="https://..." style={{ ...inp, padding: '6px 9px', fontSize: '0.85rem' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <button className="btn-secondary" style={{ padding: '2px 7px' }} onClick={() => moveLink(i, -1)} disabled={i === 0}><i className="fa-solid fa-chevron-up" /></button>
                    <button className="btn-secondary" style={{ padding: '2px 7px' }} onClick={() => moveLink(i, 1)} disabled={i === page.links.length - 1}><i className="fa-solid fa-chevron-down" /></button>
                  </div>
                  <button className="btn-secondary" style={{ padding: '4px 8px', color: '#ef4444' }} onClick={() => rmLink(i)}><i className="fa-solid fa-trash" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Redes */}
          <div className="card">
            <h4 style={{ marginTop: 0 }}><i className="fa-solid fa-share-nodes" style={{ color: 'var(--primary)' }} /> Redes sociais</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {REDES_OPC.map((r) => { const cur = (page.redes || []).find((x) => x.tipo === r.tipo)?.url || ''; return (
                <div key={r.tipo}>
                  <label style={{ ...lbl, marginBottom: 3 }}>{r.label}</label>
                  <input value={cur} onChange={(e) => { const outras = (page.redes || []).filter((x) => x.tipo !== r.tipo); set({ redes: e.target.value ? [...outras, { tipo: r.tipo, url: e.target.value }] : outras }); }} placeholder={r.tipo === 'whatsapp' ? 'https://wa.me/55...' : r.tipo === 'email' ? 'mailto:...' : 'https://...'} style={{ ...inp, padding: '7px 9px', fontSize: '0.85rem' }} />
                </div>
              ); })}
            </div>
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Link pra divulgar:</span>
            <strong style={{ wordBreak: 'break-all' }}>{shareUrl}</strong>
            <button className="btn-secondary" style={{ padding: '4px 10px' }} onClick={() => { navigator.clipboard?.writeText(shareUrl).then(() => toast.success('Copiado!')); }}><i className="fa-solid fa-copy" /> Copiar</button>
          </div>
        </div>

        {/* Preview */}
        <div style={{ position: 'sticky', top: 16 }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8, textAlign: 'center' }}>Prévia</div>
          <div style={{ borderRadius: 28, overflow: 'hidden', border: '8px solid #111827', height: 620, boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ height: '100%', overflowY: 'auto' }}><LinksView page={page} company={company} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// helpers locais de URL (evita import circular de LinksPublic.imgUrl no build)
function imgUrlLocal(path?: string, token?: string) { return path && token ? `https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(path)}?alt=media&token=${token}` : ''; }
function require0(page: LinksPage) { return imgUrlLocal(page.avatarPath, page.avatarToken); }
