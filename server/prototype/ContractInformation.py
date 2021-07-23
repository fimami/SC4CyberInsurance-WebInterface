import json
from SupportingFunctions import *
from datetime import timedelta


class ContractInformation:
    def get_payment_frequency_as_a_timestamp(self, payment_frequency_per_year):
        return int(timedelta(days=365).total_seconds()) / payment_frequency_per_year


    def __init__(self, json_content, json_hash, premium):
        loaded_json_content = json.loads(json_content)
        business_information = loaded_json_content['business_information']
        self.customer_name = business_information['companyName']
        constraints = loaded_json_content['contract_constraints']
        self.start_date = convertDateStringToTimestamp(constraints['startDate'])
        self.end_date = convertDateStringToTimestamp(constraints['endDate'])
        self.payment_frequency = self.get_payment_frequency_as_a_timestamp(constraints['paymentFrequencyPerYear'])
        self.cancellation_penalty = constraints['cancellation']['penaltyInPercent']
        self.premium = premium
        self.json_hash = json_hash


    def __eq__(self, other):
        if not isinstance(other, ContractInformation):
            # don't attempt to compare against unrelated types
            return NotImplemented

        return self.customer_name == other.customer_name and self.start_date == other.start_date \
               and self.end_date == other.end_date and self.payment_frequency == other.payment_frequency \
               and self.cancellation_penalty == other.cancellation_penalty \
               and self.premium == other.premium and self.json_hash == other.json_hash

