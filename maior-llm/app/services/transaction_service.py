from typing import List, Dict, Any
from ..repositories.transaction_repository import TransactionRepository

class TransactionService:
    def __init__(self, repository: TransactionRepository):
        self.repository = repository

    def get_last_week_data(self) -> List[Dict[str, Any]]:
        return self.repository.get_last_week_data()

    def create_spending_dict(self) -> List[Dict[str, Any]]:
        return self.repository.create_spending_dict()

    def aggregate_category_by_month(self, month: int = 0) -> List[Dict[str, Any]]:
        return self.repository.aggregate_category_by_month(month)

    def aggregate_category_by_week(self) -> List[Dict[str, Any]]:
        return self.repository.aggregate_category_by_week()

    def total_spent_by_month(self) -> Dict[str, float]:
        return self.repository.total_spent_by_month()

    def total_spent_by_week(self) -> Dict[str, float]:
        return self.repository.total_spent_by_week()

    def aggregate_channel_by_month(self, month: int) -> List[Dict[str, Any]]:
        return self.repository.aggregate_channel_by_month(month)

    def aggregate_city_by_month(self, month: int) -> List[Dict[str, Any]]:
        return self.repository.aggregate_city_by_month(month)

    def aggregate_category_by_tags(self, tag: str) -> List[Dict[str, Any]]:
        return self.repository.aggregate_category_by_tags(tag)

    def create_heatmap_data(self) -> List[Dict[str, Any]]:
        return self.repository.create_heatmap_data()

    def get_bill_payments(self) -> List[Dict[str, Any]]:
        return self.repository.get_bill_payments()
    
    def visualize_data(self, query:str) -> Dict[str, Any]:
        return self.repository.visualize_data(query)

    def get_insights(self, key:int) -> Dict[str, Any]:
        return self.repository.get_insights(key)
