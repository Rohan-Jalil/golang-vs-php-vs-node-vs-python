var buf = new Buffer(1024);
var stream = require('stream');
var fs = require('fs');
var util = require('util');
const path = require('path');
var CommonValidator = require('../validator/validator');
const { wordsToNumbers } = require('words-to-numbers');

const userInput = process.argv[2];
const OutputFileName = userInput + '-' + 'file-io-buffer-mode.txt';
const outputFilePath = path.dirname(__filename) + '/../output/' + OutputFileName;

let validator = new CommonValidator(userInput);

validator.validate();

const numberOfIterations = wordsToNumbers(userInput);

const timeoutScheduled = Date.now();


fs.open(outputFilePath, 'w', function(err, fd) {
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
         //console.log(buf.slice(0, bytes).toString());
         textToWrite = buf.slice(0, bytes).toString();
      }
      text = textToWrite.toString();

      for(i = 0; i <= numberOfIterations; i++){
         fs.write(fd, text, function(err) {
            if (err) {
               console.log(err);
            }
         });
         text =  '\n' + i;
      }
      // Close the opened file.
      fs.close(fd, function(err) {
         if (err) {
            console.log(err);
         }
       const delay = Date.now() - timeoutScheduled;
       console.log(numberOfIterations + ' Iterations has been written in file ' + OutputFileName + ' in '+ delay + 'ms');
      });
   });
});
