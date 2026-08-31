import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dbService } from '../../services/db';
import { farmaquiApi } from '../../services/farmaquiApi';
import { toast } from '../../services/toast';
import { confirm } from '../../services/confirm';
import { useAuth } from '../useAuth';
import { SkeletonCards } from '../components/Skeleton';

const TEAL = '#14b8a6';

export function FarmaQui() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<{ ativa: boolean; instancia: string }>({ ativa: false, instancia: '' });
  const [instances, setInstances] = useState<any[]>([]);
  const [sel, setSel] = useState('');
  const [busy, setBusy] = useState(false);

  async function load() {
    const [st, insts] = await Promise.all([
      farmaquiApi.status().catch(() => ({ ativa: false, instancia: '' })),
      dbService.getAll('instancias', { field: 'empresaId', operator: '==', value: companyId }).catch(() => []),
    ]);
    setStatus(st);
    setInstances(insts as any[]);
    setSel(st.instancia || (insts as any[])[0]?.nome || '');
    setLoading(false);
  }
  useEffect(() => { if (companyId) load(); }, [companyId]);

  async function activate() {
    if (!sel) { toast.warning('Selecione a instância de WhatsApp.'); return; }
    setBusy(true);
    try { await farmaquiApi.activate(sel); toast.success('Captura de leads ativada!'); await load(); }
    catch (e: any) { toast.error('Erro: ' + (e.message || e)); }
    finally { setBusy(false); }
  }
  async function deactivate() {
    const ok = await confirm.warning('Desativar captura', 'Deseja desativar a captura de leads? As mensagens recebidas deixam de virar leads (os leads já salvos são mantidos).');
    if (!ok) return;
    setBusy(true);
    try { await farmaquiApi.deactivate(); toast.success('Captura desativada.'); await load(); }
    catch (e: any) { toast.error('Erro: ' + (e.message || e)); }
    finally { setBusy(false); }
  }

  if (loading) return <SkeletonCards count={2} lines={3} />;

  return (
    <div style={{ maxWidth: 760 }}>
      <div className="page-heading">
        <h1>FarmaQui · Relacionamento</h1>
        <p>Capte leads automaticamente, lembre da recompra e faça ofertas no grupo — tudo pelo seu WhatsApp.</p>
      </div>

      {/* Captura de leads */}
      <div className="card" style={{ marginTop: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', background: status.ativa ? 'rgba(16,185,129,0.12)' : 'rgba(20,184,166,0.12)', color: status.ativa ? '#34d399' : TEAL }}>
            <i className={`fa-solid ${status.ativa ? 'fa-circle-check' : 'fa-user-plus'}`} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>Captura automática de leads</div>
            <p style={{ margin: '2px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Todo mundo que mandar mensagem no seu WhatsApp vira um lead automaticamente.</p>
          </div>
        </div>

        {status.ativa ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: '0.9rem' }}><i className="fa-solid fa-circle-check" style={{ color: '#34d399' }} /> Captura ativa na instância <strong>{status.instancia}</strong></div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link to="/leads" className="btn-primary" style={{ padding: '8px 16px' }}>Ver clientes</Link>
              <button className="btn-secondary" style={{ color: '#f87171', borderColor: 'rgba(239,68,68,0.35)' }} disabled={busy} onClick={deactivate}>Desativar</button>
            </div>
          </div>
        ) : instances.length === 0 ? (
          <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 12, padding: 14, fontSize: '0.9rem' }}>
            <i className="fa-solid fa-triangle-exclamation" style={{ color: '#fbbf24' }} /> Conecte primeiro uma instância de WhatsApp em <strong>Instâncias</strong>.
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="config-label">Instância do WhatsApp</label>
              <select className="config-select" value={sel} onChange={(e) => setSel(e.target.value)}>
                {instances.map((i) => <option key={i.id} value={i.nome}>{i.nome}</option>)}
              </select>
            </div>
            <button className="btn-primary" disabled={busy} onClick={activate} style={{ background: TEAL }}>{busy ? 'Ativando...' : 'Ativar captura'}</button>
          </div>
        )}
        <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', margin: '12px 0 0' }}>
          Use uma instância <strong>dedicada</strong> ao FarmaQui — ao ativar, o webhook dela passa a apontar para o AutoQui.
        </p>
      </div>

      <RecompraConfig />
      <RecompraQueue />
      <GroupOffers />
      <LandingBuilder />
    </div>
  );
}

function RecompraConfig() {
  const [r, setR] = useState({ enabled: false, mensagem: '', cicloDiasPadrao: 30 });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  useEffect(() => { farmaquiApi.config().then((c) => { setR(c.recompra); setLoading(false); }).catch(() => setLoading(false)); }, []);
  async function save() {
    if (r.enabled && !r.mensagem.trim()) { toast.warning('Escreva a mensagem de recompra.'); return; }
    setBusy(true);
    try { await farmaquiApi.saveRecompra(r); toast.success('Recompra salva!'); }
    catch (e: any) { toast.error('Erro: ' + (e.message || e)); }
    finally { setBusy(false); }
  }
  if (loading) return null;
  return (
    <div className="card" style={{ marginTop: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div>
          <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}><i className="fa-solid fa-pills" style={{ color: TEAL }} /> Lembrete de recompra</div>
          <p style={{ margin: '2px 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Ao marcar a "última compra" de um cliente, o sistema manda uma mensagem depois de X dias perguntando se precisa repor.</p>
        </div>
        <label className="cfg-switch"><input type="checkbox" checked={r.enabled} onChange={(e) => setR({ ...r, enabled: e.target.checked })} /><span className="cfg-slider" /></label>
      </div>
      {r.enabled && (
        <div style={{ marginTop: 14, display: 'grid', gap: 12 }}>
          <div style={{ maxWidth: 220 }}>
            <label className="config-label">Ciclo padrão (dias)</label>
            <select className="config-select" value={r.cicloDiasPadrao} onChange={(e) => setR({ ...r, cicloDiasPadrao: Number(e.target.value) })}>
              <option value={30}>30 dias</option><option value={60}>60 dias</option><option value={90}>90 dias</option>
            </select>
          </div>
          <div>
            <label className="config-label">Mensagem</label>
            <textarea className="config-input" style={{ minHeight: 90, resize: 'vertical', fontFamily: 'inherit' }} value={r.mensagem} onChange={(e) => setR({ ...r, mensagem: e.target.value })} />
            <small style={{ color: 'var(--text-dim)' }}>Use {'{{nome}}'} para o nome do cliente.</small>
          </div>
        </div>
      )}
      <div style={{ textAlign: 'right', marginTop: 14 }}><button className="btn-primary" disabled={busy} onClick={save} style={{ background: TEAL }}>{busy ? 'Salvando...' : 'Salvar'}</button></div>
    </div>
  );
}

// ── Fila de recompra (agendadas: cancelar / enviar já) ──
function RecompraQueue() {
  const [items, setItems] = useState<{ leadId: string; nome: string; phone: string; runAt: number }[] | null>(null);
  const [busy, setBusy] = useState('');
  async function load() { try { const r = await farmaquiApi.recompraList(); setItems(r.items); } catch { setItems([]); } }
  useEffect(() => { load(); }, []);

  async function cancel(id: string) {
    const ok = await confirm.warning('Cancelar recompra', 'Cancelar este lembrete de recompra agendado?');
    if (!ok) return;
    setBusy(id);
    try { await farmaquiApi.recompraCancel(id); toast.success('Recompra cancelada.'); await load(); }
    catch (e: any) { toast.error('Erro: ' + (e.message || e)); } finally { setBusy(''); }
  }
  async function sendNow(id: string) {
    const ok = await confirm.warning('Enviar agora', 'Enviar o lembrete de recompra deste cliente agora?');
    if (!ok) return;
    setBusy(id);
    try { await farmaquiApi.recompraSendNow(id); toast.success('Lembrete enviado!'); await load(); }
    catch (e: any) {
      const msg = e.message === 'sem_instancia_ou_mensagem' ? 'Configure a instância e a mensagem de recompra primeiro.' : e.message === 'falha_envio' ? 'Falha no envio pelo WhatsApp.' : (e.message || e);
      toast.error('Erro: ' + msg);
    } finally { setBusy(''); }
  }

  if (items === null) return null;
  return (
    <div className="card" style={{ marginTop: '1.25rem' }}>
      <div style={{ fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}><i className="fa-solid fa-calendar-check" style={{ color: TEAL }} /> Recompras agendadas</div>
      <p style={{ margin: '0 0 12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Lembretes que ainda vão sair. Você pode antecipar o envio ou cancelar.</p>
      {items.length === 0 ? (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Nenhuma recompra agendada. Marque a "última compra" de um cliente na tela de Leads para agendar.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((it) => (
            <div key={it.leadId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '10px 12px', background: 'rgba(23, 37, 28, 0.03)', border: '1px solid var(--border-color)', borderRadius: 10, flexWrap: 'wrap' }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600 }}>{it.nome || it.phone || '—'}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sai em {it.runAt ? new Date(it.runAt).toLocaleDateString('pt-BR') : '—'}</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.82rem' }} disabled={busy === it.leadId} onClick={() => sendNow(it.leadId)}><i className="fa-solid fa-paper-plane" /> Enviar já</button>
                <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.82rem', color: '#f87171', borderColor: 'rgba(239,68,68,0.35)' }} disabled={busy === it.leadId} onClick={() => cancel(it.leadId)}><i className="fa-solid fa-xmark" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Ofertas no grupo do WhatsApp ──
function GroupOffers() {
  const [grupos, setGrupos] = useState<{ id: string; subject: string; size?: number }[] | null>(null);
  const [temInstancia, setTemInstancia] = useState(true);
  const [grupoJid, setGrupoJid] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [agendar, setAgendar] = useState(false);
  const [quando, setQuando] = useState('');
  const [busy, setBusy] = useState(false);
  const [offers, setOffers] = useState<{ id: string; grupoNome: string; mensagem: string; runAt: number; done: boolean }[]>([]);

  async function loadGroups() {
    try { const r = await farmaquiApi.groups(); setTemInstancia(!!r.instancia); setGrupos(r.grupos || []); }
    catch { setGrupos([]); }
  }
  async function loadOffers() { try { const r = await farmaquiApi.groupOffers(); setOffers(r.items); } catch { /* ignore */ } }
  useEffect(() => { loadGroups(); loadOffers(); }, []);

  async function enviar() {
    if (!grupoJid) { toast.warning('Escolha um grupo.'); return; }
    if (!mensagem.trim()) { toast.warning('Escreva a mensagem da oferta.'); return; }
    if (agendar && !quando) { toast.warning('Escolha a data/hora do agendamento.'); return; }
    const grupoNome = grupos?.find((g) => g.id === grupoJid)?.subject || '';
    setBusy(true);
    try {
      const r = await farmaquiApi.createGroupOffer({ grupoJid, grupoNome, mensagem: mensagem.trim(), runAt: agendar ? new Date(quando).toISOString() : undefined });
      toast.success(r.enviado ? 'Oferta enviada ao grupo!' : 'Oferta agendada!');
      setMensagem(''); setQuando(''); setAgendar(false);
      await loadOffers();
    } catch (e: any) {
      const msg = e.message === 'sem_instancia' ? 'Ative a captura (instância) primeiro.' : e.message === 'grupo_invalido' ? 'Grupo inválido.' : e.message === 'falha_envio' ? 'Falha ao enviar ao grupo.' : (e.message || e);
      toast.error('Erro: ' + msg);
    } finally { setBusy(false); }
  }
  async function del(id: string) {
    setBusy(true);
    try { await farmaquiApi.deleteGroupOffer(id); await loadOffers(); } catch { /* ignore */ } finally { setBusy(false); }
  }

  return (
    <div className="card" style={{ marginTop: '1.25rem' }}>
      <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}><i className="fa-solid fa-bullhorn" style={{ color: TEAL }} /> Ofertas no grupo do WhatsApp</div>
      <p style={{ margin: '2px 0 14px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Envie uma oferta para um grupo agora ou agende para depois. Usa a mesma instância da captura.</p>

      {!temInstancia ? (
        <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 12, padding: 14, fontSize: '0.9rem' }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ color: '#fbbf24' }} /> Ative a captura de leads acima (vincula a instância) para poder enviar ao grupo.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          <div>
            <label className="config-label">Grupo</label>
            {grupos === null ? <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Carregando grupos…</p>
              : grupos.length === 0 ? <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Nenhum grupo encontrado nessa instância. (A conta precisa participar de algum grupo.)</p>
              : (
                <select className="config-select" value={grupoJid} onChange={(e) => setGrupoJid(e.target.value)}>
                  <option value="">-- Escolha um grupo --</option>
                  {grupos.map((g) => <option key={g.id} value={g.id}>{g.subject}{g.size ? ` (${g.size})` : ''}</option>)}
                </select>
              )}
          </div>
          <div>
            <label className="config-label">Mensagem da oferta</label>
            <textarea className="config-input" style={{ minHeight: 90, resize: 'vertical', fontFamily: 'inherit' }} value={mensagem} onChange={(e) => setMensagem(e.target.value)} placeholder="Ex.: 🔥 Hoje: 20% OFF em vitaminas! Só chamar aqui." />
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={agendar} onChange={(e) => setAgendar(e.target.checked)} /> Agendar envio
            </label>
            {agendar && <input type="datetime-local" className="config-input" style={{ width: 'auto' }} value={quando} onChange={(e) => setQuando(e.target.value)} />}
            <div style={{ marginLeft: 'auto' }}>
              <button className="btn-primary" style={{ background: TEAL }} disabled={busy || !grupoJid} onClick={enviar}>
                {busy ? '...' : agendar ? <><i className="fa-solid fa-clock" /> Agendar</> : <><i className="fa-solid fa-paper-plane" /> Enviar agora</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {offers.length > 0 && (
        <div style={{ marginTop: 16, borderTop: '1px solid var(--border-color)', paddingTop: 14 }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-muted)' }}>Histórico / agendadas</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {offers.map((o) => (
              <div key={o.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '10px 12px', background: 'rgba(23, 37, 28, 0.03)', border: '1px solid var(--border-color)', borderRadius: 10 }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{o.grupoNome || 'Grupo'} <span className={`badge ${o.done ? 'success' : 'warning'}`} style={{ marginLeft: 6 }}>{o.done ? 'Enviada' : 'Agendada'}</span></div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.mensagem}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{o.runAt ? new Date(o.runAt).toLocaleString('pt-BR') : ''}</div>
                </div>
                {!o.done && <button className="btn-secondary" style={{ padding: '6px 10px', color: '#f87171', borderColor: 'rgba(239,68,68,0.35)' }} disabled={busy} onClick={() => del(o.id)}><i className="fa-solid fa-xmark" /></button>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LandingBuilder() {
  const [l, setL] = useState<any>(null);
  const [busy, setBusy] = useState(false);
  const [sub, setSub] = useState('');
  useEffect(() => { farmaquiApi.getLanding().then((d) => { setL(d); setSub((d.host || '').replace('.autoqui.com.br', '')); }).catch(() => {}); }, []);
  if (!l) return null;

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
    <div className="card" style={{ marginTop: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div>
          <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}><i className="fa-solid fa-globe" style={{ color: TEAL }} /> Landing page (campanhas / Google Ads)</div>
          <p style={{ margin: '2px 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Uma página pronta pra divulgar, com botão que leva direto pro seu WhatsApp.</p>
        </div>
        <label className="cfg-switch"><input type="checkbox" checked={l.publicado} onChange={(e) => set('publicado', e.target.checked)} /><span className="cfg-slider" /></label>
      </div>

      <div style={{ marginTop: 14, display: 'grid', gap: 12 }}>
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
  );
}
