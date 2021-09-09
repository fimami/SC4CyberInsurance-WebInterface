from APICommon import *

#open the database connection and create the tables if they do not already exist
setConnection(open_connection(True))
create_contract_databases_if_not_exist(getConnection())

@app.route('/deployContract', methods=['POST'])
def deployContract():
    try:
        rawdata = request.data
        json1 = rawdata.decode('utf8')
        json_dict = json.loads(json1)
        json_content = json.dumps(json_dict, indent=8)
        customerAddress = requests.get("http://localhost:5001/getCustomerAddress").content.decode('UTF-8')
        premium_pre = calculate_premium(json_content)
        premium = round(premium_pre)
        contract_information = anonymize_data(json_content, premium, getConnection())

        scCreator = SmartContractCreator()
        print(str(getUserAddress()) + " " + str(customerAddress))
        sc = scCreator.createAndDeploySmartContract(contract_information, getUserAddress(), customerAddress)
        print(sc)
        message = "Smart Contract has been deployed at the address: " + sc.address + "."
    except Exception as e:
        message = "Error appeared during: " + str(e)
        print(message)
    return message

@app.route('/storePendingContract', methods=['POST'])
def storePendingContract():
    try:
        rawdata = request.data
        json1 = rawdata.decode('utf8')
        json_dict = json.loads(json1)
        json_content = json.dumps(json_dict, indent=8)
        json_hash = get_hash_of_string(json_content)
        status = "New"
        premium = 0
        insert_pending_json_file_content(getConnection(), json_content, json_hash, status, premium)
        message = "Pending contract was stored on relevant databases."
    except Exception as e:
        message = "Error appeared during: " + str(e)
    return message

@app.route('/deletePendingContract', methods=['POST'])
def deletePendingContract():
    try:
        rawdata = request.data
        jsonHash1 = rawdata.decode('utf8')
        jsonHash = jsonHash1.replace('"', '')
        message = requests.get(url='http://localhost:5001/deletePendingContract/' + jsonHash).content.decode('UTF-8')
        delete_pending_json_with_hash(getConnection(), jsonHash)
    except Exception as e:
        message = str(e)
    return message

@app.route('/acceptPendingContract', methods=['POST'])
def acceptPendingContract():
    try:
        rawdata = request.data
        new_json = request.get_json()
        jsonHash = new_json['jsonHash']
        status = new_json['status']
        premium = new_json['premium']
        response = requests.post(url='http://localhost:5001/updatePendingContract', data=rawdata).content.decode('UTF-8')
        update_pending_contract(getConnection(), jsonHash, status, premium)
    except Exception as e:
        response = "Error appeared during: " + str(e)
    return response

@app.route('/getContractAddress/<jsonHash>')
def getContractAddress(jsonHash):
    return get_contract_address_with_hash(getConnection(), jsonHash)

@app.route('/getContractABI/<jsonHash>')
def getContractABI(jsonHash):
    return get_contract_abi_with_hash(getConnection(), jsonHash)

@app.route('/getInsurerAddress')
def getInsurerAddress():
    try:
        address = getUserAddress()
    except Exception as e:
        address = transform_error_message(e)
    return address

@app.route('/acceptDamage', methods=['POST'])
def acceptDamage():
    try:
        jsonData = request.get_json()
        damageId = jsonData['id']
        amount = int(jsonData['amount'])
        exchange_rate = getSc().functions.getExchangeRate().call()
        ether = float(amount / exchange_rate)
        getSc().functions.acceptDamage(damageId).transact({'from': getUserAddress(),'value': w3.toWei(ether, "ether")})
        message = 'Damage was successfully accepted.'
    except Exception as e:
        message = transform_error_message(e)
    return message

@app.route('/declineDamage', methods=['POST'])
def declineDamage():
    try:
        jsonData = request.get_json()
        damageId = jsonData['id']
        reason = str(jsonData['reason'])
        amount = int(jsonData['amount'])
        if amount == 0:
            getSc().functions.declineDamage(damageId, reason, amount).transact({'from': getUserAddress(), 'value': w3.toWei(0.0, "ether")})
            message = 'Damage was successfully declined without sending a counteroffer.'
        else:
            exchange_rate = getSc().functions.getExchangeRate().call()
            ether = float(amount / exchange_rate)
            weiInSC = getSc().functions.balanceOfSC().call()
            ethInSC = weiInSC / 1000000000000000000
            if (ethInSC - ether) >= 0:
                ethToTransfer = 0
            if (ethInSC - ether) < 0:
                ethToTransfer = ether - ethInSC
            getSc().functions.declineDamage(damageId, reason, amount).transact({'from': getUserAddress(), 'value': w3.toWei(ethToTransfer, "ether")})
            message = 'Damage was successfully declined and a counteroffer of ' + str(amount) + ' was offered.'
    except Exception as e:
        message = transform_error_message(e)
    return message

@app.route('/getLogFileContent', methods=['POST'])
def getLogFileContent():
    try:
        logfilehash = request.get_json()
        logfilecontent = requests.get('http://localhost:5001/getLogContentForInsurer/' + logfilehash).content.decode('UTF-8')
    except Exception as e:
        logfilecontent = transform_error_message(e)
    return logfilecontent

@app.route('/annulTheContract', methods=['POST'])
def annulTheContract():
    try:
        jsonHash = request.get_json()
        setSc(get_smart_contract_accessor(getConnection(), jsonHash))
        setHash(jsonHash)
        message = getSc().functions.annulTheContract().transact({'from': getUserAddress()})
    except Exception as e:
        message = "Error appeared: " + transform_error_message(e)
    return message

if __name__=='__main__':
    app.run(port=5000, debug=True)

