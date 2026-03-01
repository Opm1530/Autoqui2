# Integração de Múltiplas Lojas com WhatsApp Central

Implementamos a lógica solicitada para suportar empresas que possuem **um único número de WhatsApp** mas **múltiplas lojas físicas**.

## Como Funciona

### 1. Cadastro da Empresa (Admin)
*   **WhatsApp Central**: Agora existe um campo específico para o número de WhatsApp da empresa.
*   **Gestão de Lojas**: Você pode cadastrar quantas lojas quiser.
    *   **Campos**: Nome da Loja e Endereço Completo.
    *   **Lógica**: A IA usará este endereço para comparar com a localização do cliente e direcionar o pedido.

### 2. Gestão de Equipe (Dono)
*   Ao criar um novo funcionário, o dono agora vê um **dropdown** com as lojas cadastradas.
*   Ele pode vincular o funcionário a **"Todas as Lojas"** ou a uma **Unidade Específica**.
*   Isso permite que, no futuro, quando a IA rotear o pedido para a "Loja Centro", apenas os funcionários daquela loja vejam o pedido.

### Próximos Passos (Sugestão para n8n)
*   No fluxo do n8n, ler o array `stores` da empresa.
*   Solicitar localização do cliente.
*   Calcular distância e definir `order.storeId`.
