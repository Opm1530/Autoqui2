import { useEffect, useState } from 'react';
import { dbService } from '../../../services/db';
import { SkeletonCards } from '../../components/Skeleton';

function StatCard({ icon, iconCls, label, value, color }: { icon: string; iconCls: string; label: string; value: string; color?: string }) {
  return (
    <div className="stats-card card">
      <div className={`stats-icon ${iconCls}`}><i style={{ color: '#ffffff8f' }} className={`fa-solid ${icon}`} /></div>
      <div className="stats-info"><span className="label">{label}</span><br /><span className="value" style={color ? { color } : undefined}>{value}</span></div>
    </div>
  );
}

export function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ companies: 0, active: 0, messages: 0, payments: 0, credits: 0, usage: 0 });

  useEffect(() => {
    (async () => {
      try {
        const companies = (await dbService.getAll('companies')) as any[];
        let messages = 0, payments = 0, active = 0;
        companies.forEach((c) => { if (c.metrics) { messages += c.metrics.totalMessages || 0; payments += c.metrics.totalPayments || 0; } if (c.status === 'active') active++; });
        const openai = (await dbService.get('settings', 'openai').catch(() => null)) as any;
        setData({ companies: companies.length, active, messages, payments, credits: openai?.credits || 0, usage: openai?.usage || 0 });
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, []);

  if (loading) return <SkeletonCards count={6} minWidth={220} lines={1} />;

  return (
    <div className="dashboard-grid">
      <StatCard icon="fa-building" iconCls="primary" label="Clientes" value={String(data.companies)} />
      <StatCard icon="fa-circle-check" iconCls="success" label="Clientes Ativos" value={String(data.active)} />
      <StatCard icon="fa-dollar-sign" iconCls="success" label="Créditos OpenAI" value={`$ ${data.credits.toFixed(2)}`} color="var(--success)" />
      <StatCard icon="fa-fire" iconCls="warning" label="Gasto OpenAI (Mês)" value={`$ ${data.usage.toFixed(2)}`} color="var(--danger)" />
      <StatCard icon="fa-message" iconCls="info" label="Mensagens (total)" value={String(data.messages)} />
      <StatCard icon="fa-money-bill" iconCls="success" label="Pagamentos (total)" value={`R$ ${data.payments.toFixed(2)}`} />
    </div>
  );
}
