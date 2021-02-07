from utils.filecreator import create_file
import random

add_digit = lambda x, y: (x * 10) + y

def create_number ():
    length = random.randrange(5, 10)
    number = 0

    for i in range(length):
        random_num = random.randrange(10)
        number = add_digit(number, random_num)

    return number

def main():
    count = 500
    with create_file('number') as _file:
        for i in range(count):
            _file.write('%s%s' % (create_number(), '\n'))

main()
