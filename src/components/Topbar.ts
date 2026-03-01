export const Topbar = (title: string) => {
    return `
        <div class="topbar glass">
            <div class="topbar-left">
                <h2 class="page-title">${title}</h2>
            </div>
            <div class="topbar-right">
                <!--<div class="notification-bell">
                    <span class="icon">🔔</span>
                    <span class="dot"></span>
                </div>-->
                <div class="search-bar">
                    <span class="icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                    <input type="text" placeholder="Buscar...">
                </div>
                <button id="logout-btn" class="logout-btn" title="Sair">
                    <span class="icon"><i style="color: #FFF; font-size: 1.0rem;" class="fa-solid fa-arrow-right-from-bracket"></i></span>
                </button>
            </div>
        </div>
    `;
};
