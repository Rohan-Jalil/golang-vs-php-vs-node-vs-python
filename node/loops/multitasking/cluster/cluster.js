const cluster = require('cluster');
var CommonValidator = require('../../../validator/validator');
const { wordsToNumbers } = require('words-to-numbers');

const userInput = process.argv[2];

let validator = new CommonValidator(userInput);

validator.validate();

const loopCounter = wordsToNumbers(userInput);

if (cluster.isMaster) {

  console.log(`\n **** LOOP ITERATION WOULD BE =>  ${loopCounter} \n` );

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

  for(let i = 0; i <= loopCounter; i++){
      y = i;
  }

  process.send({ timeTaken: (Date.now() - startTime), workerID: process.pid });

  process.disconnect();

}
