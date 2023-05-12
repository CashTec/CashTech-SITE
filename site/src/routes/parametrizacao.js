var express = require("express");
var router = express.Router();

var parametrizacaoControllers = require("../controllers/parametrizacaoControllers");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
    console.log("Entrei routes");
});

module.exports = router;