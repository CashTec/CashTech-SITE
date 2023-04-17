var cep;
var logradouro;
var bairro;
var cidade;

function pegarEndereco() {
    cep = input_CepCadastro;
    logradouro = input_ruaCadastro;
    bairro = input_bairroCadastro;
    cidade = input_cidadeCadastro;

    var script = document.createElement('script');

    script.src = `https://viacep.com.br/ws/${cep.value}/json/?callback=retornarEndereco`;

    document.body.appendChild(script);
}


function pegarEnderecoModal() {
    cep = in_edtCep;
    logradouro = in_edtRua;
    bairro = in_edtBairro;
    cidade = in_edtCidade;

    var script = document.createElement('script');

    script.src = `https://viacep.com.br/ws/${cep.value}/json/?callback=retornarEndereco`;

    document.body.appendChild(script);
}

function retornarEndereco(endereco) {
    logradouro.value = (endereco.logradouro);
    bairro.value = (endereco.bairro);
    cidade.value = (endereco.localidade)

}
