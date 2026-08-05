import { useState } from 'react';
import { DIAS } from './constants';
import { SaveButton } from './SaveButton';

interface DayCfg { ativo: boolean; inicio: string; fim: string; }

function readDay(map: any, key: string): DayCfg {
  const h = map?.[key] || {};
  const ativo = h.ativo ?? h.aberto ?? (key !== 'dom');
  return { ativo, inicio: h.inicio || h.abertura || '08:00', fim: h.fim || h.fechamento || '18:00' };
}

// Bloco de horários (funcionamento ou entrega). `campo` define onde salva.
export function Schedules({ title, icon, description, campo, saveLabel, openLabel, closedLabel, initial, onSave }: {
  title: string; icon: string; description: string;
  campo: 'horario_funcionamento' | 'horario_entrega';
  saveLabel: string; openLabel: string; closedLabel: string;
  initial: any; onSave: (payload: any) => Promise<void>;
}) {
  const [days, setDays] = useState<Record<string, DayCfg>>(() => {
    const o: Record<string, DayCfg> = {};
    DIAS.forEach((d) => { o[d.key] = readDay(initial, d.key); });
    return o;
  });

  const patch = (key: string, p: Partial<DayCfg>) => setDays((prev) => ({ ...prev, [key]: { ...prev[key], ...p } }));

  async function save() {
    const payload: any = {};
    DIAS.forEach(({ key }) => { payload[key] = days[key]; });
    await onSave({ [campo]: payload });
  }

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <div className="config-section-title"><i className={`fa-solid ${icon}`} style={{ color: 'var(--primary)' }} /> {title}</div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{description}</p>
      <div className="horarios-grid">
        {DIAS.map((dia) => {
          const d = days[dia.key];
          return (
            <div key={dia.key} className={'horario-row' + (!d.ativo ? ' inactive' : '')}>
              <div className="horario-info">
                <label className="cfg-switch">
                  <input type="checkbox" checked={d.ativo} onChange={(e) => patch(dia.key, { ativo: e.target.checked })} />
                  <span className="cfg-slider" />
                </label>
                <span className="horario-label">{dia.label}</span>
              </div>
              {d.ativo && (
                <div className="horario-inputs">
                  <input type="time" className="time-input" value={d.inicio} onChange={(e) => patch(dia.key, { inicio: e.target.value })} />
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>até</span>
                  <input type="time" className="time-input" value={d.fim} onChange={(e) => patch(dia.key, { fim: e.target.value })} />
                </div>
              )}
              <div style={{ fontSize: '0.8rem', color: d.ativo ? 'var(--success)' : 'var(--text-dim)', minWidth: 70, textAlign: 'right' }}>
                {d.ativo ? openLabel : closedLabel}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: 'right', marginTop: '1.5rem' }}>
        <SaveButton label={saveLabel} onSave={save} />
      </div>
    </div>
  );
}
