const geralModel = require('../models/geralModels.js');
const moment = require('moment-timezone');

async function verAtmAnormal(req, res) {
    const idEmpresa = req.params.idEmpresa;
    const data = req.params.dataAgora;

    if (idEmpresa == undefined || data == undefined) {
        return res.status(400).send("Dados inválidos!");
    }

    // passar data para horario de sao paulo
    let newData = moment(data).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');

    // tirar 3 segundos da data
    dataFormatada = moment(newData).subtract(5, 'seconds').format('YYYY-MM-DD HH:mm:ss');

    try {
        const resposta = await geralModel.verAtmAnormal(idEmpresa, dataFormatada);
        if (resposta.length > 0) {
            let json = [];
            for (const res of resposta) {
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
    const idEmpresa = req.params.idEmpresa;

    geralModel.verCidadeMaisInativo(idEmpresa)
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

    // passar data para horario de sao paulo
    let newData = moment(data).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
    
    // tirar 3 segundos da data
    dataFormatada = moment(newData).subtract(5, 'seconds').format('YYYY-MM-DD HH:mm:ss');

    geralModel.processoMaisEncerrado(idEmpresa, dataFormatada)
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

async function verStatusAtm(req, res) {
    const idEmpresa = req.params.idEmpresa;
    const data = req.params.dataAgora;

    if (idEmpresa == undefined || data == undefined) {
        return res.status(400).send("Dados inválidos!");
    }

    let dataFormatada = moment(data).format('YYYY-MM-DD HH:mm:ss');
    // tirar 3 segundos da data
    dataFormatada = moment(dataFormatada).subtract(5, 'seconds').format('YYYY-MM-DD HH:mm:ss');

    try {
        let qtdAtm = await geralModel.verTotalAtm(idEmpresa);
        let qtdInativo = await geralModel.qtdAtmInativos(idEmpresa);
        let qtdPerigo = await geralModel.qtdAtmPerigo(idEmpresa, dataFormatada);
        let qtdAlerta = await geralModel.qtdAtmAlerta(idEmpresa, dataFormatada);

        // se alguma quantidade for undefined, seta como 0
        qtdAtm = qtdAtm.length == 0 ? 0 : qtdAtm[0].qtdAtm;
        qtdInativo = qtdInativo.length == 0 ? 0 : qtdInativo[0].qtdInativo;
        qtdPerigo = qtdPerigo.length == 0 ? 0 : qtdPerigo[0].qtdPerigo;
        qtdAlerta = qtdAlerta.length == 0 ? 0 : qtdAlerta[0].qtdAlerta;

        let json = {
            qtdAtm: qtdAtm,
            qtdInativo: qtdInativo,
            qtdAlerta: qtdAlerta,
            qtdPerigo: qtdPerigo
        }

        return res.status(200).json(json);
    } catch (error) {
        console.log(error);
        console.log("\nHouve um erro ao realizar a busca! Erro: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    }
}

module.exports = {
    verAtmAnormal,
    qtdAtmInativos,
    verCidadeMaisInativo,
    processoMaisEncerrado,
    verStatusAtm
}


