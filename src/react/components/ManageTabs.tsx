import { NavLink } from 'react-router-dom';
import { useAuth } from '../useAuth';

// Sub-navegação do "hub" de Lojas: Negócio · Equipe · Instâncias.
// Usada no topo das páginas /business, /users e /instances.
// Colaborador não vê "Equipe".
const TABS = [
  { to: '/business', label: 'Negócio', icon: 'fa-store', ownerOnly: false },
  { to: '/users', label: 'Equipe', icon: 'fa-user', ownerOnly: true },
  { to: '/instances', label: 'Instâncias', icon: 'fa-brands fa-whatsapp', ownerOnly: false },
];

export function ManageTabs() {
  const { user } = useAuth();
  const isOwner = user?.role === 'owner' || user?.role === 'admin';
  return (
    <div className="manage-tabs">
      {TABS.filter((t) => isOwner || !t.ownerOnly).map((t) => (
        <NavLink key={t.to} to={t.to} end className={({ isActive }) => 'manage-tab' + (isActive ? ' active' : '')}>
          <i className={t.icon.includes('fa-brands') ? t.icon : `fa-solid ${t.icon}`} />
          <span>{t.label}</span>
        </NavLink>
      ))}
    </div>
  );
}
