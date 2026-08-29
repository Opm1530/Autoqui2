import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ecommerceApi } from '../../services/ecommerceApi';
import { toast } from '../../services/toast';
import { confirm } from '../../services/confirm';
import { SkeletonCards } from '../components/Skeleton';
import { EcommerceAutomations } from './EcommerceAutomations';
import { EcommerceAnalytics } from './EcommerceAnalytics';
import { EcommerceCRM } from './EcommerceCRM';

export function Ecommerce() {
  const [params, setParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [integ, setInteg] = useState<any>(null);
  const [busy, setBusy] = useState('');
  const [manual, setManual] = useState(false);
  const [storeId, setStoreId] = useState('');
  const [token, setToken] = useState('');
  const [tab, setTab] = useState<'conexao' | 'automacoes' | 'analytics' | 'crm'>('conexao');

  async function load() {
    const r = await ecommerceApi.integration().catch(() => ({ connected: false }));
    setInteg(r);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  // Retorno do OAuth
  useEffect(() => {
    const oauth = params.get('oauth');
    if (oauth === 'success') { toast.success('Loja NuvemShop conectada!'); params.delete('oauth'); setParams(params, { replace: true }); }
    else if (oauth === 'error') { toast.error('Falha ao conectar: ' + (params.get('msg') || 'erro')); params.delete('oauth'); params.delete('msg'); setParams(params, { replace: true }); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function connectOAuth() {
    setBusy('oauth');
    try { const { url } = await ecommerceApi.oauthUrl(); window.location.href = url; }
    catch (e: any) { toast.error('Erro: ' + (e.message === 'app_nao_configurado' ? 'App NuvemShop não configurado no servidor.' : e.message || e)); setBusy(''); }
  }

  async function connectManual() {
    if (!storeId.trim() || !token.trim()) { toast.warning('Informe o ID da loja e o token.'); return; }
    setBusy('manual');
    try {
      await ecommerceApi.connectManual(storeId.trim(), token.trim());
      toast.success('Loja conectada!'); setToken(''); setStoreId(''); setManual(false); await load();
    } catch (e: any) { toast.error('Erro: ' + (e.message === 'credenciais_invalidas' ? 'ID da loja ou token inválidos.' : e.message || e)); }
    finally { setBusy(''); }
  }

  async function reregister() {
    setBusy('rereg');
    try { await ecommerceApi.reregister(); toast.success('Webhooks re-registrados.'); await load(); }
    catch (e: any) { toast.error('Erro: ' + (e.message || e)); }
    finally { setBusy(''); }
  }

  async function disconnect() {
    if (!await confirm.danger('Desconectar loja', 'Desconectar sua loja NuvemShop? As automações param até reconectar.')) return;
    setBusy('disc');
    try { await ecommerceApi.disconnect(); toast.success('Loja desconectada.'); await load(); }
    catch (e: any) { toast.error('Erro: ' + (e.message || e)); }
    finally { setBusy(''); }
  }

  if (loading) return <SkeletonCards count={1} lines={3} />;

  return (
    <div style={{ maxWidth: 720 }}>
      <div className="page-header"><h2 className="page-title">E-commerce · NuvemShop</h2></div>

      {integ?.connected && (
        <div className="campaign-tabs" style={{ margin: '0 0 1rem', flexWrap: 'wrap' }}>
          <button className={'tab-btn' + (tab === 'conexao' ? ' active' : '')} onClick={() => setTab('conexao')}><i className="fa-solid fa-plug" /> Conexão</button>
          <button className={'tab-btn' + (tab === 'automacoes' ? ' active' : '')} onClick={() => setTab('automacoes')}><i className="fa-solid fa-robot" /> Automações</button>
          <button className={'tab-btn' + (tab === 'analytics' ? ' active' : '')} onClick={() => setTab('analytics')}><i className="fa-solid fa-chart-line" /> Analytics</button>
          <button className={'tab-btn' + (tab === 'crm' ? ' active' : '')} onClick={() => setTab('crm')}><i className="fa-solid fa-users" /> CRM</button>
        </div>
      )}

      {integ?.connected && tab === 'automacoes' ? <EcommerceAutomations />
        : integ?.connected && tab === 'analytics' ? <EcommerceAnalytics />
        : integ?.connected && tab === 'crm' ? <EcommerceCRM />
        : integ?.connected ? (
        <div className="card" style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(16,185,129,0.12)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}><i className="fa-solid fa-circle-check" /></div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{integ.storeName || 'Loja conectada'}</div>
              {integ.storeUrl && <a href={`https://${integ.storeUrl}`} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>{integ.storeUrl}</a>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 18 }}>
            <span><i className="fa-solid fa-store" /> ID: {integ.storeId}</span>
            <span><i className={`fa-solid ${integ.webhooksRegistered ? 'fa-plug-circle-check' : 'fa-plug-circle-xmark'}`} style={{ color: integ.webhooksRegistered ? '#34d399' : '#f87171' }} /> Webhooks {integ.webhooksRegistered ? 'ativos' : 'pendentes'}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="btn-secondary" disabled={busy === 'rereg'} onClick={reregister}><i className="fa-solid fa-rotate" /> Re-registrar webhooks</button>
            <button className="btn-secondary" style={{ color: '#f87171', borderColor: 'rgba(239,68,68,0.35)' }} disabled={busy === 'disc'} onClick={disconnect}>Desconectar</button>
          </div>
        </div>
      ) : (
        <div className="card" style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(14,165,233,0.12)', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}><i className="fa-solid fa-store" /></div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Conecte sua loja NuvemShop</div>
              <p style={{ margin: '2px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Autorize o acesso para ligar as automações de WhatsApp, analytics e CRM.</p>
            </div>
          </div>
          <button className="btn-primary" style={{ marginTop: 12, width: '100%', justifyContent: 'center', background: '#0ea5e9' }} disabled={busy === 'oauth'} onClick={connectOAuth}>
            {busy === 'oauth' ? 'Redirecionando...' : <><i className="fa-solid fa-link" /> Conectar com a NuvemShop</>}
          </button>

          <div style={{ marginTop: 16, borderTop: '1px solid var(--border-color)', paddingTop: 14 }}>
            <button className="btn-text" style={{ fontSize: '0.85rem' }} onClick={() => setManual((m) => !m)}>
              <i className={`fa-solid fa-chevron-${manual ? 'up' : 'down'}`} /> Conectar manualmente (colar token)
            </button>
            {manual && (
              <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
                <input className="config-input" placeholder="ID da loja (store_id)" value={storeId} onChange={(e) => setStoreId(e.target.value)} />
                <input className="config-input" placeholder="Access token" value={token} onChange={(e) => setToken(e.target.value)} style={{ fontFamily: 'monospace' }} />
                <button className="btn-primary" style={{ justifyContent: 'center' }} disabled={busy === 'manual'} onClick={connectManual}>{busy === 'manual' ? 'Conectando...' : 'Salvar conexão'}</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
