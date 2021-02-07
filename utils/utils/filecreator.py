import os.path

def create_file (name):
    count = 0
    while os.path.isfile('%s%s.txt' % (name, count)):
        count += 1

    return open('%s%s.txt' % (name, count), 'w+')
