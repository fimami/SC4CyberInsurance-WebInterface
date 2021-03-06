import json
import requests
import time
from web3 import Web3
from DatabaseConnector import *

# HTTPProvider:
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))
# insurer = w3.eth.accounts[0]
userAddr = requests.get("http://localhost:5000/getInsurerAddress").content.decode('UTF-8')
connection = open_connection(True)

while(True):
    new_exchange_rate = json.loads(requests.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR").content)["EUR"]
    hashs = get_all_hashs_in_db(connection)
    for hash in hashs:
        print(hash[0])
        sc = get_smart_contract_accessor(connection, hash[0])
        old_exchange_rate = sc.functions.getExchangeRate().call()
        print ("Old: " + str(old_exchange_rate) + " New: " + str(new_exchange_rate))
        if new_exchange_rate >= old_exchange_rate * 1.01 :
            sc.functions.updateExchangeRate().transact({'from': userAddr,'value': 1000})
        if new_exchange_rate <= old_exchange_rate * 0.99 :
            sc.functions.updateExchangeRate().transact({'from': userAddr,'value': 1000})
    time.sleep(10)

    