/* =====================================
   ELEMENTOS
===================================== */

const home = document.getElementById("home");
const letterScreen = document.getElementById("letterScreen");
const questionScreen = document.getElementById("questionScreen");
const finalScreen = document.getElementById("finalScreen");

const openLetter = document.getElementById("openLetter");
const goToQuestion = document.getElementById("goToQuestion");
const yesButton = document.getElementById("yesButton");
const thinkButton = document.getElementById("thinkButton");

const audio = document.getElementById("audioDeclaracao");
const musicButton = document.getElementById("musicButton");

const heartsContainer =
    document.getElementById("hearts-container");


/* =====================================
   TROCAR DE TELA
===================================== */

function changeScreen(screenToShow) {

    const screens = [
        home,
        letterScreen,
        questionScreen,
        finalScreen
    ];

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    screenToShow.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================
   ABRIR CARTA
===================================== */

openLetter.addEventListener("click", () => {

    changeScreen(letterScreen);

    setTimeout(() => {
        startRevealAnimation();
    }, 500);

    playAudio();

});


/* =====================================
   ANIMAÇÃO DOS TEXTOS
===================================== */

function startRevealAnimation() {

    const elements =
        document.querySelectorAll(".letter .reveal");

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

    elements.forEach(element => {
        observer.observe(element);
    });
}


/* =====================================
   IR PARA O PEDIDO
===================================== */

goToQuestion.addEventListener("click", () => {

    changeScreen(questionScreen);

    createBurstOfHearts();

});


/* =====================================
   BOTÃO SIM
===================================== */

yesButton.addEventListener("click", () => {

    createMassiveHeartRain();

    setTimeout(() => {

        changeScreen(finalScreen);

    }, 1000);

});


/* =====================================
   BOTÃO "PENSAR"
===================================== */

thinkButton.addEventListener("click", () => {

    thinkButton.textContent =
        "Tudo bem... eu espero sua resposta ❤️";

    thinkButton.style.color =
        "rgba(255,255,255,0.7)";

});


/* =====================================
   ÁUDIO
===================================== */

async function playAudio() {

    try {

        audio.volume = 0.8;

        await audio.play();

        musicButton.classList.add("playing");

        musicButton.textContent = "♫";

    } catch (error) {

        console.log(
            "O navegador bloqueou o áudio automático.",
            error
        );

    }

}


/* =====================================
   BOTÃO DE MÚSICA
===================================== */

musicButton.addEventListener("click", async () => {

    if (audio.paused) {

        try {

            await audio.play();

            musicButton.classList.add("playing");
            musicButton.textContent = "♫";

        } catch (error) {

            console.log(error);

        }

    } else {

        audio.pause();

        musicButton.classList.remove("playing");
        musicButton.textContent = "🔇";

    }

});


/* =====================================
   QUANDO O ÁUDIO TERMINAR
===================================== */

audio.addEventListener("ended", () => {

    musicButton.classList.remove("playing");
    musicButton.textContent = "♫";

});


/* =====================================
   CORAÇÕES FLUTUANTES
===================================== */

function createFloatingHeart() {

    const heart =
        document.createElement("div");

    heart.classList.add("floating-heart");

    heart.innerHTML = "♥";

    const size =
        Math.random() * 18 + 10;

    const left =
        Math.random() * 100;

    const duration =
        Math.random() * 7 + 7;

    heart.style.left =
        `${left}%`;

    heart.style.fontSize =
        `${size}px`;

    heart.style.animationDuration =
        `${duration}s`;

    heartsContainer.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, duration * 1000);

}


/* Cria corações constantemente */

setInterval(() => {

    createFloatingHeart();

}, 900);


/* =====================================
   EXPLOSÃO DE CORAÇÕES
===================================== */

function createBurstOfHearts() {

    for (let i = 0; i < 25; i++) {

        setTimeout(() => {

            createFloatingHeart();

        }, i * 70);

    }

}


/* =====================================
   CHUVA DE CORAÇÕES FINAL
===================================== */

function createMassiveHeartRain() {

    for (let i = 0; i < 100; i++) {

        setTimeout(() => {

            createFloatingHeart();

        }, i * 25);

    }

}


/* =====================================
   COMEÇAR ALGUNS CORAÇÕES
===================================== */

for (let i = 0; i < 8; i++) {

    setTimeout(() => {

        createFloatingHeart();

    }, i * 500);

}