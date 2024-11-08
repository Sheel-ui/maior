from .config import create_app
from .routes import items, data_routes

app = create_app()

# Register the routers
app.include_router(items.router, prefix="/items", tags=["items"])
app.include_router(data_routes.router, tags=["data"])

@app.get("/")
def root():
    return {"message": "App is running!"}
