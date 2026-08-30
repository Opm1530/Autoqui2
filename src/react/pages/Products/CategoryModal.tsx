import { useRef, useState } from 'react';
import { dataApi } from '../../../services/dataApi';
import { toast } from '../../../services/toast';
import { confirm } from '../../../services/confirm';
import { availableIcons, uploadImage, getCategoryCover } from './helpers';
import type { Category } from './helpers';

interface Props {
  companyId: string;
  labelPlural: string;
  categories: Category[];
  onChange: (cats: Category[]) => void;
  onClose: () => void;
}

export function CategoryModal({ companyId, labelPlural, categories, onChange, onClose }: Props) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('fa-tag');
  const [editing, setEditing] = useState<{ id: string; name: string } | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const coverInput = useRef<HTMLInputElement>(null);
  const editCoverInput = useRef<HTMLInputElement>(null);
  const editCoverId = useRef<string>('');

  async function create(e: React.FormEvent) {
    e.preventDefault();
    const nm = name.trim();
    if (!nm) return;
    try {
      const extra: any = {};
      if (coverFile) { const up = await uploadImage(coverFile, companyId); extra.coverImagemPath = up.imagemPath; extra.coverDownloadToken = up.downloadToken; }
      const { id: newId } = await dataApi.create('categories', { name: nm, icon, ...extra });
      onChange([...categories, { id: newId, name: nm, icon, companyId, ...extra }]);
      setName(''); setCoverFile(null); setCoverPreview(null);
      toast.success('Categoria criada com sucesso!');
    } catch { toast.error('Erro ao criar categoria.'); }
  }

  // Troca/define a capa de uma categoria existente.
  async function changeCover(file: File) {
    const id = editCoverId.current;
    if (!id) return;
    try {
      const up = await uploadImage(file, companyId);
      await dataApi.update('categories', id, { coverImagemPath: up.imagemPath, coverDownloadToken: up.downloadToken });
      onChange(categories.map((c) => (c.id === id ? { ...c, coverImagemPath: up.imagemPath, coverDownloadToken: up.downloadToken } : c)));
      toast.success('Capa da categoria atualizada!');
    } catch { toast.error('Erro ao enviar a capa.'); }
  }

  async function remove(id: string) {
    if (await confirm.warning('Excluir Categoria', 'Tem certeza? Produtos nesta categoria ficarão "Sem Categoria".')) {
      try {
        await dataApi.remove('categories', id);
        onChange(categories.filter((c) => c.id !== id));
        toast.success('Categoria excluída.');
      } catch { toast.error('Erro ao excluir categoria.'); }
    }
  }

  async function saveName() {
    if (!editing) return;
    const nm = editing.name.trim();
    if (!nm) return;
    try {
      await dataApi.update('categories', editing.id, { name: nm });
      onChange(categories.map((c) => (c.id === editing.id ? { ...c, name: nm } : c)));
      setEditing(null);
      toast.success('Nome atualizado!');
    } catch { toast.error('Erro ao atualizar nome.'); }
  }

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content glass" style={{ maxWidth: 820, width: '94vw' }}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h2>Gerenciar Categorias</h2>
        <p className="text-muted">Crie categorias para organizar seus {labelPlural.toLowerCase()}.</p>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start', marginTop: 20 }}>
          {/* Coluna esquerda: formulário */}
          <form style={{ flex: '1 1 320px', minWidth: 0 }} onSubmit={create}>
            <div className="form-group">
              <label>Nome da Categoria</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Bebidas, Sobremesas..." required />
            </div>
            <div className="form-group">
              <label>Imagem de capa <span style={{ color: 'var(--text-dim)', fontWeight: 400, textTransform: 'none' }}>(usada no carrossel da vitrine)</span></label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: 'var(--bg-color)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {coverPreview ? <img src={coverPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className="fa-solid fa-image" style={{ color: 'var(--text-dim)' }} />}
                </div>
                <input ref={coverInput} type="file" accept="image/*" style={{ display: 'none' }}
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) { setCoverFile(f); setCoverPreview(URL.createObjectURL(f)); } e.target.value = ''; }} />
                <button type="button" className="btn-secondary" onClick={() => coverInput.current?.click()}><i className="fa-solid fa-upload" /> Escolher capa</button>
              </div>
            </div>
            <div className="form-group">
              <label>Ícone (Selecione um)</label>
              <div className="icon-picker-grid">
                {availableIcons.map((ic) => (
                  <div key={ic} className={'icon-option' + (icon === ic ? ' selected' : '')} onClick={() => setIcon(ic)}>
                    <i className={`fa-solid ${ic}`} />
                  </div>
                ))}
              </div>
            </div>
            <input ref={editCoverInput} type="file" accept="image/*" style={{ display: 'none' }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) changeCover(f); e.target.value = ''; }} />
            <button type="submit" className="btn-primary full-width">Salvar Categoria</button>
          </form>

          {/* Coluna direita: categorias existentes */}
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>Categorias existentes</div>
            <div style={{ maxHeight: 340, overflowY: 'auto', paddingRight: 5 }}>
              {categories.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-dim)' }}>Nenhuma categoria criada.</p>
              ) : categories.map((c) => (
            <div key={c.id} className="category-item">
              {editing?.id === c.id ? (
                <input autoFocus value={editing.name} onChange={(e) => setEditing({ id: c.id, name: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') setEditing(null); }}
                  style={{ flex: 1, background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'white', padding: '6px 10px', borderRadius: 6 }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {getCategoryCover(c)
                    ? <img src={getCategoryCover(c)!} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                    : <i className={`fa-solid ${c.icon}`} style={{ color: 'var(--primary)', width: 20, textAlign: 'center' }} />}
                  <span>{c.name}</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: 5 }}>
                {editing?.id === c.id ? (
                  <>
                    <button className="action-btn" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399' }} onClick={saveName}><i className="fa-solid fa-check" /></button>
                    <button className="action-btn" style={{ background: 'rgba(23, 37, 28, 0.05)', border: '1px solid var(--border-color)' }} onClick={() => setEditing(null)}><i className="fa-solid fa-times" style={{ color: '#fff' }} /></button>
                  </>
                ) : (
                  <>
                    <button className="action-btn" title="Capa da categoria" style={{ background: 'rgba(23, 37, 28, 0.05)', border: '1px solid var(--border-color)' }} onClick={() => { editCoverId.current = c.id; editCoverInput.current?.click(); }}><i className="fa-solid fa-camera" style={{ color: '#fff' }} /></button>
                    <button className="action-btn" style={{ background: 'rgba(23, 37, 28, 0.05)', border: '1px solid var(--border-color)' }} onClick={() => setEditing({ id: c.id, name: c.name })}><i className="fa-solid fa-pen" style={{ color: '#fff' }} /></button>
                    <button className="action-btn" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }} onClick={() => remove(c.id)}><i className="fa-solid fa-trash" /></button>
                  </>
                )}
              </div>
            </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
