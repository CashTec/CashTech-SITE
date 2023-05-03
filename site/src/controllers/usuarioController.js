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

async function cadastrar(req, res) {
    const camposObrigatorios = [
        'nomeEmpresaServer',
        'cnpjServer',
        'emailServer',
        'telefoneServer',
        'cepServer',
        'numeroServer',
        'ruaServer',
        'cidadeServer',
        'bairroServer',
        'nomeResponsavelServer',
        'loginServer',
        'senhaServer'
    ];
    console.log(req.body);
    const camposFaltantes = camposObrigatorios.filter(campo => req.body[campo] === undefined);

    if (camposFaltantes.length > 0) {
        res.status(400).send(`Os seguintes campos estão faltando: ${camposFaltantes.join(', ')}`);
        return;
    }

    try {
        const verificarLoginResult = await usuarioModel.verificarUsuario(req.body.loginServer, req.body.senhaServer);

        if (verificarLoginResult.length >= 1) {
            return res.status(409).json({ message: "Esse Login já existe, por favor digite outro" });
        } else {
            const enderecoResult = await usuarioModel.cadastrarEndereco(req.body.cepServer, req.body.numeroServer, req.body.ruaServer, req.body.cidadeServer, req.body.bairroServer);

            const empresaResult = await usuarioModel.cadastrarEmpresa(req.body.nomeEmpresaServer, req.body.cnpjServer, req.body.emailServer, req.body.telefoneServer);

            const usuarioResult = await usuarioModel.cadastrarUsuario(req.body.nomeResponsavelServer, req.body.loginServer, req.body.senhaServer);

            const parametroResult = await usuarioModel.cadastrarParametro();

            res.json({ enderecoResult, empresaResult, usuarioResult, parametroResult });
        }

    } catch (erro) {
        console.log(erro);
        console.log(`Houve um erro ao realizar o cadastro! Erro: ${erro.sqlMessage}`);
        res.status(500).json(erro.sqlMessage);
    }
}

module.exports = {
    entrar,
    cadastrar
}