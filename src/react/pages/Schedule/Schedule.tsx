import { useEffect, useMemo, useState } from 'react';
import { dbService } from '../../../services/db';
import { dataApi } from '../../../services/dataApi';
import { toast } from '../../../services/toast';
import { confirm } from '../../../services/confirm';
import { useAuth } from '../../useAuth';
import { SkeletonCards } from '../../components/Skeleton';

interface Appointment {
  id: string; companyId: string; clienteId?: string; clientName: string; clientPhone: string;
  serviceId: string; serviceName: string; servicePrice: number;
  date: string; time: string; duration: number;
  status: 'agendado' | 'confirmado' | 'concluido' | 'cancelado'; notes?: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  agendado: { label: 'Agendado', color: '#6366f1', icon: 'fa-clock' },
  confirmado: { label: 'Confirmado', color: '#10b981', icon: 'fa-circle-check' },
  concluido: { label: 'Concluído', color: '#64748b', icon: 'fa-flag-checkered' },
  cancelado: { label: 'Cancelado', color: '#ef4444', icon: 'fa-ban' },
};
const pad = (n: number) => String(n).padStart(2, '0');
const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const formatDate = (s: string) => { const [y, m, d] = s.split('-'); return `${d}/${m}/${y}`; };
const formatPrice = (n: number) => (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const getDayName = (s: string) => dayNames[new Date(s + 'T12:00:00').getDay()];
const getMonthYear = (s: string) => { const d = new Date(s + 'T12:00:00'); return `${monthNames[d.getMonth()]} ${d.getFullYear()}`; };
const shift = (s: string, days: number) => { const d = new Date(s + 'T12:00:00'); d.setDate(d.getDate() + days); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const weekDays = (s: string) => { const base = new Date(s + 'T12:00:00'); const day = base.getDay(); const mon = new Date(base); mon.setDate(base.getDate() - ((day === 0 ? 7 : day) - 1)); return Array.from({ length: 7 }, (_, i) => { const d = new Date(mon); d.setDate(mon.getDate() + i); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }); };
const timeSlots = Array.from({ length: 28 }, (_, i) => `${pad(Math.floor(i / 2) + 8)}:${i % 2 === 0 ? '00' : '30'}`);

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.agendado;
  return <span className="sched-badge" style={{ background: cfg.color + '22', color: cfg.color, borderColor: cfg.color + '44' }}><i className={`fa-solid ${cfg.icon}`} /> {cfg.label}</span>;
}

export function Schedule() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';

  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(todayStr());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'list'>('day');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Appointment | null>(null);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const company = (await dbService.get('companies', companyId)) as any;
      const modulos = company?.modulos_ativos || [];
      if (!modulos.includes('agendamento')) { setEnabled(false); return; }
      setEnabled(true);
      const [prods, cli, appts] = await Promise.all([
        dbService.getAll('products', { field: 'companyId', operator: '==', value: companyId }),
        dbService.getAll('clientes', { field: 'companyId', operator: '==', value: companyId }),
        dbService.getAll('agendamentos', { field: 'companyId', operator: '==', value: companyId }),
      ]);
      setServices((prods as any[]).filter((p) => p.active !== false));
      const cliArr = (cli as any[]).sort((a, b) => (a.nome || '').localeCompare(b.nome || ''));
      setClientes(cliArr);
      setAppointments((appts as any[]).map((a) => {
        const c = cliArr.find((x) => x.id === a.clienteId);
        return { ...a, clientName: c?.nome || a.clientName || 'Cliente não identificado', clientPhone: c?.telefone || a.clientPhone || '—' };
      }));
    })();
  }, [companyId]);

  const dayAppts = useMemo(() => appointments.filter((a) => a.date === selectedDate).sort((a, b) => a.time.localeCompare(b.time)), [appointments, selectedDate]);

  async function setStatus(id: string, status: Appointment['status'], msg: string) {
    try {
      await dataApi.update('agendamentos', id, { status });
      setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
      toast.success(msg);
    } catch { toast.error('Erro ao atualizar.'); }
  }
  async function remove(id: string) {
    const ok = await confirm.danger('Excluir Agendamento', 'Deseja excluir este agendamento? Esta ação não pode ser desfeita.');
    if (!ok) return;
    try { await dataApi.remove('agendamentos', id); setAppointments((prev) => prev.filter((a) => a.id !== id)); toast.success('Agendamento excluído.'); }
    catch { toast.error('Erro ao excluir.'); }
  }
  function onSaved(appt: Appointment, isNew: boolean) {
    setAppointments((prev) => isNew ? [...prev, appt] : prev.map((a) => (a.id === appt.id ? appt : a)));
    setModalOpen(false); setEditing(null);
  }

  if (enabled === null) return <SkeletonCards count={3} lines={3} />;
  if (!companyId) return <p>Usuário sem empresa.</p>;
  if (!enabled) return (
    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
      <i className="fa-solid fa-calendar-xmark" style={{ fontSize: '3rem', color: 'var(--text-dim)', marginBottom: '1rem', display: 'block' }} />
      <h2>Módulo de Agendamento</h2>
      <p style={{ color: 'var(--text-muted)' }}>O módulo de IA Agendamento não está ativo para esta conta.<br />Entre em contato com o administrador para ativá-lo.</p>
    </div>
  );

  const actions = (a: Appointment) => (
    <>
      {a.status === 'agendado' && <button className="sched-action-btn confirm" title="Confirmar" onClick={() => setStatus(a.id, 'confirmado', 'Agendamento confirmado!')}><i className="fa-solid fa-check" /></button>}
      {a.status === 'confirmado' && <button className="sched-action-btn done" title="Concluir" onClick={() => setStatus(a.id, 'concluido', 'Agendamento concluído!')}><i className="fa-solid fa-flag-checkered" /></button>}
      <button className="sched-action-btn edit" title="Editar" onClick={() => { setEditing(a); setModalOpen(true); }}><i className="fa-solid fa-pen-to-square" /></button>
      <button className="sched-action-btn cancel" title="Excluir" onClick={() => remove(a.id)}><i className="fa-solid fa-trash" /></button>
    </>
  );

  return (
    <div>
      <div className="page-header" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 className="page-title" style={{ marginBottom: 4 }}><i className="fa-solid fa-calendar-alt" style={{ color: 'var(--primary)', marginRight: 10 }} />Agenda</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Gerencie os agendamentos dos seus clientes.</p>
        </div>
        <button className="btn-primary" onClick={() => { setEditing(null); setModalOpen(true); }}><i className="fa-solid fa-plus" /> Novo Agendamento</button>
      </div>

      <div className="sched-toolbar">
        <div className="sched-view-tabs">
          <button className={'sched-view-tab' + (viewMode === 'day' ? ' active' : '')} onClick={() => setViewMode('day')}><i className="fa-solid fa-calendar-day" /> Dia</button>
          <button className={'sched-view-tab' + (viewMode === 'week' ? ' active' : '')} onClick={() => setViewMode('week')}><i className="fa-solid fa-calendar-week" /> Semana</button>
          <button className={'sched-view-tab' + (viewMode === 'list' ? ' active' : '')} onClick={() => setViewMode('list')}><i className="fa-solid fa-list" /> Lista</button>
        </div>
        <input type="date" className="sched-date-jump" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} title="Ir para data" />
        <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.85rem' }} onClick={() => setSelectedDate(todayStr())}><i className="fa-solid fa-crosshairs" /> Hoje</button>
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        {viewMode === 'day' && (() => {
          const total = dayAppts.reduce((s, a) => s + (a.servicePrice || 0), 0);
          return (
            <>
              <div className="sched-day-header">
                <button className="sched-nav-btn" onClick={() => setSelectedDate((d) => shift(d, -1))}><i className="fa-solid fa-chevron-left" /></button>
                <div className="sched-day-info">
                  <span className="sched-day-name">{getDayName(selectedDate)}</span>
                  <span className="sched-day-date">{formatDate(selectedDate)}</span>
                  <span className="sched-day-month">{getMonthYear(selectedDate)}</span>
                </div>
                <button className="sched-nav-btn" onClick={() => setSelectedDate((d) => shift(d, 1))}><i className="fa-solid fa-chevron-right" /></button>
              </div>
              <div className="sched-stats-row">
                <div className="sched-stat"><i className="fa-solid fa-calendar-check" /> <strong>{dayAppts.length}</strong> agendamentos</div>
                <div className="sched-stat"><i className="fa-solid fa-dollar-sign" /> <strong>{formatPrice(total)}</strong> previsão</div>
                <div className="sched-stat"><i className="fa-solid fa-circle-check" style={{ color: '#10b981' }} /> <strong>{dayAppts.filter((a) => a.status === 'confirmado').length}</strong> confirmados</div>
              </div>
              <div className="sched-appointments-list">
                {dayAppts.length === 0 ? (
                  <div className="sched-empty">
                    <i className="fa-solid fa-calendar-xmark" />
                    <p>Nenhum agendamento para este dia.</p>
                    <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => { setEditing(null); setModalOpen(true); }}><i className="fa-solid fa-plus" /> Novo Agendamento</button>
                  </div>
                ) : dayAppts.map((a) => {
                  const cfg = STATUS_CONFIG[a.status] || STATUS_CONFIG.agendado;
                  return (
                    <div key={a.id} className="sched-card" style={{ borderLeftColor: cfg.color }}>
                      <div className="sched-card-time"><span className="sched-time">{a.time}</span><span className="sched-duration">{a.duration || 30}min</span></div>
                      <div className="sched-card-body">
                        <div className="sched-client"><i className="fa-solid fa-user" /><strong>{a.clientName}</strong><span className="sched-phone"><i className="fa-brands fa-whatsapp" /> {a.clientPhone}</span></div>
                        <div className="sched-service"><i className="fa-solid fa-list-check" /><span>{a.serviceName}</span><span className="sched-price">{formatPrice(a.servicePrice)}</span></div>
                        {a.notes && <div className="sched-notes"><i className="fa-solid fa-note-sticky" /> {a.notes}</div>}
                        <StatusBadge status={a.status} />
                      </div>
                      <div className="sched-card-actions">{actions(a)}</div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })()}

        {viewMode === 'week' && (() => {
          const days = weekDays(selectedDate);
          return (
            <>
              <div className="sched-week-header">
                <button className="sched-nav-btn" onClick={() => setSelectedDate((d) => shift(d, -7))}><i className="fa-solid fa-chevron-left" /></button>
                <span className="sched-week-label">Semana de {formatDate(days[0])} a {formatDate(days[6])}</span>
                <button className="sched-nav-btn" onClick={() => setSelectedDate((d) => shift(d, 7))}><i className="fa-solid fa-chevron-right" /></button>
              </div>
              <div className="sched-week-grid">
                {days.map((day) => {
                  const list = appointments.filter((a) => a.date === day).sort((a, b) => a.time.localeCompare(b.time));
                  return (
                    <div key={day} className={'sched-week-col' + (day === todayStr() ? ' today' : '') + (day === selectedDate ? ' selected' : '')} onClick={() => { setSelectedDate(day); setViewMode('day'); }}>
                      <div className="sched-week-col-header">
                        <span className="sched-wday">{getDayName(day)}</span>
                        <span className="sched-wdate">{day.split('-')[2]}</span>
                        {list.length > 0 && <span className="sched-wcount">{list.length}</span>}
                      </div>
                      <div className="sched-week-appts">
                        {list.map((a) => {
                          const cfg = STATUS_CONFIG[a.status] || STATUS_CONFIG.agendado;
                          return <div key={a.id} className="sched-week-item" style={{ borderLeftColor: cfg.color }} onClick={(e) => { e.stopPropagation(); setEditing(a); setModalOpen(true); }}><span className="sched-wtime">{a.time}</span><span className="sched-wclient">{a.clientName}</span></div>;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })()}

        {viewMode === 'list' && (() => {
          const sorted = [...appointments].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
          const upcoming = sorted.filter((a) => a.date >= todayStr() && a.status !== 'cancelado');
          const past = sorted.filter((a) => a.date < todayStr() || a.status === 'cancelado');
          return (
            <>
              <div className="sched-list-section">
                <div className="sched-list-title"><i className="fa-solid fa-clock" /> Próximos agendamentos ({upcoming.length})</div>
                {upcoming.length === 0 && <p style={{ color: 'var(--text-dim)', padding: '1rem' }}>Nenhum agendamento futuro.</p>}
                {upcoming.map((a) => (
                  <div key={a.id} className="sched-list-row">
                    <div className="sched-list-date"><span>{formatDate(a.date)}</span><span>{a.time}</span></div>
                    <div className="sched-list-info"><strong>{a.clientName}</strong><span>{a.serviceName}</span></div>
                    <div>{formatPrice(a.servicePrice)}</div>
                    <div><StatusBadge status={a.status} /></div>
                    <div className="sched-list-actions">
                      {a.status === 'agendado' && <button className="sched-action-btn confirm" title="Confirmar" onClick={() => setStatus(a.id, 'confirmado', 'Agendamento confirmado!')}><i className="fa-solid fa-check" /></button>}
                      <button className="sched-action-btn edit" title="Editar" onClick={() => { setEditing(a); setModalOpen(true); }}><i className="fa-solid fa-pen-to-square" /></button>
                      <button className="sched-action-btn cancel" title="Excluir" onClick={() => remove(a.id)}><i className="fa-solid fa-trash" /></button>
                    </div>
                  </div>
                ))}
              </div>
              {past.length > 0 && (
                <div className="sched-list-section" style={{ marginTop: '2rem', opacity: 0.7 }}>
                  <div className="sched-list-title"><i className="fa-solid fa-history" /> Histórico ({past.length})</div>
                  {past.slice(0, 10).map((a) => (
                    <div key={a.id} className="sched-list-row">
                      <div className="sched-list-date"><span>{formatDate(a.date)}</span><span>{a.time}</span></div>
                      <div className="sched-list-info"><strong>{a.clientName}</strong><span>{a.serviceName}</span></div>
                      <div>{formatPrice(a.servicePrice)}</div>
                      <div><StatusBadge status={a.status} /></div>
                      <div style={{ width: 60 }} />
                    </div>
                  ))}
                </div>
              )}
            </>
          );
        })()}
      </div>

      {modalOpen && (
        <ApptModal companyId={companyId} services={services} clientes={clientes} editing={editing} defaultDate={selectedDate}
          onClose={() => { setModalOpen(false); setEditing(null); }} onSaved={onSaved} />
      )}
    </div>
  );
}

function ApptModal({ companyId, services, clientes, editing, defaultDate, onClose, onSaved }: {
  companyId: string; services: any[]; clientes: any[]; editing: Appointment | null; defaultDate: string;
  onClose: () => void; onSaved: (a: Appointment, isNew: boolean) => void;
}) {
  const [clienteId, setClienteId] = useState(editing?.clienteId || '');
  const [serviceId, setServiceId] = useState(editing?.serviceId || '');
  const [date, setDate] = useState(editing?.date || defaultDate);
  const [time, setTime] = useState(editing?.time || '09:00');
  const [duration, setDuration] = useState(String(editing?.duration || 30));
  const [status, setStatus] = useState<Appointment['status']>(editing?.status || 'agendado');
  const [notes, setNotes] = useState(editing?.notes || '');
  const [saving, setSaving] = useState(false);

  function onService(id: string) {
    setServiceId(id);
    const s = services.find((x) => x.id === id);
    if (s?.duration) setDuration(String(s.duration));
  }

  async function save() {
    if (!clienteId) { toast.warning('Selecione um cliente.'); return; }
    if (!serviceId) { toast.warning('Selecione um serviço.'); return; }
    if (!date) { toast.warning('Informe a data.'); return; }
    const cli = clientes.find((c) => c.id === clienteId);
    const svc = services.find((s) => s.id === serviceId);
    const data: any = {
      companyId, clienteId, clientName: cli?.nome || '', clientPhone: cli?.telefone || '',
      serviceId, serviceName: svc?.name || '', servicePrice: svc?.price || 0,
      date, time, duration: parseInt(duration) || 30, status, notes: notes.trim() || undefined,
    };
    setSaving(true);
    try {
      if (editing) { await dataApi.update('agendamentos', editing.id, data); toast.success('Agendamento atualizado!'); onSaved({ id: editing.id, ...data }, false); }
      else { const { id: newId } = await dataApi.create('agendamentos', data); toast.success('Agendamento criado com sucesso!'); onSaved({ id: newId, ...data }, true); }
    } catch (err) { toast.error('Erro ao salvar agendamento: ' + err); setSaving(false); }
  }

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content glass" style={{ maxWidth: 560, width: '95%' }}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h2 style={{ marginBottom: '0.25rem' }}>{editing ? 'Editar Agendamento' : 'Novo Agendamento'}</h2>
        <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Preencha os dados do agendamento.</p>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label className="config-label">Cliente <span style={{ color: '#ef4444' }}>*</span></label>
            <select className="config-input" value={clienteId} onChange={(e) => setClienteId(e.target.value)}>
              <option value="">Selecione um cliente...</option>
              {clientes.map((c) => <option key={c.id} value={c.id}>{c.nome}{c.telefone ? ' — ' + c.telefone : ''}</option>)}
            </select>
            {clientes.length === 0 && <p style={{ fontSize: '0.8rem', color: '#f59e0b', marginTop: 4 }}><i className="fa-solid fa-triangle-exclamation" /> Nenhum cliente cadastrado. <a href="/schedule-clients" style={{ color: '#6366f1' }}>Cadastrar clientes</a></p>}
          </div>
          <div>
            <label className="config-label">Serviço</label>
            <select className="config-input" value={serviceId} onChange={(e) => onService(e.target.value)}>
              <option value="">Selecione um serviço...</option>
              {services.map((s) => <option key={s.id} value={s.id}>{s.name} — {formatPrice(s.price)}</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div><label className="config-label">Data</label><input type="date" className="config-input" value={date} onChange={(e) => setDate(e.target.value)} /></div>
            <div><label className="config-label">Horário</label><select className="config-input" value={time} onChange={(e) => setTime(e.target.value)}>{timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
          </div>
          <div><label className="config-label">Duração (minutos)</label><input type="number" className="config-input" value={duration} onChange={(e) => setDuration(e.target.value)} min="15" max="480" step="15" /></div>
          <div>
            <label className="config-label">Status</label>
            <select className="config-input" value={status} onChange={(e) => setStatus(e.target.value as any)}>
              <option value="agendado">⏰ Agendado</option><option value="confirmado">✅ Confirmado</option><option value="concluido">🏁 Concluído</option><option value="cancelado">❌ Cancelado</option>
            </select>
          </div>
          <div><label className="config-label">Observações</label><textarea className="config-input" rows={3} style={{ resize: 'vertical', height: 'auto' }} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Alguma informação extra..." /></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" style={{ minWidth: 140 }} disabled={saving} onClick={save}>{saving ? <><i className="fa-solid fa-spinner fa-spin" /> Salvando...</> : <><i className="fa-solid fa-save" /> Salvar</>}</button>
        </div>
      </div>
    </div>
  );
}
