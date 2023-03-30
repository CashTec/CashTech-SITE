// Função para Etapas do cadastro
var etapas = 1;
var numberProgress = 1;

// Marcador de campos corretos
let contPasso1 = 0;
let contPasso2 = 0;
let contPasso3 = 0;

function capturarStatusTela(acao) {
    let execucao = acao; // --> tomei a liberdade de manipular a ação


    // Valores captados noas inputs do cadastro.html
    let nomeEmpresaCadastro = document.getElementById("input_nomeEmpresaCadastro").value;
    let cnpjCadastro = document.getElementById("input_CnpjCadastro").value;
    let emailCadastro = document.getElementById("input_emailCadastro").value;
    let telefoneCadastro = document.getElementById("input_telefoneCadastro").value;
    let cepCadastro = document.getElementById("input_CepCadastro").value;
    let numeroCadastro = document.getElementById("input_numeroCadastro").value;
    let ruaCadastro = document.getElementById("input_ruaCadastro").value;
    let cidadeCadastro = document.getElementById("input_cidadeCadastro").value;
    let bairroCadastro = document.getElementById("input_bairroCadastro").value;
    let nomeResponsavelCadastro = document.getElementById("input_nomeResponsavelCadastro").value;
    let loginCadastro = document.getElementById("input_loginCadastro").value;
    let senhaCadastro = document.getElementById("input_senhaCadastro").value;
    let confirmarSenhaCadastro = document.getElementById("input_confirmarSenhaCadastro").value;

    // Elementos para manipulação de css do cadastro.html
    // passo1
    const divNomeEmpresaCadastro = document.getElementById("input_nomeEmpresaCadastro");
    const divCnpjCadastro = document.getElementById("input_CnpjCadastro");
    const divEmailCadastro = document.getElementById("input_emailCadastro");
    const divTelefoneCadastro = document.getElementById("input_telefoneCadastro");
    // passo2
    const divCepCadastro = document.getElementById("input_CepCadastro");
    const divNumeroCadastro = document.getElementById("input_numeroCadastro");
    const divRuaCadastro = document.getElementById("input_ruaCadastro");
    const divCidadeCadastro = document.getElementById("input_cidadeCadastro");
    const divBairoCadastro = document.getElementById("input_bairroCadastro");
    // passo3
    const divResponsavelCadastro = document.getElementById("input_nomeResponsavelCadastro");
    const divLoginCadastro = document.getElementById("input_loginCadastro");
    const divSenhaCadastro = document.getElementById("input_senhaCadastro");
    const divConfirmSenhaCadastro = document.getElementById("input_confirmarSenhaCadastro");



    // Validação dos valores inputados do passo 1
    contPasso1 = 0;
    if (etapas === 1) {

        if (nomeEmpresaCadastro === "") {
            divNomeEmpresaCadastro.style.border = "1px solid red";
            divNomeEmpresaCadastro.style.boxShadow = "2px 0px 9px 1px red";
            contPasso1 = 0;
        } else {
            divNomeEmpresaCadastro.style.boxShadow = "2px 0px 9px 1px green";
            divNomeEmpresaCadastro.style.border = "1px solid green";
            contPasso1++;
        }

        if (cnpjCadastro === "" || cnpjCadastro.length != 11) {
            divCnpjCadastro.style.border = "1px solid red";
            divCnpjCadastro.style.boxShadow = "2px 0px 9px 1px red";
            contPasso1 = 0;
        } else {
            divCnpjCadastro.style.border = "1px solid green";
            divCnpjCadastro.style.boxShadow = "2px 0px 9px 1px green";
            contPasso1++;
        }

        if (emailCadastro === "") {
            divEmailCadastro.style.border = "1px solid red";
            divEmailCadastro.style.boxShadow = "2px 0px 9px 1px red";
            contPasso1 = 0;
        } else {
            divEmailCadastro.style.border = "1px solid green";
            divEmailCadastro.style.boxShadow = "2px 0px 9px 1px green";
            contPasso1++;
        }

        if (telefoneCadastro === "" || telefoneCadastro.length != 10) {
            divTelefoneCadastro.style.border = "1px solid red";
            divTelefoneCadastro.style.boxShadow = "2px 0px 9px 1px red";
            contPasso1 = 0;
        } else {
            divTelefoneCadastro.style.border = "1px solid green";
            divTelefoneCadastro.style.boxShadow = "2px 0px 9px 1px green";
            contPasso1++;
        }

        if (contPasso1 === 4) { passarEtapa("proximo"); }

    }

    console.log(etapas);

    // Validação dos valores inputados do passo 2   
    contPasso2 = 0;
    if (etapas === 2) {
        if (cepCadastro === "" || cepCadastro.length != 8) {
            divCepCadastro.style.border = "1px solid red";
            divCepCadastro.style.boxShadow = "2px 0px 9px 1px red";
            contPasso2 = 0;
        } else {
            divCepCadastro.style.boxShadow = "2px 0px 9px 1px green";
            divCepCadastro.style.border = "1px solid green";
            contPasso2++;
        }
        if (numeroCadastro === "") {
            divNumeroCadastro.style.border = "1px solid red";
            divNumeroCadastro.style.boxShadow = "2px 0px 9px 1px red";
            contPasso2 = 0;
        } else {
            divNumeroCadastro.style.boxShadow = "2px 0px 9px 1px green";
            divNumeroCadastro.style.border = "1px solid green";
            contPasso2++;
        }
        if (ruaCadastro === "") {
            divRuaCadastro.style.border = "1px solid red";
            divRuaCadastro.style.boxShadow = "2px 0px 9px 1px red";
            contPasso2 = 0;
        } else {
            divRuaCadastro.style.boxShadow = "2px 0px 9px 1px green";
            divRuaCadastro.style.border = "1px solid green";
            contPasso2++;
        }
        if (cidadeCadastro === "") {
            divCidadeCadastro.style.border = "1px solid red";
            divCidadeCadastro.style.boxShadow = "2px 0px 9px 1px red";
            contPasso2 = 0;
        } else {
            divCidadeCadastro.style.boxShadow = "2px 0px 9px 1px green";
            divCidadeCadastro.style.border = "1px solid green";
            contPasso2++;
        }
        if (bairroCadastro === "") {
            divBairoCadastro.style.border = "1px solid red";
            divBairoCadastro.style.boxShadow = "2px 0px 9px 1px red";
            contPasso2 = 0;
        } else {
            divBairoCadastro.style.boxShadow = "2px 0px 9px 1px green";
            divBairoCadastro.style.border = "1px solid green";
            contPasso2++;
        }

        if (contPasso2 === 5) { passarEtapa(execucao); }
    }


    // Validação dos valores inputados do passo 3
    contPasso3 = 0;
    if (etapas === 3) {
        console.log(etapas);
        if (nomeResponsavelCadastro === "") {
            divResponsavelCadastro.style.border = "1px solid red";
            divResponsavelCadastro.style.boxShadow = "2px 0px 9px 1px red";
            contPasso3 = 0;
        } else {
            divResponsavelCadastro.style.boxShadow = "2px 0px 9px 1px green";
            divResponsavelCadastro.style.border = "1px solid green";
            contPasso3++;
        }

        if (loginCadastro === "") {
            divLoginCadastro.style.border = "1px solid red";
            divLoginCadastro.style.boxShadow = "2px 0px 9px 1px red";
            contPasso3 = 0;
        } else {
            divLoginCadastro.style.border = "1px solid green";
            divLoginCadastro.style.boxShadow = "2px 0px 9px 1px green";
            contPasso3++;
        }

        if (senhaCadastro === "") {
            divSenhaCadastro.style.border = "1px solid red";
            divSenhaCadastro.style.boxShadow = "2px 0px 9px 1px red";
            contPasso3 = 0;
        } else {
            divSenhaCadastro.style.border = "1px solid green";
            divSenhaCadastro.style.boxShadow = "2px 0px 9px 1px green";
            contPasso3++;
        }

        if (confirmarSenhaCadastro === "") {
            divConfirmSenhaCadastro.style.border = "1px solid red";
            divConfirmSenhaCadastro.style.boxShadow = "2px 0px 9px 1px red";
            contPasso3 = 0;
        } else {
            divConfirmSenhaCadastro.style.border = "1px solid green";
            divConfirmSenhaCadastro.style.boxShadow = "2px 0px 9px 1px green";
            contPasso3++;
        }
        if (contPasso3 === 4) { passarEtapa(execucao); }
    }



    // if (passo1Certo && passo2Certo && passo3Certo){

    // }

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
