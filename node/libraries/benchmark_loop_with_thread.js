const cluster = require('cluster');
const { wordsToNumbers } = require('words-to-numbers');

class BenchmarkLoopWithThead {
  constructor(userInput) {
    this._userInput = userInput;
    this._loopCounter = wordsToNumbers(userInput[3]);
  }
  
  getRestult() {
    switch (this._userInput[4]) {
      case "cluster":
        this._runLoopCluster();
        break;
      case "processes":
        this._runLoopProcesses();
        break;
      default:
        console.log('No Thread Option Selected!!');    
    }
  }
  
  _runLoopCluster() {
    if (cluster.isMaster) {

      console.log(`\n **** LOOP ITERATION WOULD BE =>  ${this._loopCounter} \n` );

      console.log(`\nMaster [${process.pid}] is running \n`);

      const numCPUs = require('os').cpus().length;
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      function messageHandler(msg) {
        console.log('Time Taken by Process [' + msg.workerID + '] is : ' + msg.timeTaken + 'ms');
      }

      for (const id in cluster.workers) {
        cluster.workers[id].on('message', messageHandler);
      }

    } else {

      const startTime = Date.now();

      console.log(`Worker [${process.pid}] started`);
      var y = 0;
      for(let i = 0; i <= this._loopCounter; i++){
          y = i;
      }

      process.send({ timeTaken: (Date.now() - startTime), workerID: process.pid });

      process.disconnect();

    }
  }

  _runLoopProcesses() {
    const { fork } = require('child_process');
    console.log(`\n **** LOOP ITERATION WOULD BE =>  ${counter} \n` );

    const startTime = Date.now();
    let childProcessArray = [];

    for (let i = 0; i < 10; i++)
    {
      childProcessArray[i] = fork(path.dirname(__filename) + '/child_loop.js');
    }

    for (let i = 0; i < 10; i++)
    {
      childProcessArray[i].send({ counter, startTime });
    }
  }
}

module.exports = BenchmarkLoopWithThead;