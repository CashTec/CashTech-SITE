function mapa() {
    enderecos.forEach((endereco, i) => {
      const url = `https://nominatim.openstreetmap.org/search.php?q='${endereco}'&format=jsonv2`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data)
  
          if (data.length > 0) {
            const coordenadas = {
              lat: Number(data[0].lat),
              lng: Number(data[0].lon)
            };
  
  
  
            sortear = parseInt(Math.random() * 2);
  
  
            console.log(sortear)
            let customPoup
  
            let marker = L.marker([coordenadas.lat, coordenadas.lng], { icon: marcadores[sortear] }).addTo(map);
            if (sortear == 0) {
              customPoup = `<img src='./img/danger-pop.svg' class="icone"><br><h2>ATM com funcionamento<br> fora do normal</h2> <button onclick='redirecionarAtm()' class="btn-pop">Ver mais informações</button>`;
            }
            else {
              customPoup = `<img src='./img/warn-pop.svg' class="icone"><br><h2>ATM com funcionamento<br> fora do normal</h2> <button onclick='redirecionarAtm(1)' class="btn-pop">Ver mais informações</button>`;
            }
  
  
  
            var customOptions =
            {
              'maxWidth': '500',
              'className': 'custom'
            }
            marker.bindPopup(customPoup, customOptions);
          }
        })
        .catch(error => console.log(error));
    });
  
  }
  mapa();
  
  function mostrarMapa(array) {
    map.setView(array, 13);
  }
  
  function redirecionarAtm(id) {
    sessionStorage.setItem("id", id);
    window.location.pathname = "dashboard-atm.html"
  }
  
  
  const listCarrossel = document.querySelector(".content-atm .list");
  const btn = document.querySelectorAll(".button-carrossel");
  
  
  
  btn.forEach(element => {
    element.addEventListener("click", (e) => {
      console.log(e.target.getAttribute("data-info"))
      e.target.getAttribute("data-info") == "down" ? listCarrossel.scroll(listCarrossel.scrollLeft - 140, 0) : listCarrossel.scroll(listCarrossel.scrollLeft + 140, 0);
    })
  })