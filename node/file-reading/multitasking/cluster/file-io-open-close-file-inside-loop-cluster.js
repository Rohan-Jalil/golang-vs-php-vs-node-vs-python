const cluster = require('cluster');
const fs = require('fs');
const path = require('path');
var CommonValidator = require('../../../validator/validator');
const { wordsToNumbers } = require('words-to-numbers');

const userInput = process.argv[2];

let validator = new CommonValidator(userInput);

validator.validate();

const numberOfIterations = wordsToNumbers(userInput);

if (cluster.isMaster) {

  console.log(`\n **** LOOP ITERATION WOULD BE =>  ${numberOfIterations} \n` );

  console.log(`\nMaster [${process.pid}] is running \n`);

  const numCPUs = require('os').cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  function messageHandler(msg) {
    console.log('\n\nTime Taken by Process [' + msg.workerID + '] is : ' + msg.timeTaken);
    console.log(numberOfIterations + ' Iterations. ' + msg.fileName + ' has been written in '+ msg.timeTaken + 'ms');
  }

  for (const id in cluster.workers) {
    cluster.workers[id].on('message', messageHandler);
  }

} else {

  const startTime = Date.now();

  console.log(`Worker [${process.pid}] started`);

  const OutputFileName = userInput + '-worker-' + process.pid + '-file-io-open-close-file-inside-loop-cluster.txt';
  const outputFilePath = path.dirname(__filename) + '/../../../output/' + OutputFileName;

  for (i = 0; i < numberOfIterations; i++) {

  	fs.appendFile(outputFilePath, '\n'+i, (err) => {
          if (err) return console.error(err);
          process.send({ timeTaken: (Date.now() - startTime), workerID: process.pid, fileName: OutputFileName });
          process.disconnect();
      });
  }

}
