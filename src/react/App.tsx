import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { API_BASE_URL } from '../services/api';
import { AuthProvider, useAuth } from './useAuth';
import { Shell } from './Shell';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders/Orders';
import { Products } from './pages/Products/Products';
import { MercadoPago } from './pages/MercadoPago';
import { Users } from './pages/Users';
import { Instances } from './pages/Instances';
import { Leads } from './pages/Leads/Leads';
import { CatalogSettings } from './pages/Configuration/CatalogSettings';
import { Stores } from './pages/Stores';
import { Campaigns } from './pages/Campaigns/Campaigns';
import { Schedule } from './pages/Schedule/Schedule';
import { ScheduleClients } from './pages/Schedule/ScheduleClients';
import { Catalog } from './pages/Catalog/Catalog';
import { FarmaLanding } from './pages/FarmaLanding';
import { QRPage } from './pages/QRPage';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { Companies } from './pages/Admin/Companies';
import { AdminUsers } from './pages/Admin/AdminUsers';
import { Webhooks } from './pages/Admin/Webhooks';
import { AdminMigration } from './pages/Admin/AdminMigration';
import { Plans } from './pages/Admin/Plans';
import { Billing } from './pages/Billing';
import { ChangePassword } from './pages/ChangePassword';
import { Tools } from './pages/Tools';
import { Ecommerce } from './pages/Ecommerce';
import { FarmaQui } from './pages/FarmaQui';
import { LandingPage } from './pages/Landing/LandingPage';

function Protected() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: 'var(--primary)' }} />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return <Shell />;
}

const homeFor = (user: any) => !user ? '/login' : user.role === 'admin' ? '/admin/dashboard' : '/dashboard';

// Se já estiver logado, sai da tela de login direto pro painel.
// Hosts do app principal (painel + landing). Qualquer outro host é uma vitrine
// servida por subdomínio/domínio próprio → resolve o host e mostra o catálogo.
const MAIN_HOSTS = ['autoqui.com.br', 'www.autoqui.com.br', 'localhost', '127.0.0.1'];

function RootRoute() {
  const host = window.location.hostname;
  if (MAIN_HOSTS.includes(host)) return <LandingPage />;
  return <StorefrontHost host={host} />;
}

function StorefrontHost({ host }: { host: string }) {
  const [res, setRes] = useState<{ storeId?: string | null; companyId?: string; tipo?: string } | null | undefined>(undefined);
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/domains/store-by-host?host=${encodeURIComponent(host)}`)
      .then((r) => r.json()).then((d) => setRes(d.companyId ? d : null)).catch(() => setRes(null));
  }, [host]);
  if (res === undefined) return null;            // resolvendo
  if (!res) return <LandingPage />;              // host não cadastrado → cai na landing
  if (res.tipo === 'landing') return <FarmaLanding companyId={res.companyId} />;
  if (res.storeId) return <Catalog storeId={res.storeId} />;
  return <LandingPage />;
}

function LoginRoute() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to={homeFor(user)} replace />;
  return <Login />;
}

function SignupRoute() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to={homeFor(user)} replace />;
  return <Signup />;
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas públicas (sem login) */}
          <Route path="/catalog/:storeId" element={<Catalog />} />
          <Route path="/qr/:token" element={<QRPage />} />

          <Route path="/login" element={<LoginRoute />} />
          <Route path="/signup" element={<SignupRoute />} />
          <Route element={<Protected />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/farmaqui" element={<FarmaQui />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/users" element={<Users />} />
            <Route path="/instances" element={<Instances />} />
            <Route path="/catalog-settings" element={<CatalogSettings />} />
            <Route path="/mercado-pago" element={<MercadoPago />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/schedule-clients" element={<ScheduleClients />} />
            {/* Admin global */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/companies" element={<Companies />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/webhooks" element={<Webhooks />} />
            <Route path="/admin/migration" element={<AdminMigration />} />
            <Route path="/admin/plans" element={<Plans />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
          <Route path="/" element={<RootRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
