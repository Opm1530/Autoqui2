import { useEffect, useState } from 'react';
import { dbService } from '../../../services/db';
import { adminApi, type AdminMetrics } from '../../../services/adminApi';
import { SkeletonCards } from '../../components/Skeleton';

const brl = (n: number) => `R$ ${Number(n || 0).toFixed(2)}`;
const fmtInt = (n: number) => new Intl.NumberFormat('pt-BR').format(Math.round(n || 0));

function StatCard({ icon, iconCls, label, value, color, subtitle }: { icon: string; iconCls: string; label: string; value: string; color?: string; subtitle?: string }) {
  return (
    <div className="stats-card card">
      <div className={`stats-icon ${iconCls}`}><i style={{ color: '#ffffff8f' }} className={`fa-solid ${icon}`} /></div>
      <div className="stats-info">
        <span className="label">{label}</span><br />
        <span className="value" style={color ? { color } : undefined}>{value}</span>
        {subtitle && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{subtitle}</div>}
      </div>
    </div>
  );
}

// Donut simples (conic-gradient) com legenda.
function StatusDonut({ dist }: { dist: AdminMetrics['statusDist'] }) {
  const total = dist.reduce((s, d) => s + d.count, 0);
  let acc = 0;
  const stops = dist.map((d) => { const from = (acc / total) * 360; acc += d.count; const to = (acc / total) * 360; return `${d.color} ${from}deg ${to}deg`; }).join(', ');
  return (
    <div className="card viz-card">
      <div className="viz-head"><h4>Clientes por situação</h4></div>
      {total === 0 ? <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: 12 }}>Sem clientes ainda.</p> : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 14, flexWrap: 'wrap' }}>
          <div style={{ width: 130, height: 130, borderRadius: '50%', flexShrink: 0, background: `conic-gradient(${stops})`, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 18, borderRadius: '50%', background: 'var(--surface, #fff)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <strong style={{ fontSize: '1.5rem' }}>{fmtInt(total)}</strong>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>clientes</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 140 }}>
            {dist.map((d) => (
              <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: d.color, flexShrink: 0 }} />
                <span style={{ flex: 1 }}>{d.label}</span>
                <strong>{fmtInt(d.count)}</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Barras de receita por canal.
function RevenueBars({ data }: { data: AdminMetrics['receitaPorCanal'] }) {
  const max = Math.max(1, ...data.map((d) => d.valor));
  return (
    <div className="card viz-card">
      <div className="viz-head"><h4>Receita mensal por canal</h4></div>
      {data.length === 0 ? <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: 12 }}>Nenhuma assinatura ativa ainda.</p> : (
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {data.map((d) => (
            <div key={d.canal}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: 4 }}>
                <span>{d.canal}</span><strong style={{ color: 'var(--success)' }}>{brl(d.valor)}</strong>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: 'var(--surface-hover)' }}>
                <div style={{ height: '100%', width: `${(d.valor / max) * 100}%`, borderRadius: 999, background: 'var(--primary)' }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Barras de novos clientes por mês (últimos 6 meses).
function GrowthBars({ data }: { data: AdminMetrics['novosPorMes'] }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  const vazio = data.every((d) => d.count === 0);
  return (
    <div className="card viz-card">
      <div className="viz-head"><h4>Novos clientes por mês</h4></div>
      {vazio ? <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: 12 }}>O crescimento aparece aqui conforme novos clientes entram.</p> : (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 150, marginTop: 16 }}>
          {data.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{d.count || ''}</span>
              <div title={`${d.label}: ${d.count} novos`} style={{ width: '100%', maxWidth: 40, height: `${(d.count / max) * 100}%`, minHeight: d.count ? 4 : 0, background: 'var(--primary)', borderRadius: '5px 5px 0 0' }} />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{d.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [m, setM] = useState<AdminMetrics | null>(null);
  const [openai, setOpenai] = useState({ credits: 0, usage: 0 });

  useEffect(() => {
    (async () => {
      try {
        const [metrics, oa] = await Promise.all([
          adminApi.metrics().catch(() => null),
          dbService.get('settings', 'openai').catch(() => null) as any,
        ]);
        if (metrics) setM(metrics);
        setOpenai({ credits: oa?.credits || 0, usage: oa?.usage || 0 });
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, []);

  if (loading) return <SkeletonCards count={6} minWidth={220} lines={1} />;
  if (!m) return <p style={{ color: 'var(--text-muted)' }}>Não foi possível carregar as métricas.</p>;

  return (
    <>
      <div className="dashboard-grid">
        <StatCard icon="fa-building" iconCls="primary" label="Total de clientes" value={fmtInt(m.totalClientes)} subtitle={`${fmtInt(m.emTeste)} em teste`} />
        <StatCard icon="fa-circle-check" iconCls="success" label="Pagantes" value={fmtInt(m.pagantes)} color="var(--success)" subtitle={m.isentos > 0 ? `${fmtInt(m.isentos)} isentos` : undefined} />
        <StatCard icon="fa-sack-dollar" iconCls="success" label="Receita mensal (assinaturas)" value={brl(m.mrr)} color="var(--success)" subtitle={`Ticket médio ${brl(m.ticketMedio)}`} />
        <StatCard icon="fa-triangle-exclamation" iconCls="warning" label="Bloqueados / pendentes" value={fmtInt(m.bloqueados)} color={m.bloqueados > 0 ? 'var(--danger)' : undefined} />
        <StatCard icon="fa-dollar-sign" iconCls="info" label="Créditos OpenAI" value={`$ ${openai.credits.toFixed(2)}`} />
        <StatCard icon="fa-fire" iconCls="warning" label="Gasto OpenAI (mês)" value={`$ ${openai.usage.toFixed(2)}`} color="var(--danger)" />
      </div>

      <div className="dash-viz" style={{ marginTop: '1.25rem' }}>
        <div className="dash-col" style={{ flex: 1 }}><GrowthBars data={m.novosPorMes} /></div>
        <div className="dash-col" style={{ flex: 1 }}><StatusDonut dist={m.statusDist} /></div>
        <div className="dash-col" style={{ flex: 1 }}><RevenueBars data={m.receitaPorCanal} /></div>
      </div>
    </>
  );
}
