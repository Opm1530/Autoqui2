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
  onSave: (payload: any) => Promise<void>;
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="config-label">{label}</label>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} style={{ width: 44, height: 44, border: 'none', background: 'none', cursor: 'pointer', borderRadius: 8, padding: 0 }} />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="config-input" style={{ flex: 1 }} />
      </div>
    </div>
  );
}

export function Appearance({ companyId, storeId, design, onSave }: Props) {
  const [meta, setMeta] = useState(design.metaDescription || '');
  const [primary, setPrimary] = useState(design.primaryColor || '#6366f1');
  const [secondary, setSecondary] = useState(design.secondaryColor || '#0f172a');
  const [textColor, setTextColor] = useState(design.textColor || '#ffffff');
  const [priceColor, setPriceColor] = useState(design.priceColor || '#ffffff');
  const [productBg, setProductBg] = useState(design.productBgColor || '#1e293b');
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

  async function save() {
    try {
      let logoUrl = design.logoUrl || '';
      let bannerUrl = design.bannerUrl || '';
      let bannerMobileUrl = design.bannerMobileUrl || '';
      if (logoFile.current) { const r = ref(storage, `logos/${companyId}/${storeId}_logo`); await uploadBytes(r, logoFile.current); logoUrl = await getDownloadURL(r); }
      if (bannerFile.current) { const r = ref(storage, `banners/${companyId}/${storeId}_desktop`); await uploadBytes(r, bannerFile.current); bannerUrl = await getDownloadURL(r); }
      if (bannerMobileFile.current) { const r = ref(storage, `banners/${companyId}/${storeId}_mobile`); await uploadBytes(r, bannerMobileFile.current); bannerMobileUrl = await getDownloadURL(r); }

      const newDesign = { ...design, primaryColor: primary, secondaryColor: secondary, textColor, priceColor, productBgColor: productBg, logoUrl, themeId, bannerUrl, bannerMobileUrl, metaDescription: meta };
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: '1.25rem' }}>
        <ColorField label="Cor Principal" value={primary} onChange={setPrimary} />
        <ColorField label="Cor de Fundo" value={secondary} onChange={setSecondary} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: '1.25rem' }}>
        <ColorField label="Cor do Texto" value={textColor} onChange={setTextColor} />
        <ColorField label="Cor do Preço" value={priceColor} onChange={setPriceColor} />
        <ColorField label="Fundo do Produto" value={productBg} onChange={setProductBg} />
      </div>

      <div className="cat-field">
        <label className="config-label">Layout do Catálogo</label>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 12 }}>Escolha a apresentação visual dos seus produtos.</p>
        <div className="theme-card-grid">
          {THEMES.map((t) => (
            <div key={t.id} className={'theme-card' + (themeId === t.id ? ' active' : '')} onClick={() => setThemeId(t.id)}>
              <div className="theme-card-preview">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, height: '100%' }}>
                  {[0, 1, 2, 3].map((i) => <div key={i} style={{ background: 'rgba(99,102,241,.2)', borderRadius: 4 }} />)}
                </div>
              </div>
              <div className="theme-card-name"><i className={`fa-solid ${t.icon}`} style={{ marginRight: 5 }} />{t.name}</div>
              <div className="theme-card-desc">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

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
