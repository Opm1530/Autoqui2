import { useEffect, useState } from 'react';
import { dbService } from '../../../services/db';
import { authService } from '../../../services/auth';
import { toast } from '../../../services/toast';
import { confirm } from '../../../services/confirm';
import { SkeletonTable } from '../../components/Skeleton';

const MODULE_OPTIONS = [
  { value: 'atendimento', label: 'IA de Atendimento' },
  { value: 'venda', label: 'IA de Venda' },
  { value: 'agendamento', label: 'IA de Agendamento' },
  { value: 'disparo', label: 'Disparo em Massa' },
  { value: 'venda_catalogo', label: 'Venda pelo Catálogo' },
];
const AI_MODULES = ['atendimento', 'venda', 'agendamento'];

// Regras de exclusividade (mesma lógica do painel atual).
function toggleModule(selected: string[], m: string): string[] {
  if (selected.includes(m)) return selected.filter((x) => x !== m);
  let next = [...selected, m];
  if (m === 'venda_catalogo') next = next.filter((x) => x === 'venda_catalogo' || x === 'disparo');
  else if (AI_MODULES.includes(m) || m === 'disparo') {
    next = next.filter((x) => x !== 'venda_catalogo');
    if (AI_MODULES.includes(m)) next = next.filter((x) => !AI_MODULES.includes(x) || x === m);
  }
  return next;
}

interface StoreRow { id?: string; name: string; address: string; active: boolean; frete_ativo: boolean; instancia_id: string | null }

export function Companies() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  useEffect(() => { (async () => { setCompanies((await dbService.getAll('companies')) as any[]); setLoading(false); })(); }, []);

  async function toggleStatus(c: any) {
    const newStatus = c.status === 'active' ? 'inactive' : 'active';
    const action = newStatus === 'inactive' ? 'desativar' : 'ativar';
    let msg = `Deseja ${action} este cliente?`;
    if (newStatus === 'inactive') msg += '\n\n⚠️ ATENÇÃO: Todos os usuários (dono e funcionários) serão BLOQUEADOS de fazer login!';
    const ok = await confirm.warning(`${action.charAt(0).toUpperCase() + action.slice(1)} Cliente`, msg);
    if (!ok) return;
    try {
      await dbService.update('companies', c.id, { status: newStatus });
      setCompanies((prev) => prev.map((x) => (x.id === c.id ? { ...x, status: newStatus } : x)));
      toast.success(`Cliente ${newStatus === 'inactive' ? 'desativado' : 'ativado'} com sucesso!`);
    } catch (err) { toast.error('Erro ao atualizar status: ' + err); }
  }

  function onSaved(c: any, isNew: boolean) {
    setCompanies((prev) => isNew ? [...prev, c] : prev.map((x) => (x.id === c.id ? { ...x, ...c } : x)));
    setModalOpen(false); setEditing(null);
  }

  if (loading) return <SkeletonTable rows={8} cols={5} />;

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Gestão de Clientes</h2>
        <button className="btn-primary" onClick={() => { setEditing(null); setModalOpen(true); }}><i className="fa-solid fa-plus" /> Novo Cliente</button>
      </div>
      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead><tr><th>Nome</th><th>Status</th><th>Módulos Ativos</th><th>Lojas</th><th>Ações</th></tr></thead>
            <tbody>
              {companies.length === 0 ? <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>Nenhum cliente cadastrado.</td></tr>
                : companies.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td><span className={`badge ${c.status === 'active' ? 'success' : 'danger'}`}>{c.status === 'active' ? 'Ativo' : 'Inativo'}</span></td>
                    <td><div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>{(c.modulos_ativos || []).map((m: string) => <span key={m} className="badge info" style={{ fontSize: '0.7rem' }}>{m}</span>)}</div></td>
                    <td>{c.stores ? c.stores.length : 0}</td>
                    <td>
                      <div className="actions" style={{ display: 'flex', gap: 6 }}>
                        <button className="action-btn" title="Editar" onClick={() => { setEditing(c); setModalOpen(true); }}><i style={{ color: '#fff' }} className="fa-solid fa-pen-to-square" /></button>
                        <button className="action-btn" title={c.status === 'active' ? 'Desativar' : 'Ativar'} onClick={() => toggleStatus(c)}><i className={`fa-solid ${c.status === 'active' ? 'fa-toggle-off' : 'fa-toggle-on'}`} style={{ color: c.status === 'active' ? '#ef4444' : '#22c55e' }} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && <CompanyModal editing={editing} onClose={() => { setModalOpen(false); setEditing(null); }} onSaved={onSaved} />}
    </div>
  );
}

function CompanyModal({ editing, onClose, onSaved }: { editing: any | null; onClose: () => void; onSaved: (c: any, isNew: boolean) => void }) {
  const isEdit = !!editing;
  const [name, setName] = useState(editing?.name || '');
  const [limit, setLimit] = useState(String(editing?.limite_instancias || 1));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modules, setModules] = useState<string[]>(editing?.modulos_ativos || ['atendimento']);
  const [stores, setStores] = useState<StoreRow[]>(() => {
    const init = (editing?.stores || []) as any[];
    if (init.length) return init.map((s) => ({ id: s.id, name: s.name || '', address: s.address || '', active: s.active !== false, frete_ativo: s.frete_ativo !== false, instancia_id: s.instancia_id || null }));
    return [{ name: '', address: '', active: true, frete_ativo: true, instancia_id: null }];
  });
  const [saving, setSaving] = useState(false);

  const patchStore = (i: number, p: Partial<StoreRow>) => setStores((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...p } : s)));
  const addStore = () => setStores((prev) => [...prev, { name: '', address: '', active: true, frete_ativo: true, instancia_id: null }]);
  const removeStore = (i: number) => setStores((prev) => prev.filter((_, idx) => idx !== i));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (modules.includes('venda_catalogo')) {
      const forbidden = modules.filter((m) => m !== 'venda_catalogo' && m !== 'disparo');
      if (forbidden.length > 0) { toast.error('O módulo "Venda pelo Catálogo" só pode ser combinado com "Disparo em Massa".'); return; }
    }
    const validStores = stores.filter((s) => s.name.trim() && s.address.trim()).map((s, i) => ({
      id: s.id || `store_${Date.now()}_${i}`, name: s.name.trim(), address: s.address.trim(), active: s.active, frete_ativo: s.frete_ativo, instancia_id: s.instancia_id,
    }));
    if (validStores.length === 0) { toast.warning('É necessário cadastrar pelo menos 1 loja!'); return; }
    if (!isEdit && (!email.trim() || !password)) { toast.warning('Informe e-mail e senha do dono.'); return; }

    setSaving(true);
    try {
      if (isEdit) {
        const updates = { name, stores: validStores, limite_instancias: parseInt(limit) || 1, modulos_ativos: modules };
        await dbService.update('companies', editing.id, updates);
        toast.success('Cliente atualizado com sucesso!');
        onSaved({ id: editing.id, ...editing, ...updates }, false);
      } else {
        const ownerUid = await authService.registerUser(email, password);
        const companyData: any = { name, stores: validStores, limite_instancias: parseInt(limit) || 1, status: 'active', ownerId: ownerUid, modulos_ativos: modules, metrics: { totalMessages: 0, totalPayments: 0 } };
        const companyId = await dbService.create('companies', companyData);
        await dbService.set('users', ownerUid, { uid: ownerUid, email, role: 'owner', companyId });
        toast.success('Cliente criado com sucesso!');
        onSaved({ id: companyId, ...companyData }, true);
      }
    } catch (err) { toast.error('Erro: ' + err); setSaving(false); }
  }

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content glass big-modal">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h2>{isEdit ? 'Editar Cliente' : 'Novo Cliente'}</h2>
        <form onSubmit={save}>
          <div className="form-group"><label>Nome do Cliente</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></div>
          <div className="form-group"><label>Limite de Instâncias</label><input type="number" min="1" value={limit} onChange={(e) => setLimit(e.target.value)} required /></div>

          {!isEdit && (
            <div>
              <h3>Dono do Cliente</h3>
              <div className="form-group"><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div className="form-group"><label>Senha</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            </div>
          )}

          <h3>Lojas / Unidades <span style={{ color: '#ef4444' }}>*</span></h3>
          <p style={{ fontSize: '0.85em', color: '#999', marginTop: -8, marginBottom: 12 }}>Mínimo de 1 loja obrigatória</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
            {stores.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input type="text" placeholder="Nome da Loja" value={s.name} onChange={(e) => patchStore(i, { name: e.target.value })} style={{ flex: 1 }} required />
                <input type="text" placeholder="Endereço Completo" value={s.address} onChange={(e) => patchStore(i, { address: e.target.value })} style={{ flex: 2 }} required />
                <button type="button" title="Remover" onClick={() => removeStore(i)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: 8, width: 36, height: 36, cursor: 'pointer', flexShrink: 0 }}>✕</button>
              </div>
            ))}
          </div>
          <button type="button" className="btn-secondary" onClick={addStore} style={{ marginBottom: 8 }}><i className="fa-solid fa-plus" /> Adicionar Loja</button>

          <h3>Módulos Ativos</h3>
          <div className="multi-select-grid" style={{ marginBottom: 16 }}>
            {MODULE_OPTIONS.map((m) => {
              const on = modules.includes(m.value);
              return (
                <button type="button" key={m.value} onClick={() => setModules((prev) => toggleModule(prev, m.value))}
                  className="store-checkbox-card" style={{ border: on ? '1px solid var(--primary)' : undefined, background: on ? 'rgba(99,102,241,0.15)' : undefined }}>
                  <i className={`fa-solid ${on ? 'fa-square-check' : 'fa-square'}`} style={{ color: on ? 'var(--primary)' : 'var(--text-dim)' }} />
                  <span className="checkbox-label">{m.label}</span>
                </button>
              );
            })}
          </div>

          <button type="submit" className="btn-primary full-width" disabled={saving} style={{ marginTop: '1rem' }}>{saving ? 'Salvando...' : 'Salvar Cliente'}</button>
        </form>
      </div>
    </div>
  );
}
