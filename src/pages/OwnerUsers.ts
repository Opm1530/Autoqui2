import { dbService } from '../services/db';
import { authService } from '../services/auth';
import { toast } from '../services/toast';
import { confirm } from '../services/confirm';
import { MultiSelect } from '../components/MultiSelect';

export const OwnerUsers = async () => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser.companyId) {
        return `<p>Erro: Usuário sem empresa associada.</p>`;
    }

    const companyDoc = await dbService.get('companies', currentUser.companyId);
    const company = companyDoc as any;
    const stores = company?.stores || [];
    let employeeStoreMS: MultiSelect | null = null;

    let users = await dbService.getAll('users', { field: 'companyId', operator: '==', value: currentUser.companyId });
    let team = users.filter((u: any) => u.role === 'employee');

    const getStoreNames = (storeIds?: string[] | string) => {
        let ids: string[] = [];
        if (!storeIds) return 'Todas';
        if (typeof storeIds === 'string') {
            ids = storeIds === '' ? [] : [storeIds];
        } else {
            ids = storeIds;
        }

        if (ids.length === 0) return 'Todas';

        const names = ids.map(id => {
            const store = stores.find((s: any) => s.id === id);
            return store ? store.name : id;
        });
        return names.join(', ');
    };

    const renderRows = () => {
        if (team.length === 0) {
            return `<tr><td colspan="6" style="text-align:center">Nenhum colaborador cadastrado.</td></tr>`;
        }
        return team.map((u: any) => `
            <tr data-user-id="${u.id}">
                <td>${u.name || 'Sem Nome'}</td>
                <td>${u.email}</td>
                <td><span class="badge primary">Atendente</span></td>
                <td>${getStoreNames(u.storeIds || u.storeId)}</td>
                <td><span class="badge ${u.active !== false ? 'success' : 'danger'}">${u.active !== false ? 'Ativo' : 'Inativo'}</span></td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editEmployee('${u.id}')" title="Editar"><i style="color: #fff;" class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn" onclick="window.toggleEmployeeStatus('${u.id}', ${u.active !== false})" title="${u.active !== false ? 'Desativar' : 'Ativar'}">${u.active !== false ? '<i style="color: #fff;" class="fa-solid fa-ban"></i>' : '<i style="color: #fff;" class="fa-solid fa-check"></i>'}</button>
                        <button class="action-btn" onclick="window.deleteEmployee('${u.id}')" title="Excluir"><i style="color: #fff;" class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    };

    // renderStoreCheckboxes removed - using MultiSelect

    const modalHtml = `
        <div id="employee-modal" class="modal hidden">
            <div class="modal-content glass">
                <span class="close-modal">&times;</span>
                <h2 id="modal-title">Novo Colaborador</h2>
                <form id="create-employee-form">
                    <input type="hidden" id="emp-uid">
                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" id="emp-name" required>
                    </div>
                    <div class="form-group">
                        <label>E-mail</label>
                        <input type="email" id="emp-email" required>
                    </div>
                    <div class="form-group" id="pwd-group">
                        <label>Senha</label>
                        <input type="password" id="emp-password" required>
                        <small style="color: #999; font-size: 0.8em; display: none;" id="pwd-hint">Deixe em branco para manter a senha atual.</small>
                    </div>
                    <div class="form-group">
                         <label>Lojas de Atuação</label>
                         <div id="employee-stores-select"></div>
                    </div>
                    <button type="submit" class="btn-primary full-width">Salvar</button>
                </form>
            </div>
        </div>
    `;

    const refreshTable = () => {
        const tbody = document.querySelector('.data-table tbody');
        if (tbody) {
            tbody.innerHTML = renderRows();
        }
    };

    // Global functions
    (window as any).editEmployee = (uid: string) => {
        // Using as any to bypass `{id: string}` strict return type checking
        const employee = team.find((e: any) => e.id === uid || (e as any).uid === uid) as any;
        if (employee) {
            (document.getElementById('emp-uid') as HTMLInputElement).value = employee.id;
            (document.getElementById('emp-name') as HTMLInputElement).value = employee.name;
            (document.getElementById('emp-email') as HTMLInputElement).value = employee.email;

            // Handle multiple stores if storeIds exists, fallback to single storeId
            if (employeeStoreMS) {
                const employeeStoreIds = employee.storeIds || (employee.storeId ? [employee.storeId] : []);
                employeeStoreMS.setValues(employeeStoreIds);
            }

            (document.getElementById('emp-password') as HTMLInputElement).required = false;
            document.getElementById('pwd-hint')!.style.display = 'block';
            (document.getElementById('emp-email') as HTMLInputElement).disabled = true;

            document.getElementById('modal-title')!.innerText = 'Editar Colaborador';
            document.getElementById('employee-modal')!.classList.remove('hidden');
        }
    };

    (window as any).toggleEmployeeStatus = async (uid: string, currentStatus: boolean) => {
        try {
            await dbService.update('users', uid, { active: !currentStatus });

            const employee = team.find((e: any) => e.id === uid) as any;
            if (employee) employee.active = !currentStatus;

            refreshTable();
            toast.success(`Colaborador ${!currentStatus ? 'ativado' : 'desativado'} com sucesso!`);
        } catch (error) {
            toast.error('Erro ao atualizar status: ' + error);
        }
    };

    (window as any).deleteEmployee = async (uid: string) => {
        const confirmed = await confirm.danger(
            'Excluir Colaborador',
            'Tem certeza que deseja EXCLUIR este colaborador? Esta ação não pode ser desfeita.'
        );

        if (confirmed) {
            try {
                await dbService.delete('users', uid);

                team = team.filter((u: any) => u.id !== uid);

                refreshTable();
                toast.success('Colaborador excluído com sucesso!');
            } catch (error) {
                toast.error('Erro ao excluir: ' + error);
            }
        }
    };

    setTimeout(() => {
        setupEmployeeListeners(currentUser.companyId!);
    }, 100);

    return `
        <style>
            .checkbox-group { display: flex; flex-direction: column; gap: 0.5rem; }
            .checkbox-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
            .checkbox-label input[type="checkbox"] { cursor: pointer; }
        </style>
        <div class="page-header">
            <h2 class="page-title">Minha Equipe</h2>
            <button id="btn-new-employee" class="btn-primary"><i style="color: #fff;" class="fa-solid fa-user-plus"></i> Novo Colaborador</button>
        </div>

        <div class="card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Cargo</th>
                            <th>Lojas</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderRows()}
                    </tbody>
                </table>
            </div>
        </div>
        ${modalHtml}
    `;

    function setupEmployeeListeners(companyId: string) {
        const modal = document.getElementById('employee-modal');
        const btn = document.getElementById('btn-new-employee');
        const span = document.querySelector('.close-modal');
        const form = document.getElementById('create-employee-form');

        const storeOptions = stores.map((s: any) => ({ value: s.id, label: s.name }));

        employeeStoreMS = new MultiSelect(
            'employee-stores-select',
            storeOptions,
            [],
            () => { },
            'Selecione as lojas...'
        );

        if (btn && modal) {
            btn.onclick = () => {
                (document.getElementById('emp-uid') as HTMLInputElement).value = '';
                (document.getElementById('create-employee-form') as HTMLFormElement).reset();
                (document.getElementById('emp-password') as HTMLInputElement).required = true;
                document.getElementById('pwd-hint')!.style.display = 'none';
                (document.getElementById('emp-email') as HTMLInputElement).disabled = false;
                document.getElementById('modal-title')!.innerText = 'Novo Colaborador';

                if (employeeStoreMS) {
                    employeeStoreMS.setValues([]);
                }

                modal.classList.remove('hidden');
            };
        }

        if (span && modal) {
            (span as HTMLElement).onclick = () => modal.classList.add('hidden');
        }

        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();
                const id = (document.getElementById('emp-uid') as HTMLInputElement).value;
                const name = (document.getElementById('emp-name') as HTMLInputElement).value;
                const email = (document.getElementById('emp-email') as HTMLInputElement).value;
                const password = (document.getElementById('emp-password') as HTMLInputElement).value;

                const storeIds = employeeStoreMS ? employeeStoreMS.getValues() : [];

                try {
                    if (id) {
                        const updates: any = { name, storeIds: storeIds.length > 0 ? storeIds : [] };
                        await dbService.update('users', id, updates);

                        const employee = team.find((u: any) => u.id === id);
                        if (employee) Object.assign(employee, updates);

                        toast.success('Colaborador atualizado com sucesso!');
                    } else {
                        const uid = await authService.registerUser(email, password);
                        const userData = {
                            uid,
                            name,
                            email,
                            role: 'employee',
                            companyId: companyId,
                            storeIds: storeIds.length > 0 ? storeIds : [],
                            active: true,
                            permissions: ['orders', 'products']
                        };

                        await dbService.set('users', uid, userData);
                        team.push({ id: uid, ...userData });

                        toast.success('Colaborador adicionado com sucesso!');
                    }

                    if (modal) modal.classList.add('hidden');
                    refreshTable();
                } catch (error) {
                    console.error(error);
                    toast.error('Erro: ' + error);
                }
            };
        }
    }
};
