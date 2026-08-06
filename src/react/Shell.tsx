// Shell do painel: sidebar + topbar + área de conteúdo (Outlet).
// O menu é montado conforme o papel (owner/employee) e os módulos ativos da empresa.
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { authService } from '../services/auth';
import { dbService } from '../services/db';
import { useAuth } from './useAuth';

interface NavItem { to: string; label: string; icon: string; }
type NavEntry = NavItem | { divider: true };

const TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard', '/orders': 'Pedidos', '/products': 'Produtos',
  '/leads': 'Leads', '/stores': 'Lojas', '/users': 'Usuários',
  '/instances': 'Instâncias', '/catalog-settings': 'Configuração',
  '/mercado-pago': 'Mercado Pago', '/campaigns': 'Campanhas',
  '/schedule': 'Agenda', '/schedule-clients': 'Clientes',
};

function buildNav(role: string | undefined, modulos: string[]): NavEntry[] {
  const has = (m: string) => modulos.includes(m);
  const venda = has('venda');
  const agendamento = has('agendamento');
  const disparo = has('disparo');
  const vendaCatalogo = has('venda_catalogo');
  const isEmployee = role === 'employee';

  const nav: NavEntry[] = [{ to: '/dashboard', label: 'Dashboard', icon: 'fa-chart-line' }];

  // ── Modo catálogo (venda_catalogo) ──
  if (vendaCatalogo) {
    nav.push({ to: '/orders', label: 'Pedidos', icon: 'fa-clipboard-list' });
    nav.push({ to: '/products', label: 'Produtos', icon: 'fa-box' });
    nav.push({ to: '/leads', label: 'Leads', icon: 'fa-people-group' });
    if (disparo) nav.push({ to: '/campaigns', label: 'Campanhas', icon: 'fa-bullhorn' });
    if (isEmployee) return nav;
    nav.push({ divider: true });
    nav.push({ to: '/stores', label: 'Lojas', icon: 'fa-store' });
    nav.push({ to: '/users', label: 'Equipe', icon: 'fa-user' });
    nav.push({ to: '/instances', label: 'Instâncias', icon: 'fa-brands fa-whatsapp' });
    nav.push({ to: '/catalog-settings', label: 'Configuração', icon: 'fa-sliders' });
    nav.push({ to: '/mercado-pago', label: 'Mercado Pago', icon: 'fa-credit-card' });
    return nav;
  }

  // ── Modo padrão (atendimento / venda / agendamento) ──
  if (venda) {
    nav.push({ to: '/orders', label: 'Pedidos', icon: 'fa-clipboard-list' });
    nav.push({ to: '/products', label: 'Produtos', icon: 'fa-box' });
  }
  if (agendamento) {
    nav.push({ to: '/products', label: 'Serviços', icon: 'fa-list-check' });
    nav.push({ to: '/schedule-clients', label: 'Clientes', icon: 'fa-users' });
    nav.push({ to: '/schedule', label: 'Agenda', icon: 'fa-calendar-alt' });
  }
  nav.push({ to: '/leads', label: 'Leads', icon: 'fa-people-group' });
  if (disparo) nav.push({ to: '/campaigns', label: 'Campanhas', icon: 'fa-bullhorn' });

  if (isEmployee) return nav;

  nav.push({ divider: true });
  nav.push({ to: '/stores', label: 'Lojas', icon: 'fa-store' });
  nav.push({ to: '/users', label: 'Equipe', icon: 'fa-user' });
  nav.push({ to: '/instances', label: 'Instâncias', icon: 'fa-brands fa-whatsapp' });
  nav.push({ to: '/catalog-settings', label: 'Configuração', icon: 'fa-sliders' });
  nav.push({ to: '/mercado-pago', label: 'Mercado Pago', icon: 'fa-credit-card' });
  return nav;
}

// Itens principais para a barra inferior no mobile (máx 5).
function mobileNav(nav: NavEntry[]): NavItem[] {
  const items = nav.filter((n): n is NavItem => !('divider' in n));
  const priority = ['/dashboard', '/orders', '/products', '/leads', '/catalog-settings'];
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

  const title = TITLES[location.pathname] || 'Painel';
  const nav = buildNav(user?.role, modulos || []);
  const mobile = mobileNav(nav);
  const isEmployee = user?.role === 'employee';

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
        </nav>
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-info">
              <span className="name">{isEmployee ? 'Colaborador' : 'Dono da Empresa'}</span><br />
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
