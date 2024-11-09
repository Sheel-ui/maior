from datetime import datetime, timedelta
from collections import defaultdict

def parse_date(transaction):
    if isinstance(transaction["date"], str):
        transaction["date"] = datetime.strptime(transaction["date"], "%Y-%m-%d")
    return transaction

# Function to create the dictionary of date and total spending
def create_spending_dict(transactions):
    spending_dict = defaultdict(float)
    
    for transaction in transactions:
        date = transaction["date"].strftime("%Y-%m-%d")  # Convert date to string
        spending_dict[date] += transaction["amount"]
    
    # Round off the totals to 2 decimal places
    result = [{"date": date, "amount": round(amount, 2)} for date, amount in spending_dict.items()]
    return result

# Function to filter spending data by a date range
def spending_dict_for_range(transactions, start_date, end_date):
    # Parse start and end dates to datetime objects for comparison
    start_date_obj = datetime.strptime(start_date, "%Y-%m-%d")
    end_date_obj = datetime.strptime(end_date, "%Y-%m-%d")
    
    # Generate spending dictionary using create_spending_dict
    spending_data = create_spending_dict(transactions)
    
    # Filter spending data within the specified date range
    filtered_data = [
        entry for entry in spending_data 
        if start_date_obj <= datetime.strptime(entry["date"], "%Y-%m-%d") <= end_date_obj
    ]
    return filtered_data

# Helper functions to get data for specific time ranges

def get_last_three_months_data(transactions):
    today = datetime.today()
    start_date = (today.replace(day=1) - timedelta(days=90)).replace(day=1)  # Approximate start of last 3 months
    end_date = today.strftime("%Y-%m-%d")
    return spending_dict_for_range(transactions, start_date.strftime("%Y-%m-%d"), end_date)

# # Group transactions by month
# def group_by_month(transactions):
#     monthly_data = defaultdict(list)
#     for transaction in transactions:
#         month = transaction["date"].strftime("%Y-%m")
#         monthly_data[month].append(transaction)
#     return monthly_data

# Group transactions by week
def group_by_week(transactions):
    weekly_data = defaultdict(list)
    for transaction in transactions:
        week_start = (transaction["date"] - timedelta(days=transaction["date"].weekday())).strftime("%Y-%m-%d")
        weekly_data[week_start].append(transaction)
    return weekly_data

# Filter transactions within a specific date range
def group_by_date_range(transactions, start_date, end_date):
    start_date = datetime.strptime(start_date, "%Y-%m-%d")
    end_date = datetime.strptime(end_date, "%Y-%m-%d")
    return [t for t in transactions if start_date <= t["date"] <= end_date]

# Aggregate data for visualization (e.g., total spending per category)
def aggregate_category_by_range(transactions):
    category_totals = defaultdict(float)
    for transaction in transactions:
        category = transaction["category"][0]  # Use primary category
        category_totals[category] += transaction["amount"]
    # Convert to list of dictionaries in the specified format
    result = [{"category": cat, "amount": round(total, 2)} for cat, total in category_totals.items()]
    return result


def aggregate_category_by_week(transactions):
    weekly_data = group_by_week(transactions)
    weekly_category_totals = defaultdict(lambda: defaultdict(float))
    
    # Aggregate totals by category for each week
    for week_start, transactions in weekly_data.items():
        for transaction in transactions:
            category = transaction["category"][0]  # Use primary category
            weekly_category_totals[week_start][category] += transaction["amount"]

    # Transform the data to a list of dictionaries for each week
    result = {}
    for week, categories in weekly_category_totals.items():
        result[week] = [{"category": cat, "amount": round(total, 2)} for cat, total in categories.items()]

    return result

def aggregate_category_by_month(transactions):
    monthly_data = group_by_month(transactions)
    monthly_category_totals = defaultdict(lambda: defaultdict(float))
    
    # For each month, aggregate the totals by category
    for month_start, transactions in monthly_data.items():
        for transaction in transactions:
            category = transaction["category"][0]  # Use primary category
            monthly_category_totals[month_start][category] += transaction["amount"]
    
    result = {}
    for month, categories in monthly_category_totals.items():
        result[month] = [{"category": cat, "amount": round(total, 2)} for cat, total in categories.items()]
    return result

# Function to create the dictionary of date and total spending
def create_spending_dict(transactions):
    spending_dict = defaultdict(float)
    
    for transaction in transactions:
        date = transaction["date"].strftime("%Y-%m-%d")  # Convert date to string
        spending_dict[date] += transaction["amount"]
    
    # Round off the totals to 2 decimal places
    result = [{"date": date, "amount": round(amount, 2)} for date, amount in spending_dict.items()]
    return result

# Function to filter spending data by a date range
def spending_dict_for_range(transactions, start_date, end_date):
    # Parse start and end dates to datetime objects for comparison
    start_date_obj = datetime.strptime(start_date, "%Y-%m-%d")
    end_date_obj = datetime.strptime(end_date, "%Y-%m-%d")
    
    # Generate spending dictionary using create_spending_dict
    spending_data = create_spending_dict(transactions)
    
    # Filter spending data within the specified date range
    filtered_data = [
        entry for entry in spending_data 
        if start_date_obj <= datetime.strptime(entry["date"], "%Y-%m-%d") <= end_date_obj
    ]
    return filtered_data

# Helper functions to get data for specific time ranges
def get_last_week_data(transactions):
    today = datetime.today()
    start_date = (today - timedelta(days=today.weekday() + 7)).strftime("%Y-%m-%d")  # Start of last week
    end_date = (today - timedelta(days=today.weekday() + 1)).strftime("%Y-%m-%d")    # End of last week
    return spending_dict_for_range(transactions, start_date, end_date)

def get_last_month_data(transactions):
    today = datetime.today()
    first_day_of_last_month = (today.replace(day=1) - timedelta(days=1)).replace(day=1)
    last_day_of_last_month = (today.replace(day=1) - timedelta(days=1))
    return spending_dict_for_range(transactions, first_day_of_last_month.strftime("%Y-%m-%d"), last_day_of_last_month.strftime("%Y-%m-%d"))

def get_last_three_months_data(transactions):
    today = datetime.today()
    start_date = (today.replace(day=1) - timedelta(days=90)).replace(day=1)  # Approximate start of last 3 months
    end_date = today.strftime("%Y-%m-%d")
    return spending_dict_for_range(transactions, start_date.strftime("%Y-%m-%d"), end_date)


# Function to group spending by week
def total_spent_by_week(transactions):
    weekly_spending = defaultdict(float)
    # Get date-wise spending data
    date_spending = create_spending_dict(transactions)
    # Aggregate spending by week
    for entry in date_spending:
        date_str = entry["date"]
        spending = entry["amount"]
        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        
        # Calculate the start of the week (Monday) for each date
        week_start = (date_obj - timedelta(days=date_obj.weekday())).strftime("%Y-%m-%d")
        weekly_spending[week_start] += spending
    # Round off the weekly totals to 2 decimal places
    weekly_spending = [{"start": week, "amount": round(amount, 2)} for week, amount in weekly_spending.items()]
    return weekly_spending

# Function to calculate monthly spending totals
def total_spent_by_month(transactions):
    monthly_spending = defaultdict(float)
    
    # Get date-wise spending data
    date_spending = create_spending_dict(transactions)
    
    # Aggregate spending by month
    for entry in date_spending:
        date_str = entry["date"]
        spending = entry["amount"]
        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        
        # Set the start of the month (1st of the month)
        month_start = date_obj.replace(day=1).strftime("%Y-%m-%d")
        monthly_spending[month_start] += spending
    
    # Round off the monthly totals to 2 decimal places and format the result as a list of dictionaries
    monthly_spending = [{"start": month, "amount": round(amount, 2)} for month, amount in monthly_spending.items()]
    
    return monthly_spending

# Function to create a spending dictionary with payment channel and date
def create_spending_by_channel(transactions):
    spending_dict = defaultdict(lambda: defaultdict(float))
    
    for transaction in transactions:
        date = transaction["date"].strftime("%Y-%m-%d")  # Convert date to string
        channel = transaction.get("payment_channel", "Unknown")  # Use 'Unknown' if channel is missing
        spending_dict[date][channel] += transaction["amount"]
    
    # Convert totals to a list of dictionaries with rounded values
    result = []
    for date, channels in spending_dict.items():
        for channel, amount in channels.items():
            result.append({"date": date, "payment_channel": channel, "amount": round(amount, 2)})
    
    return result

def aggregate_channel_by_week(weekly_data):
    weekly_channel_totals = []

    # Aggregate totals by channel for each week
    for week_start, transactions in weekly_data.items():
        channel_totals = defaultdict(float)
        
        # Sum transaction amounts by payment channel for the week
        for transaction in transactions:
            channel = transaction.get("payment_channel", "Unknown")
            channel_totals[channel] += transaction["amount"]
        
        # Build the formatted dictionary for the week
        week_summary = {"week": week_start}
        week_summary.update({channel: round(total, 2) for channel, total in channel_totals.items()})
        weekly_channel_totals.append(week_summary)

    return weekly_channel_totals

# # Function to aggregate spending by payment channel monthly in the specified format
# def aggregate_channel_by_month(monthly_data):
#     monthly_channel_totals = []

#     # Aggregate totals by channel for each month
#     for month_start, transactions in monthly_data.items():
#         channel_totals = defaultdict(float)
        
#         # Sum transaction amounts by payment channel for the month
#         for transaction in transactions:
#             channel = transaction.get("payment_channel", "Unknown")
#             channel_totals[channel] += transaction["amount"]
        
#         # Build the formatted dictionary for the month
#         month_summary = {"month": month_start}
#         month_summary.update({channel: round(total, 2) for channel, total in channel_totals.items()})
#         monthly_channel_totals.append(month_summary)

#     return monthly_channel_totals# Read, parse, and write data


def group_by_month(transactions):
    monthly_data = defaultdict(list)
    for transaction in transactions:
        # Use .month to get the month as an integer
        month = transaction["date"].month
        monthly_data[month].append(transaction)
    return monthly_data

def aggregate_category_by_month(transactions, month):
    category_totals = defaultdict(float)
    monthly_data = group_by_month(transactions)
    if month == 0 :
        for transaction in transactions:
            category = transaction["category"][0]
            amount = transaction["amount"]
            category_totals[category] += amount
    if month in monthly_data:
        # Aggregate amounts by category for the given month
        for transaction in monthly_data[month]:
            category = transaction["category"][0]
            if category == "Food and Drink":
                category = "Food"
            amount = transaction["amount"]
            category_totals[category] += amount

    # Format the result as a list of category totals for the given month
    result = [{"category": cat, "amount": round(total, 2), "fill": f"var(--color-{cat})"} for cat, total in category_totals.items()]
    return result

def aggregate_channel_by_month(transactions, month):
    monthly_data = group_by_month(transactions)
    initial_values = {'online': 0, 'in store': 0, 'other': 0}
    channel_totals = defaultdict(float, initial_values)
    if month == 0 :
        for transaction in transactions:
            # Get the payment channel, defaulting to "other" if not found
            channel = transaction.get("payment_channel", "other")
            channel_totals[channel] += transaction["amount"]
    if month in monthly_data:
        for transaction in monthly_data[month]:
            channel = transaction.get("payment_channel", "other")
            channel_totals[channel] += transaction["amount"]
    result = [{"channel": channel, "amount": round(total, 2)} for channel, total in channel_totals.items()]
    return result

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

def aggregate_category_by_time_period(transactions, timeframe):
    
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
    word_cloud_data = [{"value": category, "count": round(amount, 2)} for category, amount in category_totals.items()]
    
    top_20_word_cloud_data = sorted(word_cloud_data, key=lambda x: x["count"], reverse=True)[:10]
    return top_20_word_cloud_data

def heatmap_data(transactions):
    spending_dict = create_spending_dict(transactions)
    for transaction in spending_dict:
        if isinstance(transaction['date'], datetime):
            transaction['date'] = transaction['date'].strftime('%Y-%m-%d')
        date_obj = datetime.strptime(transaction['date'], '%Y-%m-%d')
        transaction['date'] = date_obj.strftime('%Y/%m/%d')
    return [ {"date":i["date"],"count":i["amount"]} for i in spending_dict]