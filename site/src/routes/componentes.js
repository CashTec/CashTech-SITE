var express = require("express");
var router = express.Router();
var controllerComponente = require("../controllers/componenteControllers");

router.post("/infoComponente",(req,res)=>{
    controllerComponente.coletarInformacoesComponente(req,res);
})

router.get("/infoEndereco",(req,res)=>{
    controllerComponente.verEnderecos(req,res);
})

module.exports=router;