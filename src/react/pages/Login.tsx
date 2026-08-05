import { useState } from 'react';
import { authService } from '../../services/auth';
import { toast } from '../../services/toast';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      <form id="login-form" className="card glass" style={{ maxWidth: 400, margin: '10vh auto', padding: '2.5rem' }} onSubmit={handleSubmit}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/logo.png" alt="AutoQui" style={{ width: 56, borderRadius: 12 }} />
          <h2 style={{ marginTop: '1rem' }}>Entrar no Painel</h2>
        </div>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>E-mail</label>
          <input id="email" type="email" className="input-field" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 10 }} />
        </div>
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Senha</label>
          <input id="password" type="password" className="input-field" required value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 10 }} />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}
          style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
          {loading ? <i className="fa-solid fa-spinner fa-spin" /> : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
