var usuarioModel = require("../models/usuarioModel");

var sessoes = [];


function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    console.log("Controller");
    console.log("Email: " + email);
    console.log("Senha: " + senha);

    if (email == undefined) {
        res.status(400).send("Seu login está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeEmpresa = req.body.nomeEmpresaServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;
    var rua = req.body.ruaServer;
    var cidade = req.body.cidadeServer;
    var bairro = req.body.bairroServer;
    var nomeResponsavel = req.body.nomeResponsavelServer;
    var login = req.body.loginServer;
    var senha = req.body.senhaServer;

    console.log("Empresa: " + nomeEmpresa);
    console.log("CNPJ: " + cnpj);
    console.log("Email: " + email);
    console.log("Telefone: " + telefone);
    console.log("CEP: " + cep);
    console.log("Numero: " + numero);
    console.log("Rua: " + rua);
    console.log("Cidade: " + cidade);
    console.log("Bairro: " + bairro);
    console.log("Responsavel: " + nomeResponsavel);
    console.log("Login: " + login);
    console.log("Senha: " + senha);

    // Faça as validações dos valores
    if (nomeEmpresa == undefined) {
        res.status(400).send("Seu nome da empresa está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if(telefone == undefined){
        res.status(400).send("Seu telefone está undefined!");    
    } else if(cep == undefined){
        res.status(400).send("Seu cep está undefined!");
    }else if(numero == undefined){
        res.status(400).send("Seu numero está undefined!");
    }else if(rua == undefined){
        res.status(400).send("Sua rua está undefined!");
    }else if(cidade == undefined){
        res.status(400).send("Sua cidade está undefined!");
    }else if(bairro == undefined){
        res.status(400).send("Seu bairro está undefined!");
    }else if (nomeResponsavel == undefined){
        res.status(400).send("O nome do responsavel está undefined!");
    }else if (login == undefined){
        res.status(400).send("Seu login está undefined!");
    }else if(senha == undefined){
        res.status(400).send("Seu login está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nomeEmpresa, cnpj, email, telefone, cep, numero, rua, cidade, bairro, nomeResponsavel, login, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    cadastrar
}