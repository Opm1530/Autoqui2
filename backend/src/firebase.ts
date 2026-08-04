// Inicializa o Firebase Admin SDK.
// Usa a service account apontada por GOOGLE_APPLICATION_CREDENTIALS.
// O Admin SDK ignora as regras do Firestore — por isso a credencial fica SÓ no servidor.

import { initializeApp, applicationDefault, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (getApps().length === 0) {
  initializeApp({ credential: applicationDefault() });
}

export const db = getFirestore();

// Helper: getAll com um ou vários filtros { field, operator, value }.
// Mesma assinatura do dbService do frontend, pra portar a lógica sem reescrever.
type Filter = { field: string; operator: FirebaseFirestore.WhereFilterOp; value: unknown };

export async function getAll(
  collection: string,
  filters?: Filter | Filter[]
): Promise<any[]> {
  let query: FirebaseFirestore.Query = db.collection(collection);
  const list = Array.isArray(filters) ? filters : filters ? [filters] : [];
  for (const f of list) {
    query = query.where(f.field, f.operator, f.value as any);
  }
  const snap = await query.get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getDoc(collection: string, id: string): Promise<any | null> {
  const snap = await db.collection(collection).doc(id).get();
  return snap.exists ? { id: snap.id, ...snap.data() } : null;
}
