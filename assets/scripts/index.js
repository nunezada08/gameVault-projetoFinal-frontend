const APIAv = "http://localhost:3001/avaliacoes";
const APIJg = "http://localhost:3001/jogos";


const divAvaliacoes = document.getElementById("divAvaliacoes");

async function carregarAvaliacoes() {
    try {
        const resposta = await fetch(APIAv);
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
    return "⭐".repeat(estrelas) + "☆".repeat(5 - estrelas);
}








const carouselViewport = document.querySelector(".carousel-viewport");

let jogos = [];

async function carregarJogos() {
    try {
        const resposta = await fetch(APIJg);
        const dados = await resposta.json();

        // aceita array direto ou objeto { jogos: [...] }
        if (Array.isArray(dados)) {
            jogos = dados;
        } else if (Array.isArray(dados.jogos)) {
            jogos = dados.jogos;
        } else {
            jogos = [];
        }

        mostrarJogos(jogos.slice(0, 3));
        
    } catch (error) {

        console.error("Erro ao carregar jogos:", error)
        if (carouselViewport) carouselViewport.innerHTML = "<p>Erro ao carregar jogos.</p>";
    }
}

carregarJogos();

function mostrarJogos(lista) {
    if (!carouselViewport) return;
    carouselViewport.innerHTML = "";

    if (!Array.isArray(lista) || lista.length === 0) {
        carouselViewport.innerHTML = "<p>Nenhum jogo para mostrar.</p>";
        return;
    }

    let gamesContainer = carouselViewport.querySelector('.api-games');
    if (!gamesContainer) {
        gamesContainer = document.createElement('div');
        gamesContainer.className = 'api-games';
        carouselViewport.appendChild(gamesContainer);
    }

    gamesContainer.innerHTML = '';

    if (!Array.isArray(lista) || lista.length === 0) {
        gamesContainer.innerHTML = '<p>Nenhum jogo para mostrar.</p>';
        return;
    }


    const track = document.createElement('div');
    track.className = 'carousel-track';

    lista.forEach(jg => {
        const slideWrap = document.createElement('div');
        slideWrap.className = 'slide-cardDiv';

        slideWrap.innerHTML = `
            <figure class="slide-card">     
                <figcaption class="game-title">${jg.nome || "Jogo não informado"}</figcaption>
            </figure>
        `;

        track.appendChild(slideWrap);
    });

    gamesContainer.appendChild(track);
}


function mostrarDetalhes(jogos) {
    detalhes.innerHTML = `
        <h2>${jogos.nome}</h2>
        <p>Email: ${jogos.desenvolvedor}</p>
        <p>Telefone: ${jogos.genero}</p>
        <p>cidade: ${jogos.anoLancamento}</p>
        `

    slideWrap.style.display = "none";
    card.style.display = "none";

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

if (btnFrente) btnFrente.addEventListener("click", () => trocarImagem('frente'));
if (btnTras) btnTras.addEventListener("click", () => trocarImagem('tras'));





const btnTras2 = document.getElementById("btnTras2");
const btnFrente2 = document.getElementById("btnFrente2");
const track = document.querySelector(".carousel-viewport");




const visibleCount = 3;

let startIndex = 0;


function renderVisibleSlides() {
    if (!track) return;
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


if (btnFrente2) btnFrente2.addEventListener("click", nextSlide);
if (btnTras2) btnTras2.addEventListener("click", prevSlide);




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
    if (!trackGenero) return;
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




