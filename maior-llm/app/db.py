import json
import os
from dotenv import load_dotenv
from langchain_openai import AzureChatOpenAI
import pandas as pd
from datetime import datetime

load_dotenv()

global_df = pd.read_pickle('./app/store/processed_data.pkl')

key_prompts = [
  "City Spending Analysis",
  "Spending Categories Breakdown",
  "Restaurant Spending Insights",
  "Frequent Merchants and Patterns",
  "Unexpected High Expenditures",
  "Top 5 Most Visited Merchants",
  "Average Transaction Amount by Category",
  "Biggest One-Time Purchases",
  "Suggested Savings Areas",
  "Comparing Spending to Historical Trends",
  "Recurring Charges Analysis",
  "Seasonal Spending Patterns",
  "Travel Spending Analysis"
]

ai_prompts = {
    "City Spending Analysis": "Based on my recent spending, which cities do I spend the most in? Provide insights on any trends, such as if I tend to spend more on food, shopping, or entertainment in specific locations.",
    
    "Spending Categories Breakdown": "Can you give me a breakdown of how much I have spent in different categories (e.g., Food and Drink, Shops, Travel, etc.) in the past month? Which category do I spend the most in, and how has that changed over time?",
    
    "Restaurant Spending Insights": "I frequently visit certain restaurants. Can you suggest similar places to visit based on the restaurants I've visited recently?",
    
    "Frequent Merchants and Patterns": "Which merchants do I spend the most at? Give me an analysis of my shopping patterns, especially when I make purchases online vs. in-store.",
    
    "Unexpected High Expenditures": "Alert me about any high transaction amounts that seem out of the ordinary in the past few months, like any spikes in spending at a specific merchant or category.",
    
    "Top 5 Most Visited Merchants": "List the top 5 merchants where I spend the most. Are there any trends or commonalities between them, such as specific product types or service offerings?",
    
    "Average Transaction Amount by Category": "What is my average transaction amount in each category, such as restaurants, groceries, sporting goods, etc.? Can you also identify if there is any category where I tend to overspend relative to others?",
    
    "Biggest One-Time Purchases": "Can you identify the largest one-time purchases I made in the past few months? What category or merchant did these purchases come from, and what might be the cause of these spikes?",
    
    "Suggested Savings Areas": "Based on my transaction data, are there any categories or merchants where I could potentially reduce spending or save money? For example, are there cheaper alternatives to the places I frequently shop or eat at?",
    
    "Comparing Spending to Historical Trends": "Can you compare my spending this month to the same month last year (if data is available)? What are the major differences in spending habits between the two periods, especially in categories like shopping, food, and travel?",
    
    "Recurring Charges Analysis": "Do I have any recurring charges (subscriptions, memberships, etc.) that I might have forgotten about? Please list them and provide recommendations on whether I should continue or cancel them.",
    
    "Seasonal Spending Patterns": "Based on my data, do I have any seasonal spending patterns, such as spending more on travel, food, or gifts during specific times of the year? How can I prepare or adjust my budget for these seasonal spikes?",
    
    "Travel Spending Analysis": "Provide insights on my travel-related expenses. How much have I spent on lodging or travel services, particularly during my trips? Can you recommend similar travel destinations based on my preferences?"
}

transactions = []
credits = []

azure_llm_35 = AzureChatOpenAI(
azure_endpoint=os.getenv("OPENAI_ENDPOINT"),
api_key=os.getenv("OPENAI_API_KEY"),
api_version=os.getenv("OPENAI_API_VERSION")
)

def read_json(file_name):
    with open("./app/store/parsed_{}.json".format(file_name), 'r') as file:
        data = json.load(file)
    return data

def parse_date(transaction):
    if isinstance(transaction["date"], str):
        transaction["date"] = datetime.strptime(transaction["date"], "%Y-%m-%d")
    return transaction

def initialize_db():
    global transactions 
    global credits
    print("Running startup task...")
    data = read_json("transactions")
    transactions += [parse_date(t) for t in data]
    credits += read_json("credits")