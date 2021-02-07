import os.path
import random
import string
from utils.filecreator import create_file

lower = lambda str: str.lower()

def create_gibberish():
    gibberish_length = random.randrange(5, 10)
    gibberish = ''

    for i in range(gibberish_length):
        gibberish += lower(random.choice(string.ascii_letters))
    
    return gibberish

def main ():
    gibberish_count = 500
    with create_file('gibberish') as _file:
        for i in range(gibberish_count):
            _file.write(create_gibberish() + '\n')

main()
