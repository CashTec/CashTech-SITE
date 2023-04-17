const font = new FontFace(
  "Poppins",
  "url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600;700&display=swap)"
);

const graphicLine = document.getElementById("graphicLine");
const graphicBola = document.getElementById("graphicBola");

// Define opções do gráfico de linha
const grafico = new Chart(graphicLine, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Consumo médio dos ATMS",
        data: [],
        borderWidth: 5,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        }
      },
    },
    scales: {
      
      y: {
        
        beginAtZero: true,
        border:{
          color: " #fff",
        },
        fonts:{
          color: " #fff",
        },
        
        ticks: {
          color: " #fff",
          backgroundColor: "rgba(255,255,255,1)",
        },
        
        grid: {
          color: "rgba(255,255,255,0.4)",
          display: false,
        },
      },
      x: {
        border:{
          color: " #fff",
        },
        ticks: {
          color: " #fff",
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
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(255,255,255,1)",
        spanGaps: true,
      },
    },
    animation: {
      duration: 800,
    },
  },
});

// Define opções do gráfico de rosca
const config = {
  type: "doughnut",
  data: {
    labels: ["PERIGO", "ALERTA", "INATIVO"],
    datasets: [
      {
        label: "ATM",
        data: [12, 19, 3],
        borderWidth: [0],
      },
    ],
  },
  options: {
    radius:"90%",
    cutout:  90,
    elements: {
      arc: {
        borderRadius: 90,
        spacing: 10,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 30,
          color: "#fff",
          font: {
            size: 12,
            family: "Poppins",
            weight: "700",
          },
        },
      },
    },
  },
};

const myChart = new Chart(graphicBola, config);

// Função que atualiza os dados do gráfico de linha
function atualizarData() {
  let sortear = Math.floor(30 + Math.random() * 39); // dados mockados
  let criarData = new Date(); // dados mockados
  if (grafico.data.labels.length > 4) {
    grafico.data.datasets[0].data.shift();
    grafico.data.labels.shift();
  }

  grafico.data.datasets[0].data.push(sortear);
  grafico.data.labels.push(criarData.getSeconds());
  grafico.update();

  setTimeout(atualizarData, 1000);
}

// Inicia a atualização dos dados do gráfico de linha
atualizarData();
