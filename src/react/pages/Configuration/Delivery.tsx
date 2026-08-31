import { useState } from 'react';
import { toast } from '../../../services/toast';
import { SaveButton } from './SaveButton';

interface Props {
  config: any;
  onSave: (payload: any) => Promise<void>;
}

export function Delivery({ config, onSave }: Props) {
  const [taxaGenerica, setTaxaGenerica] = useState(config?.taxaGenerica != null ? String(config.taxaGenerica) : '');
  const [bairroNomes, setBairroNomes] = useState('');
  const [bairroPreco, setBairroPreco] = useState('');
  const bairros: any[] = config?.bairrosEntrega || [];
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editNomes, setEditNomes] = useState('');
  const [editPreco, setEditPreco] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [pickupPay, setPickupPay] = useState(!!config?.pagamentoObrigatorioRetirada);
  const [disableDelivery, setDisableDelivery] = useState(!!config?.desativarPagamentoEntrega);

  async function saveTaxaGenerica() {
    await onSave({ taxaGenerica: parseFloat(taxaGenerica || '0') });
    toast.success('Taxa genérica salva!');
  }
  async function addBairro() {
    if (!bairroNomes.trim()) { toast.error('Preencha os bairros.'); return; }
    if (!bairroPreco) { toast.error('Preencha o valor da taxa para estes bairros.'); return; }
    await onSave({ bairrosEntrega: [...bairros, { bairros: bairroNomes.trim(), preco: parseFloat(bairroPreco) }] });
    setBairroNomes(''); setBairroPreco('');
    toast.success('Bairro(s) adicionado(s)!');
  }
  async function deleteBairro(idx: number) {
    await onSave({ bairrosEntrega: bairros.filter((_, i) => i !== idx) });
    toast.success('Bairro(s) removido(s).');
  }
  function startEdit(idx: number) {
    setEditIdx(idx);
    setEditNomes(bairros[idx].bairros || '');
    setEditPreco(String(bairros[idx].preco ?? ''));
  }
  async function saveEdit(idx: number) {
    if (!editNomes.trim()) { toast.error('Preencha os bairros.'); return; }
    const next = bairros.map((b, i) => (i === idx ? { bairros: editNomes.trim(), preco: parseFloat(editPreco) || 0 } : b));
    await onSave({ bairrosEntrega: next });
    setEditIdx(null);
    toast.success('Bairro(s) atualizado(s)!');
  }
  async function saveOpcoes() {
    await onSave({ pagamentoObrigatorioRetirada: pickupPay, desativarPagamentoEntrega: disableDelivery });
    toast.success('Opções de entrega salvas!');
  }

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <div className="config-section-title"><i className="fa-solid fa-truck" style={{ color: 'var(--primary)' }} /> Entrega</div>

      {/* Taxas por bairro */}
      <p style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: 8 }}><i className="fa-solid fa-map-location-dot" style={{ color: 'var(--primary)' }} /> Taxas de Entrega por Bairro</p>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: 12 }}>Defina o preço da entrega para cada bairro. Para aplicar o mesmo valor a múltiplos bairros, separe-os por vírgula (Ex: Centro, Vila Nova).</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: 12, marginBottom: 16, padding: 12, background: 'rgba(132, 204, 22,0.05)', border: '1px solid rgba(132, 204, 22,0.2)', borderRadius: 10, alignItems: 'end' }}>
        <div>
          <label className="config-label">Taxa genérica (bairros não listados)</label>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', margin: '0 0 6px' }}>Aplicada quando o cliente informa um bairro que não está na lista.</p>
          <input type="number" value={taxaGenerica} onChange={(e) => setTaxaGenerica(e.target.value)} className="config-input" placeholder="0.00" min="0" step="0.01" />
        </div>
        <div style={{ textAlign: 'right' }}><SaveButton label="Salvar" onSave={saveTaxaGenerica} /></div>
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'end', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 240px' }}><label className="config-label">Bairro(s)</label><input type="text" value={bairroNomes} onChange={(e) => setBairroNomes(e.target.value)} className="config-input" placeholder="Ex: Centro, Jardim Floral" /></div>
        <div style={{ width: 120 }}><label className="config-label">Valor (R$)</label><input type="number" value={bairroPreco} onChange={(e) => setBairroPreco(e.target.value)} className="config-input" placeholder="0.00" min="0" step="0.01" /></div>
        <button className="btn-save-msg" style={{ height: 44 }} onClick={addBairro}><i className="fa-solid fa-plus" /> Adicionar Bairro</button>
      </div>
      <div>
        {bairros.length === 0 ? <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Nenhum bairro com entrega configurado.</p>
          : bairros.map((b, idx) => (editIdx === idx ? (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'rgba(132, 204, 22,0.06)', border: '1px solid rgba(132, 204, 22,0.3)', borderRadius: 8, marginBottom: 6, flexWrap: 'wrap' }}>
              <input type="text" value={editNomes} onChange={(e) => setEditNomes(e.target.value)} className="config-input" style={{ flex: '1 1 220px' }} placeholder="Bairro(s)" />
              <input type="number" value={editPreco} onChange={(e) => setEditPreco(e.target.value)} className="config-input" style={{ width: 110 }} min="0" step="0.01" placeholder="0.00" />
              <button onClick={() => saveEdit(idx)} style={{ background: 'var(--primary)', color: 'var(--primary-contrast)', border: 'none', borderRadius: 6, padding: '8px 12px', cursor: 'pointer', fontWeight: 600 }}><i className="fa-solid fa-check" /></button>
              <button onClick={() => setEditIdx(null)} style={{ background: 'var(--surface-hover)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: 6, padding: '8px 12px', cursor: 'pointer' }}><i className="fa-solid fa-xmark" /></button>
            </div>
          ) : (
            (() => {
              const nomes = (b.bairros || '').split(',').map((s: string) => s.trim()).filter(Boolean);
              const isOpen = openIdx === idx;
              return (
                <div key={idx} style={{ background: 'rgba(23, 37, 28, 0.03)', border: '1px solid var(--border-color)', borderRadius: 8, marginBottom: 6, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '10px 12px', cursor: nomes.length > 1 ? 'pointer' : 'default' }}
                    onClick={() => nomes.length > 1 && setOpenIdx(isOpen ? null : idx)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                      {nomes.length > 1 && <i className={`fa-solid fa-chevron-${isOpen ? 'down' : 'right'}`} style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }} />}
                      <span style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {nomes.length > 1 ? `${nomes.length} bairros` : (nomes[0] || '—')}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, whiteSpace: 'nowrap' }}>R$ {Number(b.preco).toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }} onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => startEdit(idx)} style={{ background: 'rgba(132, 204, 22,0.15)', border: '1px solid rgba(132, 204, 22,0.35)', color: 'var(--primary-hover)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}><i className="fa-solid fa-pen" /></button>
                      <button onClick={() => deleteBairro(idx)} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}><i className="fa-solid fa-trash" /></button>
                    </div>
                  </div>
                  {isOpen && nomes.length > 1 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '0 12px 12px', borderTop: '1px solid var(--border-color)', paddingTop: 10 }}>
                      {nomes.map((n: string, i: number) => (
                        <span key={i} style={{ fontSize: '0.8rem', background: 'var(--surface-hover)', border: '1px solid var(--border-color)', borderRadius: 999, padding: '3px 10px' }}>{n}</span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()
          )))}
      </div>

      {/* Opções de pagamento na entrega/retirada */}
      <ToggleRow icon="fa-store" title="Pagamento Antecipado (Retirada)" desc="Obrigar pagamento adiantado para pedidos de retirada." checked={pickupPay} onChange={setPickupPay} />
      <ToggleRow icon="fa-ban" title="Desativar Pagamento na Entrega" desc="Remove a opção de pagar no momento da entrega." checked={disableDelivery} onChange={setDisableDelivery} />

      <div style={{ textAlign: 'right', marginTop: 4 }}><SaveButton label="Salvar Opções" onSave={saveOpcoes} /></div>
    </div>
  );
}

function ToggleRow({ icon, title, desc, checked, onChange }: { icon: string; title: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div>
          <p style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0 0 0.4rem', display: 'flex', alignItems: 'center', gap: 8 }}><i className={`fa-solid ${icon}`} style={{ color: 'var(--primary)' }} /> {title}</p>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-dim)' }}>{desc}</p>
        </div>
        <label className="cfg-switch">
          <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
          <span className="cfg-slider" />
        </label>
      </div>
    </div>
  );
}
