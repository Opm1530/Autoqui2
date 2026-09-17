// Aplica a identidade da loja na página aberta: título e ícone da aba (favicon),
// além das meta tags de compartilhamento no DOM. Observação: crawlers de link
// (WhatsApp, Instagram) NÃO rodam JS — para o preview do link mostrar a logo do
// cliente é preciso o HTML vir do servidor já com as meta tags (ver backend
// storefrontHtml). Aqui garantimos a aba do navegador do visitante.
export function applyStoreBranding(opts: { title?: string; faviconUrl?: string; imageUrl?: string; description?: string }) {
  try {
    if (opts.title) document.title = opts.title;

    if (opts.faviconUrl) {
      document.querySelectorAll("link[rel~='icon'], link[rel='apple-touch-icon']").forEach((l) => l.parentNode?.removeChild(l));
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = opts.faviconUrl;
      document.head.appendChild(link);
    }

    const setMeta = (selector: string, val?: string) => {
      if (!val) return;
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', val);
    };
    setMeta("meta[property='og:title']", opts.title);
    setMeta("meta[property='og:image']", opts.imageUrl);
    setMeta("meta[property='og:description']", opts.description);
    setMeta("meta[name='description']", opts.description);
  } catch { /* ignore */ }
}
