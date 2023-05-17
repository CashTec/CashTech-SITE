var database = require("../database/config")

function verProcessosAgora(idAtm) {
    let query = `select top 10 * from processo where id_dead = 0 and caixa_eletronico_id = ${idAtm} order by dt_processo desc`
    return database.executar(query);
}

function verProcessosKilled(idAtm) {
    let query = `select top 10 nome, dt_processo, pid  from processo where id_dead = 1 and caixa_eletronico_id = ${idAtm} ORDER  BY dt_processo desc`
    return database.executar(query);
}

module.exports = {
    verProcessosAgora,
    verProcessosKilled
}