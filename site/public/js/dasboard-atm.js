const font = new FontFace(
  "Poppins",
  "url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600;700&display=swap)"
);



function passarTela() {

  window.scroll((window.scrollX >= window.innerWidth ? 0 : window.innerWidth), 0);
  console.log(window.innerWidth);
}
const divCardInfo = document.querySelectorAll(".card-info");
const btnInfo = document.querySelectorAll(".btn-info");
btnInfo.forEach((element, i) => {

  element.addEventListener("click", () => {
    divCardInfo[i].classList.toggle("active");
  })



})


// Função para passar para outra tela 
const btnBolinha = document.querySelectorAll(".content-btn button");
btnBolinha.forEach(element => {
  element.addEventListener("click", passarTela);
});
window.scroll(0, 0);


function coletarInfoComponente(componente) {
  componente.forEach(element => {
    fetch("componentes/infoComponente", {
        headers: {
          "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          idAtmServer: 1,
          componenteServer: element,
        })
      })
      .then(resposta => {
        if (resposta.status != 200) {
          throw "Erro"
        }
        resposta.json().then(json => {

          if (element == "memoria") {
            inserirInfoMemoria(json)
          } else if (element == "processador") {
            inserirInfoProcessador(json)
          } else if (element == "disco") {
            inserirInfoDisco(json)
          } else if (element == "rede") {
            inserirInfoRede(json);
          } else {
            console.log("Componente inválido")
          }

        })
      })
      .catch(erro => {
        console.log(erro)
      })
  })
}

let variavelAuxiliar;

function trocarInfoHd() {
  tamanhoHd.innerText = (variavelAuxiliar[sel_hd.value].qtd_maxima / 1073741824).toFixed(1) + "Gb";
  montagem.innerText = variavelAuxiliar[sel_hd.value].ponto_montagem;
  modeloHd.innerText = variavelAuxiliar[sel_hd.value].nome == "unknown" ? "--" : variavelAuxiliar[sel_hd.value].nome;
  disponivelHd.innerText = Math.floor((variavelAuxiliar[sel_hd.value].qtd_disponivel / variavelAuxiliar[sel_hd.value].qtd_maxima) * 100) + "%";
}


function inserirInfoProcessador(json) {
  modelo.innerText = json[0].nome;
  core.innerText = json[0].qtd_cpu_fisica;
  thread.innerText = " " + json[0].qtd_cpu_logica;
  frequencia.innerText = " " + json[0].frequencia.toString().slice(0, 2).split("").join(".") + "Ghz";
}

function inserirInfoDisco(json) {
  variavelAuxiliar = json;
  tamanhoHd.innerText = (json[0].qtd_maxima / 1073741824).toFixed(1) + "GB";
  montagem.innerText = json[0].ponto_montagem;
  modeloHd.innerText = json[0].nome;
  disponivelHd.innerText = (Math.floor((json[0].qtd_disponivel / json[0].qtd_maxima) * 100)) + "%";

  for (let i = 0; i < json.length; i++) {
    sel_hd.innerHTML += `<option value="${i}">HD${i}</option>`
  }
}

function inserirInfoMemoria(json) {
  tamanhoRam.innerText = (json[0].qtd_maxima / 1073741824).toFixed(1) + "GB";
}

function inserirInfoRede(json) {
  macRede.innerText = `${json[0].mac}`
  nomeRede.innerText = `${json[0].nome}`
  ipRede.innerText = `${json[0].ipv4}`
}


function buscarMetricaComponente() {

  const requisicaoProcessador = fetch(`/metricas/metricaComponente/1`)
  const requisicaoMemoria = fetch(`/metricas/metricaComponente/1`)

  Promise.all(requisicaoMemoria, requisicaoProcessador)
    .then(resposta => resposta.json())
    .then(json => {
      if (json.tipo == "processador") {
        atualizarMetricaProcessador(json);
      } else {
        atualizarMetricaMemoria(json);
      }
      setTimeout(() => {
        buscarMetricaComponente();
      })

    })
}


function buscarMetricaRede() {
  fetch(`/metricas/metricaRede/2`, {
    headers: {
      'Content-type': 'application/json'
    },
    method: "GET",
  }).
  then(resposta => resposta.json())
    .then(json => {
      atualizarMetricaRede(json);
      setTimeout(() => {
        buscarMetricaRede()
      }, 1000);
    }).catch((erro) => {
      console.error(erro);
    })

}



const config = {
  type: "doughnut",
  data: {
    labels: ["PERIGO", "ALERTA"],
    datasets: [{
      label: "ATM",
      data: [12, 19],
      borderWidth: [0],
      backgroundColor: ["#6C0D0D", "#BD8800"]
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
const graphicBola = document.getElementById("graphicBola");
const graficoBoll = new Chart(graphicBola, config)

let graficoRede = {
  type: "line",
  data: {
    labels: [],
    datasets: [{
        label: "Megabytes Enviados",
        data: [],
        borderWidth: 3,
        borderColor:"#2D7DB3"

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
let grafico3 = new Chart(graphicLine3, graficoRede);





// let grafico = {
//   type: "line",
//   data: {
//     labels: [],
//     datasets: [{
//         label: "Consumo médio dos ATMS",
//         data: [],
//         borderWidth: 3,
//         borderColor: "#017529"

//       },
//       {
//         label: "Consumo médio dos ATMS",
//         data: [],
//         borderWidth: 3,
//         borderColor: "#A41B1B"
//       },
//     ],
//   },
//   options: {
//     plugins: {
//       legend: {
//         display: false
//       },
//     },


//     scales: {

//       y: {

//         beginAtZero: true,
//         border: {
//           color: " #222",
//         },
//         fonts: {
//           color: " #222",
//         },

//         ticks: {
//           color: " #222",
//           backgroundColor: "#222",
//         },

//         grid: {
//           color: "#222",
//           display: false,
//         },
//       },
//       x: {
//         border: {
//           color: " #222",
//         },
//         ticks: {
//           color: " #222",
//           weight: "700",
//           family: "Poppins",
//         },
//         grid: {
//           display: false,
//         },
//       },
//     },
//     elements: {
//       line: {
//         tension: 0.4,
//         backgroundColor: "#222",
//         borderColor: "#222",
//         spanGaps: true,
//       },
//     },
//     animation: {
//       duration: 800,
//     },
//   },
// }




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

let grafico1 = new Chart(graphicLine1, graficoProcessador);

// Função que atualiza os dados do gráfico de linha
let jsonAntigo = []
let verificadorCount = 0;

const verificador = (json, copia) => {
  JSON.stringify(copia) == JSON.stringify(json) ? verificadorCount++ : verificadorCount = 0
}


function atualizarMetricaProcessador(json) {
  atualizarData(json,graficoProcessador,"processador",grafico1);
}


function atualizarMetricaMemoria(json) {

}



function atualizarMetricaRede(json) {
  verificador(json, jsonAntigo)
  let containerAviso = document.querySelectorAll(".aviso")[0];
  if (verificadorCount < 10) {
    jsonAntigo = json;
    atualizarData(json, graficoRede, "rede", grafico3);
    jsonAntigo = json;
    containerAviso.classList.remove("active")
  } else {
    containerAviso.classList.add("active")
  }

}



function atualizarData(json, dadosGrafico, tipo, grafico) {

  const dateTimeFormatado = json[0].dt_metrica.slice(11, 19);

  let primeiroDado
  let segundoDado;
  switch (tipo) {
    case "rede":
      primeiroDado = json[0].bytes_recebidos_segundo/(1024*1024);
      segundoDado = json[0].bytes_enviados_segundo/ (1024*1024);
    }

    console.log(primeiroDado);
    console.log(segundoDado);
  

  if (dadosGrafico.data.datasets[0].data.length < 6) {
    dadosGrafico.data.datasets[0].data.push(primeiroDado);
    if (tipo == "rede") {
      dadosGrafico.data.datasets[1].data.push(segundoDado);
    }
    dadosGrafico.data.labels.push(dateTimeFormatado);
    return
  }



  dadosGrafico.data.datasets[0].data.shift()
  dadosGrafico.data.datasets[0].data.push(primeiroDado);

  if (tipo == "rede") {
    dadosGrafico.data.datasets[1].data.shift();
    dadosGrafico.data.datasets[1].data.push(segundoDado);
  }

  dadosGrafico.data.labels.shift();
  dadosGrafico.data.labels.push(dateTimeFormatado);

  grafico.update();
}




coletarInfoComponente(["processador", "disco", "memoria", "rede"]);
buscarMetricaRede();