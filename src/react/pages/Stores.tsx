import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { dbService } from '../../services/db';
import { dataApi } from '../../services/dataApi';
import { adminApi } from '../../services/adminApi';
import { domainsApi } from '../../services/domainsApi';
import { toast } from '../../services/toast';
import { useAuth } from '../useAuth';
import { SkeletonCards } from '../components/Skeleton';
import { ManageTabs } from '../components/ManageTabs';
import { Schedules } from './Configuration/Schedules';

export function Stores() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const isOwner = user?.role === 'owner';

  const [stores, setStores] = useState<any[]>([]);
  const [modulos, setModulos] = useState<string[]>([]);
  const [landingHost, setLandingHost] = useState('');
  const [lojaConfigs, setLojaConfigs] = useState<any[]>([]);
  const [counts, setCounts] = useState({ colaboradores: 0, categorias: 0, produtos: 0 });
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ id?: string; name: string; address: string } | null>(null);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const companyDoc = (await dbService.get('companies', companyId)) as any;
      setStores(companyDoc?.stores || []);
      setModulos(companyDoc?.modulos_ativos || []);
      setLandingHost(companyDoc?.farmaqui?.landing?.host || '');
      const [cfgs, users, cats, prods] = await Promise.all([
        dbService.getAll('loja_config', { field: 'empresaId', operator: '==', value: companyId }).catch(() => []),
        dbService.getAll('users', { field: 'companyId', operator: '==', value: companyId }).catch(() => []),
        dbService.getAll('categories', { field: 'companyId', operator: '==', value: companyId }).catch(() => []),
        dbService.getAll('products', { field: 'companyId', operator: '==', value: companyId }).catch(() => []),
      ]);
      setLojaConfigs(cfgs as any[]);
      setCounts({
        colaboradores: (users as any[]).filter((u) => u.role === 'employee').length,
        categorias: (cats as any[]).length,
        produtos: (prods as any[]).length,
      });
      setLoading(false);
    })();
  }, [companyId]);

  const storeId = stores[0]?.id || '';
  const config = useMemo(() => lojaConfigs.find((c) => c.lojaId === storeId) || null, [lojaConfigs, storeId]);
  // Frete/horários: só quem vende e entrega (não vitrine/atendimento).
  const mostraFrete = modulos.includes('venda_catalogo') || modulos.includes('venda');
  const mostraHorarios = mostraFrete;
  // Produtos/categorias existem em qualquer catálogo (inclui vitrine).
  const temProdutos = mostraFrete || modulos.includes('vitrine');

  // Upsert em loja_config (mesmo padrão da Configuração).
  async function saveConfig(payload: any) {
    const existing = lojaConfigs.find((c) => c.lojaId === storeId);
    if (existing) {
      await dataApi.update('loja_config', existing.id, payload);
      setLojaConfigs((prev) => prev.map((c) => (c.id === existing.id ? { ...c, ...payload } : c)));
    } else {
      const { id: newId } = await dataApi.create('loja_config', { lojaId: storeId, ...payload });
      setLojaConfigs((prev) => [...prev, { id: newId, empresaId: companyId, lojaId: storeId, ...payload }]);
    }
  }

  async function saveStore() {
    if (!modal) return;
    if (!modal.name.trim()) { toast.warning('Informe o nome da loja.'); return; }
    let updated: any[];
    if (modal.id) {
      updated = stores.map((x) => (x.id === modal.id ? { ...x, name: modal.name.trim(), address: modal.address.trim() } : x));
    } else {
      const novo = { id: `store_${Date.now()}`, name: modal.name.trim(), address: modal.address.trim(), active: true, frete_ativo: true, instancia_id: null };
      updated = [...stores, novo];
    }
    await persist(updated, modal.id ? 'Loja atualizada!' : 'Loja criada!');
    setModal(null);
  }

  async function persist(updated: any[], msg: string) {
    try {
      await adminApi.setCompanyStores(updated);
      setStores(updated);
      toast.success(msg);
    } catch (e: any) { toast.error('Erro ao atualizar: ' + (e.message || e)); }
  }

  function toggleFrete(s: any) {
    const novo = !(s.frete_ativo !== false);
    persist(stores.map((x) => (x.id === s.id ? { ...x, frete_ativo: novo } : x)), `Frete da loja atualizado para ${novo ? 'ativo' : 'inativo'}.`);
  }

  if (loading) return <SkeletonCards count={4} lines={2} />;
  if (!companyId) return <p>Erro: Usuário sem empresa associada.</p>;

  return (
    <div>
      <div className="page-heading"><h1>Negócio</h1><p>Dados do seu negócio, equipe e conexões de WhatsApp.</p></div>
      <ManageTabs />
      {stores.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-muted)' }}>
          <i className="fa-solid fa-store" style={{ fontSize: '2.5rem', color: 'var(--text-dim)', display: 'block', margin: '0 auto 12px', width: 'fit-content' }} />
          <p style={{ margin: '0 0 16px' }}>Seu negócio ainda não foi configurado.</p>
          {isOwner && <button className="btn-add" onClick={() => setModal({ name: '', address: '' })}>Configurar negócio<span className="btn-add-icon"><i className="fa-solid fa-plus" /></span></button>}
        </div>
      ) : (() => {
        const s = stores[0];
        // FarmaQui vincula a instância na própria tela (captação), não na loja.
        const isFarma = modulos.includes('farmaqui');
        const operable = s.active && (isFarma || s.instancia_id);
        const freteAtivo = s.frete_ativo !== false;
        const stats = [
          { label: 'Colaboradores', value: counts.colaboradores, icon: 'fa-users' },
          ...(temProdutos ? [
            { label: 'Categorias', value: counts.categorias, icon: 'fa-tags' },
            { label: 'Produtos', value: counts.produtos, icon: 'fa-box' },
          ] : []),
        ];
        return (
          <div className="card negocio-card">
            <div className="negocio-head">
              <div className="negocio-icon"><i className="fa-solid fa-store" /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="negocio-name" title={s.name}>{s.name}</div>
                <div className="negocio-addr" title={s.address}>{s.address || 'Endereço não informado'}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                  <span className={`badge ${operable ? 'success' : 'danger'}`}>
                    <i className={`fa-solid ${operable ? 'fa-circle-check' : 'fa-circle-xmark'}`} style={{ marginRight: 4 }} />
                    {operable ? (isFarma ? 'Ativa' : 'Operante') : s.active ? 'Sem Instância' : 'Inativa'}
                  </span>
                  {mostraFrete && (
                    <span className={`badge ${freteAtivo ? 'success' : 'warning'}`}>
                      <i className={`fa-solid ${freteAtivo ? 'fa-truck' : 'fa-store'}`} style={{ marginRight: 4 }} />
                      {freteAtivo ? 'Frete Ativo' : 'Retirada Apenas'}
                    </span>
                  )}
                </div>
              </div>
              <div className="negocio-actions">
                {isOwner && (
                  <button className="btn-primary" onClick={() => setModal({ id: s.id, name: s.name || '', address: s.address || '' })}>
                    <i className="fa-solid fa-pen" /> Editar dados
                  </button>
                )}
                {mostraFrete && (
                  <button className={'btn-secondary negocio-frete-btn' + (freteAtivo ? '' : ' off')} onClick={() => toggleFrete(s)}>
                    <i className={`fa-solid ${freteAtivo ? 'fa-truck' : 'fa-truck-ramp-box'}`} /> {freteAtivo ? 'Desativar frete' : 'Ativar frete'}
                  </button>
                )}
              </div>
            </div>

            <div className="negocio-stats">
              {stats.map((st) => (
                <div key={st.label} className="negocio-stat">
                  <div className="negocio-stat-icon"><i className={`fa-solid ${st.icon}`} /></div>
                  <div>
                    <div className="negocio-stat-value">{st.value}</div>
                    <div className="negocio-stat-label">{st.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {isOwner && stores.length > 0 && temProdutos && (
        <div className="card" style={{ marginTop: '1.25rem' }}>
          <div className="config-section-title"><i className="fa-solid fa-globe" style={{ color: 'var(--primary)' }} /> Endereço do catálogo</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 1rem' }}>
            Crie um endereço exclusivo pro seu catálogo — é o link que você divulga pros clientes.
            Escolha um nome curto (ex.: <strong>minhaloja</strong>) e ele fica no ar em <strong>minhaloja.autoqui.com.br</strong>.
          </p>
          <StoreSubdomain store={stores[0]} onChange={(sub) => setStores((prev) => prev.map((x) => (x.id === stores[0].id ? { ...x, subdominio: sub } : x)))} />
        </div>
      )}

      {/* Colaborador: só copia o link do catálogo (sem editar o endereço). */}
      {!isOwner && stores.length > 0 && temProdutos && (() => {
        const s = stores[0];
        const link = s.subdominio ? `https://${s.subdominio}` : `${window.location.origin}/catalog/${s.id}`;
        return (
          <div className="card" style={{ marginTop: '1.25rem' }}>
            <div className="config-section-title"><i className="fa-solid fa-globe" style={{ color: 'var(--primary)' }} /> Link do catálogo</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginTop: 8 }}>
              <input readOnly value={link} className="config-input" style={{ flex: 1, minWidth: 200 }} onFocus={(e) => e.target.select()} />
              <button className="btn-primary" onClick={() => navigator.clipboard.writeText(link).then(() => toast.success('Link copiado!'))}><i className="fa-solid fa-copy" /> Copiar</button>
              <a href={link} target="_blank" rel="noreferrer" className="btn-secondary"><i className="fa-solid fa-arrow-up-right-from-square" /></a>
            </div>
          </div>
        );
      })()}

      {isOwner && modulos.includes('farmaqui') && (
        <div className="card" style={{ marginTop: '1.25rem' }}>
          <div className="config-section-title"><i className="fa-solid fa-globe" style={{ color: 'var(--primary)' }} /> Endereço da landing page</div>
          {landingHost ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Sua landing page está no ar em{' '}
              <a href={`https://${landingHost}`} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontWeight: 600 }}>{landingHost} ↗</a>.
              {' '}Edite o conteúdo e o endereço em <Link to="/farmaqui-settings" style={{ color: 'var(--primary)' }}>Configuração</Link>.
            </p>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Você ainda não publicou uma landing page. Crie o endereço e o design em <Link to="/farmaqui-settings" style={{ color: 'var(--primary)' }}>Configuração</Link>.
            </p>
          )}
        </div>
      )}

      {mostraHorarios && storeId && (
        <div style={{ marginTop: '1.5rem' }}>
          <Schedules key={`func-${storeId}`} title="Horário de Funcionamento" icon="fa-clock"
            description="Defina os dias e horários em que o negócio aceita pedidos." campo="horario_funcionamento"
            saveLabel="Salvar Horários" openLabel="Aberto" closedLabel="Fechado" initial={config?.horario_funcionamento} onSave={saveConfig} />
          <Schedules key={`entrega-${storeId}`} title="Horário de Entrega" icon="fa-truck"
            description="Defina especificamente em quais horários o negócio realiza entregas." campo="horario_entrega"
            saveLabel="Salvar Horários de Entrega" openLabel="Disponível" closedLabel="Indisponível" initial={config?.horario_entrega} onSave={saveConfig} />
        </div>
      )}

      {modal && (
        <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}>
          <div className="modal-content glass" style={{ maxWidth: 440 }}>
            <span className="close-modal" onClick={() => setModal(null)}>&times;</span>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 6 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0, background: 'rgba(132,204,22,0.14)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                <i className="fa-solid fa-store" />
              </div>
              <div>
                <h2 style={{ margin: 0 }}>{modal.id ? 'Editar negócio' : 'Configurar negócio'}</h2>
                <p style={{ margin: '2px 0 0', color: 'var(--text-muted)', fontSize: '0.88rem' }}>Nome e endereço usados no seu catálogo e nas entregas.</p>
              </div>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); saveStore(); }} style={{ marginTop: 18 }}>
              <div className="form-group"><label>Nome do negócio</label><input type="text" value={modal.name} onChange={(e) => setModal({ ...modal, name: e.target.value })} placeholder="Ex: Minha Loja" /></div>
              <div className="form-group"><label>Endereço (para entrega)</label><input type="text" value={modal.address} onChange={(e) => setModal({ ...modal, address: e.target.value })} placeholder="Rua, número, bairro, cidade" /></div>
              <button type="submit" className="btn-primary full-width" style={{ marginTop: 6 }}>Salvar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Editor de subdomínio do catálogo (loja.autoqui.com.br). Cada loja tem o seu.
function StoreSubdomain({ store, onChange }: { store: any; onChange: (sub: string | null) => void }) {
  const [sub, setSub] = useState(store.subdominio ? String(store.subdominio).replace('.autoqui.com.br', '') : '');
  const [busy, setBusy] = useState(false);
  const host = store.subdominio || '';

  async function save() {
    if (!sub.trim()) { toast.warning('Informe o subdomínio.'); return; }
    setBusy(true);
    try {
      const { host } = await domainsApi.setSubdomain(store.id, sub.trim());
      onChange(host);
      toast.success('Subdomínio salvo! Pode levar alguns minutos para propagar.');
    } catch (e: any) {
      const m = e.message === 'subdominio_em_uso' ? 'Esse endereço já está em uso.'
        : e.message === 'subdominio_invalido' ? 'Inválido: use 3+ letras/números/hífen, sem espaço.'
        : 'Erro: ' + (e.message || e);
      toast.error(m);
    } finally { setBusy(false); }
  }

  return (
    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14 }}>
      <label className="config-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><i className="fa-solid fa-globe" style={{ color: 'var(--primary)' }} /> Endereço do catálogo</label>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
        <input className="config-input" value={sub} onChange={(e) => setSub(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} placeholder="minhaloja" style={{ flex: 1, minWidth: 120 }} />
        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>.autoqui.com.br</span>
        <button className="btn-secondary" disabled={busy} onClick={save}>{busy ? '...' : 'Salvar'}</button>
      </div>
      {host && <a href={`https://${host}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'var(--primary)', display: 'inline-block', marginTop: 6 }}>{host} ↗</a>}
    </div>
  );
}
