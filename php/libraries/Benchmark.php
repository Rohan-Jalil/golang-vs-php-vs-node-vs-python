<?php
//namespace Libraries;

include_once __DIR__."/../validator/CommonValidator.php";

/**
 * Class Benchmark
 */
abstract class Benchmark
{
    /**
     * @var int
     */
    private $_loopCounter;
    /**
     * @var
     */
    private $_userInputArray;

    const ONE_THOUSAND =  1000;
    const ONE_MILLION =  1000000;
    const TWO_POINT_FIVE_MILLION = 2500000;
    const FIVE_MILLION = 5000000;
    const TEN_MILLION =  10000000;
    const ONE_BILLION =  1000000000;
    const FIVE_BILLION = 5000000000;
    const TEN_BILLION =  10000000000;

    /**
     * Benchmark constructor.
     * @param $userInputArray
     */
    public function __construct($userInputArray)
    {
        $this->_loopCounter = $this->_convertUserInputToInterger($userInputArray[2]);

        $this->_userInputArray = $userInputArray;
    }

    /**
     * @return mixed
     */
    public function getUserInput(){
        return $this->_userInputArray;
    }

    /**
     * @return int
     */
    public function getLoopCount(){
        return $this->_loopCounter;
    }

    /**
     * @param $userInput
     * @return int
     */
    private function _convertUserInputToInterger($userInput){

        switch ($userInput) {

            case 'one-thousand':
                $loopCount = self::ONE_THOUSAND;
                break;
            case 'one-million':
                $loopCount = self::ONE_MILLION;
                break;
            case 'ten-million':
                $loopCount = self::TEN_MILLION;
                break;
            case 'one-billion':
                $loopCount = self::ONE_BILLION;
                break;
            case 'five-billion':
                $loopCount = self::FIVE_BILLION;
                break;
            case 'ten-billion':
                $loopCount = self::TEN_BILLION;
            default:

                break;
        }

        return $loopCount;
    }

    abstract protected function getResult($returnTime = false);

}
