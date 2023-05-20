var database = require("../database/config")

function verProcessosAgora(idAtm) {
    let query = `select top 10 * from processo where id_dead = 0 and caixa_eletronico_id = ${idAtm} order by dt_processo desc`
    return database.executar(query);
}

function verProcessosKilled(idAtm) {
    let query = `select top 20 nome, dt_processo, pid  from processo where id_dead = 1 and caixa_eletronico_id = ${idAtm} ORDER  BY dt_processo desc`
    return database.executar(query);
}

function verProcessoMaisFinalizado(dtProcesso,idAtm){
    let query = 
    `
    select
	    top 1 count(nome) as numero,
	    nome
    from
        Processo p
    where 
        p.caixa_eletronico_id = ${idAtm}
    and
        id_dead = 1 
        and 
        CONVERT(varchar,dt_processo,103) = '${dtProcesso}'
        group by nome
        ORDER by numero desc;
    `
    return database.executar(query);
}

function horarioMaisFinalizado(dtProcesso,idAtm){
    let query =
    `
    select top 1
	count(LEFT(CONVERT(varchar, dt_processo, 108), 5)) as quantidade, 
	LEFT(CONVERT(varchar, dt_processo, 108), 5) as dt
    from Processo p 
    where id_dead = 1 
    and
    p.caixa_eletronico_id = ${idAtm}
    and
    CONVERT(varchar, dt_processo, 103) = '${dtProcesso}'
    group by LEFT(CONVERT(varchar, dt_processo, 108), 5)
    order by quantidade desc;
    `;

    return database.executar(query);
}


module.exports = {
    verProcessosAgora,
    verProcessosKilled,
    verProcessoMaisFinalizado,
    horarioMaisFinalizado
}