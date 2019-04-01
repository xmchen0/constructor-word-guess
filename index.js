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

// 