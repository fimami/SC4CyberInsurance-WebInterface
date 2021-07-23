from web3 import Web3
from SmartContractCreator import *
from APICommon import *
from DatabaseConnector import *
import requests

# HTTPProvider:
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))
insurer = w3.eth.accounts[0]
customer = w3.eth.accounts[1]
insurer_connection = open_connection(True)
customer_connection = open_connection(False)


json_file_location = 'Contract.json'
json_hash = get_hash_of_file(json_file_location)

remove_contract_from_db_with_hash(insurer_connection, json_hash)
remove_contract_from_db_with_hash(customer_connection, json_hash)

message = requests.get('http://localhost:5001/createContract/' + json_file_location).content.decode('UTF-8')
print(message)

contract_address = get_contract_address_with_hash(customer_connection, json_hash)

contractBalanceBefore = round(w3.fromWei(w3.eth.getBalance(contract_address), 'ether'))
customerBalanceBefore = round(w3.fromWei(w3.eth.getBalance(customer), 'ether'))
message = requests.get('http://localhost:5001/paySecurity/1').content.decode('UTF-8')
print(message)

contractBalanceAfter = round(w3.fromWei(w3.eth.getBalance(contract_address), 'ether'))
customerBalanceAfter = round(w3.fromWei(w3.eth.getBalance(customer), 'ether'))
assert contractBalanceBefore == contractBalanceAfter - 1
assert customerBalanceBefore == customerBalanceAfter + 1

contractBalanceBefore = contractBalanceAfter
customerBalanceBefore = customerBalanceAfter

message = requests.get('http://localhost:5001/payPremium/2').content.decode('UTF-8')
print(message)

contractBalanceAfter = round(w3.fromWei(w3.eth.getBalance(contract_address), 'ether'))
customerBalanceAfter = round(w3.fromWei(w3.eth.getBalance(customer), 'ether'))
assert contractBalanceBefore == contractBalanceAfter - 2
assert customerBalanceBefore == customerBalanceAfter + 2

contractBalanceBefore = contractBalanceAfter
customerBalanceBefore = customerBalanceAfter

message = requests.get('http://localhost:5001/payPremium/2').content.decode('UTF-8')
print(message)

contractBalanceAfter = round(w3.fromWei(w3.eth.getBalance(contract_address), 'ether'))
customerBalanceAfter = round(w3.fromWei(w3.eth.getBalance(customer), 'ether'))
assert contractBalanceBefore == contractBalanceAfter - 2
assert customerBalanceBefore == customerBalanceAfter + 2


remove_contract_from_db_with_hash(insurer_connection, json_hash)
remove_contract_from_db_with_hash(customer_connection, json_hash)