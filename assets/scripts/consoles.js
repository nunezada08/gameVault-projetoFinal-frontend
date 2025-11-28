const APIJg = "http://localhost:3001/jogos";
const APICs = "http://localhost:3001/consoles";

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


let divConsoles = document.getElementById("divConsoles");

async function carregarConsoles() {
    try {
        const resposta = await fetch(APICs);
        const dados = await resposta.json();

        const avaliacoes = dados.avaliacoes;

        mostrarConsoles(Consoles.slice(1,30));

    } catch (error) {
        console.error("Erro ao carregar consoles:", error);
        divAvaliacoes.innerHTML = "<p>Erro ao carregar consoles.</p>";
    }
}

carregarAvaliacoes();

