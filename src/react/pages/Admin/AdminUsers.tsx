import { useEffect, useState } from 'react';
import { dbService } from '../../../services/db';
import { adminApi } from '../../../services/adminApi';
import { toast } from '../../../services/toast';
import { SkeletonTable } from '../../components/Skeleton';

export function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { (async () => { setUsers((await dbService.getAll('users')) as any[]); setLoading(false); })(); }, []);

  function openEdit(u: any) { setEditing(u); setName(u.name || ''); }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      await adminApi.updateUser(editing.id, { name });
      setUsers((prev) => prev.map((u) => (u.id === editing.id ? { ...u, name } : u)));
      toast.success('Usuário atualizado com sucesso!');
      setEditing(null);
    } catch (err: any) { toast.error('Erro ao atualizar: ' + (err.message || err)); }
    finally { setSaving(false); }
  }

  if (loading) return <SkeletonTable rows={8} cols={5} />;

  return (
    <div>
      <div className="page-header"><h2 className="page-title">Usuários da Plataforma</h2></div>
      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead><tr><th>Nome</th><th>E-mail</th><th>Função</th><th>Status</th><th>Ações</th></tr></thead>
            <tbody>
              {users.length === 0 ? <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>Nenhum usuário cadastrado.</td></tr>
                : users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name || '-'}</td>
                    <td>{u.email}</td>
                    <td><span className="badge info">{u.role}</span></td>
                    <td><span className={`badge ${u.companyId ? 'warning' : 'success'}`}>{u.companyId ? 'Vinculado' : 'Global'}</span></td>
                    <td><div className="actions"><button className="action-btn" title="Editar" onClick={() => openEdit(u)}><i style={{ color: '#fff' }} className="fa-solid fa-pen-to-square" /></button></div></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) setEditing(null); }}>
          <div className="modal-content glass">
            <span className="close-modal" onClick={() => setEditing(null)}>&times;</span>
            <h2>Editar Usuário</h2>
            <form onSubmit={save}>
              <div className="form-group"><label>Nome</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></div>
              <div className="form-group"><label>Email (Apenas Leitura)</label><input type="email" value={editing.email || ''} disabled /></div>
              <button type="submit" className="btn-primary full-width" disabled={saving}>{saving ? 'Salvando...' : 'Salvar Alterações'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
