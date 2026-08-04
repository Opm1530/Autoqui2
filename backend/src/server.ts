import express from 'express';
import cors from 'cors';
import { PORT, ALLOWED_ORIGINS } from './config.js';
import { notifyNewOrder, notifyStatusChange } from './notify.js';

const app = express();

app.use(express.json({ limit: '256kb' }));
app.use(
  cors({
    origin(origin, cb) {
      // Permite requisições sem Origin (curl/health) e as origens autorizadas.
      if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      cb(new Error('Origin não permitida'));
    },
  })
);

// Healthcheck
app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

// Notificação de novo pedido.
// O cliente manda só { orderId }. O servidor lê o pedido no Firestore e resolve
// instância, telefone e mensagem — nada disso vem do navegador.
app.post('/api/notify-order', async (req, res) => {
  const orderId = String(req.body?.orderId || '').trim();
  if (!orderId) return res.status(400).json({ error: 'orderId obrigatório' });

  try {
    const result = await notifyNewOrder(orderId);
    console.log(
      `[notify-order] ${orderId} -> ${result.sent ? 'ENVIADO' : 'nao (' + result.reason + ')'}`
    );
    return res.json(result);
  } catch (err: any) {
    console.error('[notify-order] erro:', err?.message || err);
    return res.status(500).json({ error: 'internal_error' });
  }
});

// Notificação de mudança de status (aceitar, pronto, saiu, finalizado, cancelado).
// O painel manda { orderId, newStatus, prevStatus?, reason? }. O servidor lê o
// pedido, monta a mensagem certa e envia pela Evolution.
app.post('/api/notify-status', async (req, res) => {
  const orderId = String(req.body?.orderId || '').trim();
  const newStatus = String(req.body?.newStatus || '').trim();
  const prevStatus = req.body?.prevStatus ? String(req.body.prevStatus) : undefined;
  const reason = req.body?.reason ? String(req.body.reason) : undefined;

  if (!orderId || !newStatus) {
    return res.status(400).json({ error: 'orderId e newStatus obrigatórios' });
  }

  try {
    const result = await notifyStatusChange(orderId, newStatus as any, prevStatus, reason);
    console.log(
      `[notify-status] ${orderId} ${newStatus} -> ${result.sent ? 'ENVIADO' : 'nao (' + result.reason + ')'}`
    );
    return res.json(result);
  } catch (err: any) {
    console.error('[notify-status] erro:', err?.message || err);
    return res.status(500).json({ error: 'internal_error' });
  }
});

app.listen(PORT, () => {
  console.log(`[autoqui-backend] ouvindo na porta ${PORT}`);
});
