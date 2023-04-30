var database = require("../database/config")

function entrar(login, senha) {
    console.log("\n\n<--------------------------------------------------------------------------------------> ");
    console.log("Model function entrar(): ", login, senha)

    var instrucao = `
        SELECT * FROM Usuario WHERE login = '${login}' AND senha = '${senha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function verificarUsuario(login, senha) {
    console.log("\n\n<--------------------------------------------------------------------------------------> ");
    console.log("Model function verificarLogin(): ", login, senha)

    var instrucao = `
        SELECT * FROM Usuario WHERE login = '${login}' AND senha = '${senha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function cadastrarEmpresa(nomeEmpresa, cnpj, email, telefone) {
    console.log("\n\n<--------------------------------------------------------------------------------------> ");
    console.log(`Model function cadastrarEmpresa():`, nomeEmpresa, cnpj, email, telefone);
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = ` INSERT INTO empresa (nome, cnpj, email, telefone, endereco_id) VALUES ('${nomeEmpresa}', '${cnpj}', '${email}', '${telefone}',(SELECT TOP 1 id FROM ENDERECO ORDER BY id DESC));`
    } else {
        var instrucao = `
        INSERT INTO Empresa (nome, cnpj, email, telefone, endereco_id) VALUES ('${nomeEmpresa}', '${cnpj}', '${email}', '${telefone}',(SELECT id FROM ENDERECO ORDER BY id DESC LIMIT 1));
    `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}


function cadastrarEndereco(cep, numero, rua, cidade, bairro) {
    console.log("\n\n<--------------------------------------------------------------------------------------> ");
    console.log(`Model function cadastrarEndereco():`, cep, numero, rua, cidade, bairro);

    var instrucao = `
        INSERT INTO Endereco (cep, numero, rua, cidade, bairro) VALUES ('${cep}', '${numero}', '${rua}', '${cidade}', '${bairro}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}


function cadastrarUsuario(nomeResponsavel, login, senha) {
    console.log("\n\n<--------------------------------------------------------------------------------------> ");
    console.log(`Model function cadastrarUsuario():`, nomeResponsavel, login, senha);

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `INSERT INTO Usuario (nome, login, senha, empresa_id) VALUES ('${nomeResponsavel}', '${login}', '${senha}',(SELECT TOP 1 id FROM EMPRESA ORDER BY id DESC));`
    } else {
        var instrucao = `INSERT INTO Usuario (nome, login, senha, empresa_id) VALUES ('${nomeResponsavel}', '${login}', '${senha}',(SELECT id FROM EMPRESA ORDER BY id DESC LIMIT 1));`;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function cadastrarParametro() {
    console.log("\n\n<--------------------------------------------------------------------------------------> ");
    console.log(`Model function cadastrarParametro():`);

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `INSERT INTO parametrizacao (empresa_id, qtd_cpu_max, qtd_bytes_enviado_max,
            qtd_bytes_recebido_max, qtd_memoria_max,qtd_disco_max) VALUES 
            ((SELECT TOP 1 id FROM EMPRESA ORDER BY id DESC),default,default,default,default,default);`
    } else {
        var instrucao = `INSERT INTO Parametrizacao (empresa_id, qtd_cpu_max, qtd_bytes_enviado_max,
            qtd_bytes_recebido_max, qtd_memoria_max,qtd_disco_max) VALUES 
            ((SELECT id FROM EMPRESA ORDER BY id DESC LIMIT 1),default,default,default,default,default);`;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrarEmpresa,
    cadastrarEndereco,
    cadastrarUsuario,
    verificarUsuario,
    cadastrarParametro
};