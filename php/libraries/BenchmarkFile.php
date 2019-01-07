<?php

$dir = __DIR__;
require_once $dir . '/../config.php';
require_once $dir . '/../vendor/autoload.php';
require_once $dir . '/MultiThreadsFile.php';

use GuzzleHttp\Client;

/**
 * Class BenchmarkFile
 */
class BenchmarkFile extends Benchmark
{
    /**
     * @var int
     */
    private $_counter;

    /**
     * BenchmarkFile constructor.
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
        $userInputs    = $this->getUserInput();
        $executionTime = 0;
        $fileName      = isset($userInputs[4]) ? $userInputs[4] : 'benchmark-'.$userInputs[1].'-'.$userInputs[2].'-'.$userInputs[3];

        if ($userInputs[1] == 'file') {

            if ($userInputs[3] == 'before') {

                $executionTime = $this->_fileWriteOpenBefore($this->_counter, $fileName);

            } elseif ($userInputs[3] == 'inside') {

                $executionTime = $this->_fileWriteOpenInside($this->_counter, $fileName);

            }

        } elseif ($userInputs[1] == 'file-with-thread') {

            $executionTime = $this->_fileWithThread($userInputs[2], $userInputs[3], $fileName);
        } elseif ($userInputs[1] == 'file-with-pthread') {

            $executionTime = $this->_fileWithPthread($this->_counter, $userInputs[3]);
        }

        if ($returnTime) {
            return "Execution Time $userInputs[1] and $userInputs[2] counter:" . $executionTime . 'sec' . PHP_EOL;
        }

        return null;

    }

    /**
     * @param int $count
     * @param string $fileName
     * @return string
     */
    private function _fileWriteOpenBefore($count = 1000, $fileName = 'file-io-benchmark')
    {
        $time_start = microtime(true);
        $filePath = __DIR__.'/../output/'. $fileName.'.txt';
        $this->_createFile($filePath);

        $file=fopen($filePath,'w');
        for($i = 0; $i <= $count; $i++){

            $text = $i."\n";
            fwrite($file, $text);

        }
        fclose($file);

        return number_format(microtime(true) - $time_start, 3);
    }

    /**
     * @param int $count
     * @param string $fileName
     * @return string
     */
    private function _fileWriteOpenInside($count = 1000, $fileName = 'file-io-benchmark.txt') {
        $time_start = microtime(true);
        $filePath = __DIR__.'/../output/'. $fileName.'.txt';
        $this->_createFile($filePath);

        for($i = 0; $i <= $count; $i++){

            $file=fopen($filePath,'a');
            $text =  "\n" . $i;
            fwrite($file, $text);
            fclose($file);

        }
        return number_format(microtime(true) - $time_start, 3);
    }

    /**
     * @param $filePath
     */
    private function _createFile($filePath)
    {
        if (!is_file($filePath)) {
            $fh = fopen($filePath, 'w') or die("Unable to open file!");

            fclose($fh);
            chmod($filePath, 0777);
        }
    }

    /**
     * @param string $count
     * @param $openFile
     * @param $fileName
     * @return string
     */
    private function _fileWithThread($count = 'one-thousand', $openFile, $fileName) {

        $startTime = microtime(true);
        $client 	= new Client(['stream' => true]);
        $url 		= URL.'benchmark.php?caller=file&loop_count='.$count.'&open_file='.$openFile.'&filename=';
        $options 	= [];
        $promise 	= [];

        for ($i = 1; $i<=10; $i++)
        {
            $file = $fileName."-$i";
            $promise[] = $client->postAsync($url.$file, $options);

        }

        $results = \GuzzleHttp\Promise\unwrap( $promise );
        $response = [];

        foreach ($results as $result) {
            $response[]   = (string)$result->getBody();
        }

        var_dump($response);

        return number_format(microtime(true) - $startTime, 3);
    }

    /**
     * @param int $count
     * @param $openFile
     * @return string
     */
    private function _fileWithPthread($count = 1000, $openFile) {

        $startTime = microtime(true);
        $threads   = [];

        $i = 0;
        do {
            $i++;
            $threads[$i] = new MultiThreadsFile($i, $count, $openFile);

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