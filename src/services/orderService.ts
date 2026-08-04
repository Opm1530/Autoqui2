import { dbService } from './db';
import { evolutionApi } from './evolutionApi';
import { Timestamp } from 'firebase/firestore';
import { API_BASE_URL } from './api';

// ─── Novo fluxo oficial de statusPedido ───────────────────────────────────────
// em_montagem → aguardando_pagamento → em_preparo → saiu_para_entrega → finalizado
// cancelado (estado terminal independente)

export type OrderStatus =
    | 'em_montagem'
    | 'aguardando_pagamento'
    | 'em_preparo'
    | 'pedido_pronto'
    | 'saiu_para_entrega'
    | 'finalizado'
    | 'cancelado';

// Nota: a montagem de mensagens (buildVars, templates, escolha por status)
// e o envio pela Evolution foram movidos para o backend (/api/notify-*).
// Aqui ficam só helpers ainda usados no frontend.

function isToday(date: any): boolean {
    if (!date) return false;
    const d = date.toDate ? date.toDate() : new Date(date);
    const now = new Date();
    return d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear();
}


async function notifyNewOrder(order: any, _companyId: string) {
    // Fase 1 da migração: o envio da mensagem de "pedido recebido" passou pro backend.
    // O navegador manda só o orderId; o servidor lê o pedido no Firestore e envia
    // pela Evolution (a chave da Evolution não fica mais no frontend).
    try {
        const orderId = order?.id;
        if (!orderId) return;

        await fetch(`${API_BASE_URL}/api/notify-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId }),
        });
    } catch (error) {
        console.error('OrderService - Error in notifyNewOrder:', error);
    }
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const orderService = {
    notifyNewOrder,

    /**
     * Update order status.
     * Fetches custom messages from empresa_config, applies variable substitution.
     * NEVER alters statusLead or statusAtendimento, EXCEPT: finalizado → statusAtendimento = 'finalizado'.
     */
    async updateOrderStatus(
        order: any,
        _companyId: string,
        newStatus: OrderStatus,
        reason?: string,
        extraUpdates?: any
    ) {
        try {
            // Apply extra updates so the order object reflects the new values
            if (extraUpdates) {
                Object.assign(order, extraUpdates);
            }

            // Status ANTES da mudança — o backend usa pra escolher a variação
            // certa de "pedido aceito".
            const prevStatus = order.status;

            // 1. Atualiza o status no Firestore (ainda client-side nesta fase)
            let updates: any = { status: newStatus, updatedAt: Timestamp.now() };
            if (reason) updates.rejectionReason = reason;
            if (extraUpdates) {
                updates = { ...updates, ...extraUpdates };
            }
            await dbService.update('pedidos', order.id, updates);

            // 2. Ao finalizar → atualiza statusAtendimento do lead
            if (newStatus === 'finalizado' && order.leadId) {
                await dbService.update('leads', order.leadId, {
                    statusAtendimento: 'finalizado',
                    updatedAt: Timestamp.now()
                });
            }

            // 3. Envio da mensagem via backend (server-side; chave da Evolution
            //    fica no servidor). O backend lê o pedido, monta a mensagem certa
            //    e envia — inclusive salva o log em `messages`.
            let sent = false;
            try {
                const resp = await fetch(`${API_BASE_URL}/api/notify-status`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ orderId: order.id, newStatus, prevStatus, reason }),
                });
                const data = await resp.json().catch(() => ({}));
                sent = !!data.sent;
            } catch (err) {
                console.error('OrderService - Error notifying status change:', err);
            }

            return sent;
        } catch (error) {
            console.error('OrderService - Error updating status:', error);
            throw error;
        }
    },

    /**
     * Activate human support for a lead WITHOUT changing order status.
     */
    async activateHumanSupport(leadId: string) {
        await dbService.update('leads', leadId, {
            statusAtendimento: 'em_atendimento_humano',
            estado: 'atendimento_humano',
            updatedAt: Timestamp.now()
        });
    },

    /**
     * Send an intervention message from the attendant.
     * Saves to messages collection, does NOT change any status.
     */
    async sendInterventionMessage(
        companyId: string,
        leadId: string,
        instanceName: string,
        phone: string,
        message: string
    ) {
        const sent = await evolutionApi.sendText(instanceName, phone, message);
        await dbService.create('messages', {
            conteudo: message,
            createdAt: Timestamp.now(),
            empresaId: companyId,
            leadId,
            role: 'assistente',
            tipo: 'conversation',
        });
        return sent;
    },

    /**
     * Save message log to Firestore
     */
    async saveMessageLog(companyId: string, leadId: string, message: string) {
        try {
            await dbService.create('messages', {
                conteudo: message,
                createdAt: Timestamp.now(),
                empresaId: companyId,
                leadId,
                role: 'assistente',
                tipo: 'conversation',
            });
        } catch (error) {
            console.error('OrderService - Error logging message:', error);
        }
    },

    async getOrderDetails(orderId: string) {
        return await dbService.get('pedidos', orderId);
    },

    async getOpenOrdersCount(companyId: string, storeIds?: string[]): Promise<number> {
        try {
            const orders = await dbService.getAll('pedidos', {
                field: 'empresaId',
                operator: '==',
                value: companyId
            });
            return orders.filter((o: any) => {
                // Filter by store if provided
                if (storeIds && storeIds.length > 0) {
                    if (!o.lojaId || !storeIds.includes(o.lojaId)) return false;
                }

                // If explicitly archived, don't count
                if (o.arquivado) return false;

                const status = (o.status || 'em_montagem').toLowerCase();
                const isTerminal = status === 'finalizado' || status === 'cancelado';

                // If terminal but from a past date, it's implicitly archived
                if (isTerminal) {
                    const date = o.criadoEm || o.createdAt;
                    if (!isToday(date)) return false;
                }

                return !isTerminal;
            }).length;
        } catch {
            return 0;
        }
    }
};
