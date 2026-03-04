import { EVOLUTION_API_URL, EVOLUTION_API_KEY } from '../services/evolutionApi';

export const QRPage = async (instanceName: string) => {
    // Logic to run after render
    setTimeout(() => {
        const qrContainer = document.getElementById('remote-qrcode');
        const activeContent = document.getElementById('qr-content-active');
        const successContent = document.getElementById('qr-content-success');

        if (!qrContainer) return;

        let qrInterval: any = null;
        let statusInterval: any = null;

        const stopPolling = () => {
            if (qrInterval) clearInterval(qrInterval);
            if (statusInterval) clearInterval(statusInterval);
        };

        const fetchQR = async () => {
            try {
                const response = await fetch(`${EVOLUTION_API_URL}/instance/connect/${instanceName}`, {
                    headers: { 'apikey': EVOLUTION_API_KEY }
                });
                const result = await response.json();

                if (result && (result.base64 || result.qrcode?.base64)) {
                    const b64 = result.base64 || result.qrcode.base64;
                    qrContainer.innerHTML = `<img src="${b64}" style="width: 250px; height: 250px; display: block; border-radius: 8px;">`;
                } else {
                    const statusResp = await fetch(`${EVOLUTION_API_URL}/instance/connectionState/${instanceName}`, {
                        headers: { 'apikey': EVOLUTION_API_KEY }
                    });
                    const status = await statusResp.json();
                    if (status.instance?.state === 'open' || status.state === 'open') {
                        handleConnected();
                    }
                }
            } catch (e) {
                console.error('Error fetching QR:', e);
            }
        };

        const checkStatus = async () => {
            try {
                const statusResp = await fetch(`${EVOLUTION_API_URL}/instance/connectionState/${instanceName}`, {
                    headers: { 'apikey': EVOLUTION_API_KEY }
                });
                const status = await statusResp.json();
                if (status.instance?.state === 'open' || status.state === 'open') {
                    handleConnected();
                }
            } catch (e) {
                console.error('Error checking status:', e);
            }
        };

        const handleConnected = () => {
            stopPolling();
            if (activeContent) activeContent.style.display = 'none';
            if (successContent) successContent.style.display = 'flex';
        };

        fetchQR();
        qrInterval = setInterval(fetchQR, 40000);
        statusInterval = setInterval(checkStatus, 3000);

        // Cleanup if user leaves (SPA)
        const checkLeave = setInterval(() => {
            if (!document.getElementById('remote-qrcode')) {
                stopPolling();
                clearInterval(checkLeave);
            }
        }, 1000);

    }, 100);

    return `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
            
            :root {
                --primary: #6366f1;
                --primary-glow: rgba(99, 102, 241, 0.3);
                --bg: #0f172a;
                --glass: rgba(255, 255, 255, 0.05);
                --text: #ffffff;
                --text-muted: #94a3b8;
            }

            .qr-body {
                background: var(--bg);
                color: var(--text);
                font-family: 'Outfit', sans-serif;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0;
                background-image: 
                    radial-gradient(circle at 0% 0%, var(--primary-glow) 0%, transparent 40%),
                    radial-gradient(circle at 100% 100%, var(--primary-glow) 0%, transparent 40%);
            }

            .qr-card {
                background: var(--glass);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 32px;
                padding: 3rem;
                width: 100%;
                max-width: 480px;
                text-align: center;
                box-shadow: 0 40px 100px rgba(0,0,0,0.5);
                animation: scaleUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
            }

            @keyframes scaleUp {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }

            .qr-icon {
                font-size: 3rem;
                margin-bottom: 1.5rem;
                color: var(--primary);
                display: inline-block;
                animation: float 3s ease-in-out infinite;
            }

            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }

            h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; letter-spacing: -1px; }
            p { color: var(--text-muted); margin-bottom: 2.5rem; line-height: 1.6; }

            .qrcode-container {
                background: white;
                padding: 20px;
                border-radius: 20px;
                display: inline-block;
                margin-bottom: 2.5rem;
                box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                min-width: 250px;
                min-height: 250px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .status-indicator {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                font-size: 0.9rem;
                font-weight: 600;
                color: var(--text-muted);
            }

            .pulse {
                width: 8px;
                height: 8px;
                background: var(--primary);
                border-radius: 50%;
                display: inline-block;
                box-shadow: 0 0 0 var(--primary-glow);
                animation: pulse-ring 1.5s infinite;
            }

            @keyframes pulse-ring {
                0% { transform: scale(0.95); box-shadow: 0 0 0 0 var(--primary-glow); }
                70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
                100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
            }

            .success-message {
                display: none;
                flex-direction: column;
                align-items: center;
                gap: 15px;
            }

            .success-icon {
                width: 80px;
                height: 80px;
                background: #10b981;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 2.5rem;
                margin-bottom: 1rem;
                box-shadow: 0 15px 30px rgba(16, 185, 129, 0.3);
            }
        </style>

        <div class="qr-body">
            <div class="qr-card">
                <div id="qr-content-active">
                    <div class="qr-icon"><i class="fa-solid fa-qrcode"></i></div>
                    <h1>Conectar WhatsApp</h1>
                    <p>Escaneie o QR Code abaixo com o seu WhatsApp para ativar a integração.</p>
                    
                    <div class="qrcode-container" id="remote-qrcode">
                        <i class="fa-solid fa-spinner fa-spin fa-3x" style="color: var(--bg);"></i>
                    </div>

                    <div class="status-indicator">
                        <span class="pulse"></span>
                        Aguardando leitura do QR Code...
                    </div>
                </div>

                <div id="qr-content-success" class="success-message">
                    <div class="success-icon">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <h1 style="color: #10b981;">Conectado!</h1>
                    <p>O WhatsApp foi vinculado com sucesso. Você já pode fechar esta página.</p>
                </div>
            </div>
        </div>
    `;
};
