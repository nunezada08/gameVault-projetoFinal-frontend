const API = "http://localhost:3001/avaliacoes";

const divAvaliacoes = document.getElementById("divAvaliacoes");

async function carregarAvaliacoes() {
    try {
        const resposta = await fetch(API);
        const dados = await resposta.json();

        const avaliacoes = dados.avaliacoes;

        mostrarAvaliacoes(avaliacoes.slice(0, 3));

    } catch (error) {
        console.error("Erro ao carregar avaliações:", error);
        divAvaliacoes.innerHTML = "<p>Erro ao carregar avaliações.</p>";
    }
}

carregarAvaliacoes();

function mostrarAvaliacoes(lista) {
    divAvaliacoes.innerHTML = "";

    lista.forEach(av => {
        const card = document.createElement("section");
        card.className = "avalicao-user";

        card.innerHTML = `
            <div class="quaseHeader">
                <div class="nomeJogo">
                    <img src="./assets/images/perfilFoto.png" alt="Perfil" width="40px">
                    <div>
                        <div class="nomeUser">${av.usuario}</div>
                        <p>${av.jogo || "Jogo não informado"}</p>
                    </div>
                </div>

                <div class="estrelasAvaliacao">
                    ${gerarEstrelas(av.nota)}
                </div>
            </div>

            <div class="comentario">
                ${av.comentario}
            </div>

            <div class="likeDeslike">
                <img src="./assets/images/deslike.png" alt="deslike" width="20px">
                <img src="./assets/images/like.png" alt="like" width="20px">
            </div>
        `;

        divAvaliacoes.appendChild(card);
    });
}

function gerarEstrelas(nota) {
    const estrelas = Math.round(nota / 2);
    return "⭐".repeat(estrelas) + "".repeat(5 - estrelas);
}





































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





const btnTras2 = document.getElementById("btnTras2");
const btnFrente2 = document.getElementById("btnFrente2");
const track = document.querySelector(".carousel-track");


const allImages2 = [
    "../assets/images/ghost.png",
    "../assets/images/tlou.png",
    "../assets/images/godOfWar.png",
    "../assets/images/zelda.png",
    "../assets/images/ocarina.png",
    "../assets/images/majoras.png",
    "../assets/images/rdr.png",
    "../assets/images/eldenRing.png",
    "../assets/images/gta5.png",
    "../assets/images/spiderman.png",
    "../assets/images/gears.png",
    "../assets/images/cyberpunk.png"
    
];


const visibleCount = 3;

let startIndex = 0;


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


function nextSlide() {
    startIndex = (startIndex + 1) % allImages2.length;
    renderVisibleSlides();
}


function prevSlide() {
    startIndex = (startIndex - 1 + allImages2.length) % allImages2.length;
    renderVisibleSlides();
}

window.addEventListener("load", () => {
    renderVisibleSlides();
});


btnFrente2.addEventListener("click", nextSlide);
btnTras2.addEventListener("click", prevSlide);




const btnTras3 = document.getElementById("btnTras3");
const btnFrente3 = document.getElementById("btnFrente3");
const trackGenero = document.querySelector(".carousel-track2");


const generoImages = [
    "./assets/images/acao.png",
    "./assets/images/soulslike.png",
    "./assets/images/terror.png",
    "./assets/images/fps.png",
    "./assets/images/rpg.png",
    "./assets/images/aventura.png",
    "./assets/images/realidadeVirtual.png",
    "./assets/images/mapaAberto.png",
    "./assets/images/luta.png",
    "./assets/images/indie.png",
];

let generoStart = 0;
let generoVisible = calculateGeneroVisible();

function calculateGeneroVisible() {
    const w = window.innerWidth;
    
    if (w >= 1400) return 5;
    if (w >= 1200) return 4;
    if (w >= 900) return 3;
    if (w >= 600) return 2;
    return 1;
}

function renderGeneroSlides() {
    generoVisible = calculateGeneroVisible();
    trackGenero.innerHTML = "";
    for (let i = 0; i < generoVisible; i++) {
        const idx = (generoStart + i) % generoImages.length;
        const img = document.createElement("img");
        img.className = "slideGenero";
        img.src = generoImages[idx];
        img.alt = `genero-${idx}`;
        trackGenero.appendChild(img);
    }
}

function nextGenero() {
    generoStart = (generoStart + 1) % generoImages.length;
    renderGeneroSlides();
}

function prevGenero() {
    generoStart = (generoStart - 1 + generoImages.length) % generoImages.length;
    renderGeneroSlides();
}


window.addEventListener("load", () => {
    renderGeneroSlides();
});
window.addEventListener("resize", () => {
   
    renderGeneroSlides();
});

btnFrente3.addEventListener("click", nextGenero);
btnTras3.addEventListener("click", prevGenero);




