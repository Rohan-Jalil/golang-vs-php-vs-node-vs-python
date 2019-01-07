<?php

spl_autoload_register(function($className) {
    include_once 'libraries/'.$className . '.php';
});

require_once __DIR__.'/validator/CommonValidator.php';

$params = $argv;

if (isset($_GET['caller'])) {

    $params[1] = $_GET['caller'];
    $params[2] = $_GET['loop_count'];
    $params[3] = isset($_GET['open_file']) ? $_GET['open_file'] : '';
    $params[4] = isset($_GET['filename']) ? $_GET['filename'] : '';

//    var_dump($params);
}

$validator = (new \CommonValidator($params))->validate();

if (in_array($params[1], ['loop', 'loop-with-thread', 'loop-with-pthread'])) {

    $benchmark = new BenchmarkLoop($params);

} elseif (in_array($params[1], ['file', 'file-with-thread', 'file-with-pthread'])) {

    $benchmark = new BenchmarkFile($params);

}

echo $benchmark->getResult(true);
echo PHP_EOL;
