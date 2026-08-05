import { useEffect, useMemo, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { dbService } from '../../../services/db';
import { toast } from '../../../services/toast';
import { useAuth } from '../../useAuth';
import { OrderModal } from './OrderModal';
import {
  StatusBadge, DeliveryBadge, PaymentBadge, formatDate,
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
          {FILTERS.map((f) => (
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
              <tr><th>TAG</th><th>Loja</th><th>Cliente</th><th>Total</th><th>Status</th><th>Data/Hora</th><th>Ações</th></tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>Nenhum pedido encontrado.</td></tr>
              ) : visible.map((order) => {
                const status = (order.status || 'em_montagem').toLowerCase();
                const nome = leadName(order.leadId, order.nome || order.leadName);
                return (
                  <tr key={order.id}>
                    <td><span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--primary)' }}>#{order.id.slice(-6).toUpperCase()}</span></td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{storeName(order.lojaId)}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="lead-avatar" style={{ width: 28, height: 28, fontSize: '0.7rem', flexShrink: 0 }}>{(nome[0] || 'C').toUpperCase()}</div>
                        <div>
                          <div style={{ fontWeight: 500 }}>{nome}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{leadPhone(order)}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>R$ {(order.value || order.total || 0).toFixed(2)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                        <StatusBadge status={status} /> <DeliveryBadge entrega={order.entrega || 'entrega'} /> <PaymentBadge order={order} />
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{formatDate(order.criadoEm || order.createdAt)}</td>
                    <td>
                      <div className="actions">
                        <button className="action-btn view" title="Ver detalhes" onClick={() => setSelected(order)}>
                          <i style={{ color: '#fff' }} className="fa-solid fa-eye" />
                        </button>
                      </div>
                    </td>
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
