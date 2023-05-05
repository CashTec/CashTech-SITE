var database = require("../database/config");

function verEnderecosInativo(idEmpresa) {
    let instrucao = `SELECT DISTINCT e.*
    FROM Endereco e
    JOIN Empresa em ON em.endereco_id = e.id
    JOIN CaixaEletronico ce ON ce.empresa_id = em.id
    WHERE ce.situacao = 'inativo' and em.id = ${idEmpresa}`;
    return database.executar(instrucao);
}

function verEnderecosAlerta(idEmpresa) {
    let instrucao = `SELECT DISTINCT e.*
    FROM Endereco e
    JOIN Empresa em ON em.endereco_id = e.id
    JOIN CaixaEletronico ce ON ce.empresa_id = em.id
    JOIN Componente c ON c.caixa_eletronico_id = ce.id
    JOIN MetricaComponente mc ON mc.componente_id = c.id
    JOIN Parametrizacao p ON p.empresa_id = em.id
    WHERE em.id = ${idEmpresa}
        (c.tipo = 'memoria' AND mc.qtd_consumido > (p.qtd_memoria_max * 0.75))
        OR (c.tipo = 'cpu' AND mc.qtd_consumido > (p.qtd_cpu_max * 0.75))
        OR (c.tipo = 'disco' AND mc.qtd_consumido > (p.qtd_disco_max * 0.75))
        OR (c.tipo = 'rede' AND (mc.qtd_consumido > (p.qtd_bytes_enviado_max * 0.75) OR mc.qtd_consumido > (p.qtd_bytes_recebido_max * 0.75)))
    `;
    return database.executar(instrucao);
}

module.exports = {
    verEnderecosAlerta,
    verEnderecosInativo
}