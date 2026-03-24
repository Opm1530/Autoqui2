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
    promotionalActive?: boolean;
    promotionalName?: string;
    promotionalPrice?: number;
    categoryId?: string;
    stock?: number | null;
    duration?: number | null;
}

interface Category {
    id: string;
    name: string;
    icon: string;
    companyId: string;
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
    const isProductsEnabled = modulos.includes('venda') || modulos.includes('agendamento') || modulos.includes('venda_catalogo');
    const isAgendamento = modulos.includes('agendamento');
    const labelSingular = isAgendamento ? 'Serviço' : 'Produto';
    const labelPlural = isAgendamento ? 'Serviços' : 'Produtos';
    let stores = company?.stores || [];

    const isOwner = (currentUser.role?.toLowerCase() === 'owner');
    const userStoreIds = (currentUser as any).storeIds || ((currentUser as any).storeId ? [(currentUser as any).storeId] : []);

    if (!isOwner) {
        stores = stores.filter((s: any) => userStoreIds.includes(s.id));
    }

    let activeStoreFilter = isOwner ? 'all' : (userStoreIds.length === 1 ? userStoreIds[0] : 'employee_all');

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
    let categories = await dbService.getAll('categories', { field: 'companyId', operator: '==', value: currentUser.companyId }) as Category[];

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
        if (activeStoreFilter !== 'all' && activeStoreFilter !== 'employee_all') {
            filteredProducts = products.filter((p: any) =>
                (p.storeIds && p.storeIds.includes(activeStoreFilter)) ||
                (p.storeId === activeStoreFilter)
            );
        } else if (activeStoreFilter === 'employee_all') {
            filteredProducts = products.filter((p: any) =>
                (p.storeIds && p.storeIds.some((sid: string) => userStoreIds.includes(sid))) ||
                (p.storeId && userStoreIds.includes(p.storeId))
            );
        }

        if (filteredProducts.length === 0) {
            return `<tr><td colspan="7" style="text-align:center">Nenhum ${labelSingular.toLowerCase()} encontrado.</td></tr>`;
        }
        return filteredProducts.map((p: any) => `
            <tr data-product-id="${p.id}">
                <td><input type="checkbox" class="product-checkbox" data-id="${p.id}" onchange="window.updateBulkBar()"></td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        ${getProductImageUrl(p) ? `<img src="${getProductImageUrl(p)}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">` : '<div style="width: 40px; height: 40px; background: #333; border-radius: 4px; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-box"></i></div>'}
                        <span style="font-weight: 600;">${p.name}</span>
                    </div>
                </td>
                <td><div style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${getStoreNames(p)}">${getStoreNames(p)}</div></td>
                <td>R$ ${p.price?.toFixed(2)}</td>
                <td>
                    ${isAgendamento
                ? (p.duration ? `<span class="badge info">${p.duration} min</span>` : `<span class="badge" style="background:rgba(100,116,139,0.15);color:#94a3b8;">—</span>`)
                : (p.stock === null || p.stock === undefined
                    ? `<span class="badge info" title="Sem controle">&#8734; Ilimitado</span>`
                    : p.stock > 10
                        ? `<span class="badge success">${p.stock} un.</span>`
                        : p.stock > 0
                            ? `<span class="badge" style="background:rgba(234,179,8,0.15);color:#eab308;border:1px solid rgba(234,179,8,0.3);">${p.stock} un.</span>`
                            : `<span class="badge danger">Esgotado</span>`)
            }
                </td>
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

    // ── Helpers ──────────────────────────────────────────────────────────────

    const refreshTable = () => {
        const tbody = document.querySelector('.data-table tbody');
        if (tbody) {
            tbody.innerHTML = renderRows();
            updateBulkBar();
        }
    };

    const updateBulkBar = () => {
        const selected = document.querySelectorAll('.product-checkbox:checked');
        const bar = document.getElementById('bulk-actions-container');
        const count = document.getElementById('bulk-count');
        if (bar && count) {
            if (selected.length > 0) {
                bar.classList.remove('hidden');
                count.innerText = `${selected.length} item(ns) selecionado(s)`;
            } else {
                bar.classList.add('hidden');
            }
        }
    };

    const refreshSelectors = () => {
        const options = `<option value="">Sem Categoria</option>` + categories.map((c: Category) => `<option value="${c.id}">${c.name}</option>`).join('');
        document.querySelectorAll('.item-category, #bulk-assign-cat').forEach(sel => {
            const currentVal = (sel as HTMLSelectElement).value;
            sel.innerHTML = options;
            (sel as HTMLSelectElement).value = currentVal;
        });
    };

    const refreshCategoriesList = () => {
        const list = document.getElementById('categories-list');
        if (!list) return;
        if (categories.length === 0) {
            list.innerHTML = '<p style="text-align:center; color:var(--text-dim);">Nenhuma categoria criada.</p>';
            return;
        }
        list.innerHTML = categories.map((c: Category) => `
            <div class="category-item">
                <div style="display:flex; align-items:center; gap:10px;">
                    <i class="fa-solid ${c.icon}" style="color:var(--primary); width:20px; text-align:center;"></i>
                    <span id="cat-name-text-${c.id}">${c.name}</span>
                </div>
                <div style="display:flex; gap:5px;">
                    <button class="action-btn" style="background:rgba(255,255,255,0.05); border:1px solid var(--border-color);" onclick="window.openEditCategoryModal('${c.id}', '${c.name.replace(/'/g, "\\'")}')"><i class="fa-solid fa-pen"></i></button>
                    <button class="action-btn" style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.2); color:#ef4444;" onclick="window.deleteCategory('${c.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    };

    const updateCatalogLink = (storeId: string) => {
        const catalogContainer = document.getElementById('catalog-link-container');
        const catalogUrlInput = document.getElementById('catalog-url-display') as HTMLInputElement;
        const btnOpenCatalog = document.getElementById('btn-open-catalog') as HTMLAnchorElement;
        if (!catalogContainer || !catalogUrlInput || !btnOpenCatalog) return;
        if (storeId === 'all' || storeId === 'employee_all') {
            catalogContainer.classList.add('hidden');
        } else {
            const url = `${window.location.origin}/catalog/${storeId}`;
            catalogUrlInput.value = url;
            btnOpenCatalog.href = url;
            catalogContainer.classList.remove('hidden');
        }
    };

    const uploadImage = async (file: File, companyId: string) => {
        const tempId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        const storageRef = ref(storage, `products/${companyId}/${tempId}_${file.name}`);
        await uploadBytes(storageRef, file);
        const fullUrl = await getDownloadURL(storageRef);
        const urlObj = new URL(fullUrl);
        return {
            imagemPath: storageRef.fullPath,
            downloadToken: urlObj.searchParams.get('token') || ''
        };
    };

    const createProductItemHtml = (
        tempId: string,
        name: string = '',
        price: number | string = '',
        imageUrl: string | null = null,
        promotionalActive: boolean = false,
        promotionalName: string = '',
        promotionalPrice: number | string = '',
        categoryId: string = '',
        stock: number | null | undefined = null,
        duration: number | null | undefined = null
    ) => {
        const categoryOptions = categories.map((c: Category) => `<option value="${c.id}" ${c.id === categoryId ? 'selected' : ''}>${c.name}</option>`).join('');
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

                    <div class="input-row" style="margin-top: 12px;">
                        <div class="field">
                            <label>Categoria</label>
                            <select name="category-${tempId}" class="item-category" style="width: 100%; background: var(--bg-color); border: 1px solid var(--border-color); color: white; padding: 10px 12px; border-radius: 8px; font-size: 0.95rem;">
                                <option value="">Sem Categoria</option>
                                ${categoryOptions}
                            </select>
                        </div>
                        <div class="field price-field">
                            ${isAgendamento
                                ? `<label>Duração <span style="color:var(--text-dim);font-weight:400;">(minutos)</span></label>
                                   <input type="number" name="duration-${tempId}" value="${duration !== null && duration !== undefined ? duration : ''}" class="item-duration" placeholder="Ex: 30" min="5" step="5">`
                                : `<label>Estoque <span style="color:var(--text-dim);font-weight:400;">(vazio = ilimitado)</span></label>
                                   <input type="number" name="stock-${tempId}" value="${stock !== null && stock !== undefined ? stock : ''}" class="item-stock" placeholder="Ilimitado" min="0" step="1">`
                            }
                        </div>
                    </div>
                    
                    ${!isAgendamento ? `
                    <div class="promotional-section" style="margin-top: 15px; padding-top: 10px; border-top: 1px dashed var(--border-color);">
                        <label class="promotional-toggle" style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--primary); font-weight: 600; font-size: 0.85rem;">
                            <input type="checkbox" name="promotional-active-${tempId}" class="promotional-checkbox" ${promotionalActive ? 'checked' : ''} style="width: 16px; height: 16px;">
                            <i class="fa-solid fa-tag"></i> Ativar Promoção
                        </label>
                        
                        <div class="promotional-fields ${promotionalActive ? '' : 'hidden'}" id="promotional-fields-${tempId}" style="margin-top: 10px; border-radius: 8px; background: rgba(99, 102, 241, 0.05); padding: 12px; border: 1px solid rgba(99, 102, 241, 0.2);">
                            <div class="input-row">
                                <div class="field">
                                    <label>Título da Promoção</label>
                                    <input type="text" name="promotional-name-${tempId}" value="${promotionalName}" placeholder="Ex: Oferta Relâmpago!" class="promotional-name-input">
                                </div>
                                <div class="field price-field">
                                    <label>Preço Promo (R$)</label>
                                    <input type="number" name="promotional-price-${tempId}" value="${promotionalPrice}" placeholder="0,00" step="0.01" class="promotional-price-input">
                                </div>
                            </div>
                        </div>
                    </div>` : ''}
                 </div>

                 <button type="button" class="btn-remove-item" onclick="window.removeProductItem('${tempId}')" title="Remover item">
                    <i class="fa-solid fa-times"></i>
                 </button>
            </div>
        `;
    };

    const attachItemListeners = (tempId: string) => {
        const btnChange = document.querySelector(`#card-${tempId} .btn-change-img`);
        const fileInput = document.getElementById(`file-${tempId}`) as HTMLInputElement;
        if (btnChange && fileInput) {
            btnChange.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', () => {
                if (fileInput.files && fileInput.files[0]) {
                    const file = fileInput.files[0];
                    pendingFiles.set(tempId, file);
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
            });
        }

        const promoToggle = document.querySelector(`input[name="promotional-active-${tempId}"]`) as HTMLInputElement;
        const promoFields = document.getElementById(`promotional-fields-${tempId}`);
        if (promoToggle && promoFields) {
            promoToggle.addEventListener('change', () => {
                if (promoToggle.checked) promoFields.classList.remove('hidden');
                else promoFields.classList.add('hidden');
            });
        }
    };

    const processFiles = (files: FileList) => {
        const listContainer = document.getElementById('products-list-container');
        const emptyMsg = document.getElementById('empty-list-msg');
        if (!listContainer || !emptyMsg) return;
        Array.from(files).forEach(file => {
            const tempId = `prod_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
            pendingFiles.set(tempId, file);
            const name = file.name.replace(/\.[^/.]+$/, "").replace(/-|_/g, " ");
            const itemHtml = createProductItemHtml(tempId, name, '');
            listContainer.insertAdjacentHTML('beforeend', itemHtml);
            emptyMsg.style.display = 'none';
            attachItemListeners(tempId);

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

    // ── Window (global) functions ─────────────────────────────────────────────

    (window as any).editProduct = async (id: string) => {
        const product = products.find((p: Product) => p.id === id);
        if (product) {
            editModeProductId = id;
            pendingFiles.clear();
            document.getElementById('modal-title')!.innerText = `Editar ${labelSingular}`;
            document.getElementById('bulk-upload-section')!.style.display = 'none';

            if (isOwner) {
                const checkboxes = document.querySelectorAll('#multi-store-container input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
                checkboxes.forEach(cb => { cb.checked = (product.storeIds || []).includes(cb.value); });
            }

            const listContainer = document.getElementById('products-list-container');
            const emptyMsg = document.getElementById('empty-list-msg');
            if (listContainer && emptyMsg) {
                listContainer.innerHTML = '';
                emptyMsg.style.display = 'none';
                const imgUrl = getProductImageUrl(product);
                listContainer.innerHTML = createProductItemHtml(
                    'edit-item', product.name, product.price, imgUrl,
                    product.promotionalActive, product.promotionalName, product.promotionalPrice,
                    product.categoryId, product.stock, product.duration
                );
                setTimeout(() => attachItemListeners('edit-item'), 0);
            }
            document.getElementById('product-modal')!.classList.remove('hidden');
        }
    };

    (window as any).toggleProductStatus = async (id: string, currentStatus: boolean) => {
        try {
            await dbService.update('products', id, { active: !currentStatus });
            const product = products.find((p: any) => p.id === id);
            if (product) product.active = !currentStatus;
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
                const product = products.find((p: any) => p.id === id);
                if (product) {
                    const imgUrl = getProductImageUrl(product);
                    const imgPath = product.imagemPath;
                    if (imgUrl || imgPath) {
                        try {
                            const imageRef = imgPath ? ref(storage, imgPath) : ref(storage, imgUrl!);
                            await deleteObject(imageRef);
                        } catch (storageErr) {
                            console.warn('Could not delete image from storage:', storageErr);
                        }
                    }
                }
                await dbService.delete('products', id);
                products = products.filter((p: any) => p.id !== id);
                refreshTable();
                toast.success(`${labelSingular} excluído com sucesso!`);
            } catch (error) {
                toast.error('Erro ao excluir: ' + error);
            }
        }
    };

    (window as any).openProductModal = () => {
        editModeProductId = null;
        pendingFiles.clear();
        const titleEl = document.getElementById('modal-title');
        const uploadSection = document.getElementById('bulk-upload-section');
        const listContainer = document.getElementById('products-list-container');
        const emptyMsg = document.getElementById('empty-list-msg');
        if (titleEl) titleEl.innerText = `Adicionar ${labelPlural}`;
        if (uploadSection) uploadSection.style.display = 'block';
        if (listContainer) listContainer.innerHTML = '';
        if (emptyMsg) emptyMsg.style.display = 'block';
        if (isOwner) {
            const checkboxes = document.querySelectorAll('#multi-store-container input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
            checkboxes.forEach(cb => cb.checked = false);
        }
        document.getElementById('product-modal')?.classList.remove('hidden');
    };

    (window as any).closeModals = () => {
        document.getElementById('product-modal')?.classList.add('hidden');
        document.getElementById('category-modal')?.classList.add('hidden');
        document.getElementById('edit-cat-name-modal')?.classList.add('hidden');
        document.getElementById('migration-modal')?.classList.add('hidden');
    };

    (window as any).handleBulkFileSelection = (input: HTMLInputElement) => {
        if (input.files) {
            processFiles(input.files);
            input.value = '';
        }
    };

    (window as any).addManualItem = () => {
        const tempId = `manual_${Date.now()}`;
        const listContainer = document.getElementById('products-list-container');
        const emptyMsg = document.getElementById('empty-list-msg');
        if (listContainer && emptyMsg) {
            const itemHtml = createProductItemHtml(tempId);
            listContainer.insertAdjacentHTML('beforeend', itemHtml);
            emptyMsg.style.display = 'none';
            attachItemListeners(tempId);
        }
    };

    (window as any).removeProductItem = (tempId: string) => {
        const card = document.getElementById(`card-${tempId}`);
        if (card) card.remove();
        pendingFiles.delete(tempId);
        const list = document.getElementById('products-list-container');
        if (list && list.children.length === 0) {
            const emptyMsg = document.getElementById('empty-list-msg');
            if (emptyMsg) emptyMsg.style.display = 'block';
        }
    };

    (window as any).saveProducts = async () => {
        const btnSave = document.getElementById('btn-save-products-trigger') as HTMLButtonElement;
        if (!btnSave) return;
        btnSave.disabled = true;
        const originalContent = btnSave.innerHTML;
        btnSave.innerHTML = '<div class="spinner-small"></div> <span>Salvando...</span>';

        const listContainer = document.getElementById('products-list-container');
        const items = listContainer?.querySelectorAll('.product-item-card');
        if (!items || items.length === 0) {
            toast.warning(`Adicione pelo menos um ${labelSingular.toLowerCase()}.`);
            btnSave.disabled = false;
            btnSave.innerHTML = originalContent;
            return;
        }

        let storeIds: string[] = [];
        if (isOwner) {
            const checked = document.querySelectorAll('#multi-store-container input[name="store-ids"]:checked');
            storeIds = Array.from(checked).map((cb: any) => cb.value);
        } else if ((currentUser as any).storeId) {
            storeIds = [(currentUser as any).storeId];
        } else if ((currentUser as any).storeIds && (currentUser as any).storeIds.length > 0) {
            storeIds = (currentUser as any).storeIds;
        }

        if (storeIds.length === 0) {
            toast.warning('Selecione pelo menos uma loja para este(s) produto(s).');
            btnSave.disabled = false;
            btnSave.innerHTML = originalContent;
            return;
        }

        try {
            for (const item of Array.from(items)) {
                const tempId = item.id.replace('card-', '');
                const name = (item.querySelector('.item-name') as HTMLInputElement).value;
                const price = parseFloat((item.querySelector('.item-price') as HTMLInputElement).value);
                const categoryId = (item.querySelector('.item-category') as HTMLSelectElement).value;

                let promoActive = false;
                let promoName = '';
                let promoPrice = 0;
                let stock: number | null = null;
                let duration: number | null = null;

                if (isAgendamento) {
                    const durationInput = (item.querySelector('.item-duration') as HTMLInputElement)?.value;
                    duration = durationInput !== '' && durationInput != null ? parseInt(durationInput) : null;
                } else {
                    promoActive = (item.querySelector('.promotional-checkbox') as HTMLInputElement)?.checked || false;
                    promoName = (item.querySelector('.promotional-name-input') as HTMLInputElement)?.value || '';
                    promoPrice = parseFloat((item.querySelector('.promotional-price-input') as HTMLInputElement)?.value) || 0;
                    const stockInput = (item.querySelector('.item-stock') as HTMLInputElement)?.value;
                    stock = stockInput !== '' && stockInput != null ? parseInt(stockInput) : null;
                }

                const progressOverlay = document.getElementById(`progress-${tempId}`);
                if (progressOverlay) progressOverlay.classList.remove('hidden');

                let imageData = {};
                if (pendingFiles.has(tempId)) {
                    imageData = await uploadImage(pendingFiles.get(tempId)!, currentUser.companyId!);
                }

                const productData: any = {
                    name, price: price || 0, categoryId, storeIds,
                    companyId: currentUser.companyId, active: true,
                    promotionalActive: promoActive, promotionalName: promoName,
                    promotionalPrice: promoPrice, stock, duration, ...imageData
                };

                if (editModeProductId && tempId === 'edit-item') {
                    await dbService.update('products', editModeProductId, productData);
                    const idx = products.findIndex((p: Product) => p.id === editModeProductId);
                    if (idx !== -1) products[idx] = { ...products[idx], ...productData };
                } else {
                    const newId = await dbService.create('products', productData);
                    products.push({ id: newId, ...productData });
                }

                if (progressOverlay) progressOverlay.classList.add('hidden');
            }

            toast.success(`${labelPlural} salvo(s) com sucesso!`);
            (window as any).closeModals();
            refreshTable();
            btnSave.disabled = false;
            btnSave.innerHTML = originalContent;
        } catch (error) {
            console.error('Error saving products:', error);
            toast.error(`Erro ao salvar ${labelPlural.toLowerCase()}.`);
            btnSave.disabled = false;
            btnSave.innerHTML = originalContent;
        }
    };

    (window as any).saveCategory = async (e: Event) => {
        e.preventDefault();
        const nameInput = document.getElementById('cat-name') as HTMLInputElement;
        const iconInput = document.getElementById('cat-icon') as HTMLInputElement;
        const name = nameInput.value.trim();
        const icon = iconInput.value;
        if (!name) return;
        try {
            const newId = await dbService.create('categories', { name, icon, companyId: currentUser.companyId });
            categories.push({ id: newId, name, icon, companyId: currentUser.companyId! });
            nameInput.value = '';
            refreshCategoriesList();
            refreshSelectors();
            toast.success('Categoria criada com sucesso!');
        } catch (err) {
            toast.error('Erro ao criar categoria.');
        }
    };

    (window as any).deleteCategory = async (id: string) => {
        if (await confirm.warning('Excluir Categoria', 'Tem certeza? Produtos nesta categoria ficarão "Sem Categoria".')) {
            try {
                await dbService.delete('categories', id);
                categories = categories.filter((c: Category) => c.id !== id);
                refreshCategoriesList();
                refreshSelectors();
                products.forEach((p: any) => { if (p.categoryId === id) p.categoryId = ''; });
                toast.success('Categoria excluída.');
            } catch (err) {
                toast.error('Erro ao excluir categoria.');
            }
        }
    };

    (window as any).openEditCategoryModal = (id: string, currentName: string) => {
        const input = document.getElementById('edit-cat-name-input') as HTMLInputElement;
        if (input) {
            input.value = currentName;
            input.dataset.catId = id;
            document.getElementById('edit-cat-name-modal')?.classList.remove('hidden');
        }
    };

    (window as any).updateCategoryName = async () => {
        const input = document.getElementById('edit-cat-name-input') as HTMLInputElement;
        const id = input.dataset.catId;
        const newName = input.value.trim();
        if (id && newName) {
            try {
                await dbService.update('categories', id, { name: newName });
                const cat = categories.find((c: Category) => c.id === id);
                if (cat) cat.name = newName;
                refreshCategoriesList();
                refreshSelectors();
                document.getElementById('edit-cat-name-modal')?.classList.add('hidden');
                toast.success('Nome atualizado!');
            } catch (err) {
                toast.error('Erro ao atualizar nome.');
            }
        }
    };

    (window as any).openCategoryModal = () => {
        refreshCategoriesList();
        const iconPicker = document.getElementById('icon-picker');
        if (iconPicker) {
            iconPicker.innerHTML = availableIcons.map(icon => `
                <div class="icon-option ${icon === 'fa-tag' ? 'selected' : ''}" data-icon="${icon}" onclick="window.selectCategoryIcon(this, '${icon}')">
                    <i class="fa-solid ${icon}"></i>
                </div>
            `).join('');
        }
        document.getElementById('category-modal')?.classList.remove('hidden');
    };

    (window as any).selectCategoryIcon = (el: HTMLElement, icon: string) => {
        const picker = document.getElementById('icon-picker');
        if (picker) {
            picker.querySelectorAll('.icon-option').forEach(o => o.classList.remove('selected'));
            el.classList.add('selected');
            (document.getElementById('cat-icon') as HTMLInputElement).value = icon;
        }
    };

    (window as any).setStoreFilter = (storeId: string, el: HTMLElement) => {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        el.classList.add('active');
        activeStoreFilter = storeId;
        updateCatalogLink(storeId);
        refreshTable();
    };

    (window as any).toggleAllCheckboxes = (el: HTMLInputElement) => {
        const checked = el.checked;
        document.querySelectorAll('.product-checkbox').forEach(cb => (cb as HTMLInputElement).checked = checked);
        updateBulkBar();
    };

    (window as any).updateBulkBar = updateBulkBar;

    (window as any).applyBulkCategory = async () => {
        const catId = (document.getElementById('bulk-assign-cat') as HTMLSelectElement).value;
        if (!catId) { toast.warning('Selecione uma categoria.'); return; }
        const selected = Array.from(document.querySelectorAll('.product-checkbox:checked')).map(cb => (cb as HTMLElement).dataset.id!);
        const btn = document.getElementById('btn-bulk-save');
        if (btn) btn.innerHTML = '<div class="spinner-small"></div>';
        try {
            await Promise.all(selected.map(id => dbService.update('products', id, { categoryId: catId })));
            products.forEach((p: any) => { if (selected.includes(p.id)) p.categoryId = catId; });
            toast.success(`${selected.length} produtos atualizados!`);
            (window as any).cancelBulkActions();
            refreshTable();
        } catch (err) {
            toast.error('Erro ao processar em massa.');
        } finally {
            if (btn) btn.innerText = 'Aplicar';
        }
    };

    (window as any).cancelBulkActions = () => {
        document.querySelectorAll('.product-checkbox').forEach(cb => (cb as HTMLInputElement).checked = false);
        const allCheck = document.getElementById('select-all-products') as HTMLInputElement;
        if (allCheck) allCheck.checked = false;
        updateBulkBar();
    };

    // ── Available icons ───────────────────────────────────────────────────────

    const availableIcons = [
        'fa-utensils', 'fa-burger', 'fa-pizza-slice', 'fa-ice-cream', 'fa-coffee', 'fa-beer', 'fa-wine-glass',
        'fa-apple-whole', 'fa-carrot', 'fa-bowl-food', 'fa-cake-candles', 'fa-candy-cane', 'fa-cookie',
        'fa-glass-water', 'fa-mug-hot', 'fa-bag-shopping', 'fa-shirt', 'fa-shoe-prints', 'fa-glasses',
        'fa-watch', 'fa-laptop', 'fa-mobile-screen', 'fa-gamepad', 'fa-headphones', 'fa-camera', 'fa-tv',
        'fa-microchip', 'fa-car', 'fa-bicycle', 'fa-plane', 'fa-bus', 'fa-train', 'fa-ship', 'fa-anchor',
        'fa-heart', 'fa-star', 'fa-bolt', 'fa-fire', 'fa-leaf', 'fa-tree', 'fa-sun', 'fa-moon', 'fa-droplet',
        'fa-cloud', 'fa-music', 'fa-film', 'fa-book', 'fa-pencil', 'fa-palette', 'fa-briefcase', 'fa-home',
        'fa-medkit', 'fa-dumbbell', 'fa-basketball', 'fa-soccer-ball', 'fa-baseball', 'fa-volleyball', 'fa-tag'
    ];

    // ── After HTML is returned, set up listeners ──────────────────────────────

    setTimeout(() => {
        // Catalog link
        updateCatalogLink(activeStoreFilter);

        // Copy catalog button
        const btnCopyCatalog = document.getElementById('btn-copy-catalog');
        if (btnCopyCatalog) {
            btnCopyCatalog.onclick = () => {
                const url = (document.getElementById('catalog-url-display') as HTMLInputElement)?.value;
                if (url) navigator.clipboard.writeText(url).then(() => toast.success('Link do catálogo copiado!'));
            };
        }

        // Bulk buttons
        const btnBulkSave = document.getElementById('btn-bulk-save');
        const btnBulkCancel = document.getElementById('btn-bulk-cancel');
        if (btnBulkSave) btnBulkSave.onclick = () => (window as any).applyBulkCategory();
        if (btnBulkCancel) btnBulkCancel.onclick = () => (window as any).cancelBulkActions();

        // Drag and drop on upload zone
        const uploadSection = document.getElementById('bulk-upload-section');
        if (uploadSection) {
            uploadSection.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadSection.classList.add('drag-active');
            });
            uploadSection.addEventListener('dragleave', () => uploadSection.classList.remove('drag-active'));
            uploadSection.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadSection.classList.remove('drag-active');
                if (e.dataTransfer?.files) processFiles(e.dataTransfer.files);
            });
        }
    }, 100);

    // ── HTML ──────────────────────────────────────────────────────────────────

    const categoriesModalHtml = `
        <div id="category-modal" class="modal hidden">
            <div class="modal-content glass" style="max-width: 500px;">
                <span class="close-modal" onclick="window.closeModals()">&times;</span>
                <h2>Gerenciar Categorias</h2>
                <p class="text-muted">Crie categorias para organizar seus ${labelPlural.toLowerCase()}.</p>
                
                <form id="category-form" style="margin-top: 20px;" onsubmit="window.saveCategory(event)">
                    <div class="form-group">
                        <label>Nome da Categoria</label>
                        <input type="text" id="cat-name" placeholder="Ex: Bebidas, Sobremesas..." required>
                    </div>
                    <div class="form-group">
                        <label>Ícone (Selecione um)</label>
                        <div class="icon-picker-grid" id="icon-picker">
                            <!-- Icons will be injected here -->
                        </div>
                        <input type="hidden" id="cat-icon" value="fa-tag">
                    </div>
                    <button type="submit" class="btn-primary full-width">Salvar Categoria</button>
                </form>

                <div id="categories-list" style="margin-top: 30px; border-top: 1px solid var(--border-color); padding-top: 20px;">
                    <!-- Existing categories will be listed here -->
                </div>
            </div>
        </div>

        <div id="edit-cat-name-modal" class="modal hidden">
            <div class="modal-content glass" style="max-width: 400px; padding: 30px;">
                 <span class="close-modal" onclick="document.getElementById('edit-cat-name-modal').classList.add('hidden')">&times;</span>
                 <h3>Editar Nome</h3>
                 <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 20px;">Altere o nome da categoria selecionada.</p>
                 <div class="form-group">
                    <input type="text" id="edit-cat-name-input" style="width: 100%;" required>
                 </div>
                 <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button class="btn-secondary full-width" onclick="document.getElementById('edit-cat-name-modal').classList.add('hidden')">Cancelar</button>
                    <button class="btn-primary full-width" onclick="window.updateCategoryName()">Salvar</button>
                 </div>
            </div>
        </div>
    `;

    const modalHtml = `
        <div id="product-modal" class="modal hidden">
            <div class="modal-content glass big-modal" style="display: flex; flex-direction: column; max-height: 90vh;">
                <span class="close-modal" onclick="window.closeModals()">&times;</span>
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

                    <div id="bulk-upload-section" class="bulk-dropzone" onclick="document.getElementById('bulk-file-input').click()">
                        <input type="file" id="bulk-file-input" multiple accept="image/*" style="display: none;" onchange="window.handleBulkFileSelection(this)">
                        <div class="dropzone-content">
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
                     <button type="button" class="btn-text" style="display: flex; align-items: center; gap: 8px;" onclick="window.addManualItem()">
                        <i class="fa-solid fa-plus-circle"></i> Item Manual
                     </button>
                     <div style="display: flex; gap: 12px;">
                        <button type="button" class="btn-secondary" onclick="window.closeModals()">Cancelar</button>
                        <button type="button" id="btn-save-products-trigger" class="btn-primary" style="min-width: 160px; display: flex; align-items: center; justify-content: center; gap: 8px;" onclick="window.saveProducts()">
                            <i class="fa-solid fa-save"></i> <span>Salvar ${labelPlural}</span>
                        </button>
                     </div>
                </div>
            </div>
        </div>
    `;

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
            .dropzone-icon { font-size: 2.5rem; color: var(--primary); margin-bottom: 12px; opacity: 0.8; }
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
                width: 100px; height: 100px;
                background: rgba(0,0,0,0.3);
                border-radius: 8px; overflow: hidden;
                display: flex; align-items: center; justify-content: center;
                border: 1px solid var(--border-color);
            }
            .preview-img { width: 100%; height: 100%; object-fit: cover; }
            .preview-placeholder { font-size: 2rem; color: var(--text-dim); }

            .btn-change-img {
                position: absolute; bottom: -8px; right: -8px;
                width: 32px; height: 32px;
                background: var(--primary); color: white;
                border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                font-size: 0.8rem;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                border: 2px solid var(--surface-hover);
            }

            .item-details { flex: 1; display: flex; flex-direction: column; justify-content: center; }
            .input-row { display: grid; grid-template-columns: 1fr 140px; gap: 12px; }
            .field label { font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 6px; display: block; }
            .field input {
                width: 100%; background: var(--bg-color);
                border: 1px solid var(--border-color); color: white;
                padding: 10px 12px; border-radius: 8px; font-size: 0.95rem;
            }
            .field input:focus { border-color: var(--primary); outline: none; }

            .btn-remove-item {
                position: absolute; top: 8px; right: 8px;
                width: 24px; height: 24px;
                color: var(--text-dim); font-size: 1rem; opacity: 0.5;
            }
            .btn-remove-item:hover { color: var(--danger); opacity: 1; }

            .upload-progress-overlay {
                position: absolute; inset: 0;
                background: rgba(0,0,0,0.6);
                display: flex; align-items: center; justify-content: center; z-index: 5;
            }
            .spinner-small {
                width: 20px; height: 20px;
                border: 2px solid rgba(255,255,255,0.3);
                border-top-color: white;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
            }
            @keyframes spin { to { transform: rotate(360deg); } }

            .btn-secondary { background: rgba(255,255,255,0.05); color: var(--text-main); padding: 0.75rem 1.5rem; border-radius: var(--radius-md); font-weight: 600; border: 1px solid var(--border-color); }
            .btn-secondary:hover { background: rgba(255,255,255,0.1); }

            .multi-select-grid {
                display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                gap: 8px; padding: 12px;
                background: var(--surface-hover); border-radius: 12px; border: 1px solid var(--border-color);
            }
            .store-checkbox-card {
                cursor: pointer; display: flex; align-items: center; gap: 8px;
                padding: 8px 12px; background: var(--bg-color);
                border: 1px solid var(--border-color); border-radius: 8px; transition: all 0.2s;
            }
            .store-checkbox-card:has(input:checked) { border-color: var(--primary); background: rgba(99,102,241,0.1); }
            .store-checkbox-card input { width: 16px; height: 16px; cursor: pointer; }
            .checkbox-label { font-size: 0.85rem; font-weight: 500; }

            .store-filter-container {
                display: flex; gap: 8px;
                background: var(--surface-hover); padding: 4px;
                border-radius: 12px; border: 1px solid var(--border-color);
                overflow-x: auto; max-width: calc(100vw - 400px);
            }
            .filter-pill {
                padding: 6px 16px; border-radius: 8px;
                font-size: 0.85rem; font-weight: 600;
                color: var(--text-muted); white-space: nowrap; transition: all 0.2s;
            }
            .filter-pill:hover { color: var(--text-main); background: rgba(255,255,255,0.05); }
            .filter-pill.active { background: var(--primary); color: white; box-shadow: 0 4px 12px var(--primary-glow); }

            .icon-picker-grid {
                display: grid; grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
                gap: 8px; max-height: 200px; overflow-y: auto;
                background: rgba(0,0,0,0.2); padding: 10px;
                border-radius: 8px; border: 1px solid var(--border-color); margin-top: 5px;
            }
            .icon-option {
                width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
                background: var(--surface-hover); border: 1px solid var(--border-color);
                border-radius: 6px; cursor: pointer; transition: all 0.2s; font-size: 1.2rem;
            }
            .icon-option:hover { border-color: var(--primary); }
            .icon-option.selected { background: var(--primary); border-color: var(--primary); color: white; }

            .category-item {
                display: flex; justify-content: space-between; align-items: center;
                padding: 12px; background: rgba(255,255,255,0.03);
                border-radius: 10px; margin-bottom: 10px;
                border: 1px solid var(--border-color);
            }
            #categories-list { max-height: 250px; overflow-y: auto; padding-right: 5px; }
            #categories-list::-webkit-scrollbar { width: 4px; }
            #categories-list::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }

            .btn-text { background: transparent; color: var(--primary); border: none; cursor: pointer; font-weight: 600; font-size: 0.9rem; }
            .btn-text:hover { text-decoration: underline; }

            .bulk-actions-bar {
                display: flex; align-items: center; gap: 15px;
                background: var(--primary); color: white;
                padding: 12px 20px; border-radius: 12px; margin-bottom: 20px;
                box-shadow: 0 10px 20px var(--primary-glow); animation: slideInUp 0.3s;
            }
            @keyframes slideInUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

            .bulk-select-cat {
                background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);
                color: white; padding: 6px 12px; border-radius: 8px; font-size: 0.9rem; outline: none;
            }
            .bulk-select-cat option { background: var(--surface); color: white; }
        </style>

        <div class="page-container">
            <div class="page-header" style="justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
                <div>
                     <h2 class="page-title" style="margin-bottom: 4px;">${isAgendamento ? 'Catálogo de Serviços' : 'Catálogo de Produtos'}</h2>
                     <p style="color: var(--text-muted); font-size: 0.9rem;">${isAgendamento ? 'Gerencie os serviços oferecidos pela sua empresa.' : 'Gerencie os produtos visíveis no cardápio das suas lojas.'}</p>
                </div>
                
                <div id="catalog-link-container" class="hidden" style="flex: 1; min-width: 300px; max-width: 500px; background: rgba(99,102,241,0.1); border: 1px dashed var(--primary); border-radius: 12px; padding: 10px 15px; display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                    <div style="flex: 1; overflow: hidden;">
                        <span style="font-size: 0.7rem; color: var(--primary); font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 2px;">Link do Catálogo</span>
                        <input type="text" id="catalog-url-display" readonly style="width: 100%; background: transparent; border: none; color: white; font-size: 0.85rem; text-overflow: ellipsis; outline: none;" value="">
                    </div>
                    <button id="btn-copy-catalog" class="btn-primary" style="padding: 8px 12px; font-size: 0.8rem; flex-shrink: 0;">
                        <i class="fa-solid fa-copy"></i> Copiar
                    </button>
                    <a id="btn-open-catalog" href="" target="_blank" class="btn-secondary" style="padding: 8px 12px; font-size: 0.8rem; flex-shrink: 0;">
                        <i class="fa-solid fa-external-link"></i>
                    </a>
                </div>

                <div style="display: flex; gap: 10px;">
                    <button class="btn-secondary" onclick="window.openCategoryModal()"><i class="fa-solid fa-tags"></i> Categorias</button>
                    <button class="btn-primary" onclick="window.openProductModal()"><i style="color: #fff;" class="fa-solid fa-plus"></i> Novo ${labelSingular}</button>
                </div>
            </div>

            ${isOwner ? `
            <div style="margin-bottom: 2rem; display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 0.85rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Filtrar por Loja:</span>
                <div class="store-filter-container" id="store-pills-filter">
                    <button class="filter-pill ${activeStoreFilter === 'all' ? 'active' : ''}" onclick="window.setStoreFilter('all', this)">Todas</button>
                    ${stores.map((s: any) => `
                        <button class="filter-pill ${activeStoreFilter === s.id ? 'active' : ''}" onclick="window.setStoreFilter('${s.id}', this)">${s.name}</button>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>

        <div class="card">
            <div class="table-container">
                <div id="bulk-actions-container" class="hidden">
                    <div class="bulk-actions-bar">
                        <span id="bulk-count" style="font-weight: 700;">0 itens selecionados</span>
                        <div style="height: 20px; width: 1px; background: rgba(255,255,255,0.3);"></div>
                        <span>Mover para categoria:</span>
                        <select id="bulk-assign-cat" class="bulk-select-cat">
                            <option value="">Selecione...</option>
                            ${categories.map((c: Category) => `<option value="${c.id}">${c.name}</option>`).join('')}
                        </select>
                        <button id="btn-bulk-save" class="btn-primary" style="background: white; color: var(--primary); padding: 6px 15px; font-size: 0.85rem;">Aplicar</button>
                        <button id="btn-bulk-cancel" style="background:transparent; border:none; color:white; font-size: 0.85rem; cursor:pointer;">Cancelar</button>
                    </div>
                </div>

                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width: 40px;"><input type="checkbox" id="select-all-products" onchange="window.toggleAllCheckboxes(this)"></th>
                            <th>${labelSingular}</th>
                            <th>Loja</th>
                            <th>Preço</th>
                            <th>${isAgendamento ? 'Duração' : 'Estoque'}</th>
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
        ${categoriesModalHtml}
    `;
};
