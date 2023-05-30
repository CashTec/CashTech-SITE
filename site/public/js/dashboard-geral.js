const idEmpresa = sessionStorage.getItem("ID_EMPRESA");

const font = new FontFace(
  "Poppins",
  "url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600;700&display=swap)"
);

const graphicBola = document.getElementById("graphicBola");


// Define opções do gráfico de rosca
const config = {
  type: "doughnut",
  data: {
    labels: ["PERIGO", "ALERTA", "ATIVO"],
    datasets: [
      {
        label: "ATM",
        data: [12, 19, 3],
        borderWidth: [0],
        backgroundColor: ["#A20505", "#F1AC15", "#24C72E"]
      },
    ],
  },
  options: {
    radius: "90%",
    cutout: 90,
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


function verAtmAnormal() {
  list_atm.innerHTML =
    `
  <div class="loadingGif-list">
    <img src="img/loadingGifWhite.svg" alt="">
  </div>
  `;
  const data = new Date();
  let atms = []
  fetch(`/geral/verAtmAnormal/${idEmpresa}/${data}`)
    .then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          for (const atm of data) {
            let json = {
              id: 0,
              identificador: "",
              qtdMax: 0,
              metrica: []
            }
            for (const metrica of atm) {
              console.log(metrica);
              if (metrica.qtd_maxima != null) {
                json.qtdMax = metrica.qtd_maxima;
              }

              json.id = metrica.idAtm;
              json.identificador = metrica.identificador;
              json.metrica.push({
                consumo: metrica.qtd_consumido,
                tipo: metrica.tipo
              })
            }
            atms.push(json);
          }

          let atmsAnormais = "";

          for (const atm of atms) {
            console.log(atm);
            atmsAnormais +=
              `
            <div class="line">
            <div class="icon"><img src="img/Group.svg" alt=""></div>
            <div class="nome">${atm.identificador}</div>
            <div class="status"> ALERTA</div>
            <div class="indicators"> CPU - ${atm.metrica[1].tipo == "processador" ? atm.metrica[1].consumo.toFixed(0) : atm.metrica[0].consumo.toFixed(0)}%</div>
            <div class="indicators"> Memória - ${atm.metrica[0].tipo == "memoria" ? calcularPorcentagem(atm.qtdMax, atm.metrica[0].consumo) / (1024 * 1024) : calcularPorcentagem(atm.qtdMax, atm.metrica[1].consumo)}%</div>
            <button onclick='redirecionarAtm(${atm.id})'><img src="img/seta.svg" alt=""></button>
            </div>
            `
          }

          list_atm.innerHTML = atmsAnormais;
        })

      }
      else {
        console.log(res.status);
      }
    }).catch((err) => {
      console.log(err);
    });
}


function calcularPorcentagem(qtdMax, consumo) {
  console.log("Consumo: " + consumo);
  console.log("QtdMax: " + qtdMax);
  return ((consumo / qtdMax) * 100).toFixed(0);
}


function verQtdAtmInativos() {
  fetch(`/geral/qtdAtmInativo/${idEmpresa}`)
    .then((res) => {
      res.json().then((data) => {
        console.log(data);
        atms_inativos.innerHTML = data[0].qtdInativo;
      });
    }).catch((err) => {
      console.log(err);
    });
}

function verProcessoMaisEncerrado() {
  const data = new Date();
  fetch(`/geral/processoMaisEncerrado/${idEmpresa}/${data}`)
    .then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          console.log(data);
          processo_mais_encerrado.innerHTML = data[0].nome;
        });
      } else {
        console.log(res.status);
      }
    }).catch((err) => {
      console.log(err);
    });
}

function redirecionarAtm(id) {
  sessionStorage.setItem("idAtm", id);
  window.location.href = "dashboard-atm.html"
}


verQtdAtmInativos();
verProcessoMaisEncerrado();
verAtmAnormal();