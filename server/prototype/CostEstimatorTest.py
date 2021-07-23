from web3 import Web3
from SupportingFunctions import *
from DatabaseConnector import *
from PremiumCalculator import *
from SmartContractCreator import *
import time

# HTTPProvider:
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))
connection = open_connection(True)

insurer = w3.eth.accounts[0]
customer = w3.eth.accounts[1]

json_content = read_file("Contract.json")
json_hash = get_hash_of_file("Contract.json")
new_json_content = read_file("ContractNew.json")
new_json_hash = get_hash_of_file("ContractNew.json")

remove_contract_from_db_with_hash(connection, json_hash)

premium = calculate_premium(json_content)
new_premium = calculate_premium(new_json_content)
contract_information = anonymize_data(json_content, premium, connection)

scCreator = SmartContractCreator()
sc = scCreator.createAndDeploySmartContract(contract_information, insurer, customer)

print("Pay Security: " + str(sc.functions.paySecurity().estimateGas({'from': customer,'value': w3.toWei(2, "ether")}) * 20000000000))
sc.functions.paySecurity().transact({'from': customer,'value': w3.toWei(2, "ether")})
print("Pay Premium: " + str(sc.functions.payPremium().estimateGas({'from': customer,'value': w3.toWei(4, "ether")}) * 20000000000))
sc.functions.payPremium().transact({'from': customer,'value': w3.toWei(4, "ether")})
print("Pay Premium: " + str(sc.functions.payPremium().estimateGas({'from': customer,'value': w3.toWei(2, "ether")}) * 20000000000))
sc.functions.payPremium().transact({'from': customer,'value': w3.toWei(2, "ether")})

logFile = "LogfileAttack"
contentOfLogFile = read_file(logFile)
hashOfLogFile = get_hash_of_string(contentOfLogFile)
dateAsTimestamp = convertDateStringToTimestamp("12.07.2021")

print("Report Damage: " + str(sc.functions.reportDamage(
    dateAsTimestamp, 3200, 1, "DDOS", hashOfLogFile).estimateGas({'from': customer}) * 20000000000))
sc.functions.reportDamage(dateAsTimestamp, 3200, 1, "DDOS", hashOfLogFile).transact({'from': customer})

print("Decline Damage: " + str(sc.functions.declineDamage(1, "Reason", 1280).estimateGas() * 20000000000))
sc.functions.declineDamage(1, "Reason", 1280).transact({'from': insurer})

print("Accept Counter Offer: " + str(sc.functions.acceptCounterOffer(1).estimateGas({'from': customer}) * 20000000000))
sc.functions.acceptCounterOffer(1).transact({'from': customer})

print("Get Valid Until: " + str(sc.functions.getAllReportedDamagesWithStatus(1).estimateGas() * 20000000000))
sc.functions.getAllReportedDamagesWithStatus(1).call()

print("Pay Premium: " + str(sc.functions.payPremium().estimateGas({'from': customer,'value': w3.toWei(2, "ether")}) * 20000000000))
sc.functions.payPremium().transact({'from': customer,'value': w3.toWei(2, "ether")})

print("Report Damage: " + str(sc.functions.reportDamage(
    dateAsTimestamp, 3200, 2, "DDOS", hashOfLogFile).estimateGas({'from': customer}) * 20000000000))
sc.functions.reportDamage(dateAsTimestamp, 3200, 2, "DDOS", hashOfLogFile).transact({'from': customer})

print("Accept Damage: " + str(sc.functions.acceptDamage(2).estimateGas({'from': insurer,'value': w3.toWei(9, "ether")}) * 20000000000))
sc.functions.acceptDamage(2).transact({'from': insurer,'value': w3.toWei(9, "ether")})

print("Propose Update: " + str(sc.functions.proposeToUpdateContract(
    int(new_premium), new_json_hash).estimateGas({'from': customer}) * 20000000000))
sc.functions.proposeToUpdateContract(int(new_premium), new_json_hash).transact({'from': customer})

print("Agree To Update Contract: " + str(sc.functions.agreeToUpdateContract().estimateGas({'from': insurer}) * 20000000000))
sc.functions.agreeToUpdateContract().transact({'from': insurer})

print("Pay Premium: " + str(sc.functions.payPremium().estimateGas({'from': customer,'value': w3.toWei(1.85, "ether")}) * 20000000000))
sc.functions.payPremium().transact({'from': customer,'value': w3.toWei(1.85, "ether")})

#print("Update Exchange Rate: " + str(sc.functions.updateExchangeRate().estimateGas({'from': insurer,'value': w3.toWei(1, "ether")}) * 20000000000))
#sc.functions.updateExchangeRate().transact({'from': insurer,'value': 10000000000000000})


