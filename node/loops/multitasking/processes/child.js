async function loopTest(counter) {

  var counter = counter || -1

  for(let i = 0; i <= counter; i++){
      y = i;
    }

  return counter;

}

// receive message from master process
process.on('message', async (message) => {

  // console.log('Child message', message);

  const result = await loopTest(message.counter);

  // send response to master process
  // process.send({ counter: result, endTime: Date.now() });

  console.log('Time taken by Child Process ID [' +  process.pid  + '] is : ' + (Date.now() - message.startTime) + 'ms');

  process.disconnect();
});
