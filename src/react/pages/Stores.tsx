import { useEffect, useState } from 'react';
import { dbService } from '../../services/db';
import { toast } from '../../services/toast';
import { confirm } from '../../services/confirm';
import { useAuth } from '../useAuth';

export function Stores() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const isOwner = user?.role === 'owner';

  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const companyDoc = (await dbService.get('companies', companyId)) as any;
      setStores(companyDoc?.stores || []);
      setLoading(false);
    })();
  }, [companyId]);

  async function persist(updated: any[], msg: string) {
    try {
      await dbService.update('companies', companyId, { stores: updated });
      setStores(updated);
      toast.success(msg);
    } catch (e) { toast.error('Erro ao atualizar: ' + e); }
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

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}><i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: 'var(--primary)' }} /></div>;
  if (!companyId) return <p>Erro: Usuário sem empresa associada.</p>;

  return (
    <div>
      {stores.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-muted)' }}>
          <i className="fa-solid fa-store" style={{ fontSize: '2.5rem', color: 'var(--text-dim)', display: 'block', marginBottom: 12 }} />
          Nenhuma loja cadastrada.
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
                  <div style={{ display: 'flex', gap: 8, borderTop: '1px solid var(--border-color)', paddingTop: 14 }}>
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
          Apenas o administrador da plataforma pode criar, editar ou excluir lojas.<br />
          Como dono da empresa, você pode apenas ativar ou desativar lojas existentes.
        </p>
      </div>
    </div>
  );
}
