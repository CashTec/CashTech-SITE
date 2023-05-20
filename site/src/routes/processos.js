var express = require("express");
var router = express.Router();

let processoController = require("../controllers/processoControllers");

router.get("/processosAgora/:idAtm", (req, res) => {
    processoController.processosAgora(req, res);
})

router.get("/processosKilled/:idAtm", (req, res) => {
    processoController.processosKilled(req, res);
})

router.get("/verProcessoMaisFinalizado/:idAtm/:dtProcesso/", (req, res) => {
    processoController.verProcessoMaisFinalizado(req, res);
})

router.get("/verHorarioMaisFinalizado/:idAtm/:dtProcesso", (req, res) => {
    processoController.horarioMaisFinalizado(req, res);
})

module.exports = router;