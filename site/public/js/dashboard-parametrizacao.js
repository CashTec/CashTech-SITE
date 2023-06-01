const idEmpresa = sessionStorage.ID_EMPRESA;

exibirProcessosPermitidos();
exibirParametro();

let processosPermitido = [];
let todosProcessos = "";

function editarUsoMax(campo) {
    var in_campo;
    var img_campo;
    var isPorcentagem = false;
    let valor = "";

    switch (campo) {
        case 'Processador':
            in_campo = edtProcessador;
            img_campo = imgProcessador;
            isPorcentagem = true;
            valor = 'qtd_cpu_max';
            break;
        case 'Memoria':
            in_campo = edtMemoria;
            img_campo = imgMemoria;
            isPorcentagem = true;
            valor = 'qtd_memoria_max';
            break;
        case 'Disco':
            in_campo = edtDisco;
            img_campo = imgDisco;
            isPorcentagem = true;
            valor = 'qtd_disco_max';
            break;
        case 'BytesRecebidos':
            in_campo = edtBytesRecebidos;
            img_campo = imgBytesRecebidos;
            valor = 'qtd_bytes_recebido_max';
            break;
        case 'BytesEnviados':
            in_campo = edtBytesEnviados;
            img_campo = imgBytesEnviados;
            valor = 'qtd_bytes_enviado_max';
            break;
        default:
            break;
    }


    if (img_campo.src.match("lapis-parametro.svg")) {
        img_campo.src = "img/cashTechSystem/confirm.svg";
        in_campo.disabled = false;
        in_campo.style.border = "1px solid green";

        if (isPorcentagem) {
            in_campo.style.borderRight = "0px solid white";
            in_campo.parentElement.children[1].style.color = "#000";
            in_campo.parentElement.children[1].style.border = "1px solid green";
            in_campo.parentElement.children[1].style.borderLeft = "0px solid white";
        }


    } else {
        img_campo.src = "img/cashTechSystem/lapis-parametro.svg"
        in_campo.disabled = true;
        in_campo.style.border = "none";

        if (isPorcentagem) {
            in_campo.parentElement.children[1].style.color = "#848484";
            in_campo.parentElement.children[1].style.border = "none";
        }

        let valorCampo;
        
        if(valor == "qtd_bytes_recebido_max" || valor == "qtd_bytes_enviado_max"){
            // trasnformar mb para bytes
            valorCampo = in_campo.value * 1024 * 1024;
        } else {
            valorCampo = in_campo.value;
        }

        atualizarParametroHardware(valor, valorCampo);
    }


}

function pesquisarProcesso() {
    var nome = ipt_pesquisa.value
    lista_processos.innerHTML = "";
    tabela_processos.style = "";

    let jsonAux = [];
    if (nome != "") {
        for (const processoPermitido of processosPermitido) {
            if (processoPermitido.nome.toLowerCase().includes(nome.toLowerCase())) {
                jsonAux.push(processoPermitido);
            }
        }

        if (jsonAux.length > 0) {
            let listaASerPlotada = "";
            for (const processo of jsonAux) {
                listaASerPlotada +=
                    `
                    <tr>
                    <td>${processo.nome}</td>
                        <td>
                            <button onclick="deletarProcessoPermitido(${processo.id})">
                                <img src="./img/cashTechSystem/lixo.svg" alt="">
                            </button>
                        </td>
                    </tr>
                    `;
            }
            lista_processos.innerHTML = listaASerPlotada;
        } else {
            lista_processos.innerHTML = "<span id='teste' class='nenhumProcesso'>Nenhum processo encontrado!</span>";
            tabela_processos.style = "margin-top: 4vh;"
        }

    } else {
        lista_processos.innerHTML = todosProcessos;
    }
}

function exibirProcessosPermitidos() {
    loadingGif.style.display = "flex";
    fetch(`/parametrizacao/verProcessosPermitidos/${idEmpresa}`).then((response) => {
        if (response.ok) {
            response.json().then((json) => {
                processosPermitido = json;
                processos = json;
                console.log("Processos");
                console.log(processos);
                if (processos.length > 0) {
                    // plotar processos
                    plotarTabela(processos);
                } else {
                    semProcesso();
                    loadingGif.style.display = "none";
                }
            }).catch((erro) => {
                console.log(erro);
                loadingGif.style.display = "none";

            })
        }
    }).catch((erro) => {
        console.log("houve um erro: " + erro);
    })
}

function deletarProcessoPermitido(id) {
    fetch(`/parametrizacao/deletarProcesso/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        if (response.ok) {
            console.log("Deu certo!");
            alert("Deletado com sucesso!");
            window.location.reload();
        } else {
            console.log("Deu errado!");
        }
    }).catch((erro) => {
        console.log(erro);
    })
}

function adicionarNovoProcesso() {
    var nome = ipt_add_process.value;

    nome = nome.replaceAll("/", "TemBarra");

    if (nome == "") {
        alert("Insira um valor!");
    } else {
        fetch(`/parametrizacao/adicionarProcesso/${nome}/${idEmpresa}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            console.log(response);
            if (response.ok) {
                alert(`Processo adicionado!`);
                window.location.reload();
            } else {
                console.log("Deu errado!")
            }
        }).catch((erro) => {
            console.log(erro);
        })
    }
}

function plotarTabela(processos) {
    div_planilhaProcessos.innerHTML =
        `
    <table id="tabela_processos" class="tabela-processos">
        <tbody id="lista_processos">
        </tbody>    
    </table>
    `;

    for (const processo of processos) {

        todosProcessos +=
            `
        <tr class="processoLista">
            <td>${processo.nome}</td>
            <td>
                <button onclick="deletarProcessoPermitido(${processo.id})">
                    <img src="./img/cashTechSystem/lixo.svg" alt="">
                </button>
            </td>
        </tr>
        `;
    }
    lista_processos.innerHTML = todosProcessos;
    loadingGif.style.display = "none";
}


function semProcesso() {
    div_planilhaProcessos.innerHTML =
        `
    <div class="nenhum-cadastrado">
        <h2 id="h2_nenhumAchado">
            Não há nenhúm processo!
        </h2>
    </div>
    `;
}

function exibirParametro() {
    fetch(`/parametrizacao/verParametroHardware/${idEmpresa}`).then((response) => {
        if (response.ok) {
            response.json().then((json) => {
                let parametrizacao = json[0];
                if (json.length > 0) {
                    plotarParametro(parametrizacao);
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    })
}


function plotarParametro(parametrizacao) {
    edtProcessador.value = parametrizacao.qtd_cpu_max;
    edtMemoria.value = parametrizacao.qtd_memoria_max;
    edtDisco.value = parametrizacao.qtd_disco_max;
    edtBytesEnviados.value = parametrizacao.qtd_bytes_enviado_max / (1024 * 1024);
    edtBytesRecebidos.value = parametrizacao.qtd_bytes_recebido_max / (1024 * 1024);
}

function atualizarParametroHardware(campo, valor) {
    fetch(`/parametrizacao/atualizarParametroHardware/${idEmpresa}/${campo}/${valor}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        if (response.ok) {
            switch (campo) {
                case "qtd_cpu_max":
                    campo = "Quantidade de CPU";
                    break;
                case "qtd_memoria_max":
                    campo = "Quantidade de Memória";
                    break;
                case "qtd_disco_max":
                    campo = "Quantidade de Disco";
                    break;
                case "qtd_bytes_enviado_max":
                    campo = "Quantidade de Bytes Enviados";
                    valor = valor / (1024 * 1024);
                    break;
                case "qtd_bytes_recebido_max":
                    campo = "Quantidade de Bytes Recebidos";
                    valor = valor / (1024 * 1024);
                    break;
            }

            alert(`${campo} atualizado para o valor: ${valor}!`);
        } else {
            alert("Ocorreu um erro!");
        }
    }).catch((erro) => {
        console.log("Ocorreu um erro: " + erro);
    })

}
