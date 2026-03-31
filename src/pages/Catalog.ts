import { dbService } from '../services/db';
import { storage } from '../firebase/config';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

export const Catalog = async (storeId: string) => {
    try {
        const lojaConfigs = await dbService.getAll('loja_config', { field: 'lojaId', operator: '==', value: storeId }) as any[];
        let companyId = lojaConfigs[0]?.empresaId;
        let company: any = null;
        let store: any = null;

        if (companyId) {
            company = await dbService.get('companies', companyId);
            if (company) {
                store = company.stores?.find((s: any) => s.id === storeId);
            }
        }

        if (!store) {
            const allCompanies = await dbService.getAll('companies') as any[];
            for (const c of allCompanies) {
                const s = c.stores?.find((st: any) => st.id === storeId);
                if (s) { company = c; store = s; break; }
            }
        }

        if (!company || !store) {
            return `
                <div style="height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:white;font-family:sans-serif;">
                    <div style="text-align:center;padding:2.5rem;background:rgba(255,255,255,0.03);border-radius:24px;border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(20px);max-width:400px;">
                        <div style="font-size:4rem;margin-bottom:1rem;">🔎</div>
                        <h2 style="margin-bottom:0.5rem;font-weight:700;">Catálogo não encontrado</h2>
                        <p style="color:#94a3b8;line-height:1.5;">O link que você acessou pode estar incorreto ou a loja não está mais ativa.</p>
                    </div>
                </div>
            `;
        }

        const modulos = company.modulos_ativos || [];
        const hasVendaCatalogo = modulos.includes('venda_catalogo');

        const productsRaw = await dbService.getAll('products', { field: 'companyId', operator: '==', value: company.id }) as any[];
        const categories = await dbService.getAll('categories', { field: 'companyId', operator: '==', value: company.id }) as any[];

        const config = lojaConfigs[0] || {};
        const design = config.design || {};
        const primaryColor = design.primaryColor || '#6366f1';
        const secondaryColor = design.secondaryColor || '#0f172a';
        const textColor = design.textColor || '#ffffff';
        const priceColor = design.priceColor || '#ffffff';
        const logoUrl = design.logoUrl || '';
        const pixKey = design.pixKey || '';

        const updateMetaTags = (title: string, description: string, image: string) => {
            if (typeof document === 'undefined') return;

            // Basic tags
            document.title = title;

            const metaData = [
                { name: 'description', content: description },
                { property: 'og:title', content: title },
                { property: 'og:description', content: description },
                { property: 'og:image', content: image },
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: window.location.href },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: title },
                { name: 'twitter:description', content: description },
                { name: 'twitter:image', content: image }
            ];

            metaData.forEach(data => {
                const selector = data.name ? `meta[name="${data.name}"]` : `meta[property="${data.property}"]`;
                let element = document.querySelector(selector);
                if (!element) {
                    element = document.createElement('meta');
                    if (data.name) element.setAttribute('name', data.name);
                    if (data.property) element.setAttribute('property', data.property);
                    document.head.appendChild(element);
                }
                element.setAttribute('content', data.content);
            });

            // Update favicon if logo exists
            if (logoUrl) {
                let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
                if (!link) {
                    link = document.createElement('link');
                    link.rel = 'icon';
                    document.head.appendChild(link);
                }
                link.href = logoUrl;
            }
        };

        const storeName = store.name || 'Catálogo';
        const storeDescription = design.metaDescription || `Confira os produtos de ${storeName} em nosso catálogo digital.`;
        const shareImage = design.logoUrl || (window.location.origin + '/logo.png');

        updateMetaTags(storeName, storeDescription, shareImage);
        console.log(`[Catalog] Meta tags updated for: ${storeName}`);

        let whatsappNumber = design.whatsapp || '';
        if (!whatsappNumber) {
            try {
                if (store.instancia_id) {
                    const instance = await dbService.get('instancias', store.instancia_id) as any;
                    if (instance?.numero) whatsappNumber = instance.numero.replace(/\D/g, '');
                }
            } catch (instErr) {
                console.warn('Could not fetch instance details:', instErr);
            }
        }

        const isMpActive = (!!company.mercadoPagoToken) && (config.mercadoPagoActive !== false);

        const products = productsRaw.filter((p: any) =>
            p.active !== false &&
            (p.storeIds?.includes(storeId) || p.storeId === storeId)
        ).sort((a: any, b: any) => (a.name || '').localeCompare(b.name || ''));

        const promoProducts = products.filter((p: any) => p.promotionalActive);
        const themeId: string = design.themeId || 'classico';
        const bannerUrl: string = design.bannerUrl || '';
        const bannerMobileUrl: string = design.bannerMobileUrl || '';

        const categorizedData = categories.map((cat: any) => ({
            ...cat,
            products: products.filter((p: any) => p.categoryId === cat.id)
        })).filter((cat: any) => cat.products.length > 0)
        .sort((a: any, b: any) => (a.name || '').localeCompare(b.name || ''));

        const uncategorizedProducts = products.filter((p: any) =>
            !p.categoryId || !categories.find((c: any) => c.id === p.categoryId)
        );

        const getImageUrl = (p: any) => {
            if (p.imageUrl) return p.imageUrl;
            if (p.imagemPath && p.downloadToken) {
                return `https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(p.imagemPath)}?alt=media&token=${p.downloadToken}`;
            }
            return 'https://via.placeholder.com/300?text=Sem+Imagem';
        };

        // ── Cart state ───────────────────────────────────────────────────────
        let cart: Map<string, { product: any; qty: number }> = new Map();
        try {
            const savedCart = localStorage.getItem(`cat_cart_${storeId}`);
            if (savedCart) {
                cart = new Map(JSON.parse(savedCart));
            }
        } catch (e) { }

        const bairrosEntrega: any[] = config?.bairrosEntrega || [];
        const flatBairros: { nome: string, preco: number }[] = [];
        if (bairrosEntrega && Array.isArray(bairrosEntrega)) {
            bairrosEntrega.forEach((b: any) => {
                const nomes = (b.bairros || '').split(',').map((s: string) => s.trim()).filter(Boolean);
                nomes.forEach((n: string) => flatBairros.push({ nome: n, preco: parseFloat(b.preco) || 0 }));
            });
            flatBairros.sort((a, b) => a.nome.localeCompare(b.nome));
        }
        const cuponsList: any[] = config?.cupons || [];

        // Local Storage persistence
        const storageKey = `cat_user_${company.id}`;
        const savedUser = JSON.parse(localStorage.getItem(storageKey) || '{}');

        // Active coupon/tax state (set on goToPayment)
        let appliedCoupon: { codigo: string; desconto: number; tipo: string } | null = null;

        const getSubtotal = () => {
            let t = 0;
            cart.forEach(({ product, qty }) => {
                const price = product.promotionalActive ? (product.promotionalPrice || product.price) : product.price;
                t += price * qty;
            });
            return t;
        };

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
            return appliedCoupon.tipo === 'percent'
                ? (subtotal * appliedCoupon.desconto / 100)
                : appliedCoupon.desconto;
        };

        const getCartTotal = () => {
            const subtotal = getSubtotal();
            return subtotal + getTaxaValue() - getDescontoValue(subtotal);
        };

        const renderCartItems = () => {
            if (cart.size === 0) return '<p style="text-align:center;color:#94a3b8;padding:20px 0;">Seu carrinho está vazio.</p>';
            let html = '';
            cart.forEach(({ product, qty }, id) => {
                const price = product.promotionalActive ? (product.promotionalPrice || product.price) : product.price;
                html += `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
                    <div style="flex:1;">
                        <p style="margin:0;font-weight:600;font-size:0.95rem;">${product.name}</p>
                        <p style="margin:4px 0 0;color:#94a3b8;font-size:0.8rem;">R$ ${price.toFixed(2)} cada</p>
                    </div>
                    <div style="display:flex;align-items:center;gap:10px;">
                        <button onclick="window.catQtyChange('${id}',-1)" style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.1);color:white;border:none;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">-</button>
                        <span style="min-width:24px;text-align:center;font-weight:700;">${qty}</span>
                        <button onclick="window.catQtyChange('${id}',1)" style="width:28px;height:28px;border-radius:50%;background:#6366f1;color:white;border:none;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">+</button>
                        <button onclick="window.catRemoveItem('${id}')" style="color:#ef4444;background:none;border:none;cursor:pointer;padding:4px;"><i class="fa-solid fa-trash" style="font-size:0.85rem;"></i></button>
                    </div>
                </div>`;
            });
            return html;
        };

        const renderOrderSummary = () => {
            const subtotal = getSubtotal();
            const taxa = getTaxaValue();
            const desconto = getDescontoValue(subtotal);
            const total = subtotal + taxa - desconto;
            let html = '';
            cart.forEach(({ product, qty }) => {
                const price = product.promotionalActive ? (product.promotionalPrice || product.price) : product.price;
                html += `<div style="display:flex;justify-content:space-between;font-size:0.88rem;padding:4px 0;"><span>${qty}x ${product.name}</span><span>R$ ${(price * qty).toFixed(2)}</span></div>`;
            });
            if (taxa > 0) {
                html += `<div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:4px 0;color:#94a3b8;"><span><i class="fa-solid fa-truck" style="margin-right:4px;"></i>${getTaxaNome()}</span><span>+ R$ ${taxa.toFixed(2)}</span></div>`;
            }
            if (desconto > 0 && appliedCoupon) {
                html += `<div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:4px 0;color:#10b981;"><span><i class="fa-solid fa-tag" style="margin-right:4px;"></i>Cupom ${appliedCoupon.codigo}</span><span>- R$ ${desconto.toFixed(2)}</span></div>`;
            }
            html += `<div style="display:flex;justify-content:space-between;font-weight:800;font-size:1rem;border-top:1px solid rgba(255,255,255,0.1);margin-top:8px;padding-top:8px;"><span>Total</span><span style="color:#6366f1;">R$ ${total.toFixed(2)}</span></div>`;
            return html;
        };

        const DIAS_NOME: any = { dom: 'Domingo', seg: 'Segunda-feira', ter: 'Terça-feira', qua: 'Quarta-feira', qui: 'Quinta-feira', sex: 'Sexta-feira', sab: 'Sábado' };
        const getDiaSemana = () => ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'][new Date().getDay()];

        const getStoreHorario = (dia: string) => {
            const h = config.horario_funcionamento?.[dia] || store.horarios?.[dia] || {};
            return {
                ativo: h.ativo ?? h.aberto ?? (dia !== 'dom'),
                inicio: h.inicio || h.abertura || '08:00',
                fim: h.fim || h.fechamento || '18:00'
            };
        };

        const getStoreFrete = (dia: string) => {
            const h = config.horario_entrega?.[dia] || store.horario_entrega?.[dia] || {};

            console.log(h);
            return {
                ativo: h.ativo ?? h.aberto ?? (dia !== 'dom'),
                inicio: h.inicio || h.abertura || '08:00',
                fim: h.fim || h.fechamento || '18:00'
            };
        };

        const isFreteAbertoAgora = () => {
            const hj = getDiaSemana();
            const hf = getStoreFrete(hj);
            if (!hf.ativo) return false;

            const agora = new Date();
            const hrAtual = agora.getHours() * 60 + agora.getMinutes();
            const [hIni, mIni] = hf.inicio.split(':').map(Number);
            const [hFim, mFim] = hf.fim.split(':').map(Number);

            return hrAtual >= (hIni * 60 + mIni) && hrAtual <= (hFim * 60 + mFim);
        };


        const permitirEntrega = isFreteAbertoAgora();

        const isStoreOpen = () => {
            const hj = getDiaSemana();
            const hs = getStoreHorario(hj);
            if (!hs.ativo) return false;
            const agora = new Date();
            const hrAtual = agora.getHours() * 60 + agora.getMinutes();
            const [hIni, mIni] = hs.inicio.split(':').map(Number);
            const [hFim, mFim] = hs.fim.split(':').map(Number);
            return hrAtual >= (hIni * 60 + mIni) && hrAtual <= (hFim * 60 + mFim);
        };

        const getNextOpenTime = () => {
            const diasOrdenados = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
            const hojeIndex = new Date().getDay();
            const agora = new Date();
            const hrAtual = agora.getHours() * 60 + agora.getMinutes();

            const hj = diasOrdenados[hojeIndex];
            const hs = getStoreHorario(hj);
            if (hs.ativo) {
                const [hIni, mIni] = hs.inicio.split(':').map(Number);
                const minIni = hIni * 60 + mIni;
                if (hrAtual < minIni) {
                    return `Hoje às ${hs.inicio}`;
                }
            }

            for (let i = 1; i <= 7; i++) {
                const nextIndex = (hojeIndex + i) % 7;
                const nextDia = diasOrdenados[nextIndex];
                const hsNext = getStoreHorario(nextDia);
                if (hsNext.ativo) {
                    if (i === 1) return `Amanhã às ${hsNext.inicio}`;
                    return `${DIAS_NOME[nextDia]} às ${hsNext.inicio}`;
                }
            }
            return 'em breve';
        };

        const storeIsOpen = isStoreOpen();

        const getStoreStatus = () => {
            const hj = getDiaSemana();
            const hs = getStoreHorario(hj);
            if (!hs.ativo) return '<span style="color:#ef4444;"><i class="fa-solid fa-door-closed"></i> Fechado no momento</span>';
            const agora = new Date();
            const hrAtual = agora.getHours() * 60 + agora.getMinutes();
            const [hIni, mIni] = hs.inicio.split(':').map(Number);
            const [hFim, mFim] = hs.fim.split(':').map(Number);
            const minIni = hIni * 60 + mIni;
            const minFim = hFim * 60 + mFim;

            if (hrAtual >= minIni && hrAtual <= minFim) {
                return `<span style="color:#10b981;"><i class="fa-solid fa-door-open"></i> Aberto agora</span> <span style="opacity:0.6;margin-left:4px;">• Fecha às ${hs.fim}</span>`;
            } else if (hrAtual < minIni) {
                return `<span style="color:#ef4444;"><i class="fa-solid fa-door-closed"></i> Fechado no momento</span> <span style="opacity:0.6;margin-left:4px;">• Abre às ${hs.inicio}</span>`;
            } else {
                return `<span style="color:#ef4444;"><i class="fa-solid fa-door-closed"></i> Fechado no momento</span>`;
            }
        };

        const renderHorarios = () => {
            let html = '';
            ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'].forEach(d => {
                const h = getStoreHorario(d);
                if (h.ativo) {
                    html += `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:var(--text-muted);">${DIAS_NOME[d]}</span><span style="font-weight:600;">${h.inicio} às ${h.fim}</span></div>`;
                } else {
                    html += `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:var(--text-muted);">${DIAS_NOME[d]}</span><span style="color:#ef4444;font-size:0.8rem;font-weight:600;">Fechado</span></div>`;
                }
            });
            return html;
        };

        const updateCartUI = () => {
            const badge = document.getElementById('cart-badge');
            const totalEl = document.getElementById('cart-total');
            const itemsEl = document.getElementById('cart-items');
            const cartBtn = document.getElementById('cart-float-btn');
            const floatTotalEl = document.getElementById('cart-total-float');
            const floatBadge = document.getElementById('cart-badge-float');

            try { localStorage.setItem(`cat_cart_${storeId}`, JSON.stringify(Array.from(cart.entries()))); } catch (e) { }

            let totalQty = 0;
            cart.forEach(({ qty }) => totalQty += qty);

            if (badge) badge.textContent = totalQty.toString();
            if (floatBadge) floatBadge.textContent = totalQty.toString();
            if (cartBtn) cartBtn.style.display = totalQty > 0 ? 'flex' : 'none';
            if (totalEl) totalEl.textContent = `R$ ${getCartTotal().toFixed(2)}`;
            if (floatTotalEl) floatTotalEl.textContent = `R$ ${getCartTotal().toFixed(2).replace('.', ',')}`;
            if (itemsEl) itemsEl.innerHTML = renderCartItems();
        };

        (window as any).openStoreInfo = () => openModal('store-info-modal');
        (window as any).closeStoreInfo = () => closeModal('store-info-modal');

        (window as any).catInit = () => {
            const nameInp = document.getElementById('checkout-name') as HTMLInputElement;
            const phoneInp = document.getElementById('checkout-phone') as HTMLInputElement;
            const addrInp = document.getElementById('checkout-address') as HTMLInputElement;

            if (nameInp && savedUser.name) nameInp.value = savedUser.name;
            if (phoneInp && savedUser.phone) phoneInp.value = savedUser.phone;
            if (addrInp && savedUser.address) addrInp.value = savedUser.address;

            if (phoneInp) {
                phoneInp.addEventListener('input', (e: any) => {
                    let val = e.target.value.replace(/\D/g, '');
                    if (val.length > 11) val = val.slice(0, 11);
                    e.target.value = val;
                });
            }
        };
        setTimeout(() => (window as any).catInit(), 500);

        const openModal = (id: string) => {
            const m = document.getElementById(id);
            if (m) m.style.display = 'flex';
        };
        const closeModal = (id: string) => {
            const m = document.getElementById(id);
            if (m) m.style.display = 'none';
        };

        if (hasVendaCatalogo) {
            (window as any).showClosedAlert = (type: 'store' | 'delivery') => {
                const title = document.getElementById('closed-alert-title');
                const desc = document.getElementById('closed-alert-desc');
                const timeSec = document.getElementById('closed-alert-time-section');
                const nextTime = document.getElementById('next-open-time');
                const icon = document.getElementById('closed-alert-icon');

                if (type === 'store') {
                    if (title) title.textContent = 'Loja Fechada';
                    if (desc) desc.textContent = 'No momento não estamos aceitando pedidos.';
                    if (timeSec) timeSec.style.display = 'block';
                    if (nextTime) nextTime.textContent = getNextOpenTime();
                    if (icon) icon.className = 'fa-solid fa-store-slash';
                } else if (type === 'delivery') {
                    if (title) title.textContent = 'Entrega Desativada';
                    if (desc) desc.textContent = 'O serviço de entrega está desativado no momento. Por favor, escolha a opção de Retirada se disponível.';
                    if (timeSec) timeSec.style.display = 'none';
                    if (icon) icon.className = 'fa-solid fa-motorcycle';
                }
                openModal('closed-alert-modal');
            };

            // ── Add to cart ──
            (window as any).catAddToCart = (productId: string) => {
                const product = products.find((p: any) => p.id === productId);
                if (!product) return;
                if (product.stock === 0) return;
                const existing = cart.get(productId);
                const maxQty = product.stock ?? Infinity;
                if ((existing?.qty || 0) >= maxQty) { alert(`Estoque máximo atingido (${product.stock} un.)`); return; }
                cart.set(productId, { product, qty: (existing?.qty || 0) + 1 });
                updateCartUI();
                const btn = document.getElementById(`btn-add-${productId}`);
                if (btn) { btn.textContent = '✓ Adicionado'; setTimeout(() => { if (btn) btn.textContent = '+ Adicionar'; }, 1000); }
            };

            (window as any).catQtyChange = (productId: string, delta: number) => {
                const entry = cart.get(productId);
                if (!entry) return;
                const newQty = entry.qty + delta;
                if (newQty <= 0) { cart.delete(productId); } else { entry.qty = Math.min(newQty, entry.product.stock ?? Infinity); }
                updateCartUI();
            };

            (window as any).catRemoveItem = (productId: string) => { cart.delete(productId); updateCartUI(); };

            // ── Modal navigation ──
            (window as any).openCart = () => { updateCartUI(); openModal('cart-modal'); };
            (window as any).closeCart = () => closeModal('cart-modal');

            // Cart → Step 2: Delivery type
            (window as any).goToDelivery = async () => {
                if (cart.size === 0) return;
                if (!storeIsOpen) {
                    (window as any).showClosedAlert('store');
                    return;
                }

                const btn = document.getElementById('btn-go-delivery');
                if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verificando...';

                let outOfStock = false;
                for (const [id, { product, qty }] of Array.from(cart.entries())) {
                    try {
                        const freshProduct = await dbService.get('products', id) as any;
                        if (!freshProduct || freshProduct.active === false || (freshProduct.stock != null && freshProduct.stock < qty)) {
                            outOfStock = true;
                            alert(`O produto "${product.name}" não possui quantidade suficiente em estoque ou está indisponível.`);
                            break;
                        }
                    } catch (e) {
                        // ignore db fails
                    }
                }

                if (btn) btn.innerHTML = '<i class="fa-solid fa-arrow-right"></i> Finalizar Pedido';

                if (outOfStock) return;

                closeModal('cart-modal');
                openModal('delivery-modal');
            };

            (window as any).closeDelivery = () => closeModal('delivery-modal');

            (window as any).selectDelivery = (type: string) => {
                (window as any).catDeliveryType = type;
                // Highlight selected card
                document.querySelectorAll('.delivery-card').forEach(c => {
                    (c as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (c as HTMLElement).style.background = 'transparent';
                });
                const card = document.getElementById(`delivery-card-${type}`);
                if (card) {
                    card.style.borderColor = '#6366f1';
                    card.style.background = 'rgba(99,102,241,0.08)';
                }
                const btn = document.getElementById('btn-go-customer') as HTMLButtonElement;
                if (btn) {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
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
                // Show/hide address field
                const addrGroup = document.getElementById('address-group');
                if (addrGroup) addrGroup.style.display = type === 'entrega' ? 'block' : 'none';
                openModal('customer-modal');
            };

            (window as any).closeCustomer = () => closeModal('customer-modal');

            (window as any).catFilterBairros = (val: string) => {
                const list = document.getElementById('checkout-bairro-dropdown');
                if (!list) return;
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
                if (input) {
                    input.value = nome;
                    input.dataset.preco = preco.toString();
                }
                const list = document.getElementById('checkout-bairro-dropdown');
                if (list) list.style.display = 'none';
            };

            // Document click to close custom dropdown
            document.addEventListener('click', (e) => {
                if (!(e.target as HTMLElement).closest('#bairro-input-wrapper')) {
                    const list = document.getElementById('checkout-bairro-dropdown');
                    if (list) list.style.display = 'none';
                }
            });

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
                        if (!bairroInput || !bairroInput.value.trim()) {
                            alert('Selecione ou digite seu bairro para entrega.');
                            return;
                        }
                        bairroNome = bairroInput.value.trim();
                        const validBairro = flatBairros.find(b => b.nome.toLowerCase() === bairroNome.toLowerCase());
                        if (!validBairro) {
                            alert('Bairro selecionado não encontrado na lista. Por favor, escolha uma opção listada.');
                            return;
                        }
                        bairroNome = validBairro.nome;
                        bairroPreco = validBairro.preco;
                    }
                }

                if (!name || !phone) { alert('Preencha nome e telefone.'); return; }
                if (phone.length < 10) { alert('Telefone inválido. Use o formato DD000000000'); return; }
                if (deliveryType === 'entrega' && !address) { alert('Preencha o endereço de entrega completo.'); return; }

                (window as any).catSelectedBairro = bairroNome;
                (window as any).catTaxaBairro = bairroPreco;

                const userData = { name, phone, address: address || '', bairro: bairroNome };
                (window as any).catCustomer = userData;
                localStorage.setItem(storageKey, JSON.stringify(userData));

                closeModal('customer-modal');
                // Update summary
                const summaryEl = document.getElementById('payment-order-summary');
                if (summaryEl) summaryEl.innerHTML = renderOrderSummary();
                // Coupon field
                const couponSection = document.getElementById('cat-coupon-section');
                if (couponSection) couponSection.style.display = cuponsList.length > 0 ? 'block' : 'none';
                // Show/hide payment buttons based on config and delivery type
                const payDeliveryBtn = document.getElementById('btn-pay-delivery');
                const pixManualBtn = document.getElementById('btn-pay-pix-manual');
                const pixMpBtn = document.getElementById('btn-pay-pix-mp');
                const mandatoryPayMsg = document.getElementById('mandatory-pay-msg');

                const isMandatoryPickupPay = config?.pagamentoObrigatorioRetirada === true;
                const isDeliveryPayDisabled = config?.desativarPagamentoEntrega === true;

                if (payDeliveryBtn) {
                    if (deliveryType === 'retirada' && isMandatoryPickupPay) {
                        payDeliveryBtn.style.display = 'none';
                    } else if (deliveryType === 'entrega' && isDeliveryPayDisabled) {
                        payDeliveryBtn.style.display = 'none';
                    } else {
                        payDeliveryBtn.style.display = 'flex';
                    }
                }

                if (mandatoryPayMsg) {
                    mandatoryPayMsg.style.display = (deliveryType === 'retirada' && isMandatoryPickupPay) ? 'block' : 'none';
                }

                if (pixManualBtn) pixManualBtn.style.display = pixKey ? 'flex' : 'none';
                if (pixMpBtn) pixMpBtn.style.display = isMpActive ? 'flex' : 'none';
                openModal('payment-modal');
            };

            (window as any).closePayment = () => closeModal('payment-modal');
            
            (window as any).catToggleDeliveryOptions = () => {
                const details = document.getElementById('delivery-payment-details');
                if (details) {
                    const isVisible = details.style.display === 'flex';
                    details.style.display = isVisible ? 'none' : 'flex';
                    // Reset selection if hiding
                    if (isVisible) {
                        (window as any).catDeliveryPaymentMethod = null;
                        (window as any).catTroco = null;
                        document.querySelectorAll('.btn-sub-method').forEach(b => (b as HTMLElement).style.background = 'rgba(255,255,255,0.05)');
                        const trocoWrap = document.getElementById('troco-wrapper');
                        if (trocoWrap) trocoWrap.style.display = 'none';
                    }
                }
            };

            (window as any).catSelectDeliverySubMethod = (method: 'dinheiro' | 'cartao') => {
                (window as any).catDeliveryPaymentMethod = method;
                document.querySelectorAll('.btn-sub-method').forEach(b => {
                    (b as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                    (b as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                });
                const btn = document.getElementById(`btn-sub-${method}`);
                if (btn) {
                    btn.style.background = 'rgba(99,102,241,0.2)';
                    btn.style.borderColor = '#6366f1';
                }
                const trocoWrap = document.getElementById('troco-wrapper');
                if (trocoWrap) trocoWrap.style.display = method === 'dinheiro' ? 'block' : 'none';
                
                const confirmBtn = document.getElementById('btn-confirm-delivery-sub');
                if (confirmBtn) {
                    (confirmBtn as HTMLButtonElement).disabled = false;
                    (confirmBtn as HTMLButtonElement).style.opacity = '1';
                }
            };

            // ── Apply coupon ──
            (window as any).catApplyCoupon = () => {
                const code = ((document.getElementById('cat-coupon-input') as HTMLInputElement)?.value || '').trim().toUpperCase();
                const found = cuponsList.find((c: any) => c.codigo === code && c.ativo !== false);
                const subtotal = getSubtotal();
                const msgEl = document.getElementById('cat-coupon-msg');

                if (!found) {
                    if (msgEl) { msgEl.textContent = 'Cupom inválido ou expirado.'; msgEl.style.color = '#ef4444'; }
                    return;
                }

                if (found.valorMinimo > 0 && subtotal < found.valorMinimo) {
                    if (msgEl) { msgEl.textContent = `Gasto mínimo de R$ ${found.valorMinimo.toFixed(2)} necessário.`; msgEl.style.color = '#ef4444'; }
                    return;
                }

                appliedCoupon = found;
                const desconto = getDescontoValue(subtotal);
                if (msgEl) { msgEl.textContent = `✓ Cupom aplicado! Desconto: R$ ${desconto.toFixed(2)}`; msgEl.style.color = '#10b981'; }
                const summaryEl = document.getElementById('payment-order-summary');
                if (summaryEl) summaryEl.innerHTML = renderOrderSummary();
            };

            (window as any).catToggleCoupon = () => {
                const wrapper = document.getElementById('cat-coupon-input-wrapper');
                const label = document.getElementById('cat-coupon-toggle-label');
                if (wrapper) {
                    const isVisible = wrapper.style.display === 'block';
                    wrapper.style.display = isVisible ? 'none' : 'block';
                    if (label) label.textContent = isVisible ? 'Tenho um cupom de desconto' : 'Ocultar cupom';
                }
            };

            (window as any).catFilterClassic = (catId: string) => {
                document.querySelectorAll('.cat-selector-item').forEach(btn => {
                    const onclick = btn.getAttribute('onclick') || '';
                    btn.classList.toggle('active', onclick.includes("'" + catId + "'"));
                });
                const promoSec = document.getElementById('classic-promo-section');
                if (catId === 'all') {
                    if (promoSec) promoSec.style.display = promoProducts.length > 0 ? 'block' : 'none';
                    document.querySelectorAll('[data-classic-cat]').forEach(el => (el as HTMLElement).style.display = 'block');
                } else if (catId === 'promo') {
                    if (promoSec) promoSec.style.display = 'block';
                    document.querySelectorAll('[data-classic-cat]').forEach(el => (el as HTMLElement).style.display = 'none');
                } else {
                    if (promoSec) promoSec.style.display = 'none';
                    document.querySelectorAll('[data-classic-cat]').forEach(el => {
                        (el as HTMLElement).style.display = (el as HTMLElement).dataset.classicCat === catId ? 'block' : 'none';
                    });
                }
            };

            (window as any).catFilterCat = (c: string) => {
                document.querySelectorAll('.cat-sidebar-link').forEach(e => {
                    e.classList.remove('active');
                    e.setAttribute('aria-pressed', 'false');
                });
                const btn = document.querySelector(`.cat-sidebar-link[onclick*="'${c}'"]`);
                if (btn) {
                    btn.classList.add('active');
                    btn.setAttribute('aria-pressed', 'true');
                }
                const all = c === 'all';
                document.querySelectorAll('[data-catgroup]').forEach(e => {
                    (e as HTMLElement).style.display = (all || (e as HTMLElement).dataset.catgroup === c ? '' : 'none');
                });
            };

            (window as any).catSearch = (q: string) => {
                q = q.trim().toLowerCase();
                document.querySelectorAll('[data-catgroup]').forEach(e => { (e as HTMLElement).style.display = ''; });
                if (!q) return;
                document.querySelectorAll('.product-card').forEach(c => {
                    const n = (c.querySelector('h3')?.textContent || '').toLowerCase();
                    (c as HTMLElement).style.display = n.includes(q) ? '' : 'none';
                });
            };

            // ── Lead management helper ──
            const findOrCreateLead = async (name: string, phone: string): Promise<string> => {
                const normalizedPhone = phone.replace(/\D/g, '');
                
                // Tenta buscar diretamente pelo WhatsApp primeiro (altamente performático)
                const leadsByWa = await dbService.getAll('leads', [
                    { field: 'empresaId', operator: '==', value: company.id },
                    { field: 'whatsapp', operator: '==', value: normalizedPhone }
                ]) as any[];

                let existing = leadsByWa[0];

                if (!existing) {
                    // Tenta pelo campo telefone
                    const leadsByPh = await dbService.getAll('leads', [
                        { field: 'empresaId', operator: '==', value: company.id },
                        { field: 'telefone', operator: '==', value: normalizedPhone }
                    ]) as any[];
                    existing = leadsByPh[0];
                }

                if (existing) {
                    if (existing.statusLead !== 'cliente_ativo') {
                        await dbService.update('leads', existing.id, { statusLead: 'cliente_ativo' });
                    }
                    return existing.id;
                }

                // Not found — create new lead
                const newLeadId = await dbService.create('leads', {
                    nome: name,
                    telefone: normalizedPhone,
                    whatsapp: normalizedPhone,
                    empresaId: company.id,
                    lojaId: storeId,
                    origem: 'catalogo',
                    statusLead: 'cliente_ativo',
                    criadoEm: new Date().toISOString(),
                });
                return newLeadId as string;
            };

            // ── Confirm order: Na Entrega ──
            (window as any).confirmOrderDelivery = async () => {
                const btn = document.getElementById('btn-pay-delivery') as HTMLButtonElement;
                if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processando...'; }
                try {
                    // Verificação de funcionamento em tempo real
                    if (!isStoreOpen()) {
                        if (btn) { btn.disabled = false; btn.innerHTML = '🤝 Pagar na Entrega / Retirada'; }
                        (window as any).showClosedAlert('store');
                        return;
                    }

                    const deliveryType = (window as any).catDeliveryType;
                    if (deliveryType === 'entrega' && !isFreteAbertoAgora()) {
                        if (btn) { btn.disabled = false; btn.innerHTML = '🤝 Pagar na Entrega / Retirada'; }
                        (window as any).showClosedAlert('delivery');
                        return;
                    }

                    const customer = (window as any).catCustomer;
                    if (!customer || !customer.phone) {
                        alert('Seus dados de contato não foram salvos ou foram perdidos. Por favor, preencha novamente.');
                        closeModal('payment-modal');
                        closeModal('pix-manual-modal');
                        openModal('customer-modal');
                        return;
                    }

                    const { name, phone, address } = customer;
                    // deliveryType já declarado acima para verificação de horário
                    const items = Array.from(cart.entries()).map(([id, { product, qty }]) => {
                        const price = product.promotionalActive ? (product.promotionalPrice || product.price) : product.price;
                        return { productId: id, name: product.name, qty, price, subtotal: price * qty };
                    });
                    for (const [id, { qty }] of Array.from(cart.entries())) {
                        const product = products.find((p: any) => p.id === id);
                        if (product && product.stock != null) await dbService.update('products', id, { stock: Math.max(0, product.stock - qty) });
                    }
                    const subtotal = getSubtotal();
                    const taxaAplicada = getTaxaValue();
                    const desconto = getDescontoValue(subtotal);
                    const total = subtotal + taxaAplicada - desconto;
                    const leadId = await findOrCreateLead(name, phone);
                    
                    const paymentSubMethod = (window as any).catDeliveryPaymentMethod;
                    const trocoVal = (document.getElementById('cat-troco-input') as HTMLInputElement)?.value;
                    const troco = (paymentSubMethod === 'dinheiro' && trocoVal) ? parseFloat(trocoVal) : null;

                    const orderData = {
                        lojaId: storeId, storeId, companyId: company.id, empresaId: company.id,
                        clientName: name, clientPhone: phone,
                        endereco: address, bairro: customer.bairro || '', entrega: deliveryType,
                        leadId, nome: name, items, total,
                        taxaAplicada, taxaNome: getTaxaNome(),
                        desconto, codigoCupom: appliedCoupon?.codigo || null,
                        paymentMethod: 'na_entrega', pagamento: 'na_entrega',
                        paymentSubMethod, troco,
                        status: 'em_montagem', source: 'catalog',
                        criadoEm: new Date().toISOString()
                    };
                    const orderId = await dbService.create('pedidos', orderData);

                    // Trigger operator notification AND message to customer
                    try {
                        const { orderService } = await import('../services/orderService');
                        await orderService.notifyNewOrder({ id: orderId, ...orderData }, company.id);
                    } catch (err) { console.error('Error in order notification:', err); }

                    cart.clear(); appliedCoupon = null; closeModal('payment-modal'); updateCartUI();
                    const confirmModal = document.getElementById('confirmation-modal');
                    const orderIdEl = document.getElementById('order-id-display');
                    const pixSec = document.getElementById('pix-info-section');
                    if (confirmModal) confirmModal.style.display = 'flex';
                    if (orderIdEl) orderIdEl.textContent = orderId.slice(0, 8).toUpperCase();
                    if (pixSec) pixSec.style.display = 'none';
                    updateCartUI();
                } catch (err: any) {
                    console.error('Confirm Order Delivery Error:', err);
                    alert('Erro ao processar pedido: ' + (err.message || 'Erro desconhecido') + '. Por favor, tente novamente ou fale com a loja.');
                    if (btn) { btn.disabled = false; btn.innerHTML = '🤝 Pagar na Entrega / Retirada'; }
                }
            };

            // ── Confirm order: PIX Manual ──
            (window as any).showPixManual = () => {
                closeModal('payment-modal');
                const summaryEl = document.getElementById('pix-manual-summary');
                if (summaryEl) summaryEl.innerHTML = renderOrderSummary();
                const keyEl = document.getElementById('pix-key-value');
                if (keyEl) keyEl.textContent = pixKey;
                openModal('pix-manual-modal');
            };

            (window as any).closePixManual = () => closeModal('pix-manual-modal');

            (window as any).copyPixKey = () => {
                navigator.clipboard.writeText(pixKey).then(() => {
                    const btn = document.getElementById('btn-copy-pix');
                    if (btn) { btn.textContent = '✓ Copiado!'; setTimeout(() => { btn.textContent = 'Copiar'; }, 2000); }
                });
            };

            (window as any).confirmPixManual = async () => {
                const btn = document.getElementById('btn-confirm-pix-manual') as HTMLButtonElement;
                if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Confirmando...'; }
                try {
                    // Verificação de funcionamento em tempo real
                    if (!isStoreOpen()) {
                        if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-check"></i> Confirmar Pagamento PIX'; }
                        (window as any).showClosedAlert('store');
                        return;
                    }

                    const deliveryType = (window as any).catDeliveryType;
                    if (deliveryType === 'entrega' && !isFreteAbertoAgora()) {
                        if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-check"></i> Confirmar Pagamento PIX'; }
                        (window as any).showClosedAlert('delivery');
                        return;
                    }

                    const customer = (window as any).catCustomer;
                    if (!customer || !customer.phone) {
                        alert('Seus dados de contato não foram salvos ou foram perdidos. Por favor, preencha novamente.');
                        closeModal('payment-modal');
                        closeModal('pix-manual-modal');
                        openModal('customer-modal');
                        return;
                    }

                    const { name, phone, address } = customer;
                    // deliveryType já declarado acima para verificação de horário
                    const items = Array.from(cart.entries()).map(([id, { product, qty }]) => {
                        const price = product.promotionalActive ? (product.promotionalPrice || product.price) : product.price;
                        return { productId: id, name: product.name, qty, price, subtotal: price * qty };
                    });

                    // Upload comprovante if provided
                    let comprovanteUrl = '';
                    const fileInput = document.getElementById('pix-comprovante-input') as HTMLInputElement;
                    if (fileInput?.files?.[0]) {
                        const file = fileInput.files[0];
                        const timestamp = Date.now();
                        const path = `comprovantes/${company.id}/${timestamp}_${file.name}`;
                        const fileRef = storageRef(storage, path);
                        await uploadBytes(fileRef, file);
                        comprovanteUrl = await getDownloadURL(fileRef);
                    }

                    for (const [id, { qty }] of Array.from(cart.entries())) {
                        const product = products.find((p: any) => p.id === id);
                        if (product && product.stock != null) await dbService.update('products', id, { stock: Math.max(0, product.stock - qty) });
                    }

                    const subtotal = getSubtotal();
                    const taxaAplicada = getTaxaValue();
                    const desconto = getDescontoValue(subtotal);
                    const total = subtotal + taxaAplicada - desconto;
                    const leadId = await findOrCreateLead(name, phone);
                    const orderId = await dbService.create('pedidos', {
                        lojaId: storeId, storeId, companyId: company.id, empresaId: company.id,
                        clientName: name, clientPhone: phone,
                        endereco: address, bairro: customer.bairro || '', entrega: deliveryType,
                        leadId, nome: name, items, total,
                        taxaAplicada, taxaNome: getTaxaNome(),
                        desconto, codigoCupom: appliedCoupon?.codigo || null,
                        paymentMethod: 'pix_manual', pagamento: 'pagamento_no_pix',
                        comprovanteUrl,
                        status: 'em_montagem', source: 'catalog',
                        criadoEm: new Date().toISOString()
                    });

                    cart.clear(); appliedCoupon = null; closeModal('pix-manual-modal'); updateCartUI(); // Update UI to trigger persistence
                    const confirmModal = document.getElementById('confirmation-modal');
                    const orderIdEl = document.getElementById('order-id-display');
                    if (confirmModal) confirmModal.style.display = 'flex';
                    if (orderIdEl) orderIdEl.textContent = orderId.slice(0, 8).toUpperCase();
                    const pixSec = document.getElementById('pix-info-section');
                    if (pixSec) pixSec.style.display = 'none';
                    updateCartUI();
                } catch (err: any) {
                    console.error('Confirm Pix Manual Error:', err);
                    alert('Erro ao confirmar pedido: ' + (err.message || 'Erro de conexão/permissão') + '. Tente novamente.');
                    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-check"></i> Confirmar Pagamento PIX'; }
                }
            };

            // ── Confirm order: PIX Mercado Pago ──
            (window as any).confirmPixMercadoPago = async () => {
                const btn = document.getElementById('btn-pay-pix-mp') as HTMLButtonElement;
                if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Gerando PIX...'; }
                try {
                    // Verificação de funcionamento em tempo real
                    if (!isStoreOpen()) {
                        if (btn) { btn.disabled = false; btn.innerHTML = '⚡ Pagar via Mercado Pago (PIX)'; }
                        (window as any).showClosedAlert('store');
                        return;
                    }

                    const deliveryType = (window as any).catDeliveryType;
                    if (deliveryType === 'entrega' && !isFreteAbertoAgora()) {
                        if (btn) { btn.disabled = false; btn.innerHTML = '⚡ Pagar via Mercado Pago (PIX)'; }
                        (window as any).showClosedAlert('delivery');
                        return;
                    }

                    const { name, phone, address } = (window as any).catCustomer;
                    // deliveryType já declarado acima
                    const items = Array.from(cart.entries()).map(([id, { product, qty }]) => {
                        const price = product.promotionalActive ? (product.promotionalPrice || product.price) : product.price;
                        return { productId: id, name: product.name, qty, price, subtotal: price * qty };
                    });
                    const subtotal = getSubtotal();
                    const taxaAplicada = getTaxaValue();
                    const desconto = getDescontoValue(subtotal);
                    const total = subtotal + taxaAplicada - desconto;

                    // Decide whether to use n8n webhook or direct API (if proxy/CORS allowed)
                    const webhookUrl = 'https://n8n.vps.pequi.digital/webhook/autoqui-pix-catalog';

                    const mpResponse = await fetch(webhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            companyId: company.id,
                            storeId,
                            items,
                            total,
                            clientName: name,
                            clientPhone: phone,
                            accessToken: company.mercadoPagoToken
                        })
                    });
                    const mpData = mpResponse.ok ? await mpResponse.json() : null;

                    for (const [id, { qty }] of Array.from(cart.entries())) {
                        const product = products.find((p: any) => p.id === id);
                        if (product && product.stock != null) await dbService.update('products', id, { stock: Math.max(0, product.stock - qty) });
                    }

                    const leadId = await findOrCreateLead(name, phone);
                    const orderId = await dbService.create('pedidos', {
                        lojaId: storeId, storeId, companyId: company.id, empresaId: company.id,
                        clientName: name, clientPhone: phone,
                        endereco: address, entrega: deliveryType,
                        leadId, nome: name, items, total,
                        taxaAplicada, taxaNome: getTaxaNome(),
                        desconto, codigoCupom: appliedCoupon?.codigo || null,
                        paymentMethod: 'pix_mercadopago', pagamento: 'pagamento_no_pix',
                        mpPaymentId: mpData?.payment_id || '',
                        status: 'em_montagem', source: 'catalog',
                        criadoEm: new Date().toISOString()
                    });

                    cart.clear(); appliedCoupon = null; closeModal('payment-modal'); updateCartUI();

                    if (mpData?.qr_code_base64 || mpData?.qr_code_text) {
                        const qrImg = document.getElementById('mp-qr-img') as HTMLImageElement;
                        const qrCode = document.getElementById('mp-qr-code');
                        const mpSummary = document.getElementById('mp-pix-summary');
                        if (qrImg && mpData.qr_code_base64) { qrImg.src = `data:image/png;base64,${mpData.qr_code_base64}`; qrImg.style.display = 'block'; }
                        if (qrCode && mpData.qr_code_text) { qrCode.textContent = mpData.qr_code_text; (window as any)._mpQrCodeText = mpData.qr_code_text; }
                        if (mpSummary) mpSummary.innerHTML = renderOrderSummary();
                        openModal('mp-pix-modal');
                    } else {
                        const confirmModal = document.getElementById('confirmation-modal');
                        const orderIdEl = document.getElementById('order-id-display');
                        if (confirmModal) confirmModal.style.display = 'flex';
                        if (orderIdEl) orderIdEl.textContent = orderId.slice(0, 8).toUpperCase();
                    }
                    updateCartUI();
                } catch (err: any) {
                    console.error('Confirm Pix MP Error:', err);
                    alert('Erro ao gerar PIX Mercado Pago: ' + (err.message || 'Erro de resposta') + '. Tente novamente.');
                    if (btn) { btn.disabled = false; btn.innerHTML = '⚡ Pagar via Mercado Pago (PIX)'; }
                }
            };

            (window as any).closeMpPix = () => closeModal('mp-pix-modal');
            (window as any).copyMpQrCode = () => {
                const text = (window as any)._mpQrCodeText || '';
                navigator.clipboard.writeText(text).then(() => {
                    const btn = document.getElementById('btn-copy-mp-qr');
                    if (btn) { btn.textContent = '✓ Copiado!'; setTimeout(() => { btn.textContent = 'Copiar código'; }, 2000); }
                });
            };

            // ── Comprovante preview ──
            (window as any).previewComprovante = (input: HTMLInputElement) => {
                const preview = document.getElementById('comprovante-preview') as HTMLImageElement;
                const label = document.getElementById('comprovante-label');
                if (input.files?.[0]) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        if (preview) { preview.src = e.target?.result as string; preview.style.display = 'block'; }
                        if (label) label.textContent = input.files![0].name;
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            };
        }

        // ── Render helpers ───────────────────────────────────────────────────
        const renderProductCard = (p: any, usePromo: boolean = false) => {
            const title = usePromo ? (p.promotionalName || p.name) : p.name;
            const price = usePromo ? (p.promotionalPrice || p.price) : p.price;
            const originalPrice = usePromo ? p.price : null;
            const isOutOfStock = p.stock === 0;

            if (hasVendaCatalogo) {
                return `
                <div class="product-card" style="${isOutOfStock ? 'opacity:0.6;' : ''}">
                    <div class="card-image">
                        <img src="${getImageUrl(p)}" alt="${title}" loading="lazy">
                        ${usePromo ? '<div class="promo-tag">OFERTA</div>' : ''}
                        ${isOutOfStock ? '<div class="promo-tag" style="background:#ef4444;left:15px;right:auto;">ESGOTADO</div>' : ''}
                    </div>
                    <div class="card-info">
                        <h3>${title}</h3>
                        ${modulos.includes('agendamento') && p.observation ? `<p style="font-size:0.8rem;color:#94a3b8;margin:4px 0 8px;line-height:1.4;">${p.observation}</p>` : ''}
                        <div class="price-container">
                            <span class="price">R$ ${price?.toFixed(2)}</span>
                            ${originalPrice ? `<span class="original-price">R$ ${originalPrice.toFixed(2)}</span>` : ''}
                        </div>
                        ${p.stock != null && !isOutOfStock && p.stock <= 10 ? `<p style="font-size:0.75rem;color:#eab308;margin:6px 0 0;">⚠️ Apenas ${p.stock} restante${p.stock !== 1 ? 's' : ''}</p>` : ''}
                        <button id="btn-add-${p.id}" onclick="window.catAddToCart('${p.id}')" ${isOutOfStock ? 'disabled' : ''}
                            style="margin-top:12px;width:100%;padding:10px;border-radius:10px;background:${isOutOfStock ? 'rgba(255,255,255,0.05)' : 'var(--primary-cat)'};color:${isOutOfStock ? '#94a3b8' : 'white'};border:none;cursor:${isOutOfStock ? 'not-allowed' : 'pointer'};font-weight:700;font-size:0.9rem;transition:all 0.2s;">
                            ${isOutOfStock ? 'Esgotado' : '+ Adicionar'}
                        </button>
                    </div>
                </div>`;
            }

            return `
                <div class="product-card">
                    <div class="card-image">
                        <img src="${getImageUrl(p)}" alt="${title}" loading="lazy">
                        ${usePromo ? '<div class="promo-tag">OFERTA</div>' : ''}
                    </div>
                    <div class="card-info">
                        <h3>${title}</h3>
                        ${modulos.includes('agendamento') && p.observation ? `<p style="font-size:0.8rem;color:#94a3b8;margin:4px 0 8px;line-height:1.4;">${p.observation}</p>` : ''}
                        <div class="price-container">
                            <span class="price">R$ ${price?.toFixed(2)}</span>
                            ${originalPrice ? `<span class="original-price">R$ ${originalPrice.toFixed(2)}</span>` : ''}
                        </div>
                    </div>
                </div>`;
        };

        // ── Modal styles ─────────────────────────────────────────────────────
        const MODAL_BASE = 'display:none;position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.75);align-items:center;justify-content:center;backdrop-filter:blur(4px);color:white;overflow-y:auto;padding:16px 0;';
        const MODAL_CARD = 'background:#1e293b;border-radius:24px;width:92%;max-width:460px;padding:28px;max-height:90vh;overflow-y:auto;box-sizing:border-box;';
        const MODAL_HEADER = (title: string, closeCall: string) => `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h3 style="margin:0;font-size:1.1rem;font-weight:700;display:flex;align-items:center;gap:10px;">${title}</h3>
                <button onclick="${closeCall}" style="background:rgba(255,255,255,0.1);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
            </div>`;
        const BTN_PRIMARY = (id: string, onclick: string, label: string, extra = '') => `<button id="${id}" onclick="${onclick}" style="width:100%;padding:14px;border-radius:14px;background:#6366f1;color:white;border:none;cursor:pointer;font-weight:700;font-size:1rem;${extra}">${label}</button>`;

        const modalsHtml = hasVendaCatalogo ? `
            <!-- CART MODAL -->
            <div id="cart-modal" style="${MODAL_BASE}align-items:flex-end;padding:0;">
                <div style="background:#1e293b;border-radius:24px 24px 0 0;width:100%;max-width:520px;max-height:85vh;display:flex;flex-direction:column;padding:24px;overflow:hidden;">
                    ${MODAL_HEADER('<i class="fa-solid fa-cart-shopping"></i> Meu Carrinho', 'window.closeCart()')}
                    <div id="cart-items" style="flex:1;overflow-y:auto;min-height:80px;"></div>
                    <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:16px;margin-top:16px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                            <span style="font-weight:700;">Total</span>
                            <span id="cart-total" style="font-size:1.3rem;font-weight:800;color:#6366f1;">R$ 0,00</span>
                        </div>
                        ${BTN_PRIMARY('btn-go-delivery', 'window.goToDelivery()', '<i class="fa-solid fa-arrow-right"></i> Finalizar Pedido')}
                    </div>
                </div>
            </div>

            <!-- DELIVERY MODAL -->
            <div id="delivery-modal" style="${MODAL_BASE}align-items:flex-start;">
                <div style="${MODAL_CARD}">
                    ${MODAL_HEADER('<i class="fa-solid fa-box"></i> Como deseja receber?', 'window.closeDelivery()')}
                    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">
                        <div id="delivery-card-entrega" class="delivery-card" ${permitirEntrega !== false && flatBairros.length > 0 ? `onclick="window.selectDelivery('entrega')"` : ''} style="padding:18px;border-radius:16px;border:2px solid rgba(255,255,255,0.1);${permitirEntrega !== false && flatBairros.length > 0 ? 'cursor:pointer;' : 'opacity:0.5;cursor:not-allowed;'}display:flex;align-items:center;gap:16px;transition:all 0.2s;">
                            <div style="width:48px;height:48px;border-radius:12px;background:rgba(99,102,241,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                <i class="fa-solid fa-truck" style="font-size:1.3rem;color:#6366f1;"></i>
                            </div>
                            <div>
                                <p style="margin:0;font-weight:700;font-size:1rem;">Entrega</p>
                                <p style="margin:4px 0 0;color:${permitirEntrega !== false && flatBairros.length > 0 ? '#94a3b8' : '#ef4444'};font-size:0.85rem;">${permitirEntrega !== false && flatBairros.length > 0 ? 'Receber no endereço informado' : 'Entrega indisponível no momento'}</p>
                            </div>
                        </div>
                        <div id="delivery-card-retirada" class="delivery-card" onclick="window.selectDelivery('retirada')" style="padding:18px;border-radius:16px;border:2px solid rgba(255,255,255,0.1);cursor:pointer;display:flex;align-items:center;gap:16px;transition:all 0.2s;">
                            <div style="width:48px;height:48px;border-radius:12px;background:rgba(99,102,241,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                <i class="fa-solid fa-store" style="font-size:1.3rem;color:#6366f1;"></i>
                            </div>
                            <div>
                                <p style="margin:0;font-weight:700;font-size:1rem;">Retirada na Loja</p>
                                <p style="margin:4px 0 0;color:#94a3b8;font-size:0.85rem;">Buscar pessoalmente no estabelecimento</p>
                            </div>
                        </div>
                    </div>
                    ${BTN_PRIMARY('btn-go-customer', 'window.goToCustomer()', '<i class="fa-solid fa-arrow-right"></i> Continuar', 'opacity:0.4;cursor:not-allowed;')}
                </div>
            </div>

            <!-- CUSTOMER MODAL -->
            <div id="customer-modal" style="${MODAL_BASE}align-items:flex-start;">
                <div style="${MODAL_CARD}">
                    ${MODAL_HEADER('<i class="fa-solid fa-user"></i> Seus Dados', 'window.closeCustomer()')}
                    <div style="margin-bottom:16px;">
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">Nome Completo</label>
                        <input id="checkout-name" type="text" placeholder="Seu nome" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;">
                    </div>
                    <div style="margin-bottom:16px;">
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">WhatsApp</label>
                        <input id="checkout-phone" type="tel" placeholder="(11) 99999-9999" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;">
                    </div>
                    <div id="address-group" style="display:none;margin-bottom:16px;">
                        ${flatBairros.length > 0 ? `
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">Bairro</label>
                        <div id="bairro-input-wrapper" style="position:relative;margin-bottom:12px;">
                            <input type="text" id="checkout-bairro" placeholder="Digite ou selecione seu bairro..." autocomplete="off" oninput="window.catFilterBairros(this.value)" onfocus="window.catFilterBairros(this.value)" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;outline:none;">
                            <div id="checkout-bairro-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:160px;overflow-y:auto;background:#1e293b;border:1px solid rgba(255,255,255,0.1);border-radius:10px;z-index:9999;box-shadow:0 4px 15px rgba(0,0,0,0.5);margin-top:4px;"></div>
                        </div>
                        ` : ''}
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">Endereço Completo</label>
                        <input id="checkout-address" type="text" placeholder="Rua, número, complemento" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;">
                    </div>
                    ${BTN_PRIMARY('btn-go-payment', 'window.goToPayment()', 'Escolher Pagamento →', 'margin-top:8px;')}
                </div>
            </div>

            <!-- PAYMENT MODAL -->
            <div id="payment-modal" style="${MODAL_BASE}align-items:flex-start;">
                <div style="${MODAL_CARD}">
                    ${MODAL_HEADER('<i class="fa-solid fa-credit-card"></i> Forma de Pagamento', 'window.closePayment()')}
                    <div id="payment-order-summary" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin-bottom:14px;font-size:0.9rem;"></div>
                    
                    <div id="mandatory-pay-msg" style="display:none;padding:12px;background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.2);border-radius:12px;margin-bottom:14px;color:#fbbf24;font-size:0.85rem;line-height:1.4;">
                        <i class="fa-solid fa-circle-info"></i> Atenção: Para pedidos para retirada é obrigatório o pagamento adiantado pois o produto vai ser reservado.
                    </div>

                    <div id="cat-coupon-section" style="display:none;margin-bottom:16px;">
                        <button onclick="window.catToggleCoupon()" style="background:none;border:none;color:#6366f1;font-size:0.85rem;font-weight:600;cursor:pointer;padding:4px 0;display:flex;align-items:center;gap:6px;margin-bottom:8px;">
                            <i class="fa-solid fa-tag" aria-hidden="true"></i>
                            <span id="cat-coupon-toggle-label">Tenho um cupom de desconto</span>
                        </button>
                        <div id="cat-coupon-input-wrapper" style="display:none;">
                            <div style="display:flex;gap:8px;">
                                <input id="cat-coupon-input" type="text" placeholder="Código do cupom" aria-label="Código do cupom" style="flex:1;padding:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.9rem;text-transform:uppercase;">
                                <button onclick="window.catApplyCoupon()" style="padding:10px 16px;background:rgba(99,102,241,0.2);color:#6366f1;border:1px solid rgba(99,102,241,0.3);border-radius:10px;cursor:pointer;font-weight:700;white-space:nowrap;" aria-label="Aplicar cupom"><i class="fa-solid fa-check" aria-hidden="true"></i> Aplicar</button>
                            </div>
                            <p id="cat-coupon-msg" style="font-size:0.8rem;margin:4px 0 0;min-height:16px;" aria-live="polite"></p>
                        </div>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:12px;">
                        <button id="btn-pay-delivery" onclick="window.catToggleDeliveryOptions()"
                            style="padding:16px;border-radius:14px;background:rgba(255,255,255,0.05);color:white;border:1px solid rgba(255,255,255,0.1);cursor:pointer;font-weight:700;font-size:0.95rem;text-align:left;display:flex;align-items:center;gap:12px;">
                            <i class="fa-solid fa-handshake" style="font-size:1.2rem;"></i> <span>Pagar na Entrega / Retirada</span>
                        </button>
                        
                        <div id="delivery-payment-details" style="display:none;margin-top:-4px;padding:16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;flex-direction:column;gap:12px;animation: fadeInDown 0.3s ease;">
                            <p style="margin:0;font-size:0.8rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Escolha como pagar:</p>
                            <div style="display:flex;gap:10px;">
                                <button onclick="window.catSelectDeliverySubMethod('dinheiro')" id="btn-sub-dinheiro" class="btn-sub-method" style="flex:1;padding:12px;border-radius:10px;background:rgba(255,255,255,0.05);color:white;border:1px solid rgba(255,255,255,0.1);cursor:pointer;font-size:0.9rem;font-weight:600;transition:all 0.2s;">
                                    <i class="fa-solid fa-money-bill-1" style="margin-right:6px;"></i> Dinheiro
                                </button>
                                <button onclick="window.catSelectDeliverySubMethod('cartao')" id="btn-sub-cartao" class="btn-sub-method" style="flex:1;padding:12px;border-radius:10px;background:rgba(255,255,255,0.05);color:white;border:1px solid rgba(255,255,255,0.1);cursor:pointer;font-size:0.9rem;font-weight:600;transition:all 0.2s;">
                                    <i class="fa-solid fa-credit-card" style="margin-right:6px;"></i> Cartão
                                </button>
                            </div>
                            <div id="troco-wrapper" style="display:none;padding:12px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.05);">
                                <label style="display:block;font-size:0.75rem;color:#94a3b8;margin-bottom:8px;font-weight:600;">Precisa de troco para quanto?</label>
                                <div style="display:flex;align-items:center;gap:8px;">
                                    <span style="color:#94a3b8;font-weight:700;">R$</span>
                                    <input type="number" id="cat-troco-input" placeholder="Ex: 50,00" style="flex:1;padding:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:white;font-size:1rem;font-weight:700;outline:none;">
                                </div>
                            </div>
                            <button id="btn-confirm-delivery-sub" onclick="window.confirmOrderDelivery()" disabled style="opacity:0.5;margin-top:4px;padding:14px;border-radius:12px;background:#6366f1;color:white;border:none;cursor:pointer;font-weight:800;font-size:1rem;transition:all 0.2s;box-shadow:0 4px 12px rgba(99,102,241,0.3);">
                                <i class="fa-solid fa-check" style="margin-right:8px;"></i> Confirmar Pedido
                            </button>
                        </div>
                        <button id="btn-pay-pix-manual" onclick="window.showPixManual()"
                            style="display:${pixKey ? 'flex' : 'none'};padding:16px;border-radius:14px;background:rgba(16,185,129,0.08);color:#10b981;border:1px solid rgba(16,185,129,0.2);cursor:pointer;font-weight:700;font-size:0.95rem;text-align:left;align-items:center;gap:12px;">
                            <i class="fa-brands fa-pix" style="font-size:1.2rem;"></i> <span>PIX Manual</span>
                        </button>
                        <button id="btn-pay-pix-mp" onclick="window.confirmPixMercadoPago()"
                            style="display:${isMpActive ? 'flex' : 'none'};padding:16px;border-radius:14px;background:#009ee3;color:white;border:none;cursor:pointer;font-weight:700;font-size:0.95rem;text-align:left;align-items:center;gap:12px;">
                            <i class="fa-solid fa-credit-card" style="font-size:1.2rem;"></i> <span>Pagar via Mercado Pago (PIX)</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- PIX MANUAL MODAL -->
            <div id="pix-manual-modal" style="${MODAL_BASE}align-items:flex-start;">
                <div style="${MODAL_CARD}">
                    ${MODAL_HEADER('<i class="fa-brands fa-pix"></i> Pagamento via PIX', 'window.closePixManual()')}
                    <div id="pix-manual-summary" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin-bottom:16px;font-size:0.9rem;"></div>
                    <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:14px;padding:16px;margin-bottom:16px;">
                        <p style="margin:0 0 6px;font-weight:700;font-size:0.9rem;color:#10b981;"><i class="fa-brands fa-pix"></i> Chave PIX:</p>
                        <p id="pix-key-value" style="margin:0 0 12px;font-family:monospace;font-size:1rem;color:white;word-break:break-all;"></p>
                        <button id="btn-copy-pix" onclick="window.copyPixKey()" style="padding:8px 16px;border-radius:8px;background:rgba(16,185,129,0.2);color:#10b981;border:1px solid rgba(16,185,129,0.3);cursor:pointer;font-weight:700;font-size:0.85rem;">Copiar</button>
                    </div>
                    <div style="margin-bottom:16px;">
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:8px;"><i class="fa-solid fa-receipt"></i> Comprovante de Pagamento <span style="color:#94a3b8;font-weight:400;">(opcional)</span></label>
                        <div onclick="document.getElementById('pix-comprovante-input').click()" style="border:2px dashed rgba(255,255,255,0.15);border-radius:12px;padding:18px;text-align:center;cursor:pointer;transition:all 0.2s;" 
                             onmouseover="this.style.borderColor='#6366f1'" onmouseout="this.style.borderColor='rgba(255,255,255,0.15)'">
                            <input type="file" id="pix-comprovante-input" accept="image/*,application/pdf" style="display:none;" onchange="window.previewComprovante(this)">
                            <img id="comprovante-preview" style="max-width:100%;max-height:140px;border-radius:8px;display:none;margin:0 auto 8px;">
                            <i class="fa-solid fa-cloud-arrow-up" style="font-size:1.5rem;color:#6366f1;display:block;margin-bottom:6px;"></i>
                            <p id="comprovante-label" style="margin:0;font-size:0.85rem;color:#94a3b8;">Clique para anexar o comprovante</p>
                        </div>
                    </div>
                    ${BTN_PRIMARY('btn-confirm-pix-manual', 'window.confirmPixManual()', '<i class="fa-solid fa-check"></i> Confirmar Pagamento PIX')}
                </div>
            </div>

            <!-- MERCADO PAGO PIX MODAL -->
            <div id="mp-pix-modal" style="${MODAL_BASE}align-items:flex-start;">
                <div style="${MODAL_CARD}">
                    ${MODAL_HEADER('<i class="fa-solid fa-qrcode"></i> PIX — Mercado Pago', 'window.closeMpPix()')}
                    <div id="mp-pix-summary" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin-bottom:16px;font-size:0.9rem;"></div>
                    <div style="text-align:center;margin-bottom:16px;">
                        <img id="mp-qr-img" style="width:180px;height:180px;border-radius:12px;background:white;padding:8px;display:none;margin:0 auto 12px;">
                        <p style="color:#94a3b8;font-size:0.85rem;margin-bottom:12px;">Ou copie o código abaixo:</p>
                        <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px;margin-bottom:10px;">
                            <p id="mp-qr-code" style="margin:0;font-family:monospace;font-size:0.75rem;color:#94a3b8;word-break:break-all;max-height:80px;overflow-y:auto;"></p>
                        </div>
                        <button id="btn-copy-mp-qr" onclick="window.copyMpQrCode()" style="padding:10px 20px;border-radius:10px;background:rgba(0,158,227,0.15);color:#009ee3;border:1px solid rgba(0,158,227,0.3);cursor:pointer;font-weight:700;font-size:0.9rem;">Copiar código</button>
                    </div>
                    <p style="text-align:center;color:#94a3b8;font-size:0.8rem;">Após o pagamento, seu pedido será processado automaticamente.</p>
                </div>
            </div>

            <!-- CONFIRMATION MODAL -->
            <div id="confirmation-modal" style="${MODAL_BASE}">
                <div style="${MODAL_CARD}text-align:center;">
                    <div style="width:72px;height:72px;border-radius:50%;background:rgba(16,185,129,0.15);border:2px solid rgba(16,185,129,0.3);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
                        <i class="fa-solid fa-circle-check" style="font-size:2.5rem;color:#10b981;"></i>
                    </div>
                    <h2 style="margin:0 0 10px;font-size:1.4rem;font-weight:800;">Pedido Confirmado!</h2>
                    <p style="color:#94a3b8;margin-bottom:20px;">Seu pedido foi recebido com sucesso.</p>
                    <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:12px;padding:16px;margin-bottom:20px;">
                        <span style="font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;">Número do Pedido</span>
                        <p id="order-id-display" style="margin:6px 0 0;font-size:1.5rem;font-weight:800;letter-spacing:3px;color:#6366f1;">#000000</p>
                    </div>
                    <div id="pix-info-section" style="display:none;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:16px;margin-bottom:20px;text-align:left;">
                        <p style="margin:0 0 8px;font-weight:700;">⚡ Chave PIX para pagamento:</p>
                        <p id="pix-key-display" style="margin:0;font-family:monospace;font-size:1rem;color:#10b981;word-break:break-all;"></p>
                    </div>
                    <button onclick="document.getElementById('confirmation-modal').style.display='none'" style="width:100%;padding:14px;border-radius:14px;background:#6366f1;color:white;border:none;cursor:pointer;font-weight:700;">
                        Continuar Comprando
                    </button>
                </div>
            </div>

            <!-- INFO MODAL -->
            <div id="store-info-modal" style="${MODAL_BASE}">
                <div style="${MODAL_CARD}max-width:500px;">
                    ${MODAL_HEADER('<i class="fa-solid fa-circle-info"></i> Informações da Loja', 'window.closeStoreInfo()')}
                    <div style="padding:10px 0;">
                        <h4 style="margin:0 0 10px;color:#6366f1;"><i class="fa-regular fa-clock"></i> Horário de Funcionamento</h4>
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:8px 16px;margin-bottom:20px;font-size:0.9rem;">
                            ${renderHorarios()}
                        </div>
                        <h4 style="margin:0 0 10px;color:#6366f1;"><i class="fa-solid fa-credit-card"></i> Formas de Pagamento</h4>
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:12px;font-size:0.9rem;display:flex;flex-wrap:wrap;gap:8px;">
                            <span class="badge info" style="background:rgba(59,130,246,0.1);color:#60a5fa;border:1px solid rgba(59,130,246,0.2);padding:4px 8px;border-radius:6px;font-size:0.8rem;"><i class="fa-solid fa-money-bill"></i> Na Entrega/Retirada</span>
                            ${pixKey ? `<span class="badge success" style="background:rgba(16,185,129,0.1);color:#4ade80;border:1px solid rgba(16,185,129,0.2);padding:4px 8px;border-radius:6px;font-size:0.8rem;"><i class="fa-brands fa-pix"></i> PIX</span>` : ''}
                            ${isMpActive ? `<span class="badge primary" style="background:rgba(99,102,241,0.1);color:#818cf8;border:1px solid rgba(99,102,241,0.2);padding:4px 8px;border-radius:6px;font-size:0.8rem;"><i class="fa-solid fa-credit-card"></i> Mercado Pago</span>` : ''}
                        </div>
                    </div>
                </div>
            </div>

            <!-- CLOSED ALERT MODAL -->
            <div id="closed-alert-modal" style="${MODAL_BASE}z-index:9999;">
                <div style="${MODAL_CARD}text-align:center;">
                    <div style="width:72px;height:72px;border-radius:50%;background:rgba(239,68,68,0.15);border:2px solid rgba(239,68,68,0.3);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
                        <i class="fa-solid fa-store-slash" id="closed-alert-icon" style="font-size:2.5rem;color:#ef4444;"></i>
                    </div>
                    <h2 id="closed-alert-title" style="margin:0 0 10px;font-size:1.4rem;font-weight:800;color:white;">Loja Fechada</h2>
                    <p id="closed-alert-desc" style="color:#94a3b8;margin-bottom:20px;">No momento não estamos aceitando pedidos.</p>
                    <div id="closed-alert-time-section" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;margin-bottom:20px;">
                        <span style="font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;"><i class="fa-regular fa-clock"></i> Voltamos</span>
                        <p id="next-open-time" style="margin:6px 0 0;font-size:1.2rem;font-weight:800;color:#6366f1;"></p>
                    </div>
                    <button onclick="document.getElementById('closed-alert-modal').style.display='none'" style="width:100%;padding:14px;border-radius:14px;background:rgba(255,255,255,0.1);color:white;border:none;cursor:pointer;font-weight:700;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
                        Entendi
                    </button>
                </div>
            </div>

            <!-- FLOATING CART BUTTON -->
            <button id="cart-float-btn" onclick="window.openCart()" style="display:none;" class="cart-float-btn">
                <div class="cart-float-left">
                    <i class="fa-solid fa-bag-shopping" style="font-size:1.2rem;"></i>
                    <span id="cart-badge-float" class="cart-badge-float">0</span>
                </div>
                <div class="cart-float-center">Ver sacola</div>
                <div class="cart-float-right" id="cart-total-float">R$ 0,00</div>
            </button>
        ` : '';
        setTimeout(() => { if (cart.size > 0 && typeof updateCartUI === 'function') updateCartUI(); }, 100);

        return `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
                :root {
                    --primary-cat: ${primaryColor};
                    --primary-glow: ${primaryColor}4D;
                    --bg: ${secondaryColor};
                    --card-bg: rgba(255,255,255,0.03);
                    --glass: rgba(255,255,255,0.05);
                    --text: ${textColor};
                    --text-muted: #94a3b8;
                    --price-cat: ${priceColor};
                    --product-bg: ${design.productBgColor || 'rgba(255,255,255,0.05)'};
                }
                @keyframes fadeInDown { from { opacity:0;transform:translateY(-30px); } to { opacity:1;transform:translateY(0); } }
                @keyframes pulse-soft { 0%{box-shadow:0 0 0 0 var(--primary-glow);} 70%{box-shadow:0 0 0 15px transparent;} 100%{box-shadow:0 0 0 0 transparent;} }
                .catalog-body { background:var(--bg);color:var(--text);font-family:'Outfit',sans-serif;min-height:100vh;margin:0;padding-bottom:80px;overflow-x:hidden; }
                .header { position:relative;padding:80px 20px 40px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px;animation:fadeInDown 0.8s cubic-bezier(0.2,0.8,0.2,1);overflow:hidden; }
                .header-glass { display:none; }
                .store-logo-wrapper { position:relative;z-index:1;padding:6px;background:linear-gradient(135deg,rgba(255,255,255,0.2),transparent);border-radius:50%;box-shadow:0 20px 40px rgba(0,0,0,0.3); }
                .store-logo { width:120px;height:120px;object-fit:cover;border-radius:50%;background:#fff;display:block;border:2px solid rgba(255,255,255,0.1); }
                .status-badge { z-index:1;display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);border-radius:100px;color:#10b981;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;animation:pulse-soft 2s infinite; }
                .header h1 { z-index:1;font-size:2.4rem;font-weight:800;margin:0 0 8px;letter-spacing:-1px;color:var(--text); }
                .header-address { z-index:1;color:var(--text-muted);font-size:0.95rem;margin:0 0 12px;max-width:400px;line-height:1.4;opacity:0.9; }
                .store-info-btn { z-index:1;font-size:0.9rem;margin-bottom:16px;display:flex;align-items:center;justify-content:center;gap:6px;color:var(--primary-cat);cursor:pointer;font-weight:700;background:var(--primary-glow);padding:6px 16px;border-radius:100px;transition:0.2s; }
                .store-status-card { background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px 20px;display:flex;flex-direction:column;gap:6px;font-size:0.9rem;color:var(--text);min-width:260px;backdrop-filter:blur(10px);z-index:1; }

                /* MODERNO THEME HDR */
                .cat-moderno-header { background: var(--bg); color: var(--text); border-bottom: 2px solid transparent; border-image: linear-gradient(to right, var(--primary-cat) 0%, transparent 100%) 1; }
                .cat-search-bar-top-container { padding: 16px 20px; background: rgba(0,0,0,0.02); }
                .cat-search-bar-wrap { display:flex; align-items:center; background:var(--bg); border-radius:12px; padding:0 16px; border:2px solid var(--primary-cat); max-width:1200px; margin:0 auto; box-shadow:0 4px 15px rgba(0,0,0,0.1); }
                .cat-search-bar-wrap i { color:var(--primary-cat); font-size:1.1rem; }
                .cat-search-bar-wrap input { flex:1; border:none; background:transparent; padding:16px; font-size:1.05rem; outline:none; color:var(--text); font-family:'Outfit',sans-serif; }
                .cat-search-bar-wrap input::placeholder { color:var(--text-muted); }
                .cat-moderno-banner-hero { width: 100%; height: 220px; overflow: hidden; position: relative; }
                .cat-moderno-banner-hero img { width: 100%; height: 100%; object-fit: cover; }
                .cat-moderno-banner-hero .cat-banner-fallback { width: 100%; height: 100%; background: linear-gradient(135deg, var(--primary-cat), rgba(0,0,0,0.2)); display:flex; align-items:center; justify-content:center; font-size:4rem; color:rgba(255,255,255,0.3); }
                .cat-moderno-info { max-width: 1200px; margin: 0 auto; padding: 0 20px 24px; position: relative; }
                .cat-moderno-logo-wrap { width: 110px; height: 110px; border-radius: 50%; border: 4px solid #ffffff; background: #ffffff; position: relative; margin-top: -55px; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); overflow: hidden; }
                .cat-moderno-logo-wrap img { width: 100%; height: 100%; object-fit: cover; }
                .cat-moderno-logo-wrap .fallback-logo { width:100%; height:100%; background:var(--primary-glow); display:flex; align-items:center; justify-content:center; }
                .cat-moderno-info h1 { font-size: 2rem; font-weight: 800; margin: 0 0 8px; color: var(--text); }
                .cat-moderno-address { font-size: 0.95rem; color: var(--text-muted); margin: 0 0 12px; font-weight: 500; }
                .moderno-more-info { color: var(--primary-cat); font-weight: 700; cursor: pointer; text-decoration: none; opacity: 0.8; transition: 0.2s; }
                .moderno-more-info:hover { opacity: 1; }
                .cat-moderno-status-row { display: flex; align-items: center; gap: 4px; font-size: 0.95rem; flex-wrap: wrap; font-weight: 600; color: var(--text); }


                .section-container { position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:0 20px; }
                .section-title { display:flex;align-items:center;gap:15px;margin:60px 0 30px 0; }
                .section-title span { font-size:1.8rem;font-weight:700;letter-spacing:-0.5px;color:var(--text); }
                .section-title .line { flex:1;height:1px;background:linear-gradient(to right,var(--primary-cat),transparent);opacity:0.3; }
                .section-title i { width:48px;height:48px;background:var(--glass);border:1px solid rgba(255,255,255,0.08);border-radius:14px;display:flex;align-items:center;justify-content:center;color:var(--primary-cat);font-size:1.2rem;box-shadow:0 10px 20px rgba(0,0,0,0.1); }
                .product-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:30px; }
                .product-card { background:var(--product-bg);border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;transition:all 0.4s cubic-bezier(0.2,0.8,0.2,1); }
                .product-card:hover { transform:translateY(-8px) scale(1.01);border-color:var(--primary-cat);box-shadow:0 20px 40px -10px rgba(0,0,0,0.4),0 0 20px var(--primary-glow); }
                .card-image { position:relative;aspect-ratio:1/1;overflow:hidden; }
                .card-image img { width:100%;height:100%;object-fit:cover;transition:transform 0.6s cubic-bezier(0.2,0.8,0.2,1); }
                .product-card:hover .card-image img { transform:scale(1.1); }
                .promo-tag { position:absolute;top:15px;right:15px;background:var(--primary-cat);color:white;padding:6px 14px;border-radius:12px;font-size:0.75rem;font-weight:800;box-shadow:0 8px 20px var(--primary-glow); }
                .card-info { padding:20px; }
                .card-info h3 { margin:0 0 12px 0;font-size:1.1rem;font-weight:700;color:var(--text);line-height:1.3; }
                .price-container { display:flex;align-items:center;gap:12px; }
                .price { font-size:1.3rem;font-weight:800;color:var(--price-cat); }
                .original-price { font-size:0.9rem;color:var(--text-muted);text-decoration:line-through;opacity:0.6; }
                .whatsapp-float { position:fixed;bottom:30px;right:30px;background:#25d366;color:white;padding:12px 24px;border-radius:100px;text-decoration:none;display:flex;align-items:center;gap:12px;font-weight:700;box-shadow:0 10px 25px rgba(37,211,102,0.4);z-index:7999;transition:all 0.3s;animation:fadeInDown 0.8s backwards 1s;white-space:nowrap;max-width:calc(100vw - 40px); }
                .whatsapp-float:hover { transform:scale(1.05) translateY(-5px); }
                .whatsapp-float i { font-size:1.5rem; }
                .delivery-card:hover { border-color: var(--primary-cat) !important; background: rgba(255,255,255,0.03); }
                /* Cat search/sidebar (Moderno theme) */
                .cart-float-btn { position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:var(--primary-cat);color:white;border:none;padding:14px 24px;border-radius:100px;font-weight:700;font-size:1rem;cursor:pointer;z-index:8000;align-items:center;justify-content:space-between;box-shadow:0 10px 30px rgba(0,0,0,0.3);width:fit-content;min-width:320px;display:none; transition:transform 0.2s; }
                .cart-float-btn:hover { transform:translateX(-50%) scale(1.02); }
                .cart-float-left { display:flex;align-items:center;gap:8px; }
                .cart-badge-float { background:white;color:var(--primary-cat);border-radius:100px;padding:2px 8px;font-size:0.75rem;font-weight:800; display:inline-block; line-height:1; }
                .cart-float-center { font-weight:700; }
                .cart-float-right { font-weight:700; }
                @media(max-width:600px) {
                    .cart-float-btn { bottom:0;left:0;transform:none;width:100%;border-radius:0;min-width:unset;padding:18px 24px;box-shadow:0 -5px 20px rgba(0,0,0,0.4); }
                    .cart-float-btn:hover { transform:none; }
                }
                .cat-search-bar { display:block;width:100%;padding:14px 18px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:100px;color:var(--text);font-size:1rem;font-family:'Outfit',sans-serif;box-sizing:border-box;outline:none;margin-bottom:24px;transition:border-color .2s; }
                .cat-search-bar:focus { border-color:var(--primary-cat); }
                .cat-search-bar::placeholder { color:#64748b; }
                .cat-sidebar { display:flex;flex-direction:column;gap:4px; }
                .cat-sidebar-link { display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;color:#94a3b8;cursor:pointer;font-size:0.92rem;font-weight:600;border:none;background:none;width:100%;text-align:left;transition:all .15s; }
                .cat-sidebar-link:hover,.cat-sidebar-link.active { background:rgba(99,102,241,.15);color:var(--text); }
                .cat-sidebar-link i { width:18px;text-align:center;color:var(--primary-cat); }
                .cat-modern-layout { display:grid;grid-template-columns:200px 1fr;gap:28px;max-width:1200px;margin:0 auto;padding:0 20px 80px; }
                /* Banner hero */
                .cat-banner-hero { width:100%;max-height:340px;overflow:hidden;position:relative; }
                .cat-banner-hero img { width:100%;height:100%;object-fit:cover;display:block; }
                .cat-banner-fallback { width:100%;height:180px;background:linear-gradient(135deg,var(--primary-cat),rgba(168,85,247,0.8));display:flex;align-items:center;justify-content:center; }
                /* Accessibility */
                *:focus-visible { outline:3px solid var(--primary-cat);outline-offset:2px; }
                @media(prefers-reduced-motion:reduce){ *,::before,::after { animation-duration:.01ms!important;transition-duration:.01ms!important; } }
                /* iFood Style Selector */
                .cat-selector-wrapper { margin: 24px 0 40px; }
                .cat-selector-scroll { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 12px; scrollbar-width: none; -ms-overflow-style: none; }
                .cat-selector-scroll::-webkit-scrollbar { display: none; }
                .cat-selector-item { flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; border: none; background: none; padding: 0; outline: none; transition: transform 0.2s; }
                .cat-selector-item:hover { transform: translateY(-3px); }
                .cat-selector-icon-wrap { width: 64px; height: 64px; border-radius: 18px; background: var(--glass); border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content:center; color: var(--primary-cat); font-size: 1.4rem; transition: all 0.3s; box-shadow: 0 8px 16px rgba(0,0,0,0.1); }
                .cat-selector-item.active .cat-selector-icon-wrap { background: var(--primary-cat); color: white; border-color: var(--primary-cat); box-shadow: 0 10px 20px var(--primary-glow); }
                .cat-selector-label { font-size: 0.82rem; font-weight: 600; color: var(--text); opacity: 0.8; transition: opacity 0.3s; white-space: nowrap; }
                .cat-selector-item.active .cat-selector-label { opacity: 1; color: var(--primary-cat); }
                .promo-highlight { color: #fbbf24 !important; text-shadow: 0 0 15px rgba(251, 191, 36, 0.4); }
                .section-title.promo i { background: rgba(251, 191, 36, 0.15); border-color: rgba(251, 191, 36, 0.3); color: #fbbf24; }
                .section-container-cat { animation: fadeInDown 0.5s ease backwards; }
                @media(max-width:768px){ 
                    .cat-modern-layout { grid-template-columns:1fr; gap:16px; } 
                    .cat-sidebar-sticky { display:block; position:-webkit-sticky; position:sticky; top:0; height:auto; z-index:10; background:var(--bg); padding-top:10px; margin:-10px -20px 0; width:100vw; } 
                    .cat-sidebar { display:flex; flex-direction:row; flex-wrap:nowrap; overflow-x:auto; padding:0 20px 10px; scrollbar-width:none; -ms-overflow-style:none; gap:8px; width:100%; }
                    .cat-sidebar::-webkit-scrollbar { display:none; }
                    .cat-sidebar-link { flex:0 0 auto; white-space:nowrap; width:auto; padding:8px 16px; border:1px solid rgba(255,255,255,0.1); display:inline-flex; align-items:center; }
                    .cat-sidebar-sticky p { display:none; }
                }
                @media(max-width:600px){
                    .header{padding:60px 20px 30px;} .header h1{font-size:2rem;letter-spacing:-.5px;} 
                    .store-logo{width:80px;height:80px;} .product-grid{grid-template-columns:repeat(2,1fr);gap:12px;}
                    .section-container{padding:0 14px;} .section-title{margin:36px 0 16px;}
                    .section-title span{font-size:1.3rem;} .section-title i{width:36px;height:36px;font-size:0.9rem;}
                    .card-info{padding:12px;} .card-info h3{font-size:0.88rem;} .price{font-size:0.95rem;}
                    .whatsapp-float{bottom:16px;right:16px;padding:10px 14px;font-size:0.85rem;}
                    .cat-banner-hero{max-height:160px;}
                }
                @media(max-width:380px){ .whatsapp-float{padding:12px;border-radius:50%;right:12px;bottom:12px;} .whatsapp-float span{display:none;} }
            </style>

            <div class="catalog-body">
                ${themeId !== 'moderno' ? `
                <header class="header">
                    <div class="header-glass"></div>
                    <div class="status-badge"><i class="fa-solid fa-circle" style="font-size:6px;"></i> Loja Online</div>
                    ${logoUrl ? `<div class="store-logo-wrapper"><img src="${logoUrl}" alt="${store.name}" class="store-logo"></div>` : `<div style="width:90px;height:90px;border-radius:50%;background:var(--primary-glow);display:flex;align-items:center;justify-content:center;position:relative;z-index:1;"><i class="fa-solid fa-store" style="font-size:2rem;color:var(--primary-cat);"></i></div>`}
                    <h1>${store.name}</h1>
                    <p class="header-address"><i class="fa-solid fa-location-dot" style="margin-right:4px;opacity:0.7;"></i> ${store.address || 'Endereço não cadastrado'}</p>
                    
                    <div class="store-info-btn" onclick="window.openStoreInfo()">
                        Mais informações <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;margin-left:4px;"></i>
                    </div>

                    <div class="store-status-card">
                        <div style="font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px;">
                            ${getStoreStatus()}
                        </div>
                        ${storeIsOpen ? `
                        <div style="height:1px;background:rgba(255,255,255,0.05);margin:2px 0;"></div>
                        <div style="color:var(--text-muted);display:flex;align-items:center;justify-content:center;gap:6px;">
                            <i class="fa-solid fa-motorcycle"></i> ${permitirEntrega !== false ? 'Entrega e Retirada' : 'Apenas Retirada'}
                        </div>
                        ` : ''}
                    </div>
                </header>
                ` : ''}

                ${themeId === 'banner' ? `
                    <!-- Banner hero -->
                    ${(bannerUrl || bannerMobileUrl) ? `
                        <div class="cat-banner-hero" aria-label="Banner da loja">
                            <picture>
                                ${bannerMobileUrl ? `<source media="(max-width:600px)" srcset="${bannerMobileUrl}">` : ''}
                                <img src="${bannerUrl || bannerMobileUrl}" alt="Banner ${store.name}">
                            </picture>
                        </div>` : `
                        <div class="cat-banner-fallback" aria-hidden="true">
                            <i class="fa-solid fa-store" style="font-size:3rem;color:rgba(255,255,255,0.3);"></i>
                        </div>`}
                    <main class="section-container" style="padding-top:20px;">
                        ${promoProducts.length > 0 ? `<div class="section-title"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i><span>Ofertas do Dia</span><div class="line"></div></div><div class="product-grid" role="list">${promoProducts.map((p: any) => renderProductCard(p, true)).join('')}</div>` : ''}
                        ${categorizedData.map((cat: any) => `<div class="section-title"><i class="fa-solid ${cat.icon || 'fa-tag'}" aria-hidden="true"></i><span>${cat.name}</span><div class="line"></div></div><div class="product-grid" role="list">${cat.products.map((p: any) => renderProductCard(p, false)).join('')}</div>`).join('')}
                        ${uncategorizedProducts.length > 0 ? `<div class="section-title"><i class="fa-solid fa-box" aria-hidden="true"></i><span>Outros</span><div class="line"></div></div><div class="product-grid" role="list">${uncategorizedProducts.map((p: any) => renderProductCard(p, false)).join('')}</div>` : ''}
                        ${products.length === 0 ? `<div style="text-align:center;padding:80px 20px;color:var(--text-muted);"><i class="fa-solid fa-box-open" style="font-size:3rem;opacity:.3;display:block;margin-bottom:16px;"></i><p>Nenhum produto disponível no momento.</p></div>` : ''}
                    </main>

                ` : themeId === 'moderno' ? `
                    <!-- Moderno layout: sidebar + search + new header -->
                    <div class="cat-moderno-header">
                        <div class="cat-search-bar-top-container">
                            <div class="cat-search-bar-wrap">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <input type="search" id="cat-search-bar-top" placeholder="Buscar no catálogo" aria-label="Buscar produto" oninput="window.catSearch(this.value)">
                            </div>
                        </div>
                        
                        <div class="cat-moderno-banner-hero">
                            ${(bannerUrl || bannerMobileUrl) ? `
                            <picture>
                                ${bannerMobileUrl ? `<source media="(max-width:600px)" srcset="${bannerMobileUrl}">` : ''}
                                <img src="${bannerUrl || bannerMobileUrl}" alt="Banner ${store.name}">
                            </picture>
                            ` : `
                            <div class="cat-banner-fallback">
                                <i class="fa-solid fa-store"></i>
                            </div>
                            `}
                        </div>

                        <div class="cat-moderno-info">
                            <div class="cat-moderno-logo-wrap">
                                ${logoUrl ? `<img src="${logoUrl}" alt="${store.name}">` : `<div class="fallback-logo"><i class="fa-solid fa-store" style="font-size:2rem;color:var(--primary-cat);"></i></div>`}
                            </div>
                            <h1>${store.name}</h1>
                            <p class="cat-moderno-address">
                                ${store.address || 'Endereço não cadastrado'} <span style="margin:0 8px;">•</span> <span class="moderno-more-info" onclick="window.openStoreInfo()">Mais informações</span>
                            </p>
                            <div class="cat-moderno-status-row">
                                ${getStoreStatus()} 
                                ${storeIsOpen ? `<span class="badge" style="background:rgba(148,163,184,0.1);color:#475569;border:1px solid rgba(148,163,184,0.2);margin-left:8px;font-size:0.8rem;padding:4px 10px;border-radius:6px;font-weight:700;">${permitirEntrega !== false ? 'Entrega e Retirada' : 'Apenas Retirada'}</span>` : ''}
                            </div>
                        </div>
                    </div>

                    <div class="cat-modern-layout" style="padding-top:20px;">
                        <aside class="cat-sidebar-sticky" style="position:sticky;top:20px;height:fit-content;" aria-label="Categorias">
                            <p style="font-size:0.7rem;text-transform:uppercase;letter-spacing:.08em;color:#64748b;font-weight:700;margin:0 0 10px 14px;">Categorias</p>
                            <nav class="cat-sidebar">
                                <button class="cat-sidebar-link active" onclick="window.catFilterCat('all')" aria-pressed="true">
                                    <i class="fa-solid fa-th-large" aria-hidden="true"></i> Todos
                                </button>
                                ${promoProducts.length > 0 ? `<button class="cat-sidebar-link" onclick="window.catFilterCat('promo')"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i> Ofertas</button>` : ''}
                                ${categorizedData.map((cat: any) => `<button class="cat-sidebar-link" onclick="window.catFilterCat('${cat.id}')"><i class="fa-solid ${cat.icon || 'fa-tag'}" aria-hidden="true"></i> ${cat.name}</button>`).join('')}
                                ${uncategorizedProducts.length > 0 ? `<button class="cat-sidebar-link" onclick="window.catFilterCat('outros')"><i class="fa-solid fa-box" aria-hidden="true"></i> Outros</button>` : ''}
                            </nav>
                        </aside>
                        <div>
                            <div id="cat-moderno-content">
                                ${promoProducts.length > 0 ? `<div class="section-title" data-catgroup="promo"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i><span>Ofertas do Dia</span><div class="line"></div></div><div class="product-grid" data-catgroup="promo" role="list">${promoProducts.map((p: any) => renderProductCard(p, true)).join('')}</div>` : ''}
                                ${categorizedData.map((cat: any) => `<div class="section-title" data-catgroup="${cat.id}"><i class="fa-solid ${cat.icon || 'fa-tag'}" aria-hidden="true"></i><span>${cat.name}</span><div class="line"></div></div><div class="product-grid" data-catgroup="${cat.id}" role="list">${cat.products.map((p: any) => renderProductCard(p, false)).join('')}</div>`).join('')}
                                ${uncategorizedProducts.length > 0 ? `<div class="section-title" data-catgroup="outros"><i class="fa-solid fa-box" aria-hidden="true"></i><span>Outros</span><div class="line"></div></div><div class="product-grid" data-catgroup="outros" role="list">${uncategorizedProducts.map((p: any) => renderProductCard(p, false)).join('')}</div>` : ''}
                                ${products.length === 0 ? `<div style="text-align:center;padding:80px 20px;color:#64748b;"><i class="fa-solid fa-box-open" style="font-size:3rem;opacity:.3;display:block;margin-bottom:16px;"></i><p>Nenhum produto disponível.</p></div>` : ''}
                            </div>
                        </div>
                    </div>
                ` : `
                    <!-- Clássico (default) -->
                    <main class="section-container">
                        <div style="margin-top:20px;">
                            <input type="search" class="cat-search-bar" placeholder="O que você procura hoje?" oninput="window.catSearch(this.value)">
                        </div>
                        <div class="cat-selector-wrapper">
                            <div class="cat-selector-scroll">
                                <button class="cat-selector-item active" onclick="window.catFilterClassic('all')">
                                    <div class="cat-selector-icon-wrap"><i class="fa-solid fa-th-large"></i></div>
                                    <span class="cat-selector-label">Todos</span>
                                </button>
                                ${promoProducts.length > 0 ? `
                                <button class="cat-selector-item" onclick="window.catFilterClassic('promo')">
                                    <div class="cat-selector-icon-wrap" style="color:#fbbf24;"><i class="fa-solid fa-bolt-lightning"></i></div>
                                    <span class="cat-selector-label">Ofertas</span>
                                </button>` : ''}
                                ${categorizedData.map((cat: any) => `
                                <button class="cat-selector-item" onclick="window.catFilterClassic('${cat.id}')">
                                    <div class="cat-selector-icon-wrap"><i class="fa-solid ${cat.icon || 'fa-tag'}"></i></div>
                                    <span class="cat-selector-label">${cat.name}</span>
                                </button>`).join('')}
                                ${uncategorizedProducts.length > 0 ? `
                                <button class="cat-selector-item" onclick="window.catFilterClassic('outros')">
                                    <div class="cat-selector-icon-wrap"><i class="fa-solid fa-box"></i></div>
                                    <span class="cat-selector-label">Outros</span>
                                </button>` : ''}
                            </div>
                        </div>

                        <div id="classic-promo-section" style="${promoProducts.length > 0 ? '' : 'display:none;'}">
                            <div class="section-title promo"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i><span class="promo-highlight">Ofertas do Dia</span><div class="line" style="background:linear-gradient(to right,#fbbf24,transparent);"></div></div>
                            <div class="product-grid" role="list">${promoProducts.map((p: any) => renderProductCard(p, true)).join('')}</div>
                        </div>

                        <div id="classic-categories-container">
                            ${categorizedData.map((cat: any) => `
                                <div class="section-container-cat" data-classic-cat="${cat.id}">
                                    <div class="section-title"><i class="fa-solid ${cat.icon || 'fa-tag'}" aria-hidden="true"></i><span>${cat.name}</span><div class="line"></div></div>
                                    <div class="product-grid" role="list">${cat.products.map((p: any) => renderProductCard(p, false)).join('')}</div>
                                </div>
                            `).join('')}
                            ${uncategorizedProducts.length > 0 ? `
                                <div class="section-container-cat" data-classic-cat="outros">
                                    <div class="section-title"><i class="fa-solid fa-box" aria-hidden="true"></i><span>Outros</span><div class="line"></div></div>
                                    <div class="product-grid" role="list">${uncategorizedProducts.map((p: any) => renderProductCard(p, false)).join('')}</div>
                                </div>
                            ` : ''}
                        </div>

                        ${products.length === 0 ? `<div style="text-align:center;padding:100px 20px;color:var(--text-muted);"><i class="fa-solid fa-box-open" style="font-size:4rem;opacity:0.3;display:block;margin-bottom:20px;"></i><p>Nenhum produto disponível no momento.</p></div>` : ''}
                    </main>
                `}

                ${whatsappNumber ? `
                    <a href="https://wa.me/${whatsappNumber}" target="_blank" rel="noopener noreferrer" class="whatsapp-float" aria-label="Falar conosco via WhatsApp">
                        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i><span>Falar conosco</span>
                    </a>` : ''}

                ${modalsHtml}
            </div>
        `;

    } catch (error) {
        console.error('Catalog Error:', error);
        return `<p>Erro ao carregar catálogo.</p>`;
    }
};
