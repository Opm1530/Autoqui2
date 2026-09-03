import { Link } from 'react-router-dom';

// Formatação BR (apresentação apenas).
export const fmtInt = (n: number) => n.toLocaleString('pt-BR');
export const fmtBRL = (n: number) => 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pad = (n: number) => String(n).padStart(2, '0');

// Data relativa: Hoje / Ontem / há N dias / dd/mm.
const fmtDate = (d: Date) => {
  if (isNaN(d.getTime())) return '—';
  const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  const dd = new Date(d); dd.setHours(0, 0, 0, 0);
  const diff = Math.round((hoje.getTime() - dd.getTime()) / 86400000);
  if (diff <= 0) return 'Hoje';
  if (diff === 1) return 'Ontem';
  if (diff < 7) return `há ${diff} dias`;
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
};

// Rótulo do status; cor só verde (finalizado) ou neutra (preto), estilo referência.
const STATUS_LABEL: Record<string, string> = {
  em_montagem: 'Em montagem',
  aguardando_pagamento: 'Aguard. pagamento',
  em_preparo: 'Em preparo',
  pedido_pronto: 'Pronto',
  saiu_para_entrega: 'Saiu p/ entrega',
  finalizado: 'Finalizado',
  cancelado: 'Cancelado',
};

const DONUT_COLORS = ['#84cc16', '#14532d', '#f59e0b', '#65a30d', '#9ca3af'];
// Ícones de vendas (variados) pros avatares da lista de pedidos.
const ORDER_ICONS = ['fa-bag-shopping', 'fa-box', 'fa-cart-shopping', 'fa-receipt', 'fa-tag', 'fa-basket-shopping'];

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
        <div className="mbars-plot">
          {data.map((d, i) => (
            <div key={i} className="mbars-group">
              <div className="mbar" style={{ height: `${(d.recebidos / max) * 100}%`, background: '#14532d' }} title={`Recebidos: ${d.recebidos}`}>
                <span className="mbar-num">{d.recebidos}</span>
              </div>
              <div className="mbar" style={{ height: `${(d.pagos / max) * 100}%`, background: '#84cc16' }} title={`Pagos: ${d.pagos}`}>
                <span className="mbar-num">{d.pagos}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mbars-labels">
          {data.map((d, i) => <span key={i}>{d.label}</span>)}
        </div>
      </div>
    </div>
  );
}

// ── Donut: pedidos por bairro (top N + Outros) ──
export function BairroDonut({ items, total, title = 'Pedidos por bairro', emptyText = 'Sem pedidos com bairro ainda.' }: { items: { name: string; count: number }[]; total: number; title?: string; emptyText?: string }) {
  const sum = items.reduce((s, i) => s + i.count, 0) || 1;
  const R = 60, C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <div className="card viz-card">
      <div className="viz-head"><h4>{title}</h4></div>
      {items.length === 0 ? (
        <p className="viz-empty">{emptyText}</p>
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
      <div className="viz-head"><h4>Melhores horários</h4><i className="viz-more fa-solid fa-ellipsis" /></div>
      {data.length === 0 ? (
        <p className="viz-empty">Nenhum pedido registrado ainda.</p>
      ) : (
        <div className="sreport">
          {data.map(([h, c]) => (
            <div key={h} className="sreport-row">
              <div className="sreport-label">{pad(h)}h–{pad(h + 1)}h <b>({c})</b></div>
              <div className="sreport-bar" style={{ width: `${Math.max(8, (c / max) * 100)}%` }} />
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
      <div className="viz-head"><h4>Últimos pedidos</h4><i className="viz-more fa-solid fa-ellipsis" /></div>
      {items.length === 0 ? (
        <p className="viz-empty">Nenhum pedido ainda.</p>
      ) : (
        <div className="recent-list">
          {items.map((o, i) => {
            const label = STATUS_LABEL[o.status] || o.status;
            const ok = o.status === 'finalizado';
            return (
              <div key={i} className="recent-row">
                <div className="recent-av"><i className={`fa-solid ${ORDER_ICONS[i % ORDER_ICONS.length]}`} /></div>
                <div className="recent-info">
                  <div className="recent-name">{o.nome}</div>
                  <div className="recent-date">{fmtDate(o.data)}</div>
                </div>
                <div className="recent-right">
                  <div className={'recent-status' + (ok ? ' ok' : '')}>{label}</div>
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

// ── Card de assinatura (estilo promo, ref. Siohioma) ──
export function SubscriptionCard({ sub }: { sub: any }) {
  const a = sub?.assinatura;
  const emTrial = !!sub?.emTrial;
  const bloqueada = !!sub?.bloqueada;
  const statusMap: Record<string, { label: string; cls: string }> = {
    authorized: { label: 'Ativa', cls: 'success' },
    pix: { label: 'Ativa · PIX', cls: 'success' },
    trial: { label: 'Em teste', cls: 'info' },
    pending: { label: 'Pendente', cls: 'warning' },
    cancelled: { label: 'Cancelada', cls: 'danger' },
    rejected: { label: 'Recusada', cls: 'danger' },
  };
  // PIX pago libera 30 dias via pixPagoAte, mesmo com status cru "pending".
  const pixRaw = a?.pixPagoAte;
  const pixMs = !pixRaw ? null : typeof pixRaw === 'number' ? pixRaw : typeof pixRaw === 'string' ? new Date(pixRaw).getTime() : (pixRaw._seconds ?? pixRaw.seconds) ? (pixRaw._seconds ?? pixRaw.seconds) * 1000 : null;
  const pixAtivo = !!(pixMs && Date.now() < pixMs);
  const key = bloqueada ? 'cancelled' : pixAtivo ? 'pix' : emTrial ? 'trial' : (a?.status || 'pending');
  const st = statusMap[key] || { label: key, cls: 'info' };

  const title = bloqueada ? 'Regularize sua assinatura'
    : emTrial ? 'Você está no período de teste'
      : (key === 'authorized' || key === 'pix') ? 'Sua assinatura está ativa'
        : 'Ative sua assinatura';
  const subtitle = bloqueada ? 'Pagamento pendente — regularize para não perder o acesso ao painel.'
    : emTrial ? `Teste grátis — ${sub?.diasRestantesTrial ?? 0} dia(s) restantes.`
      : a?.valor != null ? `${a?.planoNome || 'Seu plano'} · ${fmtBRL(a.valor)}/mês` : 'Gerencie seu plano e forma de pagamento.';

  return (
    <div className="card sub-promo">
      <div className="sub-rays" />
      <div className="sub-promo-head">
        <div className="sub-logo"><i className="fa-solid fa-crown" /></div>
        <span className={`badge ${st.cls}`}>{st.label}</span>
      </div>
      <h3 className="sub-promo-title">{title}</h3>
      <p className="sub-promo-sub">{subtitle}</p>
      <Link to="/billing" className="sub-cta">Gerenciar assinatura</Link>
    </div>
  );
}
