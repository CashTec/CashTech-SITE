const idEmpresa = sessionStorage.ID_EMPRESA;
const idAtm = sessionStorage.idAtm;

let jsonProcessosAgora = "";
let jsonProcessosKilled = "";

atualizarProcessos();
atualizarProcessosKilled();

function atualizarProcessos() {
    fetch(`/processos/processosAgora/${idAtm}`,)
        .then((response) => {
            if (response.status === 200) {
                response.json()
                    .then((json) => {

                        jsonString = JSON.stringify(json);

                        if (jsonString === jsonProcessosAgora) {
                            console.log("Não há alteração nos processos Agora");
                            return;
                        } else {
                            jsonProcessosAgora = jsonString;
                            plotarProcessosExecucao(json);
                        }

                    }).catch(error => {
                        console.log(error);
                    })
            } else {
                console.log("Não há processos Agora");
            }
        }).catch((error) => {
            console.error(error);
        })
    setTimeout(() => {
        atualizarProcessos();
    }, 3000)
}

function atualizarProcessosKilled() {
    fetch(`/processos/processosKilled/${idAtm}`)
        .then((response) => {
            if (response.status === 200) {
                response.json()
                    .then((json) => {
                        jsonString = JSON.stringify(json);

                        if (jsonString === jsonProcessosKilled) {
                            console.log("Não há alteração nos processos Killed");
                            return;
                        } else {
                            jsonProcessosKilled = jsonString;

                            plotarProcessosKilled(json);
                        }
                    }).catch(error => {
                        console.log(error);
                    })
            } else {
                console.log("Não há processos Killed");
            }
        }).catch((error) => {
            console.error(error);
        })
    setTimeout(() => {
        atualizarProcessosKilled();
    }, 3000)
}



function plotarProcessosKilled(json) {
    div_processosKilled.innerHTML =
        `
        <table>
        <thead>
            <tr>
                <th class="dois">Horário</th>
                <th class="dois">Nome</th>
                <th>PID</th>
            </tr>
        </thead>
        <tbody id="tby_encerrado">
        </tbody>
    </table>
    `;
    let agora = json[0].dt_processo;
    var data = new Date(agora.dt_processo);
    agora.dt_processo = data.toLocaleString();
    span_horario.innerHTML = agora;

    for (const element of json) {
        var data = new Date(element.dt_processo);
        element.dt_processo = data.toLocaleString();

        tby_encerrado.innerHTML +=
            `
        <tr>
            <td class="dois">${element.dt_processo}</td>
            <td class="dois">${element.nome}</td>
            <td>${element.pid}</td>
        </tr>
        `
    }
}

function plotarProcessosExecucao(json) {
    div_processosExecucao.innerHTML =
        `
    <table class="table">
        <thead>
            <tr>
                <th>PID</th>
                <th class="dois">Nome</th>
                <th>Uso CPU</th>
                <th>Uso RAM</th>
                <th class="dois">Bytes Utilizados</th>
            </tr>
        </thead>
        <tbody id="tby_execucao">
        </tbody>
    </table>
    `;

    for (const element of json) {
        element.uso_cpu = element.uso_cpu.toFixed(2);
        tby_execucao.innerHTML +=
            `
        <tr>
            <td>${element.pid}</td>
            <td class="dois">${element.nome}</td>
            <td>${element.uso_cpu}</td>
            <td>${element.uso_memoria}</td>
            <td class="dois">${element.byte_utilizado}</td>
        </tr>
        `;
    }
}