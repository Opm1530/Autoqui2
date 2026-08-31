import { useEffect, useRef, useState } from 'react';
import { dbService } from '../../../services/db';
import { dataApi } from '../../../services/dataApi';
import { toast } from '../../../services/toast';
import { confirm } from '../../../services/confirm';
import { useAuth } from '../../useAuth';
import { SkeletonTable } from '../../components/Skeleton';
import { availableIcons, uploadImage, getCategoryCover } from './helpers';
import type { Category } from './helpers';

export function Categories() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const [cats, setCats] = useState<Category[]>([]);
  const [labelPlural, setLabelPlural] = useState('Produtos');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const [companyDoc, list] = await Promise.all([
        dbService.get('companies', companyId),
        dbService.getAll('categories', { field: 'companyId', operator: '==', value: companyId }).catch(() => []),
      ]);
      const mods = (companyDoc as any)?.modulos_ativos || [];
      setLabelPlural(mods.includes('agendamento') ? 'Serviços' : 'Produtos');
      setCats(list as Category[]);
      setLoading(false);
    })();
  }, [companyId]);

  async function remove(c: Category) {
    if (!(await confirm.warning('Excluir Categoria', `Excluir "${c.name}"? Os ${labelPlural.toLowerCase()} nesta categoria ficarão "Sem Categoria".`))) return;
    try {
      await dataApi.remove('categories', c.id);
      setCats((prev) => prev.filter((x) => x.id !== c.id));
      toast.success('Categoria excluída.');
    } catch { toast.error('Erro ao excluir categoria.'); }
  }

  function onSaved(cat: Category, isNew: boolean) {
    setCats((prev) => (isNew ? [...prev, cat] : prev.map((x) => (x.id === cat.id ? cat : x))));
    setModalOpen(false); setEditing(null);
  }

  if (loading) return <SkeletonTable rows={5} cols={2} />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: '1.75rem' }}>
        <div className="page-heading" style={{ marginBottom: 0 }}><h1>Categorias</h1><p>Organize seus {labelPlural.toLowerCase()} em categorias.</p></div>
        <button className="btn-add" onClick={() => { setEditing(null); setModalOpen(true); }}>
          Nova categoria<span className="btn-add-icon"><i className="fa-solid fa-plus" /></span>
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead><tr><th>Categoria</th><th style={{ width: 120, textAlign: 'right' }}>Ações</th></tr></thead>
            <tbody>
              {cats.length === 0 ? (
                <tr><td colSpan={2} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>Nenhuma categoria criada ainda.</td></tr>
              ) : cats.map((c) => (
                <tr key={c.id} onClick={() => { setEditing(c); setModalOpen(true); }} style={{ cursor: 'pointer' }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {getCategoryCover(c)
                        ? <img src={getCategoryCover(c)!} style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                        : <div style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0, background: 'rgba(132,204,22,0.12)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className={`fa-solid ${c.icon}`} /></div>}
                      <span style={{ fontWeight: 600 }}>{c.name}</span>
                    </div>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="actions" style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <button className="action-btn" title="Editar" onClick={() => { setEditing(c); setModalOpen(true); }}><i className="fa-solid fa-pen" /></button>
                      <button className="action-btn" title="Excluir" onClick={() => remove(c)} style={{ color: 'var(--danger)' }}><i className="fa-solid fa-trash" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <CategoryFormModal companyId={companyId} editing={editing}
          onClose={() => { setModalOpen(false); setEditing(null); }} onSaved={onSaved} />
      )}
    </div>
  );
}

// Modal de criar/editar categoria (nome + capa + ícone).
function CategoryFormModal({ companyId, editing, onClose, onSaved }: {
  companyId: string; editing: Category | null; onClose: () => void; onSaved: (c: Category, isNew: boolean) => void;
}) {
  const isEdit = !!editing;
  const [name, setName] = useState(editing?.name || '');
  const [icon, setIcon] = useState(editing?.icon || 'fa-tag');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(editing ? (getCategoryCover(editing) || null) : null);
  const [saving, setSaving] = useState(false);
  const coverInput = useRef<HTMLInputElement>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const nm = name.trim();
    if (!nm) { toast.warning('Informe o nome da categoria.'); return; }
    setSaving(true);
    try {
      const extra: any = {};
      if (coverFile) { const up = await uploadImage(coverFile, companyId); extra.coverImagemPath = up.imagemPath; extra.coverDownloadToken = up.downloadToken; }
      if (isEdit && editing) {
        await dataApi.update('categories', editing.id, { name: nm, icon, ...extra });
        onSaved({ ...editing, name: nm, icon, ...extra }, false);
        toast.success('Categoria atualizada!');
      } else {
        const { id: newId } = await dataApi.create('categories', { name: nm, icon, ...extra });
        onSaved({ id: newId, name: nm, icon, companyId, ...extra } as Category, true);
        toast.success('Categoria criada!');
      }
    } catch { toast.error('Erro ao salvar categoria.'); setSaving(false); }
  }

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content glass" style={{ maxWidth: 460 }}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 6 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0, background: 'rgba(132,204,22,0.14)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
            <i className="fa-solid fa-tags" />
          </div>
          <div>
            <h2 style={{ margin: 0 }}>{isEdit ? 'Editar categoria' : 'Nova categoria'}</h2>
            <p style={{ margin: '2px 0 0', color: 'var(--text-muted)', fontSize: '0.88rem' }}>Nome, imagem de capa e um ícone.</p>
          </div>
        </div>
        <form onSubmit={submit} style={{ marginTop: 18 }}>
          <div className="form-group">
            <label>Nome da categoria</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Bebidas, Sobremesas…" required />
          </div>
          <div className="form-group">
            <label>Imagem de capa <span style={{ color: 'var(--text-dim)', fontWeight: 400, textTransform: 'none' }}>(opcional)</span></label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: 'var(--surface-hover)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {coverPreview ? <img src={coverPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className="fa-solid fa-image" style={{ color: 'var(--text-dim)' }} />}
              </div>
              <input ref={coverInput} type="file" accept="image/*" style={{ display: 'none' }}
                onChange={(e) => { const f = e.target.files?.[0]; if (f) { setCoverFile(f); setCoverPreview(URL.createObjectURL(f)); } e.target.value = ''; }} />
              <button type="button" className="btn-secondary" onClick={() => coverInput.current?.click()}><i className="fa-solid fa-upload" /> Escolher capa</button>
            </div>
          </div>
          <div className="form-group">
            <label>Ícone</label>
            <div className="icon-picker-grid">
              {availableIcons.map((ic) => (
                <div key={ic} className={'icon-option' + (icon === ic ? ' selected' : '')} onClick={() => setIcon(ic)}>
                  <i className={`fa-solid ${ic}`} />
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="btn-primary full-width" disabled={saving} style={{ marginTop: 6 }}>
            {saving ? 'Salvando…' : isEdit ? 'Salvar alterações' : 'Criar categoria'}
          </button>
        </form>
      </div>
    </div>
  );
}
