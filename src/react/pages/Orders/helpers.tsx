// Helpers de pedidos portados pro React (badges viram JSX; mesmo visual).
import type { ReactNode } from 'react';

export const STATUS_CONFIG: Record<string, { label: string; cls: string; icon: string }> = {
  em_montagem: { label: 'Em Montagem', cls: 'badge warning', icon: 'fa-cart-shopping' },
  aguardando_pagamento: { label: 'Aguard. Pagamento', cls: 'badge info', icon: 'fa-credit-card' },
  em_preparo: { label: 'Em Preparo', cls: 'badge primary', icon: 'fa-utensils' },
  pedido_pronto: { label: 'Pronto p/ Retirada', cls: 'badge success', icon: 'fa-box' },
  saiu_para_entrega: { label: 'Saiu p/ Entrega', cls: 'badge success', icon: 'fa-truck' },
  finalizado: { label: 'Finalizado', cls: 'badge success', icon: 'fa-check' },
  cancelado: { label: 'Cancelado', cls: 'badge danger', icon: 'fa-xmark' },
};

// Estilo base compartilhado: no modo compacto mostra só o ícone (com tooltip).
function badge(cls: string, style: any, icon: string, label: string, compact?: boolean, iconIsBrand = false) {
  const iconCls = iconIsBrand ? icon : `fa-solid ${icon}`;
  return (
    <span className={cls} title={compact ? label : undefined}
      style={{ fontSize: '0.7rem', padding: compact ? '0.28rem 0.42rem' : '0.2rem 0.5rem', ...style }}>
      <i className={iconCls} style={{ fontSize: '0.7rem' }} />{!compact && <> {label}</>}
    </span>
  );
}

export function StatusBadge({ status, compact }: { status: string; compact?: boolean }) {
  const s = (status || 'em_montagem').toLowerCase();
  const cfg = STATUS_CONFIG[s] || { label: status || 'Pendente', cls: 'badge secondary', icon: 'fa-question' };
  return badge(cfg.cls, {}, cfg.icon, cfg.label, compact);
}

export function DeliveryBadge({ entrega, compact }: { entrega: string; compact?: boolean }) {
  if (entrega === 'retirada') {
    return badge('badge info', { background: 'rgba(132,204,22,0.12)', color: 'var(--primary-hover)', border: '1px solid rgba(132,204,22,0.3)' }, 'fa-store', 'Retirada', compact);
  }
  return badge('badge info', { background: 'rgba(132,204,22,0.12)', color: 'var(--primary-hover)', border: '1px solid rgba(132,204,22,0.3)' }, 'fa-truck', 'Entrega', compact);
}

export function PaymentBadge({ order, compact }: { order: any; compact?: boolean }): ReactNode {
  const payment = (order.pagamento || order.formaPagamento || '').toLowerCase().trim();
  if (!payment) return badge('badge secondary', { opacity: 0.5 }, 'fa-clock', 'Pendente', compact);

  const isLink = payment.includes('link');
  const isPix = payment.includes('pagamento_no_pix');
  const isEntrega = payment.includes('entrega') || payment.includes('dinheiro') || payment.includes('maquininha');

  if (isLink) {
    return badge('badge info', { background: 'rgba(132,204,22,0.12)', color: 'var(--primary-hover)', border: '1px solid rgba(132,204,22,0.3)' }, 'fa-link', 'Link', compact);
  }
  if (isPix) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        {badge('badge info', { background: 'rgba(132,204,22,0.12)', color: 'var(--primary-hover)', border: '1px solid rgba(132,204,22,0.3)' }, 'fa-brands fa-pix', 'PIX', compact, true)}
        {order.estornado === true
          ? badge('badge', { background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }, 'fa-rotate-left', 'ESTORNADO', compact)
          : order.pago === true
          ? badge('badge success', { background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }, 'fa-circle-check', 'PAGO', compact)
          : null}
      </span>
    );
  }
  if (isEntrega) {
    const sub = order.paymentSubMethod === 'dinheiro' ? 'Dinheiro' : order.paymentSubMethod === 'cartao' ? 'Cartão' : '';
    return badge('badge info', { background: 'rgba(132,204,22,0.12)', color: 'var(--primary-hover)', border: '1px solid rgba(132,204,22,0.3)' }, 'fa-hand-holding-dollar', `Na Entrega${sub ? ` · ${sub}` : ''}`, compact);
  }
  return badge('badge secondary', {}, 'fa-money-bill', payment, compact);
}

export function formatDate(date: any): string {
  if (!date) return '-';
  if (date.toDate) return date.toDate().toLocaleString('pt-BR');
  return new Date(date).toLocaleString('pt-BR');
}

// Data relativa: "Hoje 15:58", "Ontem 09:12", "3 dias atrás".
export function relativeDate(date: any): string {
  if (!date) return '-';
  const d = date.toDate ? date.toDate() : new Date(date);
  if (isNaN(d.getTime())) return '-';
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round((startToday.getTime() - startDate.getTime()) / 86400000);
  const hhmm = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  if (diffDays === 0) return `Hoje ${hhmm}`;
  if (diffDays === 1) return `Ontem ${hhmm}`;
  if (diffDays > 1) return `${diffDays} dias atrás`;
  return d.toLocaleDateString('pt-BR');
}

function isToday(date: any): boolean {
  if (!date) return false;
  const d = date.toDate ? date.toDate() : new Date(date);
  const now = new Date();
  return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

export function isOrderArchived(order: any): boolean {
  if (order.arquivado) return true;
  const status = (order.status || 'em_montagem').toLowerCase();
  const terminal = status === 'finalizado' || status === 'cancelado';
  return terminal && !isToday(order.criadoEm || order.createdAt);
}

export const isPendingPayment = (o: any) => o.pendentePagamento === true && o.pago !== true;

export const FILTERS = [
  { key: 'todos', label: 'Todos' },
  { key: 'em_montagem', label: 'Em Montagem', icon: 'fa-cart-shopping' },
  { key: 'aguardando_pagamento', label: 'Pag. Pendente', icon: 'fa-credit-card' },
  { key: 'em_preparo', label: 'Em Preparo', icon: 'fa-utensils' },
  { key: 'pedido_pronto', label: 'Prontos', icon: 'fa-box' },
  { key: 'saiu_para_entrega', label: 'Em Entrega', icon: 'fa-truck' },
  { key: 'finalizado', label: 'Finalizados', icon: 'fa-check' },
  { key: 'arquivados', label: 'Arquivados', icon: 'fa-box-archive' },
];

// Próximo passo do fluxo de status (mesma lógica do painel atual).
export function nextAction(order: any): { target: string; label: string; icon: string } | null {
  const status = (order.status || 'em_montagem').toLowerCase();
  const isWithdrawal = order.entrega === 'retirada';
  const pm = (order.pagamento || order.formaPagamento || '').toLowerCase();
  const isPayOnDelivery = pm.includes('entrega') || pm.includes('dinheiro') || pm.includes('maquininha');
  switch (status) {
    case 'em_montagem':
      return { target: (isPayOnDelivery || order.pago) ? 'em_preparo' : 'aguardando_pagamento', label: 'Aceitar Pedido', icon: 'fa-check' };
    case 'aguardando_pagamento':
      return { target: 'em_preparo', label: 'Confirmar Pagamento', icon: 'fa-credit-card' };
    case 'em_preparo':
      return isWithdrawal
        ? { target: 'pedido_pronto', label: 'Pedido Pronto', icon: 'fa-box' }
        : { target: 'saiu_para_entrega', label: 'Saiu para Entrega', icon: 'fa-truck' };
    case 'pedido_pronto':
      return { target: 'finalizado', label: 'Entregue', icon: 'fa-flag-checkered' };
    case 'saiu_para_entrega':
      return { target: 'finalizado', label: 'Entregue', icon: 'fa-flag-checkered' };
    default:
      return null;
  }
}
