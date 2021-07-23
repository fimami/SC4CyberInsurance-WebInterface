import hashlib
from datetime import datetime


def get_hash_of_file(file_name):
    file = open(file_name, 'r')
    file_content = file.read()
    file_hash = hashlib.sha256()
    file_hash.update(file_content.encode('utf-8'))
    return file_hash.hexdigest()

def get_hash_of_string(content):
    content_hash = hashlib.sha256()
    content_hash.update(content.encode('utf-8'))
    return content_hash.hexdigest()

##############################
def get_hash_for_id(content):
    report_id = int(hashlib.sha1(content.encode('utf-8')).hexdigest(), 16) % (10 ** 8)
    return report_id

def read_file(file_name):
    file = open(file_name, 'r')
    content = file.read()
    file.close()
    return content

def write_file(new_file_name, content):
    newFile = open(new_file_name, "x")
    newFile.write(content)
    newFile.close()

def convertDateStringToTimestamp(date):
    return int(datetime.strptime(date, "%d.%m.%Y").timestamp())

###########################
def convertDateStringToTimestamp2(date):
    return int(datetime.strptime(date, "%Y-%m-%d").timestamp())

def convertTimestampToDateString(timestamp):
    return datetime.fromtimestamp(timestamp).strftime('%d.%m.%Y')