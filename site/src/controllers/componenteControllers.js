const usuarioModel = require("../models/componenteModel");


function coletarInformacoesComponente(req, res) {
    const idAtm = req.body.idAtm;
    const tipo = req.body.tipo;
    if ((idAtm != null && tipo != null) && typeof idAtm == 'number') {
        usuarioModel.coletarInformacoesComponentes(idAtm, tipo)
            .then((resposta) => {
                if (resposta.length > 0) {
                    return res.json(resposta)
                }
                else {
                    return res.status(204).send()
                }
            });
    }
    else {
        return res.status(400).send()
    }
}


function verEnderecos(req, res) {
    let idEmpresa = sessionStorage.getItem("ID_EMPRESA");

    let resposta = {
        enderecosInativos,
        enderecosAlerta
    };

    compontenteModel.verEnderecosInativo(idEmpresa)
        .then(response => {
            if (response.length > 0) {
                resposta.enderecosInativos = response;
            }
            else {
                return res.status(204).send()
            }
        }).catch(err => {
            console.log(err)
            return res.status(500).send()
        })

    compontenteModel.verEnderecosAlerta(idEmpresa)
        .then(response => {
            if (response.length > 0) {
                resposta.enderecosAlerta = response;
                return res.json(resposta)
            }
            else {
                return res.status(204).send()
            }
        }
        ).catch(err => {
            console.log(err)
            return res.status(500).send()
        })

}

module.exports = {
    coletarInformacoesComponente,
    verEnderecos
}