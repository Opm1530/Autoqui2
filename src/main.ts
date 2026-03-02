import './style.css';
import { AdminSidebar } from './components/AdminSidebar';
import { OwnerSidebar } from './components/OwnerSidebar';
import { EmployeeSidebar } from './components/EmployeeSidebar';
import { Topbar } from './components/Topbar';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { Products } from './pages/Products';
import { Stores } from './pages/Stores';
import { AdminUsers } from './pages/AdminUsers';
import { OwnerUsers } from './pages/OwnerUsers';
import { AIConfig } from './pages/AIConfig';
import { Login } from './pages/Login';
import { Companies } from './pages/Companies';
import { Instances } from './pages/Instances';
import { Configuration } from './pages/Configuration';
import { authService } from './services/auth';
import { toast } from './services/toast';
import { orderNotification } from './services/orderNotification';
import type { UserRole } from './services/auth';
import { Leads } from './pages/Leads';
import { orderService } from './services/orderService';
import { Campaigns } from './pages/Campaigns';
import { Schedule } from './pages/Schedule';
import { Webhooks } from './pages/Webhooks';
import { MercadoPago } from './pages/MercadoPago';

// Core Application Logic
class App {
  private appElement: HTMLElement;

  constructor() {
    this.appElement = document.getElementById('app')!;
    this.init();
  }

  private init() {
    // Wait for auth to initialize
    authService.subscribe((user) => {
      this.render();
      if (user) {
        orderNotification.startListening();
      } else {
        orderNotification.stopListening();
      }
    });
    this.handleRouting();

    // Global listener to re-render without reload
    window.addEventListener('render-app', () => this.render());
  }

  private handleRouting() {
    window.addEventListener('popstate', () => this.render());

    // Intercept link clicks for SPA routing
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.getAttribute('href')?.startsWith('/')) {
        e.preventDefault();
        const url = link.getAttribute('href')!;
        // Prevent pushing same state
        if (window.location.pathname !== url) {
          history.pushState(null, '', url);
          this.render();
        }
      }
    });

    // Handle Login Form Submit
    document.addEventListener('submit', async (e) => {
      const target = e.target as HTMLElement;
      if (target.id === 'login-form') {
        e.preventDefault();
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        try {
          await authService.login(email, password);
          // Redirect will happen automatically due to auth subscription
        } catch (error) {
          toast.error('Erro ao fazer login: ' + error);
        }
      }
    });

    // Handle Logout
    document.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('#logout-btn')) {
        await authService.logout();
      }
    });
  }

  private async render() {
    const path = window.location.pathname;
    const user = authService.getCurrentUser();

    // 1. Unauthenticated -> Redirect to Login
    if (!user) {
      if (path !== '/login') {
        history.replaceState(null, '', '/login');
      }
      this.appElement.innerHTML = `<div id="page-content" class="login-page-container">${Login()}</div>`;
      return;
    }

    // 2. Authenticated but on Login page -> Redirect to Dashboard
    if (path === '/login' || path === '/') {
      const dashboardPath = user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
      history.replaceState(null, '', dashboardPath);
      this.render(); // Re-render to show dashboard
      return;
    }

    // 3. Role-Based Access Control
    if (!this.isRouteAllowed(path, user.role)) {
      this.appElement.innerHTML = `<h1>403 Forbidden</h1><p>Você não tem permissão para acessar esta página.</p>`;
      return;
    }

    const pageTitle = await this.getPageTitle(path);
    let SidebarComponent: () => Promise<string> | string;
    if (user.role === 'admin') SidebarComponent = AdminSidebar;
    else if (user.role === 'employee') SidebarComponent = EmployeeSidebar;
    else SidebarComponent = OwnerSidebar;

    // Layout structure
    const content = await this.getPageContent(path);
    const sidebarHtml = await SidebarComponent();

    this.appElement.innerHTML = `
            <div class="app-container">
                ${sidebarHtml}
                <main class="main-content">
                    ${Topbar(pageTitle)}
                    <div id="page-content" class="page-container">
                        ${content}
                    </div>
                </main>
            </div>
        `;

    this.updateActiveLinks();
    this.updateOrderCounter();
  }

  private isRouteAllowed(path: string, role: UserRole): boolean {
    if (role === 'admin') {
      return path.startsWith('/admin');
    } else {
      // Owner routes (not starting with /admin)
      return !path.startsWith('/admin');
    }
  }

  private async getPageTitle(path: string): Promise<string> {
    if (path === '/products') {
      const user = authService.getCurrentUser() as any;
      if (user?.companyId) {
        try {
          const { dbService } = await import('./services/db');
          const company = await dbService.get('companies', user.companyId) as any;
          const modulos = company?.modulos_ativos || [];
          if (modulos.includes('agendamento')) return 'Serviços';
        } catch { /* fallback */ }
      }
      return 'Produtos';
    }
    switch (path) {
      case '/':
      case '/dashboard':
      case '/admin/dashboard': return 'Dashboard';
      case '/orders': return 'Pedidos';
      case '/stores': return 'Lojas';
      case '/leads': return 'Leads';
      case '/users':
      case '/admin/users': return 'Usuários';
      case '/admin/ai-config': return 'Configuração IA';
      case '/companies':
      case '/admin/companies': return 'Gestão de Clientes';
      case '/instances': return 'Instâncias';
      case '/configuration': return 'Configurações';
      case '/campaigns': return 'Campanhas';
      case '/schedule': return 'Agenda';
      case '/admin/webhooks': return 'Configuração de Webhooks';
      case '/mercado-pago': return 'Mercado Pago';
      default: return 'Página não encontrada';
    }
  }

  private async getPageContent(path: string): Promise<string> {
    // Map routes to components
    // We can reuse components for now, but in future might want specific ones
    switch (path) {
      case '/':
      case '/dashboard':
      case '/admin/dashboard':
        return Dashboard();
      case '/orders':
        return Orders();
      case '/products':
        return Products();
      case '/stores':
        return Stores();
      case '/leads':
        return Leads();
      // Imports update (implicit in this tool call context, but I need to be careful about line numbers)
      // I will split this into two calls or use multi_replace if I could, but I'll update imports separate from this chunk if needed. 
      // Actually, let's just update the getPageContent first.
      case '/users':
        // If we are here, role could be logic-checked or we can infer from path if we had /admin/users vs /users
        // But /users is shared in the route switch map. 
        // Wait, in getPageTitle I mapped /users and /admin/users.
        // Let's use logic here.
        // But getPageContent doesn't have access to 'user' variable easily unless I pass it or access authService.
        // Use authService.getCurrentUser().
        const user = authService.getCurrentUser();
        return user?.role === 'admin' ? AdminUsers() : OwnerUsers();
      case '/admin/users':
        return AdminUsers();
      case '/admin/ai-config':
        return AIConfig();
      case '/companies':
      case '/admin/companies':
        return await Companies();
      case '/instances':
        return Instances();
      case '/configuration':
        return Configuration();
      case '/campaigns':
        return Campaigns();
      case '/schedule':
        return Schedule();
      case '/admin/webhooks':
        return await Webhooks();
      case '/mercado-pago':
        return await MercadoPago();
      default:
        return `<h1>404</h1><p>Página não encontrada.</p>`;
    }
  }

  private updateActiveLinks() {
    const path = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === path) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  private async updateOrderCounter() {
    const user = authService.getCurrentUser();
    if (!user || !user.companyId || user.role === 'admin') return;

    try {
      const userStoreIds = user.storeIds || (user.storeId ? [user.storeId] : []);
      const count = await orderService.getOpenOrdersCount(user.companyId, user.role === 'owner' ? [] : userStoreIds);
      const badge = document.getElementById('orders-count-badge');
      if (badge) {
        badge.textContent = count.toString();
        if (count > 0) {
          badge.classList.remove('hidden');
        } else {
          badge.classList.add('hidden');
        }
      }
    } catch (error) {
      console.error('Error updating order counter:', error);
    }
  }
}

// Initialize the app
new App();
