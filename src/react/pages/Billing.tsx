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
  useAuth();
  const [loading, setLoading] = useState(true);
  const [assinatura, setAssinatura] = useState<any>(null);
  const [trial, setTrial] = useState<{ emTrial: boolean; dias: number }>({ emTrial: false, dias: 0 });
  const [plans, setPlans] = useState<any[]>([]);
  const [busy, setBusy] = useState('');
  const [showPlans, setShowPlans] = useState(false);
  const [pix, setPix] = useState<{ paymentId: string; qrCode: string; qrCodeBase64: string; valor: number } | null>(null);
  const [pixBusy, setPixBusy] = useState('');

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
  async function payPix(planId: string) {
    setPixBusy(planId);
    try {
      const data = await subscriptionApi.subscribePix(planId);
      if (!data.qrCode) throw new Error('sem QR');
      setPix({ paymentId: data.paymentId, qrCode: data.qrCode, qrCodeBase64: data.qrCodeBase64, valor: data.valor });
    } catch (e: any) { toast.error('Erro ao gerar PIX: ' + (e.message || e)); }
    finally { setPixBusy(''); }
  }
  // Enquanto o modal do PIX está aberto, consulta o status a cada 4s.
  useEffect(() => {
    if (!pix) return;
    let stop = false;
    const timer = setInterval(async () => {
      try {
        const { status } = await subscriptionApi.pixStatus(pix.paymentId);
        if (status === 'approved' && !stop) {
          stop = true; clearInterval(timer);
          toast.success('Pagamento confirmado! Acesso liberado por 30 dias.');
          setPix(null); await load();
        }
      } catch { /* segue tentando */ }
    }, 4000);
    return () => { stop = true; clearInterval(timer); };
  }, [pix]);

  async function cancel() {
    const ok = await confirm.danger('Cancelar Assinatura', 'Deseja cancelar sua assinatura? O acesso pode ser suspenso.');
    if (!ok) return;
    try { await subscriptionApi.cancel(); toast.success('Assinatura cancelada.'); await load(); }
    catch (e: any) { toast.error('Erro: ' + (e.message || e)); }
  }

  if (loading) return <SkeletonCards count={2} lines={2} />;

  // Em teste, mostra "Teste grátis" mesmo que o status cru seja outro (ex.: cancelou no meio).
  const badge = trial.emTrial ? STATUS_LABEL.trial : (assinatura?.status ? STATUS_LABEL[assinatura.status] : null);
  // Já tem um plano definido e ainda não pagou (teste/pendente): só falta pagar esse plano.
  const temPlanoParaPagar = !!(assinatura && assinatura.planId && assinatura.status !== 'authorized' && assinatura.status !== 'cancelled');
  // Mostra a grade só quando não há plano definido, ou o dono pediu pra trocar.
  const mostrarGrade = showPlans || (!temPlanoParaPagar && (!assinatura || assinatura.status !== 'authorized'));

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
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{trial.dias === 1 ? 'Falta 1 dia' : `Faltam ${trial.dias} dias`}. {temPlanoParaPagar ? 'Assine agora para não perder o acesso quando o teste acabar.' : 'Escolha um plano abaixo para não perder o acesso quando o teste acabar.'}</div>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
            {assinatura.status === 'authorized' && <button className="btn-secondary" style={{ color: '#f87171', borderColor: 'rgba(239,68,68,0.35)' }} onClick={cancel}>Cancelar assinatura</button>}
            {temPlanoParaPagar && (
              <>
                <button className="btn-primary" style={{ justifyContent: 'center' }} disabled={busy === assinatura.planId} onClick={() => subscribe(assinatura.planId)}>
                  {busy === assinatura.planId ? 'Redirecionando...' : <><i className="fa-solid fa-credit-card" /> {trial.emTrial ? 'Assinar no cartão' : 'Pagar no cartão'}</>}
                </button>
                <button className="btn-secondary" style={{ justifyContent: 'center' }} disabled={pixBusy === assinatura.planId} onClick={() => payPix(assinatura.planId)}>
                  {pixBusy === assinatura.planId ? 'Gerando PIX...' : <><i className="fa-brands fa-pix" /> Pagar 1 mês no PIX</>}
                </button>
                <button className="btn-link" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => setShowPlans((v) => !v)}>
                  {showPlans ? 'Ocultar outros planos' : 'Ver outros planos'}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Planos disponíveis */}
      {mostrarGrade && (
        <>
          <h3 style={{ marginBottom: 12 }}>{temPlanoParaPagar ? 'Trocar de plano' : trial.emTrial ? 'Assine para continuar após o teste' : assinatura ? 'Reative escolhendo um plano' : 'Escolha um plano'}</h3>
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
                  <button className="btn-primary" style={{ justifyContent: 'center' }} disabled={busy === p.id} onClick={() => subscribe(p.id)}>
                    {busy === p.id ? 'Redirecionando...' : <><i className="fa-solid fa-credit-card" /> Assinar no cartão</>}
                  </button>
                  <button className="btn-secondary" style={{ justifyContent: 'center' }} disabled={pixBusy === p.id} onClick={() => payPix(p.id)}>
                    {pixBusy === p.id ? 'Gerando PIX...' : <><i className="fa-brands fa-pix" /> 1 mês no PIX</>}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {pix && <PixModal pix={pix} onClose={() => setPix(null)} />}
    </div>
  );
}

// Modal do PIX avulso: QR + código copia-e-cola. O status é consultado pelo
// componente pai (polling); ao aprovar, o modal fecha sozinho.
function PixModal({ pix, onClose }: { pix: { qrCode: string; qrCodeBase64: string; valor: number }; onClose: () => void }) {
  const [copiado, setCopiado] = useState(false);
  const copiar = async () => {
    try { await navigator.clipboard.writeText(pix.qrCode); setCopiado(true); setTimeout(() => setCopiado(false), 2000); }
    catch { toast.error('Não foi possível copiar. Selecione o código manualmente.'); }
  };
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} className="card" style={{ maxWidth: 380, width: '100%', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <h3 style={{ margin: 0 }}>Pague com PIX</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-muted)' }}><i className="fa-solid fa-xmark" /></button>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 0 12px' }}>Escaneie o QR ou copie o código. Libera <strong>30 dias</strong> de acesso ao aprovar.</p>
        {pix.qrCodeBase64 && <img src={`data:image/png;base64,${pix.qrCodeBase64}`} alt="QR Code PIX" style={{ width: 220, height: 220, margin: '0 auto', display: 'block', borderRadius: 12 }} />}
        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)', margin: '10px 0' }}>R$ {Number(pix.valor).toFixed(2)}</div>
        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={copiar}>
          <i className={`fa-solid ${copiado ? 'fa-check' : 'fa-copy'}`} /> {copiado ? 'Copiado!' : 'Copiar código PIX'}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          <i className="fa-solid fa-spinner fa-spin" /> Aguardando pagamento...
        </div>
      </div>
    </div>
  );
}
