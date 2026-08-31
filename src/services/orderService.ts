import { dbService } from './db';
import { evolutionApi } from './evolutionApi';
import { Timestamp } from 'firebase/firestore';
import { API_BASE_URL } from './api';
import { auth } from '../firebase/config';

// Headers autenticados (ID token do Firebase) pros endpoints protegidos do backend.
async function authHeaders(): Promise<Record<string, string>> {
    const h: Record<string, string> = { 'Content-Type': 'application/json' };
    const user = auth.currentUser;
    if (user) {
        try { h['Authorization'] = `Bearer ${await user.getIdToken()}`; } catch { /* ignore */ }
    }
    return h;
}

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
            // Reflete os extraUpdates no objeto local (a UI atualiza na hora)
            if (extraUpdates) {
                Object.assign(order, extraUpdates);
            }

            // Tudo server-side: o backend atualiza o status no Firestore (Admin SDK),
            // finaliza o lead, envia a mensagem e — se cancelar pedido pago — estorna.
            // O cliente não escreve mais direto no pedido.
            const resp = await fetch(`${API_BASE_URL}/api/orders/status`, {
                method: 'POST',
                headers: await authHeaders(),
                body: JSON.stringify({ orderId: order.id, newStatus, reason, extraUpdates }),
            });
            const data = await resp.json().catch(() => ({}));
            if (!resp.ok) throw new Error(data.error || 'erro_ao_mudar_status');
            return !!data.sent;
        } catch (error) {
            console.error('OrderService - Error updating status:', error);
            throw error;
        }
    },

    /**
     * Arquiva um pedido (server-side, autenticado).
     */
    async archiveOrder(orderId: string, arquivado = true) {
        const resp = await fetch(`${API_BASE_URL}/api/orders/archive`, {
            method: 'POST',
            headers: await authHeaders(),
            body: JSON.stringify({ orderId, arquivado }),
        });
        if (!resp.ok) {
            const d = await resp.json().catch(() => ({}));
            throw new Error(d.error || 'erro_ao_arquivar');
        }
        return true;
    },

    /**
     * Mensagem de intervenção do atendente (backend resolve instância/telefone e loga).
     */
    async interveneOrder(orderId: string, message: string) {
        const resp = await fetch(`${API_BASE_URL}/api/orders/intervene`, {
            method: 'POST',
            headers: await authHeaders(),
            body: JSON.stringify({ orderId, message }),
        });
        if (!resp.ok) {
            const d = await resp.json().catch(() => ({}));
            throw new Error(d.error || 'erro_ao_enviar');
        }
        return true;
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
