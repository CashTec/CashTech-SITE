
const font = new FontFace(
  "Poppins",
  "url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600;700&display=swap)"
);


const config = {
  type: "doughnut",
  data: {
    labels: ["PERIGO", "ALERTA"],
    datasets: [
      {
        label: "ATM",
        data: [12, 19],
        borderWidth: [0],
        backgroundColor: ["#6C0D0D", "#BD8800"]
      },
    ],
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


const graphicLine = document.getElementById("graphicLine");

const graphicLine2 = document.getElementById("graphicLine2");

const graphicLine3 = document.getElementById("graphicLine3");

const graphicLine4 = document.getElementById("graphicLine4");




let grafico = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
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


let grafico1 = new Chart(graphicLine, grafico);
let grafico2 = new Chart(graphicLine3, grafico);
let grafico3 = new Chart(graphicLine2, grafico);

// Função que atualiza os dados do gráfico de linha
function atualizarData() {
  let sortear = Math.floor(1 + Math.random() * 10);
  let sortear2 = Math.floor(1 + Math.random() * 10); // dados mockados
  let criarData = new Date(); // dados mockados
  if (grafico.data.labels.length > 4) {
    grafico.data.datasets[0].data.shift();
    grafico.data.datasets[1].data.shift();
    grafico.data.labels.shift();
  }

  grafico.data.datasets[0].data.push(sortear);
  grafico.data.datasets[1].data.push(sortear2);
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
