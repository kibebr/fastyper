import os.path
import random
import string

def lower (str):
    return str.lower()

def create_file ():
    filename_template = 'gibberish'
    filename_count = 0
    
    while os.path.isfile('%s%s.txt' % (filename_template, filename_count)):
        filename_count += 1

    return open('%s%s.txt' % (filename_template, filename_count), 'w+')

def create_gibberish():
    gibberish_length = random.randrange(5, 10)
    gibberish = ''

    for i in range(gibberish_length):
        gibberish += lower(random.choice(string.ascii_letters))
    
    print(gibberish)
    return gibberish

def main ():
    gibberish_count = 500
    with create_file() as _file:
        for i in range(gibberish_count):
            _file.write(create_gibberish() + '\n')

main()
