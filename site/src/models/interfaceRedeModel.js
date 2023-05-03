var database = require("../database/config");


//FUNÇÃO PARA COLETAR AS INFORMAÇÕES DA INTERFACE DE REDE DO BANCO DE DADOS
function coletarInformacaoRede(idAtm) {
    var instrucao = `SELECT * FROM NetworkInterface where caixa_eletronico_id = ${idAtm}`;
    return database.executar(instrucao);
}


module.exports={
    coletarInformacaoRede
}