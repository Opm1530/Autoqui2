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

export function StatusBadge({ status }: { status: string }) {
  const s = (status || 'em_montagem').toLowerCase();
  const cfg = STATUS_CONFIG[s] || { label: status || 'Pendente', cls: 'badge secondary', icon: 'fa-question' };
  return <span className={cfg.cls}><i className={`fa-solid ${cfg.icon}`} /> {cfg.label}</span>;
}

export function DeliveryBadge({ entrega }: { entrega: string }) {
  if (entrega === 'retirada') {
    return <span className="badge secondary" style={{ background: 'rgba(139,92,246,0.1)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)', fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}><i className="fa-solid fa-store" style={{ fontSize: '0.6rem' }} /> Retirada</span>;
  }
  return <span className="badge info" style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)', fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}><i className="fa-solid fa-truck" style={{ fontSize: '0.6rem' }} /> Entrega</span>;
}

export function PaymentBadge({ order }: { order: any }): ReactNode {
  const payment = (order.pagamento || order.formaPagamento || '').toLowerCase().trim();
  if (!payment) return <span className="badge secondary" style={{ opacity: 0.5, fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>Pendente</span>;

  const isLink = payment.includes('link');
  const isPix = payment.includes('pagamento_no_pix');
  const isEntrega = payment.includes('entrega') || payment.includes('dinheiro') || payment.includes('maquininha');

  if (isLink) {
    return <span className="badge info" style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)', fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}><i className="fa-solid fa-link" style={{ fontSize: '0.6rem' }} /> Link</span>;
  }
  if (isPix) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <span className="badge info" style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)', fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}><i className="fa-brands fa-pix" style={{ fontSize: '0.6rem' }} /> PIX</span>
        {order.estornado === true ? (
          <span className="badge" style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)', fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}><i className="fa-solid fa-rotate-left" style={{ fontSize: '0.6rem' }} /> ESTORNADO</span>
        ) : order.pago === true ? (
          <span className="badge success" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)', fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}><i className="fa-solid fa-circle-check" style={{ fontSize: '0.6rem' }} /> PAGO</span>
        ) : null}
      </span>
    );
  }
  if (isEntrega) {
    const sub = order.paymentSubMethod === 'dinheiro' ? 'Dinheiro' : order.paymentSubMethod === 'cartao' ? 'Cartão' : '';
    return (
      <span className="badge warning" style={{ background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.2)', fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>
        <i className="fa-solid fa-hand-holding-dollar" style={{ fontSize: '0.6rem' }} /> Na Entrega{sub ? ` · ${sub}` : ''}
      </span>
    );
  }
  return <span className="badge secondary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>{payment}</span>;
}

export function formatDate(date: any): string {
  if (!date) return '-';
  if (date.toDate) return date.toDate().toLocaleString('pt-BR');
  return new Date(date).toLocaleString('pt-BR');
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
