import { useState } from 'react';

// Botão de salvar com estados idle → salvando → salvo (volta ao normal).
export function SaveButton({ label, onSave, icon = 'fa-floppy-disk' }: { label: string; onSave: () => Promise<void>; icon?: string }) {
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');

  async function handle() {
    if (state !== 'idle') return;
    setState('saving');
    try {
      await onSave();
      setState('saved');
      setTimeout(() => setState('idle'), 2000);
    } catch {
      setState('idle');
    }
  }

  return (
    <button className={'btn-save-msg' + (state === 'saved' ? ' saved' : '')} onClick={handle} disabled={state === 'saving'}>
      {state === 'saving' ? <><i className="fa-solid fa-spinner fa-spin" /> Salvando...</>
        : state === 'saved' ? <><i className="fa-solid fa-check" /> Salvo!</>
          : <><i className={`fa-solid ${icon}`} /> {label}</>}
    </button>
  );
}
