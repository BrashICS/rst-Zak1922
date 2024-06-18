// call html things
let wordDisplay = document.getElementById('word');    //shows word with guessed letters
let guessesDisplay = document.getElementById('guesses');    //number of guesses left
let usedLettersDisplay = document.getElementById('used-letters'); // hows which letters were used

    // chooses 0-9 or order to pick a category
let categoryIndex = getRandomInt(0, 9);

// take a random word with getTitle and lowercase it
let pickedWord = getTitle(categoryIndex).toLowerCase();

    // Push spaces into the array based on the word
let guessedWord = [];
    for (let i = 0; i < pickedWord.length; i++) {
if (pickedWord[i] === ' ') {
    guessedWord.push(' ')    // puts spaces entre words
    } else {
guessedWord.push('_')    // put underscores where letters go
    }
}

//the number of attempts remaining and an array for used letters
let attemptsLeft = 6;
let usedLetters = [];

//self-explanatorty
function getRandomInt(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Really Important!!! function thats add spaces and letters to the array
function updateWordDisplay(display, guessedArray) {
let finalWord = '';
    for (let i = 0; i < guessedArray.length; i++) {
if (guessedArray[i] === ' ') {
    finalWord += ' ';    //adding space for multiple words
    } else {
finalWord += guessedArray[i]    // Add guessed letter or underscore
    }
}
display.textContent = finalWord    // textcontent updates the html based on the array, really useful!
}

// Shows how many guesses are left
function updateGuessesLeft(display, attempts) {
display.textContent = "Guesses left: " + attempts;    // Send it to the HTML !!!
}

// display used letters
function updateUsedLetters(display, lettersArray) {
display.textContent = "Used letters: " + lettersArray.join(', ');    //send to html
}

// Has the letter been USED?
function isLetterUsed(letter, usedArray) {
    for (let i = 0; i < usedArray.length; i++) {
if (usedArray[i] === letter) {
    return true;    // used
    }
    }
    return false;    // not
}

// keydown event listener
document.addEventListener('keydown', function(event) {
let letter = event.key.toLowerCase()    // get the input and lowercase it, how many dots can you add?

// use only letters and ones not used
if (letter < 'a' || letter > 'z' || isLetterUsed(letter, usedLetters)) {
    return;
}

    // add the used letters to the used letter array
usedLetters.push(letter)
updateUsedLetters(usedLettersDisplay, usedLetters)

let correctGuess = false
    // is the guessed letter in the Word?
for (let i = 0; i < pickedWord.length; i++) {
if (pickedWord[i] === letter) {
    guessedWord[i] = letter    // put the letter in if its right
    correctGuess = true
}
}

if (correctGuess) {
//show it now
updateWordDisplay(wordDisplay, guessedWord);
    //have they guessed the whole thing?
if (guessedWord.join('') === pickedWord) {
    alert('Lets Go!!! You got the word: ' + pickedWord)    // you did it messgae
    resetGame()    // Reset the game
}
} else {
//if guess was wrong take away a guess
attemptsLeft--
updateGuessesLeft(guessesDisplay, attemptsLeft);
    // sees if they are out of attempts
if (attemptsLeft === 0) {
    alert('oopsies!!! The word was ' + pickedWord)    // your done buddy
    resetGame();    // restart
}
}

event.preventDefault();    // protects from those specials
})

    // resets the game
function resetGame() {
location.reload()    // reloads the page
}
