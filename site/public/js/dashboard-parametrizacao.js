const idEmpresa = sessionStorage.ID_EMPRESA;
const campo = sessionStorage.CAMPO;
const valor = sessionStorage.VALOR;


exibirProcessosPermitidos();

function editarUsoMax(campo) {
    var in_campo;
    var img_campo;
    var isPorcentagem = false;

    switch (campo) {
        case 'Processador':
            in_campo = edtProcessador;
            img_campo = imgProcessador;
            isPorcentagem = true;
            break;
        case 'Memoria':
            in_campo = edtMemoria;
            img_campo = imgMemoria;
            isPorcentagem = true;
            break;
        case 'Disco':
            in_campo = edtDisco;
            img_campo = imgDisco;
            isPorcentagem = true;
            break;
        case 'BytesRecebidos':
            in_campo = edtBytesRecebidos;
            img_campo = imgBytesRecebidos;
            break;
        case 'BytesEnviados':
            in_campo = edtBytesEnviados;
            img_campo = imgBytesEnviados;
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
    }

}


function exibirProcessosPermitidos() {
    fetch(`/parametrizacao/verProcessosPermitidos/${idEmpresa}`).then((response) => {
        if (response.ok) {
            response.json().then((json) => {
                processos = json;
                console.log("Processos");
                console.log(processos);

                if (processos.length > 0) {
                    // plotar processos
                    plotarTabela(processos);
                } else {
                    semProcesso();
                }
            }).catch((erro) => {
                console.log(erro);
            })
        }
    }).catch((erro) => {
        console.log("houve um erro: " + erro);
    })
}

function plotarTabela(processos) {
    div_planilhaProcessos.innerHTML =
        `
    <table class="tabela-processos">
        <tbody id="lista_processos">
        </tbody>
    </table>
    `;

    for (const processo of processos) {
        lista_processos.innerHTML +=
            `
        <tr>
            <td>${processo.nome}</td>
            <td>
                <button onclick="deletarProcesso(${processo.id})">
                    <img src="./img/cashTechSystem/lixo.svg" alt="">
                </button>
            </td>
        </tr>
        `;
    }
}

function semProcesso() {
    div_planilhaProcessos.innerHTML =
        `
    <div class="nenhum-cadastrado">
        <h2 id="h2_nenhumAchado">
            Nenhum processo cadastrado!
        </h2>
    </div>
    `;
}

function atualizarParametroHardware(req, res) {
    fetch(`/parametrizacao/atualizarParametroHardware/${campo}${valor}${idEmpresa}`).then((response) => {
        if(response.ok) {
            response.json().then((json) => {
                parametro = json;
                console.log("Parametro");
                console.log(parametro);

                if(parametro.length > 0) {

                } else {
                    console.log("Falta de dados");
                }
            }).catch((erro) => {
                console.log(erro);
            })
        }
    }).catch((erro) => {
        console.log("Ocorreu um erro: " + erro);
    })
}