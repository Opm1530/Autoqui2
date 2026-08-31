import { useEffect, useState } from 'react';
import { dbService } from '../../services/db';
import { subscriptionApi } from '../../services/subscriptionApi';
import { toast } from '../../services/toast';
import { confirm } from '../../services/confirm';
import { useAuth } from '../useAuth';
import { SkeletonCards } from '../components/Skeleton';
import { lojasLabel } from '../util/plan';

// Explicação do plano montada a partir dos campos cadastrados no admin.
function planFeatures(p: any): string[] {
  const feats: string[] = [];
  const isVitrine = (p.modulos || []).includes('vitrine');
  feats.push(isVitrine
    ? 'Vitrine online: mostruário de produtos e pedidos direto no WhatsApp'
    : 'Catálogo completo: carrinho e pagamento (PIX / Mercado Pago)');
  feats.push(`Inclui ${lojasLabel(p.maxLojas)}`);
  if (p.toleranciaDias) feats.push(`${p.toleranciaDias} dias de tolerância se um pagamento falhar`);
  return feats;
}

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  authorized: { label: 'Ativa', color: '#34d399' },
  trial: { label: 'Teste grátis', color: '#a3e635' },
  pending: { label: 'Aguardando autorização', color: '#fbbf24' },
  paused: { label: 'Pausada', color: '#fbbf24' },
  cancelled: { label: 'Cancelada', color: '#f87171' },
};

// `wall` = renderiza como parede de cobrança (inadimplente/bloqueado).
export function Billing({ wall = false }: { wall?: boolean }) {
  const { user } = useAuth();
  const isOwner = user?.role === 'owner';
  const [loading, setLoading] = useState(true);
  const [assinatura, setAssinatura] = useState<any>(null);
  const [trial, setTrial] = useState<{ emTrial: boolean; dias: number }>({ emTrial: false, dias: 0 });
  const [plans, setPlans] = useState<any[]>([]);
  const [busy, setBusy] = useState('');

  async function load() {
    const [mine, pl] = await Promise.all([
      subscriptionApi.mine().catch(() => ({ assinatura: null, emTrial: false, diasRestantesTrial: 0 })),
      dbService.getAll('planos').catch(() => []),
    ]);
    setAssinatura(mine.assinatura || null);
    setTrial({ emTrial: !!mine.emTrial, dias: mine.diasRestantesTrial || 0 });
    setPlans((pl as any[]).filter((p) => p.ativo !== false));
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function subscribe(planId: string) {
    setBusy(planId);
    try {
      const { init_point } = await subscriptionApi.subscribe(planId);
      window.location.href = init_point; // redireciona pro checkout do Mercado Pago
    } catch (e: any) { toast.error('Erro ao iniciar assinatura: ' + (e.message || e)); setBusy(''); }
  }
  async function cancel() {
    const ok = await confirm.danger('Cancelar Assinatura', 'Deseja cancelar sua assinatura? O acesso pode ser suspenso.');
    if (!ok) return;
    try { await subscriptionApi.cancel(); toast.success('Assinatura cancelada.'); await load(); }
    catch (e: any) { toast.error('Erro: ' + (e.message || e)); }
  }

  if (loading) return <SkeletonCards count={2} lines={2} />;

  // Funcionário sem poder pagar
  if (wall && !isOwner) return (
    <div className="card" style={{ maxWidth: 560, margin: '3rem auto', textAlign: 'center', padding: '2.5rem' }}>
      <i className="fa-solid fa-lock" style={{ fontSize: '2.5rem', color: '#fbbf24', display: 'block', marginBottom: 16 }} />
      <h2>Acesso suspenso</h2>
      <p style={{ color: 'var(--text-muted)' }}>A assinatura da empresa está pendente. Peça ao dono para regularizar o pagamento.</p>
    </div>
  );

  // Em teste, mostra "Teste grátis" mesmo que o status cru seja outro (ex.: cancelou no meio).
  const badge = trial.emTrial ? STATUS_LABEL.trial : (assinatura?.status ? STATUS_LABEL[assinatura.status] : null);

  return (
    <div style={{ maxWidth: 720, margin: wall ? '2rem auto' : '0 auto' }}>
      {wall && (
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '2.5rem', color: '#fbbf24', display: 'block', marginBottom: 12 }} />
          <h2 style={{ margin: 0 }}>Regularize sua assinatura</h2>
          <p style={{ color: 'var(--text-muted)' }}>O acesso ao painel está suspenso até a regularização do pagamento.</p>
        </div>
      )}
      {!wall && (
        <div className="page-heading">
          <h1>Assinatura</h1>
          <p>Gerencie seu plano e a forma de pagamento. A cobrança é feita com segurança pelo Mercado Pago.</p>
        </div>
      )}

      {/* Banner de teste grátis */}
      {!wall && trial.emTrial && (
        <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(132, 204, 22,0.08)', border: '1px solid rgba(132, 204, 22,0.3)' }}>
          <i className="fa-solid fa-gift" style={{ fontSize: '1.6rem', color: '#a3e635' }} />
          <div>
            <div style={{ fontWeight: 700 }}>Você está no teste grátis</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{trial.dias === 1 ? 'Falta 1 dia' : `Faltam ${trial.dias} dias`}. Assine abaixo para não perder o acesso quando o teste acabar.</div>
          </div>
        </div>
      )}

      {/* Status atual */}
      {assinatura && (
        <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(132, 204, 22,0.12)', color: 'var(--primary)', fontSize: '1.4rem' }}>
              <i className="fa-solid fa-crown" />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.03em' }}>Plano atual</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', margin: '2px 0 6px' }}>{assinatura.planoNome || '—'} {assinatura.valor ? `· R$ ${Number(assinatura.valor).toFixed(2)}/mês` : ''}</div>
              {badge && <span className="badge" style={{ background: badge.color + '22', color: badge.color, border: `1px solid ${badge.color}44` }}><i className="fa-solid fa-circle" style={{ fontSize: '0.5rem', marginRight: 5, verticalAlign: 'middle' }} />{badge.label}</span>}
            </div>
          </div>
          {assinatura.status === 'authorized' && <button className="btn-secondary" style={{ color: '#f87171', borderColor: 'rgba(239,68,68,0.35)' }} onClick={cancel}>Cancelar assinatura</button>}
        </div>
      )}

      {/* Planos disponíveis */}
      {(!assinatura || assinatura.status !== 'authorized') && (
        <>
          <h3 style={{ marginBottom: 12 }}>{trial.emTrial ? 'Assine para continuar após o teste' : assinatura ? 'Reative escolhendo um plano' : 'Escolha um plano'}</h3>
          {plans.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Nenhum plano disponível no momento. Contate o administrador.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {plans.map((p) => (
                <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: '4px solid var(--primary)' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{p.nome}</div>
                  <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--primary)' }}>R$ {Number(p.valor).toFixed(2)}<span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mês</span></div>
                  <ul style={{ listStyle: 'none', margin: '2px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                    {planFeatures(p).map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                        <i className="fa-solid fa-circle-check" style={{ color: 'var(--primary)', marginTop: 3, flexShrink: 0 }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="btn-primary" style={{ justifyContent: 'center' }} disabled={!isOwner || busy === p.id} onClick={() => subscribe(p.id)}>
                    {busy === p.id ? 'Redirecionando...' : <><i className="fa-solid fa-credit-card" /> Assinar</>}
                  </button>
                  {!isOwner && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>Apenas o dono pode assinar.</p>}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
