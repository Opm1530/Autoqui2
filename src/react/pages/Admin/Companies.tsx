import { useEffect, useState } from 'react';
import { dbService } from '../../../services/db';
import { adminApi } from '../../../services/adminApi';
import { toast } from '../../../services/toast';
import { confirm } from '../../../services/confirm';
import { SkeletonTable } from '../../components/Skeleton';
import { pricingApi } from '../../../services/pricingApi';
import { couponApi } from '../../../services/couponApi';

const MODULE_OPTIONS = [
  { value: 'atendimento', label: 'IA de Atendimento' },
  { value: 'venda', label: 'IA de Venda' },
  { value: 'agendamento', label: 'IA de Agendamento' },
  { value: 'disparo', label: 'Disparo em Massa' },
  { value: 'venda_catalogo', label: 'Venda pelo Catálogo' },
];
const AI_MODULES = ['atendimento', 'venda', 'agendamento'];

// Regras de exclusividade (mesma lógica do painel atual).
function toggleModule(selected: string[], m: string): string[] {
  if (selected.includes(m)) return selected.filter((x) => x !== m);
  let next = [...selected, m];
  if (m === 'venda_catalogo') next = next.filter((x) => x === 'venda_catalogo' || x === 'disparo');
  else if (AI_MODULES.includes(m) || m === 'disparo') {
    next = next.filter((x) => x !== 'venda_catalogo');
    if (AI_MODULES.includes(m)) next = next.filter((x) => !AI_MODULES.includes(x) || x === m);
  }
  return next;
}

interface StoreRow { id?: string; name: string; address: string; active: boolean; frete_ativo: boolean; instancia_id: string | null }

export function Companies() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  useEffect(() => { (async () => { setCompanies((await dbService.getAll('companies')) as any[]); setLoading(false); })(); }, []);

  async function toggleStatus(c: any) {
    const newStatus = c.status === 'active' ? 'inactive' : 'active';
    const action = newStatus === 'inactive' ? 'desativar' : 'ativar';
    let msg = `Deseja ${action} este cliente?`;
    if (newStatus === 'inactive') msg += '\n\n⚠️ ATENÇÃO: Todos os usuários (dono e funcionários) serão BLOQUEADOS de fazer login!';
    const ok = await confirm.warning(`${action.charAt(0).toUpperCase() + action.slice(1)} Cliente`, msg);
    if (!ok) return;
    try {
      await adminApi.toggleCompanyStatus(c.id, newStatus);
      setCompanies((prev) => prev.map((x) => (x.id === c.id ? { ...x, status: newStatus } : x)));
      toast.success(`Cliente ${newStatus === 'inactive' ? 'desativado' : 'ativado'} com sucesso!`);
    } catch (err: any) { toast.error('Erro ao atualizar status: ' + (err.message || err)); }
  }

  function onSaved(c: any, isNew: boolean) {
    setCompanies((prev) => isNew ? [...prev, c] : prev.map((x) => (x.id === c.id ? { ...x, ...c } : x)));
    setModalOpen(false); setEditing(null);
  }

  if (loading) return <SkeletonTable rows={8} cols={5} />;

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Gestão de Clientes</h2>
        <button className="btn-add" onClick={() => { setEditing(null); setModalOpen(true); }}>Novo Cliente<span className="btn-add-icon"><i className="fa-solid fa-plus" /></span></button>
      </div>
      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead><tr><th>Nome</th><th>Status</th><th>Módulos Ativos</th><th>Lojas</th><th>Ações</th></tr></thead>
            <tbody>
              {companies.length === 0 ? <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>Nenhum cliente cadastrado.</td></tr>
                : companies.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td><span className={`badge ${c.status === 'active' ? 'success' : 'danger'}`}>{c.status === 'active' ? 'Ativo' : 'Inativo'}</span></td>
                    <td><div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>{(c.modulos_ativos || []).map((m: string) => <span key={m} className="badge info" style={{ fontSize: '0.7rem' }}>{m}</span>)}</div></td>
                    <td>{c.stores ? c.stores.length : 0}</td>
                    <td>
                      <div className="actions" style={{ display: 'flex', gap: 6 }}>
                        <button className="action-btn" title="Editar" onClick={() => { setEditing(c); setModalOpen(true); }}><i style={{ color: '#fff' }} className="fa-solid fa-pen-to-square" /></button>
                        <button className="action-btn" title={c.status === 'active' ? 'Desativar' : 'Ativar'} onClick={() => toggleStatus(c)}><i className={`fa-solid ${c.status === 'active' ? 'fa-toggle-off' : 'fa-toggle-on'}`} style={{ color: c.status === 'active' ? '#ef4444' : '#22c55e' }} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <CompanyModal editing={editing} onClose={() => { setModalOpen(false); setEditing(null); }} onSaved={onSaved}
          onRemoved={(companyId, storeId) => setCompanies((prev) => prev.map((c) => (c.id === companyId ? { ...c, stores: (c.stores || []).filter((s: any) => s.id !== storeId) } : c)))} />
      )}
    </div>
  );
}

function CompanyModal({ editing, onClose, onSaved, onRemoved }: { editing: any | null; onClose: () => void; onSaved: (c: any, isNew: boolean) => void; onRemoved?: (companyId: string, storeId: string) => void }) {
  const isEdit = !!editing;
  const [name, setName] = useState(editing?.name || '');
  const [limit, setLimit] = useState(String(editing?.limite_instancias || 1));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modules, setModules] = useState<string[]>(editing?.modulos_ativos || ['atendimento']);
  const [isento, setIsento] = useState<boolean>(!!editing?.isento);
  const [precos, setPrecos] = useState<Record<string, number>>({});
  useEffect(() => { pricingApi.get().then((p) => setPrecos(p.precos || {})).catch(() => {}); }, []);
  const totalMensal = modules.reduce((s, m) => s + (precos[m] || 0), 0);
  const [cupomAtual, setCupomAtual] = useState<any>(editing?.assinatura?.cupom || null);
  const [cupomInput, setCupomInput] = useState('');
  const [cupomBusy, setCupomBusy] = useState(false);
  async function aplicarCupomEmpresa(codigo: string) {
    if (!isEdit) return;
    setCupomBusy(true);
    try {
      const r = await couponApi.applyToCompany((editing as any).id, codigo);
      setCupomAtual(r.cupom);
      setCupomInput('');
      toast.success(codigo ? 'Cupom aplicado ao cliente!' : 'Cupom removido.');
    } catch (e: any) { toast.error(e.message === 'cupom_invalido' ? 'Cupom inválido.' : 'Erro: ' + (e.message || e)); }
    finally { setCupomBusy(false); }
  }
  const [stores, setStores] = useState<StoreRow[]>(() => {
    const init = (editing?.stores || []) as any[];
    if (init.length) return init.map((s) => ({ id: s.id, name: s.name || '', address: s.address || '', active: s.active !== false, frete_ativo: s.frete_ativo !== false, instancia_id: s.instancia_id || null }));
    return [{ name: '', address: '', active: true, frete_ativo: true, instancia_id: null }];
  });
  const [saving, setSaving] = useState(false);

  const [removing, setRemoving] = useState<{ index: number; store: StoreRow; preview: any } | null>(null);
  const [removeBusy, setRemoveBusy] = useState(false);

  const patchStore = (i: number, p: Partial<StoreRow>) => setStores((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...p } : s)));
  const addStore = () => setStores((prev) => [...prev, { name: '', address: '', active: true, frete_ativo: true, instancia_id: null }]);

  // Loja nova (ainda não salva) some direto. Loja existente passa pelo preview
  // de impacto e é removida no backend (limpa produtos/combos/config/instância).
  async function removeStore(i: number) {
    const s = stores[i];
    if (!s.id || !editing) { setStores((prev) => prev.filter((_, idx) => idx !== i)); return; }
    // Conta as lojas JÁ SALVAS (linhas novas em branco não contam) — mesma regra do backend.
    if (stores.filter((x) => x.id).length <= 1) { toast.warning('A empresa precisa ter pelo menos 1 loja salva — não dá para remover a última.'); return; }
    try {
      const preview = await adminApi.previewRemoveStore(editing.id, s.id);
      setRemoving({ index: i, store: s, preview });
    } catch (err: any) {
      console.error('[remover loja] falhou:', { companyId: editing.id, storeId: s.id, erro: err.message });
      toast.error(storeErrorMessage(err.message));
    }
  }

  async function confirmRemoveStore() {
    if (!removing || !editing) return;
    setRemoveBusy(true);
    try {
      const r = await adminApi.removeStore(editing.id, removing.store.id!);
      setStores((prev) => prev.filter((_, idx) => idx !== removing.index));
      toast.success(`Loja removida. ${r.deletedProducts} produto(s) excluído(s), ${r.preservedOrders} pedido(s) preservado(s).`);
      setRemoving(null);
      onRemoved?.(editing.id, removing.store.id!);
    } catch (err: any) {
      toast.error(storeErrorMessage(err.message));
    } finally { setRemoveBusy(false); }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (modules.includes('venda_catalogo')) {
      const forbidden = modules.filter((m) => m !== 'venda_catalogo' && m !== 'disparo');
      if (forbidden.length > 0) { toast.error('O módulo "Venda pelo Catálogo" só pode ser combinado com "Disparo em Massa".'); return; }
    }
    const validStores = stores.filter((s) => s.name.trim() && s.address.trim()).map((s, i) => ({
      id: s.id || `store_${Date.now()}_${i}`, name: s.name.trim(), address: s.address.trim(), active: s.active, frete_ativo: s.frete_ativo, instancia_id: s.instancia_id,
    }));
    if (validStores.length === 0) { toast.warning('É necessário cadastrar pelo menos 1 loja!'); return; }
    if (!isEdit && (!email.trim() || !password)) { toast.warning('Informe e-mail e senha do dono.'); return; }

    setSaving(true);
    try {
      const data: any = { name, stores: validStores, limite_instancias: parseInt(limit) || 1, modulos_ativos: modules };
      if (isEdit) { data.isento = isento; }
      if (isEdit) {
        await adminApi.saveCompany(data, editing.id);
        toast.success('Cliente atualizado com sucesso!');
        onSaved({ id: editing.id, ...editing, ...data }, false);
      } else {
        const { id } = await adminApi.saveCompany(data, undefined, { email, password });
        toast.success('Cliente criado com sucesso!');
        onSaved({ id, ...data, status: 'active', metrics: { totalMessages: 0, totalPayments: 0 } }, true);
      }
    } catch (err: any) { toast.error('Erro: ' + (err.message || err)); setSaving(false); }
  }

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content glass big-modal">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h2>{isEdit ? 'Editar Cliente' : 'Novo Cliente'}</h2>
        <form onSubmit={save}>
          <div className="form-group"><label>Nome do Cliente</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></div>
          <div className="form-group"><label>Limite de Instâncias</label><input type="number" min="1" value={limit} onChange={(e) => setLimit(e.target.value)} required /></div>

          {isEdit && (
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input id="isento-chk" type="checkbox" checked={isento} onChange={(e) => setIsento(e.target.checked)} style={{ width: 'auto' }} />
              <label htmlFor="isento-chk" style={{ margin: 0 }}>Isento de cobrança (acesso liberado sem assinatura)</label>
            </div>
          )}

          {!isEdit && (
            <div>
              <h3>Dono do Cliente</h3>
              <div className="form-group"><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div className="form-group"><label>Senha</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            </div>
          )}

          <h3>Lojas / Unidades <span style={{ color: '#ef4444' }}>*</span></h3>
          <p style={{ fontSize: '0.85em', color: '#999', marginTop: -8, marginBottom: 12 }}>Mínimo de 1 loja obrigatória</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
            {stores.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input type="text" placeholder="Nome da Loja" value={s.name} onChange={(e) => patchStore(i, { name: e.target.value })} style={{ flex: 1 }} required />
                <input type="text" placeholder="Endereço Completo" value={s.address} onChange={(e) => patchStore(i, { address: e.target.value })} style={{ flex: 2 }} required />
                <button type="button" title="Remover" onClick={() => removeStore(i)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: 8, width: 36, height: 36, cursor: 'pointer', flexShrink: 0 }}>✕</button>
              </div>
            ))}
          </div>
          <button type="button" className="btn-secondary" onClick={addStore} style={{ marginBottom: 8 }}><i className="fa-solid fa-plus" /> Adicionar Loja</button>

          <h3>Módulos Ativos</h3>
          <div className="multi-select-grid" style={{ marginBottom: 16 }}>
            {MODULE_OPTIONS.map((m) => {
              const on = modules.includes(m.value);
              return (
                <button type="button" key={m.value} onClick={() => setModules((prev) => toggleModule(prev, m.value))}
                  className="store-checkbox-card" style={{ border: on ? '1px solid var(--primary)' : undefined, background: on ? 'rgba(132, 204, 22,0.15)' : undefined }}>
                  <i className={`fa-solid ${on ? 'fa-square-check' : 'fa-square'}`} style={{ color: on ? 'var(--primary)' : 'var(--text-dim)' }} />
                  <span className="checkbox-label">{m.label}</span>
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(132,204,22,0.08)', border: '1px solid rgba(132,204,22,0.3)', borderRadius: 10, padding: '10px 14px', marginBottom: 12 }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Mensalidade (soma das ferramentas · preços em <strong>Admin → Preços</strong>)</span>
            <strong style={{ color: 'var(--primary)', fontSize: '1.05rem' }}>R$ {totalMensal.toFixed(2)}/mês</strong>
          </div>

          {isEdit && (
            <div className="form-group">
              <label>Cupom de desconto do cliente</label>
              {cupomAtual ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(132,204,22,0.1)', border: '1px solid rgba(132,204,22,0.3)', borderRadius: 10, padding: '10px 14px' }}>
                  <i className="fa-solid fa-ticket" style={{ color: 'var(--primary)' }} />
                  <span style={{ flex: 1 }}><strong>{cupomAtual.codigo}</strong> · {cupomAtual.tipo === 'percent' ? `${cupomAtual.valor}%` : `R$ ${Number(cupomAtual.valor).toFixed(2)}`} de desconto · {cupomAtual.duracaoMeses == null ? 'para sempre' : `${cupomAtual.duracaoMeses} mês(es)`}</span>
                  <button type="button" className="btn-secondary" style={{ padding: '4px 10px', color: '#ef4444' }} disabled={cupomBusy} onClick={() => aplicarCupomEmpresa('')}>Remover</button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 8 }}>
                  <input value={cupomInput} onChange={(e) => setCupomInput(e.target.value.toUpperCase())} placeholder="Código do cupom" style={{ flex: 1, textTransform: 'uppercase' }} />
                  <button type="button" className="btn-secondary" disabled={cupomBusy || !cupomInput.trim()} onClick={() => aplicarCupomEmpresa(cupomInput.trim())}>Aplicar</button>
                </div>
              )}
              <small style={{ color: 'var(--text-muted)' }}>Aplica na hora, sem precisar salvar. O desconto entra no valor cobrado.</small>
            </div>
          )}

          <button type="submit" className="btn-primary full-width" disabled={saving} style={{ marginTop: '1rem' }}>{saving ? 'Salvando...' : 'Salvar Cliente'}</button>
        </form>
      </div>

      {/* Confirmação de remoção de loja, com o impacto real */}
      {removing && (
        <div className="modal" style={{ display: 'flex', zIndex: 10000 }} onClick={(e) => { if (e.target === e.currentTarget) setRemoving(null); }}>
          <div className="modal-content glass" style={{ maxWidth: 520 }}>
            <span className="close-modal" onClick={() => setRemoving(null)}>&times;</span>
            <h2 style={{ marginBottom: 6 }}><i className="fa-solid fa-triangle-exclamation" style={{ color: '#ef4444', marginRight: 8 }} />Remover loja</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 16 }}>
              Você está removendo <strong style={{ color: 'var(--text-main)' }}>{removing.preview.storeName}</strong>. Confira o impacto:
            </p>

            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 12, padding: '12px 16px', marginBottom: 12 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f87171', textTransform: 'uppercase', marginBottom: 8 }}>Será excluído</div>
              <Row label="Produtos exclusivos desta loja" value={removing.preview.productsToDelete} danger />
              <Row label="Combos desta loja" value={removing.preview.combosToDelete} danger />
              <Row label="Configuração do catálogo (design, horários, taxas, cupons)" value={removing.preview.configsToDelete} danger />
            </div>

            <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 12, padding: '12px 16px', marginBottom: 16 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', marginBottom: 8 }}>Será preservado</div>
              <Row label="Pedidos desta loja (histórico intacto)" value={removing.preview.ordersPreserved} />
              <Row label="Produtos que também estão em outra loja" value={removing.preview.productsToUnlink} />
              <Row label="Instâncias desvinculadas (ficam livres)" value={removing.preview.instancesToUnlink} />
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setRemoving(null)}>Cancelar</button>
              <button className="btn-primary" disabled={removeBusy} style={{ background: '#ef4444' }} onClick={confirmRemoveStore}>
                {removeBusy ? <><i className="fa-solid fa-spinner fa-spin" /> Removendo...</> : <><i className="fa-solid fa-trash" /> Remover loja</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Traduz os códigos de recusa do backend para algo acionável.
function storeErrorMessage(code?: string): string {
  switch (code) {
    case 'ultima_loja': return 'A empresa precisa ter pelo menos 1 loja — não dá para remover a última.';
    case 'loja_nao_encontrada': return 'Esta loja não existe mais no cadastro da empresa. Feche e reabra a tela.';
    case 'forbidden': return 'Apenas o administrador da plataforma pode remover lojas.';
    case 'user_not_found': return 'Seu usuário não foi encontrado no sistema. Saia e entre novamente.';
    default: return 'Erro ao remover loja: ' + (code || 'desconhecido');
  }
}

function Row({ label, value, danger }: { label: string; value: number; danger?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '4px 0', fontSize: '0.87rem' }}>
      <span style={{ color: 'var(--text-muted)' }}>{label}</span>
      <strong style={{ color: value > 0 ? (danger ? '#f87171' : 'var(--text-main)') : 'var(--text-dim)' }}>{value}</strong>
    </div>
  );
}
