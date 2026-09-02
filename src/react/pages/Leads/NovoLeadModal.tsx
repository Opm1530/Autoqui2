import { useState } from 'react';
import { farmaquiApi } from '../../../services/farmaquiApi';
import { toast } from '../../../services/toast';

// Popup único para criar lead (nome + número). Reutilizado na página de Leads e no CRM.
// `onCreated` recebe o id do lead criado (para o CRM já colocá-lo numa coluna).
export function NovoLeadModal({ onClose, onCreated }: { onClose: () => void; onCreated?: (id: string, nome: string) => void }) {
  const [nome, setNome] = useState('');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);

  async function criar() {
    const tel = phone.replace(/\D/g, '');
    if (tel.length < 10) { toast.error('Número inválido (informe DDD + número).'); return; }
    setBusy(true);
    try {
      const r = await farmaquiApi.manualLead(nome.trim(), tel);
      toast.success('Lead criado!');
      onCreated?.(r.id, r.nome || nome.trim());
      onClose();
    } catch (e: any) {
      toast.error(e.message === 'ja_existe' ? 'Já existe um lead com esse número.' : e.message === 'telefone_invalido' ? 'Número inválido.' : 'Erro ao criar lead.');
    } finally { setBusy(false); }
  }

  const inp: React.CSSProperties = { width: '100%', padding: 10, background: 'var(--bg-color,#f8fafc)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: '0.95rem', color: 'var(--text-main)', boxSizing: 'border-box', marginTop: 4 };
  const lbl: React.CSSProperties = { fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', zIndex: 11000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--surface,#fff)', color: 'var(--text-main)', borderRadius: 16, maxWidth: 420, width: '100%', padding: 22, boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}><i className="fa-solid fa-user-plus" /> Novo lead</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', color: 'var(--text-muted)' }}>&times;</button>
        </div>
        <div style={{ marginBottom: 14 }}><label style={lbl}>Nome</label><input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Maria Silva" style={inp} autoFocus /></div>
        <div style={{ marginBottom: 18 }}><label style={lbl}>WhatsApp (DDD + número)</label><input value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 13))} placeholder="11999998888" style={inp} onKeyDown={(e) => e.key === 'Enter' && criar()} /></div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 16 }}>Deixe o nome vazio para puxar o do WhatsApp. Você pode editar mais dados depois.</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" disabled={busy} onClick={criar}>{busy ? 'Criando...' : <><i className="fa-solid fa-check" /> Criar lead</>}</button>
        </div>
      </div>
    </div>
  );
}
