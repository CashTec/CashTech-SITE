const idEmpresa = sessionStorage.ID_EMPRESA;


// ------------------ Funções de modal ------------------------//

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

function abrir_modalDeletar() {
    div_backgroundModal.style.display = 'flex';
    div_deletarModal.style.display = 'block'
    document.body.style.overflow = 'hidden';
}

function fechar_modalDeletar() {
    div_deletarModal.classList.add('sumirModal');
    setTimeout(() => {
        div_backgroundModal.style.display = 'none';
        div_deletarModal.classList.remove('sumirModal');
        div_deletarModal.style.display = 'none'
        document.body.style.overflow = '';
    }, 500);
}
// ------------------ FIM Funções de modal ------------------------//


// ------------------ Função de Atualizar Feed ------------------------//

function atualizarFeed(tipo, campo) {
    loadingGif();
    let filtroComponente = '';
    if (tipo != undefined && campo != undefined) {
        filtroComponente = `/${tipo}/${campo}`;
    }

    fetch(`/listaAtm/${idEmpresa}${filtroComponente}`).then((resposta) => {
        if (resposta.ok) {
            if (resposta.status == 204) {
                nenhumAchado();
            } else {
                resposta.json().then((json) => {
                    plotarTabela(json);
                });
            }

        } else {
            nenhumAchado();
            throw ('Houve um erro na API!');
        }
    }).catch((erro) => {
        console.error(erro);
    });
}

// ------------------ Fim Função de Atualizar Feed ------------------------//

function pesquisar(event) {
    if (event.key === 'Enter' || event.type === 'click') {
        atualizarFeed(sel_tipoPesquisa.value, in_pesquisa.value)
    }
}

function ordernarLista(tipo) {
    fetch(`/listaAtm/ordernar/${idEmpresa}/${tipo}`).then((resposta) => {
        if (resposta.ok) {
            if (resposta.status == 204) {
                nenhumAchado();
            } else {
                resposta.json().then((json) => {
                    plotarTabela(json);

                    let btn_ordernar = document.getElementById(`btn_${tipo}`);

                    btn_ordernar.classList.add('active-filtro');
                })
            }
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch((erro) => {
        console.error(erro);
    });
}

// ------------------ Função de Deletar funcionario ------------------------//
function deletar_atm(idAtm) {
    abrir_modalDeletar();

    const deletar = btn_deletar.addEventListener("click", function () {
        return true;
    });

    if (deletar) {

        fetch(`/listaAtm/${idEmpresa}/${idAtm}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((resposta) => {

            if (resposta.ok) {
                alert("Deletado com sucesso!");
                setTimeout(() => {
                    window.location.reload();
                }, "1500")
            } else {
                throw ("Houve um erro ao tentar realizar o delete!: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }
}
// ------------------ Fim Função de Deletar funcionario ------------------------//




// ------------------ Função de Editar funcionario ------------------------//
function listarUm(idEmpresa, idUser) {

    fetch(`/meusUsers/listarUm/${idEmpresa}/${idUser}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                in_edtId.value = resposta[0].idUser;
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

function editar(idEmpresa, idUser) {

    // Transformar enderco para latitude e longitude -- Não Mexer
    let cep = in_edtCep.value;
    let numero = in_edtNumero.value;
    let rua = in_edtRua.value;
    let cidade = in_edtCidade.value;
    let bairro = in_edtBairro.value;
    let coordenadas = {
        lat: null,
        lng: null
    };

    let endereco = `${rua}, ${numero}, ${bairro} - ${cidade}`
    console.log(endereco);
    const url = `https://nominatim.openstreetmap.org/search.php?q='${endereco}'&format=jsonv2`;
    fetch(url)
        .then(response =>
            response.json()).then(data => {
                console.log(data)

                if (data.length > 0) {
                    coordenadas = {
                        lat: Number(data[0].lat),
                        lng: Number(data[0].lon)
                    }

                    console.log("Coordenadas");
                    console.log(coordenadas);
                };
            }).catch((error) => {
                console.log("Erro ao transformar Json");
                console.log(error);
            })
        .catch((error) => {
            console.log("Erro na requisição");
            console.log(error);
        })

    // ----------------------------------------------

    // console.log("Criar função de editar User - ID " + idUser);

    // fetch(`/meusUsers/editar/${idEmpresa}/${idUser}`, {
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         nomeServer: in_edtNome.value,
    //         telefoneServer: in_edtTelefone.value,
    //         instrumentoServer: sel_edtInstrumento.value,
    //     })
    // }).then(function (resposta) {

    //     if (resposta.ok) {
    //         var texto = `funcionario ${idUser} atualizado com sucesso!`;
    //         aparecer_card(texto);
    //         document.body.style.overflow = 'hidden';

    //         setTimeout(() => {
    //             window.location = "./meusUsers.html";
    //         }, "1500")

    //     } else if (resposta.status == 404) {
    //         window.alert("Deu 404!");
    //     } else {
    //         throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
    //     }
    // }).catch(function (resposta) {
    //     console.log(`#ERRO: ${resposta}`);
    // });
}

// ------------------ Fim Função de Editar funcionario ------------------------//

function nenhumAchado() {
    div_planilhaAtm.innerHTML = `
    <div class="nenhumAchado">
        <h1>Nenhum Atm encontrado</h1>
    </div>
    `
}

function plotarTabela(json) {

    div_planilhaAtm.innerHTML = `
        <table class="tabela-users tabelalistaAtm">
            <thead>
                <tr>
                    <th><button id="btn_identificador" onclick="ordernarLista('identificador')">Identificador</button></th>
                    <th><button id="btn_situacao" onclick="ordernarLista('situacao')">Situação</button></th>
                    <th class="tdInicio"><button id="btn_inicio" onclick="ordernarLista('inicio')">Início</button></th>
                    <th><button id="btn_atividade" onclick="ordernarLista('atividade')">Atividade</button></th>
                    <th><button id="btn_endereco" onclick="ordernarLista('endereco')">Endereço</button></th>
                    <th><button>Gráficos</button></th>
                    <th><button>Editar</button></th>
                    <th><button>Excluir</button></th>
                </tr>
            </thead>
            <tbody id="table_atm">
            </tbody>
        </table>`;

    for (const element of json) {
        //Converter data para o formato dd/mm/yyyy hh:mm:ss
        var data = new Date(element.iniciado);
        element.iniciado = data.toLocaleString();

        // conversor de segundos para dias, horas e minutos
        var segundos = element.tempo_atividade;
        var dias = Math.floor(segundos / (60 * 60 * 24));
        segundos -= dias * (60 * 60 * 24);
        var horas = Math.floor(segundos / (60 * 60));
        segundos -= horas * (60 * 60);
        var minutos = Math.floor(segundos / 60);
        segundos -= minutos * 60;

        element.tempo_atividade = `${dias} dias, ${horas}horas e ${minutos} minutos`;

        table_atm.innerHTML += `
            <tr>
                <td>${element.identificador}</td>
                <td>${element.situacao}</td>
                <td>${element.iniciado}</td>
                <td>${element.tempo_atividade}</td>
                <td>${element.rua}, ${element.numero}</td>
                <td class="tdImg">
                    <button onclick="redirecionarAtm(${element.id})">
                        <img class="graphic" src="./img/cashTechSystem/bar-chart.png" alt="">
                    </button>
                </td>
                <td class="tdImg">
                    <button onclick="abrir_modalEditar(${element.id})">
                        <img src="./img/cashTechSystem/lapis.svg">
                    </button>
                </td>
                <td class="tdImg">
                    <button onclick="deletar_atm(${element.id})">
                        <img src="./img/cashTechSystem/lixo.svg">
                    </button>
                </td>
            </tr>`;
    }
}

function loadingGif() {
    div_planilhaAtm.innerHTML = `
    <div class="loading" id="loadingGif">
        <img src="img/cashTechSystem/loadingGif.svg" alt="">
    </div>
    `
}

function redirecionarAtm(idAtm){
    sessionStorage.idAtm = idAtm;
    window.location.href = `dashboard-atm.html`;
}