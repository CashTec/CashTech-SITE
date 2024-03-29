// UMA INSTANCIA PARA MUDAR A FONTE DO GRÁFICO DO CHART.JS
const font = new FontFace(
  "Poppins",
  "url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600;700&display=swap)"
);


// FUNÇÕES PARA PLOTAR DADOS NO GRÁFICO - PLOTAR
let graficoProcessador = {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Consumo médio dos ATMS",
      data: [],
      borderWidth: 3,
      borderColor: "#222"

    },

    ],
  },
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            let value = tooltipItem.dataset.data[tooltipItem.dataIndex];
            return value.toFixed(1) + "%";
          }
        }
      },
      legend: {
        display: false
      },
    },


    scales: {

      y: {
        min: 0,
        max: 100,
        beginAtZero: true,
        border: {
          color: " #222",
        },
        fonts: {
          color: " #222",
        },

        ticks: {
          color: " #222",
          backgroundColor: "#222",
        },

        grid: {
          color: "#222",
          display: false,
        },
      },
      x: {
        border: {
          color: " #222",
        },
        ticks: {
          color: " #222",
          weight: "700",
          family: "Poppins",
        },
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
        backgroundColor: "#222",
        borderColor: "#222",
        spanGaps: true,
      },
    },
    animation: {
      duration: 800,
    },
  },
}
const grafico1 = new Chart(graphicLine1, graficoProcessador);

let graficoMemoria = {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Consumo médio dos ATMS",
      data: [],
      borderWidth: 3,
      borderColor: "#222"

    },

    ],
  },
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            let value = tooltipItem.dataset.data[tooltipItem.dataIndex];
            return value.toFixed(2) + "%";
          }
        }
      },
      legend: {
        display: false
      },
    },


    scales: {

      y: {

        beginAtZero: true,
        border: {
          color: " #222",
        },
        fonts: {
          color: " #222",
        },

        ticks: {
          color: " #222",
          backgroundColor: "#222",
        },

        grid: {
          color: "#222",
          display: false,
        },
      },
      x: {
        border: {
          color: " #222",
        },
        ticks: {
          color: " #222",
          weight: "700",
          family: "Poppins",
        },
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
        backgroundColor: "#222",
        borderColor: "#222",
        spanGaps: true,
      },
    },
    animation: {
      duration: 800,
    },
  },
}
const grafico2 = new Chart(graphicLine2, graficoMemoria);


let graficoRede = {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Megabytes Enviados",
      data: [],
      borderWidth: 3,
      borderColor: "#2D7DB3"
    },
    {
      label: "Magabytes Recebidos",
      data: [],
      borderWidth: 3,
      borderColor: "#E5A50A"
    },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false
      },
    },
    scales: {

      y: {
        suggestedMin: 1,
        suggestedMax: 10,
        beginAtZero: true,
        border: {
          color: " #222",
        },
        fonts: {
          color: " #222",
        },

        ticks: {
          color: " #222",
          backgroundColor: "#222",
        },

        grid: {
          color: "#222",
          display: false,
        },
      },
      x: {
        border: {
          color: " #222",
        },
        ticks: {
          color: " #222",
          weight: "700",
          family: "Poppins",
        },
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
        backgroundColor: "#222",
        borderColor: "#222",
        spanGaps: true,
      },
    },
    animation: {
      duration: 800,
    },
  },
}
const grafico3 = new Chart(graphicLine3, graficoRede);


let graficoHd = {
  type: "doughnut",
  data: {
    labels: ["DISPONÍVEL", "EM USO"],
    datasets: [{
      label: "ATM",
      data: [12, 19],
      borderWidth: [0],
      backgroundColor: ["#FF6384", "#36A2EB"]
    },],
  },
  options: {

    radius: "50%",
    cutout: 80,
    elements: {
      arc: {
        borderRadius: 90,
        spacing: 10,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            let value = tooltipItem.dataset.data[tooltipItem.dataIndex];
            return converterMedida(value);
          }
        }
      },
      legend: {
        display: false
      },
    },
  },
};


const grafico4 = new Chart(graphicBola, graficoHd);

// FUNCIONALIDADES UI UX - FUNC
function passarTela() {
  window.scroll((window.scrollX >= window.innerWidth ? 0 : window.innerWidth), 0);
  window.scroll((window.scrollX >= (window.innerWidth * 3) / 4 ? 0 : window.innerWidth), 0);
}

const divCardInfo = document.querySelectorAll(".card-info");
const btnInfo = document.querySelectorAll(".btn-info");
btnInfo.forEach((element, i) => {
  element.addEventListener("click", () => {
    divCardInfo[i].classList.toggle("active");
  })
})



// -- Função para passar para outra tela 
const btnBolinha = document.querySelectorAll(".content-btn button");
btnBolinha.forEach(element => {
  element.addEventListener("click", passarTela);
});
window.scroll(0, 0);


// FUNÇÕES PARA REQUISIÇÃO - REQUISIÇÃO
function coletarInfoComponente(componente) {
  componente.forEach(element => {
    fetch("componentes/infoComponente", {
      headers: {
        "Content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        idAtmServer: Number(sessionStorage.idAtm),
        componenteServer: element,
      })
    })
      .then(resposta => {
        if (resposta.status != 200) {
          window.location.back;
        }

        resposta.json()
          .then(json => {
            switch (element) {
              case "memoria":
                inserirInfoMemoria(json);
                break;
              case "processador":
                inserirInfoProcessador(json);
                break;
              case "rede":
                inserirInfoRede(json);
                break;
              default:
                console.log("Componente inválido foi enviado na requisição");
            }
          })
      })
      .catch(erro => {
        console.log(erro);
      })
  })
}

function coletarInfoDisco() {
  fetch(`/metricas/infoDisco/${sessionStorage.idAtm}`)
    .then(resposta => {
      if (resposta.status != 200) {
        window.location.back();
      }
      resposta.json()
        .then(json => {
          inserirInfoDisco(json);
          return json
        })
    })
    .catch(erro => {
      console.log(erro);
    })
}

function buscarMetricaRede() {
  fetch(`/metricas/metricaRede/${Number(sessionStorage.idAtm)}`)
    .then(resposta => {
      if (resposta.ok) {
        resposta.json()
          .then(json => {
            atualizarMetricaRede(json);
          })
      } else {
        return [];
      }
    })
    .catch((erro) => {
      console.log(erro);
    })

  setTimeout(() => {
    buscarMetricaRede();
  }, 3200);
}

function buscarMetricaComponente(componentes) {
  componentes.forEach((element) => {
    fetch(`/metricas/metricaComponente/${sessionStorage.idAtm}/${element}`)
      .then(response => response.json())
      .then((json) => {
        if (json.length > 0) {
          switch (element) {
            case "memoria":
              atualizarMetricaMemoria(json);
              break;
            case "processador":
              atualizarMetricaProcessador(json);
              break;
            default:
              console.log("Componente inválido foi enviado na requisição");
          }

        }
      }).catch((erro) => { })
  })
  setTimeout(() => {
    buscarMetricaComponente(["processador", "memoria"]);
  }, 3200)
}

let contadoraRequisicao = 0;
let parametrizacao;

async function obterParametrizacao() {
  return fetch(`/parametrizacao/verParametroHardware/${sessionStorage.ID_EMPRESA}`).then((response) => {
    if (response.ok) {
      return response.json()
        .then((json) => {
          if (json.length > 0) {
            if (contadoraRequisicao < 1) {
              return json
            }
          }
          else {
            console.log("Nenhuma parametrização foi localizada");
            return [];
          }

        }).catch((error) => {
          console.log(error);
        })
    }
  })

}

function inserirEndereco() {
  fetch(`/endereco/exibirEndereco/${sessionStorage.idAtm}`)
    .then((res) => res.json()
      .then(json => {
        let divClass = document.querySelectorAll(".info-atm");
        let endereco = json[0];
        divClass.forEach(element => { element.innerHTML = `<h2>${endereco.identificador}</h2> <span class="bolinha"></span> <span>${endereco.bairro == null ? "" : endereco.bairro + ","} ${endereco.rua == null ? "" : endereco.rua + "-"}  ${endereco.numero == null ? "" : endereco.numero}</span>` })
      })
    ).catch((erro) => console.log(erro));
}

async function buscarKpiDisco(data) {
  return fetch(`metricas/dadosGravados/${sessionStorage.idAtm}/${data}`)
    .then(async (resposta) => {

      if (resposta.status == 200) {
        return await resposta.json()
          .then((json) => {
            return json
          })
      }
      else {
        return [];
      }
    })
    .catch((erro) => console.log(erro))
}

async function buscarKpiRede(data) {
  return fetch(`metricas/dadosGravadosRede/${sessionStorage.idAtm}/${data}`)
    .then((resposta) => {
      if (resposta.status == 200) {
        return resposta.json()
          .then((json) => {
            return json
          })
      } else {
        return []
      }
    })
    .catch((erro) => console.log(erro))

}
async function obterApiceRede() {
  return fetch(`metricas/apiceRede/${sessionStorage.idAtm}`)
    .then((resposta) => {
      if (resposta.status == 200) {
        return resposta.json()
          .then((json) => {
            return json
          })
      } else {
        return [];
      }
    }
    )
    .catch((erro) => console.log(erro))
}

// FUNÇÕES PARA INSERIR INFORMAÇÕES DOS COMPONENTES GRAFICOS - INSERIR
let variavelAuxiliar;

function trocarInfoHd() {
  graficoHd.data.datasets[0].data = [];
  graficoHd.data.datasets[0].data.push((variavelAuxiliar[sel_hd.value].qtd_consumido));
  graficoHd.data.datasets[0].data.push((variavelAuxiliar[sel_hd.value].qtd_maxima - variavelAuxiliar[sel_hd.value].qtd_consumido));
  atualizarAlertaDisco(variavelAuxiliar[sel_hd.value]);
  grafico4.update();
  tamanhoHd.innerText = converterMedida(variavelAuxiliar[sel_hd.value].qtd_maxima);
  montagem.innerText = variavelAuxiliar[sel_hd.value].ponto_montagem;
  modeloHd.innerText = variavelAuxiliar[sel_hd.value].nome == "unknown" ? "--" : variavelAuxiliar[sel_hd.value].nome;
  disponivelHd.innerHTML = "<h2>" + (100 - (Math.floor((variavelAuxiliar[sel_hd.value].qtd_consumido / variavelAuxiliar[sel_hd.value].qtd_maxima) * 100))) + "%</h2><h3>Em uso</h3>";

  inserirKpiDisco(sel_hd.value);
}

async function inserirParametrizacao() {
  let json = await obterParametrizacao();

  let divs = document.querySelectorAll(".legend");
  parametrizacao = [{
    type: "Processador",
    normal: json[0].qtd_cpu_max * 0.75,
    alerta: json[0].qtd_cpu_max * 0.75,
    perigo: json[0].qtd_cpu_max
  },
  {
    type: "Memória",
    normal: json[0].qtd_memoria_max * 0.75,
    alerta: json[0].qtd_memoria_max * 0.75,
    perigo: json[0].qtd_memoria_max
  },
  {
    type: "Rede",
    normalEnviado: (Number(json[0].qtd_bytes_enviado_max) * 0.75).toFixed(2),
    normalRecebido: (Number(json[0].qtd_bytes_recebido_max) * 0.75).toFixed(2),
    alertaEnviado: (Number(json[0].qtd_bytes_enviado_max) * 0.75).toFixed(2),
    alertaRecebido: (Number(json[0].qtd_bytes_recebido_max) * 0.75).toFixed(2),
    perigoEnviado: (Number(json[0].qtd_bytes_enviado_max)).toFixed(2),
    perigoRecebido: (Number(json[0].qtd_bytes_recebido_max)).toFixed(2),
  },
  {
    type: "Disco",
    normal: json[0].qtd_disco_max * 0.75,
    alerta: json[0].qtd_disco_max * 0.75,
    perigo: json[0].qtd_disco_max
  }
  ];

  divs.forEach((element, i) => {
    const {
      type,
      normal,
      alerta,
      perigo
    } = parametrizacao[i];


    if (i != 2) {
      element.innerHTML = `
        <div class="label">
          <span></span>
          Normal < ${normal}%
        </div>
        <div class="label">
          <span></span>
          Alerta > ${alerta}%
        </div>
        <div class="label">
          <span></span>
          Perigo > ${perigo}%
        </div>`;
    } else {
      element.innerHTML = `
<span>E:</span>
<span> < ${parametrizacao[2].normalEnviado / (1024 * 1024)}MB</span>
<span> > ${parametrizacao[2].alertaEnviado / (1024 * 1024)}MB</span>
<span> > ${parametrizacao[2].perigoEnviado / (1024 * 1024)}MB</span>
<span>R:</span>
<span> < ${parametrizacao[2].normalRecebido / (1024 * 1024)}MB</span>
<span> > ${parametrizacao[2].alertaRecebido / (1024 * 1024)}MB</span>
 <span> > ${parametrizacao[2].perigoRecebido / (1024 * 1024)}MB</span>
   `
    }
  });

}

function inserirInfoProcessador(json) {
  idProcessador = json[0].id;
  modelo.innerText = json[0].nome;
  core.innerText = json[0].qtd_cpu_fisica;
  thread.innerText = " " + json[0].qtd_cpu_logica;
  frequencia.innerText = " " + json[0].frequencia.toString().slice(0, 2).split("").join(".") + "Ghz";
}

function inserirInfoDisco(json) {
  graficoHd.data.datasets[0].data = [];
  graficoHd.data.datasets[0].data.push((json[0].qtd_consumido));
  graficoHd.data.datasets[0].data.push((json[0].qtd_maxima - json[0].qtd_consumido));
  inserirKpiDisco(0);
  grafico4.update();
  variavelAuxiliar = json;

  tamanhoHd.innerText = converterMedida(json[0].qtd_maxima);
  montagem.innerText = json[0].ponto_montagem;
  modeloHd.innerText = json[0].nome;
  disponivelHd.innerHTML = "<h2>" + parseInt(100 - ((json[0].qtd_consumido / json[0].qtd_maxima) * 100)) + "%</h2>" + "<h3>Em uso</h3>";
  atualizarAlertaDisco(json[0]);

  for (let i = 0; i < json.length; i++) {
    if (json[i].qtd_maxima > 0) {
      sel_hd.innerHTML += `<option value="${i}">HD${i}</option>`
    }
  }
}

function inserirInfoMemoria(json) {
  idMemoria = json[0].id;
  tamanhoRam.innerText = (json[0].qtd_maxima / Math.pow(10, 9)).toFixed(1) + "GB";
}

function inserirInfoRede(json) {
  macRede.innerText = `${json[0].mac}`
  nomeRede.innerText = `${json[0].nome}`
  ipRede.innerText = `${json[0].ipv4}`
}




//-- Essa função serve para verificar se os dados estão atualizados
const verificador = (json, grafico) => {
  return json[0].dt_metrica.slice(11, 19) === grafico.data.labels[grafico.data.labels.length - 1] ? true : false;
}

// CRIEi CONTADORAS PARA MONITORAR CADA DADO(PROCESSADOR,MEMÓRIA,DISCO E RAM)
let contadoraProcessador = 0;
let contadoraRede = 0;
let contadorMemoria = 0;

function atualizarMetricaProcessador(json) {

  let containerAviso = document.querySelectorAll(".aviso")[0];
  verificador(json, graficoProcessador) ? contadoraProcessador++ : contadoraProcessador = 0;
  kpiTempoInativo(json[0].dt_metrica);
  if (contadoraProcessador < 5) {
    atualizarData(json, graficoProcessador, "processador", grafico1);
  } else {
    containerAviso.classList.add("active");
    containerAviso.innerHTML = "<h2>Não há dados recentes</h2><p>Verifique o software de monitoramento do caixa eletrônico  </p>";
  }

}

function atualizarMetricaMemoria(json) {
  let containerAviso = document.querySelectorAll(".aviso")[1];
  verificador(json, graficoMemoria) ? contadorMemoria++ : contadorMemoria = 0;
  if (contadorMemoria < 2) {
    atualizarData(json, graficoMemoria, "memoria", grafico2);
  } else {
    containerAviso.classList.add("active");
    containerAviso.innerHTML = "<h2>Não há dados recentes</h2><p>Verifique o software de monitoramento do caixa eletrônico  </p>";
  }
}

function atualizarMetricaRede(json) {

  let containerAviso = document.querySelectorAll(".aviso")[2];
  verificador(json, graficoRede) ? contadoraRede++ : contadoraRede = 0;
  if (contadoraRede < 3) {
    atualizarData(json, graficoRede, "rede", grafico3);
  } else {
    containerAviso.classList.add("active");
    containerAviso.innerHTML = "<h2>Não há dados recentes</h2><p>Verifique o software de monitoramento do caixa eletrônico  </p>";
  }
  inserirKpiApiceRede()
  inserirKpiRede()

}

//ATUALIZA DADOS DO GRÁFICO
function atualizarData(json, dadosGrafico, tipo, grafico) {
  let containerAviso;
  const dateTimeFormatado = json[0].dt_metrica.slice(11, 19);

  let primeiroDado;
  let segundoDado;
  switch (tipo) {
    case "rede":
      containerAviso = document.querySelectorAll(".aviso")[2];
      primeiroDado = json[0].bytes_recebidos_segundo / (1024 * 1024);
      segundoDado = json[0].bytes_enviados_segundo / (1024 * 1024);
      break;
    case "processador":
      containerAviso = document.querySelectorAll(".aviso")[0];
      primeiroDado = json[0].qtd_consumido;
      break;
    case "memoria":
      containerAviso = document.querySelectorAll(".aviso")[1];
      primeiroDado = (json[0].qtd_consumido / (Number(tamanhoRam.innerHTML.replace("GB", "")) * (1024 * 1024 * 1024))) * 100;
      break;
  }

  if (dadosGrafico.data.datasets[0].data.length < 6) {
    containerAviso.classList.add("active");
    containerAviso.innerHTML = "<h2>Aguardando dados<h2/>";
    dadosGrafico.data.datasets[0].data.push(primeiroDado);
    if (tipo === "rede") {
      dadosGrafico.data.datasets[1].data.push(segundoDado);
    }

    dadosGrafico.data.labels.push(dateTimeFormatado);
    return
  }

  if (tipo == "memoria") {
    atualizarAlertaMemoria(json);
  }
  if (tipo == "rede") {
    atualizarAlertaRede(json)
  }
  if (tipo == "processador") {
    atualizarAlertaCPU(json);
  }
  if (containerAviso.classList.contains("active")) {
    containerAviso.classList.remove("active")
  }
  dadosGrafico.data.datasets[0].data.shift();
  dadosGrafico.data.datasets[0].data.push(primeiroDado);

  if (tipo == "rede") {
    dadosGrafico.data.datasets[1].data.shift();
    dadosGrafico.data.datasets[1].data.push(segundoDado);
  }
  dadosGrafico.data.labels.shift();
  dadosGrafico.data.labels.push(dateTimeFormatado);
  grafico.update();
}


//ATUALIZAR ALERTAS DOS COMPONENTES
async function atualizarAlertaRede(metricaRede) {

  let qtd_enviado = Number(metricaRede[0].bytes_enviados_segundo) / (1024 * 1024);
  let qtd_recebido = Number(metricaRede[0].bytes_recebidos_segundo) / (1024 * 1024);
  let parametrizacao = await obterParametrizacao();
  let alerta = (Number(parametrizacao[0].qtd_bytes_enviado_max) / (1024 * 1024)) * 0.75;
  let perigo = (Number(parametrizacao[0].qtd_bytes_recebido_max) / (1024 * 1024));
  if (perigo < qtd_enviado || perigo < qtd_recebido) {
    alertRede.innerHTML = "Perigo";
    alertRede.style.backgroundColor = "red";
  } else if (alerta < qtd_enviado || alerta < qtd_recebido) {
    console.log("Alera");
    alertRede.innerHTML = "Alerta";
    alertRede.style.backgroundColor = "yellow";
  } else {
    alertRede.innerHTML = "Normal";
    alertRede.style.backgroundColor = "green";
  }
}

async function atualizarAlertaCPU(metricaCPU) {
  metricaCPU = Number(metricaCPU[0].qtd_consumido.toFixed(2));
  let parametrizacao = await obterParametrizacao();
  let alerta = parametrizacao[0].qtd_cpu_max * 0.75;
  let perigo = parametrizacao[0].qtd_cpu_max;

  if (perigo < metricaCPU) {
    alertCpu.innerHTML = "Perigo";
    alertCpu.style.backgroundColor = "red";
  } else if (metricaCPU < alerta) {
    alertCpu.innerHTML = "Normal";
    alertCpu.style.backgroundColor = "green";
  } else {
    alertCpu.innerHTML = "Alerta";
    alertCpu.style.backgroundColor = "yellow";
  }
}

async function atualizarAlertaMemoria(metricaMemoria) {
  metricaMemoria = ((metricaMemoria[0].qtd_consumido / 1073741824) / Number(tamanhoRam.innerHTML.replace("GB", ""))) * 100;
  let parametrizacao = await obterParametrizacao();
  let alerta = Number(parametrizacao[0].qtd_memoria_max) * 0.75;
  let perigo = Number(parametrizacao[0].qtd_memoria_max);
  if (perigo < metricaMemoria) {
    alertRam.innerHTML = "Perigo";
    alertRam.style.backgroundColor = "red";
  } else if (metricaMemoria < alerta) {
    alertRam.innerHTML = "Normal";
    alertRam.style.backgroundColor = "green";
  } else {
    alertRam.innerHTML = "Alerta";
    alertRam.style.backgroundColor = "yellow";
  }

}

async function atualizarAlertaDisco(metricaDisco) {
  let parametrizacao = await obterParametrizacao();

  metricaDisco = Math.floor((Number(metricaDisco.qtd_consumido) / Number(metricaDisco.qtd_maxima)) * 100);
  let alerta = (parametrizacao[0].qtd_disco_max * 0.75);
  let perigo = parametrizacao[0].qtd_disco_max;
  if (perigo < metricaDisco) {
    alertDisco.innerHTML = "Perigo";
    alertDisco.style.backgroundColor = "red";
    alertDisco.style.color = "white";
  } else if (metricaDisco < alerta) {
    alertDisco.innerHTML = "Normal";
    alertDisco.style.backgroundColor = "green";
    alertDisco.style.color = "white";
  } else {
    alertDisco.innerHTML = "Alerta";
    alertDisco.style.color = "black";
    alertDisco.style.backgroundColor = "yellow";
  }
}


// KPIS
function kpiTempoInativo(ultimaMetrica) {

  kpiInatividade.innerHTML = `00:00:00`;
  if (contadoraProcessador >= 2) {
    const date = new Date();
    let dtUltimaMetrica = new Date(ultimaMetrica);
    let tempo = date - dtUltimaMetrica;
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
    kpiInatividade.innerHTML = `${horas}:${minutos}:${segundos}`;
  }
}

// FUNÇÕES PARA EXIBIR MEDIDAS EQUIVALENTE A SUA UNIDADE(KB,MB,GB)
const conversorDataMesAno = () => {
  const data = new Date();
  data.setMonth(data.getMonth());
  let dataFormatadaHoje = ((data.getMonth() + 1).toString().length == 1 ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1)) + "-" + data.getFullYear();
  let dataFormatadaOntem = ((data.getMonth()).toString().length == 1 ? "0" + (data.getMonth()) : (data.getMonth())) + "-" + data.getFullYear();
  return [dataFormatadaHoje, dataFormatadaOntem]
}

async function inserirKpiDisco(disco) {
  let dadosHoje = await buscarKpiDisco(conversorDataMesAno()[0]);
  let conta;
  if (dadosHoje.length > 0) {
    if (disco === 0) {
      conta = dadosHoje[disco + 1].qtd_consumido - dadosHoje[disco].qtd_consumido;
    }
    else {

      conta = dadosHoje[disco + 2].qtd_consumido - dadosHoje[disco + 1].qtd_consumido;
    }


    let mesesParaEncher;
    let resto;
    let consumidoMes;
    let tamanhoTotal;

    if (conta > 0) {
      tamanhoTotal = (Number(tamanhoHd.innerHTML.replace(/[A-Za-z]/g, "")) * 1024);
      consumidoMes = conta / (1024 * 1024);
      resto = tamanhoTotal - consumidoMes;
      mesesParaEncher = resto / consumidoMes;
    }
    else {
      conta = 0;
      mesesParaEncher = 1001;
    }

    if (mesesParaEncher > 100 || conta <= 0 || mesesParaEncher<1  ) {
      textHd.innerHTML = "Com base no seu consumo, seu volume não corre o risco atingir sua capacidade total";
    } else {
      textHd.innerHTML = `Com base no seu consumo, levará mais de ${mesesParaEncher.toFixed(1)} meses para que o volume atinja sua capacidade total.`;
    }
    ;
    let conversao = converterMedida(conta);
    kpiHd.innerHTML = conversao;
  }
  else {
    kpiHd.innerHTML = 0.0 + "B";
  }
}

const converterMedida = (medida) => {
  let conversao = medida;
  const unidades = ['B', 'KB', 'MB', 'GB'];
  let indiceUnidade = 0;
  while (conversao >= 1024 && indiceUnidade < unidades.length - 1) {
    conversao /= 1024;
    indiceUnidade++;
  }


  return conversao < 0 ? (conversao * -1).toFixed(2) + unidades[indiceUnidade] : (conversao).toFixed(2) + unidades[indiceUnidade];
}

async function inserirKpiRede() {
  let date = new Date().getDate();
  let dtHoje = `${(conversorDataMesAno()[0]).split("-").reverse().join("-")}-${date.toString().length == 1 ? "0" + date : date}`;
  let dtOntem = `${(conversorDataMesAno()[0]).split("-").reverse().join("-")}-${(date - 1).toString().length == 1 ? "0" + (date - 1) : (date - 1)}`;
  let dadosHoje = await buscarKpiRede(dtHoje);
  let dadosOntem = await buscarKpiRede(dtOntem);
  dadosHoje = dadosHoje[0].dados == null ? 0 : dadosHoje[0].dados;
  dadosOntem = dadosOntem[0].dados == null ? 0 : dadosOntem[0].dados;
  let conta = (Number(dadosHoje) - Number(dadosOntem));


  kpiRede.innerHTML = dadosHoje > 0 ? converterMedida(dadosHoje) : "0.0 MB";
  if (conta > 0) {
    textRede.innerHTML = `${(converterMedida(conta))} a mais que ontem`;
  }
  else if (conta < 0) {
    textRede.innerHTML = `${(conta / (1024 * 1024) * -1).toFixed(2)}MB a menos que ontem`;
  }
  else {
    textRede.innerHTML = ``;
  }
}

async function inserirKpiApiceRede() {
  let apice = await obterApiceRede();
  if (apice.length > 0) {
    apice = apice[0].dataApice
    kpiApiceRede.innerHTML = apice;
  }
  else {
    kpiApiceRede.innerHTML = "Não há dados"
  }
}

// CHAMANDO FUNÇÕES PARA SEREM EXECUTADAS 
buscarMetricaRede();
inserirKpiRede()
coletarInfoComponente(["processador", "memoria", "rede"]);
buscarMetricaComponente(["processador", "memoria"]);
inserirParametrizacao();
coletarInfoDisco();
inserirEndereco()
inserirKpiApiceRede();

