// Middleware: exige um ID token válido do Firebase Auth.
// Protege os endpoints de gestão (criar/deletar/logout/webhook/enviar).
// As páginas públicas (QR, status) não usam este middleware.

import type { Request, Response, NextFunction } from 'express';
import { getAuth } from 'firebase-admin/auth';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ error: 'não autenticado' });

  try {
    const decoded = await getAuth().verifyIdToken(token);
    (req as any).uid = decoded.uid;
    next();
  } catch {
    return res.status(401).json({ error: 'token inválido' });
  }
}
