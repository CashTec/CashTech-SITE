var express = require("express");
var router = express.Router();
var controllerMetrica = require("../controllers/metricasController");


router.get("/metricaRede/:idRede",(req,res)=>{
controllerMetrica.coletarMetricaRedeController(req,res);
})

router.get("/metricaComponente/:idComponente",(req,res)=>{
    controllerMetrica.coletarMetricaComponenteController(req,res);
    })

module.exports=router;