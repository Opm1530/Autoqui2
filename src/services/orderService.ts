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
    | 'pedido_pronto'
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
    // Normalize: catalog orders use `items` with {name, qty, price} while legacy uses `itens` with {item, quantidade, preco}
    const rawItems = Array.isArray(order.itens) ? order.itens : Array.isArray(order.items) ? order.items : [];
    const itens = rawItems.map((i: any) => ({
        item: i.item || i.name || '',
        quantidade: i.quantidade || i.qty || 1,
        preco: i.preco || i.price || 0,
    }));
    const lista = itens.map((i: any) => `${i.quantidade}x ${i.item}`).join(', ');
    return {
        nome_lead: lead?.nome || lead?.name || order.clientName || order.nome || 'Cliente',
        telefone_lead: (lead?.telefone || '').split('@')[0] || order.clientPhone || '',
        numero_pedido: order.id?.slice(-6).toUpperCase() || '',
        lista_produtos: lista,
        valor_total: `R$ ${(order.value || order.total || 0).toFixed(2)}`,
        endereco_entrega: order.endereco || order.clientAddress || 'Não informado',
        forma_pagamento: order.formaPagamento || order.paymentMethod || order.pagamento || 'Não informado',
    };
}

// ─── Default messages (fallback) ──────────────────────────────────────────────

const DEFAULT_MESSAGES: Record<string, string> = {
    pedido_aceito: '✅ Pedido confirmado! Pode me informar a forma de pagamento?',
    pedido_aceito_retirada: '✅ Pedido confirmado para retirada! Já está sendo preparado.',
    pagamento_confirmado: '💳 Pagamento confirmado! Seu pedido já está sendo preparado.',
    pedido_pronto: '📦 Seu pedido já está pronto para retirada!',
    saiu_para_entrega: '🚚 Boa notícia! Seu pedido saiu para entrega.',
    pedido_entregue: '🏁 Seu pedido foi entregue e finalizado. Obrigado pela preferência!',
    pedido_cancelado: '❌ Seu pedido foi cancelado.',
};

// ─── Map OrderStatus → message key ───────────────────────────────────────────

function getMsgKey(newStatus: OrderStatus): string | null {
    switch (newStatus) {
        case 'aguardando_pagamento': return 'pedido_aceito';
        case 'em_preparo': return 'pagamento_confirmado';
        case 'pedido_pronto': return 'pedido_pronto';
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

            // 1. Get instance name — try order.instancia, then loja_config, then company stores, then company fallback
            let instanceName = order.instancia || null;
            if (!instanceName) {
                const sid = order.storeId || order.lojaId;
                if (sid) {
                    try {
                        // a. Check loja_config
                        const lojaConfigs = await dbService.getAll('loja_config', { field: 'lojaId', operator: '==', value: sid }) as any[];
                        const lojaConf = lojaConfigs[0];
                        let targetInstId = lojaConf?.instancia_id;

                        // b. Check company stores array if not found in loja_config
                        const company = await dbService.get('companies', companyId) as any;
                        if (!targetInstId && company?.stores) {
                            const storeInfo = company.stores.find((s: any) => s.id === sid);
                            targetInstId = storeInfo?.instancia_id;
                        }

                        if (targetInstId) {
                            const instDoc = await dbService.get('instancias', targetInstId) as any;
                            instanceName = instDoc?.nome || null;
                        }

                        // c. Fallback to global if still not found
                        if (!instanceName && company?.whatsappInstance?.instanceName) {
                            instanceName = company.whatsappInstance.instanceName;
                        }
                    } catch (err) { console.error('Error fetching instance for store:', err); }
                }
            }

            if (!instanceName) {
                const company = await dbService.get('companies', companyId) as any;
                instanceName = company?.whatsappInstance?.instanceName || null;
            }

            // 2. Get lead data (catalog orders have no leadId — guard this)
            const lead = order.leadId ? await dbService.get('leads', order.leadId) as any : null;
            // Phone: prefer lead, fallback to clientPhone (catalog orders)
            const phone = lead?.telefone || lead?.whatsapp ||
                (order.clientPhone ? order.clientPhone.replace(/\D/g, '') : null) ||
                order.leadId || null;

            // 3. Build variables map
            const vars = buildVars(order, lead);

            // 4. Fetch custom messages (prioritizing specific store config)
            const customMsgs = await fetchMensagensConfig(companyId, order.lojaId || order.storeId);

            // 5. Build message
            let message = '';
            let msgKey = getMsgKey(newStatus);

            // ESPECIAL: Se estivermos indo de 'em_montagem' diretamente para 'em_preparo' (retirada sem pagamento antecipado)
            if (newStatus === 'em_preparo' && (order.status === 'em_montagem' || !order.status)) {
                msgKey = 'pedido_aceito_retirada';
            }

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

            // 8. Send WhatsApp message (only if we have both instance and phone)
            let sent = false;
            if (message && instanceName && phone) {
                sent = await evolutionApi.sendText(instanceName, phone, message);
                if (order.leadId) await this.saveMessageLog(companyId, order.leadId, message);
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

                const status = (o.status || 'em_montagem').toLowerCase();
                return status !== 'finalizado' && status !== 'cancelado';
            }).length;
        } catch {
            return 0;
        }
    }
};
