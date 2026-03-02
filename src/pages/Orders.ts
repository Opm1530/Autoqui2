import { dbService } from '../services/db';
import { authService } from '../services/auth';
import { toast } from '../services/toast';
import { confirm } from '../services/confirm';
import { orderService } from '../services/orderService';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Store {
    id: string;
    name: string;
}

interface Lead {
    id: string;
    nome?: string;
    name?: string;
    telefone: string;
    empresaId: string;
}

// ─── Status Helpers ───────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; cls: string; icon: string }> = {
    em_montagem: { label: 'Em Montagem', cls: 'badge warning', icon: '<i class="fa-solid fa-cart-shopping"></i>' },
    aguardando_pagamento: { label: 'Aguard. Pagamento', cls: 'badge info', icon: '<i class="fa-solid fa-credit-card"></i>' },
    em_preparo: { label: 'Em Preparo', cls: 'badge primary', icon: '<i class="fa-solid fa-utensils"></i>' },
    saiu_para_entrega: { label: 'Saiu p/ Entrega', cls: 'badge success', icon: '<i class="fa-solid fa-truck"></i>' },
    finalizado: { label: 'Finalizado', cls: 'badge success', icon: '<i class="fa-solid fa-check"></i>' },
    cancelado: { label: 'Cancelado', cls: 'badge danger', icon: '<i class="fa-solid fa-xmark"></i>' },
};

function getStatusBadge(status: string): string {
    const s = (status || 'em_montagem').toLowerCase();
    const cfg = STATUS_CONFIG[s] || { label: status || 'Pendente', cls: 'badge secondary', icon: '<i class="fa-solid fa-question"></i>' };
    return `<span class="${cfg.cls}">${cfg.icon} ${cfg.label}</span>`;
}

function formatDate(date: any): string {
    if (!date) return '-';
    if (date.toDate) return date.toDate().toLocaleString('pt-BR');
    return new Date(date).toLocaleString('pt-BR');
}

// ─── Filter helpers ───────────────────────────────────────────────────────────

const FILTERS = [
    { key: 'todos', label: 'Todos' },
    { key: 'em_montagem', label: '<i class="fa-solid fa-cart-shopping"></i> Em Montagem' },
    { key: 'aguardando_pagamento', label: '<i class="fa-solid fa-credit-card"></i> Pag. Pendente' },
    { key: 'em_preparo', label: '<i class="fa-solid fa-utensils"></i> Em Preparo' },
    { key: 'saiu_para_entrega', label: '<i class="fa-solid fa-truck"></i> Em Entrega' },
    { key: 'finalizado', label: '<i class="fa-solid fa-check"></i> Finalizados' },
];

function getPaymentBadge(payment: string, comprovanteUrl?: string, empresaId?: string): string {
    if (!payment) return `<span class="badge secondary" style="opacity: 0.5; font-size: 0.7rem; padding: 0.2rem 0.5rem;">Pendente</span>`;

    const p = payment.toLowerCase().trim();
    const isLink = p.includes('link');
    const isPix = p.includes('pagamento_no_pix');
    const isEntrega = p.includes('entrega') || p.includes('dinheiro') || p.includes('maquininha');

    if (isLink) {
        return `<span class="badge info" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            <i class="fa-solid fa-link" style="font-size: 0.6rem;"></i> Link
        </span>`;
    }
    if (isPix) {
        let html = `<span class="badge info" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            <i class="fa-brands fa-pix" style="font-size: 0.6rem;"></i> PIX
        </span>`;

        // Check if there is a storage path or URL
        // In the user's latest DB example, the path is intermittently in comprovanteUrl or empresaId
        const path = (comprovanteUrl && comprovanteUrl !== 'tete') ? comprovanteUrl : (empresaId && empresaId.startsWith('comprovantes/') ? empresaId : null);

        if (path) {
            html += `
                <button class="view-comprovante-btn" data-path="${path}" style="background: rgba(34, 197, 94, 0.13); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 4px; font-size: 0.65rem; padding: 0.2rem 0.5rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; transition: 0.2s;">
                    <i class="fa-solid fa-eye" style="font-size: 0.6rem;"></i> Comprovante
                </button>`;
        }
        return `<div style="display: flex; align-items: center;">${html}</div>`;
    }
    if (isEntrega) {
        return `<span class="badge warning" style="background: rgba(245, 158, 11, 0.1); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            <i class="fa-solid fa-hand-holding-dollar" style="font-size: 0.6rem;"></i> Na Entrega
        </span>`;
    }
    return `<span class="badge secondary" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;">${payment}</span>`;
}

// ─── Page Component ───────────────────────────────────────────────────────────

export const Orders = async () => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser.companyId) {
        return `<p>Usuário sem empresa.</p>`;
    }

    let orders: any[] = await dbService.getAll('pedidos', {
        field: 'empresaId',
        operator: '==',
        value: currentUser!.companyId
    });

    // Sort: newest first
    orders.sort((a, b) => {
        const ta = (a.criadoEm?.toDate?.() || new Date(a.criadoEm || 0)).getTime();
        const tb = (b.criadoEm?.toDate?.() || new Date(b.criadoEm || 0)).getTime();
        return tb - ta;
    });

    const companyDoc = await dbService.get('companies', currentUser!.companyId);
    let stores = (companyDoc as any)?.stores as Store[] || [];

    if (currentUser!.role !== 'owner') {
        const userStoreIds = (currentUser as any).storeIds || ((currentUser as any).storeId ? [(currentUser as any).storeId] : []);
        stores = stores.filter((s: any) => userStoreIds.includes(s.id));
        orders = orders.filter((o: any) => userStoreIds.includes(o.lojaId));
    }

    const leads = await dbService.getAll('leads', {
        field: 'empresaId',
        operator: '==',
        value: currentUser!.companyId
    }) as Lead[];

    const getStoreName = (lojaId: string) => {
        const store = stores.find((s: Store) => s.id === lojaId);
        return store ? store.name : lojaId || '-';
    };

    const isStoreOperable = (lojaId: string) => {
        const store = stores.find((s: any) => s.id === lojaId) as any;
        return store ? (store.active && store.instancia_id) : false;
    };

    const getLeadName = (leadId: string, orderNome?: string) => {
        if (orderNome) return orderNome;
        const lead = leads.find((l: Lead) => l.id === leadId);
        return lead ? (lead.nome || lead.name || 'Cliente') : (leadId || 'Cliente');
    };

    const getLeadPhone = (leadId: string) => {
        const lead = leads.find((l: Lead) => l.id === leadId);
        return (lead?.telefone || '').split('@')[0];
    };

    // ── active filter ──
    let activeFilter = 'todos';

    const filterOrders = (filter: string) => {
        if (filter === 'todos') return orders;
        return orders.filter(o => (o.status || 'em_montagem').toLowerCase() === filter);
    };

    const renderRows = (list: any[]) => {
        if (list.length === 0) {
            return `<tr><td colspan="7" style="text-align:center;padding:2.5rem;color:var(--text-muted);">Nenhum pedido encontrado.</td></tr>`;
        }
        return list.map((order: any) => {
            const status = (order.status || 'em_montagem').toLowerCase();
            return `
            <tr data-order-id="${order.id}">
                <td><span style="font-family:monospace;font-weight:600;color:var(--primary);">#${order.id.slice(-6).toUpperCase()}</span></td>
                <td style="color:var(--text-muted);font-size:0.85rem;">${getStoreName(order.lojaId)}</td>
                <td>
                    <div style="display:flex;align-items:center;gap:0.5rem;">
                        <div class="lead-avatar" style="width:28px;height:28px;font-size:0.7rem;flex-shrink:0;">${(getLeadName(order.leadId, order.nome || order.leadName)[0] || 'C').toUpperCase()}</div>
                        <div>
                            <div style="font-weight:500;">${getLeadName(order.leadId, order.nome || order.leadName)}</div>
                            <div style="font-size:0.75rem;color:var(--text-muted);">${getLeadPhone(order.leadId)}</div>
                        </div>
                    </div>
                </td>
                <td style="font-weight:600;">R$ ${(order.value || order.total || 0).toFixed(2)}</td>
                <td>${getStatusBadge(status)}</td>
                <td>${getPaymentBadge(order.pagamento || order.formaPagamento, order.comprovanteUrl, order.empresaId)}</td>
                <td style="color:var(--text-muted);font-size:0.82rem;">${formatDate(order.criadoEm || order.createdAt)}</td>
                <td>
                    <div class="actions">
                        <button class="action-btn view" title="Ver detalhes" data-id="${order.id}">
                            <i style="color:#fff;" class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }).join('');
    };

    const filterCountBadge = (key: string) => {
        const count = key === 'todos' ? orders.length : orders.filter(o => (o.status || 'em_montagem').toLowerCase() === key).length;
        return `<span class="filter-count" id="count-${key}">${count}</span>`;
    };

    setTimeout(() => setupListeners(), 100);

    return `
        <div class="leads-page-header">
            <div class="leads-filter-bar" id="orders-filter-bar">
                ${FILTERS.map(f => `
                    <button class="filter-btn${f.key === 'todos' ? ' active' : ''}" data-filter="${f.key}">
                        ${f.label} ${filterCountBadge(f.key)}
                    </button>
                `).join('')}
            </div>
        </div>

        <div class="card leads-card">
            <div class="table-container">
                <table class="data-table" id="orders-table">
                    <thead>
                        <tr>
                            <th>TAG</th>
                            <th>Loja</th>
                            <th>Cliente</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Pagamento</th>
                            <th>Data/Hora</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="orders-tbody">
                        ${renderRows(orders)}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Order Detail Modal -->
        <div id="order-detail-modal" class="modal hidden">
            <div class="modal-content glass lead-modal-content">
                <div id="order-modal-inner"></div>
            </div>
        </div>
    `;

    // ─── Setup Listeners ─────────────────────────────────────────────────────

    function setupListeners() {
        // Real-time listener
        const ordersRef = collection(db, 'pedidos');
        const qOrders = query(ordersRef, where('empresaId', '==', currentUser!.companyId));

        // Use a window property to avoid duplicate listeners when re-rendering the same page
        if ((window as any)._ordersUnsubscribe) {
            (window as any)._ordersUnsubscribe();
        }

        const unsubscribe = onSnapshot(qOrders, (snapshot) => {
            // Update orders array in place
            orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            if (currentUser!.role !== 'owner') {
                const userStoreIds = (currentUser as any).storeIds || ((currentUser as any).storeId ? [(currentUser as any).storeId] : []);
                orders = orders.filter((o: any) => userStoreIds.includes(o.lojaId));
            }

            // Sort
            orders.sort((a, b) => {
                const ta = (a.criadoEm?.toDate?.() || new Date(a.criadoEm || 0)).getTime();
                const tb = (b.criadoEm?.toDate?.() || new Date(b.criadoEm || 0)).getTime();
                return tb - ta;
            });

            // Update UI
            const tbody = document.getElementById('orders-tbody');
            if (tbody) {
                tbody.innerHTML = renderRows(filterOrders(activeFilter));
                attachViewListeners();
            }

            // Update Counts
            FILTERS.forEach(f => {
                const badge = document.getElementById(`count-${f.key}`);
                if (badge) {
                    const count = f.key === 'todos'
                        ? orders.length
                        : orders.filter(o => (o.status || 'em_montagem').toLowerCase() === f.key).length;
                    badge.textContent = count.toString();
                }
            });
        });

        (window as any)._ordersUnsubscribe = unsubscribe;

        // Filter buttons behavior
        document.querySelectorAll('#orders-filter-bar .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#orders-filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeFilter = (btn as HTMLElement).dataset.filter || 'todos';
                const tbody = document.getElementById('orders-tbody');
                if (tbody) tbody.innerHTML = renderRows(filterOrders(activeFilter));
                attachViewListeners();
            });
        });

        attachViewListeners();

        // Close modal on backdrop click
        const modal = document.getElementById('order-detail-modal');
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.add('hidden');
        });

        // Handler for Receipts (Signed URL simulation via getDownloadURL)
        const ordersFilterBar = document.getElementById('orders-filter-bar')?.parentElement?.parentElement;
        ordersFilterBar?.addEventListener('click', async (e) => {
            const btn = (e.target as HTMLElement).closest('.view-comprovante-btn') as HTMLButtonElement;
            if (btn) {
                e.preventDefault();
                e.stopPropagation();
                const path = btn.dataset.path;
                if (!path) return;

                const originalHtml = btn.innerHTML;
                btn.disabled = true;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

                try {
                    let url = path;
                    if (!path.startsWith('http')) {
                        const fileRef = ref(storage, path);
                        url = await getDownloadURL(fileRef);
                    }
                    window.open(url, '_blank');
                } catch (error) {
                    console.error('Erro ao abrir comprovante:', error);
                    toast.error('Não foi possível carregar o comprovante do storage.');
                } finally {
                    btn.disabled = false;
                    btn.innerHTML = originalHtml;
                }
            }
        });
    }

    function attachViewListeners() {
        document.querySelectorAll('.action-btn.view').forEach(btn => {
            btn.addEventListener('click', () => {
                const orderId = (btn as HTMLElement).dataset.id!;
                const order = orders.find(o => o.id === orderId);
                if (order) showOrderModal(order);
            });
        });
    }

    // ─── Modal ───────────────────────────────────────────────────────────────

    function showOrderModal(order: any) {
        const modal = document.getElementById('order-detail-modal');
        const inner = document.getElementById('order-modal-inner');
        if (!modal || !inner) return;

        const status = (order.status || 'em_montagem').toLowerCase();
        const isTerminal = status === 'finalizado' || status === 'cancelado';
        const clientName = getLeadName(order.leadId, order.nome || order.leadName);
        const clientPhone = getLeadPhone(order.leadId);
        const storeOperable = isStoreOperable(order.lojaId);

        // ── Items HTML ──
        const itensHtml = Array.isArray(order.itens)
            ? order.itens.map((i: any, idx: number) => `
                <div class="order-item-row" style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <div style="flex: 1; padding-right: 15px;">
                        <span style="font-weight: 600; color: var(--text-main); display: block;">${i.quantidade}x ${i.item}</span>
                        ${i.observacao ? `<small style="color: var(--text-dim); display: block; margin-top: 2px;">Obs: ${i.observacao}</small>` : ''}
                    </div>
                    ${status === 'em_montagem' ? `
                        <div style="display:flex;align-items:center;gap:0.75rem; flex-shrink: 0;">
                            <span style="color:var(--text-dim);font-size:0.8rem; font-weight: 600;">R$</span>
                            <input type="number" class="item-price-input" data-index="${idx}" value="${i.preco || 0}"
                                step="0.01" style="width:100px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.5rem 0.75rem;border-radius:8px;text-align:right;font-size:0.95rem; font-family: monospace; outline: none;">
                        </div>
                    ` : `
                        <span style="color:var(--primary);font-weight:700; font-size: 1rem;">R$ ${(i.preco || 0).toFixed(2)}</span>
                    `}
                </div>
            `).join('')
            : '<p style="color:var(--text-muted); padding: 1.5rem; text-align: center;">Sem itens listados.</p>';

        const addValuesHtml = status === 'em_montagem' ? `
            <div class="order-item-row" style="margin-top:0.5rem; border-top: 1px solid var(--border-color); padding: 1.25rem; background: rgba(99, 102, 241, 0.03);">
                <div style="flex: 1;">
                    <span class="lead-info-label" style="font-size:0.85rem; color: var(--text-main);">Taxas / Adicionais</span>
                    <small style="display:block; color: var(--text-dim); font-size: 0.75rem;">Frete, acréscimos, etc.</small>
                </div>
                <div style="display:flex;align-items:center;gap:0.75rem; flex-shrink: 0;">
                    <span style="color:var(--text-dim);font-size:0.8rem; font-weight: 600;">R$</span>
                    <input type="number" id="detail-additional-value" value="${order.valoresAdicionais || 0}"
                        step="0.01" style="width:100px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.5rem 0.75rem;border-radius:8px;text-align:right;font-size:0.95rem; font-family: monospace; outline: none;">
                </div>
            </div>
        ` : (order.valoresAdicionais ? `
            <div class="order-item-row" style="margin-top:0.5rem; border-top: 1px solid var(--border-color); padding: 1rem 1.25rem;">
                <span class="lead-info-label" style="font-size:0.85rem;">Valores adicionais</span>
                <span style="color:var(--primary);font-weight:700;">R$ ${(order.valoresAdicionais || 0).toFixed(2)}</span>
            </div>
        ` : '');

        // ── Stage action buttons ──
        const stageButtons = buildStageButtons(status);

        // ── Intervir button (only when not terminal) ──
        const intervirBtn = !isTerminal ? `
            <button id="btn-intervir" class="btn-lead-action" style="background: rgba(139,92,246,0.15); border-color: rgba(139,92,246,0.4); color: #a78bfa;"
                title="Enviar mensagem diretamente ao cliente sem alterar o status">
                <i class="fa-solid fa-comment-dots"></i> Intervir
            </button>` : '';

        inner.innerHTML = `
            <!-- Header -->
            <div class="lead-modal-header">
                <div class="lead-modal-avatar" style="background: linear-gradient(135deg, var(--primary), #7c3aed);">
                    ${clientName[0]?.toUpperCase() || 'P'}
                </div>
                <div class="lead-modal-title">
                    <h2>Pedido #${order.id.slice(-6).toUpperCase()}</h2>
                    <span style="color:var(--text-muted);font-size:0.88rem;">${clientName} · ${clientPhone}</span>
                </div>
                <div class="lead-modal-header-actions">
                    ${!isTerminal ? `
                    <div class="lead-menu-wrap">
                        <button class="action-btn lead-menu-btn" id="order-menu-trigger" title="Mais ações">
                            <i class="fa-solid fa-ellipsis-vertical" style="color:#fff;"></i>
                        </button>
                        <div class="lead-dropdown hidden" id="order-dropdown">
                            <button class="lead-dropdown-item" data-menu-action="atendimento_humano">
                                <i class="fa-solid fa-headset" style="color:var(--primary);"></i> Ativar Atendimento Humano
                            </button>
                        </div>
                    </div>` : ''}
                    <button class="action-btn" id="close-order-modal" title="Fechar">
                        <i class="fa-solid fa-xmark" style="color:#fff;"></i>
                    </button>
                </div>
            </div>

            <!-- Status badges -->
            <div class="lead-modal-badges">
                <div class="lead-badge-group">
                    <span class="badge-label">Status do Pedido</span>
                    ${getStatusBadge(status)}
                </div>
                <div class="lead-badge-group">
                    <span class="badge-label">Loja</span>
                    <span class="badge secondary">${getStoreName(order.lojaId)}</span>
                </div>
                <div class="lead-badge-group">
                    <span class="badge-label">Data</span>
                    <span class="badge secondary" style="font-size:0.78rem;">${formatDate(order.criadoEm || order.createdAt)}</span>
                </div>
            </div>

            ${!storeOperable ? `
            <div class="lead-alert danger" style="margin: 1rem 1.5rem 0 1.5rem;">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <strong>Atenção:</strong> A loja deste pedido está inoperante (inativa ou sem instância vinculada). Mensagens automáticas podem falhar.
            </div>
            ` : ''}

            <!-- Body -->
            <div class="lead-modal-body">
                <!-- Client info -->
                <div class="lead-info-grid">
                    <div class="lead-info-item">
                        <span class="lead-info-label">Cliente</span>
                        <span class="lead-info-value">${clientName}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Telefone</span>
                        <span class="lead-info-value">${clientPhone || '-'}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Pagamento</span>
                        <span class="lead-info-value">${getPaymentBadge(order.pagamento || order.formaPagamento, order.comprovanteUrl, order.empresaId)}</span>
                    </div>
                    ${order.endereco ? `
                    <div class="lead-info-item" style="grid-column:1/-1;">
                        <span class="lead-info-label">Endereço de Entrega</span>
                        <span class="lead-info-value">${order.endereco}</span>
                    </div>` : ''}
                </div>

                <!-- Items -->
                <div class="lead-section">
                    <h4 class="lead-section-title"><i class="fa-solid fa-basket-shopping"></i> Itens do Pedido</h4>
                    <div class="order-items-block">
                        ${itensHtml}
                        ${addValuesHtml}
                        <div class="order-total-row">
                            <span>Total</span>
                            ${status === 'em_montagem' ? `
                                <span style="color:var(--primary);font-weight:700;font-size:1.1rem;" id="detail-order-total">R$ ${(order.value || order.total || 0).toFixed(2)}</span>
                            ` : `
                                <span style="color:var(--primary);font-weight:700;font-size:1.1rem;">R$ ${(order.value || order.total || 0).toFixed(2)}</span>
                            `}
                        </div>
                    </div>
                </div>

                ${order.rejectionReason ? `
                <div class="lead-alert danger">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <strong>Motivo do Cancelamento:</strong> ${order.rejectionReason}
                </div>` : ''}

                <!-- Intervention area (hidden by default) -->
                <div id="intervir-area" style="display:none;">
                    <div class="lead-section">
                        <h4 class="lead-section-title"><i class="fa-solid fa-comment-dots" style="color:#a78bfa;"></i> Enviar Mensagem ao Cliente</h4>
                        <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.75rem;">Esta mensagem será enviada diretamente ao cliente sem alterar o status do pedido ou o atendimento.</p>
                        <textarea id="intervir-text" placeholder="Digite sua mensagem..." rows="3"
                            style="width:100%;background:var(--surface-hover);border:1px solid rgba(139,92,246,0.4);border-radius:8px;color:white;padding:0.75rem;font-size:0.9rem;font-family:inherit;resize:vertical;box-sizing:border-box;"></textarea>
                        <div style="display:flex;gap:0.75rem;margin-top:0.75rem;">
                            <button id="btn-intervir-send" class="btn-lead-action" style="background:rgba(139,92,246,0.2);border-color:rgba(139,92,246,0.5);color:#a78bfa;flex:1;">
                                <i class="fa-solid fa-paper-plane"></i> Enviar Mensagem
                            </button>
                            <button id="btn-intervir-cancel" class="action-btn" style="padding:0.6rem 1rem;">
                                <i class="fa-solid fa-xmark" style="color:#fff;"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Cancelation reason (shown on cancel click) -->
                <div id="cancel-container" style="display:none;">
                    <div class="lead-section">
                        <h4 class="lead-section-title" style="color:var(--danger);"><i class="fa-solid fa-circle-exclamation"></i> Motivo do Cancelamento <span style="color:#ff4d4d">*</span></h4>
                        <textarea id="cancel-reason" placeholder="Informe o motivo para o cliente..." rows="3"
                            style="width:100%;background:rgba(239,68,68,0.05);border:1px solid var(--danger);border-radius:8px;color:white;padding:0.75rem;font-size:0.9rem;font-family:inherit;resize:vertical;box-sizing:border-box;"></textarea>
                    </div>
                </div>
            </div>

            <!-- Footer actions -->
            ${!isTerminal ? `
            <div class="lead-modal-footer" id="modal-footer">
                <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
                    ${intervirBtn}
                    ${stageButtons}
                </div>
            </div>` : ''}
        `;

        modal.classList.remove('hidden');

        // ── Bind all listeners ──
        bindModalListeners(modal, order, status);
    }

    function buildStageButtons(status: string): string {
        switch (status) {
            case 'em_montagem':
                return `
                    <button id="btn-main-action" class="btn-lead-action" data-target="aguardando_pagamento">
                        <i class="fa-solid fa-check"></i> Aceitar Pedido
                    </button>
                    <button id="btn-cancel" class="btn-lead-action danger" data-stage="init">
                        <i class="fa-solid fa-xmark"></i> Cancelar Pedido
                    </button>`;
            case 'aguardando_pagamento':
                return `
                    <button id="btn-main-action" class="btn-lead-action" data-target="em_preparo">
                        <i class="fa-solid fa-credit-card"></i> Confirmar Pagamento
                    </button>`;
            case 'em_preparo':
                return `
                    <button id="btn-main-action" class="btn-lead-action" data-target="saiu_para_entrega">
                        <i class="fa-solid fa-truck"></i> Saiu para Entrega
                    </button>`;
            case 'saiu_para_entrega':
                return `
                    <button id="btn-main-action" class="btn-lead-action" data-target="finalizado">
                        <i class="fa-solid fa-flag-checkered"></i> Entregue
                    </button>`;
            default:
                return '';
        }
    }

    function bindModalListeners(modal: HTMLElement, order: any, status: string) {
        const isTerminal = status === 'finalizado' || status === 'cancelado';

        // Close button
        document.getElementById('close-order-modal')?.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        if (status === 'em_montagem') {
            const getParsed = (val: any) => {
                const p = parseFloat(val);
                return isNaN(p) ? 0 : p;
            };
            const updateCalc = () => {
                let sum = 0;
                document.querySelectorAll('.item-price-input').forEach((inp: any) => {
                    const idx = parseInt(inp.dataset.index);
                    const q = order.itens[idx]?.quantidade || 1;
                    sum += q * getParsed(inp.value);
                });
                const addVal = getParsed((document.getElementById('detail-additional-value') as HTMLInputElement)?.value);
                sum += addVal;
                const totalEl = document.getElementById('detail-order-total');
                if (totalEl) totalEl.innerText = `R$ ${sum.toFixed(2)}`;
            };

            document.querySelectorAll('.item-price-input').forEach(inp => {
                inp.addEventListener('input', updateCalc);
            });
            document.getElementById('detail-additional-value')?.addEventListener('input', updateCalc);

            // initial recalc
            updateCalc();
        }

        if (isTerminal) return;

        // ── 3-dot menu ──
        const menuTrigger = document.getElementById('order-menu-trigger');
        const dropdown = document.getElementById('order-dropdown');
        menuTrigger?.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown?.classList.toggle('hidden');
        });
        document.addEventListener('click', () => dropdown?.classList.add('hidden'), { once: true });

        dropdown?.querySelectorAll('.lead-dropdown-item').forEach(item => {
            item.addEventListener('click', async () => {
                dropdown.classList.add('hidden');
                const action = (item as HTMLElement).dataset.menuAction;
                if (action === 'atendimento_humano') {
                    await handleHumanSupport(order);
                }
            });
        });

        // ── Intervir button toggle ──
        const btnIntervir = document.getElementById('btn-intervir');
        const intervirArea = document.getElementById('intervir-area');
        btnIntervir?.addEventListener('click', () => {
            if (intervirArea) {
                const isHidden = intervirArea.style.display === 'none';
                intervirArea.style.display = isHidden ? 'block' : 'none';
                if (isHidden) {
                    (document.getElementById('intervir-text') as HTMLTextAreaElement)?.focus();
                }
            }
        });

        document.getElementById('btn-intervir-cancel')?.addEventListener('click', () => {
            if (intervirArea) intervirArea.style.display = 'none';
            const ta = document.getElementById('intervir-text') as HTMLTextAreaElement;
            if (ta) ta.value = '';
        });

        document.getElementById('btn-intervir-send')?.addEventListener('click', async () => {
            const ta = document.getElementById('intervir-text') as HTMLTextAreaElement;
            const msg = ta?.value.trim();
            if (!msg) {
                toast.warning('Digite uma mensagem antes de enviar.');
                return;
            }
            const sendBtn = document.getElementById('btn-intervir-send') as HTMLButtonElement;
            sendBtn.disabled = true;
            sendBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            try {
                // Get instance name
                let instanceName = order.instancia;
                if (!instanceName) {
                    const company = await dbService.get('companies', currentUser!.companyId!) as any;
                    instanceName = company?.whatsappInstance?.instanceName || '';
                }
                const phone = getLeadPhone(order.leadId) || order.leadId;

                await orderService.sendInterventionMessage(
                    currentUser!.companyId!,
                    order.leadId,
                    instanceName,
                    phone,
                    msg
                );
                toast.success('Mensagem enviada com sucesso!');
                ta.value = '';
                if (intervirArea) intervirArea.style.display = 'none';
            } catch {
                toast.error('Erro ao enviar mensagem.');
                sendBtn.disabled = false;
                sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar Mensagem';
            }
        });

        // ── Main stage action button ──
        const mainBtn = document.getElementById('btn-main-action') as HTMLButtonElement;
        mainBtn?.addEventListener('click', async () => {
            const targetStatus = mainBtn.dataset.target as any;
            if (!targetStatus) return;

            let confirmTitle = '';
            let confirmMsg = '';
            switch (targetStatus) {
                case 'aguardando_pagamento':
                    confirmTitle = 'Aceitar Pedido';
                    confirmMsg = `Deseja aceitar o pedido #${order.id.slice(-6).toUpperCase()}?`;
                    break;
                case 'em_preparo':
                    confirmTitle = 'Confirmar Pagamento';
                    confirmMsg = 'Confirmar que o pagamento foi recebido?';
                    break;
                case 'saiu_para_entrega':
                    confirmTitle = 'Saiu para Entrega';
                    confirmMsg = 'Marcar pedido como saiu para entrega?';
                    break;
                case 'finalizado':
                    confirmTitle = 'Pedido Entregue';
                    confirmMsg = 'Marcar pedido como entregue e finalizado?';
                    break;
            }

            const ok = await confirm.warning(confirmTitle, confirmMsg);
            if (!ok) return;

            mainBtn.disabled = true;
            mainBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processando...';

            try {
                let extraUpdates: any = undefined;
                if (status === 'em_montagem') {
                    const getParsed = (val: any) => {
                        const p = parseFloat(val);
                        return isNaN(p) ? 0 : p;
                    };

                    let sum = 0;
                    const updatedItens = Array.isArray(order.itens) ? [...order.itens] : [];

                    document.querySelectorAll('.item-price-input').forEach((inp: any) => {
                        const idx = parseInt(inp.dataset.index);
                        const q = updatedItens[idx]?.quantidade || 1;
                        const preco = getParsed(inp.value);
                        if (updatedItens[idx]) {
                            updatedItens[idx].preco = preco;
                        }
                        sum += q * preco;
                    });

                    const valoresAdicionais = getParsed((document.getElementById('detail-additional-value') as HTMLInputElement)?.value);
                    sum += valoresAdicionais;

                    extraUpdates = {
                        value: sum,
                        total: sum,
                        itens: updatedItens,
                        valoresAdicionais: valoresAdicionais
                    };
                }

                // If confirming payment manually, flag it to avoid duplicate "Paid" alerts
                if (targetStatus === 'em_preparo') {
                    extraUpdates = { ...extraUpdates, manuallyConfirmed: true };
                }

                await orderService.updateOrderStatus(order, currentUser!.companyId!, targetStatus, undefined, extraUpdates);
                order.status = targetStatus;
                updateOrderInList(order);
                toast.success('Pedido atualizado com sucesso!');
                // Refresh modal
                showOrderModal(order);
            } catch {
                toast.error('Erro ao atualizar pedido.');
                mainBtn.disabled = false;
            }
        });

        // ── Cancel button (2-step) ──
        const cancelBtn = document.getElementById('btn-cancel') as HTMLButtonElement;
        const cancelContainer = document.getElementById('cancel-container');
        cancelBtn?.addEventListener('click', async () => {
            if (cancelBtn.dataset.stage === 'confirm') {
                // Confirm cancellation
                const reason = (document.getElementById('cancel-reason') as HTMLTextAreaElement)?.value.trim();
                if (!reason) {
                    toast.warning('Informe o motivo do cancelamento.');
                    return;
                }
                const ok = await confirm.danger('Cancelar Pedido', 'Tem certeza que deseja cancelar este pedido?');
                if (!ok) return;

                cancelBtn.disabled = true;
                cancelBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Cancelando...';
                try {
                    await orderService.updateOrderStatus(order, currentUser!.companyId!, 'cancelado', reason);
                    order.status = 'cancelado';
                    updateOrderInList(order);
                    toast.success('Pedido cancelado.');
                    showOrderModal(order);
                } catch {
                    toast.error('Erro ao cancelar pedido.');
                    cancelBtn.disabled = false;
                }
            } else {
                // First click: show reason input
                cancelBtn.dataset.stage = 'confirm';
                cancelBtn.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Confirmar Cancelamento';
                if (cancelContainer) {
                    cancelContainer.style.display = 'block';
                    (document.getElementById('cancel-reason') as HTMLTextAreaElement)?.focus();
                }
            }
        });
    }

    async function handleHumanSupport(order: any) {
        const ok = await confirm.warning(
            'Ativar Atendimento Humano',
            `Deseja ativar atendimento humano para o lead deste pedido ? O status do pedido não será alterado.`
        );
        if (!ok) return;
        try {
            await orderService.activateHumanSupport(order.leadId);
            toast.success('Atendimento humano ativado para o lead!');
        } catch {
            toast.error('Erro ao ativar atendimento humano.');
        }
    }

    function updateOrderInList(updatedOrder: any) {
        const idx = orders.findIndex(o => o.id === updatedOrder.id);
        if (idx >= 0) orders[idx] = { ...orders[idx], ...updatedOrder };
        const tbody = document.getElementById('orders-tbody');
        if (tbody) tbody.innerHTML = renderRows(filterOrders(activeFilter));
        attachViewListeners();
    }
};
