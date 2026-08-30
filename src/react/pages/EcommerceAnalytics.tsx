import { useEffect, useState } from 'react';
import { ecommerceApi } from '../../services/ecommerceApi';
import { SkeletonCards } from '../components/Skeleton';

const brl = (v: number) => `R$ ${Number(v || 0).toFixed(2)}`;
const MES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const mesLabel = (m: string) => { const [y, mm] = m.split('-'); return `${MES[Number(mm) - 1] || mm}/${y.slice(2)}`; };

function Stat({ label, value, icon, color }: { label: string; value: string; icon: string; color: string }) {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: color + '1f', color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}><i className={`fa-solid ${icon}`} /></div>
      <div><div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>{label}</div><div style={{ fontWeight: 800, fontSize: '1.2rem' }}>{value}</div></div>
    </div>
  );
}

export function EcommerceAnalytics() {
  const [days, setDays] = useState(90);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setLoading(true); ecommerceApi.analytics(days).then((d) => { setData(d); setLoading(false); }).catch(() => setLoading(false)); }, [days]);

  if (loading) return <SkeletonCards count={6} lines={1} />;
  if (!data?.connected) return <p style={{ color: 'var(--text-muted)' }}>Conecte a loja para ver os dados.</p>;

  const maxRev = Math.max(...(data.months || []).map((m: any) => m.revenue), 1);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <select className="config-select" style={{ width: 'auto' }} value={days} onChange={(e) => setDays(Number(e.target.value))}>
          <option value={30}>Últimos 30 dias</option><option value={90}>Últimos 90 dias</option><option value={180}>Últimos 180 dias</option><option value={365}>Último ano</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        <Stat label="Faturamento" value={brl(data.revenue)} icon="fa-money-bill-trend-up" color="#22c55e" />
        <Stat label="Pedidos pagos" value={String(data.orderCount)} icon="fa-bag-shopping" color="#84cc16" />
        <Stat label="Ticket médio" value={brl(data.avgTicket)} icon="fa-receipt" color="#4d7c0f" />
        <Stat label="LTV médio" value={brl(data.ltv)} icon="fa-gem" color="#0ea5e9" />
        <Stat label="Recompra" value={`${Number(data.repurchaseRate || 0).toFixed(0)}%`} icon="fa-repeat" color="#f59e0b" />
        <Stat label="Clientes" value={String(data.customers)} icon="fa-users" color="#ef4444" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginTop: '1.25rem' }}>
        <div className="card">
          <h4 style={{ margin: '0 0 1rem' }}><i className="fa-solid fa-chart-column" style={{ color: 'var(--primary)' }} /> Faturamento por mês</h4>
          {(data.months || []).length === 0 ? <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Sem dados no período.</p> : (data.months || []).map((m: any) => (
            <div key={m.month} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: 3 }}><span>{mesLabel(m.month)}</span><span style={{ color: 'var(--text-muted)' }}>{brl(m.revenue)} · {m.count}</span></div>
              <div style={{ height: 6, background: 'rgba(23, 37, 28, 0.08)', borderRadius: 3 }}><div style={{ width: `${(m.revenue / maxRev) * 100}%`, height: '100%', background: 'var(--primary)', borderRadius: 3 }} /></div>
            </div>
          ))}
        </div>
        <div className="card">
          <h4 style={{ margin: '0 0 1rem' }}><i className="fa-solid fa-trophy" style={{ color: '#f59e0b' }} /> Top 5 produtos</h4>
          {(data.topProducts || []).length === 0 ? <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Sem vendas no período.</p> : (data.topProducts || []).map((p: any, i: number) => (
            <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: '1px solid rgba(23, 37, 28, 0.05)' }}>
              <span style={{ fontWeight: 900, color: i === 0 ? '#f59e0b' : 'var(--text-dim)', minWidth: 18 }}>{i + 1}</span>
              <span style={{ flex: 1, fontSize: '0.88rem' }}>{p.name}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.qty}un</span>
              <span style={{ fontSize: '0.8rem', color: '#22c55e' }}>{brl(p.revenue)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
