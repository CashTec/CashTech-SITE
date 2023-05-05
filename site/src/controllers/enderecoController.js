const enderecoModel = require("../models/enderecoModel");

function verEnderecos(req, res) {
    let idEmpresa = req.params.idEmpresa;

    if (idEmpresa == null) {
        return res.status(400).send("IdEmpresa está nulo");
    }

    let resposta = {
        enderecosInativos: [],
        enderecosAlerta: []
    };

    enderecoModel.verEnderecosInativo(idEmpresa)
        .then(response => {
            if (response.length > 0) {
                response.forEach((res) => {
                    resposta.enderecosInativos.push(enderecosInativos(res));
                })
            }
        }).catch(err => {
            console.log(err)
            return res.status(500).send()
        })

    enderecoModel.verEnderecosAlerta(idEmpresa)
        .then(response => {
            if (response.length > 0) {
                response.forEach((res) => {
                    resposta.enderecosAlerta.push(res)
                });
            }
        }
        ).catch(err => {
            console.log(err)
            return res.status(500).send()
        })

    return res.json(resposta);
}

module.exports = {
    verEnderecos
}