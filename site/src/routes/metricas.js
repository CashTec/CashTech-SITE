var express = require("express");
var router = express.Router();
var controllerMetrica = require("../controllers/metricasController");


router.get("/metricaRede/:idAtm", (req, res) => {
    controllerMetrica.coletarMetricaRedeController(req, res);
})

router.get("/metricaComponente/:idCaixa/:tipo", (req, res) => {
    controllerMetrica.coletarMetricaComponenteController(req, res);
})

router.get("/dadosGravados/:idAtm/:dtHoje", (req, res) => {
    controllerMetrica.coletarQuantidadeGravadaController(req, res)
})

router.get("/dadosGravadosRede/:idAtm/:dtHoje", (req, res) => {
    controllerMetrica.coletarQuantidadeGravadaRedeController(req, res)
})

router.get("/apiceRede/:idAtm", (req, res) => {
    controllerMetrica.coletarApiceRedeController(req, res)
})

router.get("/infoDisco/:idCaixa", (req, res) => {
    controllerMetrica.coletarInfoDiscoController(req, res)
})



module.exports = router;