from fastapi import APIRouter
from ..db import transactions, credits
from ..helpers.parse import *
from pydantic import BaseModel

router = APIRouter()

class ModelRequest(BaseModel):
    query: str

@router.get("/line")
def get_line_data():
    return get_last_week_data(transactions)

@router.get("/time-series")
def get_time_series_data():
    return create_spending_dict(transactions)

    
@router.get("/category/month")
def get_category_data():
    return aggregate_category_by_month(transactions)

@router.get("/category/week")
def get_category_data():
    return aggregate_category_by_week(transactions)

@router.get("/total-spend/month")
async def get_bar_data():
    return total_spent_by_month(transactions)

@router.get("/total-spend/week")
async def get_bar_data():
    return total_spent_by_week(transactions)

@router.get("/category/{month}")
async def get_category_data(month: int):
    return aggregate_category_by_month(transactions,month)

@router.get("/channel/{month}")
async def get_channel_data(month: int):
    return aggregate_channel_by_month(transactions,month)

@router.get("/cities/{month}")
async def get_city_data(month: int):
    return aggregate_city_by_month(transactions,month)

@router.get("/word/{tag}")
async def get_word_data(tag):
    return aggregate_category_by_tags(transactions,tag)

@router.get("/heatmap")
async def get_heatmap_data():
    return create_heatmap_data(transactions)

@router.get("/credits")
def get_credits_data():
    return get_bill_payments(credits)

@router.post("/generate-graph")
async def get_cities_data(request: ModelRequest):
    return visualize_data(request.query)

@router.get("/generate-insight/{tag}")
async def get_insights_data(tag: int):
    return get_insights(tag)