export function resolveTimestampMs(raw: any): number | null {
  if (!raw) return null;
  if (typeof raw.toDate === 'function') return raw.toDate().getTime();
  if (raw.seconds) return raw.seconds * 1000;
  const parsed = new Date(raw).getTime();
  return isNaN(parsed) ? null : parsed;
}

export function formatActivityDate(raw: any): { label: string; color: string } {
  const ms = resolveTimestampMs(raw);
  if (ms === null) return { label: 'Sem registro', color: '#6b7280' };
  const diffMs = Date.now() - ms;
  const diffDays = Math.floor(diffMs / 86400000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffMins = Math.floor(diffMs / 60000);
  let label: string;
  if (diffMins < 60) label = diffMins <= 1 ? 'Agora há pouco' : `há ${diffMins} min`;
  else if (diffHours < 24) label = `há ${diffHours}h`;
  else if (diffDays === 1) label = 'Ontem';
  else label = `há ${diffDays} dias`;
  const color = diffDays < 7 ? '#22c55e' : diffDays < 30 ? '#f59e0b' : '#ef4444';
  return { label, color };
}
