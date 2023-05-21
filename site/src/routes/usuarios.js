var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
  usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
  usuarioController.entrar(req, res);
  console.log("Entrei routes");
});

router.post("/addUser/:idEmpresa", (req, res) => {
  usuarioController.addUser(req, res);
  console.log("Entrei routes");
});

router.get("/listar/:idEmpresa/:tipo/:campo", (req, res) => {
  usuarioController.listarFiltro(req, res);
});

router.get("/listar/:idEmpresa", (req, res) => {
  usuarioController.listar(req, res);
});

router.get("/listarUm/:idUsuario", (req, res) => {
  usuarioController.listarUm(req, res);
});

router.put("/editar/:idUsuario", (req, res) => {
  usuarioController.editar(req, res);
});

router.delete("/deletar_usuario/:idUsuario", (req, res) => {
  usuarioController.deletar_usuario(req, res);
});

module.exports = router;
