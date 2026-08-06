import { useEffect, useMemo, useState } from 'react';

// Hook de paginação client-side. Reseta a página quando a lista muda de tamanho
// ou quando `resetKey` muda (ex.: filtro/busca).
export function usePagination<T>(items: T[], perPage = 20, resetKey?: any) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));

  useEffect(() => { setPage(1); }, [resetKey]);
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);

  const pageItems = useMemo(() => items.slice((page - 1) * perPage, page * perPage), [items, page, perPage]);

  return { page, setPage, totalPages, pageItems, total: items.length, perPage };
}

// Faixa de números de página com reticências.
function pageRange(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | '…')[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push('…');
  for (let i = start; i <= end; i++) out.push(i);
  if (end < total - 1) out.push('…');
  out.push(total);
  return out;
}

export function Pagination({ page, totalPages, total, perPage, onChange, label = 'itens' }: {
  page: number; totalPages: number; total: number; perPage: number; onChange: (p: number) => void; label?: string;
}) {
  if (total === 0) return null;
  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  return (
    <div className="pagination-bar">
      <span className="pagination-info">Mostrando {from}–{to} de {total} {label}</span>
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button className="pagination-btn" disabled={page === 1} onClick={() => onChange(page - 1)} title="Anterior"><i className="fa-solid fa-chevron-left" /></button>
          {pageRange(page, totalPages).map((p, i) => p === '…'
            ? <span key={`e${i}`} style={{ color: 'var(--text-dim)', padding: '0 4px' }}>…</span>
            : <button key={p} className={'pagination-btn' + (p === page ? ' active' : '')} onClick={() => onChange(p)}>{p}</button>)}
          <button className="pagination-btn" disabled={page === totalPages} onClick={() => onChange(page + 1)} title="Próxima"><i className="fa-solid fa-chevron-right" /></button>
        </div>
      )}
    </div>
  );
}
