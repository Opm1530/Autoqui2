import { useEffect, useState } from 'react';
import { dbService } from '../../services/db';
import { ecommerceApi } from '../../services/ecommerceApi';
import { toast } from '../../services/toast';
import { useAuth } from '../useAuth';

type Meta = { trigger: string; label: string; desc: string; vars: string[]; defaultMsg: string };

// Automações por EVENTO (webhook) — funcionam assim que a loja recebe o evento.
// Carrinho abandonado / boleto / reengajamento (por cron) chegam na próxima fase.
const AUTOS: Meta[] = [
  { trigger: 'pedido_confirmado', label: 'Pedido confirmado', desc: 'Assim que o cliente finaliza o pedido na loja.', vars: ['nome', 'produtos', 'total', 'numero_pedido', 'loja'], defaultMsg: 'Olá {{nome}}! 🎉 Recebemos seu pedido #{{numero_pedido}}:\n{{produtos}}\nTotal: {{total}}\n\nJá estamos cuidando de tudo. Obrigado por comprar na {{loja}}!' },
  { trigger: 'pagamento_aprovado', label: 'Pagamento aprovado', desc: 'Quando o pagamento é confirmado.', vars: ['nome', 'total', 'numero_pedido', 'loja'], defaultMsg: 'Oba, {{nome}}! ✅ O pagamento do pedido #{{numero_pedido}} foi aprovado. Já vamos preparar seu envio!' },
  { trigger: 'pedido_enviado', label: 'Pedido enviado + rastreio', desc: 'Quando o pedido é despachado (envia o código de rastreio).', vars: ['nome', 'rastreio', 'url_rastreio', 'numero_pedido', 'loja'], defaultMsg: '📦 {{nome}}, seu pedido #{{numero_pedido}} foi enviado!\nRastreio: {{rastreio}}\nAcompanhe: {{url_rastreio}}' },
];

export function EcommerceAutomations() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const [instances, setInstances] = useState<any[]>([]);
  const [state, setState] = useState<Record<string, { enabled: boolean; whatsappInstance: string; messageTemplate: string }>>({});
  const [busy, setBusy] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const [insts, autos] = await Promise.all([
        dbService.getAll('instancias', { field: 'empresaId', operator: '==', value: companyId }).catch(() => []),
        ecommerceApi.automations().catch(() => []),
      ]);
      setInstances(insts as any[]);
      const st: any = {};
      for (const a of AUTOS) {
        const saved = (autos as any[]).find((x) => x.trigger === a.trigger);
        st[a.trigger] = {
          enabled: saved ? saved.enabled !== false : false,
          whatsappInstance: saved?.whatsappInstance || (insts as any[])[0]?.nome || '',
          messageTemplate: saved?.messageTemplate || a.defaultMsg,
        };
      }
      setState(st);
      setLoading(false);
    })();
  }, [companyId]);

  const patch = (trigger: string, p: Partial<{ enabled: boolean; whatsappInstance: string; messageTemplate: string }>) =>
    setState((s) => ({ ...s, [trigger]: { ...s[trigger], ...p } }));

  async function save(a: Meta) {
    const s = state[a.trigger];
    if (s.enabled && !s.whatsappInstance) { toast.warning('Escolha a instância de WhatsApp.'); return; }
    if (s.enabled && !s.messageTemplate.trim()) { toast.warning('Escreva a mensagem.'); return; }
    setBusy(a.trigger);
    try {
      await ecommerceApi.saveAutomation({ trigger: a.trigger, enabled: s.enabled, delayMinutes: 0, messageTemplate: s.messageTemplate, whatsappInstance: s.whatsappInstance });
      toast.success(`Automação "${a.label}" salva!`);
    } catch (e: any) { toast.error('Erro: ' + (e.message || e)); }
    finally { setBusy(''); }
  }

  if (loading) return <p style={{ color: 'var(--text-muted)' }}>Carregando automações...</p>;

  return (
    <div style={{ display: 'grid', gap: '1.25rem' }}>
      {instances.length === 0 && (
        <div className="card" style={{ borderColor: 'rgba(245,158,11,0.4)', background: 'rgba(245,158,11,0.06)' }}>
          <p style={{ margin: 0, fontSize: '0.9rem' }}><i className="fa-solid fa-triangle-exclamation" style={{ color: '#fbbf24' }} /> Você ainda não tem uma instância de WhatsApp conectada. Conecte uma em <strong>Instâncias</strong> para as automações poderem enviar.</p>
        </div>
      )}

      {AUTOS.map((a) => {
        const s = state[a.trigger];
        return (
          <div key={a.trigger} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700 }}>{a.label}</div>
                <p style={{ margin: '2px 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{a.desc}</p>
              </div>
              <label className="cfg-switch"><input type="checkbox" checked={s.enabled} onChange={(e) => patch(a.trigger, { enabled: e.target.checked })} /><span className="cfg-slider" /></label>
            </div>

            {s.enabled && (
              <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
                <div>
                  <label className="config-label">Instância de WhatsApp</label>
                  <select className="config-select" value={s.whatsappInstance} onChange={(e) => patch(a.trigger, { whatsappInstance: e.target.value })}>
                    <option value="">— Selecione —</option>
                    {instances.map((i) => <option key={i.id} value={i.nome}>{i.nome}</option>)}
                  </select>
                </div>
                <div>
                  <label className="config-label">Mensagem</label>
                  <textarea className="config-input" style={{ minHeight: 100, resize: 'vertical', fontFamily: 'inherit' }} value={s.messageTemplate} onChange={(e) => patch(a.trigger, { messageTemplate: e.target.value })} />
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                    {a.vars.map((v) => (
                      <button key={v} type="button" onClick={() => patch(a.trigger, { messageTemplate: s.messageTemplate + `{{${v}}}` })}
                        style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: 6, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8', cursor: 'pointer', fontFamily: 'monospace' }}>{`{{${v}}}`}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div style={{ textAlign: 'right', marginTop: 14 }}>
              <button className="btn-primary" disabled={busy === a.trigger} onClick={() => save(a)}>{busy === a.trigger ? 'Salvando...' : 'Salvar'}</button>
            </div>
          </div>
        );
      })}

      <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>
        Carrinho abandonado, lembrete de boleto/PIX e reengajamento chegam na próxima atualização.
      </p>
    </div>
  );
}
