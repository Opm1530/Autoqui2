import { useMemo, useRef, useState } from 'react';
import { dataApi } from '../../../services/dataApi';
import { toast } from '../../../services/toast';
import { confirm } from '../../../services/confirm';
import { uploadImage, getComboImageUrl } from './helpers';
import type { Combo, Product } from './helpers';

interface Props {
  companyId: string;
  stores: any[];
  products: Product[];
  combos: Combo[];
  onChange: (combos: Combo[]) => void;
  onClose?: () => void;
  asPage?: boolean;
}

export function CombosModal({ companyId, stores, products, combos, onChange, onClose, asPage = false }: Props) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [lojaId, setLojaId] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const lojaProducts = useMemo(() => {
    if (!lojaId) return [];
    return products.filter((p) => {
      if (p.active === false) return false;
      const ids = p.storeIds || (p.storeId ? [p.storeId] : []);
      return ids.includes(lojaId);
    });
  }, [lojaId, products]);

  const toggleProduct = (id: string) => setSelectedIds((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const onFile = (f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview((e.target?.result as string) || null);
    reader.readAsDataURL(f);
  };

  async function save() {
    const nm = nome.trim();
    const pr = parseFloat(preco || '0');
    if (!nm) { toast.error('Informe o nome do combo.'); return; }
    if (!lojaId) { toast.error('Selecione uma loja.'); return; }
    if (isNaN(pr) || pr <= 0) { toast.error('Informe um preço válido.'); return; }
    if (selectedIds.size < 2) { toast.error('Selecione ao menos 2 produtos.'); return; }

    const produtos = lojaProducts.filter((p) => selectedIds.has(p.id)).map((p) => ({ id: p.id, name: p.name, price: p.price || 0 }));

    setSaving(true);
    try {
      let imagemPath = '', downloadToken = '';
      if (file) { const img = await uploadImage(file, companyId); imagemPath = img.imagemPath; downloadToken = img.downloadToken; }

      const { id: newId } = await dataApi.create('combos', { nome: nm, preco: pr, lojaId, produtos, imagemPath, downloadToken, ativo: true });
      onChange([...combos, { id: newId, nome: nm, preco: pr, lojaId, empresaId: companyId, produtos, imagemPath, downloadToken, ativo: true }]);
      setNome(''); setPreco(''); setLojaId(''); setSelectedIds(new Set()); setFile(null); setPreview(null);
      toast.success('Combo criado com sucesso!');
    } catch (e: any) {
      toast.error('Erro ao criar combo: ' + (e.message || ''));
    } finally { setSaving(false); }
  }

  async function toggleAtivo(c: Combo) {
    try {
      await dataApi.update('combos', c.id, { ativo: c.ativo === false });
      onChange(combos.map((x) => (x.id === c.id ? { ...x, ativo: c.ativo === false } : x)));
    } catch (e: any) { toast.error('Erro: ' + e.message); }
  }

  async function remove(c: Combo) {
    const ok = await confirm.show({ title: 'Excluir Combo', message: 'Tem certeza que deseja excluir este combo?', type: 'danger', confirmText: 'Excluir' });
    if (!ok) return;
    try {
      await dataApi.remove('combos', c.id);
      onChange(combos.filter((x) => x.id !== c.id));
      toast.success('Combo excluído.');
    } catch (e: any) { toast.error('Erro: ' + e.message); }
  }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.6rem 0.8rem', background: 'var(--surface-hover)', border: '1px solid var(--border-color)', borderRadius: 8, color: 'var(--text-main)', fontSize: '0.9rem', boxSizing: 'border-box' };
  const lblStyle: React.CSSProperties = { fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 4 };

  const body = (
    <>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <label style={lblStyle}>Nome do Combo *</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Combo Família" style={inputStyle} />
          </div>
          <div>
            <label style={lblStyle}>Loja *</label>
            <select value={lojaId} onChange={(e) => { setLojaId(e.target.value); setSelectedIds(new Set()); }} style={inputStyle}>
              <option value="">Selecione uma loja</option>
              {stores.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label style={lblStyle}>Foto do Combo</label>
            <div onClick={() => fileRef.current?.click()} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0.6rem 0.8rem', background: 'var(--surface-hover)', border: '1px dashed var(--border-color)', borderRadius: 8, cursor: 'pointer' }}>
              <div style={{ width: 48, height: 48, borderRadius: 8, background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                {preview ? <img src={preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className="fa-solid fa-image" style={{ color: '#f59e0b' }} />}
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{file ? file.name : 'Clique para anexar uma imagem'}</span>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => { if (e.target.files?.[0]) onFile(e.target.files[0]); }} />
            </div>
          </div>
          <div>
            <label style={lblStyle}>Preço do Combo (R$) *</label>
            <input type="number" min="0" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="0,00" style={inputStyle} />
          </div>
          <div>
            <label style={lblStyle}>Produtos do Combo *</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 200, overflowY: 'auto', background: 'var(--surface-hover)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 8 }}>
              {!lojaId ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', padding: '1rem 0', margin: 0 }}>Selecione uma loja para ver os produtos.</p>
              ) : lojaProducts.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', padding: '1rem 0', margin: 0 }}>Nenhum produto ativo nesta loja.</p>
              ) : lojaProducts.map((p) => (
                <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '6px 8px', borderRadius: 6 }}>
                  <input type="checkbox" checked={selectedIds.has(p.id)} onChange={() => toggleProduct(p.id)} style={{ width: 16, height: 16, accentColor: 'var(--primary)' }} />
                  <span style={{ flex: 1, fontSize: '0.87rem' }}>{p.name}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>R$ {(p.price || 0).toFixed(2)}</span>
                </label>
              ))}
            </div>
          </div>
          <button onClick={save} disabled={saving} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            {saving ? <><i className="fa-solid fa-spinner fa-spin" /> Salvando...</> : <><i className="fa-solid fa-plus" /> Criar Combo</>}
          </button>
        </div>

        <div style={{ padding: '1.25rem 1.5rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 0.75rem' }}>Combos Cadastrados</p>
          {combos.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem', padding: '1.5rem 0' }}>Nenhum combo cadastrado ainda.</p>
          ) : combos.map((c) => {
            const imgUrl = getComboImageUrl(c);
            const ativo = c.ativo !== false;
            return (
              <div key={c.id} style={{ background: 'var(--surface-hover)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '0.85rem 1rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 8, flexShrink: 0, overflow: 'hidden', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {imgUrl ? <img src={imgUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className="fa-solid fa-layer-group" style={{ color: '#f59e0b' }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: 2 }}>{c.nome}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{(c.produtos || []).map((p) => p.name).join(' + ')}</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10b981', marginTop: 4 }}>R$ {(c.preco || 0).toFixed(2)}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <button onClick={() => toggleAtivo(c)} style={{ background: ativo ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)', color: ativo ? '#34d399' : '#f87171', border: `1px solid ${ativo ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: 6, padding: '4px 10px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>{ativo ? 'Ativo' : 'Inativo'}</button>
                  <button onClick={() => remove(c)} style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6, padding: '4px 8px', fontSize: '0.75rem', cursor: 'pointer' }}><i className="fa-solid fa-trash" /></button>
                </div>
              </div>
            );
          })}
        </div>
    </>
  );

  if (asPage) {
    return (
      <div>
        <div className="page-heading"><h1>Combos</h1><p>Crie kits de produtos com preço especial.</p></div>
        <div className="card" style={{ padding: 0, overflow: 'hidden', maxWidth: 620 }}>{body}</div>
      </div>
    );
  }

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
      <div className="modal-content glass" style={{ maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', padding: 0 }}>
        <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}><i className="fa-solid fa-layer-group" style={{ color: '#f59e0b', marginRight: 8 }} />Combos</h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>Crie kits de produtos com preço especial</p>
          </div>
          <span className="close-modal" onClick={onClose}>&times;</span>
        </div>
        {body}
      </div>
    </div>
  );
}
