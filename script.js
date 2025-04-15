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

            switch (entry.target.id) {
                case "sec1":
                    writeText(mainTxt, txtMain, 25, hasWrittenMain);
                    break;
                case "sec2":
                    writeText(infoTxt, txtInfo, 0, hasWrittenInfo);
                    break;
                case "sec3":
                    gridElement.forEach((element) => {
                        element.style.transform = "translateX(0)";
                        element.style.opacity = "1";
                    });
                    break;
                case "sec4":
                    writeText(byeTxt, txtBye, 25, hasWrittenBye);
                    slideElement.forEach((element) => {
                        element.style.transform = "translateY(0)";
                        element.style.opacity = "1";
                    });
                    break;
            }
            
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(section => observer.observe(section));


// const observer2 = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         const video = entry.target.querySelector('.grid-video');
//         const head = entry.target.querySelector('.grid-head');
  
//         if (video) video.classList.add('show');
//         if (head) head.classList.add('show');
//       }
//     });
//   }, {
//     root: document.querySelector('.container'), // container com overflow-x
//     threshold: 0.5
//   });
  
//   // Observar todas as seções
//   document.querySelectorAll('.sec').forEach(section => {
//     observer2.observe(section);
//   });
  
  