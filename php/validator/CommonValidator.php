<?php

/**
 * Class CommonValidator
 */
class CommonValidator
{
    /**
     * @var
     */
    private $_userInput;

    /**
     * CommonValidator constructor.
     * @param $userInput
     */
    public function __construct($userInput)
    {
        $this->_userInput = $userInput;
//        print_r($userInput);
    }

    /**
     * @return int
     */
    public function validate(){

        $allowedOptions = ['loop', 'loop-with-thread', 'loop-with-pthread', 'file', 'file-with-thread', 'file-with-pthread'];
        $allowedInputs = ['one-thousand', 'one-million', 'five-million', 'ten-million', 'hundred-million', 'one-billion', 'ten-billion'];

        if(!isset($this->_userInput[1]) || !in_array($this->_userInput[1], $allowedOptions)){
            echo "Invalid Argument passed. Allowed values are loop | loop-with-thread | loop-with-pthread | file | file-with-thread | file-with-pthread". PHP_EOL;
            echo "Usage: php benchmark.js loop". PHP_EOL;
            exit(0);
        }

        if (!isset($this->_userInput[2]) || !in_array($this->_userInput[2], $allowedInputs)) {

            if (in_array($this->_userInput[1], ['file', 'file-with-thread', 'file-with-pthread'])) {

                echo "Usage: php sampleFile.js one-million before". PHP_EOL;
                echo "Invalid Argument passed. Allowed values are one-million|ten-million|one-billion|ten-billion before|inside". PHP_EOL;

            } else {
                echo "Invalid Argument passed. Allowed values are one-million | ten-million | one-billion | ten-billion". PHP_EOL;
                echo "Usage: php benchmark.js ".$this->_userInput[1]." one-million". PHP_EOL;
            }

            exit(0);
        }

        if ( in_array($this->_userInput[1], ['file', 'file-with-thread', 'file-with-pthread']) && (!isset($this->_userInput[3]) || ($this->_userInput[3] !== 'before' && $this->_userInput[3] !== 'inside'))) {

            echo "Usage: php sampleFile.js one-million before". PHP_EOL;
            echo "Invalid Argument passed. Allowed values are one-million|ten-million|one-billion|ten-billion before|after". PHP_EOL;
            exit(0);
        }

        return true;
    }

}