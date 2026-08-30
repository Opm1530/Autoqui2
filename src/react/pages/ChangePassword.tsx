import { useState } from 'react';
import { authService } from '../../services/auth';
import { toast } from '../../services/toast';

export function ChangePassword() {
  const [atual, setAtual] = useState('');
  const [nova, setNova] = useState('');
  const [conf, setConf] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (nova.length < 6) { toast.warning('A nova senha deve ter pelo menos 6 caracteres.'); return; }
    if (nova !== conf) { toast.warning('A confirmação não confere com a nova senha.'); return; }
    setBusy(true);
    try {
      await authService.changePassword(atual, nova);
      toast.success('Senha alterada com sucesso!');
      setAtual(''); setNova(''); setConf('');
    } catch (err: any) {
      toast.error(err?.message || 'Não foi possível alterar a senha.');
    } finally { setBusy(false); }
  }

  return (
    <div>
      <div className="page-heading">
        <h1>Alterar Senha</h1>
        <p>Atualize a senha de acesso da sua conta.</p>
      </div>
      <form className="card" style={{ maxWidth: 460 }} onSubmit={submit}>
        <div className="cat-field" style={{ marginBottom: '1.25rem' }}>
          <label className="config-label">Senha atual</label>
          <input type="password" className="config-input" value={atual} onChange={(e) => setAtual(e.target.value)} required autoComplete="current-password" />
        </div>
        <div className="cat-field" style={{ marginBottom: '1.25rem' }}>
          <label className="config-label">Nova senha</label>
          <input type="password" className="config-input" value={nova} onChange={(e) => setNova(e.target.value)} required autoComplete="new-password" />
          <p className="cat-field-hint">Mínimo de 6 caracteres.</p>
        </div>
        <div className="cat-field" style={{ marginBottom: '1.75rem' }}>
          <label className="config-label">Confirmar nova senha</label>
          <input type="password" className="config-input" value={conf} onChange={(e) => setConf(e.target.value)} required autoComplete="new-password" />
        </div>
        <div style={{ textAlign: 'right' }}>
          <button type="submit" className="btn-primary" disabled={busy}>{busy ? 'Salvando...' : 'Alterar senha'}</button>
        </div>
      </form>
    </div>
  );
}
