import { authService } from '../services/auth';
import { dbService } from '../services/db';

export const OwnerSidebar = async () => {
    const user = authService.getCurrentUser();
    let showVenda = false;
    let showAgendamento = false;
    let showDisparo = false;

    if (user && user.companyId) {
        try {
            const companyDoc = await dbService.get('companies', user.companyId);
            const company = companyDoc as any;
            const modulos = company?.modulos_ativos || ['atendimento']; // Default fallback

            if (modulos.includes('venda')) {
                showVenda = true;
            }
            if (modulos.includes('agendamento')) showAgendamento = true;
            if (modulos.includes('disparo')) showDisparo = true;
        } catch (error) {
            console.error('Error fetching company for sidebar:', error);
        }
    }

    return `
        <div class="sidebar">
            <div class="sidebar-logo">
                <div class="logo-icon"><img style="width: 100%;" src="/logo.png" alt="Logo"></div>
                <span class="logo-text">Painel do Dono</span>
            </div>
            <nav class="sidebar-nav">
                <a href="/dashboard" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-chart-line"></i></span>
                    <span>Dashboard</span>
                </a>
                
                ${showVenda ? `
                <a href="/orders" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-clipboard-list"></i></span>
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
                ` : ''}

                <a href="/stores" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-store"></i></span>
                    <span>Lojas</span>
                </a>

                <a href="/leads" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-people-group"></i></span>
                    <span>Leads</span>
                </a>

                ${showAgendamento ? `
                <a href="/schedule" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-calendar-alt"></i></span>
                    <span>Agenda</span>
                </a>
                ` : ''}

                ${showDisparo ? `
                <a href="/campaigns" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-bullhorn"></i></span>
                    <span>Campanhas</span>
                </a>
                ` : ''}
                
                <div class="nav-divider"></div>
                
                <a href="/users" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-user"></i></span>
                    <span>Equipe</span>
                </a>
                <a href="/instances" class="nav-item">
                    <span class="icon"><i class="fa-brands fa-whatsapp"></i></span>
                    <span>Instâncias</span>
                </a>
                <a href="/configuration" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-gear"></i></span>
                    <span>Configurações</span>
                </a>
                <a href="/mercado-pago" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-credit-card"></i></span>
                    <span>Mercado Pago</span>
                </a>
            </nav>
            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="avatar">DO</div>
                    <div class="user-info">
                        <span class="name">Dono do Cliente</span><br>
                        <span class="role">Owner</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};
