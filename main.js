const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".wrapper .input-field");
const timerTag = document.querySelector(".time span b");
const mistakesMade = document.querySelector(".mistake span");
const cpmTag = document.querySelector(".cpm span");
const wpmTag = document.querySelector(".wpm span");

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    characterIndex = mistakes = isTyping = 0;

// Funktion randomParagraph finder tal mindre end antal af paragraffer i paragraphs.js,
// henter tilfældigt item fra paragraph array, splitter alle bogstaver i valgt paragraf,
// tilføjer hvert bogstav til span tag, og tilføjer alle span til p tag:
function randomParagraph() {
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    paragraphs[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inputField.focus())
    typingText.addEventListener("click", () => inputField.focus())
}

function initialTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedCharacter = inputField.value.split("")[characterIndex];
    // Kode efter næste linje virker kun hvis tastede bogstaver er mindre end total antal bogstaver og hvis timer er større end 0: //
    if(characterIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping)  {
            timer = setInterval(initialTimer, 1000);
            isTyping = true;
        }
        if(typedCharacter == null) {
            characterIndex--;
            if(characters[characterIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[characterIndex].classList.remove("correct", "incorrect");
        } else {
            if(characters[characterIndex].innerText === typedCharacter) {
                characters[characterIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[characterIndex].classList.add("incorrect");
            }
            characterIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[characterIndex].classList.add("active");

        // Udregner wpm ud fra at 1 ord = 5 bogstaver: //
        let wpm = Math.round((((characterIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        // Hvis wpm er 0, tom eller 'Infinity', bliver wpm sat til 0: //
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakesMade.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = characterIndex - mistakes;
    } else {
        clearInterval(timer);
    }
}

// TIMER //
function initialTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timerTag.innerText = timeLeft;
    } else {
        inputField.value = "";
        clearInterval(timer);
    }
}

randomParagraph();
inputField.addEventListener("input", initialTyping);