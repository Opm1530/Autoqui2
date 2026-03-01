import { toast } from '../services/toast';

export const Login = () => {
    return `
        <div class="login-wrapper">
            <div class="login-card glass">
                <div class="login-header">
                    <div class="logo-icon large"><img style="width: 100%;" src="/logo.png" alt="Logo"></div>
                    <h1>AutoQui</h1>
                    <p>Entre com suas credenciais para acessar a plataforma.</p>
                </div>
                <form id="login-form" class="login-form">
                    <div class="form-group">
                        <label>E-mail</label>
                        <input type="email" id="email" placeholder="Seu e-mail" required>
                    </div>
                    <div class="form-group">
                        <label>Senha</label>
                        <input type="password" id="password" placeholder="Sua senha" required>
                    </div>
                    <button type="submit" class="btn-primary full-width">Acessar Sistema</button>
                </form>
            </div>
        </div>
    `;
};

// Export function to show login errors
export function showLoginError(message: string) {
    toast.error(message);
}
