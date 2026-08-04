// Cliente fino da Evolution — agora fala com o BACKEND (api.autoqui.com.br),
// não mais com a Evolution direto. A chave da Evolution não fica mais no bundle.
// As assinaturas dos métodos são as mesmas de antes (os call sites não mudam).

import { API_BASE_URL } from './api';
import { auth } from '../firebase/config';

interface CreateInstanceResponse {
    instance: { instanceName: string; status: string };
    qrcode?: { base64: string; code: string };
}

// Anexa o ID token do Firebase quando há usuário logado (endpoints de gestão).
async function authHeaders(json = false): Promise<Record<string, string>> {
    const h: Record<string, string> = {};
    if (json) h['Content-Type'] = 'application/json';
    const user = auth.currentUser;
    if (user) {
        try { h['Authorization'] = `Bearer ${await user.getIdToken()}`; } catch { /* ignore */ }
    }
    return h;
}

export const evolutionApi = {
    async createInstance(instanceName: string): Promise<CreateInstanceResponse> {
        const resp = await fetch(`${API_BASE_URL}/api/wa/create-instance`, {
            method: 'POST',
            headers: await authHeaders(true),
            body: JSON.stringify({ instanceName }),
        });
        if (!resp.ok) {
            const error = await resp.json().catch(() => ({}));
            throw new Error(error.error || 'Falha ao criar instância');
        }
        return resp.json();
    },

    async setWebhook(instanceName: string, url: string, enabled: boolean = true): Promise<boolean> {
        try {
            const resp = await fetch(`${API_BASE_URL}/api/wa/set-webhook`, {
                method: 'POST',
                headers: await authHeaders(true),
                body: JSON.stringify({ instanceName, url, enabled }),
            });
            const data = await resp.json().catch(() => ({}));
            return !!data.ok;
        } catch (error) {
            console.error('Evolution - setWebhook erro:', error);
            return false;
        }
    },

    async getInstanceStatus(instanceName: string): Promise<{ state: string; connected: boolean }> {
        try {
            const resp = await fetch(`${API_BASE_URL}/api/wa/status/${encodeURIComponent(instanceName)}`);
            if (!resp.ok) throw new Error('status falhou');
            return await resp.json();
        } catch (error) {
            console.error('Evolution - getInstanceStatus erro:', error);
            return { state: 'close', connected: false };
        }
    },

    async getQRCode(instanceName: string): Promise<{ base64: string } | null> {
        try {
            const resp = await fetch(`${API_BASE_URL}/api/wa/qrcode/${encodeURIComponent(instanceName)}`);
            if (!resp.ok) throw new Error('qrcode falhou');
            const data = await resp.json();
            return data && data.base64 ? { base64: data.base64 } : null;
        } catch (error) {
            console.error('Evolution - getQRCode erro:', error);
            return null;
        }
    },

    async deleteInstance(instanceName: string): Promise<boolean> {
        try {
            const resp = await fetch(`${API_BASE_URL}/api/wa/instance/${encodeURIComponent(instanceName)}`, {
                method: 'DELETE',
                headers: await authHeaders(),
            });
            const data = await resp.json().catch(() => ({}));
            return !!data.ok;
        } catch (error) {
            console.error('Evolution - deleteInstance erro:', error);
            return false;
        }
    },

    async logoutInstance(instanceName: string): Promise<boolean> {
        try {
            const resp = await fetch(`${API_BASE_URL}/api/wa/logout/${encodeURIComponent(instanceName)}`, {
                method: 'POST',
                headers: await authHeaders(),
            });
            const data = await resp.json().catch(() => ({}));
            return !!data.ok;
        } catch (error) {
            console.error('Evolution - logoutInstance erro:', error);
            return false;
        }
    },

    async instanceExists(instanceName: string): Promise<boolean> {
        try {
            const resp = await fetch(`${API_BASE_URL}/api/wa/instance-exists/${encodeURIComponent(instanceName)}`, {
                headers: await authHeaders(),
            });
            const data = await resp.json().catch(() => ({}));
            return !!data.exists;
        } catch (error) {
            console.error('Evolution - instanceExists erro:', error);
            return false;
        }
    },

    async sendText(instanceName: string, number: string, text: string): Promise<boolean> {
        try {
            const resp = await fetch(`${API_BASE_URL}/api/wa/send-text`, {
                method: 'POST',
                headers: await authHeaders(true),
                body: JSON.stringify({ instanceName, number, text }),
            });
            const data = await resp.json().catch(() => ({}));
            return !!data.sent;
        } catch (error) {
            console.error('Evolution - sendText erro:', error);
            return false;
        }
    },
};
