const usuarioModel = require("../models/componenteModel");
const interfaceRedeModel = require("../models/interfaceRedeModel")

function coletarInformacoesComponente(req, res) {
    const idAtm = req.body.idAtmServer;
    const tipo = req.body.componenteServer;

    let dado=[];
    let dadoRetornado=[];
    if ((idAtm != null && tipo != null) && typeof idAtm == 'number') {
        usuarioModel.coletarInformacoesComponentes(idAtm, tipo)
            .then(respostaCompontente => {
                dado = respostaCompontente;
                        interfaceRedeModel.coletarInformacaoRede(idAtm).then((respostaRede) => {
                            dado.push({
                                id: respostaRede[0].id,
                                nome: respostaRede[0].nome,
                                nome_exibicao: respostaRede[0].nome_exibicao,
                                ipv4: respostaRede[0].ipv4,
                                ipv6: respostaRede[0].ipv6,
                                mac: respostaRede[0].mac,
                                caixa_eletronico_id: respostaRede[0].caixa_eletronico_id,
                                tipo: "rede"
                            });

                            dado.forEach(element => {
                                if (element.tipo == tipo) {
                                    dadoRetornado.push(element);
                                }
                            })

                            return res.json(dadoRetornado);
                        }).catch((erro) => {
                            console.log(erro)
                            return res.status(400).send()
                        })
                    })
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