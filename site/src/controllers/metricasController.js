var modelMetrica = require("../models/metricaModel");



function coletarMetricaComponenteController(req, res) {
    var idComponente = parseInt(req.params.idComponente);
    console.log(typeof idComponente)
    if (typeof idComponente == "number") {
        console.log("------------AI-----------------")
        modelMetrica.coletarMetricaRede(idComponente).then((resposta) => {
            console.log("------------ds-----------------")
            console.log("alora")
            if (resposta.length < 1) {
                res.status(204).send();
            } else {
                res.json(resposta)
                res.status(200).send()

            }
        }).catch((erro) => {
            console.log(erro);
            res.status(400).send(erro);
        })
    }
}

function coletarMetricaRedeController(req, res) {
    var idComponente = parseInt(req.params.idRede);
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