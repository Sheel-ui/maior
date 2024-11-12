import os
import json
from datetime import datetime

OUTPUT_FILE = './store/parsed_transactions.json'
OUTPUT_CREDIT_FILE = './store/parsed_credit_transactions.json'
FOLDER_PATH = "./data"

def read_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

def write_json(data, output_file_path):
    with open(output_file_path, 'w') as file:
        json.dump(data, file, indent=4)
    print(f"Data written to {output_file_path}")

def read_all_json(folder_path, credit=False):
    all_data = []
    json_files = [f for f in os.listdir(folder_path) if f.endswith('.json')]
    for file_name in json_files:
        file_path = os.path.join(folder_path, file_name)
        data = read_json(file_path)
        if credit:
            all_data = parse_credits(data, all_data)
        else:
            all_data = parse_transactions(data, all_data)
    
    return all_data

def parse_transactions(data, all_data):
    if 'added' in data:
        for transaction in data['added']:
            if not (transaction.get('amount') < 0 and ('Billpay' in transaction.get('category') or "Credit Card" in transaction.get('category'))):
                all_data.append({
                    'transaction_id': transaction.get('transaction_id'),
                    'amount': transaction.get('amount'),
                    'date': transaction.get('date'),
                    'category': transaction.get('category', []),
                    'category_id': transaction.get('category_id'),
                    'merchant_name': transaction.get('merchant_name'),
                    'payment_channel' : transaction.get('payment_channel'),
                    'location': {
                        'city': transaction.get('location', {}).get('city'),
                        'region': transaction.get('location', {}).get('region')
                    }
                })
    return all_data

def parse_credits(data, all_data):

    if 'added' in data:
        for transaction in data['added']:
            if (transaction.get('amount') < 0 and ('Billpay' in transaction.get('category') or "Credit Card" in transaction.get('category'))):
                all_data.append({
                    'transaction_id': transaction.get('transaction_id'),
                    'amount': transaction.get('amount'),
                    'date': transaction.get('date'),
                    'category': transaction.get('category', []),
                    'category_id': transaction.get('category_id'),
                    'merchant_name': transaction.get('merchant_name'),
                    'payment_channel' : transaction.get('payment_channel'),
                    'location': {
                        'city': transaction.get('location', {}).get('city'),
                        'region': transaction.get('location', {}).get('region')
                    }
                })
    return all_data

def main():
    processed_data = read_all_json(FOLDER_PATH)
    processed_data.sort(key=lambda x: datetime.strptime(x['date'], '%Y-%m-%d'))
    write_json(processed_data, OUTPUT_FILE)
    processed_data = read_all_json(FOLDER_PATH, credit=True)
    processed_data.sort(key=lambda x: datetime.strptime(x['date'], '%Y-%m-%d'))
    write_json(processed_data, OUTPUT_CREDIT_FILE)

if __name__ == "__main__":
    main()
