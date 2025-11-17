const imagem = document.getElementById("imagem");
const btnTras = document.getElementById("btnTras");
const btnFrente = document.getElementById("btnFrente");


const imagens = [
    "../assets/images/fortnite.png",
    "../assets/images/cybepunk-grande.png",
    "../assets/images/valorant.png",
    "../assets/images/dispatch.png",
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

