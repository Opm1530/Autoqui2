import { useEffect, useRef, useState } from 'react';
import { dbService } from '../../services/db';
import { authService } from '../../services/auth';
import { toast } from '../../services/toast';
import { confirm } from '../../services/confirm';
import { useAuth } from '../useAuth';
import { SkeletonTable } from '../components/Skeleton';

interface Employee {
  id: string;
  name?: string;
  email: string;
  role?: string;
  storeIds?: string[];
  storeId?: string;
  active?: boolean;
}

export function Users() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';

  const [stores, setStores] = useState<any[]>([]);
  const [team, setTeam] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const [companyDoc, usersRaw] = await Promise.all([
        dbService.get('companies', companyId),
        dbService.getAll('users', { field: 'companyId', operator: '==', value: companyId }),
      ]);
      setStores((companyDoc as any)?.stores || []);
      setTeam((usersRaw as Employee[]).filter((u) => u.role === 'employee'));
      setLoading(false);
    })();
  }, [companyId]);

  const storeNames = (ids?: string[] | string) => {
    let arr: string[] = [];
    if (!ids) return 'Todas';
    arr = typeof ids === 'string' ? (ids === '' ? [] : [ids]) : ids;
    if (arr.length === 0) return 'Todas';
    return arr.map((id) => stores.find((s) => s.id === id)?.name || id).join(', ');
  };

  async function toggleStatus(u: Employee) {
    const cur = u.active !== false;
    try {
      await dbService.update('users', u.id, { active: !cur });
      setTeam((prev) => prev.map((x) => (x.id === u.id ? { ...x, active: !cur } : x)));
      toast.success(`Colaborador ${!cur ? 'ativado' : 'desativado'} com sucesso!`);
    } catch (e) { toast.error('Erro ao atualizar status: ' + e); }
  }

  async function remove(u: Employee) {
    const ok = await confirm.danger('Excluir Colaborador', 'Tem certeza que deseja EXCLUIR este colaborador? Esta ação não pode ser desfeita.');
    if (!ok) return;
    try {
      await dbService.delete('users', u.id);
      setTeam((prev) => prev.filter((x) => x.id !== u.id));
      toast.success('Colaborador excluído com sucesso!');
    } catch (e) { toast.error('Erro ao excluir: ' + e); }
  }

  function onSaved(emp: Employee, isNew: boolean) {
    setTeam((prev) => (isNew ? [...prev, emp] : prev.map((x) => (x.id === emp.id ? { ...x, ...emp } : x))));
    setModalOpen(false); setEditing(null);
  }

  if (loading) return <SkeletonTable rows={6} cols={6} />;
  if (!companyId) return <p>Erro: Usuário sem empresa associada.</p>;

  return (
    <div>
      <div className="page-header" style={{ justifyContent: 'flex-end' }}>
        <button className="btn-primary" onClick={() => { setEditing(null); setModalOpen(true); }}>
          <i style={{ color: '#fff' }} className="fa-solid fa-user-plus" /> Novo Colaborador
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr><th>Nome</th><th>E-mail</th><th>Cargo</th><th>Lojas</th><th>Status</th><th>Ações</th></tr>
            </thead>
            <tbody>
              {team.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>Nenhum colaborador cadastrado.</td></tr>
              ) : team.map((u) => {
                const active = u.active !== false;
                return (
                  <tr key={u.id} onClick={() => { setEditing(u); setModalOpen(true); }} style={{ cursor: 'pointer' }}>
                    <td>{u.name || 'Sem Nome'}</td>
                    <td>{u.email}</td>
                    <td><span className="badge primary">Atendente</span></td>
                    <td>{storeNames(u.storeIds || u.storeId)}</td>
                    <td><span className={`badge ${active ? 'success' : 'danger'}`} title={active ? 'Ativo' : 'Inativo'}><i className={`fa-solid ${active ? 'fa-circle-check' : 'fa-circle-xmark'}`} /></span></td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="actions" style={{ display: 'flex', gap: 6 }}>
                        <button className="action-btn" title={active ? 'Desativar' : 'Ativar'} onClick={() => toggleStatus(u)}><i style={{ color: '#fff' }} className={`fa-solid ${active ? 'fa-ban' : 'fa-check'}`} /></button>
                        <button className="action-btn" title="Excluir" onClick={() => remove(u)}><i style={{ color: '#fff' }} className="fa-solid fa-trash" /></button>
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
        <EmployeeModal companyId={companyId} stores={stores} editing={editing}
          onClose={() => { setModalOpen(false); setEditing(null); }} onSaved={onSaved} />
      )}
    </div>
  );
}

function EmployeeModal({ companyId, stores, editing, onClose, onSaved }: {
  companyId: string; stores: any[]; editing: Employee | null; onClose: () => void; onSaved: (e: Employee, isNew: boolean) => void;
}) {
  const isEdit = !!editing;
  const [name, setName] = useState(editing?.name || '');
  const [email, setEmail] = useState(editing?.email || '');
  const [password, setPassword] = useState('');
  const [storeIds, setStoreIds] = useState<string[]>(editing?.storeIds || (editing?.storeId ? [editing.storeId] : []));
  const [saving, setSaving] = useState(false);

  const toggleStore = (id: string) => setStoreIds((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { toast.warning('Informe o nome.'); return; }
    if (!isEdit && (!email.trim() || !password)) { toast.warning('Informe e-mail e senha.'); return; }
    setSaving(true);
    try {
      if (isEdit && editing) {
        const updates = { name, storeIds };
        await dbService.update('users', editing.id, updates);
        toast.success('Colaborador atualizado com sucesso!');
        onSaved({ ...editing, ...updates }, false);
      } else {
        const uid = await authService.registerUser(email, password);
        const userData: any = { uid, name, email, role: 'employee', companyId, storeIds, active: true, permissions: ['orders', 'products'] };
        await dbService.set('users', uid, userData);
        toast.success('Colaborador adicionado com sucesso!');
        onSaved({ id: uid, ...userData }, true);
      }
    } catch (err: any) {
      toast.error('Erro: ' + (err.message || err));
      setSaving(false);
    }
  }

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content glass">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h2>{isEdit ? 'Editar Colaborador' : 'Novo Colaborador'}</h2>
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Nome</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isEdit} required />
          </div>
          {!isEdit && (
            <div className="form-group">
              <label>Senha</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          )}
          <div className="form-group">
            <label>Lojas de Atuação</label>
            <StoreMultiSelect stores={stores} storeIds={storeIds} onToggle={toggleStore} />
          </div>
          <button type="submit" className="btn-primary full-width" disabled={saving}>
            {saving ? <><i className="fa-solid fa-spinner fa-spin" /> Salvando...</> : 'Salvar'}
          </button>
        </form>
      </div>
    </div>
  );
}

function StoreMultiSelect({ stores, storeIds, onToggle }: { stores: any[]; storeIds: string[]; onToggle: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const selected = stores.filter((s) => storeIds.includes(s.id));

  return (
    <div ref={boxRef} style={{ position: 'relative' }}>
      <button type="button" onClick={() => setOpen((o) => !o)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'white', padding: '10px 14px', borderRadius: 8, fontSize: '0.95rem', cursor: 'pointer', minHeight: 46 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
          {selected.length === 0
            ? <span style={{ color: 'var(--text-dim)' }}>Selecione as lojas...</span>
            : selected.map((s) => (
              <span key={s.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.4)', color: '#c7d2fe', borderRadius: 6, padding: '2px 8px', fontSize: '0.8rem' }}>
                {s.name}
                <i className="fa-solid fa-xmark" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); onToggle(s.id); }} />
              </span>
            ))}
        </div>
        <i className={`fa-solid fa-chevron-${open ? 'up' : 'down'}`} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 20, background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,0.4)', maxHeight: 240, overflowY: 'auto', padding: 6 }}>
          {stores.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', padding: '0.75rem 0', margin: 0 }}>Nenhuma loja disponível.</p>}
          {stores.map((s) => (
            <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 6, cursor: 'pointer' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
              <input type="checkbox" checked={storeIds.includes(s.id)} onChange={() => onToggle(s.id)} style={{ width: 16, height: 16, accentColor: 'var(--primary)' }} />
              <span style={{ fontSize: '0.9rem' }}>{s.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
