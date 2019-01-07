package main

import (
	"fmt"
	"os"
	"time"
)

func main() {

	validateCommandLineArguments(os.Args[1:])

	userInput 		:= os.Args[1:][0]
	loopCounter 	:= validateLoopArgument(os.Args[1:][0])
	start 			:= time.Now()
	seconds 		:= start.Unix()
	outputFileName 	:= fmt.Sprintf("%s.%s", userInput, "txt")
	outputFilePath 	:= fmt.Sprintf("output/%s", outputFileName)

	writeFile(outputFilePath, loopCounter)

	end 		:= time.Now()
	elapsedTime := end.Unix() - seconds

	fmt.Printf("Time taken to write %d iterations in file %s is %d seconds\n", loopCounter, outputFileName, elapsedTime)

}

func writeFile(outputFilePath string, loopCounter int) {

	file, err := os.OpenFile(outputFilePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)

	if err != nil {
		fmt.Printf("error creating file: %v", err)
		return
	}

	defer file.Close()

	for i := 1; i <= loopCounter; i++ {

		_, err = file.WriteString(fmt.Sprintf("%d\n", i))

		if err != nil {
			fmt.Printf("error writing string: %v", err)
			break
		}
	}

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


