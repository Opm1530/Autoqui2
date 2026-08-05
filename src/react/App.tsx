import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './useAuth';
import { Shell } from './Shell';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders/Orders';
import { Products } from './pages/Products/Products';
import { MercadoPago } from './pages/MercadoPago';
import { Users } from './pages/Users';

// Placeholder para páginas ainda não migradas.
function EmBreve({ nome }: { nome: string }) {
  return (
    <div className="card glass" style={{ padding: '2.5rem', textAlign: 'center' }}>
      <i className="fa-solid fa-screwdriver-wrench" style={{ fontSize: '2rem', color: 'var(--primary)' }} />
      <h3 style={{ marginTop: '1rem' }}>{nome}</h3>
      <p style={{ color: 'var(--text-muted)' }}>Esta página ainda será migrada para a nova interface.</p>
    </div>
  );
}

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

function Root() {
  const { user, loading } = useAuth();
  if (loading) return null;
  return <Navigate to={user ? '/dashboard' : '/login'} replace />;
}

// Se já estiver logado, sai da tela de login direto pro painel.
function LoginRoute() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return <Login />;
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginRoute />} />
          <Route element={<Protected />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/leads" element={<EmBreve nome="Leads" />} />
            <Route path="/stores" element={<EmBreve nome="Lojas" />} />
            <Route path="/users" element={<Users />} />
            <Route path="/instances" element={<EmBreve nome="Instâncias" />} />
            <Route path="/catalog-settings" element={<EmBreve nome="Configuração" />} />
            <Route path="/mercado-pago" element={<MercadoPago />} />
          </Route>
          <Route path="/" element={<Root />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
