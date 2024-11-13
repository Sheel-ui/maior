from pydantic import BaseModel
from typing import List, Dict, Any

class AggregateCategoryResponse(BaseModel):
    category: str
    amount: float
    fill: str
    
class Query(BaseModel):
    query: str
