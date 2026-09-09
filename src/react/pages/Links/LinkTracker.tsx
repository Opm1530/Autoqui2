import { useEffect, useMemo, useState } from 'react';
import { linkTrackerApi, type TrackedLink, type TrackedLinksResult } from '../../../services/linkTrackerApi';
import { toast } from '../../../services/toast';
import { dbService } from '../../../services/db';
import { SHORT_LINK_HOST } from '../../../services/api';
import { useAuth } from '../../useAuth';
import { SkeletonCards } from '../../components/Skeleton';

const fmtInt = (n: number) => new Intl.NumberFormat('pt-BR').format(Math.round(n || 0));

function StatCard({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="stats-card card">
      <div className="stats-info"><span className="label">{label}</span><br /><span className="value" style={color ? { color } : undefined}>{value}</span></div>
    </div>
  );
}

// Mini gráfico de barras (14 dias).
function Spark({ serie }: { serie: { dia: string; n: number }[] }) {
  const max = Math.max(1, ...serie.map((s) => s.n));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 34 }}>
      {serie.map((s, i) => (
        <div key={i} title={`${s.dia}: ${s.n} cliques`} style={{ flex: 1, height: `${(s.n / max) * 100}%`, minHeight: s.n ? 3 : 1, background: s.n ? 'var(--primary)' : 'var(--border-color)', borderRadius: 2 }} />
      ))}
    </div>
  );
}

export function LinkTracker() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const [data, setData] = useState<TrackedLinksResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<TrackedLink | 'new' | null>(null);
  const [subHost, setSubHost] = useState('');

  const load = () => { setLoading(true); linkTrackerApi.list().then(setData).catch(() => toast.error('Erro ao carregar')).finally(() => setLoading(false)); };
  useEffect(load, []);

  // Base do link curto: subdomínio da empresa (loja ou landing FarmaQui), senão o domínio do painel.
  useEffect(() => {
    if (!companyId) return;
    dbService.get('companies', companyId).then((c: any) => {
      const host = (c?.stores || []).find((s: any) => s.subdominio)?.subdominio || c?.farmaqui?.landing?.host || '';
      setSubHost(host);
    }).catch(() => {});
  }, [companyId]);

  // Domínio curto dedicado (se configurado) → link mais curto e sem /r/.
  const useShort = !!SHORT_LINK_HOST;
  const base = useMemo(() => useShort ? `https://${SHORT_LINK_HOST}` : (subHost ? `https://${subHost}` : window.location.origin), [subHost, useShort]);
  const prefix = useShort ? '' : '/r';
  const shortUrl = (code: string) => `${base}${prefix}/${code}`;

  const copiar = (code: string) => navigator.clipboard?.writeText(shortUrl(code)).then(() => toast.success('Link copiado!'));
  const toggle = async (l: TrackedLink) => { try { await linkTrackerApi.update(l.codigo, { ativo: !l.ativo }); load(); } catch { toast.error('Erro'); } };
  const remover = async (l: TrackedLink) => { if (!window.confirm(`Remover o link "${l.nome}"? As estatísticas serão perdidas.`)) return; try { await linkTrackerApi.remove(l.codigo); toast.success('Removido'); load(); } catch { toast.error('Erro'); } };

  if (loading) return <SkeletonCards count={3} minWidth={220} lines={2} />;

  const links = data?.links || [];
  const t = data?.totais || { cliques: 0, unicos: 0, conversoes: 0 };
  const taxa = t.cliques > 0 ? Math.round((t.conversoes / t.cliques) * 1000) / 10 : 0;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: '1rem' }}>
        <div>
          <h2 style={{ margin: 0 }}><i className="fa-solid fa-link" style={{ color: 'var(--primary)', marginRight: 10 }} />Rastreador de Links</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Crie links por canal (Instagram, panfleto, status…) e veja de onde vêm cliques e pedidos.</p>
        </div>
        <button className="btn-primary" onClick={() => setModal('new')}><i className="fa-solid fa-plus" /> Novo link</button>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '1.25rem' }}>
        <StatCard label="Cliques totais" value={fmtInt(t.cliques)} />
        <StatCard label="Visitantes únicos" value={fmtInt(t.unicos)} />
        <StatCard label="Conversões (pedidos)" value={fmtInt(t.conversoes)} color="var(--success)" />
        <StatCard label="Taxa de conversão" value={`${taxa}%`} />
      </div>

      {links.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
          <i className="fa-solid fa-link" style={{ fontSize: '2rem', opacity: 0.4 }} /><br /><br />
          Nenhum link rastreado ainda. Crie o primeiro para saber de onde vêm seus leads.
        </div>
      ) : (
        <div className="table-wrap card" style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ width: '100%' }}>
            <thead><tr>
              <th>Link</th><th>Destino</th><th style={{ textAlign: 'center' }}>Cliques</th><th style={{ textAlign: 'center' }}>Únicos</th><th style={{ textAlign: 'center' }}>Conversões</th><th>Últimos 14 dias</th><th></th>
            </tr></thead>
            <tbody>
              {links.map((l) => (
                <tr key={l.codigo} style={{ opacity: l.ativo ? 1 : 0.5 }}>
                  <td>
                    <strong>{l.nome}</strong>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      <code style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{base.replace(/^https?:\/\//, '')}{prefix}/{l.codigo}</code>
                      <button title="Copiar link" onClick={() => copiar(l.codigo)} className="btn-icon" style={{ padding: '2px 6px', fontSize: '0.75rem' }}><i className="fa-solid fa-copy" /></button>
                    </div>
                  </td>
                  <td style={{ maxWidth: 220 }}><span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.82rem', color: 'var(--text-muted)' }}>{l.destino}</span></td>
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>{fmtInt(l.cliques)}</td>
                  <td style={{ textAlign: 'center' }}>{fmtInt(l.cliquesUnicos)}</td>
                  <td style={{ textAlign: 'center', fontWeight: 700, color: l.conversoes ? 'var(--success)' : undefined }}>{fmtInt(l.conversoes)}</td>
                  <td style={{ minWidth: 120 }}><Spark serie={l.serie} /></td>
                  <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>
                    <button title={l.ativo ? 'Desativar' : 'Ativar'} className="btn-icon" onClick={() => toggle(l)}><i className={`fa-solid ${l.ativo ? 'fa-toggle-on' : 'fa-toggle-off'}`} /></button>
                    <button title="Editar" className="btn-icon" onClick={() => setModal(l)}><i className="fa-solid fa-pen" /></button>
                    <button title="Remover" className="btn-icon" onClick={() => remover(l)} style={{ color: 'var(--danger)' }}><i className="fa-solid fa-trash" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && <LinkModal editing={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSaved={() => { setModal(null); load(); }} />}
    </div>
  );
}

function LinkModal({ editing, onClose, onSaved }: { editing: TrackedLink | null; onClose: () => void; onSaved: () => void }) {
  const [nome, setNome] = useState(editing?.nome || '');
  const [destino, setDestino] = useState(editing?.destino || '');
  const [origem, setOrigem] = useState(editing?.origem || '');
  const [saving, setSaving] = useState(false);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) { toast.warning('Dê um nome ao link (ex.: Instagram bio).'); return; }
    if (!destino.trim()) { toast.warning('Informe o destino (URL).'); return; }
    setSaving(true);
    try {
      if (editing) await linkTrackerApi.update(editing.codigo, { nome, destino, origem: origem || nome });
      else await linkTrackerApi.create({ nome, destino, origem: origem || nome });
      toast.success(editing ? 'Link atualizado!' : 'Link criado!');
      onSaved();
    } catch (err: any) { toast.error('Erro: ' + (err.message || err)); setSaving(false); }
  }

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content glass">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h2>{editing ? 'Editar link' : 'Novo link rastreado'}</h2>
        <form onSubmit={salvar}>
          <div className="form-group"><label>Nome / canal</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: Instagram bio, Panfleto, Status WhatsApp" required />
          </div>
          <div className="form-group"><label>Destino (para onde leva)</label>
            <input type="text" value={destino} onChange={(e) => setDestino(e.target.value)} placeholder="https://... (seu catálogo, site, WhatsApp, etc.)" required />
          </div>
          <div className="form-group"><label>Etiqueta de origem <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(opcional)</span></label>
            <input type="text" value={origem} onChange={(e) => setOrigem(e.target.value)} placeholder={nome || 'como aparece nos leads/pedidos'} />
            <small style={{ color: 'var(--text-muted)' }}>É o que fica gravado no pedido/lead que vier deste link. Se vazio, usa o nome.</small>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: '1rem' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} disabled={saving}>{saving ? <i className="fa-solid fa-spinner fa-spin" /> : (editing ? 'Salvar' : 'Criar link')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
