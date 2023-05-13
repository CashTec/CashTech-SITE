var express = require("express");
var router = express.Router();

var controllerEndereco = require("../controllers/enderecoController");


router.get("/:idEmpresa", (req, res) => {
    controllerEndereco.verEnderecos(req, res);
})


module.exports = router;