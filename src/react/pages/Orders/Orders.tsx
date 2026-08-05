import { useEffect, useMemo, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { dbService } from '../../../services/db';
import { toast } from '../../../services/toast';
import { useAuth } from '../../useAuth';
import { OrderModal } from './OrderModal';
import {
  StatusBadge, DeliveryBadge, PaymentBadge, relativeDate,
  isOrderArchived, isPendingPayment, FILTERS,
} from './helpers';

export function Orders() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';

  const [orders, setOrders] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [lojaConfigs, setLojaConfigs] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState('todos');
  const [selected, setSelected] = useState<any | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => setExpanded((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  // Dados de apoio (lojas, leads, config)
  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const [companyDoc, leadsRaw, cfgRaw] = await Promise.all([
        dbService.get('companies', companyId),
        dbService.getAll('leads', { field: 'empresaId', operator: '==', value: companyId }),
        dbService.getAll('loja_config', { field: 'empresaId', operator: '==', value: companyId }),
      ]);
      setStores(((companyDoc as any)?.stores as any[]) || []);
      setLeads(leadsRaw as any[]);
      setLojaConfigs(cfgRaw as any[]);
    })();
  }, [companyId]);

  // Pedidos em tempo real
  useEffect(() => {
    if (!companyId) return;
    const q = query(collection(db, 'pedidos'), where('empresaId', '==', companyId));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      list.sort((a: any, b: any) => {
        const ta = (a.criadoEm?.toDate?.() || new Date(a.criadoEm || 0)).getTime();
        const tb = (b.criadoEm?.toDate?.() || new Date(b.criadoEm || 0)).getTime();
        return tb - ta;
      });
      setOrders(list);
    });
    return unsub;
  }, [companyId]);

  const storeName = (lojaId: string) => stores.find((s) => s.id === lojaId)?.name || lojaId || '-';
  const lead = (leadId: string) => leads.find((l) => l.id === leadId);
  const leadName = (leadId: string, fallback?: string) => fallback || lead(leadId)?.nome || lead(leadId)?.name || 'Cliente';
  const leadPhone = (o: any) => (o.clientPhone || lead(o.leadId)?.telefone || '').split('@')[0];

  const visible = useMemo(() => {
    if (activeFilter === 'arquivados') return orders.filter(isOrderArchived);
    const base = orders.filter((o) => !isOrderArchived(o) && !isPendingPayment(o));
    if (activeFilter === 'todos') return base;
    return base.filter((o) => (o.status || 'em_montagem').toLowerCase() === activeFilter);
  }, [orders, activeFilter]);

  const count = (key: string) => {
    if (key === 'arquivados') return orders.filter(isOrderArchived).length;
    const base = orders.filter((o) => !isOrderArchived(o) && !isPendingPayment(o));
    if (key === 'todos') return base.length;
    return base.filter((o) => (o.status || 'em_montagem').toLowerCase() === key).length;
  };

  // Toggle abrir/fechar loja/entrega
  async function toggleStore(storeId: string, field: 'lojaFechada' | 'entregaFechada', current: boolean) {
    try {
      const cfg = lojaConfigs.find((c) => c.lojaId === storeId);
      const novo = !current;
      if (cfg?.id) {
        await dbService.update('loja_config', cfg.id, { [field]: novo });
        setLojaConfigs((prev) => prev.map((c) => (c.id === cfg.id ? { ...c, [field]: novo } : c)));
      } else {
        const newId = await dbService.create('loja_config', { empresaId: companyId, lojaId: storeId, [field]: novo });
        setLojaConfigs((prev) => [...prev, { id: newId, empresaId: companyId, lojaId: storeId, [field]: novo }]);
      }
      toast.success(field === 'lojaFechada' ? (novo ? 'Loja fechada' : 'Loja aberta') : (novo ? 'Entregas pausadas' : 'Entregas ativas'));
    } catch (err: any) {
      toast.error('Erro: ' + (err.message || err));
    }
  }

  return (
    <div>
      {/* Filtros */}
      <div className="leads-page-header">
        <div className="leads-filter-bar">
          {FILTERS.filter((f) => f.key === 'todos' || f.key === 'arquivados' || count(f.key) > 0).map((f) => (
            <button key={f.key} className={'filter-btn' + (activeFilter === f.key ? ' active' : '')} onClick={() => setActiveFilter(f.key)}>
              {f.icon && <i className={`fa-solid ${f.icon}`} />} {f.label}
              {f.key !== 'arquivados' && <span className="filter-count">{count(f.key)}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles de loja */}
      {stores.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, marginBottom: '1rem' }}>
          {stores.map((store) => {
            const cfg = lojaConfigs.find((c) => c.lojaId === store.id) || {};
            const lojaFechada = cfg.lojaFechada === true;
            const entregaFechada = cfg.entregaFechada === true;
            return (
              <div key={store.id} style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 200 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{store.name}</span>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button onClick={() => toggleStore(store.id, 'lojaFechada', lojaFechada)}
                    style={{ padding: '0.3rem 0.75rem', borderRadius: 8, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', border: '1px solid', ...(lojaFechada ? { background: 'rgba(239,68,68,0.12)', color: '#f87171', borderColor: 'rgba(239,68,68,0.3)' } : { background: 'rgba(16,185,129,0.12)', color: '#34d399', borderColor: 'rgba(16,185,129,0.3)' }) }}>
                    <i className={`fa-solid ${lojaFechada ? 'fa-door-closed' : 'fa-door-open'}`} /> Loja {lojaFechada ? 'Fechada' : 'Aberta'}
                  </button>
                  <button onClick={() => toggleStore(store.id, 'entregaFechada', entregaFechada)}
                    style={{ padding: '0.3rem 0.75rem', borderRadius: 8, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', border: '1px solid', ...(entregaFechada ? { background: 'rgba(239,68,68,0.12)', color: '#f87171', borderColor: 'rgba(239,68,68,0.3)' } : { background: 'rgba(59,130,246,0.12)', color: '#60a5fa', borderColor: 'rgba(59,130,246,0.3)' }) }}>
                    <i className={`fa-solid ${entregaFechada ? 'fa-truck-arrow-right' : 'fa-truck'}`} /> Entrega {entregaFechada ? 'Pausada' : 'Ativa'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tabela */}
      <div className="card leads-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr><th>TAG</th><th>Loja</th><th>Cliente</th><th>Total</th><th>Status</th><th>Data/Hora</th></tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>Nenhum pedido encontrado.</td></tr>
              ) : visible.map((order) => {
                const status = (order.status || 'em_montagem').toLowerCase();
                const nome = leadName(order.leadId, order.nome || order.leadName);
                return (
                  <tr key={order.id} onClick={() => setSelected(order)} style={{ cursor: 'pointer' }}>
                    <td><span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--primary)' }}>#{order.id.slice(-6).toUpperCase()}</span></td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{storeName(order.lojaId)}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, maxWidth: 220 }}>
                        <div className="lead-avatar" style={{ width: 28, height: 28, fontSize: '0.7rem', flexShrink: 0 }}>{(nome[0] || 'C').toUpperCase()}</div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={nome}>{nome}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{leadPhone(order)}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>R$ {(order.value || order.total || 0).toFixed(2)}</td>
                    <td>
                      {(() => {
                        const isExp = expanded.has(order.id);
                        return (
                          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: isExp ? 'wrap' : 'nowrap' }}>
                            <StatusBadge status={status} compact={!isExp} />
                            <DeliveryBadge entrega={order.entrega || 'entrega'} compact={!isExp} />
                            <PaymentBadge order={order} compact={!isExp} />
                            <button
                              title={isExp ? 'Recolher' : 'Expandir'}
                              onClick={(e) => { e.stopPropagation(); toggleExpanded(order.id); }}
                              style={{ background: 'var(--surface-hover)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', width: 24, height: 24, borderRadius: 6, cursor: 'pointer', flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem' }}>
                              <i className={`fa-solid ${isExp ? 'fa-chevron-left' : 'fa-chevron-right'}`} />
                            </button>
                          </div>
                        );
                      })()}
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{relativeDate(order.criadoEm || order.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <OrderModal
          order={selected}
          companyId={companyId}
          storeName={storeName(selected.lojaId)}
          clientName={leadName(selected.leadId, selected.nome || selected.leadName)}
          clientPhone={leadPhone(selected)}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
