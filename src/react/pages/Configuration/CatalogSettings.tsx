import { useEffect, useMemo, useState } from 'react';
import { dbService } from '../../../services/db';
import { toast } from '../../../services/toast';
import { useAuth } from '../../useAuth';
import { Appearance } from './Appearance';
import { Schedules } from './Schedules';
import { Messages } from './Messages';
import { Payment } from './Payment';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const companyDoc = (await dbService.get('companies', companyId)) as any;
      let sts = companyDoc?.stores || [];
      if (!isOwner) sts = sts.filter((s: any) => userStoreIds.includes(s.id));
      setStores(sts);
      setHasMercadoPago(!!companyDoc?.mercadoPagoToken);
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
      await dbService.update('loja_config', existing.id, payload);
      setLojaConfigs((prev) => prev.map((c) => (c.id === existing.id ? { ...c, ...payload } : c)));
    } else {
      const newId = await dbService.create('loja_config', { empresaId: companyId, lojaId: activeStoreId, ...payload });
      setLojaConfigs((prev) => [...prev, { id: newId, empresaId: companyId, lojaId: activeStoreId, ...payload }]);
    }
  }

  const currentLink = activeStoreId ? `${window.location.origin}/catalog/${activeStoreId}` : '';
  const currentInstanciaId = config?.instancia_id || stores.find((s) => s.id === activeStoreId)?.instancia_id || '';

  async function bindInstance(newInstId: string) {
    try {
      toast.info('Salvando instância...');
      // 1. company.stores
      const updatedStores = stores.map((s) => (s.id === activeStoreId ? { ...s, instancia_id: newInstId || null } : s));
      await dbService.update('companies', companyId, { stores: updatedStores });
      setStores(updatedStores);
      // 2. loja_config
      await save({ instancia_id: newInstId || null });
      // 3. desvincula instâncias antigas dessa loja
      const oldInsts = (await dbService.getAll('instancias', { field: 'lojaId', operator: '==', value: activeStoreId })) as any[];
      for (const old of oldInsts) await dbService.update('instancias', old.id, { lojaId: null, funcao: null });
      // 4. vincula a nova
      if (newInstId) await dbService.update('instancias', newInstId, { lojaId: activeStoreId, funcao: 'Catálogo Vendas' });
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

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}><i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: 'var(--primary)' }} /></div>;
  if (!companyId) return <p>Acesso negado.</p>;
  if (stores.length === 0) return <p style={{ padding: '2rem' }}>Nenhuma loja disponível para configuração.</p>;

  const design = config?.design || {};

  return (
    <div>
      <div className="page-header"><h2 className="page-title">Configuração do Catálogo</h2></div>

      {/* Abas por loja */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, overflowX: 'auto' }}>
        {stores.map((s) => (
          <button key={s.id} className={'btn-store-tab' + (s.id === activeStoreId ? ' active' : '')} onClick={() => setActiveStoreId(s.id)}>
            <i className="fa-solid fa-store" style={{ marginRight: 5 }} /> {s.name}
          </button>
        ))}
      </div>

      {/* Link do catálogo */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="config-section-title"><i className="fa-solid fa-link" style={{ color: 'var(--primary)' }} /> Link do Catálogo</div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: 'rgba(99,102,241,0.06)', border: '1px dashed rgba(99,102,241,0.3)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem' }}>
          <i className="fa-solid fa-store" style={{ color: 'var(--primary)' }} />
          <input type="text" value={currentLink} readOnly style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none' }} />
          <button className="btn-save-msg" onClick={() => navigator.clipboard.writeText(currentLink).then(() => toast.success('Link copiado!'))}><i className="fa-solid fa-copy" /> Copiar</button>
          <a href={currentLink} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}><i className="fa-solid fa-arrow-up-right-from-square" /></a>
        </div>
      </div>

      {/* Instância */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="config-section-title"><i className="fa-brands fa-whatsapp" style={{ color: '#25d366' }} /> Vinculação da Instância</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Selecione a instância de WhatsApp que enviará mensagens automáticas para esta loja.</p>
        <select className="config-select" value={currentInstanciaId} onChange={(e) => bindInstance(e.target.value)}>
          <option value="">-- Nenhuma instância --</option>
          {instances.map((inst) => <option key={inst.id} value={inst.id}>{inst.nome} ({inst.status})</option>)}
        </select>
      </div>

      {/* Seções — key força reinicialização ao trocar de loja */}
      <Appearance key={`ap-${activeStoreId}`} companyId={companyId} storeId={activeStoreId} design={design} onSave={save} />
      <Schedules key={`func-${activeStoreId}`} title="Horário de Funcionamento" icon="fa-clock"
        description="Defina os dias e horários em que a loja aceita pedidos." campo="horario_funcionamento"
        saveLabel="Salvar Horários" openLabel="Aberto" closedLabel="Fechado" initial={config?.horario_funcionamento} onSave={save} />
      <Schedules key={`entrega-${activeStoreId}`} title="Horário de Entrega" icon="fa-truck"
        description="Defina especificamente em quais horários a loja realiza entregas." campo="horario_entrega"
        saveLabel="Salvar Horários de Entrega" openLabel="Disponível" closedLabel="Indisponível" initial={config?.horario_entrega} onSave={save} />
      <Messages key={`msg-${activeStoreId}`} initial={config?.mensagens_automaticas || {}} onSave={save} />
      <Payment key={`pay-${activeStoreId}`} config={config} hasMercadoPago={hasMercadoPago} onSave={save} />
    </div>
  );
}
