import { authService } from '../services/auth';
import { toast } from '../services/toast';
import { confirm } from '../services/confirm';
import { API_BASE_URL } from '../services/api';
import { auth } from '../firebase/config';

async function authHeaders(): Promise<Record<string, string>> {
    const h: Record<string, string> = { 'Content-Type': 'application/json' };
    const user = auth.currentUser;
    if (user) {
        try { h['Authorization'] = `Bearer ${await user.getIdToken()}`; } catch { /* ignore */ }
    }
    return h;
}

export const MercadoPago = async () => {
    const user = authService.getCurrentUser();
    if (!user || !user.companyId) return '<p>Acesso negado.</p>';

    // Estado vem do backend (o token NÃO volta pro cliente).
    let connected = false;
    let currentUserId = '';
    try {
        const resp = await fetch(`${API_BASE_URL}/api/mp/status`, { headers: await authHeaders() });
        const data = await resp.json().catch(() => ({}));
        connected = !!data.connected;
        currentUserId = data.userId || '';
    } catch { /* mostra como desconectado */ }

    (window as any).disconnectMercadoPago = async () => {
        const ok = await confirm.danger('Desativar Integração', 'Tem certeza que deseja desativar o Mercado Pago? Isso removerá o token de acesso.');
        if (!ok) return;
        const btn = document.getElementById('btn-disconnect-mp') as HTMLButtonElement;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        try {
            const resp = await fetch(`${API_BASE_URL}/api/mp/disconnect`, { method: 'POST', headers: await authHeaders() });
            if (!resp.ok) throw new Error('Falha ao desativar.');
            toast.success('Integração desativada.');
            setTimeout(() => window.location.reload(), 1000);
        } catch (error: any) {
            toast.error('Erro ao desativar: ' + error.message);
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-plug-circle-xmark"></i> <span>Desativar</span>';
        }
    };

    (window as any).connectMercadoPago = async () => {
        const tokenInput = document.getElementById('mp-token-input') as HTMLInputElement;
        const btn = document.getElementById('btn-connect-mp') as HTMLButtonElement;
        const token = tokenInput.value.trim();
        if (!token) { toast.warning('Insira o Access Token primeiro.'); return; }

        btn.disabled = true;
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Conectando...</span>';
        try {
            const resp = await fetch(`${API_BASE_URL}/api/mp/connect`, {
                method: 'POST',
                headers: await authHeaders(),
                body: JSON.stringify({ accessToken: token }),
            });
            const data = await resp.json().catch(() => ({}));
            if (!resp.ok) throw new Error(data.error === 'token_invalido' ? 'Token inválido. Confira e tente de novo.' : 'Falha ao conectar.');
            toast.success('Integração conectada com sucesso!');
            setTimeout(() => window.location.reload(), 1200);
        } catch (error: any) {
            toast.error('Erro na conexão: ' + error.message);
            btn.disabled = false;
            btn.innerHTML = original;
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
                    <p style="margin: 0; color: var(--text-dim); font-size: 0.85rem;">Conecte sua conta para aceitar Pix.</p>
                </div>
            </div>

            ${connected ? `
                <div style="background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.25); border-radius: 12px; padding: 18px; display:flex; align-items:center; justify-content:space-between; gap:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <i class="fa-solid fa-circle-check" style="color:#34d399; font-size:1.4rem;"></i>
                        <div>
                            <div style="font-weight:700; color:#34d399;">Conectado</div>
                            <div style="font-size:0.8rem; color:var(--text-muted); font-family:monospace;">User ID: ${currentUserId || '—'}</div>
                        </div>
                    </div>
                    <button id="btn-disconnect-mp" onclick="window.disconnectMercadoPago()" style="display: flex; align-items: center; gap: 8px; padding: 0 22px; height: 44px; border-radius: 10px; font-weight: 600; background: #ef4444; color: white; border: none; cursor: pointer;">
                        <i class="fa-solid fa-plug-circle-xmark"></i> <span>Desativar</span>
                    </button>
                </div>
            ` : `
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 10px; font-weight: 600; color: var(--text-main);">Access Token (Produção)</label>
                    <div style="position: relative;">
                        <input type="password" id="mp-token-input" class="input-field" placeholder="APP_USR-0000..."
                               style="width: 100%; padding: 14px 45px 14px 16px; background: var(--bg-color); border: 1px solid var(--border-color); color: white; border-radius: 10px; font-family: monospace;">
                        <button type="button" onclick="const i = document.getElementById('mp-token-input'); i.type = i.type === 'password' ? 'text' : 'password';"
                                style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--text-dim); border: none; background: none; cursor: pointer; padding: 5px;">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                    <button id="btn-connect-mp" onclick="window.connectMercadoPago()" style="margin-top:14px; display: flex; align-items: center; gap: 8px; padding: 0 25px; height: 48px; border-radius: 10px; font-weight: 600; background: #009ee3; color:white; border:none; cursor:pointer;">
                        <i class="fa-solid fa-plug"></i> <span>Conectar</span>
                    </button>
                </div>
            `}

            <div style="background: rgba(99, 102, 241, 0.05); border: 1px solid rgba(99, 102, 241, 0.1); border-radius: 10px; padding: 15px; display: flex; gap: 12px; margin-top: 20px;">
                <i class="fa-solid fa-shield-halved" style="color: var(--primary); margin-top: 3px;"></i>
                <div style="font-size: 0.85rem; line-height: 1.5; color: var(--text-muted);">
                    O token é guardado <strong>no servidor</strong>, numa área protegida — nunca fica exposto no navegador nem no catálogo. Usado apenas para comunicação oficial com o Mercado Pago.
                </div>
            </div>
        </div>
    `;
};
