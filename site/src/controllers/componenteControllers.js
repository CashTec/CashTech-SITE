const usuarioModel = require("../models/componenteModel");


function coletarInformacoesComponente(req, res) {
    const idAtm = req.body.idAtm;
    const tipo = req.body.tipo;
    if((idAtm!=null && tipo!=null) && typeof idAtm =='number'){
    usuarioModel.coletarInformacoesComponentes(idAtm, tipo)
        .then((resposta) => {
            if(resposta.length>0){
            return res.json(resposta)
            }
            else{
                return res.status(204).send()
            }
        });
    }
    else{
        return res.status(400).send()
    }
}

module.exports = {
    coletarInformacoesComponente
}