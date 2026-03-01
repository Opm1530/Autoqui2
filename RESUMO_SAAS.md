Pronto! A arquitetura SaaS escalável está implementada e conectada ao Firestore.

### O que foi feito:

1.  **Painel Admin Global (Super Admin)**:
    *   Agora você pode **Criar Empresas** diretamente pelo painel.
    *   Ao criar uma empresa, você já define o **Dono**, a **Senha** e a **Configuração da IA** (Método + Prompt).
    *   O Dashboard do Admin soma as métricas de todas as empresas (mensagens, pagamentos).

2.  **Painel do Dono (Cliente)**:
    *   O dono vê apenas os dados da própria empresa.
    *   **Produtos**: Pode criar e editar produtos, mas o sistema checa se a IA dele permite (ex: se for assinatura, avisa que está desativado).
    *   **Equipe**: O dono pode criar contas para funcionários (sem te deslogar!).

3.  **Painel do Funcionário**:
    *   Criei um acesso restrito para funcionários que vêem apenas Pedidos e Produtos/Dashboard, sem acesso a configurações sensíveis.

4.  **Banco de Dados (Firestore)**:
    *   Tudo está salvando no banco agora: Empresas (`companies`), Usuários (`users`) e Produtos (`products`).
    *   Preparei o campo `aiConfig` dentro da empresa para o seu n8n ler (prompt, modelo, método).

### Como testar agora:

1.  Entre como **Admin** (`admin@example.com`).
2.  Vá em "Empresas" e crie uma nova empresa (ex: "Pizzaria do Zé").
3.  Saia e entre com o email do dono que você acabou de criar.
4.  Como dono, tente adicionar um produto e criar um funcionário.

Está tudo pronto para receber as conexões do n8n!
