import { useRef, useState } from 'react';
import { toast } from '../../../services/toast';
import { MSG_FIELDS, VARIAVEIS } from './constants';

// Editores de mensagens automáticas com variáveis (clique = copia, arrasta = insere).
export function Messages({ initial, onSave }: { initial: Record<string, string>; onSave: (payload: any) => Promise<void> }) {
  const [msgs, setMsgs] = useState<Record<string, string>>(initial || {});

  const setMsg = (key: string, val: string) => setMsgs((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <div className="config-section-title"><i className="fa-solid fa-message" style={{ color: 'var(--primary)' }} /> Mensagens Automáticas</div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
        Personalize as mensagens enviadas ao cliente em cada etapa do pedido via WhatsApp.
      </p>

      <div className="vars-grid">
        {VARIAVEIS.map((v) => (
          <div key={v.key} className="var-chip" draggable title="Clique para copiar"
            onClick={() => navigator.clipboard.writeText(v.key).then(() => toast.info('Variável copiada!'))}
            onDragStart={(e) => e.dataTransfer.setData('text/plain', v.key)}>
            <i className={`fa-solid ${v.icon}`} />
            <span>{v.label}</span>
            <code>{v.key}</code>
          </div>
        ))}
      </div>

      <div>
        {MSG_FIELDS.map((f) => (
          <MsgEditor key={f.key} field={f} value={msgs[f.key] || ''}
            onChange={(v) => setMsg(f.key, v)}
            onSave={() => onSave({ mensagens_automaticas: { ...msgs, [f.key]: msgs[f.key] || '' } })} />
        ))}
      </div>
    </div>
  );
}

function MsgEditor({ field, value, onChange, onSave }: {
  field: { key: string; label: string; icon: string; default: string };
  value: string; onChange: (v: string) => void; onSave: () => Promise<void>;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');

  function onDrop(e: React.DragEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    const text = e.dataTransfer.getData('text/plain');
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart, end = el.selectionEnd;
    const next = value.substring(0, start) + text + value.substring(end);
    onChange(next);
    requestAnimationFrame(() => { el.focus(); el.selectionStart = el.selectionEnd = start + text.length; });
  }

  async function save() {
    if (state !== 'idle') return;
    setState('saving');
    try { await onSave(); toast.success('Mensagem salva!'); setState('saved'); setTimeout(() => setState('idle'), 2000); }
    catch { toast.error('Erro ao salvar mensagem.'); setState('idle'); }
  }

  return (
    <div className="msg-card">
      <div className="msg-card-header"><i className={`fa-solid ${field.icon}`} style={{ color: 'var(--primary)' }} /> <span>{field.label}</span></div>
      <div className="msg-editor-wrap">
        <textarea ref={ref} className="msg-textarea" rows={3} value={value} placeholder={field.default}
          onChange={(e) => onChange(e.target.value)} onDragOver={(e) => e.preventDefault()} onDrop={onDrop} />
        <div className="msg-save-row">
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}><i className="fa-solid fa-circle-info" /> Arraste as variáveis acima para o texto</span>
          <button className={'btn-save-msg' + (state === 'saved' ? ' saved' : '')} onClick={save} disabled={state === 'saving'}>
            {state === 'saving' ? <i className="fa-solid fa-spinner fa-spin" /> : state === 'saved' ? <><i className="fa-solid fa-check" /> Salvo!</> : <><i className="fa-solid fa-floppy-disk" /> Salvar</>}
          </button>
        </div>
      </div>
    </div>
  );
}
