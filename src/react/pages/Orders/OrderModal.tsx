import { useState } from 'react';
import { orderService } from '../../../services/orderService';
import { toast } from '../../../services/toast';
import { StatusBadge, DeliveryBadge, PaymentBadge, nextAction } from './helpers';

interface Props {
  order: any;
  companyId: string;
  storeName: string;
  clientName: string;
  clientPhone: string;
  onClose: () => void;
}

export function OrderModal({ order, companyId, storeName, clientName, clientPhone, onClose }: Props) {
  const [busy, setBusy] = useState(false);
  const status = (order.status || 'em_montagem').toLowerCase();
  const isTerminal = status === 'finalizado' || status === 'cancelado';
  const action = nextAction(order);

  const itens = Array.isArray(order.itens)
    ? order.itens
    : Array.isArray(order.items)
    ? order.items.map((i: any) => ({ item: i.item || i.name, quantidade: i.quantidade || i.qty || 1, preco: i.preco || i.price || 0, observacao: i.observacao }))
    : [];

  const taxa = parseFloat(order.taxaAplicada || order.taxaEntrega || 0) || 0;
  const desconto = parseFloat(order.desconto || 0) || 0;
  const subtotal = itens.reduce((s: number, i: any) => s + (parseFloat(i.preco) || 0) * (parseInt(i.quantidade) || 1), 0);

  async function advance(target: string) {
    setBusy(true);
    try {
      await orderService.updateOrderStatus(order, companyId, target as any);
      toast.success('Status atualizado!');
      onClose();
    } catch (err: any) {
      toast.error('Erro: ' + (err.message || err));
      setBusy(false);
    }
  }

  async function cancel() {
    const reason = window.prompt('Motivo do cancelamento (opcional):') ?? undefined;
    if (reason === undefined) return; // cancelou o prompt
    setBusy(true);
    try {
      await orderService.updateOrderStatus(order, companyId, 'cancelado' as any, reason || undefined);
      toast.success('Pedido cancelado.');
      onClose();
    } catch (err: any) {
      toast.error('Erro ao cancelar: ' + (err.message || err));
      setBusy(false);
    }
  }

  async function archive() {
    setBusy(true);
    try {
      await orderService.archiveOrder(order.id);
      toast.success('Pedido arquivado.');
      onClose();
    } catch (err: any) {
      toast.error('Erro ao arquivar: ' + (err.message || err));
      setBusy(false);
    }
  }

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content glass lead-modal-content order-modal-wide">
        {/* Header */}
        <div className="lead-modal-header">
          <div className="lead-modal-avatar">{(clientName[0] || 'C').toUpperCase()}</div>
          <div className="lead-modal-title">
            <h2>{clientName}</h2>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              #{order.id.slice(-6).toUpperCase()} · {storeName}
            </span>
          </div>
          <button id="close-order-modal" className="close-modal" onClick={onClose}>&times;</button>
        </div>

        <div className="lead-modal-body">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <StatusBadge status={status} />
            <DeliveryBadge entrega={order.entrega || 'entrega'} />
            <PaymentBadge order={order} />
          </div>

          {/* 2 colunas: itens à esquerda, resumo à direita */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {/* Itens */}
            <div style={{ flex: '2 1 320px', minWidth: 0 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Itens do pedido</div>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                {itens.length > 0 ? itens.map((i: any, idx: number) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', borderBottom: idx < itens.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <div>
                      <span style={{ fontWeight: 600 }}>{i.quantidade}x {i.item}</span>
                      {i.observacao && <small style={{ display: 'block', color: 'var(--text-dim)' }}>Obs: {i.observacao}</small>}
                    </div>
                    <span style={{ color: 'var(--primary)', fontWeight: 700, whiteSpace: 'nowrap' }}>R$ {(i.preco || 0).toFixed(2)}</span>
                  </div>
                )) : <p style={{ padding: '1.25rem', textAlign: 'center', color: 'var(--text-muted)' }}>Sem itens listados.</p>}
              </div>
            </div>

            {/* Resumo: contato + valores */}
            <div style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Contato</div>
                <div className="card" style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.8, padding: '0.9rem 1rem' }}>
                  <div><i className="fa-solid fa-phone" style={{ width: 18 }} /> {clientPhone || '—'}</div>
                  {order.entrega !== 'retirada' && (
                    <div><i className="fa-solid fa-location-dot" style={{ width: 18 }} /> {order.endereco || 'Sem endereço'}{order.bairro ? ` — ${order.bairro}` : ''}</div>
                  )}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Resumo</div>
                <div className="card" style={{ padding: '0.9rem 1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  {taxa > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-truck" style={{ marginRight: 4 }} /> Taxa de entrega</span><span>R$ {taxa.toFixed(2)}</span>
                    </div>
                  )}
                  {desconto > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.9rem', color: '#34d399' }}>
                      <span><i className="fa-solid fa-tag" style={{ marginRight: 4 }} /> Desconto</span><span>- R$ {desconto.toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0 0', marginTop: 6, borderTop: '1px solid var(--border-color)', fontWeight: 800, fontSize: '1.05rem' }}>
                    <span>Total</span><span style={{ color: 'var(--primary)' }}>R$ {(order.value || order.total || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="lead-modal-footer" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {!isTerminal && action && (
            <button className="btn-lead-action" disabled={busy} onClick={() => advance(action.target)}>
              <i className={`fa-solid ${action.icon}`} /> {busy ? '...' : action.label}
            </button>
          )}
          {!isTerminal && (status === 'em_montagem' || status === 'aguardando_pagamento') && (
            <button className="btn-lead-action danger" disabled={busy} onClick={cancel}>
              <i className="fa-solid fa-xmark" /> {order.pago ? 'Recusar e Estornar' : 'Cancelar Pedido'}
            </button>
          )}
          {!isTerminal && (
            <a href={`https://wa.me/${(clientPhone || '').replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
              className="btn-lead-action" style={{ background: 'rgba(37,211,102,0.15)', borderColor: 'rgba(37,211,102,0.4)', color: '#25d366', textDecoration: 'none' }}>
              <i className="fa-brands fa-whatsapp" /> WhatsApp
            </a>
          )}
          {isTerminal && !order.arquivado && (
            <button className="btn-lead-action" disabled={busy} onClick={archive}>
              <i className="fa-solid fa-box-archive" /> Arquivar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
