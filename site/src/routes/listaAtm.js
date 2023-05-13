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


router.delete('/:idEmpresa/:idAtm', (req, res) => {
    listaAtmController.deletar(req, res);
});

module.exports = router;