import { useEffect, useMemo, useState } from 'react';
import { ecommerceApi } from '../../services/ecommerceApi';
import { SkeletonCards } from '../components/Skeleton';

const brl = (v: number) => `R$ ${Number(v || 0).toFixed(2)}`;
const SEG_COLOR: Record<string, string> = { campeao: '#f59e0b', fiel: '#22c55e', novo: '#6366f1', ocasional: '#0ea5e9', risco: '#f97316', perdido: '#ef4444' };
const RISK: Record<string, { label: string; color: string }> = { baixo: { label: 'Baixo', color: '#22c55e' }, medio: { label: 'Médio', color: '#f59e0b' }, alto: { label: 'Alto', color: '#ef4444' } };

export function EcommerceCRM() {
  const [days, setDays] = useState(365);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [seg, setSeg] = useState('');

  useEffect(() => { setLoading(true); ecommerceApi.crm(days).then((d) => { setData(d); setLoading(false); }).catch(() => setLoading(false)); }, [days]);

  const filtered = useMemo(() => {
    let list = (data?.customers || []) as any[];
    if (seg) list = list.filter((c) => c.segment === seg);
    const t = search.trim().toLowerCase();
    if (t) list = list.filter((c) => (c.name || '').toLowerCase().includes(t) || (c.phone || '').includes(t) || (c.email || '').toLowerCase().includes(t));
    return list;
  }, [data, seg, search]);

  if (loading) return <SkeletonCards count={4} lines={1} />;
  if (!data?.connected) return <p style={{ color: 'var(--text-muted)' }}>Conecte a loja para ver os dados.</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', marginBottom: '1rem' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', alignSelf: 'center' }}>{data.totalCustomers} clientes no período</div>
        <select className="config-select" style={{ width: 'auto' }} value={days} onChange={(e) => setDays(Number(e.target.value))}>
          <option value={90}>90 dias</option><option value={180}>180 dias</option><option value={365}>Último ano</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {(data.segments || []).map((s: any) => (
          <button key={s.key} onClick={() => setSeg(seg === s.key ? '' : s.key)}
            className="card" style={{ textAlign: 'left', cursor: 'pointer', border: seg === s.key ? `1px solid ${SEG_COLOR[s.key]}` : undefined, padding: '0.9rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: SEG_COLOR[s.key] }}>{s.label}</div>
            <div style={{ fontWeight: 800, fontSize: '1.4rem' }}>{s.count}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{brl(s.revenue)}</div>
          </button>
        ))}
      </div>

      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <i className="fa-solid fa-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
        <input className="config-input" style={{ paddingLeft: 36 }} placeholder="Buscar por nome, telefone ou e-mail..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead><tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
            <th style={{ padding: '10px 12px' }}>Cliente</th><th>Segmento</th><th>Pedidos</th><th>Total</th><th>Último</th><th>Score</th><th>Risco</th><th></th>
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? <tr><td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Nenhum cliente.</td></tr>
              : filtered.slice(0, 200).map((c, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '10px 12px' }}><div style={{ fontWeight: 600 }}>{c.name}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.phone || c.email}</div></td>
                  <td><span style={{ color: SEG_COLOR[c.segment], fontWeight: 600 }}>{(data.segments.find((s: any) => s.key === c.segment) || {}).label || c.segment}</span></td>
                  <td>{c.orders}</td>
                  <td>{brl(c.total)}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{c.recencyDays >= 999 ? '—' : `${c.recencyDays}d`}</td>
                  <td><strong>{c.score}</strong></td>
                  <td><span style={{ color: RISK[c.risk]?.color }}>{RISK[c.risk]?.label || c.risk}</span></td>
                  <td>{c.phone && <a href={`https://wa.me/${c.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" style={{ color: '#25d366' }}><i className="fa-brands fa-whatsapp" /></a>}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
