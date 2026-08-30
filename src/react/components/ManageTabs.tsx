import { NavLink } from 'react-router-dom';

// Sub-navegação do "hub" de Lojas: Lojas · Equipe · Instâncias.
// Usada no topo das páginas /business, /users e /instances.
const TABS = [
  { to: '/business', label: 'Negócio', icon: 'fa-store' },
  { to: '/users', label: 'Equipe', icon: 'fa-user' },
  { to: '/instances', label: 'Instâncias', icon: 'fa-brands fa-whatsapp' },
];

export function ManageTabs() {
  return (
    <div className="manage-tabs">
      {TABS.map((t) => (
        <NavLink key={t.to} to={t.to} end className={({ isActive }) => 'manage-tab' + (isActive ? ' active' : '')}>
          <i className={t.icon.includes('fa-brands') ? t.icon : `fa-solid ${t.icon}`} />
          <span>{t.label}</span>
        </NavLink>
      ))}
    </div>
  );
}
