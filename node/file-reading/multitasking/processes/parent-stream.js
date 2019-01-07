const { fork } = require('child_process');
var CommonValidator = require('../../../validator/validator');
const { wordsToNumbers } = require('words-to-numbers');
const path = require('path');

const userInput = process.argv[2];


let validator = new CommonValidator(userInput);

validator.validate();

const counter = wordsToNumbers(userInput);

console.log(`\n **** LOOP ITERATION WOULD BE =>  ${counter} \n` );

const startTime = Date.now();
let childProcessArray = [];

for (let i = 0; i < 10; i++)
{
  childProcessArray[i] = fork(path.dirname(__filename) + '/child-stream.js');
}

for (let i = 0; i < 10; i++)
{
  childProcessArray[i].send({ counter, startTime, userInput });
}
