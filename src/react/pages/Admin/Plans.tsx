import { useEffect, useState } from 'react';
import { dbService } from '../../../services/db';
import { subscriptionApi } from '../../../services/subscriptionApi';
import { toast } from '../../../services/toast';
import { confirm } from '../../../services/confirm';
import { SkeletonCards } from '../../components/Skeleton';

export function Plans() {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [mpUserId, setMpUserId] = useState('');
  const [token, setToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [busy, setBusy] = useState('');
  const [plans, setPlans] = useState<any[]>([]);
  const [modal, setModal] = useState<{ id?: string; nome: string; valor: string; toleranciaDias: string; maxLojas: string } | null>(null);

  async function load() {
    const [st, pl] = await Promise.all([
      subscriptionApi.platformStatus().catch(() => ({ connected: false, userId: '' })),
      dbService.getAll('planos').catch(() => []),
    ]);
    setConnected(!!st.connected); setMpUserId(st.userId || '');
    setPlans((pl as any[]).filter((p) => p.ativo !== false));
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function connect() {
    if (!token.trim()) { toast.warning('Cole o Access Token da conta da plataforma.'); return; }
    setBusy('connect');
    try { await subscriptionApi.connectPlatform(token.trim()); toast.success('Conta da plataforma conectada!'); setToken(''); await load(); }
    catch (e: any) { toast.error('Erro: ' + (e.message === 'token_invalido' ? 'Token inválido.' : e.message || e)); }
    finally { setBusy(''); }
  }
  async function disconnect() {
    const ok = await confirm.danger('Desconectar', 'Desconectar a conta MP da plataforma? Novas assinaturas ficam indisponíveis.');
    if (!ok) return;
    setBusy('disc');
    try { await subscriptionApi.disconnectPlatform(); toast.success('Desconectado.'); await load(); }
    catch (e: any) { toast.error('Erro: ' + (e.message || e)); }
    finally { setBusy(''); }
  }

  async function savePlan() {
    if (!modal) return;
    const valor = parseFloat(modal.valor);
    if (!modal.nome.trim() || !valor || valor <= 0) { toast.warning('Informe nome e valor válidos.'); return; }
    setBusy('save');
    try {
      await subscriptionApi.savePlan({ id: modal.id, nome: modal.nome.trim(), valor, toleranciaDias: parseInt(modal.toleranciaDias) || 5, maxLojas: parseInt(modal.maxLojas) || 1, modulos: ['venda_catalogo'] });
      toast.success('Plano salvo!'); setModal(null); await load();
    } catch (e: any) { toast.error('Erro ao salvar plano: ' + (e.message || e)); }
    finally { setBusy(''); }
  }
  async function removePlan(p: any) {
    const ok = await confirm.danger('Excluir Plano', `Excluir o plano "${p.nome}"? Assinaturas existentes não são canceladas automaticamente.`);
    if (!ok) return;
    try { await subscriptionApi.deletePlan(p.id); setPlans((prev) => prev.filter((x) => x.id !== p.id)); toast.success('Plano excluído.'); }
    catch (e: any) { toast.error('Erro: ' + (e.message || e)); }
  }

  if (loading) return <SkeletonCards count={3} lines={2} />;

  return (
    <div>
      <div className="page-header" style={{ justifyContent: 'space-between' }}>
        <h2 className="page-title">Planos & Cobrança</h2>
        {connected && <button className="btn-primary" onClick={() => setModal({ nome: '', valor: '', toleranciaDias: '5', maxLojas: '1' })}><i className="fa-solid fa-plus" /> Novo Plano</button>}
      </div>

      {/* Conta MP da plataforma */}
      <div className="card glass" style={{ maxWidth: 620, marginBottom: '1.5rem' }}>
        <div className="config-section-title"><i className="fa-solid fa-building-columns" style={{ color: '#009ee3' }} /> Conta Mercado Pago da Plataforma</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Conta que <strong>recebe as mensalidades</strong> dos clientes. É separada dos tokens MP de cada empresa.</p>
        {connected ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><i className="fa-solid fa-circle-check" style={{ color: '#34d399', fontSize: '1.4rem' }} /><div><div style={{ fontWeight: 700, color: '#34d399' }}>Conectada</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>User ID: {mpUserId || '—'}</div></div></div>
            <button className="btn-secondary" style={{ color: '#f87171', borderColor: 'rgba(239,68,68,0.35)' }} disabled={busy === 'disc'} onClick={disconnect}>Desconectar</button>
          </div>
        ) : (
          <div>
            <label className="config-label">Access Token (Produção) da plataforma</label>
            <div style={{ position: 'relative' }}>
              <input type={showToken ? 'text' : 'password'} value={token} onChange={(e) => setToken(e.target.value)} placeholder="APP_USR-..." className="config-input" style={{ fontFamily: 'monospace', paddingRight: 44 }} />
              <button type="button" onClick={() => setShowToken((s) => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}><i className={`fa-solid ${showToken ? 'fa-eye-slash' : 'fa-eye'}`} /></button>
            </div>
            <button className="btn-primary" style={{ marginTop: 12, background: '#009ee3' }} disabled={busy === 'connect'} onClick={connect}>{busy === 'connect' ? 'Conectando...' : 'Conectar'}</button>
          </div>
        )}
      </div>

      {/* Planos */}
      {connected && (
        plans.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>Nenhum plano criado. Clique em "Novo Plano".</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {plans.map((p) => (
              <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div><div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{p.nome}</div><div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>R$ {Number(p.valor).toFixed(2)}<span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mês</span></div></div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <span><i className="fa-solid fa-store" /> {p.maxLojas ?? 1} {(p.maxLojas ?? 1) === 1 ? 'loja' : 'lojas'}</span>
                  <span><i className="fa-solid fa-clock" /> Tolerância: {p.toleranciaDias ?? 5} dias</span>
                </div>
                <div style={{ display: 'flex', gap: 8, borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
                  <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setModal({ id: p.id, nome: p.nome, valor: String(p.valor), toleranciaDias: String(p.toleranciaDias ?? 5), maxLojas: String(p.maxLojas ?? 1) })}><i className="fa-solid fa-pen" /> Editar</button>
                  <button className="btn-secondary" style={{ color: '#f87171', borderColor: 'rgba(239,68,68,0.35)' }} onClick={() => removePlan(p)}><i className="fa-solid fa-trash" /></button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {modal && (
        <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}>
          <div className="modal-content glass" style={{ maxWidth: 460 }}>
            <span className="close-modal" onClick={() => setModal(null)}>&times;</span>
            <h2>{modal.id ? 'Editar Plano' : 'Novo Plano'}</h2>
            <div className="form-group"><label>Nome do Plano</label><input type="text" value={modal.nome} onChange={(e) => setModal({ ...modal, nome: e.target.value })} placeholder="Ex: Básico, Pro..." /></div>
            <div className="form-group"><label>Valor mensal (R$)</label><input type="number" min="0" step="0.01" value={modal.valor} onChange={(e) => setModal({ ...modal, valor: e.target.value })} placeholder="0,00" /></div>
            <div className="form-group"><label>Nº de lojas incluídas</label><select value={modal.maxLojas} onChange={(e) => setModal({ ...modal, maxLojas: e.target.value })}><option value="1">1 loja</option><option value="2">2 lojas</option></select></div>
            <div className="form-group"><label>Dias de tolerância após falha de pagamento</label><input type="number" min="0" value={modal.toleranciaDias} onChange={(e) => setModal({ ...modal, toleranciaDias: e.target.value })} /></div>
            <button className="btn-primary full-width" disabled={busy === 'save'} onClick={savePlan}>{busy === 'save' ? 'Salvando...' : 'Salvar Plano'}</button>
          </div>
        </div>
      )}
    </div>
  );
}
