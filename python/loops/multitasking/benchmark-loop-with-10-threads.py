import time
from commonvalidator import setup
import threading

threadCount = 0;

def vendors(counter):
    print('Start time: '+ str(start_time/60))
    for i in range(0, 10):
        thread = threading.Thread(target=threadLoop, args=(i,counter,))
        global threadCount
        threadCount += 1;
        thread.start()

def threadLoop(threadNumber, counter):
    count = 0;
    while count < counter:
        count += 1
    global threadCount
    threadCount -= 1
    setDown()

def setDown():
    global threadCount
    if (threadCount == 0):
        print("Time Taken in mins: "+ str((time.time() - start_time)/60))

print("""
one-thousand
one-million
ten-million
one-billion
""")

option = setup()
start_time = time.time()
vendors(option,)
