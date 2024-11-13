from ..db import transactions, credits
from ..helpers.parse import *

class TransactionRepository:
    def get_last_week_data(self):
        return get_last_week_data(transactions)

    def create_spending_dict(self):
        return create_spending_dict(transactions)

    def aggregate_category_by_month(self, month: int = 0):
        return aggregate_category_by_month(transactions, month)

    def aggregate_category_by_week(self):
        return aggregate_category_by_week(transactions)

    def total_spent_by_month(self):
        return total_spent_by_month(transactions)

    def total_spent_by_week(self):
        return total_spent_by_week(transactions)

    def aggregate_channel_by_month(self, month: int):
        return aggregate_channel_by_month(transactions, month)

    def aggregate_city_by_month(self, month: int):
        return aggregate_city_by_month(transactions, month)

    def aggregate_category_by_tags(self, tag: str):
        return aggregate_category_by_tags(transactions, tag)

    def create_heatmap_data(self):
        return create_heatmap_data(transactions)

    def get_bill_payments(self):
        return get_bill_payments(credits)
    
    def visualize_data(self, query:str):
        return visualize_data(query)
    
    def get_insights(self, key:int):
        return get_insights(key)