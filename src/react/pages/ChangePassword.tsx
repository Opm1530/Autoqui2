import { useState } from 'react';
import { authService } from '../../services/auth';
import { toast } from '../../services/toast';

export function ChangePassword() {
  const [atual, setAtual] = useState('');
  const [nova, setNova] = useState('');
  const [conf, setConf] = useState('');
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);

  const novaOk = nova.length >= 6;
  const confOk = conf.length > 0 && conf === nova;
  const podeSalvar = atual.length > 0 && novaOk && confOk && !busy;

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
          <div style={{ position: 'relative' }}>
            <input type={show ? 'text' : 'password'} className="config-input" style={{ paddingRight: 44 }} value={atual} onChange={(e) => setAtual(e.target.value)} required autoComplete="current-password" />
            <button type="button" onClick={() => setShow((s) => !s)} title={show ? 'Ocultar senhas' : 'Mostrar senhas'}
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: 4 }}>
              <i className={`fa-solid ${show ? 'fa-eye-slash' : 'fa-eye'}`} />
            </button>
          </div>
        </div>
        <div className="cat-field" style={{ marginBottom: '1.25rem' }}>
          <label className="config-label">Nova senha</label>
          <input type={show ? 'text' : 'password'} className="config-input" value={nova} onChange={(e) => setNova(e.target.value)} required autoComplete="new-password" />
          <p className="cat-field-hint" style={{ color: nova.length === 0 ? undefined : novaOk ? 'var(--success)' : '#f87171' }}>
            {nova.length === 0 ? 'Mínimo de 6 caracteres.' : novaOk ? <><i className="fa-solid fa-check" /> Tamanho ok.</> : 'Ainda muito curta (mínimo 6).'}
          </p>
        </div>
        <div className="cat-field" style={{ marginBottom: '1.75rem' }}>
          <label className="config-label">Confirmar nova senha</label>
          <input type={show ? 'text' : 'password'} className="config-input" value={conf} onChange={(e) => setConf(e.target.value)} required autoComplete="new-password" />
          {conf.length > 0 && (
            <p className="cat-field-hint" style={{ color: confOk ? 'var(--success)' : '#f87171' }}>
              {confOk ? <><i className="fa-solid fa-check" /> As senhas conferem.</> : <><i className="fa-solid fa-xmark" /> As senhas não conferem.</>}
            </p>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <button type="submit" className="btn-primary" disabled={!podeSalvar}>{busy ? 'Salvando...' : 'Alterar senha'}</button>
        </div>
      </form>
    </div>
  );
}
