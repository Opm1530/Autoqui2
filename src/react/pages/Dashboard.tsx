import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dbService } from '../../services/db';
import { toast } from '../../services/toast';
import { useAuth } from '../useAuth';
import { subscriptionApi } from '../../services/subscriptionApi';
import { MonthlyBars, BairroDonut, BestHours, RecentOrders, SubscriptionCard, fmtInt, fmtBRL } from './DashboardWidgets';
import { SkeletonBox } from '../components/Skeleton';
import { vitrineApi, type VitrineMetrics } from '../../services/vitrineApi';
import { farmaquiApi } from '../../services/farmaquiApi';

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
  const [vm, setVm] = useState<VitrineMetrics | null>(null);
  const [vmDays, setVmDays] = useState(30);
  const [lp, setLp] = useState<any | null>(null);
  const [lpDays, setLpDays] = useState(30);
  const [funnel, setFunnel] = useState<any | null>(null);
  const [fkpi, setFkpi] = useState<any | null>(null);
  const [farmaLeads, setFarmaLeads] = useState<any[] | null>(null);
  const [shared, setShared] = useState(false);
  const [loading, setLoading] = useState(true);

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
          .sort((a: any, b: any) => orderDate(b).getTime() - orderDate(a).getTime()).slice(0, 6)
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
      setLoading(false);
    })();
  }, [companyId]);

  const isVitrine = modulos.includes('vitrine');
  useEffect(() => {
    if (!isVitrine) return;
    vitrineApi.metrics(vmDays).then(setVm).catch(() => {});
  }, [isVitrine, vmDays]);

  const isFarma = modulos.includes('farmaqui');
  useEffect(() => {
    if (!isFarma) return;
    farmaquiApi.landingMetrics(lpDays).then(setLp).catch(() => {});
  }, [isFarma, lpDays]);
  useEffect(() => {
    if (!isFarma) return;
    farmaquiApi.metrics().then(setFkpi).catch(() => {});
    dbService.getAll('leads', { field: 'empresaId', operator: '==', value: companyId }).then((l) => setFarmaLeads(l as any[])).catch(() => setFarmaLeads([]));
  }, [isFarma, companyId]);

  const hasVenda = modulos.includes('venda') || modulos.includes('venda_catalogo');
  useEffect(() => { if (hasVenda) vitrineApi.catalogFunnel(30).then(setFunnel).catch(() => {}); }, [hasVenda]);
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

  if (loading) return <DashboardSkeleton />;

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

      {isVitrine && <VitrineBlock m={vm} days={vmDays} setDays={setVmDays} />}

      {isFarma && (
        <>
          <div style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
            <h3 style={{ margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: 10 }}><i className="fa-solid fa-prescription-bottle-medical" style={{ color: 'var(--primary)' }} /> Seu CRM</h3>
            {!fkpi ? <SkeletonBox height={110} /> : (
              <div className="dashboard-grid">
                <StatCard label="Leads capturados" value={fmtInt(fkpi.leadsTotal)} />
                <StatCard green label="Viraram clientes" value={fmtInt(fkpi.clientes)} subtitle={`${fkpi.conversao}% de conversão`} />
                <StatCard label="Recompras agendadas" value={fmtInt(fkpi.recompraAgendadas)} />
                <StatCard label="Recompras enviadas" value={fmtInt(fkpi.recompraEnviadas)} />
              </div>
            )}
          </div>
          <div className="dash-viz">
            <div className="dash-col">
              <RecentLeads leads={farmaLeads} />
              <SubscriptionCard sub={sub} />
            </div>
            <div className="dash-col">
              <LeadsMonthBars leads={farmaLeads} />
            </div>
            <div className="dash-col">
              <OrigemDonut leads={farmaLeads} />
            </div>
          </div>
          <LandingBlock m={lp} days={lpDays} setDays={setLpDays} />
        </>
      )}

      {hasVenda && salesViz && (
        <div className="dash-viz">
          <div className="dash-col">
            <RecentOrders items={salesViz.recent} />
            <div className="card viz-card fat-card">
              <div className="viz-head"><h4>Faturamento total</h4></div>
              <div className="fat-value">{fmtBRL(salesViz.faturamentoPago)}</div>
              <div className="fat-cap">em pedidos pagos</div>
            </div>
          </div>
          <div className="dash-col">
            <MonthlyBars data={salesViz.monthly} />
            <BestHours data={catalog?.bestHours || []} />
          </div>
          <div className="dash-col">
            <CatalogFunnel f={funnel} />
            <SubscriptionCard sub={sub} />
          </div>
        </div>
      )}
    </div>
  );
}

// Últimos leads capturados (lista).
const STATUS_LEAD: Record<string, { label: string; color: string }> = {
  cliente_ativo: { label: 'Cliente', color: '#16a34a' },
  bloqueado: { label: 'Bloqueado', color: '#ef4444' },
  lead: { label: 'Lead', color: '#6fae12' },
  novo: { label: 'Novo', color: '#6fae12' },
};
function RecentLeads({ leads }: { leads: any[] | null }) {
  if (!leads) return <div className="card viz-card"><SkeletonBox width={160} height={18} /><div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>{[0, 1, 2, 3].map((r) => <SkeletonBox key={r} height={16} />)}</div></div>;
  const recent = [...leads].sort((a, b) => new Date(b.criadoEm || b.ultimoContato || 0).getTime() - new Date(a.criadoEm || a.ultimoContato || 0).getTime()).slice(0, 7);
  return (
    <div className="card viz-card">
      <div className="viz-head"><h4>Últimos leads</h4></div>
      {recent.length === 0 ? <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: 12 }}>Nenhum lead ainda.</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
          {recent.map((l) => {
            const st = STATUS_LEAD[(l.statusLead || 'lead').toLowerCase()] || STATUS_LEAD.lead;
            const phone = (l.telefone || l.whatsapp || '').split('@')[0];
            return (
              <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="lead-avatar" style={{ flexShrink: 0 }}>{(l.nome || phone || 'C')[0].toUpperCase()}</div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.nome || phone || 'Sem nome'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{phone}</div>
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: st.color, background: st.color + '1f', border: `1px solid ${st.color}44`, borderRadius: 999, padding: '2px 9px', flexShrink: 0 }}>{st.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Leads capturados por mês (barras).
function LeadsMonthBars({ leads }: { leads: any[] | null }) {
  if (!leads) return <div className="card viz-card"><SkeletonBox width={160} height={18} /><SkeletonBox height={140} style={{ marginTop: 16 }} /></div>;
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => { const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1); return { key: `${d.getFullYear()}-${d.getMonth()}`, label: MESES_PT[d.getMonth()], count: 0 }; });
  leads.forEach((l) => { const dt = new Date(l.criadoEm || l.ultimoContato || 0); const m = months.find((x) => x.key === `${dt.getFullYear()}-${dt.getMonth()}`); if (m) m.count++; });
  const max = Math.max(1, ...months.map((m) => m.count));
  return (
    <div className="card viz-card">
      <div className="viz-head"><h4>Leads por mês</h4></div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 150, marginTop: 16 }}>
        {months.map((m, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>{m.count || ''}</span>
            <div title={`${m.count} leads`} style={{ width: '70%', height: `${(m.count / max) * 100}%`, minHeight: m.count ? 4 : 0, background: 'linear-gradient(180deg,var(--primary),var(--primary-hover))', borderRadius: '5px 5px 0 0' }} />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'capitalize' }}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Leads por origem (donut).
const ORIGEM_LABEL: Record<string, string> = { whatsapp: 'WhatsApp', vitrine: 'Vitrine', grupo: 'Grupo', agenda: 'Agenda', manual: 'Manual', landing: 'Landing' };
function OrigemDonut({ leads }: { leads: any[] | null }) {
  if (!leads) return <div className="card viz-card"><SkeletonBox width={160} height={18} /><SkeletonBox height={160} style={{ marginTop: 16 }} /></div>;
  const counts = new Map<string, number>();
  leads.forEach((l) => { const o = String(l.origem || 'whatsapp').toLowerCase(); counts.set(o, (counts.get(o) || 0) + 1); });
  const items = [...counts.entries()].map(([name, count]) => ({ name: ORIGEM_LABEL[name] || name, count })).sort((a, b) => b.count - a.count);
  return <BairroDonut items={items} total={leads.length} title="Leads por origem" emptyText="Sem leads ainda." />;
}

// Bloco de métricas da Vitrine: funil (visitas → cliques → WhatsApp → leads),
// conversão, visitas por dia e produtos mais clicados.
function VitrineBlock({ m, days, setDays }: { m: VitrineMetrics | null; days: number; setDays: (d: number) => void }) {
  const maxV = m ? Math.max(1, ...m.serie.map((s) => s.views)) : 1;
  return (
    <div style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}><i className="fa-solid fa-chart-simple" style={{ color: 'var(--primary)' }} /> Sua vitrine</h3>
        <select className="config-select" style={{ width: 'auto' }} value={days} onChange={(e) => setDays(Number(e.target.value))}>
          <option value={7}>Últimos 7 dias</option>
          <option value={30}>Últimos 30 dias</option>
          <option value={90}>Últimos 90 dias</option>
        </select>
      </div>

      {!m ? <SkeletonBox height={110} /> : (
        <>
          <div className="dashboard-grid">
            <StatCard label="Visitas" value={fmtInt(m.views)} subtitle={`${fmtInt(m.uniques)} visitantes únicos`} />
            <StatCard label="Cliques em produtos" value={fmtInt(m.cliquesProduto)} />
            <StatCard green label="Idas pro WhatsApp" value={fmtInt(m.whatsapp)} subtitle={`${m.conversao}% de conversão`} />
            <StatCard label="Leads capturados" value={fmtInt(m.leadsPeriodo)} subtitle={`${fmtInt(m.leadsTotal)} no total`} />
          </div>

          <div className="dash-viz" style={{ marginTop: '1rem' }}>
            <div className="dash-col" style={{ flex: 2 }}>
              <div className="card viz-card">
                <div className="viz-head"><h4>Visitas por dia</h4></div>
                {m.serie.every((s) => s.views === 0) ? (
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', margin: '1rem 0 0' }}>Sem visitas registradas ainda. Compartilhe o link da sua vitrine para começar a medir.</p>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 140, marginTop: 16 }}>
                    {m.serie.map((s, i) => (
                      <div key={i} title={`${s.dia}: ${s.views} visitas, ${s.whatsapp} no WhatsApp`}
                        style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', gap: 2 }}>
                        <div style={{ height: `${(s.views / maxV) * 100}%`, minHeight: s.views ? 3 : 0, background: 'var(--primary)', borderRadius: '4px 4px 0 0' }} />
                        <div style={{ height: `${(s.whatsapp / maxV) * 100}%`, minHeight: s.whatsapp ? 3 : 0, background: 'var(--success)', borderRadius: '4px 4px 0 0' }} />
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <span><i className="fa-solid fa-square" style={{ color: 'var(--primary)', marginRight: 5 }} />Visitas</span>
                  <span><i className="fa-solid fa-square" style={{ color: 'var(--success)', marginRight: 5 }} />Idas pro WhatsApp</span>
                </div>
              </div>
            </div>
            <div className="dash-col">
              <div className="card viz-card">
                <div className="viz-head"><h4>Produtos mais clicados</h4></div>
                {m.topProdutos.length === 0 ? (
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', margin: '1rem 0 0' }}>Nenhum clique em produto ainda.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
                    {m.topProdutos.map((p, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{i + 1}. {p.nome}</span>
                        <span className="badge" style={{ background: 'rgba(132, 204, 22,0.15)', color: 'var(--primary-hover)', border: '1px solid rgba(132, 204, 22,0.3)', flexShrink: 0 }}>{p.cliques} cliques</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Funil da Landing Page: visitas → cliques no WhatsApp → leads.
function LandingBlock({ m, days, setDays }: { m: any | null; days: number; setDays: (d: number) => void }) {
  const maxV = m ? Math.max(1, ...m.serie.map((s: any) => s.views)) : 1;
  return (
    <div style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}><i className="fa-solid fa-globe" style={{ color: 'var(--primary)' }} /> Sua landing page</h3>
        <select className="config-select" style={{ width: 'auto' }} value={days} onChange={(e) => setDays(Number(e.target.value))}>
          <option value={7}>Últimos 7 dias</option>
          <option value={30}>Últimos 30 dias</option>
          <option value={90}>Últimos 90 dias</option>
        </select>
      </div>
      {!m ? <SkeletonBox height={110} /> : (
        <>
          <div className="dashboard-grid">
            <StatCard label="Visitas na página" value={fmtInt(m.views)} subtitle={`${fmtInt(m.uniques)} visitantes únicos`} />
            <StatCard green label="Cliques no WhatsApp" value={fmtInt(m.cliques)} subtitle={`${m.conversao}% de conversão`} />
            <StatCard label="Leads no período" value={fmtInt(m.leadsPeriodo)} subtitle={`${fmtInt(m.leadsTotal)} no total`} />
          </div>
          <div className="dash-viz" style={{ marginTop: '1rem' }}>
            <div className="dash-col" style={{ flex: 1 }}>
              <div className="card viz-card">
                <div className="viz-head"><h4>Visitas por dia</h4></div>
                {m.serie.every((s: any) => s.views === 0) ? (
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', margin: '1rem 0 0' }}>Sem visitas registradas ainda. Divulgue o link da sua landing page para começar a medir.</p>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 140, marginTop: 16 }}>
                    {m.serie.map((s: any, i: number) => (
                      <div key={i} title={`${s.dia}: ${s.views} visitas, ${s.cliques} cliques`}
                        style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', gap: 2 }}>
                        <div style={{ height: `${(s.views / maxV) * 100}%`, minHeight: s.views ? 3 : 0, background: 'var(--primary)', borderRadius: '4px 4px 0 0' }} />
                        <div style={{ height: `${(s.cliques / maxV) * 100}%`, minHeight: s.cliques ? 3 : 0, background: 'var(--success)', borderRadius: '4px 4px 0 0' }} />
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <span><i className="fa-solid fa-square" style={{ color: 'var(--primary)', marginRight: 5 }} />Visitas</span>
                  <span><i className="fa-solid fa-square" style={{ color: 'var(--success)', marginRight: 5 }} />Cliques no WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Funil de conversão do catálogo (substitui "pedidos por bairro").
const FUNNEL_STAGES = [
  { key: 'acessou', label: 'Acessou o catálogo', color: '#bef264' },
  { key: 'carrinho', label: 'Adicionou ao carrinho', color: '#a3e635' },
  { key: 'checkout', label: 'Entrou no checkout', color: '#84cc16' },
  { key: 'pagamento', label: 'Iniciou o pagamento', color: '#65a30d' },
  { key: 'comprou', label: 'Comprou', color: '#4d7c0f' },
  { key: 'recomprou', label: 'Recomprou', color: '#166534' },
];
function CatalogFunnel({ f }: { f: any | null }) {
  if (!f) return <div className="card viz-card"><SkeletonBox width={170} height={18} /><SkeletonBox height={180} style={{ marginTop: 16 }} /></div>;
  const vals = FUNNEL_STAGES.map((s) => Number(f[s.key] || 0));
  const vazio = vals.every((v) => v === 0);
  return (
    <div className="card viz-card">
      <div className="viz-head"><h4>Funil de conversão</h4></div>
      {vazio ? (
        <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', margin: '1rem 0 0' }}>Ainda sem dados. As etapas do carrinho ao pagamento começam a contar conforme os clientes usam o catálogo.</p>
      ) : (
        <>
          {/* Funil fixo (fatias afuniladas em SVG) */}
          {(() => {
            const W = [96, 82, 68, 54, 40, 28, 18]; // larguras das bordas (7 pontos = 6 fatias)
            const SH = 28, GAP = 3;                 // altura e espaço entre fatias
            const H = FUNNEL_STAGES.length * (SH + GAP);
            return (
              <svg viewBox={`0 0 100 ${H}`} style={{ width: '100%', height: 190, margin: '14px 0 12px', display: 'block' }}>
                {FUNNEL_STAGES.map((s, i) => {
                  const y = i * (SH + GAP);
                  const tw = W[i], bw = W[i + 1];
                  const pts = `${50 - tw / 2},${y} ${50 + tw / 2},${y} ${50 + bw / 2},${y + SH} ${50 - bw / 2},${y + SH}`;
                  return (
                    <g key={s.key}>
                      <polygon points={pts} fill={s.color}>
                        <title>{`${s.label}: ${vals[i]}`}</title>
                      </polygon>
                      <text x="50" y={y + SH / 2} fill="#fff" fontSize="10" fontWeight="800" textAnchor="middle" dominantBaseline="central">{vals[i]}</text>
                    </g>
                  );
                })}
              </svg>
            );
          })()}
          {/* Legenda com conversão de cada etapa */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {FUNNEL_STAGES.map((s, i) => {
              const prev = i > 0 ? vals[i - 1] : 0;
              const conv = i > 0 && prev > 0 ? Math.round((vals[i] / prev) * 100) : null;
              return (
                <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.84rem' }}>
                  <span style={{ width: 11, height: 11, borderRadius: 3, background: s.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, color: 'var(--text-main)' }}>{s.label}</span>
                  {conv !== null && <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{conv}%</span>}
                  <span style={{ fontWeight: 700, minWidth: 32, textAlign: 'right' }}>{fmtInt(vals[i])}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// Skeleton de carregamento do Dashboard (mesma silhueta da tela).
function DashboardSkeleton() {
  return (
    <div>
      <div className="page-heading" style={{ marginBottom: '1.75rem' }}>
        <SkeletonBox width={200} height={28} />
        <SkeletonBox width={320} height={16} style={{ marginTop: 10 }} />
      </div>
      <div className="dashboard-grid">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="stats-card card">
            <SkeletonBox width={110} height={14} />
            <SkeletonBox width={140} height={30} style={{ marginTop: 'auto' }} />
            <SkeletonBox width={90} height={12} />
          </div>
        ))}
      </div>
      <div className="dash-viz">
        {[0, 1, 2].map((col) => (
          <div key={col} className="dash-col">
            <div className="card viz-card">
              <SkeletonBox width={160} height={18} />
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[0, 1, 2, 3, 4].map((r) => <SkeletonBox key={r} height={16} />)}
              </div>
            </div>
            <div className="card viz-card">
              <SkeletonBox width={140} height={18} />
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[0, 1, 2].map((r) => <SkeletonBox key={r} height={16} />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
