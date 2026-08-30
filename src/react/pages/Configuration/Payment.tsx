import { useState } from 'react';
import { toast } from '../../../services/toast';
import { notifications } from '../../../services/notifications';
import { SaveButton } from './SaveButton';

interface Props {
  config: any;
  hasMercadoPago: boolean;
  vitrine?: boolean;
  onSave: (payload: any) => Promise<void>;
}

export function Payment({ config, hasMercadoPago, vitrine = false, onSave }: Props) {
  const design = config?.design || {};
  const [whatsapp, setWhatsapp] = useState(design.whatsapp || '');
  const [pixKey, setPixKey] = useState(design.pixKey || '');
  const [mpActive, setMpActive] = useState(config?.mercadoPagoActive !== false);
  const [pickupPay, setPickupPay] = useState(!!config?.pagamentoObrigatorioRetirada);
  const [disableDelivery, setDisableDelivery] = useState(!!config?.desativarPagamentoEntrega);

  const [taxaGenerica, setTaxaGenerica] = useState(config?.taxaGenerica != null ? String(config.taxaGenerica) : '');
  const [bairroNomes, setBairroNomes] = useState('');
  const [bairroPreco, setBairroPreco] = useState('');
  const bairros: any[] = config?.bairrosEntrega || [];

  const [cupomCode, setCupomCode] = useState('');
  const [cupomValor, setCupomValor] = useState('');
  const [cupomTipo, setCupomTipo] = useState('percent');
  const [cupomMin, setCupomMin] = useState('');
  const cupons: any[] = config?.cupons || [];

  async function savePagamento() {
    let wpp = whatsapp.replace(/\D/g, '');
    if (wpp.length === 13 && wpp.startsWith('55')) wpp = wpp.substring(2);
    if (wpp && wpp.length !== 11) { notifications.showPhoneError(); throw new Error('phone'); }
    // Na vitrine só interessa o WhatsApp de contato.
    if (vitrine) {
      await onSave({ design: { ...design, whatsapp: wpp } });
      toast.success('Contato salvo!');
      return;
    }
    const newDesign = { ...design, whatsapp: wpp, pixKey: pixKey.trim() };
    delete newDesign.taxaFixaNome; delete newDesign.taxaFixaValor; delete newDesign.taxaTipo;
    await onSave({ design: newDesign, mercadoPagoActive: mpActive, pagamentoObrigatorioRetirada: pickupPay, desativarPagamentoEntrega: disableDelivery });
    toast.success('Configurações de pagamento salvas!');
  }

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

  async function addCupom() {
    const code = cupomCode.trim().toUpperCase();
    const valor = parseFloat(cupomValor || '0');
    if (!code || !valor) { toast.error('Preencha código e valor do cupom.'); return; }
    await onSave({ cupons: [...cupons, { codigo: code, desconto: valor, tipo: cupomTipo, valorMinimo: parseFloat(cupomMin || '0') || 0, ativo: true }] });
    setCupomCode(''); setCupomValor(''); setCupomMin('');
    toast.success(`Cupom ${code} adicionado!`);
  }
  async function deleteCupom(idx: number) {
    await onSave({ cupons: cupons.filter((_, i) => i !== idx) });
    toast.success('Cupom removido.');
  }

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <div className="config-section-title">{vitrine ? <><i className="fa-brands fa-whatsapp" style={{ color: '#25d366' }} /> Contato</> : <><i className="fa-solid fa-credit-card" style={{ color: 'var(--primary)' }} /> Pagamento</>}</div>

      {/* Explica as duas formas de receber por PIX */}
      {!vitrine && <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginBottom: '1.25rem' }}>
          <div style={{ padding: 14, borderRadius: 10, background: 'rgba(132, 204, 22,0.06)', border: '1px solid rgba(132, 204, 22,0.25)' }}>
            <p style={{ margin: '0 0 4px', fontWeight: 700, fontSize: '0.9rem' }}><i className="fa-solid fa-key" style={{ color: '#a3e635', marginRight: 6 }} />PIX manual (chave própria)</p>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>Preencha sua <strong>chave PIX</strong> abaixo. O cliente paga direto pra você e anexa o comprovante — você confirma o pagamento na mão. Sem taxa, sem Mercado Pago.</p>
          </div>
          <div style={{ padding: 14, borderRadius: 10, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.25)' }}>
            <p style={{ margin: '0 0 4px', fontWeight: 700, fontSize: '0.9rem' }}><i className="fa-solid fa-bolt" style={{ color: '#34d399', marginRight: 6 }} />PIX automático (Mercado Pago)</p>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>O sistema gera o PIX e <strong>confirma o pagamento sozinho</strong>. Requer conectar sua conta Mercado Pago. Ideal pra quem tem muito volume.</p>
          </div>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', margin: '0 0 1.25rem' }}>Você pode usar as duas ao mesmo tempo — o cliente escolhe no catálogo. Para receber por PIX, basta <strong>uma</strong> delas configurada.</p>
      </>}

      <div className="cat-field">
        <label className="config-label">WhatsApp {vitrine ? 'de Contato' : 'de Atendimento'} (DDD + 9 dígitos)</label>
        <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="config-input" placeholder="Ex: 11999999999" maxLength={11} />
        <p className="cat-field-hint">{vitrine ? 'É para onde vão os pedidos da vitrine ("Pedir no WhatsApp").' : 'Informe apenas o DDD e os 9 dígitos do número (não inclua o 55).'}</p>
      </div>
      {!vitrine && <>
      <div className="cat-field">
        <label className="config-label">Chave PIX (Manual)</label>
        <input type="text" value={pixKey} onChange={(e) => setPixKey(e.target.value)} className="config-input" placeholder="CPF, e-mail, telefone ou chave aleatória" />
        <p className="cat-field-hint">Exibida ao cliente ao escolher pagar via PIX manual.</p>
      </div>

      {/* Taxas por bairro */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginBottom: '1.25rem' }}>
        <p style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: 8 }}><i className="fa-solid fa-truck" style={{ color: 'var(--primary)' }} /> Taxas de Entrega por Bairro</p>
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
      </div>

      {/* Toggles */}
      <ToggleRow icon="fa-credit-card" title="Mercado Pago (PIX Automático)" desc="Ativar ou desativar pagamentos via Mercado Pago." checked={mpActive} onChange={setMpActive} />
      <ToggleRow icon="fa-store" title="Pagamento Antecipado (Retirada)" desc="Obrigar pagamento adiantado para pedidos de retirada." checked={pickupPay} onChange={setPickupPay} />
      <ToggleRow icon="fa-ban" title="Desativar Pagamento na Entrega" desc="Remove a opção de pagar no momento da entrega." checked={disableDelivery} onChange={setDisableDelivery} />

      {/* Cupons */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: 8 }}><i className="fa-solid fa-tag" style={{ color: 'var(--primary)' }} /> Cupons de Desconto</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16, alignItems: 'end' }}>
          <div><label className="config-label">Código do Cupom</label><input type="text" value={cupomCode} onChange={(e) => setCupomCode(e.target.value)} className="config-input" style={{ textTransform: 'uppercase' }} placeholder="EX: DESCONTO10" /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: 8 }}>
            <div><label className="config-label">Desconto</label><input type="number" value={cupomValor} onChange={(e) => setCupomValor(e.target.value)} className="config-input" placeholder="10" min="0" step="0.01" /></div>
            <div><label className="config-label">Tipo</label><select value={cupomTipo} onChange={(e) => setCupomTipo(e.target.value)} className="config-select" style={{ height: 44 }}><option value="percent">%</option><option value="fixo">R$</option></select></div>
          </div>
          <div><label className="config-label">Gasto Mínimo (R$)</label><input type="number" value={cupomMin} onChange={(e) => setCupomMin(e.target.value)} className="config-input" placeholder="0.00" min="0" step="0.01" /></div>
        </div>
        <div style={{ textAlign: 'right', marginBottom: 12 }}><button className="btn-save-msg" onClick={addCupom}><i className="fa-solid fa-plus" /> Adicionar Cupom</button></div>
        <div>
          {cupons.length === 0 ? <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Nenhum cupom cadastrado ainda.</p>
            : cupons.map((c, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(23, 37, 28, 0.03)', border: '1px solid var(--border-color)', borderRadius: 8, marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--primary)' }}>{c.codigo}</span>
                  <span className={`badge ${c.ativo !== false ? 'success' : 'warning'}`}>{c.ativo !== false ? 'Ativo' : 'Inativo'}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.tipo === 'percent' ? c.desconto + '%' : 'R$ ' + Number(c.desconto).toFixed(2)} de desconto</span>
                  {c.valorMinimo > 0 && <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', background: 'rgba(23, 37, 28, 0.05)', padding: '2px 6px', borderRadius: 4 }}>Min: R$ {Number(c.valorMinimo).toFixed(2)}</span>}
                </div>
                <button onClick={() => deleteCupom(idx)} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}><i className="fa-solid fa-trash" /></button>
              </div>
            ))}
        </div>
      </div>

      {/* Status MP */}
      <div style={{ padding: 14, borderRadius: 'var(--radius-md)', background: hasMercadoPago ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${hasMercadoPago ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`, display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
        <i className={`fa-solid ${hasMercadoPago ? 'fa-circle-check' : 'fa-circle-xmark'}`} style={{ color: hasMercadoPago ? '#10b981' : '#ef4444', fontSize: '1.2rem' }} />
        <div>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>Mercado Pago</p>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {hasMercadoPago ? 'Integração ativa — PIX via Mercado Pago disponível no catálogo.' : <>Não configurado. <a href="/mercado-pago" style={{ color: 'var(--primary)' }}>Configurar agora →</a></>}
          </p>
        </div>
      </div>
      </>}

      <div style={{ textAlign: 'right' }}><SaveButton label={vitrine ? 'Salvar Contato' : 'Salvar Pagamento'} onSave={savePagamento} /></div>
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
