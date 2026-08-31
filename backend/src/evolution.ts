// Todas as chamadas à Evolution API — SERVER-SIDE.
// A chave vem do ambiente e nunca é exposta ao navegador.

import { EVOLUTION_API_URL, EVOLUTION_API_KEY } from './config.js';

function headers(json = false): Record<string, string> {
  const h: Record<string, string> = { apikey: EVOLUTION_API_KEY };
  if (json) h['Content-Type'] = 'application/json';
  return h;
}

export async function sendText(
  instanceName: string,
  number: string,
  text: string
): Promise<boolean> {
  try {
    let cleanNumber = number.replace(/\D/g, '');
    if (cleanNumber.length <= 11 && !cleanNumber.startsWith('55')) {
      cleanNumber = '55' + cleanNumber;
    }
    const response = await fetch(`${EVOLUTION_API_URL}/message/sendText/${instanceName}`, {
      method: 'POST',
      headers: headers(true),
      body: JSON.stringify({ number: cleanNumber, text, delay: 1200, linkPreview: true }),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('[evolution] sendText erro:', response.status, error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('[evolution] sendText exceção:', error);
    return false;
  }
}

// Envia texto para um grupo (JID xxxx@g.us). Não limpa o número como o sendText.
export async function sendToGroup(instanceName: string, groupJid: string, text: string): Promise<boolean> {
  try {
    const response = await fetch(`${EVOLUTION_API_URL}/message/sendText/${instanceName}`, {
      method: 'POST',
      headers: headers(true),
      body: JSON.stringify({ number: groupJid, text, delay: 1200, linkPreview: true }),
    });
    if (!response.ok) { console.error('[evolution] sendToGroup erro:', response.status); return false; }
    return true;
  } catch (error) {
    console.error('[evolution] sendToGroup exceção:', error);
    return false;
  }
}

// Lista os grupos de uma instância (sem participantes, mais leve).
export async function fetchGroups(instanceName: string): Promise<{ id: string; subject: string; size?: number }[]> {
  try {
    const response = await fetch(`${EVOLUTION_API_URL}/group/fetchAllGroups/${instanceName}?getParticipants=false`, {
      method: 'GET', headers: headers(true),
    });
    if (!response.ok) return [];
    const data = await response.json().catch(() => []);
    const arr = Array.isArray(data) ? data : (data?.groups || []);
    return arr.map((g: any) => ({ id: g.id || g.jid || '', subject: g.subject || g.name || '(sem nome)', size: g.size || g.participants?.length })).filter((g: any) => g.id);
  } catch (error) {
    console.error('[evolution] fetchGroups exceção:', error);
    return [];
  }
}

// Participantes de um grupo (números). Usado para extrair leads do grupo.
export async function fetchGroupParticipants(instanceName: string, groupJid: string): Promise<{ phone: string; name?: string }[]> {
  try {
    const response = await fetch(`${EVOLUTION_API_URL}/group/participants/${instanceName}?groupJid=${encodeURIComponent(groupJid)}`, {
      method: 'GET', headers: headers(true),
    });
    if (!response.ok) return [];
    const data = await response.json().catch(() => ({}));
    const arr = Array.isArray(data?.participants) ? data.participants : Array.isArray(data) ? data : [];
    return arr.map((p: any) => ({ phone: String(p.id || p.jid || '').split('@')[0], name: p.name || p.pushName || undefined })).filter((p: any) => p.phone);
  } catch (error) {
    console.error('[evolution] fetchGroupParticipants exceção:', error);
    return [];
  }
}

// Todos os contatos salvos na conta (agenda do WhatsApp).
export async function fetchAllContacts(instanceName: string): Promise<{ phone: string; name?: string }[]> {
  try {
    const response = await fetch(`${EVOLUTION_API_URL}/chat/findContacts/${instanceName}`, {
      method: 'POST', headers: headers(true), body: JSON.stringify({ where: {} }),
    });
    if (!response.ok) return [];
    const data = await response.json().catch(() => []);
    const arr = Array.isArray(data) ? data : (data?.contacts || []);
    return arr
      .map((c: any) => ({ phone: String(c.id || c.remoteJid || c.jid || '').split('@')[0], name: c.pushName || c.name || undefined }))
      .filter((c: any) => c.phone && /^\d{8,15}$/.test(c.phone)); // ignora JIDs de grupo/serviço
  } catch (error) {
    console.error('[evolution] fetchAllContacts exceção:', error);
    return [];
  }
}

export async function createInstance(instanceName: string): Promise<any> {
  const response = await fetch(`${EVOLUTION_API_URL}/instance/create`, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify({ instanceName, qrcode: true, integration: 'WHATSAPP-BAILEYS' }),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Falha ao criar instância');
  }
  return response.json();
}

export async function setWebhook(
  instanceName: string,
  url: string,
  enabled = true
): Promise<boolean> {
  try {
    const response = await fetch(`${EVOLUTION_API_URL}/webhook/set/${instanceName}`, {
      method: 'POST',
      headers: headers(true),
      body: JSON.stringify({
        webhook: { enabled, url, byEvents: false, base64: true, events: ['MESSAGES_UPSERT'] },
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('[evolution] setWebhook exceção:', error);
    return false;
  }
}

export async function getInstanceStatus(
  instanceName: string
): Promise<{ state: string; connected: boolean }> {
  try {
    const response = await fetch(
      `${EVOLUTION_API_URL}/instance/connectionState/${instanceName}`,
      { headers: headers() }
    );
    if (!response.ok) throw new Error('status falhou');
    const data = await response.json();
    const state = data.state || data.instance?.state || 'close';
    return { state, connected: state === 'open' };
  } catch (error) {
    console.error('[evolution] getInstanceStatus erro:', error);
    return { state: 'close', connected: false };
  }
}

export async function getQRCode(instanceName: string): Promise<{ base64: string } | null> {
  try {
    const response = await fetch(`${EVOLUTION_API_URL}/instance/connect/${instanceName}`, {
      headers: headers(),
    });
    if (!response.ok) throw new Error('qrcode falhou');
    const data = await response.json();
    if (data.qrcode?.base64) return { base64: data.qrcode.base64 };
    if (data.base64) return { base64: data.base64 };
    return null;
  } catch (error) {
    console.error('[evolution] getQRCode erro:', error);
    return null;
  }
}

export async function deleteInstance(instanceName: string): Promise<boolean> {
  try {
    const response = await fetch(`${EVOLUTION_API_URL}/instance/delete/${instanceName}`, {
      method: 'DELETE',
      headers: headers(),
    });
    return response.ok;
  } catch (error) {
    console.error('[evolution] deleteInstance erro:', error);
    return false;
  }
}

export async function logoutInstance(instanceName: string): Promise<boolean> {
  try {
    const response = await fetch(`${EVOLUTION_API_URL}/instance/logout/${instanceName}`, {
      method: 'DELETE',
      headers: headers(),
    });
    return response.ok;
  } catch (error) {
    console.error('[evolution] logoutInstance erro:', error);
    return false;
  }
}

export async function instanceExists(instanceName: string): Promise<boolean> {
  try {
    const response = await fetch(`${EVOLUTION_API_URL}/instance/fetchInstances`, {
      headers: headers(),
    });
    if (!response.ok) return false;
    const instances = await response.json();
    return (
      Array.isArray(instances) &&
      instances.some(
        (i: any) => i.instance?.instanceName === instanceName || i.name === instanceName
      )
    );
  } catch (error) {
    console.error('[evolution] instanceExists erro:', error);
    return false;
  }
}
