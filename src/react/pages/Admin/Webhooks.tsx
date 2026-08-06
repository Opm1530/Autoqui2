import { useEffect, useState } from 'react';
import { dbService } from '../../../services/db';
import { adminApi } from '../../../services/adminApi';
import { toast } from '../../../services/toast';

const FIELDS = [
  { key: 'atendimento', label: 'IA de Atendimento' },
  { key: 'agendamento', label: 'IA de Agendamento' },
  { key: 'venda', label: 'IA de Venda' },
  { key: 'disparo', label: 'Disparo em Massa' },
] as const;

export function Webhooks() {
  const [values, setValues] = useState<Record<string, string>>({ atendimento: '', agendamento: '', venda: '', disparo: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try { const d = (await dbService.get('settings', 'webhooks')) as any; if (d) setValues((v) => ({ ...v, ...d })); } catch (e) { console.error(e); }
    })();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.saveWebhooks(values);
      toast.success('Webhooks atualizados com sucesso!');
    } catch (err: any) { toast.error('Erro ao salvar: ' + (err.message || err)); }
    finally { setSaving(false); }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', width: '100%' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 2rem', textAlign: 'center' }}>Configuração de Webhooks (Global)</h2>
      <div className="card" style={{ width: '100%', maxWidth: 600 }}>
        <div style={{ padding: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem', textAlign: 'center' }}>
            Configure as URLs dos webhooks chamados por cada módulo. Estas configurações são globais e afetam todos os clientes.
          </p>
          <form onSubmit={save}>
            {FIELDS.map((f) => (
              <div key={f.key} className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{f.label}</label>
                <input type="url" value={values[f.key]} onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                  placeholder={`https://seu-webhook.com/${f.key}`} style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--surface-hover)', color: 'var(--text-main)' }} />
              </div>
            ))}
            <button type="submit" className="btn-primary" disabled={saving} style={{ padding: '1rem 2rem' }}>
              {saving ? <><i className="fa-solid fa-circle-notch fa-spin" /> Salvando...</> : <><i className="fa-solid fa-save" style={{ marginRight: 8 }} /> Salvar Configurações</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
