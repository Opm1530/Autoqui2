export const MSG_FIELDS = [
  { key: 'pedido_aceito_entrega_pago', label: 'Pedido aceito (Entrega pagamento adiantado)', icon: 'fa-check-circle', default: 'Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado (Pagamento Adiantado). \n\n📦 Itens: {{lista_produtos}}\n💰 Total: R$ {{valor_total}}' },
  { key: 'pedido_aceito_entrega_pendente', label: 'Pedido aceito (Entrega pagamento na entrega)', icon: 'fa-motorcycle', default: 'Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado. O pagamento será feito na entrega. \n\n📦 Itens: {{lista_produtos}}\n💰 Total: R$ {{valor_total}}' },
  { key: 'pedido_aceito_retirada', label: 'Pedido Aceito (Retirada)', icon: 'fa-store', default: 'Olá {{nome_lead}}! Pedido #{{numero_pedido}} aceito para retirada. Valor: R$ {{valor_total}}. Aguardamos você!' },
  { key: 'pagamento_confirmado', label: 'Pagamento Confirmado', icon: 'fa-credit-card', default: 'Olá {{nome_lead}}! Pagamento do pedido #{{numero_pedido}} confirmado. Já estamos preparando!' },
  { key: 'pedido_pronto', label: 'Pedido Pronto (Retirada)', icon: 'fa-box', default: 'Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} está pronto para retirada!' },
  { key: 'saiu_para_entrega', label: 'Saiu para Entrega', icon: 'fa-truck', default: 'Olá {{nome_lead}}! Pedido #{{numero_pedido}} saiu para entrega: {{endereco_entrega}}' },
  { key: 'pedido_entregue', label: 'Pedido Entregue / Finalizado', icon: 'fa-flag-checkered', default: 'Olá {{nome_lead}}! Pedido #{{numero_pedido}} finalizado. Obrigado pela preferência!' },
  { key: 'pedido_cancelado', label: 'Pedido Cancelado', icon: 'fa-xmark', default: 'Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi cancelado.' },
  { key: 'pedido_recebido', label: 'Pedido Recebido (Aguardando Aprovação)', icon: 'fa-clock', default: 'Olá {{nome_lead}}! Recebemos seu pedido #{{numero_pedido}}. Estamos revisando e já te informamos o status! ⏳' },
];

export const VARIAVEIS = [
  { key: '{{nome_lead}}', label: 'Nome do cliente', icon: 'fa-user' },
  { key: '{{numero_pedido}}', label: 'Nº do pedido', icon: 'fa-hashtag' },
  { key: '{{lista_produtos}}', label: 'Lista de produtos', icon: 'fa-basket-shopping' },
  { key: '{{valor_total}}', label: 'Valor total', icon: 'fa-money-bill' },
  { key: '{{endereco_entrega}}', label: 'Endereço de entrega', icon: 'fa-location-dot' },
  { key: '{{forma_pagamento}}', label: 'Forma de pagamento', icon: 'fa-credit-card' },
];

export const DIAS = [
  { key: 'seg', label: 'Segunda-feira' },
  { key: 'ter', label: 'Terça-feira' },
  { key: 'qua', label: 'Quarta-feira' },
  { key: 'qui', label: 'Quinta-feira' },
  { key: 'sex', label: 'Sexta-feira' },
  { key: 'sab', label: 'Sábado' },
  { key: 'dom', label: 'Domingo' },
];

export const THEMES = [
  { id: 'classico', name: 'Clássico', desc: 'Grade de produtos simples e direta', icon: 'fa-th-large' },
  { id: 'moderno', name: 'Moderno', desc: 'Sidebar de categorias + busca', icon: 'fa-search' },
  { id: 'banner', name: 'Banner', desc: 'Hero banner + grade de produtos', icon: 'fa-image' },
];
