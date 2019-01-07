var stream = require('stream');
var fs = require('fs');
var util = require('util');
const path = require('path');
var CommonValidator = require('../validator/validator');
const { wordsToNumbers } = require('words-to-numbers');

const userInput = process.argv[2];
const OutputFileName = userInput + '-' + 'file-io-stream-writeable-mode.txt';
const outputFilePath = path.dirname(__filename) + '/../output/' + OutputFileName;

let validator = new CommonValidator(userInput);

validator.validate();

const numberOfIterations = wordsToNumbers(userInput);

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
       console.log(numberOfIterations + ' Iterations. file has been written in file ' + OutputFileName + ' '+ delay + 'ms');
    });
});

for(i = 0; i <= numberOfIterations; i++){
  wstream.write(i+'\n');
}
wstream.end();
