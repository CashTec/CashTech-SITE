var database = require("../database/config")

function entrar(login, senha) {
    var instrucao = `
        SELECT * FROM Usuario WHERE login = '${login}' AND senha = '${senha}';
    `;
    return database.executar(instrucao);
}

function verificarUsuario(login, senha) {
    var instrucao = `

        SELECT u.*, e.id as 'empresa_id' FROM Usuario u JOIN Empresa e ON u.empresa_id = e.id WHERE u.login = '${login}' AND u.senha = '${senha};';
    `;

    return database.executar(instrucao);
}

function cadastrarEmpresa(nomeEmpresa, cnpj, email, telefone) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = ` INSERT INTO Empresa (nome, cnpj, email, telefone, endereco_id) VALUES ('${nomeEmpresa}', '${cnpj}', '${email}', '${telefone}',(SELECT TOP 1 id FROM Endereco ORDER BY id DESC));`
    } else {
        var instrucao = `
        INSERT INTO Empresa (nome, cnpj, email, telefone, endereco_id) VALUES ('${nomeEmpresa}', '${cnpj}', '${email}', '${telefone}',(SELECT id FROM Endereco ORDER BY id DESC LIMIT 1));
    `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}


function cadastrarEndereco(cep, numero, rua, cidade, bairro) {
    var instrucao = `
        INSERT INTO Endereco (cep, numero, rua, cidade, bairro) VALUES ('${cep}', '${numero}', '${rua}', '${cidade}', '${bairro}');
    `;

    return database.executar(instrucao);
}


function cadastrarUsuario(nomeResponsavel, login, senha) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {

        var instrucao = `INSERT INTO usuario (nome, login, senha, empresa_id, tipo_usuario) VALUES ('${nomeResponsavel}', '${login}', '${senha}',(SELECT TOP 1 id FROM EMPRESA ORDER BY id DESC), 'administrador');`
    } else {
        var instrucao = `INSERT INTO Usuario (nome, login, senha, empresa_id) VALUES ('${nomeResponsavel}', '${login}', '${senha}',(SELECT id FROM Empresa ORDER BY id DESC LIMIT 1));`;
    }

    return database.executar(instrucao);
}

function cadastrarParametro() {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `INSERT INTO parametrizacao (empresa_id, qtd_cpu_max, qtd_bytes_enviado_max,
            qtd_bytes_recebido_max, qtd_memoria_max,qtd_disco_max) VALUES 
            ((SELECT TOP 1 id FROM EMPRESA ORDER BY id DESC),default,default,default,default,default);`
    } else {
        var instrucao = `INSERT INTO Parametrizacao (empresa_id, qtd_cpu_max, qtd_bytes_enviado_max,
            qtd_bytes_recebido_max, qtd_memoria_max,qtd_disco_max) VALUES 
            ((SELECT id FROM Empresa ORDER BY id DESC LIMIT 1),default,default,default,default,default);`;
    }
    return database.executar(instrucao);
}


function listar(idEmpresa) {
    let instrucao = `select * from usuario where empresa_id = ${idEmpresa}`;
    return database.executar(instrucao);
}

function listarFiltro(idEmpresa, tipo, campo) {
    let instrucao = `Select * from usuario where ${tipo} like '%${campo}%' and empresa_id = ${idEmpresa}`;
    return database.executar(instrucao);
}

function addUser(idEmpresa, nomeServer, emailServer, senhaServer, funcaoServer) {
    var instrucao = `INSERT INTO usuario (
        nome,
        login,
        senha,
        empresa_id,
        tipo_usuario) VALUES (
            '${nomeServer}',
            '${emailServer}',
            '${senhaServer}',
            '${idEmpresa}',
            '${funcaoServer}');
            `
    console.log(nomeServer, emailServer, senhaServer, funcaoServer, idEmpresa);
    return database.executar(instrucao);
}

function editar(idUsuario, nome, email, senha, funcao) {
    var instrucao = `
                    UPDATE usuario SET
                    nome = '${nome}',
                    login = '${email}',
                    senha = '${senha}',
                    tipo_usuario = '${funcao}' where id = ${idUsuario}
                    `;
    return database.executar(instrucao);
}

function listarUm(idUsuario){
    var instrucao = `
                   SELECT * FROM usuario WHERE id = ${idUsuario}
                    `;
    return database.executar(instrucao);
}

function deletar_usuario(idUsuario){
    var instrucao = `
                  DELETE FROM usuario WHERE id = ${idUsuario}
                    `;
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrarEmpresa,
    cadastrarEndereco,
    cadastrarUsuario,
    verificarUsuario,
    cadastrarParametro,
    listar,
    listarFiltro,
    addUser,
    editar,
    listarUm,
    deletar_usuario
};