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
      <figure class="slide-card">     
        <figcaption class="game-title">${jg.nome || "Jogo não informado"}</figcaption>
      </figure>
    `;

    const titleEl = card.querySelector('.game-title');
    if (titleEl) {
      titleEl.style.cursor = 'pointer';
      // se existir a função global mostrarDetalhes, usa ela; caso contrário, faz nada ou redireciona
      if (typeof mostrarDetalhes === 'function') {
        titleEl.addEventListener('click', () => mostrarDetalhes(jg));
      } else {
        titleEl.addEventListener('click', () => {
          // fallback: navegar para página de detalhes (se existir uma rota)
          // aqui apenas previne erro — personalize conforme seu roteamento
          console.warn('mostrarDetalhes não definido; clique registrado para', jg.nome);
        });
      }
    }

    gamesList.appendChild(card);
  });
}


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
      <section id="imagem-descricao">
        <section id="image-jogo">
          <img src="../assets/images/silksong-descricao.png" alt="">

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

          <div id="btns-add-remove">
              <div id="add">
                <p>ADICIONAR</p>
              </div>
              <div id="remove">
                <p>REMOVER</p>
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
}