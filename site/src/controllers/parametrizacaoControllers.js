var parametrizacaoModel = require("../models/parametrizacaoModel");

async function listarProcessos(req, res) {
    let idEmpresa = req.params.idEmpresa;

    if (idEmpresa == null) {
        return res.status(400).send("IdEmpresa está nulo");
    }

    let resposta = {
        enderecosInativos: [],
        enderecosAlerta: []
    };

    await enderecoModel.verEnderecosInativo(idEmpresa)
        .then(response => {
            if (response.length > 0) {
                response.forEach((res) => {
                    resposta.enderecosInativos.push(res);
                })
            }
        }).catch(err => {
            console.log(err)
            return res.status(500).send()
        })

    await enderecoModel.verEnderecosAlerta(idEmpresa)
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
}