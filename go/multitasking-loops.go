package main

import (
	"fmt"
	"os"
	"sync"
	"time"
)

func main() {

	validateCommandLineArguments(os.Args[1:])

	loopCounter := validateLoopArgument(os.Args[1:][0])
	start 		:= time.Now()
	seconds 	:= start.Unix()

	var wg sync.WaitGroup
	for j := 1; j <= 10; j++ {
		wg.Add(1)
		go iterateRoutine(loopCounter, &wg)
	}
	wg.Wait()

	end 		:= time.Now()
	elapsedTime := end.Unix() - seconds

	fmt.Printf("Time taken for %d iterations is %d seconds\n", loopCounter, elapsedTime)

}

func iterateRoutine(loopCounter int, wg *sync.WaitGroup) {
	var _ int
	for i := 1; i <= loopCounter; i++ {
		_ = i
	}
	defer wg.Done()
}

func validateCommandLineArguments(userInputArray []string) {
	if len(userInputArray) == 0 {
		fmt.Println("Invalid Arguments passed")
		fmt.Println("Example Usage : go run loops.go one-million")
		os.Exit(0)
	}
}

func validateLoopArgument (loopCounterInput string) int{
	validInputs := map[string]int {
		"one-million": 1000000,
		"ten-million": 10000000,
		"one-billion": 1000000000,
		"ten-billion": 10000000000,
	}

	if _, ok := validInputs[loopCounterInput]; !ok {
		fmt.Println("Invalid Arguments passed")
		fmt.Println("Example Usage : go run loops.go one-million")
		os.Exit(0)
	}

	return validInputs[loopCounterInput]
}
