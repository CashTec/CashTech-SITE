const graphicLine = document.getElementById("graphicLine");

new Chart(graphicLine, {
  type: "line",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

let data = [12, 19, 3, 5, 2, 3];

const graphicBola = document.getElementById("graphicBola");
const config = {
  type: "doughnut",
  data: {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        position: "bottom", 
        labels:{
          usePointStyle: true,
          padding:30,
          color:"#222"
          }
        },
        
      },
    },
  }

new Chart(graphicBola, config);
