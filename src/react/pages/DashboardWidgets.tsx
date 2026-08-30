import { Link } from 'react-router-dom';

// Formatação BR (apresentação apenas).
export const fmtInt = (n: number) => n.toLocaleString('pt-BR');
export const fmtBRL = (n: number) => 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtDate = (d: Date) => (isNaN(d.getTime()) ? '—' : `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`);
const pad = (n: number) => String(n).padStart(2, '0');

// Status de pedido → rótulo + cor.
const STATUS: Record<string, { label: string; cls: string }> = {
  em_montagem: { label: 'Em montagem', cls: 'warning' },
  aguardando_pagamento: { label: 'Aguard. pagamento', cls: 'warning' },
  em_preparo: { label: 'Em preparo', cls: 'info' },
  pedido_pronto: { label: 'Pronto', cls: 'info' },
  saiu_para_entrega: { label: 'Saiu p/ entrega', cls: 'info' },
  finalizado: { label: 'Finalizado', cls: 'success' },
  cancelado: { label: 'Cancelado', cls: 'danger' },
};

const DONUT_COLORS = ['#84cc16', '#14532d', '#f59e0b', '#65a30d', '#9ca3af'];

// ── Barras verticais: pedidos recebidos vs pagos por mês ──
export function MonthlyBars({ data }: { data: { label: string; recebidos: number; pagos: number }[] }) {
  const max = Math.max(1, ...data.flatMap((d) => [d.recebidos, d.pagos]));
  return (
    <div className="card viz-card">
      <div className="viz-head">
        <h4>Pedidos por mês</h4>
        <div className="viz-legend">
          <span><i className="viz-dot" style={{ background: '#14532d' }} /> Recebidos</span>
          <span><i className="viz-dot" style={{ background: '#84cc16' }} /> Pagos</span>
        </div>
      </div>
      <div className="mbars">
        {data.map((d, i) => (
          <div key={i} className="mbars-col">
            <div className="mbars-bars">
              <div className="mbar" style={{ height: `${(d.recebidos / max) * 100}%`, background: '#14532d' }} title={`Recebidos: ${d.recebidos}`}>
                <span className="mbar-num">{d.recebidos}</span>
              </div>
              <div className="mbar" style={{ height: `${(d.pagos / max) * 100}%`, background: '#84cc16' }} title={`Pagos: ${d.pagos}`}>
                <span className="mbar-num">{d.pagos}</span>
              </div>
            </div>
            <span className="mbars-label">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Donut: pedidos por bairro (top N + Outros) ──
export function BairroDonut({ items, total }: { items: { name: string; count: number }[]; total: number }) {
  const sum = items.reduce((s, i) => s + i.count, 0) || 1;
  const R = 60, C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <div className="card viz-card">
      <div className="viz-head"><h4>Pedidos por bairro</h4></div>
      {items.length === 0 ? (
        <p className="viz-empty">Sem pedidos com bairro ainda.</p>
      ) : (
        <div className="donut-wrap">
          <div className="donut-graph">
            <svg viewBox="0 0 160 160" className="donut-svg">
              <circle cx="80" cy="80" r={R} fill="none" stroke="var(--surface-hover)" strokeWidth="18" />
              {items.map((it, i) => {
                const dash = (it.count / sum) * C;
                const el = (
                  <circle key={i} cx="80" cy="80" r={R} fill="none" stroke={DONUT_COLORS[i % DONUT_COLORS.length]}
                    strokeWidth="18" strokeDasharray={`${dash} ${C - dash}`} strokeDashoffset={-acc}
                    transform="rotate(-90 80 80)" strokeLinecap="butt" />
                );
                acc += dash;
                return el;
              })}
            </svg>
            <div className="donut-center"><span className="donut-total">{fmtInt(total)}</span><span className="donut-cap">pedidos</span></div>
          </div>
          <div className="donut-legend">
            {items.map((it, i) => (
              <div key={i} className="donut-leg-row">
                <i className="viz-dot" style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} />
                <span className="donut-leg-name">{it.name}</span>
                <b>{Math.round((it.count / sum) * 100)}%</b>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Barras horizontais: melhores horários ──
export function BestHours({ data }: { data: [number, number][] }) {
  const max = data[0]?.[1] || 1;
  return (
    <div className="card viz-card">
      <div className="viz-head"><h4>Melhores horários</h4></div>
      {data.length === 0 ? (
        <p className="viz-empty">Nenhum pedido registrado ainda.</p>
      ) : (
        <div className="hbars">
          {data.map(([h, c]) => (
            <div key={h} className="hbar-row">
              <span className="hbar-label">{pad(h)}h–{pad(h + 1)}h</span>
              <div className="hbar-track"><div className="hbar-fill" style={{ width: `${(c / max) * 100}%` }} /></div>
              <span className="hbar-val">{c}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Lista: últimos pedidos ──
export function RecentOrders({ items }: { items: { nome: string; value: number; data: Date; status: string }[] }) {
  return (
    <div className="card viz-card">
      <div className="viz-head"><h4>Últimos pedidos</h4></div>
      {items.length === 0 ? (
        <p className="viz-empty">Nenhum pedido ainda.</p>
      ) : (
        <div className="recent-list">
          {items.map((o, i) => {
            const st = STATUS[o.status] || { label: o.status, cls: 'info' };
            return (
              <div key={i} className="recent-row">
                <div className="recent-av">{(o.nome || 'C')[0].toUpperCase()}</div>
                <div className="recent-info">
                  <div className="recent-name">{o.nome}</div>
                  <div className="recent-date">{fmtDate(o.data)}</div>
                </div>
                <div className="recent-right">
                  <div className={`recent-status ${st.cls}`}>{st.label}</div>
                  <div className="recent-value">{fmtBRL(o.value)}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Card de status da assinatura ──
export function SubscriptionCard({ sub }: { sub: any }) {
  const a = sub?.assinatura;
  const emTrial = !!sub?.emTrial;
  const bloqueada = !!sub?.bloqueada;
  const statusMap: Record<string, { label: string; cls: string }> = {
    authorized: { label: 'Ativa', cls: 'success' },
    trial: { label: 'Em teste', cls: 'info' },
    pending: { label: 'Pendente', cls: 'warning' },
    cancelled: { label: 'Cancelada', cls: 'danger' },
    rejected: { label: 'Recusada', cls: 'danger' },
  };
  const key = bloqueada ? 'cancelled' : emTrial ? 'trial' : (a?.status || 'pending');
  const st = statusMap[key] || { label: key, cls: 'info' };

  return (
    <div className="card sub-card">
      <div className="viz-head"><h4>Assinatura</h4><span className={`badge ${st.cls}`}>{st.label}</span></div>
      <div className="sub-plan">{a?.planoNome || 'Plano'}</div>
      {a?.valor != null && <div className="sub-valor">{fmtBRL(a.valor)}<span>/mês</span></div>}
      {emTrial && <p className="sub-note">Teste grátis — {sub.diasRestantesTrial} dia(s) restantes.</p>}
      {bloqueada && <p className="sub-note danger">Pagamento pendente. Regularize para não perder o acesso.</p>}
      <Link to="/billing" className="btn-secondary sub-btn">Gerenciar assinatura</Link>
    </div>
  );
}
