import { useState } from 'react';
import { toast } from '../../../services/toast';
import { notifications } from '../../../services/notifications';
import { SaveButton } from './SaveButton';

interface Props {
  config: any;
  vitrine?: boolean;
  onSave: (payload: any) => Promise<void>;
}

export function Payment({ config, vitrine = false, onSave }: Props) {
  const design = config?.design || {};
  const [whatsapp, setWhatsapp] = useState(design.whatsapp || '');
  const [pixKey, setPixKey] = useState(design.pixKey || '');
  const [mpActive, setMpActive] = useState(config?.mercadoPagoActive !== false);

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
    await onSave({ design: newDesign, mercadoPagoActive: mpActive });
    toast.success('Configurações de pagamento salvas!');
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
        <p className="cat-field-hint">{vitrine
          ? 'É para onde vão os pedidos da vitrine ("Pedir no WhatsApp").'
          : 'Número que recebe os pedidos e o "Falar conosco" do catálogo. Informe só o DDD + 9 dígitos (sem o 55). Se deixar vazio, usamos o número da instância vinculada à loja.'}</p>
      </div>
      {!vitrine && <>
      <div className="cat-field">
        <label className="config-label">Chave PIX (Manual)</label>
        <input type="text" value={pixKey} onChange={(e) => setPixKey(e.target.value)} className="config-input" placeholder="CPF, e-mail, telefone ou chave aleatória" />
        <p className="cat-field-hint">Exibida ao cliente ao escolher pagar via PIX manual.</p>
      </div>

      {/* Toggle Mercado Pago */}
      <ToggleRow icon="fa-credit-card" title="Mercado Pago (PIX Automático)" desc="Ativar ou desativar pagamentos via Mercado Pago." checked={mpActive} onChange={setMpActive} />

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
