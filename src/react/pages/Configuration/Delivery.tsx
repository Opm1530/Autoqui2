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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: 16, marginBottom: 16, alignItems: 'end' }}>
        <div><label className="config-label">Bairro(s)</label><input type="text" value={bairroNomes} onChange={(e) => setBairroNomes(e.target.value)} className="config-input" placeholder="Ex: Centro, Jardim Floral" /></div>
        <div><label className="config-label">Valor (R$)</label><input type="number" value={bairroPreco} onChange={(e) => setBairroPreco(e.target.value)} className="config-input" placeholder="0.00" min="0" step="0.01" /></div>
      </div>
      <div style={{ textAlign: 'right', marginBottom: 12 }}><button className="btn-save-msg" onClick={addBairro}><i className="fa-solid fa-plus" /> Adicionar Bairro</button></div>
      <div>
        {bairros.length === 0 ? <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Nenhum bairro com entrega configurado.</p>
          : bairros.map((b, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(23, 37, 28, 0.03)', border: '1px solid var(--border-color)', borderRadius: 8, marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                <span style={{ fontWeight: 600 }}>{b.bairros}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700 }}>R$ {Number(b.preco).toFixed(2)}</span>
              </div>
              <button onClick={() => deleteBairro(idx)} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}><i className="fa-solid fa-trash" /></button>
            </div>
          ))}
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
