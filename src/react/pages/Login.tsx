import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/auth';
import { toast } from '../../services/toast';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.login(email, password);
      // O redirecionamento acontece pela mudança de auth (App observa o usuário).
    } catch (err) {
      toast.error('Erro ao fazer login: ' + err);
      setLoading(false);
    }
  }

  return (
    <div className="login-page-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-brand">
          <div className="login-logo-row">
            <img src="/logo.png" alt="" />
            <span>AutoQui</span>
          </div>
          <h1>Entrar no Painel</h1>
          <p>Acesse sua conta para gerenciar seu negócio.</p>
        </div>

        <div className="login-field">
          <div className="login-input-wrap">
            <i className="fa-solid fa-envelope" />
            <input id="email" type="email" className="config-input" required value={email}
              autoComplete="email" placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>

        <div className="login-field">
          <div className="login-input-wrap">
            <i className="fa-solid fa-lock" />
            <input id="password" type={showPass ? 'text' : 'password'} className="config-input" required value={password}
              autoComplete="current-password" placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)} />
            <button type="button" className="login-eye" onClick={() => setShowPass((s) => !s)}
              title={showPass ? 'Ocultar senha' : 'Mostrar senha'}>
              <i className={`fa-solid ${showPass ? 'fa-eye-slash' : 'fa-eye'}`} />
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary login-submit" disabled={loading}>
          {loading ? <i className="fa-solid fa-spinner fa-spin" /> : <><i className="fa-solid fa-arrow-right-to-bracket" /> Entrar</>}
        </button>

        <p style={{ textAlign: 'center', margin: '1.25rem 0 0', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
          Não tem conta? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 700 }}>Fazer cadastro</Link>
        </p>
        <p className="login-foot">AutoQui · Painel de gestão</p>
      </form>
    </div>
  );
}
