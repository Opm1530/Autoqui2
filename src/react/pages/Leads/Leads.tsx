import { useEffect, useMemo, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { dbService } from '../../../services/db';
import { useAuth } from '../../useAuth';
import { usePagination, Pagination } from '../../components/Pagination';
import { SkeletonTable } from '../../components/Skeleton';
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
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<any | null>(null);
  const [loaded, setLoaded] = useState(false);

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
      setLoaded(true);
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

  const visible = useMemo(() => {
    const base = filterLeads(leads, activeFilter);
    const term = search.trim().toLowerCase();
    if (!term) return base;
    return base.filter((l) => {
      const nome = (l.nome || '').toLowerCase();
      const phone = (l.telefone || '').toLowerCase();
      return nome.includes(term) || phone.includes(term);
    });
  }, [leads, activeFilter, search]);

  const { page, setPage, totalPages, pageItems, total, perPage } = usePagination(visible, 20, `${activeFilter}|${search}`);

  const FILTERS = [
    { key: 'todos', label: 'Todos', icon: '', count: counts.todos, always: true },
    { key: 'bot', label: 'Bot', icon: 'fa-robot', count: counts.bot, always: false },
    { key: 'humano', label: 'Atendimento Humano', icon: 'fa-user', count: counts.humano, always: false },
    { key: 'bloqueado', label: 'Bloqueados', icon: 'fa-ban', count: counts.bloqueado, always: true },
  ];

  return (
    <div>
      <div className="leads-page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div className="leads-filter-bar">
          {FILTERS.filter((f) => f.always || !isOnlyCatalog).map((f) => (
            <button key={f.key} className={'filter-btn' + (activeFilter === f.key ? ' active' : '')} onClick={() => setActiveFilter(f.key)}>
              {f.icon && <i className={`fa-solid ${f.icon}`} />} {f.label} <span className="filter-count">{f.count}</span>
            </button>
          ))}
        </div>
        <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: 320 }}>
          <i className="fa-solid fa-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nome ou telefone..."
            style={{ width: '100%', padding: '10px 10px 10px 35px', background: 'var(--surface-hover)', border: '1px solid var(--border-color)', borderRadius: 12, color: 'white', outline: 'none' }} />
        </div>
      </div>

      {!loaded ? <SkeletonTable rows={8} cols={isOnlyCatalog ? 3 : 4} /> : (
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
              {total === 0 ? (
                <tr><td colSpan={isOnlyCatalog ? 3 : 4} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>Nenhum lead encontrado.</td></tr>
              ) : pageItems.map((lead) => {
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
        <div style={{ padding: '0 1.25rem 0.75rem' }}>
          <Pagination page={page} totalPages={totalPages} total={total} perPage={perPage} onChange={setPage} label="leads" />
        </div>
      </div>
      )}

      {selected && (
        <LeadModal lead={selected} isOnlyCatalog={isOnlyCatalog}
          onClose={() => setSelected(null)} onUpdated={(l) => setSelected(l)} />
      )}
    </div>
  );
}
