/**
 * Notification Service for Modern, High-End Popups
 */
export const notifications = {
    /**
     * Show a premium error modal specifically for phone validation
     */
    showPhoneError(): Promise<void> {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'phone-error-modal';
            modal.id = 'phone-error-popup';

            modal.innerHTML = `
                <div class="phone-error-card">
                    <div class="phone-error-icon-wrap">
                        <i class="fa-solid fa-phone-slash"></i>
                    </div>
                    <h3>Número Incorreto</h3>
                    <p>Para garantir que suas mensagens cheguem corretamente, informe o número no formato de <strong>DDD + 9 dígitos</strong>.</p>
                    
                    <div class="phone-example-box">
                        <span class="phone-example-label">Formato Correto</span>
                        <div class="phone-example-number">11988887777</div>
                        <p style="font-size:0.75rem;margin-bottom:0;margin-top:10px;color:var(--text-dim);">Informe apenas os 11 dígitos, sem espaços ou símbolos.</p>
                    </div>

                    <button class="phone-error-btn">Entendido, vou corrigir</button>
                </div>
            `;

            document.body.appendChild(modal);

            const close = () => {
                modal.classList.add('toast-exit');
                setTimeout(() => {
                    modal.remove();
                    resolve();
                }, 300);
            };

            const btn = modal.querySelector('.phone-error-btn');
            btn?.addEventListener('click', close);

            // Close on backdrop click (optional, but good UX)
            modal.addEventListener('click', (e) => {
                if (e.target === modal) close();
            });
        });
    }
};
