// NAVBAR
const hamburguerButton = document.querySelectorAll(".buttonHamburguer");
const menuHamburguer = document.querySelector("header>.container");
const navBar = document.querySelector("header");
hamburguerButton.forEach((element) => {
  element.addEventListener("click", () => {
    console.log(hamburguerButton);
    menuHamburguer.classList.toggle("active");
  });
});

window.addEventListener("scroll",()=>{
  navBar.classList.toggle("active",window.scrollY>10);
})

// CARROSSEL - CARDS
const cardsService =[];
let contadora = 0;
const containerCarrossel = document.querySelector(".services .container .content-card div");
let restoCards;


document.querySelectorAll(".card").forEach(element => {
  cardsService.push(element);
});



setInterval(()=>{

  containerCarrossel.scrollLeft+=cardsService[contadora].clientWidth+10;
  restoCards= cardsService[contadora].cloneNode(true)  ;
  containerCarrossel.appendChild(restoCards);

  
  if(contadora<cardsService.length-1){
    contadora++;
  }
  else{
    contadora=0;
  }

  
  
},1000);

