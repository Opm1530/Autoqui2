import { useEffect, useState } from 'react';
import { dbService } from '../../services/db';
import { adminApi } from '../../services/adminApi';
import { pagesForModules } from '../util/pages';
import { toast } from '../../services/toast';
import { confirm } from '../../services/confirm';
import { useAuth } from '../useAuth';
import { SkeletonTable } from '../components/Skeleton';
import { ManageTabs } from '../components/ManageTabs';

interface Employee {
  id: string;
  name?: string;
  email: string;
  role?: string;
  storeIds?: string[];
  storeId?: string;
  active?: boolean;
  permissions?: string[];
}

export function Users() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';

  const [stores, setStores] = useState<any[]>([]);
  const [modulos, setModulos] = useState<string[]>([]);
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
      setModulos((companyDoc as any)?.modulos_ativos || []);
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
      await adminApi.setUserActive(u.id, !cur);
      setTeam((prev) => prev.map((x) => (x.id === u.id ? { ...x, active: !cur } : x)));
      toast.success(`Colaborador ${!cur ? 'ativado' : 'desativado'} com sucesso!`);
    } catch (e: any) { toast.error('Erro ao atualizar status: ' + (e.message || e)); }
  }

  async function remove(u: Employee) {
    const ok = await confirm.danger('Excluir Colaborador', 'Tem certeza que deseja EXCLUIR este colaborador? Esta ação não pode ser desfeita.');
    if (!ok) return;
    try {
      await adminApi.deleteUser(u.id);
      setTeam((prev) => prev.filter((x) => x.id !== u.id));
      toast.success('Colaborador excluído com sucesso!');
    } catch (e: any) { toast.error('Erro ao excluir: ' + (e.message || e)); }
  }

  function onSaved(emp: Employee, isNew: boolean) {
    setTeam((prev) => (isNew ? [...prev, emp] : prev.map((x) => (x.id === emp.id ? { ...x, ...emp } : x))));
    setModalOpen(false); setEditing(null);
  }

  if (loading) return <SkeletonTable rows={6} cols={6} />;
  if (!companyId) return <p>Erro: Usuário sem empresa associada.</p>;
  // Só o dono gerencia a equipe.
  if (user?.role !== 'owner' && user?.role !== 'admin') {
    return (
      <div>
        <div className="page-heading"><h1>Negócio</h1></div>
        <ManageTabs />
        <div className="card" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
          <i className="fa-solid fa-lock" style={{ fontSize: '1.8rem', display: 'block', marginBottom: 12, color: '#fbbf24' }} />
          Apenas o dono da conta pode gerenciar a equipe.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-heading"><h1>Equipe</h1><p>Convide colaboradores e gerencie os acessos.</p></div>
      <ManageTabs />
      <div className="page-header" style={{ justifyContent: 'flex-end' }}>
        <button className="btn-add" onClick={() => { setEditing(null); setModalOpen(true); }}>
          Novo Colaborador
          <span className="btn-add-icon"><i className="fa-solid fa-plus" /></span>
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr><th>Nome</th><th>E-mail</th><th>Cargo</th><th>Negócio</th><th>Status</th><th>Ações</th></tr>
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
        <EmployeeModal stores={stores} modulos={modulos} editing={editing}
          onClose={() => { setModalOpen(false); setEditing(null); }} onSaved={onSaved} />
      )}
    </div>
  );
}

function EmployeeModal({ stores, modulos, editing, onClose, onSaved }: {
  stores: any[]; modulos: string[]; editing: Employee | null; onClose: () => void; onSaved: (e: Employee, isNew: boolean) => void;
}) {
  const isEdit = !!editing;
  const [name, setName] = useState(editing?.name || '');
  const [email, setEmail] = useState(editing?.email || '');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const paginas = pagesForModules(modulos);
  const [perms, setPerms] = useState<string[]>(Array.isArray((editing as any)?.permissions) ? (editing as any).permissions : []);
  const togglePerm = (k: string) => setPerms((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { toast.warning('Informe o nome.'); return; }
    if (!isEdit && (!email.trim() || !password)) { toast.warning('Informe e-mail e senha.'); return; }
    // Loja única: o colaborador atende o negócio inteiro.
    const storeIds = stores.map((s) => s.id);
    setSaving(true);
    try {
      if (isEdit && editing) {
        await adminApi.updateUser(editing.id, { name, storeIds, permissions: perms });
        toast.success('Colaborador atualizado com sucesso!');
        onSaved({ ...editing, name, storeIds, permissions: perms } as Employee, false);
      } else {
        const { id } = await adminApi.createEmployee({ name, email, password, storeIds, permissions: perms });
        toast.success('Colaborador adicionado com sucesso!');
        onSaved({ id, name, email, role: 'employee', storeIds, active: true, permissions: perms } as Employee, true);
      }
    } catch (err: any) {
      toast.error('Erro: ' + (err.message || err));
      setSaving(false);
    }
  }

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content glass" style={{ maxWidth: 440 }}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 6 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0, background: 'rgba(132,204,22,0.14)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
            <i className="fa-solid fa-user-plus" />
          </div>
          <div>
            <h2 style={{ margin: 0 }}>{isEdit ? 'Editar Colaborador' : 'Novo Colaborador'}</h2>
            <p style={{ margin: '2px 0 0', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              {isEdit ? 'Atualize os dados de acesso do colaborador.' : 'Ele recebe um acesso próprio ao painel para atender junto com você.'}
            </p>
          </div>
        </div>
        <form onSubmit={submit} style={{ marginTop: 18 }}>
          <div className="form-group">
            <label>Nome</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do colaborador" required />
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemplo.com" disabled={isEdit} required />
            {isEdit && <p style={{ margin: '6px 0 0', fontSize: '0.78rem', color: 'var(--text-dim)' }}>O e-mail de acesso não pode ser alterado.</p>}
          </div>
          {!isEdit && (
            <div className="form-group">
              <label>Senha de acesso</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo de 6 caracteres" required />
            </div>
          )}
          <div className="form-group">
            <label>Páginas que ele pode acessar</label>
            <p style={{ margin: '2px 0 8px', fontSize: '0.78rem', color: 'var(--text-dim)' }}>O Dashboard é sempre visível. Marque as demais.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {paginas.map((p) => {
                const on = perms.includes(p.key);
                return (
                  <button type="button" key={p.key} onClick={() => togglePerm(p.key)}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px', borderRadius: 10, cursor: 'pointer', textAlign: 'left',
                      border: `1px solid ${on ? 'var(--primary)' : 'var(--border-color)'}`, background: on ? 'rgba(132,204,22,0.1)' : 'transparent', color: 'var(--text-main)' }}>
                    <i className={`fa-solid ${on ? 'fa-square-check' : 'fa-square'}`} style={{ color: on ? 'var(--primary)' : 'var(--text-dim)' }} />
                    <i className={`fa-solid ${p.icon}`} style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{p.label}</span>
                  </button>
                );
              })}
            </div>
            {paginas.length === 0 && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Nenhuma ferramenta ativa ainda.</p>}
          </div>
          <button type="submit" className="btn-primary full-width" disabled={saving} style={{ marginTop: 6 }}>
            {saving ? <><i className="fa-solid fa-spinner fa-spin" /> Salvando...</> : isEdit ? 'Salvar alterações' : 'Adicionar colaborador'}
          </button>
        </form>
      </div>
    </div>
  );
}
