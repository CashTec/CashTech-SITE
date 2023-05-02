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