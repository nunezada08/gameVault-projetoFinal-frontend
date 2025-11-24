const APIJg = "http://localhost:3001/jogos";

let gamesList;

let jogos = [];

async function carregarJogos() {
    try {

        const resposta = await fetch(APIJg);
        const dados = await resposta.json();

        if (Array.isArray(dados)) {
            jogos = dados;
        } else if (Array.isArray(dados.jogos)) {
            jogos = dados.jogos;
        } else {
            jogos = [];
        }

        mostrarJogos(jogos.slice(0, 100));

    } catch (error) {
      console.error("Erro ao carregar jogos:", error);
      if (gamesList) gamesList.innerHTML = "<p>Erro ao carregar jogos.</p>";
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    gamesList = document.querySelector('.games-list');
    carregarJogos();
  });

function mostrarJogos(lista) {
  if (!gamesList) return;
  gamesList.innerHTML = "";

  lista.forEach(jg => {
    const card = document.createElement("section");
    card.className = "todosJogos";

    card.innerHTML = `
      <div class="game-card">
        <img src="${jg.imagens}" alt="${jg.nome}" class="game-image">
        <h3 class="game-title">${jg.nome}</h3>
        </div>
    `;

    const titleEl = card.querySelector('.game-title');
    if (titleEl) {
      titleEl.style.cursor = 'pointer';
      if (typeof mostrarDetalhes === 'function') {
        titleEl.addEventListener('click', () => mostrarDetalhes(jg));
      } else {
        titleEl.addEventListener('click', () => {
          console.warn('mostrarDetalhes não definido; clique registrado para', jg.nome);
        });
      }
    }
    const titleim = card.querySelector('.game-image');
    if (titleim) {
      titleim.style.cursor = 'pointer';
      if (typeof mostrarDetalhes === 'function') {
        titleim.addEventListener('click', () => mostrarDetalhes(jg));
      } else {
        titleim.addEventListener('click', () => {
          console.warn('mostrarDetalhes não definido; clique registrado para', jg.nome);
        });
      }
    }
    
 

    gamesList.appendChild(card);
  });
}

// substitua a função mostrarDetalhes existente por esta implementação (igual à do index.js)
function mostrarDetalhes(jogos) {
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
          <img id="imagemBanner" src="${jogos.imagens}" alt="">

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
          <h1>${jogos.nome}</h1>
          <h2>Descrição</h2>
          <p>${jogos.descricao}</p>

          <div id="informacoes-jogo">
            <div class="info-jogo">
              <h3>Desenvolvedora</h3>
              <p>${jogos.desenvolvedor}</p>
            </div>
            <div class="info-jogo">
              <h3>Data de lançamento</h3>
              <p>${jogos.anoLancamento}</p>
            </div>
            <div class="info-jogo">
              <h3>Gênero</h3>
              <p>${jogos.genero}</p>
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