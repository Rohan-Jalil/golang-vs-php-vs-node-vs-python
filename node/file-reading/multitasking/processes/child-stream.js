var stream = require('stream');
var fs = require('fs');
var util = require('util');
const path = require('path');

async function loopTest(message) {

  const OutputFileName = message.userInput + '-child-stream-' + process.pid + '-file-io-wstream.txt';
  const outputFilePath = path.dirname(__filename) + '/../../../output/' + OutputFileName;

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

         const delay = Date.now() - message.startTime;

        console.log(message.counter + ' Iterations. file has been written in file ' + OutputFileName + ' '+ delay + 'ms');
        // console.log('\n' + 'Time taken by Child Process ID [' +  process.pid  + '] is : ' + delay + 'ms');

        // process.disconnect();

      });
  });

  for(i = 0; i <= message.counter; i++){
    wstream.write(i+'\n');
  }
  wstream.end();


}

// receive message from master process
process.on('message', async (message) => {

  // console.log('Child message', message);

  const result = await loopTest(message);

  // send response to master process
  // process.send({ counter: result, endTime: Date.now() });

  console.log('\n' + 'Time taken by Child Process ID [' +  process.pid  + '] is : ' + (Date.now() - message.startTime) + 'ms');

  process.disconnect();
});
