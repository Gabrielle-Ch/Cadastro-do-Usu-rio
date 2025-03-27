document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formCadastro");
    const cepInput = document.getElementById("cep");

    // Recuperar dados salvos
    carregarDadosSalvos();

    // Evento para buscar CEP
    cepInput.addEventListener("blur", buscarEndereco);

    // Evento para salvar os dados
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio do formulário
        salvarDados();
    });
});

// Função para buscar endereço via API ViaCEP
function buscarEndereco() {
    const cep = document.getElementById("cep").value;

    if (cep.length !== 8) {
        alert("Digite um CEP válido com 8 dígitos.");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado!");
                return;
            }
            document.getElementById("endereco").value = data.logradouro;
            document.getElementById("cidade").value = data.localidade;
            document.getElementById("estado").value = data.uf;
        })
        .catch(error => console.error("Erro ao buscar CEP:", error));
}

// Função para salvar dados no Web Storage
function salvarDados() {
    const dados = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        cep: document.getElementById("cep").value,
        endereco: document.getElementById("endereco").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value
    };

    localStorage.setItem("cadastroUsuario", JSON.stringify(dados));
    alert("Dados salvos com sucesso!");
}

// Função para carregar os dados salvos ao recarregar a página
function carregarDadosSalvos() {
    const dadosSalvos = localStorage.getItem("cadastroUsuario");

    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        document.getElementById("nome").value = dados.nome;
        document.getElementById("email").value = dados.email;
        document.getElementById("cep").value = dados.cep;
        document.getElementById("endereco").value = dados.endereco;
        document.getElementById("cidade").value = dados.cidade;
        document.getElementById("estado").value = dados.estado;
    }
}