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
        usuarioModel
            .entrar(email, senha)
            .then(function (resultado) {
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
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o login! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}



// 
    // JOCA ESTEVE AQUI




async function cadastrar(req, res) {
    const camposObrigatorios = [
        "nomeEmpresaServer",
        "cnpjServer",
        "emailServer",
        "telefoneServer",
        "cepServer",
        "numeroServer",
        "ruaServer",
        "cidadeServer",
        "bairroServer",
        "nomeResponsavelServer",
        "loginServer",
        "senhaServer",
    ];
    console.log(req.body);
    const camposFaltantes = camposObrigatorios.filter(
        (campo) => req.body[campo] === undefined
    );

    if (camposFaltantes.length > 0) {
        res
            .status(400)
            .send(
                `Os seguintes campos estão faltando: ${camposFaltantes.join(", ")}`
            );
        return;
    }

    try {
        const verificarLoginResult = await usuarioModel.verificarUsuario(
            req.body.loginServer,
            req.body.senhaServer
        );

        if (verificarLoginResult.length >= 1) {
            return res
                .status(409)
                .json({ message: "Esse Login já existe, por favor digite outro" });
        } else {
            const enderecoResult = await usuarioModel.cadastrarEndereco(
                req.body.cepServer,
                req.body.numeroServer,
                req.body.ruaServer,
                req.body.cidadeServer,
                req.body.bairroServer
            );

            const empresaResult = await usuarioModel.cadastrarEmpresa(
                req.body.nomeEmpresaServer,
                req.body.cnpjServer,
                req.body.emailServer,
                req.body.telefoneServer
            );

            const usuarioResult = await usuarioModel.cadastrarUsuario(
                req.body.nomeResponsavelServer,
                req.body.loginServer,
                req.body.senhaServer
            );

            const parametroResult = await usuarioModel.cadastrarParametro();

            res.json({
                enderecoResult,
                empresaResult,
                usuarioResult,
                parametroResult,
            });
        }
    } catch (erro) {
        console.log(erro);
        console.log(
            `Houve um erro ao realizar o cadastro! Erro: ${erro.sqlMessage}`
        );
        res.status(500).json(erro.sqlMessage);
    }
}

function addUser(req, res) {
    let idEmpresa = req.params.idEmpresa;
    let nomeServer = req.body.nome;
    let emailServer = req.body.email;
    let senhaServer = req.body.senha;
    let funcaoServer = req.body.funcao;


    if (
        idEmpresa == undefined ||
        nomeServer == undefined ||
        emailServer == undefined ||
        senhaServer == undefined ||
        funcaoServer == undefined
    ) {
        res.status(400).send("Alguma informação de cadastro está inválida!");
    }

    usuarioModel.addUser(idEmpresa,
        nomeServer,
        emailServer,
        senhaServer,
        funcaoServer).then((resultado) => {

            res.status(200).json(resultado);

        }).catch((erro) => {
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });

}

function editar(req, res) {
    let idUsuario = req.params.idUsuario;
    let nome = req.body.nomeServer;
    let email = req.body.emailServer;
    let senha = req.body.senhaServer;
    let funcao = req.body.funcaoServer;

    if (
        nome == undefined ||
        email == undefined ||
        senha == undefined ||
        funcao == undefined ||
        idUsuario == undefined
    ) {
        res.status(400).send("Alguma informação de cadastro está inválida!");
    }

    usuarioModel.editar(
        idUsuario,
        nome,
        email,
        senha,
        funcao
        ).then((resultado) => {
            res.status(200).json(resultado);
        }).catch((erro) => {
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}
function listarUm(req, res){
    let idUsuario = req.params.idUsuario;

    if (idUsuario === undefined) {
        res.status(400).send("IdUsuario está inválido!");
    }

    usuarioModel.listarUm(idUsuario).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Não há dados!");
        }
    }).catch((err) => {
        console.log("\nHouve um erro ao realizar o login! Erro: ", err.sqlMessage);
        res.status(500).json(err.sqlMessage);
    })
}

function listar(req, res) {
    let idEmpresa = req.params.idEmpresa;

    if (idEmpresa === undefined) {
        res.status(400).send("IdEmpresa está inválido!");
    }

    usuarioModel.listar(idEmpresa).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Não há dados!");
        }
    }).catch((err) => {
        console.log("\nHouve um erro ao realizar o login! Erro: ", err.sqlMessage);
        res.status(500).json(err.sqlMessage);
    })
}

function listarFiltro(req, res) {
    let idEmpresa = req.params.idEmpresa;
    let tipo = req.params.tipo;
    let campo = req.params.campo;

    if (idEmpresa == undefined || tipo == undefined || campo == undefined) {
        res.status(400).send("Algum valor está inválido!");
    }

    usuarioModel.listarFiltro(idEmpresa, tipo, campo).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Informação não encontrada!")
        }
    }).catch((erro) => {
        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

function deletar_usuario(req, res){
    let idUsuario = req.params.idUsuario;

    usuarioModel.deletar_usuario(idUsuario).then((resultado) => {
        
            res.status(200).json(resultado);
    }).catch((erro) => {
        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}


module.exports = {
    entrar,
    cadastrar,
    listar,
    listarFiltro,
    addUser,
    editar,
    listarUm,
    deletar_usuario
};
