import { useEffect, useState } from 'react';
import { dbService } from '../../../services/db';
import { useAuth } from '../../useAuth';
import { SkeletonCards } from '../../components/Skeleton';
import { CombosModal } from './CombosModal';
import type { Combo, Product } from './helpers';

export function Combos() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const [stores, setStores] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const [companyDoc, prods, cbs] = await Promise.all([
        dbService.get('companies', companyId),
        dbService.getAll('products', { field: 'companyId', operator: '==', value: companyId }).catch(() => []),
        dbService.getAll('combos', { field: 'empresaId', operator: '==', value: companyId }).catch(() => []),
      ]);
      setStores((companyDoc as any)?.stores || []);
      setProducts(prods as Product[]);
      setCombos(cbs as Combo[]);
      setLoading(false);
    })();
  }, [companyId]);

  if (loading) return <SkeletonCards count={2} lines={4} />;
  return <CombosModal asPage companyId={companyId} stores={stores} products={products} combos={combos} onChange={setCombos} />;
}
