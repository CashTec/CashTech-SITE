const database = require("../database/config");


function coletarInformacoesComponentes(idAtm,tipo){
    let instrucao = `SELECT * FROM Componente where tipo = '${tipo}' and caixa_eletronico_id= ${idAtm}`;
    return database.executar(instrucao);
}
module.exports={
    coletarInformacoesComponentes
}