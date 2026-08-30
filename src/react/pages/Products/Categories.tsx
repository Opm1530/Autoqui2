import { useEffect, useState } from 'react';
import { dbService } from '../../../services/db';
import { useAuth } from '../../useAuth';
import { SkeletonCards } from '../../components/Skeleton';
import { CategoryModal } from './CategoryModal';
import type { Category } from './helpers';

export function Categories() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const [categories, setCategories] = useState<Category[]>([]);
  const [labelPlural, setLabelPlural] = useState('Produtos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const [companyDoc, cats] = await Promise.all([
        dbService.get('companies', companyId),
        dbService.getAll('categories', { field: 'companyId', operator: '==', value: companyId }).catch(() => []),
      ]);
      const mods = (companyDoc as any)?.modulos_ativos || [];
      setLabelPlural(mods.includes('agendamento') ? 'Serviços' : 'Produtos');
      setCategories(cats as Category[]);
      setLoading(false);
    })();
  }, [companyId]);

  if (loading) return <SkeletonCards count={2} lines={4} />;
  return <CategoryModal asPage companyId={companyId} labelPlural={labelPlural} categories={categories} onChange={setCategories} />;
}
