import { dbService } from '../services/db';
import { authService } from '../services/auth';
import { toast } from '../services/toast';
import { confirm } from '../services/confirm';

export const Stores = async () => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser.companyId) {
        return `<p>Erro: Usuário sem empresa associada.</p>`;
    }

    const companyDoc = await dbService.get('companies', currentUser.companyId);
    const company = companyDoc as any;
    let stores = company?.stores || [];
    const isOwner = currentUser.role === 'owner';

    const renderRows = () => {
        if (stores.length === 0) {
            return `<tr><td colspan="5" style="text-align:center">Nenhuma loja cadastrada.</td></tr>`;
        }
        return stores.map((s: any) => {
            const isStoreOperable = s.active && s.instancia_id;
            const freteAtivo = s.frete_ativo !== false; // true defaults to active
            return `
            <tr data-store-id="${s.id}">
                <td>${s.name}</td>
                <td>${s.address}</td>
                <td><span class="badge ${isStoreOperable ? 'success' : 'danger'}">${isStoreOperable ? 'Operante' : (s.active ? 'Sem Instância' : 'Inativa')}</span></td>
                <td><span class="badge ${freteAtivo ? 'success' : 'warning'}">${freteAtivo ? 'Frete Ativo' : 'N/A: Retirada Apenas'}</span></td>
                <td>
                    <div class="actions">
                        ${isOwner ? `
                            <button class="action-btn" onclick="window.toggleStoreStatus('${s.id}', ${s.active})" title="${s.active ? 'Desativar Loja' : 'Ativar Loja'}">
                                ${s.active ? '<i style="color: #FFF;" class="fa-solid fa-store-slash"></i>' : '<i style="color: #FFF;" class="fa-solid fa-store"></i>'}
                            </button>
                            <button class="action-btn" onclick="window.toggleStoreFrete('${s.id}', ${freteAtivo})" title="${freteAtivo ? 'Desativar Frete' : 'Ativar Frete'}">
                                ${freteAtivo ? '<i style="color: #FFF;" class="fa-solid fa-truck-ramp-box"></i>' : '<i style="color: #FFF;" class="fa-solid fa-truck"></i>'}
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `}).join('');
    };

    const refreshTable = () => {
        const tbody = document.querySelector('.data-table tbody');
        if (tbody) {
            tbody.innerHTML = renderRows();
        }
    };

    (window as any).toggleStoreFrete = async (storeId: string, currentFreteState: boolean) => {
        try {
            const newFreteState = !currentFreteState;
            const updatedStores = stores.map((s: any) =>
                s.id === storeId ? { ...s, frete_ativo: newFreteState } : s
            );
            await dbService.update('companies', currentUser.companyId!, { stores: updatedStores });
            stores = updatedStores;
            refreshTable();
            toast.success(`Frete da loja atualizado para ${newFreteState ? 'ativo' : 'inativo'}.`);
        } catch (error) {
            toast.error('Erro ao atualizar frete: ' + error);
        }
    };

    (window as any).toggleStoreStatus = async (storeId: string, currentStatus: boolean) => {
        const action = currentStatus ? 'desativar' : 'ativar';

        const confirmed = await confirm.warning(
            `${action.charAt(0).toUpperCase() + action.slice(1)} Loja`,
            `Deseja ${action} esta loja?`
        );

        if (confirmed) {
            try {
                const updatedStores = stores.map((s: any) =>
                    s.id === storeId ? { ...s, active: !currentStatus } : s
                );

                await dbService.update('companies', currentUser.companyId!, { stores: updatedStores });

                // Update local data
                stores = updatedStores;

                refreshTable();
                toast.success(`Loja ${currentStatus ? 'desativada' : 'ativada'} com sucesso!`);
            } catch (error) {
                toast.error('Erro ao atualizar status: ' + error);
            }
        }
    };

    return `
        <div class="page-header">
            <h2 class="page-title">Minhas Lojas</h2>
        </div>

        <div class="card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome da Loja</th>
                            <th>Endereço</th>
                            <th>Status Operacional</th>
                            <th>Status Frete</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderRows()}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="card" style="margin-top: 1.5rem;">
            <h3 style="margin-bottom: 0.5rem;"><i class="fa-solid fa-info-circle"></i> Informação</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem;">
                Apenas o administrador da plataforma pode criar, editar ou excluir lojas.<br>
                Como dono da empresa, você pode apenas ativar ou desativar lojas existentes.
            </p>
        </div>
    `;
};
