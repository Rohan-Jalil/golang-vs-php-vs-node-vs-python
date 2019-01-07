<?php

$dir = __DIR__;
require_once $dir . '/../config.php';
require_once $dir . '/../vendor/autoload.php';
require_once $dir . '/MultiThreadsLoop.php';

use GuzzleHttp\Client;

/**
 * Class BenchmarkLoop
 */
class BenchmarkLoop extends Benchmark
{
    /**
     * @var int
     */
    private $_counter;

    /**
     * BenchmarkLoop constructor.
     * @param $userInputArray
     */
    public function __construct($userInputArray)
    {
        parent::__construct($userInputArray);
        $this->_counter = $this->getLoopCount();

    }

    /**
     * @param bool $returnTime
     * @return null|string
     */
    public function getResult($returnTime = false)
    {
        $userInputs = $this->getUserInput();

        switch ($userInputs[1]) {

            case 'loop':
                $executionTime = $this->testLoop($this->_counter, $returnTime);
                break;
            case 'loop-with-thread':
                $executionTime = $this->loopWithThread($userInputs[2]);
                break;
            case 'loop-with-pthread':
                $executionTime = $this->loopWithPthread($this->_counter);
                break;
            default:
                $executionTime = 0;
                break;
        }

        if ($returnTime) {
            return "Execution Time $userInputs[1] and $userInputs[2] counter:" . $executionTime . 'sec' . PHP_EOL;
        }

        return null;

    }

    /**
     * @param int $count
     * @param $returnTime
     * @return bool|null|string
     */
    public function testLoop($count = 1000000, $returnTime)
    {
        if ($returnTime) {

            $startTime = microtime(true);

            for ($i = 0; $i < $count; $i++) {
                $x = 1;
            }

            return number_format(microtime(true) - $startTime, 3);

        } else {

            for ($i = 0; $i < $count; $i++) {
                $x = 1;
            }

            return null;
        }

        return false;
    }

    /**
     * @param string $count
     * @return string
     */
    public function loopWithThread($count = 'one-thousand') {

        $startTime = microtime(true);
        $client 	= new Client();
//        $client 	= new Client(['http_errors' => false]);
        $url 		= URL.'benchmark.php?caller=loop&loop_count='.$count;
        $options 	= ['proxy' => '192.12.11.20'];
        $promise 	= [];

        for ($i = 1; $i<=10; $i++) {

            $promise[] = $client->postAsync($url, $options);

        }

        $results = \GuzzleHttp\Promise\unwrap( $promise );
        $response = [];

        foreach ($results as $result) {
            $response[]   = (string)$result->getBody();
        }

        return number_format(microtime(true) - $startTime, 3);
    }

    /**
     * @param int $count
     * @return string
     */
    public function loopWithPthread($count = 1000) {

        $startTime = microtime(true);
        $threads   = [];

        $i = 0;
        do {
            $i++;
            $threads[$i] = new MultiThreadsLoop($i, $count);

            $threads[$i]->start();

            echo $threads[$i]->data . "\n";
        } while($i < 10);

        echo "now attempting to join...\n";

        $i = 0;
        do {
            $i++;

            $threads[$i]->join();
        } while($i < 10);

        return number_format(microtime(true) - $startTime, 3);
    }
}