copyBtn.addEventListener('click', () => {
    let div = document.querySelector(".copyedtext");

    navigator.clipboard.writeText(textCopy.innerText)
        .then(() => console.log("Texto copiado para a área de transferência"))
        .catch((err) => console.error("Erro ao copiar o texto: ", err));

    div.innerHTML = "Copiado!";
})