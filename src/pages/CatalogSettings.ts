import { dbService } from '../services/db';
import { authService } from '../services/auth';
import { toast } from '../services/toast';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const CatalogSettings = async () => {
    const user = authService.getCurrentUser();
    if (!user || !user.companyId) return '<p>Acesso negado.</p>';

    const companyDoc = await dbService.get('companies', user.companyId) as any;
    const stores = companyDoc?.stores || [];
    const hasMercadoPago = !!(companyDoc?.mercadoPagoToken);

    // Load existing config for the first store (or a selected store)
    let selectedStoreId = stores[0]?.id || '';
    const lojaConfigs = selectedStoreId
        ? await dbService.getAll('loja_config', { field: 'lojaId', operator: '==', value: selectedStoreId }) as any[]
        : [];
    let config = lojaConfigs[0] || {};
    let design = config.design || {};

    // ── Global functions ──────────────────────────────────────────────────────

    (window as any).switchCatalogStore = async (storeId: string) => {
        selectedStoreId = storeId;
        const configs = await dbService.getAll('loja_config', { field: 'lojaId', operator: '==', value: storeId }) as any[];
        config = configs[0] || {};
        design = config.design || {};

        // Update form fields
        (document.getElementById('cat-primary-color') as HTMLInputElement).value = design.primaryColor || '#6366f1';
        (document.getElementById('cat-secondary-color') as HTMLInputElement).value = design.secondaryColor || '#0f172a';
        (document.getElementById('cat-whatsapp') as HTMLInputElement).value = design.whatsapp || '';
        (document.getElementById('cat-pix-key') as HTMLInputElement).value = design.pixKey || '';
        const logoPreview = document.getElementById('cat-logo-preview') as HTMLImageElement;
        if (logoPreview) {
            logoPreview.src = design.logoUrl || '';
            logoPreview.style.display = design.logoUrl ? 'block' : 'none';
        }
        updateCatalogLinkDisplay(storeId);
    };

    const updateCatalogLinkDisplay = (storeId: string) => {
        const input = document.getElementById('cat-link-display') as HTMLInputElement;
        if (input) input.value = `${window.location.origin}/catalog/${storeId}`;
    };

    (window as any).copyCatalogLink = () => {
        const input = document.getElementById('cat-link-display') as HTMLInputElement;
        if (input?.value) {
            navigator.clipboard.writeText(input.value).then(() => toast.success('Link copiado!'));
        }
    };

    (window as any).saveCatalogSettings = async () => {
        const btn = document.getElementById('btn-save-catalog-settings') as HTMLButtonElement;
        btn.disabled = true;
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';

        try {
            const primaryColor = (document.getElementById('cat-primary-color') as HTMLInputElement).value;
            const secondaryColor = (document.getElementById('cat-secondary-color') as HTMLInputElement).value;
            const whatsapp = (document.getElementById('cat-whatsapp') as HTMLInputElement).value.replace(/\D/g, '');
            const pixKey = (document.getElementById('cat-pix-key') as HTMLInputElement).value.trim();

            // Handle logo upload
            const logoFileInput = document.getElementById('cat-logo-file') as HTMLInputElement;
            let logoUrl = design.logoUrl || '';
            if (logoFileInput?.files?.[0]) {
                const file = logoFileInput.files[0];
                const storageRef = ref(storage, `logos/${user.companyId}/${selectedStoreId}_logo`);
                await uploadBytes(storageRef, file);
                logoUrl = await getDownloadURL(storageRef);
            }

            const newDesign = { primaryColor, secondaryColor, whatsapp, pixKey, logoUrl };

            if (config.id) {
                await dbService.update('loja_config', config.id, { design: newDesign });
            } else {
                const newId = await dbService.create('loja_config', {
                    lojaId: selectedStoreId,
                    empresaId: user.companyId,
                    design: newDesign
                });
                config = { id: newId, lojaId: selectedStoreId, empresaId: user.companyId, design: newDesign };
            }
            design = newDesign;
            toast.success('Configurações salvas com sucesso!');
        } catch (err) {
            console.error(err);
            toast.error('Erro ao salvar configurações.');
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalContent;
        }
    };

    (window as any).previewLogoChange = (input: HTMLInputElement) => {
        if (input.files?.[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.getElementById('cat-logo-preview') as HTMLImageElement;
                if (preview) {
                    preview.src = e.target?.result as string;
                    preview.style.display = 'block';
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    };

    // Set initial link
    setTimeout(() => {
        updateCatalogLinkDisplay(selectedStoreId);
        // Store switcher
        const storeSelect = document.getElementById('cat-store-select') as HTMLSelectElement;
        if (storeSelect) {
            storeSelect.onchange = () => (window as any).switchCatalogStore(storeSelect.value);
        }
    }, 100);

    const currentLink = `${window.location.origin}/catalog/${selectedStoreId}`;

    return `
        <style>
            .settings-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 24px;
            }
            @media (max-width: 768px) { .settings-grid { grid-template-columns: 1fr; } }

            .color-row {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .color-row input[type="color"] {
                width: 48px;
                height: 48px;
                border: 2px solid var(--border-color);
                border-radius: 10px;
                cursor: pointer;
                background: transparent;
                padding: 3px;
            }
            .color-label { font-size: 0.85rem; color: var(--text-muted); }

            .logo-upload-area {
                border: 2px dashed var(--border-color);
                border-radius: 12px;
                padding: 24px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s;
            }
            .logo-upload-area:hover { border-color: var(--primary); background: rgba(99,102,241,0.03); }

            .catalog-link-box {
                display: flex;
                gap: 10px;
                align-items: center;
                background: rgba(99,102,241,0.08);
                border: 1px dashed var(--primary);
                border-radius: 12px;
                padding: 12px 16px;
            }
            .catalog-link-box input {
                flex: 1;
                background: transparent;
                border: none;
                color: white;
                font-size: 0.85rem;
                outline: none;
            }

            .section-card {
                background: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: 16px;
                padding: 24px;
            }
            .section-card h3 {
                margin: 0 0 20px 0;
                font-size: 1rem;
                font-weight: 700;
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--text-main);
            }
            .section-card h3 i { color: var(--primary); }
        </style>

        <div class="page-header" style="flex-direction: column; align-items: flex-start; gap: 8px;">
            <h2 class="page-title">Configurações do Catálogo</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Personalize a aparência e comportamento do seu catálogo público.</p>
        </div>

        ${stores.length > 1 ? `
        <div class="card" style="margin-bottom: 20px;">
            <div class="form-group" style="margin: 0;">
                <label>Editar configurações da loja:</label>
                <select id="cat-store-select" style="background: var(--bg-color); border: 1px solid var(--border-color); color: white; padding: 10px 14px; border-radius: 8px; font-size: 0.95rem; width: 100%; max-width: 300px; margin-top: 8px;">
                    ${stores.map((s: any) => `<option value="${s.id}" ${s.id === selectedStoreId ? 'selected' : ''}>${s.name}</option>`).join('')}
                </select>
            </div>
        </div>
        ` : ''}

        <!-- Catalog Link -->
        <div class="card" style="margin-bottom: 20px;">
            <label style="font-weight: 700; font-size: 0.85rem; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 12px;">
                <i class="fa-solid fa-link" style="color: var(--primary); margin-right: 6px;"></i>Link do Catálogo
            </label>
            <div class="catalog-link-box">
                <i class="fa-solid fa-store" style="color: var(--primary);"></i>
                <input type="text" id="cat-link-display" value="${currentLink}" readonly>
                <button class="btn-primary" style="padding: 8px 14px; font-size: 0.85rem; flex-shrink: 0;" onclick="window.copyCatalogLink()">
                    <i class="fa-solid fa-copy"></i> Copiar
                </button>
                <a href="${currentLink}" target="_blank" class="btn-secondary" style="padding: 8px 14px; font-size: 0.85rem; flex-shrink: 0;">
                    <i class="fa-solid fa-external-link"></i>
                </a>
            </div>
        </div>

        <div class="settings-grid">
            <!-- Design -->
            <div class="section-card">
                <h3><i class="fa-solid fa-palette"></i> Aparência</h3>

                <div class="form-group">
                    <label>Logo da Loja</label>
                    <div class="logo-upload-area" onclick="document.getElementById('cat-logo-file').click()">
                        <input type="file" id="cat-logo-file" accept="image/*" style="display:none;" onchange="window.previewLogoChange(this)">
                        <img id="cat-logo-preview" src="${design.logoUrl || ''}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; display: ${design.logoUrl ? 'block' : 'none'}; margin: 0 auto 12px;" alt="Logo">
                        <div>
                            <i class="fa-solid fa-cloud-arrow-up" style="font-size: 1.5rem; color: var(--primary); margin-bottom: 8px; display: block;"></i>
                            <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">Clique para enviar a logo</p>
                            <small style="color: var(--text-dim);">PNG ou JPG recomendado — aparece no topo do catálogo</small>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label>Cor Principal</label>
                    <div class="color-row">
                        <input type="color" id="cat-primary-color" value="${design.primaryColor || '#6366f1'}">
                        <span class="color-label">Botões, destaques e ícones do catálogo</span>
                    </div>
                </div>

                <div class="form-group">
                    <label>Cor de Fundo</label>
                    <div class="color-row">
                        <input type="color" id="cat-secondary-color" value="${design.secondaryColor || '#0f172a'}">
                        <span class="color-label">Cor de fundo do catálogo</span>
                    </div>
                </div>
            </div>

            <!-- Contact & Payment -->
            <div style="display: flex; flex-direction: column; gap: 24px;">
                <div class="section-card">
                    <h3><i class="fa-brands fa-whatsapp"></i> Contato</h3>
                    <div class="form-group" style="margin: 0;">
                        <label>Número de WhatsApp</label>
                        <input type="text" id="cat-whatsapp" value="${design.whatsapp || ''}" placeholder="5511999999999" style="width: 100%;">
                        <small style="color: var(--text-dim);">Com código do país. Exibido como botão flutuante no catálogo.</small>
                    </div>
                </div>

                <div class="section-card">
                    <h3><i class="fa-solid fa-money-bill-wave"></i> Pagamento</h3>

                    <div class="form-group">
                        <label>Chave PIX</label>
                        <input type="text" id="cat-pix-key" value="${design.pixKey || ''}" placeholder="CPF, email, telefone ou chave aleatória" style="width: 100%;">
                        <small style="color: var(--text-dim);">Exibida ao cliente ao escolher pagar via PIX.</small>
                    </div>

                    <div style="padding: 14px; border-radius: 10px; background: ${hasMercadoPago ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)'}; border: 1px solid ${hasMercadoPago ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}; margin-top: 8px; display: flex; align-items: center; gap: 12px;">
                        <i class="fa-solid ${hasMercadoPago ? 'fa-circle-check' : 'fa-circle-xmark'}" style="color: ${hasMercadoPago ? '#10b981' : '#ef4444'}; font-size: 1.2rem;"></i>
                        <div>
                            <p style="margin: 0; font-weight: 600; font-size: 0.9rem;">Mercado Pago</p>
                            <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted);">
                                ${hasMercadoPago
            ? 'Integração ativa — pagamento online disponível no catálogo.'
            : 'Não configurado. <a href="/mercado-pago" style="color: var(--primary);">Configurar agora →</a>'
        }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="margin-top: 24px; display: flex; justify-content: flex-end;">
            <button id="btn-save-catalog-settings" class="btn-primary" style="min-width: 180px; display: flex; align-items: center; justify-content: center; gap: 8px;" onclick="window.saveCatalogSettings()">
                <i class="fa-solid fa-save"></i> Salvar Configurações
            </button>
        </div>
    `;
};
