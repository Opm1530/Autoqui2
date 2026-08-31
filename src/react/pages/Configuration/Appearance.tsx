import { useRef, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase/config';
import { toast } from '../../../services/toast';
import { THEMES } from './constants';
import { SaveButton } from './SaveButton';

interface Props {
  companyId: string;
  storeId: string;
  design: any;
  vitrine?: boolean;
  onSave: (payload: any) => Promise<void>;
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="config-label">{label}</label>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="color-swatch" />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="config-input" style={{ flex: 1, borderRadius: 999 }} />
      </div>
    </div>
  );
}

export function Appearance({ companyId, storeId, design, vitrine = false, onSave }: Props) {
  const [meta, setMeta] = useState(design.metaDescription || '');
  const [barMsg, setBarMsg] = useState(design.vitrineBar || '');
  const [heroTitle, setHeroTitle] = useState(design.vitrineHeroTitle || '');
  const [heroSubtitle, setHeroSubtitle] = useState(design.vitrineHeroSubtitle || '');
  const [heroCta, setHeroCta] = useState(design.vitrineHeroCta || '');
  const [vtBg, setVtBg] = useState(design.vtBg || '#efe9e0');
  const [vtInk, setVtInk] = useState(design.vtInk || '#2b2620');
  const [vtAccent, setVtAccent] = useState(design.vtAccent || '#8a6d4b');
  const [vtCard, setVtCard] = useState(design.vtCard || '#ffffff');
  const [primary, setPrimary] = useState(design.primaryColor || '#5aa513');
  const [secondary, setSecondary] = useState(design.secondaryColor || '#f6f9f2');
  const [textColor, setTextColor] = useState(design.textColor || '#16251c');
  const [priceColor, setPriceColor] = useState(design.priceColor || '#5aa513');
  const [productBg, setProductBg] = useState(design.productBgColor || '#ffffff');
  const [themeId, setThemeId] = useState(design.themeId || 'classico');

  const [logoPreview, setLogoPreview] = useState<string | null>(design.logoUrl || null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(design.bannerUrl || null);
  const [bannerMobilePreview, setBannerMobilePreview] = useState<string | null>(design.bannerMobileUrl || null);

  const logoFile = useRef<File | null>(null);
  const bannerFile = useRef<File | null>(null);
  const bannerMobileFile = useRef<File | null>(null);
  const logoInput = useRef<HTMLInputElement>(null);
  const bannerInput = useRef<HTMLInputElement>(null);
  const bannerMobileInput = useRef<HTMLInputElement>(null);

  function pick(fileRef: React.MutableRefObject<File | null>, setPreview: (s: string) => void, f?: File) {
    if (!f) return;
    fileRef.current = f;
    const reader = new FileReader();
    reader.onload = (e) => setPreview((e.target?.result as string) || '');
    reader.readAsDataURL(f);
  }

  function openPreview(tid: string) {
    const c = (v: string) => v.replace(/^#/, '');
    const url = `${window.location.origin}/catalog/${storeId}?preview=1&pt=${tid}`
      + `&c1=${c(primary)}&c2=${c(secondary)}&c3=${c(textColor)}&c4=${c(priceColor)}&c5=${c(productBg)}`;
    window.open(url, '_blank', 'noopener');
  }

  async function save() {
    try {
      let logoUrl = design.logoUrl || '';
      let bannerUrl = design.bannerUrl || '';
      let bannerMobileUrl = design.bannerMobileUrl || '';
      if (logoFile.current) { const r = ref(storage, `logos/${companyId}/${storeId}_logo`); await uploadBytes(r, logoFile.current); logoUrl = await getDownloadURL(r); }
      if (bannerFile.current) { const r = ref(storage, `banners/${companyId}/${storeId}_desktop`); await uploadBytes(r, bannerFile.current); bannerUrl = await getDownloadURL(r); }
      if (bannerMobileFile.current) { const r = ref(storage, `banners/${companyId}/${storeId}_mobile`); await uploadBytes(r, bannerMobileFile.current); bannerMobileUrl = await getDownloadURL(r); }

      const newDesign = { ...design, primaryColor: primary, secondaryColor: secondary, textColor, priceColor, productBgColor: productBg, logoUrl, themeId, bannerUrl, bannerMobileUrl, metaDescription: meta,
        vitrineBar: barMsg.trim(), vitrineHeroTitle: heroTitle.trim(), vitrineHeroSubtitle: heroSubtitle.trim(), vitrineHeroCta: heroCta.trim(),
        vtBg, vtInk, vtAccent, vtCard };
      await onSave({ design: newDesign });
      toast.success('Aparência salva!');
    } catch (e) { toast.error('Erro ao salvar aparência.'); throw e; }
  }

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <div className="config-section-title"><i className="fa-solid fa-palette" style={{ color: 'var(--primary)' }} /> Aparência e Redes Sociais</div>

      <div className="cat-field">
        <label className="config-label">Descrição para Compartilhamento</label>
        <input type="text" value={meta} onChange={(e) => setMeta(e.target.value)} className="config-input" placeholder="Ex: Melhores lanches da região. Peça agora!" />
        <p className="cat-field-hint">Texto que aparece quando você compartilha o link no WhatsApp/FB/Insta.</p>
      </div>

      {vitrine && (
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginBottom: '0.5rem' }}>
          <p style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: 8 }}><i className="fa-solid fa-store" style={{ color: 'var(--primary)' }} /> Topo da Vitrine</p>
          <div className="cat-field">
            <label className="config-label">Barra de aviso (topo)</label>
            <input type="text" value={barMsg} onChange={(e) => setBarMsg(e.target.value)} className="config-input" placeholder="Ex: Frete grátis nas compras acima de R$ 300" />
            <p className="cat-field-hint">Fita fina no topo do site. Deixe vazio para esconder.</p>
          </div>
          <div className="cat-field">
            <label className="config-label">Título do banner</label>
            <input type="text" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className="config-input" placeholder="Ex: Nova Coleção de Inverno" />
          </div>
          <div className="cat-field">
            <label className="config-label">Subtítulo do banner</label>
            <input type="text" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} className="config-input" placeholder="Ex: Peças pensadas para durar a estação toda." />
          </div>
          <div className="cat-field">
            <label className="config-label">Texto do botão do banner</label>
            <input type="text" value={heroCta} onChange={(e) => setHeroCta(e.target.value)} className="config-input" placeholder="Ex: Ver produtos" />
            <p className="cat-field-hint">O botão rola a página até os produtos. Deixe vazio para esconder.</p>
          </div>
        </div>
      )}

      <div className="cat-field">
        <label className="config-label">Logo da Loja</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 80, height: 80, borderRadius: 12, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-hover)', overflow: 'hidden', flexShrink: 0 }}>
            {logoPreview ? <img src={logoPreview} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <i className="fa-solid fa-image fa-2x" style={{ color: 'var(--text-dim)' }} />}
          </div>
          <div>
            <input ref={logoInput} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => pick(logoFile, setLogoPreview, e.target.files?.[0])} />
            <button className="btn-secondary" onClick={() => logoInput.current?.click()}><i className="fa-solid fa-upload" /> Escolher Logo</button>
            <p className="cat-field-hint" style={{ marginTop: 6 }}>Recomendado: 200×200px PNG/SVG transparente</p>
          </div>
        </div>
      </div>

      {vitrine ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: '1.25rem' }}>
          <ColorField label="Fundo da vitrine" value={vtBg} onChange={setVtBg} />
          <ColorField label="Cor dos cartões" value={vtCard} onChange={setVtCard} />
          <ColorField label="Cor do texto" value={vtInk} onChange={setVtInk} />
          <ColorField label="Cor de destaque" value={vtAccent} onChange={setVtAccent} />
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: '1.25rem' }}>
            <ColorField label="Cor Principal" value={primary} onChange={setPrimary} />
            <ColorField label="Cor de Fundo" value={secondary} onChange={setSecondary} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: '1.25rem' }}>
            <ColorField label="Cor do Texto" value={textColor} onChange={setTextColor} />
            <ColorField label="Cor do Preço" value={priceColor} onChange={setPriceColor} />
            <ColorField label="Fundo do Produto" value={productBg} onChange={setProductBg} />
          </div>
        </>
      )}

      {!vitrine && (
        <div className="cat-field">
          <label className="config-label">Layout do Catálogo</label>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 12 }}>Escolha a apresentação visual dos seus produtos.</p>
          <div className="theme-card-grid">
            {THEMES.map((t) => (
              <div key={t.id} className={'theme-card' + (themeId === t.id ? ' active' : '')} onClick={() => setThemeId(t.id)}>
                <div className="theme-card-preview">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, height: '100%' }}>
                    {[0, 1, 2, 3].map((i) => <div key={i} style={{ background: 'rgba(132, 204, 22,.2)', borderRadius: 4 }} />)}
                  </div>
                </div>
                <div className="theme-card-name"><i className={`fa-solid ${t.icon}`} style={{ marginRight: 5 }} />{t.name}</div>
                <div className="theme-card-desc">{t.desc}</div>
                <button type="button" className="theme-preview-btn" onClick={(e) => { e.stopPropagation(); openPreview(t.id); }}>
                  <i className="fa-solid fa-eye" /> Preview
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="fa-solid fa-images" style={{ color: 'var(--primary)' }} /> Banners do Catálogo
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label className="config-label">Banner Desktop</label>
            <div style={{ height: 80, borderRadius: 8, border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, background: 'var(--surface-hover)', overflow: 'hidden' }}>
              {bannerPreview ? <img src={bannerPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className="fa-solid fa-panorama" style={{ color: 'var(--text-dim)', fontSize: '1.5rem' }} />}
            </div>
            <input ref={bannerInput} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => pick(bannerFile, setBannerPreview, e.target.files?.[0])} />
            <button className="btn-secondary" style={{ width: '100%' }} onClick={() => bannerInput.current?.click()}><i className="fa-solid fa-upload" /> Upload Desktop (1200×400)</button>
          </div>
          <div>
            <label className="config-label">Banner Mobile</label>
            <div style={{ height: 80, borderRadius: 8, border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, background: 'var(--surface-hover)', overflow: 'hidden' }}>
              {bannerMobilePreview ? <img src={bannerMobilePreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className="fa-solid fa-mobile-screen" style={{ color: 'var(--text-dim)', fontSize: '1.5rem' }} />}
            </div>
            <input ref={bannerMobileInput} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => pick(bannerMobileFile, setBannerMobilePreview, e.target.files?.[0])} />
            <button className="btn-secondary" style={{ width: '100%' }} onClick={() => bannerMobileInput.current?.click()}><i className="fa-solid fa-upload" /> Upload Mobile (600×300)</button>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <SaveButton label="Salvar Aparência" onSave={save} />
      </div>
    </div>
  );
}
