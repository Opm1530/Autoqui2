// Shell do painel: sidebar + topbar + área de conteúdo (Outlet).
// O menu é montado conforme o papel (owner/employee) e os módulos ativos da empresa.
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { authService } from '../services/auth';
import { dbService } from '../services/db';
import { orderNotification } from '../services/orderNotification';
import { subscriptionApi } from '../services/subscriptionApi';
import { Billing } from './pages/Billing';
import { useAuth } from './useAuth';

interface NavItem { to: string; label: string; icon: string; }
type NavEntry = NavItem | { divider: true };

const HELP_WA = 'https://wa.me/5564999983832'; // atendimento da plataforma (item "Ajuda")

const TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard', '/tools': 'Ferramentas', '/ecommerce': 'E-commerce', '/farmaqui': 'FarmaQui', '/orders': 'Pedidos', '/products': 'Produtos',
  '/leads': 'Leads', '/stores': 'Lojas', '/users': 'Usuários',
  '/instances': 'Instâncias', '/catalog-settings': 'Configuração',
  '/mercado-pago': 'Mercado Pago', '/campaigns': 'Campanhas',
  '/schedule': 'Agenda', '/schedule-clients': 'Clientes',
  '/admin/dashboard': 'Dashboard', '/admin/companies': 'Clientes',
  '/admin/users': 'Usuários', '/admin/webhooks': 'Webhooks', '/admin/migration': 'Migração',
  '/admin/plans': 'Planos', '/billing': 'Assinatura',
};

const ADMIN_NAV: NavEntry[] = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: 'fa-chart-line' },
  { to: '/admin/companies', label: 'Clientes', icon: 'fa-building' },
  { to: '/admin/users', label: 'Usuários', icon: 'fa-users' },
  { to: '/admin/plans', label: 'Planos', icon: 'fa-tags' },
  { to: '/admin/webhooks', label: 'Webhooks', icon: 'fa-link' },
  { to: '/admin/migration', label: 'Migração', icon: 'fa-clone' },
];

function buildNav(role: string | undefined, modulos: string[]): NavEntry[] {
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
  const usaInstancia = atendimento || disparo || vendaCatalogo || venda || agendamento || ecommerce || farmaqui;
  const usaPagamento = vendaCatalogo || venda || agendamento;
  // Loja própria no AutoQui (tem Lojas + Configuração de catálogo). Atendimento,
  // Campanhas e E-commerce (NuvemShop) não são vitrine própria aqui.
  const temLojaPropria = vendaCatalogo || venda || vitrine || agendamento;

  // Empilhável: canais (exclusivos) definem o núcleo; camadas (IA/Campanhas) somam.
  // add() evita item duplicado quando duas ferramentas apontam pra mesma rota.
  const nav: NavEntry[] = [];
  const seen = new Set<string>();
  const add = (item: NavItem) => { if (!seen.has(item.to)) { seen.add(item.to); nav.push(item); } };

  add({ to: '/dashboard', label: 'Dashboard', icon: 'fa-chart-line' });
  if (role === 'owner') add({ to: '/tools', label: 'Ferramentas', icon: 'fa-shapes' });

  // ── Canal (só um ativo por vez) ──
  if (vitrine) {
    add({ to: '/products', label: 'Produtos', icon: 'fa-box' });
  } else if (agendamento) {
    add({ to: '/products', label: 'Serviços', icon: 'fa-list-check' });
    add({ to: '/schedule-clients', label: 'Clientes', icon: 'fa-users' });
    add({ to: '/schedule', label: 'Agenda', icon: 'fa-calendar-alt' });
  } else if (vendaCatalogo || venda) {
    add({ to: '/orders', label: 'Pedidos', icon: 'fa-clipboard-list' });
    add({ to: '/products', label: 'Produtos', icon: 'fa-box' });
  } else if (ecommerce) {
    add({ to: '/ecommerce', label: 'E-commerce', icon: 'fa-store' });
  } else if (farmaqui) {
    add({ to: '/farmaqui', label: 'FarmaQui', icon: 'fa-prescription-bottle-medical' });
    add({ to: '/leads', label: 'Clientes', icon: 'fa-people-group' });
  }

  // ── Camadas (somam sobre qualquer canal) ──
  if (atendimento || vendaCatalogo || venda) add({ to: '/leads', label: 'Leads', icon: 'fa-people-group' });
  if (disparo) add({ to: '/campaigns', label: 'Campanhas', icon: 'fa-bullhorn' });

  if (isEmployee) return nav;

  // ── Gestão (dono) ──
  nav.push({ divider: true });
  if (temLojaPropria) add({ to: '/stores', label: 'Lojas', icon: 'fa-store' });
  add({ to: '/users', label: 'Equipe', icon: 'fa-user' });
  if (usaInstancia) add({ to: '/instances', label: 'Instâncias', icon: 'fa-brands fa-whatsapp' });
  if (temLojaPropria) add({ to: '/catalog-settings', label: 'Configuração', icon: 'fa-sliders' });
  if (usaPagamento) add({ to: '/mercado-pago', label: 'Mercado Pago', icon: 'fa-credit-card' });
  add({ to: '/billing', label: 'Assinatura', icon: 'fa-receipt' });
  return nav;
}

// Itens principais para a barra inferior no mobile (máx 5).
function mobileNav(nav: NavEntry[]): NavItem[] {
  const items = nav.filter((n): n is NavItem => !('divider' in n));
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

  // Parede de cobrança: bloqueia o painel se a assinatura estiver inadimplente
  // além da tolerância. Fail-open (erro/backend fora → não bloqueia).
  const [blocked, setBlocked] = useState(false);
  useEffect(() => {
    if (!user || user.role === 'admin') return;
    subscriptionApi.mine().then((r) => setBlocked(!!r.bloqueada)).catch(() => {});
  }, [user]);

  const title = TITLES[location.pathname] || 'Painel';
  const nav = buildNav(user?.role, modulos || []);
  const mobile = mobileNav(nav);
  const isEmployee = user?.role === 'employee';

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
          <div className="logo-icon"><img style={{ width: '100%' }} src="/logo.png" alt="Logo" /></div>
          <span className="logo-text">AutoQui</span>
        </div>
        <nav className="sidebar-nav">
          {nav.map((item, i) => 'divider' in item
            ? <div key={`d${i}`} className="nav-divider" />
            : (
              <NavLink key={item.to + item.label} to={item.to} end
                className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
                <span className="icon">{iconEl(item.icon)}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          {user?.role !== 'admin' && (
            <a className="nav-item" href={HELP_WA} target="_blank" rel="noreferrer">
              <span className="icon">{iconEl('fa-brands fa-whatsapp')}</span>
              <span>Ajuda</span>
            </a>
          )}
        </nav>
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-info">
              <span className="name">{user?.role === 'admin' ? 'Administrador' : isEmployee ? 'Colaborador' : 'Dono da Empresa'}</span><br />
              <span className="role">{user?.email}</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <div className="topbar glass">
          <div className="topbar-left"><h2 className="page-title">{title}</h2></div>
          <div className="topbar-right">
            <button className="logout-btn" title="Sair" onClick={() => authService.logout()}>
              <span className="icon"><i style={{ color: '#FFF', fontSize: '1rem' }} className="fa-solid fa-arrow-right-from-bracket" /></span>
            </button>
          </div>
        </div>
        <div className="page-container">
          <Outlet />
        </div>

        {/* Bottom nav (mobile) */}
        <nav className="mobile-bottom-nav">
          {mobile.map((item) => (
            <NavLink key={item.to + item.label} to={item.to} end
              className={({ isActive }) => 'mobile-nav-item' + (isActive ? ' active' : '')}>
              {iconEl(item.icon)}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </main>
    </div>
  );
}
