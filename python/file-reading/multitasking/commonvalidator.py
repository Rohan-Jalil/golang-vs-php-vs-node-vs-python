import time
from datetime import date


optionArr = {
	"one-thousand": 1000,
	"one-million": 1000000,
	"five-million": 5000000,
	"ten-million": 10000000,
	"hundred-million": 1000000000,
	"one-billion": 5000000000,
	"one-billion": 10000000000
};

option = 0;

def setup():
	option = input("""Please enter an option?
""")
	optionArrIndexes = ["one-thousand", "one-million", "five-million", "ten-million", "hundred-million", "one-billion", "one-billion"]
	if option in optionArrIndexes:
		return optionArr[option]
	else:
		print("Invalid Argument passed. Allowed values are one-thousand|one-million|ten-million|one-billion|ten-billion")
		exit()

# Results
# 1st => 0.496929649512
# 2nd => 0.493119800091