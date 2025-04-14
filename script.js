const container = document.querySelector('.container');

container.addEventListener('wheel', (event) => {
    event.preventDefault();
    container.scrollBy({
        left: event.deltaY * 2,
        behavior: 'smooth'
    });
});



function writeText(element, text, speed, hasWrittenFlag) {
    let position = 0;

    function write() {
        if (!hasWrittenFlag.value) {
            element.innerHTML += text.charAt(position);
            position++;

            if (position < text.length) {
                setTimeout(write, speed);
            } else {
                hasWrittenFlag.value = true;
            }
        }
    }

    write();
}




const hasWrittenMain = { value: false };
const hasWrittenInfo = { value: false };
const hasWrittenBye = { value: false };

const mainTxt = document.querySelector("#mainTxt");
const infoTxt = document.querySelector("#infoTxt");
const byeTxt = document.querySelector("#byeTxt");

const txtMain = "OLÁ, MEU NOME É IGOR SANDRO, EU SOU WEBDESIGNER E DESENVOLVEDOR";
const txtInfo = "Sou especialista em websites interativos e páginas de venda. Meu objetivo é criar páginas que transmitam ideias, objetivos e que vendam de verdade, sem abrir mão da beleza, modernidade e interatividade.";
// const txtBye = "VAMOS CRIAR ALGO JUNTOS?"
const txtBye = "Vamos criar algo juntos?"

const subTxt = document.querySelector("#subTxt");
const slideSkill = document.querySelector("#slideSkill");
const slideElement = document.querySelectorAll(".slideElement");
const spn = document.querySelectorAll(".spn");
const gridElement = document.querySelectorAll(".gridElement");

const sections = document.querySelectorAll(".sec");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const sectionIndex = [...sections].indexOf(entry.target);

            switch (sectionIndex) {
                case 0:
                    writeText(mainTxt, txtMain, 25, hasWrittenMain);
                    subTxt.style.transform = "translateY(0)";
                    subTxt.style.opacity = "1";
                    spn[0].style.opacity = "1"
                    break;
                case 1:
                    writeText(infoTxt, txtInfo, 0, hasWrittenInfo);
                    slideSkill.style.transform = "translateY(0)";
                    slideSkill.style.opacity = "1";
                    spn[1].style.opacity = "1"
                    break;
                case 2:
                    gridElement.forEach((element)=>{
                        element.style.transform = "translateX(0)";
                        element.style.opacity = "1";
                    });
                    spn[2].style.opacity = "1"
                    break;
                case 3:
                    writeText(byeTxt, txtBye, 25, hasWrittenBye);
                    slideElement.forEach((element) => {
                        element.style.transform = "translateY(0)"
                        element.style.opacity = "1"
                    });
                    spn[3].style.opacity = "1"
                    break;
                default:
                    return;
            }
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(section => observer.observe(section));


const track = document.querySelector('.carousel-track');
const items = Array.from(document.querySelectorAll('.carousel-item'));
const leftBtn = document.querySelector('.nav.left');
const rightBtn = document.querySelector('.nav.right');

let currentIndex = 1;
let autoplayInterval = null;
let userInteracted = false;
let interactionTimeout;

function updateCarousel() {
    items.forEach((item) => item.classList.remove('active'));

    const prev = (currentIndex - 1 + items.length) % items.length;
    const next = (currentIndex + 1) % items.length;

    // Limpa o track e adiciona os 3 elementos visíveis
    track.innerHTML = '';
    track.append(items[prev], items[currentIndex], items[next]);

    items[currentIndex].classList.add('active');
}

function goToNext() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
}

function goToPrev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
}

// Controles
leftBtn.addEventListener('click', () => {
    pauseAutoplay();
    goToPrev();
});

rightBtn.addEventListener('click', () => {
    pauseAutoplay();
    goToNext();
});

// Drag com mouse
let isMobile = window.innerWidth <= 1050;
let startCoord = 0;

track.addEventListener('mousedown', (e) => {
    startCoord = isMobile ? e.clientY : e.clientX;
});

track.addEventListener('mouseup', (e) => {
    const endCoord = isMobile ? e.clientY : e.clientX;
    const diff = endCoord - startCoord;

    if (isMobile) {
        if (diff > 50) {
            pauseAutoplay();
            goToPrev(); // para cima
        } else if (diff < -50) {
            pauseAutoplay();
            goToNext(); // para baixo
        }
    } else {
        if (diff > 50) {
            pauseAutoplay();
            goToPrev(); // para esquerda
        } else if (diff < -50) {
            pauseAutoplay();
            goToNext(); // para direita
        }
    }
});

track.addEventListener('touchstart', (e) => {
    startCoord = isMobile ? e.touches[0].clientY : e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
    const endCoord = isMobile ? e.changedTouches[0].clientY : e.changedTouches[0].clientX;
    const diff = endCoord - startCoord;

    if (isMobile) {
        if (diff > 50) {
            pauseAutoplay();
            goToPrev();
        } else if (diff < -50) {
            pauseAutoplay();
            goToNext();
        }
    }
});

// Autoplay
function startAutoplay() {
    autoplayInterval = setInterval(() => {
        if (!userInteracted) {
            goToNext();
        }
    }, 2000); // muda a cada 4 segundos
}

function pauseAutoplay() {
    userInteracted = true;
    clearTimeout(interactionTimeout);
    interactionTimeout = setTimeout(() => {
        userInteracted = false;
    }, 5000); // 5s depois da última interação, retoma o autoplay
}

// Inicializa tudo
updateCarousel();
// startAutoplay();