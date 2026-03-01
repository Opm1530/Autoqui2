export const Users = () => {
    return `
        <div class="page-header">
            <button class="btn-primary"><i class="fa-solid fa-plus"></i> Novo Usuário</button>
        </div>

        <div class="card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Perfil</th>
                            <th>Loja</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Carlos Eduardo</td>
                            <td>carlos@empresa.com</td>
                            <td><span class="badge info">Admin</span></td>
                            <td>-</td>
                            <td>
                                <div class="actions">
                                    <button class="action-btn" title="Editar"><i style="color: #ffffff8f;" class="fa-solid fa-pen-to-square"></i></button>
                                    <button class="action-btn" title="Remover"><i style="color: #ffffff8f;" class="fa-solid fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Amanda Souza</td>
                            <td>amanda@loja.com</td>
                            <td><span class="badge primary">Atendente</span></td>
                            <td>Loja Centro</td>
                            <td>
                                <div class="actions">
                                    <button class="action-btn" title="Editar"><i style="color: #ffffff8f;" class="fa-solid fa-pen-to-square"></i></button>
                                    <button class="action-btn" title="Remover"><i style="color: #ffffff8f;" class="fa-solid fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
};
