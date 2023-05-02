const usuarioModel = require("../models/componenteModel");


function coletarInformacoesComponente(req, res) {
    const idAtm = req.body.idAtmServer;
    const tipo = req.body.componenteServer;
    if ((idAtm != null && tipo != null) && typeof idAtm == 'number') {
        usuarioModel.coletarInformacoesComponentes(idAtm)
            .then((resposta) => {
                if (resposta.length > 0) {
                    let dado = [];
                    resposta.forEach(element => {
                        if (element.tipo === tipo) {
                            dado.push(element);
                        }
                    })
                    return res.json(dado)
                } else {
                    return res.status(204).send()
                }
            });
    } else {
        return res.status(400).send()
    }
}


function verEnderecos(req, res) {
}

module.exports = {
    coletarInformacoesComponente,
    verEnderecos
}