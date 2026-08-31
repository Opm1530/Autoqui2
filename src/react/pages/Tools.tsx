import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../../services/db';
import { adminApi } from '../../services/adminApi';
import { toast } from '../../services/toast';
import { confirm } from '../../services/confirm';
import { useAuth } from '../useAuth';
import { SkeletonCards } from '../components/Skeleton';

type Tool = {
  key: string;
  name: string;
  desc: string;
  icon: string;
  color: string;
  group: 'canal' | 'camada'; // canal = escolha um; camada = combina livre
  open?: string;             // rota pra "Abrir" quando ativa
  soon?: boolean;            // ainda não disponível
};

const TOOLS: Tool[] = [
  { key: 'venda_catalogo', name: 'Catálogo', desc: 'Loja própria com carrinho e pagamento (PIX / Mercado Pago). O cliente monta o pedido e você recebe pronto.', icon: 'fa-bag-shopping', color: '#84cc16', group: 'canal', open: '/products' },
  { key: 'vitrine', name: 'Vitrine', desc: 'Mostruário elegante sem checkout — o cliente vê os produtos e pede direto no WhatsApp.', icon: 'fa-image', color: '#4d7c0f', group: 'canal', open: '/products' },
  { key: 'agendamento', name: 'Agendamento', desc: 'Agenda de serviços com confirmação e lembretes automáticos. Ideal para clínicas, salões e consultorias.', icon: 'fa-calendar-check', color: '#f59e0b', group: 'canal', open: '/schedule' },
  { key: 'ecommerce', name: 'E-commerce (NuvemShop)', desc: 'Conecte sua loja NuvemShop: automações de WhatsApp e (em breve) analytics e CRM.', icon: 'fa-store', color: '#0ea5e9', group: 'canal', open: '/ecommerce' },
  { key: 'farmaqui', name: 'FarmaQui (CRM)', desc: 'Captura quem manda mensagem no WhatsApp como lead, marca última compra e (em breve) lembra a recompra. Ideal para farmácias e recorrência.', icon: 'fa-prescription-bottle-medical', color: '#14b8a6', group: 'canal', open: '/farmaqui' },
  { key: 'atendimento', name: 'Atendente IA', desc: 'Uma IA que atende, tira dúvidas e qualifica seus clientes no WhatsApp, 24 horas por dia.', icon: 'fa-robot', color: '#22c55e', group: 'camada', open: '/leads' },
  { key: 'disparo', name: 'Campanhas', desc: 'Dispare mensagens em massa para toda a sua base no WhatsApp, com inteligência anti-banimento.', icon: 'fa-bullhorn', color: '#ef4444', group: 'camada', open: '/campaigns' },
];

export function Tools() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const companyId = user?.companyId || '';
  const [modulos, setModulos] = useState<string[] | null>(null);
  const [busy, setBusy] = useState('');

  async function load() {
    const company = (await dbService.get('companies', companyId).catch(() => null)) as any;
    setModulos(company?.modulos_ativos || []);
  }
  useEffect(() => { if (companyId) load(); }, [companyId]);

  const isActive = (t: Tool) => !!modulos?.includes(t.key);

  async function activate(t: Tool) {
    // Canal é exclusivo: se já houver outro canal ativo, exige confirmação por digitação.
    if (t.group === 'canal') {
      const ativo = TOOLS.find((x) => x.group === 'canal' && x.key !== t.key && modulos?.includes(x.key));
      if (ativo) {
        const typed = await confirm.prompt({
          title: 'Trocar de canal de venda',
          message: `Você usa <strong>um canal principal por vez</strong>. Ativar "${t.name}" vai desativar "${ativo.name}" (os dados ficam guardados, mas a seção some do menu).<br><br>Para confirmar, digite <strong>${ativo.name}</strong> abaixo.`,
          placeholder: ativo.name,
          confirmText: `Trocar para ${t.name}`,
          type: 'danger',
        });
        if (typed === null) return; // cancelou
        if (typed.trim().toLowerCase() !== ativo.name.trim().toLowerCase()) {
          toast.error('O nome não confere. Troca cancelada.');
          return;
        }
      }
    }
    setBusy(t.key);
    try {
      const { modulos: novo } = await adminApi.toggleTool(t.key, true);
      setModulos(novo);
      toast.success(`${t.name} ativada!`);
      // O menu lê os módulos ao carregar; recarrega pra refletir a nova ferramenta.
      setTimeout(() => window.location.reload(), 700);
    } catch (e: any) { toast.error('Erro ao ativar: ' + (e.message || e)); setBusy(''); }
  }

  async function deactivate(t: Tool) {
    const ok = await confirm.danger('Desativar ferramenta', `Desativar "${t.name}"? Seus dados são preservados; você pode reativar quando quiser.`);
    if (!ok) return;
    setBusy(t.key);
    try {
      const { modulos: novo } = await adminApi.toggleTool(t.key, false);
      setModulos(novo);
      toast.success(`${t.name} desativada.`);
      setTimeout(() => window.location.reload(), 700);
    } catch (e: any) { toast.error('Erro ao desativar: ' + (e.message || e)); setBusy(''); }
  }

  if (modulos === null) return <SkeletonCards count={6} lines={3} />;
  const isOwner = user?.role === 'owner';

  return (
    <div>
      <div className="page-heading">
        <h1>Ferramentas</h1>
        <p>Monte seu painel: escolha <strong>um canal principal</strong> de venda e some quantas melhorias de atendimento quiser. Cada ferramenta ativa vira uma seção no menu.</p>
      </div>

      <ToolSection
        title="Como você vende"
        icon="fa-store"
        hint="Seu canal principal de venda. Você usa um por vez — trocar substitui o atual (os dados ficam guardados)."
        tools={TOOLS.filter((t) => t.group === 'canal')}
        render={renderCard}
      />
      <ToolSection
        title="Turbine seu atendimento"
        icon="fa-wand-magic-sparkles"
        hint="Complementos que funcionam junto com qualquer canal — ative e desative livremente."
        tools={TOOLS.filter((t) => t.group === 'camada')}
        render={renderCard}
      />
    </div>
  );

  function renderCard(t: Tool) {
    const active = isActive(t);
    return (
      <div key={t.key} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14, opacity: t.soon ? 0.75 : 1, border: active ? `1px solid ${t.color}55` : undefined, borderLeft: active ? `4px solid ${t.color}` : undefined }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.color + '1f', color: t.color, fontSize: '1.4rem' }}>
            <i className={`fa-solid ${t.icon}`} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{t.name}</div>
            {t.soon
              ? <span className="badge" style={{ background: 'rgba(148,163,184,0.15)', color: '#94a3b8', border: '1px solid rgba(148,163,184,0.3)' }}>Em breve</span>
              : active
                ? <span className="badge" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}><i className="fa-solid fa-circle-check" /> Ativa</span>
                : <span className="badge" style={{ background: 'rgba(23, 37, 28, 0.05)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>Disponível</span>}
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0, flex: 1 }}>{t.desc}</p>

        {t.soon ? (
          <button className="btn-secondary" disabled style={{ justifyContent: 'center', opacity: 0.7 }}>Em breve</button>
        ) : active ? (
          <div style={{ display: 'flex', gap: 8 }}>
            {t.open && <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => navigate(t.open!)}>Abrir</button>}
            {isOwner && <button className="btn-secondary" style={{ color: '#f87171', borderColor: 'rgba(239,68,68,0.35)' }} disabled={busy === t.key} onClick={() => deactivate(t)}>Desativar</button>}
          </div>
        ) : (
          <button className="btn-primary" style={{ justifyContent: 'center' }} disabled={!isOwner || busy === t.key} onClick={() => activate(t)}>
            {busy === t.key ? 'Ativando...' : <><i className="fa-solid fa-plus" /> Ativar</>}
          </button>
        )}
        {!isOwner && !active && !t.soon && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>Apenas o dono pode ativar.</p>}
      </div>
    );
  }
}

function ToolSection({ title, icon, hint, tools, render }: { title: string; icon: string; hint: string; tools: Tool[]; render: (t: Tool) => ReactNode }) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 30, height: 30, borderRadius: 9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)', color: 'var(--primary-contrast)', fontSize: '0.85rem' }}><i className={`fa-solid ${icon}`} /></span>
          {title}
        </h3>
        <p style={{ color: 'var(--text-muted)', margin: '6px 0 0', fontSize: '0.85rem' }}>{hint}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {tools.map(render)}
      </div>
    </div>
  );
}
