const database = require('../database/config');

function verAtmAnormal(idEmpresa, dtAgora) {
    let query = `
    SELECT DISTINCT ce.identificador, ce.id as idAtm
    FROM CaixaEletronico ce 
    JOIN Empresa em ON ce.empresa_id = em.id
    JOIN Componente c ON c.caixa_eletronico_id = ce.id
    JOIN MetricaComponente mc ON mc.componente_id = c.id
    JOIN NetworkInterface ni on ni.caixa_eletronico_id = ce.id 
    JOIN MetricaRedeInterface mri on mri.network_interface_id = ni.id
    JOIN Parametrizacao p ON p.empresa_id = em.id
    WHERE em.id = ${idEmpresa} AND
        (
        (c.tipo = 'memoria' AND ((mc.qtd_consumido/(IIF(c.qtd_maxima = 0, 1, c.qtd_maxima))) * 100) > (p.qtd_memoria_max * 0.75) )
        OR (c.tipo = 'processador' AND mc.qtd_consumido > (p.qtd_cpu_max * 0.75))
        OR (c.tipo = 'disco' AND ((mc.qtd_consumido/(IIF(c.qtd_maxima = 0, 1, c.qtd_maxima))) * 100) > (p.qtd_disco_max * 0.75) )
        OR ((mri.bytes_enviados_segundo > (p.qtd_bytes_enviado_max * 0.75) ) OR (mri.bytes_recebidos_segundo > (p.qtd_bytes_recebido_max * 0.75) ))
        )
        AND mc.dt_metrica >= CONVERT(datetime, '${dtAgora}', 120)
        group by identificador, ce.id`;

        console.log(query);
    return database.executar(query);
}

function verAtmInativo(idEmpresa) {
    let query = `
    SELECT DISTINCT ce.identificador, ce.id as idAtm
    FROM CaixaEletronico ce 
    JOIN Empresa em ON ce.empresa_id = em.id
    WHERE em.id = ${idEmpresa} AND ce.situacao = 'inativo';
    `;

    return database.executar(query);
}

function verUltimasMetricas(idAtm) {
    let query = `
    SELECT TOP 2 c.tipo, c.qtd_maxima, mc.qtd_consumido 
    FROM CaixaEletronico ce 
    JOIN Componente c ON c.caixa_eletronico_id = ce.id
    JOIN MetricaComponente mc ON mc.componente_id = c.id
    WHERE ce.id = ${idAtm}
    AND c.tipo <> 'disco'
    ORDER BY mc.id DESC;
    `;
    return database.executar(query);
}

function verCidadeMaisInativo(idEmpresa) {
    let query =
        `
    SELECT TOP 1 cidade, count(DISTINCT ce.id) as qtdInativo
    FROM Endereco e
    JOIN CaixaEletronico ce ON ce.endereco_id = e.id
    JOIN Empresa em ON ce.empresa_id = em.id
    WHERE em.id = ${idEmpresa} AND ce.situacao = 'inativo'
    group by cidade`
        ;
    return database.executar(query);
}

function processoMaisEncerrado(idEmpresa, dtAgora) {
    let query =
        `
    SELECT TOP 1 count(DISTINCT p.nome) as qtd, p.nome
    FROM Empresa em 
    JOIN CaixaEletronico ce ON ce.empresa_id = em.id
    JOIN Processo p on ce.id = p.caixa_eletronico_id 
    WHERE em.id = ${idEmpresa} AND p.id_dead = 1
  	AND DAY(p.dt_processo) = DAY('${dtAgora}')
   	GROUP BY p.nome
   	ORDER BY qtd desc;
    `;
    return database.executar(query);
}

function qtdAtmInativos(idEmpresa) {
    let query = `
    SELECT DISTINCT count(ce.id) as qtdInativo
    FROM CaixaEletronico ce 
    JOIN Empresa em ON ce.empresa_id = em.id
    WHERE em.id = ${idEmpresa} AND ce.situacao = 'inativo';
    `;

    return database.executar(query);
}

function verTotalAtm(idEmpresa) {
    let query = `
        SELECT count(ce.id) as qtdAtm
        FROM CaixaEletronico ce
        JOIN Empresa em ON ce.empresa_id = em.id
        WHERE em.id = ${idEmpresa};
    `;

    return database.executar(query);
}

function qtdAtmAlerta(idEmpresa, dtAgora) {
    let query = `
      SELECT count(DISTINCT ce.id) as qtdAlerta
      FROM CaixaEletronico ce
      JOIN Empresa em ON ce.empresa_id = em.id
      JOIN Componente c ON c.caixa_eletronico_id = ce.id
      JOIN MetricaComponente mc ON mc.componente_id = c.id
      JOIN NetworkInterface ni ON ni.caixa_eletronico_id = ce.id
      JOIN MetricaRedeInterface mri ON mri.network_interface_id = ni.id
      JOIN Parametrizacao p ON p.empresa_id = em.id
      WHERE em.id = ${idEmpresa} AND
      (
        (c.tipo = 'memoria' AND ((mc.qtd_consumido/(IIF(c.qtd_maxima = 0, 1, c.qtd_maxima))) * 100) > (p.qtd_memoria_max * 0.75))
        OR (c.tipo = 'processador' AND mc.qtd_consumido > (p.qtd_cpu_max * 0.75))
        OR (c.tipo = 'disco' AND ((mc.qtd_consumido/(IIF(c.qtd_maxima = 0, 1, c.qtd_maxima))) * 100) > (p.qtd_disco_max * 0.75))
        OR ((mri.bytes_enviados_segundo > (p.qtd_bytes_enviado_max * 0.75)) OR (mri.bytes_recebidos_segundo > (p.qtd_bytes_recebido_max * 0.75)))
      )
      AND mc.dt_metrica >= CONVERT(datetime, '${dtAgora}', 120)`;
  
    return database.executar(query);
  }
  


module.exports = {
    verAtmAnormal,
    verAtmInativo,
    verCidadeMaisInativo,
    processoMaisEncerrado,
    qtdAtmInativos,
    verUltimasMetricas,
    verTotalAtm,
    qtdAtmAlerta
}
