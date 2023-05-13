var database = require("../database/config")

function listarProcessosPermitidos(idEmpresa) {

    var instrucao = `
        select nome from ProcessoPermitido where empresa_id = '${idEmpresa}';
    `

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}


function listarParametroHardware(idEmpresa) {


    var instrucao = `
        select qtd_cpu_max, qtd_bytes_enviado_max, qtd_bytes_recebido_max,qtd_memoria_max, qtd_disco_max from parametrizacao where empresa_id = '${idEmpresa};'
    `

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}


function atualizarParametroHardware(cpuMax, bytesEnviados, bytesRecebidos, memoriaMax, discoMax, idEmpresa) {
    
    var instrucao = `
    update parametrizacao set 
    qtd_cpu_max = '${cpuMax}', 
    qtd_bytes_enviado_max = '${bytesEnviados}', 
    qtd_bytes_recebido_max = '${bytesRecebidos}',
     qtd_memoria_max = '${memoriaMax}',
      qtd_disco_max = '${discoMax}'
         where empresa_id = '${idEmpresa}';"
    `

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}


module.exports = {
    listarProcessosPermitidos,
    listarParametroHardware,
    atualizarParametroHardware
};