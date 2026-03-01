import { dbService } from '../services/db';
import { toast } from '../services/toast';

export const AdminUsers = async () => {
    let users = await dbService.getAll('users');

    const renderRows = () => {
        if (users.length === 0) {
            return `<tr><td colspan="5" style="text-align:center">Nenhum usuário cadastrado.</td></tr>`;
        }
        return users.map((u: any) => `
            <tr data-user-id="${u.id}">
                <td>${u.name || '-'}</td>
                <td>${u.email}</td>
                <td><span class="badge info">${u.role}</span></td>
                <td><span class="badge ${u.companyId ? 'warning' : 'success'}">${u.companyId ? 'Vinculado' : 'Global'}</span></td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editAdminUser('${u.id}')" title="Editar"><i style="color: #fff" class="fa-solid fa-pen-to-square"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    };

    const modalHtml = `
        <div id="admin-user-modal" class="modal hidden">
            <div class="modal-content glass">
                <span class="close-modal">&times;</span>
                <h2>Editar Usuário</h2>
                <form id="edit-user-form">
                    <input type="hidden" id="user-uid">
                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" id="user-name" required>
                    </div>
                    <div class="form-group">
                        <label>Email (Apenas Leitura)</label>
                        <input type="email" id="user-email" disabled>
                    </div>
                    <button type="submit" class="btn-primary full-width">Salvar Alterações</button>
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

    // Expose edit function
    (window as any).editAdminUser = (uid: string) => {
        const user = users.find((u: any) => u.id === uid || u.uid === uid) as any;
        if (user) {
            (document.getElementById('user-uid') as HTMLInputElement).value = user.id;
            (document.getElementById('user-name') as HTMLInputElement).value = user.name || '';
            (document.getElementById('user-email') as HTMLInputElement).value = user.email || '';

            document.getElementById('admin-user-modal')!.classList.remove('hidden');
        }
    };

    setTimeout(() => {
        setupAdminUserListeners();
    }, 100);

    return `
        <div class="page-header">
            <h2 class="page-title">Usuários da Plataforma</h2>
        </div>

        <div class="card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Função</th>
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

    function setupAdminUserListeners() {
        const modal = document.getElementById('admin-user-modal');
        const span = document.querySelector('.close-modal');
        const form = document.getElementById('edit-user-form');

        if (span && modal) {
            (span as HTMLElement).onclick = () => modal.classList.add('hidden');
        }

        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();
                const uid = (document.getElementById('user-uid') as HTMLInputElement).value;
                const name = (document.getElementById('user-name') as HTMLInputElement).value;

                try {
                    await dbService.update('users', uid, { name });

                    // Update local data
                    const user = users.find((u: any) => u.id === uid) as any;
                    if (user) user.name = name;

                    // Refresh table
                    refreshTable();

                    toast.success('Usuário atualizado com sucesso!');
                    if (modal) modal.classList.add('hidden');
                } catch (error) {
                    console.error(error);
                    toast.error('Erro ao atualizar: ' + error);
                }
            };
        }
    }
};
