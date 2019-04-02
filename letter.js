/* ------------------- *\
|* Constructor: Letter *|
\* ------------------- */

// Purpose of letter.js: Display blank placeholder i.e. "_" or an underlying character

// Letter Constructor Roadmap: 
// [1] A string value to store the underlying character for the letter
// [2] A boolean value that stores whether that letter has been guessed yet
// [3] A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed
// [4] A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly
// [5] Prepare module to export Letter function to be used by word.js with require() statement

function Letter(letter) {
    // [1]
    this.letter = letter;

    // [2]
    this.guessed = false;

    // [3]
    this.guessCheck = function () {
        if (this.guessed) {
            return this.letter;
        } else {
            return "_ ";
        };
    };

    // [4]
    this.letterCheck = function (userInput) {
        if (this.letter === userInput) {
            this.guessed = true;
        };
    };
};

// [5]
module.exports = Letter;