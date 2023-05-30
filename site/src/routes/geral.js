var express = require("express");
var router = express.Router();

const controllerGeral = require("../controllers/geralConstrollers");

router.get("/verAtmAnormal/:idEmpresa/:dataAgora",(req,res)=>{
    controllerGeral.verAtmAnormal(req,res);
});

router.get("/verCidadeMaisInativo/:idEmpresa",(req,res)=>{
    controllerGeral.verCidadeMaisInativo(req,res);
});

router.get("/processoMaisEncerrado/:idEmpresa/:dataAgora",(req,res)=>{
    controllerGeral.processoMaisEncerrado(req,res);
});

router.get("/qtdAtmInativo/:idEmpresa",(req,res)=>{
    controllerGeral.qtdAtmInativos(req,res);
});

router.get("/statusAtms/:idEmpresa/:dataAgora",(req,res)=>{
    controllerGeral.verStatusAtm(req,res);
});

module.exports = router;
