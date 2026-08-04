// Cliente do backend para gestão de produtos (autenticado com o ID token).
import { API_BASE_URL } from './api';
import { auth } from '../firebase/config';

async function authFetch(path: string, body: any) {
    const user = auth.currentUser;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (user) {
        try { headers['Authorization'] = `Bearer ${await user.getIdToken()}`; } catch { /* ignore */ }
    }
    const resp = await fetch(`${API_BASE_URL}${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) throw new Error(data.error || 'erro_produto');
    return data;
}

export const productsApi = {
    // Cria (sem id) ou atualiza (com id). Retorna { id }.
    save: (data: any, id?: string, companyId?: string) =>
        authFetch('/api/products/save', { id, data, companyId }),
    delete: (id: string) => authFetch('/api/products/delete', { id }),
    updateFields: (id: string, fields: Record<string, any>) =>
        authFetch('/api/products/update-fields', { id, fields }),
};
