import json

def calculate_risk_level(company_security, company_infrastructure):
    risk_level = 3 * len(company_security['attacks_history']) \
                 - (len(company_security['security_software']) + len(company_security['security_training']))
    """Calculate the risk level through the contract conditions"""
    return risk_level


def calculate_premium_before_adjustement(company_conditions,
                      contract_coverage,
                      risk_level,):
    """Calculate the premium by considering the risk level, the coverage
    and the yearly sales"""
    """"using a simple function to calculate the premium
    -> using risk as a weight to calculate the premium
    -> proof of concept for calculation -> can be adapted easily"""
    yearly_revenue = company_conditions['yearly_revenue']
    yearly_revenue_through_technology = company_conditions['revenue'] * yearly_revenue
    amount_of_coverages = len(contract_coverage)
    premium = 580 + amount_of_coverages * (yearly_revenue_through_technology / 15000) * risk_level
    print(premium)

    return premium

def calculate_premium(json_content):
    python_json_loaded = json.loads(json_content)

    company_conditions = python_json_loaded['company_conditions']
    company_security = python_json_loaded['company_security']
    company_infrastructure = python_json_loaded['company_infrastructure']
    risk_level = calculate_risk_level(company_security, company_infrastructure)
    coverage = python_json_loaded['contract_coverage']
    premium = calculate_premium_before_adjustement(company_conditions, coverage, risk_level)
    constraints = python_json_loaded['contract_constraints']
    payment_frequency = constraints['paymentFrequencyPerYear']

    return premium / payment_frequency