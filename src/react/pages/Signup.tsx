import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';
import { subscriptionApi } from '../../services/subscriptionApi';
import { toast } from '../../services/toast';

type Plan = { id: string; nome: string; valor: number; maxLojas: number };

export function Signup() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [planId, setPlanId] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    subscriptionApi.publicPlans()
      .then((pl) => {
        setPlans(pl);
        const fromUrl = params.get('plano');
        if (fromUrl && pl.some((p) => p.id === fromUrl)) setPlanId(fromUrl);
        else if (pl.length) setPlanId(pl[0].id);
      })
      .catch(() => toast.error('Não foi possível carregar os planos.'))
      .finally(() => setLoadingPlans(false));
  }, [params]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!companyName.trim()) { toast.warning('Informe o nome da sua empresa.'); return; }
    if (!planId) { toast.warning('Escolha um plano.'); return; }
    if (password.length < 6) { toast.warning('A senha precisa ter ao menos 6 caracteres.'); return; }
    setLoading(true);
    try {
      await authService.signUpOwner(email.trim(), password, companyName.trim(), planId);
      toast.success('Conta criada! Você tem 7 dias de teste grátis.');
      navigate('/dashboard');
    } catch (err: any) {
      const msg = err?.message || String(err);
      const amigavel = msg.includes('email-already-in-use') ? 'Este e-mail já tem uma conta. Faça login.'
        : msg === 'ja_provisionado' ? 'Esta conta já tem uma empresa.'
        : msg === 'plano_invalido' ? 'Plano indisponível. Recarregue a página.'
        : 'Erro ao criar conta: ' + msg;
      toast.error(amigavel);
      setLoading(false);
    }
  }

  return (
    <div className="login-page-container">
      <form className="card glass" style={{ maxWidth: 480, width: '100%', margin: '6vh auto', padding: '2.5rem 3rem 3rem' }} onSubmit={handleSubmit}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/logo.png" alt="AutoQui" style={{ width: 56, borderRadius: 14 }} />
          <h2 style={{ marginTop: '1rem' }}>Criar sua conta</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 6 }}>7 dias de teste grátis. Sem cartão para começar.</p>
        </div>

        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Plano</label>
          {loadingPlans ? (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}><i className="fa-solid fa-spinner fa-spin" /> Carregando planos...</div>
          ) : plans.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Nenhum plano disponível no momento. Fale com o suporte.</div>
          ) : (
            <div style={{ display: 'grid', gap: 10 }}>
              {plans.map((p) => (
                <label key={p.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', cursor: 'pointer', border: planId === p.id ? '2px solid var(--primary)' : '1px solid var(--border-color)' }}>
                  <input type="radio" name="plano" value={p.id} checked={planId === p.id} onChange={() => setPlanId(p.id)} style={{ width: 'auto' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{p.nome} <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.85rem' }}>· {p.maxLojas} {p.maxLojas === 1 ? 'loja' : 'lojas'}</span></div>
                  </div>
                  <div style={{ fontWeight: 800, color: 'var(--primary)' }}>R$ {Number(p.valor).toFixed(2)}<span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mês</span></div>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Nome da empresa</label>
          <input type="text" className="input-field" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 10 }} />
        </div>
        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>E-mail</label>
          <input type="email" className="input-field" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 10 }} />
        </div>
        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Senha</label>
          <input type="password" className="input-field" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="mínimo 6 caracteres" style={{ width: '100%', padding: '14px 16px', borderRadius: 10 }} />
        </div>

        <button type="submit" className="btn-primary" disabled={loading || loadingPlans} style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
          {loading ? <i className="fa-solid fa-spinner fa-spin" /> : 'Começar teste grátis'}
        </button>
        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Já tem conta? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Entrar</Link>
        </p>
      </form>
    </div>
  );
}
