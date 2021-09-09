from flask import Flask, request, render_template, jsonify
import requests
from web3 import Web3
from DatabaseConnector import *
from SmartContractCreator import *
from GlobalAttributes import *
from PremiumCalculator import *
from ContractInformation import *
import re
from flask_cors import CORS, cross_origin
import pandas as pd


app = Flask(__name__)
CORS(app)
w3 = Web3(Web3.HTTPProvider('http://localhost:7545'))

#sc = get_smart_contract_accessor(getConnection(), hash)

@app.route('/defineAccount', methods=['POST'])
def defineAccount():
    try:
        addrKey = request.get_json()
        acct = w3.eth.account.from_key(addrKey)
        address = acct.address
        print(address)
        print(type(address))
        setUserAddress(address)
    except Exception as e:
        address = transform_error_message(e)
    return str(address)

#returns pending contracts with information about status, hash of json, and premium
@app.route('/getPendingContracts')
def getPendingContracts():
    try:
        tuples = get_all_requests_in_db(getConnection())
        request_list = []
        for tuple in tuples:
            json_tuple = json.loads(tuple[1])
            companyName = json_tuple['business_information']['companyName']
            request_list.append({'companyName':str(companyName), 'jsonHash':str(tuple[0]), 'status':str(tuple[2]), 'premium':tuple[3]})
        request_list_json = json.dumps(request_list)
    except Exception as e:
        request_list_json = "Error appeared during processing: \n" + str(e)
    return request_list_json

#returns the contract information of a specific pending contract
@app.route('/getPendingContractInformation', methods=['POST'])
def getPendingContractInformation():
    try:
        rawdata = request.data
        json1 = rawdata.decode('utf8')
        jsonHash = json1.replace('"', '')
        message = get_request_content_with_hash(getConnection(), jsonHash)
    except Exception as e:
        message = "Error appeared during processing: \n" + str(e)
        print("message: " + message)
    return message

#returns contract information of a specific deployed contract
@app.route('/getContractInformation', methods=['POST'])
def getContractInformation():
    try:
        jsonHash = request.get_json()
        message = get_json_content_with_hash(getConnection(), jsonHash)
    except Exception as e:
        message = "Error appeared during processing: \n" + str(e)
        print("message: " + message)
    return message

@app.route('/useContract', methods=['POST'])
def useContract():
    try:
        jsonHash = request.get_json()
        setSc(get_smart_contract_accessor(getConnection(), jsonHash))
        setHash(jsonHash)
        message = "The contract was selected to be accessed."
    except Exception as e:
        message = "Error appeared: " + str(e)
    return message

def transform_error_message(error_message):
    try:
        error_message_splitted = re.split('revert |\',', str(error_message))[1]
        message = "Error appeared in the Smart Contract:\n" + error_message_splitted
    except Exception as e:
        message = str(error_message)
    return message

@app.route('/calculatePremium', methods=['POST'])
def calculatePremium2():
    data = request.get_json()
    json_content = json.dumps(data, indent=8)
    premium_pre = calculate_premium(json_content)
    premium = round(premium_pre)
    return str(premium)

#returns a list of contract objects stored in the respective database
@app.route('/getAvailableContracts')
def getAvailableContracts():
    try:
        tuples = get_all_contracts_in_db(getConnection())
        print(tuples)
        print(type(tuples))
        contract_list = []
        has_been_updated = 0
        for tuple in tuples:
            contract_address = get_contract_address_with_hash(getConnection(), tuple[1])
            if getSc() != 0:
                has_been_updated = getSc().functions.checkIfUpdated().call()
            contract_list.append({'companyName':str(tuple[0]), 'jsonHash':str(tuple[1]), 'contractAddress':str(contract_address), 'updated':has_been_updated})
        contract_json = json.dumps(contract_list)
    except Exception as e:
        contract_json = "An error appeared while getting the contracts: " + str(e) + ". Probably no contracts are available."
        print(contract_json)
    return contract_json

def validate_new_conditions(newJsonContent, oldJsonContent):
    #do not need to compare hash and premium
    new_contract_information = ContractInformation(newJsonContent, "do not compare", "do not compare")
    old_contract_information = ContractInformation(oldJsonContent, "do not compare", "do not compare")
    return new_contract_information == old_contract_information

@app.route('/proposeToUpdateContract', methods=['POST'])
def proposeToUpdateContract():
    try:
        newContract_dict = request.get_json()
        newContract = json.dumps(newContract_dict, indent=8)
        currentHash = getHash()
        currentContract = get_json_content_with_hash(getConnection(), currentHash)
        if validate_new_conditions(newContract, currentContract):
            premium_pre = calculate_premium(newContract)
            premium = round(premium_pre)            
            newHash = get_hash_of_string(newContract)
            contract_information = get_contract_information_with_hash(getConnection(), currentHash)
            address = contract_information[1]
            abi = contract_information[2]
            getSc().functions.proposeToUpdateContract(premium, newHash).transact({'from': getUserAddress()})
            insert_contract_information(getConnection(), newHash, address, abi)
            insert_json_file_content(getConnection(), newContract, newHash)
            message = 'Contract was proposed to be updated. The new premium would be ' + str(premium) \
                  + ' euro.'
        else:
            message = 'Error: Contract constraints are fixed and can not be changed.'
    except Exception as e:
        message = transform_error_message(e)
    return message

@app.route('/agreeToUpdateContract')
def agreeToUpdateContract():
    try:
        old_hash = getHash()
        new_hash = getSc().functions.getHashOfProposal().call()
        update_file_hash(getConnection(), old_hash, new_hash )
        oldContractDeletion = requests.get('http://localhost:5001/deleteOldContract/' + old_hash).content.decode('UTF-8')
        remove_old_content_after_update(getConnection(), old_hash)
        content = requests.get('http://localhost:5001' +
                           '/getContentOfProposal/' + new_hash).content.decode('UTF-8')
        insert_json_file_content(getConnection(), content, new_hash)
        setHash(new_hash)
        getSc().functions.agreeToUpdateContract().transact({'from': getUserAddress()})
        message = 'Contract was updated.'
    except Exception as e:
        message = transform_error_message(e)
    return message

@app.route('/declineToUpdateContract')
def declineToUpdateContract():
    try:
        new_hash = getSc().functions.getHashOfProposal().call()
        getSc().functions.declineToUpdateContract().transact({'from': getUserAddress()})
        message = requests.get('http://localhost:5001/deleteUpdateContract/' + str(new_hash)).content.decode('UTF-8')
    except Exception as e:
        message = transform_error_message(e)
    return message

# def resolveStatus(status):
#     switcher = {
#         "New" : 0,
#         "Paid" : 1,
#         "UnderInvestigation" : 2, #After the damage was declined by insurer, with a counteroffer or not
#         "Dispute" : 3, #After the counteroffer was declined by the customer
#         "Resolved" : 4, #After the claim was negotiated completely, after atleast one counteroffer
#         "Canceled" : 5 #After the customer canceled/withdrew his claim. 
#     }
#     return switcher.get(status, -1)

@app.route('/getAllDamages')
def getAllDamages():
    try: 
        damageList = []
        hashs = get_all_hashs_in_db(getConnection())
        for hash in hashs:
            sc = get_smart_contract_accessor(getConnection(), hash[0])
            damages = sc.functions.getAllReportedDamages().call()
            for damage in damages:
                dateAsTimestamp = damage[0]
                if dateAsTimestamp != 0:
                    logfile_hash = damage[5]
                    date = convertTimestampToDateString(dateAsTimestamp)
                    jsonHash = hash[0]
                    amount = damage[1]
                    status = damage[2]
                    id = damage[3]
                    attackType = damage[4]
                    decline_reason = damage[6]
                    counteroffer = damage[7]
                    damageList.append({'contractHash':str(jsonHash), 'status':status, 'id':id, 'date':str(date), 'attackType':str(attackType), 'amount':amount, 'logfileHash':str(logfile_hash), 'declineReason':str(decline_reason), 'counteroffer':str(counteroffer)})
        message = json.dumps(damageList)
    except Exception as e:
        message = transform_error_message(e)
    return message

@app.route('/getPremium')
def getPremium():
    try:
        premium = getSc().functions.getPremium().call()
        premiumObj = {'premium': premium}
    except Exception as e:
        premiumObj = transform_error_message(e)
    return premiumObj

@app.route('/getPremiumInEther')
def getPremiumInEther():
    try:
        euro = getSc().functions.getPremium().call()
        exchange_rate = getSc().functions.getExchangeRate().call()
        premiumEther = euro / exchange_rate
        premiumEtherObj = {'premiumEther': premiumEther}
    except Exception as e:
        premiumEtherObj = transform_error_message(e)
    return premiumEtherObj

@app.route('/getValidUntil')
def getValidUntil():
    try:
        validUntil = str(getSc().functions.getValidUntil().call())
    except Exception as e:
        validUntil = transform_error_message(e)
    return validUntil

@app.route('/getValidBool')
def getValidBool():
    try:
        validBool = str(getSc().functions.getValidBool().call())
    except Exception as e:
        validBool = transform_error_message(e)
    return validBool

@app.route('/getSecurity', methods=['POST'])
def getSecurity():
    try:
        initialPremiumEuro = getSc().functions.getInitialPremium().call()
        exchange_rate = getSc().functions.getExchangeRate().call()
        initialPremium = initialPremiumEuro / exchange_rate
        jsonHash = request.get_json()
        content = get_json_content_with_hash(getConnection(), jsonHash)
        jsonContent = json.loads(content)
        cancellationPenalty = jsonContent["contract_constraints"]["cancellation"]["penaltyInPercent"]
        cancellationPercentage = cancellationPenalty / 100
        security = str(cancellationPercentage * initialPremium)
    except Exception as e:
        security = transform_error_message(e)
    return security

#used by customer:
@app.route('/checkForNewProposal')
def checkForNewProposal():
    try:
        hashs = get_all_hashs_in_db(getConnection())
        message = "No update is available."
        proposal_list = []
        for hash in hashs:
            try:
                sc = get_smart_contract_accessor(getConnection(), hash[0])
                if sc.functions.isNewProposalAvailable().call():
                    new_hash = sc.functions.getHashOfProposal().call()
                    if hash[0] != new_hash:
                        proposal_list.append(new_hash)
                    message = "Update is available."
            except:
                print("No accessor available.")
        proposal_list_json = json.dumps(proposal_list)
    except Exception as e:
        proposal_list_json = transform_error_message(e)
    return proposal_list_json

#used by insurer
@app.route('/getNewProposalByHash', methods=['POST'])
def getNewProposalByHash():
    try:
        jsonHash = request.get_json()
        proposal_dict = {}
        message = "No update is available."
        try:
            sc = get_smart_contract_accessor(getConnection(), jsonHash)
            proposal_dict.update({'new_hash':0, 'message':message})
            if sc.functions.isNewProposalAvailable().call():
                new_hash = sc.functions.getHashOfProposal().call()
                message = "Update is available."
                proposal_dict.update({'new_hash':str(new_hash), 'message':message})
        except:
            proposal_dict.update({'new_hash':0, 'message':"No accessor available."})
    except Exception as e:
        proposal_dict.update({'new_hash':0, 'message':str(transform_error_message(e))})
    setProposalDict(proposal_dict)
    return proposal_dict


@app.route('/getContentOfProposal/<hash>')
def getContentOfProposal(hash):
    return get_json_content_with_hash(getConnection(), hash)

@app.route('/checkProposal', methods=['POST'])
def checkProposal():
    port = 5001
    jsonHash = request.get_json()
    content = content = requests.get('http://localhost:' + str(port) +
                           '/getContentOfProposal/' + jsonHash).content.decode('UTF-8')
    return content