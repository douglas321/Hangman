const secretWord = "ACORN"; // Set the secret word
const maxGuesses = 6;
let guessedLetters = [];
let remainingGuesses = maxGuesses;

const secretWordElement = document.getElementById('secret-word');
const remainingGuessesElement = document.getElementById('remainingGuesses');
const keyboardButtons = document.querySelectorAll('#keyboard button');
const hangmanImage = document.getElementById('hangmanImage');

// Initialize the secret word display
function initializeSecretWord() {
    secretWordElement.innerHTML = secretWord
        .split('')
        .map(() => '<li class="letter">_</li>')
        .join('');
}

// Update the secret word display with correct guesses
function updateSecretWordDisplay() {
    const letters = secretWordElement.querySelectorAll('.letter');
    secretWord.split('').forEach((char, index) => {
        if (guessedLetters.includes(char)) {
            letters[index].textContent = char;
        }
    });
}

function handleKeyboardClick(event) {
    const button = event.target;
    const letter = button.textContent;

    button.disabled = true;

    if (secretWord.includes(letter)) {
        guessedLetters.push(letter);
        updateSecretWordDisplay();

        if (checkWin()) {
            alert('You win!');
            resetGame();
        }
    } else {
        remainingGuesses--;
        updateHangmanImage();
        updateRemainingGuesses();

        if (remainingGuesses === 0) {
            alert('Game over! The word was: ' + secretWord);
            resetGame();
        }
    }
}

function updateHangmanImage() {
    hangmanImage.src = `images/hangman-${maxGuesses - remainingGuesses}.png`;
}

function updateRemainingGuesses() {
    remainingGuessesElement.textContent = `${remainingGuesses} / ${maxGuesses}`;
}

function checkWin() {
    return secretWord.split('').every(char => guessedLetters.includes(char));
}

function resetGame() {
    guessedLetters = [];
    remainingGuesses = maxGuesses;
    keyboardButtons.forEach(button => button.disabled = false);
    initializeSecretWord();
    updateRemainingGuesses();
    hangmanImage.src = 'images/hangman-0.png';
}

keyboardButtons.forEach(button =>
    button.addEventListener('click', handleKeyboardClick)
);

// Initialize the game
initializeSecretWord();
updateRemainingGuesses();
