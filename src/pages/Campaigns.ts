import { dbService } from '../services/db';
import { authService } from '../services/auth';
import { toast } from '../services/toast';
import { confirm } from '../services/confirm';
import { Timestamp, collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function resolveTimestampMs(raw: any): number | null {
    if (!raw) return null;
    if (typeof raw.toDate === 'function') return raw.toDate().getTime();
    if (raw.seconds) return raw.seconds * 1000;
    const parsed = new Date(raw).getTime();
    return isNaN(parsed) ? null : parsed;
}

function formatActivityDate(raw: any): { label: string; color: string } {
    const ms = resolveTimestampMs(raw);
    if (ms === null) return { label: 'Sem registro', color: '#6b7280' };

    const diffMs = Date.now() - ms;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    let label: string;
    if (diffMins < 60) label = diffMins <= 1 ? 'Agora há pouco' : `há ${diffMins} min`;
    else if (diffHours < 24) label = `há ${diffHours}h`;
    else if (diffDays === 1) label = 'Ontem';
    else label = `há ${diffDays} dias`;

    // Color: green < 7d, yellow < 30d, red >= 30d
    const color = diffDays < 7 ? '#22c55e' : diffDays < 30 ? '#f59e0b' : '#ef4444';
    return { label, color };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export const Campaigns = async () => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser.companyId) {
        return `<p>Usuário sem empresa.</p>`;
    }

    const companyId = currentUser.companyId;

    // Fetch Initial Data
    const [company, instances, allLeads] = await Promise.all([
        dbService.get('companies', companyId) as Promise<any>,
        dbService.getAll('instancias', { field: 'empresaId', operator: '==', value: companyId }) as Promise<any[]>,
        dbService.getAll('leads', { field: 'empresaId', operator: '==', value: companyId })
    ]);

    let campaigns: any[] = [];



    let activeTab = 'nova';

    const renderInstanceOptions = () => {
        if (instances.length === 0) return '<option value="">Nenhuma instância cadastrada</option>';
        return instances.map(inst => {
            const isConnected = inst.status === 'conectado' || inst.status === 'open';
            const store = company?.stores?.find((s: any) => s.instancia_id === inst.id);
            const isDisabled = !!store;

            return `<option value="${inst.id}" 
                        data-status="${inst.status}" 
                        ${isDisabled ? 'disabled' : ''} 
                        style="${isDisabled ? 'color: var(--text-muted);' : ''}">
                ${inst.nome} ${isConnected ? '<i class="fa-solid fa-circle-check" style="color: var(--primary);"></i>' : '<i class="fa-solid fa-circle-xmark" style="color: var(--danger);"></i>'} ${store ? `(EM USO: ${store.name})` : ''}
            </option>`;
        }).join('');
    };

    const renderCampaignRows = () => {
        if (campaigns.length === 0) return '<tr><td colspan="8" style="text-align:center; padding: 2rem; color: var(--text-muted);">Nenhuma campanha realizada ainda.</td></tr>';
        return (campaigns as any[]).sort((a, b) => {
            // agendadas primeiro, depois por data decrescente
            const aMs = (a.data_agendamento?.seconds || a.data_inicio?.seconds || 0);
            const bMs = (b.data_agendamento?.seconds || b.data_inicio?.seconds || 0);
            return bMs - aMs;
        }).map(c => {
            const progress = c.total_leads > 0 ? Math.round(((c.enviados + c.falhas) / c.total_leads) * 100) : 0;
            const scheduledDate = c.data_agendamento
                ? new Date(c.data_agendamento.seconds * 1000).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
                : null;
            return `
                <tr>
                    <td>
                        <div style="font-weight: 700; color: var(--text-main);">${c.nome || 'Campanha Sem Nome'}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${c.id.substring(0, 8)}...</div>
                    </td>
                    <td><span class="badge secondary"><i class="fa-brands fa-whatsapp"></i> ${(instances as any[]).find(i => i.id === c.instancia_id)?.nome || 'N/A'}</span></td>
                    <td>
                        ${scheduledDate
                    ? `<div style="font-size:0.8rem;"><span style="color:var(--text-muted);">Agendado</span></div><div style="font-size:0.85rem;font-weight:600;color:var(--primary);">${scheduledDate}</div>`
                    : (c.data_inicio ? new Date(c.data_inicio.seconds * 1000).toLocaleDateString() : '-')}
                    </td>
                    <td><strong>${c.total_leads || 0}</strong></td>
                    <td>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.75rem;">
                                <span class="text-success">${c.enviados || 0}</span>
                                <span class="text-danger">${c.falhas || 0}</span>
                            </div>
                            <div style="width: 100%; height: 6px; background: var(--surface-hover); border-radius: 3px; overflow: hidden;">
                                <div style="width: ${progress}%; height: 100%; background: var(--primary); border-radius: 3px;"></div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge ${c.status === 'finalizada' ? 'success' : c.status === 'em_andamento' ? 'warning' : c.status === 'agendada' && c.agendamento_imediato ? 'warning' : c.status === 'agendada' ? 'primary' : 'secondary'
                }">
                            ${c.status === 'em_andamento' ? '<i class="fa-solid fa-spinner fa-spin"></i> Em andamento'
                    : c.status === 'finalizado' ? '<i class="fa-solid fa-check-circle"></i> Finalizada'
                        : c.status === 'processando' ? '<i class="fa-solid fa-spinner fa-spin"></i> Em andamento'
                            : c.status === 'agendada' && c.agendamento_imediato ? '<i class="fa-solid fa-hourglass-end"></i> Aguardando envio'
                                : c.status === 'agendada' ? '<i class="fa-solid fa-calendar"></i> Agendada'
                                    : 'Cancelada'}
                        </span>
                    </td>
                    <td>
                        <div style="display: flex; gap: 6px;">
                            <button class="action-btn view-details" data-id="${c.id}" title="Ver detalhes" style="background: var(--primary); border-radius: 8px; width: 32px; height: 32px; flex-shrink: 0;">
                                <i class="fa-solid fa-eye" style="color:#fff;"></i>
                            </button>
                            ${['processando', 'em_andamento', 'agendada'].includes(c.status) ? `
                            <button class="action-btn cancel-campaign" data-id="${c.id}" title="Cancelar campanha" style="background: var(--danger); border-radius: 8px; width: 32px; height: 32px; flex-shrink: 0;">
                                <i class="fa-solid fa-ban" style="color:#fff;"></i>
                            </button>
                            ` : ''}
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    };

    const pageHtml = `
        <style>
            .campaign-container { max-width: 1200px; margin: 0 auto; }
            .campaign-tabs { 
                display: flex; 
                gap: 0.5rem; 
                margin-bottom: 2rem; 
                padding: 4px;
                background: var(--surface-hover);
                border-radius: 12px;
                width: fit-content;
            }
            .tab-btn { 
                background: none; 
                border: none; 
                color: var(--text-muted); 
                font-weight: 600; 
                cursor: pointer; 
                padding: 0.6rem 1.5rem; 
                border-radius: 10px; 
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
                font-size: 0.9rem;
            }
            .tab-btn:hover { color: var(--text-main); }
            .tab-btn.active { 
                color: white; 
                background: var(--primary); 
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
            }
            
            .step-card { 
                margin-bottom: 2rem; 
                border: 1px solid var(--border-color);
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                transition: transform 0.2s;
            }
            .step-card:hover { transform: translateY(-2px); }
            .step-header { 
                display: flex; 
                align-items: center; 
                gap: 12px; 
                margin-bottom: 1.5rem; 
                font-size: 1.1rem;
                font-weight: 700; 
                color: var(--text-main); 
            }
            .step-number { 
                width: 28px; 
                height: 28px; 
                background: var(--primary); 
                color: white; 
                border-radius: 8px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                font-size: 0.9rem;
                box-shadow: 0 2px 5px rgba(99, 102, 241, 0.4);
            }
            
            /* Premium Inputs */
            .form-control {
                background: var(--surface-hover) !important;
                border: 1px solid var(--border-color) !important;
                color: var(--text-main) !important;
                border-radius: 10px !important;
                padding: 0.8rem 1rem !important;
                font-size: 0.95rem !important;
                transition: all 0.2s !important;
            }
            .form-control:focus {
                border-color: var(--primary) !important;
                box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1) !important;
                outline: none !important;
            }
            select.form-control {
                appearance: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: right 1rem center;
                background-size: 1.25rem;
                padding-right: 2.5rem !important;
            }

            .var-grid { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1rem; }
            .var-chip { 
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 6px 14px; 
                background: rgba(99, 102, 241, 0.1); 
                border: 1px solid rgba(99, 102, 241, 0.2); 
                border-radius: 20px; 
                font-size: 0.8rem; 
                cursor: grab; 
                color: var(--primary);
                font-weight: 600;
                transition: all 0.2s;
                user-select: none;
            }
            .var-chip:hover { 
                border-color: var(--primary); 
                background: rgba(99, 102, 241, 0.15);
            }
            
            /* Lead Selection Table */
            .leads-selection-table-wrap {
                margin-top: 1.5rem;
                border: 1px solid var(--border-color);
                border-radius: 12px;
                background: var(--surface-light);
                overflow: hidden;
            }
            .leads-table-filters {
                padding: 1rem;
                background: var(--surface-hover);
                border-bottom: 1px solid var(--border-color);
                display: grid;
                grid-template-columns: 2fr 1fr 1fr 1fr;
                gap: 1rem;
            }
            @media (max-width: 900px) {
                .leads-table-filters {
                    grid-template-columns: 1fr 1fr;
                }
            }
            .leads-table-content {
                max-height: 400px;
                overflow-y: auto;
            }
            .leads-table {
                width: 100%;
                border-collapse: collapse;
            }
            .leads-table th {
                background: var(--surface-hover);
                padding: 10px 15px;
                text-align: left;
                font-size: 0.75rem;
                text-transform: uppercase;
                color: var(--text-muted);
                position: sticky;
                top: 0;
                z-index: 10;
            }
            .leads-table td {
                padding: 12px 15px;
                border-bottom: 1px solid var(--border-color);
                font-size: 0.9rem;
            }
            .leads-table tr:hover { background: rgba(255,255,255,0.02); }
            
            .leads-pagination {
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: var(--surface-hover);
                border-top: 1px solid var(--border-color);
            }

            /* Multiple Messages */
            .message-block {
                background: rgba(255,255,255,0.02);
                border: 1px solid var(--border-color);
                border-radius: 12px;
                padding: 1.25rem;
                margin-bottom: 1rem;
                position: relative;
            }
            .message-block-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            .btn-remove-msg {
                color: var(--danger);
                background: none;
                border: none;
                cursor: pointer;
                font-size: 0.9rem;
            }
            .btn-add-msg {
                width: 100%;
                padding: 0.75rem;
                background: var(--surface-hover);
                border: 2px dashed var(--border-color);
                border-radius: 12px;
                color: var(--text-muted);
                cursor: pointer;
                font-weight: 600;
                margin-top: 1rem;
                transition: all 0.2s;
            }
            .btn-add-msg:hover {
                border-color: var(--primary);
                color: var(--primary);
                background: rgba(99, 102, 241, 0.05);
            }

            .leads-counter-card { 
                padding: 1.25rem; 
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(99, 102, 241, 0) 100%);
                border: 1px solid rgba(99, 102, 241, 0.2); 
                border-radius: 12px; 
                margin: 1.5rem 0; 
                display: flex; 
                align-items: center; 
                justify-content: space-between;
                gap: 15px; 
            }
            .leads-count-info { display: flex; align-items: center; gap: 12px; }
            .leads-count-icon {
                width: 40px;
                height: 40px;
                background: rgba(99, 102, 241, 0.1);
                color: var(--primary);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
            }
            
            .view-leads-btn {
                background: none;
                border: 1px solid var(--border-color);
                color: var(--text-main);
                padding: 6px 12px;
                border-radius: 8px;
                font-size: 0.85rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            .view-leads-btn:hover {
                border-color: var(--primary);
                color: var(--primary);
            }

            .delay-inputs { display: flex; gap: 1.5rem; align-items: center; }
            .delay-box { flex: 1; }
            .delay-box label { display: block; margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--text-muted); }

            .schedule-toggle {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.55rem 1.2rem;
                border-radius: 8px;
                border: 1px solid var(--border-color);
                background: var(--surface-hover);
                color: var(--text-muted);
                font-weight: 600;
                font-size: 0.88rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            .schedule-toggle:hover {
                border-color: var(--primary);
                color: var(--primary);
            }
            .schedule-toggle.active {
                background: var(--primary);
                border-color: var(--primary);
                color: #fff;
                box-shadow: 0 2px 8px rgba(99,102,241,0.35);
            }
            
            .instance-status-tag {
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 0.7rem;
                font-weight: 600;
                text-transform: uppercase;
                margin-left: 8px;
            }
            .status-online { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
            .status-offline { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

            .badge.em_uso { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

            /* Selected Leads List */
            #leads-list-container { margin-top: 1rem; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; display: none; }
            .leads-list-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
            .leads-list-table th { background: var(--surface-light); text-align: left; padding: 10px; border-bottom: 1px solid var(--border-color); }
            .leads-list-table td { padding: 10px; border-bottom: 1px solid var(--border-color); }
            .leads-list-table tr:last-child td { border-bottom: none; }

            .filter-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
            @media (max-width: 768px) { .filter-grid { grid-template-columns: 1fr; } }
        </style>

        <div class="campaign-container">
            <div class="page-header" style="flex-direction: column;">
                <div><h2 class="page-title">Disparo em Massa</h2></div>
                <div><p class="page-description">Envie mensagens personalizadas para seus leads de forma estratégica.</p></div>
            </div>

            <div class="campaign-tabs">
                <button class="tab-btn ${activeTab === 'nova' ? 'active' : ''}" id="tab-nova">
                    <i class="fa-solid fa-plus-circle" style="margin-right: 6px;"></i>Nova Campanha
                </button>
                <button class="tab-btn ${activeTab === 'historico' ? 'active' : ''}" id="tab-historico">
                    <i class="fa-solid fa-history" style="margin-right: 6px;"></i>Histórico
                </button>
            </div>

            <div id="campaign-view-container">
                <!-- Content dynamicly loaded -->
            </div>
        </div>

        <!-- Detail Modal -->
        <div id="campaign-detail-modal" class="modal hidden">
            <div class="modal-content glass" style="max-width: 850px;">
                <span class="close-modal" id="close-detail-modal">&times;</span>
                <div id="campaign-detail-content"></div>
            </div>
        </div>
    `;

    setTimeout(() => setupUI(), 100);

    return pageHtml;

    function renderNovaCampanha() {
        return `
            <div class="card step-card">
                <div class="step-header">
                    <div class="step-number">1</div> <span>Dados Campanha</span>
                </div>
                <div class="form-group" style="margin-bottom: 1.25rem;">
                    <label style="display:block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem;">Nome da Campanha</label>
                    <input type="text" id="campaign-name" class="form-control" placeholder="Ex: Promoção de Fevereiro, Leads Inativos..." maxlength="80">
                </div>
                <div class="form-group">
                    <label>Selecione a instância de WhatsApp</label>
                    <select id="select-instance" class="form-control" style="font-size: 1rem; padding: 0.75rem;">
                        <option value="">Selecione uma instância disponível...</option>
                        ${renderInstanceOptions()}
                    </select>
                    <div style="margin-top: 0.75rem; display: flex; align-items: flex-start; gap: 8px; color: var(--text-muted); font-size: 0.85rem;">
                        <i class="fa-solid fa-circle-info" style="margin-top: 3px; color: var(--primary);"></i>
                        <span>Importante: Instâncias já vinculadas a uma loja estão protegidas e não podem ser usadas em disparos em massa para evitar bloqueios no número oficial.</span>
                    </div>
                </div>
            </div>

            <div class="card step-card">
                <div class="step-header">
                    <div class="step-number">2</div> <span>Público Alvo</span>
                </div>
                
                <div class="leads-selection-table-wrap">
                    <div class="leads-table-filters">
                        <input type="text" id="lead-search" class="form-control" placeholder="Buscar por nome ou telefone...">
                        <select id="lead-filter-store" class="form-control">
                            <option value="">Todas as Lojas</option>
                            ${company?.stores?.map((s: any) => `<option value="${s.id}">${s.name}</option>`).join('')}
                        </select>
                        <select id="lead-filter-status" class="form-control">
                            <option value="">Todos os Status</option>
                            <option value="novo">Novo</option>
                            <option value="cliente_ativo">Cliente Ativo</option>
                            <option value="lead_frio">Lead Frio</option>
                        </select>
                        <select id="lead-filter-activity" class="form-control">
                            <option value="">Qualquer atividade</option>
                            <option value="7">Últimos 7 dias</option>
                            <option value="15">Últimos 15 dias</option>
                            <option value="30">Últimos 30 dias</option>
                            <option value="90">Últimos 90 dias</option>
                        </select>
                    </div>
                    
                    <div class="leads-table-content">
                        <table class="leads-table">
                            <thead>
                                <tr>
                                    <th style="width: 40px;"><input type="checkbox" id="select-all-leads"></th>
                                    <th>Nome</th>
                                    <th>WhatsApp</th>
                                    <th>Loja</th>
                                    <th>Status</th>
                                    <th>Última Atividade</th>
                                </tr>
                            </thead>
                            <tbody id="leads-table-body">
                                <!-- Paginated list -->
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="leads-pagination">
                        <div style="font-size: 0.85rem; color: var(--text-muted);" id="pagination-info">Mostrando 0 de 0</div>
                        <div style="display: flex; gap: 8px;">
                            <button class="btn-secondary" id="prev-page" style="padding: 4px 10px;"><i class="fa-solid fa-chevron-left"></i></button>
                            <button class="btn-secondary" id="next-page" style="padding: 4px 10px;"><i class="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>

                <div class="leads-counter-card">
                    <div class="leads-count-info">
                        <div class="leads-count-icon">
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <div>
                            <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-main);">
                                <span id="selected-count-display">0</span> Leads Selecionados
                            </div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Estes contatos receberão suas mensagens.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card step-card">
                <div class="step-header">
                    <div class="step-number">3</div> <span>Composição da Mensagem</span>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">VARIÁVEIS (Arraste para a mensagem):</span>
                    <div class="var-grid" id="var-chips-container">
                        <div class="var-chip" draggable="true" data-var="{{nome}}"><i class="fa-solid fa-user"></i> Nome</div>
                        <div class="var-chip" draggable="true" data-var="{{telefone}}"><i class="fa-solid fa-phone"></i> Telefone</div>
                        <div class="var-chip" draggable="true" data-var="{{endereco}}"><i class="fa-solid fa-location-dot"></i> Endereço</div>
                    </div>
                </div>

                <div id="messages-list">
                    <!-- Multiple messages -->
                </div>
                
                <button class="btn-add-msg" id="btn-add-message">
                    <i class="fa-solid fa-plus-circle"></i> Adicionar Alternativa de Mensagem
                </button>
            </div>

            <div class="card step-card">
                <div class="step-header">
                    <div class="step-number">4</div> <span>Configurações Inteligentes</span>
                </div>
                <div class="delay-inputs">
                    <div class="delay-box">
                        <label>Intervalo Mínimo (segundos)</label>
                        <input type="number" id="delay-min" class="form-control" value="20" min="5">
                    </div>
                    <div class="delay-box">
                        <label>Intervalo Máximo (segundos)</label>
                        <input type="number" id="delay-max" class="form-control" value="60" min="10">
                    </div>
                </div>
                <div style="margin-top: 1rem; padding: 1rem; background: rgba(245, 158, 11, 0.05); border-radius: 8px; border-left: 4px solid #f59e0b;">
                    <p style="font-size: 0.85rem; color: #b45309; margin-bottom: 0;">
                        <i class="fa-solid fa-triangle-exclamation"></i> <strong>Dica Anti-Ban:</strong> Utilize intervalos maiores (ex: 30-90s) para disparos acima de 50 contatos.
                    </p>
                </div>

                <!-- Scheduling Section -->
                <div style="margin-top: 1.75rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
                    <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">
                        <i class="fa-solid fa-clock"></i> Quando Enviar?
                    </div>
                    <div style="display: flex; gap: 0.75rem; margin-bottom: 1.25rem;">
                        <button id="btn-send-now" class="schedule-toggle active" data-mode="now">
                            <i class="fa-solid fa-bolt"></i> Agora
                        </button>
                        <button id="btn-send-scheduled" class="schedule-toggle" data-mode="scheduled">
                            <i class="fa-solid fa-calendar"></i> Agendar
                        </button>
                    </div>
                    <div id="schedule-datetime-wrap" style="display: none;">
                        <label style="display: block; margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Data e Hora do Disparo</label>
                        <input type="datetime-local" id="schedule-datetime" class="form-control" style="max-width: 320px;">
                        <div id="schedule-error" style="display:none; margin-top: 0.5rem; font-size: 0.82rem; color: #ef4444;">
                            <i class="fa-solid fa-circle-exclamation"></i> Selecione uma data e hora no futuro.
                        </div>
                    </div>
                </div>

                <div style="margin-top: 2rem;">
                    <button class="btn-primary full-width" id="btn-start-campaign" disabled style="padding: 1rem; font-size: 1.1rem; border-radius: 12px;">
                        <i class="fa-solid fa-paper-plane" style="margin-right: 8px;"></i> Iniciar Campanha Agora
                    </button>
                </div>
            </div>
        `;
    }

    function renderHistorico() {
        return `
            <div class="card" style="padding: 0; overflow: hidden; border: 1px solid var(--border-color);">
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Campanha</th>
                                <th>Instância</th>
                                <th>Data</th>
                                <th>Público</th>
                                <th style="width: 150px;">Progresso</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                            <tbody id="campaigns-tbody">
                                ${renderCampaignRows()}
                            </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    function setupUI() {
        const container = document.getElementById('campaign-view-container');
        if (!container) return;

        // Setup real-time listener for campaigns
        const campaignsRef = collection(db, 'campanhas');
        const qCampaigns = query(campaignsRef, where('cliente_id', '==', companyId));

        if ((window as any)._campaignsUnsubscribe) {
            (window as any)._campaignsUnsubscribe();
        }

        const unsubscribe = onSnapshot(qCampaigns, (snapshot) => {
            campaigns = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Only update view if looking at historico
            if (activeTab === 'historico') {
                const tbody = document.getElementById('campaigns-tbody');
                if (tbody) {
                    tbody.innerHTML = renderCampaignRows();
                    setupHistoricoListeners();
                }
            }
        });

        (window as any)._campaignsUnsubscribe = unsubscribe;

        const updateView = () => {
            if (activeTab === 'nova') {
                container.innerHTML = renderNovaCampanha();
                setupNovaListeners();
            } else {
                container.innerHTML = renderHistorico();
                setupHistoricoListeners();
            }
        };

        const tabNova = document.getElementById('tab-nova');
        const tabHist = document.getElementById('tab-historico');

        tabNova?.addEventListener('click', () => {
            activeTab = 'nova';
            tabNova.classList.add('active');
            tabHist?.classList.remove('active');
            updateView();
        });

        tabHist?.addEventListener('click', () => {
            activeTab = 'historico';
            tabHist.classList.add('active');
            tabNova?.classList.remove('active');
            updateView();
        });

        // Initial view
        updateView();
    }

    function setupNovaListeners() {
        // --- State ---
        let currentPage = 1;
        const pageSize = 15;
        let selectedLeadIds = new Set<string>();
        let filteredLeads: any[] = allLeads;
        let messages: string[] = ['']; // At least one message

        // --- Selectors ---
        const campaignNameInput = document.getElementById('campaign-name') as HTMLInputElement;
        const selectInst = document.getElementById('select-instance') as HTMLSelectElement;
        const btnStart = document.getElementById('btn-start-campaign') as HTMLButtonElement;

        const leadSearch = document.getElementById('lead-search') as HTMLInputElement;
        const leadFilterStore = document.getElementById('lead-filter-store') as HTMLSelectElement;
        const leadFilterStatus = document.getElementById('lead-filter-status') as HTMLSelectElement;
        const leadFilterActivity = document.getElementById('lead-filter-activity') as HTMLSelectElement;
        const leadsTableBody = document.getElementById('leads-table-body');
        const selectAllLeads = document.getElementById('select-all-leads') as HTMLInputElement;
        const paginationInfo = document.getElementById('pagination-info');
        const prevPageBtn = document.getElementById('prev-page');
        const nextPageBtn = document.getElementById('next-page');
        const selectedCountDisplay = document.getElementById('selected-count-display');

        const messagesList = document.getElementById('messages-list');
        const btnAddMessage = document.getElementById('btn-add-message');

        // --- Functions ---
        const applyFilters = () => {
            const search = leadSearch.value.toLowerCase();
            const storeId = leadFilterStore.value;
            const status = leadFilterStatus.value;
            const activityDays = leadFilterActivity ? parseInt(leadFilterActivity.value || '0') : 0;

            // Calculate cutoff timestamp for last activity filter
            const now = Date.now();
            const cutoffMs = activityDays > 0 ? now - activityDays * 24 * 60 * 60 * 1000 : null;

            filteredLeads = (allLeads as any[]).filter(l => {
                const matchesSearch = !search || (l.nome || '').toLowerCase().includes(search) || (l.telefone || '').includes(search);
                const matchesStore = !storeId || l.lojaId === storeId;
                const matchesStatus = !status || (l.statusLead || 'novo') === status;

                let matchesActivity = true;
                if (cutoffMs !== null) {
                    // Support Firestore Timestamp objects and plain dates
                    const rawDate = l.updatedAt || l.criadoEm || l.createdAt;
                    let lastActivityMs: number | null = null;
                    if (rawDate) {
                        if (typeof rawDate.toDate === 'function') {
                            lastActivityMs = rawDate.toDate().getTime();
                        } else if (rawDate.seconds) {
                            lastActivityMs = rawDate.seconds * 1000;
                        } else {
                            lastActivityMs = new Date(rawDate).getTime();
                        }
                    }
                    matchesActivity = lastActivityMs !== null && lastActivityMs >= cutoffMs;
                }

                return matchesSearch && matchesStore && matchesStatus && matchesActivity;
            });

            currentPage = 1;
            renderLeads();
        };

        const renderLeads = () => {
            if (!leadsTableBody || !paginationInfo) return;

            const startIdx = (currentPage - 1) * pageSize;
            const endIdx = Math.min(startIdx + pageSize, filteredLeads.length);
            const pageLeads = filteredLeads.slice(startIdx, endIdx);

            leadsTableBody.innerHTML = pageLeads.map(l => {
                const isSelected = selectedLeadIds.has(l.id);
                const storeName = company?.stores?.find((s: any) => s.id === l.lojaId)?.name || 'N/A';
                const activity = formatActivityDate(l.updatedAt || l.criadoEm || l.createdAt);
                return `
                    <tr>
                        <td><input type="checkbox" class="lead-checkbox" data-id="${l.id}" ${isSelected ? 'checked' : ''}></td>
                        <td>${l.nome || 'Sem nome'}</td>
                        <td>${(l.telefone || '').split('@')[0]}</td>
                        <td><span class="badge secondary" style="font-size: 0.7rem;">${storeName}</span></td>
                        <td><span class="badge ${l.statusLead === 'cliente_ativo' ? 'success' : 'secondary'}" style="font-size: 0.7rem;">${l.statusLead || 'novo'}</span></td>
                        <td>
                            <span style="display:inline-flex;align-items:center;gap:5px;font-size:0.78rem;color:var(--text-muted);">
                                <span style="width:7px;height:7px;border-radius:50%;background:${activity.color};flex-shrink:0;"></span>
                                <span style="color:${activity.color};font-weight:600;">${activity.label}</span>
                            </span>
                        </td>
                    </tr>
                `;
            }).join('');

            paginationInfo.textContent = `Mostrando ${startIdx + 1}-${endIdx} de ${filteredLeads.length}`;
            if (selectedCountDisplay) selectedCountDisplay.textContent = selectedLeadIds.size.toString();

            // Refresh Select All checkbox state
            const allInPageChecked = pageLeads.length > 0 && pageLeads.every(l => selectedLeadIds.has(l.id));
            if (selectAllLeads) selectAllLeads.checked = allInPageChecked;

            // Bind checkbox events
            document.querySelectorAll('.lead-checkbox').forEach(cb => {
                cb.addEventListener('change', (e: any) => {
                    const id = e.target.dataset.id;
                    if (e.target.checked) selectedLeadIds.add(id);
                    else selectedLeadIds.delete(id);
                    if (selectedCountDisplay) selectedCountDisplay.textContent = selectedLeadIds.size.toString();
                    validate();
                });
            });

            validate();
        };

        const renderMessages = () => {
            if (!messagesList) return;
            messagesList.innerHTML = messages.map((m, idx) => `
                <div class="message-block" data-index="${idx}">
                    <div class="message-block-header">
                        <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">MENSAGEM #${idx + 1}</span>
                        ${messages.length > 1 ? `<button class="btn-remove-msg" data-index="${idx}"><i class="fa-solid fa-trash-can"></i> Remover</button>` : ''}
                    </div>
                    <textarea class="form-control msg-textarea" rows="5" placeholder="Digite sua mensagem aqui..." data-index="${idx}" style="width: 100%; box-sizing: border-box;">${m}</textarea>
                    <div style="display: flex; justify-content: flex-end; margin-top: 5px;">
                        <span class="char-count" style="font-size: 0.7rem; color: var(--text-muted);">${m.length} caracteres</span>
                    </div>
                </div>
            `).join('');

            // Bind remove events
            document.querySelectorAll('.btn-remove-msg').forEach(btn => {
                const btnEl = btn as HTMLElement;
                btnEl.addEventListener('click', () => {
                    const idx = parseInt(btnEl.dataset.index || '0');
                    messages.splice(idx, 1);
                    renderMessages();
                    validate();
                });
            });

            // Bind textarea events
            document.querySelectorAll('.msg-textarea').forEach(ta => {
                const textarea = ta as HTMLTextAreaElement;
                textarea.addEventListener('input', () => {
                    const idx = parseInt(textarea.dataset.index || '0');
                    messages[idx] = textarea.value;
                    const countSpan = textarea.parentElement?.querySelector('.char-count');
                    if (countSpan) countSpan.textContent = `${textarea.value.length} caracteres`;
                    validate();
                });

                // Drag and Drop
                textarea.addEventListener('dragover', (e) => e.preventDefault());
                textarea.addEventListener('drop', (e) => {
                    e.preventDefault();
                    const variable = e.dataTransfer!.getData('text/plain');
                    if (!variable) return;
                    const start = textarea.selectionStart || textarea.value.length;
                    const end = textarea.selectionEnd || textarea.value.length;
                    const newVal = textarea.value.slice(0, start) + variable + textarea.value.slice(end);
                    textarea.value = newVal;
                    const idx = parseInt(textarea.dataset.index || '0');
                    messages[idx] = newVal;
                    validate();
                });
            });
        };

        const validate = () => {
            const hasInst = !!selectInst.value;
            const hasLeads = selectedLeadIds.size > 0;
            const allMsgsFilled = messages.every(m => m.trim().length > 0);
            const selectedOpt = selectInst.options[selectInst.selectedIndex] as HTMLOptionElement | undefined;
            const isInstOpen = selectedOpt?.dataset.status === 'conectado' ||
                selectedOpt?.dataset.status === 'open';

            let scheduleOk = true;
            if (sendMode === 'scheduled') {
                const val = scheduleDatetimeInput?.value;
                if (!val || new Date(val).getTime() <= Date.now()) {
                    scheduleOk = false;
                }
            }

            btnStart.disabled = !(hasInst && isInstOpen && hasLeads && allMsgsFilled && scheduleOk);
        };

        // --- Event Listeners ---
        leadSearch?.addEventListener('input', applyFilters);
        leadFilterStore?.addEventListener('change', applyFilters);
        leadFilterStatus?.addEventListener('change', applyFilters);
        leadFilterActivity?.addEventListener('change', applyFilters);
        campaignNameInput?.addEventListener('input', validate);

        prevPageBtn?.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderLeads();
            }
        });

        nextPageBtn?.addEventListener('click', () => {
            if (currentPage < Math.ceil(filteredLeads.length / pageSize)) {
                currentPage++;
                renderLeads();
            }
        });

        selectAllLeads?.addEventListener('change', (e: any) => {
            const startIdx = (currentPage - 1) * pageSize;
            const endIdx = Math.min(startIdx + pageSize, filteredLeads.length);
            const pageLeads = filteredLeads.slice(startIdx, endIdx);

            if (e.target.checked) {
                pageLeads.forEach(l => selectedLeadIds.add(l.id));
            } else {
                pageLeads.forEach(l => selectedLeadIds.delete(l.id));
            }
            renderLeads();
        });

        btnAddMessage?.addEventListener('click', () => {
            messages.push('');
            renderMessages();
            validate();
        });

        // Setup Var Draggable
        document.querySelectorAll('.var-chip').forEach(chip => {
            const htmlChip = chip as HTMLElement;
            htmlChip.addEventListener('dragstart', (e: any) => {
                e.dataTransfer.setData('text/plain', htmlChip.dataset.var || '');
            });
        });

        // --- Schedule state ---
        let sendMode: 'now' | 'scheduled' = 'now';

        selectInst?.addEventListener('change', validate);

        // Schedule toggles
        const btnSendNow = document.getElementById('btn-send-now');
        const btnSendScheduled = document.getElementById('btn-send-scheduled');
        const scheduleDatetimeWrap = document.getElementById('schedule-datetime-wrap');
        const scheduleDatetimeInput = document.getElementById('schedule-datetime') as HTMLInputElement;
        const scheduleError = document.getElementById('schedule-error');
        const btnStartLabel = () => {
            if (sendMode === 'scheduled') {
                btnStart.innerHTML = '<i class="fa-solid fa-calendar-clock" style="margin-right: 8px;"></i> Agendar Campanha';
            } else {
                btnStart.innerHTML = '<i class="fa-solid fa-paper-plane" style="margin-right: 8px;"></i> Iniciar Campanha Agora';
            }
        };

        // Set min datetime to now
        const pad = (n: number) => String(n).padStart(2, '0');
        const now = new Date();
        now.setMinutes(now.getMinutes() + 5); // at least 5 min from now
        scheduleDatetimeInput.min = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;

        btnSendNow?.addEventListener('click', () => {
            sendMode = 'now';
            btnSendNow.classList.add('active');
            btnSendScheduled?.classList.remove('active');
            if (scheduleDatetimeWrap) scheduleDatetimeWrap.style.display = 'none';
            if (scheduleError) scheduleError.style.display = 'none';
            btnStartLabel();
            validate();
        });

        btnSendScheduled?.addEventListener('click', () => {
            sendMode = 'scheduled';
            btnSendScheduled.classList.add('active');
            btnSendNow?.classList.remove('active');
            if (scheduleDatetimeWrap) scheduleDatetimeWrap.style.display = 'block';
            btnStartLabel();
            validate();
        });

        scheduleDatetimeInput?.addEventListener('change', () => {
            if (scheduleError) scheduleError.style.display = 'none';
            validate();
        });

        btnStart?.addEventListener('click', async () => {
            // Validate schedule date if needed
            if (sendMode === 'scheduled') {
                const val = scheduleDatetimeInput?.value;
                if (!val || new Date(val).getTime() <= Date.now()) {
                    if (scheduleError) scheduleError.style.display = 'block';
                    return;
                }
            }

            const isScheduled = sendMode === 'scheduled';
            const scheduledAt = isScheduled
                ? new Date(scheduleDatetimeInput.value)
                : new Date(); // 'agora' = timestamp atual

            const confirmMsg = isScheduled
                ? `Confirma o agendamento para ${scheduledAt.toLocaleString('pt-BR')} com ${selectedLeadIds.size} leads?`
                : `Deseja iniciar o disparo imediato para ${selectedLeadIds.size} leads com ${messages.length} variações de mensagem?`;

            const confirmed = await confirm.warning(isScheduled ? 'Agendar Campanha' : 'Iniciar Campanha', confirmMsg);
            if (confirmed) {
                try {
                    btnStart.disabled = true;
                    btnStart.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';

                    // Todas as campanhas usam o mesmo fluxo: status='agendada' + data_agendamento
                    // O backend processa quando data_agendamento <= now()
                    const campaignData: any = {
                        cliente_id: companyId,
                        instancia_id: selectInst.value,
                        nome: (campaignNameInput?.value?.trim()) || `Campanha MB ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
                        mensagens: messages,
                        total_leads: selectedLeadIds.size,
                        lead_ids: Array.from(selectedLeadIds),
                        enviados: 0,
                        falhas: 0,
                        status: 'agendada',
                        agendamento_imediato: !isScheduled, // flag para diferenciar no backend/UI
                        data_agendamento: Timestamp.fromDate(scheduledAt),
                        data_inicio: null,
                        config: {
                            delay_min: parseInt((document.getElementById('delay-min') as HTMLInputElement).value || '20'),
                            delay_max: parseInt((document.getElementById('delay-max') as HTMLInputElement).value || '60')
                        }
                    };

                    await dbService.create('campanhas', campaignData);
                    toast.success(isScheduled ? 'Campanha agendada com sucesso!' : 'Campanha criada! O disparo será iniciado em instantes.');
                    window.location.reload();
                } catch (e) {
                    toast.error('Erro ao salvar campanha: ' + e);
                    btnStart.disabled = false;
                    btnStartLabel();
                }
            }
        });

        // --- Initial Render ---
        renderLeads();
        renderMessages();
    }

    function setupHistoricoListeners() {
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = (btn as HTMLElement).dataset.id!;
                const campaign = campaigns.find(c => c.id === id);
                if (campaign) showDetailModal(campaign);
            });
        });

        document.querySelectorAll('.cancel-campaign').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = (btn as HTMLElement).dataset.id!;
                const campaign = campaigns.find(c => c.id === id);
                if (!campaign) return;

                const confirmed = await confirm.danger('Cancelar Campanha', 'Você tem certeza que deseja cancelar esta campanha? Ela será interrompida e nenhum outro envio será feito.');
                if (confirmed) {
                    try {
                        await dbService.update('campanhas', id, { status: 'cancelada' });
                        toast.success('Campanha cancelada com sucesso.');
                    } catch (error) {
                        toast.error('Erro ao cancelar a campanha.');
                        console.error('Erro ao cancelar campanha:', error);
                    }
                }
            });
        });

        const closeBtn = document.getElementById('close-detail-modal');
        const modal = document.getElementById('campaign-detail-modal');
        closeBtn?.addEventListener('click', () => modal?.classList.add('hidden'));
    }

    function showDetailModal(c: any) {
        const modal = document.getElementById('campaign-detail-modal');
        const content = document.getElementById('campaign-detail-content');
        if (!modal || !content) return;

        const progress = c.total_leads > 0 ? Math.round(((c.enviados + c.falhas) / c.total_leads) * 100) : 0;

        content.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 2rem;">
                <div style="width: 48px; height: 48px; background: var(--primary); color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                    <i class="fa-solid fa-bullhorn"></i>
                </div>
                <div>
                    <h3 style="margin: 0;">${c.nome || 'Detalhes da Campanha'}</h3>
                    <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">Iniciada em ${new Date(c.data_inicio.seconds * 1000).toLocaleString()}</p>
                </div>
            </div>

            <div class="lead-info-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div class="card" style="background: var(--surface-light); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Público Total</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-main);">${c.total_leads}</div>
                </div>
                <div class="card" style="background: rgba(34, 197, 94, 0.05); border-color: rgba(34, 197, 94, 0.2); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: #22c55e; text-transform: uppercase; margin-bottom: 0.5rem;">Sucesso</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #22c55e;">${c.enviados}</div>
                </div>
                <div class="card" style="background: rgba(239, 68, 68, 0.05); border-color: rgba(239, 68, 68, 0.2); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: #ef4444; text-transform: uppercase; margin-bottom: 0.5rem;">Falhas</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #ef4444;">${c.falhas}</div>
                </div>
                <div class="card" style="background: var(--surface-light); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Status</div>
                    <span class="badge ${c.status === 'finalizada' ? 'success' : 'warning'}" style="font-size: 0.8rem;">${c.status.toUpperCase()}</span>
                </div>
            </div>

            <div style="margin-bottom: 2rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem;">
                    <span>Progresso do Envio</span>
                    <span>${progress}%</span>
                </div>
                <div style="width: 100%; height: 12px; background: var(--surface-hover); border-radius: 6px; overflow: hidden; border: 1px solid var(--border-color);">
                    <div style="width: ${progress}%; height: 100%; background: linear-gradient(90deg, var(--primary) 0%, #818cf8 100%); border-radius: 6px; transition: width 0.5s ease;"></div>
                </div>
            </div>

            <div class="card" style="background: var(--surface-hover); border: 1px solid var(--border-color); padding: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 1.25rem; color: var(--text-main); font-weight: 600;">
                    <i class="fa-solid fa-message text-primary"></i>
                    Variações de Mensagem
                    <span class="badge secondary" style="font-size: 0.75rem; margin-left: 4px;">${(c.mensagens || [c.mensagem]).filter(Boolean).length}</span>
                </div>
                ${(c.mensagens?.length ? c.mensagens : (c.mensagem ? [c.mensagem] : ['(sem mensagem)']))
                .map((msg: string, idx: number) => `
                        <div style="
                            background: rgba(255,255,255,0.03);
                            border: 1px solid var(--border-color);
                            border-radius: 10px;
                            padding: 1rem 1.25rem;
                            margin-bottom: 0.75rem;
                            position: relative;
                        ">
                            <div style="font-size: 0.7rem; font-weight: 700; color: var(--primary); text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.05em;">
                                <i class="fa-solid fa-comment"></i> Mensagem #${idx + 1}
                            </div>
                            <div style="white-space: pre-wrap; font-size: 0.92rem; line-height: 1.65; color: var(--text-main); font-family: inherit;">${msg}</div>
                        </div>
                    `).join('')}
            </div>
        `;
        modal.classList.remove('hidden');
    }
};

