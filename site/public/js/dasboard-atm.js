const font = new FontFace(
  "Poppins",
  "url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600;700&display=swap)"
);


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





let grafico = {
  type: "line",
  data: {
    labels: [],
    datasets: [{
        label: "Consumo médio dos ATMS",
        data: [],
        borderWidth: 3,
        borderColor: "#017529"

      },
      {
        label: "Consumo médio dos ATMS",
        data: [],
        borderWidth: 3,
        borderColor: "#A41B1B"
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

let graficoLine = {
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


let grafico1 = new Chart(graphicLine1, graficoLine);
let grafico2 = new Chart(graphicLine2, graficoLine);
let grafico3 = new Chart(graphicLine3, grafico);

// Função que atualiza os dados do gráfico de linha
function atualizarData() {
  let sortear = Math.floor(1 + Math.random() * 10);
  let sortear2 = Math.floor(1 + Math.random() * 10); // dados mockados
  let criarData = new Date(); // dados mockados
  if (grafico.data.labels.length > 4) {
    graficoLine.data.datasets[0].data.shift();
    grafico.data.datasets[0].data.shift();
    grafico.data.datasets[1].data.shift();
    grafico.data.labels.shift();
    graficoLine.data.labels.shift();
  }
  if (graficoLine.data.labels.length > 4) {
    graficoLine.data.datasets[0].data.shift();
  }


  graficoLine.data.datasets[0].data.push(sortear);

  grafico.data.datasets[0].data.push(sortear);
  grafico.data.datasets[1].data.push(sortear2);

  graficoLine.data.labels.push(criarData.getSeconds());
  grafico.data.labels.push(criarData.getSeconds());

  grafico1.update();
  grafico2.update();
  grafico3.update();


  setTimeout(atualizarData, 1000);
}

// Inicia a atualização dos dados do gráfico de linha
atualizarData();


//FUNÇÃO PARA VER INFORMAÇÕES DO HARDWARE

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
  componente.forEach(element=>{
   fetch("compontentes/infoComponente", {
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
        console.log("foi")
        throw "Erro"
      }
      resposta.json().then(json => {

        if(element=="memoria"){
          inserirInfoMemoria(json)
        }

        else if(element=="processador"){
          inserirInfoProcessador(json)
        }

        else if(element=="disco"){
          inserirInfoDisco(json)
        }
        else{
          console.log("Componente não valido")
        }
        
      })
    })

    .catch(erro => {
      console.log(erro)
    })
  })
}

let variavelAuxiliar;

function trocarInfoHd(){

  tamanhoHd.innerText= (variavelAuxiliar[sel_hd.value].qtd_maxima/1073741824 ).toFixed(1)+"Gb";
  montagem.innerText= variavelAuxiliar[sel_hd.value].ponto_montagem;
  modeloHd.innerText=  variavelAuxiliar[sel_hd.value].nome == "unknown" ? "--" :variavelAuxiliar[sel_hd.value].nome ;
  disponivelHd.innerText=Math.floor((variavelAuxiliar[sel_hd.value].qtd_disponivel/variavelAuxiliar[sel_hd.value].qtd_maxima)*100)+"%";
}



function inserirInfoProcessador(json){
modelo.innerText=json[0].nome;
core.innerText=json[0].qtd_cpu_fisica;
thread.innerText=" "+json[0].qtd_cpu_logica;
frequencia.innerText=" "+json[0].frequencia.toString().slice(0,2).split("").join(".")+"Ghz";
}
function inserirInfoDisco(json){
  variavelAuxiliar=json;
  tamanhoHd.innerText= (json[0].qtd_maxima/1073741824).toFixed(1)+"GB";
  montagem.innerText= json[0].ponto_montagem;
  modeloHd.innerText= json[0].nome;
  disponivelHd.innerText=(Math.floor((json[0].qtd_disponivel/json[0].qtd_maxima)*100))+"%";

  for(let i =0; i < json.length;i++){
    sel_hd.innerHTML+=`<option value="${i}">HD${i}</option>`
  }
}

function inserirInfoMemoria(json){
  tamanhoRam.innerText= (json[0].qtd_maxima/1073741824).toFixed(1)+"GB";
}


coletarInfoComponente(["processador","disco","memoria"])