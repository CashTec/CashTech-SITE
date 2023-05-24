var database = require("../database/config");


//FUNÇÃO PARA COLETAR AS INFORMAÇÕES DA INTERFACE DE REDE DO BANCO DE DADOS
function coletarInformacaoRede(idAtm) {
    var instrucao = `SELECT * FROM NetworkInterface where caixa_eletronico_id = ${idAtm}`;
    return database.executar(instrucao);
}

function coletarQuantidadeGravadaHoje(idAtm,data){
    let instrucao = 
    `SELECT SUM(mri.bytes_recebidos_segundo) as dados FROM CaixaEletronico ce join NetworkInterface ni on ce.id=ni.caixa_eletronico_id join MetricaRedeInterface mri on ni.id = mri.network_interface_id  where ce.id = ${idAtm} and CONVERT(varchar,mri.dt_metrica,23)='${data}';
    `
return database.executar(instrucao);
}

module.exports={
    coletarInformacaoRede,
    coletarQuantidadeGravadaHoje
}