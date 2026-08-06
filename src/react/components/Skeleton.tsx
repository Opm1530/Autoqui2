// Blocos de skeleton reutilizáveis (substituem o spinner de loading).

export function SkeletonBox({ width = '100%', height = 16, radius = 6, style }: { width?: number | string; height?: number | string; radius?: number; style?: React.CSSProperties }) {
  return <span className="skeleton" style={{ width, height, borderRadius: radius, ...style }} />;
}

// Linhas de tabela em skeleton. `cols` define quantas colunas.
export function SkeletonTable({ rows = 8, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="card">
      <div className="table-container">
        <table className="data-table">
          <tbody>
            {Array.from({ length: rows }).map((_, r) => (
              <tr key={r}>
                {Array.from({ length: cols }).map((_, c) => (
                  <td key={c}><SkeletonBox width={c === 0 ? '70%' : `${40 + ((r + c) % 4) * 12}%`} height={14} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Grade de cards em skeleton.
export function SkeletonCards({ count = 6, minWidth = 320, lines = 3 }: { count?: number; minWidth?: number; lines?: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`, gap: '1.25rem' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <SkeletonBox width={44} height={44} radius={12} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <SkeletonBox width="60%" height={14} />
              <SkeletonBox width="40%" height={11} />
            </div>
          </div>
          {Array.from({ length: lines }).map((_, l) => <SkeletonBox key={l} width={`${80 - l * 15}%`} height={12} />)}
        </div>
      ))}
    </div>
  );
}
