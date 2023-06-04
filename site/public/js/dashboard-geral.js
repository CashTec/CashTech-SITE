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
    labels: ["PERIGO", "ALERTA", "ATIVO", "INATIVO"],
    datasets: [
      {
        label: "Quantidade",
        data: [0, 0, 0, 0],
        borderWidth: [0],
        backgroundColor: ["#b60000", "#F1AC15", "#00FFF0", "#8f8f8f"]
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
          console.log(data);
          if (data.length > 0) {
            for (const atm of data) {
              atms.push(atm);
            }

            let atmsAnormais = "";

            for (const atm of atms) {
              let tipoAlerta = "";
              let isInativo = false;

              if (atm.tipoAlerta == "anormal") {
                tipoAlerta = "ALERTA";
                
              } else if (atm.tipoAlerta == "perigo") {
                tipoAlerta = "<span style='color: red'>PERIGO!</span>";
              } else {
                tipoAlerta = "<span style='color: gray'>ATENÇÃO! ESSE ATM ESTÁ INATIVO!</span>";
                isInativo = true;
              }

              let metricaMemoria = "";
              let metricaCpu = "";

              if (!isInativo) {
                for (const metrica of atm.metricas) {
                  if (metrica.tipo == "memoria") {
                    metricaMemoria = `Memória - ${calcularPorcentagem(metrica.qtd_maxima, metrica.qtd_consumido)}%`;
                  } else if (metrica.tipo == "processador") {
                    metricaCpu = `CPU - ${metrica.qtd_consumido.toFixed(0)}%`;
                  }
                }
              }
              atmsAnormais +=
                `
              <div class="line">
              <div class="icon"><img src="img/Group.svg" alt=""></div>
              <div class="nome">${atm.identificador}</div>
              <div class="status">${tipoAlerta}</div>
              <div class="indicators">${metricaMemoria}</div>
              <div class="indicators">${metricaCpu}</div>
              <button onclick='redirecionarAtm(${atm.idAtm})'><img src="img/seta.svg" alt=""></button>
              </div>
              `
            }

            list_atm.innerHTML = atmsAnormais;
          } else {
            list_atm.innerHTML = "<span class='spn_naoEncontrado'>Nenhum ATM encontrado, tudo certo! </span>";
          }
        })

      }
      else {
        list_atm.innerHTML = "<span class='spn_naoEncontrado' style='color: red'>Nenhum ATM encontrado, Erro! </span>";
      }
    }).catch((err) => {
      list_atm.innerHTML = "<span class='spn_naoEncontrado' style='color: red'>Nenhum ATM encontrado, erro na requisição! </span>";
      console.log(err);
    });
}


function calcularPorcentagem(qtdMax, consumo) {
  return ((consumo / qtdMax) * 100).toFixed(0);
}


function verQtdAtmInativos() {
  fetch(`/geral/qtdAtmInativo/${idEmpresa}`)
    .then((res) => {
      res.json().then((data) => {
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
          processo_mais_encerrado.innerHTML = data[0].nome;
        });
      } else {
        console.log(res.status);
      }
    }).catch((err) => {
      console.log(err);
    });
}

function verCidadeMaisInativo() {
  fetch(`/geral/verCidadeMaisInativo/${idEmpresa}`)
    .then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          cidade_mais_inativa.innerHTML = data[0].cidade;
        });
      } else {
        cidade_mais_inativa.innerHTML = "Nenhuma cidade encontrada";
      }
    }).catch((err) => {
      cidade_mais_inativa.innerHTML = "Nenhuma cidade encontrada";
      console.log(err);
    });
}

function redirecionarAtm(id) {
  sessionStorage.setItem("idAtm", id);
  window.location.href = "dashboard-atm.html"
}

function verStatusAtm() {
  fetch(`/geral/statusAtms/${idEmpresa}`)
    .then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          div_status.innerHTML =
            `
          <h3 id="h3_qtdAtm">...</h3>
          <p>TOTAL ATMS</p>

          `;
          const qtdAtm = data.qtdAtm;
          const qtdInativo = data.qtdInativo;
          const qtdAlerta = data.qtdAlerta;
          const qtdPerigo = data.qtdPerigo;
          let qtdAtivo = data.qtdAtm - data.qtdInativo - data.qtdAlerta - data.qtdPerigo;
          qtdAtivo = qtdAtivo < 0 ? 0 : qtdAtivo;

          h3_qtdAtm.innerHTML = qtdAtm;



          myChart.data.datasets[0].data = [qtdPerigo, qtdAlerta, qtdAtivo, qtdInativo];
          myChart.update();

        });
      } else {
        console.log(res.status);
      }
    }).catch((err) => {
      console.log(err);
    });
}

verCidadeMaisInativo();
verQtdAtmInativos();
verProcessoMaisEncerrado();
verAtmAnormal();
verStatusAtm();