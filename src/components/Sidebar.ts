export const Sidebar = () => {
    return `
        <div class="sidebar">
            <div class="sidebar-logo">
                <div class="logo-icon"><img style="width: 100%;" src="/logo.png" alt="Logo"></div>
                <span class="logo-text">AutoQui</span>
            </div>
            <nav class="sidebar-nav">
                <a href="/dashboard" class="nav-item">
                    <span class="icon">📊</span>
                    <span>Dashboard</span>
                </a>
                <a href="/orders" class="nav-item">
                    <span class="icon">📋</span>
                    <span>Pedidos</span>
                    <span id="orders-count-badge" class="count-badge hidden">0</span>
                </a>
                <a href="/products" class="nav-item">
                    <span class="icon">📦</span>
                    <span>Produtos</span>
                </a>
                <a href="/stores" class="nav-item">
                    <span class="icon">🏪</span>
                    <span>Lojas</span>
                </a>
                <div class="nav-divider"></div>
                <a href="/users" class="nav-item">
                    <span class="icon">👤</span>
                    <span>Usuários</span>
                </a>
                <a href="/ai-config" class="nav-item">
                    <span class="icon">⚙️</span>
                    <span>Configuração IA</span>
                </a>
                <div class="nav-divider"></div>
                <a href="/companies" class="nav-item">
                    <span class="icon">🏢</span>
                    <span>Clientes</span>
                </a>
            </nav>
            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="avatar">AD</div>
                    <div class="user-info">
                        <span class="name">Admin Global</span><br>
                        <span class="role">Super Admin</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};
