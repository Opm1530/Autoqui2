Exato! Como o sistema de cadastro de usuários via tela ainda não foi criado (geralmente só o admin cria outros usuários), você precisa criar esses primeiros usuários manualmente lá no **Console do Firebase**.

O passo a passo é esse:

1.  Acesse o [Console do Firebase](https://console.firebase.google.com/) e entre no seu projeto.
2.  No menu lateral esquerdo, vá em **Criação** > **Authentication**.
3.  Primeiro, vá na aba **Sign-in method** (Método de login) e ative a opção **Email/Password** (E-mail/Senha).
4.  Depois, vá na aba **Users** (Usuários) e clique no botão **Adicionar usuário**.

Agora crie os dois usuários para testar:

1.  **Para o Admin:**
    *   **E-mail:** `admin@example.com` (tem que ser esse exato e-mail por enquanto, ou me diga qual o seu e-mail real para eu atualizar no código).
    *   **Senha:** Escolha uma senha qualquer (ex: `123456`).

2.  **Para o Dono:**
    *   **E-mail:** Crie qualquer outro e-mail (ex: `dono@teste.com`).
    *   **Senha:** Escolha uma senha qualquer.

Depois de criar lá, é só voltar na aplicação e fazer o login com esses dados. O sistema vai reconhecer automaticamente que o `admin@example.com` é o Admin e qualquer outro é Dono.

Quer que eu mude o e-mail de admin no código para o seu e-mail real?
