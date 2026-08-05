const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/productsApi-DaCynMcK.js","assets/productsApi-CCkEB1H2.css"])))=>i.map(i=>d[i]);
import{a as ce,d as T,t as w,e as be,c as We,b as Qe,q as Ge,w as He,o as Xe,r as Ae,s as Se,g as Pe,f as Le,h as pe,p as qe,i as Ea,u as Ne,l as Ia,j as Ca,T as _e,A as Ve,k as La,_ as Aa}from"./productsApi-DaCynMcK.js";const Sa=()=>`
        <div class="sidebar">
            <div class="sidebar-logo">
                <div class="logo-icon"><img style="width: 100%;" src="/logo.png" alt="Logo"></div>
                <span class="logo-text">Admin Panel</span>
            </div>
            <nav class="sidebar-nav">
                <a href="/admin/dashboard" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-chart-line"></i></span>
                    <span>Dashboard</span>
                </a>
                <a href="/admin/companies" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-building"></i></span>
                    <span>Clientes</span>
                </a>
                <a href="/admin/users" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-users"></i></span>
                    <span>Usuários</span>
                </a>
                <a href="/admin/webhooks" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-link"></i></span>
                    <span>Webhooks</span>
                </a>
                <a href="/admin/migration" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-clone"></i></span>
                    <span>Migração</span>
                </a>
            </nav>
            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="avatar">AD</div>
                    <div class="user-info">
                        <span class="name">Administrador</span><br>
                        <span class="role">Super Admin</span>
                    </div>
                </div>
            </div>
        </div>
    `,za=async()=>{const i=ce.getCurrentUser();let e=!1,f=!1,k=!1,m=!1;if(i&&i.companyId)try{const x=(await T.get("companies",i.companyId))?.modulos_ativos||["atendimento"];x.includes("venda")&&(e=!0),x.includes("agendamento")&&(f=!0),x.includes("disparo")&&(k=!0),x.includes("venda_catalogo")&&(m=!0)}catch($){console.error("Error fetching company for sidebar:",$)}return m?`
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
                <a href="/orders" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-clipboard-list"></i></span>
                    <span>Pedidos</span>
                    <span id="orders-count-badge" class="count-badge hidden">0</span>
                </a>
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-box"></i></span>
                    <span>Produtos</span>
                </a>
                <a href="/leads" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-people-group"></i></span>
                    <span>Leads</span>
                </a>

                ${k?`
                <a href="/campaigns" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-bullhorn"></i></span>
                    <span>Campanhas</span>
                </a>
                `:""}

                <div class="nav-divider"></div>

                <a href="/stores" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-store"></i></span>
                    <span>Lojas</span>
                </a>
                <a href="/users" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-user"></i></span>
                    <span>Equipe</span>
                </a>
                <a href="/instances" class="nav-item">
                    <span class="icon"><i class="fa-brands fa-whatsapp"></i></span>
                    <span>Instâncias</span>
                </a>
                <a href="/catalog-settings" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-sliders"></i></span>
                    <span>Configuração</span>
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
                        <span class="name">Dono da Empresa</span><br>
                        <span class="role">Owner</span>
                    </div>
                </div>
            </div>
        </div>
        `:`
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
                
                ${e?`
                <a href="/orders" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-clipboard-list"></i></span>
                    <span>Pedidos</span>
                    <span id="orders-count-badge" class="count-badge hidden">0</span>
                </a>
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-box"></i></span>
                    <span>Produtos</span>
                </a>
                `:""}



                <a href="/stores" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-store"></i></span>
                    <span>Lojas</span>
                </a>

                <a href="/leads" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-people-group"></i></span>
                    <span>Leads</span>
                </a>

                ${f?`
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-list-check"></i></span>
                    <span>Serviços</span>
                </a>
                <a href="/schedule-clients" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-users"></i></span>
                    <span>Clientes</span>
                </a>
                <a href="/schedule" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-calendar-alt"></i></span>
                    <span>Agenda</span>
                </a>
                `:""}

                ${k?`
                <a href="/campaigns" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-bullhorn"></i></span>
                    <span>Campanhas</span>
                </a>
                `:""}
                
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
                        <span class="name">Dono da Empresa</span><br>
                        <span class="role">Owner</span>
                    </div>
                </div>
            </div>
        </div>
    `},Ba=async()=>{const i=ce.getCurrentUser();let e=!1,f=!1,k=!1;if(i&&i.companyId)try{const v=(await T.get("companies",i.companyId))?.modulos_ativos||["atendimento"];v.includes("venda")&&(e=!0),v.includes("agendamento")&&(f=!0),v.includes("venda_catalogo")&&(k=!0)}catch(m){console.error("Error fetching company for employee sidebar:",m)}return k?`
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
                <a href="/orders" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-clipboard-list"></i></span>
                    <span>Pedidos</span>
                    <span id="orders-count-badge" class="count-badge hidden">0</span>
                </a>
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-box"></i></span>
                    <span>Produtos</span>
                </a>
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
        `:`
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

                ${e?`
                <a href="/orders" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-cart-shopping"></i></span>
                    <span>Pedidos</span>
                    <span id="orders-count-badge" class="count-badge hidden">0</span>
                </a>
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-box"></i></span>
                    <span>Produtos</span>
                </a>
                `:""}

                ${f?`
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-list-check"></i></span>
                    <span>Serviços</span>
                </a>
                <a href="/schedule-clients" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-users"></i></span>
                    <span>Clientes</span>
                </a>
                <a href="/schedule" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-calendar-alt"></i></span>
                    <span>Agenda</span>
                </a>
                `:""}

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
    `},Ta=i=>`
        <div class="topbar glass">
            <div class="topbar-left">
                <h2 class="page-title">${i}</h2>
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
    `;window.copyToClipboard=(i,e="Link copiado!")=>{navigator.clipboard.writeText(i).then(()=>{w.success(e)}).catch(f=>{console.error("Erro ao copiar link:",f),w.error("Erro ao copiar link.")})};window.toggleStoreActive=async(i,e,f)=>{try{const k=await T.get("companies",i);if(!k)return;const $=k.stores||[],v=$.findIndex(x=>x.id===e);v!==-1&&($[v].active=f,await T.update("companies",i,{stores:$}),w.success(`Loja ${f?"ativada":"desativada"} com sucesso!`),setTimeout(()=>location.reload(),1e3))}catch(k){console.error("Error toggling store status:",k),w.error("Erro ao alterar status da loja.")}};const Ma=async()=>{const i=ce.getCurrentUser();if(!i)return"";let e={messages:0,payments:0,orders_pending:0,orders_paid:0,today:0,openai:{usage:0,credits:0,limit:0}},f=["atendimento"],k=null;if(i?.role==="admin"){f=["atendimento","venda","agendamento","disparo"];try{(await T.getAll("companies")).forEach(x=>{x.metrics&&(e.messages+=x.metrics.totalMessages||0,e.payments+=x.metrics.totalPayments||0)}),e.orders_pending=15,e.orders_paid=1200;const v=await T.get("settings","openai");v?e.openai={usage:v.usage||0,credits:v.credits||0,limit:v.limit||0}:e.openai={usage:0,credits:0,limit:0}}catch($){console.error("Error fetching dashboard data:",$)}}else if(i?.companyId)try{f=(await T.get("companies",i.companyId))?.modulos_ativos||["atendimento"];const x=f.includes("atendimento"),M=f.includes("venda")||f.includes("venda_catalogo"),N=f.includes("venda_catalogo"),[_,j,I]=await Promise.all([x?T.getAll("messages",{field:"empresaId",operator:"==",value:i.companyId}):Promise.resolve([]),M?T.getAll("pedidos",{field:"empresaId",operator:"==",value:i.companyId}):Promise.resolve([]),N?T.getAll("products",{field:"companyId",operator:"==",value:i.companyId}):Promise.resolve([])]);if(x){const U=i.storeIds||(i.storeId?[i.storeId]:[]);e.messages=_.filter(F=>F.role!=="assistente"?!1:i.role==="owner"?!0:F.lojaId&&U.includes(F.lojaId)).length}if(M){const U=i.storeIds||(i.storeId?[i.storeId]:[]),F=i.role==="owner"?j:j.filter(o=>o.lojaId&&U.includes(o.lojaId));e.orders_pending=F.filter(o=>{const l=(o.status||"em_montagem").toLowerCase(),r=l==="finalizado"||l==="cancelado";return o.arquivado?!1:!r}).length,e.orders_paid=F.filter(o=>o.status==="finalizado").length;let S=0,d=0;const s=new Date;if(s.setHours(0,0,0,0),F.forEach(o=>{o.status==="finalizado"&&(S+=o.value||o.total||0),(o.criadoEm?.toDate?o.criadoEm.toDate():new Date(o.criadoEm||0))>=s&&d++}),e.payments=S,e.today=d,N){const l=I.filter(p=>p.stock!=null&&p.stock<=5&&p.active!==!1).sort((p,E)=>(p.stock??0)-(E.stock??0)).slice(0,10),r=new Map;F.forEach(p=>{(Array.isArray(p.items)?p.items:Array.isArray(p.itens)?p.itens:[]).forEach(D=>{const Q=D.name||D.item||"Produto",a=D.qty||D.quantidade||1,g=D.price||D.preco||0,z=r.get(Q)||{name:Q,qty:0,revenue:0};r.set(Q,{name:Q,qty:z.qty+a,revenue:z.revenue+a*g})})});const h=Array.from(r.values()).sort((p,E)=>E.qty-p.qty).slice(0,5),y=new Map;F.forEach(p=>{const D=(p.criadoEm?.toDate?p.criadoEm.toDate():new Date(p.criadoEm||0)).getHours();y.set(D,(y.get(D)||0)+1)});const b=Array.from(y.entries()).sort((p,E)=>E[1]-p[1]).slice(0,3),L=e.orders_paid>0?S/e.orders_paid:0;k={lowStockProducts:l,topProducts:h,bestHours:b,avgTicket:L,totalOrders:F.length}}}}catch($){console.error("Error fetching dashboard data:",$)}return setTimeout(()=>{i?.companyId&&m(i.companyId,i)},100),`
        <div class="page-header">
            <h2 class="page-title">Visão Geral (${i?.role==="admin"?"Global":"Cliente"})</h2>
        </div>

        <div class="dashboard-grid">
            ${i.role==="admin"?`
                <div class="stats-card card" style="border: 1px solid rgba(16,185,129,0.3); background: rgba(16,185,129,0.02);">
                    <div class="stats-icon success"><i style="color: #ffffff8f;" class="fa-solid fa-coins"></i></div>
                    <div class="stats-info">
                        <span class="label">Créditos OpenAI</span><br>
                        <span class="value" style="color:var(--success);">$ ${e.openai.credits.toFixed(2)}</span>
                    </div>
                </div>
                <div class="stats-card card" style="border: 1px solid rgba(239,68,68,0.3); background: rgba(239,68,68,0.02);">
                    <div class="stats-icon danger"><i style="color: #ffffff8f;" class="fa-solid fa-file-invoice-dollar"></i></div>
                    <div class="stats-info">
                        <span class="label">Gasto OpenAI (Mês)</span><br>
                        <span class="value" style="color:var(--danger);">$ ${e.openai.usage.toFixed(2)}</span>
                    </div>
                </div>
            `:""}
            ${f.includes("atendimento")?`
            <div class="stats-card card">
                <div class="stats-icon primary"><i style="color: #ffffff8f;" class="fa-solid fa-message"></i></div>
                <div class="stats-info">
                    <span class="label">Mensagens pela IA</span><br>
                    <span class="value">${e.messages}</span>
                </div>
            </div>`:""}
            ${f.includes("venda")||f.includes("venda_catalogo")?`
            <div class="stats-card card">
                <div class="stats-icon success"><i style="color: #ffffff8f;" class="fa-solid fa-money-bill"></i></div>
                <div class="stats-info">
                    <span class="label">Total em Vendas</span><br>
                    <span class="value">R$ ${e.payments.toFixed(2)}</span>
                </div>
            </div>
            <div class="stats-card card">
                <div class="stats-icon warning"><i style="color: #ffffff8f;" class="fa-solid fa-hourglass-half"></i></div>
                <div class="stats-info">
                    <span class="label">Pedidos Pendentes</span><br>
                    <span class="value">${e.orders_pending}</span>
                </div>
            </div>
            <div class="stats-card card">
                <div class="stats-icon info"><i style="color: #ffffff8f;" class="fa-solid fa-box"></i></div>
                <div class="stats-info">
                    <span class="label">Pedidos Hoje</span><br>
                    <span class="value">${e.today||0}</span>
                </div>
            </div>
            ${k?`
            <div class="stats-card card">
                <div class="stats-icon primary"><i style="color: #ffffff8f;" class="fa-solid fa-receipt"></i></div>
                <div class="stats-info">
                    <span class="label">Ticket Médio</span><br>
                    <span class="value">R$ ${k.avgTicket.toFixed(2)}</span>
                </div>
            </div>
            `:""}
            `:""}
        </div>

        ${k?`
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem;margin-top:1.5rem;">

            <!-- Low Stock Alert -->
            <div class="card" style="border:1px solid rgba(239,68,68,0.3);background:rgba(239,68,68,0.03);">
                <h4 style="margin:0 0 1rem;display:flex;align-items:center;gap:8px;font-size:0.95rem;">
                    <i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;"></i> Estoque Baixo
                </h4>
                ${k.lowStockProducts.length===0?'<p style="color:var(--text-muted);font-size:0.85rem;">Todos os produtos estão com estoque adequado.</p>':k.lowStockProducts.map($=>`
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                            <span style="font-size:0.85rem;font-weight:500;">${$.name}</span>
                            <span class="badge ${$.stock===0?"danger":"warning"}">${$.stock===0?"Esgotado":$.stock+" un."}</span>
                        </div>
                    `).join("")}
            </div>

            <!-- Top Selling Products -->
            <div class="card">
                <h4 style="margin:0 0 1rem;display:flex;align-items:center;gap:8px;font-size:0.95rem;">
                    <i class="fa-solid fa-trophy" style="color:#f59e0b;"></i> Top 5 Produtos
                </h4>
                ${k.topProducts.length===0?'<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum pedido com itens ainda.</p>':k.topProducts.map(($,v)=>`
                        <div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                            <span style="font-size:1rem;font-weight:900;color:${v===0?"#f59e0b":v===1?"#94a3b8":v===2?"#b45309":"var(--text-dim)"};min-width:20px;">${v+1}</span>
                            <span style="flex:1;font-size:0.85rem;font-weight:500;">${$.name}</span>
                            <span style="font-size:0.8rem;color:var(--text-muted);">${$.qty} un.</span>
                            <span style="font-size:0.8rem;color:var(--success);">R$ ${$.revenue.toFixed(2)}</span>
                        </div>
                    `).join("")}
            </div>

            <!-- Best Sales Hours -->
            <div class="card">
                <h4 style="margin:0 0 1rem;display:flex;align-items:center;gap:8px;font-size:0.95rem;">
                    <i class="fa-solid fa-chart-bar" style="color:var(--primary);"></i> Melhores Horários
                </h4>
                ${k.bestHours.length===0?'<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum pedido registrado ainda.</p>':k.bestHours.map(([$,v],x)=>{const M=k.bestHours[0][1],N=Math.round(v/M*100);return`
                            <div style="margin-bottom:10px;">
                                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                                    <span style="font-size:0.85rem;font-weight:600;">${String($).padStart(2,"0")}h – ${String($+1).padStart(2,"0")}h</span>
                                    <span style="font-size:0.8rem;color:var(--text-muted);">${v} pedido${v!==1?"s":""}</span>
                                </div>
                                <div style="height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;">
                                    <div style="width:${N}%;height:100%;background:${x===0?"var(--primary)":"rgba(99,102,241,0.4)"};border-radius:3px;"></div>
                                </div>
                            </div>
                        `}).join("")}
            </div>

        </div>
        `:""}

        <div id="store-statuses-container"></div>
    `;async function m($,v){const x=document.getElementById("store-statuses-container");if(x)try{const N=await T.get("companies",$);let _=N?.stores||[];const I=await T.getAll("instancias",{field:"empresaId",operator:"==",value:$});if(v.role!=="owner"){const F=v.storeIds||(v.storeId?[v.storeId]:[]);_=_.filter(S=>F.includes(S.id))}if(_.length===0){x.innerHTML=`
                    <div class="card" style="margin-top: 1.5rem; background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2);">
                        <h3 style="color: var(--danger);"><i class="fa-solid fa-triangle-exclamation"></i> Sistema Inoperante</h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">Nenhuma loja encontrada ou associada a este usuário. O sistema não pode operar.</p>
                    </div>
                `;return}let U="";for(const F of _){let S="",d=!1;const s=(F.instancia_id?I.find(h=>h.id===F.instancia_id):null)||I.find(h=>h.lojaId===F.id),o=s?.nome;if(!s||F.active===!1)S=`
                        <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--danger); margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <p style="margin: 0; font-weight: 600; color: var(--danger);"><i class="fa-solid fa-circle-xmark"></i> Loja Inoperante</p>
                                    <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">${s?"Loja desativada":"Sem instância vinculada"}.</p>
                                </div>
                                <button class="btn-primary btn-sm" onclick="toggleStoreActive('${N.id}', '${F.id}', true)">
                                    <i class="fa-solid fa-play"></i> Ativar Loja
                                </button>
                            </div>
                        </div>
                    `;else try{const h=await be.getInstanceStatus(o);if(["open","connected","CONNECTED","ON"].includes(h.state))d=!0,S=`
                                <div style="background: rgba(34, 197, 94, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #22c55e; margin-bottom: 1rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div>
                                            <p style="margin: 0; font-weight: 600; color: #22c55e;"><i class="fa-solid fa-circle-check"></i> Instância Conectada</p>
                                            <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">A IA e o WhatsApp estão online (Instância: ${o}).</p>
                                        </div>
                                        <button class="btn-danger btn-sm" onclick="toggleStoreActive('${N.id}', '${F.id}', false)" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                                            <i class="fa-solid fa-power-off"></i> Desativar
                                        </button>
                                    </div>
                                </div>
                            `;else{const L=await be.getQRCode(o);S=`
                                <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--danger); margin-bottom: 1rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                                        <div>
                                            <p style="margin: 0; font-weight: 600; color: var(--danger);"><i class="fa-solid fa-triangle-exclamation"></i> Instância Desconectada</p>
                                            <p style="margin: 0.25rem 0 0.5rem 0; font-size: 0.85rem; color: var(--text-muted);">Instância: <strong>${o}</strong>. Escaneie o QR Code.</p>
                                        </div>
                                        <button class="btn-danger btn-sm" onclick="toggleStoreActive('${N.id}', '${F.id}', false)" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                                            <i class="fa-solid fa-power-off"></i> Desativar
                                        </button>
                                    </div>
                                    ${L?.base64?`<img src="${L.base64}" alt="QR" style="width:150px;height:150px;display:block;margin:0 auto;border-radius:8px; background: white; padding: 5px;">`:'<p style="font-size:0.8rem;text-align:center; padding: 20px;">QR Code indisponível no momento. Tente atualizar a página.</p>'}
                                </div>
                            `}}catch(h){console.error("Error checking instance status in dashboard:",h),S=`
                            <div style="background: rgba(245, 158, 11, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--warning); margin-bottom: 1rem;">
                                <p style="margin: 0; font-weight: 600; color: var(--warning);"><i class="fa-solid fa-circle-exclamation"></i> Erro de Comunicação</p>
                                <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">Não foi possível verificar a instância: <strong>${o}</strong>. Verifique sua conexão.</p>
                            </div>
                        `}const l=F.frete_ativo!==!1,r=s&&F.active!==!1;U+=`
                    <div class="card" style="margin-top: 1.5rem; border: 1px solid ${d?"rgba(34,197,94,0.3)":"rgba(239,68,68,0.3)"};">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                            <div>
                                <h3 style="margin-bottom: 0.25rem;"><i class="fa-solid fa-store"></i> ${F.name}</h3>
                                <div style="display:flex; gap: 0.5rem; flex-wrap: wrap;">
                                    <span class="badge ${r?"success":"danger"}">${r?"Operante":"Inoperante"}</span>
                                    <span class="badge ${d?"success":"warning"}">${d?"WhatsApp Online":"WhatsApp Offline"}</span>
                                    <span class="badge ${l?"success":"warning"}">${l?"Frete Ativo":"Retirada Apenas"}</span>
                                </div>
                            </div>
                            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                ${o?`
                                <button class="btn-secondary btn-sm" onclick="copyToClipboard('${window.location.origin}/qr/${o}', 'Link de conexão copiado!')" title="Link para conectar WhatsApp" style="display: flex; align-items: center; gap: 6px; padding: 6px 10px; font-size: 0.75rem; border-radius: 6px; border-color: rgba(245, 158, 11, 0.3);">
                                    <i class="fa-solid fa-qrcode" style="font-size: 0.75rem; color: var(--warning);"></i> Link QR
                                </button>
                                `:""}
                                <a href="/catalog/${F.id}" target="_blank" class="btn-secondary btn-sm" style="text-decoration: none; display: flex; align-items: center; gap: 6px; padding: 6px 10px; font-size: 0.75rem; border-radius: 6px;">
                                    <i class="fa-solid fa-up-right-from-square" style="font-size: 0.75rem;"></i> Catálogo
                                </a>
                                <button class="btn-secondary btn-sm" onclick="copyToClipboard('${window.location.origin}/catalog/${F.id}', 'Link do catálogo copiado!')" title="Copiar link do catálogo" style="display: flex; align-items: center; gap: 6px; padding: 6px 10px; font-size: 0.75rem; border-radius: 6px;">
                                    <i class="fa-solid fa-copy" style="font-size: 0.75rem;"></i> Link
                                </button>
                            </div>
                        </div>
                        ${S}
                    </div>
                `}if(v.role==="owner"||v.role==="admin"){const F=_.map(o=>o.instancia_id).filter(o=>!!o),S=I.filter(o=>o.lojaId).map(o=>o.id),d=new Set([...F,...S]),s=I.filter(o=>!d.has(o.id));if(s.length>0){U+=`
                        <div class="card" style="margin-top: 2rem; border: 1px dashed rgba(255,255,255,0.2); background: rgba(255,255,255,0.02);">
                            <h4 style="margin-bottom: 1rem; color: var(--text-muted);"><i class="fa-solid fa-link-slash"></i> Instâncias não vinculadas a lojas</h4>
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
                    `;for(const o of s){let l=!1;try{l=(await be.getInstanceStatus(o.nome)).connected}catch{}U+=`
                            <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px;">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <strong>${o.nome}</strong>
                                    <span class="badge ${l?"success":"warning"}">${l?"Online":"Offline"}</span>
                                </div>
                                <p style="font-size:0.75rem; color: var(--text-muted); margin-top: 0.5rem;">Vá em Configurações > Lojas para vincular esta instância a uma unidade.</p>
                            </div>
                        `}U+="</div></div>"}}x.innerHTML=U}catch(M){console.error("Error setting up Store statuses:",M),x.innerHTML=`
                <div class="card" style="margin-top: 1.5rem; background: var(--surface-hover);">
                    <p style="color: var(--danger);">Erro ao carregar os status integrados.</p>
                </div>
            `}}},ja={em_montagem:{label:"Em Montagem",cls:"badge warning",icon:'<i class="fa-solid fa-cart-shopping"></i>'},aguardando_pagamento:{label:"Aguard. Pagamento",cls:"badge info",icon:'<i class="fa-solid fa-credit-card"></i>'},em_preparo:{label:"Em Preparo",cls:"badge primary",icon:'<i class="fa-solid fa-utensils"></i>'},pedido_pronto:{label:"Pronto p/ Retirada",cls:"badge success",icon:'<i class="fa-solid fa-box" style="color:#fff;"></i>'},saiu_para_entrega:{label:"Saiu p/ Entrega",cls:"badge success",icon:'<i class="fa-solid fa-truck" style="color:#fff;"></i>'},finalizado:{label:"Finalizado",cls:"badge success",icon:'<i class="fa-solid fa-check" style="color:#fff;"></i>'},cancelado:{label:"Cancelado",cls:"badge danger",icon:'<i class="fa-solid fa-xmark"></i>'}};function da(i){const e=(i||"em_montagem").toLowerCase(),f=ja[e]||{label:i||"Pendente",cls:"badge secondary",icon:'<i class="fa-solid fa-question"></i>'};return`<span class="${f.cls}">${f.icon} ${f.label}</span>`}function la(i){return i?i.toDate?i.toDate().toLocaleString("pt-BR"):new Date(i).toLocaleString("pt-BR"):"-"}function _a(i){if(!i)return!1;const e=i.toDate?i.toDate():new Date(i),f=new Date;return e.getDate()===f.getDate()&&e.getMonth()===f.getMonth()&&e.getFullYear()===f.getFullYear()}function Ce(i){if(i.arquivado)return!0;const e=(i.status||"em_montagem").toLowerCase(),f=e==="finalizado"||e==="cancelado",k=i.criadoEm||i.createdAt;return f&&!_a(k)}const ca=[{key:"todos",label:"Todos"},{key:"em_montagem",label:'<i class="fa-solid fa-cart-shopping"></i> Em Montagem'},{key:"aguardando_pagamento",label:'<i class="fa-solid fa-credit-card"></i> Pag. Pendente'},{key:"em_preparo",label:'<i class="fa-solid fa-utensils"></i> Em Preparo'},{key:"pedido_pronto",label:'<i class="fa-solid fa-box"></i> Prontos'},{key:"saiu_para_entrega",label:'<i class="fa-solid fa-truck"></i> Em Entrega'},{key:"finalizado",label:'<i class="fa-solid fa-check"></i> Finalizados'},{key:"arquivados",label:'<i class="fa-solid fa-box-archive"></i> Arquivados'}];function pa(i){return i==="retirada"?'<span class="badge secondary" style="background: rgba(139, 92, 246, 0.1); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;"><i class="fa-solid fa-store" style="font-size: 0.6rem;"></i> Retirada</span>':'<span class="badge info" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;"><i class="fa-solid fa-truck" style="font-size: 0.6rem;"></i> Entrega</span>'}function ma(i){const e=i.pagamento||i.formaPagamento||"";if(!e)return'<span class="badge secondary" style="opacity: 0.5; font-size: 0.7rem; padding: 0.2rem 0.5rem;">Pendente</span>';const f=e.toLowerCase().trim(),k=f.includes("link"),m=f.includes("pagamento_no_pix"),$=f.includes("entrega")||f.includes("dinheiro")||f.includes("maquininha");if(k)return`<span class="badge info" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            <i class="fa-solid fa-link" style="font-size: 0.6rem;"></i> Link
        </span>`;if(m){let v=`<span class="badge info" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            <i class="fa-brands fa-pix" style="font-size: 0.6rem;"></i> PIX
        </span>`;const x=i.comprovanteUrl&&i.comprovanteUrl!=="tete"?i.comprovanteUrl:i.empresaId&&i.empresaId.startsWith("comprovantes/")?i.empresaId:null;return x&&(v+=`
                <button class="view-comprovante-btn" data-path="${x}" style="background: rgba(34, 197, 94, 0.13); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 4px; font-size: 0.65rem; padding: 0.2rem 0.5rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; transition: 0.2s;">
                    <i class="fa-solid fa-eye" style="font-size: 0.6rem;"></i> Comprovante
                </button>`),i.estornado===!0?v+=`
                <span class="badge" style="background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3); border-radius: 4px; font-size: 0.65rem; padding: 0.2rem 0.5rem; margin-left: 0.4rem; display: inline-flex; align-items: center; gap: 0.3rem;">
                    <i class="fa-solid fa-rotate-left" style="font-size: 0.6rem;"></i> ESTORNADO
                </span>`:i.pago===!0&&(v+=`
                <span class="badge success" style="background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3); border-radius: 4px; font-size: 0.65rem; padding: 0.2rem 0.5rem; margin-left: 0.4rem; display: inline-flex; align-items: center; gap: 0.3rem;">
                    <i class="fa-solid fa-circle-check" style="font-size: 0.6rem;"></i> PAGO
                </span>`),`<div style="display: flex; align-items: center;">${v}</div>`}if($){const v=i.paymentSubMethod==="dinheiro"?"Dinheiro":i.paymentSubMethod==="cartao"?"Cartão":"",x=i.troco?` (Troco R$ ${parseFloat(i.troco).toFixed(2)})`:"";return`
            <div style="display:flex; flex-direction:column; gap:4px;">
                <span class="badge warning" style="background: rgba(245, 158, 11, 0.1); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem; width:fit-content;">
                    <i class="fa-solid fa-hand-holding-dollar" style="font-size: 0.6rem;"></i> Na Entrega
                </span>
                ${v?`<span style="font-size:0.75rem; color:var(--text-dim); font-weight:600; margin-left:4px;">${v}${x}</span>`:""}
            </div>`}return`<span class="badge secondary" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;">${e}</span>`}const Pa=async()=>{const i=ce.getCurrentUser();if(!i||!i.companyId)return"<p>Usuário sem empresa.</p>";const e=i.companyId,[f,k,m,$]=await Promise.all([T.getAll("pedidos",{field:"empresaId",operator:"==",value:e}),T.get("companies",e),T.getAll("leads",{field:"empresaId",operator:"==",value:e}),T.getAll("loja_config",{field:"empresaId",operator:"==",value:e})]);let v=f,x=k?.stores||[];const M=m,N=$;if(v.sort((a,g)=>{const z=(a.criadoEm?.toDate?.()||new Date(a.criadoEm||0)).getTime();return(g.criadoEm?.toDate?.()||new Date(g.criadoEm||0)).getTime()-z}),i.role!=="owner"){const a=i.storeIds||(i.storeId?[i.storeId]:[]);x=x.filter(g=>a.includes(g.id)),v=v.filter(g=>a.includes(g.lojaId))}const _=a=>{const g=x.find(z=>z.id===a);return g?g.name:a||"-"},j=a=>{const g=x.find(O=>O.id===a);if(g&&g.active!==!1&&g.instancia_id)return!0;const z=N.find(O=>O.lojaId===a);return z?!!z.instancia_id:!1},I=(a,g)=>{if(g)return g;const z=M.find(O=>O.id===a);return z?z.nome||z.name||"Cliente":a||"Cliente"},U=a=>(M.find(z=>z.id===a)?.telefone||"").split("@")[0];let F="todos";const S=a=>a.pendentePagamento===!0&&a.pago!==!0,d=a=>{if(a==="arquivados")return v.filter(z=>Ce(z));const g=v.filter(z=>!Ce(z)&&!S(z));return a==="todos"?g:g.filter(z=>(z.status||"em_montagem").toLowerCase()===a)},s=a=>a.length===0?'<tr><td colspan="8" style="text-align:center;padding:2.5rem;color:var(--text-muted);">Nenhum pedido encontrado.</td></tr>':a.map(g=>{const z=(g.status||"em_montagem").toLowerCase();return`
            <tr data-order-id="${g.id}">
                <td><span style="font-family:monospace;font-weight:600;color:var(--primary);">#${g.id.slice(-6).toUpperCase()}</span></td>
                <td style="color:var(--text-muted);font-size:0.85rem;">${_(g.lojaId)}</td>
                <td>
                    <div style="display:flex;align-items:center;gap:0.5rem;">
                        <div class="lead-avatar" style="width:28px;height:28px;font-size:0.7rem;flex-shrink:0;">${(I(g.leadId,g.nome||g.leadName)[0]||"C").toUpperCase()}</div>
                        <div>
                            <div style="font-weight:500;">${I(g.leadId,g.nome||g.leadName)}</div>
                            <div style="font-size:0.75rem;color:var(--text-muted);">${U(g.leadId)}</div>
                        </div>
                    </div>
                </td>
                <td style="font-weight:600;">R$ ${(g.value||g.total||0).toFixed(2)}</td>
                <td>${da(z)}  ${pa(g.entrega||"entrega")}  ${ma(g)}</td>
                <td style="color:var(--text-muted);font-size:0.82rem;">${la(g.criadoEm||g.createdAt)}</td>
                <td>
                    <div class="actions">
                        <button class="action-btn view" title="Ver detalhes" data-id="${g.id}">
                            <i style="color:#fff;" class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                </td>
            </tr>`}).join(""),o=a=>{const g=a==="arquivados"?v.filter(z=>Ce(z)).length:a==="todos"?v.filter(z=>!Ce(z)&&!S(z)).length:v.filter(z=>!Ce(z)&&!S(z)&&(z.status||"em_montagem").toLowerCase()===a).length;return`<span class="filter-count" id="count-${a}">${g}</span>`},l=()=>x.length===0?"":`
        <div id="store-status-bar" style="display:flex;flex-wrap:wrap;gap:0.75rem;padding:0.85rem 1rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;margin-bottom:1rem;">
            ${x.map(a=>{const g=N.find(X=>X.lojaId===a.id)||{},z=g.lojaFechada===!0,O=g.entregaFechada===!0;return`
                <div style="display:flex;flex-direction:column;gap:0.4rem;min-width:200px;">
                    <span style="font-size:0.75rem;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;">${a.name}</span>
                    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                        <button class="store-toggle-btn" data-loja="${a.id}" data-tipo="loja" data-fechada="${z}"
                            style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.3rem 0.75rem;border-radius:8px;border:1px solid;font-size:0.78rem;font-weight:600;cursor:pointer;transition:all 0.2s;
                            ${z?"background:rgba(239,68,68,0.12);color:#f87171;border-color:rgba(239,68,68,0.3);":"background:rgba(16,185,129,0.12);color:#34d399;border-color:rgba(16,185,129,0.3);"}">
                            <i class="fa-solid ${z?"fa-door-closed":"fa-door-open"}"></i>
                            Loja ${z?"Fechada":"Aberta"}
                        </button>
                        <button class="store-toggle-btn" data-loja="${a.id}" data-tipo="entrega" data-fechada="${O}"
                            style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.3rem 0.75rem;border-radius:8px;border:1px solid;font-size:0.78rem;font-weight:600;cursor:pointer;transition:all 0.2s;
                            ${O?"background:rgba(239,68,68,0.12);color:#f87171;border-color:rgba(239,68,68,0.3);":"background:rgba(59,130,246,0.12);color:#60a5fa;border-color:rgba(59,130,246,0.3);"}">
                            <i class="fa-solid ${O?"fa-truck-arrow-right":"fa-truck"}"></i>
                            Entrega ${O?"Pausada":"Ativa"}
                        </button>
                    </div>
                </div>`}).join("")}
        </div>`;return setTimeout(()=>r(),100),`
        <div class="leads-page-header">
            <div class="leads-filter-bar" id="orders-filter-bar">
                ${ca.map(a=>`
                    <button class="filter-btn${a.key==="todos"?" active":""}" data-filter="${a.key}">
                        ${a.label} ${a.key!=="arquivados"?o(a.key):'<span id="count-arquivados" style="display:none;"></span>'}
                    </button>
                `).join("")}
            </div>
        </div>
        ${l()}

        <div class="card leads-card">
            <div class="table-container">
                <table class="data-table" id="orders-table">
                    <thead>
                        <tr>
                            <th>TAG</th>
                            <th>Loja</th>
                            <th>Cliente</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Data/Hora</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="orders-tbody">
                        ${s(v)}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Order Detail Modal -->
        <div id="order-detail-modal" class="modal hidden">
            <div class="modal-content glass lead-modal-content">
                <div id="order-modal-inner"></div>
            </div>
        </div>
    `;function r(){const a=We(Qe,"pedidos"),g=Ge(a,He("empresaId","==",i.companyId));window._ordersUnsubscribe&&window._ordersUnsubscribe();const z=Xe(g,te=>{if(v=te.docs.map(W=>({id:W.id,...W.data()})),i.role!=="owner"){const W=i.storeIds||(i.storeId?[i.storeId]:[]);v=v.filter(ae=>W.includes(ae.lojaId))}v.sort((W,ae)=>{const de=(W.criadoEm?.toDate?.()||new Date(W.criadoEm||0)).getTime();return(ae.criadoEm?.toDate?.()||new Date(ae.criadoEm||0)).getTime()-de});const G=document.getElementById("orders-tbody");G&&(G.innerHTML=s(d(F)),h()),ca.forEach(W=>{const ae=document.getElementById(`count-${W.key}`);if(ae){const de=W.key==="arquivados"?v.filter(n=>Ce(n)).length:W.key==="todos"?v.filter(n=>!Ce(n)&&!S(n)).length:v.filter(n=>!Ce(n)&&!S(n)&&(n.status||"em_montagem").toLowerCase()===W.key).length;ae.textContent=de.toString()}})});window._ordersUnsubscribe=z,document.querySelectorAll("#orders-filter-bar .filter-btn").forEach(te=>{te.addEventListener("click",()=>{document.querySelectorAll("#orders-filter-bar .filter-btn").forEach(W=>W.classList.remove("active")),te.classList.add("active"),F=te.dataset.filter||"todos";const G=document.getElementById("orders-tbody");G&&(G.innerHTML=s(d(F))),h()})}),h(),y();const O=document.getElementById("order-detail-modal");O?.addEventListener("click",te=>{te.target===O&&O.classList.add("hidden")}),document.getElementById("orders-filter-bar")?.parentElement?.parentElement?.addEventListener("click",async te=>{const G=te.target.closest(".view-comprovante-btn");if(G){te.preventDefault(),te.stopPropagation();const W=G.dataset.path;if(!W)return;const ae=G.innerHTML;G.disabled=!0,G.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';try{let de=W;if(!W.startsWith("http")){const n=Ae(Se,W);de=await Pe(n)}window.open(de,"_blank")}catch(de){console.error("Erro ao abrir comprovante:",de),w.error("Não foi possível carregar o comprovante do storage.")}finally{G.disabled=!1,G.innerHTML=ae}}})}function h(){document.querySelectorAll(".action-btn.view").forEach(a=>{a.addEventListener("click",()=>{const g=a.dataset.id,z=v.find(O=>O.id===g);z&&b(z)})})}function y(){document.querySelectorAll(".store-toggle-btn").forEach(a=>{a.addEventListener("click",async()=>{const g=a,z=g.dataset.loja,O=g.dataset.tipo,te=!(g.dataset.fechada==="true");g.disabled=!0;try{const G=N.find(n=>n.lojaId===z),W=O==="loja"?"lojaFechada":"entregaFechada";if(G?.id)await T.update("loja_config",G.id,{[W]:te}),G[W]=te;else{const n=await T.create("loja_config",{empresaId:i.companyId,lojaId:z,[W]:te});N.push({id:n,empresaId:i.companyId,lojaId:z,[W]:te})}const ae=document.getElementById("store-status-bar");ae&&(ae.outerHTML=l()),setTimeout(()=>y(),50);const de=O==="loja"?te?"Loja fechada manualmente":"Loja aberta":te?"Entregas pausadas":"Entregas ativadas";w.success(de)}catch(G){w.error("Erro ao atualizar status: "+(G.message||"")),g.disabled=!1}})})}async function b(a){const g=document.getElementById("order-detail-modal"),z=document.getElementById("order-modal-inner");if(!g||!z)return;!a.itens&&Array.isArray(a.items)&&(a.itens=a.items.map(R=>({item:R.item||R.name||"",quantidade:R.quantidade||R.qty||1,preco:R.preco||R.price||0,observacao:R.observacao||""}))),g.classList.remove("hidden"),z.innerHTML=`
            <div style="padding: 4rem 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px;">
                <i class="fa-solid fa-spinner fa-spin fa-2x" style="color: var(--primary); margin-bottom: 1rem;"></i>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Carregando detalhes do pedido...</p>
            </div>
        `;const O=a.clientPhone?a.clientPhone.replace(/\D/g,""):U(a.leadId)||a.leadId,X=a.source==="catalog"||!!a.taxaNome,te=a.empresaId||ce.getCurrentUser()?.companyId;if(te&&Array.isArray(a.itens))try{const R=await T.getAll("products",{field:"companyId",operator:"==",value:te});let K=!1;if(a.itens.forEach(ie=>{const le=(ie.item||"").toLowerCase().trim(),se=R.find(Z=>(Z.name||"").toLowerCase().trim()===le);if(se){const Z=se.promotionalActive&&se.promotionalPrice||se.price;(!ie.preco||ie.preco===0)&&(ie.preco=Z,K=!0)}}),K){let ie=0;a.itens.forEach(se=>{const Z=parseFloat(se.preco)||0,Y=parseInt(se.quantidade)||1;ie+=Y*Z});const le=parseFloat(a.taxaAplicada||a.taxaEntrega)||0;a.value=ie+le}}catch(R){console.error("Error syncing prices with catalog:",R)}const G=(a.status||"em_montagem").toLowerCase(),W=G==="finalizado"||G==="cancelado",ae=I(a.leadId,a.nome||a.leadName),de=j(a.lojaId),n=Array.isArray(a.itens)?a.itens.map((R,K)=>`
                <div class="order-item-row" style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <div style="flex: 1; padding-right: 15px;">
                        <span style="font-weight: 600; color: var(--text-main); display: block;">${R.quantidade}x ${R.item}</span>
                        ${R.observacao?`<small style="color: var(--text-dim); display: block; margin-top: 2px;">Obs: ${R.observacao}</small>`:""}
                    </div>
                    ${G==="em_montagem"&&!X?`
                        <div style="display:flex;align-items:center;gap:0.75rem; flex-shrink: 0;">
                            <span style="color:var(--text-dim);font-size:0.8rem; font-weight: 600;">R$</span>
                            <input type="number" class="item-price-input" data-index="${K}" value="${R.preco||0}"
                                step="0.01" style="width:100px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.5rem 0.75rem;border-radius:8px;text-align:right;font-size:0.95rem; font-family: monospace; outline: none;">
                        </div>
                    `:`
                        <span style="color:var(--primary);font-weight:700; font-size: 1rem;">R$ ${(R.preco||0).toFixed(2)}</span>
                    `}
                </div>
            `).join(""):'<p style="color:var(--text-muted); padding: 1.5rem; text-align: center;">Sem itens listados.</p>',u=G==="em_montagem"||a.taxaAplicada||a.taxaEntrega?`
            <div class="order-item-row" style="margin-top:0.5rem; border-top: 1px solid var(--border-color); padding: 1.25rem; ${G==="em_montagem"?"background: rgba(99, 102, 241, 0.03);":""}">
                <div style="flex: 1;">
                    <span class="lead-info-label" style="font-size:0.85rem; color: var(--text-main);">Taxa de Entrega</span>
                    ${G==="em_montagem"?'<small style="display:block; color: var(--text-dim); font-size: 0.75rem;">Frete / Entrega</small>':""}
                </div>
                ${G==="em_montagem"?`
                    <div style="display:flex;align-items:center;gap:0.75rem; flex-shrink: 0;">
                        <span style="color:var(--text-dim);font-size:0.8rem; font-weight: 600;">R$</span>
                        <input type="number" id="detail-taxa-entrega" value="${a.taxaAplicada||a.taxaEntrega||0}"
                            step="0.01" style="width:100px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.5rem 0.75rem;border-radius:8px;text-align:right;font-size:0.95rem; font-family: monospace; outline: none;">
                    </div>
                `:`
                    <span style="color:var(--primary);font-weight:700;">R$ ${(a.taxaAplicada||a.taxaEntrega||0).toFixed(2)}</span>
                `}
            </div>
        `:"",C="",A=L(a,G),H=W?"":X?`
                <a href="https://wa.me/${O.replace(/\D/g,"")}" target="_blank" class="btn-lead-action" 
                    style="background: rgba(37,211,102,0.15); border-color: rgba(37,211,102,0.4); color: #25d366; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <i class="fa-brands fa-whatsapp" style="font-size: 1.1rem;"></i> WhatsApp
                </a>`:`
                <button id="btn-intervir" class="btn-lead-action" style="background: rgba(139,92,246,0.15); border-color: rgba(139,92,246,0.4); color: #a78bfa;"
                    title="Enviar mensagem diretamente ao cliente sem alterar o status">
                    <i class="fa-solid fa-comment-dots"></i> Intervir
                </button>`;z.innerHTML=`
            <!-- Header -->
            <div class="lead-modal-header">
                <div class="lead-modal-avatar" style="background: linear-gradient(135deg, var(--primary), #7c3aed);">
                    ${ae[0]?.toUpperCase()||"P"}
                </div>
                <div class="lead-modal-title">
                    <h2>Pedido #${a.id.slice(-6).toUpperCase()}</h2>
                    <span style="color:var(--text-muted);font-size:0.88rem;">${ae} · ${O}</span>
                </div>
                <div class="lead-modal-header-actions">
                    ${W?"":`
                    <div class="lead-menu-wrap">
                        <button class="action-btn lead-menu-btn" id="order-menu-trigger" title="Mais ações">
                            <i class="fa-solid fa-ellipsis-vertical" style="color:#fff;"></i>
                        </button>
                        <div class="lead-dropdown hidden" id="order-dropdown">
                            <button class="lead-dropdown-item" data-menu-action="atendimento_humano">
                                <i class="fa-solid fa-headset" style="color:var(--primary);"></i> Ativar Atendimento Humano
                            </button>
                            ${Ce(a)?"":`
                            <button class="lead-dropdown-item" data-menu-action="arquivar">
                                <i class="fa-solid fa-box-archive" style="color:#fbbf24;"></i> Arquivar Pedido
                            </button>
                            `}
                        </div>
                    </div>`}
                    <button class="action-btn" id="close-order-modal" title="Fechar">
                        <i class="fa-solid fa-xmark" style="color:#fff;"></i>
                    </button>
                </div>
            </div>

            <!-- Status badges -->
            <div class="lead-modal-badges">
                <div class="lead-badge-group">
                    <span class="badge-label">Status do Pedido</span>
                    ${da(G)}
                </div>
                <div class="lead-badge-group">
                    <span class="badge-label">Loja</span>
                    <span class="badge secondary">${_(a.lojaId)}</span>
                </div>
                <div class="lead-badge-group">
                    <span class="badge-label">Data</span>
                    <span class="badge secondary" style="font-size:0.78rem;">${la(a.criadoEm||a.createdAt)}</span>
                </div>
                <div class="lead-badge-group">
                    <span class="badge-label">${a.source==="catalog"?"Modo de Envio":"Tipo"}</span>
                    ${pa(a.entrega||"entrega")}
                </div>
            </div>

            ${de?"":`
            <div class="lead-alert danger" style="margin: 1rem 1.5rem 0 1.5rem;">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <strong>Atenção:</strong> A loja deste pedido está inoperante (inativa ou sem instância vinculada). Mensagens automáticas podem falhar.
            </div>
            `}

            <!-- Body -->
            <div class="lead-modal-body">
                <!-- Client info -->
                <div class="lead-info-grid">
                    <div class="lead-info-item">
                        <span class="lead-info-label">Cliente</span>
                        <span class="lead-info-value">${ae}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Telefone</span>
                        <span class="lead-info-value">${O||"-"}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Pagamento</span>
                        <span class="lead-info-value">${ma(a)}</span>
                    </div>
                    ${X?a.entrega==="retirada"?`
                        <div class="lead-info-item" style="grid-column:1/-1;">
                            <span class="lead-info-label">Informação de Coleta</span>
                            <span class="lead-info-value" style="color:var(--primary);font-weight:600;"><i class="fa-solid fa-store"></i> Retirada na Loja</span>
                        </div>`:`
                        <div class="lead-info-item" style="grid-column:1/-1;">
                            <span class="lead-info-label">Endereço de Entrega</span>
                            <span class="lead-info-value">${a.endereco||"Não informado"}</span>
                        </div>
                        ${(()=>{const R=a.bairro||(a.taxaNome?.includes("(")?a.taxaNome.split("(")[1].split(")")[0]:"");return R?`
                        <div class="lead-info-item">
                            <span class="lead-info-label">Bairro</span>
                            <span class="lead-info-value" style="color:var(--primary); font-weight:600;">${R}</span>
                        </div>`:""})()}
`:`
                        <div class="lead-info-item" style="grid-column:1/-1;">
                            <span class="lead-info-label">Endereço de Entrega</span>
                            <span class="lead-info-value">${a.endereco||"-"}</span>
                        </div>
                        ${(()=>{const R=a.bairro||(a.taxaNome?.includes("(")?a.taxaNome.split("(")[1].split(")")[0]:"");return R?`
                        <div class="lead-info-item">
                            <span class="lead-info-label">Bairro</span>
                            <span class="lead-info-value" style="color:var(--primary); font-weight:600;">${R}</span>
                        </div>`:""})()}
                    `}
                </div>

                <!-- Items -->
                <div class="lead-section">
                    <h4 class="lead-section-title"><i class="fa-solid fa-basket-shopping"></i> Itens do Pedido</h4>
                    <div class="order-items-block">
                        ${n}
                        ${u}
                        ${C}
                        <div class="order-total-row">
                            <span>Total</span>
                            ${G==="em_montagem"?`
                                <span style="color:var(--primary);font-weight:700;font-size:1.1rem;" id="detail-order-total">R$ ${(a.value||a.total||0).toFixed(2)}</span>
                            `:`
                                <span style="color:var(--primary);font-weight:700;font-size:1.1rem;">R$ ${(a.value||a.total||0).toFixed(2)}</span>
                            `}
                        </div>
                    </div>
                </div>

                ${a.rejectionReason?`
                <div class="lead-alert danger">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <strong>Motivo do Cancelamento:</strong> ${a.rejectionReason}
                </div>`:""}

                <!-- Intervention area (hidden by default) - Only for non-catalog orders -->
                ${a.source!=="catalog"?`
                <div id="intervir-area" style="display:none;">
                    <div class="lead-section">
                        <h4 class="lead-section-title"><i class="fa-solid fa-comment-dots" style="color:#a78bfa;"></i> Enviar Mensagem ao Cliente</h4>
                        <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.75rem;">Esta mensagem será enviada diretamente ao cliente sem alterar o status do pedido ou o atendimento.</p>
                        <textarea id="intervir-text" placeholder="Digite sua mensagem..." rows="3"
                            style="width:100%;background:var(--surface-hover);border:1px solid rgba(139,92,246,0.4);border-radius:8px;color:white;padding:0.75rem;font-size:0.9rem;font-family:inherit;resize:vertical;box-sizing:border-box;"></textarea>
                        <div style="display:flex;gap:0.75rem;margin-top:0.75rem;">
                            <button id="btn-intervir-send" class="btn-lead-action" style="background:rgba(139,92,246,0.2);border-color:rgba(139,92,246,0.5);color:#a78bfa;flex:1;">
                                <i class="fa-solid fa-paper-plane"></i> Enviar Mensagem
                            </button>
                            <button id="btn-intervir-cancel" class="action-btn" style="padding:0.6rem 1rem;">
                                <i class="fa-solid fa-xmark" style="color:#fff;"></i>
                            </button>
                        </div>
                    </div>
                </div>
                `:""}

                <!-- Cancelation reason (shown on cancel click) -->
                <div id="cancel-container" style="display:none;">
                    <div class="lead-section">
                        <h4 class="lead-section-title" style="color:var(--danger);"><i class="fa-solid fa-circle-exclamation"></i> Motivo do Cancelamento <span style="color:#ff4d4d">*</span></h4>
                        <textarea id="cancel-reason" placeholder="Informe o motivo para o cliente..." rows="3"
                            style="width:100%;background:rgba(239,68,68,0.05);border:1px solid var(--danger);border-radius:8px;color:white;padding:0.75rem;font-size:0.9rem;font-family:inherit;resize:vertical;box-sizing:border-box;"></textarea>
                    </div>
                </div>
            </div>

            <!-- Footer actions -->
            ${W?"":`
            <div class="lead-modal-footer" id="modal-footer">
                <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
                    ${H}
                    ${A}
                </div>
            </div>`}
        `,p(g,a,G)}function L(a,g){const z=a.entrega==="retirada",O=(a.pagamento||a.formaPagamento||"").toLowerCase(),X=O.includes("entrega")||O.includes("dinheiro")||O.includes("maquininha");switch(g){case"em_montagem":return`
                    <button id="btn-main-action" class="btn-lead-action" data-target="${X||a.pago?"em_preparo":"aguardando_pagamento"}">
                        <i class="fa-solid fa-check"></i> Aceitar Pedido
                    </button>
                    <button id="btn-cancel" class="btn-lead-action danger" data-stage="init">
                        <i class="fa-solid fa-xmark"></i> ${a.pago?"Recusar e Estornar":"Cancelar Pedido"}
                    </button>`;case"aguardando_pagamento":return`
                    <button id="btn-main-action" class="btn-lead-action" data-target="em_preparo">
                        <i class="fa-solid fa-credit-card"></i> Confirmar Pagamento
                    </button>
                    <button id="btn-cancel" class="btn-lead-action danger" data-stage="init">
                        <i class="fa-solid fa-xmark"></i> ${a.pago?"Recusar e Estornar":"Cancelar Pedido"}
                    </button>`;case"em_preparo":return z?`
                        <button id="btn-main-action" class="btn-lead-action" data-target="pedido_pronto">
                            <i class="fa-solid fa-box"></i> ${X?"Pronto":"Pedido Pronto"}
                        </button>`:`
                    <button id="btn-main-action" class="btn-lead-action" data-target="saiu_para_entrega">
                        <i class="fa-solid fa-truck"></i> Saiu para Entrega
                    </button>`;case"pedido_pronto":return`
                    <button id="btn-main-action" class="btn-lead-action" data-target="finalizado">
                        <i class="fa-solid fa-flag-checkered"></i> ${X?"Finalizar":"Entregue"}
                    </button>`;case"saiu_para_entrega":return`
                    <button id="btn-main-action" class="btn-lead-action" data-target="finalizado">
                        <i class="fa-solid fa-flag-checkered"></i> Entregue
                    </button>`;default:return""}}function p(a,g,z){const O=z==="finalizado"||z==="cancelado",X=g.source==="catalog"||!!g.taxaNome;if(document.getElementById("close-order-modal")?.addEventListener("click",()=>{a.classList.add("hidden")}),z==="em_montagem"&&!X){const C=H=>{const R=parseFloat(H);return isNaN(R)?0:R},A=()=>{let H=0;document.querySelectorAll(".item-price-input").forEach(le=>{const se=parseInt(le.dataset.index),Z=g.itens[se]?.quantidade||1;H+=Z*C(le.value)});const R=C(document.getElementById("detail-additional-value")?.value),K=C(document.getElementById("detail-taxa-entrega")?.value);H+=R+K;const ie=document.getElementById("detail-order-total");ie&&(ie.innerText=`R$ ${H.toFixed(2)}`)};document.querySelectorAll(".item-price-input").forEach(H=>{H.addEventListener("input",A)}),document.getElementById("detail-additional-value")?.addEventListener("input",A),document.getElementById("detail-taxa-entrega")?.addEventListener("input",A),A()}if(O)return;const te=document.getElementById("order-menu-trigger"),G=document.getElementById("order-dropdown");te?.addEventListener("click",C=>{C.stopPropagation(),G?.classList.toggle("hidden")}),document.addEventListener("click",()=>G?.classList.add("hidden"),{once:!0}),G?.querySelectorAll(".lead-dropdown-item").forEach(C=>{C.addEventListener("click",async()=>{G.classList.add("hidden");const A=C.dataset.menuAction;A==="atendimento_humano"?await E(g):A==="arquivar"&&await D(g,a)})});const W=document.getElementById("btn-intervir"),ae=document.getElementById("intervir-area");W?.addEventListener("click",()=>{if(ae){const C=ae.style.display==="none";ae.style.display=C?"block":"none",C&&document.getElementById("intervir-text")?.focus()}}),document.getElementById("btn-intervir-cancel")?.addEventListener("click",()=>{ae&&(ae.style.display="none");const C=document.getElementById("intervir-text");C&&(C.value="")}),document.getElementById("btn-intervir-send")?.addEventListener("click",async()=>{const C=document.getElementById("intervir-text"),A=C?.value.trim();if(!A){w.warning("Digite uma mensagem antes de enviar.");return}const H=document.getElementById("btn-intervir-send");H.disabled=!0,H.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';try{let R=g.instancia;R||(R=(await T.get("companies",i.companyId))?.whatsappInstance?.instanceName||"");const K=U(g.leadId)||g.leadId;await Le.sendInterventionMessage(i.companyId,g.leadId,R,K,A),w.success("Mensagem enviada com sucesso!"),C.value="",ae&&(ae.style.display="none")}catch{w.error("Erro ao enviar mensagem."),H.disabled=!1,H.innerHTML='<i class="fa-solid fa-paper-plane"></i> Enviar Mensagem'}});const de=document.getElementById("btn-main-action");de?.addEventListener("click",async()=>{const C=de.dataset.target;if(!C)return;let A="",H="";switch(C){case"aguardando_pagamento":A="Aceitar Pedido",H=`Deseja aceitar o pedido #${g.id.slice(-6).toUpperCase()}?`;break;case"em_preparo":A="Confirmar Pagamento",H="Confirmar que o pagamento foi recebido?";break;case"pedido_pronto":A="Pedido Pronto",H="Marcar pedido como pronto para retirada?";break;case"saiu_para_entrega":A="Saiu para Entrega",H="Marcar pedido como saiu para entrega?";break;case"finalizado":A="Pedido Entregue",H="Marcar pedido como entregue e finalizado?";break}if(await pe.warning(A,H)){de.disabled=!0,de.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Processando...';try{let K;if(z==="em_montagem"){const ie=ne=>{const ee=parseFloat(ne);return isNaN(ee)?0:ee};let le=0;const se=Array.isArray(g.itens)?[...g.itens]:[],Z=document.querySelectorAll(".item-price-input");Z.length>0?Z.forEach(ne=>{const ee=parseInt(ne.dataset.index),ue=se[ee]?.quantidade||1,re=ie(ne.value);se[ee]&&(se[ee].preco=re),le+=ue*re}):se.forEach(ne=>{le+=(ne.quantidade||1)*ie(ne.preco)});const Y=document.getElementById("detail-taxa-entrega"),oe=ie(Y?Y.value:g.taxaAplicada||g.taxaEntrega);le+=oe,K={value:le,total:le,itens:se,taxaAplicada:oe,taxaEntrega:oe}}C==="em_preparo"&&(K={...K,manuallyConfirmed:!0}),await Le.updateOrderStatus(g,i.companyId,C,void 0,K),g.status=C,Q(g),w.success("Pedido atualizado com sucesso!"),b(g)}catch{w.error("Erro ao atualizar pedido."),de.disabled=!1}}});const n=document.getElementById("btn-cancel"),u=document.getElementById("cancel-container");n?.addEventListener("click",async()=>{if(n.dataset.stage==="confirm"){const C=document.getElementById("cancel-reason")?.value.trim();if(!C){w.warning("Informe o motivo do cancelamento.");return}if(!await pe.danger("Cancelar Pedido","Tem certeza que deseja cancelar este pedido?"))return;n.disabled=!0,n.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Cancelando...';try{await Le.updateOrderStatus(g,i.companyId,"cancelado",C),g.status="cancelado",Q(g),w.success("Pedido cancelado."),b(g)}catch{w.error("Erro ao cancelar pedido."),n.disabled=!1}}else n.dataset.stage="confirm",n.innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Confirmar Cancelamento',u&&(u.style.display="block",document.getElementById("cancel-reason")?.focus())}),document.getElementById("btn-archive-manual")?.addEventListener("click",async()=>{if(!await pe.warning("Arquivar Pedido","Deseja arquivar este pedido antigo? Ele sairá da lista principal e irá para Arquivados."))return;const A=document.getElementById("btn-archive-manual");A.disabled=!0,A.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Arquivando...';try{await Le.archiveOrder(g.id),g.arquivado=!0,Q(g),w.success("Pedido arquivado com sucesso!");const H=document.getElementById("order-detail-modal");H&&H.classList.add("hidden")}catch(H){console.error("Erro ao arquivar:",H),w.error("Erro ao arquivar pedido."),A.disabled=!1,A.innerHTML='<i class="fa-solid fa-box-archive"></i> Arquivar Pedido'}})}async function E(a){if(await pe.warning("Ativar Atendimento Humano","Deseja ativar atendimento humano para o lead deste pedido ? O status do pedido não será alterado."))try{await Le.activateHumanSupport(a.leadId),w.success("Atendimento humano ativado para o lead!")}catch{w.error("Erro ao ativar atendimento humano.")}}async function D(a,g){if(await pe.warning("Arquivar Pedido","Deseja arquivar este pedido? Ele sairá da lista principal e irá para Arquivados."))try{await Le.archiveOrder(a.id),a.arquivado=!0,Q(a),w.success("Pedido arquivado com sucesso!"),g.classList.add("hidden")}catch(O){console.error("Erro ao arquivar:",O),w.error("Erro ao arquivar pedido.")}}function Q(a){const g=v.findIndex(O=>O.id===a.id);g>=0&&(v[g]={...v[g],...a});const z=document.getElementById("orders-tbody");z&&(z.innerHTML=s(d(F))),h()}},Ke=i=>i.imageUrl?i.imageUrl:i.imagemPath&&i.downloadToken?`https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(i.imagemPath)}?alt=media&token=${i.downloadToken}`:null,Da=async()=>{const i=ce.getCurrentUser();if(!i||!i.companyId)return"<p>Usuário sem empresa.</p>";const f=await T.get("companies",i.companyId),k=f?.modulos_ativos||[],m=k.includes("venda")||k.includes("agendamento")||k.includes("venda_catalogo"),$=k.includes("agendamento"),v=$?"Serviço":"Produto",x=$?"Serviços":"Produtos";let M=f?.stores||[];const N=i.role?.toLowerCase()==="owner",_=i.storeIds||(i.storeId?[i.storeId]:[]);N||(M=M.filter(n=>_.includes(n.id)));let j=N?"all":_.length===1?_[0]:"employee_all",I="",U="all",F=new Map,S=null;if(!m)return`
            <div class="card">
                <h2>Módulo Desativado</h2>
                <p>Sua configuração atual não utiliza catálogo de produtos ou serviços.</p>
                <p>Contate o administrador para ativar o módulo correspondente.</p>
            </div>
        `;const[d,s,o]=await Promise.all([T.getAll("products",{field:"companyId",operator:"==",value:i.companyId}),T.getAll("categories",{field:"companyId",operator:"==",value:i.companyId}),T.getAll("combos",{field:"empresaId",operator:"==",value:i.companyId})]);let l=d,r=s,h=o;const y=n=>{const u=n.storeIds||(n.storeId?[n.storeId]:[]);return u.length===0?"Sem Loja":u.map(C=>{const A=M.find(H=>H.id===C);return A?A.name:"Desconhecida"}).join(", ")},b=()=>{let n=l;return j!=="all"&&j!=="employee_all"?n=l.filter(u=>u.storeIds&&u.storeIds.includes(j)||u.storeId===j):j==="employee_all"&&(n=l.filter(u=>u.storeIds&&u.storeIds.some(C=>_.includes(C))||u.storeId&&_.includes(u.storeId))),I&&(n=n.filter(u=>u.name.toLowerCase().includes(I))),U!=="all"&&(n=n.filter(u=>(u.categoryId||"uncategorized")===U)),n.length===0?`<tr><td colspan="7" style="text-align:center">Nenhum ${v.toLowerCase()} encontrado.</td></tr>`:n.map(u=>`
            <tr data-product-id="${u.id}" data-cat-id="${u.categoryId||"uncategorized"}">
                <td><input type="checkbox" class="product-checkbox" data-id="${u.id}" onchange="window.updateBulkBar()"></td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        ${Ke(u)?`<img src="${Ke(u)}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">`:'<div style="width: 40px; height: 40px; background: #333; border-radius: 4px; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-box"></i></div>'}
                        <div style="display: flex; flex-direction: column;">
                            <span style="font-weight: 600;">${u.name}</span>
                            ${$&&u.observation?`<span style="font-size: 0.75rem; color: #94a3b8; max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${u.observation}">${u.observation}</span>`:""}
                        </div>
                    </div>
                </td>
                <td><div style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${y(u)}">${y(u)}</div></td>
                <td>R$ ${u.price?.toFixed(2)}</td>
                <td>
                    ${$?u.duration?`<span class="badge info">${u.duration} min</span>`:'<span class="badge" style="background:rgba(100,116,139,0.15);color:#94a3b8;">—</span>':u.stock===null||u.stock===void 0?'<span class="badge info" title="Sem controle">&#8734; Ilimitado</span>':u.stock>10?`<span class="badge success">${u.stock} un.</span>`:u.stock>0?`<span class="badge" style="background:rgba(234,179,8,0.15);color:#eab308;border:1px solid rgba(234,179,8,0.3);">${u.stock} un.</span>`:'<span class="badge danger">Esgotado</span>'}
                </td>
                <td><span class="badge ${u.active?"success":"danger"}">${u.active?"Ativo":"Inativo"}</span></td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editProduct('${u.id}')" title="Editar"><i style="color: #FFF;" class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn" onclick="window.toggleProductStatus('${u.id}', ${u.active})" title="${u.active?"Desativar":"Ativar"}">${u.active?'<i style="color: #FFF;" class="fa-solid fa-ban"></i>':'<i style="color: #FFF;" class="fa-solid fa-check"></i>'}</button>
                        <button class="action-btn" onclick="window.deleteProduct('${u.id}')" title="Excluir"><i style="color: #FFF;" class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join("")};window.applyFilters=()=>{I=document.getElementById("product-search-input")?.value.toLowerCase()||"",U=document.getElementById("product-category-filter")?.value||"all",L()};const L=()=>{const n=document.querySelector(".data-table tbody");n&&(n.innerHTML=b(),p())},p=()=>{const n=document.querySelectorAll(".product-checkbox:checked"),u=document.getElementById("bulk-actions-container"),C=document.getElementById("bulk-count");u&&C&&(n.length>0?(u.classList.remove("hidden"),C.innerText=`${n.length} item(ns) selecionado(s)`):u.classList.add("hidden"))},E=()=>{const n='<option value="">Sem Categoria</option>'+r.map(u=>`<option value="${u.id}">${u.name}</option>`).join("");document.querySelectorAll(".item-category, #bulk-assign-cat").forEach(u=>{const C=u.value;u.innerHTML=n,u.value=C})},D=()=>{const n=document.getElementById("categories-list");if(n){if(r.length===0){n.innerHTML='<p style="text-align:center; color:var(--text-dim);">Nenhuma categoria criada.</p>';return}n.innerHTML=r.map(u=>`
            <div class="category-item">
                <div style="display:flex; align-items:center; gap:10px;">
                    <i class="fa-solid ${u.icon}" style="color:var(--primary); width:20px; text-align:center;"></i>
                    <span id="cat-name-text-${u.id}">${u.name}</span>
                </div>
                <div style="display:flex; gap:5px;">
                    <button class="action-btn" style="background:rgba(255,255,255,0.05); border:1px solid var(--border-color);" onclick="window.openEditCategoryModal('${u.id}', '${u.name.replace(/'/g,"\\'")}')"><i class="fa-solid fa-pen"></i></button>
                    <button class="action-btn" style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.2); color:#ef4444;" onclick="window.deleteCategory('${u.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join("")}},Q=n=>{const u=document.getElementById("catalog-link-container"),C=document.getElementById("catalog-url-display"),A=document.getElementById("btn-open-catalog");if(!(!u||!C||!A))if(n==="all"||n==="employee_all")u.classList.add("hidden");else{const H=`${window.location.origin}/catalog/${n}`;C.value=H,A.href=H,u.classList.remove("hidden")}},a=async(n,u)=>{const C=`img_${Date.now()}_${Math.random().toString(36).substr(2,5)}`,A=Ae(Se,`products/${u}/${C}_${n.name}`);await Ne(A,n);const H=await Pe(A),R=new URL(H);return{imagemPath:A.fullPath,downloadToken:R.searchParams.get("token")||""}},g=(n,u="",C="",A=null,H=!1,R="",K="",ie="",le=null,se=null,Z="")=>{const Y=r.map(oe=>`<option value="${oe.id}" ${oe.id===ie?"selected":""}>${oe.name}</option>`).join("");return`
            <div class="product-item-card" id="card-${n}">
                 <div class="item-visual">
                    <div class="image-preview-wrapper" id="preview-wrapper-${n}">
                        ${A?`<img src="${A}" class="preview-img">`:'<div class="preview-placeholder"><i class="fa-solid fa-image"></i></div>'}
                        <div class="upload-progress-overlay hidden" id="progress-${n}">
                            <div class="spinner-small"></div>
                        </div>
                    </div>
                    ${!A||n!=="edit-item"?`
                    <button type="button" class="btn-change-img" data-id="${n}">
                        <i class="fa-solid fa-camera"></i>
                    </button>
                    `:""}
                    <input type="file" id="file-${n}" accept="image/*" style="display: none;">
                 </div>
                 
                 <div class="item-details">
                    <div class="input-row">
                        <div class="field">
                            <label>Nome do ${v}</label>
                            <input type="text" name="name-${n}" value="${u}" class="item-name" placeholder="${$?"Ex: Corte de Cabelo":"Ex: Tênis Esportivo Nitro"}" required>
                        </div>
                        <div class="field price-field">
                            <label>Preço (R$)</label>
                            <input type="number" name="price-${n}" value="${C}" class="item-price" placeholder="0,00" step="0.01" required>
                        </div>
                    </div>

                    <div class="input-row" style="margin-top: 12px;">
                        <div class="field">
                            <label>Categoria</label>
                            <select name="category-${n}" class="item-category" style="width: 100%; background: var(--bg-color); border: 1px solid var(--border-color); color: white; padding: 10px 12px; border-radius: 8px; font-size: 0.95rem;">
                                <option value="">Sem Categoria</option>
                                ${Y}
                            </select>
                        </div>
                        <div class="field price-field">
                            ${$?`<label>Duração <span style="color:var(--text-dim);font-weight:400;">(minutos)</span></label>
                                   <input type="number" name="duration-${n}" value="${se??""}" class="item-duration" placeholder="Ex: 30" min="5" step="5">`:`<label>Estoque <span style="color:var(--text-dim);font-weight:400;">(vazio = ilimitado)</span></label>
                                   <input type="number" name="stock-${n}" value="${le??""}" class="item-stock" placeholder="Ilimitado" min="0" step="1">`}
                        </div>
                    </div>
                    
                    ${$?`
                    <div style="margin-top: 12px;">
                        <div class="field">
                            <label>Observação</label>
                            <textarea name="observation-${n}" class="item-observation" placeholder="Ex: Informações adicionais sobre o ${v.toLowerCase()}..." style="width: 100%; background: var(--bg-color); border: 1px solid var(--border-color); color: white; padding: 10px 12px; border-radius: 8px; font-size: 0.95rem; min-height: 60px; resize: vertical;">${Z}</textarea>
                        </div>
                    </div>`:""}
                    
                    ${$?"":`
                    <div class="promotional-section" style="margin-top: 15px; padding-top: 10px; border-top: 1px dashed var(--border-color);">
                        <label class="promotional-toggle" style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--primary); font-weight: 600; font-size: 0.85rem;">
                            <input type="checkbox" name="promotional-active-${n}" class="promotional-checkbox" ${H?"checked":""} style="width: 16px; height: 16px;">
                            <i class="fa-solid fa-tag"></i> Ativar Promoção
                        </label>
                        
                        <div class="promotional-fields ${H?"":"hidden"}" id="promotional-fields-${n}" style="margin-top: 10px; border-radius: 8px; background: rgba(99, 102, 241, 0.05); padding: 12px; border: 1px solid rgba(99, 102, 241, 0.2);">
                            <div class="input-row">
                                <div class="field">
                                    <label>Título da Promoção</label>
                                    <input type="text" name="promotional-name-${n}" value="${R}" placeholder="Ex: Oferta Relâmpago!" class="promotional-name-input">
                                </div>
                                <div class="field price-field">
                                    <label>Preço Promo (R$)</label>
                                    <input type="number" name="promotional-price-${n}" value="${K}" placeholder="0,00" step="0.01" class="promotional-price-input">
                                </div>
                            </div>
                        </div>
                    </div>`}
                 </div>

                 <button type="button" class="btn-remove-item" onclick="window.removeProductItem('${n}')" title="Remover item">
                    <i class="fa-solid fa-times"></i>
                 </button>
            </div>
        `},z=n=>{const u=document.querySelector(`#card-${n} .btn-change-img`),C=document.getElementById(`file-${n}`);u&&C&&(u.addEventListener("click",()=>C.click()),C.addEventListener("change",()=>{if(C.files&&C.files[0]){const R=C.files[0];F.set(n,R);const K=new FileReader;K.onload=ie=>{const le=document.getElementById(`preview-wrapper-${n}`);le&&(le.innerHTML=`<img src="${ie.target?.result}" class="preview-img">
                                                 <div class="upload-progress-overlay hidden" id="progress-${n}"><div class="spinner-small"></div></div>`)},K.readAsDataURL(R)}}));const A=document.querySelector(`input[name="promotional-active-${n}"]`),H=document.getElementById(`promotional-fields-${n}`);A&&H&&A.addEventListener("change",()=>{A.checked?H.classList.remove("hidden"):H.classList.add("hidden")})},O=n=>{const u=document.getElementById("products-list-container"),C=document.getElementById("empty-list-msg");!u||!C||Array.from(n).forEach(A=>{const H=`prod_${Date.now()}_${Math.random().toString(36).substr(2,5)}`;F.set(H,A);const R=A.name.replace(/\.[^/.]+$/,"").replace(/-|_/g," "),K=g(H,R,"");u.insertAdjacentHTML("beforeend",K),C.style.display="none",z(H);const ie=new FileReader;ie.onload=le=>{const se=document.getElementById(`preview-wrapper-${H}`);se&&(se.innerHTML=`<img src="${le.target?.result}" class="preview-img">
                                          <div class="upload-progress-overlay hidden" id="progress-${H}"><div class="spinner-small"></div></div>`)},ie.readAsDataURL(A)})};window.editProduct=async n=>{const u=l.find(C=>C.id===n);if(u){S=n,F.clear(),document.getElementById("modal-title").innerText=`Editar ${v}`,document.getElementById("bulk-upload-section").style.display="none",N&&document.querySelectorAll('#multi-store-container input[type="checkbox"]').forEach(R=>{R.checked=(u.storeIds||[]).includes(R.value)});const C=document.getElementById("products-list-container"),A=document.getElementById("empty-list-msg");if(C&&A){C.innerHTML="",A.style.display="none";const H=Ke(u);C.innerHTML=g("edit-item",u.name,u.price,H,u.promotionalActive,u.promotionalName,u.promotionalPrice,u.categoryId,u.stock,u.duration,u.observation),setTimeout(()=>z("edit-item"),0)}document.getElementById("product-modal").classList.remove("hidden")}},window.toggleProductStatus=async(n,u)=>{try{await qe.updateFields(n,{active:!u});const C=l.find(A=>A.id===n);C&&(C.active=!u),L(),w.success(`${v} ${u?"desativado":"ativado"} com sucesso!`)}catch(C){w.error("Erro ao atualizar status: "+C)}},window.deleteProduct=async n=>{if(await pe.danger(`Excluir ${v}`,`Tem certeza que deseja EXCLUIR este ${v.toLowerCase()}? Esta ação não pode ser desfeita.`))try{const C=l.find(A=>A.id===n);if(C){const A=Ke(C),H=C.imagemPath;if(A||H)try{const R=H?Ae(Se,H):Ae(Se,A);await Ea(R)}catch(R){console.warn("Could not delete image from storage:",R)}}await qe.delete(n),l=l.filter(A=>A.id!==n),L(),w.success(`${v} excluído com sucesso!`)}catch(C){w.error("Erro ao excluir: "+C)}},window.openProductModal=()=>{S=null,F.clear();const n=document.getElementById("modal-title"),u=document.getElementById("bulk-upload-section"),C=document.getElementById("products-list-container"),A=document.getElementById("empty-list-msg");n&&(n.innerText=`Adicionar ${x}`),u&&(u.style.display="block"),C&&(C.innerHTML=""),A&&(A.style.display="block"),N&&document.querySelectorAll('#multi-store-container input[type="checkbox"]').forEach(R=>R.checked=!1),document.getElementById("product-modal")?.classList.remove("hidden")},window.closeModals=()=>{document.getElementById("product-modal")?.classList.add("hidden"),document.getElementById("category-modal")?.classList.add("hidden"),document.getElementById("edit-cat-name-modal")?.classList.add("hidden"),document.getElementById("migration-modal")?.classList.add("hidden"),document.getElementById("combos-modal")?.classList.add("hidden")},window.handleBulkFileSelection=n=>{n.files&&(O(n.files),n.value="")},window.addManualItem=()=>{const n=`manual_${Date.now()}`,u=document.getElementById("products-list-container"),C=document.getElementById("empty-list-msg");if(u&&C){const A=g(n);u.insertAdjacentHTML("beforeend",A),C.style.display="none",z(n)}},window.removeProductItem=n=>{const u=document.getElementById(`card-${n}`);u&&u.remove(),F.delete(n);const C=document.getElementById("products-list-container");if(C&&C.children.length===0){const A=document.getElementById("empty-list-msg");A&&(A.style.display="block")}},window.saveProducts=async()=>{const n=document.getElementById("btn-save-products-trigger");if(!n)return;n.disabled=!0;const u=n.innerHTML;n.innerHTML='<div class="spinner-small"></div> <span>Salvando...</span>';const A=document.getElementById("products-list-container")?.querySelectorAll(".product-item-card");if(!A||A.length===0){w.warning(`Adicione pelo menos um ${v.toLowerCase()}.`),n.disabled=!1,n.innerHTML=u;return}let H=[];if(N){const R=document.querySelectorAll('#multi-store-container input[name="store-ids"]:checked');H=Array.from(R).map(K=>K.value)}else i.storeId?H=[i.storeId]:i.storeIds&&i.storeIds.length>0&&(H=i.storeIds);if(H.length===0){w.warning("Selecione pelo menos uma loja para este(s) produto(s)."),n.disabled=!1,n.innerHTML=u;return}try{for(const R of Array.from(A)){const K=R.id.replace("card-",""),ie=R.querySelector(".item-name").value,le=parseFloat(R.querySelector(".item-price").value),se=R.querySelector(".item-category").value;let Z=!1,Y="",oe=0,ne=null,ee=null;if($){const ge=R.querySelector(".item-duration")?.value;ee=ge!==""&&ge!=null?parseInt(ge):null}else{Z=R.querySelector(".promotional-checkbox")?.checked||!1,Y=R.querySelector(".promotional-name-input")?.value||"",oe=parseFloat(R.querySelector(".promotional-price-input")?.value)||0;const ge=R.querySelector(".item-stock")?.value;ne=ge!==""&&ge!=null?parseInt(ge):null}const ue=R.querySelector(".item-observation")?.value||"",re=document.getElementById(`progress-${K}`);re&&re.classList.remove("hidden");let ye={};F.has(K)&&(ye=await a(F.get(K),i.companyId));const ke={name:ie,price:le||0,categoryId:se,storeIds:H,companyId:i.companyId,active:!0,promotionalActive:Z,promotionalName:Y,promotionalPrice:oe,stock:ne,duration:ee,observation:ue,...ye};if(S&&K==="edit-item"){await qe.save(ke,S);const ge=l.findIndex(Te=>Te.id===S);ge!==-1&&(l[ge]={...l[ge],...ke})}else{const{id:ge}=await qe.save(ke);l.push({id:ge,...ke})}re&&re.classList.add("hidden")}w.success(`${x} salvo(s) com sucesso!`),window.closeModals(),L(),n.disabled=!1,n.innerHTML=u}catch(R){console.error("Error saving products:",R),w.error(`Erro ao salvar ${x.toLowerCase()}.`),n.disabled=!1,n.innerHTML=u}},window.saveCategory=async n=>{n.preventDefault();const u=document.getElementById("cat-name"),C=document.getElementById("cat-icon"),A=u.value.trim(),H=C.value;if(A)try{const R=await T.create("categories",{name:A,icon:H,companyId:i.companyId});r.push({id:R,name:A,icon:H,companyId:i.companyId}),u.value="",D(),E(),w.success("Categoria criada com sucesso!")}catch{w.error("Erro ao criar categoria.")}},window.deleteCategory=async n=>{if(await pe.warning("Excluir Categoria",'Tem certeza? Produtos nesta categoria ficarão "Sem Categoria".'))try{await T.delete("categories",n),r=r.filter(u=>u.id!==n),D(),E(),l.forEach(u=>{u.categoryId===n&&(u.categoryId="")}),w.success("Categoria excluída.")}catch{w.error("Erro ao excluir categoria.")}},window.openEditCategoryModal=(n,u)=>{const C=document.getElementById("edit-cat-name-input");C&&(C.value=u,C.dataset.catId=n,document.getElementById("edit-cat-name-modal")?.classList.remove("hidden"))},window.updateCategoryName=async()=>{const n=document.getElementById("edit-cat-name-input"),u=n.dataset.catId,C=n.value.trim();if(u&&C)try{await T.update("categories",u,{name:C});const A=r.find(H=>H.id===u);A&&(A.name=C),D(),E(),document.getElementById("edit-cat-name-modal")?.classList.add("hidden"),w.success("Nome atualizado!")}catch{w.error("Erro ao atualizar nome.")}},window.openCategoryModal=()=>{D();const n=document.getElementById("icon-picker");n&&(n.innerHTML=X.map(u=>`
                <div class="icon-option ${u==="fa-tag"?"selected":""}" data-icon="${u}" onclick="window.selectCategoryIcon(this, '${u}')">
                    <i class="fa-solid ${u}"></i>
                </div>
            `).join("")),document.getElementById("category-modal")?.classList.remove("hidden")},window.selectCategoryIcon=(n,u)=>{const C=document.getElementById("icon-picker");C&&(C.querySelectorAll(".icon-option").forEach(A=>A.classList.remove("selected")),n.classList.add("selected"),document.getElementById("cat-icon").value=u)},window.setStoreFilter=(n,u)=>{document.querySelectorAll(".filter-pill").forEach(C=>C.classList.remove("active")),u.classList.add("active"),j=n,Q(n),L()},window.toggleAllCheckboxes=n=>{const u=n.checked;document.querySelectorAll(".product-checkbox").forEach(C=>C.checked=u),p()},window.updateBulkBar=p,window.applyBulkCategory=async()=>{const n=document.getElementById("bulk-assign-cat").value;if(!n){w.warning("Selecione uma categoria.");return}const u=Array.from(document.querySelectorAll(".product-checkbox:checked")).map(A=>A.dataset.id),C=document.getElementById("btn-bulk-save");C&&(C.innerHTML='<div class="spinner-small"></div>');try{await Promise.all(u.map(A=>qe.updateFields(A,{categoryId:n}))),l.forEach(A=>{u.includes(A.id)&&(A.categoryId=n)}),w.success(`${u.length} produtos atualizados!`),window.cancelBulkActions(),L()}catch{w.error("Erro ao processar em massa.")}finally{C&&(C.innerText="Aplicar")}},window.cancelBulkActions=()=>{document.querySelectorAll(".product-checkbox").forEach(u=>u.checked=!1);const n=document.getElementById("select-all-products");n&&(n.checked=!1),p()};const X=["fa-utensils","fa-burger","fa-pizza-slice","fa-ice-cream","fa-coffee","fa-beer","fa-wine-glass","fa-apple-whole","fa-carrot","fa-bowl-food","fa-cake-candles","fa-candy-cane","fa-cookie","fa-glass-water","fa-mug-hot","fa-bag-shopping","fa-shirt","fa-shoe-prints","fa-glasses","fa-watch","fa-laptop","fa-mobile-screen","fa-gamepad","fa-headphones","fa-camera","fa-tv","fa-microchip","fa-car","fa-bicycle","fa-plane","fa-bus","fa-train","fa-ship","fa-anchor","fa-heart","fa-star","fa-bolt","fa-fire","fa-leaf","fa-tree","fa-sun","fa-moon","fa-droplet","fa-cloud","fa-music","fa-film","fa-book","fa-pencil","fa-palette","fa-briefcase","fa-home","fa-medkit","fa-dumbbell","fa-basketball","fa-soccer-ball","fa-baseball","fa-volleyball","fa-tag"];setTimeout(()=>{Q(j);const n=document.getElementById("btn-copy-catalog");n&&(n.onclick=()=>{const H=document.getElementById("catalog-url-display")?.value;H&&navigator.clipboard.writeText(H).then(()=>w.success("Link do catálogo copiado!"))});const u=document.getElementById("btn-bulk-save"),C=document.getElementById("btn-bulk-cancel");u&&(u.onclick=()=>window.applyBulkCategory()),C&&(C.onclick=()=>window.cancelBulkActions());const A=document.getElementById("bulk-upload-section");A&&(A.addEventListener("dragover",H=>{H.preventDefault(),A.classList.add("drag-active")}),A.addEventListener("dragleave",()=>A.classList.remove("drag-active")),A.addEventListener("drop",H=>{H.preventDefault(),A.classList.remove("drag-active"),H.dataTransfer?.files&&O(H.dataTransfer.files)}))},100);const te=`
        <div id="category-modal" class="modal hidden">
            <div class="modal-content glass" style="max-width: 500px;">
                <span class="close-modal" onclick="window.closeModals()">&times;</span>
                <h2>Gerenciar Categorias</h2>
                <p class="text-muted">Crie categorias para organizar seus ${x.toLowerCase()}.</p>
                
                <form id="category-form" style="margin-top: 20px;" onsubmit="window.saveCategory(event)">
                    <div class="form-group">
                        <label>Nome da Categoria</label>
                        <input type="text" id="cat-name" placeholder="Ex: Bebidas, Sobremesas..." required>
                    </div>
                    <div class="form-group">
                        <label>Ícone (Selecione um)</label>
                        <div class="icon-picker-grid" id="icon-picker">
                            <!-- Icons will be injected here -->
                        </div>
                        <input type="hidden" id="cat-icon" value="fa-tag">
                    </div>
                    <button type="submit" class="btn-primary full-width">Salvar Categoria</button>
                </form>

                <div id="categories-list" style="margin-top: 30px; border-top: 1px solid var(--border-color); padding-top: 20px;">
                    <!-- Existing categories will be listed here -->
                </div>
            </div>
        </div>

        <div id="edit-cat-name-modal" class="modal hidden">
            <div class="modal-content glass" style="max-width: 400px; padding: 30px;">
                 <span class="close-modal" onclick="document.getElementById('edit-cat-name-modal').classList.add('hidden')">&times;</span>
                 <h3>Editar Nome</h3>
                 <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 20px;">Altere o nome da categoria selecionada.</p>
                 <div class="form-group">
                    <input type="text" id="edit-cat-name-input" style="width: 100%;" required>
                 </div>
                 <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button class="btn-secondary full-width" onclick="document.getElementById('edit-cat-name-modal').classList.add('hidden')">Cancelar</button>
                    <button class="btn-primary full-width" onclick="window.updateCategoryName()">Salvar</button>
                 </div>
            </div>
        </div>
    `,G=`
        <div id="product-modal" class="modal hidden">
            <div class="modal-content glass big-modal" style="display: flex; flex-direction: column; max-height: 90vh;">
                <span class="close-modal" onclick="window.closeModals()">&times;</span>
                <div style="padding: 0 20px 20px 0;">
                    <h2 id="modal-title" style="margin-bottom: 5px;">Gerenciar ${x}</h2>
                    <p class="text-muted" style="font-size: 0.9rem;">Adicione ou edite ${x.toLowerCase()} do seu catálogo.</p>
                </div>
                
                <div style="overflow-y: auto; padding-right: 10px; flex: 1;">
                    ${N?`
                    <div class="form-group" id="store-select-group">
                        <label>Lojas de Destino (selecione uma ou mais)</label>
                        <div id="multi-store-container" class="multi-select-grid">
                            ${M.map(n=>`
                                <label class="store-checkbox-card">
                                    <input type="checkbox" name="store-ids" value="${n.id}">
                                    <span class="checkbox-label">${n.name}</span>
                                </label>
                            `).join("")}
                        </div>
                    </div>
                    `:""}

                    <div id="bulk-upload-section" class="bulk-dropzone" onclick="document.getElementById('bulk-file-input').click()">
                        <input type="file" id="bulk-file-input" multiple accept="image/*" style="display: none;" onchange="window.handleBulkFileSelection(this)">
                        <div class="dropzone-content">
                            <div class="dropzone-icon">
                                <i class="fa-solid fa-cloud-arrow-up"></i>
                            </div>
                            <h3>Importação por Imagem</h3>
                            <p>Arraste fotos dos seus ${x.toLowerCase()} aqui ou <span>clique para navegar</span></p>
                            <small>Formatos: JPG, PNG, WebP (máx 5MB/foto)</small>
                        </div>
                    </div>

                    <form id="create-product-form">
                        <div id="products-list-container" style="display: flex; flex-direction: column; gap: 12px; margin-top: 20px;">
                            <!-- Items will be injected here -->
                        </div>

                        <div id="empty-list-msg" style="text-align: center; color: var(--text-dim); padding: 40px 20px; border: 1px dashed var(--border-color); border-radius: 12px; margin-top: 10px;">
                            <i class="fa-solid fa-box-open" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                            Nenhum ${v.toLowerCase()} na lista de envio.
                        </div>
                    </form>
                </div>

                <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                     <button type="button" class="btn-text" style="display: flex; align-items: center; gap: 8px;" onclick="window.addManualItem()">
                        <i class="fa-solid fa-plus-circle"></i> Item Manual
                     </button>
                     <div style="display: flex; gap: 12px;">
                        <button type="button" class="btn-secondary" onclick="window.closeModals()">Cancelar</button>
                        <button type="button" id="btn-save-products-trigger" class="btn-primary" style="min-width: 160px; display: flex; align-items: center; justify-content: center; gap: 8px;" onclick="window.saveProducts()">
                            <i class="fa-solid fa-save"></i> <span>Salvar ${x}</span>
                        </button>
                     </div>
                </div>
            </div>
        </div>
    `,W=n=>n.imagemPath&&n.downloadToken?`https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(n.imagemPath)}?alt=media&token=${n.downloadToken}`:null,ae=n=>{const u=W(n);return`
        <div id="combo-item-${n.id}" style="background:var(--surface-hover);border:1px solid var(--border-color);border-radius:10px;padding:0.85rem 1rem;margin-bottom:0.6rem;display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;">
            <div style="display:flex;gap:0.75rem;flex:1;min-width:0;">
                <div style="width:46px;height:46px;border-radius:8px;flex-shrink:0;overflow:hidden;background:rgba(245,158,11,0.1);display:flex;align-items:center;justify-content:center;">
                    ${u?`<img src="${u}" style="width:100%;height:100%;object-fit:cover;">`:'<i class="fa-solid fa-layer-group" style="color:#f59e0b;"></i>'}
                </div>
                <div style="flex:1;min-width:0;">
                    <div style="font-weight:700;font-size:0.92rem;margin-bottom:2px;">${n.nome}</div>
                    <div style="font-size:0.78rem;color:var(--text-muted);">${(n.produtos||[]).map(C=>C.name).join(" + ")}</div>
                    <div style="font-size:0.9rem;font-weight:700;color:#10b981;margin-top:4px;">R$ ${parseFloat(n.preco||0).toFixed(2)}</div>
                </div>
            </div>
            <div style="display:flex;gap:6px;flex-shrink:0;">
                <button data-combo-toggle="${n.id}" data-ativo="${n.ativo!==!1}" style="background:${n.ativo!==!1?"rgba(16,185,129,0.12)":"rgba(239,68,68,0.12)"};color:${n.ativo!==!1?"#34d399":"#f87171"};border:1px solid ${n.ativo!==!1?"rgba(16,185,129,0.3)":"rgba(239,68,68,0.3)"};border-radius:6px;padding:4px 10px;font-size:0.75rem;font-weight:600;cursor:pointer;">
                    ${n.ativo!==!1?"Ativo":"Inativo"}
                </button>
                <button data-combo-delete="${n.id}" style="background:rgba(239,68,68,0.1);color:#f87171;border:1px solid rgba(239,68,68,0.25);border-radius:6px;padding:4px 8px;font-size:0.75rem;cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`},de=()=>{document.querySelectorAll("[data-combo-toggle]").forEach(n=>{n.addEventListener("click",async()=>{const u=n.dataset.comboToggle,C=n.dataset.ativo==="true";try{await T.update("combos",u,{ativo:!C});const A=h.find(R=>R.id===u);A&&(A.ativo=!C);const H=document.getElementById("combos-list");H&&(H.outerHTML=`<div id="combos-list">${h.map(R=>ae(R)).join("")}</div>`),de()}catch(A){w.error("Erro: "+A.message)}})}),document.querySelectorAll("[data-combo-delete]").forEach(n=>{n.addEventListener("click",async()=>{const u=n.dataset.comboDelete;if(await pe.show({title:"Excluir Combo",message:"Tem certeza que deseja excluir este combo?",type:"danger",confirmText:"Excluir"}))try{await T.delete("combos",u),h=h.filter(H=>H.id!==u);const A=document.getElementById("combos-list");A&&(A.outerHTML=`<div id="combos-list">${h.length===0?'<p style="text-align:center;color:var(--text-muted);font-size:0.88rem;padding:1.5rem 0;">Nenhum combo cadastrado ainda.</p>':h.map(H=>ae(H)).join("")}</div>`),de(),w.success("Combo excluído.")}catch(A){w.error("Erro: "+A.message)}})})};return window.openCombosModal=()=>{document.getElementById("combos-modal")?.classList.remove("hidden")},window.renderComboProducts=n=>{const u=document.getElementById("combo-products-list");if(!u)return;if(!n){u.innerHTML='<p style="text-align:center;color:var(--text-muted);font-size:0.85rem;padding:1rem 0;margin:0;">Selecione uma loja para ver os produtos.</p>';return}const C=l.filter(A=>A.active===!1?!1:(A.storeIds||(A.storeId?[A.storeId]:[])).includes(n));if(C.length===0){u.innerHTML='<p style="text-align:center;color:var(--text-muted);font-size:0.85rem;padding:1rem 0;margin:0;">Nenhum produto ativo nesta loja.</p>';return}u.innerHTML=C.map(A=>`
            <label style="display:flex;align-items:center;gap:10px;cursor:pointer;padding:6px 8px;border-radius:6px;transition:background 0.15s;" onmouseover="this.style.background='rgba(255,255,255,0.04)'" onmouseout="this.style.background='transparent'">
                <input type="checkbox" class="combo-product-check" value="${A.id}" data-name="${A.name}" data-price="${A.price}" style="width:16px;height:16px;accent-color:var(--primary);">
                <span style="flex:1;font-size:0.87rem;">${A.name}</span>
                <span style="font-size:0.8rem;color:var(--text-muted);">R$ ${(A.price||0).toFixed(2)}</span>
            </label>`).join("")},window.saveCombo=async()=>{const n=document.getElementById("combo-nome")?.value.trim(),u=parseFloat(document.getElementById("combo-preco")?.value||"0"),C=document.getElementById("combo-loja")?.value,A=document.querySelectorAll(".combo-product-check:checked");if(!n){w.error("Informe o nome do combo.");return}if(!C){w.error("Selecione uma loja.");return}if(isNaN(u)||u<=0){w.error("Informe um preço válido.");return}if(A.length<2){w.error("Selecione ao menos 2 produtos.");return}const H=Array.from(A).map(K=>({id:K.value,name:K.dataset.name||"",price:parseFloat(K.dataset.price||"0")})),R=document.querySelector('[onclick="window.saveCombo()"]');R&&(R.disabled=!0,R.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...');try{let K="",ie="";const le=document.getElementById("combo-foto-input"),se=le?.files?.[0];if(se){const ee=await a(se,i.companyId);K=ee.imagemPath,ie=ee.downloadToken}const Z=await T.create("combos",{nome:n,preco:u,lojaId:C,empresaId:i.companyId,produtos:H,imagemPath:K,downloadToken:ie,ativo:!0,criadoEm:new Date});h.push({id:Z,nome:n,preco:u,lojaId:C,empresaId:i.companyId,produtos:H,imagemPath:K,downloadToken:ie,ativo:!0}),document.getElementById("combo-nome").value="",document.getElementById("combo-preco").value="",document.getElementById("combo-loja").value="",A.forEach(ee=>{ee.checked=!1}),le&&(le.value="");const Y=document.getElementById("combo-foto-preview");Y&&(Y.innerHTML='<i class="fa-solid fa-image" style="color:#f59e0b;"></i>');const oe=document.getElementById("combo-foto-label");oe&&(oe.textContent="Clique para anexar uma imagem");const ne=document.getElementById("combos-list");ne&&(ne.outerHTML=`<div id="combos-list">${h.map(ee=>ae(ee)).join("")}</div>`),de(),w.success("Combo criado com sucesso!")}catch(K){w.error("Erro ao criar combo: "+(K.message||""))}finally{R&&(R.disabled=!1,R.innerHTML='<i class="fa-solid fa-plus"></i> Criar Combo')}},window.previewComboFoto=n=>{const u=n.files?.[0];if(!u)return;const C=new FileReader;C.onload=A=>{const H=document.getElementById("combo-foto-preview"),R=document.getElementById("combo-foto-label");H&&(H.innerHTML=`<img src="${A.target?.result}" style="width:100%;height:100%;object-fit:cover;">`),R&&(R.textContent=u.name)},C.readAsDataURL(u)},setTimeout(()=>de(),150),`
        <style>
            .bulk-dropzone {
                margin-top: 10px;
                border: 2px dashed var(--border-color);
                border-radius: 12px;
                padding: 30px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s;
                background: rgba(255, 255, 255, 0.02);
            }
            .bulk-dropzone:hover, .bulk-dropzone.drag-active {
                border-color: var(--primary);
                background: rgba(99, 102, 241, 0.05);
            }
            .dropzone-icon { font-size: 2.5rem; color: var(--primary); margin-bottom: 12px; opacity: 0.8; }
            .dropzone-content h3 { margin-bottom: 4px; font-size: 1.1rem; }
            .dropzone-content p { color: var(--text-muted); font-size: 0.9rem; }
            .dropzone-content span { color: var(--primary); font-weight: 600; text-decoration: underline; }

            .product-item-card {
                display: flex;
                gap: 16px;
                background: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: 12px;
                padding: 16px;
                position: relative;
                transition: transform 0.2s, border-color 0.2s;
            }
            .product-item-card:hover { border-color: rgba(99, 102, 241, 0.3); }

            .item-visual { position: relative; width: 100px; }
            .image-preview-wrapper {
                width: 100px; height: 100px;
                background: rgba(0,0,0,0.3);
                border-radius: 8px; overflow: hidden;
                display: flex; align-items: center; justify-content: center;
                border: 1px solid var(--border-color);
            }
            .preview-img { width: 100%; height: 100%; object-fit: cover; }
            .preview-placeholder { font-size: 2rem; color: var(--text-dim); }

            .btn-change-img {
                position: absolute; bottom: -8px; right: -8px;
                width: 32px; height: 32px;
                background: var(--primary); color: white;
                border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                font-size: 0.8rem;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                border: 2px solid var(--surface-hover);
            }

            .item-details { flex: 1; display: flex; flex-direction: column; justify-content: center; }
            .input-row { display: grid; grid-template-columns: 1fr 140px; gap: 12px; }
            .field label { font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 6px; display: block; }
            .field input {
                width: 100%; background: var(--bg-color);
                border: 1px solid var(--border-color); color: white;
                padding: 10px 12px; border-radius: 8px; font-size: 0.95rem;
            }
            .field input:focus { border-color: var(--primary); outline: none; }

            .btn-remove-item {
                position: absolute; top: 8px; right: 8px;
                width: 24px; height: 24px;
                color: var(--text-dim); font-size: 1rem; opacity: 0.5;
            }
            .btn-remove-item:hover { color: var(--danger); opacity: 1; }

            .upload-progress-overlay {
                position: absolute; inset: 0;
                background: rgba(0,0,0,0.6);
                display: flex; align-items: center; justify-content: center; z-index: 5;
            }
            .spinner-small {
                width: 20px; height: 20px;
                border: 2px solid rgba(255,255,255,0.3);
                border-top-color: white;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
            }
            @keyframes spin { to { transform: rotate(360deg); } }

            .btn-secondary { background: rgba(255,255,255,0.05); color: var(--text-main); padding: 0.75rem 1.5rem; border-radius: var(--radius-md); font-weight: 600; border: 1px solid var(--border-color); }
            .btn-secondary:hover { background: rgba(255,255,255,0.1); }

            .multi-select-grid {
                display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                gap: 8px; padding: 12px;
                background: var(--surface-hover); border-radius: 12px; border: 1px solid var(--border-color);
            }
            .store-checkbox-card {
                cursor: pointer; display: flex; align-items: center; gap: 8px;
                padding: 8px 12px; background: var(--bg-color);
                border: 1px solid var(--border-color); border-radius: 8px; transition: all 0.2s;
            }
            .store-checkbox-card:has(input:checked) { border-color: var(--primary); background: rgba(99,102,241,0.1); }
            .store-checkbox-card input { width: 16px; height: 16px; cursor: pointer; }
            .checkbox-label { font-size: 0.85rem; font-weight: 500; }

            .store-filter-container {
                display: flex; gap: 8px;
                background: var(--surface-hover); padding: 4px;
                border-radius: 12px; border: 1px solid var(--border-color);
                overflow-x: auto; max-width: calc(100vw - 400px);
            }
            .filter-pill {
                padding: 6px 16px; border-radius: 8px;
                font-size: 0.85rem; font-weight: 600;
                color: var(--text-muted); white-space: nowrap; transition: all 0.2s;
            }
            .filter-pill:hover { color: var(--text-main); background: rgba(255,255,255,0.05); }
            .filter-pill.active { background: var(--primary); color: white; box-shadow: 0 4px 12px var(--primary-glow); }

            .icon-picker-grid {
                display: grid; grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
                gap: 8px; max-height: 200px; overflow-y: auto;
                background: rgba(0,0,0,0.2); padding: 10px;
                border-radius: 8px; border: 1px solid var(--border-color); margin-top: 5px;
            }
            .icon-option {
                width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
                background: var(--surface-hover); border: 1px solid var(--border-color);
                border-radius: 6px; cursor: pointer; transition: all 0.2s; font-size: 1.2rem;
            }
            .icon-option:hover { border-color: var(--primary); }
            .icon-option.selected { background: var(--primary); border-color: var(--primary); color: white; }

            .category-item {
                display: flex; justify-content: space-between; align-items: center;
                padding: 12px; background: rgba(255,255,255,0.03);
                border-radius: 10px; margin-bottom: 10px;
                border: 1px solid var(--border-color);
            }
            #categories-list { max-height: 250px; overflow-y: auto; padding-right: 5px; }
            #categories-list::-webkit-scrollbar { width: 4px; }
            #categories-list::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }

            .btn-text { background: transparent; color: var(--primary); border: none; cursor: pointer; font-weight: 600; font-size: 0.9rem; }
            .btn-text:hover { text-decoration: underline; }

            .bulk-actions-bar {
                display: flex; align-items: center; gap: 15px;
                background: var(--primary); color: white;
                padding: 12px 20px; border-radius: 12px; margin-bottom: 20px;
                box-shadow: 0 10px 20px var(--primary-glow); animation: slideInUp 0.3s;
            }
            @keyframes slideInUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

            .bulk-select-cat {
                background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);
                color: white; padding: 6px 12px; border-radius: 8px; font-size: 0.9rem; outline: none;
            }
            .bulk-select-cat option { background: var(--surface); color: white; }
        </style>

        <div class="page-container">
            <div class="page-header" style="justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
                <div>
                     <h2 class="page-title" style="margin-bottom: 4px;">${$?"Catálogo de Serviços":"Catálogo de Produtos"}</h2>
                     <p style="color: var(--text-muted); font-size: 0.9rem;">${$?"Gerencie os serviços oferecidos pela sua empresa.":"Gerencie os produtos visíveis no cardápio das suas lojas."}</p>
                </div>
                
                <div id="catalog-link-container" class="hidden" style="flex: 1; min-width: 300px; max-width: 500px; background: rgba(99,102,241,0.1); border: 1px dashed var(--primary); border-radius: 12px; padding: 10px 15px; display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                    <div style="flex: 1; overflow: hidden;">
                        <span style="font-size: 0.7rem; color: var(--primary); font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 2px;">Link do Catálogo</span>
                        <input type="text" id="catalog-url-display" readonly style="width: 100%; background: transparent; border: none; color: white; font-size: 0.85rem; text-overflow: ellipsis; outline: none;" value="">
                    </div>
                    <button id="btn-copy-catalog" class="btn-primary" style="padding: 8px 12px; font-size: 0.8rem; flex-shrink: 0;">
                        <i class="fa-solid fa-copy"></i> Copiar
                    </button>
                    <a id="btn-open-catalog" href="" target="_blank" class="btn-secondary" style="padding: 8px 12px; font-size: 0.8rem; flex-shrink: 0;">
                        <i class="fa-solid fa-external-link"></i>
                    </a>
                </div>

                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button class="btn-secondary" onclick="window.openCategoryModal()"><i class="fa-solid fa-tags"></i> Categorias</button>
                    ${$?"":'<button class="btn-secondary" onclick="window.openCombosModal()" style="color:#f59e0b;border-color:rgba(245,158,11,0.4);"><i class="fa-solid fa-layer-group"></i> Combos</button>'}
                    <button class="btn-primary" onclick="window.openProductModal()"><i style="color: #fff;" class="fa-solid fa-plus"></i> Novo ${v}</button>
                </div>
            </div>

            ${N?`
            <div style="margin-bottom: 2rem; display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 0.85rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Filtrar por Loja:</span>
                    <div class="store-filter-container" id="store-pills-filter">
                        <button class="filter-pill ${j==="all"?"active":""}" onclick="window.setStoreFilter('all', this)">Todas</button>
                        ${M.map(n=>`
                            <button class="filter-pill ${j===n.id?"active":""}" onclick="window.setStoreFilter('${n.id}', this)">${n.name}</button>
                        `).join("")}
                    </div>
                </div>

                <div style="display: flex; gap: 12px; flex: 1; min-width: 300px;">
                    <div style="flex: 2; position: relative;">
                        <i class="fa-solid fa-search" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-dim);"></i>
                        <input type="text" id="product-search-input" placeholder="Pesquisar ${x.toLowerCase()}..." 
                            style="width: 100%; padding: 10px 10px 10px 35px; background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 12px; color: white;"
                            oninput="window.applyFilters()">
                    </div>
                    <div style="flex: 1;">
                        <select id="product-category-filter" onchange="window.applyFilters()"
                            style="width: 100%; padding: 10px; background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 12px; color: white; outline: none;">
                            <option value="all">Todas Categorias</option>
                            ${r.map(n=>`<option value="${n.id}">${n.name}</option>`).join("")}
                        </select>
                    </div>
                </div>
            </div>
            `:`
            <div style="margin-bottom: 2rem; display: flex; gap: 12px;">
                <div style="flex: 2; position: relative;">
                    <i class="fa-solid fa-search" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-dim);"></i>
                    <input type="text" id="product-search-input" placeholder="Pesquisar ${x.toLowerCase()}..." 
                        style="width: 100%; padding: 10px 10px 10px 35px; background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 12px; color: white;"
                        oninput="window.applyFilters()">
                </div>
                <div style="flex: 1;">
                    <select id="product-category-filter" onchange="window.applyFilters()"
                        style="width: 100%; padding: 10px; background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 12px; color: white; outline: none;">
                        <option value="all">Todas Categorias</option>
                        ${r.map(n=>`<option value="${n.id}">${n.name}</option>`).join("")}
                    </select>
                </div>
            </div>
            `}
        </div>

        <div class="card">
            <div class="table-container">
                <div id="bulk-actions-container" class="hidden">
                    <div class="bulk-actions-bar">
                        <span id="bulk-count" style="font-weight: 700;">0 itens selecionados</span>
                        <div style="height: 20px; width: 1px; background: rgba(255,255,255,0.3);"></div>
                        <span>Mover para categoria:</span>
                        <select id="bulk-assign-cat" class="bulk-select-cat">
                            <option value="">Selecione...</option>
                            ${r.map(n=>`<option value="${n.id}">${n.name}</option>`).join("")}
                        </select>
                        <button id="btn-bulk-save" class="btn-primary" style="background: white; color: var(--primary); padding: 6px 15px; font-size: 0.85rem;">Aplicar</button>
                        <button id="btn-bulk-cancel" style="background:transparent; border:none; color:white; font-size: 0.85rem; cursor:pointer;">Cancelar</button>
                    </div>
                </div>

                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width: 40px;"><input type="checkbox" id="select-all-products" onchange="window.toggleAllCheckboxes(this)"></th>
                            <th>${v}</th>
                            <th>Loja</th>
                            <th>Preço</th>
                            <th>${$?"Duração":"Estoque"}</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${b()}
                    </tbody>
                </table>
            </div>
        </div>
        ${G}
        ${te}

        <!-- Combos Modal -->
        <div id="combos-modal" class="modal hidden">
            <div class="modal-content glass" style="max-width:560px;max-height:90vh;overflow-y:auto;padding:0;">
                <div style="padding:1.5rem 1.5rem 1rem;border-bottom:1px solid var(--border-color);display:flex;justify-content:space-between;align-items:center;">
                    <div>
                        <h3 style="margin:0;font-size:1.1rem;font-weight:700;"><i class="fa-solid fa-layer-group" style="color:#f59e0b;margin-right:8px;"></i>Combos</h3>
                        <p style="margin:4px 0 0;font-size:0.82rem;color:var(--text-muted);">Crie kits de produtos com preço especial</p>
                    </div>
                    <span class="close-modal" onclick="document.getElementById('combos-modal').classList.add('hidden')">&times;</span>
                </div>

                <!-- Form criar combo -->
                <div id="combo-form-section" style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border-color);">
                    <div style="display:flex;flex-direction:column;gap:0.75rem;">
                        <div>
                            <label style="font-size:0.8rem;font-weight:600;color:var(--text-muted);display:block;margin-bottom:4px;">Nome do Combo *</label>
                            <input id="combo-nome" type="text" placeholder="Ex: Combo Família" style="width:100%;padding:0.6rem 0.8rem;background:var(--surface-hover);border:1px solid var(--border-color);border-radius:8px;color:var(--text-main);font-size:0.9rem;box-sizing:border-box;">
                        </div>
                        <div>
                            <label style="font-size:0.8rem;font-weight:600;color:var(--text-muted);display:block;margin-bottom:4px;">Loja *</label>
                            <select id="combo-loja" onchange="window.renderComboProducts(this.value)" style="width:100%;padding:0.6rem 0.8rem;background:var(--surface-hover);border:1px solid var(--border-color);border-radius:8px;color:var(--text-main);font-size:0.9rem;box-sizing:border-box;">
                                <option value="">Selecione uma loja</option>
                                ${M.map(n=>`<option value="${n.id}">${n.name}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label style="font-size:0.8rem;font-weight:600;color:var(--text-muted);display:block;margin-bottom:4px;">Foto do Combo</label>
                            <div onclick="document.getElementById('combo-foto-input').click()" style="display:flex;align-items:center;gap:12px;padding:0.6rem 0.8rem;background:var(--surface-hover);border:1px dashed var(--border-color);border-radius:8px;cursor:pointer;">
                                <div id="combo-foto-preview" style="width:48px;height:48px;border-radius:8px;background:rgba(245,158,11,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;">
                                    <i class="fa-solid fa-image" style="color:#f59e0b;"></i>
                                </div>
                                <span id="combo-foto-label" style="font-size:0.85rem;color:var(--text-muted);">Clique para anexar uma imagem</span>
                                <input type="file" id="combo-foto-input" accept="image/*" style="display:none;" onchange="window.previewComboFoto(this)">
                            </div>
                        </div>
                        <div>
                            <label style="font-size:0.8rem;font-weight:600;color:var(--text-muted);display:block;margin-bottom:4px;">Preço do Combo (R$) *</label>
                            <input id="combo-preco" type="number" min="0" step="0.01" placeholder="0,00" style="width:100%;padding:0.6rem 0.8rem;background:var(--surface-hover);border:1px solid var(--border-color);border-radius:8px;color:var(--text-main);font-size:0.9rem;box-sizing:border-box;">
                        </div>
                        <div>
                            <label style="font-size:0.8rem;font-weight:600;color:var(--text-muted);display:block;margin-bottom:4px;">Produtos do Combo *</label>
                            <div id="combo-products-list" style="display:flex;flex-direction:column;gap:6px;max-height:200px;overflow-y:auto;background:var(--surface-hover);border:1px solid var(--border-color);border-radius:8px;padding:8px;">
                                <p style="text-align:center;color:var(--text-muted);font-size:0.85rem;padding:1rem 0;margin:0;">Selecione uma loja para ver os produtos.</p>
                            </div>
                        </div>
                        <button onclick="window.saveCombo()" class="btn-primary" style="width:100%;justify-content:center;"><i class="fa-solid fa-plus"></i> Criar Combo</button>
                    </div>
                </div>

                <!-- Lista de combos existentes -->
                <div style="padding:1.25rem 1.5rem;">
                    <p style="font-size:0.8rem;font-weight:700;text-transform:uppercase;color:var(--text-muted);margin:0 0 0.75rem;">Combos Cadastrados</p>
                    <div id="combos-list">
                        ${h.length===0?'<p style="text-align:center;color:var(--text-muted);font-size:0.88rem;padding:1.5rem 0;">Nenhum combo cadastrado ainda.</p>':h.map(n=>ae(n)).join("")}
                    </div>
                </div>
            </div>
        </div>
    `},qa=async()=>{const i=ce.getCurrentUser();if(!i||!i.companyId)return"<p>Erro: Usuário sem empresa associada.</p>";let k=(await T.get("companies",i.companyId))?.stores||[];const m=i.role==="owner",$=()=>k.length===0?'<tr><td colspan="5" style="text-align:center">Nenhuma loja cadastrada.</td></tr>':k.map(x=>{const M=x.active&&x.instancia_id,N=x.frete_ativo!==!1;return`
            <tr data-store-id="${x.id}">
                <td>${x.name}</td>
                <td>${x.address}</td>
                <td><span class="badge ${M?"success":"danger"}">${M?"Operante":x.active?"Sem Instância":"Inativa"}</span></td>
                <td><span class="badge ${N?"success":"warning"}">${N?"Frete Ativo":"N/A: Retirada Apenas"}</span></td>
                <td>
                    <div class="actions">
                        ${m?`
                            <button class="action-btn" onclick="window.toggleStoreStatus('${x.id}', ${x.active})" title="${x.active?"Desativar Loja":"Ativar Loja"}">
                                ${x.active?'<i style="color: #FFF;" class="fa-solid fa-store-slash"></i>':'<i style="color: #FFF;" class="fa-solid fa-store"></i>'}
                            </button>
                            <button class="action-btn" onclick="window.toggleStoreFrete('${x.id}', ${N})" title="${N?"Desativar Frete":"Ativar Frete"}">
                                ${N?'<i style="color: #FFF;" class="fa-solid fa-truck-ramp-box"></i>':'<i style="color: #FFF;" class="fa-solid fa-truck"></i>'}
                            </button>
                        `:""}
                    </div>
                </td>
            </tr>
        `}).join(""),v=()=>{const x=document.querySelector(".data-table tbody");x&&(x.innerHTML=$())};return window.toggleStoreFrete=async(x,M)=>{try{const N=!M,_=k.map(j=>j.id===x?{...j,frete_ativo:N}:j);await T.update("companies",i.companyId,{stores:_}),k=_,v(),w.success(`Frete da loja atualizado para ${N?"ativo":"inativo"}.`)}catch(N){w.error("Erro ao atualizar frete: "+N)}},window.toggleStoreStatus=async(x,M)=>{const N=M?"desativar":"ativar";if(await pe.warning(`${N.charAt(0).toUpperCase()+N.slice(1)} Loja`,`Deseja ${N} esta loja?`))try{const j=k.map(I=>I.id===x?{...I,active:!M}:I);await T.update("companies",i.companyId,{stores:j}),k=j,v(),w.success(`Loja ${M?"desativada":"ativada"} com sucesso!`)}catch(j){w.error("Erro ao atualizar status: "+j)}},`
        <div class="page-header">
            <h2 class="page-title">Minhas Lojas</h2>
        </div>

        <div class="card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome da Loja</th>
                            <th>Endereço</th>
                            <th>Status Operacional</th>
                            <th>Status Frete</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${$()}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="card" style="margin-top: 1.5rem;">
            <h3 style="margin-bottom: 0.5rem;"><i class="fa-solid fa-info-circle"></i> Informação</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem;">
                Apenas o administrador da plataforma pode criar, editar ou excluir lojas.<br>
                Como dono da empresa, você pode apenas ativar ou desativar lojas existentes.
            </p>
        </div>
    `},ua=async()=>{let i=await T.getAll("users");const e=()=>i.length===0?'<tr><td colspan="5" style="text-align:center">Nenhum usuário cadastrado.</td></tr>':i.map($=>`
            <tr data-user-id="${$.id}">
                <td>${$.name||"-"}</td>
                <td>${$.email}</td>
                <td><span class="badge info">${$.role}</span></td>
                <td><span class="badge ${$.companyId?"warning":"success"}">${$.companyId?"Vinculado":"Global"}</span></td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editAdminUser('${$.id}')" title="Editar"><i style="color: #fff" class="fa-solid fa-pen-to-square"></i></button>
                    </div>
                </td>
            </tr>
        `).join(""),f=`
        <div id="admin-user-modal" class="modal hidden">
            <div class="modal-content glass">
                <span class="close-modal">&times;</span>
                <h2>Editar Usuário</h2>
                <form id="edit-user-form">
                    <input type="hidden" id="user-uid">
                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" id="user-name" required>
                    </div>
                    <div class="form-group">
                        <label>Email (Apenas Leitura)</label>
                        <input type="email" id="user-email" disabled>
                    </div>
                    <button type="submit" class="btn-primary full-width">Salvar Alterações</button>
                </form>
            </div>
        </div>
    `,k=()=>{const $=document.querySelector(".data-table tbody");$&&($.innerHTML=e())};return window.editAdminUser=$=>{const v=i.find(x=>x.id===$||x.uid===$);v&&(document.getElementById("user-uid").value=v.id,document.getElementById("user-name").value=v.name||"",document.getElementById("user-email").value=v.email||"",document.getElementById("admin-user-modal").classList.remove("hidden"))},setTimeout(()=>{m()},100),`
        <div class="page-header">
            <h2 class="page-title">Usuários da Plataforma</h2>
        </div>

        <div class="card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Função</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e()}
                    </tbody>
                </table>
            </div>
        </div>
        ${f}
    `;function m(){const $=document.getElementById("admin-user-modal"),v=document.querySelector(".close-modal"),x=document.getElementById("edit-user-form");v&&$&&(v.onclick=()=>$.classList.add("hidden")),x&&(x.onsubmit=async M=>{M.preventDefault();const N=document.getElementById("user-uid").value,_=document.getElementById("user-name").value;try{await T.update("users",N,{name:_});const j=i.find(I=>I.id===N);j&&(j.name=_),k(),w.success("Usuário atualizado com sucesso!"),$&&$.classList.add("hidden")}catch(j){console.error(j),w.error("Erro ao atualizar: "+j)}})}};class ha{container;inputWrapper;searchInput;dropdown;options;selectedValues;onChange;maxVisibleTags;placeholder;constructor(e,f,k=[],m=()=>{},$="Selecione...",v=10){this.options=f,this.selectedValues=new Set(k),this.onChange=m,this.maxVisibleTags=v,this.placeholder=$;const x=document.getElementById(e);if(!x)throw new Error(`Container #${e} not found`);this.container=x,this.container.className="multi-select-container",this.inputWrapper=this.createInputWrapper(),this.searchInput=this.createSearchInput(),this.dropdown=this.createDropdown(),this.inputWrapper.appendChild(this.searchInput),this.container.appendChild(this.inputWrapper),this.container.appendChild(this.dropdown),this.setupEventListeners(),this.render()}createInputWrapper(){const e=document.createElement("div");return e.className="multi-select-input",e}createSearchInput(){const e=document.createElement("input");return e.type="text",e.className="multi-select-search",e.placeholder=this.selectedValues.size===0?this.placeholder:"",e}createDropdown(){const e=document.createElement("div");return e.className="multi-select-dropdown",e}setupEventListeners(){this.inputWrapper.addEventListener("click",e=>{e.stopPropagation(),this.searchInput.focus(),this.openDropdown()}),this.searchInput.addEventListener("input",()=>{this.renderDropdown(),this.openDropdown()}),this.searchInput.addEventListener("keydown",e=>{if(e.key==="Backspace"&&this.searchInput.value===""&&this.selectedValues.size>0){const f=Array.from(this.selectedValues).pop();f&&this.toggleOption(f)}}),document.addEventListener("click",e=>{this.container.contains(e.target)||this.closeDropdown()})}openDropdown(){this.dropdown.classList.add("active"),this.inputWrapper.classList.add("active")}closeDropdown(){this.dropdown.classList.remove("active"),this.inputWrapper.classList.remove("active"),this.searchInput.value="",this.renderDropdown()}render(){this.renderTags(),this.renderDropdown()}renderTags(){this.inputWrapper.querySelectorAll(".multi-select-tag, .multi-select-more").forEach(m=>m.remove());const f=Array.from(this.selectedValues);if(f.slice(0,this.maxVisibleTags).forEach(m=>{const $=this.options.find(v=>v.value===m);if($){const v=this.createTag($);this.inputWrapper.insertBefore(v,this.searchInput)}}),f.length>this.maxVisibleTags){const m=document.createElement("span");m.className="multi-select-more",m.textContent=`+${f.length-this.maxVisibleTags}`,this.inputWrapper.insertBefore(m,this.searchInput)}this.searchInput.placeholder=this.selectedValues.size===0?this.placeholder:""}createTag(e){const f=document.createElement("div");f.className="multi-select-tag";const k=document.createElement("span");k.textContent=e.label;const m=document.createElement("button");return m.className="multi-select-tag-remove",m.innerHTML='<i class="fa-solid fa-xmark"></i>',m.onclick=$=>{$.stopPropagation(),this.toggleOption(e.value)},f.appendChild(k),f.appendChild(m),f}renderDropdown(){this.dropdown.innerHTML="";const e=this.searchInput.value.toLowerCase(),f=this.options.filter(k=>k.label.toLowerCase().includes(e)||k.meta&&k.meta.toLowerCase().includes(e));if(f.length===0){const k=document.createElement("div");k.className="multi-select-no-results",k.textContent="Nenhum resultado encontrado",this.dropdown.appendChild(k);return}f.forEach(k=>{const m=this.createOption(k);this.dropdown.appendChild(m)})}createOption(e){const f=document.createElement("div");f.className="multi-select-option",this.selectedValues.has(e.value)&&f.classList.add("selected");const k=document.createElement("div");k.className="multi-select-checkbox";const m=document.createElement("div");if(m.className="multi-select-option-label",m.textContent=e.label,f.appendChild(k),f.appendChild(m),e.meta){const $=document.createElement("div");$.className="multi-select-option-meta",$.textContent=e.meta,f.appendChild($)}return f.addEventListener("click",$=>{$.stopPropagation(),this.toggleOption(e.value),this.searchInput.value="",this.searchInput.focus(),this.renderDropdown()}),f}toggleOption(e){this.selectedValues.has(e)?this.selectedValues.delete(e):this.selectedValues.add(e),this.renderTags(),this.renderDropdown(),this.onChange(Array.from(this.selectedValues))}getValues(){return Array.from(this.selectedValues)}setValues(e){this.selectedValues=new Set(e),this.render()}destroy(){this.container.innerHTML=""}}const Ha=async()=>{const i=ce.getCurrentUser();if(!i||!i.companyId)return"<p>Erro: Usuário sem empresa associada.</p>";const k=(await T.get("companies",i.companyId))?.stores||[];let m=null,v=(await T.getAll("users",{field:"companyId",operator:"==",value:i.companyId})).filter(I=>I.role==="employee");const x=I=>{let U=[];return!I||(typeof I=="string"?U=I===""?[]:[I]:U=I,U.length===0)?"Todas":U.map(S=>{const d=k.find(s=>s.id===S);return d?d.name:S}).join(", ")},M=()=>v.length===0?'<tr><td colspan="6" style="text-align:center">Nenhum colaborador cadastrado.</td></tr>':v.map(I=>`
            <tr data-user-id="${I.id}">
                <td>${I.name||"Sem Nome"}</td>
                <td>${I.email}</td>
                <td><span class="badge primary">Atendente</span></td>
                <td>${x(I.storeIds||I.storeId)}</td>
                <td><span class="badge ${I.active!==!1?"success":"danger"}">${I.active!==!1?"Ativo":"Inativo"}</span></td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editEmployee('${I.id}')" title="Editar"><i style="color: #fff;" class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn" onclick="window.toggleEmployeeStatus('${I.id}', ${I.active!==!1})" title="${I.active!==!1?"Desativar":"Ativar"}">${I.active!==!1?'<i style="color: #fff;" class="fa-solid fa-ban"></i>':'<i style="color: #fff;" class="fa-solid fa-check"></i>'}</button>
                        <button class="action-btn" onclick="window.deleteEmployee('${I.id}')" title="Excluir"><i style="color: #fff;" class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join(""),N=`
        <div id="employee-modal" class="modal hidden">
            <div class="modal-content glass">
                <span class="close-modal">&times;</span>
                <h2 id="modal-title">Novo Colaborador</h2>
                <form id="create-employee-form">
                    <input type="hidden" id="emp-uid">
                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" id="emp-name" required>
                    </div>
                    <div class="form-group">
                        <label>E-mail</label>
                        <input type="email" id="emp-email" required>
                    </div>
                    <div class="form-group" id="pwd-group">
                        <label>Senha</label>
                        <input type="password" id="emp-password" required>
                        <small style="color: #999; font-size: 0.8em; display: none;" id="pwd-hint">Deixe em branco para manter a senha atual.</small>
                    </div>
                    <div class="form-group">
                         <label>Lojas de Atuação</label>
                         <div id="employee-stores-select"></div>
                    </div>
                    <button type="submit" class="btn-primary full-width">Salvar</button>
                </form>
            </div>
        </div>
    `,_=()=>{const I=document.querySelector(".data-table tbody");I&&(I.innerHTML=M())};return window.editEmployee=I=>{const U=v.find(F=>F.id===I||F.uid===I);if(U){if(document.getElementById("emp-uid").value=U.id,document.getElementById("emp-name").value=U.name,document.getElementById("emp-email").value=U.email,m){const F=U.storeIds||(U.storeId?[U.storeId]:[]);m.setValues(F)}document.getElementById("emp-password").required=!1,document.getElementById("pwd-hint").style.display="block",document.getElementById("emp-email").disabled=!0,document.getElementById("modal-title").innerText="Editar Colaborador",document.getElementById("employee-modal").classList.remove("hidden")}},window.toggleEmployeeStatus=async(I,U)=>{try{await T.update("users",I,{active:!U});const F=v.find(S=>S.id===I);F&&(F.active=!U),_(),w.success(`Colaborador ${U?"desativado":"ativado"} com sucesso!`)}catch(F){w.error("Erro ao atualizar status: "+F)}},window.deleteEmployee=async I=>{if(await pe.danger("Excluir Colaborador","Tem certeza que deseja EXCLUIR este colaborador? Esta ação não pode ser desfeita."))try{await T.delete("users",I),v=v.filter(F=>F.id!==I),_(),w.success("Colaborador excluído com sucesso!")}catch(F){w.error("Erro ao excluir: "+F)}},setTimeout(()=>{j(i.companyId)},100),`
        <style>
            .checkbox-group { display: flex; flex-direction: column; gap: 0.5rem; }
            .checkbox-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
            .checkbox-label input[type="checkbox"] { cursor: pointer; }
        </style>
        <div class="page-header">
            <h2 class="page-title">Minha Equipe</h2>
            <button id="btn-new-employee" class="btn-primary"><i style="color: #fff;" class="fa-solid fa-user-plus"></i> Novo Colaborador</button>
        </div>

        <div class="card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Cargo</th>
                            <th>Lojas</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${M()}
                    </tbody>
                </table>
            </div>
        </div>
        ${N}
    `;function j(I){const U=document.getElementById("employee-modal"),F=document.getElementById("btn-new-employee"),S=document.querySelector(".close-modal"),d=document.getElementById("create-employee-form"),s=k.map(o=>({value:o.id,label:o.name}));m=new ha("employee-stores-select",s,[],()=>{},"Selecione as lojas..."),F&&U&&(F.onclick=()=>{document.getElementById("emp-uid").value="",document.getElementById("create-employee-form").reset(),document.getElementById("emp-password").required=!0,document.getElementById("pwd-hint").style.display="none",document.getElementById("emp-email").disabled=!1,document.getElementById("modal-title").innerText="Novo Colaborador",m&&m.setValues([]),U.classList.remove("hidden")}),S&&U&&(S.onclick=()=>U.classList.add("hidden")),d&&(d.onsubmit=async o=>{o.preventDefault();const l=document.getElementById("emp-uid").value,r=document.getElementById("emp-name").value,h=document.getElementById("emp-email").value,y=document.getElementById("emp-password").value,b=m?m.getValues():[];try{if(l){const L={name:r,storeIds:b.length>0?b:[]};await T.update("users",l,L);const p=v.find(E=>E.id===l);p&&Object.assign(p,L),w.success("Colaborador atualizado com sucesso!")}else{const L=await ce.registerUser(h,y),p={uid:L,name:r,email:h,role:"employee",companyId:I,storeIds:b.length>0?b:[],active:!0,permissions:["orders","products"]};await T.set("users",L,p),v.push({id:L,...p}),w.success("Colaborador adicionado com sucesso!")}U&&U.classList.add("hidden"),_()}catch(L){console.error(L),w.error("Erro: "+L)}})}},Na=()=>`
        <div class="config-container">
            <div class="card config-card">
                <div class="card-header">
                    <h3>Modo de Operação da IA</h3>
                </div>
                <div class="config-options">
                    <div class="config-option active">
                        <div class="option-header">
                            <input type="radio" name="ia-mode" checked>
                            <label>Modo 1 – IA baseada em produtos</label>
                        </div>
                        <p>A IA consulta os produtos cadastrados na dashboard e valida o estoque.</p>
                    </div>
                    <div class="config-option">
                        <div class="option-header">
                            <input type="radio" name="ia-mode">
                            <label>Modo 2 – IA em modo aberto</label>
                        </div>
                        <p>A IA conversa livremente. Todo pedido é enviado para aceite humano manual.</p>
                    </div>
                </div>
            </div>

            <div class="card config-card">
                <div class="card-header">
                    <h3>Prompt Personalizado</h3>
                </div>
                <div class="prompt-editor">
                    <textarea placeholder="Digite o prompt base para a IA desta empresa...">Você é um assistente virtual para a Loja Centro. Seu objetivo é ajudar o cliente a escolher produtos e fechar pedidos no WhatsApp de forma amigável e eficiente.</textarea>
                </div>
                <div class="config-footer">
                    <button class="btn-primary">Salvar Configurações</button>
                </div>
            </div>
        </div>
    `,Fa=()=>`
        <div class="login-wrapper">
            <div class="login-card glass">
                <div class="login-header">
                    <div class="logo-icon large"><img style="width: 100%;" src="/logo.png" alt="Logo"></div>
                    <h1>AutoQui</h1>
                    <p>Entre com suas credenciais para acessar a plataforma.</p>
                </div>
                <form id="login-form" class="login-form">
                    <div class="form-group">
                        <label>E-mail</label>
                        <input type="email" id="email" placeholder="Seu e-mail" required>
                    </div>
                    <div class="form-group">
                        <label>Senha</label>
                        <input type="password" id="password" placeholder="Sua senha" required>
                    </div>
                    <button type="submit" class="btn-primary full-width">Acessar Sistema</button>
                </form>
            </div>
        </div>
    `,Oa=async()=>{let i=await T.getAll("companies"),e=null,f=["atendimento"];const k=[{value:"atendimento",label:"IA de Atendimento"},{value:"venda",label:"IA de Venda"},{value:"agendamento",label:"IA de Agendamento"},{value:"disparo",label:"Disparo em Massa"},{value:"venda_catalogo",label:"Venda pelo Catálogo"}],m=()=>i.length===0?'<tr><td colspan="5" style="text-align:center">Nenhum cliente cadastrado.</td></tr>':i.map(_=>`
            <tr data-company-id="${_.id}">
                <td>${_.name}</td>
                <td><span class="badge ${_.status==="active"?"success":"danger"}">${_.status==="active"?"Ativo":"Inativo"}</span></td>
                <td><div style="display:flex; gap:4px; flex-wrap:wrap;">${(_.modulos_ativos||[]).map(j=>`<span class="badge info" style="font-size:0.7rem;">${j}</span>`).join("")}</div></td>
                <td>${_.stores?_.stores.length:0}</td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editCompany('${_.id}')" title="Editar"><i style="color: #fff" class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn" onclick="window.toggleCompanyStatus('${_.id}', '${_.status}')" title="${_.status==="active"?"Desativar":"Ativar"}">${_.status==="active"?'<i style="color: #ef4444;" class="fa-solid fa-toggle-off"></i>':'<i style="color: #22c55e;" class="fa-solid fa-toggle-on"></i>'}</button>
                    </div>
                </td>
            </tr>
        `).join(""),$=`
        <div id="company-modal" class="modal hidden">
            <div class="modal-content glass big-modal">
                <span class="close-modal">&times;</span>
                <h2 id="company-modal-title">Novo Cliente</h2>
                <form id="create-company-form">
                    <input type="hidden" id="company-id">
                    <div class="form-row">
                        <div class="form-group half">
                            <label>Nome do Cliente</label>
                            <input type="text" id="company-name" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group half">
                            <label>Limite de Instâncias</label>
                            <input type="number" id="company-instances-limit" min="1" value="1" required>
                        </div>
                    </div>

                    <div id="owner-section">
                        <h3>Dono do Cliente</h3>
                        <div class="form-row">
                            <div class="form-group half">
                                <label>Email</label>
                                <input type="email" id="owner-email">
                            </div>
                            <div class="form-group half">
                                <label>Senha</label>
                                <input type="password" id="owner-password">
                            </div>
                        </div>
                        <p style="font-size: 0.8em; color: #888; margin-top: -10px; margin-bottom: 10px;">Preencha apenas se for criar um novo usuário dono.</p>
                    </div>

                    <h3>Lojas / Unidades <span style="color: #ef4444;">*</span></h3>
                    <p style="font-size: 0.85em; color: #999; margin-top: -8px; margin-bottom: 12px;">Mínimo de 1 loja obrigatória</p>
                    <div class="stores-section">
                        <div id="stores-list">
                            <!-- Store inputs will be added here -->
                        </div>
                        <button type="button" id="btn-add-store" class="btn-secondary small"><i class="fa-solid fa-plus"></i> Adicionar Loja</button>
                    </div>

                    <h3>Módulos Ativos</h3>
                    <div class="form-row">
                        <div id="modules-select-container"></div>
                    </div>

                    <button type="submit" class="btn-primary full-width" style="margin-top:1rem;">Salvar Cliente</button>
                </form>
            </div>
        </div>
    `,v=()=>{const _=document.querySelector(".data-table tbody");_&&(_.innerHTML=m())};window.editCompany=_=>{const j=i.find(I=>I.id===_);if(j){if(document.getElementById("company-id").value=j.id,document.getElementById("company-name").value=j.name,document.getElementById("company-instances-limit").value=(j.limite_instancias||"1").toString(),e){const U=j.modulos_ativos||["atendimento"];e.setValues(U),f=U}document.getElementById("owner-section").style.display="none",document.getElementById("owner-email").required=!1,document.getElementById("owner-password").required=!1;const I=document.getElementById("stores-list");I.innerHTML="",j.stores&&j.stores.length>0?j.stores.forEach(U=>{x(U)}):x(),document.getElementById("company-modal-title").innerText="Editar Cliente",document.getElementById("company-modal").classList.remove("hidden")}},window.toggleCompanyStatus=async(_,j)=>{const I=j==="active"?"inactive":"active",U=I==="inactive"?"desativar":"ativar";let F=`Deseja ${U} este cliente?`;if(I==="inactive"&&(F+=`

⚠️ ATENÇÃO: Todos os usuários (dono e funcionários) serão BLOQUEADOS de fazer login!`),await pe.warning(`${U.charAt(0).toUpperCase()+U.slice(1)} Cliente`,F))try{await T.update("companies",_,{status:I});const d=i.find(s=>s.id===_);d&&(d.status=I),v(),w.success(`Cliente ${I==="inactive"?"desativado":"ativado"} com sucesso!`)}catch(d){w.error("Erro ao atualizar status: "+d)}};const x=(_=null)=>{const j=document.getElementById("stores-list");if(!j)return;const I=document.createElement("div");I.className="store-row",_&&(I.dataset.id=_.id,I.dataset.active=_.active!==void 0?_.active:"true",I.dataset.freteAtivo=_.frete_ativo!==void 0?_.frete_ativo:"true",I.dataset.instanciaId=_.instancia_id||""),I.innerHTML=`
            <input type="text" placeholder="Nome da Loja" class="store-name" value="${_?.name||""}" required>
            <input type="text" placeholder="Endereço Completo" class="store-address" value="${_?.address||""}" required>
            <button type="button" class="btn-remove-store" title="Remover">✕</button>
        `,I.querySelector(".btn-remove-store").addEventListener("click",()=>{I.remove()}),j.appendChild(I)},M=`
        <div class="page-header">
            <h2 class="page-title">Gestão de Clientes</h2>
            <button id="btn-new-company" class="btn-primary"><i class="fa-solid fa-plus"></i> Novo Cliente</button>
        </div>

        <div class="card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Status</th>
                            <th>Módulos Ativos</th>
                            <th>Lojas</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${m()}
                    </tbody>
                </table>
            </div>
        </div>
        ${$}
    `;function N(_){const j=document.getElementById("company-modal"),I=document.getElementById("btn-new-company"),U=document.querySelector(".close-modal"),F=document.getElementById("create-company-form"),S=document.getElementById("btn-add-store"),d=document.getElementById("stores-list");e=new ha("modules-select-container",k,["atendimento"],s=>{const o=["atendimento","venda","agendamento"],l=s.find(r=>!f.includes(r));if(l==="venda_catalogo"){const r=s.filter(h=>h==="venda_catalogo"||h==="disparo");if(r.length!==s.length){e?.setValues(r),f=r;return}}else if(l&&(o.includes(l)||l==="disparo")){const r=s.filter(h=>h!=="venda_catalogo");if(o.includes(l)){const h=r.filter(y=>!o.includes(y)||y===l);if(h.length!==r.length||r.length!==s.length){e?.setValues(h),f=h;return}}if(r.length!==s.length){e?.setValues(r),f=r;return}}f=s},"Selecione os módulos..."),I&&j&&(I.onclick=()=>{document.getElementById("company-id").value="",document.getElementById("create-company-form").reset(),document.getElementById("owner-section").style.display="block",document.getElementById("owner-email").required=!0,document.getElementById("owner-password").required=!0,document.getElementById("company-modal-title").innerText="Novo Cliente",document.getElementById("owner-password").required=!0,document.getElementById("company-modal-title").innerText="Novo Cliente",e&&(e.setValues(["atendimento"]),f=["atendimento"]),d&&(d.innerHTML="",_()),j.classList.remove("hidden")}),U&&j&&(U.onclick=()=>j.classList.add("hidden")),S&&(S.onclick=()=>_()),F&&(F.onsubmit=async s=>{s.preventDefault();const o=document.getElementById("company-id").value,l=document.getElementById("company-name").value,r=document.getElementById("owner-email").value,h=document.getElementById("owner-password").value,y=parseInt(document.getElementById("company-instances-limit").value)||1,b=e?e.getValues():["atendimento"];if(b.includes("venda_catalogo")&&b.filter(D=>D!=="venda_catalogo"&&D!=="disparo").length>0){w.error('O módulo "Venda pelo Catálogo" só pode ser combinado com "Disparo em Massa".');return}const L=document.querySelectorAll(".store-row"),p=[];if(L.forEach((E,D)=>{const Q=E.querySelector(".store-name").value,a=E.querySelector(".store-address").value;if(Q&&a){const g=E.dataset.id,z=E.dataset.active!=="false",O=E.dataset.freteAtivo!=="false",X=E.dataset.instanciaId||null;p.push({id:g||`store_${Date.now()}_${D}`,name:Q,address:a,active:z,frete_ativo:O,instancia_id:X})}}),p.length===0){w.warning("É necessário cadastrar pelo menos 1 loja!");return}try{if(o){await T.update("companies",o,{name:l,stores:p,limite_instancias:y,modulos_ativos:b});const E=i.find(D=>D.id===o);E&&(E.name=l,E.stores=p,E.modulos_ativos=b),w.success("Cliente atualizado com sucesso!")}else{const E=await ce.registerUser(r,h),D=await T.create("companies",{name:l,stores:p,limite_instancias:y,status:"active",ownerId:E,modulos_ativos:b,metrics:{totalMessages:0,totalPayments:0}});await T.set("users",E,{uid:E,email:r,role:"owner",companyId:D}),i.push({id:D,name:l,stores:p,status:"active",ownerId:E,modulos_ativos:b,metrics:{totalMessages:0,totalPayments:0}}),w.success("Cliente criado com sucesso!")}j&&j.classList.add("hidden"),v()}catch(E){console.error(E),w.error("Erro: "+E)}})}return setTimeout(()=>{N(x)},100),M},Ra=async()=>{const i=ce.getCurrentUser();if(!i||!i.companyId)return"<p>Acesso negado.</p>";const f=await T.get("companies",i.companyId),k=f.limite_instancias||1;let m=await T.getAll("instancias",{field:"empresaId",operator:"==",value:i.companyId});setTimeout(async()=>{let S=!1;for(const d of m)try{const o=(await be.getInstanceStatus(d.nome)).connected?"conectado":"desconectado";o!==d.status&&(await T.update("instancias",d.id,{status:o}),d.status=o,S=!0)}catch(s){console.error("Error verifying status for",d.nome,s)}S&&_()},500);const v=()=>m.length===0?'<tr><td colspan="7" style="text-align:center">Nenhuma instância criada.</td></tr>':m.map(S=>`
            <tr>
                <td>${S.nome}</td>
                <td>${S.numero?S.numero.split("@")[0]:"-"}</td>
                <td>
                    <span class="badge ${x(S.status)}">
                        ${M(S.status)}
                    </span>
                </td>
                <td><span class="badge info">${f.stores?.find(d=>d.id===S.lojaId)?.name||"Global"}</span></td>
                <td><span class="badge secondary">${S.funcao||"Nenhuma"}</span></td>
                <td>${S.createdAt?.toDate?S.createdAt.toDate().toLocaleDateString():"N/A"}</td>
                <td>
                    <div class="actions">
                        ${S.status==="desconectado"?`<button class="action-btn" onclick="window.connectInstance('${S.nome}')" title="Conectar"><i style="color: #FFF;" class="fa-solid fa-qrcode"></i></button>`:""}
                        <button class="action-btn" onclick="window.shareQR('${S.nome}')" title="Compartilhar Link QR" style="background-color: #6366f1; border-color: #6366f1;"><i style="color: #FFF;" class="fa-solid fa-share-nodes"></i></button>
                        ${S.status==="conectado"?`<button class="action-btn" onclick="window.logoutInstance('${S.id}', '${S.nome}')" title="Desconectar" style="background-color: var(--warning); border-color: var(--warning);"><i style="color: #FFF;" class="fa-solid fa-right-from-bracket"></i></button>`:""}
                        <button class="action-btn" onclick="window.deleteInstance('${S.id}', '${S.nome}')" title="Excluir"><i style="color: #FFF;" class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join(""),x=S=>{switch(S){case"conectado":return"success";case"desconectado":return"danger";default:return"secondary"}},M=S=>{switch(S){case"conectado":return"Conectado";case"desconectado":return"Desconectado";default:return S}},N=`
        <div id="new-instance-modal" class="modal hidden">
            <div class="modal-content glass">
                <span class="close-modal" id="close-new-modal">&times;</span>
                <h2>Nova Instância</h2>
                <form id="create-instance-form">
                    <div class="form-group">
                        <label>Identificador da Instância (Uso Interno)</label>
                        <input type="text" id="instance-name" required placeholder="Ex: Matriz 01, Vendas Norte...">
                    </div>
                    <button type="submit" class="btn-primary full-width" style="margin-top: 1rem;">Criar e Gerar QR Code</button>
                </form>
            </div>
        </div>

        <div id="qrcode-modal" class="modal hidden">
            <div class="modal-content glass" style="text-align: center;">
                <span class="close-modal" id="close-qr-modal">&times;</span>
                <h2>Conectar WhatsApp</h2>
                <p>Escaneie o QR Code abaixo com o seu WhatsApp.</p>
                <div id="qrcode-container" style="margin: 20px auto; width: 250px; height: 250px; background: #eee; display: flex; align-items: center; justify-content: center;">
                    <i class="fa-solid fa-spinner fa-spin fa-2x"></i>
                </div>
                <button id="btn-done-qrcode" class="btn-primary full-width">Concluir</button>
            </div>
        </div>
    `,_=()=>{const S=document.querySelector(".data-table tbody");S&&(S.innerHTML=v())};let j=null,I=null;const U=()=>{j&&clearInterval(j),I&&clearInterval(I),j=null,I=null};window.refreshApp=()=>{window.location.reload()},window.shareQR=S=>{const d=`${window.location.origin}/qr/${S}`;navigator.clipboard.writeText(d),w.success("Link de conexão copiado para a área de transferência!")},window.deleteInstance=async(S,d)=>{if(await pe.danger("Excluir Instância",`Tem certeza que deseja excluir a instância "${d}"? Isso irá desconectar o WhatsApp.`))try{await be.deleteInstance(d),await T.delete("instancias",S),m=m.filter(o=>o.id!==S),_(),w.success("Instância excluída com sucesso.")}catch(o){w.error("Erro ao excluir instância: "+o)}},window.logoutInstance=async(S,d)=>{if(await pe.warning("Desconectar WhatsApp",`Deseja realmente desconectar o WhatsApp da instância "${d}"?`))try{if(w.info("Desconectando..."),await be.logoutInstance(d)){await T.update("instancias",S,{status:"desconectado"});const l=m.find(r=>r.id===S);l&&(l.status="desconectado"),_(),w.success("Desconectado com sucesso.")}else w.error("Não foi possível desconectar pela API. Verifique se a instância está ativa.")}catch(o){w.error("Erro ao desconectar: "+o)}},window.connectInstance=async S=>{const d=document.getElementById("qrcode-modal"),s=document.getElementById("qrcode-container");if(d&&s){d.classList.remove("hidden"),s.innerHTML='<i class="fa-solid fa-spinner fa-spin fa-2x"></i>';const o=async()=>{try{const h=await be.getQRCode(S);h&&h.base64?s.innerHTML=`<img src="${h.base64}" style="width: 100%; height: 100%; object-fit: contain;">`:(await be.getInstanceStatus(S)).connected?r():s.innerHTML="<p>Erro ao obter QR Code. Verifique se a instância está ativa.</p>"}catch(h){console.error("Error fetching QR:",h)}},l=async()=>{try{(await be.getInstanceStatus(S)).connected&&r()}catch(h){console.error("Error checking status:",h)}},r=async()=>{U(),w.success("WhatsApp conectado com sucesso!"),d.classList.add("hidden");const h=m.find(y=>y.nome===S);h&&(await T.update("instancias",h.id,{status:"conectado"}),h.status="conectado",_())};await o(),j=setInterval(o,4e4),I=setInterval(l,3e3)}},setTimeout(()=>{F(f.id,k)},100);function F(S,d){const s=document.getElementById("btn-new-instance"),o=document.getElementById("new-instance-modal"),l=document.getElementById("close-new-modal"),r=document.getElementById("create-instance-form"),h=document.getElementById("qrcode-modal"),y=document.getElementById("close-qr-modal"),b=document.getElementById("btn-done-qrcode");s&&(s.onclick=()=>{if(m.length>=d){w.error("Limite de instâncias atingido.");return}o?.classList.remove("hidden")}),l&&o&&(l.onclick=()=>o.classList.add("hidden")),r&&(r.onsubmit=async L=>{L.preventDefault();let E=document.getElementById("instance-name").value.trim();E=E.replace(/[^a-zA-Z0-9]/g,"_").toLowerCase();const D=`${E}_${S.substring(0,5)}`;try{if(await be.instanceExists(D)){w.warning("Já existe uma instância com esse nome. Tente outro.");return}w.info("Criando instância, aguarde..."),await be.createInstance(D);const a={empresaId:S,lojaId:null,nome:D,numero:null,status:"desconectado",funcao:null,webhookUrl:null,upsert:!1},g=await T.create("instancias",a);m.push({id:g,...a,createdAt:{toDate:()=>new Date}}),w.success("Instância criada! Agora vincule-a a uma loja nas configurações."),o?.classList.add("hidden"),_(),window.connectInstance(D)}catch(Q){w.error("Erro ao criar instância: "+Q)}}),y&&h&&(y.onclick=()=>{U(),h.classList.add("hidden")}),b&&h&&(b.onclick=async()=>{U(),h.classList.add("hidden"),window.location.reload()})}return`
        <div class="page-header">
            <h2 class="page-title">Gerenciar Instâncias</h2>
            <button id="btn-new-instance" class="btn-primary" ${m.length>=k?'disabled style="opacity: 0.5; cursor: not-allowed;"':""}>
                <i class="fa-solid fa-plus"></i> Nova Instância
            </button>
        </div>
        
        <div class="card">
            <div class="stats-row" style="margin-bottom: 20px; display: flex; gap: 20px;">
                <div class="stat-item">
                    <strong>Limite:</strong> ${k}
                </div>
                <div class="stat-item">
                    <strong>Utilizadas:</strong> ${m.length}
                </div>
            </div>

            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Identificador</th>
                            <th>Número</th>
                            <th>Status</th>
                            <th>Loja</th>
                            <th>Função</th>
                            <th>Criado Em</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${v()}
                    </tbody>
                </table>
            </div>
        </div>
        ${N}
    `},Ua=[{key:"{{nome_lead}}",label:"Nome do cliente",icon:"fa-user"},{key:"{{telefone_lead}}",label:"Telefone",icon:"fa-phone"},{key:"{{numero_pedido}}",label:"Nº do pedido",icon:"fa-hashtag"},{key:"{{lista_produtos}}",label:"Lista de produtos",icon:"fa-basket-shopping"},{key:"{{valor_total}}",label:"Valor total",icon:"fa-money-bill"},{key:"{{endereco_entrega}}",label:"Endereço de entrega",icon:"fa-location-dot"},{key:"{{forma_pagamento}}",label:"Forma de pagamento",icon:"fa-credit-card"}],Va=[{key:"pedido_aceito_entrega_pago",label:"Pedido aceito (Entrega pagamento adiantado)",icon:"fa-check-circle",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado (Pagamento Adiantado). 

📦 Itens: {{lista_produtos}}
💰 Total: R$ {{valor_total}}`},{key:"pedido_aceito_entrega_pendente",label:"Pedido aceito (Entrega pagamento na entrega)",icon:"fa-motorcycle",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado. O pagamento será feito na entrega. 

📦 Itens: {{lista_produtos}}
💰 Total: R$ {{valor_total}}`},{key:"pedido_aceito_retirada",label:"Pedido Aceito (Retirada)",icon:"fa-store",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito para retirada e já está sendo preparado. 

💰 Valor: R$ {{valor_total}}

Aguardamos você!`},{key:"pagamento_confirmado",label:"Pagamento Confirmado",icon:"fa-credit-card",default:"Olá {{nome_lead}}! 💳 Pagamento confirmado! Seu pedido #{{numero_pedido}} está sendo preparado."},{key:"pedido_pronto",label:"Pedido Pronto (Retirada)",icon:"fa-box",default:"Olá {{nome_lead}}! 📦 Seu pedido #{{numero_pedido}} já está pronto para retirada!"},{key:"saiu_para_entrega",label:"Saiu para Entrega",icon:"fa-truck",default:"🚚 Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} saiu para entrega no endereço: {{endereco_entrega}}"},{key:"pedido_entregue",label:"Pedido Entregue",icon:"fa-flag-checkered",default:"🏁 Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi entregue. Obrigado pela preferência!"},{key:"pedido_cancelado",label:"Pedido Cancelado",icon:"fa-xmark",default:"Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi cancelado."}],Wa=async()=>{const i=ce.getCurrentUser();if(!i||!i.companyId)return"<p>Acesso negado.</p>";const e=i.companyId,k=await T.getAll("instancias",{field:"empresaId",operator:"==",value:e}),$=await T.get("companies",e);let v=$?.stores||[];if(i.role!=="owner"){const o=i.storeIds||(i.storeId?[i.storeId]:[]);v=v.filter(l=>o.includes(l.id))}if(v.length===0)return'<p style="padding: 2rem;">Nenhuma loja encontrada para configuração.</p>';let x=v[0].id;const M=()=>`
        <div class="store-tabs" style="display:flex; gap:10px; margin-bottom: 20px; overflow-x:auto;">
            ${v.map(o=>`
                <button class="btn-store-tab ${o.id===x?"active":""}" data-id="${o.id}" style="
                    padding: 0.5rem 1rem;
                    background: ${o.id===x?"var(--primary)":"var(--surface-hover)"};
                    color: ${o.id===x?"#fff":"var(--text-main)"};
                    border: 1px solid ${o.id===x?"var(--primary)":"var(--border-color)"};
                    border-radius: 8px;
                    cursor: pointer;
                    white-space: nowrap;
                ">
                    <i class="fa-solid fa-store" style="margin-right:5px;"></i> ${o.name}
                </button>
            `).join("")}
        </div>
    `,N=()=>v.find(o=>o.id===x),_=await T.getAll("loja_config",{field:"empresaId",operator:"==",value:e}),j=o=>_.find(l=>l.lojaId===o)||null,I=()=>Ua.map(o=>`
        <div class="var-chip" draggable="true" data-var="${o.key}" title="Arraste para o campo de mensagem">
            <i class="fa-solid ${o.icon}"></i>
            <span>${o.label}</span>
            <code>${o.key}</code>
        </div>
    `).join("");return setTimeout(()=>{U(),F()},100),`
        <style>
            .config-section-title {
                font-size: 1.1rem;
                font-weight: 700;
                color: var(--text-main);
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 1.25rem;
                padding-bottom: 0.75rem;
                border-bottom: 1px solid var(--border-color);
            }
            .config-select {
                width: 100%;
                padding: 0.8rem 1rem;
                background-color: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                color: var(--text-main);
                font-size: 0.95rem;
                appearance: none;
                cursor: pointer;
            }
            .config-select:focus { outline: none; border-color: var(--primary); }
            /* ── Variables ── */
            .vars-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
                padding: 1rem;
                background: rgba(99,102,241,0.04);
                border: 1px dashed rgba(99,102,241,0.25);
                border-radius: var(--radius-md);
            }
            .var-chip {
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                padding: 0.35rem 0.75rem;
                background: rgba(99,102,241,0.12);
                border: 1px solid rgba(99,102,241,0.3);
                border-radius: 6px;
                font-size: 0.82rem;
                color: var(--primary);
                cursor: grab;
                user-select: none;
            }
            .var-chip code { font-size: 0.72rem; color: rgba(167,139,250,0.8); font-family: monospace; }
            /* ── Message editors ── */
            .msg-card {
                background: rgba(255,255,255,0.03);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                overflow: hidden;
                margin-bottom: 1rem;
            }
            .msg-card-header {
                display: flex;
                align-items: center;
                gap: 0.6rem;
                padding: 0.75rem 1rem;
                background: rgba(255,255,255,0.025);
                border-bottom: 1px solid var(--border-color);
                font-weight: 600;
                font-size: 0.9rem;
            }
            .msg-editor-wrap { padding: 1rem; }
            .msg-textarea {
                width: 100%;
                background: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-sm);
                color: var(--text-main);
                font-size: 0.9rem;
                padding: 0.75rem;
                resize: vertical;
                box-sizing: border-box;
            }
            .msg-textarea:focus { outline: none; border-color: var(--primary); }
            .msg-save-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 0.75rem;
            }
            .btn-save-msg {
                padding: 0.45rem 1rem;
                background: var(--primary);
                color: white;
                border: none;
                border-radius: var(--radius-sm);
                font-size: 0.85rem;
                font-weight: 600;
                cursor: pointer;
            }
            .btn-save-msg:hover { background: var(--primary-hover); }
            .btn-save-msg.saved { background: var(--success); pointer-events: none; }

            /* ── Opening Hours (Horários) ── */
            .horarios-grid {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                margin-top: 1rem;
            }
            .horario-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.75rem 1rem;
                background: rgba(255,255,255,0.02);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                transition: 0.2s;
            }
            .horario-row.inactive { opacity: 0.6; background: transparent; }
            .horario-info { display: flex; align-items: center; gap: 1rem; flex: 1; }
            .horario-label { font-weight: 600; min-width: 120px; }
            .horario-inputs { display: flex; align-items: center; gap: 0.5rem; transition: 0.3s; }
            .horario-inputs.hidden { display: none; }
            .time-input {
                background: var(--bg-color);
                border: 1px solid var(--border-color);
                color: white;
                padding: 0.4rem 0.6rem;
                border-radius: 6px;
                font-size: 0.85rem;
                outline: none;
            }
            .time-input:focus { border-color: var(--primary); }
            
            /* Switch Toggle */
            .switch {
                position: relative;
                display: inline-block;
                width: 40px;
                height: 20px;
            }
            .switch input { opacity: 0; width: 0; height: 0; }
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0; left: 0; right: 0; bottom: 0;
                background-color: #333;
                transition: .4s;
                border-radius: 20px;
            }
            .slider:before {
                position: absolute;
                content: "";
                height: 14px; width: 14px;
                left: 3px; bottom: 3px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            input:checked + .slider { background-color: var(--primary); }
            input:checked + .slider:before { transform: translateX(20px); }
        </style>

        <div class="page-header">
            <h2 class="page-title">Configuração por Loja</h2>
        </div>

        <div id="tabs-container">
            ${M()}
        </div>

        <div id="config-content-area"></div>
    `;function U(){const o=()=>{document.querySelectorAll(".btn-store-tab").forEach(l=>{l.addEventListener("click",()=>{x=l.dataset.id;const r=document.getElementById("tabs-container");r&&(r.innerHTML=M(),o()),F()})})};o()}function F(){const o=N();if(!o)return;const l=j(x),r=l?.mensagens_automaticas||{},h=l?.prompt_ia||o.prompt_ia||"",y=document.getElementById("config-content-area");if(!y)return;const b=()=>'<option value="">Nenhuma</option>'+k.map(p=>{const E=o.instancia_id===p.id,D=v.some(Q=>Q.id!==x&&Q.instancia_id===p.id);return`<option value="${p.id}" ${E?"selected":""} ${D?"disabled":""}>
                     ${p.nome} (${p.status}) ${D?"(Já vinculada a outra loja)":""}
                 </option>`}).join(""),L=()=>Va.map(p=>`
            <div class="msg-card" id="msg-card-${p.key}">
                <div class="msg-card-header">
                    <i class="fa-solid ${p.icon}" style="color:var(--primary);"></i>
                    <span>${p.label}</span>
                </div>
                <div class="msg-editor-wrap">
                    <textarea
                        id="msg-${p.key}"
                        class="msg-textarea"
                        rows="4"
                        placeholder="${p.default}"
                        data-msg-key="${p.key}"
                    >${r[p.key]||""}</textarea>
                    <div class="msg-save-row">
                        <span style="font-size:0.75rem;color:var(--text-dim);"><i class="fa-solid fa-circle-info"></i> Arraste as variáveis abaixo para dentro do texto</span>
                        <button class="btn-save-msg" data-msg-key="${p.key}">
                            <i class="fa-solid fa-floppy-disk"></i> Salvar
                        </button>
                    </div>
                </div>
            </div>
        `).join("");y.innerHTML=`
            <div class="card" style="margin-bottom: 1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-plug" style="color:var(--primary);"></i> Vinculação da Instância
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Selecione a instância de WhatsApp que responderá por esta loja. Se desconectada, a loja ficará inoperante.
                </p>
                <div style="display:flex; gap:10px; align-items:center;">
                    <select id="select-store-instance" class="config-select">
                        ${b()}
                    </select>
                </div>
                <div id="instance-status-indicator" style="margin-top: 10px;"></div>
            </div>

            <div class="card" style="margin-bottom: 1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-robot" style="color:var(--primary);"></i> Prompt da IA da Loja
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Configure o comportamento personalizado da IA (ex: tom de voz, regras da loja) para o atendimento.
                </p>
                <textarea id="prompt-ia" class="msg-textarea" rows="4" placeholder="Ex: Você é o assistente virtual da Loja X...">${h}</textarea>
                <div style="text-align:right; margin-top:10px;">
                    <button class="btn-save-msg" id="btn-save-prompt">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Prompt
                    </button>
                </div>
            </div>

            <div class="card" style="margin-bottom: 1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-clock" style="color:var(--primary);"></i> Horário de Funcionamento
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Defina os dias e horários em que a loja está aberta para receber pedidos.
                </p>
                <div class="horarios-grid">
                    ${[{key:"seg",label:"Segunda-feira"},{key:"ter",label:"Terça-feira"},{key:"qua",label:"Quarta-feira"},{key:"qui",label:"Quinta-feira"},{key:"sex",label:"Sexta-feira"},{key:"sab",label:"Sábado"},{key:"dom",label:"Domingo"}].map(p=>{const E=l?.horarios?.[p.key]||{active:!1,open:"08:00",close:"18:00"};return`
                        <div class="horario-row ${E.active?"":"inactive"}" id="row-${p.key}">
                            <div class="horario-info">
                                <label class="switch">
                                    <input type="checkbox" class="dia-toggle" data-dia="${p.key}" ${E.active?"checked":""}>
                                    <span class="slider"></span>
                                </label>
                                <span class="horario-label">${p.label}</span>
                            </div>
                            <div class="horario-inputs ${E.active?"":"hidden"}" id="inputs-${p.key}">
                                <input type="time" class="time-input" id="open-${p.key}" value="${E.open||"08:00"}">
                                <span style="color:var(--text-dim);font-size:0.8rem;">até</span>
                                <input type="time" class="time-input" id="close-${p.key}" value="${E.close||"18:00"}">
                            </div>
                            <div class="status-label" id="status-${p.key}" style="font-size: 0.8rem; color: ${E.active?"var(--success)":"var(--text-dim)"}; min-width: 60px; text-align: right;">
                                ${E.active?"Aberto":"Fechado"}
                            </div>
                        </div>
                    `}).join("")}
                </div>
                <div style="text-align:right; margin-top:1.5rem;">
                    <button class="btn-save-msg" id="btn-save-horarios">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Horários
                    </button>
                </div>
            </div>

            <div class="card" style="margin-bottom: 1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-truck" style="color:var(--primary);"></i> Horário de Entrega
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Defina especificamente em quais horários a loja realiza entregas.
                </p>
                <div class="horarios-grid">
                    ${[{key:"seg",label:"Segunda-feira"},{key:"ter",label:"Terça-feira"},{key:"qua",label:"Quarta-feira"},{key:"qui",label:"Quinta-feira"},{key:"sex",label:"Sexta-feira"},{key:"sab",label:"Sábado"},{key:"dom",label:"Domingo"}].map(p=>{const E=l?.horarios_entrega?.[p.key]||{active:!1,open:"08:00",close:"22:00"};return`
                        <div class="horario-row ${E.active?"":"inactive"}" id="row-entrega-${p.key}">
                            <div class="horario-info">
                                <label class="switch">
                                    <input type="checkbox" class="dia-toggle-entrega" data-dia="${p.key}" ${E.active?"checked":""}>
                                    <span class="slider"></span>
                                </label>
                                <span class="horario-label">${p.label}</span>
                            </div>
                            <div class="horario-inputs ${E.active?"":"hidden"}" id="inputs-entrega-${p.key}">
                                <input type="time" class="time-input" id="open-entrega-${p.key}" value="${E.open||"08:00"}">
                                <span style="color:var(--text-dim);font-size:0.8rem;">até</span>
                                <input type="time" class="time-input" id="close-entrega-${p.key}" value="${E.close||"22:00"}">
                            </div>
                            <div class="status-label" id="status-entrega-${p.key}" style="font-size: 0.8rem; color: ${E.active?"var(--success)":"var(--text-dim)"}; min-width: 60px; text-align: right;">
                                ${E.active?"Disponível":"Indisponível"}
                            </div>
                        </div>
                    `}).join("")}
                </div>
                <div style="text-align:right; margin-top:1.5rem;">
                    <button class="btn-save-msg" id="btn-save-horarios-entrega">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega
                    </button>
                </div>
            </div>

            <div class="card">
                <div class="config-section-title">
                    <i class="fa-solid fa-message" style="color:var(--primary);"></i> Mensagens Automáticas
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.25rem;">
                    Personalize as mensagens enviadas automaticamente ao cliente em cada etapa do pedido.
                </p>
                <div style="margin-bottom:1rem;">
                    <div class="vars-grid" id="vars-grid">
                        ${I()}
                    </div>
                </div>
                <div id="msg-editors">
                    ${L()}
                </div>
            </div>

            <div class="card" style="margin-top: 1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-store" style="color:var(--primary);"></i> Configurações do Catálogo
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.25rem;">
                    Personalize a aparência e os dados de contato do seu catálogo público.
                </p>
                
                <div class="field" style="margin-bottom: 20px;">
                    <label style="font-size:0.8rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; display:block;">WhatsApp de Atendimento (Com DDD)</label>
                    <input type="text" id="catalog-whatsapp" value="${l?.design?.whatsapp||""}" class="time-input" style="width:100%;" placeholder="Ex: 5511999999999">
                    <p style="font-size:0.75rem; color:var(--text-dim); margin-top:5px;">Este número será usado no botão flutuante do catálogo.</p>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px;">
                    <div class="field">
                        <label style="font-size:0.8rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; display:block;">Cor Primária</label>
                        <div style="display:flex; gap:10px; align-items:center;">
                            <input type="color" id="primary-color" value="${l?.design?.primaryColor||"#6366f1"}" style="width:50px; height:40px; border:none; background:none; cursor:pointer;">
                            <input type="text" id="primary-color-hex" value="${l?.design?.primaryColor||"#6366f1"}" class="time-input" style="flex:1;">
                        </div>
                    </div>
                    <div class="field">
                        <label style="font-size:0.8rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; display:block;">Cor Secundária (Fundo)</label>
                        <div style="display:flex; gap:10px; align-items:center;">
                            <input type="color" id="secondary-color" value="${l?.design?.secondaryColor||"#0f172a"}" style="width:50px; height:40px; border:none; background:none; cursor:pointer;">
                            <input type="text" id="secondary-color-hex" value="${l?.design?.secondaryColor||"#0f172a"}" class="time-input" style="flex:1;">
                        </div>
                    </div>
                </div>

                <div class="field" style="margin-bottom: 20px;">
                    <label style="font-size:0.8rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; display:block;">Logo do Catálogo</label>
                    <div style="display:flex; align-items:center; gap:20px;">
                        <div id="logo-preview" style="width:80px; height:80px; border-radius:12px; border:1px solid var(--border-color); display:flex; align-items:center; justify-content:center; background:var(--surface-hover); overflow:hidden;">
                            ${l?.design?.logoUrl?`<img src="${l.design.logoUrl}" style="width:100%; height:100%; object-fit:contain;">`:'<i class="fa-solid fa-image fa-2x" style="color:var(--text-dim);"></i>'}
                        </div>
                        <div style="flex:1;">
                            <input type="file" id="logo-upload" accept="image/*" style="display:none;">
                            <button class="btn-secondary" onclick="document.getElementById('logo-upload').click()">
                                <i class="fa-solid fa-upload"></i> Escolher Logo
                            </button>
                            <p style="font-size:0.75rem; color:var(--text-dim); margin-top:5px;">Tamanho recomendado: 200x200px (PNG ou SVG transparente)</p>
                        </div>
                    </div>
                </div>

                <div style="text-align:right;">
                    <button class="btn-save-msg" id="btn-save-design">
                         <i class="fa-solid fa-floppy-disk"></i> Salvar Configurações
                    </button>
                </div>
            </div>
        `,setTimeout(()=>{S(),d(),s()},50)}async function S(){const o=document.getElementById("instance-status-indicator");if(!o)return;const l=N();if(!l||!l.instancia_id){o.innerHTML='<span class="badge danger"><i class="fa-solid fa-circle-xmark"></i> Nenhuma instância</span>';return}const r=k.find(h=>h.id===l.instancia_id);if(r)try{(await be.getInstanceStatus(r.nome)).connected?o.innerHTML='<span class="badge success"><i class="fa-solid fa-circle-check"></i> Instância Online</span>':(o.innerHTML='<span class="badge danger"><i class="fa-solid fa-triangle-exclamation"></i> Instância Desconectada</span>',r.status==="conectado"&&(await T.update("instancias",r.id,{status:"desconectado"}),r.status="desconectado"))}catch{o.innerHTML='<span class="badge warning">Verificando...</span>'}}function d(){const o=document.getElementById("select-store-instance");o?.addEventListener("change",async()=>{const y=o.value,b=N()?.instancia_id,L=v.map(p=>p.id===x?{...p,instancia_id:y||null}:p);try{w.info("Salvando configuração..."),await T.update("companies",e,{stores:L}),v=L;const p=N();if(p&&(p.instancia_id=y),y){const E=k.find(D=>D.id===y);if(E){const D=$.modulos_ativos||["atendimento"];let Q="atendimento";D.includes("venda")?Q="venda":D.includes("agendamento")?Q="agendamento":D.includes("atendimento")?Q="atendimento":D.includes("disparo")&&(Q="disparo");const a=await T.get("settings","webhooks"),g=a?a[Q]:null;w.info(`Vinculando instância e configurando webhook (${Q})...`),await T.update("instancias",E.id,{lojaId:x,funcao:Q,webhookUrl:g||null}),g&&(await be.setWebhook(E.nome,g)?w.success("Webhook configurado com sucesso!"):w.warning("Configuração salva, mas houve uma falha ao ativar o webhook na API."))}}else if(b){const E=k.find(D=>D.id===b);E&&(w.info("Desvinculando instância e desativando webhook..."),await be.setWebhook(E.nome,"",!1),await T.update("instancias",E.id,{lojaId:null,funcao:null,webhookUrl:null}))}S(),w.success("Vínculo de instância atualizado com sucesso!")}catch(p){w.error("Erro ao atualizar vínculo: "+p),F()}});const l=document.getElementById("btn-save-prompt");l?.addEventListener("click",async()=>{const y=document.getElementById("prompt-ia").value.trim();try{l&&(l.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...');const b=j(x);if(b)await T.update("loja_config",b.id,{prompt_ia:y}),b.prompt_ia=y;else{const p=await T.create("loja_config",{empresaId:e,lojaId:x,prompt_ia:y});_.push({id:p,empresaId:e,lojaId:x,prompt_ia:y})}const L=v.map(p=>p.id===x?{...p,prompt_ia:y}:p);await T.update("companies",e,{stores:L}),v=L,w.success("Prompt salvo com sucesso!"),l&&(l.innerHTML='<i class="fa-solid fa-check"></i> Salvo!'),setTimeout(()=>{l&&(l.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Prompt')},2e3)}catch{w.error("Erro ao salvar prompt."),l&&(l.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Prompt')}}),document.querySelectorAll(".dia-toggle").forEach(y=>{y.addEventListener("change",()=>{const b=y.dataset.dia,L=y.checked,p=document.getElementById(`row-${b}`),E=document.getElementById(`inputs-${b}`),D=document.getElementById(`status-${b}`);L?(p?.classList.remove("inactive"),E?.classList.remove("hidden"),D&&(D.innerText="Aberto",D.style.color="var(--success)")):(p?.classList.add("inactive"),E?.classList.add("hidden"),D&&(D.innerText="Fechado",D.style.color="var(--text-dim)"))})});const r=document.getElementById("btn-save-horarios");r?.addEventListener("click",async()=>{try{r.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';const y={};["seg","ter","qua","qui","sex","sab","dom"].forEach(L=>{const p=document.querySelector(`.dia-toggle[data-dia="${L}"]`).checked,E=document.getElementById(`open-${L}`).value,D=document.getElementById(`close-${L}`).value;y[L]={active:p,open:E,close:D}});const b=j(x);if(b)await T.update("loja_config",b.id,{horarios:y}),b.horarios=y;else{const L=await T.create("loja_config",{empresaId:e,lojaId:x,horarios:y});_.push({id:L,empresaId:e,lojaId:x,horarios:y})}w.success("Horários de funcionamento salvos!"),r.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{r.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários'},2e3)}catch{w.error("Erro ao salvar horários."),r.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários'}}),document.querySelectorAll(".dia-toggle-entrega").forEach(y=>{y.addEventListener("change",()=>{const b=y.dataset.dia,L=y.checked,p=document.getElementById(`row-entrega-${b}`),E=document.getElementById(`inputs-entrega-${b}`),D=document.getElementById(`status-entrega-${b}`);L?(p?.classList.remove("inactive"),E?.classList.remove("hidden"),D&&(D.innerText="Disponível",D.style.color="var(--success)")):(p?.classList.add("inactive"),E?.classList.add("hidden"),D&&(D.innerText="Indisponível",D.style.color="var(--text-dim)"))})});const h=document.getElementById("btn-save-horarios-entrega");h?.addEventListener("click",async()=>{try{h.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';const y={};["seg","ter","qua","qui","sex","sab","dom"].forEach(L=>{const p=document.querySelector(`.dia-toggle-entrega[data-dia="${L}"]`).checked,E=document.getElementById(`open-entrega-${L}`).value,D=document.getElementById(`close-entrega-${L}`).value;y[L]={active:p,open:E,close:D}});const b=j(x);if(b)await T.update("loja_config",b.id,{horarios_entrega:y}),b.horarios_entrega=y;else{const L=await T.create("loja_config",{empresaId:e,lojaId:x,horarios_entrega:y});_.push({id:L,empresaId:e,lojaId:x,horarios_entrega:y})}w.success("Horários de entrega salvos!"),h.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{h.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega'},2e3)}catch{w.error("Erro ao salvar horários de entrega."),h.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega'}}),document.querySelectorAll(".var-chip").forEach(y=>{y.addEventListener("dragstart",b=>{b.dataTransfer.setData("text/plain",y.dataset.var||"")})}),document.querySelectorAll(".msg-textarea").forEach(y=>{y.addEventListener("dragover",b=>b.preventDefault()),y.addEventListener("drop",b=>{b.preventDefault();const L=b.dataTransfer.getData("text/plain");if(!L)return;const p=y.selectionStart??y.value.length,E=y.selectionEnd??y.value.length;y.value=y.value.slice(0,p)+L+y.value.slice(E)})}),document.querySelectorAll(".btn-save-msg").forEach(y=>{y.id!=="btn-save-prompt"&&y.addEventListener("click",async()=>{const b=y.dataset.msgKey,L=document.getElementById(`msg-${b}`).value.trim();y.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const p=j(x);if(p){const E={[`mensagens_automaticas.${b}`]:L||null};await T.update("loja_config",p.id,E),p.mensagens_automaticas||(p.mensagens_automaticas={}),p.mensagens_automaticas[b]=L||void 0}else{const E=await T.create("loja_config",{empresaId:e,lojaId:x,mensagens_automaticas:{[b]:L||null}});_.push({id:E,empresaId:e,lojaId:x,mensagens_automaticas:{[b]:L||void 0}})}w.success("Mensagem salva com sucesso!"),y.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{y.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar'},2e3)}catch{w.error("Erro ao salvar mensagem."),y.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar'}})})}function s(){const o=document.getElementById("primary-color"),l=document.getElementById("primary-color-hex"),r=document.getElementById("secondary-color"),h=document.getElementById("secondary-color-hex"),y=document.getElementById("logo-upload"),b=document.getElementById("btn-save-design");o?.addEventListener("input",()=>l.value=o.value),l?.addEventListener("change",()=>o.value=l.value),r?.addEventListener("input",()=>h.value=r.value),h?.addEventListener("change",()=>r.value=h.value);let L=null;y?.addEventListener("change",()=>{if(y.files&&y.files[0]){L=y.files[0];const p=new FileReader;p.onload=E=>{const D=document.getElementById("logo-preview");D&&(D.innerHTML=`<img src="${E.target?.result}" style="width:100%; height:100%; object-fit:contain;">`)},p.readAsDataURL(L)}}),b?.addEventListener("click",async()=>{try{b.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';let p=j(x)?.design?.logoUrl||"";if(L){const Q=Ae(Se,`logos/${e}/${x}_${Date.now()}`);await Ne(Q,L),p=await Pe(Q)}const E={primaryColor:l.value,secondaryColor:h.value,logoUrl:p,whatsapp:document.getElementById("catalog-whatsapp").value.replace(/\D/g,"")},D=j(x);if(D)await T.update("loja_config",D.id,{design:E}),D.design=E;else{const Q=await T.create("loja_config",{empresaId:e,lojaId:x,design:E});_.push({id:Q,empresaId:e,lojaId:x,design:E})}w.success("Configurações do catálogo atualizadas!"),b.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{b.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Configurações'},2e3)}catch(p){console.error("Save design error:",p),w.error("Erro ao salvar design."),b.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Visual'}})}};class Qa{newOrderSound;paymentSound;humanSupportSound;notifiedSupportIds=new Set;notifiedNewOrderIds=new Set;isInitialLoad=!0;listenerStartTime=0;isLeadsInitialLoad=!0;unsubscribe=null;unsubscribeLeads=null;constructor(){this.newOrderSound=new Audio("/sounds/new-order.mp3"),this.paymentSound=new Audio("/sounds/payment-confirmed.mp3"),this.humanSupportSound=new Audio("/sounds/success.mp3"),this.newOrderSound.volume=.5,this.paymentSound.volume=.5,this.humanSupportSound.volume=.6}getCreatedMs(e){const f=e?.criadoEm??e?.createdAt;if(!f)return null;try{if(typeof f?.toDate=="function")return f.toDate().getTime();if(f instanceof Date)return f.getTime();const k=new Date(f).getTime();return isNaN(k)?null:k}catch{return null}}formatCustomerName(e){const f=e.nome||e.leadName||e.customerName||"";if(f&&f.length>2)return f;const k=e.leadId||e.telefone||"";if(k){const m=k.split("@")[0];return/^\d+$/.test(m)&&m.length>=10?`Cliente (${m.slice(-8)})`:m||"Cliente"}return"Cliente"}showHumanSupportAlert(e){this.humanSupportSound.currentTime=0,this.humanSupportSound.play().catch(()=>{});const f=document.createElement("div");f.className="order-modal",f.id=`support-modal-${e.id}`;const k=this.formatCustomerName(e);f.innerHTML=`
            <div class="order-modal-content" style="border-top: 5px solid var(--warning); position: relative;">
                <button id="close-support-x" style="position: absolute; right: 1rem; top: 1rem; background: transparent; border: none; color: var(--text-dim); font-size: 1.5rem; cursor: pointer; transition: color 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='var(--text-dim)'">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="order-header">
                    <div class="order-icon" style="background: rgba(245, 158, 11, 0.15); color: var(--warning);">👤</div>
                    <h2>Atendimento Humano!</h2>
                </div>
                
                <div class="order-body">
                    <p style="text-align: center; margin-bottom: 1.5rem; color: var(--text-main);">
                        O lead <strong>${k}</strong> está aguardando contato humano.
                    </p>
                    <div class="order-field">
                        <label>Número do Lead:</label>
                        <span>${(e.telefone||e.leadId||"").split("@")[0]||"Não informado"}</span>
                    </div>
                </div>
                
                <div class="order-actions">
                    <button class="btn-accept full-width" id="close-support" style="background: var(--warning);">Entendido</button>
                </div>
            </div>
        `,document.body.appendChild(f),f.querySelector("#close-support")?.addEventListener("click",()=>{f.remove()}),f.querySelector("#close-support-x")?.addEventListener("click",()=>{f.remove()})}async showNewOrder(e){const f=e.source==="catalog"||!!e.taxaNome;Array.isArray(e.itens)||(Array.isArray(e.items)?e.itens=e.items.map(s=>({item:s.name||s.item||"",quantidade:s.qty||s.quantidade||1,preco:s.price||s.preco||0,subtotal:s.subtotal||0})):e.itens=[]);const k=e.empresaId||ce.getCurrentUser()?.companyId;if(k&&Array.isArray(e.itens)&&!f)try{const s=await T.getAll("products",{field:"companyId",operator:"==",value:k});let o=!1;if(e.itens.forEach(l=>{const r=(l.item||"").toLowerCase().trim(),h=s.find(y=>(y.name||"").toLowerCase().trim()===r);if(h){const y=h.promotionalActive&&h.promotionalPrice||h.price;(!l.preco||l.preco===0)&&(l.preco=y,o=!0)}}),o){let l=0;e.itens.forEach(h=>{const y=parseFloat(h.preco)||0,b=parseInt(h.quantidade)||1;l+=b*y});const r=parseFloat(e.taxaAplicada||e.taxaEntrega||0);e.value=l+r}}catch(s){console.error("Error syncing prices with catalog:",s)}this.newOrderSound.play().catch(()=>{});const m=document.createElement("div");m.className="order-modal",m.id=`modal-${e.id}`;const $=Array.isArray(e.itens)&&e.itens.length>0?e.itens.map((s,o)=>`
                <div class="order-item-row" style="display:flex; justify-content:space-between; align-items:center; padding: 0.6rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <span style="flex:1; font-weight:500;">${s.quantidade}x ${s.item}</span>
                    <div style="display:flex;align-items:center;gap:0.5rem; flex-shrink:0;">
                        <span style="color:var(--text-dim);font-size:0.75rem;">R$</span>
                        ${f?`<span style="font-family:monospace;font-size:0.9rem;min-width:90px;text-align:right;padding:0.4rem 0.6rem;">${Number(s.preco||0).toFixed(2)}</span>`:`<input type="number" class="notif-item-price-input" data-index="${o}" value="${s.preco||0}" step="0.01" style="width:90px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.4rem 0.6rem;border-radius:6px;text-align:right;font-size:0.9rem; font-family: monospace; outline:none;">`}
                    </div>
                </div>
            `).join(""):'<p style="color:var(--text-muted); padding: 1rem; text-align:center;">Sem itens listados.</p>',v=e.taxaAplicada||e.taxaEntrega||0,M=`
            <div class="order-item-row" style="margin-top:0.5rem; padding: 0.8rem 0; display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; flex-direction:column;">
                    <span style="font-size:0.85rem; font-weight:600;">${e.entrega==="retirada"?"Taxa":"Taxa de Entrega"}</span>
                    <small style="font-size:0.7rem; color:var(--text-dim);">Entrega / Frete</small>
                </div>
                <div style="display:flex;align-items:center;gap:0.5rem; flex-shrink:0;">
                    <span style="color:var(--text-dim);font-size:0.75rem;">R$</span>
                    ${f?`
                        <span style="font-family:monospace;font-size:0.9rem;min-width:90px;text-align:right;padding:0.4rem 0.6rem; color: var(--primary); font-weight: 700;">${Number(v||0).toFixed(2)}</span>
                    `:`
                        <input type="number" id="notif-taxa-entrega" value="${v||0}"
                            step="0.01" style="width:90px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.4rem 0.6rem;border-radius:6px;text-align:right;font-size:0.9rem; font-family: monospace; outline:none;">
                    `}
                </div>
            </div>
        `;m.innerHTML=`
            <div class="order-modal-content" style="max-width: 520px; padding: 1.5rem; position: relative;">
                <button id="close-modal-x" style="position: absolute; right: 1.5rem; top: 1.5rem; background: transparent; border: none; color: var(--text-dim); font-size: 1.5rem; cursor: pointer; transition: color 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='var(--text-dim)'">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="order-header" style="margin-bottom: 1.25rem; padding-right: 2rem;">
                    <div class="order-icon" style="width: 44px; height: 44px; font-size: 1.25rem; background: var(--primary-glow); color: var(--primary);">
                        <i class="fa-solid fa-bell"></i>
                    </div>
                    <div>
                        <h2 style="margin:0; font-size: 1.25rem;">Novo Pedido Recebido!</h2>
                        <p style="margin:0; font-size: 0.85rem; color: var(--text-dim);">#${e.id.slice(-6).toUpperCase()}</p>
                    </div>
                </div>
                
                <div class="order-body" style="gap: 1.25rem; display: flex; flex-direction: column;">
                    <!-- Customer and Delivery Info -->
                    ${f?`
                    <div style="padding: 1rem; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 0.75rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Cliente</label>
                            <span style="font-weight: 600; color: var(--text-main);">${e.customerName}</span>
                        </div>
                        <div style="height: 1px; background: var(--border-color); width: 100%;"></div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Modo de Envio</label>
                            <span style="font-size: 0.85rem; color: var(--text-muted); text-align: right; max-width: 60%;">
                                ${e.entrega==="retirada"?'<i class="fa-solid fa-store"></i> Retirada':'<i class="fa-solid fa-truck"></i> Entrega'}
                            </span>
                        </div>
                        ${e.entrega!=="retirada"?`
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Endereço</label>
                            <span style="font-size: 0.85rem; color: var(--text-muted); text-align: right; max-width: 60%;">${e.endereco||"Não informado"}</span>
                        </div>
                        ${(()=>{const s=e.bairro||(e.taxaNome?.includes("(")?e.taxaNome.split("(")[1].split(")")[0]:"");return s?`
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Bairro</label>
                            <span style="font-size: 0.85rem; color: var(--text-main); font-weight: 600; text-align: right;">${s}</span>
                        </div>`:""})()}
                        `:""}
                        <div style="height: 1px; background: var(--border-color); width: 100%;"></div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Pagamento</label>
                            <span style="font-size: 0.85rem; color: var(--text-main); font-weight: 600;">
                                ${e.pagamento==="na_entrega"||e.paymentMethod==="na_entrega"?"🤝 Na Entrega":"⚡ PIX"}
                            </span>
                        </div>
                    </div>`:`
                    <div style="padding: 1rem; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 0.75rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Cliente</label>
                            <span style="font-weight: 600; color: var(--text-main);">${e.customerName}</span>
                        </div>
                        <div style="height: 1px; background: var(--border-color); width: 100%;"></div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Entrega</label>
                            <span style="font-size: 0.85rem; color: var(--text-muted); text-align: right; max-width: 60%;">${e.endereco||"Retirada"}</span>
                        </div>
                    </div>`}
                    
                    <!-- Items Section -->
                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                        <h4 style="font-size: 0.75rem; color: var(--text-dim); font-weight:700; text-transform: uppercase; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fa-solid fa-list-check" style="color: var(--primary); font-size: 0.9rem;"></i>
                            Conferência de Itens e Valores
                        </h4>
                        
                        <div style="background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid var(--border-color); overflow: hidden;">
                            <div style="max-height: 220px; overflow-y: auto; padding: 0 1rem;">
                                ${$}
                            </div>
                            
                            <!-- Total and Extras -->
                            <div style="background: rgba(255,255,255,0.03); border-top: 1px solid var(--border-color); padding: 1rem;">
                                ${M}
                                
                                <div style="display:flex; justify-content:space-between; margin-top:0.75rem; padding-top:0.75rem; border-top: 1px dashed var(--border-color); align-items: center;">
                                    <span style="font-weight:700; font-size: 1rem; color: var(--text-main);">Total do Pedido</span>
                                    <span id="notif-order-total" style="font-weight:800; color:var(--primary); font-size:1.4rem; letter-spacing: -0.02em;">R$ ${(e.value||e.total||0).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="reject-reason-container" style="display: none; margin-top: 0.5rem; animation: slideDown 0.3s ease;">
                        <label style="display: block; margin-bottom: 0.5rem; color: var(--danger); font-weight: 700; font-size: 0.8rem; text-transform: uppercase;">Motivo da Recusa *</label>
                        <textarea id="reject-reason" placeholder="Descreva por que o pedido foi recusado..." 
                                  style="width: 100%; border-radius: 10px; border: 1px solid var(--danger); padding: 0.8rem; background: rgba(239, 68, 68, 0.05); color: white; resize: vertical; min-height: 80px; font-size: 0.9rem; outline: none;"></textarea>
                    </div>
                </div>
                
                <div class="order-actions" style="margin-top: 1.5rem; gap: 0.75rem;">
                    <button class="btn-reject" id="reject-order" style="flex:1; height: 48px; border-radius: 10px; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); color: var(--danger);">
                        <i class="fa fa-times"></i> Recusar
                    </button>
                    <button class="btn-reject hidden" id="confirm-reject" style="flex:1; height: 48px; border-radius: 10px; background: var(--danger); color: white;">
                        <i class="fa fa-check"></i> Confirmar Recusa
                    </button>
                    <button class="btn-accept" id="accept-order" style="flex:2; height: 48px; border-radius: 10px; background: var(--primary); color: white; font-weight: 700; box-shadow: 0 4px 15px var(--primary-glow);">
                        <i class="fa fa-check"></i> Aceitar Pedido
                    </button>
                </div>
            </div>
        `,document.body.appendChild(m);const N=s=>{const o=parseFloat(s);return isNaN(o)?0:o},_=()=>{let s=0;f?(e.itens||[]).forEach(r=>{s+=(r.quantidade||1)*(r.preco||0)}):document.querySelectorAll(".notif-item-price-input").forEach(r=>{const h=parseInt(r.dataset.index),y=(e.itens||[])[h]?.quantidade||1;s+=y*N(r.value)});const o=f?e.taxaAplicada||0:N(document.getElementById("notif-taxa-entrega")?.value);s+=o;const l=document.getElementById("notif-order-total");l&&(l.innerText=`R$ ${s.toFixed(2)}`)};document.querySelectorAll(".notif-item-price-input").forEach(s=>{s.addEventListener("input",_)}),document.getElementById("notif-taxa-entrega")?.addEventListener("input",_);const j=m.querySelector("#accept-order"),I=m.querySelector("#reject-order"),U=m.querySelector("#confirm-reject"),F=m.querySelector("#reject-reason-container"),S=m.querySelector("#reject-reason");m.querySelector("#close-modal-x")?.addEventListener("click",()=>{m.remove()}),j?.addEventListener("click",async()=>{const s=ce.getCurrentUser(),o=e.empresaId||s?.companyId;if(!o){w.error("Empresa não identificada.");return}j.disabled=!0,j.textContent="⌛ Processando...";try{let l=0,r=Array.isArray(e.itens)?[...e.itens]:[];const h=Q=>{const a=parseFloat(Q);return isNaN(a)?0:a};f?r.forEach(Q=>{l+=(Q.quantidade||1)*(Q.preco||0)}):document.querySelectorAll(".notif-item-price-input").forEach(Q=>{const a=parseInt(Q.dataset.index),g=r[a]?.quantidade||1,z=h(Q.value);r[a]&&(r[a].preco=z),l+=g*z});const y=f?e.taxaAplicada||0:parseFloat(document.getElementById("notif-taxa-entrega")?.value)||0;l+=y;const b={value:l,total:l,itens:r,taxaAplicada:y,taxaEntrega:y},L=e.entrega==="retirada",p=e.pagamento||e.formaPagamento||e.paymentMethod||"",E=p.includes("entrega")||p.includes("dinheiro")||p.includes("maquininha")||p==="na_entrega";let D=L&&E?"em_preparo":"aguardando_pagamento";f&&E&&(D="em_preparo"),await Le.updateOrderStatus(e,o,D,void 0,b),w.success("Pedido aceito!"),m.remove()}catch(l){w.error("Erro ao aceitar pedido: "+l),j.disabled=!1,j.innerHTML='<i class="fa fa-check"></i> Aceitar'}}),I?.addEventListener("click",()=>{I.classList.add("hidden"),j.classList.add("hidden"),U.classList.remove("hidden"),F.style.display="block",S.focus()}),U?.addEventListener("click",async()=>{const s=S.value.trim();if(!s){w.warning("Informe o motivo da recusa."),S.style.borderColor="red";return}const o=ce.getCurrentUser(),l=e.empresaId||o?.companyId;if(!l){w.error("Empresa não identificada.");return}U.disabled=!0,U.textContent="⌛ Processando...";try{await Le.updateOrderStatus(e,l,"cancelado",s),w.success("Pedido recusado e cliente notificado."),m.remove()}catch(r){w.error("Erro ao recusar pedido: "+r),U.disabled=!1,U.textContent="Confirmar Recusa"}})}showPaymentConfirmed(){this.paymentSound.play().catch(()=>{});const e=document.createElement("div");e.className="order-modal",e.innerHTML=`
            <div class="order-modal-content payment-confirmed">
                <div class="order-header">
                    <div class="order-icon success"><i class="fa fa-check"></i></div>
                    <h2>Pagamento Confirmado!</h2>
                </div>
                
                <div class="order-body">
                    <p style="text-align: center; color: var(--text-muted);">
                        O pagamento foi processado com sucesso.<br>
                        Pedido enviado para produção.
                    </p>
                </div>
                
                <div class="order-actions">
                    <button class="btn-accept full-width" id="close-payment">OK</button>
                </div>
            </div>
        `,document.body.appendChild(e),e.querySelector("#close-payment")?.addEventListener("click",()=>{e.remove()}),setTimeout(()=>{e.parentNode&&e.remove()},3e3)}orderStatusMap=new Map;setupLeadsListener(e){const f=We(Qe,"leads"),k=$=>{if($.type!=="modified"&&$.type!=="added")return;const v=$.doc.data(),x=$.doc.id,M="lead_"+x,N=(v.statusAtendimento||"").toLowerCase(),_=(v.estado||"").toLowerCase(),j=N==="atendimento_humano"||N==="em_atendimento_humano"||_==="atendimento_humano";if(this.isLeadsInitialLoad){j&&this.notifiedSupportIds.add(M);return}if(j&&!this.notifiedSupportIds.has(M)){if(window.location.pathname.includes("/catalog/")||window.location.pathname.includes("/qr/"))return;const I=ce.getCurrentUser();if(I&&I.role!=="owner"&&I.role!=="admin"){const U=I.storeIds||(I.storeId?[I.storeId]:[]);if(console.log("OrderNotification - Checking Lead Store isolation:",{userStoreIds:U,leadLojaId:v.lojaId}),U.length>0&&v.lojaId&&!U.includes(v.lojaId))return}this.showHumanSupportAlert({...v,id:x,leadId:v.telefone||x,customerName:this.formatCustomerName(v)}),this.notifiedSupportIds.add(M)}else!j&&this.notifiedSupportIds.has(M)&&this.notifiedSupportIds.delete(M)},m=Ge(f,He("empresaId","==",e),He("statusAtendimento","in",["atendimento_humano","em_atendimento_humano"]));this.unsubscribeLeads=Xe(m,$=>{$.docChanges().forEach(k),this.isLeadsInitialLoad&&(this.isLeadsInitialLoad=!1)}),setTimeout(()=>{this.isLeadsInitialLoad&&(this.isLeadsInitialLoad=!1)},3e3)}startListening(){if(this.unsubscribe)return;this.listenerStartTime=Date.now();const e=ce.getCurrentUser();if(!e||!e.companyId)return;if(!["admin","owner","employee","staff"].includes(e.role||"")){console.log("OrderNotification - Unauthorized role for notifications:",e.role);return}const k=e.companyId,m=We(Qe,"pedidos"),$=Ge(m,He("empresaId","==",k),Ca("criadoEm","desc"),Ia(50));this.unsubscribe=Xe($,v=>{v.docChanges().forEach(x=>{const M=x.doc.data(),N=(M.status||"em_montagem").toLowerCase(),_=x.doc.id,j=this.orderStatusMap.get(_),I=M.pendentePagamento===!0&&M.pago!==!0,U=M.pendentePagamento===!0&&M.pago===!0;if(this.isInitialLoad){this.orderStatusMap.set(_,N),I||this.notifiedNewOrderIds.add(_);return}if(this.orderStatusMap.set(_,N),M.empresaId&&M.empresaId!==k||window.location.pathname.includes("/catalog/")||window.location.pathname.includes("/qr/"))return;if(e&&e.role!=="owner"&&e.role!=="admin"){const d=e.storeIds||(e.storeId?[e.storeId]:[]);if(console.log("OrderNotification - Checking Store isolation:",{userStoreIds:d,orderLojaId:M.lojaId}),d.length>0&&M.lojaId&&!d.includes(M.lojaId))return}if(N==="em_preparo"&&j==="aguardando_pagamento"&&(M.manuallyConfirmed||this.showPaymentConfirmed()),N==="atendimento_humano"){const d="pedido_"+_;this.notifiedSupportIds.has(d)||(this.showHumanSupportAlert({...M,id:_,customerName:this.formatCustomerName(M)}),this.notifiedSupportIds.add(d));return}const F=["cancelado","finalizado"];if(I)return;const S=()=>{this.notifiedNewOrderIds.has(_)||F.includes(N)||(this.notifiedNewOrderIds.add(_),this.showNewOrder({id:x.doc.id,...M,customerName:this.formatCustomerName(M),endereco:M.endereco||"Endereço não informado",description:Array.isArray(M.itens)?M.itens.map(d=>`${d.quantidade}x ${d.item}`).join(", "):"Sem itens",value:M.value||M.total||0,leadId:M.leadId,empresaId:M.empresaId,instancia:M.instancia,itens:M.itens}))};if(U){S();return}if(x.type==="added"){const d=this.getCreatedMs(M);if(d!=null&&d<this.listenerStartTime-6e4)return;S()}}),this.isInitialLoad&&(this.isInitialLoad=!1)}),this.setupLeadsListener(k)}stopListening(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null,this.isInitialLoad=!0),this.unsubscribeLeads&&(this.unsubscribeLeads(),this.unsubscribeLeads=null,this.isLeadsInitialLoad=!0),this.notifiedSupportIds.clear(),this.notifiedNewOrderIds.clear(),this.orderStatusMap.clear()}}const ga=new Qa,ta={showPhoneError(){return new Promise(i=>{const e=document.createElement("div");e.className="phone-error-modal",e.id="phone-error-popup",e.innerHTML=`
                <div class="phone-error-card">
                    <div class="phone-error-icon-wrap">
                        <i class="fa-solid fa-phone-slash"></i>
                    </div>
                    <h3>Número Incorreto</h3>
                    <p>Para garantir que suas mensagens cheguem corretamente, informe o número no formato de <strong>DDD + 9 dígitos</strong>.</p>
                    
                    <div class="phone-example-box">
                        <span class="phone-example-label">Formato Correto</span>
                        <div class="phone-example-number">11988887777</div>
                        <p style="font-size:0.75rem;margin-bottom:0;margin-top:10px;color:var(--text-dim);">Informe apenas os 11 dígitos, sem espaços ou símbolos.</p>
                    </div>

                    <button class="phone-error-btn">Entendido, vou corrigir</button>
                </div>
            `,document.body.appendChild(e);const f=()=>{e.classList.add("toast-exit"),setTimeout(()=>{e.remove(),i()},300)};e.querySelector(".phone-error-btn")?.addEventListener("click",f),e.addEventListener("click",m=>{m.target===e&&f()})})}},Ga={novo:{label:"Novo",cls:"badge info"},cliente_ativo:{label:"Cliente Ativo",cls:"badge success"},inativo:{label:"Inativo",cls:"badge secondary"},bloqueado:{label:"Bloqueado",cls:"badge danger"}},Xa={bot:{label:"Bot",icon:'<i class="fa-solid fa-robot"></i>',cls:"badge primary"},em_atendimento_humano:{label:"Atendimento Humano",icon:'<i class="fa-solid fa-user"></i>',cls:"badge warning"},finalizado:{label:"Finalizado",icon:'<i class="fa-solid fa-check"></i>',cls:"badge success"},abandonado:{label:"Abandonado",icon:'<i class="fa-solid fa-warning"></i>',cls:"badge secondary"}};function fa(i){const e=(i||"novo").toLowerCase(),f=Ga[e]||{label:i||"Novo",cls:"badge info"};return`<span class="${f.cls}">${f.label}</span>`}function va(i){const e=(i||"bot").toLowerCase(),f=Xa[e]||{label:i||"Bot",icon:'<i class="fa-solid fa-robot"></i>',cls:"badge primary"};return`<span class="${f.cls}">${f.icon} ${f.label}</span>`}function Ze(i){return i?i.toDate?i.toDate().toLocaleString("pt-BR"):new Date(i).toLocaleString("pt-BR"):"-"}const Ya=async()=>{const i=ce.getCurrentUser();if(!i||!i.companyId)return"<p>Usuário sem empresa.</p>";let e=await T.getAll("leads",{field:"empresaId",operator:"==",value:i.companyId});const f=i.storeIds||(i.storeId?[i.storeId]:[]);i.role!=="owner"&&(e=e.filter(s=>s.lojaId&&f.includes(s.lojaId)));const m=(await T.get("companies",i.companyId))?.modulos_ativos||[],$=m.includes("venda_catalogo")&&!m.includes("atendimento");let v="todos";const x=s=>s.length===0?`<tr><td colspan="${$?4:5}" style="text-align:center;padding:2.5rem;color:var(--text-muted);">Nenhum lead encontrado.</td></tr>`:s.map(o=>{const l=(o.statusLead||"novo").toLowerCase(),r=(o.statusAtendimento||"bot").toLowerCase(),h=r==="atendimento_humano"?"em_atendimento_humano":r,y=(o.telefone||"").split("@")[0];return`
            <tr data-lead-id="${o.id}">
                <td>
                    <div style="display:flex;align-items:center;gap:0.75rem;">
                        <div class="lead-avatar">${(o.nome||o.telefone||"C")[0].toUpperCase()}</div>
                        <div>
                            <div style="font-weight:600;">${o.nome||"Sem nome"}</div>
                            <div style="font-size:0.78rem;color:var(--text-muted);">${y}</div>
                        </div>
                    </div>
                </td>
                <td>${fa(l)}</td>
                ${$?"":`<td>${va(h)}</td>`}
                <td style="color:var(--text-muted);font-size:0.85rem;">${Ze(o.updatedAt||o.criadoEm||o.createdAt)}</td>
                <td>
                    <div class="actions">
                        <button class="action-btn view" title="Ver detalhes" data-id="${o.id}">
                            <i style="color:#fff;" class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                </td>
            </tr>`}).join(""),M=s=>s==="todos"?e:s==="humano"?e.filter(o=>{const l=(o.statusAtendimento||"").toLowerCase();return l==="em_atendimento_humano"||l==="atendimento_humano"}):s==="bloqueado"?e.filter(o=>(o.statusLead||"").toLowerCase()==="bloqueado"):s==="bot"?e.filter(o=>(o.statusAtendimento||"bot").toLowerCase()==="bot"):e;return setTimeout(()=>N(),100),`
        <style>
            .lead-modal-header-actions { display: flex; align-items: center; gap: 0.5rem; }
            .edit-form-group { margin-bottom: 1.25rem; }
            .edit-label { display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.05em; }
            .edit-input { width: 100%; padding: 0.75rem 1rem; background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-main); font-size: 0.9rem; transition: border-color .2s; }
            .edit-input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 2px rgba(99,102,241,.15); }
            .edit-hint { font-size: 0.75rem; color: var(--text-dim); margin-top: 4px; }
        </style>
        <div class="leads-page-header">
            <div class="leads-filter-bar">
                <button class="filter-btn active" data-filter="todos">Todos <span class="filter-count" id="count-lead-todos">${e.length}</span></button>
                ${$?"":`
                <button class="filter-btn" data-filter="bot"><i class="fa-solid fa-robot"></i> Bot <span class="filter-count" id="count-lead-bot">${e.filter(s=>(s.statusAtendimento||"bot").toLowerCase()==="bot").length}</span></button>
                <button class="filter-btn" data-filter="humano"><i class="fa-solid fa-user"></i> Atendimento Humano <span class="filter-count" id="count-lead-humano">${e.filter(s=>{const o=(s.statusAtendimento||"").toLowerCase();return o==="em_atendimento_humano"||o==="atendimento_humano"}).length}</span></button>
                `}
                <button class="filter-btn" data-filter="bloqueado"><i class="fa-solid fa-ban"></i> Bloqueados <span class="filter-count" id="count-lead-bloqueado">${e.filter(s=>(s.statusLead||"").toLowerCase()==="bloqueado").length}</span></button>
            </div>
        </div>

        <div class="card leads-card">
            <div class="table-container">
                <table class="data-table" id="leads-table">
                    <thead>
                        <tr>
                            <th>Lead</th>
                            <th>Status do Lead</th>
                            ${$?"":"<th>Status do Atendimento</th>"}
                            <th>Última Atividade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="leads-tbody">
                        ${x(e)}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Lead Detail Modal -->
        <div id="lead-detail-modal" class="modal hidden">
            <div class="modal-content glass lead-modal-content">
                <div id="lead-modal-inner"></div>
            </div>
        </div>
    `;function N(){if(i){const o=We(Qe,"leads"),l=Ge(o,He("empresaId","==",i.companyId));window._leadsUnsubscribe&&window._leadsUnsubscribe();const r=Xe(l,h=>{e=h.docs.map(p=>({id:p.id,...p.data()}));const y=i.storeIds||(i.storeId?[i.storeId]:[]);i.role!=="owner"&&(e=e.filter(p=>p.lojaId&&y.includes(p.lojaId)));const b=document.getElementById("leads-tbody");b&&(b.innerHTML=x(M(v)),_());const L={todos:e.length,bot:e.filter(p=>(p.statusAtendimento||"bot").toLowerCase()==="bot").length,humano:e.filter(p=>{const E=(p.statusAtendimento||"").toLowerCase();return E==="em_atendimento_humano"||E==="atendimento_humano"}).length,bloqueado:e.filter(p=>(p.statusLead||"").toLowerCase()==="bloqueado").length};Object.entries(L).forEach(([p,E])=>{const D=document.getElementById(`count-lead-${p}`);D&&(D.textContent=E.toString())})});window._leadsUnsubscribe=r}document.querySelectorAll(".leads-filter-bar .filter-btn").forEach(o=>{o.addEventListener("click",()=>{document.querySelectorAll(".leads-filter-bar .filter-btn").forEach(r=>r.classList.remove("active")),o.classList.add("active"),v=o.dataset.filter||"todos";const l=document.getElementById("leads-tbody");l&&(l.innerHTML=x(M(v))),_()})}),_();const s=document.getElementById("lead-detail-modal");s?.addEventListener("click",o=>{o.target===s&&s.classList.add("hidden")})}function _(){document.querySelectorAll(".action-btn.view").forEach(s=>{s.addEventListener("click",async()=>{const o=s.dataset.id,l=e.find(r=>r.id===o);l&&I(l)})})}function j(s){const o=document.getElementById("lead-detail-modal"),l=document.getElementById("lead-modal-inner");if(!o||!l)return;const r=(s.telefone||"").split("@")[0];l.innerHTML=`
            <div class="lead-modal-header">
                <div class="lead-modal-avatar"><i class="fa-solid fa-pen"></i></div>
                <div class="lead-modal-title">
                    <h2>Editar Lead</h2>
                    <p style="color:var(--text-muted);font-size:0.85rem;margin:0;">Alterando informações de contato</p>
                </div>
                <div class="lead-modal-header-actions">
                    <button class="action-btn" id="close-edit-modal" title="Cancelar">
                        <i class="fa-solid fa-xmark" style="color:#fff;"></i>
                    </button>
                </div>
            </div>

            <div class="lead-modal-body">
                <div class="edit-form-group">
                    <label class="edit-label">Nome do Cliente</label>
                    <input type="text" id="edit-lead-nome" class="edit-input" value="${s.nome||""}" placeholder="Ex: João Silva">
                </div>
                <div class="edit-form-group">
                    <label class="edit-label">WhatsApp (DDD + 9 dígitos)</label>
                    <input type="text" id="edit-lead-phone" class="edit-input" value="${r||""}" placeholder="Ex: 11999999999" maxlength="11">
                    <p class="edit-hint">Apenas números, sem o 55.</p>
                </div>
                <div class="edit-form-group">
                    <label class="edit-label">Endereço</label>
                    <input type="text" id="edit-lead-address" class="edit-input" value="${s.endereco||""}" placeholder="Rua, número, bairro...">
                </div>
            </div>

            <div class="lead-modal-footer">
                <button id="lead-save-edit" class="btn-lead-action">
                    <i class="fa-solid fa-floppy-disk"></i> Salvar Alterações
                </button>
            </div>
        `,document.getElementById("close-edit-modal")?.addEventListener("click",()=>I(s)),document.getElementById("lead-save-edit")?.addEventListener("click",async function(){const h=this,y=document.getElementById("edit-lead-nome").value.trim(),b=document.getElementById("edit-lead-phone").value.trim(),L=document.getElementById("edit-lead-address").value.trim();let p=b.replace(/\D/g,"");if(p.length===13&&p.startsWith("55")&&(p=p.substring(2)),!y){w.error("O nome é obrigatório.");return}if(p&&p.length!==11){ta.showPhoneError();return}h.disabled=!0,h.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const E={nome:y,telefone:p,whatsapp:p,endereco:L,updatedAt:_e.now()};await T.update("leads",s.id,E),Object.assign(s,E),w.success("Lead atualizado!"),d(s),I(s)}catch(E){console.error(E),w.error("Erro ao salvar alterações."),h.disabled=!1,h.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Alterações'}})}function I(s){const o=document.getElementById("lead-detail-modal"),l=document.getElementById("lead-modal-inner");if(!o||!l)return;const r=(s.statusLead||"novo").toLowerCase(),h=(s.statusAtendimento||"bot").toLowerCase(),y=h==="atendimento_humano"?"em_atendimento_humano":h,b=r==="bloqueado",L=(s.telefone||"").split("@")[0];let p="";!b&&!$&&(y==="bot"?p=`<button id="lead-action-primary" class="btn-lead-action" data-action="assumir">
                    <i class="fa-solid fa-user"></i> Assumir Atendimento
                </button>`:y==="em_atendimento_humano"?p=`<button id="lead-action-primary" class="btn-lead-action danger" data-action="finalizar">
                    <i class="fa-solid fa-user"></i> Finalizar Atendimento
                </button>`:p=`<button id="lead-action-primary" class="btn-lead-action" data-action="novo_atendimento">
                    <i class="fa-solid fa-user"></i> Iniciar Novo Atendimento
                </button>`);const E=U(r);l.innerHTML=`
            <div class="lead-modal-header">
                <div class="lead-modal-avatar">${(s.nome||s.telefone||"C")[0].toUpperCase()}</div>
                <div class="lead-modal-title">
                    <h2>${s.nome||"Sem nome"}</h2>
                    <span style="color:var(--text-muted);font-size:0.9rem;">${L}</span>
                </div>
                <div class="lead-modal-header-actions">
                    ${E.length>0?`
                    <div class="lead-menu-wrap">
                        <button class="action-btn lead-menu-btn" id="lead-menu-trigger" title="Mais ações">
                            <i class="fa-solid fa-ellipsis-vertical" style="color:#fff;"></i>
                        </button>
                        <div class="lead-dropdown hidden" id="lead-dropdown">
                            ${E.map(a=>`
                                <button class="lead-dropdown-item ${a.danger?"danger":""}" data-menu-action="${a.action}">
                                    ${a.icon} ${a.label}
                                </button>
                            `).join("")}
                        </div>
                    </div>`:""}
                    <button class="action-btn" id="close-lead-modal" title="Fechar">
                        <i class="fa-solid fa-xmark" style="color:#fff;"></i>
                    </button>
                </div>
            </div>

                <div class="lead-badge-group">
                    <span class="badge-label">Status do Lead</span>
                    ${fa(r)}
                </div>
                ${$?"":`
                <div class="lead-badge-group">
                    <span class="badge-label">Status do Atendimento</span>
                    ${va(y)}
                </div>`}
            </div>

            <div class="lead-modal-body">
                <div class="lead-info-grid">
                    <div class="lead-info-item">
                        <span class="lead-info-label">Telefone</span>
                        <span class="lead-info-value">${L||"-"}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Empresa ID</span>
                        <span class="lead-info-value" style="font-size:0.8rem;">${s.empresaId||"-"}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Criado em</span>
                        <span class="lead-info-value">${Ze(s.criadoEm||s.createdAt)}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Última atividade</span>
                        <span class="lead-info-value">${Ze(s.updatedAt)}</span>
                    </div>
                    ${s.endereco?`
                    <div class="lead-info-item" style="grid-column:1/-1;">
                        <span class="lead-info-label">Endereço</span>
                        <span class="lead-info-value">${s.endereco}</span>
                    </div>`:""}
                </div>

                ${s.ultimoPedido||s.lastOrder?`
                <div class="lead-section">
                    <h4 class="lead-section-title">Último Pedido</h4>
                    <div class="lead-last-order">
                        <span>${s.ultimoPedido||s.lastOrder}</span>
                    </div>
                </div>`:""}

                ${s.historicoResumo?`
                <div class="lead-section">
                    <h4 class="lead-section-title">Histórico</h4>
                    <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.6;">${s.historicoResumo}</p>
                </div>`:""}

                ${b?`
                <div class="lead-alert danger">
                    <i class="fa-solid fa-lock"></i> Este lead está bloqueado. Desbloqueie antes de iniciar atendimento.
                </div>`:""}
            </div>

            ${p?`
            <div class="lead-modal-footer">
                ${p}
            </div>`:""}
        `,o.classList.remove("hidden"),document.getElementById("close-lead-modal")?.addEventListener("click",()=>{o.classList.add("hidden")});const D=document.getElementById("lead-menu-trigger"),Q=document.getElementById("lead-dropdown");D?.addEventListener("click",a=>{a.stopPropagation(),Q?.classList.toggle("hidden")}),document.addEventListener("click",()=>Q?.classList.add("hidden"),{once:!0}),Q?.querySelectorAll(".lead-dropdown-item").forEach(a=>{a.addEventListener("click",async()=>{Q.classList.add("hidden");const g=a.dataset.menuAction;await F(g,s)})}),document.getElementById("lead-action-primary")?.addEventListener("click",async function(){const a=this.dataset.action;await S(a,s)})}function U(s,o){const l=[],r=s==="bloqueado";return l.push({label:"Editar Lead",icon:'<i class="fa-solid fa-pen-to-square"></i>',action:"editar"}),r?l.push({label:"Desbloquear Lead",icon:'<i class="fa-solid fa-unlock"></i>',action:"desbloquear"}):l.push({label:"Bloquear Lead",icon:'<i class="fa-solid fa-lock"></i>',action:"bloquear",danger:!0}),l}async function F(s,o){if(s==="editar"){j(o);return}if(s==="bloquear"){if(!await pe.danger("Bloquear Lead",`Deseja bloquear o lead ${o.nome||o.telefone}? Ele não poderá receber atendimento enquanto bloqueado.`))return;try{await T.update("leads",o.id,{statusLead:"bloqueado",statusAtendimento:"finalizado",estado:"finalizado",updatedAt:_e.now()}),o.statusLead="bloqueado",o.statusAtendimento="finalizado",o.estado="finalizado",w.success("Lead bloqueado e atendimento finalizado."),d(o),I(o)}catch{w.error("Erro ao bloquear lead.")}}if(s==="desbloquear"){if(!await pe.warning("Desbloquear Lead",`Deseja desbloquear o lead ${o.nome||o.telefone}?`))return;try{await T.update("leads",o.id,{statusLead:"cliente_ativo",updatedAt:_e.now()}),o.statusLead="cliente_ativo",w.success("Lead desbloqueado com sucesso."),d(o),I(o)}catch{w.error("Erro ao desbloquear lead.")}}}async function S(s,o){const l=document.getElementById("lead-action-primary");if(s==="assumir"){if(!await pe.warning("Assumir Atendimento",`Deseja assumir o atendimento humano do lead ${o.nome||o.telefone}?`))return;l.disabled=!0,l.textContent='<i class="fa-solid hourglass"></i> Processando...';try{await T.update("leads",o.id,{statusAtendimento:"em_atendimento_humano",estado:"atendimento_humano",updatedAt:_e.now()}),o.statusAtendimento="em_atendimento_humano",o.estado="atendimento_humano",w.success("Atendimento humano iniciado."),d(o),I(o)}catch{w.error("Erro ao assumir atendimento."),l.disabled=!1,l.textContent='<i class="fa-solid user"></i> Assumir Atendimento'}}if(s==="finalizar"){if(!await pe.warning("Finalizar Atendimento",`Deseja finalizar o atendimento do lead ${o.nome||o.telefone}?`))return;l.disabled=!0,l.textContent='<i class="fa-solid hourglass"></i> Processando...';try{await T.update("leads",o.id,{statusAtendimento:"finalizado",estado:"finalizado",updatedAt:_e.now()}),o.statusAtendimento="finalizado",o.estado="finalizado",w.success("Atendimento finalizado."),d(o),I(o)}catch{w.error("Erro ao finalizar atendimento."),l.disabled=!1,l.textContent='<i class="fa-solid check"></i> Finalizar Atendimento'}}if(s==="novo_atendimento"){if(!await pe.warning("Iniciar Novo Atendimento",`Deseja iniciar um novo atendimento humano para ${o.nome||o.telefone}?`))return;l.disabled=!0,l.textContent='<i class="fa-solid hourglass"></i> Processando...';try{await T.update("leads",o.id,{statusAtendimento:"em_atendimento_humano",estado:"atendimento_humano",updatedAt:_e.now()}),o.statusAtendimento="em_atendimento_humano",o.estado="atendimento_humano",w.success("Novo atendimento humano iniciado."),d(o),I(o)}catch{w.error("Erro ao iniciar atendimento."),l.disabled=!1,l.textContent='<i class="fa-solid refresh"></i> Iniciar Novo Atendimento'}}}function d(s){const o=e.findIndex(r=>r.id===s.id);o>=0&&(e[o]={...e[o],...s});const l=document.getElementById("leads-tbody");l&&(l.innerHTML=x(M(v))),_()}};function Ja(i){if(!i)return null;if(typeof i.toDate=="function")return i.toDate().getTime();if(i.seconds)return i.seconds*1e3;const e=new Date(i).getTime();return isNaN(e)?null:e}function Ka(i){const e=Ja(i);if(e===null)return{label:"Sem registro",color:"#6b7280"};const f=Date.now()-e,k=Math.floor(f/(1e3*60*60*24)),m=Math.floor(f/(1e3*60*60)),$=Math.floor(f/(1e3*60));let v;$<60?v=$<=1?"Agora há pouco":`há ${$} min`:m<24?v=`há ${m}h`:k===1?v="Ontem":v=`há ${k} dias`;const x=k<7?"#22c55e":k<30?"#f59e0b":"#ef4444";return{label:v,color:x}}const Za=async()=>{const i=ce.getCurrentUser();if(!i||!i.companyId)return"<p>Usuário sem empresa.</p>";const e=i.companyId,[f,k,m]=await Promise.all([T.get("companies",e),T.getAll("instancias",{field:"empresaId",operator:"==",value:e}),T.getAll("leads",{field:"empresaId",operator:"==",value:e})]);let $=[],v="nova";const x=()=>k.length===0?'<option value="">Nenhuma instância cadastrada</option>':k.map(d=>{const s=d.status==="conectado"||d.status==="open",o=f?.stores?.find(r=>r.instancia_id===d.id),l=!!o;return`<option value="${d.id}" 
                        data-status="${d.status}" 
                        ${l?"disabled":""} 
                        style="${l?"color: var(--text-muted);":""}">
                ${d.nome} ${s?'<i class="fa-solid fa-circle-check" style="color: var(--primary);"></i>':'<i class="fa-solid fa-circle-xmark" style="color: var(--danger);"></i>'} ${o?`(EM USO: ${o.name})`:""}
            </option>`}).join(""),M=()=>$.length===0?'<tr><td colspan="8" style="text-align:center; padding: 2rem; color: var(--text-muted);">Nenhuma campanha realizada ainda.</td></tr>':$.sort((d,s)=>{const o=d.data_agendamento?.seconds||d.data_inicio?.seconds||0;return(s.data_agendamento?.seconds||s.data_inicio?.seconds||0)-o}).map(d=>{const s=d.total_leads>0?Math.round((d.enviados+d.falhas)/d.total_leads*100):0,o=d.data_agendamento?new Date(d.data_agendamento.seconds*1e3).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"}):null;return`
                <tr>
                    <td>
                        <div style="font-weight: 700; color: var(--text-main);">${d.nome||"Campanha Sem Nome"}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${d.id.substring(0,8)}...</div>
                    </td>
                    <td><span class="badge secondary"><i class="fa-brands fa-whatsapp"></i> ${k.find(l=>l.id===d.instancia_id)?.nome||"N/A"}</span></td>
                    <td>
                        ${o?`<div style="font-size:0.8rem;"><span style="color:var(--text-muted);">Agendado</span></div><div style="font-size:0.85rem;font-weight:600;color:var(--primary);">${o}</div>`:d.data_inicio?new Date(d.data_inicio.seconds*1e3).toLocaleDateString():"-"}
                    </td>
                    <td><strong>${d.total_leads||0}</strong></td>
                    <td>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.75rem;">
                                <span class="text-success">${d.enviados||0}</span>
                                <span class="text-danger">${d.falhas||0}</span>
                            </div>
                            <div style="width: 100%; height: 6px; background: var(--surface-hover); border-radius: 3px; overflow: hidden;">
                                <div style="width: ${s}%; height: 100%; background: var(--primary); border-radius: 3px;"></div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge ${d.status==="finalizada"?"success":d.status==="em_andamento"||d.status==="agendada"&&d.agendamento_imediato?"warning":d.status==="agendada"?"primary":"secondary"}">
                            ${d.status==="em_andamento"?'<i class="fa-solid fa-spinner fa-spin"></i> Em andamento':d.status==="finalizado"?'<i class="fa-solid fa-check-circle"></i> Finalizada':d.status==="processando"?'<i class="fa-solid fa-spinner fa-spin"></i> Em andamento':d.status==="agendada"&&d.agendamento_imediato?'<i class="fa-solid fa-hourglass-end"></i> Aguardando envio':d.status==="agendada"?'<i class="fa-solid fa-calendar"></i> Agendada':"Cancelada"}
                        </span>
                    </td>
                    <td>
                        <div style="display: flex; gap: 6px;">
                            <button class="action-btn view-details" data-id="${d.id}" title="Ver detalhes" style="background: var(--primary); border-radius: 8px; width: 32px; height: 32px; flex-shrink: 0;">
                                <i class="fa-solid fa-eye" style="color:#fff;"></i>
                            </button>
                            ${["processando","em_andamento","agendada"].includes(d.status)?`
                            <button class="action-btn cancel-campaign" data-id="${d.id}" title="Cancelar campanha" style="background: var(--danger); border-radius: 8px; width: 32px; height: 32px; flex-shrink: 0;">
                                <i class="fa-solid fa-ban" style="color:#fff;"></i>
                            </button>
                            `:""}
                        </div>
                    </td>
                </tr>
            `}).join(""),N=`
        <style>
            .campaign-container { max-width: 1200px; margin: 0 auto; }
            .campaign-tabs { 
                display: flex; 
                gap: 0.5rem; 
                margin-bottom: 2rem; 
                padding: 4px;
                background: var(--surface-hover);
                border-radius: 12px;
                width: fit-content;
            }
            .tab-btn { 
                background: none; 
                border: none; 
                color: var(--text-muted); 
                font-weight: 600; 
                cursor: pointer; 
                padding: 0.6rem 1.5rem; 
                border-radius: 10px; 
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
                font-size: 0.9rem;
            }
            .tab-btn:hover { color: var(--text-main); }
            .tab-btn.active { 
                color: white; 
                background: var(--primary); 
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
            }
            
            .step-card { 
                margin-bottom: 2rem; 
                border: 1px solid var(--border-color);
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                transition: transform 0.2s;
            }
            .step-card:hover { transform: translateY(-2px); }
            .step-header { 
                display: flex; 
                align-items: center; 
                gap: 12px; 
                margin-bottom: 1.5rem; 
                font-size: 1.1rem;
                font-weight: 700; 
                color: var(--text-main); 
            }
            .step-number { 
                width: 28px; 
                height: 28px; 
                background: var(--primary); 
                color: white; 
                border-radius: 8px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                font-size: 0.9rem;
                box-shadow: 0 2px 5px rgba(99, 102, 241, 0.4);
            }
            
            /* Premium Inputs */
            .form-control {
                background: var(--surface-hover) !important;
                border: 1px solid var(--border-color) !important;
                color: var(--text-main) !important;
                border-radius: 10px !important;
                padding: 0.8rem 1rem !important;
                font-size: 0.95rem !important;
                transition: all 0.2s !important;
            }
            .form-control:focus {
                border-color: var(--primary) !important;
                box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1) !important;
                outline: none !important;
            }
            select.form-control {
                appearance: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: right 1rem center;
                background-size: 1.25rem;
                padding-right: 2.5rem !important;
            }

            .var-grid { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1rem; }
            .var-chip { 
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 6px 14px; 
                background: rgba(99, 102, 241, 0.1); 
                border: 1px solid rgba(99, 102, 241, 0.2); 
                border-radius: 20px; 
                font-size: 0.8rem; 
                cursor: grab; 
                color: var(--primary);
                font-weight: 600;
                transition: all 0.2s;
                user-select: none;
            }
            .var-chip:hover { 
                border-color: var(--primary); 
                background: rgba(99, 102, 241, 0.15);
            }
            
            /* Lead Selection Table */
            .leads-selection-table-wrap {
                margin-top: 1.5rem;
                border: 1px solid var(--border-color);
                border-radius: 12px;
                background: var(--surface-light);
                overflow: hidden;
            }
            .leads-table-filters {
                padding: 1rem;
                background: var(--surface-hover);
                border-bottom: 1px solid var(--border-color);
                display: grid;
                grid-template-columns: 2fr 1fr 1fr 1fr;
                gap: 1rem;
            }
            @media (max-width: 900px) {
                .leads-table-filters {
                    grid-template-columns: 1fr 1fr;
                }
            }
            .leads-table-content {
                max-height: 400px;
                overflow-y: auto;
            }
            .leads-table {
                width: 100%;
                border-collapse: collapse;
            }
            .leads-table th {
                background: var(--surface-hover);
                padding: 10px 15px;
                text-align: left;
                font-size: 0.75rem;
                text-transform: uppercase;
                color: var(--text-muted);
                position: sticky;
                top: 0;
                z-index: 10;
            }
            .leads-table td {
                padding: 12px 15px;
                border-bottom: 1px solid var(--border-color);
                font-size: 0.9rem;
            }
            .leads-table tr:hover { background: rgba(255,255,255,0.02); }
            
            .leads-pagination {
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: var(--surface-hover);
                border-top: 1px solid var(--border-color);
            }

            /* Multiple Messages */
            .message-block {
                background: rgba(255,255,255,0.02);
                border: 1px solid var(--border-color);
                border-radius: 12px;
                padding: 1.25rem;
                margin-bottom: 1rem;
                position: relative;
            }
            .message-block-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            .btn-remove-msg {
                color: var(--danger);
                background: none;
                border: none;
                cursor: pointer;
                font-size: 0.9rem;
            }
            .btn-add-msg {
                width: 100%;
                padding: 0.75rem;
                background: var(--surface-hover);
                border: 2px dashed var(--border-color);
                border-radius: 12px;
                color: var(--text-muted);
                cursor: pointer;
                font-weight: 600;
                margin-top: 1rem;
                transition: all 0.2s;
            }
            .btn-add-msg:hover {
                border-color: var(--primary);
                color: var(--primary);
                background: rgba(99, 102, 241, 0.05);
            }

            .leads-counter-card { 
                padding: 1.25rem; 
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(99, 102, 241, 0) 100%);
                border: 1px solid rgba(99, 102, 241, 0.2); 
                border-radius: 12px; 
                margin: 1.5rem 0; 
                display: flex; 
                align-items: center; 
                justify-content: space-between;
                gap: 15px; 
            }
            .leads-count-info { display: flex; align-items: center; gap: 12px; }
            .leads-count-icon {
                width: 40px;
                height: 40px;
                background: rgba(99, 102, 241, 0.1);
                color: var(--primary);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
            }
            
            .view-leads-btn {
                background: none;
                border: 1px solid var(--border-color);
                color: var(--text-main);
                padding: 6px 12px;
                border-radius: 8px;
                font-size: 0.85rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            .view-leads-btn:hover {
                border-color: var(--primary);
                color: var(--primary);
            }

            .delay-inputs { display: flex; gap: 1.5rem; align-items: center; }
            .delay-box { flex: 1; }
            .delay-box label { display: block; margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--text-muted); }

            .schedule-toggle {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.55rem 1.2rem;
                border-radius: 8px;
                border: 1px solid var(--border-color);
                background: var(--surface-hover);
                color: var(--text-muted);
                font-weight: 600;
                font-size: 0.88rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            .schedule-toggle:hover {
                border-color: var(--primary);
                color: var(--primary);
            }
            .schedule-toggle.active {
                background: var(--primary);
                border-color: var(--primary);
                color: #fff;
                box-shadow: 0 2px 8px rgba(99,102,241,0.35);
            }
            
            .instance-status-tag {
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 0.7rem;
                font-weight: 600;
                text-transform: uppercase;
                margin-left: 8px;
            }
            .status-online { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
            .status-offline { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

            .badge.em_uso { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

            /* Selected Leads List */
            #leads-list-container { margin-top: 1rem; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; display: none; }
            .leads-list-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
            .leads-list-table th { background: var(--surface-light); text-align: left; padding: 10px; border-bottom: 1px solid var(--border-color); }
            .leads-list-table td { padding: 10px; border-bottom: 1px solid var(--border-color); }
            .leads-list-table tr:last-child td { border-bottom: none; }

            .filter-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
            @media (max-width: 768px) { .filter-grid { grid-template-columns: 1fr; } }
        </style>

        <div class="campaign-container">
            <div class="page-header" style="flex-direction: column;">
                <div><h2 class="page-title">Disparo em Massa</h2></div>
                <div><p class="page-description">Envie mensagens personalizadas para seus leads de forma estratégica.</p></div>
            </div>

            <div class="campaign-tabs">
                <button class="tab-btn ${v==="nova"?"active":""}" id="tab-nova">
                    <i class="fa-solid fa-plus-circle" style="margin-right: 6px;"></i>Nova Campanha
                </button>
                <button class="tab-btn ${v==="historico"?"active":""}" id="tab-historico">
                    <i class="fa-solid fa-history" style="margin-right: 6px;"></i>Histórico
                </button>
            </div>

            <div id="campaign-view-container">
                <!-- Content dynamicly loaded -->
            </div>
        </div>

        <!-- Detail Modal -->
        <div id="campaign-detail-modal" class="modal hidden">
            <div class="modal-content glass" style="max-width: 850px;">
                <span class="close-modal" id="close-detail-modal">&times;</span>
                <div id="campaign-detail-content"></div>
            </div>
        </div>
    `;return setTimeout(()=>I(),100),N;function _(){return`
            <div class="card step-card">
                <div class="step-header">
                    <div class="step-number">1</div> <span>Dados Campanha</span>
                </div>
                <div class="form-group" style="margin-bottom: 1.25rem;">
                    <label style="display:block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem;">Nome da Campanha</label>
                    <input type="text" id="campaign-name" class="form-control" placeholder="Ex: Promoção de Fevereiro, Leads Inativos..." maxlength="80">
                </div>
                <div class="form-group">
                    <label>Selecione a instância de WhatsApp</label>
                    <select id="select-instance" class="form-control" style="font-size: 1rem; padding: 0.75rem;">
                        <option value="">Selecione uma instância disponível...</option>
                        ${x()}
                    </select>
                    <div style="margin-top: 0.75rem; display: flex; align-items: flex-start; gap: 8px; color: var(--text-muted); font-size: 0.85rem;">
                        <i class="fa-solid fa-circle-info" style="margin-top: 3px; color: var(--primary);"></i>
                        <span>Importante: Instâncias já vinculadas a uma loja estão protegidas e não podem ser usadas em disparos em massa para evitar bloqueios no número oficial.</span>
                    </div>
                </div>
            </div>

            <div class="card step-card">
                <div class="step-header">
                    <div class="step-number">2</div> <span>Público Alvo</span>
                </div>
                
                <div class="leads-selection-table-wrap">
                    <div class="leads-table-filters">
                        <input type="text" id="lead-search" class="form-control" placeholder="Buscar por nome ou telefone...">
                        <select id="lead-filter-store" class="form-control">
                            <option value="">Todas as Lojas</option>
                            ${f?.stores?.map(d=>`<option value="${d.id}">${d.name}</option>`).join("")}
                        </select>
                        <select id="lead-filter-status" class="form-control">
                            <option value="">Todos os Status</option>
                            <option value="novo">Novo</option>
                            <option value="cliente_ativo">Cliente Ativo</option>
                            <option value="lead_frio">Lead Frio</option>
                        </select>
                        <select id="lead-filter-activity" class="form-control">
                            <option value="">Qualquer atividade</option>
                            <option value="7">Últimos 7 dias</option>
                            <option value="15">Últimos 15 dias</option>
                            <option value="30">Últimos 30 dias</option>
                            <option value="90">Últimos 90 dias</option>
                        </select>
                    </div>
                    
                    <div class="leads-table-content">
                        <table class="leads-table">
                            <thead>
                                <tr>
                                    <th style="width: 40px;"><input type="checkbox" id="select-all-leads"></th>
                                    <th>Nome</th>
                                    <th>WhatsApp</th>
                                    <th>Loja</th>
                                    <th>Status</th>
                                    <th>Última Atividade</th>
                                </tr>
                            </thead>
                            <tbody id="leads-table-body">
                                <!-- Paginated list -->
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="leads-pagination">
                        <div style="font-size: 0.85rem; color: var(--text-muted);" id="pagination-info">Mostrando 0 de 0</div>
                        <div style="display: flex; gap: 8px;">
                            <button class="btn-secondary" id="prev-page" style="padding: 4px 10px;"><i class="fa-solid fa-chevron-left"></i></button>
                            <button class="btn-secondary" id="next-page" style="padding: 4px 10px;"><i class="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>

                <div class="leads-counter-card">
                    <div class="leads-count-info">
                        <div class="leads-count-icon">
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <div>
                            <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-main);">
                                <span id="selected-count-display">0</span> Leads Selecionados
                            </div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Estes contatos receberão suas mensagens.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card step-card">
                <div class="step-header">
                    <div class="step-number">3</div> <span>Composição da Mensagem</span>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">VARIÁVEIS (Arraste para a mensagem):</span>
                    <div class="var-grid" id="var-chips-container">
                        <div class="var-chip" draggable="true" data-var="{{nome}}"><i class="fa-solid fa-user"></i> Nome</div>
                        <div class="var-chip" draggable="true" data-var="{{telefone}}"><i class="fa-solid fa-phone"></i> Telefone</div>
                        <div class="var-chip" draggable="true" data-var="{{endereco}}"><i class="fa-solid fa-location-dot"></i> Endereço</div>
                    </div>
                </div>

                <div id="messages-list">
                    <!-- Multiple messages -->
                </div>
                
                <button class="btn-add-msg" id="btn-add-message">
                    <i class="fa-solid fa-plus-circle"></i> Adicionar Alternativa de Mensagem
                </button>
            </div>

            <div class="card step-card">
                <div class="step-header">
                    <div class="step-number">4</div> <span>Configurações Inteligentes</span>
                </div>
                <div class="delay-inputs">
                    <div class="delay-box">
                        <label>Intervalo Mínimo (segundos)</label>
                        <input type="number" id="delay-min" class="form-control" value="20" min="5">
                    </div>
                    <div class="delay-box">
                        <label>Intervalo Máximo (segundos)</label>
                        <input type="number" id="delay-max" class="form-control" value="60" min="10">
                    </div>
                </div>
                <div style="margin-top: 1rem; padding: 1rem; background: rgba(245, 158, 11, 0.05); border-radius: 8px; border-left: 4px solid #f59e0b;">
                    <p style="font-size: 0.85rem; color: #b45309; margin-bottom: 0;">
                        <i class="fa-solid fa-triangle-exclamation"></i> <strong>Dica Anti-Ban:</strong> Utilize intervalos maiores (ex: 30-90s) para disparos acima de 50 contatos.
                    </p>
                </div>

                <!-- Scheduling Section -->
                <div style="margin-top: 1.75rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
                    <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">
                        <i class="fa-solid fa-clock"></i> Quando Enviar?
                    </div>
                    <div style="display: flex; gap: 0.75rem; margin-bottom: 1.25rem;">
                        <button id="btn-send-now" class="schedule-toggle active" data-mode="now">
                            <i class="fa-solid fa-bolt"></i> Agora
                        </button>
                        <button id="btn-send-scheduled" class="schedule-toggle" data-mode="scheduled">
                            <i class="fa-solid fa-calendar"></i> Agendar
                        </button>
                    </div>
                    <div id="schedule-datetime-wrap" style="display: none;">
                        <label style="display: block; margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Data e Hora do Disparo</label>
                        <input type="datetime-local" id="schedule-datetime" class="form-control" style="max-width: 320px;">
                        <div id="schedule-error" style="display:none; margin-top: 0.5rem; font-size: 0.82rem; color: #ef4444;">
                            <i class="fa-solid fa-circle-exclamation"></i> Selecione uma data e hora no futuro.
                        </div>
                    </div>
                </div>

                <div style="margin-top: 2rem;">
                    <button class="btn-primary full-width" id="btn-start-campaign" disabled style="padding: 1rem; font-size: 1.1rem; border-radius: 12px;">
                        <i class="fa-solid fa-paper-plane" style="margin-right: 8px;"></i> Iniciar Campanha Agora
                    </button>
                </div>
            </div>
        `}function j(){return`
            <div class="card" style="padding: 0; overflow: hidden; border: 1px solid var(--border-color);">
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Campanha</th>
                                <th>Instância</th>
                                <th>Data</th>
                                <th>Público</th>
                                <th style="width: 150px;">Progresso</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                            <tbody id="campaigns-tbody">
                                ${M()}
                            </tbody>
                    </table>
                </div>
            </div>
        `}function I(){const d=document.getElementById("campaign-view-container");if(!d)return;const s=We(Qe,"campanhas"),o=Ge(s,He("cliente_id","==",e));window._campaignsUnsubscribe&&window._campaignsUnsubscribe();const l=Xe(o,b=>{if($=b.docs.map(L=>({id:L.id,...L.data()})),v==="historico"){const L=document.getElementById("campaigns-tbody");L&&(L.innerHTML=M(),F())}});window._campaignsUnsubscribe=l;const r=()=>{v==="nova"?(d.innerHTML=_(),U()):(d.innerHTML=j(),F())},h=document.getElementById("tab-nova"),y=document.getElementById("tab-historico");h?.addEventListener("click",()=>{v="nova",h.classList.add("active"),y?.classList.remove("active"),r()}),y?.addEventListener("click",()=>{v="historico",y.classList.add("active"),h?.classList.remove("active"),r()}),r()}function U(){let d=1;const s=15;let o=new Set,l=m,r=[""];const h=document.getElementById("campaign-name"),y=document.getElementById("select-instance"),b=document.getElementById("btn-start-campaign"),L=document.getElementById("lead-search"),p=document.getElementById("lead-filter-store"),E=document.getElementById("lead-filter-status"),D=document.getElementById("lead-filter-activity"),Q=document.getElementById("leads-table-body"),a=document.getElementById("select-all-leads"),g=document.getElementById("pagination-info"),z=document.getElementById("prev-page"),O=document.getElementById("next-page"),X=document.getElementById("selected-count-display"),te=document.getElementById("messages-list"),G=document.getElementById("btn-add-message"),W=()=>{const Z=L.value.toLowerCase(),Y=p.value,oe=E.value,ne=D?parseInt(D.value||"0"):0,ee=Date.now(),ue=ne>0?ee-ne*24*60*60*1e3:null;l=m.filter(re=>{const ye=!Z||(re.nome||"").toLowerCase().includes(Z)||(re.telefone||"").includes(Z),ke=!Y||re.lojaId===Y,ge=!oe||(re.statusLead||"novo")===oe;let Te=!0;if(ue!==null){const ze=re.updatedAt||re.criadoEm||re.createdAt;let fe=null;ze&&(typeof ze.toDate=="function"?fe=ze.toDate().getTime():ze.seconds?fe=ze.seconds*1e3:fe=new Date(ze).getTime()),Te=fe!==null&&fe>=ue}return ye&&ke&&ge&&Te}),d=1,ae()},ae=()=>{if(!Q||!g)return;const Z=(d-1)*s,Y=Math.min(Z+s,l.length),oe=l.slice(Z,Y);Q.innerHTML=oe.map(ee=>{const ue=o.has(ee.id),re=f?.stores?.find(ke=>ke.id===ee.lojaId)?.name||"N/A",ye=Ka(ee.updatedAt||ee.criadoEm||ee.createdAt);return`
                    <tr>
                        <td><input type="checkbox" class="lead-checkbox" data-id="${ee.id}" ${ue?"checked":""}></td>
                        <td>${ee.nome||"Sem nome"}</td>
                        <td>${(ee.telefone||"").split("@")[0]}</td>
                        <td><span class="badge secondary" style="font-size: 0.7rem;">${re}</span></td>
                        <td><span class="badge ${ee.statusLead==="cliente_ativo"?"success":"secondary"}" style="font-size: 0.7rem;">${ee.statusLead||"novo"}</span></td>
                        <td>
                            <span style="display:inline-flex;align-items:center;gap:5px;font-size:0.78rem;color:var(--text-muted);">
                                <span style="width:7px;height:7px;border-radius:50%;background:${ye.color};flex-shrink:0;"></span>
                                <span style="color:${ye.color};font-weight:600;">${ye.label}</span>
                            </span>
                        </td>
                    </tr>
                `}).join(""),g.textContent=`Mostrando ${Z+1}-${Y} de ${l.length}`,X&&(X.textContent=o.size.toString());const ne=oe.length>0&&oe.every(ee=>o.has(ee.id));a&&(a.checked=ne),document.querySelectorAll(".lead-checkbox").forEach(ee=>{ee.addEventListener("change",ue=>{const re=ue.target.dataset.id;ue.target.checked?o.add(re):o.delete(re),X&&(X.textContent=o.size.toString()),n()})}),n()},de=()=>{te&&(te.innerHTML=r.map((Z,Y)=>`
                <div class="message-block" data-index="${Y}">
                    <div class="message-block-header">
                        <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">MENSAGEM #${Y+1}</span>
                        ${r.length>1?`<button class="btn-remove-msg" data-index="${Y}"><i class="fa-solid fa-trash-can"></i> Remover</button>`:""}
                    </div>
                    <textarea class="form-control msg-textarea" rows="5" placeholder="Digite sua mensagem aqui..." data-index="${Y}" style="width: 100%; box-sizing: border-box;">${Z}</textarea>
                    <div style="display: flex; justify-content: flex-end; margin-top: 5px;">
                        <span class="char-count" style="font-size: 0.7rem; color: var(--text-muted);">${Z.length} caracteres</span>
                    </div>
                </div>
            `).join(""),document.querySelectorAll(".btn-remove-msg").forEach(Z=>{const Y=Z;Y.addEventListener("click",()=>{const oe=parseInt(Y.dataset.index||"0");r.splice(oe,1),de(),n()})}),document.querySelectorAll(".msg-textarea").forEach(Z=>{const Y=Z;Y.addEventListener("input",()=>{const oe=parseInt(Y.dataset.index||"0");r[oe]=Y.value;const ne=Y.parentElement?.querySelector(".char-count");ne&&(ne.textContent=`${Y.value.length} caracteres`),n()}),Y.addEventListener("dragover",oe=>oe.preventDefault()),Y.addEventListener("drop",oe=>{oe.preventDefault();const ne=oe.dataTransfer.getData("text/plain");if(!ne)return;const ee=Y.selectionStart||Y.value.length,ue=Y.selectionEnd||Y.value.length,re=Y.value.slice(0,ee)+ne+Y.value.slice(ue);Y.value=re;const ye=parseInt(Y.dataset.index||"0");r[ye]=re,n()})}))},n=()=>{const Z=!!y.value,Y=o.size>0,oe=r.every(re=>re.trim().length>0),ne=y.options[y.selectedIndex],ee=ne?.dataset.status==="conectado"||ne?.dataset.status==="open";let ue=!0;if(u==="scheduled"){const re=R?.value;(!re||new Date(re).getTime()<=Date.now())&&(ue=!1)}b.disabled=!(Z&&ee&&Y&&oe&&ue)};L?.addEventListener("input",W),p?.addEventListener("change",W),E?.addEventListener("change",W),D?.addEventListener("change",W),h?.addEventListener("input",n),z?.addEventListener("click",()=>{d>1&&(d--,ae())}),O?.addEventListener("click",()=>{d<Math.ceil(l.length/s)&&(d++,ae())}),a?.addEventListener("change",Z=>{const Y=(d-1)*s,oe=Math.min(Y+s,l.length),ne=l.slice(Y,oe);Z.target.checked?ne.forEach(ee=>o.add(ee.id)):ne.forEach(ee=>o.delete(ee.id)),ae()}),G?.addEventListener("click",()=>{r.push(""),de(),n()}),document.querySelectorAll(".var-chip").forEach(Z=>{const Y=Z;Y.addEventListener("dragstart",oe=>{oe.dataTransfer.setData("text/plain",Y.dataset.var||"")})});let u="now";y?.addEventListener("change",n);const C=document.getElementById("btn-send-now"),A=document.getElementById("btn-send-scheduled"),H=document.getElementById("schedule-datetime-wrap"),R=document.getElementById("schedule-datetime"),K=document.getElementById("schedule-error"),ie=()=>{u==="scheduled"?b.innerHTML='<i class="fa-solid fa-calendar-clock" style="margin-right: 8px;"></i> Agendar Campanha':b.innerHTML='<i class="fa-solid fa-paper-plane" style="margin-right: 8px;"></i> Iniciar Campanha Agora'},le=Z=>String(Z).padStart(2,"0"),se=new Date;se.setMinutes(se.getMinutes()+5),R.min=`${se.getFullYear()}-${le(se.getMonth()+1)}-${le(se.getDate())}T${le(se.getHours())}:${le(se.getMinutes())}`,C?.addEventListener("click",()=>{u="now",C.classList.add("active"),A?.classList.remove("active"),H&&(H.style.display="none"),K&&(K.style.display="none"),ie(),n()}),A?.addEventListener("click",()=>{u="scheduled",A.classList.add("active"),C?.classList.remove("active"),H&&(H.style.display="block"),ie(),n()}),R?.addEventListener("change",()=>{K&&(K.style.display="none"),n()}),b?.addEventListener("click",async()=>{if(u==="scheduled"){const ee=R?.value;if(!ee||new Date(ee).getTime()<=Date.now()){K&&(K.style.display="block");return}}const Z=u==="scheduled",Y=Z?new Date(R.value):new Date,oe=Z?`Confirma o agendamento para ${Y.toLocaleString("pt-BR")} com ${o.size} leads?`:`Deseja iniciar o disparo imediato para ${o.size} leads com ${r.length} variações de mensagem?`;if(await pe.warning(Z?"Agendar Campanha":"Iniciar Campanha",oe))try{b.disabled=!0,b.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';const ee={cliente_id:e,instancia_id:y.value,nome:h?.value?.trim()||`Campanha MB ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,mensagens:r,total_leads:o.size,lead_ids:Array.from(o),enviados:0,falhas:0,status:"agendada",agendamento_imediato:!Z,data_agendamento:_e.fromDate(Y),data_inicio:null,config:{delay_min:parseInt(document.getElementById("delay-min").value||"20"),delay_max:parseInt(document.getElementById("delay-max").value||"60")}};await T.create("campanhas",ee),w.success(Z?"Campanha agendada com sucesso!":"Campanha criada! O disparo será iniciado em instantes."),window.location.reload()}catch(ee){w.error("Erro ao salvar campanha: "+ee),b.disabled=!1,ie()}}),ae(),de()}function F(){document.querySelectorAll(".view-details").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.id,r=$.find(h=>h.id===l);r&&S(r)})}),document.querySelectorAll(".cancel-campaign").forEach(o=>{o.addEventListener("click",async()=>{const l=o.dataset.id;if(!$.find(y=>y.id===l))return;if(await pe.danger("Cancelar Campanha","Você tem certeza que deseja cancelar esta campanha? Ela será interrompida e nenhum outro envio será feito."))try{await T.update("campanhas",l,{status:"cancelada"}),w.success("Campanha cancelada com sucesso.")}catch(y){w.error("Erro ao cancelar a campanha."),console.error("Erro ao cancelar campanha:",y)}})});const d=document.getElementById("close-detail-modal"),s=document.getElementById("campaign-detail-modal");d?.addEventListener("click",()=>s?.classList.add("hidden"))}function S(d){const s=document.getElementById("campaign-detail-modal"),o=document.getElementById("campaign-detail-content");if(!s||!o)return;const l=d.total_leads>0?Math.round((d.enviados+d.falhas)/d.total_leads*100):0;o.innerHTML=`
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 2rem;">
                <div style="width: 48px; height: 48px; background: var(--primary); color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                    <i class="fa-solid fa-bullhorn"></i>
                </div>
                <div>
                    <h3 style="margin: 0;">${d.nome||"Detalhes da Campanha"}</h3>
                    <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">Iniciada em ${new Date(d.data_inicio.seconds*1e3).toLocaleString()}</p>
                </div>
            </div>

            <div class="lead-info-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div class="card" style="background: var(--surface-light); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Público Total</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-main);">${d.total_leads}</div>
                </div>
                <div class="card" style="background: rgba(34, 197, 94, 0.05); border-color: rgba(34, 197, 94, 0.2); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: #22c55e; text-transform: uppercase; margin-bottom: 0.5rem;">Sucesso</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #22c55e;">${d.enviados}</div>
                </div>
                <div class="card" style="background: rgba(239, 68, 68, 0.05); border-color: rgba(239, 68, 68, 0.2); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: #ef4444; text-transform: uppercase; margin-bottom: 0.5rem;">Falhas</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #ef4444;">${d.falhas}</div>
                </div>
                <div class="card" style="background: var(--surface-light); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Status</div>
                    <span class="badge ${d.status==="finalizada"?"success":"warning"}" style="font-size: 0.8rem;">${d.status.toUpperCase()}</span>
                </div>
            </div>

            <div style="margin-bottom: 2rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem;">
                    <span>Progresso do Envio</span>
                    <span>${l}%</span>
                </div>
                <div style="width: 100%; height: 12px; background: var(--surface-hover); border-radius: 6px; overflow: hidden; border: 1px solid var(--border-color);">
                    <div style="width: ${l}%; height: 100%; background: linear-gradient(90deg, var(--primary) 0%, #818cf8 100%); border-radius: 6px; transition: width 0.5s ease;"></div>
                </div>
            </div>

            <div class="card" style="background: var(--surface-hover); border: 1px solid var(--border-color); padding: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 1.25rem; color: var(--text-main); font-weight: 600;">
                    <i class="fa-solid fa-message text-primary"></i>
                    Variações de Mensagem
                    <span class="badge secondary" style="font-size: 0.75rem; margin-left: 4px;">${(d.mensagens||[d.mensagem]).filter(Boolean).length}</span>
                </div>
                ${(d.mensagens?.length?d.mensagens:d.mensagem?[d.mensagem]:["(sem mensagem)"]).map((r,h)=>`
                        <div style="
                            background: rgba(255,255,255,0.03);
                            border: 1px solid var(--border-color);
                            border-radius: 10px;
                            padding: 1rem 1.25rem;
                            margin-bottom: 0.75rem;
                            position: relative;
                        ">
                            <div style="font-size: 0.7rem; font-weight: 700; color: var(--primary); text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.05em;">
                                <i class="fa-solid fa-comment"></i> Mensagem #${h+1}
                            </div>
                            <div style="white-space: pre-wrap; font-size: 0.92rem; line-height: 1.65; color: var(--text-main); font-family: inherit;">${r}</div>
                        </div>
                    `).join("")}
            </div>
        `,s.classList.remove("hidden")}},De={agendado:{label:"Agendado",color:"#6366f1",icon:"fa-clock"},confirmado:{label:"Confirmado",color:"#10b981",icon:"fa-circle-check"},concluido:{label:"Concluído",color:"#64748b",icon:"fa-flag-checkered"},cancelado:{label:"Cancelado",color:"#ef4444",icon:"fa-ban"}},we=i=>String(i).padStart(2,"0"),Oe=i=>{const[e,f,k]=i.split("-");return`${k}/${f}/${e}`},Re=i=>i?.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})??"R$ 0,00",Ue=()=>{const i=new Date;return`${i.getFullYear()}-${we(i.getMonth()+1)}-${we(i.getDate())}`},et=async()=>{const i=ce.getCurrentUser();if(!i||!i.companyId)return"<p>Usuário sem empresa.</p>";const e=i.companyId;if(!((await T.get("companies",e))?.modulos_ativos||[]).includes("agendamento"))return`
            <div class="card" style="text-align:center; padding: 3rem;">
                <i class="fa-solid fa-calendar-xmark" style="font-size:3rem; color: var(--text-dim); margin-bottom:1rem; display:block;"></i>
                <h2>Módulo de Agendamento</h2>
                <p style="color:var(--text-muted);">O módulo de IA Agendamento não está ativo para esta conta.<br>Entre em contato com o administrador para ativá-lo.</p>
            </div>`;const $=(await T.getAll("products",{field:"companyId",operator:"==",value:e})).filter(a=>a.active!==!1),v=await T.getAll("clientes",{field:"companyId",operator:"==",value:e});v.sort((a,g)=>(a.nome||"").localeCompare(g.nome||""));let M=(await T.getAll("agendamentos",{field:"companyId",operator:"==",value:e})).map(a=>{const g=v.find(z=>z.id===a.clienteId);return{...a,clientName:g?.nome||a.clientName||"Cliente não identificado",clientPhone:g?.telefone||a.clientPhone||"—"}}),N=Ue(),_="day";const j=a=>{const g=new Date(a+"T12:00:00"),z=g.getDay(),O=new Date(g);return O.setDate(g.getDate()-((z===0?7:z)-1)),Array.from({length:7},(X,te)=>{const G=new Date(O);return G.setDate(O.getDate()+te),`${G.getFullYear()}-${we(G.getMonth()+1)}-${we(G.getDate())}`})},I=a=>M.filter(g=>g.date===a).sort((g,z)=>g.time.localeCompare(z.time)),U=a=>M.filter(g=>a.includes(g.date)).sort((g,z)=>g.date.localeCompare(z.date)||g.time.localeCompare(z.time)),F=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],S=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],d=a=>{const g=new Date(a+"T12:00:00");return F[g.getDay()]},s=a=>{const g=new Date(a+"T12:00:00");return`${S[g.getMonth()]} ${g.getFullYear()}`},o=a=>{const g=De[a]||De.agendado;return`<span class="sched-badge" style="background:${g.color}22;color:${g.color};border-color:${g.color}44;">
            <i class="fa-solid ${g.icon}"></i> ${g.label}
        </span>`},l=a=>{const g=De[a.status]||De.agendado;return`
        <div class="sched-card" data-id="${a.id}" style="border-left-color: ${g.color};">
            <div class="sched-card-time">
                <span class="sched-time">${a.time}</span>
                <span class="sched-duration">${a.duration||30}min</span>
            </div>
            <div class="sched-card-body">
                <div class="sched-client">
                    <i class="fa-solid fa-user"></i>
                    <strong>${a.clientName}</strong>
                    <span class="sched-phone"><i class="fa-brands fa-whatsapp"></i> ${a.clientPhone}</span>
                </div>
                <div class="sched-service">
                    <i class="fa-solid fa-list-check"></i>
                    <span>${a.serviceName}</span>
                    <span class="sched-price">${Re(a.servicePrice)}</span>
                </div>
                ${a.notes?`<div class="sched-notes"><i class="fa-solid fa-note-sticky"></i> ${a.notes}</div>`:""}
                ${o(a.status)}
            </div>
            <div class="sched-card-actions">
                ${a.status==="agendado"?`<button class="sched-action-btn confirm" onclick="window.confirmAppointment('${a.id}')" title="Confirmar"><i class="fa-solid fa-check"></i></button>`:""}
                ${a.status==="confirmado"?`<button class="sched-action-btn done" onclick="window.completeAppointment('${a.id}')" title="Concluir"><i class="fa-solid fa-flag-checkered"></i></button>`:""}
                <button class="sched-action-btn edit" onclick="window.editAppointment('${a.id}')" title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="sched-action-btn cancel" onclick="window.cancelAppointment('${a.id}')" title="Cancelar/Excluir"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`},r=()=>{const a=I(N),g=a.reduce((z,O)=>z+(O.servicePrice||0),0);return`
        <div class="sched-day-header">
            <button class="sched-nav-btn" id="prev-day"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="sched-day-info">
                <span class="sched-day-name">${d(N)}</span>
                <span class="sched-day-date">${Oe(N)}</span>
                <span class="sched-day-month">${s(N)}</span>
            </div>
            <button class="sched-nav-btn" id="next-day"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div class="sched-stats-row">
            <div class="sched-stat"><i class="fa-solid fa-calendar-check"></i> <strong>${a.length}</strong> agendamentos</div>
            <div class="sched-stat"><i class="fa-solid fa-dollar-sign"></i> <strong>${Re(g)}</strong> previsão</div>
            <div class="sched-stat"><i class="fa-solid fa-circle-check" style="color:#10b981"></i> <strong>${a.filter(z=>z.status==="confirmado").length}</strong> confirmados</div>
        </div>
        <div class="sched-appointments-list" id="appointments-list">
            ${a.length===0?`
            <div class="sched-empty">
                <i class="fa-solid fa-calendar-xmark"></i>
                <p>Nenhum agendamento para este dia.</p>
                <button class="btn-primary" id="btn-add-for-day" style="margin-top:1rem;">
                    <i class="fa-solid fa-plus"></i> Novo Agendamento
                </button>
            </div>`:a.map(l).join("")}
        </div>`},h=()=>{const a=j(N),g=U(a);return`
        <div class="sched-week-header">
            <button class="sched-nav-btn" id="prev-week"><i class="fa-solid fa-chevron-left"></i></button>
            <span class="sched-week-label">Semana de ${Oe(a[0])} a ${Oe(a[6])}</span>
            <button class="sched-nav-btn" id="next-week"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div class="sched-week-grid">
            ${a.map(z=>{const O=g.filter(G=>G.date===z);return`
                <div class="sched-week-col ${z===Ue()?"today":""} ${z===N?"selected":""}" data-date="${z}" onclick="window.selectWeekDay('${z}')">
                    <div class="sched-week-col-header">
                        <span class="sched-wday">${d(z)}</span>
                        <span class="sched-wdate">${z.split("-")[2]}</span>
                        ${O.length>0?`<span class="sched-wcount">${O.length}</span>`:""}
                    </div>
                    <div class="sched-week-appts">
                        ${O.map(G=>`<div class="sched-week-item" style="border-left-color:${(De[G.status]||De.agendado).color};" onclick="event.stopPropagation(); window.editAppointment('${G.id}')">
                                <span class="sched-wtime">${G.time}</span>
                                <span class="sched-wclient">${G.clientName}</span>
                            </div>`).join("")}
                    </div>
                </div>`}).join("")}
        </div>`},y=()=>{const a=[...M].sort((O,X)=>O.date.localeCompare(X.date)||O.time.localeCompare(X.time)),g=a.filter(O=>O.date>=Ue()&&O.status!=="cancelado"),z=a.filter(O=>O.date<Ue()||O.status==="cancelado");return`
        <div class="sched-list-section">
            <div class="sched-list-title"><i class="fa-solid fa-clock"></i> Próximos agendamentos (${g.length})</div>
            ${g.length===0?'<p style="color:var(--text-dim);padding:1rem;">Nenhum agendamento futuro.</p>':""}
            ${g.map(O=>`
                <div class="sched-list-row">
                    <div class="sched-list-date">
                        <span>${Oe(O.date)}</span>
                        <span>${O.time}</span>
                    </div>
                    <div class="sched-list-info">
                        <strong>${O.clientName}</strong>
                        <span>${O.serviceName}</span>
                    </div>
                    <div>${Re(O.servicePrice)}</div>
                    <div>${o(O.status)}</div>
                    <div class="sched-list-actions">
                        ${O.status==="agendado"?`<button class="sched-action-btn confirm" onclick="window.confirmAppointment('${O.id}')" title="Confirmar"><i class="fa-solid fa-check"></i></button>`:""}
                        <button class="sched-action-btn edit" onclick="window.editAppointment('${O.id}')" title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="sched-action-btn cancel" onclick="window.cancelAppointment('${O.id}')" title="Excluir"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>`).join("")}
        </div>
        ${z.length>0?`
        <div class="sched-list-section" style="margin-top:2rem; opacity:0.7;">
            <div class="sched-list-title"><i class="fa-solid fa-history"></i> Histórico (${z.length})</div>
            ${z.slice(0,10).map(O=>`
                <div class="sched-list-row">
                    <div class="sched-list-date"><span>${Oe(O.date)}</span><span>${O.time}</span></div>
                    <div class="sched-list-info"><strong>${O.clientName}</strong><span>${O.serviceName}</span></div>
                    <div>${Re(O.servicePrice)}</div>
                    <div>${o(O.status)}</div>
                    <div style="width:60px;"></div>
                </div>`).join("")}
        </div>`:""}`},b=Array.from({length:28},(a,g)=>{const z=Math.floor(g/2)+8,O=g%2===0?"00":"30";return`${we(z)}:${O}`}),L=`
    <div id="sched-modal" class="modal hidden">
        <div class="modal-content glass" style="max-width:560px; width:95%;">
            <span class="close-modal" id="close-sched-modal">&times;</span>
            <h2 id="sched-modal-title" style="margin-bottom:0.25rem;">Novo Agendamento</h2>
            <p class="text-muted" style="font-size:0.9rem; margin-bottom:1.5rem;">Preencha os dados do agendamento.</p>

            <div style="display:grid; gap:1rem;">
                <div class="form-group">
                    <label class="form-label">Cliente <span style="color:#ef4444;">*</span></label>
                    <select id="sched-client-select" class="form-input">
                        <option value="">Selecione um cliente...</option>
                        ${v.map(a=>`<option value="${a.id}" data-nome="${a.nome}" data-phone="${a.telefone||""}">${a.nome}${a.telefone?" — "+a.telefone:""}</option>`).join("")}
                    </select>
                    ${v.length===0?'<p style="font-size:0.8rem;color:#f59e0b;margin-top:4px;"><i class="fa-solid fa-triangle-exclamation"></i> Nenhum cliente cadastrado. <a href="/schedule-clients" style="color:#6366f1;">Cadastrar clientes</a></p>':""}
                </div>
                <div class="form-group">
                    <label class="form-label">Serviço</label>
                    <select id="sched-service" class="form-input">
                        <option value="">Selecione um serviço...</option>
                        ${$.map(a=>`<option value="${a.id}" data-price="${a.price}" data-duration="${a.duration||30}">${a.name} — ${Re(a.price)}</option>`).join("")}
                    </select>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                    <div class="form-group">
                        <label class="form-label">Data</label>
                        <input type="date" id="sched-date" class="form-input" value="${N}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Horário</label>
                        <select id="sched-time" class="form-input">
                            ${b.map(a=>`<option value="${a}">${a}</option>`).join("")}
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Duração (minutos)</label>
                    <input type="number" id="sched-duration" class="form-input" value="30" min="15" max="480" step="15">
                </div>
                <div class="form-group">
                    <label class="form-label">Status</label>
                    <select id="sched-status" class="form-input">
                        <option value="agendado">⏰ Agendado</option>
                        <option value="confirmado">✅ Confirmado</option>
                        <option value="concluido">🏁 Concluído</option>
                        <option value="cancelado">❌ Cancelado</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Observações</label>
                    <textarea id="sched-notes" class="form-input" rows="3" style="resize:vertical;" placeholder="Alguma informação extra..."></textarea>
                </div>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--border-color);">
                <button class="btn-secondary" id="cancel-sched-modal">Cancelar</button>
                <button class="btn-primary" id="save-sched-btn" style="min-width:140px;">
                    <i class="fa-solid fa-save"></i> Salvar
                </button>
            </div>
        </div>
    </div>`;setTimeout(()=>Q(),100);const p=()=>{const a=document.getElementById("sched-view-content");a&&(_==="day"?a.innerHTML=r():_==="week"?a.innerHTML=h():a.innerHTML=y(),E())},E=()=>{document.getElementById("prev-day")?.addEventListener("click",()=>{const a=new Date(N+"T12:00:00");a.setDate(a.getDate()-1),N=`${a.getFullYear()}-${we(a.getMonth()+1)}-${we(a.getDate())}`,p()}),document.getElementById("next-day")?.addEventListener("click",()=>{const a=new Date(N+"T12:00:00");a.setDate(a.getDate()+1),N=`${a.getFullYear()}-${we(a.getMonth()+1)}-${we(a.getDate())}`,p()}),document.getElementById("prev-week")?.addEventListener("click",()=>{const a=new Date(N+"T12:00:00");a.setDate(a.getDate()-7),N=`${a.getFullYear()}-${we(a.getMonth()+1)}-${we(a.getDate())}`,p()}),document.getElementById("next-week")?.addEventListener("click",()=>{const a=new Date(N+"T12:00:00");a.setDate(a.getDate()+7),N=`${a.getFullYear()}-${we(a.getMonth()+1)}-${we(a.getDate())}`,p()}),document.getElementById("btn-add-for-day")?.addEventListener("click",()=>{D()})};function D(a){const g=document.getElementById("sched-modal");if(!g)return;const z=document.getElementById("sched-modal-title"),O=document.getElementById("sched-client-select"),X=document.getElementById("sched-service"),te=document.getElementById("sched-date"),G=document.getElementById("sched-time"),W=document.getElementById("sched-duration"),ae=document.getElementById("sched-status"),de=document.getElementById("sched-notes"),n=document.getElementById("save-sched-btn");if(a){z.innerText="Editar Agendamento";const u=a.clienteId||"";if(O)if(u)O.value=u;else{const C=Array.from(O.options).find(A=>A.dataset.nome===a.clientName);O.value=C?C.value:""}X.value=a.serviceId,te.value=a.date,G.value=a.time,W.value=String(a.duration||30),ae.value=a.status,de.value=a.notes||"",n.setAttribute("data-edit-id",a.id)}else z.innerText="Novo Agendamento",O&&(O.value=""),X.value="",te.value=N,G.value="09:00",W.value="30",ae.value="agendado",de.value="",n.removeAttribute("data-edit-id");g.classList.remove("hidden")}function Q(){document.getElementById("btn-new-appointment")?.addEventListener("click",()=>D()),document.getElementById("close-sched-modal")?.addEventListener("click",()=>{document.getElementById("sched-modal")?.classList.add("hidden")}),document.getElementById("cancel-sched-modal")?.addEventListener("click",()=>{document.getElementById("sched-modal")?.classList.add("hidden")}),document.getElementById("sched-service")?.addEventListener("change",a=>{const g=a.target,O=g.options[g.selectedIndex].dataset.duration;O&&(document.getElementById("sched-duration").value=O)}),document.getElementById("save-sched-btn")?.addEventListener("click",async()=>{const a=document.getElementById("sched-client-select"),g=document.getElementById("sched-service"),z=document.getElementById("sched-date"),O=document.getElementById("sched-time"),X=document.getElementById("sched-duration"),te=document.getElementById("sched-status"),G=document.getElementById("sched-notes"),W=document.getElementById("save-sched-btn");if(!a.value){w.warning("Selecione um cliente.");return}if(!g.value){w.warning("Selecione um serviço.");return}if(!z.value){w.warning("Informe a data.");return}const ae=a.options[a.selectedIndex],de=a.value,n=ae.dataset.nome||ae.text.split(" — ")[0],u=ae.dataset.phone||"",C=g.options[g.selectedIndex],A={serviceId:g.value,serviceName:C.text.split(" — ")[0],servicePrice:parseFloat(C.dataset.price||"0")},H={companyId:e,clienteId:de,clientName:n,clientPhone:u,...A,date:z.value,time:O.value,duration:parseInt(X.value)||30,status:te.value,notes:G.value.trim()||void 0},R=W.getAttribute("data-edit-id");W.disabled=!0,W.innerHTML='<div class="spinner-small"></div> Salvando...';try{if(R){await T.update("agendamentos",R,H);const K=M.findIndex(ie=>ie.id===R);K!==-1&&(M[K]={id:R,...H}),w.success("Agendamento atualizado!")}else{const K=await T.create("agendamentos",H);M.push({id:K,...H}),w.success("Agendamento criado com sucesso!")}document.getElementById("sched-modal")?.classList.add("hidden"),p()}catch(K){w.error("Erro ao salvar agendamento: "+K)}finally{W.disabled=!1,W.innerHTML='<i class="fa-solid fa-save"></i> Salvar'}}),document.querySelectorAll(".sched-view-tab").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".sched-view-tab").forEach(g=>g.classList.remove("active")),a.classList.add("active"),_=a.dataset.view,p()})}),document.getElementById("sched-date-jump")?.addEventListener("change",a=>{N=a.target.value,p()}),document.getElementById("btn-today")?.addEventListener("click",()=>{N=Ue(),document.getElementById("sched-date-jump").value=N,p()}),window.editAppointment=a=>{const g=M.find(z=>z.id===a);g&&D(g)},window.confirmAppointment=async a=>{try{await T.update("agendamentos",a,{status:"confirmado"});const g=M.find(z=>z.id===a);g&&(g.status="confirmado"),p(),w.success("Agendamento confirmado!")}catch{w.error("Erro ao confirmar.")}},window.completeAppointment=async a=>{try{await T.update("agendamentos",a,{status:"concluido"});const g=M.find(z=>z.id===a);g&&(g.status="concluido"),p(),w.success("Agendamento concluído!")}catch{w.error("Erro ao concluir.")}},window.cancelAppointment=async a=>{if(await pe.danger("Excluir Agendamento","Deseja excluir este agendamento? Esta ação não pode ser desfeita."))try{await T.delete("agendamentos",a),M=M.filter(z=>z.id!==a),p(),w.success("Agendamento excluído.")}catch{w.error("Erro ao excluir.")}},window.selectWeekDay=a=>{N=a,_="day",document.querySelectorAll(".sched-view-tab").forEach(g=>{g.classList.toggle("active",g.dataset.view==="day")}),document.getElementById("sched-date-jump").value=a,p()},p()}return`
    <style>
        /* ── Schedule page styles ── */
        .sched-toolbar {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
        }
        .sched-view-tabs {
            display: flex;
            background: var(--surface-hover);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 3px;
            gap: 2px;
        }
        .sched-view-tab {
            padding: 6px 16px;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--text-muted);
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .sched-view-tab:hover { color: var(--text-main); background: rgba(255,255,255,0.05); }
        .sched-view-tab.active { background: var(--primary); color: #fff; box-shadow: 0 2px 8px var(--primary-glow); }

        .sched-date-jump { background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 8px; padding: 6px 12px; color: var(--text-main); font-size:0.85rem; cursor:pointer; }

        .sched-nav-btn { width:36px; height:36px; border-radius:8px; background:var(--surface-hover); border:1px solid var(--border-color); color:var(--text-main); display:flex;align-items:center;justify-content:center; transition:all 0.2s; }
        .sched-nav-btn:hover { background: var(--primary); color: #fff; border-color: var(--primary); }

        /* Day view */
        .sched-day-header { display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem; }
        .sched-day-info { text-align:center; flex:1; }
        .sched-day-name { display:block; font-size:0.8rem; font-weight:700; text-transform:uppercase; color:var(--text-dim); letter-spacing:1px; }
        .sched-day-date { display:block; font-size:2rem; font-weight:800; color:var(--text-main); line-height:1; margin: 2px 0; }
        .sched-day-month { display:block; font-size:0.9rem; color:var(--text-muted); }

        .sched-stats-row { display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap; }
        .sched-stat { display:flex; align-items:center; gap:8px; background:var(--surface-hover); border:1px solid var(--border-color); border-radius:10px; padding:10px 16px; font-size:0.9rem; color:var(--text-muted); flex:1; min-width:140px; }
        .sched-stat strong { color:var(--text-main); }

        .sched-appointments-list { display:flex; flex-direction:column; gap:0.75rem; }
        .sched-empty { text-align:center; padding:4rem 2rem; color:var(--text-dim); }
        .sched-empty i { font-size:3rem; margin-bottom:1rem; display:block; opacity:0.4; }

        /* Appointment card */
        .sched-card { display:flex; gap:1rem; background:var(--surface-hover); border:1px solid var(--border-color); border-left:4px solid var(--primary); border-radius:12px; padding:1rem 1.25rem; transition:all 0.2s; align-items:flex-start; }
        .sched-card:hover { border-color: rgba(99,102,241,0.4); transform:translateX(2px); }
        .sched-card-time { display:flex; flex-direction:column; align-items:center; min-width:55px; }
        .sched-time { font-size:1.2rem; font-weight:800; color:var(--text-main); }
        .sched-duration { font-size:0.72rem; color:var(--text-dim); background:rgba(255,255,255,0.06); padding:2px 6px; border-radius:4px; margin-top:4px; }

        .sched-card-body { flex:1; display:flex; flex-direction:column; gap:6px; }
        .sched-client { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .sched-client strong { font-size:1rem; color:var(--text-main); }
        .sched-phone { font-size:0.8rem; color:var(--text-dim); display:flex; align-items:center; gap:4px; }
        .sched-service { display:flex; align-items:center; gap:8px; font-size:0.9rem; color:var(--text-muted); }
        .sched-price { font-weight:700; color:var(--text-main); margin-left:auto; }
        .sched-notes { font-size:0.82rem; color:var(--text-dim); background:rgba(255,255,255,0.03); padding:4px 8px; border-radius:6px; border:1px solid var(--border-color); }

        .sched-badge { display:inline-flex; align-items:center; gap:5px; font-size:0.75rem; font-weight:700; padding:3px 10px; border-radius:20px; border:1px solid; width:fit-content; margin-top:4px; }

        .sched-card-actions { display:flex; flex-direction:column; gap:6px; }
        .sched-action-btn { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:0.85rem; transition:all 0.2s; border:1px solid var(--border-color); background:var(--surface-hover); color:var(--text-muted); }
        .sched-action-btn:hover { transform:scale(1.1); }
        .sched-action-btn.confirm:hover { background:#10b98122; color:#10b981; border-color:#10b981; }
        .sched-action-btn.done:hover { background:#6366f122; color:#6366f1; border-color:#6366f1; }
        .sched-action-btn.edit:hover { background:#f59e0b22; color:#f59e0b; border-color:#f59e0b; }
        .sched-action-btn.cancel:hover { background:#ef444422; color:#ef4444; border-color:#ef4444; }

        /* Week view */
        .sched-week-header { display:flex; align-items:center; gap:1rem; justify-content:space-between; margin-bottom:1.25rem; }
        .sched-week-label { font-size:0.95rem; font-weight:700; color:var(--text-main); }
        .sched-week-grid { display:grid; grid-template-columns:repeat(7, 1fr); gap:8px; }
        .sched-week-col { background:var(--surface-hover); border:1px solid var(--border-color); border-radius:10px; overflow:hidden; cursor:pointer; transition:all 0.2s; min-height:160px; }
        .sched-week-col:hover { border-color:rgba(99,102,241,0.4); }
        .sched-week-col.today .sched-week-col-header { background:rgba(99,102,241,0.15); }
        .sched-week-col.selected { border-color:var(--primary); box-shadow:0 0 0 1px var(--primary); }
        .sched-week-col-header { padding:8px 10px; display:flex; flex-direction:column; align-items:center; border-bottom:1px solid var(--border-color); position:relative; }
        .sched-wday { font-size:0.7rem; font-weight:700; text-transform:uppercase; color:var(--text-dim); letter-spacing:0.5px; }
        .sched-wdate { font-size:1.4rem; font-weight:800; color:var(--text-main); }
        .sched-wcount { position:absolute; top:6px; right:8px; background:var(--primary); color:#fff; border-radius:50%; width:18px; height:18px; font-size:0.7rem; font-weight:700; display:flex; align-items:center; justify-content:center; }
        .sched-week-appts { padding:6px; display:flex; flex-direction:column; gap:4px; }
        .sched-week-item { background:rgba(99,102,241,0.1); border:1px solid rgba(99,102,241,0.2); border-left:3px solid; border-radius:6px; padding:4px 6px; font-size:0.75rem; cursor:pointer; transition:all 0.15s; }
        .sched-week-item:hover { background:rgba(99,102,241,0.2); }
        .sched-wtime { font-weight:700; color:var(--text-main); display:block; }
        .sched-wclient { color:var(--text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; display:block; }

        /* List view */
        .sched-list-section { background:var(--surface-hover); border:1px solid var(--border-color); border-radius:12px; overflow:hidden; }
        .sched-list-title { padding:1rem 1.25rem; font-weight:700; display:flex; align-items:center; gap:8px; border-bottom:1px solid var(--border-color); color:var(--text-main); background:rgba(255,255,255,0.02); }
        .sched-list-row { display:grid; grid-template-columns:100px 1fr auto auto auto; align-items:center; gap:1rem; padding:0.75rem 1.25rem; border-bottom:1px solid var(--border-color); transition:background 0.2s; }
        .sched-list-row:last-child { border-bottom:none; }
        .sched-list-row:hover { background:rgba(255,255,255,0.03); }
        .sched-list-date { display:flex; flex-direction:column; font-size:0.85rem; }
        .sched-list-date span:first-child { font-weight:700; color:var(--text-main); }
        .sched-list-date span:last-child { color:var(--text-dim); }
        .sched-list-info { display:flex; flex-direction:column; }
        .sched-list-info strong { color:var(--text-main); font-size:0.95rem; }
        .sched-list-info span { color:var(--text-muted); font-size:0.82rem; }
        .sched-list-actions { display:flex; gap:6px; }

        /* Spinner */
        .spinner-small { width:18px; height:18px; border:2px solid rgba(255,255,255,0.3); border-top-color:white; border-radius:50%; animation:spin 0.8s linear infinite; display:inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>

    <div class="page-header" style="justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <div>
            <h2 class="page-title" style="margin-bottom:4px;">
                <i class="fa-solid fa-calendar-alt" style="color:var(--primary); margin-right:10px;"></i>Agenda
            </h2>
            <p style="color:var(--text-muted); font-size:0.9rem;">Gerencie os agendamentos dos seus clientes.</p>
        </div>
        <button id="btn-new-appointment" class="btn-primary">
            <i class="fa-solid fa-plus"></i> Novo Agendamento
        </button>
    </div>

    <div class="sched-toolbar">
        <div class="sched-view-tabs">
            <button class="sched-view-tab active" data-view="day"><i class="fa-solid fa-calendar-day"></i> Dia</button>
            <button class="sched-view-tab" data-view="week"><i class="fa-solid fa-calendar-week"></i> Semana</button>
            <button class="sched-view-tab" data-view="list"><i class="fa-solid fa-list"></i> Lista</button>
        </div>
        <input type="date" id="sched-date-jump" class="sched-date-jump" value="${N}" title="Ir para data">
        <button id="btn-today" class="btn-secondary" style="padding:6px 14px; font-size:0.85rem;">
            <i class="fa-solid fa-crosshairs"></i> Hoje
        </button>
    </div>

    <div class="card" style="padding:1.5rem;" id="sched-view-content">
        <!-- Dynamically rendered -->
    </div>

    ${L}`},at=i=>{if(!i)return"—";try{return new Date(i).toLocaleDateString("pt-BR")}catch{return i}},tt=async()=>{const i=ce.getCurrentUser();if(!i||!i.companyId)return"<p>Usuário sem empresa.</p>";const e=i.companyId;if(!((await T.get("companies",e))?.modulos_ativos||[]).includes("agendamento"))return`
            <div class="card" style="text-align:center; padding: 3rem;">
                <i class="fa-solid fa-users-slash" style="font-size:3rem; color: var(--text-dim); margin-bottom:1rem; display:block;"></i>
                <h2>Módulo de Agendamento</h2>
                <p style="color:var(--text-muted);">O módulo de IA Agendamento não está ativo para esta conta.<br>Entre em contato com o administrador para ativá-lo.</p>
            </div>`;let m=await T.getAll("clientes",{field:"companyId",operator:"==",value:e});const $=await T.getAll("agendamentos",{field:"companyId",operator:"==",value:e}),v=new Map;$.forEach(d=>{const s=d.clienteId;if(!s)return;const o=v.get(s),l=d.date||"";o?v.set(s,{count:o.count+1,ultimo:l>o.ultimo?l:o.ultimo}):v.set(s,{count:1,ultimo:l})});let x="";const M=d=>d.length===0?`
            <tr>
                <td colspan="5" style="text-align:center;padding:2.5rem;color:var(--text-muted);">
                    <i class="fa-solid fa-users-slash" style="font-size:2rem;display:block;margin-bottom:0.75rem;opacity:0.4;"></i>
                    Nenhum cliente encontrado.
                </td>
            </tr>`:d.map(s=>{const o=v.get(s.id),l=o?.count??0,r=o?.ultimo?at(o.ultimo):"—",h=(s.nome||s.telefone||"C")[0].toUpperCase();return`
            <tr data-client-id="${s.id}">
                <td>
                    <div style="display:flex;align-items:center;gap:0.75rem;">
                        <div class="sc-avatar">${h}</div>
                        <div>
                            <div style="font-weight:600;">${s.nome||"Sem nome"}</div>
                            <div style="font-size:0.78rem;color:var(--text-muted);">${s.email||""}</div>
                        </div>
                    </div>
                </td>
                <td style="color:var(--text-muted);font-size:0.9rem;">${s.telefone||"—"}</td>
                <td style="text-align:center;">
                    <span class="sc-badge">${l}</span>
                </td>
                <td style="color:var(--text-muted);font-size:0.85rem;">${r}</td>
                <td>
                    <div style="display:flex;gap:8px;">
                        <button class="sc-action-btn edit" title="Editar" data-edit-id="${s.id}">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="sc-action-btn del" title="Excluir" data-del-id="${s.id}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`}).join(""),N=()=>{if(!x)return m;const d=x.toLowerCase();return m.filter(s=>(s.nome||"").toLowerCase().includes(d)||(s.telefone||"").toLowerCase().includes(d)||(s.email||"").toLowerCase().includes(d))},_=`
    <div id="sc-modal" class="modal hidden">
        <div class="modal-content glass" style="max-width:520px;width:95%;">
            <span class="close-modal" id="sc-modal-close">&times;</span>
            <h2 id="sc-modal-title" style="margin-bottom:0.25rem;">Novo Cliente</h2>
            <p class="text-muted" style="font-size:0.9rem;margin-bottom:1.5rem;">Preencha os dados do cliente.</p>
            <div style="display:grid;gap:1rem;">
                <div class="form-group">
                    <label class="form-label">Nome <span style="color:#ef4444;">*</span></label>
                    <input type="text" id="sc-nome" class="form-input" placeholder="Nome completo do cliente">
                </div>
                <div class="form-group">
                    <label class="form-label">Telefone / WhatsApp <span style="color:#ef4444;">*</span></label>
                    <input type="tel" id="sc-telefone" class="form-input" placeholder="Ex: 11999999999">
                </div>
                <div class="form-group">
                    <label class="form-label">E-mail</label>
                    <input type="email" id="sc-email" class="form-input" placeholder="cliente@email.com">
                </div>
                <div class="form-group">
                    <label class="form-label">Observações</label>
                    <textarea id="sc-obs" class="form-input" rows="3" style="resize:vertical;" placeholder="Informações extras sobre o cliente..."></textarea>
                </div>
            </div>
            <div style="display:flex;justify-content:flex-end;gap:0.75rem;margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--border-color);">
                <button class="btn-secondary" id="sc-modal-cancel">Cancelar</button>
                <button class="btn-primary" id="sc-save-btn" style="min-width:140px;">
                    <i class="fa-solid fa-save"></i> Salvar
                </button>
            </div>
        </div>
    </div>`;setTimeout(()=>S(),100);function j(d){const s=document.getElementById("sc-modal");if(!s)return;const o=document.getElementById("sc-modal-title"),l=document.getElementById("sc-nome"),r=document.getElementById("sc-telefone"),h=document.getElementById("sc-email"),y=document.getElementById("sc-obs"),b=document.getElementById("sc-save-btn");d?(o.textContent="Editar Cliente",l.value=d.nome||"",r.value=d.telefone||"",h.value=d.email||"",y.value=d.observacoes||"",b.setAttribute("data-edit-id",d.id)):(o.textContent="Novo Cliente",l.value="",r.value="",h.value="",y.value="",b.removeAttribute("data-edit-id")),s.classList.remove("hidden"),l.focus()}function I(){document.getElementById("sc-modal")?.classList.add("hidden")}const U=()=>{const d=document.getElementById("sc-tbody");d&&(d.innerHTML=M(N())),F()};function F(){document.querySelectorAll(".sc-action-btn.edit").forEach(d=>{d.addEventListener("click",()=>{const s=d.dataset.editId,o=m.find(l=>l.id===s);o&&j(o)})}),document.querySelectorAll(".sc-action-btn.del").forEach(d=>{d.addEventListener("click",async()=>{const s=d.dataset.delId,o=m.find(r=>r.id===s);if(await pe.danger("Excluir Cliente",`Deseja excluir o cliente "${o?.nome||s}"? Esta ação não pode ser desfeita.`))try{await T.delete("clientes",s),m=m.filter(r=>r.id!==s),U(),w.success("Cliente excluído.")}catch{w.error("Erro ao excluir cliente.")}})})}function S(){document.getElementById("btn-new-client")?.addEventListener("click",()=>j()),document.getElementById("sc-modal-close")?.addEventListener("click",I),document.getElementById("sc-modal-cancel")?.addEventListener("click",I),document.getElementById("sc-modal")?.addEventListener("click",d=>{d.target===document.getElementById("sc-modal")&&I()}),document.getElementById("sc-search")?.addEventListener("input",d=>{x=d.target.value,U()}),document.getElementById("sc-save-btn")?.addEventListener("click",async()=>{const d=document.getElementById("sc-nome"),s=document.getElementById("sc-telefone"),o=document.getElementById("sc-email"),l=document.getElementById("sc-obs"),r=document.getElementById("sc-save-btn"),h=d.value.trim(),y=s.value.trim().replace(/\D/g,"");if(!h){w.warning("Informe o nome do cliente.");return}if(!y){w.warning("Informe o telefone do cliente.");return}const b={companyId:e,nome:h,telefone:y,email:o.value.trim()||"",observacoes:l.value.trim()||"",criadoEm:new Date().toISOString()},L=r.getAttribute("data-edit-id");r.disabled=!0,r.innerHTML='<div class="spinner-small"></div> Salvando...';try{if(L){await T.update("clientes",L,b);const p=m.findIndex(E=>E.id===L);p!==-1&&(m[p]={id:L,...b}),w.success("Cliente atualizado!")}else{const p=await T.create("clientes",b);m.push({id:p,...b}),w.success("Cliente criado com sucesso!")}I(),U()}catch(p){w.error("Erro ao salvar cliente: "+p)}finally{r.disabled=!1,r.innerHTML='<i class="fa-solid fa-save"></i> Salvar'}}),U()}return`
    <style>
        .sc-avatar {
            width: 38px; height: 38px; border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), #8b5cf6);
            color: #fff; font-weight: 800; font-size: 1rem;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
        }
        .sc-badge {
            display: inline-flex; align-items: center; justify-content: center;
            background: rgba(99,102,241,0.12); color: #6366f1;
            border: 1px solid rgba(99,102,241,0.25);
            border-radius: 20px; padding: 2px 10px;
            font-size: 0.8rem; font-weight: 700;
        }
        .sc-action-btn {
            width: 32px; height: 32px; border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            font-size: 0.85rem; transition: all 0.2s;
            border: 1px solid var(--border-color);
            background: var(--surface-hover);
            color: var(--text-muted);
            cursor: pointer;
        }
        .sc-action-btn.edit:hover { background:#f59e0b22; color:#f59e0b; border-color:#f59e0b; }
        .sc-action-btn.del:hover  { background:#ef444422; color:#ef4444; border-color:#ef4444; }
        .sc-search-wrap {
            position: relative; flex: 1; min-width: 200px; max-width: 360px;
        }
        .sc-search-wrap i {
            position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
            color: var(--text-dim); font-size: 0.85rem;
        }
        .sc-search-input {
            width: 100%; padding: 8px 12px 8px 36px;
            background: var(--surface-hover); border: 1px solid var(--border-color);
            border-radius: 10px; color: var(--text-main); font-size: 0.9rem;
        }
        .sc-search-input:focus { outline: none; border-color: var(--primary); }
        .spinner-small { width:18px; height:18px; border:2px solid rgba(255,255,255,0.3); border-top-color:white; border-radius:50%; animation:spin 0.8s linear infinite; display:inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>

    <div class="page-header" style="justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
        <div>
            <h2 class="page-title" style="margin-bottom:4px;">
                <i class="fa-solid fa-users" style="color:var(--primary);margin-right:10px;"></i>Clientes
            </h2>
            <p style="color:var(--text-muted);font-size:0.9rem;">Gerencie os clientes cadastrados para agendamento.</p>
        </div>
        <button id="btn-new-client" class="btn-primary">
            <i class="fa-solid fa-user-plus"></i> Novo Cliente
        </button>
    </div>

    <div class="card" style="padding:1.5rem;">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.25rem;flex-wrap:wrap;">
            <div class="sc-search-wrap">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="sc-search" class="sc-search-input" placeholder="Buscar por nome, telefone ou e-mail...">
            </div>
            <span id="sc-count" style="color:var(--text-dim);font-size:0.85rem;margin-left:auto;">
                ${m.length} cliente${m.length!==1?"s":""}
            </span>
        </div>

        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Telefone</th>
                        <th style="text-align:center;">Agendamentos</th>
                        <th>Último Agend.</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="sc-tbody">
                    <!-- preenchido via JS -->
                </tbody>
            </table>
        </div>
    </div>

    ${_}`},ot=async()=>{let i={atendimento:"",agendamento:"",venda:"",disparo:""};try{const f=await T.get("settings","webhooks");f&&(i={...i,...f})}catch(f){console.error("Error loading webhooks:",f)}const e=`
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80vh; padding: 2rem; width: 100%;">
            <div style="text-align: center !important; margin-bottom: 2rem; width: 100%;">
                <h2 style="font-size: 1.8rem; font-weight: 700; color: var(--text-primary); margin: 0; text-align: center !important;">Configuração de Webhooks (Global)</h2>
            </div>

            <div class="card" style="width: 100%; max-width: 600px; margin: 0 auto;">
                <div style="padding: 2rem;">
                    <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 0.9rem; text-align: center;">
                    Configure as URLs dos webhooks que serão chamados por cada módulo do sistema. 
                    Estas configurações são globais e afetam todos os clientes.
                </p>

                <form id="webhooks-form">
                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">IA de Atendimento</label>
                        <input type="url" id="webhook-atendimento" placeholder="https://seu-webhook.com/atendimento" 
                               value="${i.atendimento}" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); background: var(--surface-hover); color: var(--text-primary);">
                    </div>

                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">IA de Agendamento</label>
                        <input type="url" id="webhook-agendamento" placeholder="https://seu-webhook.com/agendamento" 
                               value="${i.agendamento}" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); background: var(--surface-hover); color: var(--text-primary);">
                    </div>

                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">IA de Venda</label>
                        <input type="url" id="webhook-venda" placeholder="https://seu-webhook.com/venda" 
                               value="${i.venda}" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); background: var(--surface-hover); color: var(--text-primary);">
                    </div>

                    <div class="form-group" style="margin-bottom: 2rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Disparo em Massa</label>
                        <input type="url" id="webhook-disparo" placeholder="https://seu-webhook.com/disparo" 
                               value="${i.disparo}" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); background: var(--surface-hover); color: var(--text-primary);">
                    </div>

                    <button type="submit" class="btn-primary" style="padding: 1rem 2rem;">
                        <i class="fa-solid fa-save" style="margin-right: 8px;"></i> Salvar Configurações
                    </button>
                </form>
            </div>
        </div>
    </div>
    `;return setTimeout(()=>{const f=document.getElementById("webhooks-form");f&&(f.onsubmit=async k=>{k.preventDefault();const m=f.querySelector('button[type="submit"]');m.disabled=!0,m.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Salvando...';const $={atendimento:document.getElementById("webhook-atendimento").value,agendamento:document.getElementById("webhook-agendamento").value,venda:document.getElementById("webhook-venda").value,disparo:document.getElementById("webhook-disparo").value,updatedAt:new Date};try{await T.set("settings","webhooks",$),w.success("Webhooks atualizados com sucesso!")}catch(v){console.error("Error saving webhooks:",v),w.error("Erro ao salvar configurações.")}finally{m.disabled=!1,m.innerHTML='<i class="fa-solid fa-save" style="margin-right: 8px;"></i> Salvar Configurações'}})},100),e};async function ea(){const i={"Content-Type":"application/json"},e=La.currentUser;if(e)try{i.Authorization=`Bearer ${await e.getIdToken()}`}catch{}return i}const it=async()=>{const i=ce.getCurrentUser();if(!i||!i.companyId)return"<p>Acesso negado.</p>";let e=!1,f="";try{const m=await(await fetch(`${Ve}/api/mp/status`,{headers:await ea()})).json().catch(()=>({}));e=!!m.connected,f=m.userId||""}catch{}return window.disconnectMercadoPago=async()=>{if(!await pe.danger("Desativar Integração","Tem certeza que deseja desativar o Mercado Pago? Isso removerá o token de acesso."))return;const m=document.getElementById("btn-disconnect-mp");m.disabled=!0,m.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';try{if(!(await fetch(`${Ve}/api/mp/disconnect`,{method:"POST",headers:await ea()})).ok)throw new Error("Falha ao desativar.");w.success("Integração desativada."),setTimeout(()=>window.location.reload(),1e3)}catch($){w.error("Erro ao desativar: "+$.message),m.disabled=!1,m.innerHTML='<i class="fa-solid fa-plug-circle-xmark"></i> <span>Desativar</span>'}},window.connectMercadoPago=async()=>{const k=document.getElementById("mp-token-input"),m=document.getElementById("btn-connect-mp"),$=k.value.trim();if(!$){w.warning("Insira o Access Token primeiro.");return}m.disabled=!0;const v=m.innerHTML;m.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> <span>Conectando...</span>';try{const x=await fetch(`${Ve}/api/mp/connect`,{method:"POST",headers:await ea(),body:JSON.stringify({accessToken:$})}),M=await x.json().catch(()=>({}));if(!x.ok)throw new Error(M.error==="token_invalido"?"Token inválido. Confira e tente de novo.":"Falha ao conectar.");w.success("Integração conectada com sucesso!"),setTimeout(()=>window.location.reload(),1200)}catch(x){w.error("Erro na conexão: "+x.message),m.disabled=!1,m.innerHTML=v}},`
        <div class="page-header" style="flex-direction: column;">
            <div><h2 class="page-title">Configuração Mercado Pago</h2></div>
            <div><p style="color: var(--text-muted); font-size: 0.9rem;">Configure sua integração para recebimento de pagamentos.</p></div>
        </div>

        <div class="card glass" style="max-width: 600px; margin-top: 20px;">
            <div style="display: flex; align-items: center; gap: 18px; margin-bottom: 30px;">
                <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #009ee3 0%, #007bbd 100%); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.8rem; box-shadow: 0 8px 16px rgba(0, 158, 227, 0.2);">
                    <i class="fa-solid fa-receipt"></i>
                </div>
                <div>
                    <h3 style="margin: 0; font-size: 1.25rem;">Integração de Pagamentos</h3>
                    <p style="margin: 0; color: var(--text-dim); font-size: 0.85rem;">Conecte sua conta para aceitar Pix.</p>
                </div>
            </div>

            ${e?`
                <div style="background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.25); border-radius: 12px; padding: 18px; display:flex; align-items:center; justify-content:space-between; gap:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <i class="fa-solid fa-circle-check" style="color:#34d399; font-size:1.4rem;"></i>
                        <div>
                            <div style="font-weight:700; color:#34d399;">Conectado</div>
                            <div style="font-size:0.8rem; color:var(--text-muted); font-family:monospace;">User ID: ${f||"—"}</div>
                        </div>
                    </div>
                    <button id="btn-disconnect-mp" onclick="window.disconnectMercadoPago()" style="display: flex; align-items: center; gap: 8px; padding: 0 22px; height: 44px; border-radius: 10px; font-weight: 600; background: #ef4444; color: white; border: none; cursor: pointer;">
                        <i class="fa-solid fa-plug-circle-xmark"></i> <span>Desativar</span>
                    </button>
                </div>
            `:`
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 10px; font-weight: 600; color: var(--text-main);">Access Token (Produção)</label>
                    <div style="position: relative;">
                        <input type="password" id="mp-token-input" class="input-field" placeholder="APP_USR-0000..."
                               style="width: 100%; padding: 14px 45px 14px 16px; background: var(--bg-color); border: 1px solid var(--border-color); color: white; border-radius: 10px; font-family: monospace;">
                        <button type="button" onclick="const i = document.getElementById('mp-token-input'); i.type = i.type === 'password' ? 'text' : 'password';"
                                style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--text-dim); border: none; background: none; cursor: pointer; padding: 5px;">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                    <button id="btn-connect-mp" onclick="window.connectMercadoPago()" style="margin-top:14px; display: flex; align-items: center; gap: 8px; padding: 0 25px; height: 48px; border-radius: 10px; font-weight: 600; background: #009ee3; color:white; border:none; cursor:pointer;">
                        <i class="fa-solid fa-plug"></i> <span>Conectar</span>
                    </button>
                </div>
            `}

            <div style="background: rgba(99, 102, 241, 0.05); border: 1px solid rgba(99, 102, 241, 0.1); border-radius: 10px; padding: 15px; display: flex; gap: 12px; margin-top: 20px;">
                <i class="fa-solid fa-shield-halved" style="color: var(--primary); margin-top: 3px;"></i>
                <div style="font-size: 0.85rem; line-height: 1.5; color: var(--text-muted);">
                    O token é guardado <strong>no servidor</strong>, numa área protegida — nunca fica exposto no navegador nem no catálogo. Usado apenas para comunicação oficial com o Mercado Pago.
                </div>
            </div>
        </div>
    `},ba=async i=>{try{const e=await T.getAll("loja_config",{field:"lojaId",operator:"==",value:i});let f=e[0]?.empresaId,k=null,m=null;if(f&&(k=await T.get("companies",f),k&&(m=k.stores?.find(t=>t.id===i))),!m){const t=await T.getAll("companies");for(const c of t){const B=c.stores?.find(P=>P.id===i);if(B){k=c,m=B;break}}}if(!k||!m)return`
                <div style="height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:white;font-family:sans-serif;">
                    <div style="text-align:center;padding:2.5rem;background:rgba(255,255,255,0.03);border-radius:24px;border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(20px);max-width:400px;">
                        <div style="font-size:4rem;margin-bottom:1rem;">🔎</div>
                        <h2 style="margin-bottom:0.5rem;font-weight:700;">Catálogo não encontrado</h2>
                        <p style="color:#94a3b8;line-height:1.5;">O link que você acessou pode estar incorreto ou a loja não está mais ativa.</p>
                    </div>
                </div>
            `;const $=k.modulos_ativos||[],v=$.includes("venda_catalogo"),[x,M,N]=await Promise.all([T.getAll("products",{field:"companyId",operator:"==",value:k.id}),T.getAll("categories",{field:"companyId",operator:"==",value:k.id}),T.getAll("combos",{field:"empresaId",operator:"==",value:k.id}).catch(()=>[])]),_=N.filter(t=>t.ativo!==!1&&t.lojaId===i),j=e[0]||{},I=j.design||{},U=I.primaryColor||"#6366f1",F=I.secondaryColor||"#0f172a",S=I.textColor||"#ffffff",d=I.priceColor||"#ffffff",s=I.logoUrl||"",o=I.pixKey||"",l=(t,c,B)=>{if(typeof document>"u")return;if(document.title=t,[{name:"description",content:c},{property:"og:title",content:t},{property:"og:description",content:c},{property:"og:image",content:B},{property:"og:type",content:"website"},{property:"og:url",content:window.location.href},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:title",content:t},{name:"twitter:description",content:c},{name:"twitter:image",content:B}].forEach(q=>{const V=q.name?`meta[name="${q.name}"]`:`meta[property="${q.property}"]`;let J=document.querySelector(V);J||(J=document.createElement("meta"),q.name&&J.setAttribute("name",q.name),q.property&&J.setAttribute("property",q.property),document.head.appendChild(J)),J.setAttribute("content",q.content)}),s){let q=document.querySelector("link[rel~='icon']");q||(q=document.createElement("link"),q.rel="icon",document.head.appendChild(q)),q.href=s}},r=m.name||"Catálogo",h=I.metaDescription||`Confira os produtos de ${r} em nosso catálogo digital.`,y=I.logoUrl||window.location.origin+"/logo.png";l(r,h,y),console.log(`[Catalog] Meta tags updated for: ${r}`);let b=I.whatsapp||"";if(!b)try{if(m.instancia_id){const t=await T.get("instancias",m.instancia_id);t?.numero&&(b=t.numero.replace(/\D/g,""))}}catch(t){console.warn("Could not fetch instance details:",t)}const L=(k.mercadoPagoAtivo===!0||!!k.mercadoPagoToken)&&j.mercadoPagoActive!==!1,p=x.filter(t=>t.active!==!1&&(t.storeIds?.includes(i)||t.storeId===i)).sort((t,c)=>(t.name||"").localeCompare(c.name||"")),E=p.filter(t=>t.promotionalActive),D=I.themeId||"classico",Q=I.bannerUrl||"",a=I.bannerMobileUrl||"",g=M.map(t=>({...t,products:p.filter(c=>c.categoryId===t.id)})).filter(t=>t.products.length>0).sort((t,c)=>(t.name||"").localeCompare(c.name||"")),z=p.filter(t=>!t.categoryId||!M.find(c=>c.id===t.categoryId)),O=t=>t.imageUrl?t.imageUrl:t.imagemPath&&t.downloadToken?`https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(t.imagemPath)}?alt=media&token=${t.downloadToken}`:"https://via.placeholder.com/300?text=Sem+Imagem";let X=new Map;try{const t=localStorage.getItem(`cat_cart_${i}`);t&&(X=new Map(JSON.parse(t)))}catch{}const te=j?.bairrosEntrega||[],G=parseFloat(j?.taxaGenerica??0)||0,W=[];te&&Array.isArray(te)&&(te.forEach(t=>{(t.bairros||"").split(",").map(B=>B.trim()).filter(Boolean).forEach(B=>W.push({nome:B,preco:parseFloat(t.preco)||0}))}),W.sort((t,c)=>t.nome.localeCompare(c.nome)));const ae=j?.cupons||[],de=`cat_user_${k.id}`,n=JSON.parse(localStorage.getItem(de)||"{}");let u=null;const C=()=>{let t=0;return X.forEach(({product:c,qty:B})=>{const P=c.promotionalActive&&c.promotionalPrice||c.price;t+=P*B}),t},A=()=>Array.from(X.entries()).map(([t,{qty:c,product:B}])=>B.isCombo?{id:t.replace(/^combo_/,""),qty:c,isCombo:!0}:{id:t,qty:c}),H=async(t,c={})=>{const B=window.catCustomer||{},P=await fetch(`${Ve}/api/orders`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:i,cart:A(),deliveryType:window.catDeliveryType,bairro:window.catSelectedBairro||B.bairro||"",couponCode:u?.codigo||null,customer:{name:B.name,phone:B.phone,address:B.address,bairro:B.bairro},paymentMethod:t,...c})}),q=await P.json().catch(()=>({}));if(!P.ok)throw new Error(q.error||"erro_ao_criar_pedido");return q},R=()=>window.catDeliveryType==="retirada"?0:window.catTaxaBairro||0,K=()=>window.catDeliveryType==="retirada"?"Retirada":window.catSelectedBairro?`Entrega (${window.catSelectedBairro})`:"Taxa de Entrega",ie=t=>u?u.tipo==="percent"?t*u.desconto/100:u.desconto:0,le=()=>{const t=C();return t+R()-ie(t)},se=()=>{if(X.size===0)return'<p style="text-align:center;color:#94a3b8;padding:20px 0;">Seu carrinho está vazio.</p>';let t="";return X.forEach(({product:c,qty:B},P)=>{const q=c.promotionalActive&&c.promotionalPrice||c.price;t+=`
                <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
                    <div style="flex:1;">
                        <p style="margin:0;font-weight:600;font-size:0.95rem;">${c.name}</p>
                        <p style="margin:4px 0 0;color:#94a3b8;font-size:0.8rem;">R$ ${q.toFixed(2)} cada</p>
                    </div>
                    <div style="display:flex;align-items:center;gap:10px;">
                        <button onclick="window.catQtyChange('${P}',-1)" style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.1);color:white;border:none;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">-</button>
                        <span style="min-width:24px;text-align:center;font-weight:700;">${B}</span>
                        <button onclick="window.catQtyChange('${P}',1)" style="width:28px;height:28px;border-radius:50%;background:#6366f1;color:white;border:none;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">+</button>
                        <button onclick="window.catRemoveItem('${P}')" style="color:#ef4444;background:none;border:none;cursor:pointer;padding:4px;"><i class="fa-solid fa-trash" style="font-size:0.85rem;"></i></button>
                    </div>
                </div>`}),t},Z=()=>{const t=C(),c=R(),B=ie(t),P=t+c-B;let q="";return X.forEach(({product:V,qty:J})=>{const me=V.promotionalActive&&V.promotionalPrice||V.price;q+=`<div style="display:flex;justify-content:space-between;font-size:0.88rem;padding:4px 0;"><span>${J}x ${V.name}</span><span>R$ ${(me*J).toFixed(2)}</span></div>`}),c>0&&(q+=`<div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:4px 0;color:#94a3b8;"><span><i class="fa-solid fa-truck" style="margin-right:4px;"></i>${K()}</span><span>+ R$ ${c.toFixed(2)}</span></div>`),B>0&&u&&(q+=`<div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:4px 0;color:#10b981;"><span><i class="fa-solid fa-tag" style="margin-right:4px;"></i>Cupom ${u.codigo}</span><span>- R$ ${B.toFixed(2)}</span></div>`),q+=`<div style="display:flex;justify-content:space-between;font-weight:800;font-size:1rem;border-top:1px solid rgba(255,255,255,0.1);margin-top:8px;padding-top:8px;"><span>Total</span><span style="color:#6366f1;">R$ ${P.toFixed(2)}</span></div>`,q},Y={dom:"Domingo",seg:"Segunda-feira",ter:"Terça-feira",qua:"Quarta-feira",qui:"Quinta-feira",sex:"Sexta-feira",sab:"Sábado"},oe=()=>["dom","seg","ter","qua","qui","sex","sab"][new Date().getDay()],ne=t=>{const c=j.horario_funcionamento?.[t]||m.horarios?.[t]||{};return{ativo:c.ativo??c.aberto??t!=="dom",inicio:c.inicio||c.abertura||"08:00",fim:c.fim||c.fechamento||"18:00"}},ee=t=>{const c=j.horario_entrega?.[t]||m.horario_entrega?.[t]||{};return console.log(c),{ativo:c.ativo??c.aberto??t!=="dom",inicio:c.inicio||c.abertura||"08:00",fim:c.fim||c.fechamento||"18:00"}},ue=()=>{if(j.entregaFechada===!0)return!1;const t=oe(),c=ee(t);if(!c.ativo)return!1;const B=new Date,P=B.getHours()*60+B.getMinutes(),[q,V]=c.inicio.split(":").map(Number),[J,me]=c.fim.split(":").map(Number);return P>=q*60+V&&P<=J*60+me},re=ue(),ye=()=>{if(j.lojaFechada===!0)return!1;const t=oe(),c=ne(t);if(!c.ativo)return!1;const B=new Date,P=B.getHours()*60+B.getMinutes(),[q,V]=c.inicio.split(":").map(Number),[J,me]=c.fim.split(":").map(Number);return P>=q*60+V&&P<=J*60+me},ke=()=>{const t=["dom","seg","ter","qua","qui","sex","sab"],c=new Date().getDay(),B=new Date,P=B.getHours()*60+B.getMinutes(),q=t[c],V=ne(q);if(V.ativo){const[J,me]=V.inicio.split(":").map(Number),he=J*60+me;if(P<he)return`Hoje às ${V.inicio}`}for(let J=1;J<=7;J++){const me=(c+J)%7,he=t[me],xe=ne(he);if(xe.ativo)return J===1?`Amanhã às ${xe.inicio}`:`${Y[he]} às ${xe.inicio}`}return"em breve"},ge=ye(),Te=()=>{const t=oe(),c=ne(t);if(!c.ativo)return'<span style="color:#ef4444;"><i class="fa-solid fa-door-closed"></i> Fechado no momento</span>';const B=new Date,P=B.getHours()*60+B.getMinutes(),[q,V]=c.inicio.split(":").map(Number),[J,me]=c.fim.split(":").map(Number),he=q*60+V,xe=J*60+me;return P>=he&&P<=xe?`<span style="color:#10b981;"><i class="fa-solid fa-door-open"></i> Aberto agora</span> <span style="opacity:0.6;margin-left:4px;">• Fecha às ${c.fim}</span>`:P<he?`<span style="color:#ef4444;"><i class="fa-solid fa-door-closed"></i> Fechado no momento</span> <span style="opacity:0.6;margin-left:4px;">• Abre às ${c.inicio}</span>`:'<span style="color:#ef4444;"><i class="fa-solid fa-door-closed"></i> Fechado no momento</span>'},ze=()=>{let t="";return["dom","seg","ter","qua","qui","sex","sab"].forEach(c=>{const B=ne(c);B.ativo?t+=`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:var(--text-muted);">${Y[c]}</span><span style="font-weight:600;">${B.inicio} às ${B.fim}</span></div>`:t+=`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:var(--text-muted);">${Y[c]}</span><span style="color:#ef4444;font-size:0.8rem;font-weight:600;">Fechado</span></div>`}),t},fe=()=>{const t=document.getElementById("cart-badge"),c=document.getElementById("cart-total"),B=document.getElementById("cart-items"),P=document.getElementById("cart-float-btn"),q=document.getElementById("cart-total-float"),V=document.getElementById("cart-badge-float");try{localStorage.setItem(`cat_cart_${i}`,JSON.stringify(Array.from(X.entries())))}catch{}let J=0;X.forEach(({qty:me})=>J+=me),t&&(t.textContent=J.toString()),V&&(V.textContent=J.toString()),P&&(P.style.display=J>0?"flex":"none"),c&&(c.textContent=`R$ ${le().toFixed(2)}`),q&&(q.textContent=`R$ ${le().toFixed(2).replace(".",",")}`),B&&(B.innerHTML=se())};window.openStoreInfo=()=>$e("store-info-modal"),window.closeStoreInfo=()=>ve("store-info-modal"),window.catInit=()=>{const t=document.getElementById("checkout-name"),c=document.getElementById("checkout-phone"),B=document.getElementById("checkout-address");if(t&&n.name&&(t.value=n.name),c&&n.phone&&(c.value=n.phone),B&&n.address&&(B.value=n.address),n.bairro){const P=document.getElementById("checkout-bairro");if(P){const q=W.find(V=>V.nome.toLowerCase()===(n.bairro||"").toLowerCase());if(q)P.value=q.nome;else{P.value="__outro__";const V=document.getElementById("outro-bairro-group"),J=document.getElementById("checkout-bairro-outro");V&&(V.style.display="block"),J&&(J.value=n.bairro)}}}c&&(c.addEventListener("input",P=>{let q=P.target.value.replace(/\D/g,"");q.length>11&&(q=q.slice(0,11)),P.target.value=q}),c.setAttribute("placeholder","DDD + 9 dígitos"),c.setAttribute("maxlength","11"))},setTimeout(()=>window.catInit(),500);const $e=t=>{const c=document.getElementById(t);c&&(c.style.display="flex")},ve=t=>{const c=document.getElementById(t);c&&(c.style.display="none")};v&&(window.showClosedAlert=t=>{const c=document.getElementById("closed-alert-title"),B=document.getElementById("closed-alert-desc"),P=document.getElementById("closed-alert-time-section"),q=document.getElementById("next-open-time"),V=document.getElementById("closed-alert-icon");t==="store"?(c&&(c.textContent="Loja Fechada"),B&&(B.textContent="No momento não estamos aceitando pedidos."),P&&(P.style.display="block"),q&&(q.textContent=ke()),V&&(V.className="fa-solid fa-store-slash")):t==="delivery"&&(c&&(c.textContent="Entrega Desativada"),B&&(B.textContent="O serviço de entrega está desativado no momento. Por favor, escolha a opção de Retirada se disponível."),P&&(P.style.display="none"),V&&(V.className="fa-solid fa-motorcycle")),$e("closed-alert-modal")},window.catAddToCart=t=>{const c=p.find(V=>V.id===t);if(!c||c.stock===0)return;const B=X.get(t),P=c.stock??1/0;if((B?.qty||0)>=P){alert(`Estoque máximo atingido (${c.stock} un.)`);return}X.set(t,{product:c,qty:(B?.qty||0)+1}),fe();const q=document.getElementById(`btn-add-${t}`);q&&(q.textContent="✓ Adicionado",setTimeout(()=>{q&&(q.textContent="+ Adicionar")},1e3))},window.catQtyChange=(t,c)=>{const B=X.get(t);if(!B)return;const P=B.qty+c;P<=0?X.delete(t):B.qty=Math.min(P,B.product.stock??1/0),fe()},window.catRemoveItem=t=>{X.delete(t),fe()},window.catAddComboToCart=t=>{const c=_.find(J=>J.id===t);if(!c)return;const B=`combo_${t}`,P={id:B,name:c.nome,price:parseFloat(c.preco||0),isCombo:!0,produtos:c.produtos||[],imagemPath:c.imagemPath||null,downloadToken:c.downloadToken||null,stock:null},q=X.get(B);X.set(B,{product:P,qty:(q?.qty||0)+1}),fe();const V=document.querySelector(`[onclick="window.catAddComboToCart('${t}')"] button`);V&&(V.textContent="✓ Adicionado!",setTimeout(()=>{V&&(V.textContent="+ Adicionar Combo")},1200))},window.openCart=()=>{fe(),$e("cart-modal")},window.closeCart=()=>ve("cart-modal"),window.goToDelivery=async()=>{if(X.size===0)return;if(!ge){window.showClosedAlert("store");return}const t=document.getElementById("btn-go-delivery");t&&(t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Verificando...');let c=!1;const B=[];for(const[P,{product:q,qty:V}]of Array.from(X.entries()))if(q.isCombo)for(const J of q.produtos||[])B.push({id:J.id,qty:V,label:q.name});else B.push({id:P,qty:V,label:q.name});for(const P of B)try{const q=await T.get("products",P.id);if(!q||q.active===!1||q.stock!=null&&q.stock<P.qty){c=!0,alert(`O item "${P.label}" não possui quantidade suficiente em estoque ou está indisponível.`);break}}catch{}t&&(t.innerHTML='<i class="fa-solid fa-arrow-right"></i> Finalizar Pedido'),!c&&(ve("cart-modal"),$e("delivery-modal"))},window.closeDelivery=()=>ve("delivery-modal"),window.selectDelivery=t=>{window.catDeliveryType=t,document.querySelectorAll(".delivery-card").forEach(P=>{P.style.borderColor="rgba(255,255,255,0.1)",P.style.background="transparent"});const c=document.getElementById(`delivery-card-${t}`);c&&(c.style.borderColor="#6366f1",c.style.background="rgba(99,102,241,0.08)");const B=document.getElementById("btn-go-customer");B&&(B.disabled=!1,B.style.opacity="1",B.style.cursor="pointer")},window.goToCustomer=()=>{const t=window.catDeliveryType;if(!t)return;if(t==="entrega"&&!re){window.showClosedAlert("delivery");return}ve("delivery-modal");const c=document.getElementById("address-group");c&&(c.style.display=t==="entrega"?"block":"none"),$e("customer-modal")},window.closeCustomer=()=>ve("customer-modal"),window.catChangeBairro=t=>{const c=document.getElementById("outro-bairro-group");c&&(c.style.display=t==="__outro__"?"block":"none")},window.goToPayment=()=>{const t=document.getElementById("checkout-name")?.value.trim(),c=document.getElementById("checkout-phone")?.value.trim(),B=document.getElementById("checkout-address")?.value.trim(),P=window.catDeliveryType;let q="",V=0;if(P==="entrega"&&W.length>0){const Je=document.getElementById("checkout-bairro");if(!Je||!Je.value){alert("Selecione seu bairro para entrega.");return}if(Je.value==="__outro__"){const Fe=document.getElementById("checkout-bairro-outro");if(q=Fe?.value.trim()||"",!q){alert("Digite o nome do seu bairro."),Fe?.focus();return}V=G}else{q=Je.value;const Fe=W.find($a=>$a.nome===q);V=Fe?Fe.preco:G}}if(!t||!c){alert("Preencha nome e telefone.");return}let J=c.replace(/\D/g,"");if(J.length===13&&J.startsWith("55")&&(J=J.substring(2)),J.length!==11){ta.showPhoneError();return}if(P==="entrega"&&!B){alert("Preencha o endereço de entrega completo.");return}window.catSelectedBairro=q,window.catTaxaBairro=V;const me={name:t,phone:c,address:B||"",bairro:q};window.catCustomer=me,localStorage.setItem(de,JSON.stringify(me)),ve("customer-modal");const he=document.getElementById("payment-order-summary");he&&(he.innerHTML=Z());const xe=document.getElementById("cat-coupon-section");xe&&(xe.style.display=ae.length>0?"block":"none");const je=document.getElementById("btn-pay-delivery"),ia=document.getElementById("btn-pay-pix-manual"),sa=document.getElementById("btn-pay-pix-mp"),na=document.getElementById("mandatory-pay-msg"),ra=j?.pagamentoObrigatorioRetirada===!0,ka=j?.desativarPagamentoEntrega===!0;je&&(P==="retirada"&&ra||P==="entrega"&&ka?je.style.display="none":je.style.display="flex"),na&&(na.style.display=P==="retirada"&&ra?"block":"none"),ia&&(ia.style.display=o?"flex":"none"),sa&&(sa.style.display=L?"flex":"none"),$e("payment-modal")},window.closePayment=()=>ve("payment-modal"),window.catToggleDeliveryOptions=()=>{const t=document.getElementById("delivery-payment-details");if(t){const c=t.style.display==="flex";if(t.style.display=c?"none":"flex",c){window.catDeliveryPaymentMethod=null,window.catTroco=null,document.querySelectorAll(".btn-sub-method").forEach(P=>P.style.background="rgba(255,255,255,0.05)");const B=document.getElementById("troco-wrapper");B&&(B.style.display="none")}}},window.catSelectDeliverySubMethod=t=>{window.catDeliveryPaymentMethod=t,document.querySelectorAll(".btn-sub-method").forEach(q=>{q.style.background="rgba(255,255,255,0.05)",q.style.borderColor="rgba(255,255,255,0.1)"});const c=document.getElementById(`btn-sub-${t}`);c&&(c.style.background="rgba(99,102,241,0.2)",c.style.borderColor="#6366f1");const B=document.getElementById("troco-wrapper");B&&(B.style.display=t==="dinheiro"?"block":"none");const P=document.getElementById("btn-confirm-delivery-sub");P&&(P.disabled=!1,P.style.opacity="1")},window.catApplyCoupon=()=>{const t=(document.getElementById("cat-coupon-input")?.value||"").trim().toUpperCase(),c=ae.find(J=>J.codigo===t&&J.ativo!==!1),B=C(),P=document.getElementById("cat-coupon-msg");if(!c){P&&(P.textContent="Cupom inválido ou expirado.",P.style.color="#ef4444");return}if(c.valorMinimo>0&&B<c.valorMinimo){P&&(P.textContent=`Gasto mínimo de R$ ${c.valorMinimo.toFixed(2)} necessário.`,P.style.color="#ef4444");return}u=c;const q=ie(B);P&&(P.textContent=`✓ Cupom aplicado! Desconto: R$ ${q.toFixed(2)}`,P.style.color="#10b981");const V=document.getElementById("payment-order-summary");V&&(V.innerHTML=Z())},window.catToggleCoupon=()=>{const t=document.getElementById("cat-coupon-input-wrapper"),c=document.getElementById("cat-coupon-toggle-label");if(t){const B=t.style.display==="block";t.style.display=B?"none":"block",c&&(c.textContent=B?"Tenho um cupom de desconto":"Ocultar cupom")}},window.catFilterClassic=t=>{document.querySelectorAll(".cat-selector-item").forEach(B=>{const P=B.getAttribute("onclick")||"";B.classList.toggle("active",P.includes("'"+t+"'"))});const c=document.getElementById("classic-promo-section");t==="all"?(c&&(c.style.display=E.length>0?"block":"none"),document.querySelectorAll("[data-classic-cat]").forEach(B=>B.style.display="block")):t==="promo"?(c&&(c.style.display="block"),document.querySelectorAll("[data-classic-cat]").forEach(B=>B.style.display="none")):(c&&(c.style.display="none"),document.querySelectorAll("[data-classic-cat]").forEach(B=>{B.style.display=B.dataset.classicCat===t?"block":"none"}))},window.catFilterCat=t=>{document.querySelectorAll(".cat-sidebar-link").forEach(P=>{P.classList.remove("active"),P.setAttribute("aria-pressed","false")});const c=document.querySelector(`.cat-sidebar-link[onclick*="'${t}'"]`);c&&(c.classList.add("active"),c.setAttribute("aria-pressed","true"));const B=t==="all";document.querySelectorAll("[data-catgroup]").forEach(P=>{P.style.display=B||P.dataset.catgroup===t?"":"none"})},window.catSearch=t=>{t=t.trim().toLowerCase(),document.querySelectorAll("[data-catgroup]").forEach(c=>{c.style.display=""}),t&&document.querySelectorAll(".product-card").forEach(c=>{const B=(c.querySelector("h3")?.textContent||"").toLowerCase();c.style.display=B.includes(t)?"":"none"})},window.confirmOrderDelivery=async()=>{const t=document.getElementById("btn-pay-delivery");t&&(t.disabled=!0,t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Processando...');try{if(!ye()){t&&(t.disabled=!1,t.innerHTML="🤝 Pagar na Entrega / Retirada"),window.showClosedAlert("store");return}if(window.catDeliveryType==="entrega"&&!ue()){t&&(t.disabled=!1,t.innerHTML="🤝 Pagar na Entrega / Retirada"),window.showClosedAlert("delivery");return}const B=window.catCustomer;if(!B||!B.phone){alert("Seus dados de contato não foram salvos ou foram perdidos. Por favor, preencha novamente."),ve("payment-modal"),ve("pix-manual-modal"),$e("customer-modal");return}const P=window.catDeliveryPaymentMethod,q=document.getElementById("cat-troco-input")?.value,V=P==="dinheiro"&&q?parseFloat(q):null,{orderId:J}=await H("na_entrega",{paymentSubMethod:P,troco:V});X.clear(),u=null,ve("payment-modal"),fe();const me=document.getElementById("confirmation-modal"),he=document.getElementById("order-id-display"),xe=document.getElementById("pix-info-section");me&&(me.style.display="flex"),he&&(he.textContent=J.slice(0,8).toUpperCase()),xe&&(xe.style.display="none"),fe()}catch(c){console.error("Confirm Order Delivery Error:",c),alert("Erro ao processar pedido: "+(c.message||"Erro desconhecido")+". Por favor, tente novamente ou fale com a loja."),t&&(t.disabled=!1,t.innerHTML="🤝 Pagar na Entrega / Retirada")}},window.showPixManual=async()=>{const t=document.getElementById("btn-pay-pix-manual");t&&(t.disabled=!0,t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Gerando...');try{if(!ye()){t&&(t.disabled=!1,t.innerHTML='<i class="fa-brands fa-pix" style="font-size:1.2rem;"></i> <span>PIX Manual</span>'),window.showClosedAlert("store");return}if(window.catDeliveryType==="entrega"&&!ue()){t&&(t.disabled=!1,t.innerHTML='<i class="fa-brands fa-pix" style="font-size:1.2rem;"></i> <span>PIX Manual</span>'),window.showClosedAlert("delivery");return}const B=window.catCustomer;if(!B||!B.phone){alert("Seus dados de contato não foram salvos ou foram perdidos. Por favor, preencha novamente."),t&&(t.disabled=!1,t.innerHTML='<i class="fa-brands fa-pix" style="font-size:1.2rem;"></i> <span>PIX Manual</span>'),ve("payment-modal"),$e("customer-modal");return}const P=Z(),{orderId:q}=await H("pix_manual");window.currentPixOrderId=q,X.clear(),u=null,fe(),ve("payment-modal");const V=document.getElementById("pix-manual-summary");V&&(V.innerHTML=P);const J=document.getElementById("pix-key-value");J&&(J.textContent=o),t&&(t.disabled=!1,t.innerHTML='<i class="fa-brands fa-pix" style="font-size:1.2rem;"></i> <span>PIX Manual</span>'),$e("pix-manual-modal")}catch(c){console.error("Show Pix Manual Error:",c),alert("Erro ao gerar pedido PIX: "+(c.message||"Erro de conexão/permissão")+". Tente novamente."),t&&(t.disabled=!1,t.innerHTML='<i class="fa-brands fa-pix" style="font-size:1.2rem;"></i> <span>PIX Manual</span>')}},window.closePixManual=()=>ve("pix-manual-modal"),window.copyPixKey=()=>{navigator.clipboard.writeText(o).then(()=>{const t=document.getElementById("btn-copy-pix");t&&(t.textContent="✓ Copiado!",setTimeout(()=>{t.textContent="Copiar"},2e3))})},window.confirmPixManual=async()=>{const t=window.currentPixOrderId;if(!t){ve("pix-manual-modal");return}const c=document.getElementById("btn-confirm-pix-manual");c&&(c.disabled=!0,c.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Enviando...');try{let B="";const P=document.getElementById("pix-comprovante-input");if(P?.files?.[0]){const me=P.files[0],he=Date.now(),xe=`comprovantes/${k.id}/${he}_${me.name}`,je=Ae(Se,xe);await Ne(je,me),B=await Pe(je),await fetch(`${Ve}/api/orders/comprovante`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({orderId:t,comprovanteUrl:B})})}ve("pix-manual-modal");const q=document.getElementById("confirmation-modal"),V=document.getElementById("order-id-display");q&&(q.style.display="flex"),V&&(V.textContent=t.slice(0,8).toUpperCase());const J=document.getElementById("pix-info-section");J&&(J.style.display="none"),c&&(c.disabled=!1,c.innerHTML='<i class="fa-solid fa-check"></i> Enviar Comprovante')}catch(B){console.error("Confirm Pix Manual Error:",B),alert("Erro ao enviar comprovante: "+(B.message||"Erro de conexão/permissão")+". Tente novamente."),c&&(c.disabled=!1,c.innerHTML='<i class="fa-solid fa-check"></i> Enviar Comprovante')}},window.confirmPixMercadoPago=async()=>{const t=document.getElementById("btn-pay-pix-mp");t&&(t.disabled=!0,t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Gerando PIX...');try{if(!ye()){t&&(t.disabled=!1,t.innerHTML="⚡ Pagar via Mercado Pago (PIX)"),window.showClosedAlert("store");return}if(window.catDeliveryType==="entrega"&&!ue()){t&&(t.disabled=!1,t.innerHTML="⚡ Pagar via Mercado Pago (PIX)"),window.showClosedAlert("delivery");return}const{orderId:B,mpData:P}=await H("pix_mercadopago");if(X.clear(),u=null,ve("payment-modal"),fe(),P?.qr_code_base64||P?.qr_code_text){const q=document.getElementById("mp-qr-img"),V=document.getElementById("mp-qr-code"),J=document.getElementById("mp-pix-summary");q&&P.qr_code_base64&&(q.src=`data:image/png;base64,${P.qr_code_base64}`,q.style.display="block"),V&&P.qr_code_text&&(V.textContent=P.qr_code_text,window._mpQrCodeText=P.qr_code_text),J&&(J.innerHTML=Z()),$e("mp-pix-modal")}else{const q=document.getElementById("confirmation-modal"),V=document.getElementById("order-id-display");q&&(q.style.display="flex"),V&&(V.textContent=B.slice(0,8).toUpperCase())}fe()}catch(c){console.error("Confirm Pix MP Error:",c),alert("Erro ao gerar PIX Mercado Pago: "+(c.message||"Erro de resposta")+". Tente novamente."),t&&(t.disabled=!1,t.innerHTML="⚡ Pagar via Mercado Pago (PIX)")}},window.closeMpPix=()=>ve("mp-pix-modal"),window.copyMpQrCode=()=>{const t=window._mpQrCodeText||"";navigator.clipboard.writeText(t).then(()=>{const c=document.getElementById("btn-copy-mp-qr");c&&(c.textContent="✓ Copiado!",setTimeout(()=>{c.textContent="Copiar código"},2e3))})},window.previewComprovante=t=>{const c=document.getElementById("comprovante-preview"),B=document.getElementById("comprovante-label");if(t.files?.[0]){const P=new FileReader;P.onload=q=>{c&&(c.src=q.target?.result,c.style.display="block"),B&&(B.textContent=t.files[0].name)},P.readAsDataURL(t.files[0])}});const xa=t=>{const c=(t.produtos||[]).reduce((q,V)=>q+(V.price||0),0),B=c>0?c-parseFloat(t.preco||0):0,P=t.imagemPath&&t.downloadToken||t.imageUrl;return`
            <div class="product-card" onclick="window.catAddComboToCart('${t.id}')" style="cursor:pointer;position:relative;border:1.5px solid rgba(245,158,11,0.3);">
                <div class="card-image" style="${P?"":"background:linear-gradient(135deg,rgba(245,158,11,0.15),rgba(251,191,36,0.05));display:flex;align-items:center;justify-content:center;min-height:120px;"}">
                    ${P?`<img src="${O(t)}" alt="${t.nome}" loading="lazy">`:'<i class="fa-solid fa-layer-group" style="font-size:2.5rem;color:#f59e0b;opacity:0.8;"></i>'}
                    <div class="promo-tag" style="background:#f59e0b;">COMBO</div>
                </div>
                <div class="card-info">
                    <h3 style="font-weight:800;">${t.nome}</h3>
                    <p style="font-size:0.75rem;color:#94a3b8;margin:4px 0 8px;line-height:1.4;">${(t.produtos||[]).map(q=>q.name).join(" + ")}</p>
                    <div class="price-container">
                        <span class="price" style="color:#f59e0b;">R$ ${parseFloat(t.preco||0).toFixed(2)}</span>
                        ${c>0&&B>0?`<span class="original-price">R$ ${c.toFixed(2)}</span>`:""}
                    </div>
                    ${B>0?`<p style="font-size:0.75rem;color:#10b981;margin:4px 0 0;font-weight:700;">✓ Economize R$ ${B.toFixed(2)}</p>`:""}
                    <button style="margin-top:12px;width:100%;padding:10px;border-radius:10px;background:#f59e0b;color:white;border:none;cursor:pointer;font-weight:700;font-size:0.9rem;">
                        + Adicionar Combo
                    </button>
                </div>
            </div>`},oa=_.length>0?`
            <div class="section-title" style="margin-top:40px;">
                <i class="fa-solid fa-layer-group" style="color:#f59e0b;" aria-hidden="true"></i>
                <span>Combos Especiais</span>
                <div class="line" style="background:linear-gradient(to right,#f59e0b,transparent);"></div>
            </div>
            <div class="product-grid" role="list">${_.map(xa).join("")}</div>`:"",Ee=(t,c=!1)=>{const B=c&&t.promotionalName||t.name,P=c&&t.promotionalPrice||t.price,q=c?t.price:null,V=t.stock===0;return v?`
                <div class="product-card" style="${V?"opacity:0.6;":""}">
                    <div class="card-image">
                        <img src="${O(t)}" alt="${B}" loading="lazy">
                        ${c?'<div class="promo-tag">OFERTA</div>':""}
                        ${V?'<div class="promo-tag" style="background:#ef4444;left:15px;right:auto;">ESGOTADO</div>':""}
                    </div>
                    <div class="card-info">
                        <h3>${B}</h3>
                        ${$.includes("agendamento")&&t.observation?`<p style="font-size:0.8rem;color:#94a3b8;margin:4px 0 8px;line-height:1.4;">${t.observation}</p>`:""}
                        <div class="price-container">
                            <span class="price">R$ ${P?.toFixed(2)}</span>
                            ${q?`<span class="original-price">R$ ${q.toFixed(2)}</span>`:""}
                        </div>
                        ${t.stock!=null&&!V&&t.stock<=10?`<p style="font-size:0.75rem;color:#eab308;margin:6px 0 0;">⚠️ Apenas ${t.stock} restante${t.stock!==1?"s":""}</p>`:""}
                        <button id="btn-add-${t.id}" onclick="window.catAddToCart('${t.id}')" ${V?"disabled":""}
                            style="margin-top:12px;width:100%;padding:10px;border-radius:10px;background:${V?"rgba(255,255,255,0.05)":"var(--primary-cat)"};color:${V?"#94a3b8":"white"};border:none;cursor:${V?"not-allowed":"pointer"};font-weight:700;font-size:0.9rem;transition:all 0.2s;">
                            ${V?"Esgotado":"+ Adicionar"}
                        </button>
                    </div>
                </div>`:`
                <div class="product-card">
                    <div class="card-image">
                        <img src="${O(t)}" alt="${B}" loading="lazy">
                        ${c?'<div class="promo-tag">OFERTA</div>':""}
                    </div>
                    <div class="card-info">
                        <h3>${B}</h3>
                        ${$.includes("agendamento")&&t.observation?`<p style="font-size:0.8rem;color:#94a3b8;margin:4px 0 8px;line-height:1.4;">${t.observation}</p>`:""}
                        <div class="price-container">
                            <span class="price">R$ ${P?.toFixed(2)}</span>
                            ${q?`<span class="original-price">R$ ${q.toFixed(2)}</span>`:""}
                        </div>
                    </div>
                </div>`},Ie="display:none;position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.75);align-items:center;justify-content:center;backdrop-filter:blur(4px);color:white;overflow-y:auto;padding:16px 0;",Be="background:#1e293b;border-radius:24px;width:92%;max-width:460px;padding:28px;max-height:90vh;overflow-y:auto;box-sizing:border-box;",Me=(t,c)=>`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h3 style="margin:0;font-size:1.1rem;font-weight:700;display:flex;align-items:center;gap:10px;">${t}</h3>
                <button onclick="${c}" style="background:rgba(255,255,255,0.1);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
            </div>`,Ye=(t,c,B,P="")=>`<button id="${t}" onclick="${c}" style="width:100%;padding:14px;border-radius:14px;background:#6366f1;color:white;border:none;cursor:pointer;font-weight:700;font-size:1rem;${P}">${B}</button>`,wa=v?`
            <!-- CART MODAL -->
            <div id="cart-modal" style="${Ie}align-items:flex-end;padding:0;">
                <div style="background:#1e293b;border-radius:24px 24px 0 0;width:100%;max-width:520px;max-height:85vh;display:flex;flex-direction:column;padding:24px;overflow:hidden;">
                    ${Me('<i class="fa-solid fa-cart-shopping"></i> Meu Carrinho',"window.closeCart()")}
                    <div id="cart-items" style="flex:1;overflow-y:auto;min-height:80px;"></div>
                    <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:16px;margin-top:16px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                            <span style="font-weight:700;">Total</span>
                            <span id="cart-total" style="font-size:1.3rem;font-weight:800;color:#6366f1;">R$ 0,00</span>
                        </div>
                        ${Ye("btn-go-delivery","window.goToDelivery()",'<i class="fa-solid fa-arrow-right"></i> Finalizar Pedido')}
                    </div>
                </div>
            </div>

            <!-- DELIVERY MODAL -->
            <div id="delivery-modal" style="${Ie}align-items:flex-start;">
                <div style="${Be}">
                    ${Me('<i class="fa-solid fa-box"></i> Como deseja receber?',"window.closeDelivery()")}
                    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">
                        <div id="delivery-card-entrega" class="delivery-card" ${re!==!1&&W.length>0?`onclick="window.selectDelivery('entrega')"`:""} style="padding:18px;border-radius:16px;border:2px solid rgba(255,255,255,0.1);${re!==!1&&W.length>0?"cursor:pointer;":"opacity:0.5;cursor:not-allowed;"}display:flex;align-items:center;gap:16px;transition:all 0.2s;">
                            <div style="width:48px;height:48px;border-radius:12px;background:rgba(99,102,241,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                <i class="fa-solid fa-truck" style="font-size:1.3rem;color:#6366f1;"></i>
                            </div>
                            <div>
                                <p style="margin:0;font-weight:700;font-size:1rem;">Entrega</p>
                                <p style="margin:4px 0 0;color:${re!==!1&&W.length>0?"#94a3b8":"#ef4444"};font-size:0.85rem;">${re!==!1&&W.length>0?"Receber no endereço informado":"Entrega indisponível no momento"}</p>
                            </div>
                        </div>
                        <div id="delivery-card-retirada" class="delivery-card" onclick="window.selectDelivery('retirada')" style="padding:18px;border-radius:16px;border:2px solid rgba(255,255,255,0.1);cursor:pointer;display:flex;align-items:center;gap:16px;transition:all 0.2s;">
                            <div style="width:48px;height:48px;border-radius:12px;background:rgba(99,102,241,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                <i class="fa-solid fa-store" style="font-size:1.3rem;color:#6366f1;"></i>
                            </div>
                            <div>
                                <p style="margin:0;font-weight:700;font-size:1rem;">Retirada na Loja</p>
                                <p style="margin:4px 0 0;color:#94a3b8;font-size:0.85rem;">Buscar pessoalmente no estabelecimento</p>
                            </div>
                        </div>
                    </div>
                    ${Ye("btn-go-customer","window.goToCustomer()",'<i class="fa-solid fa-arrow-right"></i> Continuar',"opacity:0.4;cursor:not-allowed;")}
                </div>
            </div>

            <!-- CUSTOMER MODAL -->
            <div id="customer-modal" style="${Ie}align-items:flex-start;">
                <div style="${Be}">
                    ${Me('<i class="fa-solid fa-user"></i> Seus Dados',"window.closeCustomer()")}
                    <div style="margin-bottom:16px;">
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">Nome Completo</label>
                        <input id="checkout-name" type="text" placeholder="Seu nome" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;">
                    </div>
                    <div style="margin-bottom:16px;">
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">WhatsApp</label>
                        <input id="checkout-phone" type="tel" placeholder="(11) 99999-9999" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;">
                    </div>
                    <div id="address-group" style="display:none;margin-bottom:16px;">
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">Endereço</label>
                        <input id="checkout-address" type="text" placeholder="Rua, número, complemento" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;margin-bottom:12px;">
                        ${W.length>0?`
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">Bairro</label>
                        <div style="padding:10px 12px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:10px;margin-bottom:10px;display:flex;align-items:center;gap:8px;">
                            <i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;font-size:0.9rem;flex-shrink:0;"></i>
                            <span style="color:#ef4444;font-size:0.82rem;line-height:1.4;">Selecione o bairro <strong>correto</strong> do seu endereço. A taxa será cobrada conforme o bairro informado.</span>
                        </div>
                        <select id="checkout-bairro" onchange="window.catChangeBairro(this.value)" style="width:100%;padding:12px;background:#1e293b;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;outline:none;cursor:pointer;">
                            <option value="">Selecione seu bairro...</option>
                            ${W.map(t=>`<option value="${t.nome}">${t.nome}</option>`).join("")}
                            <option value="__outro__">Outro Bairro</option>
                        </select>
                        <div id="outro-bairro-group" style="display:none;margin-top:10px;">
                            <input type="text" id="checkout-bairro-outro" placeholder="Digite o nome do seu bairro..." style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;outline:none;">
                        </div>
                        `:""}
                    </div>
                    ${Ye("btn-go-payment","window.goToPayment()","Escolher Pagamento →","margin-top:8px;")}
                </div>
            </div>

            <!-- PAYMENT MODAL -->
            <div id="payment-modal" style="${Ie}align-items:flex-start;">
                <div style="${Be}">
                    ${Me('<i class="fa-solid fa-credit-card"></i> Forma de Pagamento',"window.closePayment()")}
                    <div id="payment-order-summary" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin-bottom:14px;font-size:0.9rem;"></div>
                    
                    <div id="mandatory-pay-msg" style="display:none;padding:12px;background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.2);border-radius:12px;margin-bottom:14px;color:#fbbf24;font-size:0.85rem;line-height:1.4;">
                        <i class="fa-solid fa-circle-info"></i> Atenção: Para pedidos para retirada é obrigatório o pagamento adiantado pois o produto vai ser reservado.
                    </div>

                    <div id="cat-coupon-section" style="display:none;margin-bottom:16px;">
                        <button onclick="window.catToggleCoupon()" style="background:none;border:none;color:#6366f1;font-size:0.85rem;font-weight:600;cursor:pointer;padding:4px 0;display:flex;align-items:center;gap:6px;margin-bottom:8px;">
                            <i class="fa-solid fa-tag" aria-hidden="true"></i>
                            <span id="cat-coupon-toggle-label">Tenho um cupom de desconto</span>
                        </button>
                        <div id="cat-coupon-input-wrapper" style="display:none;">
                            <div style="display:flex;gap:8px;">
                                <input id="cat-coupon-input" type="text" placeholder="Código do cupom" aria-label="Código do cupom" style="flex:1;padding:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.9rem;text-transform:uppercase;">
                                <button onclick="window.catApplyCoupon()" style="padding:10px 16px;background:rgba(99,102,241,0.2);color:#6366f1;border:1px solid rgba(99,102,241,0.3);border-radius:10px;cursor:pointer;font-weight:700;white-space:nowrap;" aria-label="Aplicar cupom"><i class="fa-solid fa-check" aria-hidden="true"></i> Aplicar</button>
                            </div>
                            <p id="cat-coupon-msg" style="font-size:0.8rem;margin:4px 0 0;min-height:16px;" aria-live="polite"></p>
                        </div>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:12px;">
                        <button id="btn-pay-delivery" onclick="window.catToggleDeliveryOptions()"
                            style="padding:16px;border-radius:14px;background:rgba(255,255,255,0.05);color:white;border:1px solid rgba(255,255,255,0.1);cursor:pointer;font-weight:700;font-size:0.95rem;text-align:left;display:flex;align-items:center;gap:12px;">
                            <i class="fa-solid fa-handshake" style="font-size:1.2rem;"></i> <span>Pagar na Entrega / Retirada</span>
                        </button>
                        
                        <div id="delivery-payment-details" style="display:none;margin-top:-4px;padding:16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;flex-direction:column;gap:12px;animation: fadeInDown 0.3s ease;">
                            <p style="margin:0;font-size:0.8rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Escolha como pagar:</p>
                            <div style="display:flex;gap:10px;">
                                <button onclick="window.catSelectDeliverySubMethod('dinheiro')" id="btn-sub-dinheiro" class="btn-sub-method" style="flex:1;padding:12px;border-radius:10px;background:rgba(255,255,255,0.05);color:white;border:1px solid rgba(255,255,255,0.1);cursor:pointer;font-size:0.9rem;font-weight:600;transition:all 0.2s;">
                                    <i class="fa-solid fa-money-bill-1" style="margin-right:6px;"></i> Dinheiro
                                </button>
                                <button onclick="window.catSelectDeliverySubMethod('cartao')" id="btn-sub-cartao" class="btn-sub-method" style="flex:1;padding:12px;border-radius:10px;background:rgba(255,255,255,0.05);color:white;border:1px solid rgba(255,255,255,0.1);cursor:pointer;font-size:0.9rem;font-weight:600;transition:all 0.2s;">
                                    <i class="fa-solid fa-credit-card" style="margin-right:6px;"></i> Cartão
                                </button>
                            </div>
                            <div id="troco-wrapper" style="display:none;padding:12px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.05);">
                                <label style="display:block;font-size:0.75rem;color:#94a3b8;margin-bottom:8px;font-weight:600;">Precisa de troco para quanto?</label>
                                <div style="display:flex;align-items:center;gap:8px;">
                                    <span style="color:#94a3b8;font-weight:700;">R$</span>
                                    <input type="number" id="cat-troco-input" placeholder="Ex: 50,00" style="flex:1;padding:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:white;font-size:1rem;font-weight:700;outline:none;">
                                </div>
                            </div>
                            <button id="btn-confirm-delivery-sub" onclick="window.confirmOrderDelivery()" disabled style="opacity:0.5;margin-top:4px;padding:14px;border-radius:12px;background:#6366f1;color:white;border:none;cursor:pointer;font-weight:800;font-size:1rem;transition:all 0.2s;box-shadow:0 4px 12px rgba(99,102,241,0.3);">
                                <i class="fa-solid fa-check" style="margin-right:8px;"></i> Confirmar Pedido
                            </button>
                        </div>
                        <button id="btn-pay-pix-manual" onclick="window.showPixManual()"
                            style="display:${o?"flex":"none"};padding:16px;border-radius:14px;background:rgba(16,185,129,0.08);color:#10b981;border:1px solid rgba(16,185,129,0.2);cursor:pointer;font-weight:700;font-size:0.95rem;text-align:left;align-items:center;gap:12px;">
                            <i class="fa-brands fa-pix" style="font-size:1.2rem;"></i> <span>PIX Manual</span>
                        </button>
                        <button id="btn-pay-pix-mp" onclick="window.confirmPixMercadoPago()"
                            style="display:${L?"flex":"none"};padding:16px;border-radius:14px;background:#009ee3;color:white;border:none;cursor:pointer;font-weight:700;font-size:0.95rem;text-align:left;align-items:center;gap:12px;">
                            <i class="fa-solid fa-credit-card" style="font-size:1.2rem;"></i> <span>Pagar via Mercado Pago (PIX)</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- PIX MANUAL MODAL -->
            <div id="pix-manual-modal" style="${Ie}align-items:flex-start;">
                <div style="${Be}">
                    ${Me('<i class="fa-brands fa-pix"></i> Pagamento via PIX',"window.closePixManual()")}
                    <div id="pix-manual-summary" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin-bottom:16px;font-size:0.9rem;"></div>
                    <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:14px;padding:16px;margin-bottom:16px;">
                        <p style="margin:0 0 6px;font-weight:700;font-size:0.9rem;color:#10b981;"><i class="fa-brands fa-pix"></i> Chave PIX:</p>
                        <p id="pix-key-value" style="margin:0 0 12px;font-family:monospace;font-size:1rem;color:white;word-break:break-all;"></p>
                        <button id="btn-copy-pix" onclick="window.copyPixKey()" style="padding:8px 16px;border-radius:8px;background:rgba(16,185,129,0.2);color:#10b981;border:1px solid rgba(16,185,129,0.3);cursor:pointer;font-weight:700;font-size:0.85rem;">Copiar</button>
                    </div>
                    <div style="margin-bottom:16px;">
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:8px;"><i class="fa-solid fa-receipt"></i> Comprovante de Pagamento <span style="color:#94a3b8;font-weight:400;">(opcional)</span></label>
                        <div onclick="document.getElementById('pix-comprovante-input').click()" style="border:2px dashed rgba(255,255,255,0.15);border-radius:12px;padding:18px;text-align:center;cursor:pointer;transition:all 0.2s;" 
                             onmouseover="this.style.borderColor='#6366f1'" onmouseout="this.style.borderColor='rgba(255,255,255,0.15)'">
                            <input type="file" id="pix-comprovante-input" accept="image/*,application/pdf" style="display:none;" onchange="window.previewComprovante(this)">
                            <img id="comprovante-preview" style="max-width:100%;max-height:140px;border-radius:8px;display:none;margin:0 auto 8px;">
                            <i class="fa-solid fa-cloud-arrow-up" style="font-size:1.5rem;color:#6366f1;display:block;margin-bottom:6px;"></i>
                            <p id="comprovante-label" style="margin:0;font-size:0.85rem;color:#94a3b8;">Clique para anexar o comprovante</p>
                        </div>
                    </div>
                    ${Ye("btn-confirm-pix-manual","window.confirmPixManual()",'<i class="fa-solid fa-check"></i> Enviar Comprovante')}
                </div>
            </div>

            <!-- MERCADO PAGO PIX MODAL -->
            <div id="mp-pix-modal" style="${Ie}align-items:flex-start;">
                <div style="${Be}">
                    ${Me('<i class="fa-solid fa-qrcode"></i> PIX — Mercado Pago',"window.closeMpPix()")}
                    <div id="mp-pix-summary" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin-bottom:16px;font-size:0.9rem;"></div>
                    <div style="text-align:center;margin-bottom:16px;">
                        <img id="mp-qr-img" style="width:180px;height:180px;border-radius:12px;background:white;padding:8px;display:none;margin:0 auto 12px;">
                        <p style="color:#94a3b8;font-size:0.85rem;margin-bottom:12px;">Ou copie o código abaixo:</p>
                        <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px;margin-bottom:10px;">
                            <p id="mp-qr-code" style="margin:0;font-family:monospace;font-size:0.75rem;color:#94a3b8;word-break:break-all;max-height:80px;overflow-y:auto;"></p>
                        </div>
                        <button id="btn-copy-mp-qr" onclick="window.copyMpQrCode()" style="padding:10px 20px;border-radius:10px;background:rgba(0,158,227,0.15);color:#009ee3;border:1px solid rgba(0,158,227,0.3);cursor:pointer;font-weight:700;font-size:0.9rem;">Copiar código</button>
                    </div>
                    <p style="text-align:center;color:#94a3b8;font-size:0.8rem;">Após o pagamento, seu pedido será processado automaticamente.</p>
                </div>
            </div>

            <!-- CONFIRMATION MODAL -->
            <div id="confirmation-modal" style="${Ie}">
                <div style="${Be}text-align:center;">
                    <div style="width:72px;height:72px;border-radius:50%;background:rgba(16,185,129,0.15);border:2px solid rgba(16,185,129,0.3);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
                        <i class="fa-solid fa-circle-check" style="font-size:2.5rem;color:#10b981;"></i>
                    </div>
                    <h2 style="margin:0 0 10px;font-size:1.4rem;font-weight:800;">Pedido Confirmado!</h2>
                    <p style="color:#94a3b8;margin-bottom:20px;">Seu pedido foi recebido com sucesso.</p>
                    <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:12px;padding:16px;margin-bottom:20px;">
                        <span style="font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;">Número do Pedido</span>
                        <p id="order-id-display" style="margin:6px 0 0;font-size:1.5rem;font-weight:800;letter-spacing:3px;color:#6366f1;">#000000</p>
                    </div>
                    <div id="pix-info-section" style="display:none;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:16px;margin-bottom:20px;text-align:left;">
                        <p style="margin:0 0 8px;font-weight:700;">⚡ Chave PIX para pagamento:</p>
                        <p id="pix-key-display" style="margin:0;font-family:monospace;font-size:1rem;color:#10b981;word-break:break-all;"></p>
                    </div>
                    <button onclick="document.getElementById('confirmation-modal').style.display='none'" style="width:100%;padding:14px;border-radius:14px;background:#6366f1;color:white;border:none;cursor:pointer;font-weight:700;">
                        Continuar Comprando
                    </button>
                </div>
            </div>

            <!-- INFO MODAL -->
            <div id="store-info-modal" style="${Ie}">
                <div style="${Be}max-width:500px;">
                    ${Me('<i class="fa-solid fa-circle-info"></i> Informações da Loja',"window.closeStoreInfo()")}
                    <div style="padding:10px 0;">
                        <h4 style="margin:0 0 10px;color:#6366f1;"><i class="fa-regular fa-clock"></i> Horário de Funcionamento</h4>
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:8px 16px;margin-bottom:20px;font-size:0.9rem;">
                            ${ze()}
                        </div>
                        <h4 style="margin:0 0 10px;color:#6366f1;"><i class="fa-solid fa-credit-card"></i> Formas de Pagamento</h4>
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:12px;font-size:0.9rem;display:flex;flex-wrap:wrap;gap:8px;">
                            <span class="badge info" style="background:rgba(59,130,246,0.1);color:#60a5fa;border:1px solid rgba(59,130,246,0.2);padding:4px 8px;border-radius:6px;font-size:0.8rem;"><i class="fa-solid fa-money-bill"></i> Na Entrega/Retirada</span>
                            ${o?'<span class="badge success" style="background:rgba(16,185,129,0.1);color:#4ade80;border:1px solid rgba(16,185,129,0.2);padding:4px 8px;border-radius:6px;font-size:0.8rem;"><i class="fa-brands fa-pix"></i> PIX</span>':""}
                            ${L?'<span class="badge primary" style="background:rgba(99,102,241,0.1);color:#818cf8;border:1px solid rgba(99,102,241,0.2);padding:4px 8px;border-radius:6px;font-size:0.8rem;"><i class="fa-solid fa-credit-card"></i> Mercado Pago</span>':""}
                        </div>
                    </div>
                </div>
            </div>

            <!-- CLOSED ALERT MODAL -->
            <div id="closed-alert-modal" style="${Ie}z-index:9999;">
                <div style="${Be}text-align:center;">
                    <div style="width:72px;height:72px;border-radius:50%;background:rgba(239,68,68,0.15);border:2px solid rgba(239,68,68,0.3);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
                        <i class="fa-solid fa-store-slash" id="closed-alert-icon" style="font-size:2.5rem;color:#ef4444;"></i>
                    </div>
                    <h2 id="closed-alert-title" style="margin:0 0 10px;font-size:1.4rem;font-weight:800;color:white;">Loja Fechada</h2>
                    <p id="closed-alert-desc" style="color:#94a3b8;margin-bottom:20px;">No momento não estamos aceitando pedidos.</p>
                    <div id="closed-alert-time-section" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;margin-bottom:20px;">
                        <span style="font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;"><i class="fa-regular fa-clock"></i> Voltamos</span>
                        <p id="next-open-time" style="margin:6px 0 0;font-size:1.2rem;font-weight:800;color:#6366f1;"></p>
                    </div>
                    <button onclick="document.getElementById('closed-alert-modal').style.display='none'" style="width:100%;padding:14px;border-radius:14px;background:rgba(255,255,255,0.1);color:white;border:none;cursor:pointer;font-weight:700;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
                        Entendi
                    </button>
                </div>
            </div>

            <!-- FLOATING CART BUTTON -->
            <button id="cart-float-btn" onclick="window.openCart()" style="display:none;" class="cart-float-btn">
                <div class="cart-float-left">
                    <i class="fa-solid fa-bag-shopping" style="font-size:1.2rem;"></i>
                    <span id="cart-badge-float" class="cart-badge-float">0</span>
                </div>
                <div class="cart-float-center">Ver sacola</div>
                <div class="cart-float-right" id="cart-total-float">R$ 0,00</div>
            </button>
        `:"";return setTimeout(()=>{X.size>0&&typeof fe=="function"&&fe()},100),`
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
                :root {
                    --primary-cat: ${U};
                    --primary-glow: ${U}4D;
                    --bg: ${F};
                    --card-bg: rgba(255,255,255,0.03);
                    --glass: rgba(255,255,255,0.05);
                    --text: ${S};
                    --text-muted: #94a3b8;
                    --price-cat: ${d};
                    --product-bg: ${I.productBgColor||"rgba(255,255,255,0.05)"};
                }
                @keyframes fadeInDown { from { opacity:0;transform:translateY(-30px); } to { opacity:1;transform:translateY(0); } }
                @keyframes pulse-soft { 0%{box-shadow:0 0 0 0 var(--primary-glow);} 70%{box-shadow:0 0 0 15px transparent;} 100%{box-shadow:0 0 0 0 transparent;} }
                .catalog-body { background:var(--bg);color:var(--text);font-family:'Outfit',sans-serif;min-height:100vh;margin:0;padding-bottom:80px;overflow-x:hidden; }
                .header { position:relative;padding:80px 20px 40px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px;animation:fadeInDown 0.8s cubic-bezier(0.2,0.8,0.2,1);overflow:hidden; }
                .header-glass { display:none; }
                .store-logo-wrapper { position:relative;z-index:1;padding:6px;background:linear-gradient(135deg,rgba(255,255,255,0.2),transparent);border-radius:50%;box-shadow:0 20px 40px rgba(0,0,0,0.3); }
                .store-logo { width:120px;height:120px;object-fit:cover;border-radius:50%;background:#fff;display:block;border:2px solid rgba(255,255,255,0.1); }
                .status-badge { z-index:1;display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);border-radius:100px;color:#10b981;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;animation:pulse-soft 2s infinite; }
                .header h1 { z-index:1;font-size:2.4rem;font-weight:800;margin:0 0 8px;letter-spacing:-1px;color:var(--text); }
                .header-address { z-index:1;color:var(--text-muted);font-size:0.95rem;margin:0 0 12px;max-width:400px;line-height:1.4;opacity:0.9; }
                .store-info-btn { z-index:1;font-size:0.9rem;margin-bottom:16px;display:flex;align-items:center;justify-content:center;gap:6px;color:var(--primary-cat);cursor:pointer;font-weight:700;background:var(--primary-glow);padding:6px 16px;border-radius:100px;transition:0.2s; }
                .store-status-card { background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px 20px;display:flex;flex-direction:column;gap:6px;font-size:0.9rem;color:var(--text);min-width:260px;backdrop-filter:blur(10px);z-index:1; }

                /* MODERNO THEME HDR */
                .cat-moderno-header { background: var(--bg); color: var(--text); border-bottom: 2px solid transparent; border-image: linear-gradient(to right, var(--primary-cat) 0%, transparent 100%) 1; }
                .cat-search-bar-top-container { padding: 16px 20px; background: rgba(0,0,0,0.02); }
                .cat-search-bar-wrap { display:flex; align-items:center; background:var(--bg); border-radius:12px; padding:0 16px; border:2px solid var(--primary-cat); max-width:1200px; margin:0 auto; box-shadow:0 4px 15px rgba(0,0,0,0.1); }
                .cat-search-bar-wrap i { color:var(--primary-cat); font-size:1.1rem; }
                .cat-search-bar-wrap input { flex:1; border:none; background:transparent; padding:16px; font-size:1.05rem; outline:none; color:var(--text); font-family:'Outfit',sans-serif; }
                .cat-search-bar-wrap input::placeholder { color:var(--text-muted); }
                .cat-moderno-banner-hero { width: 100%; height: 220px; overflow: hidden; position: relative; }
                .cat-moderno-banner-hero img { width: 100%; height: 100%; object-fit: cover; }
                .cat-moderno-banner-hero .cat-banner-fallback { width: 100%; height: 100%; background: linear-gradient(135deg, var(--primary-cat), rgba(0,0,0,0.2)); display:flex; align-items:center; justify-content:center; font-size:4rem; color:rgba(255,255,255,0.3); }
                .cat-moderno-info { max-width: 1200px; margin: 0 auto; padding: 0 20px 24px; position: relative; }
                .cat-moderno-logo-wrap { width: 110px; height: 110px; border-radius: 50%; border: 4px solid #ffffff; background: #ffffff; position: relative; margin-top: -55px; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); overflow: hidden; }
                .cat-moderno-logo-wrap img { width: 100%; height: 100%; object-fit: cover; }
                .cat-moderno-logo-wrap .fallback-logo { width:100%; height:100%; background:var(--primary-glow); display:flex; align-items:center; justify-content:center; }
                .cat-moderno-info h1 { font-size: 2rem; font-weight: 800; margin: 0 0 8px; color: var(--text); }
                .cat-moderno-address { font-size: 0.95rem; color: var(--text-muted); margin: 0 0 12px; font-weight: 500; }
                .moderno-more-info { color: var(--primary-cat); font-weight: 700; cursor: pointer; text-decoration: none; opacity: 0.8; transition: 0.2s; }
                .moderno-more-info:hover { opacity: 1; }
                .cat-moderno-status-row { display: flex; align-items: center; gap: 4px; font-size: 0.95rem; flex-wrap: wrap; font-weight: 600; color: var(--text); }


                .section-container { position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:0 20px; }
                .section-title { display:flex;align-items:center;gap:15px;margin:60px 0 30px 0; }
                .section-title span { font-size:1.8rem;font-weight:700;letter-spacing:-0.5px;color:var(--text); }
                .section-title .line { flex:1;height:1px;background:linear-gradient(to right,var(--primary-cat),transparent);opacity:0.3; }
                .section-title i { width:48px;height:48px;background:var(--glass);border:1px solid rgba(255,255,255,0.08);border-radius:14px;display:flex;align-items:center;justify-content:center;color:var(--primary-cat);font-size:1.2rem;box-shadow:0 10px 20px rgba(0,0,0,0.1); }
                .product-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:30px; }
                .product-card { background:var(--product-bg);border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;transition:all 0.4s cubic-bezier(0.2,0.8,0.2,1); }
                .product-card:hover { transform:translateY(-8px) scale(1.01);border-color:var(--primary-cat);box-shadow:0 20px 40px -10px rgba(0,0,0,0.4),0 0 20px var(--primary-glow); }
                .card-image { position:relative;aspect-ratio:1/1;overflow:hidden; }
                .card-image img { width:100%;height:100%;object-fit:cover;transition:transform 0.6s cubic-bezier(0.2,0.8,0.2,1); }
                .product-card:hover .card-image img { transform:scale(1.1); }
                .promo-tag { position:absolute;top:15px;right:15px;background:var(--primary-cat);color:white;padding:6px 14px;border-radius:12px;font-size:0.75rem;font-weight:800;box-shadow:0 8px 20px var(--primary-glow); }
                .card-info { padding:20px; }
                .card-info h3 { margin:0 0 12px 0;font-size:1.1rem;font-weight:700;color:var(--text);line-height:1.3; }
                .price-container { display:flex;align-items:center;gap:12px; }
                .price { font-size:1.3rem;font-weight:800;color:var(--price-cat); }
                .original-price { font-size:0.9rem;color:var(--text-muted);text-decoration:line-through;opacity:0.6; }
                .whatsapp-float { position:fixed;bottom:30px;right:30px;background:#25d366;color:white;padding:12px 24px;border-radius:100px;text-decoration:none;display:flex;align-items:center;gap:12px;font-weight:700;box-shadow:0 10px 25px rgba(37,211,102,0.4);z-index:7999;transition:all 0.3s;animation:fadeInDown 0.8s backwards 1s;white-space:nowrap;max-width:calc(100vw - 40px); }
                .whatsapp-float:hover { transform:scale(1.05) translateY(-5px); }
                .whatsapp-float i { font-size:1.5rem; }
                .delivery-card:hover { border-color: var(--primary-cat) !important; background: rgba(255,255,255,0.03); }
                /* Cat search/sidebar (Moderno theme) */
                .cart-float-btn { position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:var(--primary-cat);color:white;border:none;padding:14px 24px;border-radius:100px;font-weight:700;font-size:1rem;cursor:pointer;z-index:8000;align-items:center;justify-content:space-between;box-shadow:0 10px 30px rgba(0,0,0,0.3);width:fit-content;min-width:320px;display:none; transition:transform 0.2s; }
                .cart-float-btn:hover { transform:translateX(-50%) scale(1.02); }
                .cart-float-left { display:flex;align-items:center;gap:8px; }
                .cart-badge-float { background:white;color:var(--primary-cat);border-radius:100px;padding:2px 8px;font-size:0.75rem;font-weight:800; display:inline-block; line-height:1; }
                .cart-float-center { font-weight:700; }
                .cart-float-right { font-weight:700; }
                @media(max-width:600px) {
                    .cart-float-btn { bottom:0;left:0;transform:none;width:100%;border-radius:0;min-width:unset;padding:18px 24px;box-shadow:0 -5px 20px rgba(0,0,0,0.4); }
                    .cart-float-btn:hover { transform:none; }
                }
                .cat-search-bar { display:block;width:100%;padding:14px 18px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:100px;color:var(--text);font-size:1rem;font-family:'Outfit',sans-serif;box-sizing:border-box;outline:none;margin-bottom:24px;transition:border-color .2s; }
                .cat-search-bar:focus { border-color:var(--primary-cat); }
                .cat-search-bar::placeholder { color:#64748b; }
                .cat-sidebar { display:flex;flex-direction:column;gap:4px; }
                .cat-sidebar-link { display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;color:#94a3b8;cursor:pointer;font-size:0.92rem;font-weight:600;border:none;background:none;width:100%;text-align:left;transition:all .15s; }
                .cat-sidebar-link:hover,.cat-sidebar-link.active { background:rgba(99,102,241,.15);color:var(--text); }
                .cat-sidebar-link i { width:18px;text-align:center;color:var(--primary-cat); }
                .cat-modern-layout { display:grid;grid-template-columns:200px 1fr;gap:28px;max-width:1200px;margin:0 auto;padding:0 20px 80px; }
                /* Banner hero */
                .cat-banner-hero { width:100%;max-height:340px;overflow:hidden;position:relative; }
                .cat-banner-hero img { width:100%;height:100%;object-fit:cover;display:block; }
                .cat-banner-fallback { width:100%;height:180px;background:linear-gradient(135deg,var(--primary-cat),rgba(168,85,247,0.8));display:flex;align-items:center;justify-content:center; }
                /* Accessibility */
                *:focus-visible { outline:3px solid var(--primary-cat);outline-offset:2px; }
                @media(prefers-reduced-motion:reduce){ *,::before,::after { animation-duration:.01ms!important;transition-duration:.01ms!important; } }
                /* iFood Style Selector */
                .cat-selector-wrapper { margin: 24px 0 40px; }
                .cat-selector-scroll { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 12px; scrollbar-width: none; -ms-overflow-style: none; }
                .cat-selector-scroll::-webkit-scrollbar { display: none; }
                .cat-selector-item { flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; border: none; background: none; padding: 0; outline: none; transition: transform 0.2s; }
                .cat-selector-item:hover { transform: translateY(-3px); }
                .cat-selector-icon-wrap { width: 64px; height: 64px; border-radius: 18px; background: var(--glass); border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content:center; color: var(--primary-cat); font-size: 1.4rem; transition: all 0.3s; box-shadow: 0 8px 16px rgba(0,0,0,0.1); }
                .cat-selector-item.active .cat-selector-icon-wrap { background: var(--primary-cat); color: white; border-color: var(--primary-cat); box-shadow: 0 10px 20px var(--primary-glow); }
                .cat-selector-label { font-size: 0.82rem; font-weight: 600; color: var(--text); opacity: 0.8; transition: opacity 0.3s; white-space: nowrap; }
                .cat-selector-item.active .cat-selector-label { opacity: 1; color: var(--primary-cat); }
                .promo-highlight { color: #fbbf24 !important; text-shadow: 0 0 15px rgba(251, 191, 36, 0.4); }
                .section-title.promo i { background: rgba(251, 191, 36, 0.15); border-color: rgba(251, 191, 36, 0.3); color: #fbbf24; }
                .section-container-cat { animation: fadeInDown 0.5s ease backwards; }
                @media(max-width:768px){ 
                    .cat-modern-layout { grid-template-columns:1fr; gap:16px; } 
                    .cat-sidebar-sticky { display:block; position:-webkit-sticky; position:sticky; top:0; height:auto; z-index:10; background:var(--bg); padding-top:10px; margin:-10px -20px 0; width:100vw; } 
                    .cat-sidebar { display:flex; flex-direction:row; flex-wrap:nowrap; overflow-x:auto; padding:0 20px 10px; scrollbar-width:none; -ms-overflow-style:none; gap:8px; width:100%; }
                    .cat-sidebar::-webkit-scrollbar { display:none; }
                    .cat-sidebar-link { flex:0 0 auto; white-space:nowrap; width:auto; padding:8px 16px; border:1px solid rgba(255,255,255,0.1); display:inline-flex; align-items:center; }
                    .cat-sidebar-sticky p { display:none; }
                }
                @media(max-width:600px){
                    .header{padding:60px 20px 30px;} .header h1{font-size:2rem;letter-spacing:-.5px;} 
                    .store-logo{width:80px;height:80px;} .product-grid{grid-template-columns:repeat(2,1fr);gap:12px;}
                    .section-container{padding:0 14px;} .section-title{margin:36px 0 16px;}
                    .section-title span{font-size:1.3rem;} .section-title i{width:36px;height:36px;font-size:0.9rem;}
                    .card-info{padding:12px;} .card-info h3{font-size:0.88rem;} .price{font-size:0.95rem;}
                    .whatsapp-float{bottom:16px;right:16px;padding:10px 14px;font-size:0.85rem;}
                    .cat-banner-hero{max-height:160px;}
                }
                @media(max-width:380px){ .whatsapp-float{padding:12px;border-radius:50%;right:12px;bottom:12px;} .whatsapp-float span{display:none;} }
            </style>

            <div class="catalog-body">
                ${D!=="moderno"?`
                <header class="header">
                    <div class="header-glass"></div>
                    <div class="status-badge"><i class="fa-solid fa-circle" style="font-size:6px;"></i> Loja Online</div>
                    ${s?`<div class="store-logo-wrapper"><img src="${s}" alt="${m.name}" class="store-logo"></div>`:'<div style="width:90px;height:90px;border-radius:50%;background:var(--primary-glow);display:flex;align-items:center;justify-content:center;position:relative;z-index:1;"><i class="fa-solid fa-store" style="font-size:2rem;color:var(--primary-cat);"></i></div>'}
                    <h1>${m.name}</h1>
                    <p class="header-address"><i class="fa-solid fa-location-dot" style="margin-right:4px;opacity:0.7;"></i> ${m.address||"Endereço não cadastrado"}</p>
                    
                    <div class="store-info-btn" onclick="window.openStoreInfo()">
                        Mais informações <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;margin-left:4px;"></i>
                    </div>

                    <div class="store-status-card">
                        <div style="font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px;">
                            ${Te()}
                        </div>
                        ${ge?`
                        <div style="height:1px;background:rgba(255,255,255,0.05);margin:2px 0;"></div>
                        <div style="color:var(--text-muted);display:flex;align-items:center;justify-content:center;gap:6px;">
                            <i class="fa-solid fa-motorcycle"></i> ${re!==!1?"Entrega e Retirada":"Apenas Retirada"}
                        </div>
                        `:""}
                    </div>
                </header>
                `:""}

                ${D==="banner"?`
                    <!-- Banner hero -->
                    ${Q||a?`
                        <div class="cat-banner-hero" aria-label="Banner da loja">
                            <picture>
                                ${a?`<source media="(max-width:600px)" srcset="${a}">`:""}
                                <img src="${Q||a}" alt="Banner ${m.name}">
                            </picture>
                        </div>`:`
                        <div class="cat-banner-fallback" aria-hidden="true">
                            <i class="fa-solid fa-store" style="font-size:3rem;color:rgba(255,255,255,0.3);"></i>
                        </div>`}
                    <main class="section-container" style="padding-top:20px;">
                        ${oa}
                        ${E.length>0?`<div class="section-title"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i><span>Ofertas do Dia</span><div class="line"></div></div><div class="product-grid" role="list">${E.map(t=>Ee(t,!0)).join("")}</div>`:""}
                        ${g.map(t=>`<div class="section-title"><i class="fa-solid ${t.icon||"fa-tag"}" aria-hidden="true"></i><span>${t.name}</span><div class="line"></div></div><div class="product-grid" role="list">${t.products.map(c=>Ee(c,!1)).join("")}</div>`).join("")}
                        ${z.length>0?`<div class="section-title"><i class="fa-solid fa-box" aria-hidden="true"></i><span>Outros</span><div class="line"></div></div><div class="product-grid" role="list">${z.map(t=>Ee(t,!1)).join("")}</div>`:""}
                        ${p.length===0?'<div style="text-align:center;padding:80px 20px;color:var(--text-muted);"><i class="fa-solid fa-box-open" style="font-size:3rem;opacity:.3;display:block;margin-bottom:16px;"></i><p>Nenhum produto disponível no momento.</p></div>':""}
                    </main>

                `:D==="moderno"?`
                    <!-- Moderno layout: sidebar + search + new header -->
                    <div class="cat-moderno-header">
                        <div class="cat-search-bar-top-container">
                            <div class="cat-search-bar-wrap">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <input type="search" id="cat-search-bar-top" placeholder="Buscar no catálogo" aria-label="Buscar produto" oninput="window.catSearch(this.value)">
                            </div>
                        </div>
                        
                        <div class="cat-moderno-banner-hero">
                            ${Q||a?`
                            <picture>
                                ${a?`<source media="(max-width:600px)" srcset="${a}">`:""}
                                <img src="${Q||a}" alt="Banner ${m.name}">
                            </picture>
                            `:`
                            <div class="cat-banner-fallback">
                                <i class="fa-solid fa-store"></i>
                            </div>
                            `}
                        </div>

                        <div class="cat-moderno-info">
                            <div class="cat-moderno-logo-wrap">
                                ${s?`<img src="${s}" alt="${m.name}">`:'<div class="fallback-logo"><i class="fa-solid fa-store" style="font-size:2rem;color:var(--primary-cat);"></i></div>'}
                            </div>
                            <h1>${m.name}</h1>
                            <p class="cat-moderno-address">
                                ${m.address||"Endereço não cadastrado"} <span style="margin:0 8px;">•</span> <span class="moderno-more-info" onclick="window.openStoreInfo()">Mais informações</span>
                            </p>
                            <div class="cat-moderno-status-row">
                                ${Te()} 
                                ${ge?`<span class="badge" style="background:rgba(148,163,184,0.1);color:#475569;border:1px solid rgba(148,163,184,0.2);margin-left:8px;font-size:0.8rem;padding:4px 10px;border-radius:6px;font-weight:700;">${re!==!1?"Entrega e Retirada":"Apenas Retirada"}</span>`:""}
                            </div>
                        </div>
                    </div>

                    <div class="cat-modern-layout" style="padding-top:20px;">
                        <aside class="cat-sidebar-sticky" style="position:sticky;top:20px;height:fit-content;" aria-label="Categorias">
                            <p style="font-size:0.7rem;text-transform:uppercase;letter-spacing:.08em;color:#64748b;font-weight:700;margin:0 0 10px 14px;">Categorias</p>
                            <nav class="cat-sidebar">
                                <button class="cat-sidebar-link active" onclick="window.catFilterCat('all')" aria-pressed="true">
                                    <i class="fa-solid fa-th-large" aria-hidden="true"></i> Todos
                                </button>
                                ${E.length>0?`<button class="cat-sidebar-link" onclick="window.catFilterCat('promo')"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i> Ofertas</button>`:""}
                                ${g.map(t=>`<button class="cat-sidebar-link" onclick="window.catFilterCat('${t.id}')"><i class="fa-solid ${t.icon||"fa-tag"}" aria-hidden="true"></i> ${t.name}</button>`).join("")}
                                ${z.length>0?`<button class="cat-sidebar-link" onclick="window.catFilterCat('outros')"><i class="fa-solid fa-box" aria-hidden="true"></i> Outros</button>`:""}
                            </nav>
                        </aside>
                        <div>
                            <div id="cat-moderno-content">
                                ${oa}
                                ${E.length>0?`<div class="section-title" data-catgroup="promo"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i><span>Ofertas do Dia</span><div class="line"></div></div><div class="product-grid" data-catgroup="promo" role="list">${E.map(t=>Ee(t,!0)).join("")}</div>`:""}
                                ${g.map(t=>`<div class="section-title" data-catgroup="${t.id}"><i class="fa-solid ${t.icon||"fa-tag"}" aria-hidden="true"></i><span>${t.name}</span><div class="line"></div></div><div class="product-grid" data-catgroup="${t.id}" role="list">${t.products.map(c=>Ee(c,!1)).join("")}</div>`).join("")}
                                ${z.length>0?`<div class="section-title" data-catgroup="outros"><i class="fa-solid fa-box" aria-hidden="true"></i><span>Outros</span><div class="line"></div></div><div class="product-grid" data-catgroup="outros" role="list">${z.map(t=>Ee(t,!1)).join("")}</div>`:""}
                                ${p.length===0?'<div style="text-align:center;padding:80px 20px;color:#64748b;"><i class="fa-solid fa-box-open" style="font-size:3rem;opacity:.3;display:block;margin-bottom:16px;"></i><p>Nenhum produto disponível.</p></div>':""}
                            </div>
                        </div>
                    </div>
                `:`
                    <!-- Clássico (default) -->
                    <main class="section-container">
                        <div style="margin-top:20px;">
                            <input type="search" class="cat-search-bar" placeholder="O que você procura hoje?" oninput="window.catSearch(this.value)">
                        </div>
                        <div class="cat-selector-wrapper">
                            <div class="cat-selector-scroll">
                                <button class="cat-selector-item active" onclick="window.catFilterClassic('all')">
                                    <div class="cat-selector-icon-wrap"><i class="fa-solid fa-th-large"></i></div>
                                    <span class="cat-selector-label">Todos</span>
                                </button>
                                ${E.length>0?`
                                <button class="cat-selector-item" onclick="window.catFilterClassic('promo')">
                                    <div class="cat-selector-icon-wrap" style="color:#fbbf24;"><i class="fa-solid fa-bolt-lightning"></i></div>
                                    <span class="cat-selector-label">Ofertas</span>
                                </button>`:""}
                                ${g.map(t=>`
                                <button class="cat-selector-item" onclick="window.catFilterClassic('${t.id}')">
                                    <div class="cat-selector-icon-wrap"><i class="fa-solid ${t.icon||"fa-tag"}"></i></div>
                                    <span class="cat-selector-label">${t.name}</span>
                                </button>`).join("")}
                                ${z.length>0?`
                                <button class="cat-selector-item" onclick="window.catFilterClassic('outros')">
                                    <div class="cat-selector-icon-wrap"><i class="fa-solid fa-box"></i></div>
                                    <span class="cat-selector-label">Outros</span>
                                </button>`:""}
                            </div>
                        </div>

                        <div id="classic-promo-section" style="${E.length>0?"":"display:none;"}">
                            <div class="section-title promo"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i><span class="promo-highlight">Ofertas do Dia</span><div class="line" style="background:linear-gradient(to right,#fbbf24,transparent);"></div></div>
                            <div class="product-grid" role="list">${E.map(t=>Ee(t,!0)).join("")}</div>
                        </div>

                        <div id="classic-categories-container">
                            ${g.map(t=>`
                                <div class="section-container-cat" data-classic-cat="${t.id}">
                                    <div class="section-title"><i class="fa-solid ${t.icon||"fa-tag"}" aria-hidden="true"></i><span>${t.name}</span><div class="line"></div></div>
                                    <div class="product-grid" role="list">${t.products.map(c=>Ee(c,!1)).join("")}</div>
                                </div>
                            `).join("")}
                            ${z.length>0?`
                                <div class="section-container-cat" data-classic-cat="outros">
                                    <div class="section-title"><i class="fa-solid fa-box" aria-hidden="true"></i><span>Outros</span><div class="line"></div></div>
                                    <div class="product-grid" role="list">${z.map(t=>Ee(t,!1)).join("")}</div>
                                </div>
                            `:""}
                        </div>

                        ${p.length===0?'<div style="text-align:center;padding:100px 20px;color:var(--text-muted);"><i class="fa-solid fa-box-open" style="font-size:4rem;opacity:0.3;display:block;margin-bottom:20px;"></i><p>Nenhum produto disponível no momento.</p></div>':""}
                    </main>
                `}

                ${b?`
                    <a href="https://wa.me/${b}" target="_blank" rel="noopener noreferrer" class="whatsapp-float" aria-label="Falar conosco via WhatsApp">
                        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i><span>Falar conosco</span>
                    </a>`:""}

                ${wa}
            </div>
        `}catch(e){return console.error("Catalog Error:",e),"<p>Erro ao carregar catálogo.</p>"}},ya=async i=>(setTimeout(()=>{const e=document.getElementById("remote-qrcode"),f=document.getElementById("qr-content-active"),k=document.getElementById("qr-content-success");if(!e)return;let m=null,$=null;const v=()=>{m&&clearInterval(m),$&&clearInterval($)},x=async()=>{try{const j=await be.getQRCode(i);j&&j.base64?e.innerHTML=`<img src="${j.base64}" style="width: 250px; height: 250px; display: block; border-radius: 8px;">`:(await be.getInstanceStatus(i)).connected&&N()}catch(j){console.error("Error fetching QR:",j)}},M=async()=>{try{(await be.getInstanceStatus(i)).connected&&N()}catch(j){console.error("Error checking status:",j)}},N=()=>{v(),f&&(f.style.display="none"),k&&(k.style.display="flex")};x(),m=setInterval(x,4e4),$=setInterval(M,3e3);const _=setInterval(()=>{document.getElementById("remote-qrcode")||(v(),clearInterval(_))},1e3)},100),`
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
            
            :root {
                --primary: #6366f1;
                --primary-glow: rgba(99, 102, 241, 0.3);
                --bg: #0f172a;
                --glass: rgba(255, 255, 255, 0.05);
                --text: #ffffff;
                --text-muted: #94a3b8;
            }

            .qr-body {
                background: var(--bg);
                color: var(--text);
                font-family: 'Outfit', sans-serif;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0;
                background-image: 
                    radial-gradient(circle at 0% 0%, var(--primary-glow) 0%, transparent 40%),
                    radial-gradient(circle at 100% 100%, var(--primary-glow) 0%, transparent 40%);
            }

            .qr-card {
                background: var(--glass);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 32px;
                padding: 3rem;
                width: 100%;
                max-width: 480px;
                text-align: center;
                box-shadow: 0 40px 100px rgba(0,0,0,0.5);
                animation: scaleUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
            }

            @keyframes scaleUp {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }

            .qr-icon {
                font-size: 3rem;
                margin-bottom: 1.5rem;
                color: var(--primary);
                display: inline-block;
                animation: float 3s ease-in-out infinite;
            }

            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }

            h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; letter-spacing: -1px; }
            p { color: var(--text-muted); margin-bottom: 2.5rem; line-height: 1.6; }

            .qrcode-container {
                background: white;
                padding: 20px;
                border-radius: 20px;
                display: inline-block;
                margin-bottom: 2.5rem;
                box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                min-width: 250px;
                min-height: 250px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .status-indicator {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                font-size: 0.9rem;
                font-weight: 600;
                color: var(--text-muted);
            }

            .pulse {
                width: 8px;
                height: 8px;
                background: var(--primary);
                border-radius: 50%;
                display: inline-block;
                box-shadow: 0 0 0 var(--primary-glow);
                animation: pulse-ring 1.5s infinite;
            }

            @keyframes pulse-ring {
                0% { transform: scale(0.95); box-shadow: 0 0 0 0 var(--primary-glow); }
                70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
                100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
            }

            .success-message {
                display: none;
                flex-direction: column;
                align-items: center;
                gap: 15px;
            }

            .success-icon {
                width: 80px;
                height: 80px;
                background: #10b981;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 2.5rem;
                margin-bottom: 1rem;
                box-shadow: 0 15px 30px rgba(16, 185, 129, 0.3);
            }
        </style>

        <div class="qr-body">
            <div class="qr-card">
                <div id="qr-content-active">
                    <div class="qr-icon"><i class="fa-solid fa-qrcode"></i></div>
                    <h1>Conectar WhatsApp</h1>
                    <p>Escaneie o QR Code abaixo com o seu WhatsApp para ativar a integração.</p>
                    
                    <div class="qrcode-container" id="remote-qrcode">
                        <i class="fa-solid fa-spinner fa-spin fa-3x" style="color: var(--bg);"></i>
                    </div>

                    <div class="status-indicator">
                        <span class="pulse"></span>
                        Aguardando leitura do QR Code...
                    </div>
                </div>

                <div id="qr-content-success" class="success-message">
                    <div class="success-icon">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <h1 style="color: #10b981;">Conectado!</h1>
                    <p>O WhatsApp foi vinculado com sucesso. Você já pode fechar esta página.</p>
                </div>
            </div>
        </div>
    `),st=[{key:"pedido_aceito_entrega_pago",label:"Pedido aceito (Entrega pagamento adiantado)",icon:"fa-check-circle",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado (Pagamento Adiantado). 

📦 Itens: {{lista_produtos}}
💰 Total: R$ {{valor_total}}`},{key:"pedido_aceito_entrega_pendente",label:"Pedido aceito (Entrega pagamento na entrega)",icon:"fa-motorcycle",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado. O pagamento será feito na entrega. 

📦 Itens: {{lista_produtos}}
💰 Total: R$ {{valor_total}}`},{key:"pedido_aceito_retirada",label:"Pedido Aceito (Retirada)",icon:"fa-store",default:"Olá {{nome_lead}}! Pedido #{{numero_pedido}} aceito para retirada. Valor: R$ {{valor_total}}. Aguardamos você!"},{key:"pagamento_confirmado",label:"Pagamento Confirmado",icon:"fa-credit-card",default:"Olá {{nome_lead}}! Pagamento do pedido #{{numero_pedido}} confirmado. Já estamos preparando!"},{key:"pedido_pronto",label:"Pedido Pronto (Retirada)",icon:"fa-box",default:"Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} está pronto para retirada!"},{key:"saiu_para_entrega",label:"Saiu para Entrega",icon:"fa-truck",default:"Olá {{nome_lead}}! Pedido #{{numero_pedido}} saiu para entrega: {{endereco_entrega}}"},{key:"pedido_entregue",label:"Pedido Entregue / Finalizado",icon:"fa-flag-checkered",default:"Olá {{nome_lead}}! Pedido #{{numero_pedido}} finalizado. Obrigado pela preferência!"},{key:"pedido_cancelado",label:"Pedido Cancelado",icon:"fa-xmark",default:"Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi cancelado."},{key:"pedido_recebido",label:"Pedido Recebido (Aguardando Aprovação)",icon:"fa-clock",default:"Olá {{nome_lead}}! Recebemos seu pedido #{{numero_pedido}}. Estamos revisando e já te informamos o status! ⏳"}],nt=[{key:"{{nome_lead}}",label:"Nome do cliente",icon:"fa-user"},{key:"{{numero_pedido}}",label:"Nº do pedido",icon:"fa-hashtag"},{key:"{{lista_produtos}}",label:"Lista de produtos",icon:"fa-basket-shopping"},{key:"{{valor_total}}",label:"Valor total",icon:"fa-money-bill"},{key:"{{endereco_entrega}}",label:"Endereço de entrega",icon:"fa-location-dot"},{key:"{{forma_pagamento}}",label:"Forma de pagamento",icon:"fa-credit-card"}],aa=[{key:"seg",label:"Segunda-feira"},{key:"ter",label:"Terça-feira"},{key:"qua",label:"Quarta-feira"},{key:"qui",label:"Quinta-feira"},{key:"sex",label:"Sexta-feira"},{key:"sab",label:"Sábado"},{key:"dom",label:"Domingo"}],rt=async()=>{const i=ce.getCurrentUser();if(!i||!i.companyId)return"<p>Acesso negado.</p>";const e=i.companyId,f=await T.get("companies",e);let k=f?.stores||[];const m=!!f?.mercadoPagoToken;if(i.role!=="owner"){const S=i.storeIds||(i.storeId?[i.storeId]:[]);k=k.filter(d=>S.includes(d.id))}if(k.length===0)return'<p style="padding:2rem;">Nenhuma loja disponível para configuração.</p>';const $=await T.getAll("instancias",{field:"empresaId",operator:"==",value:e}),v=await T.getAll("loja_config",{field:"empresaId",operator:"==",value:e});let x=k[0].id;const M=S=>v.find(d=>d.lojaId===S)||null,N=()=>`
        <div class="store-tabs" style="display:flex; gap:10px; margin-bottom:20px; overflow-x:auto;">
            ${k.map(S=>`
                <button class="btn-store-tab ${S.id===x?"active":""}" data-id="${S.id}" style="
                    padding: 0.5rem 1rem;
                    background: ${S.id===x?"var(--primary)":"var(--surface-hover)"};
                    color: ${S.id===x?"#fff":"var(--text-main)"};
                    border: 1px solid ${S.id===x?"var(--primary)":"var(--border-color)"};
                    border-radius: 8px; cursor: pointer; white-space: nowrap;
                ">
                    <i class="fa-solid fa-store" style="margin-right:5px;"></i> ${S.name}
                </button>
            `).join("")}
        </div>`,_=()=>nt.map(S=>`
        <div class="var-chip" draggable="true" data-var="${S.key}" title="Clique para copiar">
            <i class="fa-solid ${S.icon}"></i>
            <span>${S.label}</span>
            <code>${S.key}</code>
        </div>
    `).join("");return setTimeout(()=>{j(),I()},100),`
        <style>
            .config-section-title {
                font-size: 1.1rem; font-weight: 700; color: var(--text-main);
                display: flex; align-items: center; gap: 10px;
                margin-bottom: 1.25rem; padding-bottom: 0.75rem;
                border-bottom: 1px solid var(--border-color);
            }
            .config-select {
                width: 100%; padding: 0.75rem 1rem;
                background-color: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                color: var(--text-main); font-size: 0.9rem;
                appearance: none; cursor: pointer;
                transition: border-color .2s;
            }
            .config-select:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 2px rgba(99,102,241,.15); }
            .config-input {
                width: 100%; padding: 0.75rem 1rem;
                background: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                color: var(--text-main); font-size: 0.9rem;
                box-sizing: border-box; transition: border-color .2s;
                height: 44px;
            }
            .config-input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 2px rgba(99,102,241,.15); }
            .config-input::placeholder { color: var(--text-dim); }
            .config-label {
                display: block; font-size: 0.75rem; font-weight: 700;
                color: var(--text-dim); text-transform: uppercase;
                letter-spacing: 0.05em; margin-bottom: 6px;
            }
            .cat-field-hint {
                font-size: 0.75rem; color: var(--text-dim); margin-top: 4px;
            }
            .cat-field { margin-bottom: 1.25rem; }
            .theme-card-grid {
                display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 1.25rem;
            }
            @media(max-width:600px) { .theme-card-grid { grid-template-columns: 1fr; } }
            .theme-card {
                border: 2px solid var(--border-color); border-radius: 12px;
                padding: 14px; cursor: pointer; transition: all .2s;
                background: rgba(255,255,255,0.02);
            }
            .theme-card:hover { border-color: rgba(99,102,241,.5); background: rgba(99,102,241,.04); }
            .theme-card.active { border-color: var(--primary); background: rgba(99,102,241,.08); }
            .theme-card-preview {
                height: 72px; border-radius: 8px; margin-bottom: 8px;
                overflow: hidden; background: var(--surface-hover);
                display: flex; flex-direction: column; gap: 4px; padding: 6px;
            }
            .theme-card-name { font-size: 0.85rem; font-weight: 700; text-align: center; }
            .theme-card-desc { font-size: 0.75rem; color: var(--text-dim); text-align: center; margin-top: 2px; }
            .vars-grid {
                display: flex; flex-wrap: wrap; gap: 0.5rem;
                margin-bottom: 1.5rem; padding: 1rem;
                background: rgba(99,102,241,0.04);
                border: 1px dashed rgba(99,102,241,0.25);
                border-radius: var(--radius-md);
            }
            .var-chip {
                display: inline-flex; align-items: center; gap: 0.4rem;
                padding: 0.35rem 0.75rem;
                background: rgba(99,102,241,0.12);
                border: 1px solid rgba(99,102,241,0.3);
                border-radius: 6px; font-size: 0.82rem;
                color: var(--primary); cursor: grab; user-select: none;
            }
            .var-chip code { font-size: 0.72rem; color: rgba(167,139,250,0.8); font-family: monospace; }
            .msg-card {
                background: rgba(255,255,255,0.03);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                overflow: hidden; margin-bottom: 1rem;
            }
            .msg-card-header {
                display: flex; align-items: center; gap: 0.6rem;
                padding: 0.75rem 1rem;
                background: rgba(255,255,255,0.025);
                border-bottom: 1px solid var(--border-color);
                font-weight: 600; font-size: 0.9rem;
            }
            .msg-editor-wrap { padding: 1rem; }
            .msg-textarea {
                width: 100%; background: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-sm); color: var(--text-main);
                font-size: 0.9rem; padding: 0.75rem; resize: vertical;
                box-sizing: border-box; font-family: inherit;
            }
            .msg-textarea:focus { outline: none; border-color: var(--primary); }
            .msg-save-row {
                display: flex; align-items: center;
                justify-content: space-between; margin-top: 0.75rem;
            }
            .btn-save-msg {
                padding: 0.45rem 1rem; background: var(--primary);
                color: white; border: none; border-radius: var(--radius-sm);
                font-size: 0.85rem; font-weight: 600; cursor: pointer;
            }
            .btn-save-msg:hover { background: var(--primary-hover); }
            .btn-save-msg.saved { background: var(--success); pointer-events: none; }
            .horarios-grid { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem; }
            .horario-row {
                display: flex; align-items: center; justify-content: space-between;
                padding: 0.75rem 1rem;
                background: rgba(255,255,255,0.02);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md); transition: 0.2s;
            }
            .horario-row.inactive { opacity: 0.6; background: transparent; }
            .horario-info { display: flex; align-items: center; gap: 1rem; flex: 1; }
            .horario-label { font-weight: 600; min-width: 120px; }
            .horario-inputs { display: flex; align-items: center; gap: 0.5rem; transition: 0.3s; }
            .horario-inputs.hidden { display: none; }
            .time-input {
                background: var(--bg-color); border: 1px solid var(--border-color);
                color: white; padding: 0.4rem 0.6rem;
                border-radius: 6px; font-size: 0.85rem; outline: none;
            }
            .time-input:focus { border-color: var(--primary); }
            .switch { position: relative; display: inline-block; width: 40px; height: 20px; }
            .switch input { opacity: 0; width: 0; height: 0; }
            .slider {
                position: absolute; cursor: pointer;
                top: 0; left: 0; right: 0; bottom: 0;
                background-color: #333; transition: .4s; border-radius: 20px;
            }
            .slider:before {
                position: absolute; content: "";
                height: 14px; width: 14px; left: 3px; bottom: 3px;
                background-color: white; transition: .4s; border-radius: 50%;
            }
            input:checked + .slider { background-color: var(--primary); }
            input:checked + .slider:before { transform: translateX(20px); }
        </style>

        <div class="page-header">
            <h2 class="page-title">Configuração do Catálogo</h2>
        </div>

        <div id="cat-tabs-container">
            ${N()}
        </div>

        <div id="cat-config-content-area"></div>
    `;function j(){const S=()=>{document.querySelectorAll(".btn-store-tab").forEach(d=>{d.addEventListener("click",()=>{x=d.dataset.id;const s=document.getElementById("cat-tabs-container");s&&(s.innerHTML=N(),S()),I()})})};S()}function I(){const S=document.getElementById("cat-config-content-area");if(!S)return;const d=M(x),s=d?.design||{},o=d?.mensagens_automaticas||{},l=`${window.location.origin}/catalog/${x}`,r=d?.instancia_id||k.find(b=>b.id===x)?.instancia_id||"",h=(b,L)=>{const p=d?.[L]||{};return aa.map(E=>{const D=p[E.key]||{},Q=D.ativo??D.aberto??E.key!=="dom",a=D.inicio||D.abertura||"08:00",g=D.fim||D.fechamento||"18:00";return`
                <div class="horario-row ${Q?"":"inactive"}" id="${b}-row-${E.key}">
                    <div class="horario-info">
                        <label class="switch">
                            <input type="checkbox" class="${b}-toggle" data-dia="${E.key}" ${Q?"checked":""}>
                            <span class="slider"></span>
                        </label>
                        <span class="horario-label">${E.label}</span>
                    </div>
                    <div class="horario-inputs ${Q?"":"hidden"}" id="${b}-inputs-${E.key}">
                        <input type="time" class="time-input" id="${b}-open-${E.key}" value="${a}">
                        <span style="color:var(--text-dim);font-size:0.8rem;">até</span>
                        <input type="time" class="time-input" id="${b}-close-${E.key}" value="${g}">
                    </div>
                    <div class="status-label" id="${b}-status-${E.key}" style="font-size:0.8rem;color:${Q?"var(--success)":"var(--text-dim)"};min-width:70px;text-align:right;">
                        ${Q?"Aberto":"Fechado"}
                    </div>
                </div>`}).join("")},y=st.map(b=>`
            <div class="msg-card" id="msg-card-${b.key}">
                <div class="msg-card-header">
                    <i class="fa-solid ${b.icon}" style="color:var(--primary);"></i>
                    <span>${b.label}</span>
                </div>
                <div class="msg-editor-wrap">
                    <textarea id="cat-msg-${b.key}" class="msg-textarea" rows="3"
                        placeholder="${b.default}" data-msg-key="${b.key}"
                    >${o[b.key]||""}</textarea>
                    <div class="msg-save-row">
                        <span style="font-size:0.75rem;color:var(--text-dim);">
                            <i class="fa-solid fa-circle-info"></i> Arraste as variáveis acima para o texto
                        </span>
                        <button class="btn-save-msg cat-save-single-msg" data-msg-key="${b.key}">
                            <i class="fa-solid fa-floppy-disk"></i> Salvar
                        </button>
                    </div>
                </div>
            </div>
        `).join("");S.innerHTML=`

            <!-- ── Link do catálogo ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-link" style="color:var(--primary);"></i> Link do Catálogo
                </div>
                <div style="display:flex;gap:10px;align-items:center;background:rgba(99,102,241,0.06);border:1px dashed rgba(99,102,241,0.3);border-radius:var(--radius-md);padding:0.75rem 1rem;">
                    <i class="fa-solid fa-store" style="color:var(--primary);"></i>
                    <input type="text" id="cat-link-display" value="${l}" readonly style="flex:1;background:transparent;border:none;color:var(--text-main);font-size:0.9rem;outline:none;">
                    <button class="btn-save-msg" id="btn-copy-cat-link"><i class="fa-solid fa-copy"></i> Copiar</button>
                    <a href="${l}" target="_blank" class="btn-secondary" style="padding:0.4rem 0.75rem;font-size:0.85rem;">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </div>
            </div>

            <!-- ── Instância ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-brands fa-whatsapp" style="color:#25d366;"></i> Vinculação da Instância
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Selecione a instância de WhatsApp que enviará mensagens automáticas para esta loja.
                </p>
                <select id="cat-instance-select" class="config-select">
                    <option value="">-- Nenhuma instância --</option>
                    ${$.map(b=>`
                        <option value="${b.id}" ${b.id===r?"selected":""}>
                            ${b.nome} (${b.status})
                        </option>
                    `).join("")}
                </select>
                <div id="cat-instance-indicator" style="margin-top:10px;"></div>
            </div>

            <!-- ── Aparência ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-palette" style="color:var(--primary);"></i> Aparência e Redes Sociais
                </div>

                <!-- Meta Description -->
                <div class="cat-field">
                    <label class="config-label">Descrição para Compartilhamento</label>
                    <input type="text" id="cat-meta-description" value="${s.metaDescription||""}" class="config-input" placeholder="Ex: Melhores lanches da região. Peça agora!">
                    <p class="cat-field-hint">Texto que aparece quando você compartilha o link no WhatsApp/FB/Insta.</p>
                </div>

                <!-- Logo -->
                <div class="cat-field">
                    <label class="config-label">Logo da Loja</label>
                    <div style="display:flex;align-items:center;gap:16px;">
                        <div id="cat-logo-preview-wrapper" style="width:80px;height:80px;border-radius:12px;border:1px solid var(--border-color);display:flex;align-items:center;justify-content:center;background:var(--surface-hover);overflow:hidden;flex-shrink:0;">
                            ${s.logoUrl?`<img src="${s.logoUrl}" style="width:100%;height:100%;object-fit:contain;">`:'<i class="fa-solid fa-image fa-2x" style="color:var(--text-dim);"></i>'}
                        </div>
                        <div>
                            <input type="file" id="cat-logo-file" accept="image/*" style="display:none;">
                            <button class="btn-secondary" onclick="document.getElementById('cat-logo-file').click()">
                                <i class="fa-solid fa-upload"></i> Escolher Logo
                            </button>
                            <p class="cat-field-hint" style="margin-top:6px;">Recomendado: 200×200px PNG/SVG transparente</p>
                        </div>
                    </div>
                </div>

                <!-- Cores -->
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:1.25rem;">
                    <div>
                        <label class="config-label">Cor Principal</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-primary-color" value="${s.primaryColor||"#6366f1"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-primary-color-hex" value="${s.primaryColor||"#6366f1"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                    <div>
                        <label class="config-label">Cor de Fundo</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-secondary-color" value="${s.secondaryColor||"#0f172a"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-secondary-color-hex" value="${s.secondaryColor||"#0f172a"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:1.25rem;">
                    <div>
                        <label class="config-label">Cor do Texto</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-text-color" value="${s.textColor||"#ffffff"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-text-color-hex" value="${s.textColor||"#ffffff"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                    <div>
                        <label class="config-label">Cor do Preço</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-price-color" value="${s.priceColor||"#ffffff"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-price-color-hex" value="${s.priceColor||"#ffffff"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                    <div>
                        <label class="config-label">Fundo do Produto</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-product-bg-color" value="${s.productBgColor||"#1e293b"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-product-bg-color-hex" value="${s.productBgColor||"#1e293b"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                </div>

                <!-- Tema do catálogo -->
                <div class="cat-field">
                    <label class="config-label">Layout do Catálogo</label>
                    <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;">Escolha a apresentação visual dos seus produtos.</p>
                    <div class="theme-card-grid" id="cat-theme-grid">

                        <!-- Clássico -->
                        <div class="theme-card ${(s.themeId||"classico")==="classico"?"active":""}" onclick="window.catSelectTheme('classico')">
                            <div class="theme-card-preview">
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;height:100%;">
                                    ${["","","",""].map(()=>'<div style="background:rgba(99,102,241,.2);border-radius:4px;"></div>').join("")}
                                </div>
                            </div>
                            <div class="theme-card-name"><i class="fa-solid fa-th-large" style="margin-right:5px;"></i>Clássico</div>
                            <div class="theme-card-desc">Grade de produtos simples e direta</div>
                        </div>

                        <!-- Moderno -->
                        <div class="theme-card ${s.themeId==="moderno"?"active":""}" onclick="window.catSelectTheme('moderno')">
                            <div class="theme-card-preview" style="flex-direction:row;padding:4px;gap:4px;">
                                <div style="width:30%;background:rgba(99,102,241,.15);border-radius:4px;"></div>
                                <div style="flex:1;display:flex;flex-direction:column;gap:3px;">
                                    <div style="height:10px;background:rgba(255,255,255,.15);border-radius:3px;"></div>
                                    ${["","",""].map(()=>'<div style="height:16px;background:rgba(99,102,241,.12);border-radius:3px;"></div>').join("")}
                                </div>
                            </div>
                            <div class="theme-card-name"><i class="fa-solid fa-search" style="margin-right:5px;"></i>Moderno</div>
                            <div class="theme-card-desc">Sidebar de categorias + busca</div>
                        </div>

                        <!-- Banner -->
                        <div class="theme-card ${s.themeId==="banner"?"active":""}" onclick="window.catSelectTheme('banner')">
                            <div class="theme-card-preview" style="flex-direction:column;padding:4px;gap:3px;">
                                <div style="height:28px;background:linear-gradient(135deg,rgba(99,102,241,.4),rgba(168,85,247,.3));border-radius:4px;"></div>
                                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px;flex:1;">
                                    ${["","",""].map(()=>'<div style="background:rgba(99,102,241,.15);border-radius:3px;"></div>').join("")}
                                </div>
                            </div>
                            <div class="theme-card-name"><i class="fa-solid fa-image" style="margin-right:5px;"></i>Banner</div>
                            <div class="theme-card-desc">Hero banner + grade de produtos</div>
                        </div>
                    </div>
                    <input type="hidden" id="cat-theme-id" value="${s.themeId||"classico"}">
                </div>

                <!-- Banners (utilizado em temas Banner e Moderno) -->
                <div id="cat-banner-section" style="border-top:1px solid var(--border-color);padding-top:1rem;margin-bottom:1rem;">
                    <p style="font-size:0.9rem;font-weight:700;margin:0 0 1rem;display:flex;align-items:center;gap:8px;">
                        <i class="fa-solid fa-images" style="color:var(--primary);"></i> Banners do Catálogo
                    </p>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                        <div>
                            <label class="config-label">Banner Desktop</label>
                            <div id="banner-desktop-preview" style="height:80px;border-radius:8px;border:1px dashed var(--border-color);display:flex;align-items:center;justify-content:center;margin-bottom:8px;background:var(--surface-hover);overflow:hidden;">
                                ${s.bannerUrl?`<img src="${s.bannerUrl}" style="width:100%;height:100%;object-fit:cover;">`:'<i class="fa-solid fa-panorama" style="color:var(--text-dim);font-size:1.5rem;"></i>'}
                            </div>
                            <input type="file" id="cat-banner-desktop-file" accept="image/*" style="display:none;">
                            <button class="btn-secondary btn-sm" onclick="document.getElementById('cat-banner-desktop-file').click()" style="width:100%;">
                                <i class="fa-solid fa-upload"></i> Upload Desktop (1200×400)
                            </button>
                        </div>
                        <div>
                            <label class="config-label">Banner Mobile</label>
                            <div id="banner-mobile-preview" style="height:80px;border-radius:8px;border:1px dashed var(--border-color);display:flex;align-items:center;justify-content:center;margin-bottom:8px;background:var(--surface-hover);overflow:hidden;">
                                ${s.bannerMobileUrl?`<img src="${s.bannerMobileUrl}" style="width:100%;height:100%;object-fit:cover;">`:'<i class="fa-solid fa-mobile-screen" style="color:var(--text-dim);font-size:1.5rem;"></i>'}
                            </div>
                            <input type="file" id="cat-banner-mobile-file" accept="image/*" style="display:none;">
                            <button class="btn-secondary btn-sm" onclick="document.getElementById('cat-banner-mobile-file').click()" style="width:100%;">
                                <i class="fa-solid fa-upload"></i> Upload Mobile (600×300)
                            </button>
                        </div>
                    </div>
                </div>

                <div style="text-align:right;">
                    <button class="btn-save-msg" id="btn-save-cat-aparencia">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Aparência
                    </button>
                </div>
            </div>

            <!-- ── Horário de Funcionamento ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-clock" style="color:var(--primary);"></i> Horário de Funcionamento
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Defina os dias e horários em que a loja aceita pedidos.
                </p>
                <div class="horarios-grid">
                    ${h("func","horario_funcionamento")}
                </div>
                <div style="text-align:right;margin-top:1.5rem;">
                    <button class="btn-save-msg" id="btn-save-cat-func">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Horários
                    </button>
                </div>
            </div>

            <!-- ── Horário de Entrega ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-truck" style="color:var(--primary);"></i> Horário de Entrega
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Defina especificamente em quais horários a loja realiza entregas.
                </p>
                <div class="horarios-grid">
                    ${h("entrega","horario_entrega")}
                </div>
                <div style="text-align:right;margin-top:1.5rem;">
                    <button class="btn-save-msg" id="btn-save-cat-entrega">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega
                    </button>
                </div>
            </div>

            <!-- ── Mensagens Automáticas ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-message" style="color:var(--primary);"></i> Mensagens Automáticas
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.25rem;">
                    Personalize as mensagens enviadas ao cliente em cada etapa do pedido via WhatsApp.
                </p>
                <div class="vars-grid" id="cat-vars-grid">
                    ${_()}
                </div>
                <div id="cat-msg-editors">
                    ${y}
                </div>
            </div>

            <!-- ── Pagamento ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-credit-card" style="color:var(--primary);"></i> Pagamento
                </div>

                <div class="cat-field">
                    <label class="config-label">WhatsApp de Atendimento (DDD + 9 dígitos)</label>
                    <input type="text" id="cat-whatsapp" value="${s.whatsapp||""}" class="config-input" placeholder="Ex: 11999999999" maxlength="11">
                    <p class="cat-field-hint">Informe apenas o DDD e os 9 dígitos do número (não inclua o 55).</p>
                </div>

                <div class="cat-field">
                    <label class="config-label">Chave PIX (Manual)</label>
                    <input type="text" id="cat-pix-key" value="${s.pixKey||""}" class="config-input" placeholder="CPF, e-mail, telefone ou chave aleatória">
                    <p class="cat-field-hint">Exibida ao cliente ao escolher pagar via PIX manual.</p>
                </div>

                <div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.25rem;">
                    <p style="font-size:0.9rem;font-weight:700;margin:0 0 1rem;display:flex;align-items:center;gap:8px;">
                        <i class="fa-solid fa-truck" style="color:var(--primary);"></i> Taxas de Entrega por Bairro
                    </p>
                    <p style="font-size:0.8rem;color:var(--text-dim);margin-bottom:12px;">Defina o preço da entrega para cada bairro. Para aplicar o mesmo valor a múltiplos bairros, separe-os por vírgula (Ex: Centro, Vila Nova).</p>
                    <div style="display:grid;grid-template-columns:1fr 120px;gap:12px;margin-bottom:16px;padding:12px;background:rgba(99,102,241,0.05);border:1px solid rgba(99,102,241,0.2);border-radius:10px;align-items:end;">
                        <div class="field">
                            <label class="config-label">Taxa genérica (bairros não listados)</label>
                            <p style="font-size:0.75rem;color:var(--text-dim);margin:0 0 6px;">Aplicada quando o cliente informa um bairro que não está na lista acima.</p>
                            <input type="number" id="taxa-generica-valor" class="config-input" placeholder="0.00" min="0" step="0.01" value="${d?.taxaGenerica??""}">
                        </div>
                        <div style="text-align:right;">
                            <button class="btn-save-msg" id="btn-save-taxa-generica"><i class="fa-solid fa-floppy-disk"></i> Salvar</button>
                        </div>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 100px;gap:16px;margin-bottom:16px;align-items:end;">
                        <div class="field">
                            <label class="config-label">Bairro(s)</label>
                            <input type="text" id="new-bairro-nomes" class="config-input" placeholder="Ex: Centro, Jardim Floral">
                        </div>
                        <div class="field">
                            <label class="config-label">Valor (R$)</label>
                            <input type="number" id="new-bairro-preco" class="config-input" placeholder="0.00" min="0" step="0.01">
                        </div>
                    </div>
                    <div style="text-align:right;margin-bottom:12px;">
                        <button class="btn-save-msg" id="btn-add-bairro">
                            <i class="fa-solid fa-plus"></i> Adicionar Bairro
                        </button>
                    </div>
                    <div id="bairros-list">
                        ${(d?.bairrosEntrega||[]).length===0?'<p style="font-size:0.85rem;color:var(--text-dim);">Nenhum bairro com entrega configurado.</p>':(d?.bairrosEntrega||[]).map((b,L)=>`
                                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(255,255,255,0.03);border:1px solid var(--border-color);border-radius:8px;margin-bottom:6px;">
                                    <div style="display:flex;align-items:center;gap:12px;flex:1;">
                                        <span style="font-weight:600;color:var(--text-main);">${b.bairros}</span>
                                        <span style="font-size:0.85rem;color:var(--primary);font-weight:700;">R$ ${Number(b.preco).toFixed(2)}</span>
                                    </div>
                                    <button class="btn-danger btn-sm" onclick="window.catDeleteBairro(${L})" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#ef4444;border-radius:6px;padding:4px 10px;cursor:pointer;">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            `).join("")}
                    </div>
                </div>

                <div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.5rem;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <p style="font-size:0.9rem;font-weight:700;margin:0 0 0.4rem;display:flex;align-items:center;gap:8px;">
                                <i class="fa-solid fa-credit-card" style="color:var(--primary);"></i> Mercado Pago (PIX Automático)
                            </p>
                            <p style="margin:0;font-size:0.8rem;color:var(--text-dim);">Ativar ou desativar pagamentos via Mercado Pago.</p>
                        </div>
                        <label class="switch">
                            <input type="checkbox" id="mp-active-toggle" ${d?.mercadoPagoActive!==!1?"checked":""}>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.5rem;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <p style="font-size:0.9rem;font-weight:700;margin:0 0 0.4rem;display:flex;align-items:center;gap:8px;">
                                <i class="fa-solid fa-store" style="color:var(--primary);"></i> Pagamento Antecipado (Retirada)
                            </p>
                            <p style="margin:0;font-size:0.8rem;color:var(--text-dim);">Obrigar pagamento adiantado para pedidos de retirada.</p>
                        </div>
                        <label class="switch">
                            <input type="checkbox" id="cat-mandatory-pickup-pay" ${d?.pagamentoObrigatorioRetirada?"checked":""}>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.5rem;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <p style="font-size:0.9rem;font-weight:700;margin:0 0 0.4rem;display:flex;align-items:center;gap:8px;">
                                <i class="fa-solid fa-ban" style="color:var(--primary);"></i> Desativar Pagamento na Entrega
                            </p>
                            <p style="margin:0;font-size:0.8rem;color:var(--text-dim);">Remove a opção de pagar no momento da entrega.</p>
                        </div>
                        <label class="switch">
                            <input type="checkbox" id="cat-disable-delivery-pay" ${d?.desativarPagamentoEntrega?"checked":""}>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <!-- Cupons de Desconto -->
                <div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.5rem;">
                    <p style="font-size:0.9rem;font-weight:700;margin:0 0 1rem;display:flex;align-items:center;gap:8px;">
                        <i class="fa-solid fa-tag" style="color:var(--primary);"></i> Cupons de Desconto
                    </p>
                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:16px;align-items:end;">
                        <div>
                            <label class="config-label">Código do Cupom</label>
                            <input type="text" id="new-cupom-code" class="config-input" style="text-transform:uppercase;" placeholder="EX: DESCONTO10">
                        </div>
                        <div style="display:grid;grid-template-columns:1fr 100px;gap:8px;">
                            <div>
                                <label class="config-label">Desconto</label>
                                <input type="number" id="new-cupom-valor" class="config-input" placeholder="10" min="0" step="0.01">
                            </div>
                            <div>
                                <label class="config-label">Tipo</label>
                                <select id="new-cupom-tipo" class="config-select" style="height:44px;">
                                    <option value="percent">%</option>
                                    <option value="fixo">R$</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="config-label">Gasto Mínimo (R$)</label>
                            <input type="number" id="new-cupom-min" class="config-input" placeholder="0.00" min="0" step="0.01">
                        </div>
                    </div>
                    <div style="text-align:right;margin-bottom:12px;">
                        <button class="btn-save-msg" id="btn-add-cupom">
                            <i class="fa-solid fa-plus"></i> Adicionar Cupom
                        </button>
                    </div>
                    <div id="cupons-list">
                        ${(d?.cupons||[]).length===0?'<p style="font-size:0.85rem;color:var(--text-dim);">Nenhum cupom cadastrado ainda.</p>':(d?.cupons||[]).map((b,L)=>`
                                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(255,255,255,0.03);border:1px solid var(--border-color);border-radius:8px;margin-bottom:6px;">
                                    <div style="display:flex;align-items:center;gap:12px;">
                                        <span style="font-family:monospace;font-weight:700;color:var(--primary);">${b.codigo}</span>
                                        <span class="badge ${b.ativo!==!1?"success":"warning"}">${b.ativo!==!1?"Ativo":"Inativo"}</span>
                                        <span style="font-size:0.8rem;color:var(--text-muted);">${b.tipo==="percent"?b.desconto+"%":"R$ "+Number(b.desconto).toFixed(2)} de desconto</span>
                                        ${b.valorMinimo>0?`<span style="font-size:0.75rem;color:var(--text-dim);background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px;">Min: R$ ${b.valorMinimo.toFixed(2)}</span>`:""}
                                    </div>
                                    <button class="btn-danger btn-sm" onclick="window.catDeleteCupom(${L})" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#ef4444;border-radius:6px;padding:4px 10px;cursor:pointer;">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            `).join("")}
                    </div>
                </div>

                <div style="padding:14px;border-radius:var(--radius-md);background:${m?"rgba(16,185,129,0.08)":"rgba(239,68,68,0.08)"};border:1px solid ${m?"rgba(16,185,129,0.2)":"rgba(239,68,68,0.2)"};display:flex;align-items:center;gap:12px;margin-bottom:1.5rem;">
                    <i class="fa-solid ${m?"fa-circle-check":"fa-circle-xmark"}" style="color:${m?"#10b981":"#ef4444"};font-size:1.2rem;"></i>
                    <div>
                        <p style="margin:0;font-weight:600;font-size:0.9rem;">Mercado Pago</p>
                        <p style="margin:0;font-size:0.8rem;color:var(--text-muted);">
                            ${m?"Integração ativa — PIX via Mercado Pago disponível no catálogo.":'Não configurado. <a href="/mercado-pago" style="color:var(--primary);">Configurar agora →</a>'}
                        </p>
                    </div>
                </div>

                <div style="text-align:right;">
                    <button class="btn-save-msg" id="btn-save-cat-pagamento">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento
                    </button>
                </div>
            </div>
        `,setTimeout(()=>{U()},50)}function U(S){const d=k;document.getElementById("btn-copy-cat-link")?.addEventListener("click",()=>{const r=document.getElementById("cat-link-display");r?.value&&navigator.clipboard.writeText(r.value).then(()=>w.success("Link copiado!"))});const s=(r,h)=>{const y=document.getElementById(r),b=document.getElementById(h);y?.addEventListener("input",()=>{b&&(b.value=y.value)}),b?.addEventListener("input",()=>{y&&(y.value=b.value)})};s("cat-primary-color","cat-primary-color-hex"),s("cat-secondary-color","cat-secondary-color-hex"),s("cat-text-color","cat-text-color-hex"),s("cat-price-color","cat-price-color-hex"),s("cat-product-bg-color","cat-product-bg-color-hex"),document.getElementById("cat-logo-file")?.addEventListener("change",r=>{const h=r.target.files?.[0];if(h){const y=new FileReader;y.onload=b=>{const L=document.getElementById("cat-logo-preview-wrapper");L&&(L.innerHTML=`<img src="${b.target?.result}" style="width:100%;height:100%;object-fit:contain;">`)},y.readAsDataURL(h)}}),document.getElementById("cat-instance-select")?.addEventListener("change",async r=>{const h=r.target.value,y=d.map(b=>b.id===x?{...b,instancia_id:h||null}:b);try{w.info("Salvando instância..."),await T.update("companies",e,{stores:y});const b=d.find(E=>E.id===x);b&&(b.instancia_id=h);const L=M(x);if(L)await T.update("loja_config",L.id,{instancia_id:h||null}),L.instancia_id=h;else{const E=await T.create("loja_config",{empresaId:e,lojaId:x,instancia_id:h||null});v.push({id:E,empresaId:e,lojaId:x,instancia_id:h})}const p=await T.getAll("instancias",{field:"lojaId",operator:"==",value:x});for(const E of p)await T.update("instancias",E.id,{lojaId:null,funcao:null});h&&await T.update("instancias",h,{lojaId:x,funcao:"Catálogo Vendas"}),w.success("Instância vinculada com sucesso!")}catch(b){w.error("Erro ao salvar instância."),console.error(b)}}),window.catSelectTheme=r=>{const h=document.getElementById("cat-theme-id");h&&(h.value=r),document.querySelectorAll(".theme-card").forEach(b=>b.classList.remove("active")),document.querySelectorAll(".theme-card").forEach(b=>{b.getAttribute("onclick")?.includes(`'${r}'`)&&b.classList.add("active")})};const o=(r,h)=>{document.getElementById(r)?.addEventListener("change",y=>{const b=y.target.files?.[0];if(b){const L=new FileReader;L.onload=p=>{const E=document.getElementById(h);E&&(E.innerHTML=`<img src="${p.target?.result}" style="width:100%;height:100%;object-fit:cover;">`)},L.readAsDataURL(b)}})};o("cat-banner-desktop-file","banner-desktop-preview"),o("cat-banner-mobile-file","banner-mobile-preview"),document.getElementById("btn-save-cat-aparencia")?.addEventListener("click",async()=>{const r=document.getElementById("btn-save-cat-aparencia");r.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const h=document.getElementById("cat-primary-color-hex").value,y=document.getElementById("cat-secondary-color-hex").value,b=document.getElementById("cat-text-color-hex").value,L=document.getElementById("cat-price-color-hex").value,p=document.getElementById("cat-product-bg-color-hex").value,E=document.getElementById("cat-theme-id")?.value||"classico",D=document.getElementById("cat-meta-description").value,Q=document.getElementById("cat-logo-file").files?.[0],a=document.getElementById("cat-banner-desktop-file")?.files?.[0],g=document.getElementById("cat-banner-mobile-file")?.files?.[0],z=M(x);let O=z?.design?.logoUrl||"",X=z?.design?.bannerUrl||"",te=z?.design?.bannerMobileUrl||"";if(Q){const W=Ae(Se,`logos/${e}/${x}_logo`);await Ne(W,Q),O=await Pe(W)}if(a){const W=Ae(Se,`banners/${e}/${x}_desktop`);await Ne(W,a),X=await Pe(W)}if(g){const W=Ae(Se,`banners/${e}/${x}_mobile`);await Ne(W,g),te=await Pe(W)}const G={...z?.design||{},primaryColor:h,secondaryColor:y,textColor:b,priceColor:L,productBgColor:p,logoUrl:O,themeId:E,bannerUrl:X,bannerMobileUrl:te,metaDescription:D};await F({design:G}),w.success("Aparência salva!"),r.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',r.classList.add("saved"),setTimeout(()=>{r.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Aparência',r.classList.remove("saved")},2e3)}catch{w.error("Erro ao salvar aparência."),r.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Aparência'}}),document.getElementById("btn-save-cat-func")?.addEventListener("click",async()=>{const r=document.getElementById("btn-save-cat-func");r.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const h={};aa.forEach(({key:y})=>{const b=document.querySelector(`.func-toggle[data-dia="${y}"]`)?.checked,L=document.getElementById(`func-open-${y}`)?.value||"08:00",p=document.getElementById(`func-close-${y}`)?.value||"18:00";h[y]={ativo:b,inicio:L,fim:p}}),await F({horario_funcionamento:h}),w.success("Horários de funcionamento salvos!"),r.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',r.classList.add("saved"),setTimeout(()=>{r.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários',r.classList.remove("saved")},2e3)}catch{w.error("Erro ao salvar horários."),r.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários'}}),document.getElementById("btn-save-cat-entrega")?.addEventListener("click",async()=>{const r=document.getElementById("btn-save-cat-entrega");r.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const h={};aa.forEach(({key:y})=>{const b=document.querySelector(`.entrega-toggle[data-dia="${y}"]`)?.checked,L=document.getElementById(`entrega-open-${y}`)?.value||"08:00",p=document.getElementById(`entrega-close-${y}`)?.value||"18:00";h[y]={ativo:b,inicio:L,fim:p}}),await F({horario_entrega:h}),w.success("Horários de entrega salvos!"),r.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',r.classList.add("saved"),setTimeout(()=>{r.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega',r.classList.remove("saved")},2e3)}catch{w.error("Erro ao salvar horários de entrega."),r.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega'}}),document.querySelectorAll(".cat-save-single-msg").forEach(r=>{r.addEventListener("click",async()=>{const h=r.dataset.msgKey,y=document.getElementById(`cat-msg-${h}`)?.value||"",p={...M(x)?.mensagens_automaticas||{},[h]:y};try{r.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>',await F({mensagens_automaticas:p}),w.success("Mensagem salva!"),r.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',r.classList.add("saved"),setTimeout(()=>{r.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar',r.classList.remove("saved")},2e3)}catch{w.error("Erro ao salvar mensagem."),r.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar'}})}),document.querySelectorAll(".var-chip").forEach(r=>{r.addEventListener("dragstart",h=>{h.dataTransfer?.setData("text/plain",r.dataset.var||"")}),r.addEventListener("click",()=>{navigator.clipboard.writeText(r.dataset.var||"").then(()=>w.info("Variável copiada!"))})}),document.querySelectorAll(".msg-textarea").forEach(r=>{r.addEventListener("dragover",h=>h.preventDefault()),r.addEventListener("drop",h=>{h.preventDefault();const y=h.dataTransfer?.getData("text/plain")||"",b=r,L=b.selectionStart,p=b.selectionEnd;b.value=b.value.substring(0,L)+y+b.value.substring(p),b.selectionStart=b.selectionEnd=L+y.length,b.focus()})}),document.getElementById("btn-save-cat-pagamento")?.addEventListener("click",async()=>{const r=document.getElementById("btn-save-cat-pagamento");r.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const h=M(x);let y=document.getElementById("cat-whatsapp").value.replace(/\D/g,"");if(y.length===13&&y.startsWith("55")&&(y=y.substring(2)),y&&y.length!==11){ta.showPhoneError(),r.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento';return}const b=document.getElementById("cat-pix-key").value.trim(),L=document.getElementById("mp-active-toggle")?.checked,p=document.getElementById("cat-mandatory-pickup-pay")?.checked,E=document.getElementById("cat-disable-delivery-pay")?.checked,D={...h?.design||{},whatsapp:y,pixKey:b};delete D.taxaFixaNome,delete D.taxaFixaValor,delete D.taxaTipo,await F({design:D,mercadoPagoActive:L,pagamentoObrigatorioRetirada:p,desativarPagamentoEntrega:E}),w.success("Configurações de pagamento salvas!"),r.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',r.classList.add("saved"),setTimeout(()=>{r.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento',r.classList.remove("saved")},2e3)}catch{w.error("Erro ao salvar pagamento."),r.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento'}}),document.getElementById("btn-add-cupom")?.addEventListener("click",async()=>{const r=(document.getElementById("new-cupom-code").value||"").trim().toUpperCase(),h=parseFloat(document.getElementById("new-cupom-valor").value||"0"),y=document.getElementById("new-cupom-tipo").value||"percent",b=parseFloat(document.getElementById("new-cupom-min").value||"0")||0;if(!r||!h){w.error("Preencha código e valor do cupom.");return}const p=[...M(x)?.cupons||[],{codigo:r,desconto:h,tipo:y,valorMinimo:b,ativo:!0}];await F({cupons:p}),w.success(`Cupom ${r} adicionado!`),I()}),window.catDeleteCupom=async r=>{const y=[...M(x)?.cupons||[]].filter((b,L)=>L!==r);await F({cupons:y}),w.success("Cupom removido."),I()},document.getElementById("btn-save-taxa-generica")?.addEventListener("click",async()=>{const r=parseFloat(document.getElementById("taxa-generica-valor").value||"0");await F({taxaGenerica:r}),w.success("Taxa genérica salva!")}),document.getElementById("btn-add-bairro")?.addEventListener("click",async()=>{const r=(document.getElementById("new-bairro-nomes").value||"").trim(),h=document.getElementById("new-bairro-preco").value,y=parseFloat(h||"0");if(!r){w.error("Preencha os bairros.");return}if(!h){w.error("Preencha o valor da taxa para estes bairros.");return}const L=[...M(x)?.bairrosEntrega||[],{bairros:r,preco:y}];await F({bairrosEntrega:L}),w.success("Bairro(s) adicionado(s)!"),I()}),window.catDeleteBairro=async r=>{const y=[...M(x)?.bairrosEntrega||[]].filter((b,L)=>L!==r);await F({bairrosEntrega:y}),w.success("Bairro(s) removido(s)."),I()};const l=(r,h,y,b)=>{document.querySelectorAll(`.${r}`).forEach(L=>{L.addEventListener("change",()=>{const p=L.dataset.dia,E=L.checked;document.getElementById(`${h}-row-${p}`)?.classList.toggle("inactive",!E),document.getElementById(`${h}-inputs-${p}`)?.classList.toggle("hidden",!E);const D=document.getElementById(`${h}-status-${p}`);D&&(D.innerText=E?y:b,D.style.color=E?"var(--success)":"var(--text-dim)")})})};l("func-toggle","func","Aberto","Fechado"),l("entrega-toggle","entrega","Disponível","Indisponível")}async function F(S){const d=M(x);if(d)await T.update("loja_config",d.id,S),Object.assign(d,S);else{const s=await T.create("loja_config",{empresaId:e,lojaId:x,...S});v.push({id:s,empresaId:e,lojaId:x,...S})}}},dt=()=>`
    <style>
        :root {
            --lp-bg: #030712;
            --lp-primary: #6366f1;
            --lp-secondary: #a855f7;
            --lp-text: #f9fafb;
            --lp-text-dim: #9ca3af;
            --lp-glass: rgba(255, 255, 255, 0.03);
            --lp-border: rgba(255, 255, 255, 0.08);
        }

        .lp-container {
            background-color: var(--lp-bg);
            color: var(--lp-text);
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
            line-height: 1.6;
        }

        /* ── Glowing Background ── */
        .lp-glow {
            position: fixed;
            width: 800px;
            height: 800px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%);
            filter: blur(100px);
            z-index: 0;
            pointer-events: none;
        }
        .lp-glow-1 { top: -300px; right: -300px; }
        .lp-glow-2 { bottom: -300px; left: -300px; }

        /* ── Navbar ── */
        .lp-navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 10%;
            position: sticky;
            top: 0;
            background: rgba(3, 7, 18, 0.85);
            backdrop-filter: blur(16px);
            z-index: 100;
            border-bottom: 1px solid var(--lp-border);
        }
        .lp-logo {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .lp-logo img {
            height: 32px;
            width: auto;
        }
        .lp-logo span {
            font-size: 1.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, var(--lp-primary), var(--lp-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .lp-nav-links {
            display: flex;
            gap: 2.5rem;
            align-items: center;
        }
        .lp-nav-link {
            text-decoration: none;
            color: var(--lp-text-dim);
            font-size: 0.95rem;
            font-weight: 500;
            transition: color 0.3s;
        }
        .lp-nav-link:hover { color: var(--lp-text); }
        .lp-btn-login {
            background: var(--lp-primary);
            color: white;
            padding: 0.7rem 1.8rem;
            border-radius: 99px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }
        .lp-btn-login:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
        }

        /* ── Hero Section ── */
        .lp-hero {
            padding: 120px 10% 80px;
            text-align: center;
            max-width: 1000px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }
        .lp-badge {
            display: inline-block;
            padding: 8px 18px;
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.2);
            border-radius: 99px;
            font-size: 0.85rem;
            color: #818cf8;
            margin-bottom: 2.5rem;
            backdrop-filter: blur(4px);
            letter-spacing: 0.5px;
            font-weight: 600;
        }
        .lp-hero h1 {
            font-size: 4.5rem;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 2rem;
            letter-spacing: -2px;
        }
        .lp-hero h1 span {
            background: linear-gradient(135deg, var(--lp-primary), var(--lp-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .lp-hero p {
            font-size: 1.35rem;
            color: var(--lp-text-dim);
            line-height: 1.7;
            margin-bottom: 3.5rem;
            max-width: 750px;
            margin-left: auto;
            margin-right: auto;
        }
        .lp-hero-btns {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
        }
        .lp-btn-primary {
            background: linear-gradient(135deg, var(--lp-primary), var(--lp-secondary));
            padding: 1.1rem 2.8rem;
            border-radius: 14px;
            color: white;
            font-weight: 700;
            text-decoration: none;
            font-size: 1.1rem;
            transition: all 0.3s;
            box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
        }
        .lp-btn-primary:hover { transform: translateY(-3px); filter: brightness(1.1); box-shadow: 0 15px 40px rgba(99, 102, 241, 0.3); }
        .lp-btn-secondary {
            background: var(--lp-glass);
            border: 1px solid var(--lp-border);
            padding: 1.1rem 2.8rem;
            border-radius: 14px;
            color: var(--lp-text);
            font-weight: 700;
            text-decoration: none;
            font-size: 1.1rem;
            transition: all 0.3s;
            backdrop-filter: blur(4px);
        }
        .lp-btn-secondary:hover { background: rgba(255,255,255,0.06); transform: translateY(-3px); }

        /* ── Feature Sections ── */
        .lp-section { padding: 120px 10%; position: relative; z-index: 1; }
        .lp-section.alt { background: rgba(255,255,255,0.015); }
        
        .lp-grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
        }
        .lp-grid-2.reverse { direction: rtl; }
        .lp-grid-2.reverse > * { direction: ltr; }

        .lp-feat-content h2 { font-size: 3rem; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -1px; line-height: 1.2; }
        .lp-feat-content p { font-size: 1.15rem; color: var(--lp-text-dim); margin-bottom: 2rem; line-height: 1.8; }
        
        .lp-feat-list { list-style: none; padding: 0; margin-bottom: 2.5rem; }
        .lp-feat-item { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 1.2rem; font-size: 1.05rem; color: var(--lp-text); }
        .lp-feat-item i { color: var(--lp-primary); margin-top: 5px; font-size: 0.9rem; }

        .lp-feat-image {
            background: var(--lp-glass);
            border: 1px solid var(--lp-border);
            border-radius: 32px;
            padding: 2.5rem;
            box-shadow: 0 40px 100px -20px rgba(0,0,0,0.5);
        }
        .lp-feat-image img { width: 100%; height: auto; border-radius: 16px; display: block; }

        /* ── Modules (Cards) ── */
        .lp-section-header { text-align: center; margin-bottom: 6rem; max-width: 800px; margin-left: auto; margin-right: auto; }
        .lp-section-header h2 { font-size: 3.5rem; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -1px; }
        .lp-section-header p { color: var(--lp-text-dim); font-size: 1.25rem; }

        .lp-grid-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2.5rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        .lp-card {
            background: var(--lp-glass);
            border: 1px solid var(--lp-border);
            padding: 3rem;
            border-radius: 32px;
            transition: all 0.4s;
            backdrop-filter: blur(8px);
        }
        .lp-card:hover { transform: translateY(-12px); border-color: var(--lp-primary); background: rgba(99, 102, 241, 0.05); }
        .lp-card-icon {
            width: 70px;
            height: 70px;
            background: rgba(99, 102, 241, 0.1);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
            color: var(--lp-primary);
            font-size: 1.8rem;
        }
        .lp-card h3 { font-size: 1.75rem; font-weight: 700; margin-bottom: 1.2rem; }
        .lp-card p { color: var(--lp-text-dim); line-height: 1.8; margin-bottom: 2rem; font-size: 1.05rem; }
        .lp-card-link { color: var(--lp-primary); text-decoration: none; font-weight: 700; display: flex; align-items: center; gap: 8px; font-size: 1.1rem; }

        /* ── FAQ ── */
        .lp-faq { padding: 120px 10%; max-width: 900px; margin: 0 auto; position: relative; z-index: 1; }
        .lp-faq-item {
            background: var(--lp-glass);
            border: 1px solid var(--lp-border);
            border-radius: 20px;
            margin-bottom: 1.2rem;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s;
        }
        .lp-faq-item:hover { border-color: rgba(99,102,241,0.3); background: rgba(255,255,255,0.05); }
        .lp-faq-question { padding: 1.8rem; display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 1.15rem; }
        .lp-faq-answer { padding: 0 1.8rem 1.8rem; color: var(--lp-text-dim); line-height: 1.8; display: none; font-size: 1.05rem; }
        .lp-faq-item.active .lp-faq-answer { display: block; }
        .lp-faq-item.active .lp-faq-question i { transform: rotate(180deg); color: var(--lp-primary); }

        /* ── Footer ── */
        .lp-footer {
            padding: 120px 10% 60px;
            border-top: 1px solid var(--lp-border);
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 6rem;
            position: relative;
            z-index: 1;
        }
        .lp-footer-col h4 { font-weight: 800; margin-bottom: 2rem; font-size: 1.2rem; }
        .lp-footer-col ul { list-style: none; padding: 0; }
        .lp-footer-col li { margin-bottom: 1rem; }
        .lp-footer-col a { color: var(--lp-text-dim); text-decoration: none; transition: color 0.3s; font-size: 1rem; }
        .lp-footer-col a:hover { color: white; }

        /* ── Floating WhatsApp ── */
        .lp-wa-float {
            position: fixed;
            bottom: 40px;
            right: 40px;
            width: 65px;
            height: 65px;
            background: #25d366;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
            z-index: 1000;
            transition: all 0.3s;
            text-decoration: none;
            animation: pulse-wa 2s infinite;
        }
        .lp-wa-float:hover { transform: scale(1.1) rotate(5deg); box-shadow: 0 15px 40px rgba(37, 211, 102, 0.5); }
        
        @keyframes pulse-wa {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
            70% { box-shadow: 0 0 0 20px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }

        @media(max-width: 992px) {
            .lp-grid-2 { grid-template-columns: 1fr; gap: 60px; text-align: center; }
            .lp-feat-item { justify-content: center; }
            .lp-hero h1 { font-size: 3.5rem; }
            .lp-section-header h2 { font-size: 2.8rem; }
            .lp-footer { grid-template-columns: 1fr 1fr; gap: 4rem; }
        }
        @media(max-width: 768px) {
            /* Navbar: esconde só os links de texto, mantém botão de login */
            .lp-navbar { padding: 1rem 5%; }
            .lp-nav-link { display: none; }
            .lp-btn-login {
                padding: 0.55rem 1.2rem;
                font-size: 0.88rem;
            }

            /* Hero */
            .lp-hero { padding: 60px 5% 60px; }
            .lp-hero h1 { font-size: 2.4rem; letter-spacing: -1px; }
            .lp-hero p { font-size: 1.05rem; margin-bottom: 2.5rem; }
            .lp-hero-btns { flex-direction: column; align-items: stretch; gap: 1rem; }
            .lp-btn-primary, .lp-btn-secondary {
                padding: 1rem 1.5rem;
                font-size: 1rem;
                text-align: center;
            }

            /* Sections */
            .lp-section { padding: 70px 5%; }
            .lp-section-header { margin-bottom: 3rem; }
            .lp-section-header h2 { font-size: 2.2rem; }
            .lp-section-header p { font-size: 1rem; }
            .lp-feat-content h2 { font-size: 2rem; }
            .lp-feat-content p { font-size: 1rem; }

            /* Cards */
            .lp-grid-cards { grid-template-columns: 1fr; gap: 1.5rem; }
            .lp-card { padding: 2rem; border-radius: 20px; }
            .lp-card h3 { font-size: 1.4rem; }

            /* FAQ */
            .lp-faq { padding: 60px 5%; }
            .lp-faq-question { font-size: 1rem; padding: 1.3rem; }

            /* Footer */
            .lp-footer { grid-template-columns: 1fr; gap: 3rem; text-align: center; padding: 60px 5% 40px; }
            .lp-logo { justify-content: center; }

            /* WhatsApp float */
            .lp-wa-float { bottom: 20px; right: 20px; width: 52px; height: 52px; font-size: 26px; }
        }
    </style>

    <div class="lp-container">
        <div class="lp-glow lp-glow-1"></div>
        <div class="lp-glow lp-glow-2"></div>

        <nav class="lp-navbar">
            <div class="lp-logo">
                <img src="/logo.png" alt="AutoQui Logo">
                <span>AutoQui</span>
            </div>
            <div class="lp-nav-links">
                <a href="#features" class="lp-nav-link">Planos</a>
                <a href="#solucoes" class="lp-nav-link">Soluções</a>
                <a href="#faq" class="lp-nav-link">Suporte</a>
                <a href="/login" class="lp-btn-login">Entrar no Painel</a>
            </div>
        </nav>

        <section class="lp-hero">
            <div class="lp-badge">Tecnologia de Ponta para o seu Negócio</div>
            <h1>Aumente suas vendas com <span>Automação Inteligente</span></h1>
            <p>O AutoQui é a plataforma definitiva para quem deseja automatizar processos, gerenciar pedidos via catálogo e manter um relacionamento premium com clientes via WhatsApp.</p>
            <div class="lp-hero-btns">
                <a href="https://wa.me/5564996168691" target="_blank" class="lp-btn-primary">Falar com Consultor</a>
                <a href="#solucoes" class="lp-btn-secondary">Conhecer Módulos</a>
            </div>
        </section>

        <!-- Seção de Explicação 1: Automação -->
        <section id="solucoes" class="lp-section alt">
            <div class="lp-grid-2">
                <div class="lp-feat-content">
                    <div class="lp-badge" style="margin-bottom:1.5rem">Inteligência Artificial</div>
                    <h2>Atendimento Humano em Escala de Robô</h2>
                    <p>Nossa IA não apenas responde, ela entende o contexto. Transforme seu WhatsApp em uma máquina de vendas que nunca dorme.</p>
                    <ul class="lp-feat-list">
                        <li class="lp-feat-item"><i class="fa-solid fa-circle-check"></i> Qualificação automática de leads</li>
                        <li class="lp-feat-item"><i class="fa-solid fa-circle-check"></i> Agendamentos sincronizados em tempo real</li>
                        <li class="lp-feat-item"><i class="fa-solid fa-circle-check"></i> Transição suave para atendente humano</li>
                    </ul>
                    <a href="https://wa.me/5564996168691" target="_blank" class="lp-btn-primary" style="padding: 0.9rem 2rem; font-size: 1rem;">Quero Automatizar</a>
                </div>
                <div class="lp-feat-image">
                    <img src="https://img.freepik.com/premium-photo/robot-operating-laptop-futuristic-office-generative-ai_124507-65715.jpg" alt="IA Atendimento">
                </div>
            </div>
        </section>

        <!-- Seção de Explicação 2: Catálogo -->
        <section class="lp-section">
            <div class="lp-grid-2 reverse">
                <div class="lp-feat-content">
                    <div class="lp-badge" style="margin-bottom:1.5rem">E-commerce de Próxima Geração</div>
                    <h2>Um Catálogo que é mais que uma Loja</h2>
                    <p>Ofereça aos seus clientes uma experiência de compra fluida, rápida e integrada. Nada de aplicativos pesados, tudo direto no navegador.</p>
                    <ul class="lp-feat-list">
                        <li class="lp-feat-item"><i class="fa-solid fa-circle-check"></i> Checkout em menos de 30 segundos</li>
                        <li class="lp-feat-item"><i class="fa-solid fa-circle-check"></i> Integração nativa com Mercado Pago (PIX)</li>
                        <li class="lp-feat-item"><i class="fa-solid fa-circle-check"></i> Controle de estoque e gatilhos de escassez</li>
                    </ul>
                    <a href="https://wa.me/5564996168691" target="_blank" class="lp-btn-secondary" style="padding: 0.9rem 2rem; font-size: 1rem;">Ver Demonstração</a>
                </div>
                <div class="lp-feat-image">
                    <img src="https://img.freepik.com/premium-psd/food-delivery-online-app-landing-page-template_444901-155.jpg" alt="Catálogo Digital">
                </div>
            </div>
        </section>

        <section id="features" class="lp-section alt">
            <div class="lp-section-header">
                <h2>Módulos Especializados</h2>
                <p>O AutoQui se adapta ao seu modelo de negócio, seja ele vendas diretas, serviços ou envios em massa.</p>
            </div>
            
            <div class="lp-grid-cards">
                <div class="lp-card">
                    <div class="lp-card-icon"><i class="fa-solid fa-shop"></i></div>
                    <h3>Vendas Catálogo</h3>
                    <p>A vitrine definitiva para o seu delivery ou loja online. Sincronização total com WhatsApp e gestão de pedidos centralizada.</p>
                    <a href="https://wa.me/5564996168691" target="_blank" class="lp-card-link">Solicitar Teste <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <div class="lp-card">
                    <div class="lp-card-icon"><i class="fa-solid fa-calendar-check"></i></div>
                    <h3>Gestão de Serviços</h3>
                    <p>Para clínicas, barbearias ou consultorias. Agendamento inteligente que reduz faltas em até 70% com lembretes automáticos.</p>
                    <a href="https://wa.me/5564996168691" target="_blank" class="lp-card-link">Saber mais <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <div class="lp-card">
                    <div class="lp-card-icon"><i class="fa-solid fa-bullhorn"></i></div>
                    <h3>Campanhas Pro</h3>
                    <p>Envio em massa com inteligência de anti-banimento. Fale com toda a sua base de leads com apenas um clique.</p>
                    <a href="https://wa.me/5564996168691" target="_blank" class="lp-card-link">Explorar <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </section>

        <section id="faq" class="lp-faq">
            <div class="lp-section-header">
                <h2>Perguntas Frequentes</h2>
            </div>
            <div class="lp-faq-item">
                <div class="lp-faq-question">Como funciona a implementação do AutoQui? <i class="fa-solid fa-chevron-down"></i></div>
                <div class="lp-faq-answer">É instantâneo! Após criar sua conta, você vincula seu WhatsApp por QR Code e já pode configurar seus produtos e fluxos de atendimento em poucos minutos.</div>
            </div>
            <div class="lp-faq-item">
                <div class="lp-faq-question">Os dados dos meus clientes estão seguros? <i class="fa-solid fa-chevron-down"></i></div>
                <div class="lp-faq-answer">Com certeza. Utilizamos criptografia de ponta e servidores seguros para garantir que todas as transações e dados de leads sejam privados da sua empresa.</div>
            </div>
            <div class="lp-faq-item">
                <div class="lp-faq-question">Posso usar o meu número atual do WhatsApp? <i class="fa-solid fa-chevron-down"></i></div>
                <div class="lp-faq-answer">Sim! Você não precisa de um número novo. A integração é feita diretamente com o seu número de atendimento atual (Business ou Pessoal).</div>
            </div>
        </section>

        <footer class="lp-footer">
            <div class="lp-footer-col">
                <div class="lp-logo" style="margin-bottom: 2rem;">
                    <img src="/logo.png" alt="AutoQui Logo">
                    <span>AutoQui</span>
                </div>
                <p style="color: var(--lp-text-dim); line-height: 1.8;">A solução número #1 para empresas que buscam excelência no atendimento digital.</p>
            </div>
            <div class="lp-footer-col">
                <h4>Produto</h4>
                <ul>
                    <li><a href="#solucoes">Recursos</a></li>
                    <li><a href="#solucoes">Soluções</a></li>
                    <li><a href="#faq">Novidades</a></li>
                </ul>
            </div>
            <div class="lp-footer-col">
                <h4>Atendimento</h4>
                <ul>
                    <li><a href="https://wa.me/5564996168691">Falar com Consultor</a></li>
                    <li><a href="https://wa.me/5564996168691">Suporte Técnico</a></li>
                    <li><a href="https://wa.me/5564996168691">Comercial</a></li>
                </ul>
            </div>
            <div class="lp-footer-col">
                <h4>Legal</h4>
                <ul>
                    <li><a href="#">Privacidade</a></li>
                    <li><a href="#">Termos de Uso</a></li>
                </ul>
            </div>
        </footer>

        <!-- Floating WhatsApp Button -->
        <a href="https://wa.me/5564996168691" target="_blank" class="lp-wa-float">
            <i class="fa-brands fa-whatsapp"></i>
        </a>
    </div>

    <script>
        // FAQ Toggle
        document.querySelectorAll('.lp-faq-item').forEach(item => {
            item.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                document.querySelectorAll('.lp-faq-item').forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        });

        // Smooth scroll for anchors
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    <\/script>
    `,lt=async()=>{const i=ce.getCurrentUser(),e=i?.role?.toLowerCase()==="admin"||i?.email==="ginannymoreira@gmail.com";if(!i||!e)return"<p>Acesso negado.</p>";const m=(await T.getAll("companies")).flatMap(v=>(v.stores||[]).map(x=>({...x,companyName:v.name,companyId:v.id}))),$=()=>m.map(v=>`<option value="${v.id}" data-company-id="${v.companyId}">${v.name} (${v.companyName})</option>`).join("");return window.performMigration=async()=>{const v=document.getElementById("migration-source-store"),x=document.getElementById("migration-target-store"),M=v.value,N=v.selectedOptions[0]?.dataset.companyId,_=x.value,j=x.selectedOptions[0]?.dataset.companyId;if(!M||!_){w.warning("Selecione as lojas de origem e destino.");return}if(M===_){w.warning("A loja de origem e destino não podem ser a mesma.");return}if(!await pe.warning("Confirmar Migração","Isso irá duplicar todos os produtos da loja de origem para a loja de destino. Continuar?"))return;const U=document.getElementById("btn-run-migration");U.disabled=!0,U.innerHTML='<div class="spinner-small"></div> Migrando...';try{const S=(await T.getAll("products",{field:"companyId",operator:"==",value:N})).filter(s=>s.storeIds&&s.storeIds.includes(M)||s.storeId===M);if(S.length===0){w.info("Nenhum produto encontrado na loja de origem."),U.disabled=!1,U.innerText="Iniciar Migração";return}let d=0;for(const s of S){const{id:o,...l}=s;l.companyId=j,l.storeIds=[_],delete l.lojaId,delete l.createdAt,await qe.save(l,void 0,j),d++}w.success(`${d} produtos migrados com sucesso!`)}catch(F){console.error(F),w.error("Erro durante a migração: "+F)}finally{U.disabled=!1,U.innerText="Iniciar Migração"}},`
        <div class="page-header">
            <h2 class="page-title">Migração Administrativa de Produtos</h2>
        </div>

        <div class="card glass">
            <div class="card-header">
                <h3><i class="fa-solid fa-clone"></i> Duplicar Catálogo</h3>
                <p class="text-muted">Use esta ferramenta para copiar todos os produtos de uma unidade para outra.</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
                <div class="form-group">
                    <label>Loja de ORIGEM (De onde virão os produtos)</label>
                    <select id="migration-source-store" class="config-select" style="width: 100%; padding: 12px; border-radius: 8px; background: rgba(0,0,0,0.2); color: white; border: 1px solid var(--border-color);">
                        <option value="">Selecione a origem...</option>
                        ${$()}
                    </select>
                </div>

                <div class="form-group">
                    <label>Loja de DESTINO (Para onde serão copiados)</label>
                    <select id="migration-target-store" class="config-select" style="width: 100%; padding: 12px; border-radius: 8px; background: rgba(0,0,0,0.2); color: white; border: 1px solid var(--border-color);">
                        <option value="">Selecione o destino...</option>
                        ${$()}
                    </select>
                </div>
            </div>

            <div style="margin-top: 30px; padding: 20px; border-radius: 12px; background: rgba(234, 179, 8, 0.05); border: 1px solid rgba(234, 179, 8, 0.2);">
                <p style="color: #eab308; font-size: 0.9rem; margin-bottom: 0;">
                    <i class="fa-solid fa-triangle-exclamation"></i> <strong>Atenção:</strong> Os produtos serão duplicados. Se você já migrou anteriormente, eles aparecerão repetidos no destino.
                </p>
            </div>

            <div style="margin-top: 25px; display: flex; justify-content: flex-end;">
                <button id="btn-run-migration" class="btn-primary" onclick="window.performMigration()" style="padding: 12px 30px;">
                    <i class="fa-solid fa-play"></i> Iniciar Migração
                </button>
            </div>
        </div>
    `};class ct{appElement;shellRendered=!1;shellUserId=null;constructor(){this.appElement=document.getElementById("app"),this.init()}init(){let e=null;ce.subscribe(f=>{this.render(),f?f.uid!==e&&(e=f.uid,ga.startListening()):(e=null,ga.stopListening())}),this.handleRouting(),window.addEventListener("render-app",()=>this.render())}handleRouting(){window.addEventListener("popstate",()=>this.render()),document.addEventListener("click",e=>{const k=e.target.closest("a");if(k&&k.getAttribute("href")?.startsWith("/")){e.preventDefault();const m=k.getAttribute("href");window.location.pathname!==m&&(history.pushState(null,"",m),this.render())}}),document.addEventListener("submit",async e=>{if(e.target.id==="login-form"){e.preventDefault();const k=document.getElementById("email").value,m=document.getElementById("password").value;try{await ce.login(k,m)}catch($){w.error("Erro ao fazer login: "+$)}}}),document.addEventListener("click",async e=>{e.target.closest("#logout-btn")&&(this.shellRendered=!1,this.shellUserId=null,history.replaceState(null,"","/"),await ce.logout())})}async render(){const e=window.location.pathname,f=ce.getCurrentUser();if(e==="/"){this.appElement.innerHTML=dt();const m=this.appElement.querySelector(".lp-btn-login")||this.appElement.querySelector(".lp-btn-primary");f&&m&&(m.textContent="Dashboard",m.setAttribute("href",f.role==="admin"?"/admin/dashboard":"/dashboard"));return}if(!f){if(e.startsWith("/catalog/")){const m=e.split("/").pop()||"";this.appElement.innerHTML=await ba(m);return}if(e.startsWith("/qr/")){const m=e.split("/").pop()||"";this.appElement.innerHTML=await ya(m);return}e!=="/login"&&history.replaceState(null,"","/login"),this.appElement.innerHTML=`<div id="page-content" class="login-page-container">${Fa()}</div>`;return}if(e==="/login"){const m=f.role==="admin"?"/admin/dashboard":"/dashboard";history.replaceState(null,"",m),this.render();return}if(e.startsWith("/catalog/")){const m=e.split("/").pop()||"";this.appElement.innerHTML=await ba(m);return}if(e.startsWith("/qr/")){const m=e.split("/").pop()||"";this.appElement.innerHTML=await ya(m);return}if(!this.isRouteAllowed(e,f.role)){this.appElement.innerHTML="<h1>403 Forbidden</h1><p>Você não tem permissão para acessar esta página.</p>";return}if(!this.shellRendered||this.shellUserId!==f.uid){let m;f.role==="admin"?m=Sa:f.role==="employee"?m=Ba:m=za;const $=await m(),v=this.buildMobileNav(f.role),x=await this.getPageTitle(e);this.appElement.innerHTML=`
              <div class="app-container">
                  ${$}
                  <main class="main-content">
                      ${Ta(x)}
                      <div id="page-content" class="page-container">
                          <div style="display:flex;justify-content:center;align-items:center;width:100%;height:50vh;flex-direction:column;gap:1rem;">
                              <i class="fa-solid fa-spinner fa-spin fa-2x" style="color:var(--primary);"></i>
                              <span style="color:var(--text-muted);">Carregando página...</span>
                          </div>
                      </div>
                  </main>
              </div>
              ${v}
          `,this.shellRendered=!0,this.shellUserId=f.uid}else{const m=await this.getPageTitle(e),$=this.appElement.querySelector(".page-title");$&&($.textContent=m);const v=document.getElementById("page-content");v&&(v.innerHTML=`
          <div style="display:flex;justify-content:center;align-items:center;width:100%;height:50vh;flex-direction:column;gap:1rem;">
              <i class="fa-solid fa-spinner fa-spin fa-2x" style="color:var(--primary);"></i>
              <span style="color:var(--text-muted);">Carregando página...</span>
          </div>`)}try{const m=await this.getPageContent(e),$=document.getElementById("page-content");$&&($.innerHTML=m)}catch(m){console.error("Error loading page content:",m);const $=document.getElementById("page-content");$&&($.innerHTML=`
                <div style="padding: 2rem; text-align: center;">
                    <i class="fa-solid fa-triangle-exclamation fa-2x" style="color: var(--danger);"></i>
                    <h3 style="margin-top: 1rem; color: var(--text-main);">Falha ao carregar</h3>
                    <p style="color: var(--text-muted); margin-top: 0.5rem;">Não foi possível carregar o conteúdo da página.</p>
                </div>
            `)}this.updateActiveLinks(),this.updateOrderCounter()}isRouteAllowed(e,f){return f==="admin"?e.startsWith("/admin"):!e.startsWith("/admin")}async getPageTitle(e){if(e==="/products"){const f=ce.getCurrentUser();if(f?.companyId)try{const{dbService:k}=await Aa(async()=>{const{dbService:v}=await import("./productsApi-DaCynMcK.js").then(x=>x.m);return{dbService:v}},__vite__mapDeps([0,1]));if(((await k.get("companies",f.companyId))?.modulos_ativos||[]).includes("agendamento"))return"Serviços"}catch{}return"Produtos"}switch(e){case"/":case"/dashboard":case"/admin/dashboard":return"Dashboard";case"/orders":return"Pedidos";case"/stores":return"Lojas";case"/leads":return"Leads";case"/users":case"/admin/users":return"Usuários";case"/admin/ai-config":return"Configuração IA";case"/companies":case"/admin/companies":return"Gestão de Clientes";case"/instances":return"Instâncias";case"/configuration":return"Configurações";case"/campaigns":return"Campanhas";case"/schedule":return"Agenda";case"/schedule-clients":return"Clientes";case"/admin/webhooks":return"Configuração de Webhooks";case"/admin/migration":return"Migração de Produtos";case"/mercado-pago":return"Mercado Pago";case"/catalog-settings":return"Configuração";default:return"Página não encontrada"}}async getPageContent(e){switch(e){case"/":case"/dashboard":case"/admin/dashboard":return Ma();case"/orders":return Pa();case"/products":return await Da();case"/stores":return await qa();case"/leads":return await Ya();case"/users":return ce.getCurrentUser()?.role==="admin"?ua():Ha();case"/admin/users":return ua();case"/admin/ai-config":return Na();case"/companies":case"/admin/companies":return await Oa();case"/instances":return Ra();case"/configuration":return Wa();case"/campaigns":return Za();case"/schedule":return et();case"/schedule-clients":return tt();case"/admin/webhooks":return await ot();case"/admin/migration":return await lt();case"/mercado-pago":return await it();case"/catalog-settings":return await rt();default:return"<h1>404</h1><p>Página não encontrada.</p>"}}buildMobileNav(e){return e==="admin"?`
        <nav class="mobile-bottom-nav">
          <a href="/admin/dashboard" class="mobile-nav-item"><i class="fa-solid fa-chart-line"></i><span>Dashboard</span></a>
          <a href="/admin/companies" class="mobile-nav-item"><i class="fa-solid fa-building"></i><span>Clientes</span></a>
          <a href="/admin/users" class="mobile-nav-item"><i class="fa-solid fa-users"></i><span>Usuários</span></a>
        </nav>`:e==="employee"?`
        <nav class="mobile-bottom-nav">
          <a href="/dashboard" class="mobile-nav-item"><i class="fa-solid fa-chart-line"></i><span>Dashboard</span></a>
          <a href="/orders" class="mobile-nav-item"><i class="fa-solid fa-clipboard-list"></i><span>Pedidos</span><span id="orders-count-badge" class="count-badge hidden">0</span></a>
          <a href="/leads" class="mobile-nav-item"><i class="fa-solid fa-people-group"></i><span>Clientes</span></a>
        </nav>`:`
      <nav class="mobile-bottom-nav">
        <a href="/dashboard" class="mobile-nav-item"><i class="fa-solid fa-chart-line"></i><span>Dashboard</span></a>
        <a href="/orders" class="mobile-nav-item"><i class="fa-solid fa-clipboard-list"></i><span>Pedidos</span><span id="orders-count-badge" class="count-badge hidden">0</span></a>
        <a href="/products" class="mobile-nav-item"><i class="fa-solid fa-box"></i><span>Produtos</span></a>
        <a href="/leads" class="mobile-nav-item"><i class="fa-solid fa-people-group"></i><span>Clientes</span></a>
        <a href="/catalog-settings" class="mobile-nav-item"><i class="fa-solid fa-gear"></i><span>Config</span></a>
      </nav>`}updateActiveLinks(){const e=window.location.pathname;document.querySelectorAll(".nav-item, .mobile-nav-item").forEach(k=>{k.getAttribute("href")===e?k.classList.add("active"):k.classList.remove("active")})}async updateOrderCounter(){const e=ce.getCurrentUser();if(!(!e||!e.companyId||e.role==="admin"))try{const f=e.storeIds||(e.storeId?[e.storeId]:[]),k=await Le.getOpenOrdersCount(e.companyId,e.role==="owner"?[]:f),m=document.getElementById("orders-count-badge");m&&(m.textContent=k.toString(),k>0?m.classList.remove("hidden"):m.classList.add("hidden"))}catch(f){console.error("Error updating order counter:",f)}}}new ct;
