// Função para Etapas do cadastro
var etapas = 1;
var numberProgress = 1;


function capturarStatusTela(acao) {
    let execucao = acao;

    // Variáveis globais
    let nomeEmpresaCadastro = document.getElementById("input_nomeEmpresaCadastro").value;
    let cnpjCadastro = document.getElementById("input_CnpjCadastro").value;
    let emailCadastro = document.getElementById("input_emailCadastro").value;
    let telefoneCadastro = document.getElementById("input_telefoneCadastro").value;
    let cepCadastro = document.getElementById("input_CepCadastro").value;
    let numeroCadastro = document.getElementById("input_numeroCadastro").value;
    let ruaCadastro = document.getElementById("input_ruaCadastro").value;
    let cidadeCadastro = document.getElementById("input_cidadeCadastro").value;
    let bairroCadastro = document.getElementById("input_baiiroCadastro").value;
    let nomeResponsavelCadastro = document.getElementById("input_nomeResponsavelCadastro").value;
    let loginCadastro = document.getElementById("input_loginCadastro").value;
    let senhaCadastro = document.getElementById("input_senhaCadastro").value;
    let confirmarSenhaCadastro = document.getElementById("input_confirmarSenhaCadastro").value;

    let divnomeEmpresaCadastro = document.getElementById("input_nomeEmpresaCadastro");

    if (nomeEmpresaCadastro == "" || emailCadastro == "" || cnpjCadastro == "") {
        divnomeEmpresaCadastro.style.border = "5px solid red";
    }

    else {
        mascara_cnpj();
        mascara_telefone();

    }




    passarEtapa(execucao);
}

function mascara_telefone() {
    let tamanho_telefoneCadastro = telefoneCadastro.length;

    if (tamanho_telefoneCadastro === 0) {
        telefoneCadastro.value += "(";
    }

    else if (tamanho_telefoneCadastro === 3) {
        telefoneCadastro.value += ") ";
    }

    else if (tamanho_telefoneCadastro === 5) {
        telefoneCadastro.value += "";
    }

    else if (tamanho_telefoneCadastro === 9) {
        telefoneCadastro.value += "-";
    }




}





function mascara_cnpj() {

    let tamanho_cnpjCadastro = cnpjCadastro.length;

    if (tamanho_cnpjCadastro === 2 || tamanho_cnpjCadastro === 6 || tamanho_cnpjCadastro === 15) {
        cnpjCadastro.value += "."
    }

    if (tamanho_cnpjCadastro === 10) {
        cnpjCadastro.value += "/"
    }
}

function passarEtapa(acao) {
    var etapa = document.getElementById("Etapa" + etapas);

    if (acao == "proximo") {
        etapa.style.display = "none";
        etapas++;
        numberProgress++;

        // Passar formulario
        var etapaProximo = document.getElementById("Etapa" + etapas);

        etapaProximo.classList.remove("etapaProximo", "etapaAnterior");
        etapaProximo.classList.add("etapaProximo")
        etapaProximo.style.display = "flex";
        // ------------------

        // Preencher numero da etapa
        barraProgress.style.height = numberProgress == 2 ? '40%' : '80%';

        setTimeout(() => {
            var numberEtapa = document.getElementById("etapaProgress" + numberProgress);
            numberEtapa.parentElement.classList.add("numeroPreenchido");
        }, "300");

        // ---------------

    } else {
        etapa.style.display = "none";
        etapas--;

        // Voltar formulario
        var etapaProximo = document.getElementById("Etapa" + etapas);

        etapaProximo.classList.remove("etapaProximo", "etapaAnterior");
        etapaProximo.classList.add("etapaAnterior");
        etapaProximo.style.display = "flex";
        // ------------------


        // Preencher numero da etapa
        var numberEtapa = document.getElementById("etapaProgress" + numberProgress);
        numberEtapa.parentElement.classList.remove("numeroPreenchido");

        setTimeout(() => {
            numberProgress--;
            if (numberProgress == 1) {
                barraProgress.style.height = '0%';
            } else if (numberProgress == 2) {
                barraProgress.style.height = '40%';
            } else {
                barraProgress.style.height = '80%';
            }
        }, "320");
        // ---------------
    }
}

function cadastrar() {


}