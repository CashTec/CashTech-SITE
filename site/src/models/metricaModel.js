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


function coletarQuantidadeGravadaHoje(idAtm,data){
    let instrucao = `SELECT mc.dt_metrica, mc.qtd_consumido, c.nome
    FROM caixaeletronico ce
    JOIN Componente c ON ce.id = c.caixa_eletronico_id
    JOIN MetricaComponente mc ON c.id = mc.componente_id
    WHERE c.tipo = 'disco' AND ce.id = ${idAtm}
      AND (mc.dt_metrica = (
        SELECT MAX(mc2.dt_metrica)
        FROM caixaeletronico ce2
        JOIN Componente c2 ON ce2.id = c2.caixa_eletronico_id
        JOIN MetricaComponente mc2 ON c2.id = mc2.componente_id
        WHERE c2.tipo = 'disco' AND ce2.id = ${idAtm}
          AND MONTH(mc2.dt_metrica) = ${data[0]}
          AND YEAR(mc2.dt_metrica) = ${data[1]}
      ))
      UNION ALL
      SELECT mc.dt_metrica, mc.qtd_consumido, c.nome
      FROM caixaeletronico ce
      JOIN Componente c ON ce.id = c.caixa_eletronico_id
      JOIN MetricaComponente mc ON c.id = mc.componente_id
      WHERE c.tipo = 'disco' AND ce.id = ${idAtm}
        AND mc.dt_metrica = (
          SELECT MIN(mc3.dt_metrica)
          FROM caixaeletronico ce3
          JOIN Componente c3 ON ce3.id = c3.caixa_eletronico_id
          JOIN MetricaComponente mc3 ON c3.id = mc3.componente_id
          WHERE c3.tipo = 'disco' AND ce3.id = ${idAtm}
            AND MONTH(mc3.dt_metrica) = '${data[0]}'
            AND YEAR(mc3.dt_metrica) = ${data[1]}
        )
       ORDER BY c.nome;
    `;

    return database.executar(instrucao);
   }

   
module.exports = {
    coletarMetricaRede,
    coletarMetricaComponente,
    coletarQuantidadeGravadaHoje
}