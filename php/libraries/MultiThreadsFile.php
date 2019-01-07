<?php

/**
 * Class MultiThreadsFile
 */
class MultiThreadsFile extends Thread
{
    /**
     * @var int
     */
    private $threadId;
    /**
     * @var int
     */
    private $threadCount;
    /**
     * @var string
     */
    private $threadOpenFile;
    /**
     * @var string
     */
    public $data;

    /**
     * MultiThreadsFile constructor.
     * @param int $id
     * @param int $count
     * @param string $openFile
     */
    public function __construct(int $id, int $count, string $openFile) {
        $this->threadId = $id;
        $this->threadCount = $count;
        $this->threadOpenFile = $openFile;

        $this->data = $id . ":" . date('H:i:s');
    }

    /**
     *
     */
    public function run() {

        echo 'thread ' . $this->threadId . "  started.\n";

        $fileName = "file-io-benchmark-".$this->threadOpenFile."-with-pthread-".$this->threadId.".txt";

        if($this->threadOpenFile == 'before'){

            $this->fileWriteOpenBefore($this->threadCount, $fileName);

        }else if($this->threadOpenFile == 'inside'){

            $this->fileWriteOpenBefore($this->threadCount, $fileName);

        }

        echo 'thread ' . $this->threadId . " ended at " . date('H:i:s') . "\n";
    }

    /**
     * @param int $count
     * @param string $fileName
     */
    private function fileWriteOpenBefore($count = 1000, $fileName='file-io-benchmark-before-with-pthread.txt') {

        $filePath = __DIR__ . '/../output/' . $fileName;
        if (!is_file($filePath)) {
            $fh = fopen($filePath, 'w') or die("Unable to open file!");

            fclose($fh);
            chmod($filePath, 0777);
        }

        $file=fopen($filePath,'w');
        for($j = 0; $j <= $count; $j++){

            $text = $j."\n";
            fwrite($file, $text);

        }
        fclose($file);
    }

    /**
     * @param int $count
     * @param string $fileName
     */
    private function fileWriteOpenInside($count = 1000, $fileName='file-io-benchmark-inside-with-pthread.txt') {

        $filePath = __DIR__ . '/../../output/' . $fileName;
        if (!is_file($filePath)) {
            $fh = fopen($filePath, 'w') or die("Unable to open file!");

            fclose($fh);
            chmod($filePath, 0777);
        }

        for($i = 0; $i <= $count; $i++){

            $file=fopen($filePath,'a');
            $text =  "\n" . $i;
            fwrite($file, $text);
            fclose($file);

        }

    }
}