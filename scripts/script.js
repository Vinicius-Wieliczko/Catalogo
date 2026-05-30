const url = 'https://catalogo-tykz.onrender.com/';

async function carregar() {
    const resposta = await fetch(url);
    const insumos = await resposta.json();
    
    document.getElementById('lista-quimicos').innerHTML = '';
    document.getElementById('lista-biologicos').innerHTML = '';

    insumos.forEach(item => {
        const cardHTML = `
            <div class="card">
                <div class="botoes-acao">
                    <button class="btnEditar" onclick="editar(${item.id}, '${item.nome}', '${item.categoria}', ${item.quantidade}, '${item.descricao}')">Editar</button>
                    <button class="btnDeletar" onclick="deletar(${item.id})">Apagar</button>
                </div>
                <b>${item.nome}</b> (${item.quantidade} kg/L)
                <p>${item.descricao}</p>
            </div>
        `;

        if (item.categoria === 'Biológicos') {
            document.getElementById('lista-biologicos').innerHTML += cardHTML;
        } else {
            document.getElementById('lista-quimicos').innerHTML += cardHTML;
        }
    });
}

document.getElementById('form').onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const dados = {
        nome: document.getElementById('nome').value,
        categoria: document.getElementById('categoria').value,
        quantidade: document.getElementById('quantidade').value,
        descricao: document.getElementById('descricao').value
    };

    const metodo = id ? 'PUT' : 'POST';
    const link = id ? `${url}/${id}` : url;

    await fetch(link, { method: metodo, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(dados) });
    
    document.getElementById('form').reset();
    document.getElementById('id').value = '';
    carregar();
};

window.editar = (id, nome, cat, qtd, desc) => {
    document.getElementById('id').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('categoria').value = cat;
    document.getElementById('quantidade').value = qtd;
    document.getElementById('descricao').value = desc;
};

window.deletar = async (id) => {
    await fetch(`${url}/${id}`, { method: 'DELETE' });
    carregar();
};

carregar();
