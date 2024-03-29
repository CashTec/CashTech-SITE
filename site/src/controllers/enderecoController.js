const enderecoModel = require("../models/enderecoModel");
const moment = require('moment-timezone');

async function verEnderecos(req, res) {
    let idEmpresa = req.params.idEmpresa;

    if (idEmpresa == null) {
        return res.status(400).send("IdEmpresa está nulo");
    }


    // pegar data de agora com o moment
    let dataFormatada = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');

    // tirar 10 segundos da data
    dataFormatada = moment(dataFormatada).subtract(6, 'seconds').format('YYYY-MM-DD HH:mm:ss');

    let resposta = {
        enderecosInativos: [],
        enderecosAlerta: []
    };

    try {

        await enderecoModel.verEnderecosInativo(idEmpresa)
            .then(response => {
                if (response.length > 0) {
                    response.forEach((res) => {
                        resposta.enderecosInativos.push(res);
                    })
                }
            }).catch(err => {
                console.log(err)
            })

        await enderecoModel.verEnderecosAlerta(idEmpresa, dataFormatada)
            .then(response => {
                if (response.length > 0) {
                    response.forEach((res) => {
                        if (resposta.enderecosInativos.find(e => e.idAtm == res.idAtm) != null) return;
                        resposta.enderecosAlerta.push(res)
                    });
                }
            }
            ).catch(err => {
                console.log(err)
            })
        return res.json(resposta);

    } catch (error) {
        console.log(error);
        console.log("\nHouve um erro ao realizar a busca! Erro: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    }


}


function exibirEndereco(req, res) {
    const idAtm = Number(req.params.idAtm);
    enderecoModel.buscarEnderecoAtm(idAtm)
        .then((resposta) => {
            if (resposta.length > 0) {
                res.status(200).json(resposta)
            }
            else {
                res.status(204).send()
            }
        })
        .catch(erro => {
            res.status(400).send(erro)
        })
}

module.exports = {
    verEnderecos,
    exibirEndereco
}