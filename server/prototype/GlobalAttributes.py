connection = 0
sc = 0
hash = 0
user_address = 0
damages_dict = dict()
proposal_dict = dict()


def getConnection():
    return connection

def setConnection(value):
    global connection
    connection = value

def getSc():
        return sc

def setSc(value):
    global sc
    sc = value

def getHash():
    return hash

def setHash(value):
    global hash
    hash = value

def getUserAddress():
    return user_address

def setUserAddress(value):
    global user_address
    user_address = value

def getProposalDict():
    return proposal_dict

def setProposalDict(value):
    global proposal_dict
    proposal_dict = value