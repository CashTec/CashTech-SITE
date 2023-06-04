const idEmpresa = sessionStorage.ID_EMPRESA;
const idAtm = sessionStorage.idAtm;

let jsonProcessosAgora = "";
let jsonProcessosKilled = "";
let ultimoProcessoKilled = "";
let dtUltimoProcesso = "";

atualizarProcessos();
atualizarProcessosKilled();
verProcessoMaisFinalizado();
verHorarioMaisFinalizado();

function atualizarProcessos() {
    fetch(`/processos/processosAgora/${idAtm}`,)
        .then((response) => {
            if (response.status === 200) {
                response.json()
                    .then((json) => {
                        if (json.length > 0) {
                            jsonString = JSON.stringify(json);

                            if (jsonString === jsonProcessosAgora) {
                                return;
                            } else {
                                jsonProcessosAgora = jsonString;

                                plotarProcessosExecucao(json);
                            }
                        } else {
                            nenhumAchado(div_processosExecucao);
                        }

                    }).catch(error => {
                        console.log(error);
                    })
            } else {
             
            }
        }).catch((error) => {
            console.error(error);
        })
    setTimeout(() => {
        atualizarProcessos();
        verProcessoMaisFinalizado();
        verHorarioMaisFinalizado();
    }, 3000)
}

function atualizarProcessosKilled() {
    fetch(`/processos/processosKilled/${idAtm}`)
        .then((response) => {
            if (response.status === 200) {
                response.json()
                    .then((json) => {
                        if (json.length > 0) {
                            ultimoProcessoKilled = json[0].dt_processo;
                            tempoUltimoProcesso()
                            jsonString = JSON.stringify(json);

                            if (jsonString === jsonProcessosKilled) {
                                return;
                            } else {
                                jsonProcessosKilled = jsonString;

                                plotarProcessosKilled(json);
                            }
                        } else {
                            nenhumAchado(div_processosKilled);
                        }
                    }).catch(error => {
                        console.log(error);
                    })
            }
        }).catch((error) => {
            console.error(error);
        })
    setTimeout(() => {
        atualizarProcessosKilled();
    }, 3000)
}

function tempoUltimoProcesso() {
    const date = new Date();
    dtUltimoProcesso = new Date(ultimoProcessoKilled);

    let tempo = date - dtUltimoProcesso;
    let segundos = Math.floor(tempo / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60) - 3;

    segundos %= 60;
    minutos %= 60;
    horas %= 60;

    if (horas < 10) {
        horas = `0${horas}`;
    }
    if (minutos < 10) {
        minutos = `0${minutos}`;
    }
    if (segundos < 10) {
        segundos = `0${segundos}`;
    }

    spn_tempoUltimoProcesso.innerHTML = `${horas}:${minutos}:${segundos}`;

    setTimeout(() => {
        tempoUltimoProcesso();
    }, 1000);
}

const formatarData = (data) => {
    const regexDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d+Z$/;
    return data.replace(regexDate, '$3/$2/$1 $4:$5:$6');
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

    for (const element of json) {

        let data = formatarData(element.dt_processo);

        tby_encerrado.innerHTML +=
            `
        <tr>
            <td class="dois">${data}</td>
            <td class="dois truncated-text">${element.nome}</td>
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

    let agora = formatarData(json[0].dt_processo);
    span_horario.innerHTML = agora;

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

function nenhumAchado(div) {
    div.innerHTML =
        `
        <div class="backProcessosExecucao">
            <div class="nenhumAchado">
                <h1>Nenhum processo encerrado</h1>
            </div>
        </div>
    `;
}
function verProcessoMaisFinalizado() {
    let dtProcesso = new Date();

    // Passar para o formato dia,mes,ano e colocar o fuseau horário de brasília
    dtProcesso = dtProcesso.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    dtProcesso = dtProcesso.replaceAll('/', 'barra');

    fetch(`/processos/verProcessoMaisFinalizado/${idAtm}/${dtProcesso}`)
        .then((response) => {
            if (response.status === 200) {
                response.json()
                    .then((json) => {
                        if (json.length > 0) {
                            spn_processoMaisFinalizado.innerHTML = json[0].nome;
                            spn_qtdProcessoFinalizado.innerHTML = json[0].numero;
                        } else {
                            spn_processoMaisFinalizado.innerHTML = "Nenhum processo finalizado";
                            spn_qtdProcessoFinalizado.innerHTML = "0";
                        }
                    }).catch(error => {
                        console.log(error);
                    })
            }
        }).catch((error) => {
            console.error(error);
        })
}

function verHorarioMaisFinalizado() {
    let dtProcesso = new Date();

    // Passar para o formato dia,mes,ano e colocar o fuseau horário de brasília
    dtProcesso = dtProcesso.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    dtProcesso = dtProcesso.replaceAll('/', 'barra');

    fetch(`/processos/verHorarioMaisFinalizado/${idAtm}/${dtProcesso}`)
        .then((response) => {
            if (response.status === 200) {
                response.json()
                    .then((json) => {
                        if (json.length > 0) {
                            spn_horarioMaisFinalizado.innerHTML = json[0].dt;
                            spn_qtdHorarioFinalizado.innerHTML = `${json[0].quantidade} processos finalizados`;
                        } else {
                            spn_horarioMaisFinalizado.innerHTML = "Nenhum processo finalizado";
                            spn_qtdHorarioFinalizado.innerHTML = "0";
                        }
                    }).catch(error => {
                        console.log(error);
                    })
            }
        }).catch((error) => {
            console.error(error);
        })
}