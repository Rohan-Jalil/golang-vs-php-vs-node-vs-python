var stream = require('stream');
var fs = require('fs');
var util = require('util');
const path = require('path');
var CommonValidator = require('../validator/validator');
const { wordsToNumbers } = require('words-to-numbers');

const userInput = process.argv[2];
const OutputFileName = userInput + '-' + 'file-io-open-close-file-inside-loop.txt';
const outputFilePath = path.dirname(__filename) + '/../output/' + OutputFileName;

let validator = new CommonValidator(userInput);

validator.validate();

const numberOfIterations = wordsToNumbers(userInput);

const timeoutScheduled = Date.now();

for (i = 0; i < numberOfIterations; i++) {

	fs.appendFile(outputFilePath, '\n'+i, (err) => {
        if (err) return console.error(err);
    });
}

const delay = (Date.now() - timeoutScheduled) / 1000;
console.log(''+ numberOfIterations + ' loop file i/o, completed in '+ delay + 's');
