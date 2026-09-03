import { useEffect, useRef, useState } from 'react';
import { productsApi } from '../../../services/productsApi';
import { toast } from '../../../services/toast';
import { uploadImage, getProductImageUrl, getGalleryUrls } from './helpers';
import type { Product, Category } from './helpers';

type GalleryImg = { imagemPath: string; downloadToken: string };


interface ItemDraft {
  tempId: string;
  name: string;
  price: string;
  categoryId: string;
  stock: string;
  duration: string;
  observation: string;
  variations: string;       // "P, M, G" — separado por vírgula (modo vitrine)
  priceOnRequest: boolean;  // preço sob consulta (modo vitrine)
  complementoIds: string[]; // complementos escolhidos (biblioteca)
  galleryExisting: GalleryImg[]; // fotos já salvas (edição)
  galleryFiles: File[];          // fotos novas a subir
  galleryPreviews: string[];     // previews (existentes + novas, na mesma ordem)
  promoActive: boolean;
  promoName: string;
  promoPrice: string;
  file: File | null;
  previewUrl: string | null; // dataURL (novo) ou url existente
}

let seq = 0;
const newTempId = () => `prod_${Date.now()}_${seq++}`;

function emptyDraft(): ItemDraft {
  return { tempId: newTempId(), name: '', price: '', categoryId: '', stock: '', duration: '', observation: '', variations: '', priceOnRequest: false, complementoIds: [], galleryExisting: [], galleryFiles: [], galleryPreviews: [], promoActive: false, promoName: '', promoPrice: '', file: null, previewUrl: null };
}

interface Props {
  companyId: string;
  isOwner: boolean;
  isAgendamento: boolean;
  isVitrine: boolean;
  labelSingular: string;
  labelPlural: string;
  stores: any[];
  categories: Category[];
  userStoreIds: string[];
  editProduct: Product | null; // null => modo criação
  onClose: () => void;
  onSaved: (saved: Product[], editedId: string | null) => void;
}

export function ProductModal({ companyId, isOwner, isAgendamento, isVitrine, labelSingular, labelPlural, stores, categories, userStoreIds, editProduct, onClose, onSaved }: Props) {
  const isEdit = !!editProduct;
  const [items, setItems] = useState<ItemDraft[]>([]);
  const [saving, setSaving] = useState(false);
  const bulkInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editProduct) {
      setItems([{
        tempId: 'edit-item',
        name: editProduct.name || '',
        price: editProduct.price != null ? String(editProduct.price) : '',
        categoryId: editProduct.categoryId || '',
        stock: editProduct.stock != null ? String(editProduct.stock) : '',
        duration: editProduct.duration != null ? String(editProduct.duration) : '',
        observation: editProduct.observation || '',
        variations: Array.isArray((editProduct as any).variations) ? (editProduct as any).variations.join(', ') : '',
        priceOnRequest: !!(editProduct as any).priceOnRequest,
        complementoIds: Array.isArray((editProduct as any).complementoIds) ? (editProduct as any).complementoIds : [],
        galleryExisting: (editProduct.gallery || []) as GalleryImg[],
        galleryFiles: [],
        galleryPreviews: getGalleryUrls(editProduct),
        promoActive: !!editProduct.promotionalActive,
        promoName: editProduct.promotionalName || '',
        promoPrice: editProduct.promotionalPrice != null ? String(editProduct.promotionalPrice) : '',
        file: null,
        previewUrl: getProductImageUrl(editProduct),
      }]);
    } else {
      setItems([]);
    }
  }, [editProduct]);

  const patch = (tempId: string, p: Partial<ItemDraft>) =>
    setItems((prev) => prev.map((it) => (it.tempId === tempId ? { ...it, ...p } : it)));

  const removeItem = (tempId: string) => setItems((prev) => prev.filter((it) => it.tempId !== tempId));

  const addManual = () => setItems((prev) => [...prev, emptyDraft()]);

  const readPreview = (file: File, tempId: string) => {
    const reader = new FileReader();
    reader.onload = (e) => patch(tempId, { previewUrl: (e.target?.result as string) || null });
    reader.readAsDataURL(file);
  };

  const processFiles = (files: FileList | File[]) => {
    const drafts: ItemDraft[] = [];
    Array.from(files).forEach((file) => {
      const d = emptyDraft();
      d.name = file.name.replace(/\.[^/.]+$/, '').replace(/-|_/g, ' ');
      d.file = file;
      drafts.push(d);
      readPreview(file, d.tempId);
    });
    setItems((prev) => [...prev, ...drafts]);
  };

  const onItemFile = (tempId: string, file: File) => {
    patch(tempId, { file });
    readPreview(file, tempId);
  };


  async function save() {
    if (items.length === 0) { toast.warning(`Adicione pelo menos um ${labelSingular.toLowerCase()}.`); return; }

    // Loja única: o produto vai para o negócio inteiro automaticamente.
    const targetStores: string[] = isOwner ? stores.map((s) => s.id) : userStoreIds;
    if (targetStores.length === 0) { toast.warning('Configure seu negócio antes de adicionar produtos.'); return; }

    setSaving(true);
    try {
      const saved: Product[] = [];
      for (const it of items) {
        let imageData: any = {};
        if (it.file) imageData = await uploadImage(it.file, companyId);

        const stock = !isAgendamento && it.stock !== '' ? parseInt(it.stock) : null;
        const duration = isAgendamento && it.duration !== '' ? parseInt(it.duration) : null;

        const variationsArr = isVitrine
          ? it.variations.split(',').map((v) => v.trim()).filter(Boolean)
          : [];

        // Galeria (vitrine): mantém as existentes + sobe as novas.
        let gallery: GalleryImg[] = it.galleryExisting;
        if (isVitrine && it.galleryFiles.length) {
          const uploaded = await Promise.all(it.galleryFiles.map((f) => uploadImage(f, companyId)));
          gallery = [...it.galleryExisting, ...uploaded];
        }

        const productData: any = {
          name: it.name,
          price: parseFloat(it.price) || 0,
          categoryId: it.categoryId,
          storeIds: targetStores,
          companyId,
          active: editProduct ? editProduct.active : true,
          promotionalActive: isAgendamento || isVitrine ? false : it.promoActive,
          promotionalName: isAgendamento || isVitrine ? '' : it.promoName,
          promotionalPrice: isAgendamento || isVitrine ? 0 : (parseFloat(it.promoPrice) || 0),
          stock, duration,
          observation: it.observation || '',
          variations: variationsArr,
          priceOnRequest: isVitrine ? it.priceOnRequest : false,
          // Complementos (referências à biblioteca) — só no catálogo com carrinho.
          complementoIds: (!isVitrine && !isAgendamento) ? it.complementoIds : [],
          ...(isVitrine ? { gallery } : {}),
          ...imageData,
        };

        if (editProduct && it.tempId === 'edit-item') {
          await productsApi.save(productData, editProduct.id);
          saved.push({ id: editProduct.id, ...productData });
        } else {
          const { id: newId } = await productsApi.save(productData);
          saved.push({ id: newId, ...productData });
        }
      }
      toast.success(`${labelPlural} salvo(s) com sucesso!`);
      onSaved(saved, editProduct ? editProduct.id : null);
    } catch (err: any) {
      toast.error(`Erro ao salvar: ${err.message || err}`);
      setSaving(false);
    }
  }

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content glass big-modal" style={{ display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <div style={{ padding: '0 20px 20px 0' }}>
          <h2 style={{ marginBottom: 5 }}>{isEdit ? `Editar ${labelSingular}` : `Adicionar ${labelPlural}`}</h2>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>Adicione ou edite {labelPlural.toLowerCase()} do seu catálogo.</p>
        </div>

        <div style={{ overflowY: 'auto', paddingRight: 10, flex: 1 }}>
          {!isEdit && (
            <div className="prod-bulk-dropzone"
              onClick={() => bulkInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); (e.currentTarget as HTMLElement).classList.add('drag-active'); }}
              onDragLeave={(e) => (e.currentTarget as HTMLElement).classList.remove('drag-active')}
              onDrop={(e) => { e.preventDefault(); (e.currentTarget as HTMLElement).classList.remove('drag-active'); if (e.dataTransfer?.files?.length) processFiles(e.dataTransfer.files); }}>
              <input ref={bulkInputRef} type="file" multiple accept="image/*" style={{ display: 'none' }}
                onChange={(e) => { if (e.target.files) processFiles(e.target.files); e.target.value = ''; }} />
              <div className="prod-dropzone-content">
                <div className="prod-dropzone-icon"><i className="fa-solid fa-cloud-arrow-up" /></div>
                <h3>Importação por Imagem</h3>
                <p>Arraste fotos dos seus {labelPlural.toLowerCase()} aqui ou <span>clique para navegar</span></p>
                <small>Formatos: JPG, PNG, WebP (máx 5MB/foto)</small>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
            {items.map((it) => (
              <ItemCard key={it.tempId} it={it} companyId={companyId} isAgendamento={isAgendamento} isVitrine={isVitrine} labelSingular={labelSingular}
                categories={categories} onPatch={patch} onFile={onItemFile} onRemove={removeItem} />
            ))}
          </div>

          {items.length === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--text-dim)', padding: '40px 20px', border: '1px dashed var(--border-color)', borderRadius: 12, marginTop: 10 }}>
              <i className="fa-solid fa-box-open" style={{ fontSize: '2rem', marginBottom: 10 }} />
              Nenhum {labelSingular.toLowerCase()} na lista de envio.
            </div>
          )}
        </div>

        <div style={{ marginTop: 25, paddingTop: 20, borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {!isEdit ? (
            <button type="button" className="btn-text" style={{ display: 'flex', alignItems: 'center', gap: 8 }} onClick={addManual}>
              <i className="fa-solid fa-plus-circle" /> Item Manual
            </button>
          ) : <span />}
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="button" className="btn-primary" disabled={saving} style={{ minWidth: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} onClick={save}>
              {saving ? <><div className="spinner-small" /> Salvando...</> : <><i className="fa-solid fa-save" /> Salvar {labelPlural}</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


function ItemCard({ it, companyId, isAgendamento, isVitrine, labelSingular, categories, onPatch, onFile, onRemove }: {
  it: ItemDraft; companyId: string; isAgendamento: boolean; isVitrine: boolean; labelSingular: string; categories: Category[];
  onPatch: (id: string, p: Partial<ItemDraft>) => void; onFile: (id: string, f: File) => void; onRemove: (id: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  // Galeria: previews síncronos (createObjectURL) pra evitar corrida entre arquivos.
  const onAddGallery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      const previews = files.map((f) => URL.createObjectURL(f));
      onPatch(it.tempId, { galleryFiles: [...it.galleryFiles, ...files], galleryPreviews: [...it.galleryPreviews, ...previews] });
    }
    e.target.value = '';
  };
  const removeGallery = (idx: number) => {
    const nExisting = it.galleryExisting.length;
    if (idx < nExisting) {
      onPatch(it.tempId, { galleryExisting: it.galleryExisting.filter((_, i) => i !== idx), galleryPreviews: it.galleryPreviews.filter((_, i) => i !== idx) });
    } else {
      const fi = idx - nExisting;
      onPatch(it.tempId, { galleryFiles: it.galleryFiles.filter((_, i) => i !== fi), galleryPreviews: it.galleryPreviews.filter((_, i) => i !== idx) });
    }
  };

  return (
    <div className="product-item-card">
      <div className="item-visual">
        <div className="image-preview-wrapper">
          {it.previewUrl ? <img src={it.previewUrl} className="preview-img" /> : <div className="preview-placeholder"><i className="fa-solid fa-image" /></div>}
        </div>
        <button type="button" className="btn-change-img" onClick={() => fileRef.current?.click()}><i className="fa-solid fa-camera" /></button>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
          onChange={(e) => { if (e.target.files?.[0]) onFile(it.tempId, e.target.files[0]); }} />
      </div>

      <div className="item-details">
        <div className="input-row">
          <div className="field">
            <label>Nome do {labelSingular}</label>
            <input type="text" value={it.name} onChange={(e) => onPatch(it.tempId, { name: e.target.value })}
              placeholder={isAgendamento ? 'Ex: Corte de Cabelo' : 'Ex: Tênis Esportivo Nitro'} />
          </div>
          <div className="field price-field">
            <label>Preço (R$)</label>
            <input type="number" value={it.price} disabled={isVitrine && it.priceOnRequest} onChange={(e) => onPatch(it.tempId, { price: e.target.value })} placeholder={isVitrine && it.priceOnRequest ? 'Sob consulta' : '0,00'} step="0.01" />
          </div>
        </div>

        <div className="input-row" style={{ marginTop: 12 }}>
          <div className="field">
            <label>Categoria</label>
            <select value={it.categoryId} onChange={(e) => onPatch(it.tempId, { categoryId: e.target.value })}>
              <option value="">Sem Categoria</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="field price-field">
            {isAgendamento ? (
              <>
                <label>Duração <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>(min)</span></label>
                <input type="number" value={it.duration} onChange={(e) => onPatch(it.tempId, { duration: e.target.value })} placeholder="Ex: 30" min="5" step="5" />
              </>
            ) : (
              <>
                <label>Estoque <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>(vazio = ∞)</span></label>
                <input type="number" value={it.stock} onChange={(e) => onPatch(it.tempId, { stock: e.target.value })} placeholder="Ilimitado" min="0" step="1" />
              </>
            )}
          </div>
        </div>

        {!isVitrine && !isAgendamento && (
          <ComplementPicker companyId={companyId} value={it.complementoIds} onChange={(ids) => onPatch(it.tempId, { complementoIds: ids })} />
        )}

        {isAgendamento && (
          <div style={{ marginTop: 12 }} className="field">
            <label>Observação</label>
            <textarea value={it.observation} onChange={(e) => onPatch(it.tempId, { observation: e.target.value })}
              placeholder={`Ex: Informações adicionais sobre o ${labelSingular.toLowerCase()}...`} style={{ minHeight: 60, resize: 'vertical' }} />
          </div>
        )}

        {isVitrine && (
          <>
            <div style={{ marginTop: 12 }} className="field">
              <label>Descrição</label>
              <textarea value={it.observation} onChange={(e) => onPatch(it.tempId, { observation: e.target.value })}
                placeholder="Detalhes do produto: material, medidas, etc." style={{ minHeight: 60, resize: 'vertical' }} />
            </div>
            <div style={{ marginTop: 12 }} className="field">
              <label>Tamanhos / Variações <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>(separe por vírgula)</span></label>
              <input type="text" value={it.variations} onChange={(e) => onPatch(it.tempId, { variations: e.target.value })} placeholder="Ex: P, M, G ou Azul, Vermelho" />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginTop: 12, fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>
              <input type="checkbox" checked={it.priceOnRequest} onChange={(e) => onPatch(it.tempId, { priceOnRequest: e.target.checked })} style={{ width: 16, height: 16 }} />
              <i className="fa-solid fa-comments-dollar" /> Preço sob consulta (não mostrar preço)
            </label>

            <div style={{ marginTop: 12 }} className="field">
              <label>Fotos adicionais <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>(a 1ª foto acima é a capa)</span></label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {it.galleryPreviews.map((url, idx) => (
                  <div key={idx} style={{ position: 'relative', width: 64, height: 64, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                    <img src={url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button type="button" onClick={() => removeGallery(idx)} title="Remover foto"
                      style={{ position: 'absolute', top: 2, right: 2, width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 11, lineHeight: 1 }}>×</button>
                  </div>
                ))}
                <button type="button" onClick={() => galleryRef.current?.click()}
                  style={{ width: 64, height: 64, borderRadius: 8, border: '1px dashed var(--border-color)', background: 'transparent', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '1.1rem' }}><i className="fa-solid fa-plus" /></button>
                <input ref={galleryRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={onAddGallery} />
              </div>
            </div>
          </>
        )}

        {!isAgendamento && !isVitrine && (
          <div style={{ marginTop: 15, paddingTop: 10, borderTop: '1px dashed var(--border-color)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem' }}>
              <input type="checkbox" checked={it.promoActive} onChange={(e) => onPatch(it.tempId, { promoActive: e.target.checked })} style={{ width: 16, height: 16 }} />
              <i className="fa-solid fa-tag" /> Ativar Promoção
            </label>
            {it.promoActive && (
              <div style={{ marginTop: 10, borderRadius: 8, background: 'rgba(132, 204, 22, 0.05)', padding: 12, border: '1px solid rgba(132, 204, 22, 0.2)' }}>
                <div className="input-row">
                  <div className="field">
                    <label>Título da Promoção</label>
                    <input type="text" value={it.promoName} onChange={(e) => onPatch(it.tempId, { promoName: e.target.value })} placeholder="Ex: Oferta Relâmpago!" />
                  </div>
                  <div className="field price-field">
                    <label>Preço Promo (R$)</label>
                    <input type="number" value={it.promoPrice} onChange={(e) => onPatch(it.tempId, { promoPrice: e.target.value })} placeholder="0,00" step="0.01" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <button type="button" className="btn-remove-item" onClick={() => onRemove(it.tempId)} title="Remover item">
        <i className="fa-solid fa-times" />
      </button>
    </div>
  );
}

// ── Seletor de complementos da biblioteca (com busca) ──
function ComplementPicker({ companyId, value, onChange }: { companyId: string; value: string[]; onChange: (ids: string[]) => void }) {
  const [lib, setLib] = useState<any[] | null>(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');

  useEffect(() => {
    import('../../../services/db').then(({ dbService }) =>
      dbService.getAll('complementos', { field: 'empresaId', operator: '==', value: companyId })
        .then((l: any[]) => setLib(l)).catch(() => setLib([])));
  }, [companyId]);

  const selecionados = (lib || []).filter((g) => value.includes(g.id));
  const filtrados = (lib || []).filter((g) => { const s = q.trim().toLowerCase(); return !s || (g.nome || '').toLowerCase().includes(s); });
  const toggle = (id: string) => onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);

  return (
    <div style={{ marginTop: 14, border: '1px solid var(--border-color)', borderRadius: 12, padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: selecionados.length || open ? 10 : 0 }}>
        <i className="fa-solid fa-plus-minus" style={{ color: 'var(--primary)' }} />
        <strong style={{ fontSize: '0.92rem' }}>Complementos</strong>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{selecionados.length ? `${selecionados.length} selecionado(s)` : 'opcional'}</span>
        <button type="button" onClick={() => setOpen((o) => !o)} className="btn-secondary" style={{ marginLeft: 'auto', padding: '4px 10px', fontSize: '0.8rem' }}>
          <i className="fa-solid fa-plus" /> {open ? 'Fechar' : 'Selecionar'}
        </button>
      </div>

      {selecionados.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: open ? 10 : 0 }}>
          {selecionados.map((g) => (
            <span key={g.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: 'rgba(132,204,22,0.12)', color: 'var(--primary)', border: '1px solid rgba(132,204,22,0.35)' }}>
              {g.nome}
              <button type="button" onClick={() => toggle(g.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', padding: 0 }}><i className="fa-solid fa-xmark" /></button>
            </span>
          ))}
        </div>
      )}

      {open && (
        <div>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar complemento..." style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-color,#f8fafc)', color: 'var(--text-main)', marginBottom: 8 }} />
          {lib === null ? <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Carregando...</p>
            : filtrados.length === 0 ? <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Nenhum complemento. Crie em <strong>Produtos → Complementos</strong>.</p>
            : (
              <div style={{ maxHeight: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {filtrados.map((g) => { const on = value.includes(g.id); return (
                  <button type="button" key={g.id} onClick={() => toggle(g.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, cursor: 'pointer', textAlign: 'left', background: on ? 'rgba(132,204,22,0.1)' : 'transparent', border: `1px solid ${on ? 'var(--primary)' : 'var(--border-color)'}` }}>
                    <i className={`fa-solid ${on ? 'fa-square-check' : 'fa-square'}`} style={{ color: on ? 'var(--primary)' : 'var(--text-dim)' }} />
                    <span style={{ flex: 1 }}><strong style={{ fontSize: '0.88rem' }}>{g.nome}</strong> <span style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>· {(g.itens || []).length} opções{g.obrigatorio ? ' · obrigatório' : ''}</span></span>
                  </button>
                ); })}
              </div>
            )}
        </div>
      )}
    </div>
  );
}
