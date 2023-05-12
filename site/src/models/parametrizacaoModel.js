var database = require("../database/config")

function listarProcessos(empresa_id) {

    var instrucao = `
        select nome from ProcessoPermitido where empresa_id = '${empresa_id}';
    `

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}


function listarParametroHardware(empresa_id) {


    var instrucao = `
        select qtd_cpu_max, qtd_bytes_enviado_max, qtd_bytes_recebido_max,qtd_memoria_max, qtd_disco_max from parametrizacao where empresa_id = '${empresa_id};'
    `

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}


function atualizarParametroHardware(cpuMax, bytesEnviados, bytesRecebidos, memoriaMax, discoMax, empresa_id) {
    
    var instrucao = `
    update parametrizacao set 
    qtd_cpu_max = '${cpuMax}', 
    qtd_bytes_enviado_max = '${bytesEnviados}', 
    qtd_bytes_recebido_max = '${bytesRecebidos}',
     qtd_memoria_max = '${memoriaMax}',
      qtd_disco_max = '${discoMax}'
         where empresa_id = '${empresa_id}';"
    `

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}