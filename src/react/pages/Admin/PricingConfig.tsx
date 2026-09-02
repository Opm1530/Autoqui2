import { useEffect, useState } from 'react';
import { pricingApi, CANAIS_FEAT, ADICIONAIS_FEAT } from '../../../services/pricingApi';
import { toast } from '../../../services/toast';
import { SkeletonCards } from '../../components/Skeleton';

export function PricingConfig() {
  const [loading, setLoading] = useState(true);
  const [precos, setPrecos] = useState<Record<string, number>>({});
  const [descontos, setDescontos] = useState<{ min: number; pct: number }[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    pricingApi.get().then((p) => { setPrecos(p.precos || {}); setDescontos(p.descontos || []); }).catch(() => toast.error('Erro ao carregar preços.')).finally(() => setLoading(false));
  }, []);

  const setPreco = (k: string, v: string) => setPrecos((p) => ({ ...p, [k]: Number(v) || 0 }));
  const setDesc = (i: number, field: 'min' | 'pct', v: string) => setDescontos((d) => d.map((x, j) => (j === i ? { ...x, [field]: Number(v) || 0 } : x)));
  const addDesc = () => setDescontos((d) => [...d, { min: (d[d.length - 1]?.min || 1) + 1, pct: 10 }]);
  const rmDesc = (i: number) => setDescontos((d) => d.filter((_, j) => j !== i));

  async function salvar() {
    setSaving(true);
    try { await pricingApi.save(precos, descontos); toast.success('Preços salvos!'); }
    catch (e: any) { toast.error('Erro ao salvar: ' + (e.message || e)); }
    finally { setSaving(false); }
  }

  if (loading) return <SkeletonCards count={2} lines={4} />;

  const linhaPreco = (f: { key: string; label: string; icon: string; desc: string }) => (
    <div key={f.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(132,204,22,0.12)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><i className={`fa-solid ${f.icon}`} /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700 }}>{f.label}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{f.desc}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>R$</span>
        <input type="number" min="0" step="1" value={precos[f.key] ?? 0} onChange={(e) => setPreco(f.key, e.target.value)}
          style={{ width: 100, padding: 8, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-color,#f8fafc)', color: 'var(--text-main)', textAlign: 'right', fontWeight: 700 }} />
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>/mês</span>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 760 }}>
      <div className="page-heading"><h1>Preços das funcionalidades</h1><p>Defina o valor mensal de cada ferramenta. O cadastro monta o preço somando o que o cliente escolher.</p></div>

      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginTop: 0 }}><i className="fa-solid fa-layer-group" style={{ color: 'var(--primary)' }} /> Canal principal <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>(o cliente escolhe 1)</span></h3>
        {CANAIS_FEAT.map(linhaPreco)}
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginTop: 0 }}><i className="fa-solid fa-puzzle-piece" style={{ color: 'var(--primary)' }} /> Adicionais <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>(somam e entram no desconto)</span></h3>
        {ADICIONAIS_FEAT.map(linhaPreco)}
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginTop: 0 }}><i className="fa-solid fa-tags" style={{ color: 'var(--primary)' }} /> Desconto por combo</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 0 }}>Aplicado sobre a soma dos <strong>adicionais</strong>, conforme a quantidade deles. O canal principal não recebe desconto.</p>
        {descontos.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ color: 'var(--text-muted)' }}>A partir de</span>
            <input type="number" min="2" value={d.min} onChange={(e) => setDesc(i, 'min', e.target.value)} style={{ width: 64, padding: 7, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-color,#f8fafc)', color: 'var(--text-main)', textAlign: 'center' }} />
            <span style={{ color: 'var(--text-muted)' }}>adicionais →</span>
            <input type="number" min="0" max="100" value={d.pct} onChange={(e) => setDesc(i, 'pct', e.target.value)} style={{ width: 64, padding: 7, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-color,#f8fafc)', color: 'var(--text-main)', textAlign: 'center' }} />
            <span style={{ color: 'var(--text-muted)' }}>% off</span>
            <button className="btn-secondary" style={{ padding: '4px 10px', color: '#ef4444' }} onClick={() => rmDesc(i)}><i className="fa-solid fa-trash" /></button>
          </div>
        ))}
        <button className="btn-secondary" style={{ marginTop: 4 }} onClick={addDesc}><i className="fa-solid fa-plus" /> Nova faixa</button>
      </div>

      <button className="btn-primary" disabled={saving} onClick={salvar}>{saving ? <><i className="fa-solid fa-spinner fa-spin" /> Salvando...</> : <><i className="fa-solid fa-floppy-disk" /> Salvar preços</>}</button>
    </div>
  );
}
