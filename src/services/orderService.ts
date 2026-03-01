import { dbService } from './db';
import { evolutionApi } from './evolutionApi';
import { Timestamp } from 'firebase/firestore';

// ─── Novo fluxo oficial de statusPedido ───────────────────────────────────────
// em_montagem → aguardando_pagamento → em_preparo → saiu_para_entrega → finalizado
// cancelado (estado terminal independente)

export type OrderStatus =
    | 'em_montagem'
    | 'aguardando_pagamento'
    | 'em_preparo'
    | 'saiu_para_entrega'
    | 'finalizado'
    | 'cancelado';

// ─── Variable substitution ────────────────────────────────────────────────────

function substituirVariaveis(template: string, vars: Record<string, string>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return vars[key] !== undefined ? vars[key] : match;
    });
}

function buildVars(order: any, lead: any): Record<string, string> {
    const itens = Array.isArray(order.itens)
        ? order.itens.map((i: any) => `${i.quantidade}x ${i.item}`).join(', ')
        : '';
    return {
        nome_lead: lead?.nome || lead?.name || 'Cliente',
        telefone_lead: (lead?.telefone || '').split('@')[0],
        numero_pedido: order.id?.slice(-6).toUpperCase() || '',
        lista_produtos: itens,
        valor_total: `R$ ${(order.value || order.total || 0).toFixed(2)}`,
        endereco_entrega: order.endereco || 'Não informado',
        forma_pagamento: order.formaPagamento || 'Não informado',
    };
}

// ─── Default messages (fallback) ──────────────────────────────────────────────

const DEFAULT_MESSAGES: Record<string, string> = {
    pedido_aceito: '✅ Pedido confirmado! Pode me informar a forma de pagamento?',
    pagamento_confirmado: '💳 Pagamento confirmado! Seu pedido já está sendo preparado.',
    saiu_para_entrega: '🚚 Boa notícia! Seu pedido saiu para entrega.',
    pedido_entregue: '🏁 Seu pedido foi entregue e finalizado. Obrigado pela preferência!',
    pedido_cancelado: '❌ Seu pedido foi cancelado.',
};

// ─── Map OrderStatus → message key ───────────────────────────────────────────

function getMsgKey(newStatus: OrderStatus): string | null {
    switch (newStatus) {
        case 'aguardando_pagamento': return 'pedido_aceito';
        case 'em_preparo': return 'pagamento_confirmado';
        case 'saiu_para_entrega': return 'saiu_para_entrega';
        case 'finalizado': return 'pedido_entregue';
        case 'cancelado': return 'pedido_cancelado';
        default: return null;
    }
}

// ─── Fetch empresa_config messages ───────────────────────────────────────────

async function fetchMensagensConfig(companyId: string, lojaId?: string): Promise<Record<string, string>> {
    try {
        // 1. Try to fetch from loja_config first (specific store config)
        if (lojaId) {
            const lojaConfigs = await dbService.getAll('loja_config', {
                field: 'lojaId',
                operator: '==',
                value: lojaId
            });
            if (lojaConfigs && lojaConfigs.length > 0) {
                const config = lojaConfigs[0] as any;
                if (config.mensagens_automaticas) {
                    return config.mensagens_automaticas;
                }
            }
        }

        // 2. Fallback to old empresa_config (if it exists)
        const configs = await dbService.getAll('empresa_config', {
            field: 'empresaId',
            operator: '==',
            value: companyId
        });
        if (configs && configs.length > 0) {
            return (configs[0] as any).mensagens_automaticas || {};
        }
    } catch (err) {
        console.error('Error fetching message config:', err);
    }
    return {};
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const orderService = {

    /**
     * Update order status.
     * Fetches custom messages from empresa_config, applies variable substitution.
     * NEVER alters statusLead or statusAtendimento, EXCEPT: finalizado → statusAtendimento = 'finalizado'.
     */
    async updateOrderStatus(
        order: any,
        companyId: string,
        newStatus: OrderStatus,
        reason?: string,
        extraUpdates?: any
    ) {
        try {
            // Apply extra updates so buildVars uses the correct new values
            if (extraUpdates) {
                Object.assign(order, extraUpdates);
            }

            // 1. Get instance name
            let instanceName = order.instancia;
            if (!instanceName) {
                const company = await dbService.get('companies', companyId) as any;
                instanceName = company?.whatsappInstance?.instanceName || null;
            }

            // 2. Get lead data
            const lead = await dbService.get('leads', order.leadId) as any;
            const phone = lead?.telefone || lead?.whatsapp || order.leadId;

            // 3. Build variables map
            const vars = buildVars(order, lead);

            // 4. Fetch custom messages (prioritizing specific store config)
            const customMsgs = await fetchMensagensConfig(companyId, order.lojaId);

            // 5. Build message
            let message = '';
            const msgKey = getMsgKey(newStatus);
            if (msgKey) {
                if (newStatus === 'cancelado') {
                    const template = customMsgs[msgKey] || DEFAULT_MESSAGES[msgKey] || '';
                    const baseMsg = template ? substituirVariaveis(template, vars) : DEFAULT_MESSAGES[msgKey];
                    message = reason ? `${baseMsg} Motivo: ${reason}` : baseMsg;
                } else {
                    const template = customMsgs[msgKey] || DEFAULT_MESSAGES[msgKey] || '';
                    message = template ? substituirVariaveis(template, vars) : '';
                }
            }

            // 6. Update order in Firestore (only statusPedido)
            let updates: any = { status: newStatus, updatedAt: Timestamp.now() };
            if (reason) updates.rejectionReason = reason;
            if (extraUpdates) {
                updates = { ...updates, ...extraUpdates };
            }
            await dbService.update('pedidos', order.id, updates);

            // 7. ÚNICA EXCEÇÃO: ao finalizar → atualiza statusAtendimento do lead
            if (newStatus === 'finalizado' && order.leadId) {
                await dbService.update('leads', order.leadId, {
                    statusAtendimento: 'finalizado',
                    updatedAt: Timestamp.now()
                });
            }

            // 8. Send WhatsApp message
            let sent = false;
            if (message && instanceName) {
                sent = await evolutionApi.sendText(instanceName, phone, message);
                await this.saveMessageLog(companyId, order.leadId, message);
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

    async getOpenOrdersCount(companyId: string): Promise<number> {
        try {
            const orders = await dbService.getAll('pedidos', {
                field: 'empresaId',
                operator: '==',
                value: companyId
            });
            return orders.filter((o: any) => {
                const status = (o.status || 'em_montagem').toLowerCase();
                return status !== 'finalizado' && status !== 'cancelado';
            }).length;
        } catch {
            return 0;
        }
    }
};
