package main

import (
	"fmt"
	"os"
	"time"
)

func main() {

	validateCommandLineArguments(os.Args[1:])
	loopCounter := validateLoopArgument(os.Args[1:][0])
	start 		:= time.Now()
	seconds 	:= start.Unix()

	iterate(loopCounter)

	end 		:= time.Now()
	elapsedTime := end.Unix() - seconds

	fmt.Printf("Time taken for %d iterations is %d seconds\n", loopCounter, elapsedTime)

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

func iterate(loopCounter int) {
	var _ int
	for i := 1; i <= loopCounter; i++ {
		_ = i
	}
}

