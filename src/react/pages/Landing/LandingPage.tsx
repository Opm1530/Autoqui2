import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../useAuth';
import { subscriptionApi } from '../../../services/subscriptionApi';
import { lojasLabel } from '../../util/plan';
import './landing.css';

type Plan = { id: string; nome: string; valor: number; maxLojas: number };

const WA = 'https://wa.me/5564999983832';
// Cole aqui a URL de embed do vídeo (YouTube/Vimeo) quando tiver; vazio = mostra o poster.
const VIDEO_URL = '';

// Todas as ferramentas da plataforma (a vitrine completa).
const TOOLS = [
  { icon: 'fa-bag-shopping', color: '#84cc16', name: 'Catálogo Digital', desc: 'Loja no WhatsApp com carrinho e pagamento PIX. O cliente monta o pedido e cai pronto no painel.' },
  { icon: 'fa-image', color: '#4d7c0f', name: 'Vitrine', desc: 'Mostruário elegante dos seus produtos — o cliente vê e pede direto no WhatsApp, sem checkout.' },
  { icon: 'fa-prescription-bottle-medical', color: '#14b8a6', name: 'FarmaQui (CRM)', desc: 'CRM para farmácias: captura leads, histórico de compras, recompra, fidelidade e atendimento — tudo no WhatsApp.' },
  { icon: 'fa-bullhorn', color: '#22c55e', name: 'Campanhas', desc: 'Dispare mensagens para toda a base com inteligência anti-banimento. Sem custo por mensagem.' },
  { icon: 'fa-robot', color: '#16a34a', name: 'Atendente IA', desc: 'Uma IA que atende e qualifica seus clientes 24h. Ativada com um consultor, no tom da sua empresa.', soon: true },
  { icon: 'fa-calendar-check', color: '#f59e0b', name: 'Agendamento', desc: 'Agenda de serviços com confirmação e lembretes automáticos. Ideal para clínicas e salões.', soon: true },
  { icon: 'fa-store', color: '#0ea5e9', name: 'E-commerce', desc: 'Conecte sua loja NuvemShop e automatize o WhatsApp: carrinho abandonado, pós-venda e mais.', soon: true },
];

const FAQS = [
  { q: 'Como funciona a implementação do AutoQui?', a: 'É instantâneo! Após criar sua conta, você vincula seu WhatsApp por QR Code e já pode configurar seus produtos e fluxos de atendimento em poucos minutos.' },
  { q: 'Os dados dos meus clientes estão seguros?', a: 'Com certeza. Utilizamos criptografia de ponta e servidores seguros para garantir que todas as transações e dados de leads sejam privados da sua empresa.' },
  { q: 'Posso usar o meu número atual do WhatsApp?', a: 'Sim! Você não precisa de um número novo. A integração é feita diretamente com o seu número de atendimento atual (Business ou Pessoal).' },
  { q: 'A IA de atendimento está inclusa nos planos?', a: 'Não. Os planos de assinatura cobrem o catálogo e as campanhas em massa. A IA de atendimento é ativada à parte, junto com um consultor que a configura no tom da sua empresa. Fale com a gente no WhatsApp para ativar.' },
];

export function LandingPage() {
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const painelTo = user ? (user.role === 'admin' ? '/admin/dashboard' : '/dashboard') : '/login';

  useEffect(() => { subscriptionApi.publicPlans().then(setPlans).catch(() => {}); }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="lp-container">
      <div className="lp-glow lp-glow-1" />
      <div className="lp-glow lp-glow-2" />

      <nav className="lp-navbar">
        <div className="lp-logo"><img src="/logo.png" alt="AutoQui Logo" /><span>AutoQui</span></div>
        <div className="lp-nav-links">
          <a href="#ferramentas" className="lp-nav-link" onClick={scrollTo('ferramentas')}>Ferramentas</a>
          <a href="#planos" className="lp-nav-link" onClick={scrollTo('planos')}>Planos</a>
          <a href="#faq" className="lp-nav-link" onClick={scrollTo('faq')}>Suporte</a>
          <Link to={painelTo} className="lp-btn-login">{user ? 'Dashboard' : 'Entrar no Painel'}</Link>
        </div>
      </nav>

      <section className="lp-hero">
        <div className="lp-badge">Tudo para vender e atender no WhatsApp</div>
        <h1>Todas as suas ferramentas de WhatsApp, <span>em um só lugar</span></h1>
        <p>Catálogo, vitrine, CRM de farmácia, campanhas em massa, agendamento, IA de atendimento — o AutoQui reúne tudo que o seu negócio precisa para vender e se relacionar no WhatsApp, num painel só. Comece grátis por 7 dias.</p>
        <div className="lp-hero-btns">
          <Link to="/signup" className="lp-btn-primary-lp">Começar teste grátis</Link>
          <a href="#ferramentas" className="lp-btn-secondary-lp" onClick={scrollTo('ferramentas')}>Ver as ferramentas</a>
        </div>
      </section>

      {/* Vídeo de apresentação */}
      <section id="video" className="lp-section">
        <div className="lp-section-header">
          <h2>Veja o AutoQui em ação</h2>
          <p>Um tour rápido por tudo que a plataforma faz pelo seu negócio.</p>
        </div>
        <div className="lp-video">
          {VIDEO_URL ? (
            <iframe src={VIDEO_URL} title="Apresentação AutoQui" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          ) : (
            <div className="lp-video-ph" onClick={scrollTo('ferramentas')} role="button" tabIndex={0}>
              <div className="lp-video-play"><i className="fa-solid fa-play" /></div>
              <span>Vídeo de apresentação em breve — enquanto isso, role e conheça as ferramentas</span>
            </div>
          )}
        </div>
      </section>

      {/* Todas as ferramentas */}
      <section id="ferramentas" className="lp-section alt">
        <div className="lp-section-header">
          <h2>Uma plataforma, várias ferramentas</h2>
          <p>Ative só o que faz sentido pro seu negócio. Cada ferramenta vira uma seção no seu painel.</p>
        </div>
        <div className="lp-grid-cards">
          {TOOLS.map((t) => (
            <div key={t.name} className="lp-card">
              <div className="lp-card-icon" style={{ color: t.color, background: t.color + '1f' }}><i className={`fa-solid ${t.icon}`} /></div>
              <h3>{t.name} {t.soon && <span className="lp-soon">em breve</span>}</h3>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PILAR 1 — Catálogo (self-service, incluído nos planos) */}
      <section id="solucoes" className="lp-section alt">
        <div className="lp-grid-2">
          <div className="lp-feat-content">
            <div className="lp-badge ok" style={{ marginBottom: '1.5rem' }}><i className="fa-solid fa-check" /> Incluído nos planos</div>
            <h2>Catálogo Digital</h2>
            <p>Uma vitrine que o cliente abre direto no navegador, monta o pedido sozinho e envia — e ele já cai pronto no seu painel. Seu WhatsApp vira um ponto de venda que funciona sem você digitar nada.</p>
            <ul className="lp-feat-list">
              <li className="lp-feat-item"><i className="fa-solid fa-circle-check" /> Checkout em menos de 30 segundos, sem app</li>
              <li className="lp-feat-item"><i className="fa-solid fa-circle-check" /> Pagamento por PIX (Mercado Pago) na hora</li>
              <li className="lp-feat-item"><i className="fa-solid fa-circle-check" /> Controle de estoque e pedidos centralizados</li>
            </ul>
            <Link to="/signup" className="lp-btn-primary-lp" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>Começar teste grátis</Link>
          </div>
          <div className="lp-feat-visual" style={{ color: '#84cc16' }}><i className="fa-solid fa-store" /></div>
        </div>
      </section>

      {/* PILAR 2 — IA de Atendimento (venda assistida por consultor) */}
      <section id="ia" className="lp-section">
        <div className="lp-grid-2 reverse">
          <div className="lp-feat-content">
            <div className="lp-badge wa" style={{ marginBottom: '1.5rem' }}><i className="fa-solid fa-headset" /> Ativação assistida por consultor</div>
            <h2>IA de Atendimento</h2>
            <p>Uma inteligência que atende, entende o contexto e responde seus clientes 24 horas por dia. Ela filtra curioso de comprador, tira dúvidas na hora e só te passa o que realmente precisa de você.</p>
            <ul className="lp-feat-list">
              <li className="lp-feat-item"><i className="fa-solid fa-circle-check" /> Responde e qualifica leads 24/7</li>
              <li className="lp-feat-item"><i className="fa-solid fa-circle-check" /> Entende contexto — não é robô de menu</li>
              <li className="lp-feat-item"><i className="fa-solid fa-circle-check" /> Passa para o atendente humano quando precisa</li>
            </ul>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>A IA é configurada junto com um especialista, no tom da sua empresa. Fale com a gente para ativar.</p>
            <a href={WA} target="_blank" rel="noreferrer" className="lp-btn-wa"><i className="fa-brands fa-whatsapp" /> Falar no WhatsApp</a>
          </div>
          <div className="lp-feat-visual" style={{ color: '#4d7c0f' }}><i className="fa-solid fa-robot" /></div>
        </div>
      </section>

      {/* PILAR 3 — Campanhas (incluído nos planos) */}
      <section id="campanhas" className="lp-section alt">
        <div className="lp-grid-2">
          <div className="lp-feat-content">
            <div className="lp-badge ok" style={{ marginBottom: '1.5rem' }}><i className="fa-solid fa-check" /> Incluído nos planos</div>
            <h2>Campanhas em Massa</h2>
            <p>Fale com toda a sua base de uma vez: anuncie novidades, promoções e reative quem sumiu — com um clique. Como usamos integração direta com o WhatsApp, não há custo por mensagem enviada.</p>
            <ul className="lp-feat-list">
              <li className="lp-feat-item"><i className="fa-solid fa-circle-check" /> Disparo para toda a base em segundos</li>
              <li className="lp-feat-item"><i className="fa-solid fa-circle-check" /> Inteligência anti-banimento</li>
              <li className="lp-feat-item"><i className="fa-solid fa-circle-check" /> Sem custo por mensagem — já vem no plano</li>
            </ul>
            <Link to="/signup" className="lp-btn-primary-lp" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>Começar teste grátis</Link>
          </div>
          <div className="lp-feat-visual" style={{ color: '#22c55e' }}><i className="fa-solid fa-bullhorn" /></div>
        </div>
      </section>

      {/* PILAR — FarmaQui (CRM de farmácia) */}
      <section id="farmaqui" className="lp-section">
        <div className="lp-grid-2 reverse">
          <div className="lp-feat-content">
            <div className="lp-badge ok" style={{ marginBottom: '1.5rem' }}><i className="fa-solid fa-check" /> Disponível</div>
            <h2>FarmaQui — CRM para Farmácias</h2>
            <p>Transforme cada conversa no WhatsApp em relacionamento que vende de novo. Captura quem te chama como lead, guarda o histórico de compras e lembra o cliente na hora certa — automático.</p>
            <ul className="lp-feat-list">
              <li className="lp-feat-item"><i className="fa-solid fa-circle-check" /> Captura de leads e histórico de compras</li>
              <li className="lp-feat-item"><i className="fa-solid fa-circle-check" /> Recompra, aniversário e uso contínuo automáticos</li>
              <li className="lp-feat-item"><i className="fa-solid fa-circle-check" /> Fidelidade, tags, atendimento e landing page</li>
            </ul>
            <Link to="/signup" className="lp-btn-primary-lp" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>Começar teste grátis</Link>
          </div>
          <div className="lp-feat-visual" style={{ color: '#14b8a6' }}><i className="fa-solid fa-prescription-bottle-medical" /></div>
        </div>
      </section>

      {plans.length > 0 && (
        <section id="planos" className="lp-section alt">
          <div className="lp-section-header">
            <h2>Planos de Catálogo</h2>
            <p>Catálogo e campanhas inclusos. 7 dias grátis, escolha pelo número de lojas e cancele quando quiser.</p>
          </div>
          <div className="lp-grid-cards" style={{ maxWidth: 760, margin: '0 auto' }}>
            {plans.map((p) => (
              <div key={p.id} className="lp-card" style={{ textAlign: 'center' }}>
                <div className="lp-card-icon" style={{ margin: '0 auto' }}><i className="fa-solid fa-store" /></div>
                <h3>{p.nome}</h3>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--lp-primary, #84cc16)', margin: '0.5rem 0' }}>
                  R$ {Number(p.valor).toFixed(2)}<span style={{ fontSize: '0.9rem', opacity: 0.7, fontWeight: 400 }}>/mês</span>
                </div>
                <p>{lojasLabel(p.maxLojas)} · catálogo, pedidos e campanhas inclusos.</p>
                <Link to={`/signup?plano=${p.id}`} className="lp-btn-primary-lp" style={{ display: 'inline-block', marginTop: '0.5rem' }}>Começar teste grátis</Link>
              </div>
            ))}
          </div>

          {/* IA é à parte — ativada com consultor */}
          <div className="lp-card" style={{ maxWidth: 760, margin: '2.5rem auto 0', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ flex: 1, minWidth: 260, textAlign: 'left' }}>
              <h3 style={{ marginBottom: 8 }}><i className="fa-solid fa-robot" style={{ color: '#4d7c0f', marginRight: 10 }} />Quer IA de atendimento?</h3>
              <p style={{ margin: 0 }}>A IA não entra no autoatendimento: ela é configurada junto com um consultor, no tom da sua empresa. Fale com a gente para ativar.</p>
            </div>
            <a href={WA} target="_blank" rel="noreferrer" className="lp-btn-wa"><i className="fa-brands fa-whatsapp" /> Falar no WhatsApp</a>
          </div>
        </section>
      )}

      <section id="faq" className="lp-faq">
        <div className="lp-section-header"><h2>Perguntas Frequentes</h2></div>
        {FAQS.map((f, i) => (
          <div key={i} className={'lp-faq-item' + (openFaq === i ? ' active' : '')} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
            <div className="lp-faq-question">{f.q} <i className="fa-solid fa-chevron-down" /></div>
            <div className="lp-faq-answer">{f.a}</div>
          </div>
        ))}
      </section>

      <footer className="lp-footer">
        <div className="lp-footer-col">
          <div className="lp-logo" style={{ marginBottom: '2rem' }}><img src="/logo.png" alt="AutoQui Logo" /><span>AutoQui</span></div>
          <p style={{ color: 'var(--lp-text-dim)', lineHeight: 1.8 }}>A solução número #1 para empresas que buscam excelência no atendimento digital.</p>
        </div>
        <div className="lp-footer-col">
          <h4>Produto</h4>
          <ul>
            <li><a href="#ferramentas" onClick={scrollTo('ferramentas')}>Ferramentas</a></li>
            <li><a href="#solucoes" onClick={scrollTo('solucoes')}>Catálogo</a></li>
            <li><a href="#farmaqui" onClick={scrollTo('farmaqui')}>FarmaQui</a></li>
            <li><a href="#campanhas" onClick={scrollTo('campanhas')}>Campanhas</a></li>
            <li><a href="#planos" onClick={scrollTo('planos')}>Planos</a></li>
          </ul>
        </div>
        <div className="lp-footer-col">
          <h4>Atendimento</h4>
          <ul>
            <li><a href={WA}>Falar com Consultor</a></li>
            <li><a href={WA}>Suporte Técnico</a></li>
            <li><a href={WA}>Comercial</a></li>
          </ul>
        </div>
        <div className="lp-footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacidade</a></li>
            <li><a href="#">Termos de Uso</a></li>
          </ul>
        </div>
      </footer>

      <a href={WA} target="_blank" rel="noreferrer" className="lp-wa-float"><i className="fa-brands fa-whatsapp" /></a>
    </div>
  );
}
