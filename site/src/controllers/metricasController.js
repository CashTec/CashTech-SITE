var modelMetrica = require("../models/metricaModel");
var modelRede = require("../models/interfaceRedeModel")


function coletarMetricaComponenteController(req, res) {
    var tipo = req.params.tipo;
    var idCaixa = parseInt(req.params.idCaixa);
    if (typeof idCaixa == "number") {
        modelMetrica.coletarMetricaComponente(idCaixa,tipo).then((resposta) => {
            if (resposta.length < 1) {
                res.status(204).send();
            } else {
                res.json(resposta)
            }
        }).catch((erro) => {
            console.log(erro);
            res.status(400).send(erro);
        })
    }
}

function coletarMetricaRedeController(req, res) {
    var idComponente = parseInt(req.params.idAtm);
    if (!isNaN(idComponente)) {
        modelMetrica.coletarMetricaRede(idComponente).then((resposta) => {
            console.log("----------ENTREI NA CONTROLLER REDE");
            if (resposta.length < 1) {
                res.status(204).send();
            } else {
                res.json(resposta);
            }
        }).catch((erro) => {
            res.status(400).send(erro);
        })
    } else {
        res.status(400).send()
    }

}


function coletarQuantidadeGravadaController(req,res){
    const idAtm = Number(req.params.idAtm);
    const dtHoje = req.params.dtHoje;
    const dataEnviada = dtHoje.split("-")

    
console.log(dataEnviada);
    modelMetrica.coletarQuantidadeGravadaHoje(idAtm,dataEnviada)
    .then((resposta)=>{
        if(resposta.length>0){
            res.status(200).json(resposta);
        }
        else{
            res.status(204).send();
        }
    })
    .catch((erro)=>{
        res.status(400).send()
        console.log(erro);
    })
}


function coletarQuantidadeGravadaRedeController(req,res){
    const idAtm = Number(req.params.idAtm);
    const dtHoje = req.params.dtHoje;    
    modelRede.coletarQuantidadeGravadaHoje(idAtm,dtHoje)
    .then((resposta)=>{
        if(resposta.length>0){
            res.status(200).json(resposta);
        }
        else{
            res.status(204).send();
        }
    })
    .catch((erro)=>{
        res.status(400).send()
        console.log(erro);
    })
}


function coletarApiceRedeController(req,res){
    const idAtm = Number(req.params.idAtm);
    let dtHoje = new Date();
    dtHoje = dtHoje.getDate()+"/"+((dtHoje.getMonth()+1).toString().length==1 ?"0":"")+(dtHoje.getMonth()+1)+"/"+dtHoje.getFullYear();
    console.log(dtHoje);
    modelRede.coletarApiceRede(idAtm,dtHoje)
    .then((response)=>{
        if(response.length>0){
        res.status(200).json(response);
        }
        else{
        res.status(204).send();
        }
    })
    .catch((erro)=>{
        res.status(400).send(erro)
    })
}


module.exports = {
    coletarApiceRedeController,
    coletarMetricaRedeController,
    coletarMetricaComponenteController,
    coletarQuantidadeGravadaRedeController,
    coletarQuantidadeGravadaController
}