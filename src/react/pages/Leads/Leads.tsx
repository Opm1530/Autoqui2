import { useEffect, useMemo, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { dbService } from '../../../services/db';
import { useAuth } from '../../useAuth';
import { LeadStatusBadge, AtendimentoBadge, formatDate, normAtend, filterLeads } from './helpers';
import { LeadModal } from './LeadModal';

export function Leads() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const isOwner = user?.role === 'owner';
  const userStoreIds: string[] = (user as any)?.storeIds || ((user as any)?.storeId ? [(user as any).storeId] : []);

  const [leads, setLeads] = useState<any[]>([]);
  const [isOnlyCatalog, setIsOnlyCatalog] = useState(false);
  const [activeFilter, setActiveFilter] = useState('todos');
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const company = (await dbService.get('companies', companyId)) as any;
      const modulos = company?.modulos_ativos || [];
      setIsOnlyCatalog(modulos.includes('venda_catalogo') && !modulos.includes('atendimento'));
    })();
  }, [companyId]);

  useEffect(() => {
    if (!companyId) return;
    const q = query(collection(db, 'leads'), where('empresaId', '==', companyId));
    const unsub = onSnapshot(q, (snap) => {
      let list = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as any[];
      if (!isOwner) list = list.filter((l) => l.lojaId && userStoreIds.includes(l.lojaId));
      setLeads(list);
    });
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  // Mantém o lead aberto sincronizado com o realtime
  useEffect(() => {
    if (!selected) return;
    const fresh = leads.find((l) => l.id === selected.id);
    if (fresh && fresh !== selected) setSelected(fresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leads]);

  const counts = useMemo(() => ({
    todos: leads.length,
    bot: filterLeads(leads, 'bot').length,
    humano: filterLeads(leads, 'humano').length,
    bloqueado: filterLeads(leads, 'bloqueado').length,
  }), [leads]);

  const visible = useMemo(() => filterLeads(leads, activeFilter), [leads, activeFilter]);

  const FILTERS = [
    { key: 'todos', label: 'Todos', icon: '', count: counts.todos, always: true },
    { key: 'bot', label: 'Bot', icon: 'fa-robot', count: counts.bot, always: false },
    { key: 'humano', label: 'Atendimento Humano', icon: 'fa-user', count: counts.humano, always: false },
    { key: 'bloqueado', label: 'Bloqueados', icon: 'fa-ban', count: counts.bloqueado, always: true },
  ];

  return (
    <div>
      <div className="leads-page-header">
        <div className="leads-filter-bar">
          {FILTERS.filter((f) => f.always || !isOnlyCatalog).map((f) => (
            <button key={f.key} className={'filter-btn' + (activeFilter === f.key ? ' active' : '')} onClick={() => setActiveFilter(f.key)}>
              {f.icon && <i className={`fa-solid ${f.icon}`} />} {f.label} <span className="filter-count">{f.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="card leads-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Status do Lead</th>
                {!isOnlyCatalog && <th>Status do Atendimento</th>}
                <th>Última Atividade</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr><td colSpan={isOnlyCatalog ? 3 : 4} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>Nenhum lead encontrado.</td></tr>
              ) : visible.map((lead) => {
                const statusLead = (lead.statusLead || 'novo').toLowerCase();
                const statusAtend = normAtend((lead.statusAtendimento || 'bot').toLowerCase());
                const phone = (lead.telefone || '').split('@')[0];
                return (
                  <tr key={lead.id} onClick={() => setSelected(lead)} style={{ cursor: 'pointer' }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="lead-avatar">{(lead.nome || phone || 'C')[0].toUpperCase()}</div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{lead.nome || 'Sem nome'}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{phone}</div>
                        </div>
                      </div>
                    </td>
                    <td><LeadStatusBadge status={statusLead} /></td>
                    {!isOnlyCatalog && <td><AtendimentoBadge status={statusAtend} /></td>}
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{formatDate(lead.updatedAt || lead.criadoEm || lead.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <LeadModal lead={selected} isOnlyCatalog={isOnlyCatalog}
          onClose={() => setSelected(null)} onUpdated={(l) => setSelected(l)} />
      )}
    </div>
  );
}
