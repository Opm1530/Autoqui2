// Resolve o usuário logado a partir do uid do token.
//
// O admin da plataforma pode não ter documento em `users` — o frontend sempre o
// reconheceu pelo e-mail (bypass de bootstrap em services/auth.ts). O backend
// segue a MESMA regra: sem doc, consulta o e-mail no Firebase Auth e, se for um
// e-mail de admin, devolve um usuário admin. Sem isso, toda ação de admin falha
// com user_not_found.
import { getAuth } from 'firebase-admin/auth';
import { getDoc } from './firebase.js';
import { ADMIN_EMAILS } from './config.js';

const isAdminEmail = (email?: string | null) =>
  !!email && ADMIN_EMAILS.includes(email.toLowerCase());

export async function loadUser(uid: string): Promise<any> {
  const doc = await getDoc('users', uid);
  if (doc) {
    // E-mail de admin prevalece sobre o role gravado no doc.
    return isAdminEmail(doc.email) ? { ...doc, role: 'admin' } : doc;
  }
  try {
    const authUser = await getAuth().getUser(uid);
    if (isAdminEmail(authUser.email)) {
      return { uid, email: authUser.email, role: 'admin' };
    }
  } catch {
    /* usuário sem registro no Auth — cai no erro abaixo */
  }
  throw new Error('user_not_found');
}
