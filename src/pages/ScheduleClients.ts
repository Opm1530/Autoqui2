import { dbService } from '../services/db';
import { authService } from '../services/auth';
import { toast } from '../services/toast';
import { confirm } from '../services/confirm';

interface Cliente {
    id: string;
    companyId: string;
    nome: string;
    telefone: string;
    email?: string;
    observacoes?: string;
    criadoEm: string;
}

const formatDate = (str: string) => {
    if (!str) return '—';
    try {
        return new Date(str).toLocaleDateString('pt-BR');
    } catch {
        return str;
    }
};

export const ScheduleClients = async () => {
    const currentUser = authService.getCurrentUser() as any;
    if (!currentUser || !currentUser.companyId) {
        return `<p>Usuário sem empresa.</p>`;
    }

    const companyId = currentUser.companyId;

    // Verificar módulo
    const companyDoc = await dbService.get('companies', companyId) as any;
    const modulos = companyDoc?.modulos_ativos || [];
    if (!modulos.includes('agendamento')) {
        return `
            <div class="card" style="text-align:center; padding: 3rem;">
                <i class="fa-solid fa-users-slash" style="font-size:3rem; color: var(--text-dim); margin-bottom:1rem; display:block;"></i>
                <h2>Módulo de Agendamento</h2>
                <p style="color:var(--text-muted);">O módulo de IA Agendamento não está ativo para esta conta.<br>Entre em contato com o administrador para ativá-lo.</p>
            </div>`;
    }

    // Carregar clientes e agendamentos
    let clientes: Cliente[] = await dbService.getAll('clientes', { field: 'companyId', operator: '==', value: companyId }) as Cliente[];
    const agendamentos: any[] = await dbService.getAll('agendamentos', { field: 'companyId', operator: '==', value: companyId }) as any[];

    // Cruzar dados: contar agendamentos por clienteId
    const agendamentosPorCliente = new Map<string, { count: number; ultimo: string }>();
    agendamentos.forEach((a: any) => {
        const cid = a.clienteId;
        if (!cid) return;
        const existing = agendamentosPorCliente.get(cid);
        const data = a.date || '';
        if (!existing) {
            agendamentosPorCliente.set(cid, { count: 1, ultimo: data });
        } else {
            agendamentosPorCliente.set(cid, {
                count: existing.count + 1,
                ultimo: data > existing.ultimo ? data : existing.ultimo,
            });
        }
    });

    let search = '';

    // ── Render tabela ─────────────────────────────────────────────────────────
    const renderTable = (list: Cliente[]) => {
        if (list.length === 0) {
            return `
            <tr>
                <td colspan="5" style="text-align:center;padding:2.5rem;color:var(--text-muted);">
                    <i class="fa-solid fa-users-slash" style="font-size:2rem;display:block;margin-bottom:0.75rem;opacity:0.4;"></i>
                    Nenhum cliente encontrado.
                </td>
            </tr>`;
        }
        return list.map((c: Cliente) => {
            const stats = agendamentosPorCliente.get(c.id);
            const totalSched = stats?.count ?? 0;
            const ultimoSched = stats?.ultimo ? formatDate(stats.ultimo) : '—';
            const inicial = (c.nome || c.telefone || 'C')[0].toUpperCase();
            return `
            <tr data-client-id="${c.id}">
                <td>
                    <div style="display:flex;align-items:center;gap:0.75rem;">
                        <div class="sc-avatar">${inicial}</div>
                        <div>
                            <div style="font-weight:600;">${c.nome || 'Sem nome'}</div>
                            <div style="font-size:0.78rem;color:var(--text-muted);">${c.email || ''}</div>
                        </div>
                    </div>
                </td>
                <td style="color:var(--text-muted);font-size:0.9rem;">${c.telefone || '—'}</td>
                <td style="text-align:center;">
                    <span class="sc-badge">${totalSched}</span>
                </td>
                <td style="color:var(--text-muted);font-size:0.85rem;">${ultimoSched}</td>
                <td>
                    <div style="display:flex;gap:8px;">
                        <button class="sc-action-btn edit" title="Editar" data-edit-id="${c.id}">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="sc-action-btn del" title="Excluir" data-del-id="${c.id}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }).join('');
    };

    const getFiltered = () => {
        if (!search) return clientes;
        const q = search.toLowerCase();
        return clientes.filter(c =>
            (c.nome || '').toLowerCase().includes(q) ||
            (c.telefone || '').toLowerCase().includes(q) ||
            (c.email || '').toLowerCase().includes(q)
        );
    };

    // ── Modal HTML ─────────────────────────────────────────────────────────────
    const modalHtml = `
    <div id="sc-modal" class="modal hidden">
        <div class="modal-content glass" style="max-width:520px;width:95%;">
            <span class="close-modal" id="sc-modal-close">&times;</span>
            <h2 id="sc-modal-title" style="margin-bottom:0.25rem;">Novo Cliente</h2>
            <p class="text-muted" style="font-size:0.9rem;margin-bottom:1.5rem;">Preencha os dados do cliente.</p>
            <div style="display:grid;gap:1rem;">
                <div class="form-group">
                    <label class="form-label">Nome <span style="color:#ef4444;">*</span></label>
                    <input type="text" id="sc-nome" class="form-input" placeholder="Nome completo do cliente">
                </div>
                <div class="form-group">
                    <label class="form-label">Telefone / WhatsApp <span style="color:#ef4444;">*</span></label>
                    <input type="tel" id="sc-telefone" class="form-input" placeholder="Ex: 11999999999">
                </div>
                <div class="form-group">
                    <label class="form-label">E-mail</label>
                    <input type="email" id="sc-email" class="form-input" placeholder="cliente@email.com">
                </div>
                <div class="form-group">
                    <label class="form-label">Observações</label>
                    <textarea id="sc-obs" class="form-input" rows="3" style="resize:vertical;" placeholder="Informações extras sobre o cliente..."></textarea>
                </div>
            </div>
            <div style="display:flex;justify-content:flex-end;gap:0.75rem;margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--border-color);">
                <button class="btn-secondary" id="sc-modal-cancel">Cancelar</button>
                <button class="btn-primary" id="sc-save-btn" style="min-width:140px;">
                    <i class="fa-solid fa-save"></i> Salvar
                </button>
            </div>
        </div>
    </div>`;

    // ── Setup listeners (deferred) ─────────────────────────────────────────────
    setTimeout(() => setupListeners(), 100);

    function openModal(cliente?: Cliente) {
        const modal = document.getElementById('sc-modal');
        if (!modal) return;
        const titleEl = document.getElementById('sc-modal-title')!;
        const nomeEl = document.getElementById('sc-nome') as HTMLInputElement;
        const telEl = document.getElementById('sc-telefone') as HTMLInputElement;
        const emailEl = document.getElementById('sc-email') as HTMLInputElement;
        const obsEl = document.getElementById('sc-obs') as HTMLTextAreaElement;
        const saveBtn = document.getElementById('sc-save-btn')!;

        if (cliente) {
            titleEl.textContent = 'Editar Cliente';
            nomeEl.value = cliente.nome || '';
            telEl.value = cliente.telefone || '';
            emailEl.value = cliente.email || '';
            obsEl.value = cliente.observacoes || '';
            saveBtn.setAttribute('data-edit-id', cliente.id);
        } else {
            titleEl.textContent = 'Novo Cliente';
            nomeEl.value = '';
            telEl.value = '';
            emailEl.value = '';
            obsEl.value = '';
            saveBtn.removeAttribute('data-edit-id');
        }

        modal.classList.remove('hidden');
        nomeEl.focus();
    }

    function closeModal() {
        document.getElementById('sc-modal')?.classList.add('hidden');
    }

    const refreshTable = () => {
        const tbody = document.getElementById('sc-tbody');
        if (tbody) tbody.innerHTML = renderTable(getFiltered());
        attachRowListeners();
    };

    function attachRowListeners() {
        // Edit
        document.querySelectorAll('.sc-action-btn.edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = (btn as HTMLElement).dataset.editId!;
                const c = clientes.find(cl => cl.id === id);
                if (c) openModal(c);
            });
        });

        // Delete
        document.querySelectorAll('.sc-action-btn.del').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = (btn as HTMLElement).dataset.delId!;
                const c = clientes.find(cl => cl.id === id);
                const ok = await confirm.danger('Excluir Cliente', `Deseja excluir o cliente "${c?.nome || id}"? Esta ação não pode ser desfeita.`);
                if (!ok) return;
                try {
                    await dbService.delete('clientes', id);
                    clientes = clientes.filter(cl => cl.id !== id);
                    refreshTable();
                    toast.success('Cliente excluído.');
                } catch {
                    toast.error('Erro ao excluir cliente.');
                }
            });
        });
    }

    function setupListeners() {
        // Botão Novo Cliente
        document.getElementById('btn-new-client')?.addEventListener('click', () => openModal());

        // Fechar modal
        document.getElementById('sc-modal-close')?.addEventListener('click', closeModal);
        document.getElementById('sc-modal-cancel')?.addEventListener('click', closeModal);
        document.getElementById('sc-modal')?.addEventListener('click', (e) => {
            if (e.target === document.getElementById('sc-modal')) closeModal();
        });

        // Busca
        document.getElementById('sc-search')?.addEventListener('input', (e) => {
            search = (e.target as HTMLInputElement).value;
            refreshTable();
        });

        // Salvar
        document.getElementById('sc-save-btn')?.addEventListener('click', async () => {
            const nomeEl = document.getElementById('sc-nome') as HTMLInputElement;
            const telEl = document.getElementById('sc-telefone') as HTMLInputElement;
            const emailEl = document.getElementById('sc-email') as HTMLInputElement;
            const obsEl = document.getElementById('sc-obs') as HTMLTextAreaElement;
            const saveBtn = document.getElementById('sc-save-btn') as HTMLButtonElement;

            const nome = nomeEl.value.trim();
            const telefone = telEl.value.trim().replace(/\D/g, '');

            if (!nome) { toast.warning('Informe o nome do cliente.'); return; }
            if (!telefone) { toast.warning('Informe o telefone do cliente.'); return; }

            const data = {
                companyId,
                nome,
                telefone,
                email: emailEl.value.trim() || '',
                observacoes: obsEl.value.trim() || '',
                criadoEm: new Date().toISOString(),
            };

            const editId = saveBtn.getAttribute('data-edit-id');

            saveBtn.disabled = true;
            saveBtn.innerHTML = '<div class="spinner-small"></div> Salvando...';

            try {
                if (editId) {
                    await dbService.update('clientes', editId, data);
                    const idx = clientes.findIndex(c => c.id === editId);
                    if (idx !== -1) clientes[idx] = { id: editId, ...data };
                    toast.success('Cliente atualizado!');
                } else {
                    const newId = await dbService.create('clientes', data) as string;
                    clientes.push({ id: newId, ...data });
                    toast.success('Cliente criado com sucesso!');
                }
                closeModal();
                refreshTable();
            } catch (err) {
                toast.error('Erro ao salvar cliente: ' + err);
            } finally {
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<i class="fa-solid fa-save"></i> Salvar';
            }
        });

        // Render inicial
        refreshTable();
    }

    return `
    <style>
        .sc-avatar {
            width: 38px; height: 38px; border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), #8b5cf6);
            color: #fff; font-weight: 800; font-size: 1rem;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
        }
        .sc-badge {
            display: inline-flex; align-items: center; justify-content: center;
            background: rgba(99,102,241,0.12); color: #6366f1;
            border: 1px solid rgba(99,102,241,0.25);
            border-radius: 20px; padding: 2px 10px;
            font-size: 0.8rem; font-weight: 700;
        }
        .sc-action-btn {
            width: 32px; height: 32px; border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            font-size: 0.85rem; transition: all 0.2s;
            border: 1px solid var(--border-color);
            background: var(--surface-hover);
            color: var(--text-muted);
            cursor: pointer;
        }
        .sc-action-btn.edit:hover { background:#f59e0b22; color:#f59e0b; border-color:#f59e0b; }
        .sc-action-btn.del:hover  { background:#ef444422; color:#ef4444; border-color:#ef4444; }
        .sc-search-wrap {
            position: relative; flex: 1; min-width: 200px; max-width: 360px;
        }
        .sc-search-wrap i {
            position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
            color: var(--text-dim); font-size: 0.85rem;
        }
        .sc-search-input {
            width: 100%; padding: 8px 12px 8px 36px;
            background: var(--surface-hover); border: 1px solid var(--border-color);
            border-radius: 10px; color: var(--text-main); font-size: 0.9rem;
        }
        .sc-search-input:focus { outline: none; border-color: var(--primary); }
        .spinner-small { width:18px; height:18px; border:2px solid rgba(255,255,255,0.3); border-top-color:white; border-radius:50%; animation:spin 0.8s linear infinite; display:inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>

    <div class="page-header" style="justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
        <div>
            <h2 class="page-title" style="margin-bottom:4px;">
                <i class="fa-solid fa-users" style="color:var(--primary);margin-right:10px;"></i>Clientes
            </h2>
            <p style="color:var(--text-muted);font-size:0.9rem;">Gerencie os clientes cadastrados para agendamento.</p>
        </div>
        <button id="btn-new-client" class="btn-primary">
            <i class="fa-solid fa-user-plus"></i> Novo Cliente
        </button>
    </div>

    <div class="card" style="padding:1.5rem;">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.25rem;flex-wrap:wrap;">
            <div class="sc-search-wrap">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="sc-search" class="sc-search-input" placeholder="Buscar por nome, telefone ou e-mail...">
            </div>
            <span id="sc-count" style="color:var(--text-dim);font-size:0.85rem;margin-left:auto;">
                ${clientes.length} cliente${clientes.length !== 1 ? 's' : ''}
            </span>
        </div>

        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Telefone</th>
                        <th style="text-align:center;">Agendamentos</th>
                        <th>Último Agend.</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="sc-tbody">
                    <!-- preenchido via JS -->
                </tbody>
            </table>
        </div>
    </div>

    ${modalHtml}`;
};
