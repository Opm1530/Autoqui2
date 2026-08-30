import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dbService } from '../../services/db';
import { toast } from '../../services/toast';
import { useAuth } from '../useAuth';
import { subscriptionApi } from '../../services/subscriptionApi';
import { MonthlyBars, BairroDonut, BestHours, RecentOrders, SubscriptionCard, fmtInt, fmtBRL } from './DashboardWidgets';

const MESES_PT = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const orderDate = (o: any): Date => (o.criadoEm?.toDate ? o.criadoEm.toDate() : new Date(o.criadoEm || o.createdAt || 0));

interface SalesViz {
  monthly: { label: string; recebidos: number; pagos: number }[];
  bairros: { name: string; count: number }[];
  totalPedidos: number;
  faturamentoPago: number;
  recent: { nome: string; value: number; data: Date; status: string }[];
}

interface Checklist { mode: 'catalogo' | 'vitrine'; lojaOk: boolean; waOk: boolean; prodOk: boolean; pagOk: boolean; waCfgOk: boolean; }

interface Metrics {
  messages: number;
  vendasMes: number;
  ticketMes: number;
  pendingValue: number;
  orders_pending: number;
  today: number;
  salesTrend: number | null;
  ticketTrend: number | null;
  todayTrend: number | null;
}
interface CatalogMetrics {
  lowStockProducts: any[];
  topProducts: { name: string; qty: number; revenue: number }[];
  bestHours: [number, number][];
}

function StatCard({ label, value, trend, trendLabel = 'vs mês passado', subtitle, green }: { label: string; value: string; trend?: number | null; trendLabel?: string; subtitle?: string; green?: boolean }) {
  const up = (trend ?? 0) >= 0;
  return (
    <div className={'stats-card card' + (green ? ' stats-card-green' : '')}>
      <div className="stats-card-label">{label}</div>
      <div className="stats-card-value">{value}</div>
      {trend != null ? (
        <div className={'stats-trend ' + (up ? 'up' : 'down')}>
          <i className={`fa-solid ${up ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}`} />
          {up ? '+' : ''}{Math.round(trend)}% <span>{trendLabel}</span>
        </div>
      ) : subtitle ? (
        <div className="stats-subtitle">{subtitle}</div>
      ) : null}
    </div>
  );
}

export function Dashboard() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';

  const [modulos, setModulos] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({ messages: 0, vendasMes: 0, ticketMes: 0, pendingValue: 0, orders_pending: 0, today: 0, salesTrend: null, ticketTrend: null, todayTrend: null });
  const [catalog, setCatalog] = useState<CatalogMetrics | null>(null);
  const [salesViz, setSalesViz] = useState<SalesViz | null>(null);
  const [sub, setSub] = useState<any>(null);
  const [stores, setStores] = useState<any[]>([]);
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [shared, setShared] = useState(false);

  useEffect(() => { subscriptionApi.mine().then(setSub).catch(() => {}); }, []);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const companyDoc = (await dbService.get('companies', companyId)) as any;
      const mods = companyDoc?.modulos_ativos || ['atendimento'];
      setModulos(mods);
      setStores(companyDoc?.stores || []);

      const needsMessages = mods.includes('atendimento');
      const needsOrders = mods.includes('venda') || mods.includes('venda_catalogo');
      const needsCatalog = mods.includes('venda_catalogo');
      const isVitrine = mods.includes('vitrine');
      const needsProdutos = needsCatalog || isVitrine;

      const [messages, orders, products, instancias, lojaConfigs] = await Promise.all([
        needsMessages ? dbService.getAll('messages', { field: 'empresaId', operator: '==', value: companyId }) : Promise.resolve([]),
        needsOrders ? dbService.getAll('pedidos', { field: 'empresaId', operator: '==', value: companyId }) : Promise.resolve([]),
        needsProdutos ? dbService.getAll('products', { field: 'companyId', operator: '==', value: companyId }) : Promise.resolve([]),
        needsProdutos ? dbService.getAll('instancias', { field: 'empresaId', operator: '==', value: companyId }) : Promise.resolve([]),
        needsProdutos ? dbService.getAll('loja_config', { field: 'empresaId', operator: '==', value: companyId }) : Promise.resolve([]),
      ]);

      // Checklist de primeiros passos (catálogo ou vitrine).
      if (needsProdutos) {
        const lojaOk = (companyDoc?.stores || []).some((s: any) => (s.address || '').trim());
        const temPixManual = (lojaConfigs as any[]).some((c: any) => (c?.design?.pixKey || '').trim());
        const waCfgOk = (lojaConfigs as any[]).some((c: any) => (c?.design?.whatsapp || '').trim());
        setChecklist({
          mode: isVitrine ? 'vitrine' : 'catalogo',
          lojaOk,
          waOk: (instancias as any[]).length > 0,
          prodOk: (products as any[]).length > 0,
          pagOk: companyDoc?.mercadoPagoAtivo === true || temPixManual,
          waCfgOk,
        });
        setShared(localStorage.getItem('onb_shared_' + companyId) === '1');
      }

      const m: Metrics = { messages: 0, vendasMes: 0, ticketMes: 0, pendingValue: 0, orders_pending: 0, today: 0, salesTrend: null, ticketTrend: null, todayTrend: null };
      m.messages = (messages as any[]).filter((x: any) => x.role === 'assistente').length;

      const ordersArr = orders as any[];
      const pendentes = ordersArr.filter((o: any) => {
        const st = (o.status || 'em_montagem').toLowerCase();
        if (o.arquivado) return false;
        return st !== 'finalizado' && st !== 'cancelado';
      });
      m.orders_pending = pendentes.length;
      m.pendingValue = pendentes.reduce((s: number, o: any) => s + (o.value || o.total || 0), 0);

      // Faixas de mês (comparação "vs mês passado") e de dia (hoje vs ontem).
      const nowD = new Date();
      const thisMonthStart = new Date(nowD.getFullYear(), nowD.getMonth(), 1);
      const lastMonthStart = new Date(nowD.getFullYear(), nowD.getMonth() - 1, 1);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
      let salesThis = 0, salesLast = 0, paidThis = 0, paidLast = 0, ordersToday = 0, ordersYesterday = 0;
      ordersArr.forEach((o: any) => {
        const d = o.criadoEm?.toDate ? o.criadoEm.toDate() : new Date(o.criadoEm || 0);
        if (o.status === 'finalizado') {
          const v = o.value || o.total || 0;
          if (d >= thisMonthStart) { salesThis += v; paidThis++; }
          else if (d >= lastMonthStart && d < thisMonthStart) { salesLast += v; paidLast++; }
        }
        if (d >= today) ordersToday++;
        else if (d >= yesterday && d < today) ordersYesterday++;
      });
      const pct = (cur: number, prev: number) => (prev > 0 ? ((cur - prev) / prev) * 100 : (cur > 0 ? 100 : null));
      m.vendasMes = salesThis; m.today = ordersToday;
      m.ticketMes = paidThis ? salesThis / paidThis : 0;
      m.salesTrend = pct(salesThis, salesLast);
      m.ticketTrend = pct(m.ticketMes, paidLast ? salesLast / paidLast : 0);
      m.todayTrend = pct(ordersToday, ordersYesterday);
      setMetrics(m);

      // ── Visualizações de vendas ──
      if (needsOrders) {
        // Barras: últimos 3 meses (recebidos = criados; pagos = finalizados).
        const months = Array.from({ length: 3 }, (_, k) => {
          const dt = new Date(nowD.getFullYear(), nowD.getMonth() - (2 - k), 1);
          return { y: dt.getFullYear(), m: dt.getMonth(), label: MESES_PT[dt.getMonth()], recebidos: 0, pagos: 0 };
        });
        ordersArr.forEach((o: any) => {
          const d = orderDate(o);
          const mi = months.findIndex((x) => x.y === d.getFullYear() && x.m === d.getMonth());
          if (mi >= 0) { months[mi].recebidos++; if ((o.status || '').toLowerCase() === 'finalizado') months[mi].pagos++; }
        });

        // Donut: pedidos por bairro (top 4 + Outros).
        const bmap = new Map<string, number>();
        ordersArr.forEach((o: any) => { const b = (o.bairro || '').trim() || 'Sem bairro'; bmap.set(b, (bmap.get(b) || 0) + 1); });
        const ordenados = [...bmap.entries()].sort((a, b) => b[1] - a[1]);
        const bairros = ordenados.slice(0, 4).map(([name, count]) => ({ name, count }));
        const outros = ordenados.slice(4).reduce((s, [, c]) => s + c, 0);
        if (outros > 0) bairros.push({ name: 'Outros', count: outros });

        // Lista: últimos pedidos.
        const recent = [...ordersArr].filter((o: any) => !o.arquivado)
          .sort((a: any, b: any) => orderDate(b).getTime() - orderDate(a).getTime()).slice(0, 8)
          .map((o: any) => ({ nome: o.nome || o.leadName || o.clientName || 'Cliente', value: o.value || o.total || 0, data: orderDate(o), status: (o.status || 'em_montagem').toLowerCase() }));

        const faturamentoPago = ordersArr.reduce((s: number, o: any) => s + ((o.status || '').toLowerCase() === 'finalizado' ? (o.value || o.total || 0) : 0), 0);

        setSalesViz({ monthly: months.map(({ label, recebidos, pagos }) => ({ label, recebidos, pagos })), bairros, totalPedidos: ordersArr.length, faturamentoPago, recent });
      }

      if (needsCatalog) {
        const prods = products as any[];
        const lowStockProducts = prods.filter((p: any) => p.stock != null && p.stock <= 5 && p.active !== false)
          .sort((a: any, b: any) => (a.stock ?? 0) - (b.stock ?? 0)).slice(0, 10);

        const salesMap = new Map<string, { name: string; qty: number; revenue: number }>();
        const hourMap = new Map<number, number>();
        ordersArr.forEach((o: any) => {
          const items = Array.isArray(o.items) ? o.items : Array.isArray(o.itens) ? o.itens : [];
          items.forEach((i: any) => {
            const name = i.name || i.item || 'Produto';
            const qty = i.qty || i.quantidade || 1;
            const price = i.price || i.preco || 0;
            const cur = salesMap.get(name) || { name, qty: 0, revenue: 0 };
            salesMap.set(name, { name, qty: cur.qty + qty, revenue: cur.revenue + qty * price });
          });
          const d = o.criadoEm?.toDate ? o.criadoEm.toDate() : new Date(o.criadoEm || 0);
          const h = d.getHours();
          hourMap.set(h, (hourMap.get(h) || 0) + 1);
        });
        const topProducts = Array.from(salesMap.values()).sort((a, b) => b.qty - a.qty).slice(0, 5);
        const bestHours = Array.from(hourMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 3) as [number, number][];
        setCatalog({ lowStockProducts, topProducts, bestHours });
      }
    })();
  }, [companyId]);

  const hasVenda = modulos.includes('venda') || modulos.includes('venda_catalogo');
  const copyLink = (storeId: string) => {
    const url = `${window.location.origin}/catalog/${storeId}`;
    navigator.clipboard.writeText(url).then(() => toast.success('Link copiado!'));
  };
  const shareCatalog = () => {
    const store = stores[0];
    if (!store) { toast.error('Crie uma loja primeiro.'); return; }
    copyLink(store.id);
    localStorage.setItem('onb_shared_' + companyId, '1');
    setShared(true);
  };

  // Passos de onboarding. `to` navega; `action` executa algo na hora.
  const steps = !checklist ? [] : checklist.mode === 'vitrine' ? [
    { key: 'prod', label: 'Adicione seu primeiro produto', hint: 'Foto, descrição e variações', done: checklist.prodOk, icon: 'fa-box', to: '/products' },
    { key: 'wacfg', label: 'Configure seu WhatsApp', hint: 'É pra onde vão os pedidos da vitrine', done: checklist.waCfgOk, icon: 'fa-whatsapp', brand: true, to: '/catalog-settings?sec=pagamento' },
    { key: 'share', label: 'Compartilhe sua vitrine', hint: 'Copie o link e divulgue', done: shared, icon: 'fa-share-nodes', action: shareCatalog },
  ] : [
    { key: 'loja', label: 'Configure seu negócio', hint: 'Nome e endereço de entrega', done: checklist.lojaOk, icon: 'fa-store', to: '/business' },
    { key: 'wa', label: 'Conecte seu WhatsApp', hint: 'Vincule seu número por QR Code', done: checklist.waOk, icon: 'fa-whatsapp', brand: true, to: '/instances' },
    { key: 'prod', label: 'Adicione seu primeiro produto', hint: 'Monte seu catálogo', done: checklist.prodOk, icon: 'fa-box', to: '/products' },
    { key: 'pag', label: 'Configure como receber', hint: 'Chave PIX manual ou Mercado Pago', done: checklist.pagOk, icon: 'fa-money-bill', to: '/catalog-settings?sec=pagamento' },
    { key: 'share', label: 'Compartilhe seu catálogo', hint: 'Copie o link e divulgue', done: shared, icon: 'fa-share-nodes', action: shareCatalog },
  ];
  const doneCount = steps.filter((s) => s.done).length;
  const showChecklist = checklist && doneCount < steps.length;

  return (
    <div>
      <div className="page-heading">
        <h1>Dashboard</h1>
        <p>Gerencie suas vendas com controle e precisão.</p>
      </div>

      {showChecklist && (
        <div className="card" style={{ marginBottom: '1.5rem', border: '1px solid rgba(132, 204, 22,0.3)', background: 'rgba(132, 204, 22,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <div>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}><i className="fa-solid fa-rocket" style={{ color: '#a3e635' }} /> Primeiros passos</h3>
              <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Complete a configuração para começar a vender.</p>
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#a3e635' }}>{doneCount}/{steps.length}</div>
          </div>
          <div style={{ height: 6, background: 'rgba(23, 37, 28, 0.08)', borderRadius: 3, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ width: `${(doneCount / steps.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg,#84cc16,#4d7c0f)', borderRadius: 3, transition: 'width 0.4s' }} />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            {steps.map((s) => (
              <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, background: s.done ? 'rgba(16,185,129,0.06)' : 'rgba(23, 37, 28, 0.02)', border: `1px solid ${s.done ? 'rgba(16,185,129,0.2)' : 'var(--border-color)'}` }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: s.done ? 'rgba(16,185,129,0.15)' : 'rgba(132, 204, 22,0.12)', color: s.done ? '#34d399' : '#a3e635' }}>
                  <i className={`${s.brand ? 'fa-brands' : 'fa-solid'} ${s.done ? 'fa-check' : s.icon}`} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', textDecoration: s.done ? 'line-through' : 'none', opacity: s.done ? 0.7 : 1 }}>{s.label}</div>
                  {!s.done && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.hint}</div>}
                </div>
                {!s.done && (s.to
                  ? <Link to={s.to} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.85rem', flexShrink: 0 }}>Fazer</Link>
                  : <button className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.85rem', flexShrink: 0 }} onClick={s.action}>Copiar link</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="dashboard-grid">
        {modulos.includes('atendimento') && <StatCard label="Mensagens pela IA" value={fmtInt(metrics.messages)} />}
        {hasVenda && <>
          <StatCard green label="Vendas no mês" value={fmtBRL(metrics.vendasMes)} trend={metrics.salesTrend} />
          <StatCard label="Pedidos Pendentes" value={fmtInt(metrics.orders_pending)}
            subtitle={metrics.pendingValue > 0 ? `${fmtBRL(metrics.pendingValue)} a receber` : (metrics.orders_pending > 0 ? 'aguardando conclusão' : 'tudo em dia ✓')} />
          <StatCard label="Pedidos Hoje" value={fmtInt(metrics.today)} trend={metrics.todayTrend} trendLabel="vs ontem" />
          {catalog && <StatCard label="Ticket Médio" value={fmtBRL(metrics.ticketMes)} trend={metrics.ticketTrend} />}
        </>}
      </div>

      {hasVenda && salesViz && (
        <div className="dash-viz">
          <div style={{ gridArea: 'recent' }}><RecentOrders items={salesViz.recent} /></div>
          <div style={{ gridArea: 'mes' }}><MonthlyBars data={salesViz.monthly} /></div>
          <div style={{ gridArea: 'horas' }}><BestHours data={catalog?.bestHours || []} /></div>
          <div style={{ gridArea: 'fat' }}>
            <div className="card viz-card fat-card">
              <div className="viz-head"><h4>Faturamento total</h4></div>
              <div className="fat-value">{fmtBRL(salesViz.faturamentoPago)}</div>
              <div className="fat-cap">em pedidos pagos</div>
            </div>
          </div>
          <div style={{ gridArea: 'bairro' }}><BairroDonut items={salesViz.bairros} total={salesViz.totalPedidos} /></div>
          <div style={{ gridArea: 'assinatura' }}><SubscriptionCard sub={sub} /></div>
        </div>
      )}
    </div>
  );
}
