from SupportingFunctions import *
from ContractInformation import *
from DatabaseConnector import *

def anonymize_data(json_content, premium, connection):
    json_hash = get_hash_of_string(json_content)
    insert_json_file_content(connection, json_content, json_hash)
    return ContractInformation(json_content, json_hash, premium)



