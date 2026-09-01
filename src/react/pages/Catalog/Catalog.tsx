import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dbService } from '../../../services/db';
import { toast } from '../../../services/toast';
import { getImageUrl, getProductGallery, getCategoryCover, storeStatusLabel, isFreteAbertoAgora, isStoreOpen, getNextOpenTime, getStoreHorario, DIAS_NOME } from './helpers';
import { CheckoutModals } from './CheckoutModals';
import { trackVitrine } from './track';
import './catalog-vitrine.css';
import './catalog.css';

interface CartEntry { product: any; qty: number }

// Decide se um fundo (hex) é escuro, pra adaptar bordas/texto do catálogo.
function isColorDark(hex: string): boolean {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || '').trim());
  if (!m) return true; // valores antigos/não-hex assumem tema escuro
  const n = parseInt(m[1], 16);
  const lum = 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return lum < 140;
}

export function Catalog({ storeId: storeIdProp }: { storeId?: string } = {}) {
  const params = useParams();
  const storeId = storeIdProp || params.storeId || '';
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any | null>(null);
  const [cart, setCart] = useState<Map<string, CartEntry>>(new Map());
  const [cartOpen, setCartOpen] = useState(false);
  const [varSel, setVarSel] = useState<Record<string, string>>({}); // variação escolhida por produto (modo vitrine)
  const [detail, setDetail] = useState<any | null>(null);           // produto aberto no modal de detalhe (vitrine)
  const [detailImg, setDetailImg] = useState(0);                    // índice da foto no modal
  const [vitrineCat, setVitrineCat] = useState('');                 // categoria selecionada no carrossel (vitrine); '' = todas
  const gridRef = useRef<HTMLDivElement>(null);                     // âncora do botão do banner (vitrine)
  const trackedView = useRef('');                                   // evita duplicar a métrica de visita
  const trackedCart = useRef(false);                                // funil: 1x por sessão
  const trackedCheckout = useRef(false);

  // Funil de conversão do catálogo (1 evento por etapa por sessão).
  const funnelTrack = (tipo: 'cart_add' | 'checkout') => {
    if (!data?.company?.id) return;
    if (tipo === 'cart_add') { if (trackedCart.current) return; trackedCart.current = true; }
    if (tipo === 'checkout') { if (trackedCheckout.current) return; trackedCheckout.current = true; }
    trackVitrine(tipo, data.company.id, storeId);
  };
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
        // Preview: overrides passados pela tela de Configuração (?preview=1&pt=...&c1=...)
        const qs = new URLSearchParams(window.location.search);
        const previewDesign: any = {};
        if (qs.get('preview')) {
          const map: Record<string, string> = { pt: 'themeId', c1: 'primaryColor', c2: 'secondaryColor', c3: 'textColor', c4: 'priceColor', c5: 'productBgColor' };
          for (const [k, prop] of Object.entries(map)) {
            const v = qs.get(k);
            if (v) previewDesign[prop] = prop === 'themeId' ? v : '#' + v.replace(/^#/, '');
          }
        }
        const design = { ...(config.design || {}), ...previewDesign };
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
          isVitrine: modulos.includes('vitrine'),
          products, promoProducts, categorizedData, uncategorized, combos,
          whatsappNumber, isMpActive,
          themeId: design.themeId || 'classico',
          bannerUrl: design.bannerUrl || '', bannerMobileUrl: design.bannerMobileUrl || '',
          logoUrl: design.logoUrl || '', pixKey: design.pixKey || '',
          flatBairros, taxaGenerica, cuponsList,
        });

        // Métrica: visita (topo do funil — catálogo e vitrine), uma vez por carga.
        if (trackedView.current !== storeId) {
          trackedView.current = storeId;
          trackVitrine('view', company.id, storeId);
        }

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
    funnelTrack('cart_add');
    setCart((prev) => {
      const n = new Map(prev); const ex = n.get(p.id); const max = p.stock ?? Infinity;
      if ((ex?.qty || 0) >= max) { toast.warning(`Estoque máximo atingido (${p.stock} un.)`); return prev; }
      n.set(p.id, { product: p, qty: (ex?.qty || 0) + 1 }); return n;
    });
  }
  function addCombo(c: any) {
    funnelTrack('cart_add');
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
          toast.error(`O item "${item.label}" não possui quantidade suficiente em estoque ou está indisponível.`);
          return;
        }
      } catch { /* ignore falhas de leitura */ }
    }
    funnelTrack('checkout');
    setCartOpen(false); setCheckoutOpen(true);
  }

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f6f9f2', color: '#16251c' }}><i className="fa-solid fa-spinner fa-spin fa-2x" /></div>;
  if (!data || data.notFound) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f6f9f2', color: '#16251c', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', padding: '2.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', maxWidth: 400 }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔎</div>
        <h2 style={{ marginBottom: '0.5rem', fontWeight: 700 }}>Catálogo não encontrado</h2>
        <p style={{ color: '#94a3b8', lineHeight: 1.5 }}>O link que você acessou pode estar incorreto ou a loja não está mais ativa.</p>
      </div>
    </div>
  );
  if (data.error) return <p style={{ padding: '2rem', color: '#16251c', background: '#f6f9f2', minHeight: '100vh' }}>Erro ao carregar catálogo.</p>;

  const { store, design, themeId, logoUrl, bannerUrl, bannerMobileUrl, whatsappNumber, hasVendaCatalogo, isVitrine, config } = data;
  const status = storeStatusLabel(config, store);
  // Loja faz entrega se tem bairros cadastrados ou uma taxa única definida.
  const fazEntrega = (data.flatBairros?.length || 0) > 0 || (data.taxaGenerica || 0) > 0;
  const permitirEntrega = isFreteAbertoAgora(config, store) && fazEntrega;

  // Tema claro por padrão, na identidade do sistema (lime). Loja pode personalizar.
  const primaryCat = design.primaryColor || '#5aa513';
  const bg = design.secondaryColor || '#f6f9f2';
  const isDarkBg = isColorDark(bg);
  const cssVars: React.CSSProperties = {
    ['--primary-cat' as any]: primaryCat,
    ['--primary-glow' as any]: primaryCat + '33',
    ['--bg' as any]: bg,
    // Bordas e "vidro" adaptam ao fundo (claro x escuro) pra não sumirem.
    ['--glass' as any]: isDarkBg ? 'rgba(255,255,255,0.05)' : 'rgba(16,42,28,0.04)',
    ['--border' as any]: isDarkBg ? 'rgba(255,255,255,0.10)' : 'rgba(16,42,28,0.10)',
    ['--text' as any]: design.textColor || (isDarkBg ? '#ffffff' : '#16251c'),
    ['--text-muted' as any]: isDarkBg ? '#94a3b8' : '#5c6b5e',
    ['--price-cat' as any]: design.priceColor || primaryCat,
    ['--product-bg' as any]: design.productBgColor || (isDarkBg ? 'rgba(255,255,255,0.05)' : '#ffffff'),
  };

  const StatusInline = () => (
    <span style={{ color: status.open ? '#10b981' : '#ef4444' }}>
      <i className={`fa-solid ${status.open ? 'fa-door-open' : 'fa-door-closed'}`} /> {status.text}
      {status.extra && <span style={{ opacity: 0.6, marginLeft: 4, color: 'var(--text)' }}> • {status.extra}</span>}
    </span>
  );

  // Link do WhatsApp já com o produto (e a variação escolhida) na mensagem.
  const waProductLink = (p: any) => {
    const chosen = varSel[p.id];
    const preco = !p.priceOnRequest && p.price ? ` - R$ ${Number(p.price).toFixed(2)}` : '';
    let msg = `Olá! Tenho interesse neste produto: ${p.name}${preco}`;
    if (chosen) msg += `\nOpção: ${chosen}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  const ProductCard = ({ p, usePromo = false }: { p: any; usePromo?: boolean }) => {
    const title = usePromo ? (p.promotionalName || p.name) : p.name;
    const price = usePromo ? (p.promotionalPrice || p.price) : p.price;
    const original = usePromo ? p.price : null;
    const out = p.stock === 0;
    const openDetail = () => { setDetail(p); setDetailImg(0); if (isVitrine) trackVitrine('produto', data.company.id, storeId, p.id); };
    return (
      <div className="product-card" style={{ ...(out ? { opacity: 0.6 } : undefined), ...(isVitrine ? { cursor: 'pointer' } : undefined) }} onClick={isVitrine ? openDetail : undefined}>
        <div className="card-image">
          <img src={getImageUrl(p)} alt={title} loading="lazy" />
          {usePromo && <div className="promo-tag">OFERTA</div>}
          {out && <div className="promo-tag" style={{ background: '#ef4444', left: 15, right: 'auto' }}>ESGOTADO</div>}
        </div>
        <div className="card-info">
          <h3>{title}</h3>
          {(isVitrine || data.modulos.includes('agendamento')) && p.observation && <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '4px 0 8px', lineHeight: 1.4 }}>{p.observation}</p>}
          {p.priceOnRequest
            ? <div className="price-container"><span className="price" style={{ fontSize: '1rem' }}>Sob consulta</span></div>
            : <div className="price-container"><span className="price">R$ {price?.toFixed(2)}</span>{original && <span className="original-price">R$ {original.toFixed(2)}</span>}</div>}
          {p.stock != null && !out && p.stock <= 10 && <p style={{ fontSize: '0.75rem', color: '#eab308', margin: '6px 0 0' }}>⚠️ Apenas {p.stock} restante{p.stock !== 1 ? 's' : ''}</p>}
          {hasVendaCatalogo && (
            <button disabled={out} onClick={() => addProduct(p)}
              style={{ marginTop: 12, width: '100%', padding: 10, borderRadius: 10, background: out ? 'rgba(255,255,255,0.05)' : 'var(--primary-cat)', color: out ? '#94a3b8' : 'white', border: 'none', cursor: out ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '0.9rem' }}>
              {out ? 'Esgotado' : '+ Adicionar'}
            </button>
          )}
          {isVitrine && (
            <button onClick={openDetail} style={{ marginTop: 12, width: '100%', padding: 10, borderRadius: 10, background: 'var(--product-bg)', color: 'var(--text)', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}>
              Ver detalhes
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
          {hasImg ? <img src={getImageUrl(c)} alt={c.nome} loading="lazy" /> : <i className="fa-solid fa-layer-group" style={{ fontSize: '2.5rem', color: 'var(--primary-cat)', opacity: 0.8 }} />}
          <div className="promo-tag" style={{ background: 'var(--primary-cat)' }}>COMBO</div>
        </div>
        <div className="card-info">
          <h3 style={{ fontWeight: 800 }}>{c.nome}</h3>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '4px 0 8px', lineHeight: 1.4 }}>{(c.produtos || []).map((p: any) => p.name).join(' + ')}</p>
          <div className="price-container"><span className="price" style={{ color: 'var(--primary-cat)' }}>R$ {parseFloat(c.preco || 0).toFixed(2)}</span>{precoOriginal > 0 && economia > 0 && <span className="original-price">R$ {precoOriginal.toFixed(2)}</span>}</div>
          {economia > 0 && <p style={{ fontSize: '0.75rem', color: '#10b981', margin: '4px 0 0', fontWeight: 700 }}>✓ Economize R$ {economia.toFixed(2)}</p>}
          <button style={{ marginTop: 12, width: '100%', padding: 10, borderRadius: 10, background: 'var(--primary-cat)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}>+ Adicionar Combo</button>
        </div>
      </div>
    );
  };

  const SectionTitle = ({ icon, label, promo }: { icon: string; label: string; promo?: boolean }) => (
    <div className={'section-title' + (promo ? ' promo' : '')}><i className={`fa-solid ${icon}`} /><span className={promo ? 'promo-highlight' : undefined}>{label}</span><div className="line" /></div>
  );

  const CombosSection = () => data.combos.length === 0 ? null : (
    <>
      <div className="section-title" style={{ marginTop: 40 }}><i className="fa-solid fa-layer-group" style={{ color: 'var(--primary-cat)' }} /><span>Combos Especiais</span><div className="line" style={{ background: 'linear-gradient(to right,var(--primary-cat),transparent)' }} /></div>
      <div className="product-grid">{data.combos.map((c: any) => <ComboCard key={c.id} c={c} />)}</div>
    </>
  );

  // Filtro (clássico/moderno) por categoria + busca
  const matchesSearch = (p: any) => !search.trim() || (p.name || '').toLowerCase().includes(search.trim().toLowerCase());
  const showGroup = (key: string) => activeFilter === 'all' || activeFilter === key;

  // Modal de detalhe do produto (reutilizado nos layouts padrão e vitrine).
  function renderDetail() {
    if (!detail) return null;
    const imgs = getProductGallery(detail);
    const vars: string[] = Array.isArray(detail.variations) ? detail.variations : [];
    return (
      <div className="cat-modal-base" style={{ alignItems: 'center', zIndex: 9999 }} onClick={(e) => { if (e.target === e.currentTarget) setDetail(null); }}>
        <div className="vt-detail">
          <div style={{ position: 'relative' }}>
            <img src={imgs[detailImg]} alt={detail.name} style={{ width: '100%', maxHeight: 400, objectFit: 'cover', display: 'block' }} />
            <button onClick={() => setDetail(null)} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer' }}><i className="fa-solid fa-xmark" /></button>
          </div>
          {imgs.length > 1 && (
            <div style={{ display: 'flex', gap: 8, padding: '12px 20px 0', overflowX: 'auto' }}>
              {imgs.map((u, i) => (
                <img key={i} src={u} onClick={() => setDetailImg(i)} alt=""
                  style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, cursor: 'pointer', flexShrink: 0, border: i === detailImg ? '2px solid var(--vt-accent)' : '2px solid transparent', opacity: i === detailImg ? 1 : 0.6 }} />
              ))}
            </div>
          )}
          <div style={{ padding: 24 }}>
            <h2 style={{ margin: '0 0 8px', fontSize: '1.4rem', letterSpacing: '-0.01em' }}>{detail.name}</h2>
            <div style={{ marginBottom: 16 }}>
              {detail.priceOnRequest
                ? <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--vt-accent)' }}>Sob consulta</span>
                : <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--vt-ink)' }}>R$ {Number(detail.price || 0).toFixed(2)}</span>}
            </div>
            {detail.observation && <p style={{ color: 'var(--vt-muted)', lineHeight: 1.7, fontSize: '0.95rem', whiteSpace: 'pre-wrap', margin: '0 0 18px' }}>{detail.observation}</p>}
            {vars.length > 0 && (
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--vt-muted)', marginBottom: 6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Opção</label>
                <select value={varSel[detail.id] || ''} onChange={(e) => setVarSel((prev) => ({ ...prev, [detail.id]: e.target.value }))} className="vt-select">
                  <option value="">Escolha uma opção...</option>
                  {vars.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            )}
            {whatsappNumber ? (
              <a href={waProductLink(detail)} target="_blank" rel="noreferrer" className="vt-wa-btn"
                onClick={() => trackVitrine('whatsapp', data.company.id, storeId, detail?.id)}>
                <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.2rem' }} /> Pedir no WhatsApp
              </a>
            ) : <p style={{ fontSize: '0.85rem', color: '#b45309', textAlign: 'center', margin: 0 }}>A loja ainda não configurou o WhatsApp de contato.</p>}
          </div>
        </div>
      </div>
    );
  }

  // ── Layout VITRINE (editorial): barra + banner + carrossel de categorias + grid ──
  if (isVitrine) {
    const cats = (data.categorizedData || []) as any[];
    const gridProducts = (vitrineCat
      ? (cats.find((c) => c.id === vitrineCat)?.products || [])
      : data.products
    ).filter(matchesSearch);
    // Cores da vitrine (editáveis no Design); bege editorial como padrão.
    const vtVars: React.CSSProperties = {
      ['--vt-bg' as any]: design.vtBg || '#efe9e0',
      ['--vt-ink' as any]: design.vtInk || '#2b2620',
      ['--vt-accent' as any]: design.vtAccent || '#8a6d4b',
      ['--vt-card' as any]: design.vtCard || '#ffffff',
      ['--vt-muted' as any]: '#8c8378',
    };
    return (
      <div className="vt-body" style={vtVars}>
        {design.vitrineBar && <div className="vt-bar">{design.vitrineBar}</div>}

        <header className="vt-header">
          {logoUrl ? <img src={logoUrl} alt={store.name} className="vt-logo-img" /> : <span className="vt-logo-txt">{store.name}</span>}
        </header>

        {bannerUrl && (
          <section className="vt-hero" style={{ backgroundImage: `url(${bannerUrl})` }}>
            <div className="vt-hero-overlay">
              {design.vitrineHeroTitle && <h1>{design.vitrineHeroTitle}</h1>}
              {design.vitrineHeroSubtitle && <p>{design.vitrineHeroSubtitle}</p>}
              {design.vitrineHeroCta && <button className="vt-hero-btn" onClick={() => gridRef.current?.scrollIntoView({ behavior: 'smooth' })}>{design.vitrineHeroCta}</button>}
            </div>
          </section>
        )}

        {cats.length > 0 && (
          <section className="vt-cats">
            <button className={'vt-cat' + (vitrineCat === '' ? ' active' : '')} onClick={() => setVitrineCat('')}>
              <span className="vt-cat-circle vt-cat-all"><i className="fa-solid fa-shapes" /></span>
              <span className="vt-cat-name">Todos</span>
            </button>
            {cats.map((c) => (
              <button key={c.id} className={'vt-cat' + (vitrineCat === c.id ? ' active' : '')} onClick={() => setVitrineCat(c.id)}>
                <span className="vt-cat-circle">
                  {getCategoryCover(c) ? <img src={getCategoryCover(c)!} alt={c.name} /> : <i className={`fa-solid ${c.icon || 'fa-tag'}`} />}
                </span>
                <span className="vt-cat-name">{c.name}</span>
              </button>
            ))}
          </section>
        )}

        <main className="vt-main" ref={gridRef}>
          <div className="vt-section-head">
            <span className="vt-eyebrow">{vitrineCat ? 'Categoria' : 'Todos os produtos'}</span>
            <h2>{vitrineCat ? cats.find((c) => c.id === vitrineCat)?.name : 'Produtos'}</h2>
          </div>
          {gridProducts.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--vt-muted)', padding: '40px 0' }}>Nenhum produto nesta categoria.</p>
          ) : (
            <div className="vt-grid">
              {gridProducts.map((p: any) => {
                const cover = getImageUrl(p);
                return (
                  <button key={p.id} className="vt-card" onClick={() => { setDetail(p); setDetailImg(0); trackVitrine('produto', data.company.id, storeId, p.id); }}>
                    <div className="vt-card-img"><img src={cover} alt={p.name} loading="lazy" /></div>
                    <div className="vt-card-info">
                      <div className="vt-card-name">{p.name}</div>
                      {p.observation && <div className="vt-card-meta">{p.observation}</div>}
                      <div className="vt-card-price">{p.priceOnRequest ? 'Sob consulta' : `R$ ${Number(p.price || 0).toFixed(2)}`}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </main>

        <footer className="vt-footer">
          {store.name} · {new Date().getFullYear()}
        </footer>

        {renderDetail()}
      </div>
    );
  }

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
      {whatsappNumber && <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="whatsapp-float" onClick={() => isVitrine && trackVitrine('whatsapp', data.company.id, storeId)}><i className="fa-brands fa-whatsapp" /><span>Falar conosco</span></a>}

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
              <span style={{ background: 'rgba(132,204,22,0.12)', color: 'var(--primary-hover)', border: '1px solid rgba(132,204,22,0.3)', padding: '4px 8px', borderRadius: 6, fontSize: '0.8rem' }}><i className="fa-solid fa-money-bill" /> Na Entrega/Retirada</span>
              {data.pixKey && <span style={{ background: 'rgba(16,185,129,0.1)', color: '#4ade80', border: '1px solid rgba(16,185,129,0.2)', padding: '4px 8px', borderRadius: 6, fontSize: '0.8rem' }}><i className="fa-brands fa-pix" /> PIX</span>}
              {data.isMpActive && <span style={{ background: 'rgba(132, 204, 22,0.1)', color: '#a3e635', border: '1px solid rgba(132, 204, 22,0.2)', padding: '4px 8px', borderRadius: 6, fontSize: '0.8rem' }}><i className="fa-solid fa-credit-card" /> Mercado Pago</span>}
            </div>
          </div>
        </div>
      )}

      {renderDetail()}
    </div>
  );
}

function EmptyProducts() {
  return <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}><i className="fa-solid fa-box-open" style={{ fontSize: '3rem', opacity: 0.3, display: 'block', marginBottom: 16 }} /><p>Nenhum produto disponível no momento.</p></div>;
}
