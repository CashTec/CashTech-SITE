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


function coletarInfoDiscoController(req,res){
    let idCaixa = req.params.idCaixa;
    modelMetrica.coletarInfoDisco(idCaixa)
    .then((resposta)=>{
        if(resposta.length>0){
            res.status(200).json(resposta);
        }
        else{
            res.status(204).send();
        }
    }
    )
    .catch((erro)=>{
        res.status(400).send()
        console.log(erro);
    })
}

function coletarQuantidadeGravadaController(req,res){
    const idAtm = Number(req.params.idAtm);
    const dtHoje = req.params.dtHoje;
    let dataEnviada = dtHoje.split("-");
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
    })
}


function coletarApiceRedeController(req,res){
    const idAtm = Number(req.params.idAtm);
    let dtHoje = new Date();
    let dia = dtHoje.getDate().toString().length==1 ?"0"+dtHoje.getDate() : dtHoje.getDate();
    let mes = (dtHoje.getMonth()+1).toString().length ==1 ? "0"+(dtHoje.getMonth()+1): dtHoje.getMonth()+1;
    let ano =  dtHoje.getFullYear();
    dtHoje =  `${dia}/${mes}/${ano}`;
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
    coletarQuantidadeGravadaController,
    coletarInfoDiscoController
}