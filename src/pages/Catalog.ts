import { dbService } from '../services/db';

export const Catalog = async (storeId: string) => {
    try {
        // Find the company and store. 
        // Optimization: Try to get companyId from loja_config first to avoid listing all companies
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

        // Fallback: If not found in config, find by searching all companies
        if (!store) {
            const allCompanies = await dbService.getAll('companies') as any[];
            for (const c of allCompanies) {
                const s = c.stores?.find((st: any) => st.id === storeId);
                if (s) {
                    company = c;
                    store = s;
                    break;
                }
            }
        }

        if (!company || !store) {
            return `
                <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background: #0f172a; color: white; font-family: sans-serif;">
                    <div style="text-align: center; padding: 2.5rem; background: rgba(255,255,255,0.03); border-radius: 24px; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(20px); max-width: 400px;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">🔎</div>
                        <h2 style="margin-bottom: 0.5rem; font-weight: 700;">Catálogo não encontrado</h2>
                        <p style="color: #94a3b8; line-height: 1.5;">O link que você acessou pode estar incorreto ou a loja não está mais ativa.</p>
                        <a href="/" style="display: inline-block; margin-top: 1.5rem; color: #6366f1; text-decoration: none; font-weight: 600;">Voltar ao início</a>
                    </div>
                </div>
            `;
        }

        const productsRaw = await dbService.getAll('products', { field: 'companyId', operator: '==', value: company.id }) as any[];

        const config = lojaConfigs[0] || {};
        const design = config.design || {};
        const primaryColor = design.primaryColor || '#6366f1';
        const secondaryColor = design.secondaryColor || '#0f172a';
        const logoUrl = design.logoUrl || '';

        // Fetch WhatsApp number (Prioritize manual field from config)
        let whatsappNumber = design.whatsapp || '';

        if (!whatsappNumber) {
            try {
                if (store.instancia_id) {
                    const instance = await dbService.get('instancias', store.instancia_id) as any;
                    if (instance && instance.numero) {
                        whatsappNumber = instance.numero.replace(/\D/g, '');
                    }
                }
            } catch (instErr) {
                console.warn('Could not fetch instance details (likely permissions):', instErr);
            }
        }

        // Filter products for this store
        const products = productsRaw.filter((p: any) =>
            p.active !== false &&
            (p.storeIds?.includes(storeId) || p.storeId === storeId)
        );

        const promoProducts = products.filter(p => p.promotionalActive);

        const getImageUrl = (p: any) => {
            if (p.imageUrl) return p.imageUrl;
            if (p.imagemPath && p.downloadToken) {
                return `https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(p.imagemPath)}?alt=media&token=${p.downloadToken}`;
            }
            return 'https://via.placeholder.com/300?text=Sem+Imagem';
        };

        const renderProductCard = (p: any, usePromo: boolean = false) => {
            const title = usePromo ? (p.promotionalName || p.name) : p.name;
            const price = usePromo ? (p.promotionalPrice || p.price) : p.price;
            const originalPrice = usePromo ? p.price : null;

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
                </div>
            `;
        };

        return `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
                
                :root {
                    --primary: ${primaryColor};
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
                    overflow-x: hidden; /* Prevent horizontal scroll */
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
                    overflow: hidden; /* Clip the decorative glass effect */
                }

                .header-glass {
                    position: absolute;
                    top: -100px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 140%;
                    height: 400px;
                    background: radial-gradient(circle at bottom, var(--primary) 0%, transparent 70%);
                    opacity: 0.15;
                    filter: blur(80px);
                    z-index: 0;
                    pointer-events: none;
                }

                .store-logo-wrapper {
                    position: relative;
                    z-index: 1;
                    padding: 6px;
                    background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
                    border-radius: 50%;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                }

                .store-logo {
                    width: 120px;
                    height: 120px;
                    object-fit: cover;
                    border-radius: 50%;
                    background: #fff;
                    display: block;
                    border: 2px solid rgba(255,255,255,0.1);
                }

                .status-badge {
                    z-index: 1;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 14px;
                    background: rgba(16, 185, 129, 0.1);
                    border: 1px solid rgba(16, 185, 129, 0.2);
                    border-radius: 100px;
                    color: #10b981;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    animation: pulse-soft 2s infinite;
                }

                .header h1 {
                    z-index: 1;
                    font-size: 3.2rem;
                    font-weight: 800;
                    margin: 0;
                    letter-spacing: -1px;
                    background: linear-gradient(to bottom, #ffffff 40%, rgba(255,255,255,0.7) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 10px 30px rgba(0,0,0,0.2);
                }

                .header p {
                    z-index: 1;
                    color: var(--text-muted);
                    font-size: 1.2rem;
                    max-width: 500px;
                    margin: 0;
                    font-weight: 300;
                    opacity: 0.8;
                }

                .section-container {
                    position: relative;
                    z-index: 1;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                }

                .section-title {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin: 60px 0 30px 0;
                }

                .section-title span {
                    font-size: 1.8rem;
                    font-weight: 700;
                    letter-spacing: -0.5px;
                }

                .section-title .line {
                    flex: 1;
                    height: 1px;
                    background: linear-gradient(to right, var(--primary), transparent);
                    opacity: 0.3;
                }

                .section-title i {
                    width: 48px;
                    height: 48px;
                    background: var(--glass);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--primary);
                    font-size: 1.2rem;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }

                .product-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                    gap: 30px;
                }

                .product-card {
                    background: var(--glass);
                    backdrop-filter: blur(15px);
                    -webkit-backdrop-filter: blur(15px);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 24px;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .product-card:hover {
                    transform: translateY(-12px) scale(1.02);
                    border-color: var(--primary);
                    box-shadow: 0 30px 60px -15px rgba(0,0,0,0.5), 
                                0 0 30px var(--primary-glow);
                }

                .card-image {
                    position: relative;
                    aspect-ratio: 1/1;
                    overflow: hidden;
                }

                .card-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .product-card:hover .card-image img {
                    transform: scale(1.15);
                }

                .promo-tag {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: var(--primary);
                    color: white;
                    padding: 6px 14px;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    box-shadow: 0 8px 20px var(--primary-glow);
                    backdrop-filter: blur(5px);
                }

                .card-info {
                    padding: 20px;
                }

                .card-info h3 {
                    margin: 0 0 12px 0;
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #fff;
                    line-height: 1.3;
                }

                .price-container {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .price {
                    font-size: 1.4rem;
                    font-weight: 800;
                    color: #fff;
                    background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .original-price {
                    font-size: 0.95rem;
                    color: var(--text-muted);
                    text-decoration: line-through;
                    opacity: 0.6;
                }

                /* Responsive */
                @media (max-width: 600px) {
                    .header { padding: 60px 20px 30px; }
                    .header h1 { font-size: 2.2rem; }
                    .header p { font-size: 1rem; }
                    .store-logo { width: 100px; height: 100px; }
                    .product-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 15px; }
                    .card-info { padding: 15px; }
                    .card-info h3 { font-size: 1rem; }
                    .price { font-size: 1.1rem; }
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
                    <p>Experiência única & Qualidade incomparável</p>
                </header>

                <main class="section-container">
                    ${promoProducts.length > 0 ? `
                        <div class="section-title">
                            <i class="fa-solid fa-bolt-lightning"></i>
                            <span>Ofertas do Dia</span>
                            <div class="line"></div>
                        </div>
                        <div class="product-grid">
                            ${promoProducts.map(p => renderProductCard(p, true)).join('')}
                        </div>
                    ` : ''}

                    <div class="section-title">
                        <i class="fa-solid fa-dolly"></i>
                        <span>Nossa Coleção</span>
                        <div class="line"></div>
                    </div>
                    <div class="product-grid">
                        ${products.map(p => renderProductCard(p, false)).join('')}
                    </div>

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
            </div>

            <style>
                .whatsapp-float {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    background: #25d366;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 100px;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-weight: 700;
                    box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
                    z-index: 9999;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    animation: fadeInDown 0.8s backwards 1s;
                    white-space: nowrap;
                    max-width: calc(100vw - 40px); /* Ensure it doesn't exceed screen width */
                }

                .whatsapp-float:hover {
                    transform: scale(1.05) translateY(-5px);
                    box-shadow: 0 15px 35px rgba(37, 211, 102, 0.5);
                    background: #22c35e;
                }

                .whatsapp-float i {
                    font-size: 1.5rem;
                }

                @media (max-width: 600px) {
                    .whatsapp-float {
                        bottom: 20px;
                        right: 20px;
                        padding: 10px 16px;
                        font-size: 0.85rem;
                        gap: 8px;
                    }
                    .whatsapp-float span {
                        display: inline-block; /* Keep it simple */
                    }
                }
                
                @media (max-width: 380px) {
                    /* On very small screen, hide text to avoid horizontal issues */
                    .whatsapp-float {
                        padding: 12px;
                        border-radius: 50%;
                        right: 15px;
                        bottom: 15px;
                    }
                    .whatsapp-float span {
                        display: none;
                    }
                    .whatsapp-float i {
                        font-size: 1.6rem;
                        margin: 0;
                    }
                }
            </style>
        `;

    } catch (error) {
        console.error('Catalog Error:', error);
        return `<p>Erro ao carregar catálogo.</p>`;
    }
};
