<?php

/**
 * Class MultiThreadsLoop
 */
class MultiThreadsLoop extends Thread
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
    public $data;

    /**
     * MultiThreadsLoop constructor.
     * @param int $id
     * @param int $count
     */
    public function __construct(int $id, int $count) {
        $this->threadId = $id;
        $this->threadCount = $count;

        $this->data = $id . ":" . date('H:i:s');
    }

    /**
     *
     */
    public function run() {

        echo 'thread ' . $this->threadId . "  started.\n";

        $this->testLoops($this->threadCount);

        echo 'thread ' . $this->threadId . " ended at " . date('H:i:s') . "\n";
    }

    /**
     * @param int $count
     */
    private function testLoops($count = 1000000) {

        for($i = 0; $i < $count; $i++){
            $x = 1;
        }
    }
}