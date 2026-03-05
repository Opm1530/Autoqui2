import { dbService } from '../services/db';

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
                <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background: #0f172a; color: white; font-family: sans-serif;">
                    <div style="text-align: center; padding: 2.5rem; background: rgba(255,255,255,0.03); border-radius: 24px; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(20px); max-width: 400px;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">🔎</div>
                        <h2 style="margin-bottom: 0.5rem; font-weight: 700;">Catálogo não encontrado</h2>
                        <p style="color: #94a3b8; line-height: 1.5;">O link que você acessou pode estar incorreto ou a loja não está mais ativa.</p>
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
        const logoUrl = design.logoUrl || '';
        const pixKey = design.pixKey || '';

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

        const hasMercadoPago = !!(company.mercadoPagoToken);

        const products = productsRaw.filter((p: any) =>
            p.active !== false &&
            (p.storeIds?.includes(storeId) || p.storeId === storeId)
        );

        const promoProducts = products.filter((p: any) => p.promotionalActive);

        const categorizedData = categories.map((cat: any) => ({
            ...cat,
            products: products.filter((p: any) => p.categoryId === cat.id)
        })).filter((cat: any) => cat.products.length > 0);

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

        // ── Cart state (module-scoped closure) ───────────────────────────────
        let cart: Map<string, { product: any; qty: number }> = new Map();

        const getCartTotal = () => {
            let t = 0;
            cart.forEach(({ product, qty }) => {
                const price = product.promotionalActive ? (product.promotionalPrice || product.price) : product.price;
                t += price * qty;
            });
            return t;
        };

        const renderCartItems = () => {
            if (cart.size === 0) return '<p style="text-align:center; color:#94a3b8; padding: 20px 0;">Seu carrinho está vazio.</p>';
            let html = '';
            cart.forEach(({ product, qty }, id) => {
                const price = product.promotionalActive ? (product.promotionalPrice || product.price) : product.price;
                html += `
                <div style="display:flex; justify-content:space-between; align-items:center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
                    <div style="flex:1;">
                        <p style="margin:0; font-weight:600; font-size:0.95rem;">${product.name}</p>
                        <p style="margin:4px 0 0; color:#94a3b8; font-size:0.8rem;">R$ ${price.toFixed(2)} cada</p>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <button onclick="window.catQtyChange('${id}', -1)" style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.1);color:white;border:none;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">-</button>
                        <span style="min-width:24px;text-align:center;font-weight:700;">${qty}</span>
                        <button onclick="window.catQtyChange('${id}', 1)" style="width:28px;height:28px;border-radius:50%;background:var(--primary-cat);color:white;border:none;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">+</button>
                        <button onclick="window.catRemoveItem('${id}')" style="color:#ef4444;background:none;border:none;cursor:pointer;padding:4px;"><i class="fa-solid fa-trash" style="font-size:0.85rem;"></i></button>
                    </div>
                </div>`;
            });
            return html;
        };

        const updateCartUI = () => {
            const badge = document.getElementById('cart-badge');
            const totalEl = document.getElementById('cart-total');
            const itemsEl = document.getElementById('cart-items');
            const cartBtn = document.getElementById('cart-float-btn');

            let totalQty = 0;
            cart.forEach(({ qty }) => totalQty += qty);

            if (badge) badge.textContent = totalQty.toString();
            if (cartBtn) cartBtn.style.display = totalQty > 0 ? 'flex' : 'none';
            if (totalEl) totalEl.textContent = `R$ ${getCartTotal().toFixed(2)}`;
            if (itemsEl) itemsEl.innerHTML = renderCartItems();
        };

        if (hasVendaCatalogo) {
            (window as any).catAddToCart = (productId: string) => {
                const product = products.find((p: any) => p.id === productId);
                if (!product) return;
                if (product.stock === 0) return;
                const existing = cart.get(productId);
                const maxQty = product.stock ?? Infinity;
                const currentQty = existing ? existing.qty : 0;
                if (currentQty >= maxQty) {
                    alert(`Estoque máximo atingido (${product.stock} un.)`);
                    return;
                }
                cart.set(productId, { product, qty: (existing?.qty || 0) + 1 });
                updateCartUI();
                // Animate button
                const btn = document.getElementById(`btn-add-${productId}`);
                if (btn) {
                    btn.textContent = '✓ Adicionado';
                    setTimeout(() => { if (btn) btn.textContent = '+ Adicionar'; }, 1000);
                }
            };

            (window as any).catQtyChange = (productId: string, delta: number) => {
                const entry = cart.get(productId);
                if (!entry) return;
                const newQty = entry.qty + delta;
                if (newQty <= 0) {
                    cart.delete(productId);
                } else {
                    const maxQty = entry.product.stock ?? Infinity;
                    entry.qty = Math.min(newQty, maxQty);
                }
                updateCartUI();
            };

            (window as any).catRemoveItem = (productId: string) => {
                cart.delete(productId);
                updateCartUI();
            };

            (window as any).openCart = () => {
                updateCartUI();
                const modal = document.getElementById('cart-modal');
                if (modal) modal.style.display = 'flex';
            };

            (window as any).closeCart = () => {
                const modal = document.getElementById('cart-modal');
                if (modal) modal.style.display = 'none';
            };

            (window as any).goToCheckout = () => {
                if (cart.size === 0) return;
                (window as any).closeCart();
                const modal = document.getElementById('checkout-modal');
                if (modal) modal.style.display = 'flex';
            };

            (window as any).closeCheckout = () => {
                const modal = document.getElementById('checkout-modal');
                if (modal) modal.style.display = 'none';
            };

            (window as any).goToPayment = () => {
                const name = (document.getElementById('checkout-name') as HTMLInputElement)?.value.trim();
                const phone = (document.getElementById('checkout-phone') as HTMLInputElement)?.value.trim();
                if (!name || !phone) { alert('Preencha nome e telefone.'); return; }
                (window as any).checkoutName = name;
                (window as any).checkoutPhone = phone;
                (window as any).closeCheckout();
                const modal = document.getElementById('payment-modal');
                if (modal) modal.style.display = 'flex';
            };

            (window as any).closePayment = () => {
                const modal = document.getElementById('payment-modal');
                if (modal) modal.style.display = 'none';
            };

            (window as any).confirmOrder = async (paymentMethod: string) => {
                const name = (window as any).checkoutName;
                const phone = (window as any).checkoutPhone;
                const btn = document.getElementById(`btn-pay-${paymentMethod}`) as HTMLButtonElement;
                if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processando...'; }

                try {
                    const items = Array.from(cart.entries()).map(([id, { product, qty }]) => {
                        const price = product.promotionalActive ? (product.promotionalPrice || product.price) : product.price;
                        return { productId: id, name: product.name, qty, price, subtotal: price * qty };
                    });

                    const total = getCartTotal();

                    // Decrement stock
                    for (const [id, { qty }] of Array.from(cart.entries())) {
                        const product = products.find((p: any) => p.id === id);
                        if (product && product.stock !== null && product.stock !== undefined) {
                            await dbService.update('products', id, { stock: Math.max(0, product.stock - qty) });
                        }
                    }

                    const orderId = await dbService.create('pedidos', {
                        storeId,
                        companyId: company.id,
                        clientName: name,
                        clientPhone: phone,
                        items,
                        total,
                        paymentMethod,
                        status: 'pending',
                        source: 'catalog',
                        createdAt: new Date().toISOString()
                    });

                    cart.clear();
                    (window as any).closePayment();

                    // Show confirmation
                    const confirmModal = document.getElementById('confirmation-modal');
                    const orderIdEl = document.getElementById('order-id-display');
                    if (confirmModal) confirmModal.style.display = 'flex';
                    if (orderIdEl) orderIdEl.textContent = orderId.slice(0, 8).toUpperCase();

                    if (paymentMethod === 'pix' && pixKey) {
                        const pixSection = document.getElementById('pix-info-section');
                        if (pixSection) {
                            pixSection.style.display = 'block';
                            const pixKeyEl = document.getElementById('pix-key-display');
                            if (pixKeyEl) pixKeyEl.textContent = pixKey;
                        }
                    }

                    updateCartUI();
                } catch (err) {
                    console.error(err);
                    alert('Erro ao processar pedido. Tente novamente.');
                    if (btn) { btn.disabled = false; btn.innerHTML = btn.getAttribute('data-original') || 'Pagar'; }
                }
            };
        }

        // ── Render helpers ────────────────────────────────────────────────────

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
                        ${isOutOfStock ? '<div class="promo-tag" style="background:#ef4444; left:15px; right:auto;">ESGOTADO</div>' : ''}
                    </div>
                    <div class="card-info">
                        <h3>${title}</h3>
                        <div class="price-container">
                            <span class="price">R$ ${price?.toFixed(2)}</span>
                            ${originalPrice ? `<span class="original-price">R$ ${originalPrice.toFixed(2)}</span>` : ''}
                        </div>
                        ${p.stock !== null && p.stock !== undefined && !isOutOfStock && p.stock <= 10
                        ? `<p style="font-size:0.75rem; color:#eab308; margin: 6px 0 0;">⚠️ Apenas ${p.stock} restante${p.stock !== 1 ? 's' : ''}</p>`
                        : ''}
                        <button id="btn-add-${p.id}" 
                            onclick="window.catAddToCart('${p.id}')" 
                            ${isOutOfStock ? 'disabled' : ''}
                            style="margin-top:12px; width:100%; padding: 10px; border-radius:10px; background: ${isOutOfStock ? 'rgba(255,255,255,0.05)' : 'var(--primary-cat)'}; color:${isOutOfStock ? '#94a3b8' : 'white'}; border:none; cursor:${isOutOfStock ? 'not-allowed' : 'pointer'}; font-weight:700; font-size:0.9rem; transition: all 0.2s;">
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
                        <div class="price-container">
                            <span class="price">R$ ${price?.toFixed(2)}</span>
                            ${originalPrice ? `<span class="original-price">R$ ${originalPrice.toFixed(2)}</span>` : ''}
                        </div>
                    </div>
                </div>`;
        };

        // ── Modals HTML (only when venda_catalogo is active) ──────────────────
        const modalsHtml = hasVendaCatalogo ? `
            <!-- Cart Modal -->
            <div id="cart-modal" style="display:none; position:fixed; inset:0; z-index:9000; background:rgba(0,0,0,0.7); align-items:flex-end; justify-content:center; backdrop-filter:blur(4px);">
                <div style="background:#1e293b; border-radius:24px 24px 0 0; width:100%; max-width:520px; max-height:85vh; display:flex; flex-direction:column; padding:24px; overflow:hidden;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                        <h3 style="margin:0; font-size:1.2rem; font-weight:700;">🛒 Meu Carrinho</h3>
                        <button onclick="window.closeCart()" style="background:rgba(255,255,255,0.1); border:none; color:white; width:32px; height:32px; border-radius:50%; cursor:pointer; font-size:1.1rem;">✕</button>
                    </div>
                    <div id="cart-items" style="flex:1; overflow-y:auto; min-height:80px;"></div>
                    <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:16px; margin-top:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <span style="font-weight:700; font-size:1rem;">Total</span>
                            <span id="cart-total" style="font-size:1.3rem; font-weight:800; color:var(--primary-cat);">R$ 0,00</span>
                        </div>
                        <button onclick="window.goToCheckout()" style="width:100%; padding:14px; border-radius:14px; background:var(--primary-cat); color:white; border:none; cursor:pointer; font-weight:700; font-size:1rem;">
                            Finalizar Pedido →
                        </button>
                    </div>
                </div>
            </div>

            <!-- Checkout Modal -->
            <div id="checkout-modal" style="display:none; position:fixed; inset:0; z-index:9000; background:rgba(0,0,0,0.7); align-items:center; justify-content:center; backdrop-filter:blur(4px);">
                <div style="background:#1e293b; border-radius:24px; width:90%; max-width:420px; padding:28px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                        <h3 style="margin:0; font-size:1.1rem; font-weight:700;">📋 Seus Dados</h3>
                        <button onclick="window.closeCheckout()" style="background:rgba(255,255,255,0.1); border:none; color:white; width:32px; height:32px; border-radius:50%; cursor:pointer;">✕</button>
                    </div>
                    <p style="color:#94a3b8; font-size:0.9rem; margin-bottom:20px;">Preencha para finalizar seu pedido.</p>
                    <div style="margin-bottom:16px;">
                        <label style="display:block; font-size:0.8rem; color:#94a3b8; text-transform:uppercase; font-weight:700; margin-bottom:6px;">Nome Completo</label>
                        <input id="checkout-name" type="text" placeholder="Seu nome" style="width:100%; padding:12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:10px; color:white; font-size:0.95rem; box-sizing:border-box;">
                    </div>
                    <div style="margin-bottom:24px;">
                        <label style="display:block; font-size:0.8rem; color:#94a3b8; text-transform:uppercase; font-weight:700; margin-bottom:6px;">Telefone / WhatsApp</label>
                        <input id="checkout-phone" type="tel" placeholder="(11) 99999-9999" style="width:100%; padding:12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:10px; color:white; font-size:0.95rem; box-sizing:border-box;">
                    </div>
                    <button onclick="window.goToPayment()" style="width:100%; padding:14px; border-radius:14px; background:var(--primary-cat); color:white; border:none; cursor:pointer; font-weight:700; font-size:1rem;">
                        Escolher Pagamento →
                    </button>
                </div>
            </div>

            <!-- Payment Modal -->
            <div id="payment-modal" style="display:none; position:fixed; inset:0; z-index:9000; background:rgba(0,0,0,0.7); align-items:center; justify-content:center; backdrop-filter:blur(4px);">
                <div style="background:#1e293b; border-radius:24px; width:90%; max-width:420px; padding:28px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                        <h3 style="margin:0; font-size:1.1rem; font-weight:700;">💳 Forma de Pagamento</h3>
                        <button onclick="window.closePayment()" style="background:rgba(255,255,255,0.1); border:none; color:white; width:32px; height:32px; border-radius:50%; cursor:pointer;">✕</button>
                    </div>
                    <p style="color:#94a3b8; font-size:0.9rem; margin-bottom:20px;">Escolha como deseja pagar seu pedido.</p>
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <button id="btn-pay-delivery" data-original="🚚 Pagar na Entrega" onclick="window.confirmOrder('delivery')" 
                            style="padding:16px; border-radius:14px; background:rgba(255,255,255,0.05); color:white; border:1px solid rgba(255,255,255,0.1); cursor:pointer; font-weight:700; font-size:0.95rem; text-align:left; display:flex; align-items:center; gap:12px;">
                            🚚 <span>Pagar na Entrega / Retirada</span>
                        </button>
                        ${pixKey ? `
                        <button id="btn-pay-pix" data-original="⚡ Pagar via PIX" onclick="window.confirmOrder('pix')"
                            style="padding:16px; border-radius:14px; background:rgba(255,255,255,0.05); color:white; border:1px solid rgba(255,255,255,0.1); cursor:pointer; font-weight:700; font-size:0.95rem; text-align:left; display:flex; align-items:center; gap:12px;">
                            ⚡ <span>Pagar via PIX</span>
                        </button>` : ''}
                        ${hasMercadoPago ? `
                        <button id="btn-pay-mercadopago" data-original="💳 Mercado Pago" onclick="window.confirmOrder('mercadopago')"
                            style="padding:16px; border-radius:14px; background:#009ee3; color:white; border:none; cursor:pointer; font-weight:700; font-size:0.95rem; text-align:left; display:flex; align-items:center; gap:12px;">
                            💳 <span>Cartão / PIX via Mercado Pago</span>
                        </button>` : ''}
                    </div>
                </div>
            </div>

            <!-- Confirmation Modal -->
            <div id="confirmation-modal" style="display:none; position:fixed; inset:0; z-index:9000; background:rgba(0,0,0,0.7); align-items:center; justify-content:center; backdrop-filter:blur(4px);">
                <div style="background:#1e293b; border-radius:24px; width:90%; max-width:400px; padding:32px; text-align:center;">
                    <div style="font-size:4rem; margin-bottom:16px;">🎉</div>
                    <h2 style="margin:0 0 10px; font-size:1.4rem; font-weight:800;">Pedido Confirmado!</h2>
                    <p style="color:#94a3b8; margin-bottom:20px;">Seu pedido foi recebido com sucesso.</p>
                    <div style="background:rgba(99,102,241,0.1); border:1px solid rgba(99,102,241,0.2); border-radius:12px; padding:16px; margin-bottom:20px;">
                        <span style="font-size:0.8rem; color:#94a3b8; text-transform:uppercase; font-weight:700;">Número do Pedido</span>
                        <p id="order-id-display" style="margin:6px 0 0; font-size:1.5rem; font-weight:800; letter-spacing:3px; color:var(--primary-cat);">#000000</p>
                    </div>
                    <div id="pix-info-section" style="display:none; background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.2); border-radius:12px; padding:16px; margin-bottom:20px; text-align:left;">
                        <p style="margin:0 0 8px; font-weight:700;">⚡ Chave PIX para pagamento:</p>
                        <p id="pix-key-display" style="margin:0; font-family:monospace; font-size:1rem; color:#10b981; word-break:break-all;"></p>
                    </div>
                    <button onclick="document.getElementById('confirmation-modal').style.display='none'" style="width:100%; padding:14px; border-radius:14px; background:var(--primary-cat); color:white; border:none; cursor:pointer; font-weight:700;">
                        Continuar Comprando
                    </button>
                </div>
            </div>

            <!-- Floating Cart Button -->
            <button id="cart-float-btn" onclick="window.openCart()" style="display:none; position:fixed; bottom:30px; left:30px; background:var(--primary-cat); color:white; border:none; padding:12px 20px; border-radius:100px; font-weight:700; font-size:0.95rem; cursor:pointer; z-index:8000; align-items:center; gap:10px; box-shadow:0 10px 30px rgba(0,0,0,0.3);">
                🛒 <span>Ver Carrinho</span> <span id="cart-badge" style="background:white; color:var(--primary-cat); border-radius:100px; padding:2px 8px; font-size:0.8rem; font-weight:800;">0</span>
            </button>
        ` : '';

        return `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
                
                :root {
                    --primary-cat: ${primaryColor};
                    --primary-glow: ${primaryColor}4D;
                    --bg: ${secondaryColor};
                    --card-bg: rgba(255, 255, 255, 0.03);
                    --glass: rgba(255, 255, 255, 0.05);
                    --text: #ffffff;
                    --text-muted: #94a3b8;
                }

                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse-soft {
                    0% { box-shadow: 0 0 0 0 var(--primary-glow); }
                    70% { box-shadow: 0 0 0 15px transparent; }
                    100% { box-shadow: 0 0 0 0 transparent; }
                }

                .catalog-body {
                    background: var(--bg);
                    color: var(--text);
                    font-family: 'Outfit', sans-serif;
                    min-height: 100vh;
                    margin: 0;
                    padding-bottom: 80px;
                    background-image: 
                        radial-gradient(circle at 0% 0%, var(--primary-glow) 0%, transparent 40%),
                        radial-gradient(circle at 100% 100%, var(--primary-glow) 0%, transparent 40%);
                    background-attachment: fixed;
                    overflow-x: hidden;
                }

                .header {
                    position: relative;
                    padding: 80px 20px 40px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    animation: fadeInDown 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
                    overflow: hidden;
                }
                .header-glass {
                    position: absolute; top: -100px; left: 50%;
                    transform: translateX(-50%); width: 140%; height: 400px;
                    background: radial-gradient(circle at bottom, var(--primary-cat) 0%, transparent 70%);
                    opacity: 0.15; filter: blur(80px); z-index: 0; pointer-events: none;
                }
                .store-logo-wrapper { position: relative; z-index: 1; padding: 6px; background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent); border-radius: 50%; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
                .store-logo { width: 120px; height: 120px; object-fit: cover; border-radius: 50%; background: #fff; display: block; border: 2px solid rgba(255,255,255,0.1); }
                .status-badge { z-index: 1; display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 100px; color: #10b981; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; animation: pulse-soft 2s infinite; }
                .header h1 { z-index: 1; font-size: 3.2rem; font-weight: 800; margin: 0; letter-spacing: -1px; background: linear-gradient(to bottom, #ffffff 40%, rgba(255,255,255,0.7) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .header p { z-index: 1; color: var(--text-muted); font-size: 1.2rem; max-width: 500px; margin: 0; font-weight: 300; opacity: 0.8; }

                .section-container { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 0 20px; }
                .section-title { display: flex; align-items: center; gap: 15px; margin: 60px 0 30px 0; }
                .section-title span { font-size: 1.8rem; font-weight: 700; letter-spacing: -0.5px; }
                .section-title .line { flex: 1; height: 1px; background: linear-gradient(to right, var(--primary-cat), transparent); opacity: 0.3; }
                .section-title i { width: 48px; height: 48px; background: var(--glass); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--primary-cat); font-size: 1.2rem; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }

                .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 30px; }
                .product-card { background: var(--glass); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; overflow: hidden; transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
                .product-card:hover { transform: translateY(-8px) scale(1.01); border-color: var(--primary-cat); box-shadow: 0 20px 40px -10px rgba(0,0,0,0.4), 0 0 20px var(--primary-glow); }
                .card-image { position: relative; aspect-ratio: 1/1; overflow: hidden; }
                .card-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }
                .product-card:hover .card-image img { transform: scale(1.1); }
                .promo-tag { position: absolute; top: 15px; right: 15px; background: var(--primary-cat); color: white; padding: 6px 14px; border-radius: 12px; font-size: 0.75rem; font-weight: 800; box-shadow: 0 8px 20px var(--primary-glow); }
                .card-info { padding: 20px; }
                .card-info h3 { margin: 0 0 12px 0; font-size: 1.1rem; font-weight: 700; color: #fff; line-height: 1.3; }
                .price-container { display: flex; align-items: center; gap: 12px; }
                .price { font-size: 1.3rem; font-weight: 800; background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .original-price { font-size: 0.9rem; color: var(--text-muted); text-decoration: line-through; opacity: 0.6; }

                .whatsapp-float { position: fixed; bottom: 30px; right: 30px; background: #25d366; color: white; padding: 12px 24px; border-radius: 100px; text-decoration: none; display: flex; align-items: center; gap: 12px; font-weight: 700; box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4); z-index: 7999; transition: all 0.3s; animation: fadeInDown 0.8s backwards 1s; white-space: nowrap; max-width: calc(100vw - 40px); }
                .whatsapp-float:hover { transform: scale(1.05) translateY(-5px); }
                .whatsapp-float i { font-size: 1.5rem; }

                @media (max-width: 600px) {
                    .header { padding: 60px 20px 30px; }
                    .header h1 { font-size: 2.2rem; }
                    .header p { font-size: 1rem; }
                    .store-logo { width: 90px; height: 90px; }
                    .product-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 15px; }
                    .card-info { padding: 14px; }
                    .card-info h3 { font-size: 0.95rem; }
                    .price { font-size: 1.05rem; }
                    .whatsapp-float { bottom: 20px; right: 20px; padding: 10px 16px; font-size: 0.85rem; }
                }
                @media (max-width: 380px) {
                    .whatsapp-float { padding: 12px; border-radius: 50%; right: 15px; bottom: 15px; }
                    .whatsapp-float span { display: none; }
                }
            </style>

            <div class="catalog-body">
                <header class="header">
                    <div class="header-glass"></div>
                    <div class="status-badge">
                        <i class="fa-solid fa-circle" style="font-size: 6px;"></i>
                        Loja Online
                    </div>
                    ${logoUrl ? `
                        <div class="store-logo-wrapper">
                            <img src="${logoUrl}" alt="${store.name}" class="store-logo">
                        </div>
                    ` : ''}
                    <h1>${store.name}</h1>
                    <p>Experiência única &amp; Qualidade incomparável</p>
                </header>

                <main class="section-container">
                    ${promoProducts.length > 0 ? `
                        <div class="section-title">
                            <i class="fa-solid fa-bolt-lightning"></i>
                            <span>Ofertas do Dia</span>
                            <div class="line"></div>
                        </div>
                        <div class="product-grid">
                            ${promoProducts.map((p: any) => renderProductCard(p, true)).join('')}
                        </div>
                    ` : ''}

                    ${categorizedData.map((cat: any) => `
                        <div class="section-title">
                            <i class="fa-solid ${cat.icon || 'fa-tag'}"></i>
                            <span>${cat.name}</span>
                            <div class="line"></div>
                        </div>
                        <div class="product-grid">
                            ${cat.products.map((p: any) => renderProductCard(p, false)).join('')}
                        </div>
                    `).join('')}

                    ${uncategorizedProducts.length > 0 ? `
                        <div class="section-title">
                            <i class="fa-solid fa-box"></i>
                            <span>${categorizedData.length > 0 ? 'Outros' : 'Nossa Coleção'}</span>
                            <div class="line"></div>
                        </div>
                        <div class="product-grid">
                            ${uncategorizedProducts.map((p: any) => renderProductCard(p, false)).join('')}
                        </div>
                    ` : ''}

                    ${products.length === 0 ? `
                        <div style="text-align: center; padding: 100px 20px; color: var(--text-muted);">
                            <div style="font-size: 4rem; margin-bottom: 20px; opacity: 0.2;">✨</div>
                            <p style="font-size: 1.2rem;">Prepare-se! Novidades chegando em breve.</p>
                        </div>
                    ` : ''}
                </main>

                ${whatsappNumber ? `
                    <a href="https://wa.me/${whatsappNumber}" target="_blank" class="whatsapp-float">
                        <i class="fa-brands fa-whatsapp"></i>
                        <span>Conversar agora</span>
                    </a>
                ` : ''}

                ${modalsHtml}
            </div>
        `;

    } catch (error) {
        console.error('Catalog Error:', error);
        return `<p>Erro ao carregar catálogo.</p>`;
    }
};
