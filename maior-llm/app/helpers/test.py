import pandas as pd
import json
import pandasql as ps

df = pd.read_pickle('./store/processed_data.pkl')

with open('./store/parsed_transactions.json', 'r') as file:
    data = json.load(file)

column_info = df.dtypes
line1 = "I have a csv file with columns:\n"
line2 = str(column_info) + "\n"
line3 = "My table name is df\n"
line4 = "Write an SQL query:\n"
prompt = line1+line2+line3+line4+"I want money spent in each region"

print(prompt)

query = '''SELECT region, SUM(amount) AS total_spent
FROM df
GROUP BY region;'''

result_df = ps.sqldf(query, locals())

def transform(df, type):
    if type=="error":
        return { "type": "error", "data": []}
    
    elif type=="graph":
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

print(transform(result_df,"graph"))