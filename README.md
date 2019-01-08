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

# Results

### LOOPS


| Language | Iterations | Time (Seconds) |
| :---         |     :---:      |   :---:       |
| GO   | 1 MILLION     | 0    |
| NODE   | 1 MILLION     | 0.002    |
| PHP   | 1 MILLION     | 0.01388    |
| PYTHON   | 1 MILLION     | 0.07    |
| GO   | 10 MILLION     | 0    |
| NODE   | 10 MILLION     | 0.012    |
| PHP   | 10 MILLION     | 0.111    |
| PYTHON   | 10 MILLION     | 0.4    |
| GO   | 1 BILLION     | 1    |
| NODE   | 1 BILLION     | 2.796    |
| PHP   | 1 BILLION     | 11.817    |
| PYTHON   | 1 BILLION     | 29.58    |
| GO   | 10 BILLION     | 5    |
| NODE   | 10 BILLION     | 126.492    |
| PHP   | 10 BILLION     | 389.033    |
| PYTHON   | 10 BILLION     | 678.78    |

### LOOPS With Parallelism

| Language | Mode |Iterations | Time (Seconds) |
| :---         |  :---:    | :---:      |   :---:       |
| GO   |  | 10 MILLION     | 0    |
| NODE   | Cluster | 8 MILLION     | 0.033    |
| PHP   | Pthread |  10 MILLION     | 0.1842    |
| PYTHON   | |  10 MILLION     | 0.42    |
| NODE   | Child Process |  10 MILLION     | 0.562    |
| GO   | |  100 MILLION     | 0.0001    |
| NODE   | Cluster | 80 MILLION     | 0.096    |
| NODE   | Child Process | 100 MILLION     | 0.618    |
| PHP   | Pthread | 100 MILLION     | 1.4401    |
| PYTHON |  | 100 MILLION| 3.7
| GO   |  | 100 MILLION     | 0.0001    |
| NODE   | Cluster | 8 MILLION     | 0.033    |
| PHP   | Pthread |  10 MILLION     | 0.1842    |
| PYTHON   | |  10 MILLION     | 0.42    |
| NODE   | Child Process |  10 MILLION     | 0.562    |
| GO   | |  10 BILLION     | 1    |
| NODE   | Cluster | 8 BILLION     | 6.289    |
| NODE   | Child Process | 10 BILLION     | 7.645    |
| PHP   | Guzzle/Promisses | 10 BILLION     | 14.748    |
| PHP   | Pthread | 10 BILLION     | 130.5233    |
| PYTHON |  | 10 BILLION| 363.67

### FILE IO

| Language | Mode |Iterations | Time (Seconds) |
| :---         |  :---:    | :---:      |   :---:       |
| GO   |  | 1 MILLION     | 1    |
| NODE   | wstream |  1 MILLION     | 1.065    |
| PHP   | Open file before loop	 |  1 MILLION     | 1.456    |
| PHP   | Open file inside loop	 |  1 MILLION     | 5.478    |
| Python   | appendFile |  1 MILLION     | 24.111691475    |
| NODE   | wstream |  10 MILLION     | 13.547    |
| PHP   | Open file before loop	 |  10 MILLION     | 14.73325    |
| GO   |  | 10 MILLION     | 17    |
| PHP   | Open file inside loop	 |  10 MILLION     | 58.510    |
| Python   | appendFile |  10 MILLION     | 248.61    |
| NODE   | wstream |  1 BILLION     | 978.467    |
| PHP   | Open file before loop	 |  1 BILLION     | 1681.159    |
| GO   |  | 1 BILLION     | 1683    |
| PHP   | Open file inside loop	 |  1 BILLION     | 7062.495    |

### FILE IO With Threads


| Language | Mode |Iterations | Time (Seconds) |
| :---         |  :---:    | :---:      |   :---:       |
| NODE   | Cluster | 8 MILLION     | 2.217    |
| PYTHON   | appendFile | 10 MILLION     | 3.33   |
| NODE   | Child Process |  10 MILLION     | 5.926    |
| GO   | |  10 MILLION     | 8    |
| PHP   | Pthread |  10 MILLION     | 9.3328    |
| NODE   | Cluster | 80 MILLION     | 28.855    |
| NODE   | Child Process | 100 MILLION     | 38.679   |
| PYTHON   | appendFile |  100 MILLION     | 35.072738171    |
| GO   | |  100 MILLION     | 80    |
| PHP   | Pthread |  100 MILLION     | 90.1512    |

