// Setting game name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelectorAll("h1")[0].innerHTML = gameName;

document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created By Mohamed Sharawy &copy; ${new Date().getFullYear()}`;

// Setting Game Options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberofHints = 2;

// manage word

let wordsToGuess = "";
const words = [
  "Orange",
  "Banana",
  "Guitar",
  "Person",
  "School",
  "Bridge",
  "Animal",
  "Friend"
];
wordsToGuess =
  words[Math.floor(Math.random() * words.length)].toLocaleLowerCase();

let messageArea = document.querySelector(".massage");

// Manage Hints
document.querySelector(".hint span").innerHTML = numberofHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);

function generateInput() {
  const inputsContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span class="try-span">Try ${i}<span/>`;
    if (i !== 1) tryDiv.classList.add("disabled-inputs");
    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.append(input);
    }
    inputsContainer.appendChild(tryDiv);
  }

  inputsContainer.children[0].children[1].focus();

  // Disable all input expect first one
  const inputInDisableDiv = document.querySelectorAll(".disabled-inputs input");
  inputInDisableDiv.forEach((input) => (input.disabled = true));

  // convert Inout to uppercase
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      // console.log(event); // to show event of keys
      const currentIndex = Array.from(inputs).indexOf(this); // this refere to event , can use //event.target
      if (event.key === "ArrowRight") {
        const nextindex = currentIndex + 1;
        if (nextindex < inputs.length) inputs[nextindex].focus();
      } else if (event.key === "ArrowLeft") {
        const preindex = currentIndex - 1;
        if (preindex >= 0) inputs[preindex].focus();
      }else if (event.key === " ") {
        event.preventDefault(); // Prevent the space from being entered
      }
    });
  });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);

console.log(wordsToGuess); // show word in console
function handleGuesses() {
  let successGuess = true;
  console.log();
  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLocaleLowerCase();
    const actualLetter = wordsToGuess[i - 1];

    // Game logic
    if (letter === actualLetter) {
      inputField.classList.add("yes-in-place");
    } else if (wordsToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }

  // check if user win or lose
  if (successGuess) {
    messageArea.innerHTML = `You Win The Word Is <span> ${wordsToGuess} <span/>`;

    if (numberofHints === 2 ) {
      messageArea.innerHTML = `<p>Congratulations, you won without using any hints.</p> `;
    }
    // add disabled class on all try dives
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

    // make guess button disaple
    guessButton.disabled = true;
    getHintButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");
    const currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInputs.forEach((input) => (input.disabled = true));
    currentTry++;
    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInputs.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-inputs");
      el.children[1].focus();
    } else {
      guessButton.disabled = true;
      messageArea.innerHTML = `You lose the Word Is <span> ${wordsToGuess}</span>`;
    }
  }
}

function getHint() {
  if (numberofHints > 0) {
    numberofHints--;
    document.querySelector(".hint span ").innerHTML = numberofHints;
  }
  if (numberofHints === 0) {
    getHintButton.disabled = true;
  }

  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  const emptyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => (input.value === "")
  );

  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randominput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randominput);

    if (indexToFill !== -1) {
      randominput.value = wordsToGuess[indexToFill].toLocaleUpperCase();
    }
  }
}

function hindelBackSpace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (currentIndex > 0 && document.activeElement.value === "") {
      // const currentTryInputs = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      // currentTryInputs.value = "";
      prevInput.value = "";
      prevInput.focus();
      event.preventDefault(); // Prevent default Backspace behavior
    }
  }
}
document.addEventListener("keydown", hindelBackSpace);

window.onload = function () {
  generateInput();
};




/* 
innerHTML => Returns or sets the HTML content inside an element.
outerHTML => Returns or sets the HTML content of the element itself, including the element tag.
textContent => Returns or sets the text content of an element, including all hidden text. It does not render styles.
innerText => Returns or sets the visible text content of an element, respecting CSS styling like display: none.
*/

/* 
 event.currentTarget => Element with listener
 event.Target => Element clicked

*/


/* 
 coplait extaion
 - space doesnt accepted in inputs
 - backspace delete and move to the prevent element
*/
