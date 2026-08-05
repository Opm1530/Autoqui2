export const LEAD_STATUS_MAP: Record<string, { label: string; cls: string }> = {
  novo: { label: 'Novo', cls: 'badge info' },
  cliente_ativo: { label: 'Cliente Ativo', cls: 'badge success' },
  inativo: { label: 'Inativo', cls: 'badge secondary' },
  bloqueado: { label: 'Bloqueado', cls: 'badge danger' },
};

export const ATENDIMENTO_STATUS_MAP: Record<string, { label: string; cls: string; icon: string }> = {
  bot: { label: 'Bot', icon: 'fa-robot', cls: 'badge primary' },
  em_atendimento_humano: { label: 'Atendimento Humano', icon: 'fa-user', cls: 'badge warning' },
  finalizado: { label: 'Finalizado', icon: 'fa-check', cls: 'badge success' },
  abandonado: { label: 'Abandonado', icon: 'fa-warning', cls: 'badge secondary' },
};

export function LeadStatusBadge({ status }: { status: string }) {
  const s = (status || 'novo').toLowerCase();
  const m = LEAD_STATUS_MAP[s] || { label: status || 'Novo', cls: 'badge info' };
  return <span className={m.cls}>{m.label}</span>;
}

export function AtendimentoBadge({ status }: { status: string }) {
  const s = (status || 'bot').toLowerCase();
  const m = ATENDIMENTO_STATUS_MAP[s] || { label: status || 'Bot', icon: 'fa-robot', cls: 'badge primary' };
  return <span className={m.cls}><i className={`fa-solid ${m.icon}`} /> {m.label}</span>;
}

export function formatDate(date: any): string {
  if (!date) return '-';
  if (date.toDate) return date.toDate().toLocaleString('pt-BR');
  return new Date(date).toLocaleString('pt-BR');
}

export const normAtend = (raw: string) => (raw === 'atendimento_humano' ? 'em_atendimento_humano' : raw);

export function filterLeads(leads: any[], filter: string): any[] {
  if (filter === 'humano') return leads.filter((l) => {
    const s = (l.statusAtendimento || '').toLowerCase();
    return s === 'em_atendimento_humano' || s === 'atendimento_humano';
  });
  if (filter === 'bloqueado') return leads.filter((l) => (l.statusLead || '').toLowerCase() === 'bloqueado');
  if (filter === 'bot') return leads.filter((l) => (l.statusAtendimento || 'bot').toLowerCase() === 'bot');
  return leads;
}
