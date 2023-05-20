var database = require("../database/config");


//FUNÇÃO PARA COLETAR AS INFORMAÇÕES DA INTERFACE DE REDE DO BANCO DE DADOS
function coletarInformacaoRede(idAtm) {
    var instrucao = `SELECT * FROM NetworkInterface where caixa_eletronico_id = ${idAtm}`;
    return database.executar(instrucao);
}

function coletarQuantidadeGravadaHoje(idAtm,data){

    let instrucao = 
    `SELECT mri.dt_metrica, mri.bytes_recebidos_segundo ,mri.bytes_enviados_segundo 
    FROM caixaeletronico ce
    JOIN NetworkInterface ni ON ce.id = ni.caixa_eletronico_id
    JOIN MetricaRedeInterface mri  ON ni.id = mri.network_interface_id 
    WHERE  ce.id = ${idAtm}
      AND (mri.dt_metrica = (
        SELECT MAX(mri2.dt_metrica)
        FROM caixaeletronico ce2
        JOIN NetworkInterface ni2  ON ce2.id = ni2.caixa_eletronico_id
        JOIN MetricaRedeInterface mri2  ON ni2.id = mri2.network_interface_id
        WHERE ce2.id = ${idAtm}
          AND  CONVERT(varchar, mri2.dt_metrica, 23) like '${data}'
      ) OR mri.dt_metrica = (
        SELECT MIN(mri3.dt_metrica)
        FROM caixaeletronico ce3
        JOIN NetworkInterface ni3  ON ce3.id = ni3.caixa_eletronico_id
        JOIN MetricaRedeInterface mri3  ON ni3 .id = mri3.network_interface_id
        WHERE ce3.id = ${idAtm} and
          CONVERT(varchar, mri3.dt_metrica, 23) like '${data}'
      ))`
return database.executar(instrucao);
}

module.exports={
    coletarInformacaoRede,
    coletarQuantidadeGravadaHoje
}