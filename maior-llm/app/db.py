import json
from .models import Item
from .helpers.parse import parse_date

# In-memory "database" of items
items_db = {}
transaction_list = {"transactions":[]}

# Read the JSON file and load the data
def read_json():
    with open('./store/parsed_transactions.json', 'r') as file:
        data = json.load(file)
    return data

# Initialize the DB (this will be called during the startup)
def initialize_db():
    global transaction_list 
    print("Running startup task...")
    data = read_json()
    transaction_list["transactions"] = [parse_date(t) for t in data]
    items_db[1] = Item(name="Sample Item", description="This is a sample item", price=10.99, quantity=100)
