// Entrega o HTML da loja (storefront) já com as meta tags do cliente: título,
// og:image = logo do cliente, e favicon. É o que faz o preview do link no
// WhatsApp/Instagram mostrar a marca do cliente em vez do sistema — porque os
// crawlers de link NÃO rodam JavaScript, então o HTML precisa vir pronto.
//
// Ativação: o nginx deve rotear o DOCUMENTO das URLs de loja (subdomínio /,
// /catalog/:id, /links/:id) — de preferência só para crawlers — para
// GET /api/storefront/html?host=<host>&path=<path>. Os assets seguem no nginx.
import { getAll } from './firebase.js';
import { getPublicStore } from './publicStore.js';
import { storeByHost } from './domains.js';

// Busca o index.html atual do container do front (mesma rede docker) e cacheia
// por 60s. Assim não precisa embutir o build no backend.
const FRONT_URL = process.env.FRONT_INTERNAL_URL || 'http://autoqui-container';
let cachedHtml = '';
let cachedAt = 0;
async function baseHtml(): Promise<string> {
  if (cachedHtml && Date.now() - cachedAt < 60_000) return cachedHtml;
  const r = await fetch(`${FRONT_URL}/index.html`);
  cachedHtml = await r.text();
  cachedAt = Date.now();
  return cachedHtml;
}

const esc = (s: any) => String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const rep = (html: string, re: RegExp, val: string) => (re.test(html) ? html.replace(re, val) : html);

// Extrai o storeId de um path tipo /catalog/ID ou /links/ID.
function storeIdFromPath(path: string): string {
  const m = String(path || '').match(/\/(?:catalog|links)\/([^/?#]+)/);
  return m ? decodeURIComponent(m[1]) : '';
}

export async function storefrontHtml(params: { host?: string; path?: string }): Promise<string> {
  let storeId = storeIdFromPath(params.path || '');
  let companyId = '';
  // Sem storeId no path (subdomínio) → resolve pelo host.
  if (!storeId && params.host) {
    const r = await storeByHost(params.host).catch(() => ({} as any));
    storeId = r.storeId || '';
    companyId = r.companyId || '';
  }

  let html = await baseHtml();
  let name = '', logo = '', favicon = '', desc = '';

  const pub = await getPublicStore({ storeId, companyId }).catch(() => null);
  if (pub) { name = pub.name; logo = pub.logoUrl; companyId = pub.companyId; }

  // Favicon e descrição ficam no loja_config.design.
  let cfg: any = null;
  if (storeId) { const c = await getAll('loja_config', [{ field: 'lojaId', operator: '==', value: storeId }]).catch(() => []); cfg = (c as any[])[0]; }
  else if (companyId) { const c = await getAll('loja_config', [{ field: 'empresaId', operator: '==', value: companyId }]).catch(() => []); cfg = (c as any[]).find((x) => x?.linksPage) || (c as any[])[0]; }
  if (cfg?.design) { favicon = cfg.design.faviconUrl || ''; desc = cfg.design.metaDescription || ''; }

  const title = name || 'Autoqui';
  const description = desc || (name ? `${name} — catálogo online` : 'Gestão inteligente de vendas e catálogo online.');
  const icon = favicon || logo;

  html = rep(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = rep(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
  html = rep(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`);
  html = rep(html, /(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`);
  if (logo) html = rep(html, /(<meta property="og:image" content=")[^"]*(")/, `$1${esc(logo)}$2`);
  if (icon) {
    html = rep(html, /(<link rel="icon"[^>]*href=")[^"]*(")/, `$1${esc(icon)}$2`);
    html = rep(html, /(<link rel="apple-touch-icon"[^>]*href=")[^"]*(")/, `$1${esc(icon)}$2`);
  }
  return html;
}
