import { authService } from '../services/auth';
import { dbService } from '../services/db';

export const EmployeeSidebar = async () => {
    const user = authService.getCurrentUser();
    let showVenda = false;
    let showAgendamento = false;

    if (user && user.companyId) {
        try {
            const companyDoc = await dbService.get('companies', user.companyId);
            const company = companyDoc as any;
            const modulos = company?.modulos_ativos || ['atendimento'];

            if (modulos.includes('venda')) showVenda = true;
            if (modulos.includes('agendamento')) showAgendamento = true;
        } catch (error) {
            console.error('Error fetching company for employee sidebar:', error);
        }
    }

    return `
        <div class="sidebar">
            <div class="sidebar-logo">
                <div class="logo-icon"><img style="width: 100%;" src="/logo.png" alt="Logo"></div>
                <span class="logo-text">Painel Equipe</span>
            </div>
            <nav class="sidebar-nav">
                <a href="/dashboard" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-chart-line"></i></span>
                    <span>Dashboard</span>
                </a>

                ${showVenda ? `
                <a href="/orders" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-cart-shopping"></i></span>
                    <span>Pedidos</span>
                    <span id="orders-count-badge" class="count-badge hidden">0</span>
                </a>
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-box"></i></span>
                    <span>Produtos</span>
                </a>
                ` : ''}

                ${showAgendamento ? `
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-list-check"></i></span>
                    <span>Serviços</span>
                </a>
                <a href="/schedule" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-calendar-alt"></i></span>
                    <span>Agenda</span>
                </a>
                ` : ''}

                <a href="/leads" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-people-group"></i></span>
                    <span>Leads</span>
                </a>
            </nav>
            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="avatar">EQ</div>
                    <div class="user-info">
                        <span class="name">Colaborador</span><br>
                        <span class="role">Staff</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};
