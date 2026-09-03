import { useEffect, useState } from 'react';
import { dbService } from '../../../services/db';
import { dataApi } from '../../../services/dataApi';
import { toast } from '../../../services/toast';
import { confirm } from '../../../services/confirm';
import { useAuth } from '../../useAuth';
import { SkeletonTable } from '../../components/Skeleton';
import { uploadImage } from './helpers';

interface Item { id: string; nome: string; preco: number; imagemPath?: string; downloadToken?: string; _file?: File | null; _preview?: string | null }
const itemImg = (it: Item) => it._preview || (it.imagemPath && it.downloadToken ? `https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(it.imagemPath)}?alt=media&token=${it.downloadToken}` : '');
interface Grupo { id?: string; nome: string; min: number; max: number; obrigatorio: boolean; itens: Item[] }

const gid = () => `i_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 5)}`;
const vazio = (): Grupo => ({ nome: '', min: 0, max: 1, obrigatorio: false, itens: [{ id: gid(), nome: '', preco: 0 }] });
const tipoTxt = (g: Grupo) => (g.max === 1 ? 'escolha única' : g.max > 0 ? `até ${g.max}` : 'ilimitado');

export function Complementos() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const [list, setList] = useState<Grupo[] | null>(null);
  const [edit, setEdit] = useState<Grupo | null>(null);

  const load = () => dbService.getAll('complementos', { field: 'empresaId', operator: '==', value: companyId })
    .then((l) => setList((l as any[]).sort((a, b) => (a.nome || '').localeCompare(b.nome || '')))).catch(() => setList([]));
  useEffect(() => { if (companyId) load(); }, [companyId]);

  async function remover(g: Grupo) {
    if (!(await confirm.danger('Excluir complemento', `Excluir "${g.nome}"? Produtos que usam este grupo deixam de mostrá-lo.`))) return;
    try { await dataApi.remove('complementos', g.id!); toast.success('Excluído.'); load(); } catch (e: any) { toast.error('Erro: ' + (e.message || e)); }
  }

  if (list === null) return <SkeletonTable rows={4} />;

  return (
    <div style={{ maxWidth: 820 }}>
      <div className="page-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
        <div><h1>Complementos</h1><p>Crie grupos de opções (adicionais, tamanhos, talheres…) uma vez e reutilize nos produtos.</p></div>
        <button className="btn-primary" onClick={() => setEdit(vazio())}><i className="fa-solid fa-plus" /> Novo complemento</button>
      </div>

      {list.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
          <i className="fa-solid fa-layer-group" style={{ fontSize: '2rem', color: 'var(--primary)', display: 'block', marginBottom: 10 }} />
          Nenhum complemento ainda. Crie o primeiro (ex.: "Adicionais", "Escolha o tamanho").
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 12 }}>
          {list.map((g) => (
            <div key={g.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <strong>{g.nome}</strong>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button className="btn-secondary" style={{ padding: '3px 8px' }} onClick={() => setEdit(g)}><i className="fa-solid fa-pen" /></button>
                  <button className="btn-secondary" style={{ padding: '3px 8px', color: '#ef4444' }} onClick={() => remover(g)}><i className="fa-solid fa-trash" /></button>
                </div>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{g.obrigatorio ? 'Obrigatório' : 'Opcional'} · {tipoTxt(g)} · {(g.itens || []).length} opções</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {(g.itens || []).slice(0, 6).map((it) => <span key={it.id} className="badge" style={{ background: 'var(--surface-hover,#f1f5f9)', color: 'var(--text-muted)', fontSize: '0.72rem' }}>{it.nome}{it.preco > 0 ? ` +${it.preco.toFixed(2)}` : ''}</span>)}
                {(g.itens || []).length > 6 && <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>+{g.itens.length - 6}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {edit && <GrupoModal grupo={edit} companyId={companyId} onClose={() => setEdit(null)} onSaved={() => { setEdit(null); load(); }} />}
    </div>
  );
}

function GrupoModal({ grupo, companyId, onClose, onSaved }: { grupo: Grupo; companyId: string; onClose: () => void; onSaved: () => void }) {
  const [g, setG] = useState<Grupo>({ ...grupo, itens: grupo.itens?.length ? grupo.itens : [{ id: gid(), nome: '', preco: 0 }] });
  const [saving, setSaving] = useState(false);
  const set = (p: Partial<Grupo>) => setG((x) => ({ ...x, ...p }));
  const updItem = (j: number, p: Partial<Item>) => set({ itens: g.itens.map((it, k) => (k === j ? { ...it, ...p } : it)) });
  const addItem = () => set({ itens: [...g.itens, { id: gid(), nome: '', preco: 0 }] });
  const rmItem = (j: number) => set({ itens: g.itens.filter((_, k) => k !== j) });

  const setItemFile = (j: number, file: File) => {
    const r = new FileReader();
    r.onload = (e) => updItem(j, { _file: file, _preview: (e.target?.result as string) || null });
    r.readAsDataURL(file);
  };

  async function salvar() {
    const nome = g.nome.trim();
    if (!nome) { toast.warning('Informe o nome do complemento.'); return; }
    // Sobe as fotos novas das opções antes de salvar.
    const itens: Item[] = [];
    for (const i of g.itens) {
      if (!String(i.nome).trim()) continue;
      let img: any = {};
      if (i._file) img = await uploadImage(i._file, companyId);
      itens.push({ id: i.id || gid(), nome: String(i.nome).trim(), preco: Math.max(0, Number(i.preco) || 0), ...(img.imagemPath ? { imagemPath: img.imagemPath, downloadToken: img.downloadToken } : (i.imagemPath ? { imagemPath: i.imagemPath, downloadToken: i.downloadToken } : {})) });
    }
    if (itens.length === 0) { toast.warning('Adicione ao menos uma opção.'); return; }
    const data = { nome, min: Math.max(0, Number(g.min) || 0), max: Math.max(0, Number(g.max) || 0), obrigatorio: !!g.obrigatorio, itens, empresaId: companyId };
    setSaving(true);
    try {
      if (grupo.id) await dataApi.update('complementos', grupo.id, data);
      else await dataApi.create('complementos', data);
      toast.success('Complemento salvo!'); onSaved();
    } catch (e: any) { toast.error('Erro: ' + (e.message || e)); setSaving(false); }
  }

  const inp: React.CSSProperties = { padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-color,#f8fafc)', color: 'var(--text-main)', fontSize: '0.9rem' };
  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content glass" style={{ maxWidth: 480 }}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h2>{grupo.id ? 'Editar complemento' : 'Novo complemento'}</h2>
        <div className="form-group"><label>Nome do grupo</label><input value={g.nome} onChange={(e) => set({ nome: e.target.value })} placeholder="Ex: Adicionais, Escolha o tamanho, Talheres" /></div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', marginBottom: 10 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.88rem' }}>
            <input type="checkbox" checked={g.obrigatorio} onChange={(e) => set({ obrigatorio: e.target.checked, min: e.target.checked ? Math.max(1, g.min) : 0 })} style={{ width: 'auto' }} /> Obrigatório
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.88rem' }}>mín <input type="number" min="0" value={g.min} onChange={(e) => set({ min: Number(e.target.value) })} style={{ ...inp, width: 60 }} /></label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.88rem' }}>máx <input type="number" min="0" value={g.max} onChange={(e) => set({ max: Number(e.target.value) })} style={{ ...inp, width: 60 }} /></label>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(máx 1 = escolha única · 0 = ilimitado)</span>
        </div>
        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Opções</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '6px 0 12px' }}>
          {g.itens.map((it, j) => (
            <div key={it.id} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <label style={{ width: 38, height: 38, borderRadius: 8, flexShrink: 0, border: '1px dashed var(--border-color)', cursor: 'pointer', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', background: 'var(--bg-color,#f8fafc)' }} title="Foto (opcional)">
                {itemImg(it) ? <img src={itemImg(it)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className="fa-solid fa-camera" style={{ fontSize: '0.8rem' }} />}
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) setItemFile(j, f); e.target.value = ''; }} />
              </label>
              <input value={it.nome} onChange={(e) => updItem(j, { nome: e.target.value })} placeholder="Opção (ex: Granola)" style={{ ...inp, flex: 1 }} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>R$</span>
              <input type="number" min="0" step="0.01" value={it.preco} onChange={(e) => updItem(j, { preco: Number(e.target.value) })} placeholder="0.00" style={{ ...inp, width: 78 }} />
              <button type="button" onClick={() => rmItem(j)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}><i className="fa-solid fa-xmark" /></button>
            </div>
          ))}
          <button type="button" onClick={addItem} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600, padding: 0 }}><i className="fa-solid fa-plus" /> Adicionar opção</button>
        </div>
        <button className="btn-primary full-width" disabled={saving} onClick={salvar}>{saving ? 'Salvando...' : 'Salvar complemento'}</button>
      </div>
    </div>
  );
}
