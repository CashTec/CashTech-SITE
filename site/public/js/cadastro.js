// Função para Etapas do cadastro
var etapas = 1;
var validacao = 1;
var numberProgress = 1;
var corBoxShadowRed = "#ff0000 0px 0px 7px 0px";
var corBoxShadowGreen = "2px 0px 9px 1px green";

function passarEtapa(acao) {

    // Valores captados nas inputs do cadastro.html
    //Etapa 01
    const nomeEmpresaCadastro = input_nomeEmpresaCadastro.value;
    const cnpjCadastro = input_CnpjCadastro.value;
    const emailCadastro = input_emailCadastro.value;
    const telefoneCadastro = input_telefoneCadastro.value;
    //Etapa 02
    const cepCadastro = input_CepCadastro.value;
    const numeroCadastro = input_numeroCadastro.value;
    const ruaCadastro = input_ruaCadastro.value;
    const cidadeCadastro = input_cidadeCadastro.value;
    const bairroCadastro = input_bairroCadastro.value;


    // Elementos para manipulação de css do cadastro.html
    // Etapa1
    const divNomeEmpresaCadastro = input_nomeEmpresaCadastro;
    const divCnpjCadastro = input_CnpjCadastro;
    const divEmailCadastro = input_emailCadastro;
    const divTelefoneCadastro = input_telefoneCadastro;
    // Etapa2
    const divCepCadastro = input_CepCadastro;
    const divNumeroCadastro = input_numeroCadastro;
    const divRuaCadastro = input_ruaCadastro;
    const divCidadeCadastro = input_cidadeCadastro;
    const divBairoCadastro = input_bairroCadastro;

    // Booleanos para saber se tem algo vazio:
    var isAlgumVazioEtapa1 = nomeEmpresaCadastro == "" || cnpjCadastro == "" || cnpjCadastro.length != 14 
        || emailCadastro == "" | telefoneCadastro == "" || telefoneCadastro.length != 11;

    var isAlgumVazioEtapa2 = cepCadastro == "" || cepCadastro.length != 8 || numeroCadastro == "" || ruaCadastro == "" || cidadeCadastro == "" | bairroCadastro == "";


    var etapa = document.getElementById("Etapa" + etapas);
    if (acao == "proximo") {

        if (isAlgumVazioEtapa1) {
            if (nomeEmpresaCadastro === "") {
                divNomeEmpresaCadastro.style.boxShadow = corBoxShadowRed;
            } else {
                divNomeEmpresaCadastro.style.boxShadow = corBoxShadowGreen;
            }
            if (cnpjCadastro === "" || cnpjCadastro.length != 14) {
                divCnpjCadastro.style.boxShadow = corBoxShadowRed;
            } else {
                divCnpjCadastro.style.boxShadow = corBoxShadowGreen;
            }

            if (emailCadastro === "") {
                divEmailCadastro.style.boxShadow = corBoxShadowRed;
            } else {
                divEmailCadastro.style.boxShadow = corBoxShadowGreen;
            }

            if (telefoneCadastro === "" || telefoneCadastro.length != 11) {
                divTelefoneCadastro.style.boxShadow = corBoxShadowRed;
            } else {
                divTelefoneCadastro.style.boxShadow = corBoxShadowGreen;
            }
            return false;
        } else {
            for (var i = 0; i < 4; i++) {
                Etapa1.children[1].children[i].children[1].style.boxShadow = corBoxShadowGreen;
            }
        }


        // Validação dos valores inputados do passo 2
        if (etapas >= 2) {
            if (isAlgumVazioEtapa2) {
                if (cepCadastro === "" || cepCadastro.length != 8) {
                    divCepCadastro.style.boxShadow = corBoxShadowRed;
                } else {
                    divCepCadastro.style.boxShadow = corBoxShadowGreen;
                }
                if (numeroCadastro === "") {
                    divNumeroCadastro.style.boxShadow = corBoxShadowRed;
                } else {
                    divNumeroCadastro.style.boxShadow = corBoxShadowGreen;
                }
                if (ruaCadastro === "") {
                    divRuaCadastro.style.boxShadow = corBoxShadowRed;
                } else {
                    divRuaCadastro.style.boxShadow = corBoxShadowGreen;
                }
                if (cidadeCadastro === "") {
                    divCidadeCadastro.style.boxShadow = corBoxShadowRed;
                } else {
                    divCidadeCadastro.style.boxShadow = corBoxShadowGreen;
                }
                if (bairroCadastro === "") {
                    divBairoCadastro.style.boxShadow = corBoxShadowRed;
                } else {
                    divBairoCadastro.style.boxShadow = corBoxShadowGreen;
                }
                return false
            } else {
                for (var i = 0; i < 2; i++) {
                    Etapa2.children[1].children[0].children[i].children[1].style.boxShadow = corBoxShadowGreen;
                }
                for (var i = 1; i < 4; i++) {
                    Etapa2.children[1].children[i].children[1].style.boxShadow = corBoxShadowGreen;
                }
            }
        }

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
        validacao--;
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
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeEmpresaVar = input_nomeEmpresaCadastro.value;
    var cnpjVar = input_CnpjCadastro.value;
    var emailVar = input_emailCadastro.value;
    var telefoneVar = input_telefoneCadastro.value;
    var cepVar = input_CepCadastro.value;
    var numeroVar = input_numeroCadastro.value;
    var ruaVar = input_ruaCadastro.value;
    var cidadeVar = input_cidadeCadastro.value;
    var bairroVar = input_bairroCadastro.value;
    var nomeResponsavelVar = input_nomeResponsavelCadastro.value;
    var loginVar = input_loginCadastro.value;
    var senhaVar = input_senhaCadastro.value;
    var confirmarSenhaCadastro = input_confirmarSenhaCadastro.value;

    // Inputs para mudar de cor Etapa3
    const divResponsavelCadastro = input_nomeResponsavelCadastro;
    const divLoginCadastro = input_loginCadastro;
    const divSenhaCadastro = input_senhaCadastro;
    const divConfirmSenhaCadastro = input_confirmarSenhaCadastro;
    // ---------------------------

    var isAlgumInvalidoEtapa3 = nomeResponsavelVar == "" || loginVar == "" || senhaVar == "" || confirmarSenhaCadastro == "" || confirmarSenhaCadastro != senhaVar;

    if (isAlgumInvalidoEtapa3) {
        if (nomeResponsavelVar === "") {
            divResponsavelCadastro.style.boxShadow = corBoxShadowRed;
        } else {
            divResponsavelCadastro.style.boxShadow = corBoxShadowGreen;
        }
        if (loginVar === "") {
            divLoginCadastro.style.boxShadow = corBoxShadowRed;
        } else {
            divLoginCadastro.style.boxShadow = corBoxShadowGreen;
        }
        if (senhaVar === "") {
            divSenhaCadastro.style.boxShadow = corBoxShadowRed;
            contPasso3 = 0;
        } else {
            divSenhaCadastro.style.boxShadow = corBoxShadowGreen;
        }
        if (confirmarSenhaCadastro != senhaVar || confirmarSenhaCadastro === "") {
            divConfirmSenhaCadastro.style.boxShadow = corBoxShadowRed;
        } else {
            divConfirmSenhaCadastro.style.boxShadow = corBoxShadowGreen;
        }
        return false;
    } else {
        for (var i = 0; i < 4; i++) {
            Etapa3.children[1].children[i].children[1].style.boxShadow = corBoxShadowGreen;
        }
    }


    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeEmpresaServer: nomeEmpresaVar,
            cnpjServer: cnpjVar,
            emailServer: emailVar,
            telefoneServer: telefoneVar,
            cepServer: cepVar,
            numeroServer: numeroVar,
            ruaServer: ruaVar,
            cidadeServer: cidadeVar,
            bairroServer: bairroVar,
            nomeResponsavelServer: nomeResponsavelVar,
            loginServer: loginVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            setTimeout(() => {
                window.location = "login.html";
            }, "2000")

        } else {
            console.log("estou no fetch");
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);

    });
    return false;
}