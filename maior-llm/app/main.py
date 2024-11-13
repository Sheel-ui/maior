from .config import create_app
from .routes import data_routes

app = create_app()

app.include_router(data_routes.router, tags=["data"])
