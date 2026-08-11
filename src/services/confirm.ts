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

    // Modal com campo de texto. Resolve com a string digitada, ou null se cancelar.
    prompt(options: PromptOptions): Promise<string | null> {
        return new Promise((resolve) => {
            const { title, message = '', placeholder = '', confirmText = 'Confirmar', cancelText = 'Cancelar', defaultValue = '', multiline = false, type = 'info' } = options;

            const modal = document.createElement('div');
            modal.className = 'confirm-modal';
            const field = multiline
                ? `<textarea id="prompt-input" class="prompt-input" rows="3" placeholder="${placeholder}"></textarea>`
                : `<input id="prompt-input" class="prompt-input" type="text" placeholder="${placeholder}">`;
            modal.innerHTML = `
                <div class="confirm-modal-content">
                    <div class="confirm-header ${type}">
                        <div class="confirm-icon">${type === 'danger' ? '<i class="fa fa-times"></i>' : type === 'warning' ? '<i class="fa fa-exclamation-triangle"></i>' : '<i class="fa fa-pen"></i>'}</div>
                        <h2>${title}</h2>
                    </div>
                    <div class="confirm-body">
                        ${message ? `<p>${message}</p>` : ''}
                        ${field}
                    </div>
                    <div class="confirm-actions">
                        <button class="btn-cancel" id="prompt-cancel">${cancelText}</button>
                        <button class="btn-confirm ${type === 'danger' ? 'danger' : ''}" id="prompt-ok">${confirmText}</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            const input = modal.querySelector('#prompt-input') as HTMLInputElement | HTMLTextAreaElement;
            if (input && defaultValue) input.value = defaultValue;
            input?.focus();

            const cleanup = (result: string | null) => { modal.remove(); resolve(result); };
            modal.querySelector('#prompt-ok')?.addEventListener('click', () => cleanup(input?.value ?? ''));
            modal.querySelector('#prompt-cancel')?.addEventListener('click', () => cleanup(null));
            modal.addEventListener('click', (e) => { if (e.target === modal) cleanup(null); });
            if (!multiline) input?.addEventListener('keydown', (e) => {
                if ((e as KeyboardEvent).key === 'Enter') cleanup(input.value);
                if ((e as KeyboardEvent).key === 'Escape') cleanup(null);
            });
        });
    }
}

interface PromptOptions {
    title: string;
    message?: string;
    placeholder?: string;
    confirmText?: string;
    cancelText?: string;
    defaultValue?: string;
    multiline?: boolean;
    type?: 'danger' | 'warning' | 'info';
}

export const confirm = new ConfirmService();
