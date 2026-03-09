import { dbService } from '../services/db';
import { authService } from '../services/auth';
import { toast } from '../services/toast';
import { confirm } from '../services/confirm';
import { Timestamp, collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

// ─── Status helpers ───────────────────────────────────────────────────────────

const LEAD_STATUS_MAP: Record<string, { label: string; cls: string }> = {
    novo: { label: 'Novo', cls: 'badge info' },
    cliente_ativo: { label: 'Cliente Ativo', cls: 'badge success' },
    inativo: { label: 'Inativo', cls: 'badge secondary' },
    bloqueado: { label: 'Bloqueado', cls: 'badge danger' },
};

const ATENDIMENTO_STATUS_MAP: Record<string, { label: string; cls: string; icon: string }> = {
    bot: { label: 'Bot', icon: '<i class="fa-solid fa-robot"></i>', cls: 'badge primary' },
    em_atendimento_humano: { label: 'Atendimento Humano', icon: '<i class="fa-solid fa-user"></i>', cls: 'badge warning' },
    finalizado: { label: 'Finalizado', icon: '<i class="fa-solid fa-check"></i>', cls: 'badge success' },
    abandonado: { label: 'Abandonado', icon: '<i class="fa-solid fa-warning"></i>', cls: 'badge secondary' },
};

function getLeadStatusBadge(status: string): string {
    const s = (status || 'novo').toLowerCase();
    const m = LEAD_STATUS_MAP[s] || { label: status || 'Novo', cls: 'badge info' };
    return `<span class="${m.cls}">${m.label}</span>`;
}

function getAtendimentoBadge(status: string): string {
    const s = (status || 'bot').toLowerCase();
    const m = ATENDIMENTO_STATUS_MAP[s] || { label: status || 'Bot', icon: '<i class="fa-solid fa-robot"></i>', cls: 'badge primary' };
    return `<span class="${(m as any).cls}">${(m as any).icon} ${(m as any).label}</span>`;
}

function formatDate(date: any): string {
    if (!date) return '-';
    if (date.toDate) return date.toDate().toLocaleString('pt-BR');
    return new Date(date).toLocaleString('pt-BR');
}

// ─── Page ────────────────────────────────────────────────────────────────────

export const Leads = async () => {

    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser.companyId) {
        return `<p>Usuário sem empresa.</p>`;
    }

    let leads: any[] = await dbService.getAll('leads', {
        field: 'empresaId',
        operator: '==',
        value: currentUser.companyId
    });

    const userStoreIds = (currentUser as any).storeIds || ((currentUser as any).storeId ? [(currentUser as any).storeId] : []);
    if (currentUser.role !== 'owner') {
        leads = leads.filter(l => l.lojaId && userStoreIds.includes(l.lojaId));
    }

    // Check modules to hide atendimento status if only catalog is active
    const company = await dbService.get('companies', currentUser.companyId) as any;
    const modulos = company?.modulos_ativos || [];
    const isOnlyCatalog = modulos.includes('venda_catalogo') && !modulos.includes('atendimento');

    // ── active filter state ──
    let activeFilter = 'todos';

    const renderTable = (list: any[]) => {
        if (list.length === 0) {
            const colspan = isOnlyCatalog ? 4 : 5;
            return `<tr><td colspan="${colspan}" style="text-align:center;padding:2.5rem;color:var(--text-muted);">Nenhum lead encontrado.</td></tr>`;
        }
        return list.map((lead: any) => {
            const statusLead = (lead.statusLead || 'novo').toLowerCase();
            const rawStatusAtend = (lead.statusAtendimento || 'bot').toLowerCase();
            const statusAtend = rawStatusAtend === 'atendimento_humano' ? 'em_atendimento_humano' : rawStatusAtend;
            const phone = (lead.telefone || '').split('@')[0];
            return `
            <tr data-lead-id="${lead.id}">
                <td>
                    <div style="display:flex;align-items:center;gap:0.75rem;">
                        <div class="lead-avatar">${(lead.nome || lead.telefone || 'C')[0].toUpperCase()}</div>
                        <div>
                            <div style="font-weight:600;">${lead.nome || 'Sem nome'}</div>
                            <div style="font-size:0.78rem;color:var(--text-muted);">${phone}</div>
                        </div>
                    </div>
                </td>
                <td>${getLeadStatusBadge(statusLead)}</td>
                ${!isOnlyCatalog ? `<td>${getAtendimentoBadge(statusAtend)}</td>` : ''}
                <td style="color:var(--text-muted);font-size:0.85rem;">${formatDate(lead.updatedAt || lead.criadoEm || lead.createdAt)}</td>
                <td>
                    <div class="actions">
                        <button class="action-btn view" title="Ver detalhes" data-id="${lead.id}">
                            <i style="color:#fff;" class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }).join('');
    };

    const filterLeads = (filter: string) => {
        if (filter === 'todos') return leads;
        if (filter === 'humano') return leads.filter(l => {
            const s = (l.statusAtendimento || '').toLowerCase();
            return s === 'em_atendimento_humano' || s === 'atendimento_humano';
        });
        if (filter === 'bloqueado') return leads.filter(l => (l.statusLead || '').toLowerCase() === 'bloqueado');
        if (filter === 'bot') return leads.filter(l => (l.statusAtendimento || 'bot').toLowerCase() === 'bot');
        return leads;
    };

    setTimeout(() => setupListeners(), 100);

    return `
        <div class="leads-page-header">
            <div class="leads-filter-bar">
                <button class="filter-btn active" data-filter="todos">Todos <span class="filter-count" id="count-lead-todos">${leads.length}</span></button>
                ${!isOnlyCatalog ? `
                <button class="filter-btn" data-filter="bot"><i class="fa-solid fa-robot"></i> Bot <span class="filter-count" id="count-lead-bot">${leads.filter(l => (l.statusAtendimento || 'bot').toLowerCase() === 'bot').length}</span></button>
                <button class="filter-btn" data-filter="humano"><i class="fa-solid fa-user"></i> Atendimento Humano <span class="filter-count" id="count-lead-humano">${leads.filter(l => {
        const s = (l.statusAtendimento || '').toLowerCase();
        return s === 'em_atendimento_humano' || s === 'atendimento_humano';
    }).length}</span></button>
                ` : ''}
                <button class="filter-btn" data-filter="bloqueado"><i class="fa-solid fa-ban"></i> Bloqueados <span class="filter-count" id="count-lead-bloqueado">${leads.filter(l => (l.statusLead || '').toLowerCase() === 'bloqueado').length}</span></button>
            </div>
        </div>

        <div class="card leads-card">
            <div class="table-container">
                <table class="data-table" id="leads-table">
                    <thead>
                        <tr>
                            <th>Lead</th>
                            <th>Status do Lead</th>
                            ${!isOnlyCatalog ? `<th>Status do Atendimento</th>` : ''}
                            <th>Última Atividade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="leads-tbody">
                        ${renderTable(leads)}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Lead Detail Modal -->
        <div id="lead-detail-modal" class="modal hidden">
            <div class="modal-content glass lead-modal-content">
                <div id="lead-modal-inner"></div>
            </div>
        </div>
    `;

    // ─── Setup ───────────────────────────────────────────────────────────────

    function setupListeners() {
        // Real-time listener
        if (currentUser) {
            const leadsRef = collection(db, 'leads');
            const qLeads = query(leadsRef, where('empresaId', '==', currentUser.companyId));

            if ((window as any)._leadsUnsubscribe) {
                (window as any)._leadsUnsubscribe();
            }

            const unsubscribe = onSnapshot(qLeads, (snapshot) => {
                leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                const userStoreIds = (currentUser as any).storeIds || ((currentUser as any).storeId ? [(currentUser as any).storeId] : []);
                if (currentUser.role !== 'owner') {
                    leads = leads.filter(l => l.lojaId && userStoreIds.includes(l.lojaId));
                }

                // Update UI
                const tbody = document.getElementById('leads-tbody');
                if (tbody) {
                    tbody.innerHTML = renderTable(filterLeads(activeFilter));
                    attachViewListeners();
                }

                // Update Filter Counts
                const counts = {
                    todos: leads.length,
                    bot: leads.filter(l => (l.statusAtendimento || 'bot').toLowerCase() === 'bot').length,
                    humano: leads.filter(l => {
                        const s = (l.statusAtendimento || '').toLowerCase();
                        return s === 'em_atendimento_humano' || s === 'atendimento_humano';
                    }).length,
                    bloqueado: leads.filter(l => (l.statusLead || '').toLowerCase() === 'bloqueado').length
                };

                Object.entries(counts).forEach(([key, val]) => {
                    const el = document.getElementById(`count-lead-${key}`);
                    if (el) el.textContent = val.toString();
                });
            });

            (window as any)._leadsUnsubscribe = unsubscribe;
        }

        // Filter buttons behavior
        document.querySelectorAll('.leads-filter-bar .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.leads-filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeFilter = (btn as HTMLElement).dataset.filter || 'todos';
                const tbody = document.getElementById('leads-tbody');
                if (tbody) tbody.innerHTML = renderTable(filterLeads(activeFilter));
                attachViewListeners();
            });
        });

        attachViewListeners();

        // Close modal on backdrop click
        const modal = document.getElementById('lead-detail-modal');
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.add('hidden');
        });
    }

    function attachViewListeners() {
        document.querySelectorAll('.action-btn.view').forEach(btn => {
            btn.addEventListener('click', async () => {
                const leadId = (btn as HTMLElement).dataset.id!;
                // Always fetch fresh data from memory (re-fetch if stale)
                const lead = leads.find(l => l.id === leadId);
                if (lead) showLeadModal(lead);
            });
        });
    }

    // ─── Modal ───────────────────────────────────────────────────────────────

    function showLeadModal(lead: any) {
        const modal = document.getElementById('lead-detail-modal');
        const inner = document.getElementById('lead-modal-inner');
        if (!modal || !inner) return;

        const statusLead = (lead.statusLead || 'novo').toLowerCase();
        const rawStatusAtend = (lead.statusAtendimento || 'bot').toLowerCase();
        // Normalize status for UI checks
        const statusAtend = rawStatusAtend === 'atendimento_humano' ? 'em_atendimento_humano' : rawStatusAtend;
        const isBloqueado = statusLead === 'bloqueado';
        const phone = (lead.telefone || '').split('@')[0];

        // ── Dynamic action button ──
        let actionBtn = '';
        if (!isBloqueado && !isOnlyCatalog) {
            if (statusAtend === 'bot') {
                actionBtn = `<button id="lead-action-primary" class="btn-lead-action" data-action="assumir">
                    <i class="fa-solid fa-user"></i> Assumir Atendimento
                </button>`;
            } else if (statusAtend === 'em_atendimento_humano') {
                actionBtn = `<button id="lead-action-primary" class="btn-lead-action danger" data-action="finalizar">
                    <i class="fa-solid fa-user"></i> Finalizar Atendimento
                </button>`;
            } else {
                // finalizado | abandonado
                actionBtn = `<button id="lead-action-primary" class="btn-lead-action" data-action="novo_atendimento">
                    <i class="fa-solid fa-user"></i> Iniciar Novo Atendimento
                </button>`;
            }
        }

        // ── 3-dot menu items ──
        const menuItems = buildMenuItems(statusLead, statusAtend);

        inner.innerHTML = `
            <div class="lead-modal-header">
                <div class="lead-modal-avatar">${(lead.nome || lead.telefone || 'C')[0].toUpperCase()}</div>
                <div class="lead-modal-title">
                    <h2>${lead.nome || 'Sem nome'}</h2>
                    <span style="color:var(--text-muted);font-size:0.9rem;">${phone}</span>
                </div>
                <div class="lead-modal-header-actions">
                    ${menuItems.length > 0 ? `
                    <div class="lead-menu-wrap">
                        <button class="action-btn lead-menu-btn" id="lead-menu-trigger" title="Mais ações">
                            <i class="fa-solid fa-ellipsis-vertical" style="color:#fff;"></i>
                        </button>
                        <div class="lead-dropdown hidden" id="lead-dropdown">
                            ${menuItems.map(item => `
                                <button class="lead-dropdown-item ${item.danger ? 'danger' : ''}" data-menu-action="${item.action}">
                                    ${item.icon} ${item.label}
                                </button>
                            `).join('')}
                        </div>
                    </div>` : ''}
                    <button class="action-btn" id="close-lead-modal" title="Fechar">
                        <i class="fa-solid fa-xmark" style="color:#fff;"></i>
                    </button>
                </div>
            </div>

                <div class="lead-badge-group">
                    <span class="badge-label">Status do Lead</span>
                    ${getLeadStatusBadge(statusLead)}
                </div>
                ${!isOnlyCatalog ? `
                <div class="lead-badge-group">
                    <span class="badge-label">Status do Atendimento</span>
                    ${getAtendimentoBadge(statusAtend)}
                </div>` : ''}
            </div>

            <div class="lead-modal-body">
                <div class="lead-info-grid">
                    <div class="lead-info-item">
                        <span class="lead-info-label">Telefone</span>
                        <span class="lead-info-value">${phone || '-'}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Empresa ID</span>
                        <span class="lead-info-value" style="font-size:0.8rem;">${lead.empresaId || '-'}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Criado em</span>
                        <span class="lead-info-value">${formatDate(lead.criadoEm || lead.createdAt)}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Última atividade</span>
                        <span class="lead-info-value">${formatDate(lead.updatedAt)}</span>
                    </div>
                    ${lead.endereco ? `
                    <div class="lead-info-item" style="grid-column:1/-1;">
                        <span class="lead-info-label">Endereço</span>
                        <span class="lead-info-value">${lead.endereco}</span>
                    </div>` : ''}
                </div>

                ${lead.ultimoPedido || lead.lastOrder ? `
                <div class="lead-section">
                    <h4 class="lead-section-title">Último Pedido</h4>
                    <div class="lead-last-order">
                        <span>${lead.ultimoPedido || lead.lastOrder}</span>
                    </div>
                </div>` : ''}

                ${lead.historicoResumo ? `
                <div class="lead-section">
                    <h4 class="lead-section-title">Histórico</h4>
                    <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.6;">${lead.historicoResumo}</p>
                </div>` : ''}

                ${isBloqueado ? `
                <div class="lead-alert danger">
                    <i class="fa-solid fa-lock"></i> Este lead está bloqueado. Desbloqueie antes de iniciar atendimento.
                </div>` : ''}
            </div>

            ${actionBtn ? `
            <div class="lead-modal-footer">
                ${actionBtn}
            </div>` : ''}
        `;

        modal.classList.remove('hidden');

        // ── Modal event listeners ──
        document.getElementById('close-lead-modal')?.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        // 3-dot menu toggle
        const menuTrigger = document.getElementById('lead-menu-trigger');
        const dropdown = document.getElementById('lead-dropdown');
        menuTrigger?.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown?.classList.toggle('hidden');
        });
        document.addEventListener('click', () => dropdown?.classList.add('hidden'), { once: true });

        // Menu actions
        dropdown?.querySelectorAll('.lead-dropdown-item').forEach(item => {
            item.addEventListener('click', async () => {
                dropdown.classList.add('hidden');
                const action = (item as HTMLElement).dataset.menuAction;
                await handleMenuAction(action!, lead);
            });
        });

        // Primary action button
        document.getElementById('lead-action-primary')?.addEventListener('click', async function () {
            const action = (this as HTMLElement).dataset.action!;
            await handlePrimaryAction(action, lead);
        });
    }

    // ─── Actions ─────────────────────────────────────────────────────────────

    function buildMenuItems(statusLead: string, _statusAtend: string) {
        const items: { label: string; icon: string; action: string; danger?: boolean }[] = [];
        const isBloqueado = statusLead === 'bloqueado';

        if (isBloqueado) {
            items.push({ label: 'Desbloquear Lead', icon: '<i class="fa-solid fa-unlock"></i>', action: 'desbloquear' });
        } else {
            items.push({ label: 'Bloquear Lead', icon: '<i class="fa-solid fa-lock"></i>', action: 'bloquear', danger: true });
        }

        return items;
    }

    async function handleMenuAction(action: string, lead: any) {
        if (action === 'bloquear') {
            const ok = await confirm.danger('Bloquear Lead', `Deseja bloquear o lead ${lead.nome || lead.telefone}? Ele não poderá receber atendimento enquanto bloqueado.`);
            if (!ok) return;
            try {
                await dbService.update('leads', lead.id, {
                    statusLead: 'bloqueado',
                    statusAtendimento: 'finalizado',
                    estado: 'finalizado',
                    updatedAt: Timestamp.now()
                });
                lead.statusLead = 'bloqueado';
                lead.statusAtendimento = 'finalizado';
                lead.estado = 'finalizado';
                toast.success('Lead bloqueado e atendimento finalizado.');
                updateLeadInList(lead);
                showLeadModal(lead);
            } catch {
                toast.error('Erro ao bloquear lead.');
            }
        }

        if (action === 'desbloquear') {
            const ok = await confirm.warning('Desbloquear Lead', `Deseja desbloquear o lead ${lead.nome || lead.telefone}?`);
            if (!ok) return;
            try {
                await dbService.update('leads', lead.id, { statusLead: 'cliente_ativo', updatedAt: Timestamp.now() });
                lead.statusLead = 'cliente_ativo';
                toast.success('Lead desbloqueado com sucesso.');
                updateLeadInList(lead);
                showLeadModal(lead);
            } catch {
                toast.error('Erro ao desbloquear lead.');
            }
        }
    }

    async function handlePrimaryAction(action: string, lead: any) {
        const btn = document.getElementById('lead-action-primary') as HTMLButtonElement;

        if (action === 'assumir') {
            const ok = await confirm.warning('Assumir Atendimento', `Deseja assumir o atendimento humano do lead ${lead.nome || lead.telefone}?`);
            if (!ok) return;
            btn.disabled = true;
            btn.textContent = '<i class="fa-solid hourglass"></i> Processando...';
            try {
                await dbService.update('leads', lead.id, {
                    statusAtendimento: 'em_atendimento_humano',
                    estado: 'atendimento_humano',
                    updatedAt: Timestamp.now()
                });
                lead.statusAtendimento = 'em_atendimento_humano';
                lead.estado = 'atendimento_humano';
                toast.success('Atendimento humano iniciado.');
                updateLeadInList(lead);
                showLeadModal(lead);
            } catch {
                toast.error('Erro ao assumir atendimento.');
                btn.disabled = false;
                btn.textContent = '<i class="fa-solid user"></i> Assumir Atendimento';
            }
        }

        if (action === 'finalizar') {
            const ok = await confirm.warning('Finalizar Atendimento', `Deseja finalizar o atendimento do lead ${lead.nome || lead.telefone}?`);
            if (!ok) return;
            btn.disabled = true;
            btn.textContent = '<i class="fa-solid hourglass"></i> Processando...';
            try {
                await dbService.update('leads', lead.id, {
                    statusAtendimento: 'finalizado',
                    estado: 'finalizado',
                    updatedAt: Timestamp.now()
                });
                lead.statusAtendimento = 'finalizado';
                lead.estado = 'finalizado';
                toast.success('Atendimento finalizado.');
                updateLeadInList(lead);
                showLeadModal(lead);
            } catch {
                toast.error('Erro ao finalizar atendimento.');
                btn.disabled = false;
                btn.textContent = '<i class="fa-solid check"></i> Finalizar Atendimento';
            }
        }

        if (action === 'novo_atendimento') {
            const ok = await confirm.warning('Iniciar Novo Atendimento', `Deseja iniciar um novo atendimento humano para ${lead.nome || lead.telefone}?`);
            if (!ok) return;
            btn.disabled = true;
            btn.textContent = '<i class="fa-solid hourglass"></i> Processando...';
            try {
                await dbService.update('leads', lead.id, {
                    statusAtendimento: 'em_atendimento_humano',
                    estado: 'atendimento_humano',
                    updatedAt: Timestamp.now()
                });
                lead.statusAtendimento = 'em_atendimento_humano';
                lead.estado = 'atendimento_humano';
                toast.success('Novo atendimento humano iniciado.');
                updateLeadInList(lead);
                showLeadModal(lead);
            } catch {
                toast.error('Erro ao iniciar atendimento.');
                btn.disabled = false;
                btn.textContent = '<i class="fa-solid refresh"></i> Iniciar Novo Atendimento';
            }
        }
    }

    function updateLeadInList(updatedLead: any) {
        const idx = leads.findIndex(l => l.id === updatedLead.id);
        if (idx >= 0) leads[idx] = { ...leads[idx], ...updatedLead };
        // Re-render current filter
        const tbody = document.getElementById('leads-tbody');
        if (tbody) tbody.innerHTML = renderTable(filterLeads(activeFilter));
        attachViewListeners();
    }
};
