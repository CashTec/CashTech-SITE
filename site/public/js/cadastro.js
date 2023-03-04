// Função para Etapas do cadastro

var etapas = 1;


function passarEtapa(acao) {
    var etapa = document.getElementById("Etapa" + etapas);

    if (acao == "proximo") {
        etapa.style.display = "none";
        etapas++;
        var etapaProximo = document.getElementById("Etapa" + etapas);
        etapaProximo.classList.remove("etapaProximo", "etapaAnterior");
        etapaProximo.classList.add("etapaProximo")
        etapaProximo.style.display = "flex";

    } else {
        etapa.style.display = "none";
        etapas--;
        var etapaProximo = document.getElementById("Etapa" + etapas);
        etapaProximo.classList.remove("etapaProximo", "etapaAnterior");
        etapaProximo.classList.add("etapaAnterior");
        etapaProximo.style.display = "flex";

    }
}