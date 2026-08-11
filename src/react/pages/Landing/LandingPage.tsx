import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../useAuth';
import './landing.css';

const WA = 'https://wa.me/5564996168691';

const FAQS = [
  { q: 'Como funciona a implementação do AutoQui?', a: 'É instantâneo! Após criar sua conta, você vincula seu WhatsApp por QR Code e já pode configurar seus produtos e fluxos de atendimento em poucos minutos.' },
  { q: 'Os dados dos meus clientes estão seguros?', a: 'Com certeza. Utilizamos criptografia de ponta e servidores seguros para garantir que todas as transações e dados de leads sejam privados da sua empresa.' },
  { q: 'Posso usar o meu número atual do WhatsApp?', a: 'Sim! Você não precisa de um número novo. A integração é feita diretamente com o seu número de atendimento atual (Business ou Pessoal).' },
];

export function LandingPage() {
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const painelTo = user ? (user.role === 'admin' ? '/admin/dashboard' : '/dashboard') : '/login';

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
          <a href="#features" className="lp-nav-link" onClick={scrollTo('features')}>Planos</a>
          <a href="#solucoes" className="lp-nav-link" onClick={scrollTo('solucoes')}>Soluções</a>
          <a href="#faq" className="lp-nav-link" onClick={scrollTo('faq')}>Suporte</a>
          <Link to={painelTo} className="lp-btn-login">{user ? 'Dashboard' : 'Entrar no Painel'}</Link>
        </div>
      </nav>

      <section className="lp-hero">
        <div className="lp-badge">Tecnologia de Ponta para o seu Negócio</div>
        <h1>Aumente suas vendas com <span>Automação Inteligente</span></h1>
        <p>O AutoQui é a plataforma definitiva para quem deseja automatizar processos, gerenciar pedidos via catálogo e manter um relacionamento premium com clientes via WhatsApp.</p>
        <div className="lp-hero-btns">
          <a href={WA} target="_blank" rel="noreferrer" className="lp-btn-primary-lp">Falar com Consultor</a>
          <a href="#solucoes" className="lp-btn-secondary-lp" onClick={scrollTo('solucoes')}>Conhecer Módulos</a>
        </div>
      </section>

      <section id="solucoes" className="lp-section alt">
        <div className="lp-grid-2">
          <div className="lp-feat-content">
            <div className="lp-badge" style={{ marginBottom: '1.5rem' }}>Inteligência Artificial</div>
            <h2>Atendimento Humano em Escala de Robô</h2>
            <p>Nossa IA não apenas responde, ela entende o contexto. Transforme seu WhatsApp em uma máquina de vendas que nunca dorme.</p>
            <ul className="lp-feat-list">
              <li className="lp-feat-item"><i className="fa-solid fa-circle-check" /> Qualificação automática de leads</li>
              <li className="lp-feat-item"><i className="fa-solid fa-circle-check" /> Agendamentos sincronizados em tempo real</li>
              <li className="lp-feat-item"><i className="fa-solid fa-circle-check" /> Transição suave para atendente humano</li>
            </ul>
            <a href={WA} target="_blank" rel="noreferrer" className="lp-btn-primary-lp" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>Quero Automatizar</a>
          </div>
          <div className="lp-feat-image">
            <img src="https://img.freepik.com/premium-photo/robot-operating-laptop-futuristic-office-generative-ai_124507-65715.jpg" alt="IA Atendimento" />
          </div>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-grid-2 reverse">
          <div className="lp-feat-content">
            <div className="lp-badge" style={{ marginBottom: '1.5rem' }}>E-commerce de Próxima Geração</div>
            <h2>Um Catálogo que é mais que uma Loja</h2>
            <p>Ofereça aos seus clientes uma experiência de compra fluida, rápida e integrada. Nada de aplicativos pesados, tudo direto no navegador.</p>
            <ul className="lp-feat-list">
              <li className="lp-feat-item"><i className="fa-solid fa-circle-check" /> Checkout em menos de 30 segundos</li>
              <li className="lp-feat-item"><i className="fa-solid fa-circle-check" /> Integração nativa com Mercado Pago (PIX)</li>
              <li className="lp-feat-item"><i className="fa-solid fa-circle-check" /> Controle de estoque e gatilhos de escassez</li>
            </ul>
            <a href={WA} target="_blank" rel="noreferrer" className="lp-btn-secondary-lp" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>Ver Demonstração</a>
          </div>
          <div className="lp-feat-image">
            <img src="https://img.freepik.com/premium-psd/food-delivery-online-app-landing-page-template_444901-155.jpg" alt="Catálogo Digital" />
          </div>
        </div>
      </section>

      <section id="features" className="lp-section alt">
        <div className="lp-section-header">
          <h2>Módulos Especializados</h2>
          <p>O AutoQui se adapta ao seu modelo de negócio, seja ele vendas diretas, serviços ou envios em massa.</p>
        </div>
        <div className="lp-grid-cards">
          <div className="lp-card">
            <div className="lp-card-icon"><i className="fa-solid fa-shop" /></div>
            <h3>Vendas Catálogo</h3>
            <p>A vitrine definitiva para o seu delivery ou loja online. Sincronização total com WhatsApp e gestão de pedidos centralizada.</p>
            <a href={WA} target="_blank" rel="noreferrer" className="lp-card-link">Solicitar Teste <i className="fa-solid fa-arrow-right" /></a>
          </div>
          <div className="lp-card">
            <div className="lp-card-icon"><i className="fa-solid fa-calendar-check" /></div>
            <h3>Gestão de Serviços</h3>
            <p>Para clínicas, barbearias ou consultorias. Agendamento inteligente que reduz faltas em até 70% com lembretes automáticos.</p>
            <a href={WA} target="_blank" rel="noreferrer" className="lp-card-link">Saber mais <i className="fa-solid fa-arrow-right" /></a>
          </div>
          <div className="lp-card">
            <div className="lp-card-icon"><i className="fa-solid fa-bullhorn" /></div>
            <h3>Campanhas Pro</h3>
            <p>Envio em massa com inteligência de anti-banimento. Fale com toda a sua base de leads com apenas um clique.</p>
            <a href={WA} target="_blank" rel="noreferrer" className="lp-card-link">Explorar <i className="fa-solid fa-arrow-right" /></a>
          </div>
        </div>
      </section>

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
            <li><a href="#solucoes" onClick={scrollTo('solucoes')}>Recursos</a></li>
            <li><a href="#solucoes" onClick={scrollTo('solucoes')}>Soluções</a></li>
            <li><a href="#faq" onClick={scrollTo('faq')}>Novidades</a></li>
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
