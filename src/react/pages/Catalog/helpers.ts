// Utilitários do catálogo público (portados do Catalog.ts).

export const getImageUrl = (p: any): string => {
  if (p.imageUrl) return p.imageUrl;
  if (p.imagemPath && p.downloadToken) {
    return `https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(p.imagemPath)}?alt=media&token=${p.downloadToken}`;
  }
  return 'https://via.placeholder.com/300?text=Sem+Imagem';
};

// Todas as fotos do produto (capa + galeria), pro modal de detalhe da vitrine.
export const getProductGallery = (p: any): string[] => {
  const urls: string[] = [];
  if (p.imageUrl) urls.push(p.imageUrl);
  else if (p.imagemPath && p.downloadToken) urls.push(`https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(p.imagemPath)}?alt=media&token=${p.downloadToken}`);
  (p.gallery || []).forEach((g: any) => { if (g?.imagemPath && g?.downloadToken) urls.push(`https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(g.imagemPath)}?alt=media&token=${g.downloadToken}`); });
  if (urls.length === 0) urls.push('https://via.placeholder.com/600?text=Sem+Imagem');
  return urls;
};

// Capa da categoria (carrossel da vitrine).
export const getCategoryCover = (c: any): string | null =>
  c?.coverImagemPath && c?.coverDownloadToken
    ? `https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(c.coverImagemPath)}?alt=media&token=${c.coverDownloadToken}`
    : null;

export const DIAS_NOME: Record<string, string> = {
  dom: 'Domingo', seg: 'Segunda-feira', ter: 'Terça-feira', qua: 'Quarta-feira',
  qui: 'Quinta-feira', sex: 'Sexta-feira', sab: 'Sábado',
};
export const getDiaSemana = () => ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'][new Date().getDay()];

export function getStoreHorario(config: any, store: any, dia: string) {
  const h = config.horario_funcionamento?.[dia] || store.horarios?.[dia] || {};
  return { ativo: h.ativo ?? h.aberto ?? (dia !== 'dom'), inicio: h.inicio || h.abertura || '08:00', fim: h.fim || h.fechamento || '18:00' };
}
export function getStoreFrete(config: any, store: any, dia: string) {
  const h = config.horario_entrega?.[dia] || store.horario_entrega?.[dia];
  // Sem horário de entrega configurado para o dia → entrega segue o horário de
  // funcionamento (evita "entrega indisponível" fora do default fixo 08–18).
  if (!h) return getStoreHorario(config, store, dia);
  return { ativo: h.ativo ?? h.aberto ?? (dia !== 'dom'), inicio: h.inicio || h.abertura || '08:00', fim: h.fim || h.fechamento || '18:00' };
}
const nowMinutes = () => { const a = new Date(); return a.getHours() * 60 + a.getMinutes(); };
const toMin = (s: string) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };

export function isStoreOpen(config: any, store: any): boolean {
  if (config.lojaFechada === true) return false;
  const hs = getStoreHorario(config, store, getDiaSemana());
  if (!hs.ativo) return false;
  const n = nowMinutes();
  return n >= toMin(hs.inicio) && n <= toMin(hs.fim);
}
export function isFreteAbertoAgora(config: any, store: any): boolean {
  if (config.entregaFechada === true) return false;
  const hf = getStoreFrete(config, store, getDiaSemana());
  if (!hf.ativo) return false;
  const n = nowMinutes();
  return n >= toMin(hf.inicio) && n <= toMin(hf.fim);
}
export function getNextOpenTime(config: any, store: any): string {
  const dias = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
  const hojeIndex = new Date().getDay();
  const hs = getStoreHorario(config, store, dias[hojeIndex]);
  if (hs.ativo && nowMinutes() < toMin(hs.inicio)) return `Hoje às ${hs.inicio}`;
  for (let i = 1; i <= 7; i++) {
    const nd = dias[(hojeIndex + i) % 7];
    const hn = getStoreHorario(config, store, nd);
    if (hn.ativo) return i === 1 ? `Amanhã às ${hn.inicio}` : `${DIAS_NOME[nd]} às ${hn.inicio}`;
  }
  return 'em breve';
}

// Rótulo textual de status da loja (aberto/fechado + horário).
export function storeStatusLabel(config: any, store: any): { open: boolean; text: string; extra?: string } {
  const hs = getStoreHorario(config, store, getDiaSemana());
  if (!hs.ativo) return { open: false, text: 'Fechado no momento' };
  const n = nowMinutes(), ini = toMin(hs.inicio), fim = toMin(hs.fim);
  if (n >= ini && n <= fim) return { open: true, text: 'Aberto agora', extra: `Fecha às ${hs.fim}` };
  if (n < ini) return { open: false, text: 'Fechado no momento', extra: `Abre às ${hs.inicio}` };
  return { open: false, text: 'Fechado no momento' };
}
