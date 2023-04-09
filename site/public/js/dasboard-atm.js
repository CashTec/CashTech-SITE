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

