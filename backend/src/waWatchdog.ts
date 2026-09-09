// Watchdog de instâncias de WhatsApp (Evolution).
// Problema histórico: "instância zumbi" — a sessão cai e o disparo/atendimento
// para em silêncio. Este job verifica todas as instâncias a cada 5 min e:
//   1. Se está conectada → limpa qualquer flag de queda.
//   2. Se caiu → tenta reconectar sozinho (restart), contando as tentativas.
//   3. Se não voltar após ~30 min de tentativas → marca `precisaReconectar`
//      (o painel mostra o aviso pro dono ler o QR de novo) e para de insistir.
import cron from 'node-cron';
import { Timestamp } from 'firebase-admin/firestore';
import { getAll, db } from './firebase.js';
import { getInstanceStatus, restartInstance } from './evolution.js';

const MAX_TENTATIVAS = 6;              // ~30 min de tentativas (1 a cada verificação de 5 min)
const now = () => Timestamp.now();

async function verificarInstancias() {
  const insts = await getAll('instancias', []).catch(() => []) as any[];
  for (const inst of insts) {
    if (!inst?.nome) continue;
    const ref = db.collection('instancias').doc(inst.id);
    let st: { state: string; connected: boolean };
    try { st = await getInstanceStatus(inst.nome); } catch { continue; }

    // Conectada: se estava marcada como caída, limpa tudo.
    if (st.connected) {
      if (inst.desconectadoDesde || inst.precisaReconectar || inst.reconnectTentativas) {
        await ref.update({ desconectadoDesde: null, precisaReconectar: false, reconnectTentativas: 0, ultimaVerificacao: now() }).catch(() => {});
      } else {
        await ref.update({ ultimaVerificacao: now() }).catch(() => {});
      }
      continue;
    }

    // 'connecting' = já está tentando parear; não mexe.
    if (st.state === 'connecting') { await ref.update({ ultimaVerificacao: now() }).catch(() => {}); continue; }

    // Caiu. Conta a tentativa e tenta reconectar (até o teto).
    const tentativas = Number(inst.reconnectTentativas || 0);
    const desde = inst.desconectadoDesde || now();
    const patch: any = { desconectadoDesde: desde, ultimaVerificacao: now() };

    if (tentativas < MAX_TENTATIVAS) {
      const ok = await restartInstance(inst.nome).catch(() => false);
      patch.reconnectTentativas = tentativas + 1;
      console.warn(`[wa-watchdog] ${inst.nome} caiu (state=${st.state}) — restart ${ok ? 'ok' : 'falhou'} (tentativa ${tentativas + 1}/${MAX_TENTATIVAS})`);
    } else if (!inst.precisaReconectar) {
      // Esgotou as tentativas: provavelmente deslogou de vez → precisa de novo QR.
      patch.precisaReconectar = true;
      patch.alertadoEm = now();
      console.error(`[wa-watchdog] ${inst.nome} nao reconectou apos ${MAX_TENTATIVAS} tentativas — marcado para reconexao manual (QR).`);
    }
    await ref.update(patch).catch(() => {});
  }
}

export function startWaWatchdog() {
  cron.schedule('*/5 * * * *', () => verificarInstancias().catch((e) => console.error('[wa-watchdog]', e?.message)));
  console.log('[wa-watchdog] iniciado (verificacao de instancias a cada 5 min)');
}
