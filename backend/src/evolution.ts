// Envio de WhatsApp pela Evolution API — agora SERVER-SIDE.
// A chave vem do ambiente e nunca é exposta ao navegador.

import { EVOLUTION_API_URL, EVOLUTION_API_KEY } from './config.js';

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
      headers: {
        'Content-Type': 'application/json',
        apikey: EVOLUTION_API_KEY,
      },
      body: JSON.stringify({
        number: cleanNumber,
        text,
        delay: 1200,
        linkPreview: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('[evolution] Send Text Error:', response.status, error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('[evolution] Send Text Exception:', error);
    return false;
  }
}
