import { useEffect, useMemo, useRef, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { farmaquiApi } from '../../services/farmaquiApi';
import { toast } from '../../services/toast';
import { useAuth } from '../useAuth';
import { SkeletonCards } from '../components/Skeleton';

const ts = (v: any) => new Date(v || 0).getTime();
const hhmm = (v: any) => { const d = new Date(v || 0); return isNaN(d.getTime()) ? '' : d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); };

// Página de Atendimento (inbox): lista de conversas + thread + envio.
export function Atendimento() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const [leads, setLeads] = useState<any[] | null>(null);
  const [selId, setSelId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!companyId) return;
    const q = query(collection(db, 'leads'), where('empresaId', '==', companyId));
    return onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as any[];
      list.sort((a, b) => ts(b.ultimoContato || b.updatedAt || b.criadoEm) - ts(a.ultimoContato || a.updatedAt || a.criadoEm));
      setLeads(list);
    });
  }, [companyId]);

  const sel = useMemo(() => (leads || []).find((l) => l.id === selId) || null, [leads, selId]);
  const visible = useMemo(() => {
    const t = search.trim().toLowerCase();
    return (leads || []).filter((l) => !t || (l.nome || '').toLowerCase().includes(t) || (l.telefone || '').includes(t));
  }, [leads, search]);

  // rola a thread pro fim quando muda de conversa ou chega mensagem
  useEffect(() => { if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight; }, [sel?.id, sel?.conversa?.length]);

  async function enviar() {
    if (!sel || !text.trim()) return;
    setBusy(true);
    try { await farmaquiApi.sendMessage(sel.id, text.trim()); setText(''); }
    catch (e: any) {
      const m = e.message === 'sem_instancia' ? 'Ative a captura (instância) primeiro.' : e.message === 'falha_envio' ? 'Falha no envio.' : (e.message || e);
      toast.error('Erro: ' + m);
    } finally { setBusy(false); }
  }

  if (leads === null) return <SkeletonCards count={1} lines={6} />;

  return (
    <div>
      <div className="page-heading"><h1>Atendimento</h1><p>Converse com seus clientes pelo WhatsApp direto do painel.</p></div>

      <div className="card" style={{ padding: 0, display: 'flex', height: '68vh', overflow: 'hidden' }}>
        {/* Lista de conversas */}
        <div style={{ width: 320, borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: 10, borderBottom: '1px solid var(--border-color)' }}>
            <input className="config-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar conversa..." />
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {visible.length === 0 ? <p style={{ padding: 16, fontSize: '0.85rem', color: 'var(--text-dim)' }}>Nenhuma conversa.</p>
              : visible.map((l) => {
                const last = Array.isArray(l.conversa) && l.conversa.length ? l.conversa[l.conversa.length - 1] : null;
                const preview = last ? (last.dir === 'out' ? 'Você: ' : '') + String(last.text || '') : (l.ultimaMensagem || '');
                return (
                  <div key={l.id} onClick={() => setSelId(l.id)} style={{ display: 'flex', gap: 10, padding: '10px 12px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)', background: l.id === selId ? 'var(--surface-hover)' : 'transparent' }}>
                    <div className="lead-avatar" style={{ flexShrink: 0 }}>{(l.nome || l.telefone || 'C')[0].toUpperCase()}</div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.nome || (l.telefone || '').split('@')[0]}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', flexShrink: 0 }}>{hhmm(l.ultimoContato || l.updatedAt)}</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{preview || '—'}</div>
                      {l.descadastrado && <span style={{ fontSize: '0.64rem', color: '#dc2626' }}><i className="fa-solid fa-ban" /> descadastrado</span>}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Thread */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {!sel ? (
            <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-dim)' }}>
              <i className="fa-regular fa-comments" style={{ fontSize: '2.5rem', display: 'block', marginBottom: 10 }} />
              Selecione uma conversa
            </div>
          ) : (
            <>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="lead-avatar">{(sel.nome || 'C')[0].toUpperCase()}</div>
                <div>
                  <div style={{ fontWeight: 700 }}>{sel.nome || 'Sem nome'}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{(sel.telefone || '').split('@')[0]}</div>
                </div>
              </div>

              <div ref={threadRef} style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--bg-color)' }}>
                {(!Array.isArray(sel.conversa) || sel.conversa.length === 0) ? (
                  <p style={{ margin: 'auto', color: 'var(--text-dim)', fontSize: '0.85rem' }}>Sem mensagens ainda. Envie a primeira abaixo.</p>
                ) : sel.conversa.map((m: any, i: number) => (
                  <div key={i} style={{ alignSelf: m.dir === 'out' ? 'flex-end' : 'flex-start', maxWidth: '75%', background: m.dir === 'out' ? 'var(--primary)' : 'var(--surface-color)', color: m.dir === 'out' ? 'var(--primary-contrast)' : 'var(--text-main)', border: m.dir === 'out' ? 'none' : '1px solid var(--border-color)', borderRadius: 12, padding: '8px 12px' }}>
                    <div style={{ fontSize: '0.88rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{m.text}</div>
                    <div style={{ fontSize: '0.68rem', opacity: 0.7, textAlign: 'right', marginTop: 2 }}>{hhmm(m.ts)}</div>
                  </div>
                ))}
              </div>

              <div style={{ padding: 12, borderTop: '1px solid var(--border-color)', display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <textarea className="config-input" style={{ flex: 1, minHeight: 44, maxHeight: 120, resize: 'vertical', fontFamily: 'inherit' }} value={text} onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar(); } }} placeholder="Escreva uma mensagem... (Enter envia)" />
                <button className="btn-primary" disabled={busy || !text.trim()} onClick={enviar} style={{ height: 44 }}>{busy ? <i className="fa-solid fa-spinner fa-spin" /> : <i className="fa-solid fa-paper-plane" />}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
