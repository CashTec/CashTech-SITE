var database = require("../database/config")

function listarAtm(idEmpresa) {
    let query = `SELECT
                    ce.id,
                    ce.identificador,
                    ce.situacao,
                    ms.iniciado,
                    ms.tempo_atividade,
                    e.rua,
                    e.numero
                FROM
                    CaixaEletronico ce
                JOIN Endereco e ON
                    e.id = ce.endereco_id
                JOIN Sistema s ON
                    s.id = ce.sistema_id
                JOIN MetricaSistema ms ON
                    s.id = ms.sistema_id
                WHERE
                    ce.empresa_id = ${idEmpresa}
                    and
                    ms.dt_metrica = (
                    SELECT
                        MAX(dt_metrica)
                    FROM
                        MetricaSistema
                    WHERE
                        sistema_id = s.id)
                GROUP BY
                    ce.id,
                    ce.identificador,
                    ce.situacao,
                    ms.iniciado,
                    ms.tempo_atividade,
                    e.rua,
                    e.numero;
            `
    return database.executar(query);
}

function filtroPesquisa(idEmpresa, tipo, campo) {
    let query = `SELECT
                    ce.id,
                    ce.identificador,
                    ce.situacao,
                    ms.iniciado,
                    ms.tempo_atividade,
                    e.rua,
                    e.numero
                FROM
                    CaixaEletronico ce
                JOIN Endereco e ON
                    e.id = ce.endereco_id
                JOIN Sistema s ON
                    s.id = ce.sistema_id
                JOIN MetricaSistema ms ON
                    s.id = ms.sistema_id
                WHERE
                    ce.empresa_id = ${idEmpresa}
                    and
                    ${tipo} like '%${campo}%'
                    and
                    ms.dt_metrica = (
                    SELECT
                        MAX(dt_metrica)
                    FROM
                        MetricaSistema
                    WHERE
                        sistema_id = s.id)
                GROUP BY
                    ce.id,
                    ce.identificador,
                    ce.situacao,
                    ms.iniciado,
                    ms.tempo_atividade,
                    e.rua,
                    e.numero;
                `
    return database.executar(query);
}


function ordernar(idEmpresa, tipo) {
    let query = `SELECT
                    ce.id,
                    ce.identificador,
                    ce.situacao,
                    ms.iniciado,
                    ms.tempo_atividade,
                    e.rua,
                    e.numero
                FROM
                    CaixaEletronico ce
                JOIN Endereco e ON
                    e.id = ce.endereco_id
                JOIN Sistema s ON
                    s.id = ce.sistema_id
                JOIN MetricaSistema ms ON
                    s.id = ms.sistema_id
                WHERE
                    ce.empresa_id = ${idEmpresa}
                    and
                    ms.dt_metrica = (
                    SELECT
                        MAX(dt_metrica)
                    FROM
                        MetricaSistema
                    WHERE
                        sistema_id = s.id)
                GROUP BY
                    ce.id,
                    ce.identificador,
                    ce.situacao,
                    ms.iniciado,
                    ms.tempo_atividade,
                    e.rua,
                    e.numero
                ORDER BY
                    ${tipo};`

    return database.executar(query);
}

function deletar(idAtm) {
    let query = `DELETE FROM CaixaEletronico WHERE id = ${idAtm};`
    return database.executar(query);
}

function listarUm(idAtm) {
    let query = `SELECT * FROM CaixaEletronico c join endereco e on c.endereco_id = e.id WHERE c.id = ${idAtm};`
    return database.executar(query);
}

function atualizarAtm(idAtm, situacao) {
    let query = `UPDATE CaixaEletronico SET situacao = '${situacao}' WHERE id = ${idAtm};`
    return database.executar(query);
}

function atualizarEndereco(idAtm, cep, numero, rua, cidade, bairro, lat, lng) {
    let query = `UPDATE Endereco SET cep = '${cep}', numero = '${numero}', rua = '${rua}', cidade = '${cidade}', bairro = '${bairro}', latitude = '${lat}', longitude = '${lng}' WHERE id = (SELECT endereco_id FROM CaixaEletronico WHERE id = ${idAtm});`
    return database.executar(query);
}

module.exports = {
    listarAtm,
    filtroPesquisa,
    ordernar,
    deletar,
    listarUm,
    atualizarAtm,
    atualizarEndereco
}