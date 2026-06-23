from pydantic import BaseModel

class MatchPredictionRequest(BaseModel):
    team1: str
    team2: str
    toss_winner: str
    toss_decision: str
    venue: str
    city: str


class MatchPredictionResponse(BaseModel):
    winner: str
    confidence: float