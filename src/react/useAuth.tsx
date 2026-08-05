// Hook de autenticação para o React — envolve o authService (vanilla) e expõe
// o usuário atual de forma reativa. Reaproveita 100% a lógica de auth existente.
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/auth';
import type { AppUser } from '../services/auth';

interface AuthState {
  user: AppUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthState>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });

  useEffect(() => {
    const unsub = authService.subscribe((user) => {
      setState({ user, loading: false });
    });
    return unsub;
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
