import pandas as pd
import json

# Step 1: Load the JSON data
with open('input1.json', 'r') as f:
    data = json.load(f)

# Step 2: Extract the relevant data
transactions = []
if 'added' in data:
    for transaction in data['added']: # Assuming the JSON contains a list of transactions
        transaction_data = {
            'amount': transaction.get('amount'),
            'date': transaction.get('date'),
            'category': transaction.get('category', [0])[0],
            'merchant_name': transaction.get('merchant_name'),
            'payment_channel': transaction.get('payment_channel'),
            'city': transaction.get('location', {}).get('city'),
            'region': transaction.get('location', {}).get('region')  
        }
        transactions.append(transaction_data)

# Step 3: Convert the list of transaction data into a pandas DataFrame
df = pd.DataFrame(transactions)

# Step 4: Store the DataFrame (if needed)
df.to_pickle('processed_data.pkl')

# Optionally, print the DataFrame to verify
print(df)
