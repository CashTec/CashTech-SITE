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
    const idEmpresa = req.params.idEmpresa;
    const idAtm = req.params.idAtm;

    if (idEmpresa == null) {
        return res.status(400).send("idEmpresa está null!")
    }

    if (idAtm == null) {
        return res.status(400).send("idAtm está null!")
    }

    listaAtmModel.deletar(idEmpresa, idAtm).then((resposta) => {
        if (resposta.affectedRows > 0) {
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
module.exports = {
    listarAtm,
    filtroPesquisa,
    ordernar,
    deletar
};