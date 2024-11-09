from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db import initialize_db

origins = [
    "http://localhost:5173",
    "http://localhost:8080",
]

def create_app() -> FastAPI:
    app = FastAPI()

    # Add CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    initialize_db()

    return app
