const listaAtmModel = require('../models/listaAtmModel');

function listarAtm(req, res) {
    const idEmpresa = req.params.idEmpresa;

    if (idEmpresa == null) {
        return res.status(400).send("idEmpresa está null!")
    }

    listaAtmModel.listarAtm(idEmpresa).then((resposta) => {
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

function filtroPesquisa(req, res) {
    const idEmpresa = req.params.idEmpresa;
    const tipo = verificarTipo(req.params.tipo);
    const campo = req.params.campo;

    if (idEmpresa == null) {
        return res.status(400).send("idEmpresa está null!")
    }

    if (tipo == null) {
        return res.status(400).send("tipo está null!")
    }

    if (campo == null) {
        return res.status(400).send("campo está null!")
    }

    listaAtmModel.filtroPesquisa(idEmpresa, tipo, campo).then((resposta) => {
        if (resposta.length > 0) {
            return res.status(200).json(resposta);
        } else {
            return res.status(204).send("Não há dados!");
        }
    }).catch((error) => {
        console.log(error);
        console.log("\nHouve um erro ao realizar a busca com filtro! Erro: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    })
}

function ordernar(req, res) {
    const idEmpresa = req.params.idEmpresa;
    const tipo = verificarTipo(req.params.tipo);

    if (idEmpresa == null) {
        return res.status(400).send("idEmpresa está null!")
    }

    if (tipo == null) {
        return res.status(400).send("tipo está null!")
    }

    listaAtmModel.ordernar(idEmpresa, tipo).then((resposta) => {
        if (resposta.length > 0) {
            return res.status(200).json(resposta);
        } else {
            return res.status(204).send("Não há dados!");
        }
    }).catch((error) => {
        console.log(error);
        console.log("\nHouve um erro ao realizar a busca com filtro! Erro: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    })
}

function deletar(req, res) {
    const idAtm = req.params.idAtm;

    if (idAtm == null) {
        return res.status(400).send("idAtm está null!")
    }

    listaAtmModel.deletar(idAtm).then((resposta) => {
        return res.status(200).json(resposta);
    }).catch((error) => {
        console.log(error);
        console.log("\nHouve um erro ao realizar a busca com filtro! Erro: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    })
}

function verificarTipo(tipo) {
    const tipos = {
        'identificador': 'ce.identificador',
        'situacao': 'ce.situacao',
        'inicio': 'ms.iniciado',
        'atividade': 'ms.tempo_atividade',
        'cep': 'e.cep',
        'rua': 'e.rua',
        'numero': 'e.numero',
        'bairro': 'e.bairro',
        'cidade': 'e.cidade',
        'atividade': 'ms.tempo_atividade'
    };

    return tipos[tipo];
}

function listarUm(req, res) {
    const idAtm = req.params.idAtm;

    if (idAtm == null) {
        return res.status(400).send("idAtm está null!")
    }

    listaAtmModel.listarUm(idAtm).then((resposta) => {
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

async function atualizar(req, res) {
    const idAtm = req.params.idAtm;
    const identificador = req.body.identificador;
    const situacao = req.body.situacao;
    const cep = req.body.cep;
    const numero = req.body.numero;
    const rua = req.body.rua;
    const cidade = req.body.cidade;
    const bairro = req.body.bairro;
    const lat = req.body.lat;
    const lng = req.body.lng;

    const camposObrigatorios = [
        'identificador',
        'situacao',
        'cep',
        'numero',
        'rua',
        'cidade',
        'bairro',
        'lat',
        'lng'
    ];

    const camposFaltantes = camposObrigatorios.filter(campo => req.body[campo] === undefined);

    if (camposFaltantes.length > 0) {
        res.status(400).send(`Os seguintes campos estão faltando: ${camposFaltantes.join(', ')}`);
        return;
    }

    try {
        await listaAtmModel.atualizarAtm(idAtm, identificador, situacao);
        await listaAtmModel.atualizarEndereco(idAtm, cep, numero, rua, cidade, bairro, lat, lng);
        res.status(200).send("Atualização realizada com sucesso!");
    } catch (error) {
        console.log(error);
        console.log("\nHouve um erro ao realizar a atualização! Erro: ", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
    }
}

module.exports = {
    listarAtm,
    filtroPesquisa,
    ordernar,
    deletar,
    listarUm,
    atualizar
};