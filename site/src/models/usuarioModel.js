var database = require("../database/config")


function entrar(login, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando " +
        "corretamente. \n\n function entrar(): ", login, senha)

    var instrucao = `
        SELECT * FROM usuario WHERE email = '${login}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nomeEmpresa, cnpj, email, telefone, cep, numero, rua, cidade, bairro, nomeResponsavel, login, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeEmpresa, cnpj, email, telefone, cep, numero, rua, cidade, bairro, nomeResponsavel, login, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nomeEmpresa, cnpj, email, telefone, cep, numero, rua, cidade, bairro, nomeResponsavel, login, senha) VALUES ('${nomeEmpresa}', '${cnpj}', '${email}', '${telefone}', '${cep}', '${numero}', '${rua}', '${cidade}', '${bairro}', '${nomeResponsavel}', '${login}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar
};