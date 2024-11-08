from fastapi import APIRouter
from ..db import transaction_list
from ..helpers.parse import get_last_three_months_data, get_last_week_data

router = APIRouter()

@router.get("/test")
def get_test_data():
    return get_last_week_data(transaction_list["transactions"])

@router.get("/time-series")
def get_test_data():
    return transaction_list["transactions"]

# Additional routes for line and bar data
@router.get("/line")
async def get_line_data():
    return {"data": [
        { "month": "January", "desktop": 186, "mobile": 80 },
        { "month": "February", "desktop": 305, "mobile": 200 },
        { "month": "March", "desktop": 237, "mobile": 120 },
        { "month": "April", "desktop": 73, "mobile": 190 },
        { "month": "May", "desktop": 209, "mobile": 130 },
        { "month": "June", "desktop": 214, "mobile": 140 },
    ]}
    
@router.get("/bar")
async def get_bar_data():
    return {"data": [
        { "browser": "chrome", "visitors": 275, "fill": "var(--color-chrome)" },
        { "browser": "safari", "visitors": 200, "fill": "var(--color-safari)" },
        { "browser": "firefox", "visitors": 287, "fill": "var(--color-firefox)" },
        { "browser": "edge", "visitors": 173, "fill": "var(--color-edge)" },
        { "browser": "other", "visitors": 190, "fill": "var(--color-other)" },
    ]}