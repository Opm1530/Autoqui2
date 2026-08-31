import { useEffect, useState } from 'react';
import { leadCaptureApi } from '../../../services/leadCaptureApi';
import { toast } from '../../../services/toast';
import { SkeletonCards } from '../../components/Skeleton';

interface Props {
  instances: any[]; // instâncias da empresa (para escolher a coletora)
}

// Captação de leads da vitrine: vincula uma instância de WhatsApp como "coletora".
// Quem manda mensagem pra ela vira lead (origem: vitrine) na tela Leads.
export function VitrineLeads({ instances }: Props) {
  const [loading, setLoading] = useState(true);
  const [ativa, setAtiva] = useState(false);
  const [instancia, setInstancia] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    leadCaptureApi.status()
      .then((s) => { setAtiva(s.ativa); setInstancia(s.instancia || ''); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function activate() {
    if (!instancia) { toast.warning('Escolha uma instância coletora.'); return; }
    setBusy(true);
    try {
      await leadCaptureApi.activate(instancia, 'vitrine');
      setAtiva(true);
      toast.success('Captação de leads ativada!');
    } catch (e: any) { toast.error('Erro ao ativar: ' + (e.message || e)); }
    finally { setBusy(false); }
  }
  async function deactivate() {
    setBusy(true);
    try {
      await leadCaptureApi.deactivate();
      setAtiva(false);
      toast.success('Captação de leads desativada.');
    } catch (e: any) { toast.error('Erro ao desativar: ' + (e.message || e)); }
    finally { setBusy(false); }
  }

  if (loading) return <SkeletonCards count={1} lines={4} />;

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <div className="config-section-title"><i className="fa-solid fa-user-plus" style={{ color: 'var(--primary)' }} /> Captação de Leads</div>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        Vincule uma instância de WhatsApp como <strong>coletora</strong>. Todo mundo que mandar mensagem pra ela é
        salvo automaticamente como <strong>lead</strong> na tela <strong>Leads</strong> — sem trabalho manual.
        Depois você pode usar essa base em <strong>Campanhas</strong>.
      </p>

      {/* Status */}
      <div style={{ padding: 14, borderRadius: 'var(--radius-md)', background: ativa ? 'rgba(16,185,129,0.08)' : 'rgba(148,163,184,0.08)', border: `1px solid ${ativa ? 'rgba(16,185,129,0.2)' : 'var(--border-color)'}`, display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
        <i className={`fa-solid ${ativa ? 'fa-circle-check' : 'fa-circle-pause'}`} style={{ color: ativa ? '#10b981' : 'var(--text-dim)', fontSize: '1.2rem' }} />
        <div>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>{ativa ? 'Captação ativa' : 'Captação desativada'}</p>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {ativa ? 'Novas mensagens recebidas viram leads automaticamente.' : 'Ative para começar a coletar leads do WhatsApp.'}
          </p>
        </div>
      </div>

      <div className="cat-field">
        <label className="config-label">Instância coletora</label>
        {instances.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Nenhuma instância de WhatsApp cadastrada. Crie uma na tela de Conexões primeiro.</p>
        ) : (
          <select className="config-select" value={instancia} onChange={(e) => setInstancia(e.target.value)} disabled={ativa}>
            <option value="">-- Escolha uma instância --</option>
            {instances.map((inst) => <option key={inst.id} value={inst.nome}>{inst.nome} ({inst.status})</option>)}
          </select>
        )}
        <p className="cat-field-hint">A mesma instância pode atender e coletar leads ao mesmo tempo.</p>
      </div>

      <div style={{ textAlign: 'right', marginTop: 8 }}>
        {ativa
          ? <button className="btn-secondary" style={{ color: '#f87171', borderColor: 'rgba(239,68,68,0.35)' }} disabled={busy} onClick={deactivate}>{busy ? 'Desativando...' : 'Desativar captação'}</button>
          : <button className="btn-primary" disabled={busy || !instancia} onClick={activate}>{busy ? 'Ativando...' : <><i className="fa-solid fa-bolt" /> Ativar captação</>}</button>}
      </div>
    </div>
  );
}
