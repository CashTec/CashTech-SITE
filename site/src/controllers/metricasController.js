var modelMetrica = require("../models/metricaModel");



function coletarMetricaComponenteController(req, res) {
    var tipo = req.params.tipo;
    var idCaixa = parseInt(req.params.idCaixa);
    if (typeof idCaixa == "number") {
        modelMetrica.coletarMetricaComponente(idCaixa,tipo).then((resposta) => {
            if (resposta.length < 1) {
                res.status(204).send();
            } else {
                res.json(resposta)
            }
        }).catch((erro) => {
            console.log(erro);
            res.status(400).send(erro);
        })
    }
}

function coletarMetricaRedeController(req, res) {
    var idComponente = parseInt(req.params.idRede);
    console.log(typeof idComponente)
    if (!isNaN(idComponente)) {
        modelMetrica.coletarMetricaRede(idComponente).then((resposta) => {
            if (resposta.length < 1) {
                res.status(204).send();
            } else {
                res.json(resposta);
            }
        }).catch((erro) => {
            res.status(400).send(erro);
        })
    } else {
        res.status(400).send()
    }

}



module.exports = {
    coletarMetricaRedeController,
    coletarMetricaComponenteController
}