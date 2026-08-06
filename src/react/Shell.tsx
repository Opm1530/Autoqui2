// Shell do painel: sidebar + topbar + área de conteúdo (Outlet).
// Reaproveita as classes do style.css atual (mesmo visual).
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { authService } from '../services/auth';
import { useAuth } from './useAuth';

interface NavItem { to: string; label: string; icon: string; }

// Itens do painel do dono (as variações por papel/módulo entram depois).
const NAV: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: 'fa-chart-line' },
  { to: '/orders', label: 'Pedidos', icon: 'fa-clipboard-list' },
  { to: '/products', label: 'Produtos', icon: 'fa-box' },
  { to: '/leads', label: 'Leads', icon: 'fa-people-group' },
  { to: '/stores', label: 'Lojas', icon: 'fa-store' },
  { to: '/users', label: 'Equipe', icon: 'fa-user' },
  { to: '/instances', label: 'Instâncias', icon: 'fa-brands fa-whatsapp' },
  { to: '/catalog-settings', label: 'Configuração', icon: 'fa-sliders' },
  { to: '/mercado-pago', label: 'Mercado Pago', icon: 'fa-credit-card' },
];

const TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard', '/orders': 'Pedidos', '/products': 'Produtos',
  '/leads': 'Leads', '/stores': 'Lojas', '/users': 'Usuários',
  '/instances': 'Instâncias', '/catalog-settings': 'Configuração',
  '/mercado-pago': 'Mercado Pago',
};

export function Shell() {
  const { user } = useAuth();
  const location = useLocation();
  const title = TITLES[location.pathname] || 'Painel';

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon"><img style={{ width: '100%' }} src="/logo.png" alt="Logo" /></div>
          <span className="logo-text">AutoQui</span>
        </div>
        <nav className="sidebar-nav">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
            >
              <span className="icon"><i className={item.icon.includes('fa-brands') ? item.icon : `fa-solid ${item.icon}`} /></span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-info">
              <span className="name">{user?.role === 'owner' ? 'Dono da Empresa' : 'Usuário'}</span><br />
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
      </main>
    </div>
  );
}
