import { useEffect, useMemo, useState } from 'react';
import { dbService } from '../../../services/db';
import { dataApi } from '../../../services/dataApi';
import { toast } from '../../../services/toast';
import { confirm } from '../../../services/confirm';
import { useAuth } from '../../useAuth';
import { SkeletonTable } from '../../components/Skeleton';

interface Cliente { id: string; companyId: string; nome: string; telefone: string; email?: string; observacoes?: string; criadoEm?: string; }

const formatDate = (str?: string) => { if (!str) return '—'; try { return new Date(str).toLocaleDateString('pt-BR'); } catch { return str; } };

export function ScheduleClients() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';

  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [stats, setStats] = useState<Map<string, { count: number; ultimo: string }>>(new Map());
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Cliente | null>(null);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const company = (await dbService.get('companies', companyId)) as any;
      if (!(company?.modulos_ativos || []).includes('agendamento')) { setEnabled(false); return; }
      setEnabled(true);
      const [cli, appts] = await Promise.all([
        dbService.getAll('clientes', { field: 'companyId', operator: '==', value: companyId }),
        dbService.getAll('agendamentos', { field: 'companyId', operator: '==', value: companyId }),
      ]);
      setClientes(cli as Cliente[]);
      const m = new Map<string, { count: number; ultimo: string }>();
      (appts as any[]).forEach((a) => {
        if (!a.clienteId) return;
        const ex = m.get(a.clienteId);
        const data = a.date || '';
        if (!ex) m.set(a.clienteId, { count: 1, ultimo: data });
        else m.set(a.clienteId, { count: ex.count + 1, ultimo: data > ex.ultimo ? data : ex.ultimo });
      });
      setStats(m);
    })();
  }, [companyId]);

  const filtered = useMemo(() => {
    if (!search) return clientes;
    const q = search.toLowerCase();
    return clientes.filter((c) => (c.nome || '').toLowerCase().includes(q) || (c.telefone || '').toLowerCase().includes(q) || (c.email || '').toLowerCase().includes(q));
  }, [clientes, search]);

  async function remove(c: Cliente) {
    const ok = await confirm.danger('Excluir Cliente', `Deseja excluir o cliente "${c.nome || c.id}"? Esta ação não pode ser desfeita.`);
    if (!ok) return;
    try { await dataApi.remove('clientes', c.id); setClientes((prev) => prev.filter((x) => x.id !== c.id)); toast.success('Cliente excluído.'); }
    catch { toast.error('Erro ao excluir cliente.'); }
  }
  function onSaved(c: Cliente, isNew: boolean) {
    setClientes((prev) => isNew ? [...prev, c] : prev.map((x) => (x.id === c.id ? c : x)));
    setModalOpen(false); setEditing(null);
  }

  if (enabled === null) return <SkeletonTable rows={6} cols={5} />;
  if (!companyId) return <p>Usuário sem empresa.</p>;
  if (!enabled) return (
    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
      <i className="fa-solid fa-users-slash" style={{ fontSize: '3rem', color: 'var(--text-dim)', marginBottom: '1rem', display: 'block' }} />
      <h2>Módulo de Agendamento</h2>
      <p style={{ color: 'var(--text-muted)' }}>O módulo de IA Agendamento não está ativo para esta conta.<br />Entre em contato com o administrador para ativá-lo.</p>
    </div>
  );

  return (
    <div>
      <div className="page-header" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 className="page-title" style={{ marginBottom: 4 }}><i className="fa-solid fa-users" style={{ color: 'var(--primary)', marginRight: 10 }} />Clientes</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Gerencie os clientes cadastrados para agendamento.</p>
        </div>
        <button className="btn-add" onClick={() => { setEditing(null); setModalOpen(true); }}>Novo Cliente<span className="btn-add-icon"><i className="fa-solid fa-plus" /></span></button>
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <div className="sc-search-wrap">
            <i className="fa-solid fa-magnifying-glass" />
            <input className="sc-search-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nome, telefone ou e-mail..." />
          </div>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginLeft: 'auto' }}>{clientes.length} cliente{clientes.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead><tr><th>Cliente</th><th>Telefone</th><th style={{ textAlign: 'center' }}>Agendamentos</th><th>Último Agend.</th><th>Ações</th></tr></thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                  <i className="fa-solid fa-users-slash" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.75rem', opacity: 0.4 }} />Nenhum cliente encontrado.
                </td></tr>
              ) : filtered.map((c) => {
                const s = stats.get(c.id);
                return (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="sc-avatar">{(c.nome || c.telefone || 'C')[0].toUpperCase()}</div>
                        <div><div style={{ fontWeight: 600 }}>{c.nome || 'Sem nome'}</div><div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{c.email || ''}</div></div>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{c.telefone || '—'}</td>
                    <td style={{ textAlign: 'center' }}><span className="sc-badge">{s?.count ?? 0}</span></td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{s?.ultimo ? formatDate(s.ultimo) : '—'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="sc-action-btn edit" title="Editar" onClick={() => { setEditing(c); setModalOpen(true); }}><i className="fa-solid fa-pen-to-square" /></button>
                        <button className="sc-action-btn del" title="Excluir" onClick={() => remove(c)}><i className="fa-solid fa-trash" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && <ClientModal companyId={companyId} editing={editing} onClose={() => { setModalOpen(false); setEditing(null); }} onSaved={onSaved} />}
    </div>
  );
}

function ClientModal({ companyId, editing, onClose, onSaved }: { companyId: string; editing: Cliente | null; onClose: () => void; onSaved: (c: Cliente, isNew: boolean) => void }) {
  const [nome, setNome] = useState(editing?.nome || '');
  const [telefone, setTelefone] = useState(editing?.telefone || '');
  const [email, setEmail] = useState(editing?.email || '');
  const [obs, setObs] = useState(editing?.observacoes || '');
  const [saving, setSaving] = useState(false);

  async function save() {
    const nm = nome.trim();
    const tel = telefone.trim().replace(/\D/g, '');
    if (!nm) { toast.warning('Informe o nome do cliente.'); return; }
    if (!tel) { toast.warning('Informe o telefone do cliente.'); return; }
    const data: any = { companyId, nome: nm, telefone: tel, email: email.trim() || '', observacoes: obs.trim() || '', criadoEm: editing?.criadoEm || new Date().toISOString() };
    setSaving(true);
    try {
      if (editing) { await dataApi.update('clientes', editing.id, data); toast.success('Cliente atualizado!'); onSaved({ id: editing.id, ...data }, false); }
      else { const { id: newId } = await dataApi.create('clientes', data); toast.success('Cliente criado com sucesso!'); onSaved({ id: newId, ...data }, true); }
    } catch (err) { toast.error('Erro ao salvar cliente: ' + err); setSaving(false); }
  }

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content glass" style={{ maxWidth: 520, width: '95%' }}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h2 style={{ marginBottom: '0.25rem' }}>{editing ? 'Editar Cliente' : 'Novo Cliente'}</h2>
        <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Preencha os dados do cliente.</p>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div><label className="config-label">Nome <span style={{ color: '#ef4444' }}>*</span></label><input className="config-input" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome completo do cliente" /></div>
          <div><label className="config-label">Telefone / WhatsApp <span style={{ color: '#ef4444' }}>*</span></label><input className="config-input" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Ex: 11999999999" /></div>
          <div><label className="config-label">E-mail</label><input className="config-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="cliente@email.com" /></div>
          <div><label className="config-label">Observações</label><textarea className="config-input" rows={3} style={{ resize: 'vertical', height: 'auto' }} value={obs} onChange={(e) => setObs(e.target.value)} placeholder="Informações extras sobre o cliente..." /></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" style={{ minWidth: 140 }} disabled={saving} onClick={save}>{saving ? <><i className="fa-solid fa-spinner fa-spin" /> Salvando...</> : <><i className="fa-solid fa-save" /> Salvar</>}</button>
        </div>
      </div>
    </div>
  );
}
