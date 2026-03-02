import { dbService } from '../services/db';
import { authService } from '../services/auth';
import { toast } from '../services/toast';
import { evolutionApi } from '../services/evolutionApi';

interface Instance {
    id: string;
    empresaId: string;
    nome: string;
    numero?: string;
    status: string;
}

interface LojaConfig {
    id: string;
    empresaId: string;
    lojaId: string;
    prompt_ia?: string;
    mensagens_automaticas?: {
        [key: string]: string | undefined;
    };
    horarios?: {
        [key: string]: { active: boolean; open: string; close: string; };
    };
    [key: string]: any;
}

// ─── Dynamic variables available ─────────────────────────────────────────────
const VARIAVEIS = [
    { key: '{{nome_lead}}', label: 'Nome do cliente', icon: 'fa-user' },
    { key: '{{telefone_lead}}', label: 'Telefone', icon: 'fa-phone' },
    { key: '{{numero_pedido}}', label: 'Nº do pedido', icon: 'fa-hashtag' },
    { key: '{{lista_produtos}}', label: 'Lista de produtos', icon: 'fa-basket-shopping' },
    { key: '{{valor_total}}', label: 'Valor total', icon: 'fa-money-bill' },
    { key: '{{endereco_entrega}}', label: 'Endereço de entrega', icon: 'fa-location-dot' },
    { key: '{{forma_pagamento}}', label: 'Forma de pagamento', icon: 'fa-credit-card' },
];

// ─── Message event fields ─────────────────────────────────────────────────────
const MSG_FIELDS = [
    {
        key: 'pedido_aceito',
        label: 'Pedido Aceito',
        icon: 'fa-check-circle',
        default: 'Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito. \n\n📦 Itens: {{lista_produtos}}\n💰 Total: R$ {{valor_total}}\n\nPode me informar a forma de pagamento?',
    },
    {
        key: 'pagamento_confirmado',
        label: 'Pagamento Confirmado',
        icon: 'fa-credit-card',
        default: 'Olá {{nome_lead}}! 💳 Pagamento confirmado! Seu pedido #{{numero_pedido}} está sendo preparado.',
    },
    {
        key: 'saiu_para_entrega',
        label: 'Saiu para Entrega',
        icon: 'fa-truck',
        default: '🚚 Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} saiu para entrega no endereço: {{endereco_entrega}}',
    },
    {
        key: 'pedido_entregue',
        label: 'Pedido Entregue',
        icon: 'fa-flag-checkered',
        default: '🏁 Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi entregue. Obrigado pela preferência!',
    },
    {
        key: 'pedido_cancelado',
        label: 'Pedido Cancelado',
        icon: 'fa-xmark',
        default: 'Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi cancelado.',
    }
];

export const Configuration = async () => {
    const currentUser = authService.getCurrentUser() as any;
    if (!currentUser || !currentUser.companyId) {
        return `<p>Acesso negado.</p>`;
    }

    const companyId = currentUser.companyId;

    const instancesRaw = await dbService.getAll('instancias', { field: 'empresaId', operator: '==', value: companyId });
    const instances = instancesRaw as Instance[];

    const companyDoc = await dbService.get('companies', companyId);
    const company = companyDoc as any;
    let stores = company?.stores || [];

    if (currentUser.role !== 'owner') {
        const userStoreIds = currentUser.storeIds || (currentUser.storeId ? [currentUser.storeId] : []);
        stores = stores.filter((s: any) => userStoreIds.includes(s.id));
    }

    if (stores.length === 0) {
        return `<p style="padding: 2rem;">Nenhuma loja encontrada para configuração.</p>`;
    }

    // Default to first store
    let activeStoreId = stores[0].id;

    const renderStoreTabs = () => `
        <div class="store-tabs" style="display:flex; gap:10px; margin-bottom: 20px; overflow-x:auto;">
            ${stores.map((s: any) => `
                <button class="btn-store-tab ${s.id === activeStoreId ? 'active' : ''}" data-id="${s.id}" style="
                    padding: 0.5rem 1rem;
                    background: ${s.id === activeStoreId ? 'var(--primary)' : 'var(--surface-hover)'};
                    color: ${s.id === activeStoreId ? '#fff' : 'var(--text-main)'};
                    border: 1px solid ${s.id === activeStoreId ? 'var(--primary)' : 'var(--border-color)'};
                    border-radius: 8px;
                    cursor: pointer;
                    white-space: nowrap;
                ">
                    <i class="fa-solid fa-store" style="margin-right:5px;"></i> ${s.name}
                </button>
            `).join('')}
        </div>
    `;

    const getActiveStore = () => stores.find((s: any) => s.id === activeStoreId);

    // Get loja config
    const lojaConfigsRaw = await dbService.getAll('loja_config', { field: 'empresaId', operator: '==', value: companyId }) as LojaConfig[];

    const getLojaConfig = (storeId: string) => {
        return lojaConfigsRaw.find((c: LojaConfig) => c.lojaId === storeId) || null;
    };

    // Build variables
    const buildVarChips = () => VARIAVEIS.map(v => `
        <div class="var-chip" draggable="true" data-var="${v.key}" title="Arraste para o campo de mensagem">
            <i class="fa-solid ${v.icon}"></i>
            <span>${v.label}</span>
            <code>${v.key}</code>
        </div>
    `).join('');

    setTimeout(() => {
        setupTabs();
        renderContent();
    }, 100);

    return `
        <style>
            .config-section-title {
                font-size: 1.1rem;
                font-weight: 700;
                color: var(--text-main);
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 1.25rem;
                padding-bottom: 0.75rem;
                border-bottom: 1px solid var(--border-color);
            }
            .config-select {
                width: 100%;
                padding: 0.8rem 1rem;
                background-color: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                color: var(--text-main);
                font-size: 0.95rem;
                appearance: none;
                cursor: pointer;
            }
            .config-select:focus { outline: none; border-color: var(--primary); }
            /* ── Variables ── */
            .vars-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
                padding: 1rem;
                background: rgba(99,102,241,0.04);
                border: 1px dashed rgba(99,102,241,0.25);
                border-radius: var(--radius-md);
            }
            .var-chip {
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                padding: 0.35rem 0.75rem;
                background: rgba(99,102,241,0.12);
                border: 1px solid rgba(99,102,241,0.3);
                border-radius: 6px;
                font-size: 0.82rem;
                color: var(--primary);
                cursor: grab;
                user-select: none;
            }
            .var-chip code { font-size: 0.72rem; color: rgba(167,139,250,0.8); font-family: monospace; }
            /* ── Message editors ── */
            .msg-card {
                background: rgba(255,255,255,0.03);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                overflow: hidden;
                margin-bottom: 1rem;
            }
            .msg-card-header {
                display: flex;
                align-items: center;
                gap: 0.6rem;
                padding: 0.75rem 1rem;
                background: rgba(255,255,255,0.025);
                border-bottom: 1px solid var(--border-color);
                font-weight: 600;
                font-size: 0.9rem;
            }
            .msg-editor-wrap { padding: 1rem; }
            .msg-textarea {
                width: 100%;
                background: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-sm);
                color: var(--text-main);
                font-size: 0.9rem;
                padding: 0.75rem;
                resize: vertical;
                box-sizing: border-box;
            }
            .msg-textarea:focus { outline: none; border-color: var(--primary); }
            .msg-save-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 0.75rem;
            }
            .btn-save-msg {
                padding: 0.45rem 1rem;
                background: var(--primary);
                color: white;
                border: none;
                border-radius: var(--radius-sm);
                font-size: 0.85rem;
                font-weight: 600;
                cursor: pointer;
            }
            .btn-save-msg:hover { background: var(--primary-hover); }
            .btn-save-msg.saved { background: var(--success); pointer-events: none; }

            /* ── Opening Hours (Horários) ── */
            .horarios-grid {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                margin-top: 1rem;
            }
            .horario-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.75rem 1rem;
                background: rgba(255,255,255,0.02);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                transition: 0.2s;
            }
            .horario-row.inactive { opacity: 0.6; background: transparent; }
            .horario-info { display: flex; align-items: center; gap: 1rem; flex: 1; }
            .horario-label { font-weight: 600; min-width: 120px; }
            .horario-inputs { display: flex; align-items: center; gap: 0.5rem; transition: 0.3s; }
            .horario-inputs.hidden { display: none; }
            .time-input {
                background: var(--bg-color);
                border: 1px solid var(--border-color);
                color: white;
                padding: 0.4rem 0.6rem;
                border-radius: 6px;
                font-size: 0.85rem;
                outline: none;
            }
            .time-input:focus { border-color: var(--primary); }
            
            /* Switch Toggle */
            .switch {
                position: relative;
                display: inline-block;
                width: 40px;
                height: 20px;
            }
            .switch input { opacity: 0; width: 0; height: 0; }
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0; left: 0; right: 0; bottom: 0;
                background-color: #333;
                transition: .4s;
                border-radius: 20px;
            }
            .slider:before {
                position: absolute;
                content: "";
                height: 14px; width: 14px;
                left: 3px; bottom: 3px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            input:checked + .slider { background-color: var(--primary); }
            input:checked + .slider:before { transform: translateX(20px); }
        </style>

        <div class="page-header">
            <h2 class="page-title">Configuração por Loja</h2>
        </div>

        <div id="tabs-container">
            ${renderStoreTabs()}
        </div>

        <div id="config-content-area"></div>
    `;

    function setupTabs() {
        const attachTabListeners = () => {
            document.querySelectorAll('.btn-store-tab').forEach(btn => {
                btn.addEventListener('click', () => {
                    activeStoreId = (btn as HTMLElement).dataset.id!;
                    const tabsContainer = document.getElementById('tabs-container');
                    if (tabsContainer) {
                        tabsContainer.innerHTML = renderStoreTabs();
                        attachTabListeners();
                    }
                    renderContent();
                });
            });
        };
        attachTabListeners();
    }

    function renderContent() {
        const activeStore = getActiveStore();
        if (!activeStore) return;

        const config = getLojaConfig(activeStoreId);
        const msgs = config?.mensagens_automaticas || {};
        const promptIa = config?.prompt_ia || activeStore.prompt_ia || '';

        const contentArea = document.getElementById('config-content-area');
        if (!contentArea) return;

        // Build select options
        const renderInstanceOptions = () => {
            return '<option value="">Nenhuma</option>' + instances.map(inst => {
                const isSelected = activeStore.instancia_id === inst.id;
                const linkedToOther = stores.some((s: any) => s.id !== activeStoreId && s.instancia_id === inst.id);
                return `<option value="${inst.id}" ${isSelected ? 'selected' : ''} ${linkedToOther ? 'disabled' : ''}>
                     ${inst.nome} (${inst.status}) ${linkedToOther ? '(Já vinculada a outra loja)' : ''}
                 </option>`;
            }).join('');
        };

        const buildMsgEditors = () => MSG_FIELDS.map(f => `
            <div class="msg-card" id="msg-card-${f.key}">
                <div class="msg-card-header">
                    <i class="fa-solid ${f.icon}" style="color:var(--primary);"></i>
                    <span>${f.label}</span>
                </div>
                <div class="msg-editor-wrap">
                    <textarea
                        id="msg-${f.key}"
                        class="msg-textarea"
                        rows="4"
                        placeholder="${f.default}"
                        data-msg-key="${f.key}"
                    >${(msgs as any)[f.key] || ''}</textarea>
                    <div class="msg-save-row">
                        <span style="font-size:0.75rem;color:var(--text-dim);"><i class="fa-solid fa-circle-info"></i> Arraste as variáveis abaixo para dentro do texto</span>
                        <button class="btn-save-msg" data-msg-key="${f.key}">
                            <i class="fa-solid fa-floppy-disk"></i> Salvar
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        contentArea.innerHTML = `
            <div class="card" style="margin-bottom: 1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-plug" style="color:var(--primary);"></i> Vinculação da Instância
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Selecione a instância de WhatsApp que responderá por esta loja. Se desconectada, a loja ficará inoperante.
                </p>
                <div style="display:flex; gap:10px; align-items:center;">
                    <select id="select-store-instance" class="config-select">
                        ${renderInstanceOptions()}
                    </select>
                </div>
                <div id="instance-status-indicator" style="margin-top: 10px;"></div>
            </div>

            <div class="card" style="margin-bottom: 1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-robot" style="color:var(--primary);"></i> Prompt da IA da Loja
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Configure o comportamento personalizado da IA (ex: tom de voz, regras da loja) para o atendimento.
                </p>
                <textarea id="prompt-ia" class="msg-textarea" rows="4" placeholder="Ex: Você é o assistente virtual da Loja X...">${promptIa}</textarea>
                <div style="text-align:right; margin-top:10px;">
                    <button class="btn-save-msg" id="btn-save-prompt">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Prompt
                    </button>
                </div>
            </div>

            <div class="card" style="margin-bottom: 1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-clock" style="color:var(--primary);"></i> Horário de Funcionamento
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Defina os dias e horários em que a loja está aberta para receber pedidos.
                </p>
                <div class="horarios-grid">
                    ${[
                { key: 'seg', label: 'Segunda-feira' },
                { key: 'ter', label: 'Terça-feira' },
                { key: 'qua', label: 'Quarta-feira' },
                { key: 'qui', label: 'Quinta-feira' },
                { key: 'sex', label: 'Sexta-feira' },
                { key: 'sab', label: 'Sábado' },
                { key: 'dom', label: 'Domingo' }
            ].map(dia => {
                const diaInfo = config?.horarios?.[dia.key] || { active: false, open: '08:00', close: '18:00' };
                return `
                        <div class="horario-row ${!diaInfo.active ? 'inactive' : ''}" id="row-${dia.key}">
                            <div class="horario-info">
                                <label class="switch">
                                    <input type="checkbox" class="dia-toggle" data-dia="${dia.key}" ${diaInfo.active ? 'checked' : ''}>
                                    <span class="slider"></span>
                                </label>
                                <span class="horario-label">${dia.label}</span>
                            </div>
                            <div class="horario-inputs ${!diaInfo.active ? 'hidden' : ''}" id="inputs-${dia.key}">
                                <input type="time" class="time-input" id="open-${dia.key}" value="${diaInfo.open || '08:00'}">
                                <span style="color:var(--text-dim);font-size:0.8rem;">até</span>
                                <input type="time" class="time-input" id="close-${dia.key}" value="${diaInfo.close || '18:00'}">
                            </div>
                            <div class="status-label" id="status-${dia.key}" style="font-size: 0.8rem; color: ${diaInfo.active ? 'var(--success)' : 'var(--text-dim)'}; min-width: 60px; text-align: right;">
                                ${diaInfo.active ? 'Aberto' : 'Fechado'}
                            </div>
                        </div>
                    `;
            }).join('')}
                </div>
                <div style="text-align:right; margin-top:1.5rem;">
                    <button class="btn-save-msg" id="btn-save-horarios">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Horários
                    </button>
                </div>
            </div>

            <div class="card">
                <div class="config-section-title">
                    <i class="fa-solid fa-message" style="color:var(--primary);"></i> Mensagens Automáticas
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.25rem;">
                    Personalize as mensagens enviadas automaticamente ao cliente em cada etapa do pedido.
                </p>
                <div style="margin-bottom:1rem;">
                    <div class="vars-grid" id="vars-grid">
                        ${buildVarChips()}
                    </div>
                </div>
                <div id="msg-editors">
                    ${buildMsgEditors()}
                </div>
            </div>
        `;

        // Wait to populate and setup binds
        setTimeout(() => {
            updateInstanceIndicator();
            setupStoreListeners();
        }, 50);
    }

    async function updateInstanceIndicator() {
        const indicator = document.getElementById('instance-status-indicator');
        if (!indicator) return;
        const activeStore = getActiveStore();
        if (!activeStore || !activeStore.instancia_id) {
            indicator.innerHTML = '<span class="badge danger"><i class="fa-solid fa-circle-xmark"></i> Nenhuma instância</span>';
            return;
        }
        const inst = instances.find(i => i.id === activeStore.instancia_id);
        if (inst) {
            try {
                const checked = await evolutionApi.getInstanceStatus(inst.nome);
                if (checked.connected) {
                    indicator.innerHTML = '<span class="badge success"><i class="fa-solid fa-circle-check"></i> Instância Online</span>';
                } else {
                    indicator.innerHTML = '<span class="badge danger"><i class="fa-solid fa-triangle-exclamation"></i> Instância Desconectada</span>';
                }
            } catch (e) {
                indicator.innerHTML = '<span class="badge warning">Verificando...</span>';
            }
        }
    }

    function setupStoreListeners() {
        const selectInst = document.getElementById('select-store-instance') as HTMLSelectElement;
        selectInst?.addEventListener('change', async () => {
            const newInstId = selectInst.value;
            const previousInstId = getActiveStore()?.instancia_id;

            const updatedStores = stores.map((s: any) =>
                s.id === activeStoreId ? { ...s, instancia_id: newInstId || null } : s
            );

            try {
                toast.info('Salvando configuração...');
                await dbService.update('companies', companyId, { stores: updatedStores });
                stores = updatedStores;
                const activeStore = getActiveStore();
                if (activeStore) activeStore.instancia_id = newInstId;

                // ── Webhook Automation and Instance Linkage ─────────────────────────
                if (newInstId) {
                    const inst = instances.find(i => i.id === newInstId);
                    if (inst) {
                        // Detect active module/function
                        const activeModules = company.modulos_ativos || ['atendimento'];
                        let funcao = 'atendimento';
                        if (activeModules.includes('venda')) funcao = 'venda';
                        else if (activeModules.includes('agendamento')) funcao = 'agendamento';
                        else if (activeModules.includes('atendimento')) funcao = 'atendimento';
                        else if (activeModules.includes('disparo')) funcao = 'disparo';

                        // Fetch global webhook
                        const webhookSettings = await dbService.get('settings', 'webhooks') as any;
                        const webhookUrl = webhookSettings ? webhookSettings[funcao] : null;

                        toast.info(`Vinculando instância e configurando webhook (${funcao})...`);

                        // Update Instance document in DB
                        await dbService.update('instancias', inst.id, {
                            lojaId: activeStoreId,
                            funcao: funcao,
                            webhookUrl: webhookUrl || null
                        });

                        // Set Webhook in Evolution API
                        if (webhookUrl) {
                            const webhookSet = await evolutionApi.setWebhook(inst.nome, webhookUrl);
                            if (!webhookSet) {
                                toast.warning('Configuração salva, mas houve uma falha ao ativar o webhook na API.');
                            } else {
                                toast.success('Webhook configurado com sucesso!');
                            }
                        }
                    }
                } else if (previousInstId) {
                    // Logic to deactivate webhook on Evolution API
                    const prevInst = instances.find(i => i.id === previousInstId);
                    if (prevInst) {
                        toast.info(`Desvinculando instância e desativando webhook...`);

                        // Disable webhook in API
                        await evolutionApi.setWebhook(prevInst.nome, '', false);

                        // Clear instance metadata in DB
                        await dbService.update('instancias', prevInst.id, {
                            lojaId: null,
                            funcao: null,
                            webhookUrl: null
                        });
                    }
                }

                updateInstanceIndicator();
                toast.success('Vínculo de instância atualizado com sucesso!');
            } catch (error) {
                toast.error('Erro ao atualizar vínculo: ' + error);
                renderContent(); // Revert UI
            }
        });

        const btnPrompt = document.getElementById('btn-save-prompt');
        btnPrompt?.addEventListener('click', async () => {
            const val = (document.getElementById('prompt-ia') as HTMLTextAreaElement).value.trim();
            try {
                if (btnPrompt) btnPrompt.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';
                const config = getLojaConfig(activeStoreId);

                if (config) {
                    await dbService.update('loja_config', config.id, { prompt_ia: val });
                    config.prompt_ia = val;
                } else {
                    const newId = await dbService.create('loja_config', { empresaId: companyId, lojaId: activeStoreId, prompt_ia: val });
                    lojaConfigsRaw.push({ id: newId as string, empresaId: companyId, lojaId: activeStoreId, prompt_ia: val });
                }

                // Also save on store to keep "loja.prompt_ia" direct access
                const updatedStores = stores.map((s: any) => s.id === activeStoreId ? { ...s, prompt_ia: val } : s);
                await dbService.update('companies', companyId, { stores: updatedStores });
                stores = updatedStores;

                toast.success('Prompt salvo com sucesso!');
                if (btnPrompt) btnPrompt.innerHTML = '<i class="fa-solid fa-check"></i> Salvo!';
                setTimeout(() => { if (btnPrompt) btnPrompt.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar Prompt'; }, 2000);
            } catch (e) {
                toast.error('Erro ao salvar prompt.');
                if (btnPrompt) btnPrompt.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar Prompt';
            }
        });

        // Opening Hours Listeners
        document.querySelectorAll('.dia-toggle').forEach((toggle: any) => {
            toggle.addEventListener('change', () => {
                const dia = toggle.dataset.dia;
                const active = toggle.checked;
                const row = document.getElementById(`row-${dia}`);
                const inputs = document.getElementById(`inputs-${dia}`);
                const status = document.getElementById(`status-${dia}`);

                if (active) {
                    row?.classList.remove('inactive');
                    inputs?.classList.remove('hidden');
                    if (status) {
                        status.innerText = 'Aberto';
                        status.style.color = 'var(--success)';
                    }
                } else {
                    row?.classList.add('inactive');
                    inputs?.classList.add('hidden');
                    if (status) {
                        status.innerText = 'Fechado';
                        status.style.color = 'var(--text-dim)';
                    }
                }
            });
        });

        const btnSaveHorarios = document.getElementById('btn-save-horarios');
        btnSaveHorarios?.addEventListener('click', async () => {
            try {
                btnSaveHorarios.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';
                const horarios: any = {};
                ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'].forEach(dia => {
                    const active = (document.querySelector(`.dia-toggle[data-dia="${dia}"]`) as HTMLInputElement).checked;
                    const open = (document.getElementById(`open-${dia}`) as HTMLInputElement).value;
                    const close = (document.getElementById(`close-${dia}`) as HTMLInputElement).value;
                    horarios[dia] = { active, open, close };
                });

                const config = getLojaConfig(activeStoreId);
                if (config) {
                    await dbService.update('loja_config', config.id, { horarios });
                    config.horarios = horarios;
                } else {
                    const newId = await dbService.create('loja_config', {
                        empresaId: companyId,
                        lojaId: activeStoreId,
                        horarios
                    });
                    lojaConfigsRaw.push({ id: newId as string, empresaId: companyId, lojaId: activeStoreId, horarios });
                }

                toast.success('Horários de funcionamento salvos!');
                btnSaveHorarios.innerHTML = '<i class="fa-solid fa-check"></i> Salvo!';
                setTimeout(() => { btnSaveHorarios.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar Horários'; }, 2000);
            } catch (err) {
                toast.error('Erro ao salvar horários.');
                btnSaveHorarios.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar Horários';
            }
        });

        // Config message drag/drop
        document.querySelectorAll<HTMLElement>('.var-chip').forEach(chip => {
            chip.addEventListener('dragstart', (e) => {
                e.dataTransfer!.setData('text/plain', chip.dataset.var || '');
            });
        });

        document.querySelectorAll<HTMLTextAreaElement>('.msg-textarea').forEach(ta => {
            ta.addEventListener('dragover', (e) => e.preventDefault());
            ta.addEventListener('drop', (e) => {
                e.preventDefault();
                const variable = e.dataTransfer!.getData('text/plain');
                if (!variable) return;
                const start = ta.selectionStart ?? ta.value.length;
                const end = ta.selectionEnd ?? ta.value.length;
                ta.value = ta.value.slice(0, start) + variable + ta.value.slice(end);
            });
        });

        document.querySelectorAll<HTMLButtonElement>('.btn-save-msg').forEach(btn => {
            if (btn.id === 'btn-save-prompt') return;
            btn.addEventListener('click', async () => {
                const key = btn.dataset.msgKey!;
                const val = (document.getElementById(`msg-${key}`) as HTMLTextAreaElement).value.trim();

                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';

                try {
                    const config = getLojaConfig(activeStoreId);
                    if (config) {
                        const updatePayload = { [`mensagens_automaticas.${key}`]: val || null };
                        await dbService.update('loja_config', config.id, updatePayload);
                        if (!config.mensagens_automaticas) config.mensagens_automaticas = {};
                        config.mensagens_automaticas[key] = val || undefined;
                    } else {
                        const newId = await dbService.create('loja_config', {
                            empresaId: companyId,
                            lojaId: activeStoreId,
                            mensagens_automaticas: { [key]: val || null }
                        });
                        lojaConfigsRaw.push({ id: newId as string, empresaId: companyId, lojaId: activeStoreId, mensagens_automaticas: { [key]: val || undefined } });
                    }

                    toast.success('Mensagem salva com sucesso!');
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Salvo!';
                    setTimeout(() => { btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar'; }, 2000);
                } catch (err) {
                    toast.error('Erro ao salvar mensagem.');
                    btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar';
                }
            });
        });
    }
};

