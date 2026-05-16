import { dbService } from '../services/db';
import { cartService } from '../services/cartService';
import { authService } from '../services/auth';
import { notifications } from '../services/notifications';
import { api } from '../services/api';
import { storage } from '../firebase/config';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Universal Checkout Component
 * This component provides a global checkout flow that can be triggered from any page.
 * It fetches the specific store configuration to adapt the experience.
 */
export const CityCheckout = () => {
    let currentStoreId = '';
    let company: any = null;
    let config: any = null;
    let flatBairros: { nome: string, preco: number }[] = [];
    let cuponsList: any[] = [];
    let appliedCoupon: any = null;
    let storeIsOpen = true;
    let permitirEntrega = true;
    let pixKey = '';
    let isMpActive = false;
    let storeName = '';

    const openModal = (id: string) => {
        const m = document.getElementById(id);
        if (m) m.style.display = 'flex';
    };

    const closeModal = (id: string) => {
        const m = document.getElementById(id);
        if (m) m.style.display = 'none';
    };

    const MODAL_BASE = `position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);z-index:9999;display:none;align-items:center;justify-content:center;padding:15px;color:white;font-family:'Montserrat',sans-serif;`;
    const MODAL_CARD = `background:#0f172a;width:100%;max-width:450px;border-radius:28px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,0.5);position:relative;`;
    const MODAL_HEADER = (title: string, closeFn: string) => `
        <div style="padding:24px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center;">
            <h3 style="margin:0;font-size:1.25rem;font-weight:800;letter-spacing:-0.5px;color:white;">${title}</h3>
            <button onclick="${closeFn}" style="background:rgba(255,255,255,0.05);border:none;width:36px;height:36px;border-radius:50%;color:#94a3b8;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:0.3s;"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div style="padding:24px;">
    `;
    const BTN_PRIMARY = (id: string, fn: string, text: string) => `
        <button id="${id}" onclick="${fn}" style="width:100%;padding:18px;border-radius:18px;background:#00875A;color:white;border:none;cursor:pointer;font-weight:800;font-size:1.1rem;transition:all 0.3s;box-shadow:0 10px 20px rgba(0,135,90,0.25);display:flex;align-items:center;justify-content:center;gap:12px;">
            ${text}
        </button>
    `;

    const getDiaSemana = () => ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'][new Date().getDay()];

    const isStoreOpen = () => {
        if (!config?.horario_funcionamento) return true;
        const hj = getDiaSemana();
        const h = config.horario_funcionamento[hj];
        if (!h || h.ativo === false || h.aberto === false) return false;
        try {
            const agora = new Date();
            const hrAtual = agora.getHours() * 60 + agora.getMinutes();
            const [hIni, mIni] = (h.inicio || '00:00').split(':').map(Number);
            const [hFim, mFim] = (h.fim || '23:59').split(':').map(Number);
            return hrAtual >= (hIni * 60 + mIni) && hrAtual <= (hFim * 60 + mFim);
        } catch (e) { return true; }
    };

    const isFreteAbertoAgora = () => {
        if (!config?.frete_ativo) return false;
        if (!config?.horario_frete) return isStoreOpen();
        const hj = getDiaSemana();
        const h = config.horario_frete[hj];
        if (!h || h.ativo === false || h.aberto === false) return false;
        try {
            const agora = new Date();
            const hrAtual = agora.getHours() * 60 + agora.getMinutes();
            const [hIni, mIni] = (h.inicio || '00:00').split(':').map(Number);
            const [hFim, mFim] = (h.fim || '23:59').split(':').map(Number);
            return hrAtual >= (hIni * 60 + mIni) && hrAtual <= (hFim * 60 + mFim);
        } catch (e) { return isStoreOpen(); }
    };

    const getNextOpenTime = (): string => {
        if (!config?.horario_funcionamento) return '';
        const dias = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];
        const hojeIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
        for (let i = 0; i < 7; i++) {
            const idx = (hojeIdx + i) % 7;
            const dia = dias[idx];
            const h = config.horario_funcionamento[dia];
            if (h && h.ativo !== false && h.aberto !== false) return `${dia.toUpperCase()} às ${h.inicio}`;
        }
        return '';
    };

    const getSubtotal = () => cartService.getTotal();
    const getTaxaValue = () => {
        if ((window as any).catDeliveryType === 'retirada') return 0;
        return (window as any).catTaxaBairro || 0;
    };
    const getTaxaNome = () => {
        if ((window as any).catDeliveryType === 'retirada') return 'Retirada';
        return (window as any).catSelectedBairro ? `Entrega (${(window as any).catSelectedBairro})` : 'Taxa de Entrega';
    };
    const getDescontoValue = (subtotal: number) => {
        if (!appliedCoupon) return 0;
        return appliedCoupon.tipo === 'percent' ? (subtotal * appliedCoupon.desconto / 100) : appliedCoupon.desconto;
    };

    const renderOrderSummary = () => {
        const subtotal = getSubtotal();
        const taxa = getTaxaValue();
        const desconto = getDescontoValue(subtotal);
        const total = subtotal + taxa - desconto;
        let html = '';
        cartService.getItems().forEach((item) => {
            html += `<div style="display:flex;justify-content:space-between;font-size:0.88rem;padding:4px 0;color:#94a3b8;"><span>${item.qty}x ${item.name}</span><span>R$ ${(item.price * item.qty).toFixed(2)}</span></div>`;
        });
        if (taxa > 0) {
            html += `<div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:4px 0;color:#64748b;"><span><i class="fa-solid fa-truck" style="margin-right:4px;"></i>${getTaxaNome()}</span><span>+ R$ ${taxa.toFixed(2)}</span></div>`;
        }
        if (desconto > 0 && appliedCoupon) {
            html += `<div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:4px 0;color:#10b981;"><span><i class="fa-solid fa-tag" style="margin-right:4px;"></i>Cupom ${appliedCoupon.codigo}</span><span>- R$ ${desconto.toFixed(2)}</span></div>`;
        }
        html += `<div style="display:flex;justify-content:space-between;font-weight:800;font-size:1.1rem;border-top:1px solid rgba(255,255,255,0.08);margin-top:10px;padding-top:10px;color:white;"><span>Total</span><span style="color:#00875A;">R$ ${total.toFixed(2)}</span></div>`;
        return html;
    };

    // ── Global Interface ──
    (window as any).startCheckout = async (storeId: string) => {
        if (cartService.getQuantity() === 0) return;

        // LOGIN OBRIGATÓRIO
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
            // Salva destino para redirecionar após login
            localStorage.setItem('checkout_return_url', window.location.pathname + '?checkout=true');
            if (!document.getElementById('universal-checkout-container')) {
                const container = document.createElement('div');
                container.id = 'universal-checkout-container';
                container.innerHTML = generateModalsHtml();
                document.body.appendChild(container);
            }
            openModal('login-required-modal');
            return;
        }
        if (currentUser.role !== 'user') {
            if (!document.getElementById('universal-checkout-container')) {
                const container = document.createElement('div');
                container.id = 'universal-checkout-container';
                container.innerHTML = generateModalsHtml();
                document.body.appendChild(container);
            }
            openModal('not-customer-modal');
            return;
        }

        currentStoreId = storeId;

        // 1. Fetch Configs
        try {
            const lojaConfigs = await dbService.getAll('loja_config', { field: 'lojaId', operator: '==', value: storeId }) as any[];
            config = lojaConfigs[0] || {};
            
            const companyId = config.empresaId || cartService.getCompanyId();
            if (companyId) {
                company = await dbService.get('companies', companyId);
                storeName = company?.name || 'Loja';
            }

            // 2. Setup Data
            const bairrosEntrega: any[] = config?.bairrosEntrega || [];
            flatBairros = [];
            bairrosEntrega.forEach((b: any) => {
                const nomes = (b.bairros || '').split(',').map((s: string) => s.trim()).filter(Boolean);
                nomes.forEach((n: string) => flatBairros.push({ nome: n, preco: parseFloat(b.preco) || 0 }));
            });
            flatBairros.sort((a, b) => a.nome.localeCompare(b.nome));
            cuponsList = config?.cupons || [];
            pixKey = config.design?.pixKey || '';
            isMpActive = (!!company?.mercadoPagoToken) && (config.mercadoPagoActive !== false);
            permitirEntrega = config.frete_ativo !== false;
            storeIsOpen = isStoreOpen();

            // 3. Render Modals into Body if not exists
            if (!document.getElementById('universal-checkout-container')) {
                const container = document.createElement('div');
                container.id = 'universal-checkout-container';
                container.innerHTML = generateModalsHtml();
                document.body.appendChild(container);
            } else {
                // Update specific values even if modals exist
                document.getElementById('checkout-store-name')!.textContent = storeName;
            }

            // 4. Start Flow
            (window as any).goToDelivery();

        } catch (err) {
            console.error('Error starting checkout:', err);
            alert('Erro ao carregar configurações da loja. Tente novamente.');
        }
    };

    (window as any).goToDelivery = async () => {
        if (!storeIsOpen) {
            (window as any).showClosedAlert('store');
            return;
        }

        // Verify stocks
        for (const item of cartService.getItems()) {
            const freshProduct = await dbService.get('products', item.id) as any;
            if (!freshProduct || freshProduct.active === false || (freshProduct.stock != null && freshProduct.stock < item.qty)) {
                alert(`O produto "${item.name}" não possui quantidade suficiente em estoque.`);
                return;
            }
        }

        window.dispatchEvent(new CustomEvent('toggle-cart', { detail: false }));
        openModal('delivery-modal');
    };

    (window as any).catSelectDelivery = (type: 'entrega' | 'retirada') => {
        (window as any).catDeliveryType = type;
        document.getElementById('btn-sel-entrega')!.style.background = type === 'entrega' ? 'rgba(0,135,90,0.15)' : 'rgba(255,255,255,0.05)';
        document.getElementById('btn-sel-entrega')!.style.borderColor = type === 'entrega' ? '#00875A' : 'rgba(255,255,255,0.1)';
        document.getElementById('btn-sel-retirada')!.style.background = type === 'retirada' ? 'rgba(0,135,90,0.15)' : 'rgba(255,255,255,0.05)';
        document.getElementById('btn-sel-retirada')!.style.borderColor = type === 'retirada' ? '#00875A' : 'rgba(255,255,255,0.1)';
        document.getElementById('btn-confirm-delivery')!.style.opacity = '1';
        (document.getElementById('btn-confirm-delivery') as HTMLButtonElement).disabled = false;

        const warning = document.getElementById('frete-closed-warning');
        if (type === 'entrega' && !isFreteAbertoAgora()) {
            if (warning) warning.style.display = 'block';
        } else if (warning) {
            warning.style.display = 'none';
        }
    };

    (window as any).goToCustomer = () => {
        const type = (window as any).catDeliveryType;
        if (!type) return;
        if (type === 'entrega' && !permitirEntrega) {
            (window as any).showClosedAlert('delivery');
            return;
        }
        closeModal('delivery-modal');
        const addrGroup = document.getElementById('address-group');
        const bairroGroup = document.getElementById('bairro-group');
        if (addrGroup) addrGroup.style.display = type === 'entrega' ? 'block' : 'none';
        if (bairroGroup) bairroGroup.style.display = (type === 'entrega' && flatBairros.length > 0) ? 'block' : 'none';
        
        // Fill initial data
        const storageKey = `cat_user_${company?.id}`;
        const savedUser = JSON.parse(localStorage.getItem(storageKey) || '{}');
        const loggedUser = authService.getCurrentUser();
        
        const nameInp = document.getElementById('checkout-name') as HTMLInputElement;
        const phoneInp = document.getElementById('checkout-phone') as HTMLInputElement;
        const addrInp = document.getElementById('checkout-address') as HTMLInputElement;

        const bairroInp = document.getElementById('checkout-bairro') as HTMLInputElement;
        const taxaPreview = document.getElementById('taxa-preview');
        if (taxaPreview) taxaPreview.style.display = 'none';

        if (loggedUser && loggedUser.role === 'user') {
            if (nameInp) nameInp.value = loggedUser.name || '';
            if (phoneInp) phoneInp.value = loggedUser.phone || loggedUser.whatsapp || '';
            if (addrInp) addrInp.value = loggedUser.address || '';
        } else {
            if (nameInp && savedUser.name) nameInp.value = savedUser.name;
            if (phoneInp && savedUser.phone) phoneInp.value = savedUser.phone;
            if (addrInp && savedUser.address) addrInp.value = savedUser.address;
        }

        if (bairroInp && savedUser.bairro) {
            const saved = flatBairros.find(b => b.nome.toLowerCase() === (savedUser.bairro || '').toLowerCase());
            if (saved) {
                bairroInp.value = saved.nome;
                bairroInp.dataset.preco = saved.preco.toString();
                const previewValue = document.getElementById('taxa-preview-value');
                if (taxaPreview && previewValue) {
                    previewValue.textContent = saved.preco > 0 ? `R$ ${saved.preco.toFixed(2)}` : 'Grátis';
                    taxaPreview.style.display = 'flex';
                }
            }
        }

        openModal('customer-modal');
    };

    (window as any).catFilterBairros = (val: string) => {
        const list = document.getElementById('checkout-bairro-dropdown');
        if (!list) return;
        const taxaPreview = document.getElementById('taxa-preview');
        if (taxaPreview) taxaPreview.style.display = 'none';
        const filtered = val ? flatBairros.filter(b => b.nome.toLowerCase().includes(val.toLowerCase())) : flatBairros;
        if (filtered.length === 0) {
            list.innerHTML = '<div style="padding:12px;color:#ef4444;font-size:0.85rem;">Nenhum bairro encontrado</div>';
        } else {
            list.innerHTML = filtered.map(b => `<div onclick="window.catSelectBairro('${b.nome.replace(/'/g, "\\'")}', ${b.preco})" style="padding:12px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.05);color:white;font-size:0.9rem;">${b.nome} - R$ ${b.preco.toFixed(2)}</div>`).join('');
        }
        list.style.display = 'block';
    };

    (window as any).catSelectBairro = (nome: string, preco: number) => {
        const input = document.getElementById('checkout-bairro') as HTMLInputElement;
        if (input) { input.value = nome; input.dataset.preco = preco.toString(); }
        const list = document.getElementById('checkout-bairro-dropdown');
        if (list) list.style.display = 'none';

        const preview = document.getElementById('taxa-preview');
        const previewValue = document.getElementById('taxa-preview-value');
        if (preview && previewValue) {
            if (preco > 0) {
                previewValue.textContent = `R$ ${preco.toFixed(2)}`;
                preview.style.display = 'flex';
            } else {
                previewValue.textContent = 'Grátis';
                preview.style.display = 'flex';
            }
        }
    };

    (window as any).goToPayment = () => {
        const name = (document.getElementById('checkout-name') as HTMLInputElement)?.value.trim();
        const phone = (document.getElementById('checkout-phone') as HTMLInputElement)?.value.trim();
        const address = (document.getElementById('checkout-address') as HTMLInputElement)?.value.trim();
        const deliveryType = (window as any).catDeliveryType;

        let bairroNome = '';
        let bairroPreco = 0;

        if (deliveryType === 'entrega') {
            if (flatBairros.length > 0) {
                const bairroInput = document.getElementById('checkout-bairro') as HTMLInputElement;
                if (!bairroInput || !bairroInput.value.trim()) { alert('Selecione seu bairro.'); return; }
                bairroNome = bairroInput.value.trim();
                const validBairro = flatBairros.find(b => b.nome.toLowerCase() === bairroNome.toLowerCase());
                if (!validBairro) { alert('Bairro não listado.'); return; }
                bairroNome = validBairro.nome;
                bairroPreco = validBairro.preco;
            }
        }

        if (!name || !phone) { alert('Preencha nome e telefone.'); return; }
        
        let cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length !== 11) { notifications.showPhoneError(); return; }
        
        if (deliveryType === 'entrega' && !address) { alert('Preencha o endereço.'); return; }

        (window as any).catSelectedBairro = bairroNome;
        (window as any).catTaxaBairro = bairroPreco;

        const userData = { name, phone, address: address || '', bairro: bairroNome };
        (window as any).catCustomer = userData;
        localStorage.setItem(`cat_user_${company?.id}`, JSON.stringify(userData));

        closeModal('customer-modal');
        const summaryEl = document.getElementById('payment-order-summary');
        if (summaryEl) summaryEl.innerHTML = renderOrderSummary();

        document.getElementById('cat-coupon-section')!.style.display = cuponsList.length > 0 ? 'block' : 'none';
        
        const isMandatoryPickupPay = config?.pagamentoObrigatorioRetirada === true;
        const isDeliveryPayDisabled = config?.desativarPagamentoEntrega === true;

        const payDeliveryBtn = document.getElementById('btn-pay-delivery');
        if (payDeliveryBtn) {
            if (deliveryType === 'retirada' && isMandatoryPickupPay) payDeliveryBtn.style.display = 'none';
            else if (deliveryType === 'entrega' && isDeliveryPayDisabled) payDeliveryBtn.style.display = 'none';
            else payDeliveryBtn.style.display = 'flex';
        }

        document.getElementById('btn-pay-pix-manual')!.style.display = pixKey ? 'flex' : 'none';
        document.getElementById('btn-pay-pix-mp')!.style.display = isMpActive ? 'flex' : 'none';
        openModal('payment-modal');
    };

    const findOrCreateLead = async (name: string, phone: string): Promise<string | null> => {
        if (!company) return null;
        const currentUser = authService.getCurrentUser();
        const normalizedPhone = phone.replace(/\D/g, '');

        if (currentUser?.uid) {
            const byUser = await dbService.getAll('leads', [
                { field: 'companyId', operator: '==', value: company.id },
                { field: 'userId', operator: '==', value: currentUser.uid }
            ]) as any[];
            if (byUser.length > 0) {
                if (byUser[0].statusLead !== 'cliente_ativo')
                    await dbService.update('leads', byUser[0].id, { statusLead: 'cliente_ativo' });
                return byUser[0].id;
            }
        }

        const byPhone = await dbService.getAll('leads', [
            { field: 'companyId', operator: '==', value: company.id },
            { field: 'whatsapp', operator: '==', value: normalizedPhone }
        ]) as any[];
        if (byPhone.length > 0) {
            if (currentUser?.uid && !byPhone[0].userId)
                await dbService.update('leads', byPhone[0].id, { userId: currentUser.uid });
            if (byPhone[0].statusLead !== 'cliente_ativo')
                await dbService.update('leads', byPhone[0].id, { statusLead: 'cliente_ativo' });
            return byPhone[0].id;
        }

        return await dbService.create('leads', {
            name, nome: name,
            phone: normalizedPhone, telefone: normalizedPhone, whatsapp: normalizedPhone,
            companyId: company.id, userId: currentUser?.uid || null,
            lojaId: currentStoreId, origem: 'catalogo',
            statusLead: 'cliente_ativo', status: 'cliente_ativo',
            createdAt: new Date().toISOString(),
        }) as string;
    };

    const decrementStock = async (cartItems: ReturnType<typeof cartService.getItems>) => {
        for (const item of cartItems) {
            try { await api.patch(`/api/products/${item.id}/stock`, { qty: item.qty }); } catch {}
        }
    };

    const buildOrderBase = (customer: any, deliveryType: string, items: any[], subtotal: number, total: number, leadId?: string | null) => ({
        empresaId: company!.id,
        companyId: company!.id,
        lojaId: currentStoreId,
        storeId: currentStoreId,
        storeName: storeName,
        companyName: company!.name,
        userId: authService.getCurrentUser()?.uid || null,
        leadId: leadId || null,
        clientName: customer.name,
        clientPhone: customer.phone,
        endereco: customer.address,
        bairro: customer.bairro,
        entrega: deliveryType,
        nome: customer.name,
        items,
        total,
        taxaAplicada: getTaxaValue(),
        taxaNome: getTaxaNome(),
        desconto: getDescontoValue(subtotal),
        codigoCupom: appliedCoupon?.codigo || null,
        status: 'em_montagem',
        source: 'catalog',
        criadoEm: new Date().toISOString(),
    });

    (window as any).confirmOrderDelivery = async () => {
        const btn = document.getElementById('btn-pay-delivery') as HTMLButtonElement;
        if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processando...'; }
        try {
            if (!company) throw new Error('Configuração da loja não carregada. Feche e abra o carrinho novamente.');
            if (!isStoreOpen()) { (window as any).showClosedAlert('store'); return; }

            const customer = (window as any).catCustomer;
            const deliveryType = (window as any).catDeliveryType;
            const items = cartService.getItems().map(item => ({ productId: item.id, name: item.name, qty: item.qty, price: item.price, subtotal: item.price * item.qty }));
            const subtotal = getSubtotal();
            const total = subtotal + getTaxaValue() - getDescontoValue(subtotal);

            const paymentSubMethod = (window as any).catDeliveryPaymentMethod;
            const trocoVal = (document.getElementById('cat-troco-input') as HTMLInputElement)?.value;
            const troco = (paymentSubMethod === 'dinheiro' && trocoVal) ? parseFloat(trocoVal) : null;

            const leadId = await findOrCreateLead(customer.name, customer.phone);
            const orderData = {
                ...buildOrderBase(customer, deliveryType, items, subtotal, total, leadId),
                paymentMethod: 'na_entrega',
                paymentSubMethod,
                troco,
            };

            const orderId = await dbService.create('pedidos', orderData);
            await decrementStock(cartService.getItems());

            try {
                const { orderService } = await import('../services/orderService');
                await orderService.notifyNewOrder({ id: orderId, ...orderData }, company.id);
            } catch {}

            showConfirmation(orderId);
            cartService.clearCart();
            closeModal('payment-modal');
        } catch (err: any) {
            alert('Erro ao processar pedido: ' + (err.message || 'Tente novamente.'));
            if (btn) { btn.disabled = false; btn.innerHTML = '🤝 Pagar na Entrega / Retirada'; }
        }
    };

    const showConfirmation = (orderId: string) => {
        openModal('confirmation-modal');
        const el = document.getElementById('order-id-display');
        if (el) el.textContent = orderId.slice(0, 8).toUpperCase();
    };

    (window as any).catToggleDeliveryOptions = () => {
        const details = document.getElementById('delivery-payment-details');
        if (details) details.style.display = details.style.display === 'flex' ? 'none' : 'flex';
    };

    (window as any).catSelectDeliverySubMethod = (method: 'dinheiro' | 'cartao') => {
        (window as any).catDeliveryPaymentMethod = method;
        document.querySelectorAll('.btn-sub-method').forEach(b => (b as HTMLElement).style.background = 'rgba(255,255,255,0.05)');
        const btn = document.getElementById(`btn-sub-${method}`);
        if (btn) btn.style.background = 'rgba(0,135,90,0.3)';
        document.getElementById('troco-wrapper')!.style.display = method === 'dinheiro' ? 'block' : 'none';
        const confirmBtn = document.getElementById('btn-confirm-delivery-sub') as HTMLButtonElement;
        confirmBtn.disabled = false;
        confirmBtn.style.opacity = '1';
    };

    (window as any).catApplyCoupon = () => {
        const code = ((document.getElementById('cat-coupon-input') as HTMLInputElement)?.value || '').trim().toUpperCase();
        const found = cuponsList.find((c: any) => c.codigo === code && c.ativo !== false);
        const subtotal = getSubtotal();
        const msgEl = document.getElementById('cat-coupon-msg');
        if (!found || (found.valorMinimo > 0 && subtotal < found.valorMinimo)) {
            if (msgEl) { msgEl.textContent = 'Cupom inválido ou valor insuficiente.'; msgEl.style.color = '#ef4444'; }
            return;
        }
        appliedCoupon = found;
        if (msgEl) { msgEl.textContent = '✓ Código aplicado!'; msgEl.style.color = '#10b981'; }
        document.getElementById('payment-order-summary')!.innerHTML = renderOrderSummary();
    };

    (window as any).catToggleCoupon = () => {
        const wrapper = document.getElementById('cat-coupon-input-wrapper');
        if (wrapper) wrapper.style.display = wrapper.style.display === 'block' ? 'none' : 'block';
    };

    (window as any).copyPixKey = () => {
        navigator.clipboard.writeText(pixKey).then(() => {
            const btn = document.getElementById('btn-copy-pix');
            if (btn) { btn.textContent = '✓ Copiado!'; setTimeout(() => { btn.textContent = 'Copiar'; }, 2000); }
        });
    };

    (window as any).confirmPixManual = async () => {
        const btn = document.getElementById('btn-confirm-pix-manual') as HTMLButtonElement;
        btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Confirmando...';
        try {
            if (!company) throw new Error('Configuração da loja não carregada. Feche e abra o carrinho novamente.');

            const customer = (window as any).catCustomer;
            const deliveryType = (window as any).catDeliveryType;

            let comprovanteUrl = '';
            const fileInput = document.getElementById('pix-comprovante-input') as HTMLInputElement;
            if (fileInput?.files?.[0]) {
                const file = fileInput.files[0];
                const path = `comprovantes/${company.id}/${Date.now()}_${file.name}`;
                const fileRef = storageRef(storage, path);
                await uploadBytes(fileRef, file);
                comprovanteUrl = await getDownloadURL(fileRef);
            }

            const items = cartService.getItems().map(item => ({ productId: item.id, name: item.name, qty: item.qty, price: item.price, subtotal: item.price * item.qty }));
            const subtotal = getSubtotal();
            const total = subtotal + getTaxaValue() - getDescontoValue(subtotal);

            const leadId = await findOrCreateLead(customer.name, customer.phone);
            const orderData = {
                ...buildOrderBase(customer, deliveryType, items, subtotal, total, leadId),
                paymentMethod: 'pix_manual',
                comprovanteUrl,
            };

            const orderId = await dbService.create('pedidos', orderData);
            await decrementStock(cartService.getItems());
            try {
                const { orderService } = await import('../services/orderService');
                await orderService.notifyNewOrder({ id: orderId, ...orderData }, company.id);
            } catch {}

            showConfirmation(orderId);
            cartService.clearCart();
            closeModal('pix-manual-modal');
        } catch (err: any) { alert(err.message || 'Erro ao confirmar pedido.'); btn.disabled = false; btn.innerHTML = 'Confirmar Pagamento PIX'; }
    };

    (window as any).confirmPixMercadoPago = async () => {
        const btn = document.getElementById('btn-pay-pix-mp') as HTMLButtonElement;
        btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Gerando PIX...';
        try {
            if (!company) throw new Error('Configuração da loja não carregada. Feche e abra o carrinho novamente.');

            const customer = (window as any).catCustomer;
            const deliveryType = (window as any).catDeliveryType;
            const items = cartService.getItems().map(item => ({ productId: item.id, name: item.name, qty: item.qty, price: item.price, subtotal: item.price * item.qty }));
            const subtotal = getSubtotal();
            const total = subtotal + getTaxaValue() - getDescontoValue(subtotal);

            const mpWebhookUrl = (import.meta.env.VITE_MP_WEBHOOK_URL as string) || 'https://n8n.vps.pequi.digital/webhook/autoqui-pix-catalog';
            let mpData: any = null;
            try {
                const response = await fetch(mpWebhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ companyId: company.id, storeId: currentStoreId, items, total, clientName: customer.name, clientPhone: customer.phone, accessToken: company.mercadoPagoToken })
                });
                if (response.ok) mpData = await response.json();
            } catch { /* webhook indisponível, cria pedido sem MP */ }

            const leadId = await findOrCreateLead(customer.name, customer.phone);
            const orderData = {
                ...buildOrderBase(customer, deliveryType, items, subtotal, total, leadId),
                paymentMethod: 'pix_mercadopago',
                mpPaymentId: mpData?.payment_id || '',
            };

            const orderId = await dbService.create('pedidos', orderData);
            await decrementStock(cartService.getItems());
            try {
                const { orderService } = await import('../services/orderService');
                await orderService.notifyNewOrder({ id: orderId, ...orderData }, company.id);
            } catch {}

            cartService.clearCart();
            closeModal('payment-modal');

            if (mpData?.qr_code_base64 || mpData?.qr_code_text) {
                (window as any).openMpPix(mpData, orderId);
            } else {
                showConfirmation(orderId);
            }
        } catch (err: any) { alert(err.message || 'Erro ao gerar PIX.'); btn.disabled = false; btn.innerHTML = 'Mercado Pago (PIX)'; }
    };

    (window as any).openMpPix = (data: any, orderId: string) => {
        openModal('mp-pix-modal');
        const img = document.getElementById('mp-qr-img') as HTMLImageElement;
        const code = document.getElementById('mp-qr-code');
        if (img && data.qr_code_base64) { img.src = `data:image/png;base64,${data.qr_code_base64}`; img.style.display = 'block'; }
        if (code) code.textContent = data.qr_code_text;
        (window as any).currentMpOrderId = orderId;
    };

    (window as any).copyMpQrCode = () => {
        const code = document.getElementById('mp-qr-code')?.textContent;
        if (code) navigator.clipboard.writeText(code).then(() => alert('Código PIX copiado!'));
    };

    (window as any).closeMpPix = () => {
        closeModal('mp-pix-modal');
        if ((window as any).currentMpOrderId) showConfirmation((window as any).currentMpOrderId);
    };

    (window as any).previewComprovante = (input: HTMLInputElement) => {
        const file = input.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.getElementById('comprovante-preview') as HTMLImageElement;
                if (img) { img.src = e.target?.result as string; img.style.display = 'block'; }
                document.getElementById('comprovante-label')!.textContent = file.name;
            };
            reader.readAsDataURL(file);
        }
    };

    (window as any).closePixManual = () => closeModal('pix-manual-modal');
    (window as any).showPixManual = () => { closeModal('payment-modal'); document.getElementById('pix-manual-summary')!.innerHTML = renderOrderSummary(); document.getElementById('pix-key-value')!.textContent = pixKey; openModal('pix-manual-modal'); };

    (window as any).showClosedAlert = (type: 'store' | 'delivery') => {
        const titleEl = document.getElementById('closed-alert-title');
        const descEl = document.getElementById('closed-alert-desc');
        if (type === 'store') {
            if (titleEl) titleEl.textContent = 'Loja Fechada';
            const next = getNextOpenTime();
            if (descEl) descEl.textContent = next ? `Reabrimos ${next}.` : 'A loja está fechada no momento.';
        } else {
            if (titleEl) titleEl.textContent = 'Entrega Indisponível';
            if (descEl) descEl.textContent = 'O serviço de entrega não está disponível agora. Tente a opção de retirada.';
        }
        openModal('closed-alert-modal');
    };

    // ── Helper HTML Generator ──
    const generateModalsHtml = () => `
        <div id="login-required-modal" style="${MODAL_BASE}">
            <div style="${MODAL_CARD}text-align:center;padding:40px 28px;">
                <div style="width:72px;height:72px;border-radius:50%;background:rgba(0,135,90,0.1);border:2px solid rgba(0,135,90,0.2);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
                    <i class="fa-solid fa-lock" style="font-size:2rem;color:#00875A;"></i>
                </div>
                <h2 style="margin:0 0 10px;font-size:1.4rem;font-weight:800;color:white;">Login Necessário</h2>
                <p style="color:#94a3b8;margin-bottom:28px;font-size:0.95rem;line-height:1.5;">Para realizar um pedido, você precisa estar logado com sua conta de cliente.</p>
                <div style="display:flex;flex-direction:column;gap:12px;">
                    <button onclick="localStorage.setItem('checkout_return_url',window.location.pathname);window.location.href='/login'" style="width:100%;padding:16px;border-radius:16px;background:#00875A;color:white;border:none;cursor:pointer;font-weight:800;font-size:1rem;">
                        <i class="fa-solid fa-right-to-bracket"></i> Fazer Login
                    </button>
                    <button onclick="localStorage.setItem('checkout_return_url',window.location.pathname);window.location.href='/register'" style="width:100%;padding:14px;border-radius:16px;background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);cursor:pointer;font-weight:700;font-size:0.95rem;">
                        <i class="fa-solid fa-user-plus"></i> Criar Conta Grátis
                    </button>
                    <button onclick="document.getElementById('login-required-modal').style.display='none'" style="background:none;border:none;color:#475569;cursor:pointer;font-size:0.85rem;padding:8px;">
                        Continuar navegando
                    </button>
                </div>
            </div>
        </div>

        <div id="not-customer-modal" style="${MODAL_BASE}">
            <div style="${MODAL_CARD}text-align:center;padding:40px 28px;">
                <div style="width:72px;height:72px;border-radius:50%;background:rgba(245,158,11,0.1);border:2px solid rgba(245,158,11,0.2);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size:2rem;color:#f59e0b;"></i>
                </div>
                <h2 style="margin:0 0 10px;font-size:1.4rem;font-weight:800;color:white;">Conta Parceiro Detectada</h2>
                <p style="color:#94a3b8;margin-bottom:28px;font-size:0.95rem;line-height:1.5;">Você está logado com uma conta de parceiro ou administrador. Para realizar pedidos, use uma conta de cliente.</p>
                <button onclick="document.getElementById('not-customer-modal').style.display='none'" style="width:100%;padding:16px;border-radius:16px;background:rgba(255,255,255,0.05);color:white;border:1px solid rgba(255,255,255,0.1);cursor:pointer;font-weight:700;">
                    Entendi
                </button>
            </div>
        </div>

        <div id="closed-alert-modal" style="${MODAL_BASE}">
            <div style="${MODAL_CARD}text-align:center;padding:40px 20px;">
                <h2 id="closed-alert-title">Loja Fechada</h2>
                <p id="closed-alert-desc" style="color:#94a3b8;"></p>
                <button onclick="document.getElementById('closed-alert-modal').style.display='none'" style="margin-top:20px;padding:12px 24px;border-radius:12px;background:#00875A;border:none;color:white;cursor:pointer;">Entendido</button>
            </div>
        </div>

        <div id="delivery-modal" style="${MODAL_BASE}">
            <div style="${MODAL_CARD}">
                ${MODAL_HEADER('<i class="fa-solid fa-truck-fast"></i> Como prefere receber?', "document.getElementById('delivery-modal').style.display='none'")}
                <p style="color:#94a3b8;font-size:0.9rem;margin-bottom:20px;">Escolha entre entrega no seu endereço ou retirada na unidade: <strong id="checkout-store-name">${storeName}</strong></p>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px;">
                    <button id="btn-sel-entrega" onclick="window.catSelectDelivery('entrega')" style="padding:24px 15px;border-radius:20px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:white;cursor:pointer;transition:0.3s;display:flex;flex-direction:column;align-items:center;gap:10px;">
                        <i class="fa-solid fa-motorcycle" style="font-size:1.5rem;"></i><span style="font-weight:700;">Entrega</span>
                    </button>
                    <button id="btn-sel-retirada" onclick="window.catSelectDelivery('retirada')" style="padding:24px 15px;border-radius:20px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:white;cursor:pointer;transition:0.3s;display:flex;flex-direction:column;align-items:center;gap:10px;">
                        <i class="fa-solid fa-store" style="font-size:1.5rem;"></i><span style="font-weight:700;">Retirada</span>
                    </button>
                </div>
                <div id="frete-closed-warning" style="display:none;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.2);border-radius:12px;padding:12px;margin-bottom:20px;color:#f59e0b;font-size:0.85rem;">
                    <i class="fa-solid fa-triangle-exclamation"></i> O serviço de entrega não está disponível agora.
                </div>
                ${BTN_PRIMARY('btn-confirm-delivery', 'window.goToCustomer()', 'Continuar <i class="fa-solid fa-arrow-right"></i>')}
            </div>
        </div>

        <div id="customer-modal" style="${MODAL_BASE}">
            <div style="${MODAL_CARD}">
                ${MODAL_HEADER('<i class="fa-solid fa-user"></i> Seus Dados', "document.getElementById('customer-modal').style.display='none'")}
                <div style="margin-bottom:16px;">
                    <label style="display:block;font-size:0.8rem;color:#94a3b8;font-weight:700;margin-bottom:8px;">Seu Nome</label>
                    <input type="text" id="checkout-name" placeholder="Como podemos te chamar?" style="width:100%;padding:14px;border-radius:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:white;outline:none;">
                </div>
                <div style="margin-bottom:16px;">
                    <label style="display:block;font-size:0.8rem;color:#94a3b8;font-weight:700;margin-bottom:8px;">Seu WhatsApp</label>
                    <input type="tel" id="checkout-phone" placeholder="DDD + Número" style="width:100%;padding:14px;border-radius:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:white;outline:none;">
                </div>
                <div id="address-group" style="margin-bottom:16px;">
                    <label style="display:block;font-size:0.8rem;color:#94a3b8;font-weight:700;margin-bottom:8px;">Endereço</label>
                    <input type="text" id="checkout-address" placeholder="Rua, Número, Complemento" style="width:100%;padding:14px;border-radius:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:white;outline:none;">
                </div>
                <div id="bairro-group" style="margin-bottom:8px;position:relative;">
                    <label style="display:block;font-size:0.8rem;color:#94a3b8;font-weight:700;margin-bottom:8px;">Bairro</label>
                    <input type="text" id="checkout-bairro" onfocus="window.catFilterBairros(this.value)" oninput="window.catFilterBairros(this.value)" placeholder="Digite seu bairro..." style="width:100%;padding:14px;border-radius:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:white;outline:none;">
                    <div id="checkout-bairro-dropdown" style="position:absolute;top:100%;left:0;right:0;background:#1e293b;border:1px solid rgba(255,255,255,0.1);border-radius:12px;max-height:180px;overflow-y:auto;z-index:100;display:none;"></div>
                </div>
                <div id="taxa-preview" style="display:none;margin-bottom:20px;padding:12px 14px;border-radius:12px;background:rgba(0,135,90,0.1);border:1px solid rgba(0,135,90,0.25);display:flex;justify-content:space-between;align-items:center;">
                    <span style="color:#94a3b8;font-size:0.85rem;"><i class="fa-solid fa-truck" style="margin-right:6px;color:#00875A;"></i>Taxa de entrega</span>
                    <span id="taxa-preview-value" style="color:#00875A;font-weight:800;font-size:0.95rem;"></span>
                </div>
                ${BTN_PRIMARY('btn-confirm-customer', 'window.goToPayment()', 'Ver Formas de Pagamento')}
            </div>
        </div>

        <div id="payment-modal" style="${MODAL_BASE}">
            <div style="${MODAL_CARD}">
                ${MODAL_HEADER('<i class="fa-solid fa-credit-card"></i> Pagamento', "document.getElementById('payment-modal').style.display='none'")}
                <div id="payment-order-summary" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:16px;padding:16px;margin-bottom:20px;"></div>
                
                <div id="cat-coupon-section" style="display:none;margin-bottom:16px;">
                    <button onclick="window.catToggleCoupon()" style="background:none;border:none;color:#00875A;font-size:0.85rem;font-weight:700;cursor:pointer;margin-bottom:8px;">Tenho um cupom</button>
                    <div id="cat-coupon-input-wrapper" style="display:none;gap:10px;">
                        <input id="cat-coupon-input" type="text" placeholder="Código" style="flex:1;padding:10px;border-radius:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:white;text-transform:uppercase;">
                        <button onclick="window.catApplyCoupon()" style="padding:10px 15px;background:#00875A;color:white;border:none;border-radius:10px;font-weight:700;">Aplicar</button>
                    </div>
                    <p id="cat-coupon-msg" style="font-size:0.75rem;margin-top:4px;"></p>
                </div>

                <div style="display:flex;flex-direction:column;gap:12px;">
                    <button id="btn-pay-delivery" onclick="window.catToggleDeliveryOptions()" style="width:100%;padding:16px;border-radius:16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:white;cursor:pointer;display:flex;align-items:center;gap:15px;font-weight:700;">
                        <i class="fa-solid fa-handshake" style="font-size:1.2rem;color:#00875A;"></i><span>Pagar na Entrega / Retirada</span>
                    </button>
                    
                    <div id="delivery-payment-details" style="display:none;padding:15px;background:rgba(255,255,255,0.03);border-radius:16px;flex-direction:column;gap:12px;margin-top:-8px;">
                        <div style="display:flex;gap:10px;">
                            <button id="btn-sub-dinheiro" onclick="window.catSelectDeliverySubMethod('dinheiro')" class="btn-sub-method" style="flex:1;padding:12px;border-radius:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:white;cursor:pointer;font-weight:700;">Dinheiro</button>
                            <button id="btn-sub-cartao" onclick="window.catSelectDeliverySubMethod('cartao')" class="btn-sub-method" style="flex:1;padding:12px;border-radius:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:white;cursor:pointer;font-weight:700;">Cartão</button>
                        </div>
                        <div id="troco-wrapper" style="display:none;">
                            <input type="number" id="cat-troco-input" placeholder="Troco para quanto?" style="width:100%;padding:12px;border-radius:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:white;outline:none;">
                        </div>
                        ${BTN_PRIMARY('btn-confirm-delivery-sub', 'window.confirmOrderDelivery()', 'Confirmar Pedido')}
                    </div>

                    <button id="btn-pay-pix-manual" onclick="window.showPixManual()" style="display:none;padding:16px;border-radius:16px;background:rgba(16,185,129,0.08);color:#10b981;border:1px solid rgba(16,185,129,0.2);cursor:pointer;display:flex;align-items:center;gap:15px;font-weight:700;">
                        <i class="fa-brands fa-pix" style="font-size:1.2rem;"></i><span>Pagar via PIX (Manual)</span>
                    </button>
                    <button id="btn-pay-pix-mp" onclick="window.confirmPixMercadoPago()" style="display:none;padding:16px;border-radius:16px;background:#009ee3;color:white;border:none;cursor:pointer;display:flex;align-items:center;gap:15px;font-weight:700;">
                        <i class="fa-solid fa-credit-card"></i><span>Mercado Pago (PIX)</span>
                    </button>
                </div>
            </div>
        </div>

        <div id="pix-manual-modal" style="${MODAL_BASE}">
            <div style="${MODAL_CARD}">
                ${MODAL_HEADER('<i class="fa-brands fa-pix"></i> Pagamento PIX', 'window.closePixManual()')}
                <div id="pix-manual-summary" style="padding:15px;background:rgba(255,255,255,0.03);border-radius:16px;margin-bottom:15px;"></div>
                <div style="background:rgba(16,185,129,0.1);padding:15px;border-radius:16px;margin-bottom:15px;text-align:center;">
                    <p style="color:#10b981;font-weight:700;margin-bottom:10px;">Chave PIX:</p>
                    <p id="pix-key-value" style="font-family:monospace;font-size:1.1rem;margin-bottom:15px;word-break:break-all;"></p>
                    <button id="btn-copy-pix" onclick="window.copyPixKey()" style="padding:10px 20px;border-radius:10px;background:#10b981;color:white;border:none;cursor:pointer;font-weight:700;">Copiar Chave</button>
                </div>
                <div style="margin-bottom:20px;">
                    <label style="display:block;font-size:0.8rem;color:#94a3b8;margin-bottom:10px;">Anexar Comprovante (opcional)</label>
                    <input type="file" id="pix-comprovante-input" accept="image/*" onchange="window.previewComprovante(this)" style="width:100%;padding:10px;background:rgba(255,255,255,0.05);border-radius:10px;color:#94a3b8;">
                    <img id="comprovante-preview" style="max-width:100%;max-height:150px;border-radius:10px;display:none;margin-top:10px;">
                    <p id="comprovante-label" style="font-size:0.75rem;margin-top:5px;color:#94a3b8;"></p>
                </div>
                ${BTN_PRIMARY('btn-confirm-pix-manual', 'window.confirmPixManual()', 'Confirmar Pagamento')}
            </div>
        </div>

        <div id="mp-pix-modal" style="${MODAL_BASE}">
            <div style="${MODAL_CARD}text-align:center;padding:30px;">
                ${MODAL_HEADER('<i class="fa-solid fa-qrcode"></i> QR Code PIX', 'window.closeMpPix()')}
                <div id="mp-pix-summary" style="text-align:left;padding:15px;background:rgba(255,255,255,0.03);border-radius:16px;margin-bottom:15px;"></div>
                <img id="mp-qr-img" style="width:200px;height:200px;margin:0 auto 20px;border-radius:15px;background:white;padding:10px;">
                <p style="color:#94a3b8;font-size:0.9rem;margin-bottom:15px;">Copie o código abaixo:</p>
                <div style="background:rgba(255,255,255,0.05);padding:15px;border-radius:12px;margin-bottom:15px;">
                    <p id="mp-qr-code" style="font-family:monospace;font-size:0.75rem;word-break:break-all;color:#94a3b8;"></p>
                </div>
                <button onclick="window.copyMpQrCode()" style="width:100%;padding:15px;border-radius:15px;background:#009ee3;color:white;border:none;font-weight:800;cursor:pointer;">Copiar Código PIX</button>
            </div>
        </div>

        <div id="confirmation-modal" style="${MODAL_BASE}">
            <div style="${MODAL_CARD}text-align:center;padding:48px 32px;">
                <div style="width:80px;height:80px;border-radius:50%;background:rgba(16,185,129,0.1);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;">
                    <i class="fa-solid fa-check" style="color:#10b981;font-size:2.5rem;"></i>
                </div>
                <h2 style="margin:0 0 12px;font-size:1.5rem;font-weight:800;">Pedido Realizado!</h2>
                <p style="color:#94a3b8;margin-bottom:32px;">Seu pedido foi enviado para a loja e você receberá uma confirmação no WhatsApp.</p>
                <div style="background:#1e293b;padding:20px;border-radius:20px;margin-bottom:32px;">
                    <span style="font-size:0.75rem;color:#64748b;text-transform:uppercase;font-weight:700;">ID do Pedido</span>
                    <p id="order-id-display" style="margin:5px 0 0;font-size:1.5rem;font-weight:800;color:#00875A;">#000000</p>
                </div>
                <button onclick="document.getElementById('confirmation-modal').style.display='none'" style="width:100%;padding:16px;border-radius:18px;background:#00875A;color:white;border:none;font-weight:800;cursor:pointer;">Voltar ao Início</button>
            </div>
        </div>
    `;

    return `<!-- CityCheckout Component Initialized -->`;
};
