# app/models.py
from pydantic import BaseModel
from typing import List,Optional

class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    quantity: int

# Location Model: Represents the city and region information
class Location(BaseModel):
    city: str
    region: str

# Transaction Model: Represents each individual transaction
class Transaction(BaseModel):
    transaction_id: str
    amount: float
    date: str
    category: List[str]
    category_id: str
    merchant_name: str
    payment_channel: str
    location: Location

# TransactionList Model: Represents a list of transactions
class TransactionList(BaseModel):
    transactions: List[Transaction]