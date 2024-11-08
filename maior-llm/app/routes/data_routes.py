from fastapi import APIRouter
from ..db import transaction_list
from ..helpers.parse import *

router = APIRouter()

@router.get("/line")
def get_line_data():
    return get_last_week_data(transaction_list["transactions"])

@router.get("/time-series")
def get_time_series_data():
    return create_spending_dict(transaction_list["transactions"])

    
@router.get("/category/month")
def get_category_data():
    return aggregate_category_by_month(transaction_list["transactions"])

# @router.get("/category/date-range")
# def get_category_data():
#     return aggregate_category_by_month(transaction_list["transactions"])

@router.get("/category/week")
def get_category_data():
    return aggregate_category_by_week(transaction_list["transactions"])


@router.get("/bar")
async def get_bar_data():
    return {"data": [
        { "browser": "chrome", "visitors": 275, "fill": "var(--color-chrome)" },
        { "browser": "safari", "visitors": 200, "fill": "var(--color-safari)" },
        { "browser": "firefox", "visitors": 287, "fill": "var(--color-firefox)" },
        { "browser": "edge", "visitors": 173, "fill": "var(--color-edge)" },
        { "browser": "other", "visitors": 190, "fill": "var(--color-other)" },
    ]}
    
@router.get("/total-spend/month")
async def get_bar_data():
    return total_spent_by_month(transaction_list["transactions"])

@router.get("/total-spend/week")
async def get_bar_data():
    return total_spent_by_week(transaction_list["transactions"])

@router.get("/category/{month}")
async def get_category_data(month: int):
    return aggregate_category_by_month(transaction_list["transactions"],month)

@router.get("/channel/{month}")
async def get_channel_data(month: int):
    return aggregate_channel_by_month(transaction_list["transactions"],month)

@router.get("/word/{tag}")
async def get_word_data(tag):
    return aggregate_category_by_time_period(transaction_list["transactions"],tag)