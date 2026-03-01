import { dbService } from '../services/db';
import { authService } from '../services/auth';
import { toast } from '../services/toast';
import { confirm } from '../services/confirm';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

interface Product {
    id: string;
    name: string;
    price: number;
    active: boolean;
    storeIds: string[];
    companyId: string;
    imageUrl?: string;
    imagemPath?: string;
    downloadToken?: string;
}

const getProductImageUrl = (p: Product) => {
    if (p.imageUrl) return p.imageUrl;
    if (p.imagemPath && p.downloadToken) {
        return `https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(p.imagemPath)}?alt=media&token=${p.downloadToken}`;
    }
    return null;
};

export const Products = async () => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser.companyId) {
        return `<p>Usuário sem empresa.</p>`;
    }

    const companyDoc = await dbService.get('companies', currentUser.companyId);
    const company = companyDoc as any;
    const modulos = company?.modulos_ativos || [];
    const isProductsEnabled = modulos.includes('venda') || modulos.includes('agendamento');
    const isAgendamento = modulos.includes('agendamento');
    // Labels dinâmicos baseados no módulo
    const labelSingular = isAgendamento ? 'Serviço' : 'Produto';
    const labelPlural = isAgendamento ? 'Serviços' : 'Produtos';
    let stores = company?.stores || [];

    const isOwner = currentUser.role === 'owner';
    if (!isOwner) {
        stores = stores.filter((s: any) => s.id === (currentUser as any).storeId);
    }

    let activeStoreFilter = isOwner ? 'all' : ((currentUser as any).storeId || '');

    // Temporary storage for files during bulk creation
    let pendingFiles: Map<string, File> = new Map();
    let editModeProductId: string | null = null;

    if (!isProductsEnabled) {
        return `
            <div class="card">
                <h2>Módulo Desativado</h2>
                <p>Sua configuração atual não utiliza catálogo de produtos ou serviços.</p>
                <p>Contate o administrador para ativar o módulo correspondente.</p>
            </div>
        `;
    }

    let products = await dbService.getAll('products', { field: 'companyId', operator: '==', value: currentUser.companyId }) as Product[];

    const getStoreNames = (p: any) => {
        const ids = p.storeIds || (p.storeId ? [p.storeId] : []);
        if (ids.length === 0) return 'Sem Loja';
        return ids.map((id: string) => {
            const s = stores.find((st: any) => st.id === id);
            return s ? s.name : 'Desconhecida';
        }).join(', ');
    };

    const renderRows = () => {
        let filteredProducts = products;
        if (activeStoreFilter !== 'all') {
            filteredProducts = products.filter((p: any) =>
                (p.storeIds && p.storeIds.includes(activeStoreFilter)) ||
                (p.storeId === activeStoreFilter)
            );
        }

        if (filteredProducts.length === 0) {
            return `<tr><td colspan="5" style="text-align:center">Nenhum ${labelSingular.toLowerCase()} encontrado.</td></tr>`;
        }
        return filteredProducts.map((p: any) => `
            <tr data-product-id="${p.id}">
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        ${getProductImageUrl(p) ? `<img src="${getProductImageUrl(p)}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">` : '<div style="width: 40px; height: 40px; background: #333; border-radius: 4px; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-box"></i></div>'}
                        <span style="font-weight: 600;">${p.name}</span>
                    </div>
                </td>
                <td><div style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${getStoreNames(p)}">${getStoreNames(p)}</div></td>
                <td>R$ ${p.price?.toFixed(2)}</td>
                <td><span class="badge ${p.active ? 'success' : 'danger'}">${p.active ? 'Ativo' : 'Inativo'}</span></td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editProduct('${p.id}')" title="Editar"><i style="color: #FFF;" class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn" onclick="window.toggleProductStatus('${p.id}', ${p.active})" title="${p.active ? 'Desativar' : 'Ativar'}">${p.active ? '<i style="color: #FFF;" class="fa-solid fa-ban"></i>' : '<i style="color: #FFF;" class="fa-solid fa-check"></i>'}</button>
                        <button class="action-btn" onclick="window.deleteProduct('${p.id}')" title="Excluir"><i style="color: #FFF;" class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    };

    const modalHtml = `
        <div id="product-modal" class="modal hidden">
            <div class="modal-content glass big-modal" style="display: flex; flex-direction: column; max-height: 90vh;">
                <span class="close-modal" id="close-modal">&times;</span>
                <div style="padding: 0 20px 20px 0;">
                    <h2 id="modal-title" style="margin-bottom: 5px;">Gerenciar ${labelPlural}</h2>
                    <p class="text-muted" style="font-size: 0.9rem;">Adicione ou edite ${labelPlural.toLowerCase()} do seu catálogo.</p>
                </div>
                
                <div style="overflow-y: auto; padding-right: 10px; flex: 1;">
                    ${isOwner ? `
                    <div class="form-group" id="store-select-group">
                        <label>Lojas de Destino (selecione uma ou mais)</label>
                        <div id="multi-store-container" class="multi-select-grid">
                            ${stores.map((s: any) => `
                                <label class="store-checkbox-card">
                                    <input type="checkbox" name="store-ids" value="${s.id}">
                                    <span class="checkbox-label">${s.name}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}

                    <div id="bulk-upload-section" class="bulk-dropzone">
                        <input type="file" id="bulk-file-input" multiple accept="image/*" style="display: none;">
                        <div class="dropzone-content" onclick="document.getElementById('bulk-file-input').click()">
                            <div class="dropzone-icon">
                                <i class="fa-solid fa-cloud-arrow-up"></i>
                            </div>
                            <h3>Importação por Imagem</h3>
                            <p>Arraste fotos dos seus ${labelPlural.toLowerCase()} aqui ou <span>clique para navegar</span></p>
                            <small>Formatos: JPG, PNG, WebP (máx 5MB/foto)</small>
                        </div>
                    </div>

                    <form id="create-product-form">
                        <div id="products-list-container" style="display: flex; flex-direction: column; gap: 12px; margin-top: 20px;">
                            <!-- Items will be injected here -->
                        </div>

                        <div id="empty-list-msg" style="text-align: center; color: var(--text-dim); padding: 40px 20px; border: 1px dashed var(--border-color); border-radius: 12px; margin-top: 10px;">
                            <i class="fa-solid fa-box-open" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                            Nenhum ${labelSingular.toLowerCase()} na lista de envio.
                        </div>
                    </form>
                </div>

                <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                     <button type="button" id="btn-add-manual" class="btn-text" style="display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-plus-circle"></i> Item Manual
                     </button>
                     <div style="display: flex; gap: 12px;">
                        <button type="button" class="btn-secondary close-modal-btn">Cancelar</button>
                        <button type="button" id="btn-save-products-trigger" class="btn-primary" style="min-width: 160px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                            <i class="fa-solid fa-save"></i> <span>Salvar ${labelPlural}</span>
                        </button>
                     </div>
                </div>
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
    (window as any).editProduct = async (id: string) => {
        const product = products.find((p: Product) => p.id === id);
        if (product) {
            editModeProductId = id;
            pendingFiles.clear();

            // Setup Modal for Edit
            document.getElementById('modal-title')!.innerText = `Editar ${labelSingular}`;
            document.getElementById('bulk-upload-section')!.style.display = 'none'; // Hide bulk upload in edit

            // Set Stores
            if (isOwner) {
                const checkboxes = document.querySelectorAll('#multi-store-container input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
                checkboxes.forEach(cb => {
                    cb.checked = (product.storeIds || []).includes(cb.value);
                });
            }

            // Render existing product in the list format
            const listContainer = document.getElementById('products-list-container');
            const emptyMsg = document.getElementById('empty-list-msg');

            if (listContainer && emptyMsg) {
                listContainer.innerHTML = '';
                emptyMsg.style.display = 'none';

                const imgUrl = getProductImageUrl(product);
                const itemHtml = createProductItemHtml('edit-item', product.name, product.price, imgUrl);
                listContainer.innerHTML = itemHtml;

                // Add event listener for the file input of this item
                // We need to attach listeners after injecting HTML
                setTimeout(() => {
                    attachItemListeners('edit-item');
                }, 0);
            }

            document.getElementById('product-modal')!.classList.remove('hidden');
        }
    };

    (window as any).toggleProductStatus = async (id: string, currentStatus: boolean) => {
        try {
            await dbService.update('products', id, { active: !currentStatus });

            // Update local data
            const product = products.find((p: any) => p.id === id);
            if (product) product.active = !currentStatus;

            // Refresh table
            refreshTable();

            toast.success(`${labelSingular} ${!currentStatus ? 'ativado' : 'desativado'} com sucesso!`);
        } catch (error) {
            toast.error('Erro ao atualizar status: ' + error);
        }
    };

    (window as any).deleteProduct = async (id: string) => {
        const confirmed = await confirm.danger(
            `Excluir ${labelSingular}`,
            `Tem certeza que deseja EXCLUIR este ${labelSingular.toLowerCase()}? Esta ação não pode ser desfeita.`
        );

        if (confirmed) {
            try {
                // Get product to check for image URL
                const product = products.find((p: any) => p.id === id);
                if (product) {
                    const imgUrl = getProductImageUrl(product);
                    const imgPath = product.imagemPath;

                    if (imgUrl || imgPath) {
                        try {
                            // If we have path, use it directly, otherwise try to ref from URL
                            const imageRef = imgPath ? ref(storage, imgPath) : ref(storage, imgUrl!);
                            await deleteObject(imageRef);
                        } catch (storageErr) {
                            console.warn('Could not delete image from storage:', storageErr);
                        }
                    }
                }

                await dbService.delete('products', id);

                // Update local data
                products = products.filter((p: any) => p.id !== id);

                // Refresh table
                refreshTable();

                toast.success(`${labelSingular} e imagem excluídos com sucesso!`);
            } catch (error) {
                toast.error('Erro ao excluir: ' + error);
            }
        }
    };

    setTimeout(() => {
        setupProductListeners(currentUser.companyId!);
    }, 100);

    // Helpers
    const createProductItemHtml = (tempId: string, name: string = '', price: number | string = '', imageUrl: string | null = null) => {
        return `
            <div class="product-item-card" id="card-${tempId}">
                 <div class="item-visual">
                    <div class="image-preview-wrapper" id="preview-wrapper-${tempId}">
                        ${imageUrl
                ? `<img src="${imageUrl}" class="preview-img">`
                : `<div class="preview-placeholder"><i class="fa-solid fa-image"></i></div>`
            }
                        <div class="upload-progress-overlay hidden" id="progress-${tempId}">
                            <div class="spinner-small"></div>
                        </div>
                    </div>
                    ${(!imageUrl || tempId !== 'edit-item') ? `
                    <button type="button" class="btn-change-img" data-id="${tempId}">
                        <i class="fa-solid fa-camera"></i>
                    </button>
                    ` : ''}
                    <input type="file" id="file-${tempId}" accept="image/*" style="display: none;">
                 </div>
                 
                 <div class="item-details">
                    <div class="input-row">
                        <div class="field">
                            <label>Nome do ${labelSingular}</label>
                            <input type="text" name="name-${tempId}" value="${name}" class="item-name" placeholder="${isAgendamento ? 'Ex: Corte de Cabelo' : 'Ex: Tênis Esportivo Nitro'}" required>
                        </div>
                        <div class="field price-field">
                            <label>Preço (R$)</label>
                            <input type="number" name="price-${tempId}" value="${price}" class="item-price" placeholder="0,00" step="0.01" required>
                        </div>
                    </div>
                 </div>

                 <button type="button" class="btn-remove-item" onclick="window.removeProductItem('${tempId}')" title="Remover item">
                    <i class="fa-solid fa-times"></i>
                 </button>
            </div>
        `;
    };

    (window as any).handleItemFileChange = (tempId: string, input: HTMLInputElement) => {
        if (input.files && input.files[0]) {
            const file = input.files[0];
            pendingFiles.set(tempId, file);

            // Update preview
            const reader = new FileReader();
            reader.onload = (e) => {
                const wrapper = document.getElementById(`preview-wrapper-${tempId}`);
                if (wrapper) {
                    wrapper.innerHTML = `<img src="${e.target?.result as string}" class="preview-img">
                                         <div class="upload-progress-overlay hidden" id="progress-${tempId}"><div class="spinner-small"></div></div>`;
                }
            };
            reader.readAsDataURL(file);
        }
    };

    (window as any).removeProductItem = (tempId: string) => {
        const card = document.getElementById(`card-${tempId}`);
        if (card) card.remove();
        pendingFiles.delete(tempId);

        const list = document.getElementById('products-list-container');
        if (list && list.children.length === 0) {
            document.getElementById('empty-list-msg')!.style.display = 'block';
        }
    };

    const attachItemListeners = (tempId: string) => {
        const btnChange = document.querySelector(`#card-${tempId} .btn-change-img`);
        const fileInput = document.getElementById(`file-${tempId}`);
        if (btnChange && fileInput) {
            btnChange.addEventListener('click', () => {
                fileInput.click();
            });
        }
    }

    return `
        <style>
            .bulk-dropzone {
                margin-top: 10px;
                border: 2px dashed var(--border-color);
                border-radius: 12px;
                padding: 30px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s;
                background: rgba(255, 255, 255, 0.02);
            }
            .bulk-dropzone:hover, .bulk-dropzone.drag-active {
                border-color: var(--primary);
                background: rgba(99, 102, 241, 0.05);
            }
            .dropzone-icon {
                font-size: 2.5rem;
                color: var(--primary);
                margin-bottom: 12px;
                opacity: 0.8;
            }
            .dropzone-content h3 { margin-bottom: 4px; font-size: 1.1rem; }
            .dropzone-content p { color: var(--text-muted); font-size: 0.9rem; }
            .dropzone-content span { color: var(--primary); font-weight: 600; text-decoration: underline; }

            .product-item-card {
                display: flex;
                gap: 16px;
                background: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: 12px;
                padding: 16px;
                position: relative;
                transition: transform 0.2s, border-color 0.2s;
            }
            .product-item-card:hover { border-color: rgba(99, 102, 241, 0.3); }

            .item-visual { position: relative; width: 100px; }
            .image-preview-wrapper {
                width: 100px;
                height: 100px;
                background: rgba(0,0,0,0.3);
                border-radius: 8px;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid var(--border-color);
            }
            .preview-img { width: 100%; height: 100%; object-fit: cover; }
            .preview-placeholder { font-size: 2rem; color: var(--text-dim); }

            .btn-change-img {
                position: absolute;
                bottom: -8px;
                right: -8px;
                width: 32px;
                height: 32px;
                background: var(--primary);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                border: 2px solid var(--surface-hover);
            }

            .item-details { flex: 1; display: flex; flex-direction: column; justify-content: center; }
            .input-row { display: grid; grid-template-columns: 1fr 140px; gap: 12px; }
            .field label { font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 6px; display: block; }
            .field input {
                width: 100%;
                background: var(--bg-color);
                border: 1px solid var(--border-color);
                color: white;
                padding: 10px 12px;
                border-radius: 8px;
                font-size: 0.95rem;
            }
            .field input:focus { border-color: var(--primary); outline: none; }

            .btn-remove-item {
                position: absolute;
                top: 8px;
                right: 8px;
                width: 24px;
                height: 24px;
                color: var(--text-dim);
                font-size: 1rem;
                opacity: 0.5;
            }
            .btn-remove-item:hover { color: var(--danger); opacity: 1; }

            .upload-progress-overlay {
                position: absolute;
                inset: 0;
                background: rgba(0,0,0,0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 5;
            }
            .spinner-small {
                width: 20px;
                height: 20px;
                border: 2px solid rgba(255,255,255,0.3);
                border-top-color: white;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
            }
            @keyframes spin { to { transform: rotate(360deg); } }

            .btn-secondary { background: rgba(255, 255, 255, 0.05); color: var(--text-main); padding: 0.75rem 1.5rem; border-radius: var(--radius-md); font-weight: 600; border: 1px solid var(--border-color); }
            .btn-secondary:hover { background: rgba(255, 255, 255, 0.1); }

            .multi-select-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                gap: 8px;
                padding: 12px;
                background: var(--surface-hover);
                border-radius: 12px;
                border: 1px solid var(--border-color);
            }
            .store-checkbox-card {
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                background: var(--bg-color);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                transition: all 0.2s;
            }
            .store-checkbox-card:has(input:checked) {
                border-color: var(--primary);
                background: rgba(99, 102, 241, 0.1);
            }
            .store-checkbox-card input { width: 16px; height: 16px; cursor: pointer; }
            .checkbox-label { font-size: 0.85rem; font-weight: 500; }

            .store-filter-container {
                display: flex;
                gap: 8px;
                background: var(--surface-hover);
                padding: 4px;
                border-radius: 12px;
                border: 1px solid var(--border-color);
                overflow-x: auto;
                max-width: calc(100vw - 400px);
            }
            .filter-pill {
                padding: 6px 16px;
                border-radius: 8px;
                font-size: 0.85rem;
                font-weight: 600;
                color: var(--text-muted);
                white-space: nowrap;
                transition: all 0.2s;
            }
            .filter-pill:hover { color: var(--text-main); background: rgba(255,255,255,0.05); }
            .filter-pill.active {
                background: var(--primary);
                color: white;
                box-shadow: 0 4px 12px var(--primary-glow);
            }
        </style>
        <div class="page-container">
            <div class="page-header" style="justify-content: space-between; align-items: center;">
                <div>
                     <h2 class="page-title" style="margin-bottom: 4px;">${isAgendamento ? 'Catálogo de Serviços' : 'Catálogo de Produtos'}</h2>
                     <p style="color: var(--text-muted); font-size: 0.9rem;">${isAgendamento ? 'Gerencie os serviços oferecidos pela sua empresa.' : 'Gerencie os produtos visíveis no cardápio das suas lojas.'}</p>
                </div>
                <button id="btn-new-product" class="btn-primary"><i style="color: #fff;" class="fa-solid fa-plus"></i> Novo ${labelSingular}</button>
            </div>

            ${isOwner ? `
            <div style="margin-bottom: 2rem; display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 0.85rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Filtrar por Loja:</span>
                <div class="store-filter-container" id="store-pills-filter">
                    <button class="filter-pill ${activeStoreFilter === 'all' ? 'active' : ''}" data-value="all">Todas</button>
                    ${stores.map((s: any) => `
                        <button class="filter-pill ${activeStoreFilter === s.id ? 'active' : ''}" data-value="${s.id}">${s.name}</button>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>

        <div class="card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>${labelSingular}</th>
                            <th>Loja</th>
                            <th>Preço</th>
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

    function setupProductListeners(companyId: string) {
        const modal = document.getElementById('product-modal');
        const btnNew = document.getElementById('btn-new-product');
        const closeModals = document.querySelectorAll('.close-modal, .close-modal-btn');
        const bulkInput = document.getElementById('bulk-file-input') as HTMLInputElement;
        const uploadSection = document.getElementById('bulk-upload-section');
        const listContainer = document.getElementById('products-list-container');
        const emptyMsg = document.getElementById('empty-list-msg');
        const btnAddManual = document.getElementById('btn-add-manual');
        const btnSaveTrigger = document.getElementById('btn-save-products-trigger');

        // Store Filter Pills
        const pills = document.querySelectorAll('.filter-pill');
        pills.forEach(pill => {
            (pill as HTMLElement).onclick = () => {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeStoreFilter = (pill as HTMLElement).dataset.value || 'all';
                refreshTable();
            };
        });

        if (btnNew && modal) {
            btnNew.onclick = () => {
                editModeProductId = null;
                pendingFiles.clear();
                document.getElementById('modal-title')!.innerText = `Adicionar ${labelPlural}`;
                if (uploadSection) uploadSection.style.display = 'block';
                if (listContainer) listContainer.innerHTML = '';
                if (emptyMsg) emptyMsg.style.display = 'block';

                if (isOwner) {
                    const checkboxes = document.querySelectorAll('#multi-store-container input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
                    checkboxes.forEach(cb => cb.checked = false);
                }

                modal.classList.remove('hidden');
            };
        }

        closeModals.forEach(btn => {
            (btn as HTMLElement).onclick = () => modal?.classList.add('hidden');
        });

        // Drag and Drop
        if (uploadSection) {
            uploadSection.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadSection.classList.add('drag-active');
            });
            uploadSection.addEventListener('dragleave', () => {
                uploadSection.classList.remove('drag-active');
            });
            uploadSection.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadSection.classList.remove('drag-active');
                if (e.dataTransfer?.files) {
                    processFiles(e.dataTransfer.files);
                }
            });
        }

        const processFiles = (files: FileList) => {
            if (!listContainer || !emptyMsg) return;
            Array.from(files).forEach(file => {
                const tempId = `prod_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
                pendingFiles.set(tempId, file);

                const name = file.name.replace(/\.[^/.]+$/, "").replace(/-|_/g, " ");
                const itemHtml = createProductItemHtml(tempId, name, '');
                listContainer.insertAdjacentHTML('beforeend', itemHtml);
                emptyMsg.style.display = 'none';

                attachItemListeners(tempId);

                // Preview
                const reader = new FileReader();
                reader.onload = (ev) => {
                    const wrapper = document.getElementById(`preview-wrapper-${tempId}`);
                    if (wrapper) {
                        wrapper.innerHTML = `<img src="${ev.target?.result}" class="preview-img">
                                              <div class="upload-progress-overlay hidden" id="progress-${tempId}"><div class="spinner-small"></div></div>`;
                    }
                };
                reader.readAsDataURL(file);
            });
        };

        if (bulkInput) {
            bulkInput.onchange = () => {
                if (bulkInput.files) {
                    processFiles(bulkInput.files);
                    bulkInput.value = '';
                }
            };
        }

        if (btnAddManual && listContainer) {
            btnAddManual.onclick = () => {
                const tempId = `manual_${Date.now()}`;
                const itemHtml = createProductItemHtml(tempId);
                listContainer.insertAdjacentHTML('beforeend', itemHtml);
                emptyMsg!.style.display = 'none';
                attachItemListeners(tempId);
            };
        }

        // Form Submit via Trigger Button
        if (btnSaveTrigger) {
            btnSaveTrigger.onclick = async () => {
                const btnSave = btnSaveTrigger as HTMLButtonElement;
                btnSave.disabled = true;
                const originalContent = btnSave.innerHTML;
                btnSave.innerHTML = '<div class="spinner-small"></div> <span>Salvando...</span>';

                const items = listContainer?.querySelectorAll('.product-item-card');
                if (!items || items.length === 0) {
                    toast.warning(`Adicione pelo menos um ${labelSingular.toLowerCase()}.`);
                    btnSave.disabled = false;
                    btnSave.innerHTML = originalContent;
                    return;
                }

                let storeIds: string[] = [];
                if (isOwner) {
                    const checkboxes = document.querySelectorAll('#multi-store-container input[type="checkbox"]:checked') as NodeListOf<HTMLInputElement>;
                    if (checkboxes.length === 0) {
                        toast.warning('Selecione pelo menos uma loja de destino.');
                        btnSave.disabled = false;
                        btnSave.innerHTML = originalContent;
                        return;
                    }
                    storeIds = Array.from(checkboxes).map(cb => cb.value);
                } else {
                    storeIds = [(currentUser as any).storeId || stores[0]?.id].filter(Boolean);
                }

                try {
                    const promises = Array.from(items).map(async (item) => {
                        const tempId = item.id.replace('card-', '');
                        const nameInput = item.querySelector(`input[name="name-${tempId}"]`) as HTMLInputElement;
                        const priceInput = item.querySelector(`input[name="price-${tempId}"]`) as HTMLInputElement;
                        const progressOverlay = document.getElementById(`progress-${tempId}`);

                        if (!nameInput.value) return;

                        if (progressOverlay) progressOverlay.classList.remove('hidden');

                        const file = pendingFiles.get(tempId);
                        let imageUrl = '';
                        let imagemPath = '';
                        let downloadToken = '';

                        if (editModeProductId && tempId === 'edit-item' && !file) {
                            const p = products.find(p => p.id === editModeProductId);
                            imageUrl = p?.imageUrl || '';
                            imagemPath = p?.imagemPath || '';
                            downloadToken = p?.downloadToken || '';
                        }
                        else if (file) {
                            // UNIQUE Storage Path using tempId
                            const storageRef = ref(storage, `products/${companyId}/${tempId}_${file.name}`);
                            await uploadBytes(storageRef, file);
                            const fullUrl = await getDownloadURL(storageRef);
                            const urlObj = new URL(fullUrl);

                            imagemPath = storageRef.fullPath;
                            downloadToken = urlObj.searchParams.get('token') || '';
                        }

                        const productData: any = {
                            name: nameInput.value,
                            price: parseFloat(priceInput.value) || 0,
                            active: true,
                            storeIds,
                            companyId
                        };

                        if (imagemPath) productData.imagemPath = imagemPath;
                        if (downloadToken) productData.downloadToken = downloadToken;
                        if (imageUrl && !imagemPath) productData.imageUrl = imageUrl;
                        // Note: We prioritize imagemPath/downloadToken for new/updated images

                        if (editModeProductId && tempId === 'edit-item') {
                            await dbService.update('products', editModeProductId, productData);
                        } else {
                            await dbService.create('products', productData);
                        }

                        if (progressOverlay) progressOverlay.classList.add('hidden');
                    });

                    await Promise.all(promises);

                    toast.success(`Todos os ${labelPlural.toLowerCase()} foram salvos com sucesso!`);
                    if (modal) modal.classList.add('hidden');

                    products = await dbService.getAll('products', { field: 'companyId', operator: '==', value: companyId }) as Product[];
                    refreshTable();

                } catch (error) {
                    console.error('Error saving products:', error);
                    toast.error(`Erro ao salvar ${labelPlural.toLowerCase()}. Verifique sua conexão.`);
                } finally {
                    btnSave.disabled = false;
                    btnSave.innerHTML = originalContent;
                }
            };
        }
    }
};
