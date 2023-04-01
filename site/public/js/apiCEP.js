var cep = input_CepCadastro;
var logradouro = input_ruaCadastro;
var bairro = input_bairroCadastro;
var cidade = input_cidadeCadastro;

function pegarEndereco() {
    var script = document.createElement('script');

    script.src = `https://viacep.com.br/ws/${cep.value}/json/?callback=retornarEndereco`;

    document.body.appendChild(script);
}
 
function retornarEndereco(endereco) {
    logradouro.value = (endereco.logradouro);
    bairro.value = (endereco.bairro);
    cidade.value = (endereco.localidade)

}