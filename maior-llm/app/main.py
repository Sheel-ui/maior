from .config import create_app
from .routes import data_routes

app = create_app()

# Register the routers
app.include_router(data_routes.router, tags=["data"])

@app.get("/")
def root():
    return {"message": "App is running!"}
