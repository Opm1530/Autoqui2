// Gestão de produtos — SERVER-SIDE (autenticado).
// Cada operação confere que o produto pertence à empresa do usuário logado,
// então um dono não mexe nos produtos de outra empresa.

import { getDoc, db } from './firebase.js';

async function getUser(uid: string): Promise<any> {
  const user = await getDoc('users', uid);
  if (!user) throw new Error('user_not_found');
  return user;
}

// Resolve a empresa que o usuário pode operar. Admin pode passar companyId; os
// demais são forçados à própria empresa.
function resolveCompanyId(user: any, requested?: string): string {
  const isAdmin = user.role === 'admin';
  const companyId = isAdmin && requested ? requested : user.companyId;
  if (!companyId) throw new Error('no_company');
  return companyId;
}

async function assertOwnership(user: any, productId: string): Promise<any> {
  const existing = await getDoc('products', productId);
  if (!existing) throw new Error('not_found');
  if (user.role !== 'admin' && existing.companyId !== user.companyId) {
    throw new Error('forbidden');
  }
  return existing;
}

// Cria (sem id) ou atualiza (com id) um produto. O companyId é imposto pelo
// servidor — o cliente não escolhe de quem é o produto.
export async function saveProduct(
  uid: string,
  payload: { id?: string; data: any; companyId?: string }
): Promise<{ id: string }> {
  const user = await getUser(uid);
  const data = { ...(payload.data || {}) };
  delete data.id;

  if (payload.id) {
    await assertOwnership(user, payload.id);
    // Não deixa trocar a empresa do produto num update.
    delete data.companyId;
    await db.collection('products').doc(payload.id).update(data);
    return { id: payload.id };
  }

  data.companyId = resolveCompanyId(user, payload.companyId);
  const ref = await db.collection('products').add(data);
  return { id: ref.id };
}

export async function deleteProduct(uid: string, id: string): Promise<{ ok: boolean }> {
  const user = await getUser(uid);
  await assertOwnership(user, id);
  await db.collection('products').doc(id).delete();
  return { ok: true };
}

// Atualização de campos restritos (ativar/desativar, categoria, estoque).
const ALLOWED_FIELDS = new Set(['active', 'categoryId', 'stock']);
export async function updateProductFields(
  uid: string,
  id: string,
  fields: Record<string, any>
): Promise<{ ok: boolean }> {
  const user = await getUser(uid);
  await assertOwnership(user, id);
  const clean: Record<string, any> = {};
  for (const [k, v] of Object.entries(fields || {})) {
    if (ALLOWED_FIELDS.has(k)) clean[k] = v;
  }
  if (Object.keys(clean).length === 0) throw new Error('no_valid_fields');
  await db.collection('products').doc(id).update(clean);
  return { ok: true };
}
