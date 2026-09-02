import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';
import { pricingApi, CANAIS_FEAT, ADICIONAIS_FEAT, type Pricing } from '../../services/pricingApi';
import { toast } from '../../services/toast';

const CANAL_KEYS = new Set(CANAIS_FEAT.map((f) => f.key));
const ADIC_KEYS = new Set(ADICIONAIS_FEAT.map((f) => f.key));
const brl = (n: number) => `R$ ${Number(n).toFixed(2)}`;

export function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pricing, setPricing] = useState<Pricing | null>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { pricingApi.get().then(setPricing).catch(() => toast.error('Não foi possível carregar os preços.')); }, []);

  const preco = (k: string) => pricing?.precos?.[k] ?? 0;
  // Só mostra funcionalidades com preço > 0 (as sem preço/"em breve" ficam de fora).
  const canais = CANAIS_FEAT.filter((f) => preco(f.key) > 0);
  const adicionais = ADICIONAIS_FEAT.filter((f) => preco(f.key) > 0);

  const totais = useMemo(() => {
    const canal = features.find((f) => CANAL_KEYS.has(f));
    const base = canal ? preco(canal) : 0;
    const addKeys = features.filter((f) => ADIC_KEYS.has(f));
    const adicBruto = addKeys.reduce((s, k) => s + preco(k), 0);
    const tier = (pricing?.descontos || []).filter((d) => addKeys.length >= d.min).sort((a, b) => b.pct - a.pct)[0];
    const pct = tier ? tier.pct : 0;
    const desc = Math.round(adicBruto * pct) / 100;
    return { base, adicBruto, pct, desc, total: base + adicBruto - desc, temCanal: !!canal, qtdAdic: addKeys.length };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [features, pricing]);

  const toggleCanal = (k: string) => setFeatures((f) => [...f.filter((x) => !CANAL_KEYS.has(x)), k]); // 1 canal
  const toggleAdic = (k: string) => setFeatures((f) => (f.includes(k) ? f.filter((x) => x !== k) : [...f, k]));

  function irParaFuncionalidades(e: React.FormEvent) {
    e.preventDefault();
    if (!companyName.trim()) { toast.warning('Informe o nome da sua empresa.'); return; }
    if (!email.trim()) { toast.warning('Informe o e-mail.'); return; }
    if (password.length < 6) { toast.warning('A senha precisa ter ao menos 6 caracteres.'); return; }
    setStep(2);
  }

  async function finalizar() {
    if (!totais.temCanal) { toast.warning('Escolha um canal principal (Catálogo ou Vitrine).'); return; }
    setLoading(true);
    try {
      await authService.signUpOwner(email.trim(), password, companyName.trim(), features);
      toast.success('Conta criada! Você tem 7 dias de teste grátis.');
      navigate('/dashboard');
    } catch (err: any) {
      const msg = err?.message || String(err);
      toast.error(msg.includes('email-already-in-use') ? 'Este e-mail já tem uma conta. Faça login.'
        : msg === 'ja_provisionado' ? 'Esta conta já tem uma empresa.'
        : msg === 'sem_canal' ? 'Escolha um canal principal.'
        : 'Erro ao criar conta: ' + msg);
      setLoading(false);
    }
  }

  const card: React.CSSProperties = { maxWidth: step === 1 ? 460 : 720, width: '100%', margin: '5vh auto', padding: '2.5rem 3rem 3rem', background: '#102a1c', color: '#fff', borderRadius: 22, boxShadow: '0 30px 70px -24px rgba(16,42,28,0.5)' };
  const inp: React.CSSProperties = { width: '100%', padding: '14px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)', color: '#fff' };

  return (
    <div className="login-page-container">
      <div style={card}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img src="/logo.png" alt="AutoQui" style={{ width: 56, borderRadius: 14 }} />
          <h2 style={{ marginTop: '1rem' }}>{step === 1 ? 'Criar sua conta' : 'Selecione suas funcionalidades'}</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', marginTop: 6 }}>
            {step === 1 ? '7 dias de teste grátis. Sem cartão para começar.' : 'Monte seu plano. Você só paga após o teste — e pode mudar depois.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 12 }}>
            {[1, 2].map((s) => <span key={s} style={{ width: 26, height: 5, borderRadius: 3, background: step >= (s as 1 | 2) ? 'var(--primary)' : 'var(--border-color)' }} />)}
          </div>
        </div>

        {step === 1 ? (
          <form onSubmit={irParaFuncionalidades}>
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Nome da empresa</label>
              <input type="text" className="input-field" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={inp} />
            </div>
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>E-mail</label>
              <input type="email" className="input-field" required value={email} onChange={(e) => setEmail(e.target.value)} style={inp} />
            </div>
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Senha</label>
              <input type="password" className="input-field" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="mínimo 6 caracteres" style={inp} />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>Continuar <i className="fa-solid fa-arrow-right" /></button>
            <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Já tem conta? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Entrar</Link>
            </p>
          </form>
        ) : !pricing ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}><i className="fa-solid fa-spinner fa-spin" /> Carregando...</div>
        ) : (
          <>
            <h4 style={{ margin: '0 0 8px' }}>Canal principal <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.82rem' }}>(escolha 1)</span></h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 10, marginBottom: 20 }}>
              {canais.map((f) => { const on = features.includes(f.key); return (
                <button key={f.key} type="button" onClick={() => toggleCanal(f.key)} style={featCard(on)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><i className={`fa-solid ${f.icon}`} style={{ color: 'var(--primary)' }} /><strong>{f.label}</strong></div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0 8px' }}>{f.desc}</div>
                  <div style={{ fontWeight: 800, color: 'var(--primary)' }}>{brl(preco(f.key))}<span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mês</span></div>
                </button>
              ); })}
            </div>

            {adicionais.length > 0 && <>
              <h4 style={{ margin: '0 0 8px' }}>Adicionais <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.82rem' }}>(opcionais — mais itens, mais desconto)</span></h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 10, marginBottom: 20 }}>
                {adicionais.map((f) => { const on = features.includes(f.key); return (
                  <button key={f.key} type="button" onClick={() => toggleAdic(f.key)} style={featCard(on)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><i className={`fa-solid ${on ? 'fa-square-check' : 'fa-square'}`} style={{ color: on ? 'var(--primary)' : 'var(--text-dim)' }} /><i className={`fa-solid ${f.icon}`} style={{ color: 'var(--text-muted)' }} /><strong>{f.label}</strong></div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0 8px' }}>{f.desc}</div>
                    <div style={{ fontWeight: 800, color: 'var(--primary)' }}>{brl(preco(f.key))}<span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mês</span></div>
                  </button>
                ); })}
              </div>
            </>}

            {/* Resumo */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(132,204,22,0.35)', borderRadius: 14, padding: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}><span>Canal + adicionais</span><span>{brl(totais.base + totais.adicBruto)}</span></div>
              {totais.desc > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#a3e635', marginTop: 4 }}><span>Desconto ({totais.pct}% em {totais.qtdAdic} adicionais)</span><span>- {brl(totais.desc)}</span></div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.15rem', marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.12)' }}><span>Total mensal</span><span style={{ color: '#a3e635' }}>{brl(totais.total)}</span></div>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', margin: '8px 0 0' }}>Cobrado só após os 7 dias de teste. Cancele quando quiser.</p>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" className="btn-secondary" onClick={() => setStep(1)}><i className="fa-solid fa-arrow-left" /> Voltar</button>
              <button type="button" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} disabled={loading || !totais.temCanal} onClick={finalizar}>
                {loading ? <i className="fa-solid fa-spinner fa-spin" /> : <>Começar teste grátis · {brl(totais.total)}/mês</>}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const featCard = (on: boolean): React.CSSProperties => ({
  textAlign: 'left', padding: '12px 14px', borderRadius: 12, cursor: 'pointer',
  border: `2px solid ${on ? 'var(--primary)' : 'var(--border-color)'}`,
  background: on ? 'rgba(132,204,22,0.08)' : 'var(--surface,#fff)', color: 'var(--text-main)',
});
