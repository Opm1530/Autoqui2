import { useEffect, useState } from 'react';
import { dbService } from '../../services/db';
import { adminApi } from '../../services/adminApi';
import { toast } from '../../services/toast';
import { confirm } from '../../services/confirm';
import { useAuth } from '../useAuth';
import { SkeletonCards } from '../components/Skeleton';

export function Stores() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const isOwner = user?.role === 'owner';

  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxLojas, setMaxLojas] = useState(1);
  const [modal, setModal] = useState<{ id?: string; name: string; address: string } | null>(null);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const companyDoc = (await dbService.get('companies', companyId)) as any;
      setStores(companyDoc?.stores || []);
      setMaxLojas(companyDoc?.assinatura?.maxLojas || companyDoc?.limite_lojas || 1);
      setLoading(false);
    })();
  }, [companyId]);

  const atingiuLimite = stores.length >= maxLojas;

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

  async function toggleStatus(s: any) {
    const action = s.active ? 'desativar' : 'ativar';
    const ok = await confirm.warning(`${action.charAt(0).toUpperCase() + action.slice(1)} Loja`, `Deseja ${action} esta loja?`);
    if (!ok) return;
    persist(stores.map((x) => (x.id === s.id ? { ...x, active: !s.active } : x)), `Loja ${s.active ? 'desativada' : 'ativada'} com sucesso!`);
  }

  function toggleFrete(s: any) {
    const novo = !(s.frete_ativo !== false);
    persist(stores.map((x) => (x.id === s.id ? { ...x, frete_ativo: novo } : x)), `Frete da loja atualizado para ${novo ? 'ativo' : 'inativo'}.`);
  }

  if (loading) return <SkeletonCards count={4} lines={2} />;
  if (!companyId) return <p>Erro: Usuário sem empresa associada.</p>;

  return (
    <div>
      {isOwner && (
        <div className="page-header" style={{ justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button className="btn-primary" disabled={atingiuLimite} title={atingiuLimite ? `Seu plano permite até ${maxLojas} loja(s)` : ''} onClick={() => setModal({ name: '', address: '' })}>
            <i className="fa-solid fa-plus" style={{ color: '#fff' }} /> Nova loja
          </button>
        </div>
      )}
      {isOwner && atingiuLimite && (
        <p style={{ textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.85rem', margin: '-0.5rem 0 1rem' }}>
          Você atingiu o limite de {maxLojas} loja{maxLojas > 1 ? 's' : ''} do seu plano.
        </p>
      )}
      {stores.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-muted)' }}>
          <i className="fa-solid fa-store" style={{ fontSize: '2.5rem', color: 'var(--text-dim)', display: 'block', margin: '0 auto 12px', width: 'fit-content' }} />
          <p style={{ margin: '0 0 16px' }}>Nenhuma loja cadastrada ainda.</p>
          {isOwner && <button className="btn-primary" onClick={() => setModal({ name: '', address: '' })}><i className="fa-solid fa-plus" style={{ color: '#fff' }} /> Criar minha primeira loja</button>}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {stores.map((s) => {
            const operable = s.active && s.instancia_id;
            const freteAtivo = s.frete_ativo !== false;
            return (
              <div key={s.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: 'rgba(99,102,241,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.2rem' }}>
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

                {isOwner && (
                  <div style={{ display: 'flex', gap: 8, borderTop: '1px solid var(--border-color)', paddingTop: 14, flexWrap: 'wrap' }}>
                    <button className="btn-secondary" style={{ flex: '1 1 100%', justifyContent: 'center' }} onClick={() => setModal({ id: s.id, name: s.name || '', address: s.address || '' })}>
                      <i className="fa-solid fa-pen" /> Editar loja
                    </button>
                    <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center', ...(s.active ? { color: '#f87171', borderColor: 'rgba(239,68,68,0.35)' } : { color: '#34d399', borderColor: 'rgba(16,185,129,0.35)' }) }} onClick={() => toggleStatus(s)}>
                      <i className={`fa-solid ${s.active ? 'fa-store-slash' : 'fa-store'}`} /> {s.active ? 'Desativar' : 'Ativar'}
                    </button>
                    <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center', color: freteAtivo ? '#fbbf24' : '#818cf8', borderColor: freteAtivo ? 'rgba(245,158,11,0.4)' : 'rgba(99,102,241,0.4)' }} onClick={() => toggleFrete(s)}>
                      <i className={`fa-solid ${freteAtivo ? 'fa-truck-ramp-box' : 'fa-truck'}`} /> {freteAtivo ? 'Frete Off' : 'Frete On'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}><i className="fa-solid fa-info-circle" /> Informação</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Você pode criar e editar lojas até o limite do seu plano ({maxLojas} loja{maxLojas > 1 ? 's' : ''}).<br />
          A exclusão de uma loja (que preserva o histórico de pedidos) é feita pelo administrador — fale com o suporte.
        </p>
      </div>

      {modal && (
        <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}>
          <div className="modal-content glass" style={{ maxWidth: 440 }}>
            <span className="close-modal" onClick={() => setModal(null)}>&times;</span>
            <h2>{modal.id ? 'Editar loja' : 'Nova loja'}</h2>
            <div className="form-group"><label>Nome da loja</label><input type="text" value={modal.name} onChange={(e) => setModal({ ...modal, name: e.target.value })} placeholder="Ex: Minha Loja - Centro" /></div>
            <div className="form-group"><label>Endereço (para entrega)</label><input type="text" value={modal.address} onChange={(e) => setModal({ ...modal, address: e.target.value })} placeholder="Rua, número, bairro, cidade" /></div>
            <button className="btn-primary full-width" onClick={saveStore}>Salvar</button>
          </div>
        </div>
      )}
    </div>
  );
}
