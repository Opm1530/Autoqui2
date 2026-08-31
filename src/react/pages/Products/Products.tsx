import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../../../firebase/config';
import { dbService } from '../../../services/db';
import { productsApi } from '../../../services/productsApi';
import { toast } from '../../../services/toast';
import { confirm } from '../../../services/confirm';
import { useAuth } from '../../useAuth';
import { usePagination, Pagination } from '../../components/Pagination';
import { SkeletonTable } from '../../components/Skeleton';
import { getProductImageUrl } from './helpers';
import type { Product, Category } from './helpers';
import { ProductModal } from './ProductModal';

export function Products() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const isOwner = (user?.role?.toLowerCase() === 'owner');
  const userStoreIds: string[] = (user as any)?.storeIds || ((user as any)?.storeId ? [(user as any).storeId] : []);

  const [modulos, setModulos] = useState<string[] | null>(null);
  const [stores, setStores] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [storeFilter, setStoreFilter] = useState('all');
  const [searchParams] = useSearchParams();
  const search = searchParams.get('q') || '';
  const [catFilter, setCatFilter] = useState('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkCat, setBulkCat] = useState('');

  const [showProductModal, setShowProductModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const isAgendamento = modulos?.includes('agendamento') || false;
  const isVitrine = modulos?.includes('vitrine') || false;
  const labelSingular = isAgendamento ? 'Serviço' : 'Produto';
  const labelPlural = isAgendamento ? 'Serviços' : 'Produtos';

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const companyDoc = (await dbService.get('companies', companyId)) as any;
      const mods = companyDoc?.modulos_ativos || ['atendimento'];
      setModulos(mods);
      let sts = companyDoc?.stores || [];
      if (!isOwner) sts = sts.filter((s: any) => userStoreIds.includes(s.id));
      setStores(sts);
      if (!isOwner) setStoreFilter(userStoreIds.length === 1 ? userStoreIds[0] : 'employee_all');

      const enabled = mods.includes('venda') || mods.includes('agendamento') || mods.includes('venda_catalogo') || mods.includes('vitrine');
      if (!enabled) { setLoading(false); return; }

      const [prodsRaw, catsRaw] = await Promise.all([
        dbService.getAll('products', { field: 'companyId', operator: '==', value: companyId }),
        dbService.getAll('categories', { field: 'companyId', operator: '==', value: companyId }),
      ]);
      setProducts(prodsRaw as Product[]);
      setCategories(catsRaw as Category[]);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  const enabled = modulos ? (modulos.includes('venda') || modulos.includes('agendamento') || modulos.includes('venda_catalogo') || modulos.includes('vitrine')) : true;


  const filtered = useMemo(() => {
    let list = products;
    if (storeFilter !== 'all' && storeFilter !== 'employee_all') {
      list = list.filter((p) => (p.storeIds?.includes(storeFilter)) || p.storeId === storeFilter);
    } else if (storeFilter === 'employee_all') {
      list = list.filter((p) => (p.storeIds?.some((sid) => userStoreIds.includes(sid))) || (p.storeId && userStoreIds.includes(p.storeId)));
    }
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (catFilter !== 'all') list = list.filter((p) => (p.categoryId || 'uncategorized') === catFilter);
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, storeFilter, search, catFilter]);

  const { page, setPage, totalPages, pageItems, total, perPage } = usePagination(filtered, 20, `${storeFilter}|${search}|${catFilter}`);

  const catalogLink = (storeFilter !== 'all' && storeFilter !== 'employee_all')
    ? `${window.location.origin}/catalog/${storeFilter}` : null;

  function toggleSelect(id: string) {
    setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }
  function toggleAll(check: boolean) {
    setSelected(check ? new Set(filtered.map((p) => p.id)) : new Set());
  }

  async function toggleStatus(p: Product) {
    try {
      await productsApi.updateFields(p.id, { active: !p.active });
      setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, active: !p.active } : x)));
      toast.success(`${labelSingular} ${!p.active ? 'ativado' : 'desativado'} com sucesso!`);
    } catch (e) { toast.error('Erro ao atualizar status: ' + e); }
  }

  async function deleteProduct(p: Product) {
    const ok = await confirm.danger(`Excluir ${labelSingular}`, `Tem certeza que deseja EXCLUIR este ${labelSingular.toLowerCase()}? Esta ação não pode ser desfeita.`);
    if (!ok) return;
    try {
      const imgUrl = getProductImageUrl(p);
      if (p.imagemPath || imgUrl) {
        try { await deleteObject(p.imagemPath ? ref(storage, p.imagemPath) : ref(storage, imgUrl!)); }
        catch (err) { console.warn('Could not delete image:', err); }
      }
      await productsApi.delete(p.id);
      setProducts((prev) => prev.filter((x) => x.id !== p.id));
      toast.success(`${labelSingular} excluído com sucesso!`);
    } catch (e) { toast.error('Erro ao excluir: ' + e); }
  }

  async function applyBulkCategory() {
    if (!bulkCat) { toast.warning('Selecione uma categoria.'); return; }
    const ids = Array.from(selected);
    try {
      await Promise.all(ids.map((id) => productsApi.updateFields(id, { categoryId: bulkCat })));
      setProducts((prev) => prev.map((p) => (selected.has(p.id) ? { ...p, categoryId: bulkCat } : p)));
      toast.success(`${ids.length} produtos atualizados!`);
      setSelected(new Set()); setBulkCat('');
    } catch { toast.error('Erro ao processar em massa.'); }
  }

  function onProductsSaved(saved: Product[], editedId: string | null) {
    setProducts((prev) => {
      let next = prev;
      if (editedId) next = next.map((p) => (p.id === editedId ? { ...p, ...saved.find((s) => s.id === editedId) } : p));
      const news = saved.filter((s) => s.id !== editedId && !prev.some((p) => p.id === s.id));
      return [...next, ...news];
    });
    setShowProductModal(false); setEditProduct(null);
  }

  // Categorias usadas no filtro (inclui "uncategorized" só se houver)

  if (loading) return <SkeletonTable rows={8} cols={7} />;
  if (!enabled) {
    return (
      <div className="card">
        <h2>Módulo Desativado</h2>
        <p>Sua configuração atual não utiliza catálogo de produtos ou serviços.</p>
        <p>Contate o administrador para ativar o módulo correspondente.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header: título + link catálogo + botões */}
      <div className="page-header" style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <h2 className="page-title" style={{ marginBottom: 4 }}>{isAgendamento ? 'Catálogo de Serviços' : 'Catálogo de Produtos'}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{isAgendamento ? 'Gerencie os serviços oferecidos pela sua empresa.' : 'Gerencie os produtos visíveis no cardápio das suas lojas.'}</p>
        </div>

        {catalogLink && (
          <div style={{ flex: 1, minWidth: 300, maxWidth: 500, background: 'rgba(132, 204, 22,0.1)', border: '1px dashed var(--primary)', borderRadius: 12, padding: '10px 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 2 }}>Link do Catálogo</span>
              <input readOnly value={catalogLink} style={{ width: '100%', background: 'transparent', border: 'none', color: 'white', fontSize: '0.85rem', textOverflow: 'ellipsis', outline: 'none' }} />
            </div>
            <button className="btn-primary" style={{ padding: '8px 12px', fontSize: '0.8rem', flexShrink: 0 }} onClick={() => navigator.clipboard.writeText(catalogLink).then(() => toast.success('Link do catálogo copiado!'))}>
              <i className="fa-solid fa-copy" /> Copiar
            </button>
            <a href={catalogLink} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '8px 12px', fontSize: '0.8rem', flexShrink: 0 }}><i className="fa-solid fa-external-link" /></a>
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn-add" onClick={() => { setEditProduct(null); setShowProductModal(true); }}>Novo {labelSingular}<span className="btn-add-icon"><i className="fa-solid fa-plus" /></span></button>
        </div>
      </div>

      {/* Filtros */}
      <div style={{ margin: '1.5rem 0 2rem', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        {isOwner && stores.length > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>Filtrar por Loja:</span>
            <div className="store-filter-container">
              <button className={'filter-pill' + (storeFilter === 'all' ? ' active' : '')} onClick={() => setStoreFilter('all')}>Todas</button>
              {stores.map((s) => (
                <button key={s.id} className={'filter-pill' + (storeFilter === s.id ? ' active' : '')} onClick={() => setStoreFilter(s.id)}>{s.name}</button>
              ))}
            </div>
          </div>
        )}
        <div className={'date-filter' + (catFilter !== 'all' ? ' active' : '')}>
          <i className="fa-solid fa-tags" />
          <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} aria-label="Categoria">
            <option value="all">Todas as categorias</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      {/* Barra de ações em massa */}
      {selected.size > 0 && (
        <div className="bulk-actions-bar">
          <span style={{ fontWeight: 700 }}>{selected.size} item(ns) selecionado(s)</span>
          <div style={{ height: 20, width: 1, background: 'rgba(23, 37, 28, 0.3)' }} />
          <span>Mover para categoria:</span>
          <select value={bulkCat} onChange={(e) => setBulkCat(e.target.value)} className="bulk-select-cat">
            <option value="">Selecione...</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button className="btn-primary" style={{ background: 'white', color: 'var(--primary)', padding: '6px 15px', fontSize: '0.85rem' }} onClick={applyBulkCategory}>Aplicar</button>
          <button style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '0.85rem', cursor: 'pointer' }} onClick={() => { setSelected(new Set()); setBulkCat(''); }}>Cancelar</button>
        </div>
      )}

      {/* Tabela */}
      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}><input type="checkbox" checked={filtered.length > 0 && selected.size === filtered.length} onChange={(e) => toggleAll(e.target.checked)} /></th>
                <th>{labelSingular}</th>
                <th>Preço</th>
                <th>{isAgendamento ? 'Duração' : 'Estoque'}</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {total === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                  {(search || catFilter || storeFilter) ? (
                    <>Nenhum {labelSingular.toLowerCase()} encontrado com esse filtro.</>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                      <i className="fa-solid fa-box-open" style={{ fontSize: '2.2rem', color: 'var(--text-dim)' }} />
                      <div>Você ainda não tem nenhum {labelSingular.toLowerCase()}. Adicione o primeiro para montar seu catálogo.</div>
                      <button className="btn-add" onClick={() => { setEditProduct(null); setShowProductModal(true); }}>Adicionar {labelSingular.toLowerCase()}<span className="btn-add-icon"><i className="fa-solid fa-plus" /></span></button>
                    </div>
                  )}
                </td></tr>
              ) : pageItems.map((p) => {
                const img = getProductImageUrl(p);
                return (
                  <tr key={p.id} onClick={() => { setEditProduct(p); setShowProductModal(true); }} style={{ cursor: 'pointer' }}>
                    <td onClick={(e) => e.stopPropagation()}><input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleSelect(p.id)} /></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {img ? <img src={img} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                          : <div style={{ width: 40, height: 40, background: '#333', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-box" /></div>}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, maxWidth: 220 }}>
                          <span title={p.name} style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span>
                          {isAgendamento && p.observation && <span title={p.observation} style={{ fontSize: '0.75rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.observation}</span>}
                        </div>
                      </div>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>R$ {(p.price || 0).toFixed(2)}</td>
                    <td>
                      {isAgendamento
                        ? (p.duration ? <span className="badge info">{p.duration} min</span> : <span className="badge" style={{ background: 'rgba(100,116,139,0.15)', color: '#94a3b8' }}>—</span>)
                        : (p.stock == null ? <span className="badge info" title="Estoque ilimitado"><i className="fa-solid fa-infinity" /></span>
                          : p.stock > 10 ? <span className="badge success">{p.stock} un.</span>
                          : p.stock > 0 ? <span className="badge" style={{ background: 'rgba(234,179,8,0.15)', color: '#eab308', border: '1px solid rgba(234,179,8,0.3)' }}>{p.stock} un.</span>
                          : <span className="badge danger">Esgotado</span>)}
                    </td>
                    <td><span className={`badge ${p.active ? 'success' : 'danger'}`} title={p.active ? 'Ativo' : 'Inativo'}><i className={`fa-solid ${p.active ? 'fa-circle-check' : 'fa-circle-xmark'}`} /></span></td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="actions" style={{ display: 'flex', gap: 6 }}>
                        <button className="action-btn" title={p.active ? 'Desativar' : 'Ativar'} onClick={() => toggleStatus(p)}><i style={{ color: '#FFF' }} className={`fa-solid ${p.active ? 'fa-ban' : 'fa-check'}`} /></button>
                        <button className="action-btn" title="Excluir" onClick={() => deleteProduct(p)}><i style={{ color: '#FFF' }} className="fa-solid fa-trash" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} total={total} perPage={perPage} onChange={setPage} label={labelPlural.toLowerCase()} />
      </div>

      {showProductModal && (
        <ProductModal
          companyId={companyId} isOwner={isOwner} isAgendamento={isAgendamento} isVitrine={isVitrine}
          labelSingular={labelSingular} labelPlural={labelPlural}
          stores={stores} categories={categories} userStoreIds={userStoreIds}
          editProduct={editProduct}
          onClose={() => { setShowProductModal(false); setEditProduct(null); }}
          onSaved={onProductsSaved}
        />
      )}
    </div>
  );
}
