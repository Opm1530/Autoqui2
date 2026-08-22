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
  { key: 'venda_catalogo', name: 'Catálogo', desc: 'Loja própria com carrinho e pagamento (PIX / Mercado Pago). O cliente monta o pedido e você recebe pronto.', icon: 'fa-bag-shopping', color: '#6366f1', group: 'canal', open: '/products' },
  { key: 'vitrine', name: 'Vitrine', desc: 'Mostruário elegante sem checkout — o cliente vê os produtos e pede direto no WhatsApp.', icon: 'fa-image', color: '#a855f7', group: 'canal', open: '/products' },
  { key: 'agendamento', name: 'Agendamento', desc: 'Agenda de serviços com confirmação e lembretes automáticos. Ideal para clínicas, salões e consultorias.', icon: 'fa-calendar-check', color: '#f59e0b', group: 'canal', open: '/schedule' },
  { key: 'ecommerce', name: 'E-commerce (NuvemShop)', desc: 'Conecte sua loja NuvemShop: automações de WhatsApp, widgets de conversão, analytics e CRM.', icon: 'fa-store', color: '#0ea5e9', group: 'canal', soon: true },
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
    // Canal é exclusivo: se já houver outro canal ativo, avisa que troca.
    if (t.group === 'canal') {
      const ativo = TOOLS.find((x) => x.group === 'canal' && x.key !== t.key && modulos?.includes(x.key));
      if (ativo) {
        const ok = await confirm.warning('Trocar de canal de venda', `Ativar "${t.name}" vai desativar "${ativo.name}" — você usa um canal principal por vez. Deseja continuar?`);
        if (!ok) return;
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
      <div className="page-header"><div>
        <h2 className="page-title">Ferramentas</h2>
        <p style={{ color: 'var(--text-muted)', margin: '4px 0 0', fontSize: '0.9rem' }}>Ative as ferramentas que fazem sentido pro seu negócio. Cada uma vira uma seção no seu painel.</p>
      </div></div>

      <ToolSection title="Como você vende" hint="Seu canal principal — escolha um." tools={TOOLS.filter((t) => t.group === 'canal')} render={renderCard} />
      <ToolSection title="Turbine seu atendimento" hint="Combine à vontade com o seu canal." tools={TOOLS.filter((t) => t.group === 'camada')} render={renderCard} />
    </div>
  );

  function renderCard(t: Tool) {
    const active = isActive(t);
    return (
      <div key={t.key} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14, opacity: t.soon ? 0.75 : 1, border: active ? `1px solid ${t.color}55` : undefined }}>
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
                : <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>Disponível</span>}
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

function ToolSection({ title, hint, tools, render }: { title: string; hint: string; tools: Tool[]; render: (t: Tool) => ReactNode }) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', margin: '2px 0 0', fontSize: '0.85rem' }}>{hint}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {tools.map(render)}
      </div>
    </div>
  );
}
