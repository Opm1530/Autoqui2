import { useEffect, useState } from 'react';
import { dbService } from '../../services/db';
import { ecommerceApi } from '../../services/ecommerceApi';
import { toast } from '../../services/toast';
import { useAuth } from '../useAuth';

type Meta = {
  trigger: string; label: string; desc: string; vars: string[]; defaultMsg: string;
  delayLabel?: string; delayUnit?: 'min' | 'dias'; delayDefault?: number; // só cron
};

const AUTOS: { grupo: string; itens: Meta[] }[] = [
  {
    grupo: 'Por evento (na hora)',
    itens: [
      { trigger: 'pedido_confirmado', label: 'Pedido confirmado', desc: 'Assim que o cliente finaliza o pedido.', vars: ['nome', 'produtos', 'total', 'numero_pedido', 'loja'], defaultMsg: 'Olá {{nome}}! 🎉 Recebemos seu pedido #{{numero_pedido}}:\n{{produtos}}\nTotal: {{total}}\n\nObrigado por comprar na {{loja}}!' },
      { trigger: 'pagamento_aprovado', label: 'Pagamento aprovado', desc: 'Quando o pagamento é confirmado.', vars: ['nome', 'total', 'numero_pedido', 'loja'], defaultMsg: 'Oba, {{nome}}! ✅ O pagamento do pedido #{{numero_pedido}} foi aprovado. Já vamos preparar seu envio!' },
      { trigger: 'pedido_enviado', label: 'Pedido enviado + rastreio', desc: 'Quando o pedido é despachado.', vars: ['nome', 'rastreio', 'url_rastreio', 'numero_pedido', 'loja'], defaultMsg: '📦 {{nome}}, seu pedido #{{numero_pedido}} foi enviado!\nRastreio: {{rastreio}}\nAcompanhe: {{url_rastreio}}' },
      { trigger: 'avaliacao_pos_compra', label: 'Avaliação pós-compra', desc: 'Enviada 2 dias após o envio do pedido.', vars: ['nome', 'loja', 'produtos', 'numero_pedido'], defaultMsg: '{{nome}}, tudo certo com seu pedido da {{loja}}? 💛 Conta pra gente como foi sua experiência!' },
    ],
  },
  {
    grupo: 'Recorrentes (automáticas)',
    itens: [
      { trigger: 'carrinho_abandonado', label: 'Carrinho abandonado', desc: 'Recupera carrinhos não finalizados.', vars: ['nome', 'produtos', 'total', 'link_carrinho', 'loja'], defaultMsg: '{{nome}}, você esqueceu alguns itens no carrinho 🛒\n{{produtos}}\nFinalize aqui: {{link_carrinho}}', delayLabel: 'Enviar após (min de abandono)', delayUnit: 'min', delayDefault: 60 },
      { trigger: 'boleto_lembrete', label: 'Lembrete de boleto/PIX', desc: 'Lembra pagamentos pendentes.', vars: ['nome', 'total', 'numero_pedido', 'loja', 'chave_pix', 'link_pagamento', 'tipo_pagamento'], defaultMsg: '{{nome}}, seu pedido #{{numero_pedido}} aguarda o pagamento via {{tipo_pagamento}} ({{total}}).\n{{link_pagamento}}', delayLabel: 'Cobrar após (minutos)', delayUnit: 'min', delayDefault: 1440 },
      { trigger: 'reengajamento', label: 'Reengajamento', desc: 'Reativa clientes parados.', vars: ['nome', 'dias_sem_comprar', 'loja'], defaultMsg: 'Sentimos sua falta, {{nome}}! 😊 Faz {{dias_sem_comprar}} dias que você não compra na {{loja}}. Veja as novidades!', delayLabel: 'Dias sem comprar', delayUnit: 'dias', delayDefault: 30 },
    ],
  },
];

type St = { enabled: boolean; whatsappInstance: string; messageTemplate: string; delay: number };

export function EcommerceAutomations() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';
  const [instances, setInstances] = useState<any[]>([]);
  const [state, setState] = useState<Record<string, St>>({});
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
      const st: Record<string, St> = {};
      for (const g of AUTOS) for (const a of g.itens) {
        const saved = (autos as any[]).find((x) => x.trigger === a.trigger);
        const delayMin = saved?.delayMinutes ?? ((a.delayDefault || 0) * (a.delayUnit === 'dias' ? 1440 : 1));
        st[a.trigger] = {
          enabled: saved ? saved.enabled !== false : false,
          whatsappInstance: saved?.whatsappInstance || (insts as any[])[0]?.nome || '',
          messageTemplate: saved?.messageTemplate || a.defaultMsg,
          delay: a.delayUnit === 'dias' ? Math.round(delayMin / 1440) : delayMin,
        };
      }
      setState(st);
      setLoading(false);
    })();
  }, [companyId]);

  const patch = (t: string, p: Partial<St>) => setState((s) => ({ ...s, [t]: { ...s[t], ...p } }));

  async function save(a: Meta) {
    const s = state[a.trigger];
    if (s.enabled && !s.whatsappInstance) { toast.warning('Escolha a instância de WhatsApp.'); return; }
    if (s.enabled && !s.messageTemplate.trim()) { toast.warning('Escreva a mensagem.'); return; }
    const delayMinutes = a.delayUnit === 'dias' ? (s.delay || 0) * 1440 : (a.delayUnit === 'min' ? (s.delay || 0) : 0);
    setBusy(a.trigger);
    try {
      await ecommerceApi.saveAutomation({ trigger: a.trigger, enabled: s.enabled, delayMinutes, messageTemplate: s.messageTemplate, whatsappInstance: s.whatsappInstance });
      toast.success(`Automação "${a.label}" salva!`);
    } catch (e: any) { toast.error('Erro: ' + (e.message || e)); }
    finally { setBusy(''); }
  }

  if (loading) return <p style={{ color: 'var(--text-muted)' }}>Carregando automações...</p>;

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      {instances.length === 0 && (
        <div className="card" style={{ borderColor: 'rgba(245,158,11,0.4)', background: 'rgba(245,158,11,0.06)' }}>
          <p style={{ margin: 0, fontSize: '0.9rem' }}><i className="fa-solid fa-triangle-exclamation" style={{ color: '#fbbf24' }} /> Você ainda não tem uma instância de WhatsApp conectada. Conecte uma em <strong>Instâncias</strong> para as automações poderem enviar.</p>
        </div>
      )}

      {AUTOS.map((g) => (
        <div key={g.grupo}>
          <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem' }}>{g.grupo}</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {g.itens.map((a) => {
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
                      <div style={{ display: 'grid', gridTemplateColumns: a.delayLabel ? '1fr 180px' : '1fr', gap: 10 }}>
                        <div>
                          <label className="config-label">Instância de WhatsApp</label>
                          <select className="config-select" value={s.whatsappInstance} onChange={(e) => patch(a.trigger, { whatsappInstance: e.target.value })}>
                            <option value="">— Selecione —</option>
                            {instances.map((i) => <option key={i.id} value={i.nome}>{i.nome}</option>)}
                          </select>
                        </div>
                        {a.delayLabel && (
                          <div>
                            <label className="config-label">{a.delayLabel}</label>
                            <input type="number" min="0" className="config-input" value={s.delay} onChange={(e) => patch(a.trigger, { delay: parseInt(e.target.value) || 0 })} />
                          </div>
                        )}
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
          </div>
        </div>
      ))}
    </div>
  );
}
