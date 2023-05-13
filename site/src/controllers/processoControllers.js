const processoModel = require("../models/processoModel.js");


function processosAgora(req, res) {
    const idAtm = req.params.idAtm;

    if (idAtm == null) {
        return res.status(400).send("idAtm está null!")
    }

    processoModel.verProcessosAgora(idAtm).then((resposta) => {
        if (resposta.length > 0) {
            return res.status(200).json(resposta);
        } else {
            return res.status(403).send("Não há dados!");
        }
    }).catch((error) => {
        console.log(error);
        console.log("\nHouve um erro ao realizar a busca! Erro: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    })

}


function processosKilled(req, res) {
    const idAtm = req.params.idAtm;

    if (idAtm == null) {
        return res.status(400).send("idAtm está null!")
    }

    processoModel.verProcessosKilled(idAtm).then((resposta) => {
        if (resposta.length > 0) {
            return res.status(200).json(resposta);
        } else {
            return res.status(403).send("Não há dados!");
        }
    }).catch((error) => {
        console.log(error);
        console.log("\nHouve um erro ao realizar a busca! Erro: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    })

}

module.exports = {
    processosAgora,
    processosKilled
}