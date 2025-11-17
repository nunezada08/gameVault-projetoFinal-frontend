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