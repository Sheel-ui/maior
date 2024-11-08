from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost:5173",  # Add your frontend's URL here (React, for example)
    "http://localhost:8080",

]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)
# In-memory "database" of items
items_db = {}

# Item model
class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    quantity: int

@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI sample app!"}

# Create a new item
@app.post("/items/", response_model=Item)
async def create_item(item: Item):
    item_id = len(items_db) + 1
    items_db[item_id] = item
    return item

# Get an item by ID
@app.get("/items/{item_id}", response_model=Item)
async def read_item(item_id: int):
    item = items_db.get(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

# Get all items
@app.get("/items/", response_model=List[Item])
async def read_items():
    return list(items_db.values())

# Update an item by ID
@app.put("/items/{item_id}", response_model=Item)
async def update_item(item_id: int, item: Item):
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    items_db[item_id] = item
    return item

# Delete an item by ID
@app.delete("/items/{item_id}")
async def delete_item(item_id: int):
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    del items_db[item_id]
    return {"detail": "Item deleted successfully"}

@app.get("/line")
async def root():
    return {"data": [
        { "month": "January", "desktop": 186, "mobile": 80 },
        { "month": "February", "desktop": 305, "mobile": 200 },
        { "month": "March", "desktop": 237, "mobile": 120 },
        { "month": "April", "desktop": 73, "mobile": 190 },
        { "month": "May", "desktop": 209, "mobile": 130 },
        { "month": "June", "desktop": 214, "mobile": 140 },
    ]}
    
@app.get("/bar")
async def root():
    return {"data": [
        { "browser": "chrome", "visitors": 275, "fill": "var(--color-chrome)" },
        { "browser": "safari", "visitors": 200, "fill": "var(--color-safari)" },
        { "browser": "firefox", "visitors": 287, "fill": "var(--color-firefox)" },
        { "browser": "edge", "visitors": 173, "fill": "var(--color-edge)" },
        { "browser": "other", "visitors": 190, "fill": "var(--color-other)" },
    ]}
