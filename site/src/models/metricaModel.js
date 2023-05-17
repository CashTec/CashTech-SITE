var database = require('../database/config');


function coletarMetricaRede(idRede) {

    var instrucao;
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `SELECT TOP 1 *  FROM CaixaEletronico ce join NetworkInterface ni on ni.caixa_eletronico_id = ce.id  join MetricaRedeInterface mc on mc.network_interface_id = ni.id where ni.caixa_eletronico_id=${idRede} ORDER BY mc.dt_metrica DESC`;

    } else {
        instrucao = `SELECT * FROM MetricaRedeInterface where network_interface_id=${idRede} ORDER BY dt_metrica DESC LIMIT 1`;
    }
    return database.executar(instrucao);

}


function coletarMetricaComponente(idCaixa,tipo) {
    var instrucao
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `SELECT TOP 1 c.tipo, mc.qtd_consumido , mc.dt_metrica  FROM Componente c join MetricaComponente mc on mc.componente_id = c.id where c.tipo='${tipo}' and c.caixa_eletronico_id=${idCaixa} ORDER BY mc.dt_metrica DESC`;
    } else {
        instrucao = `SELECT * FROM MetricaComponente where compontente_id=${componente} ORDER BY dt_metrica DESC LIMIT 5`;
    }
    return database.executar(instrucao)
}

module.exports = {
    coletarMetricaRede,
    coletarMetricaComponente
}