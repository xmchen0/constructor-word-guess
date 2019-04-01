/* 

UofT Bootcamp 2019

Constructor Word Guess

*/

// Purpose of index.js: Contains game logic for the course of the game

// Game Logic Roadmap:
// [1] Game logic depends on word.js, import word.js via require()
// [2] Game should be able to receive user input using the `inquirer` or `prompt` npm packages
// [3] Randomly selects a word and uses the Word constructor to store it
// [4] Prompts the user for each guess and keeps track of the user's remaining guesses

/* ----------------------------- *\
|* Declare Variables / Constants *|
\* ----------------------------- */

// [1]
const Word = require('./word.js');

// [2]
const inquirer = require('inquirer');

// [3] store word data in array
var wordArray = ['regifter', 'shrinkage', 'shiksappeal', 'festivus', 'manhands'];

// [4] declare variables to keep track of userInput and guesses
var guesses;
var guessesRemaining;
var guessedWord;
var chosenWord;
var numGuesses = 10;

/* --------- *\
|* Functions *|
\* --------- */

// When screen onloads
function displayMessage() {
    // Empty guesses remaining array
    guessesRemaining = [];
    // Console log message
    console.log('Hello! Welcome to Seinfeld Word Guess!');
    console.log('Can you guess this spectacular Seinfeld word?');
    // Initiate
    playGame();
};

// [3]
function playGame() {
    // Setup guesses remaining and 
    guesses = 10;
    // Display random word
    randomWord = '';
    let index = Math.floor(Math.random() * wordArray.length);
    let randomWord = wordArray[index];
    // Use Word constructor to store it
    gameWord = new Word(randomWord);
    guessesRemaining = gameWord.letterArray.length;
    displayWord = gameWord.createWordString()
    gameWord
};

// [4]
function askToGuess() {
    // Prompts user for each guess
    inquirer.prompt([{
        name: 'ask',
        message: 'Press Any Key To Get Started'
    }]).then(function (response) {
        var userInput = response.askToGuess;
        // Number of guesses less than 0
        if (numGuesses === 0) {
            // Initiate
            gameOver();
            // 
        } else if (userInput.length === 1 ){
            gameWord.guessCheck(userInput);
            displayWord = gameWord.createWordString();
        }
        // Keep track of user's remaining guesses
    });
};

// Game Over
function gameOver() {
    // Display game over message
    // Prompt users to select option to play again or quit game
};


/* ------------ *\
|* Main Process *|
\* ------------ */
playGame();