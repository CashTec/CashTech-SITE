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


module.exports = {
    coletarInformacoesComponente
}