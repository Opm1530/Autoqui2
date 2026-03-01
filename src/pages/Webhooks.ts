import { dbService } from '../services/db';
import { toast } from '../services/toast';

export const Webhooks = async () => {
    let webhooks = {
        atendimento: '',
        agendamento: '',
        venda: '',
        disparo: ''
    };

    try {
        const data = await dbService.get('settings', 'webhooks');
        if (data) {
            webhooks = { ...webhooks, ...data as any };
        }
    } catch (error) {
        console.error('Error loading webhooks:', error);
    }

    const html = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80vh; padding: 2rem; width: 100%;">
            <div style="text-align: center !important; margin-bottom: 2rem; width: 100%;">
                <h2 style="font-size: 1.8rem; font-weight: 700; color: var(--text-primary); margin: 0; text-align: center !important;">Configuração de Webhooks (Global)</h2>
            </div>

            <div class="card" style="width: 100%; max-width: 600px; margin: 0 auto;">
                <div style="padding: 2rem;">
                    <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 0.9rem; text-align: center;">
                    Configure as URLs dos webhooks que serão chamados por cada módulo do sistema. 
                    Estas configurações são globais e afetam todos os clientes.
                </p>

                <form id="webhooks-form">
                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">IA de Atendimento</label>
                        <input type="url" id="webhook-atendimento" placeholder="https://seu-webhook.com/atendimento" 
                               value="${webhooks.atendimento}" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); background: var(--surface-hover); color: var(--text-primary);">
                    </div>

                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">IA de Agendamento</label>
                        <input type="url" id="webhook-agendamento" placeholder="https://seu-webhook.com/agendamento" 
                               value="${webhooks.agendamento}" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); background: var(--surface-hover); color: var(--text-primary);">
                    </div>

                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">IA de Venda</label>
                        <input type="url" id="webhook-venda" placeholder="https://seu-webhook.com/venda" 
                               value="${webhooks.venda}" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); background: var(--surface-hover); color: var(--text-primary);">
                    </div>

                    <div class="form-group" style="margin-bottom: 2rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Disparo em Massa</label>
                        <input type="url" id="webhook-disparo" placeholder="https://seu-webhook.com/disparo" 
                               value="${webhooks.disparo}" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); background: var(--surface-hover); color: var(--text-primary);">
                    </div>

                    <button type="submit" class="btn-primary" style="padding: 1rem 2rem;">
                        <i class="fa-solid fa-save" style="margin-right: 8px;"></i> Salvar Configurações
                    </button>
                </form>
            </div>
        </div>
    </div>
    `;

    setTimeout(() => {
        const form = document.getElementById('webhooks-form');
        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();
                const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                btn.disabled = true;
                btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Salvando...';

                const data = {
                    atendimento: (document.getElementById('webhook-atendimento') as HTMLInputElement).value,
                    agendamento: (document.getElementById('webhook-agendamento') as HTMLInputElement).value,
                    venda: (document.getElementById('webhook-venda') as HTMLInputElement).value,
                    disparo: (document.getElementById('webhook-disparo') as HTMLInputElement).value,
                    updatedAt: new Date()
                };

                try {
                    await dbService.set('settings', 'webhooks', data);
                    toast.success('Webhooks atualizados com sucesso!');
                } catch (error) {
                    console.error('Error saving webhooks:', error);
                    toast.error('Erro ao salvar configurações.');
                } finally {
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fa-solid fa-save" style="margin-right: 8px;"></i> Salvar Configurações';
                }
            };
        }
    }, 100);

    return html;
};
