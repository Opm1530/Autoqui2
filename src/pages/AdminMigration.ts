import { dbService } from '../services/db';
import { authService } from '../services/auth';
import { toast } from '../services/toast';
import { confirm } from '../services/confirm';

export const AdminMigration = async () => {
    const currentUser = authService.getCurrentUser();
    const isAdmin = (currentUser?.role?.toLowerCase() === 'admin') || (currentUser?.email === 'ginannymoreira@gmail.com');
    if (!currentUser || !isAdmin) {
        return `<p>Acesso negado.</p>`;
    }

    const allCompanies = await dbService.getAll('companies') as any[];

    const getAllStores = () => {
        return allCompanies.flatMap(c => (c.stores || []).map((s: any) => ({
            ...s,
            companyName: c.name,
            companyId: c.id
        })));
    };

    const allStores = getAllStores();

    const renderStoreOptions = () => {
        return allStores.map(s => `<option value="${s.id}" data-company-id="${s.companyId}">${s.name} (${s.companyName})</option>`).join('');
    };

    (window as any).performMigration = async () => {
        const sourceSelect = document.getElementById('migration-source-store') as HTMLSelectElement;
        const targetSelect = document.getElementById('migration-target-store') as HTMLSelectElement;

        const sourceStoreId = sourceSelect.value;
        const sourceCompanyId = sourceSelect.selectedOptions[0]?.dataset.companyId;

        const targetStoreId = targetSelect.value;
        const targetCompanyId = targetSelect.selectedOptions[0]?.dataset.companyId;

        if (!sourceStoreId || !targetStoreId) {
            toast.warning('Selecione as lojas de origem e destino.');
            return;
        }

        if (sourceStoreId === targetStoreId) {
            toast.warning('A loja de origem e destino não podem ser a mesma.');
            return;
        }

        const ok = await confirm.warning('Confirmar Migração', 'Isso irá duplicar todos os produtos da loja de origem para a loja de destino. Continuar?');
        if (!ok) return;

        const btn = document.getElementById('btn-run-migration') as HTMLButtonElement;
        btn.disabled = true;
        btn.innerHTML = '<div class="spinner-small"></div> Migrando...';

        try {
            // Fetch products from source
            const sourceProducts = await dbService.getAll('products', { field: 'companyId', operator: '==', value: sourceCompanyId }) as any[];
            const storeProducts = sourceProducts.filter(p =>
                (p.storeIds && p.storeIds.includes(sourceStoreId)) || (p.storeId === sourceStoreId)
            );

            if (storeProducts.length === 0) {
                toast.info('Nenhum produto encontrado na loja de origem.');
                btn.disabled = false;
                btn.innerText = 'Iniciar Migração';
                return;
            }

            let successCount = 0;
            for (const p of storeProducts) {
                const { id, ...cleanProduct } = p;
                cleanProduct.companyId = targetCompanyId;
                cleanProduct.storeIds = [targetStoreId];
                delete cleanProduct.lojaId;
                delete cleanProduct.createdAt; // Let dbService set a new one

                await dbService.create('products', cleanProduct);
                successCount++;
            }

            toast.success(`${successCount} produtos migrados com sucesso!`);
        } catch (error) {
            console.error(error);
            toast.error('Erro durante a migração: ' + error);
        } finally {
            btn.disabled = false;
            btn.innerText = 'Iniciar Migração';
        }
    };

    return `
        <div class="page-header">
            <h2 class="page-title">Migração Administrativa de Produtos</h2>
        </div>

        <div class="card glass">
            <div class="card-header">
                <h3><i class="fa-solid fa-clone"></i> Duplicar Catálogo</h3>
                <p class="text-muted">Use esta ferramenta para copiar todos os produtos de uma unidade para outra.</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
                <div class="form-group">
                    <label>Loja de ORIGEM (De onde virão os produtos)</label>
                    <select id="migration-source-store" class="config-select" style="width: 100%; padding: 12px; border-radius: 8px; background: rgba(0,0,0,0.2); color: white; border: 1px solid var(--border-color);">
                        <option value="">Selecione a origem...</option>
                        ${renderStoreOptions()}
                    </select>
                </div>

                <div class="form-group">
                    <label>Loja de DESTINO (Para onde serão copiados)</label>
                    <select id="migration-target-store" class="config-select" style="width: 100%; padding: 12px; border-radius: 8px; background: rgba(0,0,0,0.2); color: white; border: 1px solid var(--border-color);">
                        <option value="">Selecione o destino...</option>
                        ${renderStoreOptions()}
                    </select>
                </div>
            </div>

            <div style="margin-top: 30px; padding: 20px; border-radius: 12px; background: rgba(234, 179, 8, 0.05); border: 1px solid rgba(234, 179, 8, 0.2);">
                <p style="color: #eab308; font-size: 0.9rem; margin-bottom: 0;">
                    <i class="fa-solid fa-triangle-exclamation"></i> <strong>Atenção:</strong> Os produtos serão duplicados. Se você já migrou anteriormente, eles aparecerão repetidos no destino.
                </p>
            </div>

            <div style="margin-top: 25px; display: flex; justify-content: flex-end;">
                <button id="btn-run-migration" class="btn-primary" onclick="window.performMigration()" style="padding: 12px 30px;">
                    <i class="fa-solid fa-play"></i> Iniciar Migração
                </button>
            </div>
        </div>
    `;
};
