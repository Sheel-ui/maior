from fastapi import APIRouter, Depends
from typing import List
from ..services.transaction_service import TransactionService
from ..repositories.transaction_repository import TransactionRepository
from ..models.transaction_models import AggregateCategoryResponse, Query

router = APIRouter()

def get_transaction_service() -> TransactionService:
    repository = TransactionRepository()
    return TransactionService(repository)

@router.get("/line", response_model=List[dict])
def get_line_data(transaction_service: TransactionService = Depends(get_transaction_service)):
    return transaction_service.get_last_week_data()

@router.get("/time-series", response_model=List[dict])
def get_time_series_data(transaction_service: TransactionService = Depends(get_transaction_service)):
    return transaction_service.create_spending_dict()

@router.get("/category/month", response_model=List[dict])
def get_category_data(transaction_service: TransactionService = Depends(get_transaction_service)):
    return transaction_service.aggregate_category_by_month(month=0)

@router.get("/category/week", response_model=dict)
def get_weekly_category_data(transaction_service: TransactionService = Depends(get_transaction_service)):
    return transaction_service.aggregate_category_by_week()

@router.get("/total-spend/month", response_model=List[dict])
async def get_monthly_total_spend(transaction_service: TransactionService = Depends(get_transaction_service)):
    return transaction_service.total_spent_by_month()

@router.get("/total-spend/week", response_model=List[dict])
async def get_weekly_total_spend(transaction_service: TransactionService = Depends(get_transaction_service)):
    return transaction_service.total_spent_by_week()

@router.get("/category/{month}", response_model=List[AggregateCategoryResponse])
async def get_monthly_category_data(month: int, transaction_service: TransactionService = Depends(get_transaction_service)):
    return transaction_service.aggregate_category_by_month(month=month)

@router.get("/channel/{month}", response_model=List[dict])
async def get_channel_data(month: int, transaction_service: TransactionService = Depends(get_transaction_service)):
    return transaction_service.aggregate_channel_by_month(month=month)

@router.get("/cities/{month}", response_model=List[dict])
async def get_city_data(month: int, transaction_service: TransactionService = Depends(get_transaction_service)):
    return transaction_service.aggregate_city_by_month(month=month)

@router.get("/word/{tag}", response_model=List[dict])
async def get_word_data(tag: str, transaction_service: TransactionService = Depends(get_transaction_service)):
    return transaction_service.aggregate_category_by_tags(tag=tag)

@router.get("/heatmap", response_model=List[dict])
async def get_heatmap_data(transaction_service: TransactionService = Depends(get_transaction_service)):
    return transaction_service.create_heatmap_data()

@router.get("/credits", response_model=List[dict])
async def get_credits_data(transaction_service: TransactionService = Depends(get_transaction_service)):
    return transaction_service.get_bill_payments()

@router.post("/generate-graph", response_model=dict)
async def get_visualize_data(data:Query,transaction_service: TransactionService = Depends(get_transaction_service)):
    return transaction_service.visualize_data(query=data.query)

@router.get("/generate-insight/{key}")
async def get_insights_data(key:int, transaction_service: TransactionService = Depends(get_transaction_service)):
    return transaction_service.get_insights(key=key)