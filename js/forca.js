//Array de palavras
const palavras = ["batata","abacaxi", "banana", "amendoim", "tomate", "sorvete"]

//Palavra secreta para conseguir um valor mx e um min
const palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)]

const letrasErradas = []
const letrasCertas = []
atualizarJogo()
//Evento principal para verificar as letras
document.addEventListener("keydown", (evento) => {
    const codigo = evento.keyCode; //Verifica se foi digitado uma letra e não um número (intervalo de 65-90)
    //Foi digitado uma letra?
    if(isLetra(codigo)){
        const letra = evento.key
        //Letra errada ja foi digitada?
        if(letrasErradas.includes(letra)){
            mostrarAvisoLetraRepetida();
        }else{
            //Letra faz parte da palavra
            if(palavraSecreta.includes(letra)){
                letrasCertas.push(letra)
            } else{
                letrasErradas.push(letra)
            }
        }
        atualizarJogo()
    }
})


//Funções
function atualizarJogo(){
    mostrarLetrasErradas()
    mostrarLetrasCertas()
    desenharForca()
    checarJogo()
}

function mostrarLetrasErradas(){
    const div = document.querySelector(".letras-erradas-container")
    div.innerHTML = "<h3>Letras erradas</h3>"
    letrasErradas.forEach((letra) =>{
        div.innerHTML += `<span>${letra}</span>`
    })
}

function mostrarLetrasCertas(){
    const container = document.querySelector(".palavra-secreta-container")
    container.innerHTML = ""
    palavraSecreta.split("").forEach((letra) =>{
        if(letrasCertas.includes(letra)){
            container.innerHTML += `<span>${letra}</span>`
        }else{
            container.innerHTML += `<span>_</span>`
        }
    })
}

function checarJogo(){
    let mensagem = "";
    const container = document.querySelector(".palavra-secreta-container")
    const partesCorpo = document.querySelectorAll(".forca-parte")

    if(letrasErradas.length === partesCorpo.length) {
        mensagem = "Fim de jogo! Você perdeu!"
    }

    if (palavraSecreta === container.innerText) {
        mensagem = "Parabéns! Você ganhou o jogo!"
    }

    if(mensagem){
        document.querySelector("#msg").innerHTML = mensagem
        document.querySelector(".popup-container").style.display = "flex"
    }
}

function desenharForca(){
    const partesCorpo = document.querySelectorAll(".forca-parte")
    for(let i = 0; i < letrasErradas.length; i++){
        partesCorpo[i].style.display = "block"
    }
}

function mostrarAvisoLetraRepetida(){
    const aviso = document.querySelector(".aviso-palavra-repetida")
    aviso.classList.add("show")
    setTimeout(() => {
        aviso.classList.remove("show")
    }, 1500);
}

function isLetra(codigo){
    return codigo >= 65 && codigo <= 90
}

function reiniciarJogo(){
    window.location.reload()
}