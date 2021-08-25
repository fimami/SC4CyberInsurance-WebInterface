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

#################################################
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

# #################################################
# #FIXME: Always the first ganache account is the msg.sender
# @app.route('/getMessageSender')
# def getMessageSender():
#     try:
#         sender = str(getSc().functions.getMsgSender().call())
#     except Exception as e:
#         sender = transform_error_message(e)
#     return sender

####################################
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

#####################################
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

####################################
@app.route('/getContractInformation', methods=['POST'])
def getContractInformation():
    try:
        jsonHash = request.get_json()
        message = get_json_content_with_hash(getConnection(), jsonHash)
    except Exception as e:
        message = "Error appeared during processing: \n" + str(e)
        print("message: " + message)
    return message


# @app.route('/useContract/<jsonHash>')
# def useContract(jsonHash):
#     try:
#         setSc(get_smart_contract_accessor(getConnection(), jsonHash))
#         setHash(jsonHash)
#         message = "The contract with hash " + jsonHash + " was selected to be accessed."
#     except Exception as e:
#         message = "There is no contract available with the given hash: " + jsonHash
#     return message

####################################
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

# @app.route('/identify/<address>')
# def identify(address):
#     setUserAddress(address)
#     message = "The address is assigned to: " + str(address) + "."
#     if(address == insurer):
#         message = message + " You are identified as an insurer."
#     else:
#         message = message + " You are identified as a customer."

#     return message

# @app.route('/calculatePremium/<jsonFile>')
# def calculatePremium(jsonFile):
#     # read the json content
#     json_content = read_file(jsonFile)

#     premium = calculate_premium(json_content)
#     return "The premium with the inserted json file would be: " + str(premium) + " swiss francs per period."

####################################
@app.route('/calculatePremium', methods=['POST'])
def calculatePremium2():
    data = request.get_json()
    json_content = json.dumps(data, indent=8)
    premium_pre = calculate_premium(json_content)
    premium = round(premium_pre)
    return str(premium)

# @app.route('/getCoverage')
# @app.route('/getCoverage/<jsonHash>')
# def getCoverage(jsonHash):
#     try:
#         tuples = get_coverages_of_contract_with_hash(getConnection(), jsonHash)
#         message = "The contract contains the following coverage: "
#         for tuple in tuples:
#             message = message + """Customer : {}, Cost : {}, Attack : {}, CoverageRatio : {}, OwnRisk : {}, MaxIndemnification : {}
#                     """.format(str(tuple[0]), str(tuple[1]), str(tuple[2]), str(tuple[3]), str(tuple[4]), str(tuple[5]))
#     except Exception as e:
#         message = transform_error_message(e)
#     return message

# @app.route('/getAvailableContracts')
# def getAvailableContracts():
#     try:
#         tuples = get_all_contracts_in_db(getConnection())
#         print(type(tuples))
#         print(tuples)
#         message = "The following contracts are available: "
#         for tuple in tuples:
#             message = message + """\nCustomer : {},\n Hash : {}\n\n""".format(str(tuple[0]), str(tuple[1]))
#     except Exception as e:
#         message = "An error appeared while getting the contracts: " + str(e) + ". Probably no contracts are available."
#     return message

####################################
@app.route('/getAvailableContracts')
def getAvailableContracts():
    try:
        tuples = get_all_contracts_in_db2(getConnection())
        print(tuples)
        print(type(tuples))
        contract_list = []
        for tuple in tuples:
            contract_address = get_contract_address_with_hash(getConnection(), tuple[1])
            contract_list.append({'companyName':str(tuple[0]), 'jsonHash':str(tuple[1]), 'contractAddress':str(contract_address)})
        contract_json = json.dumps(contract_list)
    except Exception as e:
        contract_json = "An error appeared while getting the contracts: " + str(e) + ". Probably no contracts are available."
        print(contract_json)
    return contract_json


####################################
# @app.route('/getAvailableContracts3')
# def getAvailableContracts3():
#     try:
#         tuples = get_all_contracts_in_db2(getConnection())
#         keys = ("companyName", "jsonHash")
#         contract_list = get_list_of_dict(keys, tuples)
#         for item in contract_list:
#             contract_address = get_contract_address_with_hash(getConnection(), item['jsonHash'])
#             item.update({'contractAddress':str(contract_address)})
#         contract_dict = json.dumps(contract_list)
#     except Exception as e:
#         contract_dict = "An error appeared while getting the contracts: " + str(e) + ". Probably no contracts are available."
#         print(contract_dict)
#     return contract_dict

def validate_new_conditions(newJsonContent, oldJsonContent):
    #do not need to compare hash and premium
    new_contract_information = ContractInformation(newJsonContent, "do not compare", "do not compare")
    old_contract_information = ContractInformation(oldJsonContent, "do not compare", "do not compare")
    return new_contract_information == old_contract_information

# @app.route('/proposeToUpdateContract/<newJsonFile>')
# def proposeToUpdateContract(newJsonFile):
#     try:
#         currentHash = getHash()
#         # read the json content
#         json_content = read_file(newJsonFile)
#         current_json_content = get_json_content_with_hash(getConnection(), currentHash)
#         if validate_new_conditions(json_content, current_json_content):
#             premium = int(calculate_premium(json_content))
#             json_hash = get_hash_of_string(json_content)

#             contract_information = get_contract_information_with_hash(getConnection(), currentHash)
#             address = contract_information[1]
#             abi = contract_information[2]
#             getSc().functions.proposeToUpdateContract(premium, json_hash).transact({'from': getUserAddress()})
#             #insert the new data in the database
#             insert_contract_information(getConnection(), json_hash, address, abi)
#             insert_json_file_content(getConnection(), json_content, json_hash)
#             message = 'Contract was proposed to be updated. The new premium would be ' + str(premium) \
#                   + ' swiss francs.'
#         else:
#             message = 'Error: Contract constraints are fixed and can not be changed.'
#     except Exception as e:
#         message = transform_error_message(e)
#     return message

####################################
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

# def getDamages(hash, status, statusAsInt):
#     damages_dict = getDamagesDict()
#     damages_dict.clear()
#     sc = get_smart_contract_accessor(getConnection(), hash[0])
#     damages = sc.functions.getAllReportedDamagesWithStatus(statusAsInt).call()
#     message = ""
#     for damage in damages:
#         dateAsTimestamp = damage[0]
#         if dateAsTimestamp != 0:
#             logfile_hash = damage[5]
#             damages_dict.update({logfile_hash:hash})
#             date = convertTimestampToDateString(dateAsTimestamp)
#             message = message + "\nHash of Contract: " + hash[0] \
#                       + "\nDamage: \nDate: " + date + " \nAmount: " + str(damage[1]) \
#                       + " \nStatus: " + status + " \nID: " + str(damage[3]) \
#                       + " \nAttackType: " + damage[4] + " \nLogfileHash: " + logfile_hash \
#                       + " \nDeclineReason: " + damage[6] + " \nCounterOffer: " + str(damage[7]) \
#                       + "\n\n"
#     setDamagesDict(damages_dict)
#     return message

# @app.route('/getAllDamages/<status>')
# def getAllDamages(status):
#     try:
#         statusAsInt = resolveStatus(status)
#         if(statusAsInt == -1):
#             message = "Error: Status " + status + " does not exist."
#         else:
#             message = ""
#             hashs = get_all_hashs_in_db(getConnection())
#             for hash in hashs:
#                 message = message + getDamages(hash, status, statusAsInt)
#     except Exception as e:
#         message = transform_error_message(e)
#     return message

###################################################
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

#######################################################
#####works: 1 eth == 10^18 wei
# @app.route('/getBalanceOfContract')
# def getBalanceOfContract():
#     try:
#         message = str(getSc().functions.balanceOfSC().call())
#     except Exception as e:
#         message = transform_error_message(e)
#     return message

# @app.route('/getDamagesOfCurrentContract/<status>')
# def getDamagesOfCurrentContract(status):
#     try:
#         statusAsInt = resolveStatus(status)
#         print(statusAsInt)
#         if(statusAsInt == -1):
#             message = "Error: Status " + status + " does not exist."
#             print(message)
#         else:
#             message = getDamages(getHash(), status, statusAsInt)
#             print("else " + message)
#     except Exception as e:
#         message = transform_error_message(e)
#         print(message)
#     return message


#########################################
# @app.route('/getLogfileContent', methods=['POST'])
# def getLogfileContent():
#     try:
#         logfile_hash = request.get_json()
#         logfile_content = str(get_log_data(getConnection(), logfile_hash))
#     except Exception as e:
#         logfile_content = transform_error_message(e)
#     return logfile_content

#########################################
# @app.route('/getHash')
# def getUsedHash():
#     try:
#         message = str(getHash())
#     except Exception as e:
#         message = transform_error_message(e)
#     return message

# @app.route('/getPremium')
# def getPremium():
#     try:
#         message = "Premium: " + str(getSc().functions.getPremium().call())
#     except Exception as e:
#         message = transform_error_message(e)
#     return message

####################################
@app.route('/getPremium')
def getPremium():
    try:
        message = str(getSc().functions.getPremium().call())
    except Exception as e:
        message = transform_error_message(e)
    return message

####################################
@app.route('/getPremiumInEther')
def getPremiumInEther():
    try:
        euro = getSc().functions.getPremium().call()
        exchange_rate = getSc().functions.getExchangeRate().call()
        premiumEther = str(euro / exchange_rate)
    except Exception as e:
        premiumEther = transform_error_message(e)
    return premiumEther

# @app.route('/getExchangeRate')
# def getExchangeRateCall():
#     try:
#         exchange_rate = getSc().functions.getExchangeRate().call()
#         jsonExchange = json.dumps(exchange_rate)
#     except Exception as e:
#         jsonExchange = transform_error_message(e)
#     return jsonExchange

####################################
@app.route('/getValidUntil')
def getValidUntil():
    try:
        validUntil = str(getSc().functions.getValidUntil().call())
    except Exception as e:
        validUntil = transform_error_message(e)
    return validUntil

####################################
@app.route('/getValidBool')
def getValidBool():
    try:
        validBool = str(getSc().functions.getValidBool().call())
    except Exception as e:
        validBool = transform_error_message(e)
    return validBool

####################################
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

# @app.route('/isNewProposalAvailable')
# def isNewProposalAvailable():
#     try:
#         proposal_dict = getProposalDict()
#         proposal_dict.clear()
#         message = ""
#         hashs = get_all_hashs_in_db(getConnection())
#         for hash in hashs:
#             try:
#                 sc = get_smart_contract_accessor(getConnection(), hash[0])
#                 if sc.functions.isNewProposalAvailable().call():
#                     new_hash = sc.functions.getHashOfProposal().call()
#                     proposal_dict.update({new_hash:hash[0]})
#                     message = message + "For the contract with hash " + hash[0] + " is a new proposal available.\n" \
#                                     "The hash of the new file is " +  new_hash + ".\n"

#             except:
#                 print("No accessor available.")
#     except Exception as e:
#         message = transform_error_message(e)
#     setProposalDict(proposal_dict)
#     return message

####################################
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

#######instead of isNewProposalAvailable()
##################################################
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

#########################################
# @app.route('/getContentOfProposal2', methods=['POST'])
# def getContentOfProposal2():
#     jsonHash = request.get_json()
#     return get_json_content_with_hash(getConnection(), jsonHash)

###############################################
@app.route('/checkProposal', methods=['POST'])
def checkProposal():
    port = 5001
    jsonHash = request.get_json()
    content = content = requests.get('http://localhost:' + str(port) +
                           '/getContentOfProposal/' + jsonHash).content.decode('UTF-8')
    return content

# @app.route('/checkProposal/<hash>', defaults={'fileName':''})
# @app.route('/checkProposal/<hash>/<fileName>')
# def checkProposal(hash, fileName):
#     port = 5000
#     if getUserAddress() == insurer:
#         port = 5001
#     content = requests.get('http://localhost:' + str(port) +
#                            '/getContentOfProposal/' + hash).content.decode('UTF-8')
#     insert_json_file_content(getConnection(), content, hash)
#     message = "New content is written to the database."
#     if fileName != '':
#         write_file(fileName, content)
#         message = message + " And into file " + fileName + "."
#     current_hash = getProposalDict().get(hash)

#     ####the following two are already triggered with useContract2() in the frontend
#     setHash(current_hash)
#     setSc(get_smart_contract_accessor(getConnection(), current_hash))

#     return message



