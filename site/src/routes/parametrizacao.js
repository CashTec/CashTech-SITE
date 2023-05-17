var express = require("express");
var router = express.Router();

let parametrizacaoControllers = require("../controllers/parametrizacaoControllers");


router.get("/verParametroHardware/:idEmpresa", function (req, res) {
    parametrizacaoControllers.verParametroHardware(req, res);
})

router.put("/atualizarParametroHardware/:idEmpresa/:campo/:valor", function (req, res) {
   parametrizacaoControllers.atualizarParametroHardware(req, res); 
});

router.put("/pesquisarProcesso/:idEmpresa/:nome", function (req, res) {
    parametrizacaoControllers.pesquisarProcessoPermitido(req, res);
    
})

router.get("/verProcessosPermitidos/:idEmpresa", function (req, res) {
    parametrizacaoControllers.verProcessosPermitidos(req, res);
});


module.exports = router;