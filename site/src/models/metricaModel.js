var database = require('../database/config');


function coletarMetricaRede(idRede) {

    var instrucao;
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `SELECT TOP 5 * FROM MetricaRedeInterface where network_interface_id=${idRede} ORDER BY dt_metrica DESC `;
    } else {
        instrucao = `SELECT * FROM MetricaRedeInterface where network_interface_id=${idRede} ORDER BY dt_metrica DESC LIMIT 1`;
    }
    return database.executar(instrucao);

}


function coletarMetricaComponente(idComponente) {
    var instrucao
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `SELECT TOP 5 * FROM MetricaComponente where componente_id=${idComponente} ORDER BY dt_metrica DESC `;
    } else {
        instrucao = `SELECT * FROM MetricaComponente where compontente_id=${idComponente} ORDER BY dt_metrica DESC LIMIT 5`;
    }
    return database.executar(instrucao)
}

module.exports = {
    coletarMetricaRede,
    coletarMetricaComponente
}