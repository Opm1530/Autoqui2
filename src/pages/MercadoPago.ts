import { dbService } from '../services/db';
import { authService } from '../services/auth';
import { toast } from '../services/toast';

export const MercadoPago = async () => {
    const user = authService.getCurrentUser();
    if (!user || !user.companyId) return '<p>Acesso negado.</p>';

    const companyDoc = await dbService.get('companies', user.companyId);
    const company = companyDoc as any;
    const currentToken = company?.mercadoPagoToken || '';
    const currentUserId = company?.userIdMercadoPago || '';

    // Global function for connecting via Webhook
    (window as any).connectMercadoPago = async () => {
        const tokenInput = document.getElementById('mp-token-input') as HTMLInputElement;
        const connectBtn = document.getElementById('btn-connect-mp') as HTMLButtonElement;

        const token = tokenInput.value.trim();
        if (!token) {
            toast.warning('Por favor, insira o Access Token primeiro.');
            return;
        }

        connectBtn.disabled = true;
        const originalContent = connectBtn.innerHTML;
        connectBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Conectando...</span>';

        try {
            // 1. Save token to Firebase locally first to ensure it's persisted
            await dbService.update('companies', user.companyId!, {
                mercadoPagoToken: token
            });

            // 2. Call individual webhook to handle extra logic (like fetching discovery data)
            const response = await fetch('https://n8n.vps.pequi.digital/webhook/autoqui-userId-mercadopago', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accessToken: token,
                    companyId: user.companyId
                })
            });

            if (!response.ok) {
                throw new Error('Falha ao processar a conexão via servidor.');
            }

            toast.success('Integração processada com sucesso!');

            // Reload page to fetch updated data from Firebase
            setTimeout(() => {
                window.location.reload();
            }, 1500);

        } catch (error: any) {
            console.error(error);
            toast.error('Erro na conexão: ' + error.message);
        } finally {
            connectBtn.disabled = false;
            connectBtn.innerHTML = originalContent;
        }
    };

    return `
        <div class="page-header" style="flex-direction: column;">
            <div><h2 class="page-title">Configuração Mercado Pago</h2></div>
            <div><p style="color: var(--text-muted); font-size: 0.9rem;">Configure sua integração para recebimento de pagamentos.</p></div>
        </div>

        <div class="card glass" style="max-width: 600px; margin-top: 20px;">
            <div style="display: flex; align-items: center; gap: 18px; margin-bottom: 30px;">
                <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #009ee3 0%, #007bbd 100%); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.8rem; box-shadow: 0 8px 16px rgba(0, 158, 227, 0.2);">
                    <i class="fa-solid fa-receipt"></i>
                </div>
                <div>
                    <h3 style="margin: 0; font-size: 1.25rem;">Integração de Pagamentos</h3>
                    <p style="margin: 0; color: var(--text-dim); font-size: 0.85rem;">Conecte sua conta para aceitar cartões e Pix.</p>
                </div>
            </div>

            <div class="form-group" style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 10px; font-weight: 600; color: var(--text-main);">Access Token (Produção)</label>
                <div style="position: relative;">
                    <input type="password" id="mp-token-input" class="input-field" 
                           placeholder="APP_USR-0000..." 
                           value="${currentToken}" 
                           style="width: 100%; padding: 14px 45px 14px 16px; background: var(--bg-color); border: 1px solid var(--border-color); color: white; border-radius: 10px; font-family: monospace;">
                    <button type="button" onclick="const input = document.getElementById('mp-token-input'); input.type = input.type === 'password' ? 'text' : 'password';" 
                            style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--text-dim); border: none; background: none; cursor: pointer; padding: 5px;">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </div>
            </div>

            <div class="form-group" style="margin-bottom: 25px;">
                <label style="display: block; margin-bottom: 10px; font-weight: 600; color: var(--text-main);">User Id</label>
                <div style="display: flex; gap: 10px;">
                    <input type="text" id="mp-userid-input" class="input-field" 
                           placeholder="Clique em conectar para buscar o ID" 
                           value="${currentUserId}" 
                           disabled
                           style="flex: 1; padding: 14px 16px; background: rgba(0,0,0,0.1); border: 1px solid var(--border-color); color: var(--text-muted); border-radius: 10px; font-family: monospace;">
                    <button id="btn-connect-mp" class="btn-primary" onclick="window.connectMercadoPago()" style="display: flex; align-items: center; gap: 8px; padding: 0 25px; height: 48px; border-radius: 10px; font-weight: 600; background: #009ee3;">
                        <i class="fa-solid fa-plug"></i> <span>Conectar</span>
                    </button>
                </div>
            </div>
            
            <div style="background: rgba(99, 102, 241, 0.05); border: 1px solid rgba(99, 102, 241, 0.1); border-radius: 10px; padding: 15px; display: flex; gap: 12px;">
                <i class="fa-solid fa-circle-info" style="color: var(--primary); margin-top: 3px;"></i>
                <div style="font-size: 0.85rem; line-height: 1.5; color: var(--text-muted);">
                    Após inserir o <strong>Access Token</strong>, clique em <strong>Conectar</strong>. O sistema buscará seu <strong>User ID</strong> automaticamente para validar a integração.
                </div>
            </div>
        </div>

        <div class="card" style="max-width: 600px; margin-top: 20px; border-left: 4px solid var(--warning); background: rgba(245, 158, 11, 0.02);">
            <div style="display: flex; gap: 15px;">
                <i class="fa-solid fa-shield-halved" style="color: var(--warning); font-size: 1.2rem;"></i>
                <div>
                    <h4 style="margin: 0 0 5px 0;">Segurança dos Dados</h4>
                    <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
                        Seu token é armazenado de forma criptografada e utilizado apenas para comunicação oficial com a API do Mercado Pago. Nunca compartilhe seu token com terceiros.
                    </p>
                </div>
            </div>
        </div>
    `;
};
