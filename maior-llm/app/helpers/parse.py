from datetime import datetime, timedelta
from collections import defaultdict
import math
from ..db import global_df, azure_llm_35, ai_prompts, key_prompts
import pandasql as ps
import re

def group_by_week(transactions):
    weekly_data = defaultdict(list)
    for transaction in transactions:
        week_start = (transaction["date"] - timedelta(days=transaction["date"].weekday())).strftime("%Y-%m-%d")
        weekly_data[week_start].append(transaction)
    return weekly_data

def group_by_month(transactions):
    monthly_data = defaultdict(list)
    for transaction in transactions:
        month = transaction["date"].month
        monthly_data[month].append(transaction)
    return monthly_data

def aggregate_category_by_week(transactions):
    weekly_data = group_by_week(transactions)
    weekly_category_totals = defaultdict(lambda: defaultdict(float))
    for week_start, transactions in weekly_data.items():
        for transaction in transactions:
            category = transaction["category"][0]
            weekly_category_totals[week_start][category] += transaction["amount"]
    result = {}
    for week, categories in weekly_category_totals.items():
        result[week] = [{"category": cat, "amount": round(total, 2)} for cat, total in categories.items()]

    return result

def aggregate_category_by_month(transactions, month):
    category_totals = defaultdict(float)
    monthly_data = group_by_month(transactions)
    if month == 0 :
        for transaction in transactions:
            category = transaction["category"][0]
            amount = transaction["amount"]
            category_totals[category] += amount
    if month in monthly_data:
        for transaction in monthly_data[month]:
            category = transaction["category"][0]
            if category == "Food and Drink":
                category = "Food"
            amount = transaction["amount"]
            category_totals[category] += amount

    result = [{"category": cat, "amount": round(total, 2), "fill": f"var(--color-{cat})"} for cat, total in category_totals.items()]
    return result

def aggregate_category_by_tags(transactions, timeframe):
    
    today = datetime.today()
    end_date = today
    if timeframe == "week":      
        start_date = today - timedelta(days=7)
    elif timeframe == "month":
        start_date = today - timedelta(days=30)
    elif timeframe == "quarter":
        start_date = today - timedelta(days=90)
    elif timeframe == "half":
        start_date = today - timedelta(days=180) 

    filtered_transactions = filter_transactions_by_date(transactions, start_date, end_date)
    category_totals = defaultdict(float)
    for transaction in filtered_transactions:
        for category in transaction["category"]:
            category_totals[category] += transaction["amount"]
    word_cloud_data = [{"value": category, "count": round(amount, 2), "color": "#299d90" } for category, amount in category_totals.items()]
    
    top_20_word_cloud_data = sorted(word_cloud_data, key=lambda x: x["count"], reverse=True)[:10]
    return top_20_word_cloud_data

def aggregate_channel_by_month(transactions, month):
    monthly_data = group_by_month(transactions)
    initial_values = {'online': 0, 'in store': 0, 'other': 0}
    channel_totals = defaultdict(float, initial_values)
    if month == 0 :
        for transaction in transactions:
            channel = transaction.get("payment_channel", "other")
            channel_totals[channel] += transaction["amount"]
    if month in monthly_data:
        for transaction in monthly_data[month]:
            channel = transaction.get("payment_channel", "other")
            channel_totals[channel] += transaction["amount"]
    result = [{"channel": channel, "amount": round(total, 2)} for channel, total in channel_totals.items()]
    return result

def aggregate_city_by_month(transactions, month):
    monthly_data = group_by_month(transactions)
    city_totals = defaultdict(float)
    
    if month == 0 :
        for transaction in transactions:
            city = transaction.get("location", {}).get("city")
            if city is not None:
                city_totals[city] += transaction["amount"]

    if month in monthly_data:
        for transaction in monthly_data[month]:
            city = transaction.get("location", {}).get("city") 
            if city is not None:
                city_totals[city] += transaction["amount"]
    
    result = [{"city": city, "amount": round(total, 2)} for city, total in city_totals.items()]
    sorted_result = sorted(result, key=lambda x: x["amount"], reverse=True)[:6]
    return sorted_result

def create_spending_dict(transactions):
    spending_dict = defaultdict(float)
    for transaction in transactions:
        date = transaction["date"].strftime("%Y-%m-%d")
        spending_dict[date] += transaction["amount"]
    result = [{"date": date, "amount": round(amount, 2)} for date, amount in spending_dict.items()]
    return result

def spending_dict_for_range(transactions, start_date, end_date):
    start_date_obj = datetime.strptime(start_date, "%Y-%m-%d")
    end_date_obj = datetime.strptime(end_date, "%Y-%m-%d")
    spending_data = create_spending_dict(transactions)

    filtered_data = [
        entry for entry in spending_data 
        if start_date_obj <= datetime.strptime(entry["date"], "%Y-%m-%d") <= end_date_obj
    ]
    return filtered_data

def get_last_week_data(transactions):
    today = datetime.today()
    start_date = (today - timedelta(days=today.weekday() + 7)).strftime("%Y-%m-%d")
    end_date = (today - timedelta(days=today.weekday() + 1)).strftime("%Y-%m-%d")
    return spending_dict_for_range(transactions, start_date, end_date)

def total_spent_by_week(transactions):
    weekly_spending = defaultdict(float)
    date_spending = create_spending_dict(transactions)
    for entry in date_spending:
        date_str = entry["date"]
        spending = entry["amount"]
        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        week_start = (date_obj - timedelta(days=date_obj.weekday())).strftime("%Y-%m-%d")
        weekly_spending[week_start] += spending
    weekly_spending = [{"start": week, "amount": int(math.ceil(amount))} for week, amount in weekly_spending.items()]
    return weekly_spending

def total_spent_by_month(transactions):
    monthly_spending = defaultdict(float)
    date_spending = create_spending_dict(transactions)
    for entry in date_spending:
        date_str = entry["date"]
        spending = entry["amount"]
        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        month_start = date_obj.replace(day=1).strftime("%Y-%m-%d")
        monthly_spending[month_start] += spending
    monthly_spending = [{"start": month, "amount": round(amount, 2)} for month, amount in monthly_spending.items()]
    
    return monthly_spending

def filter_transactions_by_date(transactions, start_date, end_date):
    filtered = []
    for transaction in transactions:
        if isinstance(transaction["date"], str):
            transaction_date = datetime.strptime(transaction["date"], "%Y-%m-%d")
        else:
            transaction_date = transaction["date"]
        if start_date <= transaction_date <= end_date:
            filtered.append(transaction)
    return filtered

def create_heatmap_data(transactions):
    spending_dict = create_spending_dict(transactions)
    for transaction in spending_dict:
        if isinstance(transaction['date'], datetime):
            transaction['date'] = transaction['date'].strftime('%Y-%m-%d')
        date_obj = datetime.strptime(transaction['date'], '%Y-%m-%d')
        transaction['date'] = date_obj.strftime('%Y/%m/%d')
    return [ {"date":i["date"],"count":i["amount"]} for i in spending_dict]

def get_bill_payments(credits):
    card_payment = []
    for transaction in credits:     
        card_payment.append({
            'date': transaction.get('date'),
            'amount': transaction.get('amount') * (-1),
        }) 
    return card_payment

def transform_visual_data(df, type):
    if type=="graph":
        if len(df.columns):
            value_col = df.select_dtypes(include='object').columns[0]  
            count_col = df.select_dtypes(include='number').columns[0]

            transformed_data = {
                "type": "graph",
                "data": [{"value": row[value_col], "count": row[count_col]} for _, row in df.iterrows()]
            }
            return transformed_data
    elif type=="table":
        transformed_data = {
                "type": "table",
                "data" : [{col: row[col] for col in df.columns} for _, row in df.iterrows()]
        }
        return transformed_data
    else:
        return  { "type": "error", "data": []}

def visualize_data(query):
    df = global_df
    try:
        column_info = df.dtypes
        line1 = "I have a csv file with columns:\n"
        line2 = str(column_info) + "\n"
        line3 = "My table name is df\n"
        line4 = "Write an SQL query:\n"
        line5 = "My date is of format YYYY-MM-DD\n"
        prompt = line1+line2+line3+line4+line5+query
        response = azure_llm_35.invoke(prompt).content
        response = re.search(r"SELECT.*?;", response, re.DOTALL).group(0)
        result_df = ps.sqldf(response, locals())
        columns = result_df.columns.tolist()
        pattern = r'\bGROUP\s+BY\b'
        match = re.search(pattern, response, re.IGNORECASE)
        if match and len(columns)==2:
            result = transform_visual_data(result_df,"graph")
        else:
            result = transform_visual_data(result_df,"table")
        return result 
    except Exception as e:
        print(e)
        return  { "type": "error", "data": []}
    
def get_insights(key):
    df = global_df
    df['date'] = df['date'].str.slice(5, 10)
    df['category'] = df['category'].str.split().str[0]
    df_selected = df[['amount', 'date', 'category', 'merchant_name', 'city', 'region']]
    csv_string = df_selected.to_csv(index=False)
    csv_string = csv_string.replace('None', '')
    line1 = "This is my transactions data\n"
    line3 = "\nGive me 7-8 lines insight on:\n"
    query = ai_prompts[key_prompts[key]]
    prompt = line1+csv_string+line3+query
    response = azure_llm_35.invoke(prompt).content
 
    return {
        "response": response 
    }
