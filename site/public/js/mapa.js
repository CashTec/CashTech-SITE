// -----------------
let idEmpresa = sessionStorage.getItem("ID_EMPRESA");


let redMaker = L.icon({
  iconUrl: './img/danger.svg',
  iconSize: [60, 65],
  iconAnchor: [12, 41]
})


let yellowMaker = L.icon({
  iconUrl: './img/warn.svg',
  iconSize: [60, 65],
  iconAnchor: [12, 41]
})

let marcadores = [redMaker, yellowMaker];

let map = L.map("map-id").setView([-23.549201765276454, -46.664647698257816], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(map);

function mapa() {
  loadingGif.style.display = 'block';
  fetch(`/endereco/${idEmpresa}`).then((response) => {
    if (response.ok) {
      response.json().then((json) => {
        console.log("Enderecos");
        console.log(json);
        enderecos = json;

        if (json.enderecosInativos.length == 0 && json.enderecosAlerta.length == 0) {
          div_NotAlert.style.display = 'block';
        } else {
          contentAtm.style.display = 'block';
          if (json.enderecosInativos.length > 0) {

            json.enderecosInativos.forEach((endereco, i) => {
              const idAtm = endereco.idAtm;
              const nomeAtm = endereco.nomeAtm;

              const coordenadas = {
                lat: Number(endereco.latitude),
                lng: Number(endereco.longitude)
              }
              let customPoup;

              let marker = L.marker([coordenadas.lat, coordenadas.lng], { icon: marcadores[0] }).addTo(map);

              customPoup = `<img src='./img/danger-pop.svg' class="icone"><br><h2>ATM com funcionamento<br> fora do normal</h2> <button onclick='redirecionarAtm(${idAtm})' class="btn-pop">Ver mais informações</button>`;

              var customOptions =
              {
                'maxWidth': '500',
                'className': 'custom'
              }

              marker.bindPopup(customPoup, customOptions);

              div_alertaEndereco.innerHTML += `
              <div class="square">
                          <div class="content-status">
                              <div class="icon"><img src="img/danger-pop.svg" alt=""></div>
                              <div class="nome">${nomeAtm}</div>
                          </div>
                          <button class="btn" onclick="mostrarMapa([${coordenadas.lat}, ${coordenadas.lng}])">Ver no mapa</button>
                      </div>
              `

            })
          }

          if (json.enderecosAlerta.length > 0) {
            json.enderecosAlerta.forEach((endereco, i) => {
              const idAtm = endereco.idAtm;
              const nomeAtm = endereco.nomeAtm;

              const coordenadas = {
                lat: Number(endereco.latitude),
                lng: Number(endereco.longitude)
              }

              let customPoup

              let marker = L.marker([coordenadas.lat, coordenadas.lng], { icon: marcadores[1] }).addTo(map);

              customPoup = `<img src='./img/warn-pop.svg' class="icone"><br><h2>ATM com funcionamento<br> fora do normal</h2> <button onclick='redirecionarAtm(${idAtm})' class="btn-pop">Ver mais informações</button>`;

              var customOptions =
              {
                'maxWidth': '500',
                'className': 'custom'
              }

              marker.bindPopup(customPoup, customOptions);

              // Add marker

              div_alertaEndereco.innerHTML += `
            <div class="square">
                        <div class="content-status">
                            <div class="icon"><img src="img/warn.svg" alt=""></div>
                            <div class="nome">${nomeAtm}</div>
                        </div>
                        <button class="btn" onclick="mostrarMapa([${coordenadas.lat}, ${coordenadas.lng}])">Ver no mapa</button>
                    </div>
            `
            })
          }
        }
      })
    } else {
      console.log("Erro!");
    }
    loadingGif.style.display = 'none';
  }).catch((error) => {
    console.log(error);
    loadingGif.style.display = 'none';
  })

}

mapa();

function mostrarMapa(array) {
  map.setView(array, 13);
}

function redirecionarAtm(id) {
  sessionStorage.setItem("idAtm", id);
  window.location.href = "dashboard-atm.html"
}


const listCarrossel = document.querySelector(".content-atm .list");
const btn = document.querySelectorAll(".button-carrossel");



btn.forEach(element => {
  element.addEventListener("click", (e) => {
    console.log(e.target.getAttribute("data-info"))
    e.target.getAttribute("data-info") == "down" ? listCarrossel.scroll(listCarrossel.scrollLeft - 140, 0) : listCarrossel.scroll(listCarrossel.scrollLeft + 140, 0);
  })
})



































// const url = `https://nominatim.openstreetmap.org/search.php?q='${"Rua Trajano de Carvalho, 295, Brasilândia - São Paulo"}'&format=jsonv2`;
// fetch(url).then(response => response.json())
//   .then(data => {
//     console.log(data)

//     if (data.length > 0) {
//       const coordenadas = {
//         lat: Number(data[0].lat),
//         lng: Number(data[0].lon)
//       }

//       console.log("Coordenadas");
//       console.log(coordenadas);
//     };
//   }).catch((error) => {
//     console.log(error);
//   })
//   .catch((error) => {
//     console.log(error);
//   })