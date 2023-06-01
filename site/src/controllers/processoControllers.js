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
            return res.status(204).send("Não há dados!");
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
            return res.status(204).send("Não há dados!");
        }
    }).catch((error) => {
        console.log(error);
        console.log("\nHouve um erro ao realizar a busca! Erro: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    })
}

function verProcessoMaisFinalizado(req, res) {
    const idAtm = req.params.idAtm;
    let dtProcesso = req.params.dtProcesso;
    dtProcesso = dtProcesso.replaceAll("barra", "/");
    
    if (idAtm == undefined || dtProcesso == undefined) {
        return res.status(400).send("idAtm ou dtProcesso está null!")
    }

    processoModel.verProcessoMaisFinalizado(dtProcesso, idAtm).then((resposta) => {
        if (resposta.length > 0) {
            return res.status(200).json(resposta);
        } else {
            return res.status(204).send("Não há dados!");
        }
    }).catch((error) => {
        console.log(error);
        console.log("\nHouve um erro ao realizar a busca! Erro: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    })
}

function horarioMaisFinalizado(req, res) {
    const idAtm = req.params.idAtm;
    let dtProcesso = req.params.dtProcesso;
    dtProcesso = dtProcesso.replaceAll("barra", "/");
    
    if (idAtm == undefined || dtProcesso == undefined) {
        return res.status(400).send("idAtm ou dtProcesso está null!")
    }

    processoModel.horarioMaisFinalizado(dtProcesso, idAtm).then((resposta) => {
        if (resposta.length > 0) {
            return res.status(200).json(resposta);
        } else {
            return res.status(204).send("Não há dados!");
        }
    }).catch((error) => {
        console.log(error);
        console.log("\nHouve um erro ao realizar a busca! Erro: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    })
}

module.exports = {
    processosAgora,
    processosKilled,
    verProcessoMaisFinalizado,
    horarioMaisFinalizado
}