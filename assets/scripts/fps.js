const APIJg = "http://localhost:3001/jogos";
const APIAv = "http://localhost:3001/avaliacoes";

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

        mostrarAvaliacoes(avaliacoes.slice(32, 35));

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
                    <img src="../assets/images/perfilFoto.png" alt="Perfil" width="40px">
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
                <img src="../assets/images/deslike.png" alt="deslike" width="20px">
                <img src="../assets/images/like.png" alt="like" width="20px">
            </div>
        `;

        divAvaliacoes.appendChild(card);
    });
}

function gerarEstrelas(nota) {
    const estrelas = Math.round(nota / 2);
    return "⭐".repeat(estrelas) + "".repeat(5 - estrelas);
}

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

        mostrarJogos(jogos.filter(j => (j.genero) >= 'FPS' && (j.genero) <= 'FPS'));

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