const geralModel = require('../models/geralModels.js');
const moment = require('moment');

async function verAtmAnormal(req, res) {
    const idEmpresa = req.params.idEmpresa;
    const data = req.params.dataAgora;

    if (idEmpresa == undefined || data == undefined) {
        return res.status(400).send("Dados inválidos!");
    }

    let dataFormatada = moment(data).format('YYYY-MM-DD HH:mm:ss');
    // tirar 3 segundos da data
    dataFormatada = moment(dataFormatada).subtract(5, 'seconds').format('YYYY-MM-DD HH:mm:ss');

    try {
        const resposta = await geralModel.verAtmAnormal(idEmpresa, dataFormatada);
        if (resposta.length > 0) {
            let json = [];
            for (const res of resposta) {
                console.log(res.idAtm);
                const metricas = await geralModel.verUltimasMetricas(res.idAtm);
                json.push(metricas);
            }
            return res.status(200).json(json);
        }
        else {
            return res.status(204).send("Não há dados!");
        }
    } catch (error) {
        console.log(error);
        console.log("\nHouve um erro ao realizar a busca! Erro: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    }
}

function verCidadeMaisInativo(req, res) {
    geralModel.verCidadeMaisInativo()
        .then((resposta) => {
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

function processoMaisEncerrado(req, res) {
    const idEmpresa = req.params.idEmpresa;
    const data = req.params.dataAgora;

    let dataFormatada = moment(data).format('YYYY-MM-DD HH:mm:ss');

    geralModel.processoMaisEncerrado(idEmpresa, dataFormatada)
        .then((resposta) => {
            console.log(resposta);
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

function qtdAtmInativos(req, res) {
    const idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        return res.status(400).send("Dados inválidos!");
    }

    geralModel.qtdAtmInativos(idEmpresa)
        .then((resposta) => {
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
    verAtmAnormal,
    qtdAtmInativos,
    verCidadeMaisInativo,
    processoMaisEncerrado
}


