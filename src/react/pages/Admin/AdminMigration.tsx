import { useEffect, useMemo, useState } from 'react';
import { dbService } from '../../../services/db';
import { toast } from '../../../services/toast';
import { confirm } from '../../../services/confirm';
import { productsApi } from '../../../services/productsApi';
import { useAuth } from '../../useAuth';

export function AdminMigration() {
  const { user } = useAuth();
  const isAdmin = user?.role?.toLowerCase() === 'admin' || user?.email === 'ginannymoreira@gmail.com';

  const [companies, setCompanies] = useState<any[]>([]);
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (isAdmin) (async () => setCompanies((await dbService.getAll('companies')) as any[]))(); }, [isAdmin]);

  const allStores = useMemo(() => companies.flatMap((c) => (c.stores || []).map((s: any) => ({ ...s, companyName: c.name, companyId: c.id }))), [companies]);
  const storeById = (id: string) => allStores.find((s) => s.id === id);

  async function migrate() {
    if (!source || !target) { toast.warning('Selecione as lojas de origem e destino.'); return; }
    if (source === target) { toast.warning('A loja de origem e destino não podem ser a mesma.'); return; }
    const ok = await confirm.warning('Confirmar Migração', 'Isso irá duplicar todos os produtos da loja de origem para a loja de destino. Continuar?');
    if (!ok) return;
    const src = storeById(source); const tgt = storeById(target);
    setBusy(true);
    try {
      const sourceProducts = (await dbService.getAll('products', { field: 'companyId', operator: '==', value: src.companyId })) as any[];
      const storeProducts = sourceProducts.filter((p) => (p.storeIds && p.storeIds.includes(source)) || p.storeId === source);
      if (storeProducts.length === 0) { toast.info('Nenhum produto encontrado na loja de origem.'); setBusy(false); return; }
      let count = 0;
      for (const p of storeProducts) {
        const { id, ...clean } = p;
        clean.companyId = tgt.companyId; clean.storeIds = [target];
        delete clean.lojaId; delete clean.createdAt;
        await productsApi.save(clean, undefined, tgt.companyId);
        count++;
      }
      toast.success(`${count} produtos migrados com sucesso!`);
    } catch (err) { toast.error('Erro durante a migração: ' + err); }
    finally { setBusy(false); }
  }

  if (!isAdmin) return <p>Acesso negado.</p>;

  const selStyle: React.CSSProperties = { width: '100%', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid var(--border-color)' };

  return (
    <div>
      <div className="page-header"><h2 className="page-title">Migração Administrativa de Produtos</h2></div>
      <div className="card glass">
        <div className="card-header"><h3><i className="fa-solid fa-clone" /> Duplicar Catálogo</h3><p className="text-muted">Copie todos os produtos de uma unidade para outra.</p></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20 }}>
          <div className="form-group">
            <label>Loja de ORIGEM (de onde virão os produtos)</label>
            <select value={source} onChange={(e) => setSource(e.target.value)} style={selStyle}>
              <option value="">Selecione a origem...</option>
              {allStores.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.companyName})</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Loja de DESTINO (para onde serão copiados)</label>
            <select value={target} onChange={(e) => setTarget(e.target.value)} style={selStyle}>
              <option value="">Selecione o destino...</option>
              {allStores.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.companyName})</option>)}
            </select>
          </div>
        </div>
        <div style={{ marginTop: 30, padding: 20, borderRadius: 12, background: 'rgba(234,179,8,0.05)', border: '1px solid rgba(234,179,8,0.2)' }}>
          <p style={{ color: '#eab308', fontSize: '0.9rem', margin: 0 }}><i className="fa-solid fa-triangle-exclamation" /> <strong>Atenção:</strong> os produtos serão duplicados. Se você já migrou antes, eles aparecerão repetidos no destino.</p>
        </div>
        <div style={{ marginTop: 25, display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-primary" disabled={busy} onClick={migrate} style={{ padding: '12px 30px' }}>{busy ? <><i className="fa-solid fa-spinner fa-spin" /> Migrando...</> : <><i className="fa-solid fa-play" /> Iniciar Migração</>}</button>
        </div>
      </div>
    </div>
  );
}
