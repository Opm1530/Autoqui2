import { useEffect, useRef, useState } from 'react';
import { productsApi } from '../../../services/productsApi';
import { toast } from '../../../services/toast';
import { uploadImage, getProductImageUrl, getGalleryUrls } from './helpers';
import type { Product, Category } from './helpers';

type GalleryImg = { imagemPath: string; downloadToken: string };

// Complementos/opções (estilo iFood): grupos com itens; regras de mín/máx/obrigatório.
export interface OpcaoItem { id: string; nome: string; preco: number }
export interface GrupoOpcao { id: string; nome: string; min: number; max: number; obrigatorio: boolean; itens: OpcaoItem[] }
const gid = () => `g_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 5)}`;
function sanitizeGrupos(grupos: GrupoOpcao[]): GrupoOpcao[] {
  return (grupos || []).map((g) => ({
    id: g.id || gid(), nome: String(g.nome || '').trim(), obrigatorio: !!g.obrigatorio,
    min: Math.max(0, Number(g.min) || 0), max: Math.max(0, Number(g.max) || 0),
    itens: (g.itens || []).map((i) => ({ id: i.id || gid(), nome: String(i.nome || '').trim(), preco: Math.max(0, Number(i.preco) || 0) })).filter((i) => i.nome),
  })).filter((g) => g.nome && g.itens.length);
}

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
  gruposOpcoes: GrupoOpcao[]; // complementos (modo catálogo)
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
  return { tempId: newTempId(), name: '', price: '', categoryId: '', stock: '', duration: '', observation: '', variations: '', priceOnRequest: false, gruposOpcoes: [], galleryExisting: [], galleryFiles: [], galleryPreviews: [], promoActive: false, promoName: '', promoPrice: '', file: null, previewUrl: null };
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
        gruposOpcoes: Array.isArray((editProduct as any).gruposOpcoes) ? (editProduct as any).gruposOpcoes : [],
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
          // Complementos só no catálogo (com carrinho). Vitrine/agendamento não usam.
          gruposOpcoes: (!isVitrine && !isAgendamento) ? sanitizeGrupos(it.gruposOpcoes) : [],
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

        {!isVitrine && !isAgendamento && (
          <GroupsEditor grupos={it.gruposOpcoes} onChange={(g) => onPatch(it.tempId, { gruposOpcoes: g })} />
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

// ── Editor de complementos/opções (catálogo) ──
function GroupsEditor({ grupos, onChange }: { grupos: GrupoOpcao[]; onChange: (g: GrupoOpcao[]) => void }) {
  const [open, setOpen] = useState(grupos.length > 0);
  const upd = (i: number, p: Partial<GrupoOpcao>) => onChange(grupos.map((g, j) => (j === i ? { ...g, ...p } : g)));
  const addGrupo = () => { onChange([...grupos, { id: gid(), nome: '', min: 0, max: 1, obrigatorio: false, itens: [{ id: gid(), nome: '', preco: 0 }] }]); setOpen(true); };
  const rmGrupo = (i: number) => onChange(grupos.filter((_, j) => j !== i));
  const addItem = (i: number) => upd(i, { itens: [...grupos[i].itens, { id: gid(), nome: '', preco: 0 }] });
  const updItem = (i: number, j: number, p: Partial<OpcaoItem>) => upd(i, { itens: grupos[i].itens.map((it, k) => (k === j ? { ...it, ...p } : it)) });
  const rmItem = (i: number, j: number) => upd(i, { itens: grupos[i].itens.filter((_, k) => k !== j) });

  const inp: React.CSSProperties = { padding: '7px 9px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-color,#f8fafc)', color: 'var(--text-main)', fontSize: '0.88rem' };

  return (
    <div style={{ marginTop: 14, border: '1px solid var(--border-color)', borderRadius: 12, padding: 12 }}>
      <button type="button" onClick={() => (open ? setOpen(false) : (grupos.length ? setOpen(true) : addGrupo()))}
        style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.92rem', padding: 0 }}>
        <i className={`fa-solid ${open ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ color: 'var(--primary)' }} />
        <i className="fa-solid fa-layer-group" style={{ color: 'var(--primary)' }} />
        Complementos / Opções {grupos.length > 0 && <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({grupos.length} grupo{grupos.length !== 1 ? 's' : ''})</span>}
      </button>
      {open && (
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {grupos.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>Ex.: "Escolha o sabor" (obrigatório), "Adicionais" (opcional, com preço), "Talheres".</p>}
          {grupos.map((g, i) => (
            <div key={g.id} style={{ background: 'var(--bg-color,#f8fafc)', borderRadius: 10, padding: 10, border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <input value={g.nome} onChange={(e) => upd(i, { nome: e.target.value })} placeholder="Nome do grupo (ex: Adicionais)" style={{ ...inp, flex: 1 }} />
                <button type="button" onClick={() => rmGrupo(i)} title="Remover grupo" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}><i className="fa-solid fa-trash" /></button>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <input type="checkbox" checked={g.obrigatorio} onChange={(e) => upd(i, { obrigatorio: e.target.checked, min: e.target.checked ? Math.max(1, g.min) : 0 })} /> Obrigatório
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 5 }}>mín <input type="number" min="0" value={g.min} onChange={(e) => upd(i, { min: Number(e.target.value) })} style={{ ...inp, width: 56, padding: '4px 6px' }} /></label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 5 }}>máx <input type="number" min="0" value={g.max} onChange={(e) => upd(i, { max: Number(e.target.value) })} style={{ ...inp, width: 56, padding: '4px 6px' }} /></label>
                <span style={{ fontSize: '0.75rem' }}>(máx 0 ou 1 = escolha única/ilimitado)</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {g.itens.map((it, j) => (
                  <div key={it.id} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <input value={it.nome} onChange={(e) => updItem(i, j, { nome: e.target.value })} placeholder="Opção (ex: Granola)" style={{ ...inp, flex: 1 }} />
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>R$</span>
                    <input type="number" min="0" step="0.01" value={it.preco} onChange={(e) => updItem(i, j, { preco: Number(e.target.value) })} placeholder="0.00" style={{ ...inp, width: 80 }} />
                    <button type="button" onClick={() => rmItem(i, j)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}><i className="fa-solid fa-xmark" /></button>
                  </div>
                ))}
                <button type="button" onClick={() => addItem(i)} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontSize: '0.82rem', fontWeight: 600, padding: 0 }}><i className="fa-solid fa-plus" /> Adicionar opção</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={addGrupo} className="btn-secondary" style={{ alignSelf: 'flex-start' }}><i className="fa-solid fa-plus" /> Novo grupo</button>
        </div>
      )}
    </div>
  );
}
