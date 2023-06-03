var database = require("../database/config");

function verEnderecosInativo(idEmpresa) {
    let instrucao = 
    `
    SELECT DISTINCT e.latitude, e.longitude, ce.id as idAtm, ce.identificador  as nomeAtm
    FROM Endereco e
    JOIN CaixaEletronico ce ON ce.endereco_id = e.id
    JOIN Empresa em ON em.id = ce.empresa_id 
    WHERE ce.situacao = 'inativo' and em.id = ${idEmpresa};
    `;
    return database.executar(instrucao);
}

function verEnderecosAlerta(idEmpresa) {
    let instrucao = `
    SELECT DISTINCT latitude, longitude, ce.id as idAtm, ce.identificador  as nomeAtm
    FROM Endereco e
    JOIN CaixaEletronico ce ON ce.endereco_id = e.id
    JOIN Empresa em ON ce.empresa_id = em.id
    JOIN Componente c ON c.caixa_eletronico_id = ce.id
    JOIN MetricaComponente mc ON mc.componente_id = c.id
    JOIN NetworkInterface ni on ni.caixa_eletronico_id = ce.id 
    JOIN MetricaRedeInterface mri on mri.network_interface_id = ni.id
    JOIN Parametrizacao p ON p.empresa_id = em.id
    WHERE em.id = ${idEmpresa} AND 
        ((c.tipo = 'memoria' AND mc.qtd_consumido > (p.qtd_memoria_max * 0.75))
        OR (c.tipo = 'processador' AND mc.qtd_consumido > (p.qtd_cpu_max * 0.75))
        OR (c.tipo = 'disco' AND mc.qtd_consumido > (p.qtd_disco_max * 0.75))
        OR (mri.bytes_enviados_segundo > (p.qtd_bytes_enviado_max * 0.75) OR mri.bytes_recebidos_segundo  > (p.qtd_bytes_recebido_max * 0.75)))
        AND mc.dt_metrica  >= DATEADD(second, -10809, GETDATE());`;
    return database.executar(instrucao);
}

function buscarEnderecoAtm(idAtm){
    let instrucao= `SELECT e.rua,e.bairro,e.cidade,e.numero, ce.identificador FROM Endereco e JOIN CaixaEletronico ce on ce.endereco_id=e.id  where ce.id=${idAtm}`;
    return database.executar(instrucao);
}

module.exports = {
    verEnderecosAlerta,
    verEnderecosInativo,
    buscarEnderecoAtm
} 