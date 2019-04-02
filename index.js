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

// store data in seinfeldArray
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

// [3]
word = new Word(seinfeldArray[Math.floor(Math.random() * seinfeldArray.length)]);
word.createWordString();

// [4]
var wrongLetters = [];
var correctLetters = [];
var numGuesses = 10;

// Used with user validation to only enter letters in lowercase
var acceptedLetters = 'abcdefghijklmnopqrstuvwxyz';


/* --------- *\
|* Functions *|
\* --------- */

// Greetings
function greeting() {
    inquirer.prompt([
        {
            message: "\nHello! What's your name?",
            type: 'input',
            name: 'userInput'
        }
    ]).then(function (response) {
        console.log(chalk.cyan.bold(`Hello ${response['userInput']}! Can you guess this word from Seinfeld?`))
        console.log(chalk.bgGreen.black(' Note ') + chalk.green(" this game is case-sensitive that expects you to enter all commands in lowercase."))
        // Initiate
        playGame();
    });
};

// Load game
function playGame() {
    // Prompts user for each guess
    inquirer.prompt([
        {
            message:
                "\n" + '****************************************************' +
                "\n\nWord: " + chalk.green(word.update()) +
                "\n\nGuesses remaining: " + chalk.magenta.bold(numGuesses) +
                "\nWrong guesses: " + chalk.magenta.bold(wrongLetters.join(' ')) +
                "\n\nType here:",
            type: 'input',
            name: 'userInput'
        }
    ]).then(function (response) {
        // User input validation
        if (response.userInput === '') {
            console.log(chalk.bgRed.white(' Ops! ') + chalk.yellow(" You have not entered a letter."));
            return playGame();
        } else if (response.userInput.length > 1) {
            console.log(chalk.bgRed.white(' Ops! ') + chalk.yellow(" Guess one letter at a time."));
            return playGame();
        } else if (!acceptedLetters.includes(response.userInput)) {
            console.log(chalk.bgRed.white(' Ops! ') + chalk.yellow(" Enter only lowercase letters of the alphabet."));
            return playGame();
        } else if (correctLetters.includes(response.userInput)) {
            console.log(chalk.bgRed.white(' Ops! ') + chalk.yellow(" You already guessed that correctly. Choose another letter."));
            return playGame();
        } else if (wrongLetters.includes(response.userInput)) {
            console.log(chalk.bgRed.white(' Ops! ') + chalk.yellow(" You already guessed that incorrectly. Choose another letter."));
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
        } else {
            correctLetters.push(response.userInput);
        };

        // Analyses if current letters in word matches to chosen word
        if (word.update() === word.word) {
            gameOver('win');
            return;
        } else if (numGuesses === 0) {
            gameOver('lose');
            return;
        } else {
            playGame();
        };

    });
};

// Display results
function gameOver(result) {
    if (result === 'win') {
        console.log("\n" + chalk.bgBlue.white.bold("You Won! Happy Festivus!"));
        console.log(chalk.yellow("The word you guessed correctly is: ") + chalk.bgYellow.black(word.word) + "\n");

    } else if (result === 'lose') {
        console.log("\n" + chalk.bgRed.white.bold("No Soup For You!"));
        console.log(chalk.yellow("The word is: ") + chalk.bgYellow.black(word.word) + "\n");
    };

    // Prompts user to play again
    inquirer.prompt([
        {
            message: "Play again?",
            type: "confirm",
            name: "userInput",
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
            console.log(chalk.cyan("Thanks for playing! Goodbye.\n"));
            return;
        };
    });
};


/* ------------ *\
|* Main Process *|
\* ------------ */
greeting();