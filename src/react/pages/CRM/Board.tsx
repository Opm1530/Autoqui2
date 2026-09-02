import { useEffect, useMemo, useRef, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { dataApi } from '../../../services/dataApi';
import { crmApi, type CrmColuna, type CrmTag } from '../../../services/crmApi';
import { toast } from '../../../services/toast';
import { confirm } from '../../../services/confirm';
import { useAuth } from '../../useAuth';

const uid = () => `col_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
const CORES = ['#84cc16', '#0ea5e9', '#f59e0b', '#22c55e', '#ef4444', '#a855f7', '#ec4899', '#14b8a6', '#64748b'];
const leadPhone = (l: any) => String(l.whatsapp || l.telefone || '').replace(/\D/g, '');

export function CRMBoard() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';

  const [leads, setLeads] = useState<any[]>([]);
  const [colunas, setColunas] = useState<CrmColuna[]>([]);
  const [tags, setTags] = useState<CrmTag[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<'kanban' | 'lista'>('kanban');
  const [density, setDensity] = useState<'full' | 'compact'>(() => (localStorage.getItem('crm_density') as any) || 'full');
  const [collapsed, setCollapsed] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem('crm_collapsed') || '[]')); } catch { return new Set(); }
  });
  const [verArquivados, setVerArquivados] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [tagMgrOpen, setTagMgrOpen] = useState(false);
  const [detail, setDetail] = useState<any | null>(null);
  const [editCol, setEditCol] = useState<CrmColuna | null>(null);

  // ── Carga ──
  useEffect(() => {
    if (!companyId) return;
    const q = query(collection(db, 'leads'), where('empresaId', '==', companyId));
    const unsub = onSnapshot(q, (snap) => { setLeads(snap.docs.map((d) => ({ id: d.id, ...d.data() }))); setLoaded(true); });
    return unsub;
  }, [companyId]);

  useEffect(() => {
    crmApi.getConfig().then((c) => { setColunas([...c.colunas].sort((a, b) => a.ordem - b.ordem)); setTags(c.tags); }).catch(() => {});
  }, []);

  const persistColumns = (cols: CrmColuna[], nextTags?: CrmTag[]) => {
    const ordered = cols.map((c, i) => ({ ...c, ordem: i }));
    setColunas(ordered);
    crmApi.saveConfig(ordered, nextTags ?? tags).catch(() => toast.error('Erro ao salvar colunas.'));
  };
  const persistTags = (nextTags: CrmTag[]) => { setTags(nextTags); crmApi.saveConfig(colunas, nextTags).catch(() => toast.error('Erro ao salvar tags.')); };

  const localStr = (k: string, v: any) => { try { localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v)); } catch { /* ignore */ } };

  // Leads no quadro (crmColuna definido) vs fora (base disponível para adicionar).
  const noBoard = useMemo(() => leads.filter((l) => l.crmColuna && !l.crmArquivado), [leads]);
  const arquivados = useMemo(() => leads.filter((l) => l.crmArquivado), [leads]);
  const foraDoBoard = useMemo(() => leads.filter((l) => !l.crmColuna && !l.crmArquivado), [leads]);
  const colIds = useMemo(() => new Set(colunas.map((c) => c.id)), [colunas]);

  const cardsDe = (colId: string, i: number) => {
    const src = verArquivados ? arquivados : noBoard;
    return src.filter((l) => l.crmColuna === colId || (i === 0 && !colIds.has(l.crmColuna)));
  };

  // ── Ações em cards ──
  const moveTo = (lead: any, colId: string) => { if (lead.crmColuna === colId) return; dataApi.update('leads', lead.id, { crmColuna: colId }).catch(() => toast.error('Erro ao mover.')); };
  const addAoBoard = (lead: any) => dataApi.update('leads', lead.id, { crmColuna: colunas[0]?.id || 'novo', crmArquivado: false }).catch(() => toast.error('Erro ao adicionar.'));
  const arquivar = (lead: any) => { dataApi.update('leads', lead.id, { crmArquivado: true }).catch(() => toast.error('Erro ao arquivar.')); setDetail(null); };
  const desarquivar = (lead: any) => dataApi.update('leads', lead.id, { crmArquivado: false, crmColuna: lead.crmColuna || colunas[0]?.id || 'novo' }).catch(() => toast.error('Erro.'));
  const removerDoBoard = (lead: any) => { dataApi.update('leads', lead.id, { crmColuna: null, crmArquivado: false }).catch(() => toast.error('Erro.')); setDetail(null); };
  const toggleTag = (lead: any, nome: string) => {
    const cur: string[] = Array.isArray(lead.tags) ? lead.tags : [];
    const next = cur.includes(nome) ? cur.filter((t) => t !== nome) : [...cur, nome];
    dataApi.update('leads', lead.id, { tags: next }).catch(() => toast.error('Erro ao aplicar tag.'));
    setDetail((d: any) => (d && d.id === lead.id ? { ...d, tags: next } : d));
  };

  // ── Colunas ──
  const addColuna = () => { const nome = 'Nova coluna'; persistColumns([...colunas, { id: uid(), nome, cor: CORES[colunas.length % CORES.length], ordem: colunas.length }]); };
  const saveColEdit = (id: string, nome: string, cor: string) => persistColumns(colunas.map((x) => (x.id === id ? { ...x, nome: nome.trim() || x.nome, cor } : x)));
  const moverColuna = (idx: number, dir: -1 | 1) => { const j = idx + dir; if (j < 0 || j >= colunas.length) return; const arr = [...colunas]; [arr[idx], arr[j]] = [arr[j], arr[idx]]; persistColumns(arr); };
  const excluirColuna = async (c: CrmColuna) => {
    if (colunas.length <= 1) { toast.warning('Deixe ao menos uma coluna.'); return; }
    const ok = await confirm.danger('Excluir coluna', `Excluir "${c.nome}"? Os cards vão para a primeira coluna.`);
    if (!ok) return;
    const first = colunas.find((x) => x.id !== c.id);
    noBoard.filter((l) => l.crmColuna === c.id).forEach((l) => dataApi.update('leads', l.id, { crmColuna: first?.id }).catch(() => {}));
    persistColumns(colunas.filter((x) => x.id !== c.id));
  };
  const toggleCollapse = (id: string) => setCollapsed((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); localStr('crm_collapsed', [...n]); return n; });

  // ── Drag & drop (pointer events: mouse + toque) ──
  const [dragId, setDragId] = useState<string | null>(null);
  const [hoverCol, setHoverCol] = useState<string | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const dragMeta = useRef<{ lead: any; startX: number; startY: number; active: boolean } | null>(null);

  const onCardPointerDown = (e: React.PointerEvent, lead: any) => {
    if ((e.target as HTMLElement).closest('button,a')) return; // não arrasta ao clicar em botão
    dragMeta.current = { lead, startX: e.clientX, startY: e.clientY, active: false };
    const move = (ev: PointerEvent) => {
      const m = dragMeta.current; if (!m) return;
      const dx = ev.clientX - m.startX, dy = ev.clientY - m.startY;
      if (!m.active && Math.hypot(dx, dy) < 8) return;
      if (!m.active) { m.active = true; setDragId(m.lead.id); document.body.style.userSelect = 'none'; }
      if (ghostRef.current) ghostRef.current.style.transform = `translate(${ev.clientX + 8}px, ${ev.clientY + 8}px)`;
      const el = document.elementFromPoint(ev.clientX, ev.clientY)?.closest('[data-col-drop]') as HTMLElement | null;
      const col = el?.getAttribute('data-col-drop') || null;
      setHoverCol((prev) => (prev === col ? prev : col));
    };
    const up = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up);
      document.body.style.userSelect = '';
      const m = dragMeta.current; dragMeta.current = null;
      const el = document.elementFromPoint(ev.clientX, ev.clientY)?.closest('[data-col-drop]') as HTMLElement | null;
      const col = el?.getAttribute('data-col-drop');
      if (m?.active && col) moveTo(m.lead, col);
      else if (m && !m.active) setDetail(m.lead); // clique = abrir detalhe
      setDragId(null); setHoverCol(null);
    };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  };

  if (!loaded && !colunas.length) return <div className="page-heading"><h1>CRM</h1><p>Carregando...</p></div>;

  const tagCor = (nome: string) => tags.find((t) => t.nome === nome)?.cor || '#64748b';
  const draggingLead = dragId ? leads.find((l) => l.id === dragId) : null;

  return (
    <div>
      <div className="page-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <h1>CRM</h1>
          <p>Organize seus leads e clientes em um quadro. Arraste os cards entre as colunas.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ display: 'inline-flex', border: '1px solid var(--border-color)', borderRadius: 10, overflow: 'hidden' }}>
            {(['kanban', 'lista'] as const).map((v) => (
              <button key={v} onClick={() => setView(v)}
                style={{ padding: '7px 12px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.82rem', background: view === v ? 'var(--primary)' : 'transparent', color: view === v ? 'var(--primary-contrast, #12250f)' : 'var(--text-muted)' }}>
                <i className={`fa-solid ${v === 'kanban' ? 'fa-table-columns' : 'fa-list'}`} /> {v === 'kanban' ? 'Kanban' : 'Lista'}
              </button>
            ))}
          </div>
          <button className="btn-secondary" onClick={() => { const d = density === 'full' ? 'compact' : 'full'; setDensity(d); localStr('crm_density', d); }} title="Densidade dos cards">
            <i className={`fa-solid ${density === 'full' ? 'fa-compress' : 'fa-expand'}`} /> {density === 'full' ? 'Compacto' : 'Largo'}
          </button>
          <button className="btn-secondary" onClick={() => setTagMgrOpen(true)}><i className="fa-solid fa-tags" /> Tags</button>
          <button className="btn-secondary" onClick={() => setVerArquivados((s) => !s)}
            style={verArquivados ? { background: '#64748b', color: '#fff', borderColor: '#64748b' } : undefined}>
            <i className="fa-solid fa-box-archive" /> {verArquivados ? 'Ver ativos' : `Arquivados (${arquivados.length})`}</button>
          <button className="btn-primary" onClick={() => setAddOpen(true)}><i className="fa-solid fa-plus" /> Adicionar do meu público</button>
        </div>
      </div>

      {view === 'kanban' ? (
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 12, alignItems: 'flex-start' }}>
          {colunas.map((c, idx) => {
            const cards = cardsDe(c.id, idx);
            const isCollapsed = collapsed.has(c.id);
            if (isCollapsed) return (
              <div key={c.id} data-col-drop={c.id} onClick={() => toggleCollapse(c.id)}
                style={{ flexShrink: 0, width: 46, minHeight: 200, background: 'var(--surface, #fff)', border: `1px solid ${hoverCol === c.id ? c.cor : 'var(--border-color)'}`, borderTop: `3px solid ${c.cor}`, borderRadius: 12, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0', gap: 8 }}>
                <span style={{ writingMode: 'vertical-rl', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-main)' }}>{c.nome}</span>
                <span style={{ background: c.cor, color: '#fff', borderRadius: 999, fontSize: '0.7rem', fontWeight: 800, padding: '2px 7px' }}>{cards.length}</span>
              </div>
            );
            return (
              <div key={c.id} data-col-drop={c.id}
                style={{ flexShrink: 0, width: density === 'compact' ? 220 : 280, background: 'var(--surface, #fff)', border: `1px solid ${hoverCol === c.id ? c.cor : 'var(--border-color)'}`, borderTop: `3px solid ${c.cor}`, borderRadius: 12, display: 'flex', flexDirection: 'column', minHeight: 360, maxHeight: 'calc(100vh - 220px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 10px 8px' }}>
                  <span style={{ width: 9, height: 9, borderRadius: 3, background: c.cor, flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.nome}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 700 }}>{cards.length}</span>
                  <ColMenu idx={idx} total={colunas.length} onEdit={() => setEditCol(c)}
                    onLeft={() => moverColuna(idx, -1)} onRight={() => moverColuna(idx, 1)} onCollapse={() => toggleCollapse(c.id)} onDelete={() => excluirColuna(c)} />
                </div>
                <div style={{ padding: '0 8px 8px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  {cards.length === 0 && <p style={{ color: 'var(--text-dim, #94a3b8)', fontSize: '0.8rem', textAlign: 'center', padding: '12px 0' }}>Vazio</p>}
                  {cards.map((l) => (
                    <Card key={l.id} lead={l} density={density} dim={dragId === l.id} tagCor={tagCor}
                      onPointerDown={verArquivados ? undefined : (e) => onCardPointerDown(e, l)}
                      onClick={verArquivados ? () => setDetail(l) : undefined} />
                  ))}
                </div>
              </div>
            );
          })}
          <button onClick={addColuna} title="Nova coluna"
            style={{ flexShrink: 0, width: 46, minHeight: 120, borderRadius: 12, border: '2px dashed var(--border-color)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.1rem' }}>
            <i className="fa-solid fa-plus" />
          </button>
        </div>
      ) : (
        <ListaView leads={verArquivados ? arquivados : noBoard} colunas={colunas} tagCor={tagCor} onOpen={setDetail} />
      )}

      {verArquivados && (
        <p style={{ marginTop: 12, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <i className="fa-solid fa-box-archive" /> Mostrando <strong>arquivados</strong> nas colunas em que estavam. Toque em "Ver ativos" para voltar.
        </p>
      )}

      {/* Ghost de arraste */}
      {draggingLead && (
        <div ref={ghostRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none', width: 240, opacity: 0.9 }}>
          <div style={{ background: 'var(--surface, #fff)', border: '1px solid var(--primary)', borderRadius: 10, padding: 10, boxShadow: '0 12px 30px rgba(0,0,0,0.25)', fontWeight: 700, fontSize: '0.85rem' }}>
            {draggingLead.nome || draggingLead.leadName || leadPhone(draggingLead)}
          </div>
        </div>
      )}

      {addOpen && <AddModal candidatos={foraDoBoard} onAdd={addAoBoard} onClose={() => setAddOpen(false)} />}
      {tagMgrOpen && <TagManager tags={tags} onSave={persistTags} onClose={() => setTagMgrOpen(false)} />}
      {editCol && <EditColumn col={editCol} onSave={(nome, cor) => { saveColEdit(editCol.id, nome, cor); setEditCol(null); }} onClose={() => setEditCol(null)} />}
      {detail && <DetailDrawer lead={detail} colunas={colunas} tags={tags} arquivado={!!detail.crmArquivado}
        onMove={(cid: string) => { moveTo(detail, cid); setDetail((d: any) => ({ ...d, crmColuna: cid })); }}
        onToggleTag={(t: string) => toggleTag(detail, t)} onArquivar={() => arquivar(detail)}
        onRestaurar={() => { desarquivar(detail); setDetail(null); }} onRemover={() => removerDoBoard(detail)} onClose={() => setDetail(null)} />}
    </div>
  );
}

// ── Card ──
function Card({ lead, density, dim, tagCor, onPointerDown, onClick }: { lead: any; density: string; dim: boolean; tagCor: (n: string) => string; onPointerDown?: (e: React.PointerEvent) => void; onClick?: () => void }) {
  const phone = leadPhone(lead);
  const ltags: string[] = Array.isArray(lead.tags) ? lead.tags : [];
  return (
    <div onPointerDown={onPointerDown} onClick={onClick}
      style={{ background: 'var(--bg-color, #f8fafc)', border: '1px solid var(--border-color)', borderRadius: 10, padding: density === 'compact' ? '7px 9px' : '10px 11px', cursor: onPointerDown ? 'grab' : 'pointer', opacity: dim ? 0.35 : 1, touchAction: onPointerDown ? 'none' : 'auto', userSelect: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div className="lead-avatar" style={{ width: 26, height: 26, fontSize: '0.68rem', flexShrink: 0 }}>{(lead.nome?.[0] || lead.leadName?.[0] || 'C').toUpperCase()}</div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: '0.86rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.nome || lead.leadName || phone || 'Cliente'}</div>
          {density === 'full' && <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{phone}</div>}
        </div>
        {lead.origem && density === 'full' && <i className={`fa-solid ${lead.origem === 'vitrine' || lead.origem === 'catalog' ? 'fa-bag-shopping' : 'fa-whatsapp fa-brands'}`} style={{ color: 'var(--text-dim, #94a3b8)', fontSize: '0.75rem' }} title={lead.origem} />}
      </div>
      {ltags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 7 }}>
          {ltags.slice(0, density === 'compact' ? 3 : 6).map((t) => (
            <span key={t} style={{ fontSize: '0.66rem', fontWeight: 700, padding: '1px 7px', borderRadius: 999, background: tagCor(t) + '22', color: tagCor(t), border: `1px solid ${tagCor(t)}55` }}>{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Menu da coluna ──
function ColMenu({ idx, total, onEdit, onLeft, onRight, onCollapse, onDelete }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen((o) => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 2 }}><i className="fa-solid fa-ellipsis-vertical" /></button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
          <div style={{ position: 'absolute', right: 0, top: 22, zIndex: 41, background: 'var(--surface, #fff)', border: '1px solid var(--border-color)', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', padding: 6, minWidth: 170 }}>
            {[
              { i: 'fa-pen', l: 'Editar', f: onEdit },
              { i: 'fa-chevron-left', l: 'Mover ←', f: onLeft, dis: idx === 0 },
              { i: 'fa-chevron-right', l: 'Mover →', f: onRight, dis: idx === total - 1 },
              { i: 'fa-compress', l: 'Recolher', f: onCollapse },
              { i: 'fa-trash', l: 'Excluir', f: onDelete, danger: true },
            ].map((it: any) => (
              <button key={it.l} disabled={it.dis} onClick={() => { setOpen(false); it.f(); }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '7px 9px', borderRadius: 7, cursor: it.dis ? 'not-allowed' : 'pointer', fontSize: '0.83rem', color: it.danger ? '#ef4444' : 'var(--text-main)', opacity: it.dis ? 0.4 : 1 }}>
                <i className={`fa-solid ${it.i}`} style={{ width: 14 }} /> {it.l}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Lista ──
function ListaView({ leads, colunas, tagCor, onOpen }: any) {
  const nomeCol = (id: string) => colunas.find((c: any) => c.id === id)?.nome || '—';
  const corCol = (id: string) => colunas.find((c: any) => c.id === id)?.cor || '#64748b';
  return (
    <div className="card" style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
        <thead><tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
          <th style={{ padding: '8px 10px' }}>Cliente</th><th style={{ padding: '8px 10px' }}>Telefone</th><th style={{ padding: '8px 10px' }}>Coluna</th><th style={{ padding: '8px 10px' }}>Tags</th>
        </tr></thead>
        <tbody>
          {leads.map((l: any) => (
            <tr key={l.id} onClick={() => onOpen(l)} style={{ cursor: 'pointer', borderTop: '1px solid var(--border-color)' }}>
              <td style={{ padding: '8px 10px', fontWeight: 600 }}>{l.nome || l.leadName || '—'}</td>
              <td style={{ padding: '8px 10px', color: 'var(--text-muted)' }}>{leadPhone(l)}</td>
              <td style={{ padding: '8px 10px' }}><span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 9px', borderRadius: 999, background: corCol(l.crmColuna) + '22', color: corCol(l.crmColuna) }}>{nomeCol(l.crmColuna)}</span></td>
              <td style={{ padding: '8px 10px' }}>{(Array.isArray(l.tags) ? l.tags : []).map((t: string) => <span key={t} style={{ fontSize: '0.68rem', fontWeight: 700, padding: '1px 7px', borderRadius: 999, background: tagCor(t) + '22', color: tagCor(t), marginRight: 4 }}>{t}</span>)}</td>
            </tr>
          ))}
          {leads.length === 0 && <tr><td colSpan={4} style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)' }}>Nenhum card no quadro ainda.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

// ── Modal: adicionar do público ──
function AddModal({ candidatos, onAdd, onClose }: { candidatos: any[]; onAdd: (l: any) => void; onClose: () => void }) {
  const [q, setQ] = useState('');
  const [added, setAdded] = useState<Set<string>>(new Set());
  const filtrados = candidatos.filter((l) => { const s = q.trim().toLowerCase(); return !s || (l.nome || '').toLowerCase().includes(s) || leadPhone(l).includes(s.replace(/\D/g, '')); });
  return (
    <Overlay onClose={onClose} title={<><i className="fa-solid fa-user-plus" /> Adicionar ao CRM</>}>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nome ou telefone..." className="config-input" style={{ width: '100%', marginBottom: 12 }} />
      <div style={{ maxHeight: '55vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {filtrados.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 20 }}>Ninguém disponível. Todos os leads já estão no quadro.</p>}
        {filtrados.slice(0, 200).map((l) => {
          const done = added.has(l.id);
          return (
            <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 4px', borderBottom: '1px solid var(--border-color)' }}>
              <div className="lead-avatar" style={{ width: 28, height: 28, fontSize: '0.7rem' }}>{(l.nome?.[0] || 'C').toUpperCase()}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.nome || l.leadName || 'Cliente'}</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{leadPhone(l)} {l.origem ? `· ${l.origem}` : ''}</div>
              </div>
              <button className={done ? 'btn-secondary' : 'btn-primary'} disabled={done} style={{ padding: '5px 12px', fontSize: '0.8rem' }}
                onClick={() => { onAdd(l); setAdded((s) => new Set(s).add(l.id)); }}>
                {done ? <><i className="fa-solid fa-check" /> Adicionado</> : 'Adicionar'}
              </button>
            </div>
          );
        })}
      </div>
    </Overlay>
  );
}

// ── Gerenciador de tags ──
function TagManager({ tags, onSave, onClose }: { tags: CrmTag[]; onSave: (t: CrmTag[]) => void; onClose: () => void }) {
  const [list, setList] = useState<CrmTag[]>(tags);
  const [nome, setNome] = useState('');
  const [cor, setCor] = useState(CORES[0]);
  const add = () => { const n = nome.trim(); if (!n) return; if (list.some((t) => t.nome.toLowerCase() === n.toLowerCase())) { toast.warning('Tag já existe.'); return; } const next = [...list, { nome: n, cor }]; setList(next); setNome(''); onSave(next); };
  const remove = (n: string) => { const next = list.filter((t) => t.nome !== n); setList(next); onSave(next); };
  return (
    <Overlay onClose={onClose} title={<><i className="fa-solid fa-tags" /> Tags</>}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
        <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome da tag" className="config-input" style={{ flex: 1, minWidth: 120 }} onKeyDown={(e) => e.key === 'Enter' && add()} />
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {CORES.map((c) => <button key={c} onClick={() => setCor(c)} style={{ width: 22, height: 22, borderRadius: 6, background: c, border: cor === c ? '2px solid var(--text-main)' : '2px solid transparent', cursor: 'pointer' }} />)}
        </div>
        <button className="btn-primary" onClick={add}>Criar</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {list.length === 0 && <p style={{ color: 'var(--text-muted)' }}>Nenhuma tag ainda.</p>}
        {list.map((t) => (
          <span key={t.nome} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: t.cor + '22', color: t.cor, border: `1px solid ${t.cor}55` }}>
            {t.nome}
            <button onClick={() => remove(t.nome)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.cor, padding: 0 }}><i className="fa-solid fa-xmark" /></button>
          </span>
        ))}
      </div>
    </Overlay>
  );
}

// ── Detalhe do card ──
function DetailDrawer({ lead, colunas, tags, arquivado, onMove, onToggleTag, onArquivar, onRestaurar, onRemover, onClose }: any) {
  const phone = leadPhone(lead);
  const ltags: string[] = Array.isArray(lead.tags) ? lead.tags : [];
  return (
    <Overlay onClose={onClose} title={lead.nome || lead.leadName || 'Cliente'}>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 12 }}>
        <i className="fa-brands fa-whatsapp" style={{ color: '#25d366' }} /> {phone || '—'} {lead.origem ? `· origem: ${lead.origem}` : ''}
      </div>
      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Coluna</label>
      <select value={lead.crmColuna || ''} onChange={(e) => onMove(e.target.value)} className="config-input" style={{ width: '100%', margin: '4px 0 14px' }}>
        {colunas.map((c: CrmColuna) => <option key={c.id} value={c.id}>{c.nome}</option>)}
      </select>
      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tags</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '6px 0 16px' }}>
        {tags.length === 0 && <span style={{ fontSize: '0.8rem', color: 'var(--text-dim,#94a3b8)' }}>Crie tags no botão "Tags".</span>}
        {tags.map((t: CrmTag) => { const on = ltags.includes(t.nome); return (
          <button key={t.nome} onClick={() => onToggleTag(t.nome)}
            style={{ fontSize: '0.76rem', fontWeight: 700, padding: '4px 10px', borderRadius: 999, cursor: 'pointer', background: on ? t.cor : t.cor + '18', color: on ? '#fff' : t.cor, border: `1px solid ${t.cor}${on ? '' : '55'}` }}>
            {on && <i className="fa-solid fa-check" style={{ marginRight: 4 }} />}{t.nome}
          </button>
        ); })}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {phone && <a className="btn-secondary" href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}><i className="fa-brands fa-whatsapp" /> WhatsApp</a>}
        {arquivado
          ? <button className="btn-primary" onClick={onRestaurar}><i className="fa-solid fa-rotate-left" /> Restaurar</button>
          : <button className="btn-secondary" onClick={onArquivar}><i className="fa-solid fa-box-archive" /> Arquivar</button>}
        <button className="btn-secondary" style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.35)' }} onClick={onRemover}><i className="fa-solid fa-xmark" /> Tirar do CRM</button>
      </div>
    </Overlay>
  );
}

// ── Editar coluna (nome + cor num popup só) ──
function EditColumn({ col, onSave, onClose }: { col: CrmColuna; onSave: (nome: string, cor: string) => void; onClose: () => void }) {
  const [nome, setNome] = useState(col.nome);
  const [cor, setCor] = useState(col.cor);
  return (
    <Overlay onClose={onClose} title={<><i className="fa-solid fa-pen" /> Editar coluna</>}>
      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Nome</label>
      <input value={nome} onChange={(e) => setNome(e.target.value)} className="config-input" style={{ width: '100%', margin: '4px 0 16px' }} autoFocus onKeyDown={(e) => e.key === 'Enter' && nome.trim() && onSave(nome, cor)} />
      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Cor</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '8px 0 20px' }}>
        {CORES.map((c) => (
          <button key={c} onClick={() => setCor(c)} title={c}
            style={{ width: 32, height: 32, borderRadius: 8, background: c, border: cor === c ? '3px solid var(--text-main)' : '3px solid transparent', cursor: 'pointer' }}>
            {cor === c && <i className="fa-solid fa-check" style={{ color: '#fff', fontSize: '0.8rem' }} />}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <button className="btn-secondary" onClick={onClose}>Cancelar</button>
        <button className="btn-primary" disabled={!nome.trim()} onClick={() => onSave(nome, cor)}><i className="fa-solid fa-check" /> Salvar</button>
      </div>
    </Overlay>
  );
}

// ── Overlay genérico ──
function Overlay({ title, children, onClose }: { title: React.ReactNode; children: React.ReactNode; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', zIndex: 11000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--surface, #fff)', color: 'var(--text-main)', borderRadius: 16, maxWidth: 480, width: '100%', maxHeight: '88vh', overflowY: 'auto', padding: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', color: 'var(--text-muted)' }}>&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
}
