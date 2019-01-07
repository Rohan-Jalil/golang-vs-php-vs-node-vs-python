const { wordsToNumbers } = require('words-to-numbers');

class BenchmarkLoop {
  constructor(userInput) {
    this._userInput = userInput;
    this._loopCounter = wordsToNumbers(userInput[3]);
  }

  getRestult() {
    this._simpleLoops();
  }
  
  _simpleLoops() {
    const startTime = Date.now();
    var y = 0;
    for (let i = 0; i <= this._loopCounter; i++){
        y = i;
    }

    this._getExecutionTime(startTime);      
  }

  _getExecutionTime(startTime){
    console.log('Time Taken by ' + this._userInput[2] + ' ' + this._userInput[3] + '(' + this._loopCounter + ') iterations is : ' + (Date.now() - startTime) + 'ms');
  }
}

module.exports = BenchmarkLoop;