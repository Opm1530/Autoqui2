export const AIConfig = () => {
    return `
        <div class="config-container">
            <div class="card config-card">
                <div class="card-header">
                    <h3>Modo de Operação da IA</h3>
                </div>
                <div class="config-options">
                    <div class="config-option active">
                        <div class="option-header">
                            <input type="radio" name="ia-mode" checked>
                            <label>Modo 1 – IA baseada em produtos</label>
                        </div>
                        <p>A IA consulta os produtos cadastrados na dashboard e valida o estoque.</p>
                    </div>
                    <div class="config-option">
                        <div class="option-header">
                            <input type="radio" name="ia-mode">
                            <label>Modo 2 – IA em modo aberto</label>
                        </div>
                        <p>A IA conversa livremente. Todo pedido é enviado para aceite humano manual.</p>
                    </div>
                </div>
            </div>

            <div class="card config-card">
                <div class="card-header">
                    <h3>Prompt Personalizado</h3>
                </div>
                <div class="prompt-editor">
                    <textarea placeholder="Digite o prompt base para a IA desta empresa...">Você é um assistente virtual para a Loja Centro. Seu objetivo é ajudar o cliente a escolher produtos e fechar pedidos no WhatsApp de forma amigável e eficiente.</textarea>
                </div>
                <div class="config-footer">
                    <button class="btn-primary">Salvar Configurações</button>
                </div>
            </div>
        </div>
    `;
};
