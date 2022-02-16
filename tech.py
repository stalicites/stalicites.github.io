import random
import math

chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

def convert(temp):
    if if type(myVariable) == int or type(temp) == float
    return math.floor((temp - 32) * 5/9)

tempInF = input("What is the temperature in Farenheit?\n")
tempInF = int(tempInF)
tempInC = convert(tempInF)

def returnPass():
    password = str(tempInF) + "f"
    for i in range(0, 5):
        password = password + chars[random.randint(0, 51)]
    password = password + str(tempInC) + "c"
    print("Your generated password is: ")
    return password

print(returnPass())
