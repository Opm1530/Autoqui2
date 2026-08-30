import { useEffect, useState } from 'react';
import { dbService } from '../../services/db';
import { adminApi } from '../../services/adminApi';
import { domainsApi } from '../../services/domainsApi';
import { toast } from '../../services/toast';
import { useAuth } from '../useAuth';
import { SkeletonCards } from '../components/Skeleton';
import { ManageTabs } from '../components/ManageTabs';

export function Stores() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const isOwner = user?.role === 'owner';

  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ id?: string; name: string; address: string } | null>(null);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const companyDoc = (await dbService.get('companies', companyId)) as any;
      setStores(companyDoc?.stores || []);
      setLoading(false);
    })();
  }, [companyId]);

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
          {isOwner && <button className="btn-primary" onClick={() => setModal({ name: '', address: '' })}><i className="fa-solid fa-plus" style={{ color: 'var(--primary-contrast)' }} /> Configurar negócio</button>}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 480px)', gap: '1.25rem' }}>
          {stores.map((s) => {
            const operable = s.active && s.instancia_id;
            const freteAtivo = s.frete_ativo !== false;
            return (
              <div key={s.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: 'rgba(132, 204, 22,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.2rem' }}>
                    <i className="fa-solid fa-store" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={s.name}>{s.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={s.address}>{s.address || 'Sem endereço'}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  <span className={`badge ${operable ? 'success' : 'danger'}`}>
                    <i className={`fa-solid ${operable ? 'fa-circle-check' : 'fa-circle-xmark'}`} style={{ marginRight: 4 }} />
                    {operable ? 'Operante' : s.active ? 'Sem Instância' : 'Inativa'}
                  </span>
                  <span className={`badge ${freteAtivo ? 'success' : 'warning'}`}>
                    <i className={`fa-solid ${freteAtivo ? 'fa-truck' : 'fa-store'}`} style={{ marginRight: 4 }} />
                    {freteAtivo ? 'Frete Ativo' : 'Retirada Apenas'}
                  </span>
                </div>

                {isOwner && <StoreSubdomain store={s} onChange={(sub) => setStores((prev) => prev.map((x) => (x.id === s.id ? { ...x, subdominio: sub } : x)))} />}

                {isOwner && (
                  <div style={{ display: 'flex', gap: 8, borderTop: '1px solid var(--border-color)', paddingTop: 14, flexWrap: 'wrap' }}>
                    <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setModal({ id: s.id, name: s.name || '', address: s.address || '' })}>
                      <i className="fa-solid fa-pen" /> Editar dados
                    </button>
                    <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center', color: freteAtivo ? '#fbbf24' : '#a3e635', borderColor: freteAtivo ? 'rgba(245,158,11,0.4)' : 'rgba(132, 204, 22,0.4)' }} onClick={() => toggleFrete(s)}>
                      <i className={`fa-solid ${freteAtivo ? 'fa-truck-ramp-box' : 'fa-truck'}`} /> {freteAtivo ? 'Frete Off' : 'Frete On'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {modal && (
        <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}>
          <div className="modal-content glass" style={{ maxWidth: 440 }}>
            <span className="close-modal" onClick={() => setModal(null)}>&times;</span>
            <h2>{modal.id ? 'Editar negócio' : 'Configurar negócio'}</h2>
            <div className="form-group"><label>Nome do negócio</label><input type="text" value={modal.name} onChange={(e) => setModal({ ...modal, name: e.target.value })} placeholder="Ex: Minha Loja" /></div>
            <div className="form-group"><label>Endereço (para entrega)</label><input type="text" value={modal.address} onChange={(e) => setModal({ ...modal, address: e.target.value })} placeholder="Rua, número, bairro, cidade" /></div>
            <button className="btn-primary full-width" onClick={saveStore}>Salvar</button>
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
