import { useEffect, useState } from 'react';
import { farmaquiApi } from '../../services/farmaquiApi';
import { toast } from '../../services/toast';

const TEAL = '#14b8a6';

const LANDING_DEFAULT = {
  publicado: false, host: '', titulo: 'Sua farmácia de confiança',
  subtitulo: 'Atendimento rápido pelo WhatsApp, entrega no mesmo dia e os melhores preços da região.',
  corPrimaria: '#14b8a6', logoUrl: '', whatsapp: '', ctaTexto: 'Chamar no WhatsApp', endereco: '',
  destaques: [{ icone: '🚚', texto: 'Entrega no mesmo dia' }, { icone: '💊', texto: 'Grande variedade de medicamentos' }, { icone: '💬', texto: 'Atendimento humano no WhatsApp' }],
};

// Configuração da FarmaQui: gestão do design da Landing page (igual Configuração do catálogo/vitrine).
export function FarmaSettings() {
  const [l, setL] = useState<any>(LANDING_DEFAULT);
  const [busy, setBusy] = useState(false);
  const [sub, setSub] = useState('');
  useEffect(() => { farmaquiApi.getLanding().then((d) => { if (d) { setL(d); setSub((d.host || '').replace('.autoqui.com.br', '')); } }).catch(() => {}); }, []);

  const set = (k: string, v: any) => setL({ ...l, [k]: v });
  const setDest = (i: number, k: string, v: string) => { const d = [...(l.destaques || [])]; d[i] = { ...d[i], [k]: v }; set('destaques', d); };
  const addDest = () => set('destaques', [...(l.destaques || []), { icone: '✅', texto: '' }]);
  const delDest = (i: number) => set('destaques', l.destaques.filter((_: any, j: number) => j !== i));

  async function save() {
    setBusy(true);
    try { const r = await farmaquiApi.saveLanding(l); setL(r.landing); toast.success('Página salva!'); }
    catch (e: any) { toast.error('Erro: ' + (e.message || e)); }
    finally { setBusy(false); }
  }
  async function bindHost() {
    if (!sub.trim()) { toast.warning('Digite o subdomínio.'); return; }
    setBusy(true);
    try { const r = await farmaquiApi.setLandingHost(sub.trim()); set('host', r.host); toast.success('Subdomínio conectado: ' + r.host); }
    catch (e: any) { toast.error(e.message === 'subdominio_em_uso' ? 'Esse subdomínio já está em uso.' : e.message === 'subdominio_invalido' ? 'Subdomínio inválido.' : 'Erro: ' + (e.message || e)); }
    finally { setBusy(false); }
  }

  return (
    <div style={{ maxWidth: 760 }}>
      <div className="page-heading">
        <h1>Configuração</h1>
        <p>Monte o design da sua landing page de campanhas — título, cores, destaques e o endereço no ar.</p>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div className="config-section-title" style={{ margin: 0 }}><i className="fa-solid fa-globe" style={{ color: TEAL }} /> Landing page</div>
          <label className="cfg-switch"><input type="checkbox" checked={l.publicado} onChange={(e) => set('publicado', e.target.checked)} /><span className="cfg-slider" /></label>
        </div>
        <p style={{ margin: '4px 0 14px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Ative para publicar. Uma página pronta pra divulgar, com botão que leva direto pro seu WhatsApp.</p>

        <div style={{ display: 'grid', gap: 12 }}>
          <div><label className="config-label">Título</label><input className="config-input" value={l.titulo} onChange={(e) => set('titulo', e.target.value)} /></div>
          <div><label className="config-label">Subtítulo</label><textarea className="config-input" style={{ minHeight: 60, resize: 'vertical', fontFamily: 'inherit' }} value={l.subtitulo} onChange={(e) => set('subtitulo', e.target.value)} /></div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div><label className="config-label">Cor principal</label><input type="color" className="config-input" style={{ width: 60, padding: 4, height: 40 }} value={l.corPrimaria} onChange={(e) => set('corPrimaria', e.target.value)} /></div>
            <div style={{ flex: 1, minWidth: 180 }}><label className="config-label">WhatsApp (só números, com DDD)</label><input className="config-input" placeholder="11999998888" value={l.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} /></div>
          </div>
          <div><label className="config-label">URL do logo (opcional)</label><input className="config-input" value={l.logoUrl} onChange={(e) => set('logoUrl', e.target.value)} /></div>
          <div><label className="config-label">Texto do botão</label><input className="config-input" value={l.ctaTexto} onChange={(e) => set('ctaTexto', e.target.value)} /></div>
          <div><label className="config-label">Endereço (opcional)</label><input className="config-input" value={l.endereco} onChange={(e) => set('endereco', e.target.value)} /></div>

          <div>
            <label className="config-label">Destaques</label>
            <div style={{ display: 'grid', gap: 8 }}>
              {(l.destaques || []).map((d: any, i: number) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input className="config-input" style={{ width: 56, textAlign: 'center' }} value={d.icone} onChange={(e) => setDest(i, 'icone', e.target.value)} />
                  <input className="config-input" style={{ flex: 1 }} value={d.texto} onChange={(e) => setDest(i, 'texto', e.target.value)} placeholder="Ex.: Entrega rápida" />
                  <button className="action-btn" onClick={() => delDest(i)} title="Remover"><i className="fa-solid fa-trash" /></button>
                </div>
              ))}
              {(l.destaques || []).length < 6 && <button className="btn-secondary" style={{ justifySelf: 'start' }} onClick={addDest}>+ Adicionar destaque</button>}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right', marginTop: 14 }}><button className="btn-primary" disabled={busy} onClick={save} style={{ background: TEAL }}>{busy ? 'Salvando...' : 'Salvar página'}</button></div>

        <div style={{ marginTop: 18, borderTop: '1px solid var(--border-color)', paddingTop: 16 }}>
          <label className="config-label">Endereço da página (subdomínio)</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <input className="config-input" style={{ flex: 1, minWidth: 160 }} placeholder="minhafarmacia" value={sub} onChange={(e) => setSub(e.target.value)} />
            <span style={{ color: 'var(--text-muted)' }}>.autoqui.com.br</span>
            <button className="btn-primary" disabled={busy} onClick={bindHost} style={{ background: TEAL }}>Conectar</button>
          </div>
          {l.host && <p style={{ fontSize: '0.82rem', marginTop: 8 }}><i className="fa-solid fa-circle-check" style={{ color: '#34d399', marginRight: 4 }} /> No ar em <a href={`https://${l.host}`} target="_blank" rel="noreferrer" style={{ color: TEAL }}>{l.host}</a></p>}
        </div>
      </div>
    </div>
  );
}
