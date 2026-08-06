import { useEffect, useMemo, useState } from 'react';
import { Timestamp, collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { dbService } from '../../../services/db';
import { toast } from '../../../services/toast';
import { confirm } from '../../../services/confirm';
import { useAuth } from '../../useAuth';
import { formatActivityDate, resolveTimestampMs } from './helpers';

export function Campaigns() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';

  const [company, setCompany] = useState<any>(null);
  const [instances, setInstances] = useState<any[]>([]);
  const [allLeads, setAllLeads] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [tab, setTab] = useState<'nova' | 'historico'>('nova');
  const [detail, setDetail] = useState<any | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const [c, inst, leads] = await Promise.all([
        dbService.get('companies', companyId),
        dbService.getAll('instancias', { field: 'empresaId', operator: '==', value: companyId }),
        dbService.getAll('leads', { field: 'empresaId', operator: '==', value: companyId }),
      ]);
      setCompany(c);
      setInstances(inst as any[]);
      setAllLeads(leads as any[]);
      setLoaded(true);
    })();
  }, [companyId]);

  useEffect(() => {
    if (!companyId) return;
    const q = query(collection(db, 'campanhas'), where('cliente_id', '==', companyId));
    const unsub = onSnapshot(q, (snap) => setCampaigns(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
    return unsub;
  }, [companyId]);

  if (!companyId) return <p>Usuário sem empresa.</p>;

  return (
    <div className="campaign-container">
      <div className="page-header" style={{ flexDirection: 'column' }}>
        <div><h2 className="page-title">Disparo em Massa</h2></div>
        <div><p className="page-description" style={{ color: 'var(--text-muted)' }}>Envie mensagens personalizadas para seus leads de forma estratégica.</p></div>
      </div>

      <div className="campaign-tabs">
        <button className={'tab-btn' + (tab === 'nova' ? ' active' : '')} onClick={() => setTab('nova')}><i className="fa-solid fa-plus-circle" style={{ marginRight: 6 }} />Nova Campanha</button>
        <button className={'tab-btn' + (tab === 'historico' ? ' active' : '')} onClick={() => setTab('historico')}><i className="fa-solid fa-history" style={{ marginRight: 6 }} />Histórico</button>
      </div>

      {tab === 'nova'
        ? <NovaCampanha company={company} instances={instances} allLeads={allLeads} companyId={companyId} loaded={loaded} />
        : <Historico campaigns={campaigns} instances={instances} onDetail={setDetail} />}

      {detail && <DetailModal campaign={detail} onClose={() => setDetail(null)} />}
    </div>
  );
}

const VARS = [
  { key: '{{nome}}', label: 'Nome', icon: 'fa-user' },
  { key: '{{telefone}}', label: 'Telefone', icon: 'fa-phone' },
  { key: '{{endereco}}', label: 'Endereço', icon: 'fa-location-dot' },
];
const PAGE_SIZE = 15;

function NovaCampanha({ company, instances, allLeads, companyId, loaded }: { company: any; instances: any[]; allLeads: any[]; companyId: string; loaded: boolean }) {
  const [name, setName] = useState('');
  const [instanceId, setInstanceId] = useState('');
  const [search, setSearch] = useState('');
  const [storeFilter, setStoreFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [activityFilter, setActivityFilter] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [messages, setMessages] = useState<string[]>(['']);
  const [delayMin, setDelayMin] = useState('20');
  const [delayMax, setDelayMax] = useState('60');
  const [sendMode, setSendMode] = useState<'now' | 'scheduled'>('now');
  const [scheduleDt, setScheduleDt] = useState('');
  const [busy, setBusy] = useState(false);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    const days = parseInt(activityFilter || '0');
    const cutoff = days > 0 ? Date.now() - days * 86400000 : null;
    return allLeads.filter((l) => {
      const matchSearch = !term || (l.nome || '').toLowerCase().includes(term) || (l.telefone || '').includes(term);
      const matchStore = !storeFilter || l.lojaId === storeFilter;
      const matchStatus = !statusFilter || (l.statusLead || 'novo') === statusFilter;
      let matchAct = true;
      if (cutoff !== null) { const ms = resolveTimestampMs(l.updatedAt || l.criadoEm || l.createdAt); matchAct = ms !== null && ms >= cutoff; }
      return matchSearch && matchStore && matchStatus && matchAct;
    });
  }, [allLeads, search, storeFilter, statusFilter, activityFilter]);

  useEffect(() => { setPage(1); }, [search, storeFilter, statusFilter, activityFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageLeads = filtered.slice(start, start + PAGE_SIZE);
  const storeName = (id: string) => company?.stores?.find((s: any) => s.id === id)?.name || 'N/A';

  const toggleLead = (id: string) => setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const allPageChecked = pageLeads.length > 0 && pageLeads.every((l) => selected.has(l.id));
  const toggleAllPage = (check: boolean) => setSelected((prev) => { const n = new Set(prev); pageLeads.forEach((l) => check ? n.add(l.id) : n.delete(l.id)); return n; });

  const setMsg = (i: number, v: string) => setMessages((prev) => prev.map((m, idx) => idx === i ? v : m));
  const removeMsg = (i: number) => setMessages((prev) => prev.filter((_, idx) => idx !== i));
  const dropVar = (i: number, e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const v = e.dataTransfer.getData('text/plain');
    if (!v) return;
    const el = e.currentTarget; const s = el.selectionStart, en = el.selectionEnd;
    setMsg(i, messages[i].slice(0, s) + v + messages[i].slice(en));
  };

  const selectedInst = instances.find((x) => x.id === instanceId);
  const instConnected = selectedInst && (selectedInst.status === 'conectado' || selectedInst.status === 'open');
  const scheduleOk = sendMode === 'now' || (!!scheduleDt && new Date(scheduleDt).getTime() > Date.now());
  const valid = !!instanceId && instConnected && selected.size > 0 && messages.every((m) => m.trim()) && scheduleOk;

  const minDt = useMemo(() => { const d = new Date(); d.setMinutes(d.getMinutes() + 5); const p = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`; }, []);

  async function startCampaign() {
    const isScheduled = sendMode === 'scheduled';
    const scheduledAt = isScheduled ? new Date(scheduleDt) : new Date();
    const msg = isScheduled
      ? `Confirma o agendamento para ${scheduledAt.toLocaleString('pt-BR')} com ${selected.size} leads?`
      : `Deseja iniciar o disparo imediato para ${selected.size} leads com ${messages.length} variações de mensagem?`;
    const ok = await confirm.warning(isScheduled ? 'Agendar Campanha' : 'Iniciar Campanha', msg);
    if (!ok) return;
    setBusy(true);
    try {
      await dbService.create('campanhas', {
        cliente_id: companyId, instancia_id: instanceId,
        nome: name.trim() || `Campanha MB ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
        mensagens: messages, total_leads: selected.size, lead_ids: Array.from(selected),
        enviados: 0, falhas: 0, status: 'agendada', agendamento_imediato: !isScheduled,
        data_agendamento: Timestamp.fromDate(scheduledAt), data_inicio: null,
        config: { delay_min: parseInt(delayMin || '20'), delay_max: parseInt(delayMax || '60') },
      });
      toast.success(isScheduled ? 'Campanha agendada com sucesso!' : 'Campanha criada! O disparo será iniciado em instantes.');
      // reset
      setName(''); setInstanceId(''); setSelected(new Set()); setMessages(['']); setSendMode('now'); setScheduleDt('');
    } catch (e) { toast.error('Erro ao salvar campanha: ' + e); }
    finally { setBusy(false); }
  }

  return (
    <>
      {/* Passo 1 */}
      <div className="card step-card">
        <div className="step-header"><div className="step-number">1</div> <span>Dados Campanha</span></div>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Nome da Campanha</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Ex: Promoção de Fevereiro, Leads Inativos..." maxLength={80} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Selecione a instância de WhatsApp</label>
          <select value={instanceId} onChange={(e) => setInstanceId(e.target.value)} className="form-control">
            <option value="">Selecione uma instância disponível...</option>
            {instances.map((inst) => {
              const store = company?.stores?.find((s: any) => s.instancia_id === inst.id);
              const conn = inst.status === 'conectado' || inst.status === 'open';
              return <option key={inst.id} value={inst.id} disabled={!!store}>{inst.nome} {conn ? '✓' : '✕'} {store ? `(EM USO: ${store.name})` : ''}</option>;
            })}
          </select>
          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: 8, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <i className="fa-solid fa-circle-info" style={{ marginTop: 3, color: 'var(--primary)' }} />
            <span>Importante: instâncias já vinculadas a uma loja estão protegidas e não podem ser usadas em disparos em massa para evitar bloqueios no número oficial.</span>
          </div>
        </div>
      </div>

      {/* Passo 2 */}
      <div className="card step-card">
        <div className="step-header"><div className="step-number">2</div> <span>Público Alvo</span></div>
        <div className="leads-selection-table-wrap">
          <div className="leads-table-filters">
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="form-control" placeholder="Buscar por nome ou telefone..." />
            <select value={storeFilter} onChange={(e) => setStoreFilter(e.target.value)} className="form-control"><option value="">Todas as Lojas</option>{company?.stores?.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="form-control"><option value="">Todos os Status</option><option value="novo">Novo</option><option value="cliente_ativo">Cliente Ativo</option><option value="lead_frio">Lead Frio</option></select>
            <select value={activityFilter} onChange={(e) => setActivityFilter(e.target.value)} className="form-control"><option value="">Qualquer atividade</option><option value="7">Últimos 7 dias</option><option value="15">Últimos 15 dias</option><option value="30">Últimos 30 dias</option><option value="90">Últimos 90 dias</option></select>
          </div>
          <div className="leads-table-content">
            <table className="cmp-leads-table">
              <thead><tr><th style={{ width: 40 }}><input type="checkbox" checked={allPageChecked} onChange={(e) => toggleAllPage(e.target.checked)} /></th><th>Nome</th><th>WhatsApp</th><th>Loja</th><th>Status</th><th>Última Atividade</th></tr></thead>
              <tbody>
                {!loaded ? <tr><td colSpan={6} style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>Carregando...</td></tr>
                  : pageLeads.length === 0 ? <tr><td colSpan={6} style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>Nenhum lead encontrado.</td></tr>
                  : pageLeads.map((l) => {
                    const act = formatActivityDate(l.updatedAt || l.criadoEm || l.createdAt);
                    return (
                      <tr key={l.id}>
                        <td><input type="checkbox" checked={selected.has(l.id)} onChange={() => toggleLead(l.id)} /></td>
                        <td>{l.nome || 'Sem nome'}</td>
                        <td>{(l.telefone || '').split('@')[0]}</td>
                        <td><span className="badge secondary" style={{ fontSize: '0.7rem' }}>{storeName(l.lojaId)}</span></td>
                        <td><span className={`badge ${l.statusLead === 'cliente_ativo' ? 'success' : 'secondary'}`} style={{ fontSize: '0.7rem' }}>{l.statusLead || 'novo'}</span></td>
                        <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.78rem' }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: act.color }} /><span style={{ color: act.color, fontWeight: 600 }}>{act.label}</span></span></td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="leads-pagination">
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{filtered.length === 0 ? 'Mostrando 0 de 0' : `Mostrando ${start + 1}-${Math.min(start + PAGE_SIZE, filtered.length)} de ${filtered.length}`}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-secondary" style={{ padding: '4px 10px' }} disabled={page === 1} onClick={() => setPage((p) => p - 1)}><i className="fa-solid fa-chevron-left" /></button>
              <button className="btn-secondary" style={{ padding: '4px 10px' }} disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}><i className="fa-solid fa-chevron-right" /></button>
            </div>
          </div>
        </div>
        <div className="leads-counter-card">
          <div className="leads-count-info">
            <div className="leads-count-icon"><i className="fa-solid fa-users" /></div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}><span>{selected.size}</span> Leads Selecionados</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estes contatos receberão suas mensagens.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Passo 3 */}
      <div className="card step-card">
        <div className="step-header"><div className="step-number">3</div> <span>Composição da Mensagem</span></div>
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Variáveis (arraste para a mensagem):</span>
          <div className="cmp-var-grid">
            {VARS.map((v) => <div key={v.key} className="cmp-var-chip" draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', v.key)}><i className={`fa-solid ${v.icon}`} /> {v.label}</div>)}
          </div>
        </div>
        <div>
          {messages.map((m, i) => (
            <div key={i} className="message-block">
              <div className="message-block-header">
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>MENSAGEM #{i + 1}</span>
                {messages.length > 1 && <button className="btn-remove-msg" onClick={() => removeMsg(i)}><i className="fa-solid fa-trash-can" /> Remover</button>}
              </div>
              <textarea className="form-control" rows={5} placeholder="Digite sua mensagem aqui..." value={m}
                onChange={(e) => setMsg(i, e.target.value)} onDragOver={(e) => e.preventDefault()} onDrop={(e) => dropVar(i, e)} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 5 }}><span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{m.length} caracteres</span></div>
            </div>
          ))}
        </div>
        <button className="btn-add-msg" onClick={() => setMessages((prev) => [...prev, ''])}><i className="fa-solid fa-plus-circle" /> Adicionar Alternativa de Mensagem</button>
      </div>

      {/* Passo 4 */}
      <div className="card step-card">
        <div className="step-header"><div className="step-number">4</div> <span>Configurações Inteligentes</span></div>
        <div className="delay-inputs">
          <div className="delay-box"><label>Intervalo Mínimo (segundos)</label><input type="number" value={delayMin} onChange={(e) => setDelayMin(e.target.value)} className="form-control" min="5" /></div>
          <div className="delay-box"><label>Intervalo Máximo (segundos)</label><input type="number" value={delayMax} onChange={(e) => setDelayMax(e.target.value)} className="form-control" min="10" /></div>
        </div>
        <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(245,158,11,0.05)', borderRadius: 8, borderLeft: '4px solid #f59e0b' }}>
          <p style={{ fontSize: '0.85rem', color: '#b45309', margin: 0 }}><i className="fa-solid fa-triangle-exclamation" /> <strong>Dica Anti-Ban:</strong> use intervalos maiores (ex: 30-90s) para disparos acima de 50 contatos.</p>
        </div>
        <div style={{ marginTop: '1.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1rem' }}><i className="fa-solid fa-clock" /> Quando Enviar?</div>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <button className={'schedule-toggle' + (sendMode === 'now' ? ' active' : '')} onClick={() => setSendMode('now')}><i className="fa-solid fa-bolt" /> Agora</button>
            <button className={'schedule-toggle' + (sendMode === 'scheduled' ? ' active' : '')} onClick={() => setSendMode('scheduled')}><i className="fa-solid fa-calendar" /> Agendar</button>
          </div>
          {sendMode === 'scheduled' && (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Data e Hora do Disparo</label>
              <input type="datetime-local" className="form-control" style={{ maxWidth: 320 }} min={minDt} value={scheduleDt} onChange={(e) => setScheduleDt(e.target.value)} />
              {!scheduleOk && scheduleDt && <div style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: '#ef4444' }}><i className="fa-solid fa-circle-exclamation" /> Selecione uma data e hora no futuro.</div>}
            </div>
          )}
        </div>
        <div style={{ marginTop: '2rem' }}>
          <button className="btn-primary full-width" disabled={!valid || busy} style={{ padding: '1rem', fontSize: '1.1rem', borderRadius: 12, justifyContent: 'center' }} onClick={startCampaign}>
            {busy ? <><i className="fa-solid fa-spinner fa-spin" /> Salvando...</> : sendMode === 'scheduled' ? <><i className="fa-solid fa-calendar" style={{ marginRight: 8 }} /> Agendar Campanha</> : <><i className="fa-solid fa-paper-plane" style={{ marginRight: 8 }} /> Iniciar Campanha Agora</>}
          </button>
        </div>
      </div>
    </>
  );
}

function Historico({ campaigns, instances, onDetail }: { campaigns: any[]; instances: any[]; onDetail: (c: any) => void }) {
  const sorted = [...campaigns].sort((a, b) => (b.data_agendamento?.seconds || b.data_inicio?.seconds || 0) - (a.data_agendamento?.seconds || a.data_inicio?.seconds || 0));

  async function cancel(id: string) {
    const ok = await confirm.danger('Cancelar Campanha', 'Você tem certeza que deseja cancelar esta campanha? Ela será interrompida e nenhum outro envio será feito.');
    if (!ok) return;
    try { await dbService.update('campanhas', id, { status: 'cancelada' }); toast.success('Campanha cancelada com sucesso.'); }
    catch { toast.error('Erro ao cancelar a campanha.'); }
  }

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>Campanha</th><th>Instância</th><th>Data</th><th>Público</th><th style={{ width: 150 }}>Progresso</th><th>Status</th><th>Ações</th></tr></thead>
          <tbody>
            {sorted.length === 0 ? <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Nenhuma campanha realizada ainda.</td></tr>
              : sorted.map((c) => {
                const progress = c.total_leads > 0 ? Math.round(((c.enviados + c.falhas) / c.total_leads) * 100) : 0;
                const scheduled = c.data_agendamento ? new Date(c.data_agendamento.seconds * 1000).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : null;
                const canCancel = ['processando', 'em_andamento', 'agendada'].includes(c.status);
                return (
                  <tr key={c.id}>
                    <td><div style={{ fontWeight: 700 }}>{c.nome || 'Campanha Sem Nome'}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.id.substring(0, 8)}...</div></td>
                    <td><span className="badge secondary"><i className="fa-brands fa-whatsapp" /> {instances.find((i) => i.id === c.instancia_id)?.nome || 'N/A'}</span></td>
                    <td>{scheduled ? <><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Agendado</div><div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>{scheduled}</div></> : (c.data_inicio ? new Date(c.data_inicio.seconds * 1000).toLocaleDateString() : '-')}</td>
                    <td><strong>{c.total_leads || 0}</strong></td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}><span style={{ color: '#22c55e' }}>{c.enviados || 0}</span><span style={{ color: '#ef4444' }}>{c.falhas || 0}</span></div>
                        <div style={{ width: '100%', height: 6, background: 'var(--surface-hover)', borderRadius: 3, overflow: 'hidden' }}><div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', borderRadius: 3 }} /></div>
                      </div>
                    </td>
                    <td><StatusBadge c={c} /></td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="action-btn" title="Ver detalhes" style={{ background: 'var(--primary)', width: 32, height: 32 }} onClick={() => onDetail(c)}><i className="fa-solid fa-eye" style={{ color: '#fff' }} /></button>
                        {canCancel && <button className="action-btn" title="Cancelar campanha" style={{ background: 'var(--danger)', width: 32, height: 32 }} onClick={() => cancel(c.id)}><i className="fa-solid fa-ban" style={{ color: '#fff' }} /></button>}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ c }: { c: any }) {
  if (c.status === 'em_andamento' || c.status === 'processando') return <span className="badge warning"><i className="fa-solid fa-spinner fa-spin" /> Em andamento</span>;
  if (c.status === 'finalizada' || c.status === 'finalizado') return <span className="badge success"><i className="fa-solid fa-check-circle" /> Finalizada</span>;
  if (c.status === 'agendada' && c.agendamento_imediato) return <span className="badge warning"><i className="fa-solid fa-hourglass-end" /> Aguardando envio</span>;
  if (c.status === 'agendada') return <span className="badge primary"><i className="fa-solid fa-calendar" /> Agendada</span>;
  return <span className="badge secondary">Cancelada</span>;
}

function DetailModal({ campaign: c, onClose }: { campaign: any; onClose: () => void }) {
  const progress = c.total_leads > 0 ? Math.round(((c.enviados + c.falhas) / c.total_leads) * 100) : 0;
  const msgs = c.mensagens?.length ? c.mensagens : (c.mensagem ? [c.mensagem] : ['(sem mensagem)']);
  const inicio = c.data_inicio ? new Date(c.data_inicio.seconds * 1000).toLocaleString() : (c.data_agendamento ? new Date(c.data_agendamento.seconds * 1000).toLocaleString() : '—');
  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content glass" style={{ maxWidth: 850 }}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2rem' }}>
          <div style={{ width: 48, height: 48, background: 'var(--primary)', color: 'white', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}><i className="fa-solid fa-bullhorn" /></div>
          <div><h3 style={{ margin: 0 }}>{c.nome || 'Detalhes da Campanha'}</h3><p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Iniciada em {inicio}</p></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <Stat label="Público Total" value={c.total_leads} />
          <Stat label="Sucesso" value={c.enviados} color="#22c55e" />
          <Stat label="Falhas" value={c.falhas} color="#ef4444" />
          <div className="card" style={{ padding: '1rem', textAlign: 'center' }}><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Status</div><span className="badge warning" style={{ fontSize: '0.8rem' }}>{String(c.status).toUpperCase()}</span></div>
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}><span>Progresso do Envio</span><span>{progress}%</span></div>
          <div style={{ width: '100%', height: 12, background: 'var(--surface-hover)', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--border-color)' }}><div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary) 0%, #818cf8 100%)', borderRadius: 6 }} /></div>
        </div>
        <div className="card" style={{ background: 'var(--surface-hover)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem', fontWeight: 600 }}><i className="fa-solid fa-message" style={{ color: 'var(--primary)' }} /> Variações de Mensagem <span className="badge secondary" style={{ fontSize: '0.75rem' }}>{msgs.filter(Boolean).length}</span></div>
          {msgs.map((m: string, idx: number) => (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}><i className="fa-solid fa-comment" /> Mensagem #{idx + 1}</div>
              <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.92rem', lineHeight: 1.65 }}>{m}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: any; color?: string }) {
  return <div className="card" style={{ padding: '1rem', textAlign: 'center' }}><div style={{ fontSize: '0.75rem', color: color || 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{label}</div><div style={{ fontSize: '1.5rem', fontWeight: 700, color: color || 'var(--text-main)' }}>{value ?? 0}</div></div>;
}
