// Catálogo de páginas que um colaborador pode receber acesso.
// A lista é filtrada pelos módulos ativos da empresa (só aparece o que ela tem).
export interface PageDef { key: string; label: string; route: string; icon: string; mods?: string[]; always?: boolean }

export const EMPLOYEE_PAGES: PageDef[] = [
  { key: 'orders', label: 'Pedidos', route: '/orders', icon: 'fa-clipboard-list', mods: ['venda_catalogo', 'venda'] },
  { key: 'products', label: 'Produtos', route: '/products', icon: 'fa-box', mods: ['venda_catalogo', 'vitrine'] },
  { key: 'categories', label: 'Categorias', route: '/categories', icon: 'fa-tags', mods: ['venda_catalogo', 'vitrine'] },
  { key: 'combos', label: 'Combos', route: '/combos', icon: 'fa-layer-group', mods: ['venda_catalogo'] },
  { key: 'complementos', label: 'Complementos', route: '/complementos', icon: 'fa-plus-minus', mods: ['venda_catalogo'] },
  { key: 'catalog-settings', label: 'Configuração', route: '/catalog-settings', icon: 'fa-sliders', mods: ['venda_catalogo', 'vitrine'] },
  { key: 'leads', label: 'Leads', route: '/leads', icon: 'fa-people-group', mods: ['venda_catalogo', 'vitrine', 'atendimento', 'farmaqui'] },
  { key: 'crm', label: 'CRM', route: '/crm', icon: 'fa-table-columns', mods: ['crm'] },
  { key: 'links', label: 'Links', route: '/links-editor', icon: 'fa-link', mods: ['links'] },
  { key: 'campaigns', label: 'Campanhas', route: '/campaigns', icon: 'fa-bullhorn', mods: ['disparo'] },
  { key: 'farmaqui', label: 'FarmaQui', route: '/farmaqui', icon: 'fa-prescription-bottle-medical', mods: ['farmaqui'] },
  { key: 'ecommerce', label: 'E-commerce', route: '/ecommerce', icon: 'fa-store', mods: ['ecommerce'] },
  { key: 'schedule', label: 'Agenda', route: '/schedule', icon: 'fa-calendar-alt', mods: ['agendamento'] },
  { key: 'business', label: 'Negócio', route: '/business', icon: 'fa-store', always: true },
  { key: 'instances', label: 'Instâncias', route: '/instances', icon: 'fa-qrcode', always: true },
];

// Páginas que a empresa tem (para a seleção de acesso do colaborador).
export const pagesForModules = (mods: string[]): PageDef[] =>
  EMPLOYEE_PAGES.filter((p) => p.always || (p.mods || []).some((m) => mods.includes(m)));

// O colaborador sempre pode ver estas (independe de permissão).
export const ALWAYS_ALLOWED = new Set(['/dashboard', '/change-password', '/billing']);

// Descobre a qual página (key) um pathname pertence — casa pelo prefixo de rota mais longo.
// Ex.: /farmaqui/atendimento e /farmaqui-settings → 'farmaqui'. null = página fora do
// catálogo de colaborador (ex.: /users, /tools, /billing) → acesso negado a colaborador.
export function pageKeyForPath(pathname: string): string | null {
  if (pathname.startsWith('/farmaqui')) return 'farmaqui';
  if (pathname.startsWith('/catalog-settings')) return 'catalog-settings';
  if (pathname.startsWith('/schedule')) return 'schedule';
  let best: PageDef | null = null;
  for (const p of EMPLOYEE_PAGES) {
    if (pathname === p.route || pathname.startsWith(p.route + '/')) {
      if (!best || p.route.length > best.route.length) best = p;
    }
  }
  return best?.key || null;
}

// Colaborador pode acessar este pathname?
export function employeeCanAccess(pathname: string, permissions: string[]): boolean {
  if (ALWAYS_ALLOWED.has(pathname)) return true;
  const key = pageKeyForPath(pathname);
  if (!key) return false; // páginas só de dono
  return permissions.includes(key);
}
