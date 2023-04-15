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
          backgroundColor:["#6C0D0D","#BD8800"]
        },
      ],
    },
    options: {
      radius:"60%",
      cutout:60,
      elements: {
        arc: {
          borderRadius: 90,
          spacing: 10,
        },
      },
      plugins: {
        legend: {
        display:false
        },
      },
    },
  };

  const graphicBola = document.getElementById("graphicBola");
  const myChart = new Chart(graphicBola, config);

  const graphicBola2 = document.getElementById("graphicBola2");
  const myChart1 = new Chart(graphicBola2, config);

  const graphicBola3 = document.getElementById("graphicBola3");
  const myChart2 = new Chart(graphicBola3, config);


  const graphicBola5 = document.getElementById("graphicBola5");
  const myChart5 = new Chart(graphicBola5, config);
  const graphicLine = document.getElementById("graphicLine");
  const grafico = new Chart(graphicLine, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Consumo médio dos ATMS",
          data: [],
          borderWidth: 3,
          borderColor:"#017529"

        },
        {
          label: "Consumo médio dos ATMS",
          data: [],
          borderWidth: 3,
          borderColor:"#A41B1B"
        },
      ],
    },
    options: {
      plugins: {
        legend: {
         display:false
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

  // Função que atualiza os dados do gráfico de linha
function atualizarData() {
  let sortear = Math.floor(1+Math.random() * 10);
  let sortear2 = Math.floor(1+Math.random() * 10); // dados mockados
  let criarData = new Date(); // dados mockados
  if (grafico.data.labels.length > 4) {
    grafico.data.datasets[0].data.shift();
    grafico.data.datasets[1].data.shift();
    grafico.data.labels.shift();
  }

  grafico.data.datasets[0].data.push(sortear);
  grafico.data.datasets[1].data.push(sortear2);
  grafico.data.labels.push(criarData.getSeconds());
  grafico.update();

  setTimeout(atualizarData, 1000);
}

// Inicia a atualização dos dados do gráfico de linha
atualizarData();

