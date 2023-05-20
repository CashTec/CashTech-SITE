var parametrizacaoModel = require("../models/parametrizacaoModel");

function verParametroHardware(req, res) {
    const idEmpresa = req.params.idEmpresa;

    if (idEmpresa == null) {
        return res.status(400).send("IdEmpresa está nulo");
    } else {
        parametrizacaoModel.listarParametroHardware(idEmpresa).then((resposta) => {
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
}

function atualizarParametroHardware(req, res) {
    const idEmpresa = req.params.idEmpresa;
    const campo = req.params.campo;
    const valor = req.params.valor;

    if (idEmpresa == null || campo == null || valor == null) {
        return res.status(400).send("Valores nulos!");
    } else {
        parametrizacaoModel.atualizarParametroHardware(campo, valor, idEmpresa).then((resposta) => {
            return res.status(200).json(resposta);
        }).catch((error) => {
            console.log(error);
            console.log("\Houve um erro ao realizar a busca! Erro: " + error.sqlMessage);
            res.status(500).json(error.sqlMessage);
        })
    }
}

function verProcessosPermitidos(req, res) {
    const idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        return res.status(400).send("IdEmpresa está nulo!");
    } else {
        parametrizacaoModel.listarProcessosPermitidos(idEmpresa).then((resposta) => {
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

}

function pesquisarProcessoPermitido(req, res) {
    const nome = req.params.nome;

    if (nome == undefined) {
        return res.status(400).send("Nome está nulo!");
    } else {
        parametrizacaoModel.pesquisarProcessoPermitido(nome).then((resposta) => {
            if (resposta.length > 0) {
                return res.status(200).json(resposta);
            } else {
                return res.status(204).send("Não há dados!");
            }
        }).catch((erro) => {
            console.log(erro);
        })
    }
}

function deletarProcesso(req, res) {
    const id = req.params.id;

    if (id == undefined) {
        return res.status(400).send("id está nulo!");
    } else {
        parametrizacaoModel.deletarProcesso(id).then((resposta) => {
            return res.status(200).json(resposta);
        }).catch((error) => {
            console.log("\nHouve um erro ao realizar a busca com filtro! Erro: ", error.sqlMessage);
            res.status(500).json(error.sqlMessage);
        })
    }
}

function adicionarProcesso(req, res) {
    const nome = req.params.nome;
    const idEmpresa = req.params.idEmpresa;

    if (nome == undefined || idEmpresa == null) {
        return res.status(400).send("Campos nulos/undefined!");
    } else {
        parametrizacaoModel.adicionarProcesso(nome, idEmpresa).then((resposta) => {
            return res.status(200).json(resposta);
        }).catch((error) => {
            console.log("\nHouve um erro ao realizar a busca com filtro! Erro: ", error.sqlMessage);
            res.status(500).json(error.sqlMessage);
        })
    }
}

module.exports = {
    verProcessosPermitidos,
    verParametroHardware,
    atualizarParametroHardware,
    pesquisarProcessoPermitido,
    deletarProcesso,
    adicionarProcesso
} 
