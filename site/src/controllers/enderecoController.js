const enderecoModel = require("../models/enderecoModel");

async function verEnderecos(req, res) {
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
                    if (resposta.enderecosInativos.find(e => e.idAtm == res.idAtm) != null) return;
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


function exibirEndereco(req,res){
const idAtm = req.params.idAtm;
enderecoModel.buscarEnderecoAtm(idAtm)
.then((resposta)=>{
    console.log(res)
    res.json(resposta)

})
.catch(erro=>console.log(erro))
}

module.exports = {
    verEnderecos,
    exibirEndereco
}