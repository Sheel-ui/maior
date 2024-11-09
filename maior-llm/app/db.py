import json
from .helpers.parse import parse_date

transaction_list = {"transactions":[]}

def read_json():
    with open('./app/store/parsed_transactions.json', 'r') as file:
        data = json.load(file)
    return data

def initialize_db():
    global transaction_list 
    print("Running startup task...")
    data = read_json()
    transaction_list["transactions"] = [parse_date(t) for t in data]
