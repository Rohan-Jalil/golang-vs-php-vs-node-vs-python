
class CommonValidator {

  constructor(userInput) {
    this._userInput = userInput;
  }

  validate() {

    const validInputFirstParam  = ['loop', 'loop-with-thread', 'file', 'file-with-thread'];
    const validInputSecondParam = ['one-thousand', 'one-million', 'five-million', 'ten-million', 'hundred-million', 'one-billion', 'ten-billion'];
    const validInputThirdParam  = ['wstream', 'stream-writable', 'before', 'inside'];
    const validThreadTypes = ['cluster', 'processes'];
    
    if (this._userInput[2] == undefined || ! (validInputFirstParam.includes(this._userInput[2]))) {
      console.log('\n Invalid Argument passed. Allowed values are loop | loop-with-thread | file | file-with-thread');
      console.log('\n Usage: node benchmark.js loop \n');
      process.exit(1);
    }

    if (this._userInput[3] == undefined || ! (validInputSecondParam.includes(this._userInput[3]))) {
      console.log('\n Invalid Argument passed. Allowed values are one-million | ten-million | one-billion | ten-billion');
      console.log('\n Usage: node benchmark.js loop one-million \n');
      process.exit(1);
    }

    if (this._userInput[2] == 'loop-with-thread') {
      if (this._userInput[4] == undefined  || ! (validThreadTypes.includes(this._userInput[4]))) {
        console.log('\n Invalid Argument passed. Allowed values are cluster | processes');
        console.log('\n Usage: node benchmark.js file-with-thread one-million cluster \n');
        process.exit(1);  
      }
    } 

    if (this._userInput[2] == 'file' && (this._userInput[4] == undefined  || ! (validInputThirdParam.includes(this._userInput[4]))) ) {
      console.log('\n Invalid Argument passed. Allowed values are wstream | before | inside');
      console.log('\n Usage: node benchmark.js file one-million wstream \n');
      process.exit(1);
    }

    if (this._userInput[2] == 'file-with-thread') {
      if (this._userInput[4] == undefined  || ! (validThreadTypes.includes(this._userInput[4]))) {
        console.log('\n Invalid Argument passed. Allowed values are cluster | processes');
        console.log('\n Usage: node benchmark.js file-with-thread one-million cluster \n');
        process.exit(1);  
      } else if (this._userInput[5] == undefined  || ! (validInputThirdParam.includes(this._userInput[5]))) {
        console.log('\n Invalid Argument passed. Allowed values are wstream | before | inside');
        console.log('\n Usage: node benchmark.js file-with-thread one-million '+this._userInput[4]+' wstream \n');
        process.exit(1);
      }
      
    }

  }

}

module.exports = CommonValidator;
