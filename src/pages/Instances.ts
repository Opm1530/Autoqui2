import { dbService } from '../services/db';
import { authService } from '../services/auth';
import { toast } from '../services/toast';
import { evolutionApi } from '../services/evolutionApi';
import { confirm } from '../services/confirm';

interface Instance {
    id: string;
    empresaId: string;
    lojaId?: string;
    nome: string;
    numero?: string;
    status: 'aguardando_qrcode' | 'conectado' | 'desconectado';
    funcao?: string;
    webhookUrl?: string;
    upsert: boolean;
    createdAt: any;
}

export const Instances = async () => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser.companyId) {
        return `<p>Acesso negado.</p>`;
    }

    const companyDoc = await dbService.get('companies', currentUser.companyId);
    const company = companyDoc as any;
    const limit = company.limite_instancias || 1;

    let instances = await dbService.getAll('instancias', { field: 'empresaId', operator: '==', value: currentUser.companyId }) as Instance[];

    const renderRows = () => {
        if (instances.length === 0) {
            return `<tr><td colspan="7" style="text-align:center">Nenhuma instância criada.</td></tr>`;
        }
        return instances.map((inst: Instance) => `
            <tr>
                <td>${inst.nome}</td>
                <td>${inst.numero ? inst.numero.split('@')[0] : '-'}</td>
                <td>
                    <span class="badge ${getStatusBadge(inst.status)}">
                        ${getStatusLabel(inst.status)}
                    </span>
                </td>
                <td><span class="badge info">${company.stores?.find((s: any) => s.id === inst.lojaId)?.name || 'Global'}</span></td>
                <td><span class="badge secondary">${inst.funcao || 'Nenhuma'}</span></td>
                <td>${inst.createdAt?.toDate ? inst.createdAt.toDate().toLocaleDateString() : 'N/A'}</td>
                <td>
                    <div class="actions">
                        ${inst.status === 'aguardando_qrcode' || inst.status === 'desconectado' ?
                `<button class="action-btn" onclick="window.connectInstance('${inst.nome}')" title="Conectar"><i style="color: #FFF;" class="fa-solid fa-qrcode"></i></button>` :
                ''
            }
                        <button class="action-btn" onclick="window.deleteInstance('${inst.id}', '${inst.nome}')" title="Excluir"><i style="color: #FFF;" class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'conectado': return 'success';
            case 'aguardando_qrcode': return 'warning';
            case 'desconectado': return 'danger';
            default: return 'secondary';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'conectado': return 'Conectado';
            case 'aguardando_qrcode': return 'Aguardando QR Code';
            case 'desconectado': return 'Desconectado';
            default: return status;
        }
    };

    const modalHtml = `
        <div id="new-instance-modal" class="modal hidden">
            <div class="modal-content glass">
                <span class="close-modal" id="close-new-modal">&times;</span>
                <h2>Nova Instância</h2>
                <form id="create-instance-form">
                    <div class="form-group">
                        <label>Identificador da Instância (Uso Interno)</label>
                        <input type="text" id="instance-name" required placeholder="Ex: Matriz 01, Vendas Norte...">
                    </div>
                    <button type="submit" class="btn-primary full-width" style="margin-top: 1rem;">Criar e Gerar QR Code</button>
                </form>
            </div>
        </div>

        <div id="qrcode-modal" class="modal hidden">
            <div class="modal-content glass" style="text-align: center;">
                <span class="close-modal" id="close-qr-modal">&times;</span>
                <h2>Conectar WhatsApp</h2>
                <p>Escaneie o QR Code abaixo com o seu WhatsApp.</p>
                <div id="qrcode-container" style="margin: 20px auto; width: 250px; height: 250px; background: #eee; display: flex; align-items: center; justify-content: center;">
                    <i class="fa-solid fa-spinner fa-spin fa-2x"></i>
                </div>
                <button id="btn-done-qrcode" class="btn-primary full-width">Concluir</button>
            </div>
        </div>
    `;

    const refreshTable = () => {
        const tbody = document.querySelector('.data-table tbody');
        if (tbody) {
            tbody.innerHTML = renderRows();
        }
    };

    // Global Functions
    (window as any).refreshApp = () => {
        // Trigger a re-render or navigation to same page to update full state if needed
        // For now just reloading table
        window.location.reload();
    };

    (window as any).deleteInstance = async (id: string, name: string) => {
        const confirmed = await confirm.danger(
            'Excluir Instância',
            `Tem certeza que deseja excluir a instância "${name}"? Isso irá desconectar o WhatsApp.`
        );

        if (confirmed) {
            try {
                // Delete from Evolution API
                await evolutionApi.deleteInstance(name);

                // Delete from DB
                await dbService.delete('instancias', id);

                instances = instances.filter(i => i.id !== id);
                refreshTable();
                toast.success('Instância excluída com sucesso.');
            } catch (error) {
                toast.error('Erro ao excluir instância: ' + error);
            }
        }
    };

    (window as any).connectInstance = async (instanceName: string) => {
        const qrModal = document.getElementById('qrcode-modal');
        const qrContainer = document.getElementById('qrcode-container');
        if (qrModal && qrContainer) {
            qrModal.classList.remove('hidden');
            qrContainer.innerHTML = '<i class="fa-solid fa-spinner fa-spin fa-2x"></i>';

            try {
                const result = await evolutionApi.getQRCode(instanceName);
                if (result && result.base64) {
                    qrContainer.innerHTML = `<img src="${result.base64}" style="width: 100%; height: 100%; object-fit: contain;">`;
                } else {
                    // Maybe already connected?
                    const status = await evolutionApi.getInstanceStatus(instanceName);
                    if (status.connected) {
                        toast.success('Instância já está conectada!');
                        qrModal.classList.add('hidden');
                        // update status in db
                        const inst = instances.find(i => i.nome === instanceName);
                        if (inst) {
                            await dbService.update('instancias', inst.id, { status: 'conectado' });
                            inst.status = 'conectado';
                            refreshTable();
                        }
                        return;
                    }
                    qrContainer.innerHTML = '<p>Não foi possível obter o QR Code. Tente novamente.</p>';
                }
            } catch (e) {
                qrContainer.innerHTML = '<p>Erro ao carregar QR Code.</p>';
            }
        }
    };

    setTimeout(() => {
        setupListeners(company.id, limit);
    }, 100);

    return `
        <div class="page-header">
            <h2 class="page-title">Gerenciar Instâncias</h2>
            <button id="btn-new-instance" class="btn-primary" ${instances.length >= limit ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                <i class="fa-solid fa-plus"></i> Nova Instância
            </button>
        </div>
        
        <div class="card">
            <div class="stats-row" style="margin-bottom: 20px; display: flex; gap: 20px;">
                <div class="stat-item">
                    <strong>Limite:</strong> ${limit}
                </div>
                <div class="stat-item">
                    <strong>Utilizadas:</strong> ${instances.length}
                </div>
            </div>

            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Identificador</th>
                            <th>Número</th>
                            <th>Status</th>
                            <th>Loja</th>
                            <th>Função</th>
                            <th>Criado Em</th>
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

    function setupListeners(companyId: string, limitCount: number) {
        const btnNew = document.getElementById('btn-new-instance');
        const newModal = document.getElementById('new-instance-modal');
        const closeNew = document.getElementById('close-new-modal');
        const formNew = document.getElementById('create-instance-form');

        const qrModal = document.getElementById('qrcode-modal');
        const closeQr = document.getElementById('close-qr-modal');
        const btnDoneQr = document.getElementById('btn-done-qrcode');

        if (btnNew) {
            btnNew.onclick = () => {
                if (instances.length >= limitCount) {
                    toast.error('Limite de instâncias atingido.');
                    return;
                }
                newModal?.classList.remove('hidden');
            };
        }

        if (closeNew && newModal) {
            closeNew.onclick = () => newModal.classList.add('hidden');
        }

        if (formNew) {
            formNew.onsubmit = async (e) => {
                e.preventDefault();
                const nameInput = document.getElementById('instance-name') as HTMLInputElement;
                let name = nameInput.value.trim();

                // Sanitizing name for Evolution API
                name = name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
                const uniqueName = `${name}_${companyId.substring(0, 5)}`;

                try {

                    // Check if exists
                    const exists = await evolutionApi.instanceExists(uniqueName);
                    if (exists) {
                        toast.warning('Já existe uma instância com esse nome. Tente outro.');
                        return;
                    }

                    toast.info('Criando instância, aguarde...');

                    // Create in Evolution API
                    await evolutionApi.createInstance(uniqueName);



                    // Create in DB - Created "naked", assignment happens in Configuration page
                    const newInstance = {
                        empresaId: companyId,
                        lojaId: null,
                        nome: uniqueName,
                        numero: null,
                        status: 'aguardando_qrcode' as const,
                        funcao: null,
                        webhookUrl: null,
                        upsert: false
                    };

                    const id = await dbService.create('instancias', newInstance);
                    instances.push({ id, ...newInstance, createdAt: { toDate: () => new Date() } } as any);

                    toast.success('Instância criada! Agora vincule-a a uma loja nas configurações.');

                    newModal?.classList.add('hidden');
                    refreshTable();

                    // Open QR Code
                    (window as any).connectInstance(uniqueName);

                } catch (error) {
                    toast.error('Erro ao criar instância: ' + error);
                }
            };
        }

        if (closeQr && qrModal) closeQr.onclick = () => qrModal.classList.add('hidden');

        if (btnDoneQr && qrModal) {
            btnDoneQr.onclick = async () => {
                qrModal.classList.add('hidden');
                // Check status and update DB
                // Ideally this should be automatic, but "Done" button is a manual trigger
                window.location.reload();
            };
        }
    }
};
