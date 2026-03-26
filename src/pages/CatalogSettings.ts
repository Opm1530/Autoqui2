import { dbService } from '../services/db';
import { authService } from '../services/auth';
import { toast } from '../services/toast';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// ─── Message event fields ─────────────────────────────────────────────────────
const MSG_FIELDS = [
    { key: 'pedido_aceito_entrega_pago', label: 'Pedido aceito (Entrega pagamento adiantado)', icon: 'fa-check-circle', default: 'Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado (Pagamento Adiantado). \n\n📦 Itens: {{lista_produtos}}\n💰 Total: R$ {{valor_total}}' },
    { key: 'pedido_aceito_entrega_pendente', label: 'Pedido aceito (Entrega pagamento na entrega)', icon: 'fa-motorcycle', default: 'Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado. O pagamento será feito na entrega. \n\n📦 Itens: {{lista_produtos}}\n💰 Total: R$ {{valor_total}}' },
    { key: 'pedido_aceito_retirada', label: 'Pedido Aceito (Retirada)', icon: 'fa-store', default: 'Olá {{nome_lead}}! Pedido #{{numero_pedido}} aceito para retirada. Valor: R$ {{valor_total}}. Aguardamos você!' },
    { key: 'pagamento_confirmado', label: 'Pagamento Confirmado', icon: 'fa-credit-card', default: 'Olá {{nome_lead}}! Pagamento do pedido #{{numero_pedido}} confirmado. Já estamos preparando!' },
    { key: 'pedido_pronto', label: 'Pedido Pronto (Retirada)', icon: 'fa-box', default: 'Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} está pronto para retirada!' },
    { key: 'saiu_para_entrega', label: 'Saiu para Entrega', icon: 'fa-truck', default: 'Olá {{nome_lead}}! Pedido #{{numero_pedido}} saiu para entrega: {{endereco_entrega}}' },
    { key: 'pedido_entregue', label: 'Pedido Entregue / Finalizado', icon: 'fa-flag-checkered', default: 'Olá {{nome_lead}}! Pedido #{{numero_pedido}} finalizado. Obrigado pela preferência!' },
    { key: 'pedido_cancelado', label: 'Pedido Cancelado', icon: 'fa-xmark', default: 'Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi cancelado.' },
    { key: 'pedido_recebido', label: 'Pedido Recebido (Aguardando Aprovação)', icon: 'fa-clock', default: 'Olá {{nome_lead}}! Recebemos seu pedido #{{numero_pedido}}. Estamos revisando e já te informamos o status! ⏳' }
];

const VARIAVEIS = [
    { key: '{{nome_lead}}', label: 'Nome do cliente', icon: 'fa-user' },
    { key: '{{numero_pedido}}', label: 'Nº do pedido', icon: 'fa-hashtag' },
    { key: '{{lista_produtos}}', label: 'Lista de produtos', icon: 'fa-basket-shopping' },
    { key: '{{valor_total}}', label: 'Valor total', icon: 'fa-money-bill' },
    { key: '{{endereco_entrega}}', label: 'Endereço de entrega', icon: 'fa-location-dot' },
    { key: '{{forma_pagamento}}', label: 'Forma de pagamento', icon: 'fa-credit-card' },
];

const DIAS = [
    { key: 'seg', label: 'Segunda-feira' },
    { key: 'ter', label: 'Terça-feira' },
    { key: 'qua', label: 'Quarta-feira' },
    { key: 'qui', label: 'Quinta-feira' },
    { key: 'sex', label: 'Sexta-feira' },
    { key: 'sab', label: 'Sábado' },
    { key: 'dom', label: 'Domingo' },
];

export const CatalogSettings = async () => {
    const currentUser = authService.getCurrentUser() as any;
    if (!currentUser || !currentUser.companyId) return `<p>Acesso negado.</p>`;

    const companyId = currentUser.companyId;
    const companyDoc = await dbService.get('companies', companyId) as any;
    let stores = companyDoc?.stores || [];
    const hasMercadoPago = !!(companyDoc?.mercadoPagoToken);

    if (currentUser.role !== 'owner') {
        const userStoreIds = currentUser.storeIds || (currentUser.storeId ? [currentUser.storeId] : []);
        stores = stores.filter((s: any) => userStoreIds.includes(s.id));
    }
    if (stores.length === 0) return `<p style="padding:2rem;">Nenhuma loja disponível para configuração.</p>`;

    const allInstances = await dbService.getAll('instancias', { field: 'empresaId', operator: '==', value: companyId }) as any[];
    const lojaConfigsRaw = await dbService.getAll('loja_config', { field: 'empresaId', operator: '==', value: companyId }) as any[];

    let activeStoreId = stores[0].id;

    const getLojaConfig = (storeId: string) => lojaConfigsRaw.find((c: any) => c.lojaId === storeId) || null;

    // ── Store tabs renderer ──────────────────────────────────────────────────
    const renderStoreTabs = () => `
        <div class="store-tabs" style="display:flex; gap:10px; margin-bottom:20px; overflow-x:auto;">
            ${stores.map((s: any) => `
                <button class="btn-store-tab ${s.id === activeStoreId ? 'active' : ''}" data-id="${s.id}" style="
                    padding: 0.5rem 1rem;
                    background: ${s.id === activeStoreId ? 'var(--primary)' : 'var(--surface-hover)'};
                    color: ${s.id === activeStoreId ? '#fff' : 'var(--text-main)'};
                    border: 1px solid ${s.id === activeStoreId ? 'var(--primary)' : 'var(--border-color)'};
                    border-radius: 8px; cursor: pointer; white-space: nowrap;
                ">
                    <i class="fa-solid fa-store" style="margin-right:5px;"></i> ${s.name}
                </button>
            `).join('')}
        </div>`;

    const buildVarChips = () => VARIAVEIS.map(v => `
        <div class="var-chip" draggable="true" data-var="${v.key}" title="Clique para copiar">
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
                font-size: 1.1rem; font-weight: 700; color: var(--text-main);
                display: flex; align-items: center; gap: 10px;
                margin-bottom: 1.25rem; padding-bottom: 0.75rem;
                border-bottom: 1px solid var(--border-color);
            }
            .config-select {
                width: 100%; padding: 0.75rem 1rem;
                background-color: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                color: var(--text-main); font-size: 0.9rem;
                appearance: none; cursor: pointer;
                transition: border-color .2s;
            }
            .config-select:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 2px rgba(99,102,241,.15); }
            .config-input {
                width: 100%; padding: 0.75rem 1rem;
                background: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                color: var(--text-main); font-size: 0.9rem;
                box-sizing: border-box; transition: border-color .2s;
                height: 44px;
            }
            .config-input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 2px rgba(99,102,241,.15); }
            .config-input::placeholder { color: var(--text-dim); }
            .config-label {
                display: block; font-size: 0.75rem; font-weight: 700;
                color: var(--text-dim); text-transform: uppercase;
                letter-spacing: 0.05em; margin-bottom: 6px;
            }
            .cat-field-hint {
                font-size: 0.75rem; color: var(--text-dim); margin-top: 4px;
            }
            .cat-field { margin-bottom: 1.25rem; }
            .theme-card-grid {
                display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 1.25rem;
            }
            @media(max-width:600px) { .theme-card-grid { grid-template-columns: 1fr; } }
            .theme-card {
                border: 2px solid var(--border-color); border-radius: 12px;
                padding: 14px; cursor: pointer; transition: all .2s;
                background: rgba(255,255,255,0.02);
            }
            .theme-card:hover { border-color: rgba(99,102,241,.5); background: rgba(99,102,241,.04); }
            .theme-card.active { border-color: var(--primary); background: rgba(99,102,241,.08); }
            .theme-card-preview {
                height: 72px; border-radius: 8px; margin-bottom: 8px;
                overflow: hidden; background: var(--surface-hover);
                display: flex; flex-direction: column; gap: 4px; padding: 6px;
            }
            .theme-card-name { font-size: 0.85rem; font-weight: 700; text-align: center; }
            .theme-card-desc { font-size: 0.75rem; color: var(--text-dim); text-align: center; margin-top: 2px; }
            .vars-grid {
                display: flex; flex-wrap: wrap; gap: 0.5rem;
                margin-bottom: 1.5rem; padding: 1rem;
                background: rgba(99,102,241,0.04);
                border: 1px dashed rgba(99,102,241,0.25);
                border-radius: var(--radius-md);
            }
            .var-chip {
                display: inline-flex; align-items: center; gap: 0.4rem;
                padding: 0.35rem 0.75rem;
                background: rgba(99,102,241,0.12);
                border: 1px solid rgba(99,102,241,0.3);
                border-radius: 6px; font-size: 0.82rem;
                color: var(--primary); cursor: grab; user-select: none;
            }
            .var-chip code { font-size: 0.72rem; color: rgba(167,139,250,0.8); font-family: monospace; }
            .msg-card {
                background: rgba(255,255,255,0.03);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                overflow: hidden; margin-bottom: 1rem;
            }
            .msg-card-header {
                display: flex; align-items: center; gap: 0.6rem;
                padding: 0.75rem 1rem;
                background: rgba(255,255,255,0.025);
                border-bottom: 1px solid var(--border-color);
                font-weight: 600; font-size: 0.9rem;
            }
            .msg-editor-wrap { padding: 1rem; }
            .msg-textarea {
                width: 100%; background: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-sm); color: var(--text-main);
                font-size: 0.9rem; padding: 0.75rem; resize: vertical;
                box-sizing: border-box; font-family: inherit;
            }
            .msg-textarea:focus { outline: none; border-color: var(--primary); }
            .msg-save-row {
                display: flex; align-items: center;
                justify-content: space-between; margin-top: 0.75rem;
            }
            .btn-save-msg {
                padding: 0.45rem 1rem; background: var(--primary);
                color: white; border: none; border-radius: var(--radius-sm);
                font-size: 0.85rem; font-weight: 600; cursor: pointer;
            }
            .btn-save-msg:hover { background: var(--primary-hover); }
            .btn-save-msg.saved { background: var(--success); pointer-events: none; }
            .horarios-grid { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem; }
            .horario-row {
                display: flex; align-items: center; justify-content: space-between;
                padding: 0.75rem 1rem;
                background: rgba(255,255,255,0.02);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md); transition: 0.2s;
            }
            .horario-row.inactive { opacity: 0.6; background: transparent; }
            .horario-info { display: flex; align-items: center; gap: 1rem; flex: 1; }
            .horario-label { font-weight: 600; min-width: 120px; }
            .horario-inputs { display: flex; align-items: center; gap: 0.5rem; transition: 0.3s; }
            .horario-inputs.hidden { display: none; }
            .time-input {
                background: var(--bg-color); border: 1px solid var(--border-color);
                color: white; padding: 0.4rem 0.6rem;
                border-radius: 6px; font-size: 0.85rem; outline: none;
            }
            .time-input:focus { border-color: var(--primary); }
            .switch { position: relative; display: inline-block; width: 40px; height: 20px; }
            .switch input { opacity: 0; width: 0; height: 0; }
            .slider {
                position: absolute; cursor: pointer;
                top: 0; left: 0; right: 0; bottom: 0;
                background-color: #333; transition: .4s; border-radius: 20px;
            }
            .slider:before {
                position: absolute; content: "";
                height: 14px; width: 14px; left: 3px; bottom: 3px;
                background-color: white; transition: .4s; border-radius: 50%;
            }
            input:checked + .slider { background-color: var(--primary); }
            input:checked + .slider:before { transform: translateX(20px); }
        </style>

        <div class="page-header">
            <h2 class="page-title">Configuração do Catálogo</h2>
        </div>

        <div id="cat-tabs-container">
            ${renderStoreTabs()}
        </div>

        <div id="cat-config-content-area"></div>
    `;

    // ── Tab switching ────────────────────────────────────────────────────────
    function setupTabs() {
        const attachTabListeners = () => {
            document.querySelectorAll('.btn-store-tab').forEach(btn => {
                btn.addEventListener('click', () => {
                    activeStoreId = (btn as HTMLElement).dataset.id!;
                    const container = document.getElementById('cat-tabs-container');
                    if (container) {
                        container.innerHTML = renderStoreTabs();
                        attachTabListeners();
                    }
                    renderContent();
                });
            });
        };
        attachTabListeners();
    }

    // ── Content renderer ─────────────────────────────────────────────────────
    function renderContent() {
        const contentArea = document.getElementById('cat-config-content-area');
        if (!contentArea) return;

        const config = getLojaConfig(activeStoreId);
        const design = config?.design || {};
        const msgs = config?.mensagens_automaticas || {};

        const currentLink = `${window.location.origin}/catalog/${activeStoreId}`;
        const currentInstanciaId = config?.instancia_id ||
            stores.find((s: any) => s.id === activeStoreId)?.instancia_id || '';

        // ── Schedule rows builder ──────────────────────────────────────────
        const buildScheduleRows = (prefix: string, campo: 'horario_funcionamento' | 'horario_entrega') => {
            const horariosMap = config?.[campo] || {};
            return DIAS.map(dia => {
                const h = horariosMap[dia.key] || {};
                const ativo = h.ativo ?? h.aberto ?? (dia.key !== 'dom');
                const inicio = h.inicio || h.abertura || '08:00';
                const fim = h.fim || h.fechamento || '18:00';
                return `
                <div class="horario-row ${!ativo ? 'inactive' : ''}" id="${prefix}-row-${dia.key}">
                    <div class="horario-info">
                        <label class="switch">
                            <input type="checkbox" class="${prefix}-toggle" data-dia="${dia.key}" ${ativo ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                        <span class="horario-label">${dia.label}</span>
                    </div>
                    <div class="horario-inputs ${!ativo ? 'hidden' : ''}" id="${prefix}-inputs-${dia.key}">
                        <input type="time" class="time-input" id="${prefix}-open-${dia.key}" value="${inicio}">
                        <span style="color:var(--text-dim);font-size:0.8rem;">até</span>
                        <input type="time" class="time-input" id="${prefix}-close-${dia.key}" value="${fim}">
                    </div>
                    <div class="status-label" id="${prefix}-status-${dia.key}" style="font-size:0.8rem;color:${ativo ? 'var(--success)' : 'var(--text-dim)'};min-width:70px;text-align:right;">
                        ${ativo ? 'Aberto' : 'Fechado'}
                    </div>
                </div>`;
            }).join('');
        };

        const msgEditors = MSG_FIELDS.map(f => `
            <div class="msg-card" id="msg-card-${f.key}">
                <div class="msg-card-header">
                    <i class="fa-solid ${f.icon}" style="color:var(--primary);"></i>
                    <span>${f.label}</span>
                </div>
                <div class="msg-editor-wrap">
                    <textarea id="cat-msg-${f.key}" class="msg-textarea" rows="3"
                        placeholder="${f.default}" data-msg-key="${f.key}"
                    >${msgs[f.key] || ''}</textarea>
                    <div class="msg-save-row">
                        <span style="font-size:0.75rem;color:var(--text-dim);">
                            <i class="fa-solid fa-circle-info"></i> Arraste as variáveis acima para o texto
                        </span>
                        <button class="btn-save-msg cat-save-single-msg" data-msg-key="${f.key}">
                            <i class="fa-solid fa-floppy-disk"></i> Salvar
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        contentArea.innerHTML = `

            <!-- ── Link do catálogo ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-link" style="color:var(--primary);"></i> Link do Catálogo
                </div>
                <div style="display:flex;gap:10px;align-items:center;background:rgba(99,102,241,0.06);border:1px dashed rgba(99,102,241,0.3);border-radius:var(--radius-md);padding:0.75rem 1rem;">
                    <i class="fa-solid fa-store" style="color:var(--primary);"></i>
                    <input type="text" id="cat-link-display" value="${currentLink}" readonly style="flex:1;background:transparent;border:none;color:var(--text-main);font-size:0.9rem;outline:none;">
                    <button class="btn-save-msg" id="btn-copy-cat-link"><i class="fa-solid fa-copy"></i> Copiar</button>
                    <a href="${currentLink}" target="_blank" class="btn-secondary" style="padding:0.4rem 0.75rem;font-size:0.85rem;">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </div>
            </div>

            <!-- ── Instância ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-brands fa-whatsapp" style="color:#25d366;"></i> Vinculação da Instância
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Selecione a instância de WhatsApp que enviará mensagens automáticas para esta loja.
                </p>
                <select id="cat-instance-select" class="config-select">
                    <option value="">-- Nenhuma instância --</option>
                    ${allInstances.map((inst: any) => `
                        <option value="${inst.id}" ${inst.id === currentInstanciaId ? 'selected' : ''}>
                            ${inst.nome} (${inst.status})
                        </option>
                    `).join('')}
                </select>
                <div id="cat-instance-indicator" style="margin-top:10px;"></div>
            </div>

            <!-- ── Aparência ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-palette" style="color:var(--primary);"></i> Aparência e Redes Sociais
                </div>

                <!-- Meta Description -->
                <div class="cat-field">
                    <label class="config-label">Descrição para Compartilhamento</label>
                    <input type="text" id="cat-meta-description" value="${design.metaDescription || ''}" class="config-input" placeholder="Ex: Melhores lanches da região. Peça agora!">
                    <p class="cat-field-hint">Texto que aparece quando você compartilha o link no WhatsApp/FB/Insta.</p>
                </div>

                <!-- Logo -->
                <div class="cat-field">
                    <label class="config-label">Logo da Loja</label>
                    <div style="display:flex;align-items:center;gap:16px;">
                        <div id="cat-logo-preview-wrapper" style="width:80px;height:80px;border-radius:12px;border:1px solid var(--border-color);display:flex;align-items:center;justify-content:center;background:var(--surface-hover);overflow:hidden;flex-shrink:0;">
                            ${design.logoUrl
                ? `<img src="${design.logoUrl}" style="width:100%;height:100%;object-fit:contain;">`
                : `<i class="fa-solid fa-image fa-2x" style="color:var(--text-dim);"></i>`}
                        </div>
                        <div>
                            <input type="file" id="cat-logo-file" accept="image/*" style="display:none;">
                            <button class="btn-secondary" onclick="document.getElementById('cat-logo-file').click()">
                                <i class="fa-solid fa-upload"></i> Escolher Logo
                            </button>
                            <p class="cat-field-hint" style="margin-top:6px;">Recomendado: 200×200px PNG/SVG transparente</p>
                        </div>
                    </div>
                </div>

                <!-- Cores -->
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:1.25rem;">
                    <div>
                        <label class="config-label">Cor Principal</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-primary-color" value="${design.primaryColor || '#6366f1'}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-primary-color-hex" value="${design.primaryColor || '#6366f1'}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                    <div>
                        <label class="config-label">Cor de Fundo</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-secondary-color" value="${design.secondaryColor || '#0f172a'}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-secondary-color-hex" value="${design.secondaryColor || '#0f172a'}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:1.25rem;">
                    <div>
                        <label class="config-label">Cor do Texto</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-text-color" value="${design.textColor || '#ffffff'}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-text-color-hex" value="${design.textColor || '#ffffff'}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                    <div>
                        <label class="config-label">Cor do Preço</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-price-color" value="${design.priceColor || '#ffffff'}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-price-color-hex" value="${design.priceColor || '#ffffff'}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                    <div>
                        <label class="config-label">Fundo do Produto</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-product-bg-color" value="${design.productBgColor || '#1e293b'}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-product-bg-color-hex" value="${design.productBgColor || '#1e293b'}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                </div>

                <!-- Tema do catálogo -->
                <div class="cat-field">
                    <label class="config-label">Layout do Catálogo</label>
                    <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;">Escolha a apresentação visual dos seus produtos.</p>
                    <div class="theme-card-grid" id="cat-theme-grid">

                        <!-- Clássico -->
                        <div class="theme-card ${(design.themeId || 'classico') === 'classico' ? 'active' : ''}" onclick="window.catSelectTheme('classico')">
                            <div class="theme-card-preview">
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;height:100%;">
                                    ${['', '', '', ''].map(() => `<div style="background:rgba(99,102,241,.2);border-radius:4px;"></div>`).join('')}
                                </div>
                            </div>
                            <div class="theme-card-name"><i class="fa-solid fa-th-large" style="margin-right:5px;"></i>Clássico</div>
                            <div class="theme-card-desc">Grade de produtos simples e direta</div>
                        </div>

                        <!-- Moderno -->
                        <div class="theme-card ${design.themeId === 'moderno' ? 'active' : ''}" onclick="window.catSelectTheme('moderno')">
                            <div class="theme-card-preview" style="flex-direction:row;padding:4px;gap:4px;">
                                <div style="width:30%;background:rgba(99,102,241,.15);border-radius:4px;"></div>
                                <div style="flex:1;display:flex;flex-direction:column;gap:3px;">
                                    <div style="height:10px;background:rgba(255,255,255,.15);border-radius:3px;"></div>
                                    ${['', '', ''].map(() => `<div style="height:16px;background:rgba(99,102,241,.12);border-radius:3px;"></div>`).join('')}
                                </div>
                            </div>
                            <div class="theme-card-name"><i class="fa-solid fa-search" style="margin-right:5px;"></i>Moderno</div>
                            <div class="theme-card-desc">Sidebar de categorias + busca</div>
                        </div>

                        <!-- Banner -->
                        <div class="theme-card ${design.themeId === 'banner' ? 'active' : ''}" onclick="window.catSelectTheme('banner')">
                            <div class="theme-card-preview" style="flex-direction:column;padding:4px;gap:3px;">
                                <div style="height:28px;background:linear-gradient(135deg,rgba(99,102,241,.4),rgba(168,85,247,.3));border-radius:4px;"></div>
                                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px;flex:1;">
                                    ${['', '', ''].map(() => `<div style="background:rgba(99,102,241,.15);border-radius:3px;"></div>`).join('')}
                                </div>
                            </div>
                            <div class="theme-card-name"><i class="fa-solid fa-image" style="margin-right:5px;"></i>Banner</div>
                            <div class="theme-card-desc">Hero banner + grade de produtos</div>
                        </div>
                    </div>
                    <input type="hidden" id="cat-theme-id" value="${design.themeId || 'classico'}">
                </div>

                <!-- Banners (utilizado em temas Banner e Moderno) -->
                <div id="cat-banner-section" style="border-top:1px solid var(--border-color);padding-top:1rem;margin-bottom:1rem;">
                    <p style="font-size:0.9rem;font-weight:700;margin:0 0 1rem;display:flex;align-items:center;gap:8px;">
                        <i class="fa-solid fa-images" style="color:var(--primary);"></i> Banners do Catálogo
                    </p>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                        <div>
                            <label class="config-label">Banner Desktop</label>
                            <div id="banner-desktop-preview" style="height:80px;border-radius:8px;border:1px dashed var(--border-color);display:flex;align-items:center;justify-content:center;margin-bottom:8px;background:var(--surface-hover);overflow:hidden;">
                                ${design.bannerUrl
                ? `<img src="${design.bannerUrl}" style="width:100%;height:100%;object-fit:cover;">`
                : `<i class="fa-solid fa-panorama" style="color:var(--text-dim);font-size:1.5rem;"></i>`}
                            </div>
                            <input type="file" id="cat-banner-desktop-file" accept="image/*" style="display:none;">
                            <button class="btn-secondary btn-sm" onclick="document.getElementById('cat-banner-desktop-file').click()" style="width:100%;">
                                <i class="fa-solid fa-upload"></i> Upload Desktop (1200×400)
                            </button>
                        </div>
                        <div>
                            <label class="config-label">Banner Mobile</label>
                            <div id="banner-mobile-preview" style="height:80px;border-radius:8px;border:1px dashed var(--border-color);display:flex;align-items:center;justify-content:center;margin-bottom:8px;background:var(--surface-hover);overflow:hidden;">
                                ${design.bannerMobileUrl
                ? `<img src="${design.bannerMobileUrl}" style="width:100%;height:100%;object-fit:cover;">`
                : `<i class="fa-solid fa-mobile-screen" style="color:var(--text-dim);font-size:1.5rem;"></i>`}
                            </div>
                            <input type="file" id="cat-banner-mobile-file" accept="image/*" style="display:none;">
                            <button class="btn-secondary btn-sm" onclick="document.getElementById('cat-banner-mobile-file').click()" style="width:100%;">
                                <i class="fa-solid fa-upload"></i> Upload Mobile (600×300)
                            </button>
                        </div>
                    </div>
                </div>

                <div style="text-align:right;">
                    <button class="btn-save-msg" id="btn-save-cat-aparencia">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Aparência
                    </button>
                </div>
            </div>

            <!-- ── Horário de Funcionamento ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-clock" style="color:var(--primary);"></i> Horário de Funcionamento
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Defina os dias e horários em que a loja aceita pedidos.
                </p>
                <div class="horarios-grid">
                    ${buildScheduleRows('func', 'horario_funcionamento')}
                </div>
                <div style="text-align:right;margin-top:1.5rem;">
                    <button class="btn-save-msg" id="btn-save-cat-func">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Horários
                    </button>
                </div>
            </div>

            <!-- ── Horário de Entrega ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-truck" style="color:var(--primary);"></i> Horário de Entrega
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Defina especificamente em quais horários a loja realiza entregas.
                </p>
                <div class="horarios-grid">
                    ${buildScheduleRows('entrega', 'horario_entrega')}
                </div>
                <div style="text-align:right;margin-top:1.5rem;">
                    <button class="btn-save-msg" id="btn-save-cat-entrega">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega
                    </button>
                </div>
            </div>

            <!-- ── Mensagens Automáticas ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-message" style="color:var(--primary);"></i> Mensagens Automáticas
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.25rem;">
                    Personalize as mensagens enviadas ao cliente em cada etapa do pedido via WhatsApp.
                </p>
                <div class="vars-grid" id="cat-vars-grid">
                    ${buildVarChips()}
                </div>
                <div id="cat-msg-editors">
                    ${msgEditors}
                </div>
            </div>

            <!-- ── Pagamento ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-credit-card" style="color:var(--primary);"></i> Pagamento
                </div>

                <div class="cat-field">
                    <label class="config-label">WhatsApp de Atendimento (com DDD)</label>
                    <input type="text" id="cat-whatsapp" value="${design.whatsapp || ''}" class="config-input" placeholder="Ex: 5511999999999">
                    <p class="cat-field-hint">Número exibido no botão flutuante do catálogo.</p>
                </div>

                <div class="cat-field">
                    <label class="config-label">Chave PIX (Manual)</label>
                    <input type="text" id="cat-pix-key" value="${design.pixKey || ''}" class="config-input" placeholder="CPF, e-mail, telefone ou chave aleatória">
                    <p class="cat-field-hint">Exibida ao cliente ao escolher pagar via PIX manual.</p>
                </div>

                <div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.25rem;">
                    <p style="font-size:0.9rem;font-weight:700;margin:0 0 1rem;display:flex;align-items:center;gap:8px;">
                        <i class="fa-solid fa-truck" style="color:var(--primary);"></i> Taxas de Entrega por Bairro
                    </p>
                    <p style="font-size:0.8rem;color:var(--text-dim);margin-bottom:12px;">Defina o preço da entrega para cada bairro. Para aplicar o mesmo valor a múltiplos bairros, separe-os por vírgula (Ex: Centro, Vila Nova).</p>
                    <div style="display:grid;grid-template-columns:1fr 100px;gap:16px;margin-bottom:16px;align-items:end;">
                        <div class="field">
                            <label class="config-label">Bairro(s)</label>
                            <input type="text" id="new-bairro-nomes" class="config-input" placeholder="Ex: Centro, Jardim Floral">
                        </div>
                        <div class="field">
                            <label class="config-label">Valor (R$)</label>
                            <input type="number" id="new-bairro-preco" class="config-input" placeholder="0.00" min="0" step="0.01">
                        </div>
                    </div>
                    <div style="text-align:right;margin-bottom:12px;">
                        <button class="btn-save-msg" id="btn-add-bairro">
                            <i class="fa-solid fa-plus"></i> Adicionar Bairro
                        </button>
                    </div>
                    <div id="bairros-list">
                        ${(config?.bairrosEntrega || []).length === 0
                ? `<p style="font-size:0.85rem;color:var(--text-dim);">Nenhum bairro com entrega configurado.</p>`
                : (config?.bairrosEntrega || []).map((b: any, idx: number) => `
                                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(255,255,255,0.03);border:1px solid var(--border-color);border-radius:8px;margin-bottom:6px;">
                                    <div style="display:flex;align-items:center;gap:12px;flex:1;">
                                        <span style="font-weight:600;color:var(--text-main);">${b.bairros}</span>
                                        <span style="font-size:0.85rem;color:var(--primary);font-weight:700;">R$ ${Number(b.preco).toFixed(2)}</span>
                                    </div>
                                    <button class="btn-danger btn-sm" onclick="window.catDeleteBairro(${idx})" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#ef4444;border-radius:6px;padding:4px 10px;cursor:pointer;">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            `).join('')
            }
                    </div>
                </div>

                <div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.5rem;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <p style="font-size:0.9rem;font-weight:700;margin:0 0 0.4rem;display:flex;align-items:center;gap:8px;">
                                <i class="fa-solid fa-credit-card" style="color:var(--primary);"></i> Mercado Pago (PIX Automático)
                            </p>
                            <p style="margin:0;font-size:0.8rem;color:var(--text-dim);">Ativar ou desativar pagamentos via Mercado Pago.</p>
                        </div>
                        <label class="switch">
                            <input type="checkbox" id="mp-active-toggle" ${config?.mercadoPagoActive !== false ? 'checked' : ''}>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.5rem;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <p style="font-size:0.9rem;font-weight:700;margin:0 0 0.4rem;display:flex;align-items:center;gap:8px;">
                                <i class="fa-solid fa-store" style="color:var(--primary);"></i> Pagamento Antecipado (Retirada)
                            </p>
                            <p style="margin:0;font-size:0.8rem;color:var(--text-dim);">Obrigar pagamento adiantado para pedidos de retirada.</p>
                        </div>
                        <label class="switch">
                            <input type="checkbox" id="cat-mandatory-pickup-pay" ${config?.pagamentoObrigatorioRetirada ? 'checked' : ''}>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <!-- Cupons de Desconto -->
                <div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.5rem;">
                    <p style="font-size:0.9rem;font-weight:700;margin:0 0 1rem;display:flex;align-items:center;gap:8px;">
                        <i class="fa-solid fa-tag" style="color:var(--primary);"></i> Cupons de Desconto
                    </p>
                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:16px;align-items:end;">
                        <div>
                            <label class="config-label">Código do Cupom</label>
                            <input type="text" id="new-cupom-code" class="config-input" style="text-transform:uppercase;" placeholder="EX: DESCONTO10">
                        </div>
                        <div style="display:grid;grid-template-columns:1fr 100px;gap:8px;">
                            <div>
                                <label class="config-label">Desconto</label>
                                <input type="number" id="new-cupom-valor" class="config-input" placeholder="10" min="0" step="0.01">
                            </div>
                            <div>
                                <label class="config-label">Tipo</label>
                                <select id="new-cupom-tipo" class="config-select" style="height:44px;">
                                    <option value="percent">%</option>
                                    <option value="fixo">R$</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="config-label">Gasto Mínimo (R$)</label>
                            <input type="number" id="new-cupom-min" class="config-input" placeholder="0.00" min="0" step="0.01">
                        </div>
                    </div>
                    <div style="text-align:right;margin-bottom:12px;">
                        <button class="btn-save-msg" id="btn-add-cupom">
                            <i class="fa-solid fa-plus"></i> Adicionar Cupom
                        </button>
                    </div>
                    <div id="cupons-list">
                        ${(config?.cupons || []).length === 0
                ? `<p style="font-size:0.85rem;color:var(--text-dim);">Nenhum cupom cadastrado ainda.</p>`
                : (config?.cupons || []).map((c: any, idx: number) => `
                                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(255,255,255,0.03);border:1px solid var(--border-color);border-radius:8px;margin-bottom:6px;">
                                    <div style="display:flex;align-items:center;gap:12px;">
                                        <span style="font-family:monospace;font-weight:700;color:var(--primary);">${c.codigo}</span>
                                        <span class="badge ${c.ativo !== false ? 'success' : 'warning'}">${c.ativo !== false ? 'Ativo' : 'Inativo'}</span>
                                        <span style="font-size:0.8rem;color:var(--text-muted);">${c.tipo === 'percent' ? c.desconto + '%' : 'R$ ' + Number(c.desconto).toFixed(2)} de desconto</span>
                                        ${c.valorMinimo > 0 ? `<span style="font-size:0.75rem;color:var(--text-dim);background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px;">Min: R$ ${c.valorMinimo.toFixed(2)}</span>` : ''}
                                    </div>
                                    <button class="btn-danger btn-sm" onclick="window.catDeleteCupom(${idx})" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#ef4444;border-radius:6px;padding:4px 10px;cursor:pointer;">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            `).join('')
            }
                    </div>
                </div>

                <div style="padding:14px;border-radius:var(--radius-md);background:${hasMercadoPago ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)'};border:1px solid ${hasMercadoPago ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'};display:flex;align-items:center;gap:12px;margin-bottom:1.5rem;">
                    <i class="fa-solid ${hasMercadoPago ? 'fa-circle-check' : 'fa-circle-xmark'}" style="color:${hasMercadoPago ? '#10b981' : '#ef4444'};font-size:1.2rem;"></i>
                    <div>
                        <p style="margin:0;font-weight:600;font-size:0.9rem;">Mercado Pago</p>
                        <p style="margin:0;font-size:0.8rem;color:var(--text-muted);">
                            ${hasMercadoPago ? 'Integração ativa — PIX via Mercado Pago disponível no catálogo.' : 'Não configurado. <a href="/mercado-pago" style="color:var(--primary);">Configurar agora →</a>'}
                        </p>
                    </div>
                </div>

                <div style="text-align:right;">
                    <button class="btn-save-msg" id="btn-save-cat-pagamento">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento
                    </button>
                </div>
            </div>
        `;

        setTimeout(() => {
            setupContentListeners(config);
        }, 50);
    }

    // ── All event listeners ──────────────────────────────────────────────────
    function setupContentListeners(_config: any) {
        const companyStores = stores;

        // Copy link
        document.getElementById('btn-copy-cat-link')?.addEventListener('click', () => {
            const input = document.getElementById('cat-link-display') as HTMLInputElement;
            if (input?.value) navigator.clipboard.writeText(input.value).then(() => toast.success('Link copiado!'));
        });

        // Color pickers sync
        const syncColor = (pickerEl: string, hexEl: string) => {
            const picker = document.getElementById(pickerEl) as HTMLInputElement;
            const hex = document.getElementById(hexEl) as HTMLInputElement;
            picker?.addEventListener('input', () => { if (hex) hex.value = picker.value; });
            hex?.addEventListener('input', () => { if (picker) picker.value = hex.value; });
        };
        syncColor('cat-primary-color', 'cat-primary-color-hex');
        syncColor('cat-secondary-color', 'cat-secondary-color-hex');
        syncColor('cat-text-color', 'cat-text-color-hex');
        syncColor('cat-price-color', 'cat-price-color-hex');
        syncColor('cat-product-bg-color', 'cat-product-bg-color-hex');

        // Logo preview
        document.getElementById('cat-logo-file')?.addEventListener('change', (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    const wrapper = document.getElementById('cat-logo-preview-wrapper');
                    if (wrapper) wrapper.innerHTML = `<img src="${ev.target?.result}" style="width:100%;height:100%;object-fit:contain;">`;
                };
                reader.readAsDataURL(file);
            }
        });

        // Instance select
        document.getElementById('cat-instance-select')?.addEventListener('change', async (e) => {
            const newInstId = (e.target as HTMLSelectElement).value;
            const updatedStores = companyStores.map((s: any) =>
                s.id === activeStoreId ? { ...s, instancia_id: newInstId || null } : s
            );
            try {
                toast.info('Salvando instância...');

                // 1. Update Company stores array
                await dbService.update('companies', companyId, { stores: updatedStores });
                const cur = companyStores.find((s: any) => s.id === activeStoreId);
                if (cur) cur.instancia_id = newInstId;

                // 2. Update loja_config
                const lojaConf = getLojaConfig(activeStoreId);
                if (lojaConf) {
                    await dbService.update('loja_config', lojaConf.id, { instancia_id: newInstId || null });
                    lojaConf.instancia_id = newInstId;
                } else {
                    const newId = await dbService.create('loja_config', {
                        empresaId: companyId, lojaId: activeStoreId, instancia_id: newInstId || null
                    });
                    lojaConfigsRaw.push({ id: newId, empresaId: companyId, lojaId: activeStoreId, instancia_id: newInstId });
                }

                // 3. Update 'instancias' document metadata (LojaId and Funcao)
                // First, unsign any instance currently pointed to this store
                const oldInsts = await dbService.getAll('instancias', { field: 'lojaId', operator: '==', value: activeStoreId }) as any[];
                for (const old of oldInsts) {
                    await dbService.update('instancias', old.id, { lojaId: null, funcao: null });
                }

                // Now sign the new one
                if (newInstId) {
                    await dbService.update('instancias', newInstId, {
                        lojaId: activeStoreId,
                        funcao: 'Catálogo Vendas'
                    });
                }

                toast.success('Instância vinculada com sucesso!');
            } catch (err) {
                toast.error('Erro ao salvar instância.');
                console.error(err);
            }
        });

        // ── Theme selector ──────────────────────────────────────────────────
        (window as any).catSelectTheme = (themeId: string) => {
            const hidden = document.getElementById('cat-theme-id') as HTMLInputElement;
            if (hidden) hidden.value = themeId;
            document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
            const allCards = document.querySelectorAll('.theme-card');
            allCards.forEach(c => {
                if ((c as HTMLElement).getAttribute('onclick')?.includes(`'${themeId}'`)) c.classList.add('active');
            });
        };

        // Banner file previews
        const previewBanner = (inputId: string, previewId: string) => {
            document.getElementById(inputId)?.addEventListener('change', (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        const wrap = document.getElementById(previewId);
                        if (wrap) wrap.innerHTML = `<img src="${ev.target?.result}" style="width:100%;height:100%;object-fit:cover;">`;
                    };
                    reader.readAsDataURL(file);
                }
            });
        };
        previewBanner('cat-banner-desktop-file', 'banner-desktop-preview');
        previewBanner('cat-banner-mobile-file', 'banner-mobile-preview');

        // ── Save aparência ──────────────────────────────────────────────────
        document.getElementById('btn-save-cat-aparencia')?.addEventListener('click', async () => {
            const btn = document.getElementById('btn-save-cat-aparencia')!;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';
            try {
                const primaryColor = (document.getElementById('cat-primary-color-hex') as HTMLInputElement).value;
                const secondaryColor = (document.getElementById('cat-secondary-color-hex') as HTMLInputElement).value;
                const textColor = (document.getElementById('cat-text-color-hex') as HTMLInputElement).value;
                const priceColor = (document.getElementById('cat-price-color-hex') as HTMLInputElement).value;
                const productBgColor = (document.getElementById('cat-product-bg-color-hex') as HTMLInputElement).value;
                const themeId = (document.getElementById('cat-theme-id') as HTMLInputElement)?.value || 'classico';
                const metaDescription = (document.getElementById('cat-meta-description') as HTMLInputElement).value;
                const logoFile = (document.getElementById('cat-logo-file') as HTMLInputElement).files?.[0];
                const bannerDesktopFile = (document.getElementById('cat-banner-desktop-file') as HTMLInputElement)?.files?.[0];
                const bannerMobileFile = (document.getElementById('cat-banner-mobile-file') as HTMLInputElement)?.files?.[0];
                const lojaConf = getLojaConfig(activeStoreId);
                let logoUrl = lojaConf?.design?.logoUrl || '';
                let bannerUrl = lojaConf?.design?.bannerUrl || '';
                let bannerMobileUrl = lojaConf?.design?.bannerMobileUrl || '';

                if (logoFile) {
                    const storageRef = ref(storage, `logos/${companyId}/${activeStoreId}_logo`);
                    await uploadBytes(storageRef, logoFile);
                    logoUrl = await getDownloadURL(storageRef);
                }
                if (bannerDesktopFile) {
                    const storageRef = ref(storage, `banners/${companyId}/${activeStoreId}_desktop`);
                    await uploadBytes(storageRef, bannerDesktopFile);
                    bannerUrl = await getDownloadURL(storageRef);
                }
                if (bannerMobileFile) {
                    const storageRef = ref(storage, `banners/${companyId}/${activeStoreId}_mobile`);
                    await uploadBytes(storageRef, bannerMobileFile);
                    bannerMobileUrl = await getDownloadURL(storageRef);
                }

                const newDesign = { ...(lojaConf?.design || {}), primaryColor, secondaryColor, textColor, priceColor, productBgColor, logoUrl, themeId, bannerUrl, bannerMobileUrl, metaDescription };
                await saveToLojaConfig({ design: newDesign });
                toast.success('Aparência salva!');
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Salvo!';
                btn.classList.add('saved');
                setTimeout(() => { btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar Aparência'; btn.classList.remove('saved'); }, 2000);
            } catch (e) {
                toast.error('Erro ao salvar aparência.');
                btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar Aparência';
            }
        });

        // ── Save horário funcionamento ──────────────────────────────────────
        document.getElementById('btn-save-cat-func')?.addEventListener('click', async () => {
            const btn = document.getElementById('btn-save-cat-func')!;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';
            try {
                const horario_funcionamento: any = {};
                DIAS.forEach(({ key }) => {
                    const ativo = (document.querySelector(`.func-toggle[data-dia="${key}"]`) as HTMLInputElement)?.checked;
                    const inicio = (document.getElementById(`func-open-${key}`) as HTMLInputElement)?.value || '08:00';
                    const fim = (document.getElementById(`func-close-${key}`) as HTMLInputElement)?.value || '18:00';
                    horario_funcionamento[key] = { ativo, inicio, fim };
                });
                await saveToLojaConfig({ horario_funcionamento });
                toast.success('Horários de funcionamento salvos!');
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Salvo!';
                btn.classList.add('saved');
                setTimeout(() => { btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar Horários'; btn.classList.remove('saved'); }, 2000);
            } catch (e) {
                toast.error('Erro ao salvar horários.');
                btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar Horários';
            }
        });

        // ── Save horário entrega ──────────────────────────────────────────
        document.getElementById('btn-save-cat-entrega')?.addEventListener('click', async () => {
            const btn = document.getElementById('btn-save-cat-entrega')!;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';
            try {
                const horario_entrega: any = {};
                DIAS.forEach(({ key }) => {
                    const ativo = (document.querySelector(`.entrega-toggle[data-dia="${key}"]`) as HTMLInputElement)?.checked;
                    const inicio = (document.getElementById(`entrega-open-${key}`) as HTMLInputElement)?.value || '08:00';
                    const fim = (document.getElementById(`entrega-close-${key}`) as HTMLInputElement)?.value || '18:00';
                    horario_entrega[key] = { ativo, inicio, fim };
                });
                await saveToLojaConfig({ horario_entrega });
                toast.success('Horários de entrega salvos!');
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Salvo!';
                btn.classList.add('saved');
                setTimeout(() => { btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega'; btn.classList.remove('saved'); }, 2000);
            } catch (e) {
                toast.error('Erro ao salvar horários de entrega.');
                btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega';
            }
        });

        // ── Save individual messages ────────────────────────────────────────
        document.querySelectorAll('.cat-save-single-msg').forEach(btn => {
            btn.addEventListener('click', async () => {
                const key = (btn as HTMLElement).dataset.msgKey!;
                const val = (document.getElementById(`cat-msg-${key}`) as HTMLTextAreaElement)?.value || '';
                const lojaConf = getLojaConfig(activeStoreId);
                const existingMsgs = lojaConf?.mensagens_automaticas || {};
                const newMsgs = { ...existingMsgs, [key]: val };
                try {
                    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
                    await saveToLojaConfig({ mensagens_automaticas: newMsgs });
                    toast.success('Mensagem salva!');
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Salvo!';
                    (btn as HTMLElement).classList.add('saved');
                    setTimeout(() => { btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar'; (btn as HTMLElement).classList.remove('saved'); }, 2000);
                } catch (e) {
                    toast.error('Erro ao salvar mensagem.');
                    btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar';
                }
            });
        });

        // ── Variable drag-to-textarea ───────────────────────────────────────
        document.querySelectorAll('.var-chip').forEach(chip => {
            chip.addEventListener('dragstart', (e) => {
                (e as DragEvent).dataTransfer?.setData('text/plain', (chip as HTMLElement).dataset.var || '');
            });
            chip.addEventListener('click', () => {
                navigator.clipboard.writeText((chip as HTMLElement).dataset.var || '').then(() => toast.info('Variável copiada!'));
            });
        });
        document.querySelectorAll('.msg-textarea').forEach(ta => {
            ta.addEventListener('dragover', (e) => e.preventDefault());
            ta.addEventListener('drop', (e) => {
                e.preventDefault();
                const text = (e as DragEvent).dataTransfer?.getData('text/plain') || '';
                const el = ta as HTMLTextAreaElement;
                const start = el.selectionStart;
                const end = el.selectionEnd;
                el.value = el.value.substring(0, start) + text + el.value.substring(end);
                el.selectionStart = el.selectionEnd = start + text.length;
                el.focus();
            });
        });

        // ── Save pagamento ──────────────────────────────────────────────────
        document.getElementById('btn-save-cat-pagamento')?.addEventListener('click', async () => {
            const btn = document.getElementById('btn-save-cat-pagamento')!;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';
            try {
                const lojaConf = getLojaConfig(activeStoreId);
                const whatsapp = (document.getElementById('cat-whatsapp') as HTMLInputElement).value.replace(/\D/g, '');
                const pixKey = (document.getElementById('cat-pix-key') as HTMLInputElement).value.trim();
                const mercadoPagoActive = (document.getElementById('mp-active-toggle') as HTMLInputElement)?.checked;
                const pagamentoObrigatorioRetirada = (document.getElementById('cat-mandatory-pickup-pay') as HTMLInputElement)?.checked;

                const newDesign = { ...(lojaConf?.design || {}), whatsapp, pixKey };
                delete newDesign.taxaFixaNome;
                delete newDesign.taxaFixaValor;
                delete newDesign.taxaTipo;
                await saveToLojaConfig({ design: newDesign, mercadoPagoActive, pagamentoObrigatorioRetirada });
                toast.success('Configurações de pagamento salvas!');
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Salvo!';
                btn.classList.add('saved');
                setTimeout(() => { btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento'; btn.classList.remove('saved'); }, 2000);
            } catch (e) {
                toast.error('Erro ao salvar pagamento.');
                btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento';
            }
        });



        // ── Add cupom ──────────────────────────────────────────────────────
        document.getElementById('btn-add-cupom')?.addEventListener('click', async () => {
            const code = ((document.getElementById('new-cupom-code') as HTMLInputElement).value || '').trim().toUpperCase();
            const valor = parseFloat((document.getElementById('new-cupom-valor') as HTMLInputElement).value || '0');
            const tipo = (document.getElementById('new-cupom-tipo') as HTMLSelectElement).value || 'percent';
            const valorMinimo = parseFloat((document.getElementById('new-cupom-min') as HTMLInputElement).value || '0') || 0;
            if (!code || !valor) { toast.error('Preencha código e valor do cupom.'); return; }
            const lojaConf = getLojaConfig(activeStoreId);
            const cupons = [...(lojaConf?.cupons || []), { codigo: code, desconto: valor, tipo, valorMinimo, ativo: true }];
            await saveToLojaConfig({ cupons });
            toast.success(`Cupom ${code} adicionado!`);
            renderContent();
        });

        // ── Delete cupom ───────────────────────────────────────────────────
        (window as any).catDeleteCupom = async (idx: number) => {
            const lojaConf = getLojaConfig(activeStoreId);
            const cupons = [...(lojaConf?.cupons || [])].filter((_: any, i: number) => i !== idx);
            await saveToLojaConfig({ cupons });
            toast.success('Cupom removido.');
            renderContent();
        };

        // ── Add/Delete Bairro ──────────────────────────────────────────────
        document.getElementById('btn-add-bairro')?.addEventListener('click', async () => {
            const nomes = ((document.getElementById('new-bairro-nomes') as HTMLInputElement).value || '').trim();
            const precoStr = (document.getElementById('new-bairro-preco') as HTMLInputElement).value;
            const preco = parseFloat(precoStr || '0');
            if (!nomes) { toast.error('Preencha os bairros.'); return; }
            if (!precoStr) { toast.error('Preencha o valor da taxa para estes bairros.'); return; }
            const lojaConf = getLojaConfig(activeStoreId);
            const bairrosEntrega = [...(lojaConf?.bairrosEntrega || []), { bairros: nomes, preco }];
            await saveToLojaConfig({ bairrosEntrega });
            toast.success('Bairro(s) adicionado(s)!');
            renderContent();
        });

        (window as any).catDeleteBairro = async (idx: number) => {
            const lojaConf = getLojaConfig(activeStoreId);
            const bairrosEntrega = [...(lojaConf?.bairrosEntrega || [])].filter((_: any, i: number) => i !== idx);
            await saveToLojaConfig({ bairrosEntrega });
            toast.success('Bairro(s) removido(s).');
            renderContent();
        };

        // ── Toggle listeners for schedule rows ─────────────────────────────
        const setupToggle = (cls: string, prefix: string, openLabel: string, closedLabel: string) => {
            document.querySelectorAll(`.${cls}`).forEach((toggle: any) => {
                toggle.addEventListener('change', () => {
                    const dia = toggle.dataset.dia;
                    const active = toggle.checked;
                    document.getElementById(`${prefix}-row-${dia}`)?.classList.toggle('inactive', !active);
                    document.getElementById(`${prefix}-inputs-${dia}`)?.classList.toggle('hidden', !active);
                    const statusEl = document.getElementById(`${prefix}-status-${dia}`);
                    if (statusEl) {
                        statusEl.innerText = active ? openLabel : closedLabel;
                        statusEl.style.color = active ? 'var(--success)' : 'var(--text-dim)';
                    }
                });
            });
        };
        setupToggle('func-toggle', 'func', 'Aberto', 'Fechado');
        setupToggle('entrega-toggle', 'entrega', 'Disponível', 'Indisponível');
    }

    // ── Helper: create or update loja_config ─────────────────────────────────
    async function saveToLojaConfig(payload: any) {
        const lojaConf = getLojaConfig(activeStoreId);
        if (lojaConf) {
            await dbService.update('loja_config', lojaConf.id, payload);
            Object.assign(lojaConf, payload);
        } else {
            const newId = await dbService.create('loja_config', {
                empresaId: companyId, lojaId: activeStoreId, ...payload
            });
            lojaConfigsRaw.push({ id: newId, empresaId: companyId, lojaId: activeStoreId, ...payload });
        }
    }
};
