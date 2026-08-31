import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dbService } from '../../services/db';
import { farmaquiApi } from '../../services/farmaquiApi';
import { toast } from '../../services/toast';
import { confirm } from '../../services/confirm';
import { useAuth } from '../useAuth';
import { SkeletonCards } from '../components/Skeleton';

const TEAL = 'var(--primary-hover)';

export function FarmaQui() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<{ ativa: boolean; instancia: string }>({ ativa: false, instancia: '' });
  const [instances, setInstances] = useState<any[]>([]);
  const [sel, setSel] = useState('');
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<'captacao' | 'importar'>('captacao');

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
    <div>
      <div className="page-heading">
        <h1>FarmaQui · Ajustes</h1>
        <p>Configure a captura automática de leads e importe contatos de grupos ou da agenda.</p>
      </div>

      <div className="manage-tabs" style={{ marginBottom: 20 }}>
        {([['captacao', 'Captação', 'fa-user-plus'], ['importar', 'Importar', 'fa-file-import']] as const).map(([k, label, icon]) => (
          <button key={k} className={'manage-tab' + (tab === k ? ' active' : '')} onClick={() => setTab(k)}>
            <i className={`fa-solid ${icon}`} /> <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Captura de leads */}
      {tab === 'captacao' && (
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', background: status.ativa ? 'rgba(16,185,129,0.12)' : 'rgba(132,204,22,0.12)', color: status.ativa ? '#34d399' : TEAL }}>
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
      )}

      {tab === 'importar' && <ImportLeads />}
    </div>
  );
}

// Página: Automações (menu FarmaQui › Automações) — recompra, aniversário e reativação.
export function FarmaQuiRecompra() {
  return (
    <div>
      <div className="page-heading">
        <h1>FarmaQui · Automações</h1>
        <p>Mensagens automáticas que mantêm o cliente por perto: recompra, aniversário e reativação.</p>
      </div>
      <RecompraConfig />
      <Automacoes />
      <RecompraQueue />
    </div>
  );
}

// Automações de relacionamento: aniversário e reativação (win-back).
function Automacoes() {
  const [aniv, setAniv] = useState({ enabled: false, mensagem: '' });
  const [reat, setReat] = useState({ enabled: false, dias: 60, mensagem: '' });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    farmaquiApi.config().then((c) => { if (c.automacoes) { setAniv(c.automacoes.aniversario); setReat(c.automacoes.reativacao); } setLoading(false); }).catch(() => setLoading(false));
  }, []);

  async function save() {
    if (aniv.enabled && !aniv.mensagem.trim()) { toast.warning('Escreva a mensagem de aniversário.'); return; }
    if (reat.enabled && !reat.mensagem.trim()) { toast.warning('Escreva a mensagem de reativação.'); return; }
    setBusy(true);
    try { await farmaquiApi.saveAutomacoes({ aniversario: aniv, reativacao: reat }); toast.success('Automações salvas!'); }
    catch (e: any) { toast.error('Erro: ' + (e.message || e)); }
    finally { setBusy(false); }
  }
  if (loading) return null;

  return (
    <div className="card" style={{ marginTop: '1.25rem' }}>
      <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><i className="fa-solid fa-wand-magic-sparkles" style={{ color: TEAL }} /> Automações de relacionamento</div>
      <p style={{ margin: '0 0 16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Disparadas sozinhas todo dia. Só valem para quem não pediu descadastro.</p>

      {/* Aniversário */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}><i className="fa-solid fa-cake-candles" style={{ color: TEAL }} /> Aniversário</div>
            <p style={{ margin: '2px 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Manda uma mensagem no dia do aniversário do cliente (precisa ter a data cadastrada).</p>
          </div>
          <label className="cfg-switch"><input type="checkbox" checked={aniv.enabled} onChange={(e) => setAniv({ ...aniv, enabled: e.target.checked })} /><span className="cfg-slider" /></label>
        </div>
        {aniv.enabled && (
          <div style={{ marginTop: 12 }}>
            <label className="config-label">Mensagem</label>
            <textarea className="config-input" style={{ minHeight: 80, resize: 'vertical', fontFamily: 'inherit' }} value={aniv.mensagem} onChange={(e) => setAniv({ ...aniv, mensagem: e.target.value })} />
            <small style={{ color: 'var(--text-dim)' }}>Use {'{{nome}}'} para o nome do cliente.</small>
          </div>
        )}
      </div>

      {/* Reativação */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, marginTop: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}><i className="fa-solid fa-heart-pulse" style={{ color: TEAL }} /> Reativação (win-back)</div>
            <p style={{ margin: '2px 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Reconquista quem sumiu: manda uma mensagem para clientes inativos há um tempo.</p>
          </div>
          <label className="cfg-switch"><input type="checkbox" checked={reat.enabled} onChange={(e) => setReat({ ...reat, enabled: e.target.checked })} /><span className="cfg-slider" /></label>
        </div>
        {reat.enabled && (
          <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
            <div style={{ maxWidth: 240 }}>
              <label className="config-label">Inativo há</label>
              <select className="config-select" style={{ width: '100%' }} value={reat.dias} onChange={(e) => setReat({ ...reat, dias: Number(e.target.value) })}>
                <option value={30}>30 dias</option><option value={45}>45 dias</option><option value={60}>60 dias</option><option value={90}>90 dias</option>
              </select>
            </div>
            <div>
              <label className="config-label">Mensagem</label>
              <textarea className="config-input" style={{ minHeight: 80, resize: 'vertical', fontFamily: 'inherit' }} value={reat.mensagem} onChange={(e) => setReat({ ...reat, mensagem: e.target.value })} />
              <small style={{ color: 'var(--text-dim)' }}>Use {'{{nome}}'} para o nome do cliente. Enviada no máximo 1x por mês por cliente.</small>
            </div>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'right', marginTop: 16 }}><button className="btn-primary" disabled={busy} onClick={save} style={{ background: TEAL }}>{busy ? 'Salvando...' : 'Salvar automações'}</button></div>
    </div>
  );
}

// Página: Ofertas no grupo (menu FarmaQui › Ofertas no grupo).
export function FarmaQuiGrupo() {
  return (
    <div>
      <div className="page-heading">
        <h1>FarmaQui · Ofertas no grupo</h1>
        <p>Envie ofertas para um grupo do WhatsApp agora ou agende para depois.</p>
      </div>
      <GroupOffers />
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
// ── Importar leads (grupos / agenda) ──
function ImportLeads() {
  const [grupos, setGrupos] = useState<{ id: string; subject: string; size?: number }[] | null>(null);
  const [temInstancia, setTemInstancia] = useState(true);
  const [grupoJid, setGrupoJid] = useState('');
  const [busy, setBusy] = useState('');

  useEffect(() => {
    farmaquiApi.groups().then((r) => { setTemInstancia(!!r.instancia); setGrupos(r.grupos || []); }).catch(() => setGrupos([]));
  }, []);

  async function extrairGrupo() {
    if (!grupoJid) { toast.warning('Escolha um grupo.'); return; }
    const nome = grupos?.find((g) => g.id === grupoJid)?.subject || 'grupo';
    const ok = await confirm.warning('Extrair leads do grupo', `Adicionar os participantes de "${nome}" como leads? Contatos que já são leads são ignorados.`);
    if (!ok) return;
    setBusy('grupo');
    try { const r = await farmaquiApi.extractGroup(grupoJid); toast.success(`${r.criados} novo(s) lead(s) de ${r.total} participante(s).`); }
    catch (e: any) { toast.error('Erro: ' + (e.message === 'sem_instancia' ? 'Ative a captura primeiro.' : e.message || e)); }
    finally { setBusy(''); }
  }
  async function extrairAgenda() {
    const ok = await confirm.show({
      title: 'Importar agenda inteira',
      message: 'Isso adiciona TODOS os contatos salvos no WhatsApp como leads. Só faça isso com contatos que consentiram receber suas mensagens (LGPD) — importar e disparar para quem não te conhece pode causar bloqueio do número. Deseja continuar?',
      type: 'danger', confirmText: 'Sim, importar', cancelText: 'Cancelar',
    });
    if (!ok) return;
    setBusy('agenda');
    try { const r = await farmaquiApi.extractAgenda(); toast.success(`${r.criados} novo(s) lead(s) de ${r.total} contato(s) da agenda.`); }
    catch (e: any) { toast.error('Erro: ' + (e.message === 'sem_instancia' ? 'Ative a captura primeiro.' : e.message || e)); }
    finally { setBusy(''); }
  }

  if (!temInstancia) return (
    <div className="card">
      <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 12, padding: 14, fontSize: '0.9rem' }}>
        <i className="fa-solid fa-triangle-exclamation" style={{ color: '#fbbf24' }} /> Ative a captura de leads na aba <strong>Captação</strong> (vincula a instância) para poder importar.
      </div>
    </div>
  );

  return (
    <>
      <div className="card">
        <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><i className="fa-solid fa-users" style={{ color: TEAL }} /> Extrair leads de um grupo</div>
        <p style={{ margin: '0 0 14px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Adiciona os participantes de um grupo do WhatsApp como leads (ignora quem já é lead).</p>
        {grupos === null ? <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Carregando grupos…</p>
          : grupos.length === 0 ? <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Nenhum grupo encontrado nessa instância.</p>
          : (
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 220 }}>
                <label className="config-label">Grupo</label>
                <select className="config-select" value={grupoJid} onChange={(e) => setGrupoJid(e.target.value)}>
                  <option value="">-- Escolha um grupo --</option>
                  {grupos.map((g) => <option key={g.id} value={g.id}>{g.subject}{g.size ? ` (${g.size})` : ''}</option>)}
                </select>
              </div>
              <button className="btn-primary" style={{ background: TEAL }} disabled={busy === 'grupo' || !grupoJid} onClick={extrairGrupo}>{busy === 'grupo' ? 'Extraindo...' : <><i className="fa-solid fa-file-import" /> Extrair</>}</button>
            </div>
          )}
      </div>

      <div className="card" style={{ marginTop: '1.25rem' }}>
        <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><i className="fa-solid fa-address-book" style={{ color: TEAL }} /> Importar agenda inteira</div>
        <p style={{ margin: '0 0 12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Traz todos os contatos salvos na conta de WhatsApp como leads.</p>
        <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: 12, fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 12 }}>
          <i className="fa-solid fa-shield-halved" style={{ color: '#f87171', marginRight: 6 }} /> <strong>Atenção (LGPD):</strong> só dispare mensagens para quem consentiu. Importar e enviar em massa para desconhecidos pode bloquear seu número no WhatsApp.
        </div>
        <div style={{ textAlign: 'right' }}>
          <button className="btn-secondary" disabled={busy === 'agenda'} onClick={extrairAgenda}>{busy === 'agenda' ? 'Importando...' : <><i className="fa-solid fa-address-book" /> Importar agenda</>}</button>
        </div>
      </div>
    </>
  );
}

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
    <>
    <div className="card">
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

    </div>

    {/* Lista de ofertas programadas / enviadas */}
    <div className="card" style={{ marginTop: '1.25rem' }}>
      <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}><i className="fa-solid fa-list-check" style={{ color: TEAL }} /> Ofertas programadas</div>
      {offers.length === 0 ? (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Nenhuma oferta programada ou enviada ainda.</p>
      ) : (
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
      )}
    </div>
    </>
  );
}

