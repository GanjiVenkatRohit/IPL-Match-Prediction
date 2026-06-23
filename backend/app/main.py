from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import MatchPredictionRequest

from app.predictor import (
    predict_match,
    get_metadata,
    get_common_venues_with_cities
)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health():
    return {
        "status": "running"
    }


@app.post("/predict")
def predict(
    data: MatchPredictionRequest
):
    return predict_match(data)

@app.get("/metadata")
def metadata():
    return get_metadata()

@app.get("/venues")
def venues(team1: str, team2: str):
    return get_common_venues_with_cities(team1, team2)