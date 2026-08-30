import { useEffect, useRef, useState } from 'react';
import { dataApi } from '../../../services/dataApi';
import { toast } from '../../../services/toast';
import { confirm } from '../../../services/confirm';
import { notifications } from '../../../services/notifications';
import { LeadStatusBadge, AtendimentoBadge, formatDate, normAtend } from './helpers';
import { farmaquiApi } from '../../../services/farmaquiApi';

interface Props {
  lead: any;
  isOnlyCatalog: boolean;
  farmaqui?: boolean;
  onClose: () => void;
  onUpdated: (lead: any) => void;
}

export function LeadModal({ lead, isOnlyCatalog, farmaqui, onClose, onUpdated }: Props) {
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [busy, setBusy] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDoc = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [menuOpen]);

  const statusLead = (lead.statusLead || 'novo').toLowerCase();
  const statusAtend = normAtend((lead.statusAtendimento || 'bot').toLowerCase());
  const isBloqueado = statusLead === 'bloqueado';
  const phone = (lead.telefone || '').split('@')[0];

  async function update(fields: any, successMsg: string) {
    setBusy(true);
    try {
      await dataApi.update('leads', lead.id, fields);
      const merged = { ...lead, ...fields, updatedAt: new Date() };
      toast.success(successMsg);
      onUpdated(merged);
    } catch {
      toast.error('Erro ao atualizar o lead.');
    } finally { setBusy(false); }
  }

  async function bloquear() {
    const ok = await confirm.danger('Bloquear Lead', `Deseja bloquear o lead ${lead.nome || phone}? Ele não poderá receber atendimento enquanto bloqueado.`);
    if (ok) update({ statusLead: 'bloqueado', statusAtendimento: 'finalizado', estado: 'finalizado' }, 'Lead bloqueado e atendimento finalizado.');
  }
  async function desbloquear() {
    const ok = await confirm.warning('Desbloquear Lead', `Deseja desbloquear o lead ${lead.nome || phone}?`);
    if (ok) update({ statusLead: 'cliente_ativo' }, 'Lead desbloqueado com sucesso.');
  }
  async function assumir() {
    const ok = await confirm.warning('Assumir Atendimento', `Deseja assumir o atendimento humano do lead ${lead.nome || phone}?`);
    if (ok) update({ statusAtendimento: 'em_atendimento_humano', estado: 'atendimento_humano' }, 'Atendimento humano iniciado.');
  }
  async function finalizar() {
    const ok = await confirm.warning('Finalizar Atendimento', `Deseja finalizar o atendimento do lead ${lead.nome || phone}?`);
    if (ok) update({ statusAtendimento: 'finalizado', estado: 'finalizado' }, 'Atendimento finalizado.');
  }
  async function novoAtendimento() {
    const ok = await confirm.warning('Iniciar Novo Atendimento', `Deseja iniciar um novo atendimento humano para ${lead.nome || phone}?`);
    if (ok) update({ statusAtendimento: 'em_atendimento_humano', estado: 'atendimento_humano' }, 'Novo atendimento humano iniciado.');
  }

  // Botão de ação primária
  let primary: { label: string; icon: string; danger?: boolean; onClick: () => void } | null = null;
  if (!isBloqueado && !isOnlyCatalog) {
    if (statusAtend === 'bot') primary = { label: 'Assumir Atendimento', icon: 'fa-user', onClick: assumir };
    else if (statusAtend === 'em_atendimento_humano') primary = { label: 'Finalizar Atendimento', icon: 'fa-user', danger: true, onClick: finalizar };
    else primary = { label: 'Iniciar Novo Atendimento', icon: 'fa-user', onClick: novoAtendimento };
  }

  if (mode === 'edit') return <EditForm lead={lead} onCancel={() => setMode('view')} onUpdated={onUpdated} onClose={onClose} />;

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content glass lead-modal-content">
        <div className="lead-modal-header">
          <div className="lead-modal-avatar">{(lead.nome || phone || 'C')[0].toUpperCase()}</div>
          <div className="lead-modal-title">
            <h2>{lead.nome || 'Sem nome'}</h2>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{phone}</span>
          </div>
          <div className="lead-modal-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="lead-menu-wrap" ref={menuRef} style={{ position: 'relative' }}>
              <button className="action-btn lead-menu-btn" title="Mais ações" onClick={() => setMenuOpen((o) => !o)}>
                <i className="fa-solid fa-ellipsis-vertical" style={{ color: '#fff' }} />
              </button>
              {menuOpen && (
                <div className="lead-dropdown" style={{ position: 'absolute', right: 0, top: 'calc(100% + 4px)', zIndex: 30, background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,0.4)', minWidth: 190, padding: 6 }}>
                  <button className="lead-dropdown-item" style={dropItem} onClick={() => { setMenuOpen(false); setMode('edit'); }}><i className="fa-solid fa-pen-to-square" /> Editar Lead</button>
                  {isBloqueado ? (
                    <button className="lead-dropdown-item" style={dropItem} onClick={() => { setMenuOpen(false); desbloquear(); }}><i className="fa-solid fa-unlock" /> Desbloquear Lead</button>
                  ) : (
                    <button className="lead-dropdown-item danger" style={{ ...dropItem, color: '#f87171' }} onClick={() => { setMenuOpen(false); bloquear(); }}><i className="fa-solid fa-lock" /> Bloquear Lead</button>
                  )}
                </div>
              )}
            </div>
            <button className="action-btn" title="Fechar" onClick={onClose}><i className="fa-solid fa-xmark" style={{ color: '#fff' }} /></button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', padding: '0 1.5rem' }}>
          <div className="lead-badge-group"><span className="badge-label">Status do Lead</span> <LeadStatusBadge status={statusLead} /></div>
          {!isOnlyCatalog && <div className="lead-badge-group"><span className="badge-label">Status do Atendimento</span> <AtendimentoBadge status={statusAtend} /></div>}
        </div>

        <div className="lead-modal-body">
          <div className="lead-info-grid">
            <div className="lead-info-item"><span className="lead-info-label">Telefone</span><span className="lead-info-value">{phone || '-'}</span></div>
            <div className="lead-info-item"><span className="lead-info-label">Criado em</span><span className="lead-info-value">{formatDate(lead.criadoEm || lead.createdAt)}</span></div>
            <div className="lead-info-item"><span className="lead-info-label">Última atividade</span><span className="lead-info-value">{formatDate(lead.updatedAt)}</span></div>
            {lead.endereco && <div className="lead-info-item" style={{ gridColumn: '1 / -1' }}><span className="lead-info-label">Endereço</span><span className="lead-info-value">{lead.endereco}</span></div>}
          </div>

          {(lead.ultimoPedido || lead.lastOrder) && (
            <div className="lead-section"><h4 className="lead-section-title">Último Pedido</h4><div className="lead-last-order"><span>{lead.ultimoPedido || lead.lastOrder}</span></div></div>
          )}
          {lead.historicoResumo && (
            <div className="lead-section"><h4 className="lead-section-title">Histórico</h4><p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{lead.historicoResumo}</p></div>
          )}
          {isBloqueado && (
            <div className="lead-alert danger"><i className="fa-solid fa-lock" /> Este lead está bloqueado. Desbloqueie antes de iniciar atendimento.</div>
          )}

          {farmaqui && <RecompraLead lead={lead} onUpdated={onUpdated} />}
        </div>

        {primary && (
          <div className="lead-modal-footer">
            <button className={`btn-lead-action${primary.danger ? ' danger' : ''}`} disabled={busy} onClick={primary.onClick}>
              {busy ? <><i className="fa-solid fa-spinner fa-spin" /> Processando...</> : <><i className={`fa-solid ${primary.icon}`} /> {primary.label}</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const dropItem: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 8, width: '100%', background: 'transparent', border: 'none', color: 'var(--text-main)', padding: '8px 10px', borderRadius: 6, cursor: 'pointer', fontSize: '0.88rem', textAlign: 'left' };

function EditForm({ lead, onCancel, onUpdated, onClose }: { lead: any; onCancel: () => void; onUpdated: (l: any) => void; onClose: () => void }) {
  const [nome, setNome] = useState(lead.nome || '');
  const [phone, setPhone] = useState((lead.telefone || '').split('@')[0] || '');
  const [endereco, setEndereco] = useState(lead.endereco || '');
  const [saving, setSaving] = useState(false);

  async function save() {
    let cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length === 13 && cleanPhone.startsWith('55')) cleanPhone = cleanPhone.substring(2);
    if (!nome.trim()) { toast.error('O nome é obrigatório.'); return; }
    if (cleanPhone && cleanPhone.length !== 11) { notifications.showPhoneError(); return; }
    setSaving(true);
    try {
      const updates = { nome: nome.trim(), telefone: cleanPhone, whatsapp: cleanPhone, endereco: endereco.trim() };
      await dataApi.update('leads', lead.id, updates);
      toast.success('Lead atualizado!');
      onUpdated({ ...lead, ...updates, updatedAt: new Date() });
      onCancel();
    } catch {
      toast.error('Erro ao salvar alterações.');
      setSaving(false);
    }
  }

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content glass lead-modal-content">
        <div className="lead-modal-header">
          <div className="lead-modal-avatar"><i className="fa-solid fa-pen" /></div>
          <div className="lead-modal-title">
            <h2>Editar Lead</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Alterando informações de contato</p>
          </div>
          <div className="lead-modal-header-actions">
            <button className="action-btn" title="Cancelar" onClick={onCancel}><i className="fa-solid fa-xmark" style={{ color: '#fff' }} /></button>
          </div>
        </div>

        <div className="lead-modal-body">
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="edit-label" style={editLabel}>Nome do Cliente</label>
            <input className="edit-input" style={editInput} value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: João Silva" />
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="edit-label" style={editLabel}>WhatsApp (DDD + 9 dígitos)</label>
            <input className="edit-input" style={editInput} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Ex: 11999999999" maxLength={11} />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 4 }}>Apenas números, sem o 55.</p>
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="edit-label" style={editLabel}>Endereço</label>
            <input className="edit-input" style={editInput} value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Rua, número, bairro..." />
          </div>
        </div>

        <div className="lead-modal-footer">
          <button className="btn-lead-action" disabled={saving} onClick={save}>
            {saving ? <><i className="fa-solid fa-spinner fa-spin" /> Salvando...</> : <><i className="fa-solid fa-floppy-disk" /> Salvar Alterações</>}
          </button>
        </div>
      </div>
    </div>
  );
}

const editLabel: React.CSSProperties = { display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 6, letterSpacing: '0.05em' };
const editInput: React.CSSProperties = { width: '100%', padding: '0.75rem 1rem', background: 'var(--surface-hover)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)', fontSize: '0.9rem' };

// Recompra (FarmaQui): registra a última compra e agenda o lembrete.
function RecompraLead({ lead, onUpdated }: { lead: any; onUpdated: (l: any) => void }) {
  const hoje = new Date().toISOString().slice(0, 10);
  const [data, setData] = useState(lead.ultimaCompra ? String(lead.ultimaCompra).slice(0, 10) : hoje);
  const [ciclo, setCiclo] = useState(Number(lead.cicloRecompraDias) || 30);
  const [busy, setBusy] = useState(false);

  async function salvar() {
    setBusy(true);
    try {
      const r = await farmaquiApi.setUltimaCompra(lead.id, new Date(data + 'T12:00:00').toISOString(), ciclo);
      onUpdated({ ...lead, ultimaCompra: data, cicloRecompraDias: ciclo });
      toast.success(r.agendado ? `Registrado! Lembrete agendado para ${ciclo} dias.` : 'Última compra registrada.');
    } catch (e: any) { toast.error('Erro: ' + (e.message || e)); }
    finally { setBusy(false); }
  }

  return (
    <div className="lead-section" style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, marginTop: 6 }}>
      <h4 className="lead-section-title">💊 Recompra</h4>
      {lead.ultimaCompra && <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 8px' }}>Última compra registrada: <strong>{String(lead.ultimaCompra).slice(0, 10).split('-').reverse().join('/')}</strong> · ciclo {lead.cicloRecompraDias || 30} dias</p>}
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div><label className="config-label" style={{ fontSize: '0.75rem' }}>Data da compra</label><input type="date" className="config-input" value={data} onChange={(e) => setData(e.target.value)} /></div>
        <div><label className="config-label" style={{ fontSize: '0.75rem' }}>Ciclo</label><select className="config-select" value={ciclo} onChange={(e) => setCiclo(Number(e.target.value))}><option value={30}>30 dias</option><option value={60}>60 dias</option><option value={90}>90 dias</option></select></div>
        <button className="btn-primary" disabled={busy} onClick={salvar} style={{ background: '#14b8a6' }}>{busy ? '...' : 'Registrar'}</button>
      </div>
    </div>
  );
}
