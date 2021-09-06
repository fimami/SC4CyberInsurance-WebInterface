from APICommon import *

#open the database connection and create the tables if they do not already exist
setConnection(open_connection(False))
create_contract_databases_if_not_exist(getConnection())

# @app.route('/createContract/<jsonFile>')
# def createContract(jsonFile):
#     response = requests.get('http://localhost:5000/deployContract/' + jsonFile).content.decode('UTF-8')
#     json_content = read_file(jsonFile)
#     # print(type(json_content))
#     json_hash = get_hash_of_string(json_content)

#     #get the data from the insurer
#     contract_address = requests.get('http://localhost:5000/getContractAddress/' + json_hash).content.decode('UTF-8')
#     contract_abi = requests.get('http://localhost:5000/getContractABI/' + json_hash).content.decode('UTF-8')
#     #insert the data in the database
#     insert_contract_information(getConnection(), json_hash, contract_address, contract_abi)
#     insert_json_file_content(getConnection(), json_content, json_hash)
#     #assign the newly created smart contract as currently used one
#     sc = get_smart_contract_accessor(getConnection(), json_hash)
#     setSc(sc)
#     setHash(json_hash)
#     return response

####################################
@app.route('/createContract', methods=['POST'])
def createContract():
    try:
        rawdata = request.data
        pendingHash = request.get_json()
        infoCustomer = get_request_content_with_hash(getConnection(), pendingHash)
        infoInsurer = requests.post(url='http://localhost:5000/getPendingContractInformation', data=rawdata).content.decode('UTF-8')
        if (infoCustomer == infoInsurer):
            response = requests.post(url='http://localhost:5000/deployContract', data=infoCustomer).content.decode('UTF-8')
            print(response)
            contract_address = requests.get('http://localhost:5000/getContractAddress/' + pendingHash).content.decode('UTF-8')
            contract_abi = requests.get('http://localhost:5000/getContractABI/' + pendingHash).content.decode('UTF-8')

            insert_contract_information(getConnection(), pendingHash, contract_address, contract_abi)
            insert_json_file_content(getConnection(), infoCustomer, pendingHash)

            sc = get_smart_contract_accessor(getConnection(), pendingHash)
            setSc(sc)
            setHash(pendingHash)
            response2 = requests.post('http://localhost:5000/deletePendingContract', data=rawdata).content.decode('UTF-8')
        else:
            response = "The pending contract json files are not equal."
            response2 = ""
    except Exception as e:
        response = "Error appeared during: " + str(e)
        response2 = ""
    return response + " " + response2

#########################################TODO: CHECK THIS
@app.route('/createPendingContract', methods=['POST'])
def createPendingContract():
    try:
        rawdata = request.data
        requestData = request.get_json()
        json_content = json.dumps(requestData, indent=8)
        json_hash = get_hash_of_string(json_content)
        status = "New"
        premium = 0
        response = requests.post(url='http://localhost:5000/storePendingContract', data=rawdata).content.decode('UTF-8')
        insert_pending_json_file_content(getConnection(), json_content, json_hash, status, premium)
    except Exception as e:
        response = str(e)
    return response

#########################################################
@app.route('/updatePendingContract', methods=['POST'])
def updatePendingContract():
    try:
        rawdata = request.data
        json1 = rawdata.decode('utf8')
        new_json = json.loads(json1)
        
        jsonHash = new_json['jsonHash']
        status = new_json['status']
        premium = new_json['premium']
        update_pending_contract(getConnection(), jsonHash, status, premium)
        response = "The pending contracts were updated."
    except Exception as e:
        response = "Error appeared during: " + str(e)
    return response

#########################################################
@app.route('/deletePendingContract/<jsonHash>')
def deletePendingContract2(jsonHash):
    try:
        delete_pending_json_with_hash(getConnection(), jsonHash)
        message = "Pending Contract was deleted."
    except Exception as e:
        message = str(e)
    return message

@app.route('/getCustomerAddress')
def getCustomerAddress():
    return getUserAddress()

############################################
# @app.route('/updateFileHash/<old_hash>/<new_hash>')
# def updateFileHash(old_hash, new_hash):
#     try:
#         update_file_hash(getConnection(), old_hash, new_hash)
#         message = "The File hash was updated successfully."
#     except Exception as e:
#         message = transform_error_message(e)
#     return message

# @app.route('/paySecurity/<ether>')
# def paySecurity(ether):
#     if getSc() == 0:
#         message = 'Error: Have to chose a contract first by calling useContract function.'
#     else:
#         try:
#             getSc().functions.paySecurity().transact({'from': getUserAddress(),'value': w3.toWei(ether, "ether")})
#             message = 'Security was paid.'
#         except Exception as e:
#             message = transform_error_message(e)
#     return message

####################################
@app.route('/paySecurity', methods=['POST'])
def paySecurity():
    if getSc() == 0:
        message = 'Error: Have to chose a contract first by calling useContract function.'
    else:
        try:
            securityAmount = request.get_json()
            getSc().functions.paySecurity().transact({'from': getUserAddress(),'value': w3.toWei(securityAmount, "ether")})
            message = 'Security was paid.'
        except Exception as e:
            message = transform_error_message(e)
    return message

# @app.route('/payPremium/<ether>')
# def payPremium(ether):
#     if getSc() == 0:
#         message = 'Error: Have to chose a contract first by calling useContract function.'
#     else:
#         try:
#             getSc().functions.payPremium().transact({'from': getUserAddress(),'value': w3.toWei(ether, "ether")})
#             valid_until = convertTimestampToDateString(getSc().functions.getValidUntil().call())
#             message = 'Premium was paid. Contract is now valid until ' + valid_until
#         except Exception as e:
#             message = transform_error_message(e)
#     return message

####################################
@app.route('/payPremium', methods=['POST'])
def payPremium():
    if getSc() == 0:
        message = 'Error: Have to chose a contract first by calling useContract function.'
    else:
        try:
            premiumAmount = request.get_json()
            getSc().functions.payPremium().transact({'from': getUserAddress(),'value': w3.toWei(premiumAmount, "ether")})
            valid_until = convertTimestampToDateString(getSc().functions.getValidUntil().call())
            message = 'Premium was paid. Contract is now valid until ' + valid_until
        except Exception as e:
            message = transform_error_message(e)
    return message

# @app.route('/reportDamage/<date>/<amount>/<id>/<typeOfAttack>/<logFile>')
# def reportDamage(date, amount, id, typeOfAttack, logFile):
#     try:
#         #insert log data in db
#         contentOfLogFile = read_file(logFile)
#         hashOfLogFile = get_hash_of_string(contentOfLogFile)
#         insert_log_data(getConnection(), hashOfLogFile, contentOfLogFile)

#         dateAsTimestamp = convertDateStringToTimestamp(date)
#         getSc().functions.reportDamage(dateAsTimestamp, int(amount), int(id), typeOfAttack, hashOfLogFile).transact({'from': getUserAddress()})
#         message = 'Damage was successfully reported.'
#     except Exception as e:
#         message = transform_error_message(e)
#     return message

#########################################
@app.route('/reportDamage', methods=['POST'])
def reportDamage():
    try:
        json_content = request.get_json()
        json_content_as_string = json.dumps(json_content)
        dateAsTimestamp = convertDateStringToTimestamp2(json_content['date'])
        contentOfLogFile = json_content['log_file_content']
        hashOfLogFile = get_hash_of_string(contentOfLogFile)
        amount = json_content['damage_amount']
        typeOfAttack = json_content['attack_type']
        jsonForID = json_content_as_string
        jsonForID = jsonForID.replace('{', '')
        jsonForID = jsonForID.replace('}', '')
        id_report = get_hash_for_id(jsonForID)
        insert_log_data(getConnection(), hashOfLogFile, contentOfLogFile)
        getSc().functions.reportDamage(dateAsTimestamp, int(amount), int(id_report), typeOfAttack, hashOfLogFile).transact({'from': getUserAddress()})
        message = "Damage was successfully reported."
    except Exception as e:
        message = "Error appeared: \n" + str(e)
    return message

@app.route('/getLogContentForInsurer/<hashOfLog>')
def getLogContentForInsurer(hashOfLog):
    try:
        message = get_log_data(getConnection(), hashOfLog)
    except Exception as e:
        message = transform_error_message(e)
    return message

#TODO: check if used --->
##########################################
@app.route('/getLogContent', methods=['POST'])
def getLogContent():
    try:
        hashOfLog = request.get_json()
        message = get_log_data(getConnection(), hashOfLog)
    except Exception as e:
        message = transform_error_message(e)
    return message


# @app.route('/acceptCounterOffer/<id>')
# def acceptCounterOffer(id):
#     try:
#         getSc().functions.acceptCounterOffer(int(id)).transact({'from': getUserAddress()})
#         message = 'Counter offer was successfully accepted.'
#     except Exception as e:
#         message = transform_error_message(e)
#     return message

##########################################
@app.route('/acceptCounteroffer', methods=['POST'])
def acceptCounteroffer():
    try:
        jsonId = request.get_json()
        getSc().functions.acceptCounterOffer(int(jsonId)).transact({'from': getUserAddress()})
        message = 'Counteroffer was successfully accepted.'
    except Exception as e:
        message = transform_error_message(e)
    return message

# @app.route('/declineCounterOffer/<id>')
# def declineCounterOffer(id):
#     try:
#         getSc().functions.declineCounterOffer(int(id)).transact({'from': getUserAddress()})
#         message = 'Counter offer was declined.'
#     except Exception as e:
#         message = transform_error_message(e)
#     return message

################################################
@app.route('/declineCounteroffer', methods=['POST'])
def declineCounteroffer():
    try:
        jsonId = request.get_json()
        getSc().functions.declineCounterOffer(int(jsonId)).transact({'from': getUserAddress()})
        message = 'Counter offer was declined.'
    except Exception as e:
        message = transform_error_message(e)
    return message

# @app.route('/resolveDispute/<id>')
# def resolveDispute(id):
#     try:
#         getSc().functions.resolveDispute(int(id)).transact({'from': getUserAddress()})
#         message = 'Dispute was resolved.'
#     except Exception as e:
#         message = transform_error_message(e)
#     return message

################################################
@app.route('/resolveDispute', methods=['POST'])
def resolveDispute():
    try:
        jsonId = request.get_json()
        message = str(getSc().functions.resolveDispute(int(jsonId)).transact({'from': getUserAddress()}))
        message = 'Dispute was resolved.'
    except Exception as e:
        message = transform_error_message(e)
    return message

########################################
@app.route('/deleteUpdateContract/<new_hash>')
def deleteUpdateContract(new_hash):
    try:
        remove_contract_from_db_with_hash(getConnection(), new_hash)
        message = "The update request was deleted successfully."
    except Exception as e:
        message = transform_error_message(e)
    return message

#######################################
@app.route('/deleteOldContract/<old_hash>')
def deleteOldContract(old_hash):
    try:
        remove_contract_from_db_with_hash(getConnection(), old_hash)
        message = "The old contract was deleted."
    except Exception as e:
        message = transform_error_message(e)
    return message

########################################
@app.route('/cancelDamage', methods=['POST'])
def cancelDamage():
    try:
        jsonId = request.get_json()
        getSc().functions.cancelDamage(int(jsonId)).transact({'from': getUserAddress()})
        message = "The Claim was cancelled."
    except Exception as e:
        message = transform_error_message(e)
    return message

if __name__=='__main__':
    app.run(port=5001, debug=True)

