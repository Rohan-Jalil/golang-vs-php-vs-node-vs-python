const fs = require('fs');
const path = require('path');
var CommonValidator = require('../validator/validator');
const { wordsToNumbers } = require('words-to-numbers');

const userInput = process.argv[2];
const OutputFileName = userInput + '-' + 'file-io-wstream.txt';
const outputFilePath = path.dirname(__filename) + '/../output/' + OutputFileName;

let validator = new CommonValidator(userInput);

validator.validate();

const numberOfIterations = wordsToNumbers(userInput);

const timeoutScheduled = Date.now();

var wstream = fs.createWriteStream(outputFilePath);
wstream.on('finish', function () {
  const delay = Date.now() - timeoutScheduled;
  console.log(numberOfIterations + ' Iterations has been written in file ' + OutputFileName + ' in '+ delay + 'ms');
});

for(i = 0; i <= numberOfIterations; i++){
	wstream.write(i+'\n');
}

wstream.end();
