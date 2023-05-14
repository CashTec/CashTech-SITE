spn_usuarioNome.innerHTML = sessionStorage.NOME_ORQUESTRA;

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

function abrir_modalEditar(idOrquestra, idMusico) {
    console.log(idOrquestra);

    listarUm(idOrquestra, idMusico);
    div_backgroundModal.style.display = 'flex';
    div_editarModal.style.display = 'block'
    document.body.style.overflow = 'hidden';
    btn_editar.addEventListener("click", function () {
        editar(idOrquestra, idMusico);
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
    in_adcTelefone.value = "";

    setTimeout(() => {
        div_backgroundModal.style.display = 'none';
        div_adicionarModal.classList.remove('sumirModal');
        div_adicionarModal.style.display = 'none'
        document.body.style.overflow = '';
    }, 500);
}
// ------------------ FIM Funções de modal ------------------------//


// ------------------ Função de Adicionar funcionario ------------------------//

function adicionarMusico() {

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

    var idOrquestra = sessionStorage.ID_ORQUESTRA;

    var corpo = {
        nome: in_adcNome.value,
        telefone: in_adcTelefone.value,
        instrumento: sel_adcInstrumento.value,

    }
    fetch(`/meusMusicos/cadastrarMusico/${idOrquestra}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(corpo)
    }).then(function (resposta) {
        h2_loading.innerHTML = 'Adicionando...';

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            var msg = "Musico adicionado com sucesso!...";
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
// ------------------ Fim Função de Adicionar funcionario ------------------------//



// ------------------ Função de Atualizar Feed ------------------------//

function atualizarFeed(filtro) {
    var idOrquestra = sessionStorage.ID_ORQUESTRA;

    fetch(`/meusMusicos/listar/${idOrquestra}/${filtro}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                h2_nenhumAchado.innerHTML = "Nenhum funcionario cadastrado."
                throw "Nenhum funcionario cadastrado!";
            }

            resposta.json().then(function (resposta) {

                var texto = 'Listando Musicos';
                aparecer_card(texto);

                console.log("Dados recebidos: ", JSON.stringify(resposta));

                div_planilhaUsers.innerHTML =
                    `
                <table class="tabela-musicos">
                    <thead>
                        <tr>
                            <th><button name="btn-filtro" onclick="atualizarFeed('id')">Id</button></th> 
                            <th><button name="btn-filtro" onclick="atualizarFeed('musico')">Musico</button></th>
                            <th><button name="btn-filtro" onclick="atualizarFeed('instrumento')">Instrumento</button></th>
                            <th><button name="btn-filtro" onclick="atualizarFeed('telefone')">Telefone</button></th>
                            <th>Excluir</button></th>
                            <th>Editar</button></th>
                        </tr>
                    </thead>
                    <tbody id="table_musicos">
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
                            <td>${musico.idMusico}</td>
                            <td>${musico.nome}</td>
                            <td>${musico.instrumento}</td>
                            <td>${musico.telefone}</td>
                            <td><button onclick="deletar_musico(${idOrquestra},${musico.idMusico})"><img src="/assets/imgs/lixo.svg"></button></td>
                            <td><button onclick="abrir_modalEditar(${idOrquestra},${musico.idMusico})"><img src="/assets/imgs/lapis.svg"></button></td>
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
function deletar_musico(idOrquestra, idMusico) {
    console.log("Criar função de excluir musico - ID" + idMusico);

    fetch(`/meusMusicos/deletar/${idOrquestra}/${idMusico}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        aguardar();

        if (resposta.ok) {
            var texto = `funcionario ${idMusico} deletado com sucesso!`;
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
function listarUm(idOrquestra, idMusico) {

    fetch(`/meusMusicos/listarUm/${idOrquestra}/${idMusico}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                in_edtId.value = resposta[0].idMusico;
                in_edtNome.value = resposta[0].nome;
                sel_edtNaipe.value = resposta[0].naipe;
                qual_edtNaipe();
                sel_edtInstrumento.value = resposta[0].instrumento;
                in_edtTelefone.value = resposta[0].telefone;
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}


function editar(idOrquestra, idMusico) {
    console.log("Criar função de editar musico - ID " + idMusico);

    fetch(`/meusMusicos/editar/${idOrquestra}/${idMusico}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: in_edtNome.value,
            telefoneServer: in_edtTelefone.value,
            instrumentoServer: sel_edtInstrumento.value,
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            var texto = `funcionario ${idMusico} atualizado com sucesso!`;
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




// ------------------ Pesquisa de funcionario ------------------------//

function pesquisar() {
    var idOrquestra = sessionStorage.ID_ORQUESTRA;
    var tipo = sel_tipoPesquisa.value;

    if (pesquisa == '') {
        var texto = 'Digite uma pesquisa.';
        aparecer_card(texto);
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            div_card.style.display = "none";
            document.body.style.overflow = '';
        }, "1500")
    } else {
        if (tipo == 'nome') {
            var pesquisa = in_pesquisa.value;

            fetch(`/meusMusicos/pesquisarNome/${idOrquestra}/${pesquisa}`).then(function (resposta) {
                if (resposta.ok) {
                    if (resposta.status == 204) {
                        div_planilhaMusicos.innerHTML =
                            `
                        <div class="nenhum-cadastrado">
                            <h2>Nenhum '${pesquisa}' encontrado</h2>
                        </div>
                        `
                        console.log("Nenhum funcionario encontrado!")
                    }

                    resposta.json().then(function (resposta) {

                        var texto = 'funcionarios(s) encontrado(s)';
                        aparecer_card(texto);
                        document.body.style.overflow = 'hidden';

                        console.log("Dados recebidos: ", JSON.stringify(resposta));

                        div_planilhaMusicos.innerHTML =
                            `
                    <table class="tabela-musicos">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Musico</th>
                                <th>Instrumento</th>
                                <th>Telefone</th>
                                <th>Excluir</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody id="table_musicos">
                        </tbody>
                    </table>
                    `;
                        for (let i = 0; i < resposta.length; i++) {
                            var musico = resposta[i];
                            table_musicos.innerHTML +=
                                `
                            <tr>
                                <td>${musico.idMusico}</td>
                                <td>${musico.nome}</td>
                                <td>${musico.instrumento}</td>
                                <td>${musico.telefone}</td>
                                <td><button onclick="deletar_musico(${idOrquestra},${musico.idMusico})"><img src="/assets/imgs/lixo.svg"></button></td>
                                <td><button onclick="abrir_modalEditar(${idOrquestra},${musico.idMusico})"><img src="/assets/imgs/lapis.svg"></button></td>
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
        } else if (tipo == 'instrumento') {
            var pesquisa = in_pesquisa.value;

            fetch(`/meusMusicos/pesquisarInstrumento/${idOrquestra}/${pesquisa}`).then(function (resposta) {
                if (resposta.ok) {
                    if (resposta.status == 204) {
                        div_planilhaMusicos.innerHTML =
                            `
                        <div class="nenhum-cadastrado">
                            <h2>Nenhum registro de instrumento: '${pesquisa}' encontrado</h2>
                        </div>
                        `
                        console.log("Nenhum instrumento encontrado!")
                    }

                    resposta.json().then(function (resposta) {

                        var texto = `Instrumento: '${pesquisa}' encontrado(s)`;
                        aparecer_card(texto);
                        document.body.style.overflow = 'hidden';

                        console.log("Dados recebidos: ", JSON.stringify(resposta));

                        div_planilhaMusicos.innerHTML =
                            `
                    <table class="tabela-musicos">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Musico</th>
                                <th>Instrumento</th>
                                <th>Telefone</th>
                                <th>Excluir</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody id="table_musicos">
                        </tbody>
                    </table>
                    `;
                        for (let i = 0; i < resposta.length; i++) {
                            var musico = resposta[i];
                            table_musicos.innerHTML +=
                                `
                            <tr>
                                <td>${musico.idMusico}</td>
                                <td>${musico.nome}</td>
                                <td>${musico.instrumento}</td>
                                <td>${musico.telefone}</td>
                                <td><button onclick="deletar_musico(${idOrquestra},${musico.idMusico})"><img src="/assets/imgs/lixo.svg"></button></td>
                                <td><button onclick="abrir_modalEditar(${idOrquestra},${musico.idMusico})"><img src="/assets/imgs/lapis.svg"></button></td>
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
        } else if (tipo == 'naipe') {
            pesquisa = sel_pesquisa.value;

            fetch(`/meusMusicos/pesquisarNaipe/${idOrquestra}/${pesquisa}`).then(function (resposta) {
                if (resposta.ok) {
                    if (resposta.status == 204) {
                        div_planilhaMusicos.innerHTML =
                            `
                        <div class="nenhum-cadastrado">
                            <h2>Nenhum registro com instrumento de naipe '${pesquisa}' encontrado</h2>
                        </div>
                        `
                        console.log("Nenhum naipe encontrado!")
                    }

                    resposta.json().then(function (resposta) {

                        var texto = `Instrumento com naipe: '${pesquisa}' encontrado(s)`;
                        aparecer_card(texto);
                        document.body.style.overflow = 'hidden';

                        console.log("Dados recebidos: ", JSON.stringify(resposta));

                        div_planilhaMusicos.innerHTML =
                            `
                    <table class="tabela-musicos">
                        <thead>
                            <tr>
                                <th>Id</th> 
                                <th>Musico</th>
                                <th>Instrumento</th>
                                <th>Telefone</th>
                                <th>Excluir</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody id="table_musicos">
                        </tbody>
                    </table>
                    `;
                        for (let i = 0; i < resposta.length; i++) {
                            var musico = resposta[i];
                            table_musicos.innerHTML +=
                                `
                            <tr>
                                <td>${musico.idMusico}</td>
                                <td>${musico.nome}</td>
                                <td>${musico.instrumento}</td>
                                <td>${musico.telefone}</td>
                                <td><button onclick="deletar_musico(${idOrquestra},${musico.idMusico})"><img src="/assets/imgs/lixo.svg"></button></td>
                                <td><button onclick="abrir_modalEditar(${idOrquestra},${musico.idMusico})"><img src="/assets/imgs/lapis.svg"></button></td>
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
        } else {
            var pesquisa = in_pesquisa.value;

            fetch(`/meusMusicos/pesquisarTelefone/${idOrquestra}/${pesquisa}`).then(function (resposta) {
                if (resposta.ok) {
                    if (resposta.status == 204) {
                        div_planilhaMusicos.innerHTML =
                            `
                        <div class="nenhum-cadastrado">
                            <h2>Nenhum registro com telefone '${pesquisa}' encontrado</h2>
                        </div>
                        `
                        console.log("Nenhum telefone encontrado!")
                    }

                    resposta.json().then(function (resposta) {

                        var texto = `Telefone: '${pesquisa}' encontrado(s)`;
                        aparecer_card(texto);
                        document.body.style.overflow = 'hidden';

                        console.log("Dados recebidos: ", JSON.stringify(resposta));

                        div_planilhaMusicos.innerHTML =
                            `
                    <table class="tabela-musicos">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Musico</th>
                                <th>Instrumento</th>
                                <th>Telefone</th>
                                <th>Excluir</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody id="table_musicos">
                        </tbody>
                    </table>
                    `;
                        for (let i = 0; i < resposta.length; i++) {
                            var musico = resposta[i];
                            table_musicos.innerHTML +=
                                `
                            <tr>
                                <td>${musico.idMusico}</td>
                                <td>${musico.nome}</td>
                                <td>${musico.instrumento}</td>
                                <td>${musico.telefone}</td>
                                <td><button onclick="deletar_musico(${idOrquestra},${musico.idMusico})"><img src="/assets/imgs/lixo.svg"></button></td>
                                <td><button onclick="abrir_modalEditar(${idOrquestra},${musico.idMusico})"><img src="/assets/imgs/lapis.svg"></button></td>
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
    }
}
// ------------------ Fim Pesquisa de funcionario ------------------------//


