import { useEffect, useState } from 'react';
import { couponApi, type Coupon } from '../../../services/couponApi';
import { toast } from '../../../services/toast';
import { confirm } from '../../../services/confirm';
import { SkeletonTable } from '../../components/Skeleton';

const vazio = (): Coupon => ({ codigo: '', tipo: 'percent', valor: 10, duracaoMeses: null, validade: null, limiteUsos: null, ativo: true });
const descDuracao = (m: number | null) => (m == null ? 'Para sempre' : m === 1 ? '1 mês' : `${m} meses`);

export function Coupons() {
  const [list, setList] = useState<Coupon[] | null>(null);
  const [edit, setEdit] = useState<Coupon | null>(null);

  const load = () => couponApi.list().then(setList).catch(() => setList([]));
  useEffect(() => { load(); }, []);

  async function remover(c: Coupon) {
    if (!(await confirm.danger('Excluir cupom', `Excluir o cupom "${c.codigo}"?`))) return;
    try { await couponApi.remove(c.id!); toast.success('Cupom excluído.'); load(); } catch (e: any) { toast.error('Erro: ' + (e.message || e)); }
  }

  if (list === null) return <SkeletonTable rows={4} />;

  return (
    <div style={{ maxWidth: 900 }}>
      <div className="page-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
        <div><h1>Cupons</h1><p>Códigos de desconto na mensalidade. O cliente digita no cadastro.</p></div>
        <button className="btn-primary" onClick={() => setEdit(vazio())}><i className="fa-solid fa-plus" /> Novo cupom</button>
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead><tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
            <th style={{ padding: '8px 10px' }}>Código</th><th style={{ padding: '8px 10px' }}>Desconto</th><th style={{ padding: '8px 10px' }}>Duração</th><th style={{ padding: '8px 10px' }}>Usos</th><th style={{ padding: '8px 10px' }}>Status</th><th></th>
          </tr></thead>
          <tbody>
            {list.length === 0 && <tr><td colSpan={6} style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)' }}>Nenhum cupom ainda.</td></tr>}
            {list.map((c) => (
              <tr key={c.id} style={{ borderTop: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 10px', fontWeight: 700, fontFamily: 'monospace' }}>{c.codigo}</td>
                <td style={{ padding: '8px 10px' }}>{c.tipo === 'percent' ? `${c.valor}%` : `R$ ${c.valor.toFixed(2)}`}</td>
                <td style={{ padding: '8px 10px' }}>{descDuracao(c.duracaoMeses)}</td>
                <td style={{ padding: '8px 10px' }}>{c.usados || 0}{c.limiteUsos != null ? ` / ${c.limiteUsos}` : ''}</td>
                <td style={{ padding: '8px 10px' }}><span className="badge" style={{ background: c.ativo ? 'rgba(16,185,129,0.15)' : 'rgba(148,163,184,0.15)', color: c.ativo ? '#34d399' : '#94a3b8' }}>{c.ativo ? 'Ativo' : 'Inativo'}</span></td>
                <td style={{ padding: '8px 10px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <button className="btn-secondary" style={{ padding: '4px 10px', marginRight: 6 }} onClick={() => setEdit(c)}><i className="fa-solid fa-pen" /></button>
                  <button className="btn-secondary" style={{ padding: '4px 10px', color: '#ef4444' }} onClick={() => remover(c)}><i className="fa-solid fa-trash" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {edit && <CouponModal coupon={edit} onClose={() => setEdit(null)} onSaved={() => { setEdit(null); load(); }} />}
    </div>
  );
}

function CouponModal({ coupon, onClose, onSaved }: { coupon: Coupon; onClose: () => void; onSaved: () => void }) {
  const [c, setC] = useState<Coupon>({ ...coupon });
  const [saving, setSaving] = useState(false);
  const [dur, setDur] = useState<'sempre' | 'meses'>(coupon.duracaoMeses == null ? 'sempre' : 'meses');
  const set = (k: keyof Coupon, v: any) => setC((x) => ({ ...x, [k]: v }));

  async function salvar() {
    if (!c.codigo.trim()) { toast.warning('Informe o código.'); return; }
    setSaving(true);
    try {
      await couponApi.save({ ...c, duracaoMeses: dur === 'sempre' ? null : (c.duracaoMeses || 1) });
      toast.success('Cupom salvo!'); onSaved();
    } catch (e: any) { toast.error(e.message === 'codigo_ja_existe' ? 'Já existe um cupom com esse código.' : 'Erro: ' + (e.message || e)); setSaving(false); }
  }

  const lbl: React.CSSProperties = { display: 'block', marginBottom: 6, fontWeight: 600, fontSize: '0.85rem' };
  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content glass" style={{ maxWidth: 460 }}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h2>{coupon.id ? 'Editar cupom' : 'Novo cupom'}</h2>
        <div className="form-group"><label style={lbl}>Código</label><input value={c.codigo} onChange={(e) => set('codigo', e.target.value.toUpperCase())} placeholder="BEMVINDO20" style={{ textTransform: 'uppercase' }} /></div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div className="form-group" style={{ flex: 1 }}><label style={lbl}>Tipo</label>
            <select value={c.tipo} onChange={(e) => set('tipo', e.target.value)}><option value="percent">Percentual (%)</option><option value="fixo">Valor fixo (R$)</option></select>
          </div>
          <div className="form-group" style={{ flex: 1 }}><label style={lbl}>{c.tipo === 'percent' ? 'Desconto (%)' : 'Desconto (R$)'}</label>
            <input type="number" min="1" value={c.valor} onChange={(e) => set('valor', Number(e.target.value))} />
          </div>
        </div>
        <div className="form-group"><label style={lbl}>Duração do desconto</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <select value={dur} onChange={(e) => setDur(e.target.value as any)} style={{ flex: 1 }}><option value="sempre">Para sempre</option><option value="meses">Por X meses</option></select>
            {dur === 'meses' && <input type="number" min="1" value={c.duracaoMeses || 1} onChange={(e) => set('duracaoMeses', Number(e.target.value))} style={{ width: 90 }} placeholder="meses" />}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div className="form-group" style={{ flex: 1 }}><label style={lbl}>Validade do código <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(opcional)</span></label>
            <input type="date" value={c.validade ? String(c.validade).slice(0, 10) : ''} onChange={(e) => set('validade', e.target.value || null)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}><label style={lbl}>Limite de usos <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(opcional)</span></label>
            <input type="number" min="1" value={c.limiteUsos ?? ''} onChange={(e) => set('limiteUsos', e.target.value ? Number(e.target.value) : null)} placeholder="ilimitado" />
          </div>
        </div>
        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input id="cup-ativo" type="checkbox" checked={c.ativo} onChange={(e) => set('ativo', e.target.checked)} style={{ width: 'auto' }} />
          <label htmlFor="cup-ativo" style={{ margin: 0 }}>Ativo</label>
        </div>
        <button className="btn-primary full-width" disabled={saving} onClick={salvar}>{saving ? 'Salvando...' : 'Salvar cupom'}</button>
      </div>
    </div>
  );
}
