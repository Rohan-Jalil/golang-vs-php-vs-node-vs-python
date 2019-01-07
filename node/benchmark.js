var CommonValidator = require('./validator/validator');

const userInput = process.argv;

let validator = new CommonValidator(userInput);

validator.validate();
// console.log('ss'+userInput[2]);
var firstParam = userInput[2];
var caller = firstParam.split('-').join('_');

var Benchmark = require('./libraries/benchmark_'+caller);

let benchmark = new Benchmark(userInput);

benchmark.getRestult();
