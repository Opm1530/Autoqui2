// Evolution API v2.3.7 Integration
// Documentation: https://doc.evolution-api.com/

export const EVOLUTION_API_URL = 'https://evolution.vps.pequi.digital';
export const EVOLUTION_API_KEY = '1120d381afc6900754fc87d8264ed6335aeab3223b4d24810a17145399c16e46';

interface CreateInstanceResponse {
    instance: {
        instanceName: string;
        status: string;
    };
    qrcode?: {
        base64: string;
        code: string;
    };
}

export const evolutionApi = {
    /**
     * Create a new WhatsApp instance
     */
    async createInstance(instanceName: string): Promise<CreateInstanceResponse> {
        try {
            const response = await fetch(`${EVOLUTION_API_URL}/instance/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': EVOLUTION_API_KEY
                },
                body: JSON.stringify({
                    instanceName: instanceName,
                    qrcode: true,
                    integration: 'WHATSAPP-BAILEYS'
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to create instance');
            }

            return await response.json();
        } catch (error) {
            console.error('Evolution API - Create Instance Error:', error);
            throw error;
        }
    },

    /**
     * Set Webhook for instance
     */
    async setWebhook(instanceName: string, url: string, enabled: boolean = true): Promise<boolean> {
        try {
            const response = await fetch(`${EVOLUTION_API_URL}/webhook/set/${instanceName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': EVOLUTION_API_KEY
                },
                body: JSON.stringify({
                    webhook: {
                        enabled: enabled,
                        url: url,
                        byEvents: false,
                        base64: true,
                        events: [
                            "MESSAGES_UPSERT",
                        ]
                    }
                })
            });

            if (!response.ok) {
                console.error('Evolution API - Set Webhook Error:', await response.text());
                return false;
            }

            return true;
        } catch (error) {
            console.error('Evolution API - Set Webhook Exception:', error);
            return false;
        }
    },

    /**
     * Get instance connection status
     */
    async getInstanceStatus(instanceName: string): Promise<{ state: string; connected: boolean }> {
        try {
            const response = await fetch(`${EVOLUTION_API_URL}/instance/connectionState/${instanceName}`, {
                method: 'GET',
                headers: {
                    'apikey': EVOLUTION_API_KEY
                }
            });

            if (!response.ok) {
                throw new Error('Failed to get instance status');
            }

            const data = await response.json();
            return {
                state: data.state || data.instance?.state || 'close',
                connected: data.state === 'open' || data.instance?.state === 'open'
            };
        } catch (error) {
            console.error('Evolution API - Get Status Error:', error);
            return { state: 'close', connected: false };
        }
    },

    /**
     * Get QR Code for instance connection
     */
    async getQRCode(instanceName: string): Promise<{ base64: string } | null> {
        try {
            const response = await fetch(`${EVOLUTION_API_URL}/instance/connect/${instanceName}`, {
                method: 'GET',
                headers: {
                    'apikey': EVOLUTION_API_KEY
                }
            });

            if (!response.ok) {
                throw new Error('Failed to get QR code');
            }

            const data = await response.json();

            // Evolution API v2 returns QR in different formats
            if (data.qrcode?.base64) {
                return { base64: data.qrcode.base64 };
            } else if (data.base64) {
                return { base64: data.base64 };
            }

            return null;
        } catch (error) {
            console.error('Evolution API - Get QR Code Error:', error);
            return null;
        }
    },

    /**
     * Delete an instance
     */
    async deleteInstance(instanceName: string): Promise<boolean> {
        try {
            const response = await fetch(`${EVOLUTION_API_URL}/instance/delete/${instanceName}`, {
                method: 'DELETE',
                headers: {
                    'apikey': EVOLUTION_API_KEY
                }
            });

            return response.ok;
        } catch (error) {
            console.error('Evolution API - Delete Instance Error:', error);
            return false;
        }
    },

    /**
     * Logout from instance (disconnect WhatsApp)
     */
    async logoutInstance(instanceName: string): Promise<boolean> {
        try {
            const response = await fetch(`${EVOLUTION_API_URL}/instance/logout/${instanceName}`, {
                method: 'DELETE',
                headers: {
                    'apikey': EVOLUTION_API_KEY
                }
            });

            return response.ok;
        } catch (error) {
            console.error('Evolution API - Logout Instance Error:', error);
            return false;
        }
    },

    /**
     * Check if instance exists
     */
    async instanceExists(instanceName: string): Promise<boolean> {
        try {
            const response = await fetch(`${EVOLUTION_API_URL}/instance/fetchInstances`, {
                method: 'GET',
                headers: {
                    'apikey': EVOLUTION_API_KEY
                }
            });

            if (!response.ok) return false;

            const instances = await response.json();
            return Array.isArray(instances) && instances.some((i: any) => i.instance?.instanceName === instanceName);
        } catch (error) {
            console.error('Evolution API - Check Instance Exists Error:', error);
            return false;
        }
    },

    /**
     * Send a text message
     */
    async sendText(instanceName: string, number: string, text: string): Promise<boolean> {
        try {
            // Ensure number is in correct format (remove special characters, add 55 prefix if missing)
            let cleanNumber = number.replace(/\D/g, '');
            if (cleanNumber.length <= 11 && !cleanNumber.startsWith('55')) {
                cleanNumber = '55' + cleanNumber;
            }
            const remoteJid = cleanNumber;

            const response = await fetch(`${EVOLUTION_API_URL}/message/sendText/${instanceName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': EVOLUTION_API_KEY
                },
                body: JSON.stringify({
                    number: remoteJid,
                    text: text,
                    delay: 1200,
                    linkPreview: true
                })
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Evolution API - Send Text Error:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Evolution API - Send Text Exception:', error);
            return false;
        }
    }
};
