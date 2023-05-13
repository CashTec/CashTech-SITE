const idEmpresa = sessionStorage.ID_EMPRESA;
const idAtm = sessionStorage.ID_ATM;
let jsonProcessosAgora = "";
let jsonProcessosKilled = "";

function atualizarProcessos() {
    fetch(`/processos/processosAgora/${idAtm}`)
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
                            var columnPid = [];
                            var columnNome = [];
                            var columnUsoCpu = [];
                            var columnMemoria = [];
                            var columnBytes = [];

                            for (const element of json) {
                                columnPid.push(element.pid);
                                columnNome.push(element.nome);
                                columnUsoCpu.push(element.uso_cpu);
                                columnMemoria.push(element.uso_memoria);
                                columnBytes.push(element.byte_utilizado);
                            }

                            console.log(columnPid);
                            console.log(columnNome);
                            console.log(columnUsoCpu);
                            console.log(columnBytes);
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
        // atualizarProcessos();
    }, 3000)
}

atualizarProcessos();

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
                            var columnPid = [];
                            var columnNome = [];
                            var columnDtProcesso = [];

                            for (const element of json) {
                                columnPid.push(element.pid);
                                columnNome.push(element.nome);

                                //Converter data para o formato dd/mm/yyyy hh:mm:ss
                                var data = new Date(element.dt_processo);
                                element.dt_processo = data.toLocaleString();

                                columnDtProcesso.push(element.dt_processo);
                            }

                            // console.log(columnPid);
                            // console.log(columnNome);
                            // console.log(columnDtProcesso);
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

atualizarProcessosKilled();