const imagem = document.getElementById("imagem");
const btnTras = document.getElementById("btnTras");
const btnFrente = document.getElementById("btnFrente");


const imagens = [
    "./assets/images/cod.jpg",
    "./assets/images/snoopy.png",
    "./assets/images/nba2k.jpeg",
    "./assets/images/silksong.jpg",
];

let imagemAtual = 0;
let isAnimating = false;

function trocarImagem(direcao) {
    if (isAnimating) return;
    if (direcao === 'frente') {
        imagemAtual = (imagemAtual + 1) % imagens.length;
    } else {
        imagemAtual = (imagemAtual - 1 + imagens.length) % imagens.length;
    }
    fadeToImage(imagens[imagemAtual]);
}

function fadeToImage(novaSrc) {
    isAnimating = true;
    imagem.style.opacity = 0;
    setTimeout(() => {
        imagem.src = novaSrc;
        imagem.onload = () => {
            setTimeout(() => {
                imagem.style.opacity = 1;
                setTimeout(() => { isAnimating = false; }, 250);
            }, 20);
        };
    }, 250);
}

btnFrente.addEventListener("click", () => trocarImagem('frente'));
btnTras.addEventListener("click", () => trocarImagem('tras'));


// Código para o segundo carrossel (Melhores Avaliados)


const btnTras2 = document.getElementById("btnTras2");
const btnFrente2 = document.getElementById("btnFrente2");
const track = document.querySelector(".carousel-track");

// Lista completa de imagens que podem aparecer no carrossel
const allImages2 = [
    "./assets/images/ghost.png",
    "./assets/images/tlou.png",
    "./assets/images/godOfWar.png",
    "./assets/images/zelda.png",
    "./assets/images/ocarina.png",
    "./assets/images/majoras.png",
    "./assets/images/rdr.png",
    "./assets/images/eldenRing.png",
    "./assets/images/gta5.png",
     // adicione mais caminhos conforme precisar
];

// Quantas imagens o carrossel mostra ao mesmo tempo (igual ao número inicial de .slide no HTML)
const visibleCount = 3;

let startIndex = 0; // índice da primeira imagem atualmente mostrada

// renderiza as imagens visíveis no track (substitui o conteúdo atual)
function renderVisibleSlides() {
    track.innerHTML = "";
    for (let i = 0; i < visibleCount; i++) {
        const idx = (startIndex + i) % allImages2.length;
        const img = document.createElement("img");
        img.className = "slide";
        img.src = allImages2[idx];
        img.alt = `jogo-${idx}`;
        track.appendChild(img);
    }
}

// Avança uma imagem: remove a primeira e adiciona a próxima no final
function nextSlide() {
    startIndex = (startIndex + 1) % allImages2.length;
    renderVisibleSlides();
}

// Volta uma imagem: move o índice para trás e renderiza
function prevSlide() {
    startIndex = (startIndex - 1 + allImages2.length) % allImages2.length;
    renderVisibleSlides();
}

// iniciar o carrossel com as imagens iniciais
window.addEventListener("load", () => {
    renderVisibleSlides();
});

// eventos de clique
btnFrente2.addEventListener("click", nextSlide);
btnTras2.addEventListener("click", prevSlide);

// ...existing code...