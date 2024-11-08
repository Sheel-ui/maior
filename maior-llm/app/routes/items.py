# app/routes/items.py
from fastapi import APIRouter, HTTPException
from typing import List
from ..models import Item
from ..db import items_db

router = APIRouter()

@router.post("/", response_model=Item)
def create_item(item: Item):
    item_id = len(items_db) + 1
    items_db[item_id] = item
    return item

@router.get("/{item_id}", response_model=Item)
def read_item(item_id: int):
    item = items_db.get(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@router.get("/", response_model=List[Item])
def read_items():
    return list(items_db.values())

@router.put("/{item_id}", response_model=Item)
def update_item(item_id: int, item: Item):
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    items_db[item_id] = item
    return item

@router.delete("/{item_id}")
def delete_item(item_id: int):
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    del items_db[item_id]
    return {"detail": "Item deleted successfully"}
