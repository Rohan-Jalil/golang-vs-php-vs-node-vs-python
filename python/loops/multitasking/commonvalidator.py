import time
from datetime import date


optionArr = {
	"one-million": 1000000,
	"five-million": 5000000,
	"ten-million": 10000000,
	"one-billion": 1000000000,
	"five-billion": 5000000000,
	"ten-billion": 10000000000
};

option = 0;

def setup():
	option = input("""Please enter an option?
""")
	optionArrIndexes = ["one-million", "five-million", "ten-million", "hundred-million", "one-billion", "ten-billion"]
	if option in optionArrIndexes:
		return optionArr[option]
	else:
		print("Invalid Argument passed. Allowed values are one-thousand|one-million|ten-million|one-billion|ten-billion")
		exit()
