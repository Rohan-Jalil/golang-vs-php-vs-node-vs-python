const { wordsToNumbers } = require('words-to-numbers');
const cluster = require('cluster');
var stream = require('stream');
var util = require('util');
const fs   = require('fs');
const path = require('path');
var WMStrm = require('./wmstrm');

class BenchmarkFile {
  constructor(userInput) {
    this._userInput      = userInput;
    this._loopCounter    = wordsToNumbers(userInput[3]);
    this._outputFileName = 'benchmark-' + userInput[2] + '-' + userInput[3] + '-' + userInput[4] + '-' + userInput[5] ;
    this._outputFilePath = path.dirname(__filename) + '/../output/';
  }

  getRestult() {

    switch (this._userInput[4]) {
      case "cluster":
        this.runCluster();
        break;
      case "processes":
        this.runProcesses();
        break;
      default:
        console.log('No Thread Option Selected!!');    
    }

    
  }

  runCluster(){
    switch (this._userInput[5]) {
      case "stream-writable":
        this._clusterFileStreamWritable();
        break;
      case "wstream":
        this._clusterFileWstream();  
        break;
      case "inside":
        this._clusterFileOpenInside();
        break;
      default:
        console.log('No Argv Passed!!');
    }
  }

  runProcesses(){
    switch(this._userInput[5]) {
      case "stream-writable":
        this._processFileStreamWritable(this._userInput[3]);
        break;
      case "wstream":
        this._processFileWstream(this._userInput[3]);  
        break;
      case "inside":
        console.log('This Use Case is not implemented');
        break;
      default:
        console.log('No Argv Passed!!');
    }
  }
  
  _clusterFileWstream() {
    
    const numberOfIterations = this._loopCounter;

    if (cluster.isMaster) {

      console.log(`\n **** LOOP ITERATION WOULD BE =>  ${numberOfIterations} \n` );

      console.log(`\nMaster [${process.pid}] is running \n`);

      const numCPUs = require('os').cpus().length;
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      function messageHandler(msg) {
        console.log('\n\nTime Taken by Process [' + msg.workerID + '] is : ' + msg.timeTaken);
        console.log(numberOfIterations + ' Iterations. ' + msg.fileName + ' has been written in '+ msg.timeTaken + 's');
      }

      for (const id in cluster.workers) {
        cluster.workers[id].on('message', messageHandler);
      }

    } else {

      const startTime = Date.now();

      console.log(`Worker [${process.pid}] started`);

      const OutputFileName = this._outputFileName + '-' + process.pid + '.txt';
      const outputFilePath = this._outputFilePath + OutputFileName;

      var wstream = fs.createWriteStream(outputFilePath);
      wstream.on('finish', function () {
        const processTime = (Date.now() - startTime) / 1000 ;
        process.send({ timeTaken: processTime, workerID: process.pid, fileName: OutputFileName });
        process.disconnect();
      });

      let i = numberOfIterations;

      write();

      function write() {
        let ok = true;
        do {
          i--;
          if (i === 0) {
            // last time!
            wstream.write(i+'\n');
            wstream.end();

          } else {
            ok = wstream.write(i+'\n');
          }
        } while (i > 0 && ok);
        if (i > 0) {
          wstream.once('drain', write);
        }
      }


      // for(let i = 0; i <= numberOfIterations; i++){
      //   wstream.write(i+'\n');
      // }

      // wstream.end();

    }

  }

  _clusterFileStreamWritable() {
    
    const numberOfIterations = this._loopCounter;

    if (cluster.isMaster) {

      console.log(`\n **** LOOP ITERATION WOULD BE =>  ${numberOfIterations} \n` );

      console.log(`\nMaster [${process.pid}] is running \n`);

      const numCPUs = require('os').cpus().length;
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      function messageHandler(msg) {
        console.log('\n\nTime Taken by Process [' + msg.workerID + '] is : ' + msg.timeTaken);
        console.log(numberOfIterations + ' Iterations. ' + msg.fileName + ' has been written in '+ msg.timeTaken + 's');
      }

      for (const id in cluster.workers) {
        cluster.workers[id].on('message', messageHandler);
      }

    } else {

      const startTime = Date.now();

      console.log(`Worker [${process.pid}] started`);

      const OutputFileName = this._outputFileName + '-' + process.pid + '.txt';
      const outputFilePath = this._outputFilePath + OutputFileName;

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
        var buffer = (Buffer.isBuffer(chunk)) ?
          chunk :  // already is Buffer use it
          new Buffer(chunk, enc);  // string, convert

        memStore[this.key] = Buffer.concat([memStore[this.key], buffer]);
        cb();
      };

      var wstream = new WMStrm('foo');
      wstream.on('finish', function () {
        
        fs.writeFile(outputFilePath, memStore.foo.toString() , function(err) {
          if (err) {
              return console.error(err);
          }
          
          const processTime = (Date.now() - timeoutScheduled)/1000;
          process.send({ timeTaken: processTime, workerID: process.pid, fileName: OutputFileName });
          process.disconnect();
          
        });
      });

      for(let i = 0; i <= numberOfIterations; i++){
        wstream.write(i+'\n');
      }
      wstream.end();
    }
    
  }

  _clusterFileOpenInside() {

    const numberOfIterations = this._loopCounter;

    if (cluster.isMaster) {

      console.log(`\n **** LOOP ITERATION WOULD BE =>  ${numberOfIterations} \n` );
      console.log(`\nMaster [${process.pid}] is running \n`);

      const numCPUs = require('os').cpus().length;
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      function messageHandler(msg) {
        console.log('\n\nTime Taken by Process [' + msg.workerID + '] is : ' + msg.timeTaken);
        console.log(numberOfIterations + ' Iterations. ' + msg.fileName + ' has been written in '+ msg.timeTaken + 's');
      }

      for (const id in cluster.workers) {
        cluster.workers[id].on('message', messageHandler);
      }

    } else {

      const startTime = Date.now();

      console.log(`Worker [${process.pid}] started`);

      const OutputFileName = this._outputFileName + '-' + process.pid + '.txt';
      const outputFilePath = this._outputFilePath + OutputFileName;

      for (let i = 0; i < numberOfIterations; i++) {

        fs.appendFile(outputFilePath, '\n'+i, (err) => {
              if (err) return console.error(err);
              const processTime = (Date.now() - startTime)/1000;
              process.send({ timeTaken: processTime, workerID: process.pid, fileName: OutputFileName });
              process.disconnect();
          });
      }

    }
  }

  _processFileWstream(userInput) {
    const { fork } = require('child_process');
    const counter = this._loopCounter;
    console.log(`\n **** LOOP ITERATION WOULD BE =>  ${counter} \n` );

    const startTime = Date.now();
    let childProcessArray = [];

    for (let i = 0; i < 10; i++)
    {
      childProcessArray[i] = fork(path.dirname(__filename) + '/child_wstream.js');
    }

    for (let i = 0; i < 10; i++)
    {
      childProcessArray[i].send({ counter, startTime, userInput });
    }
  }

  _processFileStreamWritable(userInput) {
    const { fork } = require('child_process');
    const counter = this._loopCounter;
    console.log(`\n **** LOOP ITERATION WOULD BE =>  ${counter} \n` );

    const startTime = Date.now();
    let childProcessArray = [];

    for (let i = 0; i < 10; i++)
    {
      childProcessArray[i] = fork(path.dirname(__filename) + '/child_stream_writable.js');
    }

    for (let i = 0; i < 10; i++)
    {
      childProcessArray[i].send({ counter, startTime, userInput });
    }
  }
}

module.exports = BenchmarkFile;