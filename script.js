function changeImageWidth(){
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");

    if(window.innerWidth <= 650){
        img1.src = "./images/blackbrianDesktop.png";
        img2.src = "./images/granempDesktop.png";
        img3.src = "./images/malibuDesktop.png";
    }else{
        img1.src = "./images/blackbrian.png";
        img2.src = "./images/granemp.png";
        img3.src = "./images/malibu.png"
    }
}

window.onload = changeImageWidth;
window.onresize = changeImageWidth;

const clickGridElement = document.querySelectorAll(".gridElement");
clickGridElement.forEach(element=>{
    element.addEventListener("click", ()=> {

        const activeElement = document.querySelector(".gridElement.active");

        if(activeElement && activeElement !== element){
            activeElement.classList.remove("active");
        }
        element.classList.toggle("active")
    })
})


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
