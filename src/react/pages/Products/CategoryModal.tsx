import { useState } from 'react';
import { dbService } from '../../../services/db';
import { toast } from '../../../services/toast';
import { confirm } from '../../../services/confirm';
import { availableIcons } from './helpers';
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

  async function create(e: React.FormEvent) {
    e.preventDefault();
    const nm = name.trim();
    if (!nm) return;
    try {
      const newId = await dbService.create('categories', { name: nm, icon, companyId });
      onChange([...categories, { id: newId, name: nm, icon, companyId }]);
      setName('');
      toast.success('Categoria criada com sucesso!');
    } catch { toast.error('Erro ao criar categoria.'); }
  }

  async function remove(id: string) {
    if (await confirm.warning('Excluir Categoria', 'Tem certeza? Produtos nesta categoria ficarão "Sem Categoria".')) {
      try {
        await dbService.delete('categories', id);
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
      await dbService.update('categories', editing.id, { name: nm });
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
              <label>Ícone (Selecione um)</label>
              <div className="icon-picker-grid">
                {availableIcons.map((ic) => (
                  <div key={ic} className={'icon-option' + (icon === ic ? ' selected' : '')} onClick={() => setIcon(ic)}>
                    <i className={`fa-solid ${ic}`} />
                  </div>
                ))}
              </div>
            </div>
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
                  <i className={`fa-solid ${c.icon}`} style={{ color: 'var(--primary)', width: 20, textAlign: 'center' }} />
                  <span>{c.name}</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: 5 }}>
                {editing?.id === c.id ? (
                  <>
                    <button className="action-btn" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399' }} onClick={saveName}><i className="fa-solid fa-check" /></button>
                    <button className="action-btn" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)' }} onClick={() => setEditing(null)}><i className="fa-solid fa-times" style={{ color: '#fff' }} /></button>
                  </>
                ) : (
                  <>
                    <button className="action-btn" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)' }} onClick={() => setEditing({ id: c.id, name: c.name })}><i className="fa-solid fa-pen" style={{ color: '#fff' }} /></button>
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
