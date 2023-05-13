var parametrizacaoModel = require("../models/parametrizacaoModel");


function verProcessosPermitidos(req, res) {
    const idEmpresa = req.params.idEmpresa;


    if (idEmpresa == null) {
        return res.status(400).send("IdEmpresa está nulo");
    } else {
        parametrizacaoModel.listarProcessosPermitidos(idEmpresa).then((resposta) => {
            if(resposta.lenght > 0) {
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

function verParametroHardware(req, res) {
    const idEmpresa = req.params.idEmpresa;

    if (idEmpresa == null) {
        return res.status(400).send("IdEmpresa está nulo");
    } else {
        parametrizacaoModel.listarParametroHardware(idEmpresa).then((resposta) => {
            if(resposta.lenght > 0) {
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


module.exports = {
    verProcessosPermitidos,
    verParametroHardware,
} 
