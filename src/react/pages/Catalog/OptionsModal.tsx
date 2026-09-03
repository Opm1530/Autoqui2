import { useMemo, useState } from 'react';
import { getImageUrl } from './helpers';

interface OpcaoItem { id: string; nome: string; preco: number }
interface GrupoOpcao { id: string; nome: string; min: number; max: number; obrigatorio: boolean; itens: OpcaoItem[] }
type Sel = Record<string, string[]>; // grupoId -> itemIds

const brl = (n: number) => `R$ ${Number(n).toFixed(2)}`;

export function OptionsModal({ product, onClose, onConfirm }: {
  product: any;
  onClose: () => void;
  onConfirm: (opcoes: { grupoId: string; grupoNome: string; itemId: string; nome: string; preco: number }[], unit: number) => void;
}) {
  const grupos: GrupoOpcao[] = Array.isArray(product.gruposOpcoes) ? product.gruposOpcoes : [];
  const base = Number(product.promotionalActive ? (product.promotionalPrice || product.price) : product.price) || 0;
  const [sel, setSel] = useState<Sel>({});

  const isSingle = (g: GrupoOpcao) => g.max === 1;
  const toggle = (g: GrupoOpcao, itemId: string) => {
    setSel((prev) => {
      const atual = prev[g.id] || [];
      if (isSingle(g)) return { ...prev, [g.id]: atual[0] === itemId ? [] : [itemId] };
      if (atual.includes(itemId)) return { ...prev, [g.id]: atual.filter((x) => x !== itemId) };
      if (g.max > 0 && atual.length >= g.max) return prev; // atingiu o máximo
      return { ...prev, [g.id]: [...atual, itemId] };
    });
  };

  const { opcoes, unit, faltando } = useMemo(() => {
    const chosen: any[] = [];
    let extra = 0;
    const faltas: string[] = [];
    for (const g of grupos) {
      const ids = sel[g.id] || [];
      const minReq = g.obrigatorio ? Math.max(1, g.min) : g.min;
      if (ids.length < minReq) faltas.push(g.nome);
      for (const id of ids) {
        const it = g.itens.find((x) => x.id === id);
        if (it) { chosen.push({ grupoId: g.id, grupoNome: g.nome, itemId: it.id, nome: it.nome, preco: it.preco }); extra += it.preco; }
      }
    }
    return { opcoes: chosen, unit: base + extra, faltando: faltas };
  }, [sel, grupos, base]);

  const inp: React.CSSProperties = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 16, overflowY: 'auto' };
  return (
    <div style={inp} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: '#fff', color: '#16251c', borderRadius: 20, maxWidth: 440, width: '100%', margin: 'auto', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}>
        <div style={{ position: 'relative' }}>
          {getImageUrl(product) && <img src={getImageUrl(product)} alt={product.name} style={{ width: '100%', height: 150, objectFit: 'cover' }} />}
          <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10, width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>×</button>
        </div>
        <div style={{ padding: '14px 18px 0' }}>
          <h3 style={{ margin: 0 }}>{product.name}</h3>
          <div style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 2 }}>A partir de {brl(base)}</div>
        </div>

        <div style={{ maxHeight: '48vh', overflowY: 'auto', padding: '10px 18px' }}>
          {grupos.map((g) => {
            const ids = sel[g.id] || [];
            return (
              <div key={g.id} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <strong style={{ fontSize: '0.95rem' }}>{g.nome}</strong>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: g.obrigatorio ? 'rgba(239,68,68,0.12)' : '#f1f5f9', color: g.obrigatorio ? '#ef4444' : '#64748b' }}>
                    {g.obrigatorio ? 'Obrigatório' : 'Opcional'}{g.max > 1 ? ` · até ${g.max}` : ''}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {g.itens.map((it) => {
                    const on = ids.includes(it.id);
                    return (
                      <button key={it.id} type="button" onClick={() => toggle(g, it.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px', borderRadius: 10, cursor: 'pointer', textAlign: 'left', background: on ? 'rgba(132,204,22,0.1)' : '#f8fafc', border: `1.5px solid ${on ? 'var(--primary-cat, #84cc16)' : '#e5e7eb'}` }}>
                        <span style={{ width: 20, height: 20, flexShrink: 0, borderRadius: isSingle(g) ? '50%' : 6, border: `2px solid ${on ? 'var(--primary-cat, #84cc16)' : '#cbd5e1'}`, background: on ? 'var(--primary-cat, #84cc16)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {on && <i className="fa-solid fa-check" style={{ color: '#fff', fontSize: '0.65rem' }} />}
                        </span>
                        <span style={{ flex: 1, fontSize: '0.9rem' }}>{it.nome}</span>
                        {it.preco > 0 && <span style={{ color: '#65a30d', fontWeight: 700, fontSize: '0.85rem' }}>+ {brl(it.preco)}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ padding: '12px 18px', borderTop: '1px solid #e5e7eb' }}>
          {faltando.length > 0 && <p style={{ margin: '0 0 8px', fontSize: '0.8rem', color: '#ef4444' }}>Escolha: {faltando.join(', ')}</p>}
          <button disabled={faltando.length > 0} onClick={() => onConfirm(opcoes, unit)}
            style={{ width: '100%', padding: 13, borderRadius: 12, background: faltando.length > 0 ? '#cbd5e1' : 'var(--primary-cat, #84cc16)', color: '#fff', border: 'none', cursor: faltando.length > 0 ? 'not-allowed' : 'pointer', fontWeight: 800, fontSize: '0.95rem' }}>
            Adicionar · {brl(unit)}
          </button>
        </div>
      </div>
    </div>
  );
}
