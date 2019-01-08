# Benchmark
This project will benchmark loops and File I/O operations time in PHP, Node and Python. How fast a language is as compared to other.

## PHP Benchmark
### Getting Started
To run the PHP code, you have to install webserver (like apache), because code uses PHP GUZZLE library for API calls.
PHP with pthread extension should be installed on the machine. 

### Prerequisites
    -Webserver
    -PHP 7.2
    -pthread extension

### Installing

    To run the code, copy it to webserve root directory (i.e www) and run composer to install its dependencies.
    Test the code with Command Line Interface (CLI).
    
### Code Structure

    There is only one file benchmark.php to handle all use cases of loops and file i/o. 
    There is output folder for file i/o result files.

### Configurations
    Rename config-example.php to config.php and update the value of constants in this file.
    
### Running the tests

```
Command to run the script
```    
    php file_path parameters

    php benchmark.php loop one-million
    
## Node.js Benchmark
### Getting Started
To run this repository you have to install npm and node on our machine. 

### Prerequisites
    
    -npm version: 6.4.1 
    -node version: v11.5.0

### Installing
    To run the code, copy it to the machine and run "npm install" to install its dependencies.
    Test the code with Command Line Interface (CLI).
    
### Code Structure
    There is one file-reading folder it holds all files related to file i/o use cases.
    There is one loops folder, it holds all loop use case files
    There is output folder for file i/o result files.
        
### Running the tests

```
Command to run the script
```    
    node file_path parameters    
    node loops/benchmark_loop.php one-million
    
## Python Benchmark
### Getting Started
To Install python version 3 or greater on machine

### Prerequisites
    
    -Python version: 3
    
### Code Structure
    There is one file-reading folder it holds all files related to file i/o use cases.
    There is one loops folder, it holds all loop use case files
    There is output of file i/o result files will be created in the same directory from where you ran code.
        
### Running the tests

```
Command to run the script
```    
    python3 file_path (After running code will show some option choose one of those option)
    python3 loops/benchmark_loop.py

## Go Benchmark
### Getting Started
Just install Go language on the machine

### Prerequisites
    
    -go version go1.11.4 linux/amd64
    
### Code Structure
    There is one loops.go file for loop use case
    There is one file-io.go file for file i/o use case
    There is output folder for file i/o result files.
        
### Running the tests

```
Command to run the script
```    
    go run file_path parameters
    go run loops.go one-million    
