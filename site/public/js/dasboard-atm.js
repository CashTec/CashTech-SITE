// UMA INSTANCIA PARA MUDAR A FONTE DO GRÁFICO DO CHART.JS
const font = new FontFace(
  "Poppins",
  "url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600;700&display=swap)"
);

// GRAFICOS
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
    labels: ["PERIGO", "ALERTA"],
    datasets: [{
      label: "ATM",
      data: [12, 19],
      borderWidth: [0],
      backgroundColor: ["#FF6384", "#36A2EB"]
    }, ],
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
      legend: {
        display: false
      },
    },
  },
};

const grafico4 = new Chart(graphicBola, graficoHd);

// FUNCIONALIDADES UI UX - FUNC
function passarTela() {
  window.scroll((window.scrollX >= (window.innerWidth * 3 )/ 4 ? 0 : window.innerWidth), 0);
  console.log(window.innerWidth);
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
          alert("Houve um erro ao fazer requisição");
        }

        resposta.json()
          .then(json => {
            switch (element) {
              case "memoria":
                inserirInfoMemoria(json);
                break;
              case "disco":
                inserirInfoDisco(json);
                break;
              case "processador":
                inserirInfoProcessador(json);
                break;
              case "rede":
                inserirInfoRede(json);
              default:
                console.log("Componente inválido");
            }
          })
      })
      .catch(erro => {
        console.log(erro)
      })
  })
}



function buscarMetricaRede() {
  fetch(`/metricas/metricaRede/${Number(sessionStorage.idAtm)}`).
  then(resposta => resposta.json())
    .then(json => {
      if (json.length > 0) {
        atualizarMetricaRede(json);
      }
    }).catch((erro) => {
      console.error(erro);
    })
  setTimeout(() => {
    buscarMetricaRede()
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
              console.log("Componente inválido");
          }

        }
      }).catch((erro) => {
        console.log(erro);
      })
  })
  setTimeout(() => {
    buscarMetricaComponente(["processador", "memoria"]);
  }, 3200)
}

let contadoraRequisicao = 0;

let parametrizacao;

function obterParametrizacao() {
  return fetch(`/parametrizacao/verParametroHardware/${sessionStorage.ID_EMPRESA}`).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {

        if (json.length > 0) {
          if (contadoraRequisicao < 1) {
            return json
          }
        }

      }).catch((error) => {
        console.log(error);
      })
    }
  })

}


// FUNÇÕES PARA INSERIR INFORMAÇÕES DOS COMPONENTES GRAFICOS - INSERIR
let variavelAuxiliar;

function trocarInfoHd() {
  graficoHd.data.datasets[0].data = [];
  graficoHd.data.datasets[0].data.push(variavelAuxiliar[sel_hd.value].qtd_disponivel);
  graficoHd.data.datasets[0].data.push(variavelAuxiliar[sel_hd.value].qtd_maxima - variavelAuxiliar[sel_hd.value].qtd_disponivel);
  atualizarAlertaDisco(json);

  grafico4.update();

  tamanhoHd.innerText = (variavelAuxiliar[sel_hd.value].qtd_maxima / 1073741824).toFixed(1) + "Gb";
  montagem.innerText = variavelAuxiliar[sel_hd.value].ponto_montagem;
  modeloHd.innerText = variavelAuxiliar[sel_hd.value].nome == "unknown" ? "--" : variavelAuxiliar[sel_hd.value].nome;
  disponivelHd.innerHTML = "<h2>" + Math.floor((variavelAuxiliar[sel_hd.value].qtd_disponivel / variavelAuxiliar[sel_hd.value].qtd_maxima) * 100) + "%</h2><h3>Usado </h3>";
}

async function inserirParametrizacao() {
  let json = await obterParametrizacao();
  console.log("aaaaaaaaaaa")
  console.log(json)
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
    element.innerHTML = `
        <div class="label">
          <span></span>
          Normal < ${normal}
        </div>
        <div class="label">
          <span></span>
          Alerta > ${alerta}
        </div>
        <div class="label">
          <span></span>
          Perigo > ${perigo}
        </div>`;
  });
}



function inserirInfoProcessador(json) {
  console.log(json[0].frequencia)
  idProcessador = json[0].id;
  modelo.innerText = json[0].nome;
  core.innerText = json[0].qtd_cpu_fisica;
  thread.innerText = " " + json[0].qtd_cpu_logica;
  frequencia.innerText = " " + json[0].frequencia.toString().slice(0, 2).split("").join(".") + "Ghz";
}

function inserirInfoDisco(json) {
  graficoHd.data.datasets[0].data = [];
  graficoHd.data.datasets[0].data.push(json[0].qtd_disponivel);
  graficoHd.data.datasets[0].data.push(json[0].qtd_maxima - json[0].qtd_disponivel);
  grafico4.update();

  variavelAuxiliar = json;
  tamanhoHd.innerText = (json[0].qtd_maxima / 1073741824).toFixed(1) + "GB";
  montagem.innerText = json[0].ponto_montagem;
  modeloHd.innerText = json[0].nome;
  disponivelHd.innerHTML = "<h2>" + (Math.floor((json[0].qtd_disponivel / json[0].qtd_maxima) * 100)) + "%</h2>" + "<h3>Usado </h3>";
  
  atualizarAlertaDisco(json);
  for (let i = 0; i < json.length; i++) {
    sel_hd.innerHTML += `<option value="${i}">HD${i}</option>`
  }
}

function inserirInfoMemoria(json) {
  idMemoria = json[0].id;
  tamanhoRam.innerText = (json[0].qtd_maxima / 1073741824).toFixed(1) + "GB";
}


function inserirInfoRede(json) {
  macRede.innerText = `${json[0].mac}`
  nomeRede.innerText = `${json[0].nome}`
  ipRede.innerText = `${json[0].ipv4}`
}


// FUNÇÕES PARA PLOTAR DADOS NO GRÁFICO - PLOTAR


//-- Essa função serve para verificar os dados estão atualizados
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
  if (contadoraProcessador < 2) {
    atualizarData(json, graficoProcessador, "processador", grafico1);
  } else {
    containerAviso.classList.add("active");
    containerAviso.innerHTML = "<h2>Não há dados recentes</h2><p>Verifique o software de monitoramento do caixa eletrônico  </p>";
  }
}

function atualizarMetricaMemoria(json) {
  let containerAviso = document.querySelectorAll(".aviso")[1];
  verificador(json, graficoMemoria) ? contadorMemoria++ : contadorMemoria = 0;
  if (contadoraRede < 2) {
    atualizarData(json, graficoMemoria, "memoria", grafico2);
  } else {
    containerAviso.classList.add("active");
    containerAviso.innerHTML = "<h2>Não há dados recentes</h2><p>Verifique o software de monitoramento do caixa eletrônico  </p>";
  }
}


function atualizarMetricaRede(json) {
  let containerAviso = document.querySelectorAll(".aviso")[2];
  verificador(json, graficoRede) ? contadoraRede++ : contadoraRede = 0;
  if (contadoraRede < 2) {
    atualizarData(json, graficoRede, "rede", grafico3);
  } else {
    containerAviso.classList.add("active");
    containerAviso.innerHTML = "<h2>Não há dados recentes</h2><p>Verifique o software de monitoramento do caixa eletrônico  </p>";
  }
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
      console.log(containerAviso)
      primeiroDado = json[0].qtd_consumido;
      break;

    case "memoria":
      console.log(containerAviso)
      containerAviso = document.querySelectorAll(".aviso")[1];
      primeiroDado = ((json[0].qtd_consumido / 1073741824) / Number(tamanhoRam.innerHTML.replace("GB", ""))) * 100;
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
  
  if(tipo=="memoria"){
  atualizarAlertaMemoria(json);  
}
if(tipo=="rede"){
 atualizarAlertaRede(json)
}
if(tipo=="processador"){
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

async function atualizarAlertaRede(metricaRede){
  let qtd_enviado = metricaRede[0].bytes_enviados_segundo/ (1024 * 1024);
  let qtd_recebido = metricaRede[0].bytes_recebidos_segundo / (1024 * 1024);
  let parametrizacao = await obterParametrizacao();
  let alerta = parametrizacao[0].qtd_bytes_enviados_max * 0.75;
  let perigo = parametrizacao[0].qtd_bytes_recebidos_max;

  if (perigo < qtd_enviado || perigo < qtd_recebido) {
    alertRede.innerHTML = "Perigo";
    alertRede.style.backgroundColor = "red";
  } else if (alerta < qtd_enviado || alerta < qtd_recebido ) {
    alertRede.innerHTML = "Normal";
    alertRede.style.backgroundColor = "green";
  }
  else{
    alertRede.innerHTML = "Alerta";
    alertRede.style.backgroundColor = "yellow";
  }

}

async function atualizarAlertaCPU(metricaCPU) {
  metricaCPU =Number(metricaCPU[0].qtd_consumido.toFixed(2));
  console.log(metricaCPU);
  let parametrizacao = await obterParametrizacao();
  console.log(parametrizacao[0].qtd_cpu_max)
  let alerta = parametrizacao[0].qtd_cpu_max * 0.75;
  let perigo = parametrizacao[0].qtd_cpu_max;

  if (perigo < metricaCPU) {
    alertCpu.innerHTML = "Perigo";
    alertCpu.style.backgroundColor = "red";
  } else if (metricaCPU < alerta) {
    alertCpu.innerHTML = "Normal";
    alertCpu.style.backgroundColor = "green";
  }
  else{
    alertCpu.innerHTML = "Alerta";
    alertCpu.style.backgroundColor = "yellow";
  }
}

async function atualizarAlertaMemoria(metricaMemoria) {
  metricaMemoria= ((metricaMemoria[0].qtd_consumido / 1073741824) / Number(tamanhoRam.innerHTML.replace("GB", ""))) * 100;
  let parametrizacao = await obterParametrizacao();
  let alerta = Number(parametrizacao[0].qtd_memoria_max) * 0.75;
  let perigo = Number(parametrizacao[0].qtd_memoria_max);
  if (perigo < metricaMemoria) {
    console.log(metricaMemoria)
    alertRam.innerHTML = "Perigo";
    alertRam.style.backgroundColor = "red";
  } 
  
  else if (metricaMemoria< alerta) {
    alertRam.innerHTML = "Normal";
    alertRam.style.backgroundColor = "green";
  }
  else{
    alertRam.innerHTML = "Alerta";
    alertRam.style.backgroundColor = "yellow";
  }

}


async function atualizarAlertaDisco(metricaDisco) {
  let parametrizacao = await obterParametrizacao();
  metricaDisco = Math.floor((metricaDisco[0].qtd_disponivel / metricaDisco[0].qtd_maxima) * 100);
  let alerta = parametrizacao[0].qtd_disco_max * 0.75;
  let perigo = parametrizacao[0].qtd_disco_max;
  if (perigo < metricaDisco) {
    alertDisco.innerHTML = "Perigo";
    alertDisco.style.backgroundColor = "red";
    alertDisco.style.color = "white";
  } else if (metricaDisco < alerta) {
    alertDisco.innerHTML = "Normal";
    alertDisco.style.backgroundColor = "green";
    alertDisco.style.color = "white";
  }
  else{
    alertDisco.innerHTML = "Alerta";
    alertDisco.style.backgroundColor = "yellow";
  }
}



// CHAMANDO FUNÇÕES PARA SEREM EXECUTADAS - CHAMAR
coletarInfoComponente(["processador", "memoria", "rede", "disco"]);
buscarMetricaRede();
buscarMetricaComponente(["processador", "memoria"]);
inserirParametrizacao();