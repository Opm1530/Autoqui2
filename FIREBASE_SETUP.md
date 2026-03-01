# Configuração de Usuários no Firebase

Para que o login funcione, você precisa criar os usuários manualmente no Console do Firebase, já que ainda não temos uma tela de cadastro pública.

## 1. Ativar Autenticação
1. Acesse o [Console do Firebase](https://console.firebase.google.com/).
2. Entre no seu projeto `conectacidade-5e46d`.
3. No menu lateral, clique em **Criação** > **Authentication**.
4. Vá na aba **Sign-in method**.
5. Clique em **Email/Password** e ative a opção **Enable**. Salve.

## 2. Criar Usuários
Agora vá na aba **Users** e clique em **Add user**.

### Usuário Admin
O sistema está configurado para reconhecer este e-mail específico como Admin:
*   **E-mail**: `admin@example.com`
*   **Senha**: (Crie uma senha de sua preferência)

### Usuário Dono (Owner)
Qualquer outro e-mail será reconhecido como Dono de empresa:
*   **E-mail**: `dono@loja.com` (ou qualquer outro)
*   **Senha**: (Crie uma senha de sua preferência)

## 3. Testar
1. Volte para a aplicação rodando localmente (`npm run dev`).
2. Tente fazer login com o e-mail e senha que você acabou de criar.
