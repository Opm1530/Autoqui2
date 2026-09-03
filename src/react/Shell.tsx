// Shell do painel: sidebar + topbar + área de conteúdo (Outlet).
// O menu é montado conforme o papel (owner/employee) e os módulos ativos da empresa.
import { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { GlobalSearch } from './GlobalSearch';
import { authService } from '../services/auth';
import { dbService } from '../services/db';
import { orderNotification } from '../services/orderNotification';
import { subscriptionApi } from '../services/subscriptionApi';
import { employeeCanAccess } from './util/pages';
import { Billing } from './pages/Billing';
import { useAuth } from './useAuth';

interface NavItem { to?: string; label: string; icon: string; children?: NavItem[]; }
type NavEntry = NavItem | { divider: true } | { section: string };

const HELP_WA = 'https://wa.me/5564999983832'; // atendimento da plataforma (item "Ajuda")

const TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard', '/tools': 'Ferramentas', '/ecommerce': 'E-commerce', '/farmaqui': 'FarmaQui', '/farmaqui/recompra': 'FarmaQui', '/farmaqui/grupo': 'FarmaQui', '/orders': 'Pedidos', '/products': 'Produtos',
  '/leads': 'Leads', '/crm': 'CRM', '/business': 'Negócio', '/users': 'Usuários',
  '/combos': 'Combos', '/categories': 'Categorias',
  '/instances': 'Instâncias', '/catalog-settings': 'Configuração', '/farmaqui-settings': 'Configuração', '/farmaqui/atendimento': 'Atendimento',
  '/mercado-pago': 'Mercado Pago', '/campaigns': 'Campanhas',
  '/schedule': 'Agenda', '/schedule-clients': 'Clientes',
  '/admin/dashboard': 'Dashboard', '/admin/companies': 'Clientes',
  '/admin/users': 'Usuários', '/admin/webhooks': 'Webhooks', '/admin/migration': 'Migração',
  '/admin/pricing': 'Preços', '/admin/coupons': 'Cupons', '/billing': 'Assinatura', '/change-password': 'Alterar Senha',
};

const ADMIN_NAV: NavEntry[] = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: 'fa-chart-line' },
  { to: '/admin/companies', label: 'Clientes', icon: 'fa-building' },
  { to: '/admin/users', label: 'Usuários', icon: 'fa-users' },
  { to: '/admin/pricing', label: 'Preços', icon: 'fa-dollar-sign' },
  { to: '/admin/coupons', label: 'Cupons', icon: 'fa-ticket' },
  { to: '/admin/webhooks', label: 'Webhooks', icon: 'fa-link' },
  { to: '/admin/migration', label: 'Migração', icon: 'fa-clone' },
];

function buildNav(role: string | undefined, modulos: string[], permissions: string[] = []): NavEntry[] {
  if (role === 'admin') return ADMIN_NAV;
  const has = (m: string) => modulos.includes(m);
  const vitrine = has('vitrine');
  const vendaCatalogo = has('venda_catalogo');
  const venda = has('venda');
  const agendamento = has('agendamento');
  const atendimento = has('atendimento');
  const disparo = has('disparo');
  const ecommerce = has('ecommerce');
  const farmaqui = has('farmaqui');
  const isEmployee = role === 'employee';
  // Loja própria no AutoQui (tem Lojas + Configuração de catálogo). Atendimento,
  // Campanhas e E-commerce (NuvemShop) não são vitrine própria aqui.
  const temLojaPropria = vendaCatalogo || venda || vitrine || agendamento;

  // Empilhável: canais (exclusivos) definem o núcleo; camadas (IA/Campanhas) somam.
  // add() evita item duplicado quando duas ferramentas apontam pra mesma rota.
  const nav: NavEntry[] = [{ section: 'Menu' }];
  const seen = new Set<string>();
  const add = (item: NavItem) => { const key = item.to || item.label; if (!seen.has(key)) { seen.add(key); nav.push(item); } };

  // Dropdown de "Produtos": Catálogo + (Combos) + Categorias.
  const produtosDropdown = (label: string, comCombos: boolean): NavItem => ({
    label, icon: 'fa-box', children: [
      { to: '/products', label: 'Catálogo', icon: 'fa-boxes-stacked' },
      ...(comCombos ? [{ to: '/combos', label: 'Combos', icon: 'fa-layer-group' }] : []),
      { to: '/categories', label: 'Categorias', icon: 'fa-tags' },
    ],
  });

  add({ to: '/dashboard', label: 'Dashboard', icon: 'fa-chart-line' });

  // ── Canal (só um ativo por vez) ──
  if (vitrine) {
    add(produtosDropdown('Produtos', true));
  } else if (agendamento) {
    add(produtosDropdown('Serviços', false));
    add({ to: '/schedule-clients', label: 'Clientes', icon: 'fa-users' });
    add({ to: '/schedule', label: 'Agenda', icon: 'fa-calendar-alt' });
  } else if (vendaCatalogo || venda) {
    add({ to: '/orders', label: 'Pedidos', icon: 'fa-clipboard-list' });
    add(produtosDropdown('Produtos', true));
  } else if (ecommerce) {
    add({ to: '/ecommerce', label: 'E-commerce', icon: 'fa-store' });
  } else if (farmaqui) {
    add({ label: 'FarmaQui', icon: 'fa-prescription-bottle-medical', children: [
      { to: '/farmaqui', label: 'Ajustes', icon: 'fa-sliders' },
      { to: '/farmaqui/atendimento', label: 'Atendimento', icon: 'fa-comments' },
      { to: '/farmaqui/recompra', label: 'Automações', icon: 'fa-wand-magic-sparkles' },
      { to: '/farmaqui/grupo', label: 'Ofertas no grupo', icon: 'fa-bullhorn' },
    ] });
    add({ to: '/leads', label: 'Clientes', icon: 'fa-people-group' });
  }

  // ── Camadas (somam sobre qualquer canal) ──
  if (atendimento || vendaCatalogo || venda || vitrine) add({ to: '/leads', label: 'Leads', icon: 'fa-people-group' });
  if (has('crm')) add({ to: '/crm', label: 'CRM', icon: 'fa-table-columns' });
  if (disparo) add({ to: '/campaigns', label: 'Campanhas', icon: 'fa-bullhorn' });

  // ── Geral (dono) ──
  // "Negócio" (hub com Equipe + Instâncias) aparece para TODAS as contas.
  // Configuração (catálogo, com MP embutido) só para quem tem loja própria.
  nav.push({ section: 'Geral' });
  add({ to: '/business', label: 'Negócio', icon: 'fa-store' });
  if (temLojaPropria) add({ to: '/catalog-settings', label: 'Configuração', icon: 'fa-sliders' });
  else if (farmaqui) add({ to: '/farmaqui-settings', label: 'Configuração', icon: 'fa-sliders' });
  if (role === 'owner') add({ to: '/tools', label: 'Ferramentas', icon: 'fa-shapes' });
  // Assinatura e Alterar senha → menu do usuário (rodapé).
  // Mercado Pago → Configuração › Pagamento.

  // Colaborador: mantém a MESMA estrutura do menu, só remove o que ele não pode acessar.
  if (isEmployee) return filterNavForEmployee(nav, permissions);
  return nav;
}

// Filtra o menu do dono pelas permissões do colaborador, preservando grupos/seções.
// (Dashboard sempre; itens de dropdown filtrados individualmente; grupos/seções vazios somem.)
function filterNavForEmployee(nav: NavEntry[], permissions: string[]): NavEntry[] {
  const ok = (to?: string) => !!to && employeeCanAccess(to, permissions);
  const out: NavEntry[] = [];
  for (const e of nav) {
    if ('divider' in e || 'section' in e) { out.push(e); continue; }
    if (e.children) {
      const children = e.children.filter((c) => ok(c.to));
      if (children.length) out.push({ ...e, children });
      continue;
    }
    if (ok(e.to)) out.push(e);
  }
  // Remove seções/divisores que ficaram sem itens depois deles.
  return out.filter((e, i) => {
    if ('section' in e || 'divider' in e) {
      const next = out[i + 1];
      return next && !('section' in next) && !('divider' in next);
    }
    return true;
  });
}

// Achata a árvore de nav em itens navegáveis (com rota), expandindo dropdowns.
function leafItems(nav: NavEntry[]): NavItem[] {
  const out: NavItem[] = [];
  for (const n of nav) {
    if ('divider' in n || 'section' in n) continue;
    if (n.children) out.push(...n.children);
    else if (n.to) out.push(n);
  }
  return out;
}

// Itens principais para a barra inferior no mobile (máx 5).
function mobileNav(nav: NavEntry[]): NavItem[] {
  const items = leafItems(nav);
  const priority = ['/dashboard', '/tools', '/products', '/orders', '/leads', '/schedule', '/campaigns'];
  const picked = priority.map((p) => items.find((i) => i.to === p)).filter(Boolean) as NavItem[];
  if (picked.length >= 3) return picked.slice(0, 5);
  return items.slice(0, 5);
}

const iconEl = (icon: string) => <i className={icon.includes('fa-brands') ? icon : `fa-solid ${icon}`} />;

export function Shell() {
  const { user } = useAuth();
  const location = useLocation();
  const [modulos, setModulos] = useState<string[] | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu do usuário ao clicar fora ou trocar de rota.
  useEffect(() => {
    if (!userMenuOpen) return;
    const onDoc = (e: MouseEvent) => { if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [userMenuOpen]);
  useEffect(() => { setUserMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!user?.companyId) { setModulos([]); return; }
    (async () => {
      try {
        const company = (await dbService.get('companies', user.companyId!)) as any;
        setModulos(company?.modulos_ativos || ['atendimento']);
      } catch { setModulos(['atendimento']); }
    })();
  }, [user?.companyId]);

  // Apito/modal de novo pedido (mesmo serviço do app vanilla).
  useEffect(() => {
    orderNotification.startListening();
    return () => orderNotification.stopListening();
  }, []);

  // Contador de pedidos em aberto (tudo que não está finalizado/cancelado) → badge no menu.
  const [openOrders, setOpenOrders] = useState(0);
  useEffect(() => {
    if (!user?.companyId) { setOpenOrders(0); return; }
    const qy = query(collection(db, 'pedidos'), where('empresaId', '==', user.companyId));
    const unsub = onSnapshot(qy, (snap) => {
      let n = 0;
      snap.forEach((d) => {
        const o = d.data() as any;
        if (o.arquivado) return; // arquivados não contam
        const s = (o.status || 'em_montagem').toLowerCase();
        if (s !== 'finalizado' && s !== 'cancelado') n++;
      });
      setOpenOrders(n);
    }, () => {});
    return () => unsub();
  }, [user?.companyId]);

  // Parede de cobrança: bloqueia o painel se a assinatura estiver inadimplente
  // além da tolerância. Fail-open (erro/backend fora → não bloqueia).
  const [blocked, setBlocked] = useState(false);
  useEffect(() => {
    if (!user || user.role === 'admin') return;
    subscriptionApi.mine().then((r) => setBlocked(!!r.bloqueada)).catch(() => {});
  }, [user]);

  const title = TITLES[location.pathname] || 'Painel';
  useEffect(() => { document.title = `AutoQui · ${title}`; }, [title]);

  // Busca do topo via ?q= (contextual nas telas de lista; geral nas demais).
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const setQ = (val: string) => {
    const next = new URLSearchParams(searchParams);
    if (val) next.set('q', val); else next.delete('q');
    setSearchParams(next, { replace: true });
  };
  const SEARCH_HINT: Record<string, string> = { '/orders': 'Buscar pedidos…', '/leads': 'Buscar leads…', '/products': 'Buscar produtos…' };
  const isListSearch = location.pathname in SEARCH_HINT;
  const searchPlaceholder = SEARCH_HINT[location.pathname] || 'Buscar em pedidos, produtos, leads…';
  const permissions: string[] = Array.isArray((user as any)?.permissions) ? (user as any).permissions : [];
  const nav = buildNav(user?.role, modulos || [], permissions);
  const mobile = mobileNav(nav);
  const isEmployee = user?.role === 'employee';
  // Colaborador sem permissão pra esta página (acesso por URL direta) → tela de bloqueio.
  const semAcesso = isEmployee && !employeeCanAccess(location.pathname, permissions);

  // Inadimplente além da tolerância → parede de cobrança (sem sidebar).
  if (blocked) {
    return (
      <div className="app-container" style={{ display: 'block', minHeight: '100vh' }}>
        <div className="topbar glass" style={{ justifyContent: 'space-between' }}>
          <div className="topbar-left"><h2 className="page-title">Assinatura</h2></div>
          <button className="logout-btn" title="Sair" onClick={() => authService.logout()}>
            <span className="icon"><i style={{ color: '#FFF', fontSize: '1rem' }} className="fa-solid fa-arrow-right-from-bracket" /></span>
          </button>
        </div>
        <div className="page-container"><Billing wall /></div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img className="logo-img" src="/logo.png" alt="AutoQui" />
          <span className="logo-text">AutoQui</span>
        </div>
        <nav className="sidebar-nav">
          {nav.map((item, i) => 'divider' in item
            ? <div key={`d${i}`} className="nav-divider" />
            : 'section' in item
              ? <div key={`s${i}`} className="nav-section-label">{item.section}</div>
              : item.children
                ? <NavGroup key={`g${item.label}`} item={item} />
                : (
                  <NavLink key={item.to! + item.label} to={item.to!} end
                    className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
                    <span className="icon">{iconEl(item.icon)}</span>
                    <span>{item.label}</span>
                    {item.to === '/orders' && openOrders > 0 && <span className="nav-badge">{openOrders}</span>}
                  </NavLink>
                ))}
        </nav>
        <div className="sidebar-footer" ref={userMenuRef}>
          {userMenuOpen && (
            <div className="user-menu">
              {user?.role !== 'admin' && (
                <NavLink to="/billing" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                  <i className="fa-solid fa-receipt" /> Assinatura
                </NavLink>
              )}
              <NavLink to="/change-password" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                <i className="fa-solid fa-key" /> Alterar senha
              </NavLink>
              <button className="user-menu-item danger" onClick={() => authService.logout()}>
                <i className="fa-solid fa-arrow-right-from-bracket" /> Sair
              </button>
            </div>
          )}
          <button className={'user-profile' + (userMenuOpen ? ' open' : '')} onClick={() => setUserMenuOpen((o) => !o)}>
            <div className="user-avatar">{(user?.email || 'U')[0].toUpperCase()}</div>
            <div className="user-info">
              <span className="name">{user?.role === 'admin' ? 'Administrador' : isEmployee ? 'Colaborador' : 'Dono da Empresa'}</span>
              <span className="role">{user?.email}</span>
            </div>
            <i className="fa-solid fa-chevron-up user-profile-caret" />
          </button>
        </div>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <div className="topbar-search">
            <i className="fa-solid fa-magnifying-glass" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={searchPlaceholder} />
            {q && !isListSearch && user?.companyId && (
              <GlobalSearch q={q} companyId={user.companyId} onPick={() => setQ('')} />
            )}
          </div>
          <div className="topbar-right">
            <button className="topbar-icon-btn" title="Notificações"><i className="fa-solid fa-bell" /></button>
            <a className="topbar-icon-btn" href={HELP_WA} target="_blank" rel="noreferrer" title="Ajuda"><i className="fa-brands fa-whatsapp" /></a>
            <button className="topbar-icon-btn danger" title="Sair" onClick={() => authService.logout()}>
              <i className="fa-solid fa-arrow-right-from-bracket" />
            </button>
          </div>
        </div>
        <div className="page-container">
          {semAcesso ? (
            <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
              <div className="card" style={{ maxWidth: 440, width: '100%', textAlign: 'center', padding: '2.75rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-lock" style={{ fontSize: '1.6rem', color: '#f59e0b' }} />
                </div>
                <h2 style={{ margin: 0 }}>Sem acesso</h2>
                <p style={{ color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Você não tem permissão para esta página. Fale com o dono da empresa.</p>
              </div>
            </div>
          ) : <Outlet />}
        </div>

        {/* Bottom nav (mobile) */}
        <nav className="mobile-bottom-nav">
          {mobile.map((item) => (
            <NavLink key={item.to! + item.label} to={item.to!} end
              className={({ isActive }) => 'mobile-nav-item' + (isActive ? ' active' : '')}>
              <span style={{ position: 'relative', display: 'inline-flex' }}>
                {iconEl(item.icon)}
                {item.to === '/orders' && openOrders > 0 && <span className="nav-badge nav-badge-dot">{openOrders}</span>}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </main>
    </div>
  );
}

// Item de menu com submenu (dropdown). Abre automaticamente quando um filho
// está ativo; o usuário também pode abrir/fechar manualmente.
function NavGroup({ item }: { item: NavItem }) {
  const location = useLocation();
  const children = item.children || [];
  const hasActive = children.some((c) => c.to && location.pathname === c.to);
  const [open, setOpen] = useState(hasActive);
  useEffect(() => { if (hasActive) setOpen(true); }, [hasActive]);

  return (
    <>
      <button className={'nav-item nav-parent' + (hasActive ? ' has-active' : '')} onClick={() => setOpen((o) => !o)}>
        <span className="icon">{iconEl(item.icon)}</span>
        <span>{item.label}</span>
        <i className={'nav-caret fa-solid fa-chevron-down' + (open ? ' open' : '')} />
      </button>
      {open && (
        <div className="nav-children">
          {children.map((c) => (
            <NavLink key={c.to} to={c.to!} end
              className={({ isActive }) => 'nav-item nav-child' + (isActive ? ' active' : '')}>
              <span className="icon">{iconEl(c.icon)}</span>
              <span>{c.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}
