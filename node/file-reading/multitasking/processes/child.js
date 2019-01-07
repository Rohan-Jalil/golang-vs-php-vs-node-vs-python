const fs = require('fs');
const path = require('path');

async function loopTest(message) {

  const OutputFileName = message.userInput + '-child-' + process.pid + '-file-io-wstream.txt';
  const outputFilePath = path.dirname(__filename) + '/../../../output/' + OutputFileName;

  var wstream = fs.createWriteStream(outputFilePath);
  wstream.on('finish', function () {
    console.log('\n' + message.counter + ' Iterations. ' + OutputFileName + ' has been written');
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
