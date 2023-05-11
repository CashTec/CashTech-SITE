
// ****************************************************
// REVER COMO ESTA SALVO NA SESSION STOREGE
// Troquei orquestra por empresa e musico por usuario
// ****************************************************


spn_userNome.innerHTML = sessionStorage.NOME_EMPRESA;
// ------------------ Funções de modal ------------------------//
function abrir_modalAdicionar() {
    div_backgroundModal.style.display = 'flex';
    div_adicionarModal.style.display = 'block'
    document.body.style.overflow = 'hidden';
}

function fechar_modalAdicionar() {
    div_adicionarModal.classList.add('sumirModal');

    setTimeout(() => {
        div_backgroundModal.style.display = 'none';
        div_adicionarModal.classList.remove('sumirModal');
        div_adicionarModal.style.display = 'none'
        document.body.style.overflow = '';
    }, 500);
}

function abrir_modalEditar(idEmpresa, idUsuario) {
    console.log(idEmpresa);

    listarUm(idEmpresa, idUsuario);
    div_backgroundModal.style.display = 'flex';
    div_editarModal.style.display = 'block'
    document.body.style.overflow = 'hidden';
    btn_editar.addEventListener("click", function () {
        editar(idEmpresa, idUsuario);
    });
}
function fechar_modalEditar() {
    div_editarModal.classList.add('sumirModal');
    setTimeout(() => {
        div_backgroundModal.style.display = 'none';
        div_editarModal.classList.remove('sumirModal');
        div_editarModal.style.display = 'none'
        document.body.style.overflow = '';
    }, 500);
}


function abrir_modalPesquisar() {
    div_backgroundModal.style.display = 'flex';
    div_pesquisarModal.style.display = 'block'
    document.body.style.overflow = 'hidden';
}

function fechar_modalAdicionar() {
    div_adicionarModal.classList.add('sumirModal');

    in_adcNome.value = "";
    
    setTimeout(() => {
        div_backgroundModal.style.display = 'none';
        div_adicionarModal.classList.remove('sumirModal');
        div_adicionarModal.style.display = 'none'
        document.body.style.overflow = '';
    }, 500);
}
// ------------------ FIM Funções de modal ------------------------//


// ------------------ Função de Adicionar funcionario ------------------------//

function adicionarUsuario() {

    var nome = in_adcNome.value;
    var telefone = in_adcTelefone.value;
    var naipe = sel_adcNaipe.value;
    var instrumento = sel_adcInstrumento.value;

    in_adcNome.parentElement.childNodes[1].style.color = '#000';
    in_adcNome.parentElement.childNodes[3].style.boxShadow = '0 0 3px rgb(0 0 0 / 30%)';
    sel_adcInstrumento.parentElement.childNodes[1].style.color = '#000';
    sel_adcInstrumento.parentElement.childNodes[3].style.boxShadow = '0 0 3px rgb(0 0 0 / 30%)';
    sel_adcNaipe.parentElement.childNodes[1].style.color = '#000';
    sel_adcNaipe.parentElement.childNodes[3].style.boxShadow = '0 0 3px rgb(0 0 0 / 30%)';

    if (nome == "" || instrumento == "" || naipe == "") {
        if (nome == "") {
            in_adcNome.parentElement.childNodes[1].style.color = 'red';
            in_adcNome.parentElement.childNodes[3].style.boxShadow = '0 0 3px rgb(255 0 0 / 30%)';
        }

        if (instrumento == "") {
            sel_adcInstrumento.parentElement.childNodes[1].style.color = 'red';
            sel_adcInstrumento.parentElement.childNodes[3].style.boxShadow = '0 0 3px rgb(255 0 0 / 30%)';
        }
        if (naipe == "") {
            sel_adcNaipe.parentElement.childNodes[1].style.color = 'red';
            sel_adcNaipe.parentElement.childNodes[3].style.boxShadow = '0 0 3px rgb(255 0 0 / 30%)';
        }

        alert("Preencha todos os campos");
        return false;
    }

    var idEmpresa = sessionStorage.ID_EMPRESA;

    var corpo = {
        nome: in_adcNome.value,
        telefone: in_adcTelefone.value,
        instrumento: sel_adcInstrumento.value,

    }
    fetch(`/meusMusicos/cadastrarMusico/${idEmpresa}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(corpo)
    }).then(function (resposta) {
        h2_loading.innerHTML = 'Adicionando...';

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            var msg = "Usuário adicionado com sucesso!...";
            aparecer_card(msg);

            setTimeout(() => {
                div_card.style.display = "none";
                finalizarAguardar();
                window.location = "./meusMusicos.html";
            }, "1500")

        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });

    return false;
}
// ------------------ Fim Função de Adicionar Funcionario ------------------------//



// ------------------ Função de Atualizar Feed ------------------------//

function atualizarFeed(filtro) {
    var idEmpresa = sessionStorage.ID_EMPRESA;

    fetch(`/meusMusicos/listar/${idEmpresa}/${filtro}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {

                console.log("Dados recebidos: ", JSON.stringify(resposta));

                div_planilhaUsers.innerHTML =
                    `
                <table class="tabela-usuarios">
                    <thead>
                        <tr>
                            <th><button name="btn-filtro" onclick="atualizarFeed('id')">Id</button></th> 
                            <th><button name="btn-filtro" onclick="atualizarFeed('usuario')">Musico</button></th>
                            <th><button name="btn-filtro" onclick="atualizarFeed('funcao')">Instrumento</button></th>
                            <th><button name="btn-filtro" onclick="atualizarFeed('telefone')">Telefone</button></th>
                            <th>Excluir</button></th>
                            <th>Editar</button></th>
                        </tr>
                    </thead>
                    <tbody id="table_usuarios">
                    </tbody>
                </table>
                `;

                var btn_filtro = document.getElementsByName('btn-filtro');

                if (filtro == 'id') {
                    btn_filtro[0].classList.add('active-filtro');
                } else if (filtro == 'musico') {
                    btn_filtro[1].classList.add('active-filtro');
                } else if (filtro == 'instrumento') {
                    btn_filtro[2].classList.add('active-filtro');
                } else if (filtro == 'telefone') {
                    btn_filtro[3].classList.add('active-filtro');
                }

                for (let i = 0; i < resposta.length; i++) {
                    var musico = resposta[i];
                    table_musicos.innerHTML +=
                        `
                        <tr>
                            <td>${musico.idUsuario}</td>
                            <td>${musico.nome}</td>
                            <td>${musico.instrumento}</td>
                            <td>${musico.telefone}</td>
                            <td><button onclick="deletar_usuario(${idEmpresa},${musico.idUsuario})"><img src="/assets/imgs/lixo.svg"></button></td>
                            <td><button onclick="abrir_modalEditar(${idEmpresa},${musico.idUsuario})"><img src="/assets/imgs/lapis.svg"></button></td>
                        </tr>
                    `
                }

                setTimeout(() => {
                    div_card.style.display = "none";
                    document.body.style.overflow = '';
                }, "1500")
            });

        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}
// ------------------ Fim Função de Atualizar Feed ------------------------//



// ------------------ Função de Deletar funcionario ------------------------//
function deletar_usuario(idEmpresa, idUsuario) {
    console.log("Criar função de excluir musico - ID" + idUsuario);

    fetch(`/meusUsuarios/deletar/${idEmpresa}/${idUsuario}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        aguardar();

        if (resposta.ok) {
            var texto = `funcionario ${idUsuario} deletado com sucesso!`;
            aparecer_card(texto);
            document.body.style.overflow = 'hidden';

            setTimeout(() => {
                window.location = "./meusMusicos.html";
            }, "1500")

        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}
// ------------------ Fim Função de Deletar funcionario ------------------------//


// ------------------ Função de Editar funcionario ------------------------//
function listarUm(idEmpresa, idUsuario) {

    fetch(`/meusAnalistas/listarUm/${idEmpresa}/${idUsuario}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                in_edtId.value = resposta[0].idUsuario;
                in_edtNome.value = resposta[0].nome;
                in_edtEmail.value = resposta[0].nome;
                in_edtFuncao.value = resposta[0].nome;
                in_edtNome.value = resposta[0].nome;
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}


function editar(idEmpresa, idUsuario) {
    console.log("Criar função de editar usuario - ID " + idUsuario);

    fetch(`/meusUsuarios/editar/${idEmpresa}/${idUsuario}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: in_edtNome.value,
            emailServer: in_edtEmail.value,
            funcaoServer: in_edtFuncao.value,
            senhaServer: in_edtSenha.value
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            var texto = `funcionario ${idUsuario} atualizado com sucesso!`;
            aparecer_card(texto);
            document.body.style.overflow = 'hidden';

            setTimeout(() => {
                window.location = "./meusMusicos.html";
            }, "1500")

        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

// ------------------ Fim Função de Editar funcionario ------------------------//


// Corrigido  fetch(`/meusUsuarios/pesquisar/${idEmpresa}/${tipo}/${pesquisa}`)

// ------------------ Pesquisa de funcionario ------------------------//

function pesquisar() {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    var tipo = sel_tipoPesquisa.value;
    var pesquisa = in_pesquisa.value;

    if (pesquisa == '') {
        alert("Digite algo");
    } else {
        fetch(`/meusUsuarios/pesquisar/${idEmpresa}/${tipo}/${pesquisa}`)
            .then((resposta) => {
                if (resposta.ok) {
                    resposta.json()
                        .then((resposta) => {
                            console.log("Dados recebidos: ", JSON.stringify(resposta));

                            display_tableUsers.innerHTML =
                                `
                            <table class="tabela-users">
                                <thead>
                                    <tr>
                                       <th>Nome</th>
                                       <th>Email</th>
                                       <th>Senha</th>
                                       <th>Função</th>
                                       <th>Excluir</th>
                                       <th>Editar</th>
                                       </tr>
                                </thead>
                                <tbody id= "tbody"></tbody>    
                            </table>
                            `;
                            for (let i = 0; i < resposta.length; i++) {
                                var usuariosResposta = resposta[i];
                                tbody.innerHTML +=
                                    `
                            <tr>
                                <td>${usuariosResposta.nome}</td>
                                <td>${usuariosResposta.email}</td>
                                <td>${usuariosResposta.senha}</td>
                                <td>${usuariosResposta.funcao}</td>
                                <td><button onclick="deletar_usuario()"><img
                                        src="./img/cashTechSystem/lixo.svg"></button></td>
                                <td><button onclick="abrir_modalEditar()"><img
                                        src="./img/cashTechSystem/lapis.svg"></button></td>
                            </tr>
                        `
                            }
                        });

                } else {
                    throw ('Houve um erro na API!');
                }
            }).catch(function (resposta) {
                console.error(resposta);
            });

    }
}
// ------------------ Fim Pesquisa de funcionario ------------------------//


