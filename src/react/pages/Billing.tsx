import { useEffect, useState } from 'react';
import { dbService } from '../../services/db';
import { subscriptionApi } from '../../services/subscriptionApi';
import { toast } from '../../services/toast';
import { confirm } from '../../services/confirm';
import { useAuth } from '../useAuth';
import { SkeletonCards } from '../components/Skeleton';
import { pricingApi, ALL_FEAT, CANAIS_FEAT } from '../../services/pricingApi';

const CANAL_KEYS = new Set(CANAIS_FEAT.map((f) => f.key));
const featLabel = (k: string) => ALL_FEAT.find((f) => f.key === k)?.label || k;

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
  const companyId = user?.companyId || '';
  const [loading, setLoading] = useState(true);
  const [assinatura, setAssinatura] = useState<any>(null);
  const [trial, setTrial] = useState<{ emTrial: boolean; dias: number }>({ emTrial: false, dias: 0 });
  const [precos, setPrecos] = useState<Record<string, number>>({});
  const [features, setFeatures] = useState<string[]>([]);
  const [busy, setBusy] = useState('');
  const [pix, setPix] = useState<{ paymentId: string; qrCode: string; qrCodeBase64: string; valor: number } | null>(null);
  const [pixBusy, setPixBusy] = useState('');

  async function load() {
    const [mine, pr] = await Promise.all([
      subscriptionApi.mine().catch(() => ({ assinatura: null, emTrial: false, diasRestantesTrial: 0, companyId: '' })),
      pricingApi.get().catch(() => ({ precos: {}, descontos: [] })),
    ]);
    setAssinatura(mine.assinatura || null);
    setTrial({ emTrial: !!mine.emTrial, dias: mine.diasRestantesTrial || 0 });
    setPrecos(pr.precos || {});
    // Funcionalidades ativas: da assinatura ou (legado) dos módulos da empresa.
    let feats: string[] = Array.isArray(mine.assinatura?.features) ? mine.assinatura.features : [];
    if (!feats.length && companyId) {
      const c = (await dbService.get('companies', companyId).catch(() => null)) as any;
      feats = Array.isArray(c?.modulos_ativos) ? c.modulos_ativos : [];
    }
    setFeatures(feats);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function subscribe() {
    setBusy('go');
    try {
      const { init_point } = await subscriptionApi.subscribe();
      window.location.href = init_point; // redireciona pro checkout do Mercado Pago
    } catch (e: any) { toast.error('Erro ao iniciar assinatura: ' + (e.message || e)); setBusy(''); }
  }
  async function payPix() {
    setPixBusy('go');
    try {
      const data = await subscriptionApi.subscribePix();
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
  // À la carte: tem o que cobrar quando há funcionalidades ativas e ainda não pagou.
  const temPlanoParaPagar = !!(assinatura && features.length && assinatura.status !== 'authorized' && assinatura.status !== 'cancelled');
  const bruto = features.reduce((s, k) => s + (precos[k] || 0), 0);
  const total = Number(assinatura?.valor) || bruto;
  const desconto = Math.max(0, bruto - total);

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
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.03em' }}>Sua assinatura</div>
              <div style={{ fontWeight: 800, fontSize: '1.25rem', margin: '2px 0 6px', color: 'var(--primary)' }}>R$ {total.toFixed(2)}<span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mês</span></div>
              {badge && <span className="badge" style={{ background: badge.color + '22', color: badge.color, border: `1px solid ${badge.color}44` }}><i className="fa-solid fa-circle" style={{ fontSize: '0.5rem', marginRight: 5, verticalAlign: 'middle' }} />{badge.label}</span>}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
            {assinatura.status === 'authorized' && <button className="btn-secondary" style={{ color: '#f87171', borderColor: 'rgba(239,68,68,0.35)' }} onClick={cancel}>Cancelar assinatura</button>}
            {temPlanoParaPagar && (
              <>
                <button className="btn-primary" style={{ justifyContent: 'center' }} disabled={busy === 'go'} onClick={() => subscribe()}>
                  {busy === 'go' ? 'Redirecionando...' : <><i className="fa-solid fa-credit-card" /> {trial.emTrial ? 'Assinar no cartão' : 'Pagar no cartão'}</>}
                </button>
                <button className="btn-secondary" style={{ justifyContent: 'center' }} disabled={pixBusy === 'go'} onClick={() => payPix()}>
                  {pixBusy === 'go' ? 'Gerando PIX...' : <><i className="fa-brands fa-pix" /> Pagar 1 mês no PIX</>}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Detalhe das funcionalidades assinadas */}
      {features.length > 0 && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ margin: '0 0 12px' }}><i className="fa-solid fa-list-check" style={{ color: 'var(--primary)' }} /> Suas funcionalidades</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {features.map((k) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                <span><i className={`fa-solid ${CANAL_KEYS.has(k) ? 'fa-star' : 'fa-plus'}`} style={{ color: 'var(--text-dim,#94a3b8)', marginRight: 8, fontSize: '0.75rem' }} />{featLabel(k)}{CANAL_KEYS.has(k) && <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}> · principal</span>}</span>
                <span style={{ color: 'var(--text-muted)' }}>R$ {(precos[k] || 0).toFixed(2)}</span>
              </div>
            ))}
            {desconto > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', color: '#16a34a', borderTop: '1px solid var(--border-color)', paddingTop: 8 }}>
                <span>Desconto por combo</span><span>- R$ {desconto.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.05rem', borderTop: '1px solid var(--border-color)', paddingTop: 8 }}>
              <span>Total mensal</span><span style={{ color: 'var(--primary)' }}>R$ {total.toFixed(2)}</span>
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '12px 0 0' }}>Adicione ou remova funcionalidades em <strong>Ferramentas</strong> — o valor se ajusta automaticamente.</p>
        </div>
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
