var express = require("express");
var router = express.Router();

let parametrizacaoControllers = require("../controllers/parametrizacaoControllers");


router.get("/verParametroHardware/:idEmpresa", function (req, res) {
    parametrizacaoControllers.verParametroHardware(req, res);
})

router.put("/atualizarParametroHardware/:idEmpresa/:campo/:valor", function (req, res) {
   parametrizacaoControllers.atualizarParametroHardware(req, res); 
});

router.get("/pesquisarProcessoPermitido/:nome", function (req, res) {
    parametrizacaoControllers.pesquisarProcessoPermitido(req, res);
    
})

router.delete("/deletarProcesso/:id", function (req, res) {
    parametrizacaoControllers.deletarProcesso(req, res);
})

router.get("/verProcessosPermitidos/:idEmpresa", function (req, res) {
    parametrizacaoControllers.verProcessosPermitidos(req, res);
});

router.post("/adicionarProcesso/:id/:nome/:valor/:idEmpresa", function (req, res) {
    parametrizacaoControllers.adicionarProcesso(req, res);
})

module.exports = router;