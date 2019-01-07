const { wordsToNumbers } = require('words-to-numbers');
const fs   = require('fs');
const path = require('path');
var WMStrm = require('./wmstrm');

class BenchmarkFile {
  constructor(userInput) {
    this._userInput      = userInput;
    this._loopCounter    = wordsToNumbers(userInput[3]);
    this._outputFileName = 'benchmark-' + userInput[2] + '-' + userInput[3] + '-' + userInput[4] + '.txt';
    this._outputFilePath = path.dirname(__filename) + '/../output/' + this._outputFileName;
  }

  getRestult() {

    switch(this._userInput[4]) {
      case "stream-writable":
        this._simpleFileStreamWritable();
        break;
      case "wstream":
        this._simpleFileWstream();  
        break;
      case "before":
        this._simpleFileBuffer();
        break;
      case "inside":
        this._simpleFileOpenInside();
        break;
      default:
        console.log('No Argv Passed!!');
    }
  }
  
  _simpleFileWstream() {
    const startTime = Date.now();
    const outputMessage = 'Time: ' + this._loopCounter + ' Iterations has been written in file ' + this._outputFileName + ' in ';

    var wstream = fs.createWriteStream(this._outputFilePath);
    wstream.on('finish', function () {
      const delay = (Date.now() - startTime) / 1000;
      console.log(outputMessage + delay + 's');
    });

    let i = this._loopCounter;
    
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

  }

  _simpleFileStreamWritable() {
    const startTime = Date.now();
    const outputMessage = 'Time: ' + this._loopCounter + ' Iterations has been written in file ' + this._outputFileName + ' in ';

    var wstream = new WMStrm('foo');
    var filePath = this._outputFilePath;
    wstream.on('finish', function () {
        // console.log('path:'+this._outputFilePath);
        var memStoreObj = wstream.getMemStore();

        fs.writeFile(filePath, memStoreObj.toString() , function(err) {
            if (err) {
              return console.error(err);
            }
            const delay = Date.now() - startTime;
            console.log( outputMessage + ( delay / 1000 ) + 's');
        });
    });
    
    var i;
    for(i = 0; i <= this._loopCounter; i++){
      wstream.write(i+'\n');
    }
    wstream.end();
    
  }

  _simpleFileBuffer() {
    const startTime = Date.now();
    const outputMessage = 'Time: ' + this._loopCounter + ' Iterations has been written in file ' + this._outputFileName + ' in ';
    const loopCounter = this._loopCounter;
    var buf = new Buffer(1024);
    fs.open(this._outputFilePath, 'w', function(err, fd) {
      if (err) {
        return console.error(err);
      }

      fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
        if (err) {
           console.log(err);
        }

        // Print only read bytes to avoid junk.
        var textToWrite = '';
        if(bytes > 0) {

           textToWrite = buf.slice(0, bytes).toString();
        }
        var text = textToWrite.toString();

        for(let i = 0; i <= loopCounter; i++){
           fs.write(fd, text, function(err) {
              if (err) {
                 console.log(err);
              }
           });
           text =  '\n' + i;
        }
        
        fs.close(fd, function(err) {
          if (err) {
            console.log(err);
          }
         // console.log(numberOfIterations + ' Iterations has been written in file ' + OutputFileName + ' in '+ delay + 'ms');
         // const delay = Date.now() - timeoutScheduled;
          const delay = Date.now() - startTime;
          console.log( outputMessage + ( delay / 1000 ) + 's');
        });
      });
    });

    
  }

  _simpleFileOpenInside() {
    const startTime = Date.now();
    const outputMessage = 'Time: ' + this._loopCounter + ' Iterations has been written in file ' + this._outputFileName + ' in ';
    
    for (let i = 0; i < this._loopCounter; i++) {

      fs.appendFile(this._outputFilePath, '\n'+i, (err) => {
            if (err) return console.error(err);
        });
    }

    const delay = Date.now() - startTime;
    console.log( outputMessage + ( delay / 1000 ) + 's');
    
  }
}

module.exports = BenchmarkFile;