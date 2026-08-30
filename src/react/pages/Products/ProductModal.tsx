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
  return { tempId: newTempId(), name: '', price: '', categoryId: '', stock: '', duration: '', observation: '', variations: '', priceOnRequest: false, galleryExisting: [], galleryFiles: [], galleryPreviews: [], promoActive: false, promoName: '', promoPrice: '', file: null, previewUrl: null };
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
  const [storeIds, setStoreIds] = useState<string[]>([]);
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
        galleryExisting: (editProduct.gallery || []) as GalleryImg[],
        galleryFiles: [],
        galleryPreviews: getGalleryUrls(editProduct),
        promoActive: !!editProduct.promotionalActive,
        promoName: editProduct.promotionalName || '',
        promoPrice: editProduct.promotionalPrice != null ? String(editProduct.promotionalPrice) : '',
        file: null,
        previewUrl: getProductImageUrl(editProduct),
      }]);
      setStoreIds(editProduct.storeIds || (editProduct.storeId ? [editProduct.storeId] : []));
    } else {
      setItems([]);
      setStoreIds([]);
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

  const toggleStore = (id: string) =>
    setStoreIds((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  async function save() {
    if (items.length === 0) { toast.warning(`Adicione pelo menos um ${labelSingular.toLowerCase()}.`); return; }

    let targetStores: string[] = [];
    if (isOwner) targetStores = storeIds;
    else targetStores = userStoreIds;
    if (targetStores.length === 0) { toast.warning('Selecione pelo menos uma loja.'); return; }

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
          {isOwner && (
            <div className="form-group">
              <label>Lojas de Destino <span style={{ color: 'var(--text-dim)', fontWeight: 400, textTransform: 'none' }}>(selecione uma ou mais)</span></label>
              <StoreMultiSelect stores={stores} storeIds={storeIds} onToggle={toggleStore} />
            </div>
          )}

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
              <ItemCard key={it.tempId} it={it} isAgendamento={isAgendamento} isVitrine={isVitrine} labelSingular={labelSingular}
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

// Dropdown multi-seleção de lojas (chips + lista de checkboxes).
function StoreMultiSelect({ stores, storeIds, onToggle }: { stores: any[]; storeIds: string[]; onToggle: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const selected = stores.filter((s) => storeIds.includes(s.id));

  return (
    <div ref={boxRef} style={{ position: 'relative' }}>
      <button type="button" onClick={() => setOpen((o) => !o)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'white', padding: '10px 14px', borderRadius: 8, fontSize: '0.95rem', cursor: 'pointer', minHeight: 46 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
          {selected.length === 0
            ? <span style={{ color: 'var(--text-dim)' }}>Selecione uma loja</span>
            : selected.map((s) => (
              <span key={s.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(132, 204, 22,0.15)', border: '1px solid rgba(132, 204, 22,0.4)', color: '#d9f0a3', borderRadius: 6, padding: '2px 8px', fontSize: '0.8rem' }}>
                {s.name}
                <i className="fa-solid fa-xmark" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); onToggle(s.id); }} />
              </span>
            ))}
        </div>
        <i className={`fa-solid fa-chevron-${open ? 'up' : 'down'}`} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
      </button>

      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 20, background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,0.4)', maxHeight: 240, overflowY: 'auto', padding: 6 }}>
          {stores.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', padding: '0.75rem 0', margin: 0 }}>Nenhuma loja disponível.</p>}
          {stores.map((s) => {
            const on = storeIds.includes(s.id);
            return (
              <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 6, cursor: 'pointer' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(23, 37, 28, 0.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                <input type="checkbox" checked={on} onChange={() => onToggle(s.id)} style={{ width: 16, height: 16, accentColor: 'var(--primary)' }} />
                <span style={{ fontSize: '0.9rem' }}>{s.name}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ItemCard({ it, isAgendamento, isVitrine, labelSingular, categories, onPatch, onFile, onRemove }: {
  it: ItemDraft; isAgendamento: boolean; isVitrine: boolean; labelSingular: string; categories: Category[];
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
