import { useEffect, useRef, useState } from 'react';
import { dbService } from '../../services/db';
import { dataApi } from '../../services/dataApi';
import { evolutionApi } from '../../services/evolutionApi';
import { toast } from '../../services/toast';
import { confirm } from '../../services/confirm';
import { useAuth } from '../useAuth';
import { SkeletonCards } from '../components/Skeleton';

interface Instance {
  id: string;
  empresaId: string;
  lojaId?: string | null;
  nome: string;
  numero?: string | null;
  status: 'conectado' | 'desconectado';
  funcao?: string | null;
  createdAt?: any;
}

export function Instances() {
  const { user } = useAuth();
  const companyId = user?.companyId || '';

  const [company, setCompany] = useState<any>(null);
  const [instances, setInstances] = useState<Instance[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);

  // QR modal
  const [qrOpen, setQrOpen] = useState(false);
  const [qrImg, setQrImg] = useState<string | null>(null);
  const qrInterval = useRef<any>(null);
  const statusInterval = useRef<any>(null);

  const limit = company?.limite_instancias || 1;

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      const companyDoc = (await dbService.get('companies', companyId)) as any;
      setCompany(companyDoc);
      const insts = (await dbService.getAll('instancias', { field: 'empresaId', operator: '==', value: companyId })) as Instance[];
      setInstances(insts);
      setLoading(false);
      // Verifica status real na API em background
      verifyStatuses(insts);
    })();
    return () => stopPolling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  async function verifyStatuses(list: Instance[]) {
    for (const inst of list) {
      try {
        const apiStatus = await evolutionApi.getInstanceStatus(inst.nome);
        const cur = apiStatus.connected ? 'conectado' : 'desconectado';
        if (cur !== inst.status) {
          await dataApi.update('instancias', inst.id, { status: cur });
          setInstances((prev) => prev.map((x) => (x.id === inst.id ? { ...x, status: cur as any } : x)));
        }
      } catch (e) { console.error('Erro ao verificar status de', inst.nome, e); }
    }
  }

  function stopPolling() {
    if (qrInterval.current) clearInterval(qrInterval.current);
    if (statusInterval.current) clearInterval(statusInterval.current);
    qrInterval.current = null;
    statusInterval.current = null;
  }

  const storeName = (lojaId?: string | null) => company?.stores?.find((s: any) => s.id === lojaId)?.name || 'Global';

  async function shareQR(name: string) {
    const token = await evolutionApi.shareQr(name);
    if (!token) { toast.error('Não foi possível gerar o link de conexão.'); return; }
    await navigator.clipboard.writeText(`${window.location.origin}/qr/${token}`);
    toast.success('Link de conexão copiado! Válido por 15 minutos.');
  }

  async function deleteInstance(inst: Instance) {
    const ok = await confirm.danger('Excluir Instância', `Tem certeza que deseja excluir a instância "${inst.nome}"? Isso irá desconectar o WhatsApp.`);
    if (!ok) return;
    try {
      await evolutionApi.deleteInstance(inst.nome);
      await dataApi.remove('instancias', inst.id);
      setInstances((prev) => prev.filter((x) => x.id !== inst.id));
      toast.success('Instância excluída com sucesso.');
    } catch (e) { toast.error('Erro ao excluir instância: ' + e); }
  }

  async function logoutInstance(inst: Instance) {
    const ok = await confirm.warning('Desconectar WhatsApp', `Deseja realmente desconectar o WhatsApp da instância "${inst.nome}"?`);
    if (!ok) return;
    try {
      toast.info('Desconectando...');
      const success = await evolutionApi.logoutInstance(inst.nome);
      if (success) {
        await dataApi.update('instancias', inst.id, { status: 'desconectado' });
        setInstances((prev) => prev.map((x) => (x.id === inst.id ? { ...x, status: 'desconectado' } : x)));
        toast.success('Desconectado com sucesso.');
      } else {
        toast.error('Não foi possível desconectar pela API. Verifique se a instância está ativa.');
      }
    } catch (e) { toast.error('Erro ao desconectar: ' + e); }
  }

  function connectInstance(name: string) {
    setQrImg(null);
    setQrOpen(true);

    const handleConnected = async () => {
      stopPolling();
      toast.success('WhatsApp conectado com sucesso!');
      setQrOpen(false);
      const inst = instances.find((i) => i.nome === name);
      if (inst) {
        await dataApi.update('instancias', inst.id, { status: 'conectado' });
        setInstances((prev) => prev.map((x) => (x.id === inst.id ? { ...x, status: 'conectado' } : x)));
      }
    };

    const fetchQR = async () => {
      try {
        const result = await evolutionApi.getQRCode(name);
        if (result && result.base64) {
          setQrImg(result.base64);
        } else {
          const status = await evolutionApi.getInstanceStatus(name);
          if (status.connected) handleConnected();
        }
      } catch (e) { console.error('Erro ao buscar QR:', e); }
    };

    const checkStatus = async () => {
      try {
        const status = await evolutionApi.getInstanceStatus(name);
        if (status.connected) handleConnected();
      } catch (e) { console.error('Erro ao checar status:', e); }
    };

    fetchQR();
    qrInterval.current = setInterval(fetchQR, 40000);
    statusInterval.current = setInterval(checkStatus, 3000);
  }

  function closeQr() { stopPolling(); setQrOpen(false); }

  async function createInstance(e: React.FormEvent) {
    e.preventDefault();
    if (instances.length >= limit) { toast.error('Limite de instâncias atingido.'); return; }
    let name = newName.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    if (!name) { toast.warning('Informe um identificador.'); return; }
    const uniqueName = `${name}_${companyId.substring(0, 5)}`;
    setCreating(true);
    try {
      if (await evolutionApi.instanceExists(uniqueName)) {
        toast.warning('Já existe uma instância com esse nome. Tente outro.');
        setCreating(false);
        return;
      }
      toast.info('Criando instância, aguarde...');
      await evolutionApi.createInstance(uniqueName);
      const newInstance: any = { empresaId: companyId, lojaId: null, nome: uniqueName, numero: null, status: 'desconectado', funcao: null, webhookUrl: null, upsert: false };
      const { id } = await dataApi.create('instancias', newInstance);
      setInstances((prev) => [...prev, { id, ...newInstance, createdAt: { toDate: () => new Date() } }]);
      toast.success('Instância criada! Agora vincule-a a uma loja nas configurações.');
      setShowNew(false); setNewName('');
      connectInstance(uniqueName);
    } catch (err) {
      toast.error('Erro ao criar instância: ' + err);
    } finally { setCreating(false); }
  }

  if (loading) return <SkeletonCards count={3} lines={3} />;
  if (!companyId) return <p>Acesso negado.</p>;

  const atLimit = instances.length >= limit;

  return (
    <div>
      <div className="page-header" style={{ alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <span className="badge secondary" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}><i className="fa-solid fa-layer-group" style={{ marginRight: 6 }} /> Limite: <strong style={{ marginLeft: 4 }}>{limit}</strong></span>
          <span className="badge info" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}><i className="fa-solid fa-circle-nodes" style={{ marginRight: 6 }} /> Utilizadas: <strong style={{ marginLeft: 4 }}>{instances.length}</strong></span>
        </div>
        <button className="btn-primary" disabled={atLimit} style={atLimit ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
          onClick={() => setShowNew(true)}>
          <i className="fa-solid fa-plus" /> Nova Instância
        </button>
      </div>

      {instances.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-muted)' }}>
          <i className="fa-brands fa-whatsapp" style={{ fontSize: '2.5rem', color: 'var(--text-dim)', display: 'block', margin: '0 auto 12px', width: 'fit-content' }} />
          Nenhuma instância criada ainda.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem', marginTop: '1.25rem' }}>
          {instances.map((inst) => {
            const connected = inst.status === 'conectado';
            return (
              <div key={inst.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Cabeçalho: avatar + nome + status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: connected ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: connected ? '#34d399' : '#f87171', fontSize: '1.2rem' }}>
                    <i className="fa-brands fa-whatsapp" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={inst.nome}>{inst.nome}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{inst.numero ? inst.numero.split('@')[0] : 'Sem número'}</div>
                  </div>
                  <span className={`badge ${connected ? 'success' : 'danger'}`} style={{ flexShrink: 0 }}>
                    <i className={`fa-solid ${connected ? 'fa-circle-check' : 'fa-circle-xmark'}`} style={{ marginRight: 4 }} />{connected ? 'Conectado' : 'Desconectado'}
                  </span>
                </div>

                {/* Infos */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                    <span style={{ color: 'var(--text-dim)' }}><i className="fa-solid fa-store" style={{ width: 16, marginRight: 6 }} />Loja</span>
                    <span style={{ fontWeight: 600, textAlign: 'right' }}>{storeName(inst.lojaId)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                    <span style={{ color: 'var(--text-dim)' }}><i className="fa-solid fa-gear" style={{ width: 16, marginRight: 6 }} />Função</span>
                    <span style={{ fontWeight: 600, textAlign: 'right' }}>{inst.funcao || 'Nenhuma'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                    <span style={{ color: 'var(--text-dim)' }}><i className="fa-solid fa-calendar" style={{ width: 16, marginRight: 6 }} />Criada em</span>
                    <span style={{ fontWeight: 600 }}>{inst.createdAt?.toDate ? inst.createdAt.toDate().toLocaleDateString('pt-BR') : 'N/A'}</span>
                  </div>
                </div>

                {/* Ações */}
                <div style={{ display: 'flex', gap: 8, borderTop: '1px solid var(--border-color)', paddingTop: 14 }}>
                  {!connected && (
                    <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => connectInstance(inst.nome)}><i className="fa-solid fa-qrcode" /> Conectar</button>
                  )}
                  {connected && (
                    <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center', color: '#fbbf24', borderColor: 'rgba(245,158,11,0.4)' }} onClick={() => logoutInstance(inst)}><i className="fa-solid fa-right-from-bracket" /> Desconectar</button>
                  )}
                  <button className="btn-secondary" title="Compartilhar link de conexão" style={{ color: '#818cf8', borderColor: 'rgba(99,102,241,0.4)' }} onClick={() => shareQR(inst.nome)}><i className="fa-solid fa-share-nodes" /></button>
                  <button className="btn-secondary" title="Excluir" style={{ color: '#f87171', borderColor: 'rgba(239,68,68,0.35)' }} onClick={() => deleteInstance(inst)}><i className="fa-solid fa-trash" /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal nova instância */}
      {showNew && (
        <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) setShowNew(false); }}>
          <div className="modal-content glass">
            <span className="close-modal" onClick={() => setShowNew(false)}>&times;</span>
            <h2>Nova Instância</h2>
            <form onSubmit={createInstance}>
              <div className="form-group">
                <label>Identificador da Instância (Uso Interno)</label>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} required placeholder="Ex: Matriz 01, Vendas Norte..." />
              </div>
              <button type="submit" className="btn-primary full-width" style={{ marginTop: '1rem' }} disabled={creating}>
                {creating ? <><i className="fa-solid fa-spinner fa-spin" /> Criando...</> : 'Criar e Gerar QR Code'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal QR */}
      {qrOpen && (
        <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) closeQr(); }}>
          <div className="modal-content glass" style={{ textAlign: 'center' }}>
            <span className="close-modal" onClick={closeQr}>&times;</span>
            <h2>Conectar WhatsApp</h2>
            <p>Escaneie o QR Code abaixo com o seu WhatsApp.</p>
            <div style={{ margin: '20px auto', width: 250, height: 250, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, overflow: 'hidden' }}>
              {qrImg ? <img src={qrImg} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: '#333' }} />}
            </div>
            <button className="btn-primary full-width" onClick={closeQr}>Concluir</button>
          </div>
        </div>
      )}
    </div>
  );
}
