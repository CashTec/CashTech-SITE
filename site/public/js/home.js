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
