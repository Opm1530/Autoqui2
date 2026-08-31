import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../services/db';

interface Groups { orders: any[]; products: any[]; leads: any[]; }
const EMPTY: Groups = { orders: [], products: [], leads: [] };

// Busca geral (topbar em telas sem lista própria): agrupa pedidos/produtos/leads.
export function GlobalSearch({ q, companyId, onPick }: { q: string; companyId: string; onPick: () => void }) {
  const nav = useNavigate();
  const [res, setRes] = useState<Groups>(EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) { setRes(EMPTY); return; }
    let alive = true;
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const [prods, leads, orders] = await Promise.all([
          dbService.getAll('products', { field: 'companyId', operator: '==', value: companyId }).catch(() => []),
          dbService.getAll('leads', { field: 'empresaId', operator: '==', value: companyId }).catch(() => []),
          dbService.getAll('pedidos', { field: 'empresaId', operator: '==', value: companyId }).catch(() => []),
        ]);
        if (!alive) return;
        setRes({
          orders: (orders as any[]).filter((o) => `${o.nome || o.leadName || o.clientName || ''} ${o.clientPhone || ''}`.toLowerCase().includes(term)).slice(0, 5),
          products: (prods as any[]).filter((p) => (p.name || '').toLowerCase().includes(term)).slice(0, 5),
          leads: (leads as any[]).filter((l) => `${l.nome || l.name || ''} ${l.telefone || l.whatsapp || ''}`.toLowerCase().includes(term)).slice(0, 5),
        });
      } finally { if (alive) setLoading(false); }
    }, 300);
    return () => { alive = false; clearTimeout(t); };
  }, [q, companyId]);

  const go = (path: string) => { onPick(); nav(`${path}?q=${encodeURIComponent(q)}`); };
  const total = res.orders.length + res.products.length + res.leads.length;

  return (
    <div className="gsearch">
      {loading && total === 0 ? (
        <div className="gsearch-empty"><i className="fa-solid fa-spinner fa-spin" /> Buscando…</div>
      ) : total === 0 ? (
        <div className="gsearch-empty">Nada encontrado para “{q}”.</div>
      ) : (
        <>
          <Group title="Pedidos" icon="fa-clipboard-list" items={res.orders} label={(o) => o.nome || o.leadName || o.clientName || 'Cliente'} onClick={() => go('/orders')} />
          <Group title="Produtos" icon="fa-box" items={res.products} label={(p) => p.name} onClick={() => go('/products')} />
          <Group title="Leads" icon="fa-user" items={res.leads} label={(l) => l.nome || l.name || l.telefone} onClick={() => go('/leads')} />
        </>
      )}
    </div>
  );
}

function Group({ title, icon, items, label, onClick }: { title: string; icon: string; items: any[]; label: (x: any) => string; onClick: () => void }) {
  if (items.length === 0) return null;
  return (
    <div className="gsearch-group">
      <div className="gsearch-title">{title}</div>
      {items.map((it) => (
        <button key={it.id} className="gsearch-item" onMouseDown={(e) => e.preventDefault()} onClick={onClick}>
          <i className={`fa-solid ${icon}`} />
          <span>{label(it)}</span>
        </button>
      ))}
    </div>
  );
}
