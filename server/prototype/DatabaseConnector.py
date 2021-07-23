import sqlite3
import json
import math
from web3 import Web3
import ast
from SupportingFunctions import *

def open_connection(insurer):
    if insurer :
        db = 'contractsI.db'
    else :
        db = 'contractsC.db'
    # conn = sqlite3.connect(':memory:')
    conn = sqlite3.connect(db, check_same_thread=False)
    return conn


def close_connection(conn):
    conn.close()


def create_contract_databases_if_not_exist(conn):
    c = conn.cursor()
    c.execute("""
                    CREATE TABLE IF NOT EXISTS JsonContent (
                        json_hash text,
                        json_content text
                )""")
    c.execute("""
                    CREATE TABLE IF NOT EXISTS CoverageInformation (
                        json_hash text,
                        customer_name text,
                        cost text,
                        attack text,
                        coverage_ratio integer,
                        own_risk integer,
                        max_indemnification integer
                )""")
    c.execute("""
                    CREATE TABLE IF NOT EXISTS DeployInformation (
                        json_hash text,
                        contract_address text,
                        contract_abi text
                )""")
    c.execute("""
                    CREATE TABLE IF NOT EXISTS LogData (
                        logfile_hash text,
                        logfile_content text
                )""")
    c.execute("""
                    CREATE TABLE IF NOT EXISTS PendingContracts (
                        json_hash text,
                        json_content text
                    )
                """)
    conn.commit()
    
########################
def insert_pending_json_file_content(conn, json_content_as_string, json_hash):
    c = conn.cursor()
    c.execute("INSERT INTO PendingContracts VALUES (:hash, :content)",
              {'hash': json_hash, 'content': json_content_as_string})
    conn.commit()

def insert_json_file_content(conn, json_content_as_string, json_hash):
    c = conn.cursor()
    c.execute("INSERT INTO JsonContent VALUES (:hash, :content)",
              {'hash': json_hash, 'content': json_content_as_string})
    conn.commit()
    json_content = json.loads(json_content_as_string)
    customer_name = json_content['business_information']['companyName']
    coverages = json_content['contract_coverage']
    for coverage in coverages:
        attack_name = coverage['name']
        for cost in coverage['coverage']:
            cost_name = cost['name']
            coverage_ratio = cost['coverage_ratio']
            try:
                own_risk = cost['own_risk']
            except:
                own_risk = 0
            try:
                max_indemnification = cost['max_indemnification']
            except:
                max_indemnification = math.inf
            c.execute(
                """
                INSERT INTO CoverageInformation 
                VALUES (:json_hash, :customer_name, :cost, :attack,
                        :coverage_ratio, :own_risk, :max_indemnification)
                """,
                {'json_hash': json_hash, 'customer_name': customer_name,
                 'cost': cost_name, 'attack': attack_name,
                 'coverage_ratio': coverage_ratio, 'own_risk': own_risk,
                 'max_indemnification': max_indemnification})
    conn.commit()


def insert_contract_information(conn, json_hash, contract_address, contract_abi):
    c = conn.cursor()
    c.execute("SELECT COUNT(*) FROM DeployInformation WHERE json_hash = :hash",
              {'hash': json_hash})
    if(c.fetchone()[0]>= 1):
        raise Exception("Already exists a contract with this json file as input.")
    c.execute("INSERT INTO DeployInformation VALUES (:hash, :address, :abi)",
              {'hash': json_hash, 'address': contract_address, 'abi': contract_abi})
    conn.commit()

#####################################
def get_all_requests_in_db(conn):
    c = conn.cursor()
    c.execute("SELECT DISTINCT json_hash, json_content FROM PendingContracts")
    allPendingContracts = c.fetchall()
    return allPendingContracts

def get_coverages_of_contract_with_hash(conn, file_hash):
    c = conn.cursor()
    c.execute("SELECT customer_name, cost, attack, coverage_ratio, own_risk, max_indemnification"
              " FROM CoverageInformation WHERE json_hash= :hash", {'hash': file_hash})
    coverages_with_hash = c.fetchall()
    return coverages_with_hash

def get_all_contracts_in_db(conn):
    c = conn.cursor()
    c.execute("SELECT DISTINCT customer_name, json_hash FROM CoverageInformation")
    allContracts = c.fetchall()
    return allContracts

###################################
def get_all_contracts_in_db2(conn):
    c = conn.cursor()
    c.execute("SELECT DISTINCT customer_name, json_hash FROM CoverageInformation")
    allContracts = c.fetchall()
    json_companyAndHash = json.dumps(allContracts)
    # print(type(json_companyAndHash))
    # print(json_companyAndHash)
    # json_loaded_content = json.loads(json_companyAndHash)
    # print(type(json_loaded_content))
    # print(json_loaded_content)
    # print(json_loaded_content[0][1])
    # print(json_companyAndHash)
    # print(json_loaded_content)
    return allContracts

def get_all_hashs_in_db(conn):
    c = conn.cursor()
    c.execute("SELECT DISTINCT json_hash FROM DeployInformation")
    allHashs = c.fetchall()
    return allHashs

def get_contract_information_with_hash(conn, file_hash):
    c = conn.cursor()
    c.execute("SELECT * FROM DeployInformation WHERE json_hash= :hash", {'hash': file_hash})
    contract_information = c.fetchone()
    return contract_information

def get_contract_address_with_hash(conn, file_hash):
    c = conn.cursor()
    c.execute("SELECT contract_address FROM DeployInformation WHERE json_hash= :hash", {'hash': file_hash})
    contract_address = c.fetchone()
    return contract_address[0]

def get_contract_abi_with_hash(conn, file_hash):
    c = conn.cursor()
    c.execute("SELECT contract_abi FROM DeployInformation WHERE json_hash= :hash", {'hash': file_hash})
    contract_abi = c.fetchone()
    return contract_abi[0]

def get_json_content_with_hash(conn, file_hash):
    c = conn.cursor()
    c.execute("SELECT json_content FROM JsonContent WHERE json_hash= :hash", {'hash': file_hash})
    tuple = c.fetchone()
    return tuple[0]

def write_json_file_with_hash_to(conn, file_hash, new_file_name):
    c = conn.cursor()
    c.execute("SELECT * FROM JsonContent WHERE json_hash= :hash", {'hash': file_hash})
    tuple = c.fetchone()
    print(tuple[0])
    write_file(new_file_name, tuple[1])

def get_smart_contract_accessor(conn, file_hash):
    contract_information = get_contract_information_with_hash(conn, file_hash)
    abi = ast.literal_eval(contract_information[2])
    w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))
    return w3.eth.contract(
        address=contract_information[1],
        abi=abi
    )

def insert_log_data(conn, log_hash, log_content):
    c = conn.cursor()
    c.execute("SELECT COUNT(*) FROM LogData WHERE logfile_hash = :hash",
              {'hash': log_hash})
    if(c.fetchone()[0]== 0):
        c.execute("INSERT INTO LogData VALUES (:hash, :content)",
              {'hash': log_hash, 'content': log_content})
        conn.commit()

def get_log_data(conn, log_hash):
    c = conn.cursor()
    c.execute("SELECT logfile_content FROM LogData WHERE logfile_hash= :hash", {'hash': log_hash})
    tuple = c.fetchone()
    return tuple[0]


def update_file_hash(conn, old_hash, new_hash):
    c = conn.cursor()
    c.execute("UPDATE DeployInformation SET json_hash = :newHash WHERE json_hash = :oldHash",
              {'newHash': new_hash, 'oldHash': old_hash})
    conn.commit()

def remove_contract_from_db_with_hash(conn, file_hash):
    c = conn.cursor()
    c.execute("DELETE FROM JsonContent WHERE json_hash = :hash",{'hash': file_hash})
    c.execute("DELETE FROM CoverageInformation WHERE json_hash = :hash",{'hash': file_hash})
    c.execute("DELETE FROM DeployInformation WHERE json_hash = :hash",{'hash': file_hash})
    conn.commit()
