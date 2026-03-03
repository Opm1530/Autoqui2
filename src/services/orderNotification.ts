import { collection, onSnapshot, query, orderBy, limit, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { orderService } from './orderService';
import { authService } from './auth';
import { toast } from './toast';

interface OrderData {
    id: string;
    customerName: string;
    endereco: string;
    description: string;
    value: number;
    leadId: string;
    empresaId: string;
    instancia?: string;
    itens?: any[];
    valoresAdicionais?: number;
    total?: number;
}

class OrderNotificationService {
    private newOrderSound: HTMLAudioElement;
    private paymentSound: HTMLAudioElement;
    private humanSupportSound: HTMLAudioElement;
    private notifiedSupportIds = new Set<string>();
    private isInitialLoad = true;
    private isLeadsInitialLoad = true;
    private unsubscribe: (() => void) | null = null;
    private unsubscribeLeads: (() => void) | null = null;

    constructor() {
        this.newOrderSound = new Audio('/sounds/new-order.mp3');
        this.paymentSound = new Audio('/sounds/payment-confirmed.mp3');
        this.humanSupportSound = new Audio('/sounds/success.mp3');
        this.newOrderSound.volume = 0.5;
        this.paymentSound.volume = 0.5;
        this.humanSupportSound.volume = 0.6;
    }

    showHumanSupportAlert(order: any) {
        // Play sound (reset first to allow repeated triggers)
        this.humanSupportSound.currentTime = 0;
        this.humanSupportSound.play().catch(() => { });

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'order-modal';
        modal.id = `support-modal-${order.id}`;
        modal.innerHTML = `
            <div class="order-modal-content" style="border-top: 5px solid var(--warning);">
                <div class="order-header">
                    <div class="order-icon" style="background: rgba(245, 158, 11, 0.15); color: var(--warning);">👤</div>
                    <h2>Atendimento Humano!</h2>
                </div>
                
                <div class="order-body">
                    <p style="text-align: center; margin-bottom: 1.5rem; color: var(--text-muted);">
                        O lead <strong>${order.customerName || order.leadName || 'Cliente'}</strong> está aguardando contato humano.
                    </p>
                    <div class="order-field">
                        <label>Número do Lead:</label>
                        <span>${(order.telefone || order.leadId || '').split('@')[0] || 'Não informado'}</span>
                    </div>
                </div>
                
                <div class="order-actions">
                    <button class="btn-accept full-width" id="close-support" style="background: var(--warning);">Entendido</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('#close-support');
        closeBtn?.addEventListener('click', () => {
            modal.remove();
        });
    }

    showNewOrder(order: OrderData) {
        // Play sound
        this.newOrderSound.play().catch(() => { });

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'order-modal';
        modal.id = `modal-${order.id}`;

        const itensHtml = Array.isArray(order.itens)
            ? order.itens.map((i: any, idx: number) => `
                <div class="order-item-row" style="display:flex; justify-content:space-between; align-items:center; padding: 0.6rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <span style="flex:1; font-weight:500;">${i.quantidade}x ${i.item}</span>
                    <div style="display:flex;align-items:center;gap:0.5rem; flex-shrink:0;">
                        <span style="color:var(--text-dim);font-size:0.75rem;">R$</span>
                        <input type="number" class="notif-item-price-input" data-index="${idx}" value="${i.preco || 0}"
                            step="0.01" style="width:90px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.4rem 0.6rem;border-radius:6px;text-align:right;font-size:0.9rem; font-family: monospace; outline:none;">
                    </div>
                </div>
            `).join('')
            : '<p style="color:var(--text-muted); padding: 1rem; text-align:center;">Sem itens listados.</p>';

        const addValuesHtml = `
            <div class="order-item-row" style="margin-top:0.5rem; padding: 0.8rem 0; display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; flex-direction:column;">
                    <span style="font-size:0.85rem; font-weight:600;">Taxas / Adicionais</span>
                    <small style="font-size:0.7rem; color:var(--text-dim);">Entrega, extras, etc.</small>
                </div>
                <div style="display:flex;align-items:center;gap:0.5rem; flex-shrink:0;">
                    <span style="color:var(--text-dim);font-size:0.75rem;">R$</span>
                    <input type="number" id="notif-additional-value" value="${order.valoresAdicionais || 0}"
                        step="0.01" style="width:90px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.4rem 0.6rem;border-radius:6px;text-align:right;font-size:0.9rem; font-family: monospace; outline:none;">
                </div>
            </div>
        `;

        modal.innerHTML = `
            <div class="order-modal-content" style="max-width: 520px; padding: 1.5rem;">
                <div class="order-header" style="margin-bottom: 1.25rem;">
                    <div class="order-icon" style="width: 44px; height: 44px; font-size: 1.25rem; background: var(--primary-glow); color: var(--primary);">
                        <i class="fa-solid fa-bell"></i>
                    </div>
                    <div>
                        <h2 style="margin:0; font-size: 1.25rem;">Novo Pedido Recebido!</h2>
                        <p style="margin:0; font-size: 0.85rem; color: var(--text-dim);">#${order.id.slice(-6).toUpperCase()}</p>
                    </div>
                </div>
                
                <div class="order-body" style="gap: 1.25rem; display: flex; flex-direction: column;">
                    <!-- Customer and Delivery Info -->
                    <div style="padding: 1rem; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 0.75rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Cliente</label>
                            <span style="font-weight: 600; color: var(--text-main);">${order.customerName}</span>
                        </div>
                        <div style="height: 1px; background: var(--border-color); width: 100%;"></div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Entrega</label>
                            <span style="font-size: 0.85rem; color: var(--text-muted); text-align: right; max-width: 60%;">${order.endereco || 'Retirada'}</span>
                        </div>
                    </div>
                    
                    <!-- Items Section -->
                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                        <h4 style="font-size: 0.75rem; color: var(--text-dim); font-weight:700; text-transform: uppercase; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fa-solid fa-list-check" style="color: var(--primary); font-size: 0.9rem;"></i>
                            Conferência de Itens e Valores
                        </h4>
                        
                        <div style="background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid var(--border-color); overflow: hidden;">
                            <div style="max-height: 220px; overflow-y: auto; padding: 0 1rem;">
                                ${itensHtml}
                            </div>
                            
                            <!-- Total and Extras -->
                            <div style="background: rgba(255,255,255,0.03); border-top: 1px solid var(--border-color); padding: 1rem;">
                                ${addValuesHtml}
                                
                                <div style="display:flex; justify-content:space-between; margin-top:0.75rem; padding-top:0.75rem; border-top: 1px dashed var(--border-color); align-items: center;">
                                    <span style="font-weight:700; font-size: 1rem; color: var(--text-main);">Total do Pedido</span>
                                    <span id="notif-order-total" style="font-weight:800; color:var(--primary); font-size:1.4rem; letter-spacing: -0.02em;">R$ ${(order.value || order.total || 0).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="reject-reason-container" style="display: none; margin-top: 0.5rem; animation: slideDown 0.3s ease;">
                        <label style="display: block; margin-bottom: 0.5rem; color: var(--danger); font-weight: 700; font-size: 0.8rem; text-transform: uppercase;">Motivo da Recusa *</label>
                        <textarea id="reject-reason" placeholder="Descreva por que o pedido foi recusado..." 
                                  style="width: 100%; border-radius: 10px; border: 1px solid var(--danger); padding: 0.8rem; background: rgba(239, 68, 68, 0.05); color: white; resize: vertical; min-height: 80px; font-size: 0.9rem; outline: none;"></textarea>
                    </div>
                </div>
                
                <div class="order-actions" style="margin-top: 1.5rem; gap: 0.75rem;">
                    <button class="btn-reject" id="reject-order" style="flex:1; height: 48px; border-radius: 10px; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); color: var(--danger);">
                        <i class="fa fa-times"></i> Recusar
                    </button>
                    <button class="btn-reject hidden" id="confirm-reject" style="flex:1; height: 48px; border-radius: 10px; background: var(--danger); color: white;">
                        <i class="fa fa-check"></i> Confirmar Recusa
                    </button>
                    <button class="btn-accept" id="accept-order" style="flex:2; height: 48px; border-radius: 10px; background: var(--primary); color: white; font-weight: 700; box-shadow: 0 4px 15px var(--primary-glow);">
                        <i class="fa fa-check"></i> Aceitar Pedido
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Calculate Totals Logic
        const getParsed = (val: any) => {
            const p = parseFloat(val);
            return isNaN(p) ? 0 : p;
        };

        const updateCalc = () => {
            let sum = 0;
            document.querySelectorAll('.notif-item-price-input').forEach((inp: any) => {
                const idx = parseInt(inp.dataset.index);
                const q = (order.itens || [])[idx]?.quantidade || 1;
                sum += q * getParsed(inp.value);
            });
            const addVal = getParsed((document.getElementById('notif-additional-value') as HTMLInputElement)?.value);
            sum += addVal;
            const totalEl = document.getElementById('notif-order-total');
            if (totalEl) totalEl.innerText = `R$ ${sum.toFixed(2)}`;
        };

        document.querySelectorAll('.notif-item-price-input').forEach(inp => {
            inp.addEventListener('input', updateCalc);
        });
        document.getElementById('notif-additional-value')?.addEventListener('input', updateCalc);

        // Event listeners
        const acceptBtn = modal.querySelector('#accept-order') as HTMLButtonElement;
        const rejectBtn = modal.querySelector('#reject-order') as HTMLButtonElement;
        const confirmRejectBtn = modal.querySelector('#confirm-reject') as HTMLButtonElement;
        const reasonContainer = modal.querySelector('#reject-reason-container') as HTMLDivElement;
        const reasonInput = modal.querySelector('#reject-reason') as HTMLTextAreaElement;

        acceptBtn?.addEventListener('click', async () => {
            const currentUser = authService.getCurrentUser();
            const companyId = order.empresaId || currentUser?.companyId;

            if (!companyId) {
                toast.error('Empresa não identificada.');
                return;
            }

            acceptBtn.disabled = true;
            acceptBtn.textContent = '⌛ Processando...';

            try {
                // Apply calculations
                let sum = 0;
                const updatedItens = Array.isArray(order.itens) ? [...order.itens] : [];
                document.querySelectorAll('.notif-item-price-input').forEach((inp: any) => {
                    const idx = parseInt(inp.dataset.index);
                    const q = updatedItens[idx]?.quantidade || 1;
                    const preco = getParsed(inp.value);
                    if (updatedItens[idx]) {
                        updatedItens[idx].preco = preco;
                    }
                    sum += q * preco;
                });

                const valoresAdicionais = getParsed((document.getElementById('notif-additional-value') as HTMLInputElement)?.value);
                sum += valoresAdicionais;

                const extraUpdates = {
                    value: sum,
                    total: sum,
                    itens: updatedItens,
                    valoresAdicionais: valoresAdicionais
                };

                const isWithdrawal = (order as any).entrega === 'retirada';
                const paymentMethod = (order as any).pagamento || (order as any).formaPagamento || '';
                const isPayOnDelivery = paymentMethod.includes('entrega') || paymentMethod.includes('dinheiro') || paymentMethod.includes('maquininha');
                const targetStatus = (isWithdrawal && isPayOnDelivery) ? 'em_preparo' : 'aguardando_pagamento';

                await orderService.updateOrderStatus(order, companyId, targetStatus as any, undefined, extraUpdates);
                toast.success('Pedido aceito e WhatsApp enviado!');
                modal.remove();
            } catch (error) {
                toast.error('Erro ao aceitar pedido: ' + error);
                acceptBtn.disabled = false;
                acceptBtn.innerHTML = '<i class="fa fa-check"></i> Aceitar';
            }
        });

        rejectBtn?.addEventListener('click', () => {
            rejectBtn.classList.add('hidden');
            acceptBtn.classList.add('hidden');
            confirmRejectBtn.classList.remove('hidden');
            reasonContainer.style.display = 'block';
            reasonInput.focus();
        });

        confirmRejectBtn?.addEventListener('click', async () => {
            const reason = reasonInput.value.trim();
            if (!reason) {
                toast.warning('Informe o motivo da recusa.');
                reasonInput.style.borderColor = 'red';
                return;
            }

            const currentUser = authService.getCurrentUser();
            const companyId = order.empresaId || currentUser?.companyId;

            if (!companyId) {
                toast.error('Empresa não identificada.');
                return;
            }

            confirmRejectBtn.disabled = true;
            confirmRejectBtn.textContent = '⌛ Processando...';

            try {
                await orderService.updateOrderStatus(order, companyId, 'cancelado', reason);
                toast.success('Pedido recusado e cliente notificado.');
                modal.remove();
            } catch (error) {
                toast.error('Erro ao recusar pedido: ' + error);
                confirmRejectBtn.disabled = false;
                confirmRejectBtn.textContent = 'Confirmar Recusa';
            }
        });
    }

    showPaymentConfirmed() {
        // Play sound
        this.paymentSound.play().catch(() => { });

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'order-modal';
        modal.innerHTML = `
            <div class="order-modal-content payment-confirmed">
                <div class="order-header">
                    <div class="order-icon success"><i class="fa fa-check"></i></div>
                    <h2>Pagamento Confirmado!</h2>
                </div>
                
                <div class="order-body">
                    <p style="text-align: center; color: var(--text-muted);">
                        O pagamento foi processado com sucesso.<br>
                        Pedido enviado para produção.
                    </p>
                </div>
                
                <div class="order-actions">
                    <button class="btn-accept full-width" id="close-payment">OK</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('#close-payment');
        closeBtn?.addEventListener('click', () => {
            modal.remove();
        });

        // Auto-close after 3 seconds
        setTimeout(() => {
            if (modal.parentNode) modal.remove();
        }, 3000);
    }

    private orderStatusMap = new Map<string, string>();

    private setupLeadsListener(companyId: string) {
        const leadsRef = collection(db, 'leads');

        // Helper to process changes
        const processChange = (change: any) => {
            if (change.type !== 'modified' && change.type !== 'added') return;
            const data = change.doc.data();
            const id = change.doc.id;
            const notifyKey = 'lead_' + id;

            const statusAtend = (data.statusAtendimento || '').toLowerCase();
            const estado = (data.estado || '').toLowerCase();

            const isHumanSupport =
                statusAtend === 'atendimento_humano' ||
                statusAtend === 'em_atendimento_humano' ||
                estado === 'atendimento_humano';

            if (this.isLeadsInitialLoad) {
                if (isHumanSupport) this.notifiedSupportIds.add(notifyKey);
                return;
            }

            if (isHumanSupport && !this.notifiedSupportIds.has(notifyKey)) {
                // Skip if current path is a catalog
                if (window.location.pathname.includes('/catalog/')) return;

                // Check store isolation
                const currentUser = authService.getCurrentUser();
                if (currentUser && currentUser.role !== 'owner' && currentUser.role !== 'admin') {
                    const userStoreIds = currentUser.storeIds || (currentUser.storeId ? [currentUser.storeId] : []);
                    console.log('OrderNotification - Checking Lead Store isolation:', { userStoreIds, leadLojaId: data.lojaId });
                    if (userStoreIds.length > 0 && data.lojaId && !userStoreIds.includes(data.lojaId)) return;
                }

                this.showHumanSupportAlert({
                    ...data,
                    id,
                    leadId: data.telefone || id,
                    customerName: data.nome || data.leadName || data.name || data.telefone || 'Cliente'
                });
                this.notifiedSupportIds.add(notifyKey);
            } else if (!isHumanSupport && this.notifiedSupportIds.has(notifyKey)) {
                // If status changed to something else, allow for a new notification later
                this.notifiedSupportIds.delete(notifyKey);
            }
        };

        // Single query for statusAtendimento
        const q = query(
            leadsRef,
            where('empresaId', '==', companyId),
            where('statusAtendimento', 'in', ['atendimento_humano', 'em_atendimento_humano'])
        );

        this.unsubscribeLeads = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach(processChange);
            if (this.isLeadsInitialLoad) {
                this.isLeadsInitialLoad = false;
            }
        });

        // Fail-safe to ensure isLeadsInitialLoad is set to false even if no docs returned
        setTimeout(() => {
            if (this.isLeadsInitialLoad) this.isLeadsInitialLoad = false;
        }, 3000);
    }

    startListening() {
        if (this.unsubscribe) return;

        const currentUser = authService.getCurrentUser();
        if (!currentUser || !currentUser.companyId) return;

        // Security check: Only allow notifications for employees, owners or admins
        // Public users in the catalog should NOT receive notifications
        const allowedRoles = ['admin', 'owner', 'employee', 'staff'];
        if (!allowedRoles.includes(currentUser.role || '')) {
            console.log('OrderNotification - Unauthorized role for notifications:', currentUser.role);
            return;
        }

        const companyId = currentUser.companyId;

        // ── Listener 1: pedidos (coleção 'pedidos') ──
        const ordersRef = collection(db, 'pedidos');
        // Index is now active, so server-side filtering is better
        const q = query(
            ordersRef,
            where('empresaId', '==', companyId),
            orderBy('criadoEm', 'desc'),
            limit(50)
        );

        this.unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                const data = change.doc.data();
                const status = (data.status || 'em_montagem').toLowerCase();
                const id = change.doc.id;
                const prevStatus = this.orderStatusMap.get(id);

                if (this.isInitialLoad) {
                    this.orderStatusMap.set(id, status);
                    return;
                }

                this.orderStatusMap.set(id, status);
                if (data.empresaId && data.empresaId !== companyId) return;

                // Skip if current path is a catalog
                if (window.location.pathname.includes('/catalog/')) return;

                // Check store isolation
                if (currentUser && currentUser.role !== 'owner' && currentUser.role !== 'admin') {
                    const userStoreIds = currentUser.storeIds || (currentUser.storeId ? [currentUser.storeId] : []);
                    console.log('OrderNotification - Checking Store isolation:', { userStoreIds, orderLojaId: data.lojaId });
                    if (userStoreIds.length > 0 && data.lojaId && !userStoreIds.includes(data.lojaId)) return;
                }

                if (status === 'em_preparo' && prevStatus === 'aguardando_pagamento') {
                    if (!data.manuallyConfirmed) {
                        this.showPaymentConfirmed();
                    }
                }

                if (status === 'atendimento_humano') {
                    const notifyKey = 'pedido_' + id;
                    if (!this.notifiedSupportIds.has(notifyKey)) {
                        this.showHumanSupportAlert({
                            ...data,
                            id,
                            customerName: data.leadName || data.nome || data.customerName || data.leadId || 'Cliente'
                        });
                        this.notifiedSupportIds.add(notifyKey);
                    }
                    return;
                }

                if (change.type === 'added') {
                    const finalStatuses = ['cancelado', 'finalizado'];
                    if (finalStatuses.includes(status)) return;
                    this.showNewOrder({
                        id: change.doc.id,
                        ...data,
                        customerName: data.nome || data.leadName || data.customerName || data.leadId || 'Cliente',
                        endereco: data.endereco || 'Endereço não informado',
                        description: Array.isArray(data.itens) ? data.itens.map((i: any) => `${i.quantidade}x ${i.item}`).join(', ') : 'Sem itens',
                        value: data.value || data.total || 0,
                        leadId: data.leadId,
                        empresaId: data.empresaId,
                        instancia: data.instancia,
                        itens: data.itens,
                        valoresAdicionais: data.valoresAdicionais
                    } as OrderData);
                }
            });
            if (this.isInitialLoad) this.isInitialLoad = false;
        });

        // ── Listener 2: leads (refatorado) ──
        this.setupLeadsListener(companyId);
    }

    stopListening() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
            this.isInitialLoad = true;
        }
        if (this.unsubscribeLeads) {
            this.unsubscribeLeads();
            this.unsubscribeLeads = null;
            this.isLeadsInitialLoad = true;
        }
        this.notifiedSupportIds.clear();
        this.orderStatusMap.clear();
    }
}

export const orderNotification = new OrderNotificationService();
