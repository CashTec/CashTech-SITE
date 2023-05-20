let express = require('express');
let router = express.Router();

let listaAtmController = require('../controllers/listaAtmControllers');

router.get('/:idEmpresa', (req, res) => {
    listaAtmController.listarAtm(req, res);
});

router.get("/ordernar/:idEmpresa/:tipo", (req, res) => {
    listaAtmController.ordernar(req, res);
});

router.get('/:idEmpresa/:tipo/:campo', (req, res) => {
    listaAtmController.filtroPesquisa(req, res);
});


router.delete('/:idAtm', (req, res) => {
    listaAtmController.deletar(req, res);
});

router.get('/listarUm/:idAtm', (req, res) => {
    listaAtmController.listarUm(req, res);
});

router.put('/atualizar/:idAtm', (req, res) => {
    listaAtmController.atualizar(req, res);
});

module.exports = router;