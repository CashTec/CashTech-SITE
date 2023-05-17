var database = require("../database/config")

function listarProcessosPermitidos(idEmpresa) {

    var instrucao = `
        select id, nome from ProcessoPermitido where empresa_id = ${idEmpresa};
    `
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    
    return database.executar(instrucao);
}

function pesquisarProcessoPermitido(nome) {
    
    var instrucao = `
    select id, nome from ProcessoPermitido where nome like '%${nome}%'
    `
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    
    return database.executar(instrucao);
}

function deletarProcesso(id) {

    var instrucao = `
        delete from ProcessoPermitido where id = ${id}
    `

    console.log("Executando a instrução SQL: \n" + instrucao);
    
    return database.executar(instrucao);
}

function adicionarProcesso(id, nome, valor, idEmpresa) {
    
    var instrucao = `
        update ProcessoPermitido set ${id} = ${valor}, '${nome}' = ${valor}
         where empresa_id = ${idEmpresa};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function listarParametroHardware(idEmpresa) {


    var instrucao = `
        select qtd_cpu_max, qtd_bytes_enviado_max, qtd_bytes_recebido_max,qtd_memoria_max, qtd_disco_max from parametrizacao where empresa_id = ${idEmpresa};
    `

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}


function atualizarParametroHardware(campo, valor, idEmpresa) {

    var instrucao = `
    update parametrizacao set ${campo} = ${valor} where empresa_id = ${idEmpresa};`;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

module.exports = {
    listarProcessosPermitidos,
    listarParametroHardware,
    atualizarParametroHardware,
    pesquisarProcessoPermitido,
    deletarProcesso,
    adicionarProcesso
};