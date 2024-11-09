import json
import os
from dotenv import load_dotenv
from langchain_openai import AzureChatOpenAI
import pandas as pd
from datetime import datetime

load_dotenv()

global_df = pd.read_pickle('./app/store/processed_data.pkl')

transaction_list = {"transactions":[]}

azure_llm_35 = AzureChatOpenAI(
azure_endpoint=os.getenv("OPENAI_ENDPOINT"),
api_key=os.getenv("OPENAI_API_KEY"),
api_version=os.getenv("OPENAI_API_VERSION")
)

def read_json():
    with open('./app/store/parsed_transactions.json', 'r') as file:
        data = json.load(file)
    return data

def parse_date(transaction):
    if isinstance(transaction["date"], str):
        transaction["date"] = datetime.strptime(transaction["date"], "%Y-%m-%d")
    return transaction

def initialize_db():
    global transaction_list 
    print("Running startup task...")
    data = read_json()
    transaction_list["transactions"] = [parse_date(t) for t in data]
