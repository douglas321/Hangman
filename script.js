// Hangman Game Logic
const secretWord = "ACORN"; // Set the secret word
const maxGuesses = 6;
let guessedLetters = [];
let remainingGuesses = maxGuesses;

// Selectors
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

// Handle keyboard button clicks
function handleKeyboardClick(event) {
    const button = event.target;
    const letter = button.textContent;

    // Disable the button after it's clicked
    button.disabled = true;

    // Check if the letter is in the secret word
    if (secretWord.includes(letter)) {
        guessedLetters.push(letter);
        updateSecretWordDisplay();

        // Check for win condition
        if (checkWin()) {
            alert('You win!');
            resetGame();
        }
    } else {
        remainingGuesses--;
        updateHangmanImage();
        updateRemainingGuesses();

        // Check for loss condition
        if (remainingGuesses === 0) {
            alert('Game over! The word was: ' + secretWord);
            resetGame();
        }
    }
}

// Update the hangman image based on remaining guesses
function updateHangmanImage() {
    hangmanImage.src = `images/hangman-${maxGuesses - remainingGuesses}.png`;
}

// Update the remaining guesses display
function updateRemainingGuesses() {
    remainingGuessesElement.textContent = `${remainingGuesses} / ${maxGuesses}`;
}

// Check if the player has won
function checkWin() {
    return secretWord.split('').every(char => guessedLetters.includes(char));
}

// Reset the game
function resetGame() {
    guessedLetters = [];
    remainingGuesses = maxGuesses;
    keyboardButtons.forEach(button => button.disabled = false);
    initializeSecretWord();
    updateRemainingGuesses();
    hangmanImage.src = 'images/hangman-0.png';
}

// Add event listeners to keyboard buttons
keyboardButtons.forEach(button =>
    button.addEventListener('click', handleKeyboardClick)
);

// Initialize the game
initializeSecretWord();
updateRemainingGuesses();
