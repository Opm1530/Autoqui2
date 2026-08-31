import { useEffect, useState } from 'react';
import { SkeletonCards } from '../components/Skeleton';
import { ecommerceApi } from '../../services/ecommerceApi';
import { toast } from '../../services/toast';

export function EcommerceWidgets() {
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [r, setR] = useState({ enabled: false, threshold: 150, rewardLabel: 'Frete grátis', couponCode: '', position: 'bottom', color: '#10b981', msgBefore: 'Faltam {{falta}} para ganhar {{recompensa}}! 🎁', msgReached: '🎉 Você desbloqueou {{recompensa}}!' });
  const loaderUrl = ecommerceApi.loaderUrl();

  useEffect(() => {
    ecommerceApi.widgets().then((w) => { if (w?.reward) setR((p) => ({ ...p, ...w.reward })); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  async function save() {
    setBusy(true);
    try { await ecommerceApi.saveWidget('reward', r); toast.success('Brinde salvo!'); }
    catch (e: any) { toast.error('Erro: ' + (e.message || e)); }
    finally { setBusy(false); }
  }

  if (loading) return <SkeletonCards count={3} lines={3} />;

  return (
    <div style={{ display: 'grid', gap: '1.25rem' }}>
      {/* Setup do script */}
      <div className="card" style={{ borderColor: 'rgba(132, 204, 22,0.3)', background: 'rgba(132, 204, 22,0.04)' }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}><i className="fa-solid fa-plug-circle-bolt" style={{ color: '#a3e635' }} /> Ativação na loja (uma vez)</div>
        <p style={{ margin: '0 0 10px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Pra os widgets aparecerem na sua loja NuvemShop, cadastre este script no app (Partner Portal) e <strong>reconecte a loja</strong> uma vez para autorizar:
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <input readOnly value={loaderUrl} className="config-input" style={{ fontFamily: 'monospace', fontSize: '0.8rem' }} />
          <button className="btn-secondary" onClick={() => { navigator.clipboard.writeText(loaderUrl); toast.success('Copiado!'); }}><i className="fa-solid fa-copy" /></button>
        </div>
      </div>

      {/* Brinde */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div>
            <div style={{ fontWeight: 700 }}>🎁 Brinde no carrinho</div>
            <p style={{ margin: '2px 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Barra "faltam R$ X para ganhar…" com progresso, que aparece quando há itens no carrinho.</p>
          </div>
          <label className="cfg-switch"><input type="checkbox" checked={r.enabled} onChange={(e) => setR({ ...r, enabled: e.target.checked })} /><span className="cfg-slider" /></label>
        </div>

        {r.enabled && (
          <div style={{ marginTop: 14, display: 'grid', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
              <div><label className="config-label">Meta (R$)</label><input type="number" min="0" className="config-input" value={r.threshold} onChange={(e) => setR({ ...r, threshold: parseFloat(e.target.value) || 0 })} /></div>
              <div><label className="config-label">Recompensa</label><input className="config-input" value={r.rewardLabel} onChange={(e) => setR({ ...r, rewardLabel: e.target.value })} placeholder="Ex: Frete grátis" /></div>
              <div><label className="config-label">Cupom (opcional)</label><input className="config-input" value={r.couponCode} onChange={(e) => setR({ ...r, couponCode: e.target.value })} placeholder="Mostrado ao atingir" /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
              <div><label className="config-label">Posição</label><select className="config-select" value={r.position} onChange={(e) => setR({ ...r, position: e.target.value })}><option value="bottom">Rodapé</option><option value="top">Topo</option></select></div>
              <div><label className="config-label">Cor</label><div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="color" value={r.color} onChange={(e) => setR({ ...r, color: e.target.value })} style={{ width: 44, height: 40, border: 'none', background: 'none', cursor: 'pointer' }} /><input className="config-input" value={r.color} onChange={(e) => setR({ ...r, color: e.target.value })} /></div></div>
            </div>
            <div><label className="config-label">Mensagem (faltando)</label><input className="config-input" value={r.msgBefore} onChange={(e) => setR({ ...r, msgBefore: e.target.value })} /><small style={{ color: 'var(--text-dim)' }}>Use {'{{falta}}'} e {'{{recompensa}}'}.</small></div>
            <div><label className="config-label">Mensagem (atingido)</label><input className="config-input" value={r.msgReached} onChange={(e) => setR({ ...r, msgReached: e.target.value })} /><small style={{ color: 'var(--text-dim)' }}>Use {'{{recompensa}}'}.</small></div>
          </div>
        )}
        <div style={{ textAlign: 'right', marginTop: 14 }}><button className="btn-primary" disabled={busy} onClick={save}>{busy ? 'Salvando...' : 'Salvar'}</button></div>
      </div>

      <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>
        Página do produto, roleta de desconto e carrossel de vídeos chegam nas próximas atualizações.
      </p>
    </div>
  );
}
