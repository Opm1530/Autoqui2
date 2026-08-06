import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { evolutionApi } from '../../services/evolutionApi';

export function QRPage() {
  const { instanceName = '' } = useParams();
  const [qrImg, setQrImg] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const qrInterval = useRef<any>(null);
  const statusInterval = useRef<any>(null);

  useEffect(() => {
    if (!instanceName) return;
    let alive = true;
    const stop = () => { clearInterval(qrInterval.current); clearInterval(statusInterval.current); };

    const handleConnected = () => { if (!alive) return; stop(); setConnected(true); };
    const fetchQR = async () => {
      try {
        const qr = await evolutionApi.getQRCode(instanceName);
        if (!alive) return;
        if (qr && qr.base64) setQrImg(qr.base64);
        else { const s = await evolutionApi.getInstanceStatus(instanceName); if (s.connected) handleConnected(); }
      } catch (e) { console.error('Erro ao buscar QR:', e); }
    };
    const checkStatus = async () => {
      try { const s = await evolutionApi.getInstanceStatus(instanceName); if (s.connected) handleConnected(); }
      catch (e) { console.error('Erro ao checar status:', e); }
    };

    fetchQR();
    qrInterval.current = setInterval(fetchQR, 40000);
    statusInterval.current = setInterval(checkStatus, 3000);
    return () => { alive = false; stop(); };
  }, [instanceName]);

  return (
    <div className="qr-page-body">
      <div className="qr-page-card">
        {!connected ? (
          <div>
            <div className="qr-page-icon"><i className="fa-solid fa-qrcode" /></div>
            <h1>Conectar WhatsApp</h1>
            <p>Escaneie o QR Code abaixo com o seu WhatsApp para ativar a integração.</p>
            <div className="qrcode-page-container">
              {qrImg ? <img src={qrImg} style={{ width: 250, height: 250, display: 'block', borderRadius: 8 }} /> : <i className="fa-solid fa-spinner fa-spin fa-3x" style={{ color: '#0f172a' }} />}
            </div>
            <div className="qr-status-indicator"><span className="qr-pulse" /> Aguardando leitura do QR Code...</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15 }}>
            <div className="qr-success-icon"><i className="fa-solid fa-check" /></div>
            <h1 style={{ color: '#10b981' }}>Conectado!</h1>
            <p>O WhatsApp foi vinculado com sucesso. Você já pode fechar esta página.</p>
          </div>
        )}
      </div>
    </div>
  );
}
