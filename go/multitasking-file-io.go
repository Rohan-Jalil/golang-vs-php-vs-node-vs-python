package main

import (
	"fmt"
	"os"
	"sync"
	"time"
)

func main() {
	
	validateCommandLineArguments(os.Args[1:])

	userInput 		:= os.Args[1:][0]
	loopCounter 	:= validateLoopArgument(os.Args[1:][0])
	start 			:= time.Now()
	seconds 		:= start.Unix()

	var wg sync.WaitGroup
	for j := 1; j <= 10; j++ {
		wg.Add(1)

		outputFileName := fmt.Sprintf("%s-%d.%s", userInput, j, "txt")
		outputFilePath := fmt.Sprintf("output/%s", outputFileName)

		go writeFileRoutine(outputFilePath, loopCounter, &wg)

	}
	wg.Wait()

	end 		:= time.Now()
	elapsedTime := end.Unix() - seconds

	fmt.Printf("Time taken to write %d iterations in output directory is %d seconds\n", loopCounter, elapsedTime)

}

func writeFileRoutine(outputFilePath string, loopCounter int, wg *sync.WaitGroup) {

	file, err := os.OpenFile(outputFilePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)

	if err != nil {
		fmt.Printf("error creating file: %v", err)
		wg.Done()
	}
	defer file.Close()

	for i := 1; i <= loopCounter; i++ {

		_, err = file.WriteString(fmt.Sprintf("%d\n", i))

		if err != nil {
			fmt.Printf("error writing string: %v", err)
			wg.Done()
		}
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


