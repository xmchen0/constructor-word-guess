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

// import chalk to add colours
const chalk = require('chalk');

// [3]
var seinfeldArray = [
    'regifter', 
    'shrinkage', 
    'shiksappeal', 
    'festivus', 
    'manhands', 
    'closetalker', 
    'lowtalker', 
    'twoface', 
    'spongeworthy', 
    'giddyup',
    'yadayadayada',
    'mimbo',
    'bromanzier',
    'shmoopie',
    'doubledip',
    'snapple',
    'bigsalad',
    'kavorka',
    'labelmaker',
    'bizarro'
];

word = new Word(seinfeldArray[Math.floor(Math.random() * seinfeldArray.length)]);
word.createWordString();

// [4]
var wrongLetters = [];
var numGuesses = 10;

// Used with user validation to only enter letters
var acceptedLetters = "abcdefghijklmnopqrstuvwxyz";


/* --------- *\
|* Functions *|
\* --------- */

// Greetings
function greeting() {
    inquirer.prompt([
        {
            message: "Hello! What's your name?",
            type: 'input',
            name: 'userInput'
        }
    ]).then(function (response) {
        console.log(chalk.cyan.bold(`Hello ${response['userInput']}! Can you guess this Seinfeld word?`))
        // Initiate
        playGame();
    });
}

// Load game
function playGame() {
    // Prompts user for each guess
    inquirer.prompt([
        {
            message:
                "\n" + '****************************************************' +
                "\nWord: " + chalk.blue(word.update()) +
                "\n\nGuesses remaining: " + chalk.magenta.bold(numGuesses) +
                "\nIncorrect guesses so far: " + chalk.magenta.bold(wrongLetters.join(' ')) +
                "\n\nGuess a letter:",
            type: 'input',
            name: 'userInput'
        }
    ]).then(function (response) {
        // User input validation
        if (response.userInput === '') {
            console.log(chalk.bgRed.white('Ops!') + chalk.yellow(" You have not entered a letter."));
            return playGame();
        } else if (response.userInput.length > 1) {
            console.log(chalk.bgRed.white('Ops!') + chalk.yellow(" Guess one letter at a time."));
            return playGame();
        } else if (!acceptedLetters.includes(response.userInput)) {
            console.log(chalk.bgRed.white('Ops!') + chalk.yellow(" Enter only characters of the alphabet."));
            return playGame();
        } else if (wrongLetters.includes(response.userInput)) {
            console.log(chalk.bgRed.white('Ops!') + chalk.yellow(" You already guessed that. Choose another letter."));
            return playGame();
        };

        // Loop through letter array to check response from userInput
        for (var i = 0; i < word.letterArray.length; i++) {
            word.letterArray[i].letterCheck(response.userInput);
        };

        // Decrement guesses remaining if wrong letters guessed
        if (!word.word.includes(response.userInput)) {
            numGuesses--;
            wrongLetters.push(response.userInput);
        }

        // Analyses if current letters in word matches to chosen word
        if (word.update() === word.word) {
            gameOver('win');
            return;
        } else if (numGuesses === 0) {
            gameOver('lose');
            return;
        } else {
            playGame();
        }

    });
}

// Display results
function gameOver(result) {
    if (result === 'win') {
        console.log(chalk.blue.bold("You Won! Happy Festivus!"));
        console.log(chalk.yellow("The word is: ") + chalk.bgYellow.black(word.word) + "\n");

    } else if (result === 'lose') {
        console.log("\n" + chalk.bgRed.white.bold("No Soup For You!"));
        console.log(chalk.yellow("The word is: ") + chalk.bgYellow.black(word.word) + "\n");
    };

    // Prompts user play again
    inquirer.prompt([
        {
            message: "Play again?",
            name: "userInput",
            type: "confirm",
        }
    ]).then(function (response) {
        if (response.userInput) {
            console.log(chalk.cyan("\nRandomly selecting a new word..."));
            word = new Word(seinfeldArray[Math.floor(Math.random() * seinfeldArray.length)]);
            word.createWordString();
            numGuesses = 10;
            wrongLetters = [];
            playGame();
        } else {
            console.log(chalk.cyan("\nThanks for playing! Goodbye.\n"));
            return;
        };
    });
};


/* ------------ *\
|* Main Process *|
\* ------------ */
greeting();