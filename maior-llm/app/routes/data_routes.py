from fastapi import APIRouter
from ..db import transaction_list
from ..helpers.parse import get_last_three_months_data, get_last_week_data, create_spending_dict

router = APIRouter()

@router.get("/line")
def get_test_data():
    return get_last_week_data(transaction_list["transactions"])

@router.get("/time-series")
def get_test_data():
    return create_spending_dict(transaction_list["transactions"])

    
@router.get("/bar")
async def get_bar_data():
    return {"data": [
        { "browser": "chrome", "visitors": 275, "fill": "var(--color-chrome)" },
        { "browser": "safari", "visitors": 200, "fill": "var(--color-safari)" },
        { "browser": "firefox", "visitors": 287, "fill": "var(--color-firefox)" },
        { "browser": "edge", "visitors": 173, "fill": "var(--color-edge)" },
        { "browser": "other", "visitors": 190, "fill": "var(--color-other)" },
    ]}