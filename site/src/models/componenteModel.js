const database = require("../database/config");


function coletarInformacoesComponentes(idAtm){
    let instrucao = `SELECT * FROM Componente where caixa_eletronico_id= ${idAtm}`;
    return database.executar(instrucao);
}
module.exports={
    coletarInformacoesComponentes
}