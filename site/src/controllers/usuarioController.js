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


/*
Versão antiga: 
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

    // Faça as validações dos valores
    if (nomeEmpresa == undefined) {
        res.status(400).send("Seu nome da empresa está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu numero está undefined!");
    } else if (rua == undefined) {
        res.status(400).send("Sua rua está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else if (nomeResponsavel == undefined) {
        res.status(400).send("O nome do responsavel está undefined!");
    } else if (login == undefined) {
        res.status(400).send("Seu login está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Seu login está undefined!");
    } else {

        usuarioModel.cadastrarEndereco(cep, numero, rua, cidade, bairro).then(
            function (resultado1) {
                console.log("\n\nEndereco cadastrado com sucesso");
                console.log('esse é o Id do resultado: ' + resultado1.insertId);
                const fkEndereco = resultado1.insertId;

                // ---------------------------------------
                usuarioModel.cadastrarEmpresa(nomeEmpresa, cnpj, email, telefone, fkEndereco)
                    .then(
                        function (resultado2) {
                            console.log("\n\nEmpresa cadastrada com sucesso");
                            console.log('esse é o Id do resultado: ' + resultado2.insertId);
                            const fkEmpresa = resultado2.insertId;

                            // ---------------------------------------
                            usuarioModel.cadastrarUsuario(nomeResponsavel, login, senha, fkEmpresa)
                                .then(
                                    function (resultado3) {
                                        console.log("\n\Usuario cadastrado com sucesso");
                                        res.json({ resultado1, resultado2, resultado3 });
                                    }
                                ).catch(
                                    function (erro) {
                                        console.log(erro);
                                        console.log(
                                            "\nHouve um erro ao realizar o cadastro do Usuario! Erro: ",
                                            erro.sqlMessage
                                        );
                                        res.status(500).json(erro.sqlMessage);
                                    }
                                );
                            // ---------------------------------------

                        }

                    ).catch(
                        function (erro) {
                            console.log(erro);
                            console.log(
                                "\nHouve um erro ao realizar o cadastro da Empresa! Erro: ",
                                erro.sqlMessage
                            );
                            res.status(500).json(erro.sqlMessage);
                        }
                    );
                // -------------------------------------------------
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro do Endereco! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );

    }
}
*/


module.exports = {
    entrar,
    cadastrar
}