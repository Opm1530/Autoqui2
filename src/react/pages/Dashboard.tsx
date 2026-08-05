import { useEffect, useState } from 'react';
import { dbService } from '../../services/db';
import { useAuth } from '../useAuth';

export function Dashboard() {
  const { user } = useAuth();
  const [companyName, setCompanyName] = useState<string>('');

  useEffect(() => {
    if (!user?.companyId) return;
    dbService.get('companies', user.companyId).then((c: any) => {
      setCompanyName(c?.name || c?.nome || '');
    });
  }, [user?.companyId]);

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Bem-vindo{companyName ? `, ${companyName}` : ''}!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Esta é a nova interface (React) — em migração.
          </p>
        </div>
      </div>

      <div className="card glass" style={{ padding: '2rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fa-solid fa-circle-check" style={{ color: '#34d399', fontSize: '1.4rem' }} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Fundação React no ar</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>
              Roteador, shell e autenticação funcionando — reaproveitando os serviços existentes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
