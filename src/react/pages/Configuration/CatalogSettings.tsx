import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { dbService } from '../../../services/db';
import { dataApi } from '../../../services/dataApi';
import { adminApi } from '../../../services/adminApi';
import { toast } from '../../../services/toast';
import { useAuth } from '../../useAuth';
import { SkeletonCards } from '../../components/Skeleton';
import { Appearance } from './Appearance';
import { Messages } from './Messages';
import { Payment } from './Payment';
import { MercadoPago } from '../MercadoPago';

export function CatalogSettings() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const isOwner = user?.role === 'owner';
  const userStoreIds: string[] = (user as any)?.storeIds || ((user as any)?.storeId ? [(user as any).storeId] : []);

  const [stores, setStores] = useState<any[]>([]);
  const [instances, setInstances] = useState<any[]>([]);
  const [lojaConfigs, setLojaConfigs] = useState<any[]>([]);
  const [hasMercadoPago, setHasMercadoPago] = useState(false);
  const [activeStoreId, setActiveStoreId] = useState('');
  const [params] = useSearchParams();
  const initialSection = (['design', 'mensagens', 'pagamento'] as const).find((s) => s === params.get('sec')) || 'design';
  const [section, setSection] = useState<'design' | 'mensagens' | 'pagamento'>(initialSection);
  const [isVitrine, setIsVitrine] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const companyDoc = (await dbService.get('companies', companyId)) as any;
      let sts = companyDoc?.stores || [];
      if (!isOwner) sts = sts.filter((s: any) => userStoreIds.includes(s.id));
      setStores(sts);
      setHasMercadoPago(!!companyDoc?.mercadoPagoToken);
      setIsVitrine((companyDoc?.modulos_ativos || []).includes('vitrine'));
      if (sts.length) setActiveStoreId(sts[0].id);

      const [inst, cfgs] = await Promise.all([
        dbService.getAll('instancias', { field: 'empresaId', operator: '==', value: companyId }),
        dbService.getAll('loja_config', { field: 'empresaId', operator: '==', value: companyId }),
      ]);
      setInstances(inst as any[]);
      setLojaConfigs(cfgs as any[]);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  const config = useMemo(() => lojaConfigs.find((c) => c.lojaId === activeStoreId) || null, [lojaConfigs, activeStoreId]);

  // Upsert em loja_config + atualiza estado local
  async function save(payload: any) {
    const existing = lojaConfigs.find((c) => c.lojaId === activeStoreId);
    if (existing) {
      await dataApi.update('loja_config', existing.id, payload);
      setLojaConfigs((prev) => prev.map((c) => (c.id === existing.id ? { ...c, ...payload } : c)));
    } else {
      const { id: newId } = await dataApi.create('loja_config', { lojaId: activeStoreId, ...payload });
      setLojaConfigs((prev) => [...prev, { id: newId, empresaId: companyId, lojaId: activeStoreId, ...payload }]);
    }
  }

  const currentInstanciaId = config?.instancia_id || stores.find((s) => s.id === activeStoreId)?.instancia_id || '';

  async function bindInstance(newInstId: string) {
    try {
      toast.info('Salvando instância...');
      // 1. company.stores (backend, escopo por empresa)
      const updatedStores = stores.map((s) => (s.id === activeStoreId ? { ...s, instancia_id: newInstId || null } : s));
      await adminApi.setCompanyStores(updatedStores);
      setStores(updatedStores);
      // 2. loja_config
      await save({ instancia_id: newInstId || null });
      // 3. desvincula instâncias antigas dessa loja
      const oldInsts = (await dbService.getAll('instancias', { field: 'lojaId', operator: '==', value: activeStoreId })) as any[];
      for (const old of oldInsts) await dataApi.update('instancias', old.id, { lojaId: null, funcao: null });
      // 4. vincula a nova
      if (newInstId) await dataApi.update('instancias', newInstId, { lojaId: activeStoreId, funcao: 'Catálogo Vendas' });
      setInstances((prev) => prev.map((i) => {
        if (i.id === newInstId) return { ...i, lojaId: activeStoreId, funcao: 'Catálogo Vendas' };
        if (i.lojaId === activeStoreId) return { ...i, lojaId: null, funcao: null };
        return i;
      }));
      toast.success('Instância vinculada com sucesso!');
    } catch (err) {
      toast.error('Erro ao salvar instância.');
      console.error(err);
    }
  }

  if (loading) return <SkeletonCards count={3} lines={4} />;
  if (!companyId) return <p>Acesso negado.</p>;
  if (stores.length === 0) return <p style={{ padding: '2rem' }}>Nenhuma loja disponível para configuração.</p>;

  const design = config?.design || {};

  return (
    <div>
      {/* Seletor de loja + seções */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
        <div className="config-subnav" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(isVitrine ? SECTIONS_VITRINE : SECTIONS).map((s) => (
            <button key={s.key} onClick={() => setSection(s.key as any)}
              className={'config-subnav-btn' + (section === s.key ? ' active' : '')}>
              <i className={`fa-solid ${s.icon}`} /> {s.label}
            </button>
          ))}
        </div>

        {stores.length > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Loja</span>
            <div style={{ position: 'relative' }}>
              <i className="fa-solid fa-store" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', pointerEvents: 'none' }} />
              <select value={activeStoreId} onChange={(e) => setActiveStoreId(e.target.value)}
                style={{ appearance: 'none', padding: '0.6rem 2.2rem 0.6rem 34px', background: 'var(--surface-hover)', border: '1px solid var(--border-color)', borderRadius: 10, color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', minWidth: 220 }}>
                {stores.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <i className="fa-solid fa-chevron-down" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', pointerEvents: 'none', fontSize: '0.75rem' }} />
            </div>
          </div>
        )}
      </div>

      {section === 'design' && <Appearance key={`ap-${activeStoreId}`} companyId={companyId} storeId={activeStoreId} design={design} vitrine={isVitrine} onSave={save} />}
      {section === 'mensagens' && !isVitrine && (
        <>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div className="config-section-title"><i className="fa-brands fa-whatsapp" style={{ color: '#25d366' }} /> Vinculação da Instância</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Selecione a instância de WhatsApp que enviará as mensagens automáticas.</p>
            <select className="config-select" value={currentInstanciaId} onChange={(e) => bindInstance(e.target.value)}>
              <option value="">-- Nenhuma instância --</option>
              {instances.map((inst) => <option key={inst.id} value={inst.id}>{inst.nome} ({inst.status})</option>)}
            </select>
          </div>
          <Messages key={`msg-${activeStoreId}`} initial={config?.mensagens_automaticas || {}} onSave={save} />
        </>
      )}
      {section === 'pagamento' && <>
        <Payment key={`pay-${activeStoreId}`} config={config} hasMercadoPago={hasMercadoPago} vitrine={isVitrine} onSave={save} />
        {!isVitrine && (
          <div style={{ marginTop: '1.5rem' }}>
            <div className="config-section-title"><i className="fa-solid fa-credit-card" style={{ color: '#009ee3' }} /> Conta Mercado Pago (PIX automático)</div>
            <MercadoPago embedded />
          </div>
        )}
      </>}
    </div>
  );
}

const SECTIONS = [
  { key: 'design', label: 'Design', icon: 'fa-palette' },
  { key: 'mensagens', label: 'Mensagens', icon: 'fa-message' },
  { key: 'pagamento', label: 'Pagamento', icon: 'fa-credit-card' },
];

// Vitrine não vende pelo site: sem Mensagens automáticas nem Pagamento.
// "Pagamento" vira "Contato" (só o WhatsApp).
const SECTIONS_VITRINE = [
  { key: 'design', label: 'Design', icon: 'fa-palette' },
  { key: 'pagamento', label: 'Contato', icon: 'fa-comment-dots' },
];
