const APIAv = "http://localhost:3001/avaliacoes";
const APIJg = "http://localhost:3001/jogos";

const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");

btnBuscar.onclick = () => {
    const termo = (inputBuscar.value || '').trim().toLowerCase();
    if (!termo) return; // não faz nada se vazio

    const filtrados = jogos.filter((u) => u.nome && u.nome.toLowerCase().includes(termo));

    if (filtrados.length === 0) {
        alert('Jogo não encontrado.');
        return;
    }

    // tenta correspondência exata primeiro, senão pega o primeiro resultado
    const exact = filtrados.find(f => f.nome.toLowerCase() === termo);
    const escolhido = exact || filtrados[0];

    mostrarDetalhes(escolhido);
}


let divAvaliacoes = document.getElementById("divAvaliacoes");

async function carregarAvaliacoes() {
    try {
        const resposta = await fetch(APIAv);
        const dados = await resposta.json();

        const avaliacoes = dados.avaliacoes;

        mostrarAvaliacoes(avaliacoes.slice(1, 4));

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
                        <div class="nomeUser">${av.usuario && av.usuario.nome ? av.usuario.nome : 'Usuário'}</div>
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

        mostrarJogos(jogos.slice(90, 93));
    
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
            <div class="slide-card">
                <img src="${jg.imagens}" alt="${jg.nome || "Jogo"}" class="slide-image">
                <figcaption class="game-title">${jg.nome || "Jogo não informado"}</figcaption>
            </div>
        `;

        track.appendChild(slideWrap);

        // adiciona listener para mostrar detalhes quando o título for clicado
        const titleEl = slideWrap.querySelector('.game-title');
        if (titleEl) {
            titleEl.style.cursor = 'pointer';
            titleEl.addEventListener('click', () => mostrarDetalhes(jg));
        }

        const imageEl = slideWrap.querySelector('.slide-image');
        if (imageEl) {
            imageEl.style.cursor = 'pointer';
            imageEl.addEventListener('click', () => mostrarDetalhes(jg));
        }
        
    });

    

    gamesContainer.appendChild(track);
}


function mostrarDetalhes(jogo) {
    // substitui o conteúdo de <main> por uma página de detalhes
    const main = document.querySelector('main');
    if (!main) return;

    // armazena o conteúdo original para poder voltar
    if (!window.__originalMainContent) {
        window.__originalMainContent = main.innerHTML;
    }

    const detalhesHTML = `
        <main id="detalhes-jogo">
        <div id="botao-voltar">
          <button id="voltar" onclick="location.reload()">← Voltar</button>
        </div>
      <section id="imagem-descricao">
        <section id="image-jogo">
                <img id="imagemBanner" src="${jogo.imagens}" alt="">

          <div id="plataformas">
            <div class="plataforma-icon">
              <img src="../assets/images/logoPlaystation.png" alt="">
            </div>

            <div class="plataforma-icon">
              <img src="../assets/images/logoXbox.png" alt="">
            </div>

            <div class="plataforma-icon">
              <img src="../assets/images/logoSteam.png" alt="">
            </div>

            <div id="avaliacao">
              <p>4,5</p>
              <img src="../assets/images/estrela.png" alt="">
              <img src="../assets/images/estrela.png" alt="">
              <img src="../assets/images/estrela.png" alt="">
              <img src="../assets/images/estrela.png" alt="">
            </div>
          </div>


        </section>
        <section id="descricao-jogo">
          <h1>${jogo.nome}</h1>
          <h2>Descrição</h2>
          <p>${jogo.descricao}</p>

          <div id="informacoes-jogo">
            <div class="info-jogo">
              <h3>Desenvolvedora</h3>
              <p>${jogo.desenvolvedor}</p>
            </div>
            <div class="info-jogo">
              <h3>Data de lançamento</h3>
              <p>${jogo.anoLancamento}</p>
            </div>
            <div class="info-jogo">
              <h3>Gênero</h3>
              <p>${jogo.genero}</p>
            </div>

            </div>
          </div>
        </section>
      </section>
      <hr>
     <div id="divAvaliacoes"></div>
    </main>
    `;

    main.innerHTML = detalhesHTML;

    // atualiza referência para a nova div de avaliações e carrega avaliações para a página de detalhes
    divAvaliacoes = document.getElementById("divAvaliacoes");
    if (divAvaliacoes) carregarAvaliacoes();

    const btnVoltar = document.getElementById('btnVoltar');
    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => {
            if (window.__originalMainContent) {
                main.innerHTML = window.__originalMainContent;
                // re-executa carregarJogos para re-attach listeners, se necessário
                carregarJogos();
            }
        });
    }
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




