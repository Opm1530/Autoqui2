interface ConfirmOptions {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
}

class ConfirmService {
    show(options: ConfirmOptions): Promise<boolean> {
        return new Promise((resolve) => {
            const { title, message, confirmText = 'Confirmar', cancelText = 'Cancelar', type = 'warning' } = options;

            // Create modal
            const modal = document.createElement('div');
            modal.className = 'confirm-modal';
            modal.innerHTML = `
                <div class="confirm-modal-content">
                    <div class="confirm-header ${type}">
                        <div class="confirm-icon">${type === 'danger' ? '<i class="fa fa-times"></i>' : type === 'warning' ? '<i class="fa fa-exclamation-triangle"></i>' : '<i class="fa fa-info-circle"></i>'}</div>
                        <h2>${title}</h2>
                    </div>
                    <div class="confirm-body">
                        <p>${message}</p>
                    </div>
                    <div class="confirm-actions">
                        <button class="btn-cancel" id="confirm-cancel">${cancelText}</button>
                        <button class="btn-confirm ${type}" id="confirm-ok">${confirmText}</button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            const confirmBtn = modal.querySelector('#confirm-ok');
            const cancelBtn = modal.querySelector('#confirm-cancel');

            const cleanup = (result: boolean) => {
                modal.remove();
                resolve(result);
            };

            confirmBtn?.addEventListener('click', () => cleanup(true));
            cancelBtn?.addEventListener('click', () => cleanup(false));

            // Close on backdrop click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) cleanup(false);
            });
        });
    }

    async danger(title: string, message: string): Promise<boolean> {
        return this.show({ title, message, type: 'danger', confirmText: 'Sim, excluir' });
    }

    async warning(title: string, message: string): Promise<boolean> {
        return this.show({ title, message, type: 'warning' });
    }
}

export const confirm = new ConfirmService();
