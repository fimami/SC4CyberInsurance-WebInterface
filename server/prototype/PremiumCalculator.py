import json

def calculate_risk_level(company_security, company_infrastructure):
    risk_metrics = company_security['risk_assessment_metrics']

    """Additional metrics can be added here, including the impact on cybersecurity assessment:"""
    knownVuln = 0
    volTransf = 0
    cybersecEd = 0
    for x in risk_metrics:
        if x['name'] == "Known vulnerabilities":
            if x['result'] == "low":
                knownVuln = -0.25
            elif x['result'] == "medium":
                knownVuln = 0.25
            elif x['result'] == "high":
                knownVuln = 0.5
        if x['name'] == "Volume of transfer":
            if x['result'] == "low":
                volTransf = -0.25
            elif x['result'] == "medium":
                volTransf = 0.25
            elif x['result'] == "high":
                volTransf = 0.5
        if x['name'] == "cybersecurity education":
            if x['result'] == "low":
                cybersecEd = 0.5
            elif x['result'] == "medium":
                cybersecEd = 0.25
            elif x['result'] == "high":
                cybersecEd = -0.25

    """Level of cybersecurity according to metrics:"""
    metrics_level = 1 + (knownVuln+cybersecEd+volTransf)

    """Estimates the technology security, updated technologies increase the cybersecurity"""
    updatedTech = 0
    notUpdatedTech = 0
    for x in company_infrastructure['technologies']:
        if x['updates'] == True:
            updatedTech = updatedTech + 1
        else:
            notUpdatedTech = notUpdatedTech + 1
    
    risk_level = 3 * len(company_security['attacks_history']) + metrics_level \
                 + company_infrastructure['number_connected_devices']/25 \
                 + 0.5 * updatedTech + notUpdatedTech + 0.5 * len(company_infrastructure['critical_services']) \
                 - (len(company_security['security_software']) + len(company_security['security_training']))
    """Calculate the risk level through the contract conditions"""
    return risk_level


def calculate_premium_before_adjustement(company_conditions,
                      contract_coverage,
                      risk_level,):
    """Calculate the premium by considering the risk level, the coverage
    and the yearly sales.
    Base rate can be adjusted.
    """
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