import { useEffect, useMemo, useRef, useState } from 'react';
import { dbService } from '../../../services/db';
import { dataApi } from '../../../services/dataApi';
import { toast } from '../../../services/toast';
import { confirm } from '../../../services/confirm';
import { useAuth } from '../../useAuth';
import { SkeletonTable } from '../../components/Skeleton';
import { uploadImage, getComboImageUrl } from './helpers';
import type { Combo, Product } from './helpers';

export function Combos() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const [stores, setStores] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const [companyDoc, prods, cbs] = await Promise.all([
        dbService.get('companies', companyId),
        dbService.getAll('products', { field: 'companyId', operator: '==', value: companyId }).catch(() => []),
        dbService.getAll('combos', { field: 'empresaId', operator: '==', value: companyId }).catch(() => []),
      ]);
      setStores((companyDoc as any)?.stores || []);
      setProducts(prods as Product[]);
      setCombos(cbs as Combo[]);
      setLoading(false);
    })();
  }, [companyId]);

  async function toggleAtivo(c: Combo) {
    try {
      await dataApi.update('combos', c.id, { ativo: c.ativo === false });
      setCombos((prev) => prev.map((x) => (x.id === c.id ? { ...x, ativo: c.ativo === false } : x)));
    } catch (e: any) { toast.error('Erro: ' + e.message); }
  }

  async function remove(c: Combo) {
    if (!(await confirm.show({ title: 'Excluir Combo', message: `Excluir "${c.nome}"?`, type: 'danger', confirmText: 'Excluir' }))) return;
    try {
      await dataApi.remove('combos', c.id);
      setCombos((prev) => prev.filter((x) => x.id !== c.id));
      toast.success('Combo excluído.');
    } catch (e: any) { toast.error('Erro: ' + e.message); }
  }

  if (loading) return <SkeletonTable rows={5} cols={4} />;

  return (
    <div>
      <div className="page-heading"><h1>Combos</h1><p>Kits de produtos com preço especial.</p></div>
      <div className="page-header" style={{ justifyContent: 'flex-end' }}>
        <button className="btn-add" onClick={() => setModalOpen(true)}>
          Novo combo<span className="btn-add-icon"><i className="fa-solid fa-plus" /></span>
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead><tr><th>Combo</th><th>Preço</th><th>Status</th><th style={{ width: 80, textAlign: 'right' }}>Ações</th></tr></thead>
            <tbody>
              {combos.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>Nenhum combo cadastrado ainda.</td></tr>
              ) : combos.map((c) => {
                const img = getComboImageUrl(c);
                const ativo = c.ativo !== false;
                return (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 42, height: 42, borderRadius: 8, flexShrink: 0, overflow: 'hidden', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {img ? <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className="fa-solid fa-layer-group" style={{ color: '#f59e0b' }} />}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 600 }}>{c.nome}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 280 }}>{(c.produtos || []).map((p) => p.name).join(' + ')}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>R$ {(c.preco || 0).toFixed(2)}</td>
                    <td>
                      <button className={`badge ${ativo ? 'success' : 'danger'}`} style={{ cursor: 'pointer', border: 'none' }} onClick={() => toggleAtivo(c)}>
                        {ativo ? 'Ativo' : 'Inativo'}
                      </button>
                    </td>
                    <td>
                      <div className="actions" style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        <button className="action-btn" title="Excluir" onClick={() => remove(c)} style={{ color: 'var(--danger)' }}><i className="fa-solid fa-trash" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <ComboFormModal companyId={companyId} storeId={stores[0]?.id || ''} products={products}
          onClose={() => setModalOpen(false)} onCreated={(c) => { setCombos((prev) => [...prev, c]); setModalOpen(false); }} />
      )}
    </div>
  );
}

// Modal de criar combo (loja única automática).
function ComboFormModal({ companyId, storeId, products, onClose, onCreated }: {
  companyId: string; storeId: string; products: Product[]; onClose: () => void; onCreated: (c: Combo) => void;
}) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const ativos = useMemo(() => products.filter((p) => {
    if (p.active === false) return false;
    if (!storeId) return true;
    const ids = p.storeIds || (p.storeId ? [p.storeId] : []);
    return ids.length === 0 || ids.includes(storeId);
  }), [products, storeId]);

  const toggle = (id: string) => setSelectedIds((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  async function save() {
    const nm = nome.trim();
    const pr = parseFloat(preco || '0');
    if (!nm) { toast.warning('Informe o nome do combo.'); return; }
    if (isNaN(pr) || pr <= 0) { toast.warning('Informe um preço válido.'); return; }
    if (selectedIds.size < 2) { toast.warning('Selecione ao menos 2 produtos.'); return; }
    const produtos = ativos.filter((p) => selectedIds.has(p.id)).map((p) => ({ id: p.id, name: p.name, price: p.price || 0 }));
    setSaving(true);
    try {
      let imagemPath = '', downloadToken = '';
      if (file) { const img = await uploadImage(file, companyId); imagemPath = img.imagemPath; downloadToken = img.downloadToken; }
      const { id: newId } = await dataApi.create('combos', { nome: nm, preco: pr, lojaId: storeId, produtos, imagemPath, downloadToken, ativo: true });
      onCreated({ id: newId, nome: nm, preco: pr, lojaId: storeId, empresaId: companyId, produtos, imagemPath, downloadToken, ativo: true } as Combo);
      toast.success('Combo criado com sucesso!');
    } catch (e: any) {
      toast.error('Erro ao criar combo: ' + (e.message || ''));
      setSaving(false);
    }
  }

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content glass" style={{ maxWidth: 480 }}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 6 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0, background: 'rgba(245,158,11,0.14)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
            <i className="fa-solid fa-layer-group" />
          </div>
          <div>
            <h2 style={{ margin: 0 }}>Novo combo</h2>
            <p style={{ margin: '2px 0 0', color: 'var(--text-muted)', fontSize: '0.88rem' }}>Junte 2 ou mais produtos com um preço especial.</p>
          </div>
        </div>

        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label>Nome do combo</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Combo Família" />
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label>Foto do combo <span style={{ color: 'var(--text-dim)', fontWeight: 400, textTransform: 'none' }}>(opcional)</span></label>
            <div onClick={() => fileRef.current?.click()} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0.6rem 0.8rem', background: 'var(--surface-hover)', border: '1px dashed var(--border-color)', borderRadius: 8, cursor: 'pointer' }}>
              <div style={{ width: 46, height: 46, borderRadius: 8, background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                {preview ? <img src={preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className="fa-solid fa-image" style={{ color: '#f59e0b' }} />}
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{file ? file.name : 'Clique para anexar uma imagem'}</span>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
                onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); const r = new FileReader(); r.onload = (ev) => setPreview((ev.target?.result as string) || null); r.readAsDataURL(f); } }} />
            </div>
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label>Preço do combo (R$)</label>
            <input type="number" min="0" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="0,00" />
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label>Produtos do combo <span style={{ color: 'var(--text-dim)', fontWeight: 400, textTransform: 'none' }}>(2 ou mais)</span></label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 200, overflowY: 'auto', background: 'var(--surface-hover)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 8 }}>
              {ativos.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', padding: '1rem 0', margin: 0 }}>Nenhum produto ativo.</p>
              ) : ativos.map((p) => (
                <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '6px 8px', borderRadius: 6 }}>
                  <input type="checkbox" checked={selectedIds.has(p.id)} onChange={() => toggle(p.id)} style={{ width: 16, height: 16, accentColor: 'var(--primary)' }} />
                  <span style={{ flex: 1, fontSize: '0.87rem' }}>{p.name}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>R$ {(p.price || 0).toFixed(2)}</span>
                </label>
              ))}
            </div>
          </div>
          <button onClick={save} disabled={saving} className="btn-primary full-width">
            {saving ? 'Salvando…' : 'Criar combo'}
          </button>
        </div>
      </div>
    </div>
  );
}
