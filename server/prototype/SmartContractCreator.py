from web3 import Web3
import json
from solc import compile_standard
from SmartContractCode import *
from DatabaseConnector import *
from SupportingFunctions import *
from DataAnonymizer import *
from provable import *
from PremiumCalculator import *

class SmartContractCreator:
    def createAndDeploySmartContract(self, contract_info, insurer, customer):
        #open the database connection and create the tables if they do not already exist
        connection = open_connection(True)

        # create new contract with the specific contract info
        compiled_contract_code = self.createSmartContract(contract_info)

        # HTTPProvider:
        w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))

        # get bytecode
        bytecode = compiled_contract_code['contracts']['InsurerSCDynamic.sol']['InsurerSCDynamic']['evm']['bytecode']['object']

        # get abi
        abi = json.loads(compiled_contract_code['contracts']['InsurerSCDynamic.sol']['InsurerSCDynamic']['metadata'])['output']['abi']

        InsurerSCDynamic = w3.eth.contract(abi=abi, bytecode=bytecode)

        print("Constructor: " + str(InsurerSCDynamic.constructor(customer).estimateGas() * 20000000000))

        # Submit the transaction that deploys the contract
        tx_hash = InsurerSCDynamic.constructor(customer).transact({'from': insurer})#, 'gas':3000000000000})

        # Wait for the transaction to be mined, and get the transaction receipt
        tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)

        contract_address = tx_receipt.contractAddress

        #insert the data in the database
        insert_contract_information(connection, contract_info.json_hash, contract_address, str(abi))

        close_connection(connection)

        insurerSCDynamic = w3.eth.contract(
            address=contract_address,
            abi=abi
        )
        return insurerSCDynamic

    def createSmartContract(self, contract_info):
        return compile_standard({
            "language": "Solidity",
            "sources": {
                "provableAPI.sol": {
                    "content": provable_code
                },
                "InsurerSCDynamic.sol": {
                    "content": contract_content.format(
                        contract_info.customer_name,
                        contract_info.start_date,
                        contract_info.end_date,
                        contract_info.payment_frequency,
                        contract_info.cancellation_penalty,
                        contract_info.premium,
                        contract_info.premium,
                        contract_info.json_hash
                        )
                }
            },
            "settings":
                {
                    "outputSelection": {
                        "*": {
                            "*": [
                                "metadata", "evm.bytecode"
                                , "evm.bytecode.sourceMap"
                            ]
                        }
                    }
                }
        })







