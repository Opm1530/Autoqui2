import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dbService } from '../../../services/db';
import { getImageUrl, storeStatusLabel, isFreteAbertoAgora, isStoreOpen, getNextOpenTime, getStoreHorario, DIAS_NOME } from './helpers';
import { CheckoutModals } from './CheckoutModals';
import './catalog.css';

interface CartEntry { product: any; qty: number }

export function Catalog() {
  const { storeId = '' } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any | null>(null);
  const [cart, setCart] = useState<Map<string, CartEntry>>(new Map());
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [closedAlert, setClosedAlert] = useState<'store' | 'delivery' | null>(null);
  const [storeInfoOpen, setStoreInfoOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Carrega tudo do Firestore
  useEffect(() => {
    if (!storeId) return;
    (async () => {
      try {
        const lojaConfigs = (await dbService.getAll('loja_config', { field: 'lojaId', operator: '==', value: storeId })) as any[];
        let companyId = lojaConfigs[0]?.empresaId;
        let company: any = null, store: any = null;
        if (companyId) { company = await dbService.get('companies', companyId); if (company) store = company.stores?.find((s: any) => s.id === storeId); }
        if (!store) {
          const all = (await dbService.getAll('companies')) as any[];
          for (const c of all) { const s = c.stores?.find((st: any) => st.id === storeId); if (s) { company = c; store = s; break; } }
        }
        if (!company || !store) { setData({ notFound: true }); setLoading(false); return; }

        const modulos = company.modulos_ativos || [];
        const [productsRaw, categories, combosRaw] = (await Promise.all([
          dbService.getAll('products', { field: 'companyId', operator: '==', value: company.id }),
          dbService.getAll('categories', { field: 'companyId', operator: '==', value: company.id }),
          dbService.getAll('combos', { field: 'empresaId', operator: '==', value: company.id }).catch(() => []),
        ])) as [any[], any[], any[]];

        const config = lojaConfigs[0] || {};
        const design = config.design || {};
        const combos = combosRaw.filter((c) => c.ativo !== false && c.lojaId === storeId);
        const products = productsRaw.filter((p) => p.active !== false && (p.storeIds?.includes(storeId) || p.storeId === storeId))
          .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        const promoProducts = products.filter((p) => p.promotionalActive);
        const categorizedData = categories.map((cat) => ({ ...cat, products: products.filter((p) => p.categoryId === cat.id) }))
          .filter((cat) => cat.products.length > 0).sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        const uncategorized = products.filter((p) => !p.categoryId || !categories.find((c) => c.id === p.categoryId));

        let whatsappNumber = design.whatsapp || '';
        if (!whatsappNumber && store.instancia_id) {
          try { const inst = (await dbService.get('instancias', store.instancia_id)) as any; if (inst?.numero) whatsappNumber = inst.numero.replace(/\D/g, ''); } catch { /* ignore */ }
        }
        const isMpActive = (company.mercadoPagoAtivo === true || !!company.mercadoPagoToken) && (config.mercadoPagoActive !== false);

        // Frete por bairro (achatado) + taxa genérica + cupons
        const flatBairros: { nome: string; preco: number }[] = [];
        (config?.bairrosEntrega || []).forEach((b: any) => {
          (b.bairros || '').split(',').map((s: string) => s.trim()).filter(Boolean)
            .forEach((n: string) => flatBairros.push({ nome: n, preco: parseFloat(b.preco) || 0 }));
        });
        flatBairros.sort((a, b) => a.nome.localeCompare(b.nome));
        const taxaGenerica = parseFloat(config?.taxaGenerica ?? 0) || 0;
        const cuponsList: any[] = config?.cupons || [];

        // meta tags
        document.title = store.name || 'Catálogo';

        setData({
          company, store, config, design, modulos,
          hasVendaCatalogo: modulos.includes('venda_catalogo'),
          products, promoProducts, categorizedData, uncategorized, combos,
          whatsappNumber, isMpActive,
          themeId: design.themeId || 'classico',
          bannerUrl: design.bannerUrl || '', bannerMobileUrl: design.bannerMobileUrl || '',
          logoUrl: design.logoUrl || '', pixKey: design.pixKey || '',
          flatBairros, taxaGenerica, cuponsList,
        });

        // carrinho salvo
        try { const saved = localStorage.getItem(`cat_cart_${storeId}`); if (saved) setCart(new Map(JSON.parse(saved))); } catch { /* ignore */ }
      } catch (e) { console.error('Catalog Error:', e); setData({ error: true }); }
      setLoading(false);
    })();
  }, [storeId]);

  // Persiste carrinho
  useEffect(() => {
    if (!storeId) return;
    try { localStorage.setItem(`cat_cart_${storeId}`, JSON.stringify(Array.from(cart.entries()))); } catch { /* ignore */ }
  }, [cart, storeId]);

  const totalQty = useMemo(() => { let t = 0; cart.forEach(({ qty }) => t += qty); return t; }, [cart]);
  const subtotal = useMemo(() => {
    let t = 0; cart.forEach(({ product, qty }) => { const price = product.promotionalActive ? (product.promotionalPrice || product.price) : product.price; t += price * qty; }); return t;
  }, [cart]);

  function addProduct(p: any) {
    if (p.stock === 0) return;
    setCart((prev) => {
      const n = new Map(prev); const ex = n.get(p.id); const max = p.stock ?? Infinity;
      if ((ex?.qty || 0) >= max) { alert(`Estoque máximo atingido (${p.stock} un.)`); return prev; }
      n.set(p.id, { product: p, qty: (ex?.qty || 0) + 1 }); return n;
    });
  }
  function addCombo(c: any) {
    const cartId = `combo_${c.id}`;
    const comboProduct = { id: cartId, name: c.nome, price: parseFloat(c.preco || 0), isCombo: true, produtos: c.produtos || [], imagemPath: c.imagemPath || null, downloadToken: c.downloadToken || null, stock: null };
    setCart((prev) => { const n = new Map(prev); const ex = n.get(cartId); n.set(cartId, { product: comboProduct, qty: (ex?.qty || 0) + 1 }); return n; });
  }
  function changeQty(id: string, delta: number) {
    setCart((prev) => { const n = new Map(prev); const e = n.get(id); if (!e) return prev; const q = e.qty + delta; if (q <= 0) n.delete(id); else n.set(id, { ...e, qty: Math.min(q, e.product.stock ?? Infinity) }); return n; });
  }
  function removeItem(id: string) { setCart((prev) => { const n = new Map(prev); n.delete(id); return n; }); }

  // Cart → checkout: valida loja aberta e estoque em tempo real
  async function startCheckout() {
    if (cart.size === 0 || !data) return;
    if (!isStoreOpen(data.config, data.store)) { setCartOpen(false); setClosedAlert('store'); return; }
    const toCheck: { id: string; qty: number; label: string }[] = [];
    cart.forEach(({ product, qty }, id) => {
      if (product.isCombo) (product.produtos || []).forEach((cp: any) => toCheck.push({ id: cp.id, qty, label: product.name }));
      else toCheck.push({ id, qty, label: product.name });
    });
    for (const item of toCheck) {
      try {
        const fresh = (await dbService.get('products', item.id)) as any;
        if (!fresh || fresh.active === false || (fresh.stock != null && fresh.stock < item.qty)) {
          alert(`O item "${item.label}" não possui quantidade suficiente em estoque ou está indisponível.`);
          return;
        }
      } catch { /* ignore falhas de leitura */ }
    }
    setCartOpen(false); setCheckoutOpen(true);
  }

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white' }}><i className="fa-solid fa-spinner fa-spin fa-2x" /></div>;
  if (!data || data.notFound) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', padding: '2.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', maxWidth: 400 }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔎</div>
        <h2 style={{ marginBottom: '0.5rem', fontWeight: 700 }}>Catálogo não encontrado</h2>
        <p style={{ color: '#94a3b8', lineHeight: 1.5 }}>O link que você acessou pode estar incorreto ou a loja não está mais ativa.</p>
      </div>
    </div>
  );
  if (data.error) return <p style={{ padding: '2rem', color: 'white', background: '#0f172a', minHeight: '100vh' }}>Erro ao carregar catálogo.</p>;

  const { store, design, themeId, logoUrl, bannerUrl, bannerMobileUrl, whatsappNumber, hasVendaCatalogo, config } = data;
  const status = storeStatusLabel(config, store);
  const permitirEntrega = isFreteAbertoAgora(config, store);

  const cssVars: React.CSSProperties = {
    ['--primary-cat' as any]: design.primaryColor || '#6366f1',
    ['--primary-glow' as any]: (design.primaryColor || '#6366f1') + '4D',
    ['--bg' as any]: design.secondaryColor || '#0f172a',
    ['--glass' as any]: 'rgba(255,255,255,0.05)',
    ['--text' as any]: design.textColor || '#ffffff',
    ['--text-muted' as any]: '#94a3b8',
    ['--price-cat' as any]: design.priceColor || '#ffffff',
    ['--product-bg' as any]: design.productBgColor || 'rgba(255,255,255,0.05)',
  };

  const StatusInline = () => (
    <span style={{ color: status.open ? '#10b981' : '#ef4444' }}>
      <i className={`fa-solid ${status.open ? 'fa-door-open' : 'fa-door-closed'}`} /> {status.text}
      {status.extra && <span style={{ opacity: 0.6, marginLeft: 4, color: 'var(--text)' }}> • {status.extra}</span>}
    </span>
  );

  const ProductCard = ({ p, usePromo = false }: { p: any; usePromo?: boolean }) => {
    const title = usePromo ? (p.promotionalName || p.name) : p.name;
    const price = usePromo ? (p.promotionalPrice || p.price) : p.price;
    const original = usePromo ? p.price : null;
    const out = p.stock === 0;
    return (
      <div className="product-card" style={out ? { opacity: 0.6 } : undefined}>
        <div className="card-image">
          <img src={getImageUrl(p)} alt={title} loading="lazy" />
          {usePromo && <div className="promo-tag">OFERTA</div>}
          {out && <div className="promo-tag" style={{ background: '#ef4444', left: 15, right: 'auto' }}>ESGOTADO</div>}
        </div>
        <div className="card-info">
          <h3>{title}</h3>
          {data.modulos.includes('agendamento') && p.observation && <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '4px 0 8px', lineHeight: 1.4 }}>{p.observation}</p>}
          <div className="price-container"><span className="price">R$ {price?.toFixed(2)}</span>{original && <span className="original-price">R$ {original.toFixed(2)}</span>}</div>
          {p.stock != null && !out && p.stock <= 10 && <p style={{ fontSize: '0.75rem', color: '#eab308', margin: '6px 0 0' }}>⚠️ Apenas {p.stock} restante{p.stock !== 1 ? 's' : ''}</p>}
          {hasVendaCatalogo && (
            <button disabled={out} onClick={() => addProduct(p)}
              style={{ marginTop: 12, width: '100%', padding: 10, borderRadius: 10, background: out ? 'rgba(255,255,255,0.05)' : 'var(--primary-cat)', color: out ? '#94a3b8' : 'white', border: 'none', cursor: out ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '0.9rem' }}>
              {out ? 'Esgotado' : '+ Adicionar'}
            </button>
          )}
        </div>
      </div>
    );
  };

  const ComboCard = ({ c }: { c: any }) => {
    const precoOriginal = (c.produtos || []).reduce((s: number, p: any) => s + (p.price || 0), 0);
    const economia = precoOriginal > 0 ? precoOriginal - parseFloat(c.preco || 0) : 0;
    const hasImg = (c.imagemPath && c.downloadToken) || c.imageUrl;
    return (
      <div className="product-card" onClick={() => addCombo(c)} style={{ cursor: 'pointer', position: 'relative', border: '1.5px solid rgba(245,158,11,0.3)' }}>
        <div className="card-image" style={hasImg ? undefined : { background: 'linear-gradient(135deg,rgba(245,158,11,0.15),rgba(251,191,36,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
          {hasImg ? <img src={getImageUrl(c)} alt={c.nome} loading="lazy" /> : <i className="fa-solid fa-layer-group" style={{ fontSize: '2.5rem', color: '#f59e0b', opacity: 0.8 }} />}
          <div className="promo-tag" style={{ background: '#f59e0b' }}>COMBO</div>
        </div>
        <div className="card-info">
          <h3 style={{ fontWeight: 800 }}>{c.nome}</h3>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '4px 0 8px', lineHeight: 1.4 }}>{(c.produtos || []).map((p: any) => p.name).join(' + ')}</p>
          <div className="price-container"><span className="price" style={{ color: '#f59e0b' }}>R$ {parseFloat(c.preco || 0).toFixed(2)}</span>{precoOriginal > 0 && economia > 0 && <span className="original-price">R$ {precoOriginal.toFixed(2)}</span>}</div>
          {economia > 0 && <p style={{ fontSize: '0.75rem', color: '#10b981', margin: '4px 0 0', fontWeight: 700 }}>✓ Economize R$ {economia.toFixed(2)}</p>}
          <button style={{ marginTop: 12, width: '100%', padding: 10, borderRadius: 10, background: '#f59e0b', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}>+ Adicionar Combo</button>
        </div>
      </div>
    );
  };

  const SectionTitle = ({ icon, label, promo }: { icon: string; label: string; promo?: boolean }) => (
    <div className={'section-title' + (promo ? ' promo' : '')}><i className={`fa-solid ${icon}`} /><span className={promo ? 'promo-highlight' : undefined}>{label}</span><div className="line" /></div>
  );

  const CombosSection = () => data.combos.length === 0 ? null : (
    <>
      <div className="section-title" style={{ marginTop: 40 }}><i className="fa-solid fa-layer-group" style={{ color: '#f59e0b' }} /><span>Combos Especiais</span><div className="line" style={{ background: 'linear-gradient(to right,#f59e0b,transparent)' }} /></div>
      <div className="product-grid">{data.combos.map((c: any) => <ComboCard key={c.id} c={c} />)}</div>
    </>
  );

  // Filtro (clássico/moderno) por categoria + busca
  const matchesSearch = (p: any) => !search.trim() || (p.name || '').toLowerCase().includes(search.trim().toLowerCase());
  const showGroup = (key: string) => activeFilter === 'all' || activeFilter === key;

  return (
    <div className="catalog-body" style={cssVars}>
      {/* HEADER (clássico/banner) */}
      {themeId !== 'moderno' && (
        <header className="header">
          <div className="status-badge"><i className="fa-solid fa-circle" style={{ fontSize: 6 }} /> Loja Online</div>
          {logoUrl ? <div className="store-logo-wrapper"><img src={logoUrl} alt={store.name} className="store-logo" /></div>
            : <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}><i className="fa-solid fa-store" style={{ fontSize: '2rem', color: 'var(--primary-cat)' }} /></div>}
          <h1>{store.name}</h1>
          <p className="header-address"><i className="fa-solid fa-location-dot" style={{ marginRight: 4, opacity: 0.7 }} /> {store.address || 'Endereço não cadastrado'}</p>
          <div className="store-info-btn" onClick={() => setStoreInfoOpen(true)}>Mais informações <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.75rem', marginLeft: 4 }} /></div>
          <div className="store-status-card">
            <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><StatusInline /></div>
            {status.open && <>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '2px 0' }} />
              <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><i className="fa-solid fa-motorcycle" /> {permitirEntrega !== false ? 'Entrega e Retirada' : 'Apenas Retirada'}</div>
            </>}
          </div>
        </header>
      )}

      {/* BANNER THEME */}
      {themeId === 'banner' && (
        <>
          {(bannerUrl || bannerMobileUrl) ? (
            <div className="cat-banner-hero"><picture>{bannerMobileUrl && <source media="(max-width:600px)" srcSet={bannerMobileUrl} />}<img src={bannerUrl || bannerMobileUrl} alt={`Banner ${store.name}`} /></picture></div>
          ) : <div className="cat-banner-fallback"><i className="fa-solid fa-store" style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.3)' }} /></div>}
          <main className="section-container" style={{ paddingTop: 20 }}>
            <CombosSection />
            {data.promoProducts.length > 0 && <><SectionTitle icon="fa-bolt-lightning" label="Ofertas do Dia" /><div className="product-grid">{data.promoProducts.map((p: any) => <ProductCard key={p.id} p={p} usePromo />)}</div></>}
            {data.categorizedData.map((cat: any) => <div key={cat.id}><SectionTitle icon={cat.icon || 'fa-tag'} label={cat.name} /><div className="product-grid">{cat.products.map((p: any) => <ProductCard key={p.id} p={p} />)}</div></div>)}
            {data.uncategorized.length > 0 && <><SectionTitle icon="fa-box" label="Outros" /><div className="product-grid">{data.uncategorized.map((p: any) => <ProductCard key={p.id} p={p} />)}</div></>}
            {data.products.length === 0 && <EmptyProducts />}
          </main>
        </>
      )}

      {/* MODERNO THEME */}
      {themeId === 'moderno' && (
        <>
          <div className="cat-moderno-header">
            <div className="cat-search-bar-top-container"><div className="cat-search-bar-wrap"><i className="fa-solid fa-magnifying-glass" /><input type="search" placeholder="Buscar no catálogo" value={search} onChange={(e) => setSearch(e.target.value)} /></div></div>
            <div className="cat-moderno-banner-hero">
              {(bannerUrl || bannerMobileUrl) ? <picture>{bannerMobileUrl && <source media="(max-width:600px)" srcSet={bannerMobileUrl} />}<img src={bannerUrl || bannerMobileUrl} alt={`Banner ${store.name}`} /></picture> : <div className="cat-banner-fallback"><i className="fa-solid fa-store" /></div>}
            </div>
            <div className="cat-moderno-info">
              <div className="cat-moderno-logo-wrap">{logoUrl ? <img src={logoUrl} alt={store.name} /> : <div className="fallback-logo"><i className="fa-solid fa-store" style={{ fontSize: '2rem', color: 'var(--primary-cat)' }} /></div>}</div>
              <h1>{store.name}</h1>
              <p className="cat-moderno-address">{store.address || 'Endereço não cadastrado'} <span style={{ margin: '0 8px' }}>•</span> <span className="moderno-more-info" onClick={() => setStoreInfoOpen(true)}>Mais informações</span></p>
              <div className="cat-moderno-status-row"><StatusInline /></div>
            </div>
          </div>
          <div className="cat-modern-layout" style={{ paddingTop: 20 }}>
            <aside className="cat-sidebar-sticky" style={{ position: 'sticky', top: 20, height: 'fit-content' }}>
              <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '.08em', color: '#64748b', fontWeight: 700, margin: '0 0 10px 14px' }}>Categorias</p>
              <nav className="cat-sidebar">
                <button className={'cat-sidebar-link' + (activeFilter === 'all' ? ' active' : '')} onClick={() => setActiveFilter('all')}><i className="fa-solid fa-th-large" /> Todos</button>
                {data.promoProducts.length > 0 && <button className={'cat-sidebar-link' + (activeFilter === 'promo' ? ' active' : '')} onClick={() => setActiveFilter('promo')}><i className="fa-solid fa-bolt-lightning" /> Ofertas</button>}
                {data.categorizedData.map((cat: any) => <button key={cat.id} className={'cat-sidebar-link' + (activeFilter === cat.id ? ' active' : '')} onClick={() => setActiveFilter(cat.id)}><i className={`fa-solid ${cat.icon || 'fa-tag'}`} /> {cat.name}</button>)}
                {data.uncategorized.length > 0 && <button className={'cat-sidebar-link' + (activeFilter === 'outros' ? ' active' : '')} onClick={() => setActiveFilter('outros')}><i className="fa-solid fa-box" /> Outros</button>}
              </nav>
            </aside>
            <div>
              <CombosSection />
              {data.promoProducts.length > 0 && showGroup('promo') && <><SectionTitle icon="fa-bolt-lightning" label="Ofertas do Dia" /><div className="product-grid">{data.promoProducts.filter(matchesSearch).map((p: any) => <ProductCard key={p.id} p={p} usePromo />)}</div></>}
              {data.categorizedData.map((cat: any) => showGroup(cat.id) && <div key={cat.id}><SectionTitle icon={cat.icon || 'fa-tag'} label={cat.name} /><div className="product-grid">{cat.products.filter(matchesSearch).map((p: any) => <ProductCard key={p.id} p={p} />)}</div></div>)}
              {data.uncategorized.length > 0 && showGroup('outros') && <><SectionTitle icon="fa-box" label="Outros" /><div className="product-grid">{data.uncategorized.filter(matchesSearch).map((p: any) => <ProductCard key={p.id} p={p} />)}</div></>}
              {data.products.length === 0 && <EmptyProducts />}
            </div>
          </div>
        </>
      )}

      {/* CLÁSSICO THEME */}
      {themeId !== 'moderno' && themeId !== 'banner' && (
        <main className="section-container">
          <div style={{ marginTop: 20 }}><input type="search" className="cat-search-bar" placeholder="O que você procura hoje?" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <div className="cat-selector-wrapper"><div className="cat-selector-scroll">
            <button className={'cat-selector-item' + (activeFilter === 'all' ? ' active' : '')} onClick={() => setActiveFilter('all')}><div className="cat-selector-icon-wrap"><i className="fa-solid fa-th-large" /></div><span className="cat-selector-label">Todos</span></button>
            {data.promoProducts.length > 0 && <button className={'cat-selector-item' + (activeFilter === 'promo' ? ' active' : '')} onClick={() => setActiveFilter('promo')}><div className="cat-selector-icon-wrap" style={{ color: '#fbbf24' }}><i className="fa-solid fa-bolt-lightning" /></div><span className="cat-selector-label">Ofertas</span></button>}
            {data.categorizedData.map((cat: any) => <button key={cat.id} className={'cat-selector-item' + (activeFilter === cat.id ? ' active' : '')} onClick={() => setActiveFilter(cat.id)}><div className="cat-selector-icon-wrap"><i className={`fa-solid ${cat.icon || 'fa-tag'}`} /></div><span className="cat-selector-label">{cat.name}</span></button>)}
            {data.uncategorized.length > 0 && <button className={'cat-selector-item' + (activeFilter === 'outros' ? ' active' : '')} onClick={() => setActiveFilter('outros')}><div className="cat-selector-icon-wrap"><i className="fa-solid fa-box" /></div><span className="cat-selector-label">Outros</span></button>}
          </div></div>

          <CombosSection />
          {data.promoProducts.length > 0 && (activeFilter === 'all' || activeFilter === 'promo') && (
            <div><div className="section-title promo"><i className="fa-solid fa-bolt-lightning" /><span className="promo-highlight">Ofertas do Dia</span><div className="line" style={{ background: 'linear-gradient(to right,#fbbf24,transparent)' }} /></div><div className="product-grid">{data.promoProducts.filter(matchesSearch).map((p: any) => <ProductCard key={p.id} p={p} usePromo />)}</div></div>
          )}
          {data.categorizedData.map((cat: any) => (activeFilter === 'all' || activeFilter === cat.id) && (
            <div className="section-container-cat" key={cat.id}><SectionTitle icon={cat.icon || 'fa-tag'} label={cat.name} /><div className="product-grid">{cat.products.filter(matchesSearch).map((p: any) => <ProductCard key={p.id} p={p} />)}</div></div>
          ))}
          {data.uncategorized.length > 0 && (activeFilter === 'all' || activeFilter === 'outros') && (
            <div className="section-container-cat"><SectionTitle icon="fa-box" label="Outros" /><div className="product-grid">{data.uncategorized.filter(matchesSearch).map((p: any) => <ProductCard key={p.id} p={p} />)}</div></div>
          )}
          {data.products.length === 0 && <EmptyProducts />}
        </main>
      )}

      {/* WHATSAPP FLOAT */}
      {whatsappNumber && <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="whatsapp-float"><i className="fa-brands fa-whatsapp" /><span>Falar conosco</span></a>}

      {/* FLOATING CART */}
      {hasVendaCatalogo && totalQty > 0 && (
        <button className="cart-float-btn" style={{ display: 'flex' }} onClick={() => setCartOpen(true)}>
          <div className="cart-float-left"><i className="fa-solid fa-bag-shopping" style={{ fontSize: '1.2rem' }} /><span className="cart-badge-float">{totalQty}</span></div>
          <div className="cart-float-center">Ver sacola</div>
          <div className="cart-float-right">R$ {subtotal.toFixed(2).replace('.', ',')}</div>
        </button>
      )}

      {/* CART MODAL (checkout entra na próxima sub-etapa) */}
      {cartOpen && (
        <div className="cat-modal-base" style={{ alignItems: 'flex-end', padding: 0 }} onClick={(e) => { if (e.target === e.currentTarget) setCartOpen(false); }}>
          <div style={{ background: '#1e293b', borderRadius: '24px 24px 0 0', width: '100%', maxWidth: 520, maxHeight: '85vh', display: 'flex', flexDirection: 'column', padding: 24, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}><i className="fa-solid fa-cart-shopping" /> Meu Carrinho</h3>
              <button onClick={() => setCartOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer' }}><i className="fa-solid fa-xmark" /></button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', minHeight: 80 }}>
              {cart.size === 0 ? <p style={{ textAlign: 'center', color: '#94a3b8', padding: '20px 0' }}>Seu carrinho está vazio.</p>
                : Array.from(cart.entries()).map(([id, { product, qty }]) => {
                  const price = product.promotionalActive ? (product.promotionalPrice || product.price) : product.price;
                  return (
                    <div key={id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ flex: 1 }}><p style={{ margin: 0, fontWeight: 600, fontSize: '0.95rem' }}>{product.name}</p><p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '0.8rem' }}>R$ {price.toFixed(2)} cada</p></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <button onClick={() => changeQty(id, -1)} style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>-</button>
                        <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 700 }}>{qty}</span>
                        <button onClick={() => changeQty(id, 1)} style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary-cat)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>+</button>
                        <button onClick={() => removeItem(id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}><i className="fa-solid fa-trash" style={{ fontSize: '0.85rem' }} /></button>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16, marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}><span style={{ fontWeight: 700 }}>Total</span><span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-cat)' }}>R$ {subtotal.toFixed(2)}</span></div>
              <button disabled={cart.size === 0} onClick={startCheckout} style={{ width: '100%', padding: 14, borderRadius: 14, background: 'var(--primary-cat)', color: 'white', border: 'none', cursor: cart.size === 0 ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '1rem', opacity: cart.size === 0 ? 0.6 : 1 }}><i className="fa-solid fa-arrow-right" /> Finalizar Pedido</button>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT */}
      {checkoutOpen && (
        <CheckoutModals cart={cart} subtotal={subtotal} storeId={storeId} companyId={data.company.id}
          data={{ store, config, design, pixKey: data.pixKey, isMpActive: data.isMpActive, flatBairros: data.flatBairros, taxaGenerica: data.taxaGenerica, cuponsList: data.cuponsList }}
          onClose={() => setCheckoutOpen(false)}
          onClearCart={() => setCart(new Map())}
          onClosedAlert={(t) => { setCheckoutOpen(false); setClosedAlert(t); }} />
      )}

      {/* ALERTA DE FECHADO */}
      {closedAlert && (
        <div className="cat-modal-base" style={{ alignItems: 'center', zIndex: 9999 }} onClick={(e) => { if (e.target === e.currentTarget) setClosedAlert(null); }}>
          <div style={{ background: '#1e293b', borderRadius: 24, width: '92%', maxWidth: 460, padding: 28, textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(239,68,68,0.15)', border: '2px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><i className={`fa-solid ${closedAlert === 'store' ? 'fa-store-slash' : 'fa-motorcycle'}`} style={{ fontSize: '2.5rem', color: '#ef4444' }} /></div>
            <h2 style={{ margin: '0 0 10px', fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>{closedAlert === 'store' ? 'Loja Fechada' : 'Entrega Desativada'}</h2>
            <p style={{ color: '#94a3b8', marginBottom: 20 }}>{closedAlert === 'store' ? 'No momento não estamos aceitando pedidos.' : 'O serviço de entrega está desativado no momento. Por favor, escolha a opção de Retirada se disponível.'}</p>
            {closedAlert === 'store' && (
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}><i className="fa-regular fa-clock" /> Voltamos</span>
                <p style={{ margin: '6px 0 0', fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-cat)' }}>{getNextOpenTime(config, store)}</p>
              </div>
            )}
            <button onClick={() => setClosedAlert(null)} style={{ width: '100%', padding: 14, borderRadius: 14, background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Entendi</button>
          </div>
        </div>
      )}

      {/* INFO DA LOJA */}
      {storeInfoOpen && (
        <div className="cat-modal-base" style={{ alignItems: 'center' }} onClick={(e) => { if (e.target === e.currentTarget) setStoreInfoOpen(false); }}>
          <div style={{ background: '#1e293b', borderRadius: 24, width: '92%', maxWidth: 500, padding: 28, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}><i className="fa-solid fa-circle-info" /> Informações da Loja</h3>
              <button onClick={() => setStoreInfoOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer' }}><i className="fa-solid fa-xmark" /></button>
            </div>
            <h4 style={{ margin: '0 0 10px', color: 'var(--primary-cat)' }}><i className="fa-regular fa-clock" /> Horário de Funcionamento</h4>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: '8px 16px', marginBottom: 20, fontSize: '0.9rem' }}>
              {['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'].map((d) => {
                const h = getStoreHorario(config, store, d);
                return <div key={d} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><span style={{ color: 'var(--text-muted)' }}>{DIAS_NOME[d]}</span>{h.ativo ? <span style={{ fontWeight: 600 }}>{h.inicio} às {h.fim}</span> : <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 600 }}>Fechado</span>}</div>;
              })}
            </div>
            <h4 style={{ margin: '0 0 10px', color: 'var(--primary-cat)' }}><i className="fa-solid fa-credit-card" /> Formas de Pagamento</h4>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: 12, fontSize: '0.9rem', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <span style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)', padding: '4px 8px', borderRadius: 6, fontSize: '0.8rem' }}><i className="fa-solid fa-money-bill" /> Na Entrega/Retirada</span>
              {data.pixKey && <span style={{ background: 'rgba(16,185,129,0.1)', color: '#4ade80', border: '1px solid rgba(16,185,129,0.2)', padding: '4px 8px', borderRadius: 6, fontSize: '0.8rem' }}><i className="fa-brands fa-pix" /> PIX</span>}
              {data.isMpActive && <span style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)', padding: '4px 8px', borderRadius: 6, fontSize: '0.8rem' }}><i className="fa-solid fa-credit-card" /> Mercado Pago</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyProducts() {
  return <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}><i className="fa-solid fa-box-open" style={{ fontSize: '3rem', opacity: 0.3, display: 'block', marginBottom: 16 }} /><p>Nenhum produto disponível no momento.</p></div>;
}
