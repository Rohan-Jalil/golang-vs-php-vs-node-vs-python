var stream = require('stream');
var util = require('util');
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

  const OutputFileName = userInput + '-worker-' + process.pid + '-file-io-stream-writeable-mode-cluster.txt';
  const outputFilePath = path.dirname(__filename) + '/../../../output/' + OutputFileName;

  // use Node.js Writable, otherwise load polyfill
  var Writable = stream.Writable ||
    require('readable-stream').Writable;
  const timeoutScheduled = Date.now();
  var memStore = { };

  /* Writable memory stream */
  function WMStrm(key, options) {
    // allow use without new operator
    if (!(this instanceof WMStrm)) {
      return new WMStrm(key, options);
    }
    Writable.call(this, options); // init super
    this.key = key; // save key
    memStore[key] = new Buffer(''); // empty
  }
  util.inherits(WMStrm, Writable);

  WMStrm.prototype._write = function (chunk, enc, cb) {
    // our memory store stores things in buffers
    var buffer = (Buffer.isBuffer(chunk)) ?
      chunk :  // already is Buffer use it
      new Buffer(chunk, enc);  // string, convert

    // concat to the buffer already there
    memStore[this.key] = Buffer.concat([memStore[this.key], buffer]);
    cb();
  };

  // Trying our stream out
  var wstream = new WMStrm('foo');
  wstream.on('finish', function () {
    //console.log(numberOfIterations + ' Iterations. finished writing');
    //console.log('value is:', memStore.foo.toString());
     fs.writeFile(outputFilePath, memStore.foo.toString() , function(err) {
         if (err) {
            return console.error(err);
         }
         const delay = Date.now() - timeoutScheduled;
           process.send({ timeTaken: (Date.now() - startTime), workerID: process.pid, fileName: OutputFileName });
           process.disconnect();
        //  console.log(numberOfIterations + ' Iterations. file has been written in file ' + OutputFileName + ' '+ delay + 'ms');
      });
  });

  for(i = 0; i <= numberOfIterations; i++){
    wstream.write(i+'\n');
  }
  wstream.end();


  // var wstream = fs.createWriteStream(outputFilePath);
  // wstream.on('finish', function () {
  //   process.send({ timeTaken: (Date.now() - startTime), workerID: process.pid, fileName: OutputFileName });
  //   process.disconnect();
  // });
  //
  // for(i = 0; i <= numberOfIterations; i++){
  // 	wstream.write(i+'\n');
  // }
  //
  // wstream.end();

}
