/* ----------------- *\
|* Constructor: Word *|
\* ----------------- */

// Purpose of word.js: Create an object representing the current word the user is attempting to guess

// Word Constructor Roadmap: 
// [1] word.js depends on the Letter constructor, import letter.js via require()
// [2] An array of new Letter objects representing the letters of the underlying word.
// [3] A function that returns a string representing the word. 
// [4] Call the function on each letter object that displays the character or "_" and concatenate those together
// [5] A function that takes a character as an argument and calls the guess function on each letter object
// [6] Prepare module to export Word function to be used by index.js with require() statement

// [1]
const Letter = require('./letter.js');

function Word(word) {

    // [2]
    this.letterArray = [];

    // [3]
    this.createWordString = function () {
        this.word = word;
        let wordString = this.word.split('');

        // [4]
        for (let i = 0; i < wordString.length; i++) {
            let newLetter = new Letter(wordString[i]);
            this.letterArray.push(newLetter);
        }
    }

    // [5]
    this.guessLetter = function (userInput) {
        for (var i = 0; i < this.letterArray.length; i++) {
            this.letterArray[i].guessLetter(userInput)
        }
    }
}

// [6]
module.exports = Word;