var express = require("express");
var router = express.Router();

var controllerEndereco = require("../controllers/enderecoController");


router.get("/:idEmpresa", (req, res) => {
    controllerEndereco.verEnderecos(req, res);
})

router.get("/exibirEndereco/:idAtm",(req,res)=>{
    controllerEndereco.exibirEndereco(req,res);
})


module.exports = router;