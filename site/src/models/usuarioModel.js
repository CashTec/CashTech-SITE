var database = require("../database/config")

function entrar(login, senha) {
    console.log("\n\n<--------------------------------------------------------------------------------------> ");
    console.log("Model function entrar(): ", login, senha)

    var instrucao = `
        SELECT * FROM usuario WHERE login = '${login}' AND senha = '${senha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function verificarUsuario(login, senha) {
    console.log("\n\n<--------------------------------------------------------------------------------------> ");
    console.log("Model function verificarLogin(): ", login, senha)

    var instrucao = `
        SELECT * FROM usuario WHERE login = '${login}' AND senha = '${senha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function cadastrarEmpresa(nomeEmpresa, cnpj, email, telefone, fkEndereco) {
    console.log("\n\n<--------------------------------------------------------------------------------------> ");
    console.log(`Model function cadastrarEmpresa():`, nomeEmpresa, cnpj, email, telefone, fkEndereco);

    var instrucao = `
        INSERT INTO empresa (nome, cnpj, email, telefone, fkEndereco) VALUES ('${nomeEmpresa}', '${cnpj}', '${email}', '${telefone}',${fkEndereco});
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}


function cadastrarEndereco(cep, numero, rua, cidade, bairro) {
    console.log("\n\n<--------------------------------------------------------------------------------------> ");
    console.log(`Model function cadastrarEndereco():`, cep, numero, rua, cidade, bairro);

    var instrucao = `
        INSERT INTO endereco (cep, numero, rua, cidade, bairro) VALUES ('${cep}', '${numero}', '${rua}', '${cidade}', '${bairro}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}


function cadastrarUsuario(nomeResponsavel, login, senha, fkEmpresa) {
    console.log("\n\n<--------------------------------------------------------------------------------------> ");
    console.log(`Model function cadastrarUsuario():`, nomeResponsavel, login, senha, fkEmpresa);

    var instrucao = `
        INSERT INTO usuario (nome, login, senha, fkEmpresa) VALUES ('${nomeResponsavel}', '${login}', '${senha}',${fkEmpresa});
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}


module.exports = {
    entrar,
    cadastrarEmpresa,
    cadastrarEndereco,
    cadastrarUsuario,
    verificarUsuario
};