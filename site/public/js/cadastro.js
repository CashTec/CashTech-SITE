// Função para Etapas do cadastro

var etapas = 1;
var numberProgress = 1;

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
