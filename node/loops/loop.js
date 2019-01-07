
var CommonValidator = require('../validator/validator');
const { wordsToNumbers } = require('words-to-numbers');

const userInput = process.argv[2];

let validator = new CommonValidator(userInput);

validator.validate();

const loopCounter = wordsToNumbers(userInput);

const startTime = Date.now();

for (let i = 0; i <= loopCounter; i++){
    y = i;
}

console.log('Time Taken by ' + userInput + ' iterations is : ' + (Date.now() - startTime) + 'ms');
