import time
from multitasking.commonvalidator import setup

def vendors(counter):
    print('Start time: '+ str(start_time/60))
    count = 0;
    while count < counter:
        count += 1
        file = open("testfile.txt", "a")
        file.write(str(count))
        file.close()

def setDown():
        print("Time Taken in mins: "+ str((time.time() - start_time)/60))

print("""
one-thousand
one-million
ten-million
one-billion
ten-billion
""")

counter = setup()
start_time = time.time()
vendors(counter,)
setDown()
