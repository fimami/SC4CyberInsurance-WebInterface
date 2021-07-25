from APICommon import *

setUserAddress(insurer)

#open the database connection and create the tables if they do not already exist
setConnection(open_connection(True))
create_contract_databases_if_not_exist(getConnection())

@app.route('/deployContract/<jsonFile>')
def deployContract(jsonFile):
    try:
        json_content = requests.get('http://localhost:5001/getJsonContent/' + jsonFile).content.decode('UTF-8')
        print(json_content)
        print(type(json_content))
        customerAddress = requests.get("http://localhost:5001/getCustomerAddress").content.decode('UTF-8')
        premium = calculate_premium(json_content)
        contract_information = anonymize_data(json_content, premium, getConnection())

        scCreator = SmartContractCreator()
        sc = scCreator.createAndDeploySmartContract(contract_information, getUserAddress(), customerAddress)
        message = "Smart Contract has been deployed at the address: " + sc.address + "."
        #setHash(get_hash_of_string(json_content))
        #setSc(sc)
        print("message: " + message)
    except Exception as e:
        message = "Error appeared during processing: \n" + str(e)
        print("message: " + message)
    return message

####################################
@app.route('/testing2', methods=['POST'])
def testing2():
    try:
        rawdata = request.data
        json1 = rawdata.decode('utf8')
        print(json1)
        print(type(json1))
        json_dict = json.loads(json1)
        print(json_dict)
        print(type(json_dict))
        json_content = json.dumps(json_dict, indent=8)
        print(json_content)
        print(type(json_content))
        message = "it worked"
    except Exception as e:
        message = "error" + str(e)
        print("message "+message)
    return message

####################################
@app.route('/deployContract2', methods=['POST'])
def deployContract2():
    try:
        #data = request.get_json() #None     class 'NoneType'
        #print(data)
        #print(type(data))
        # json_content = json.dumps(data) #null   #class 'str'
        rawdata = request.data
        json1 = rawdata.decode('utf8')
        json_dict = json.loads(json1)
        json_content = json.dumps(json_dict, indent=8)
        customerAddress = requests.get("http://localhost:5001/getCustomerAddress").content.decode('UTF-8')
        premium_pre = calculate_premium(json_content)
        premium = round(premium_pre)
        # print(premium)
        contract_information = anonymize_data(json_content, premium, getConnection())
        # print(contract_information)

        scCreator = SmartContractCreator()
        sc = scCreator.createAndDeploySmartContract(contract_information, getUserAddress(), customerAddress)
        message = "Smart Contract has been deployed at the address: " + sc.address + "."
        print("message: " + message)
    except Exception as e:
        message = "Error appeared during: " + str(e)
        print("message: " + message)
    return message


@app.route('/getContractAddress/<jsonHash>')
def getContractAddress(jsonHash):
    return get_contract_address_with_hash(getConnection(), jsonHash)

@app.route('/getContractABI/<jsonHash>')
def getContractABI(jsonHash):
    return get_contract_abi_with_hash(getConnection(), jsonHash)

@app.route('/acceptDamage/<id>', defaults={'ether':0.0})
@app.route('/acceptDamage/<id>/<ether>')
def acceptDamage(id, ether):
    try:
        getSc().functions.acceptDamage(int(id)).transact({'from': insurer,'value': w3.toWei(ether, "ether")})
        message = 'Damage was successfully accepted.'
    except Exception as e:
        message = transform_error_message(e)
    return message

@app.route('/declineDamage/<id>/<reason>/<counterOffer>', defaults={'ether':0.0})
@app.route('/declineDamage/<id>/<reason>/<counterOffer>/<ether>')
def declineDamage(id, reason, counterOffer, ether):
    try:
        getSc().functions.declineDamage(int(id), reason, int(counterOffer))\
            .transact({'from': insurer,'value': w3.toWei(ether, "ether")})
        message = 'Damage was successfully declined and a counter offer of ' + counterOffer + ' was offered.'
    except Exception as e:
        message = transform_error_message(e)
    return message

@app.route('/getLogFileContent/<logFileHash>')
def getLogFileContent(logFileHash):
    try:
        message = requests.get('http://localhost:5001/getLogContent/' + logFileHash).content.decode('UTF-8')
        json_hash = getDamagesDict().get(logFileHash)[0]
        if(json_hash != None):
            setSc(get_smart_contract_accessor(getConnection(), json_hash))
            setHash(json_hash)
    except Exception as e:
        message = transform_error_message(e)
    return message

###############################################
@app.route('/getLogFileContent2', methods=['POST'])
def getLogFileContent2():
    try:
        logfilehash = request.get_json()
        print(logfilehash)
        logfilecontent = requests.get('http://localhost:5001/getLogContent/' + logfilehash).content.decode('UTF-8')
    except Exception as e:
        logfilecontent = transform_error_message(e)
    return logfilecontent

if __name__=='__main__':
    app.run(port=5000, debug=True)

