import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../services/api';
import { auth } from '../../firebase/config';
import { toast } from '../../services/toast';
import { confirm } from '../../services/confirm';
import { useAuth } from '../useAuth';

async function authHeaders(): Promise<Record<string, string>> {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  const user = auth.currentUser;
  if (user) {
    try { h['Authorization'] = `Bearer ${await user.getIdToken()}`; } catch { /* ignore */ }
  }
  return h;
}

export function MercadoPago() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [mpUserId, setMpUserId] = useState('');

  const [token, setToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);

  async function loadStatus() {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/mp/status`, { headers: await authHeaders() });
      const data = await resp.json().catch(() => ({}));
      setConnected(!!data.connected);
      setMpUserId(data.userId || '');
    } catch { /* mostra como desconectado */ }
    setLoading(false);
  }

  useEffect(() => {
    if (!user?.companyId) return;
    loadStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.companyId]);

  async function connect() {
    const t = token.trim();
    if (!t) { toast.warning('Insira o Access Token primeiro.'); return; }
    setConnecting(true);
    try {
      const resp = await fetch(`${API_BASE_URL}/api/mp/connect`, {
        method: 'POST', headers: await authHeaders(), body: JSON.stringify({ accessToken: t }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data.error === 'token_invalido' ? 'Token inválido. Confira e tente de novo.' : 'Falha ao conectar.');
      toast.success('Integração conectada com sucesso!');
      setToken('');
      await loadStatus();
    } catch (err: any) {
      toast.error('Erro na conexão: ' + err.message);
    } finally { setConnecting(false); }
  }

  async function disconnect() {
    const ok = await confirm.danger('Desativar Integração', 'Tem certeza que deseja desativar o Mercado Pago? Isso removerá o token de acesso.');
    if (!ok) return;
    setDisconnecting(true);
    try {
      const resp = await fetch(`${API_BASE_URL}/api/mp/disconnect`, { method: 'POST', headers: await authHeaders() });
      if (!resp.ok) throw new Error('Falha ao desativar.');
      toast.success('Integração desativada.');
      await loadStatus();
    } catch (err: any) {
      toast.error('Erro ao desativar: ' + err.message);
    } finally { setDisconnecting(false); }
  }

  if (!user?.companyId) return <p>Acesso negado.</p>;

  return (
    <div>
      <div className="page-header" style={{ flexDirection: 'column' }}>
        <div><h2 className="page-title">Configuração Mercado Pago</h2></div>
        <div><p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Configure sua integração para recebimento de pagamentos.</p></div>
      </div>

      <div className="card glass" style={{ maxWidth: 600, marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 30 }}>
          <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg, #009ee3 0%, #007bbd 100%)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.8rem', boxShadow: '0 8px 16px rgba(0, 158, 227, 0.2)' }}>
            <i className="fa-solid fa-receipt" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Integração de Pagamentos</h3>
            <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '0.85rem' }}>Conecte sua conta para aceitar Pix.</p>
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1.5rem' }}><i className="fa-solid fa-spinner fa-spin fa-lg" style={{ color: 'var(--primary)' }} /></div>
        ) : connected ? (
          <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 12, padding: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <i className="fa-solid fa-circle-check" style={{ color: '#34d399', fontSize: '1.4rem' }} />
              <div>
                <div style={{ fontWeight: 700, color: '#34d399' }}>Conectado</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>User ID: {mpUserId || '—'}</div>
              </div>
            </div>
            <button onClick={disconnect} disabled={disconnecting} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 22px', height: 44, borderRadius: 10, fontWeight: 600, background: '#ef4444', color: 'white', border: 'none', cursor: 'pointer' }}>
              {disconnecting ? <i className="fa-solid fa-spinner fa-spin" /> : <><i className="fa-solid fa-plug-circle-xmark" /> <span>Desativar</span></>}
            </button>
          </div>
        ) : (
          <div className="form-group" style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 10, fontWeight: 600, color: 'var(--text-main)' }}>Access Token (Produção)</label>
            <div style={{ position: 'relative' }}>
              <input type={showToken ? 'text' : 'password'} value={token} onChange={(e) => setToken(e.target.value)}
                placeholder="APP_USR-0000..." style={{ width: '100%', padding: '14px 45px 14px 16px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'white', borderRadius: 10, fontFamily: 'monospace' }} />
              <button type="button" onClick={() => setShowToken((s) => !s)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', border: 'none', background: 'none', cursor: 'pointer', padding: 5 }}>
                <i className={`fa-solid ${showToken ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>
            <button onClick={connect} disabled={connecting} style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, padding: '0 25px', height: 48, borderRadius: 10, fontWeight: 600, background: '#009ee3', color: 'white', border: 'none', cursor: 'pointer' }}>
              {connecting ? <><i className="fa-solid fa-spinner fa-spin" /> <span>Conectando...</span></> : <><i className="fa-solid fa-plug" /> <span>Conectar</span></>}
            </button>
          </div>
        )}

        <div style={{ background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.1)', borderRadius: 10, padding: 15, display: 'flex', gap: 12, marginTop: 20 }}>
          <i className="fa-solid fa-shield-halved" style={{ color: 'var(--primary)', marginTop: 3 }} />
          <div style={{ fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--text-muted)' }}>
            O token é guardado <strong>no servidor</strong>, numa área protegida — nunca fica exposto no navegador nem no catálogo. Usado apenas para comunicação oficial com o Mercado Pago.
          </div>
        </div>
      </div>
    </div>
  );
}
