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



let contadora =2;

let validacao = true;

function scrollCarrossel(btn,containerCarrossel){
 
  if(validacao){
    btn.classList=="btn next"?containerCarrossel.scrollLeft+=document.querySelectorAll(".card")[0].clientWidth+10:containerCarrossel.scrollLeft-=document.querySelectorAll(".card")[0].clientWidth+10;
    validacao=false;

    setTimeout(()=>{
      validacao=true
    },500)
  }


}
CarroselColaborador.scrollLeft = 150;








  
  


