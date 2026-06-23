from pathlib import Path
import pandas as pd
import joblib

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "model" / "ipl_model.pkl"

saved_data = joblib.load(MODEL_PATH)

model = saved_data["model"]
encoders = saved_data["encoders"]

DATA_PATH = BASE_DIR / "data" / "IPL Matches 2008-2020 (2).csv"
df_matches = pd.read_csv(DATA_PATH)
df_matches.loc[df_matches['venue'] == 'Dubai International Cricket Stadium', 'city'] = 'Dubai'
df_matches.loc[df_matches['venue'] == 'Sharjah Cricket Stadium', 'city'] = 'Sharjah'
df_matches = df_matches.dropna(subset=["team1", "team2", "venue", "city"])


def get_common_venues_with_cities(team1: str, team2: str):
    # Matches where team1 played
    t1_df = df_matches[(df_matches['team1'] == team1) | (df_matches['team2'] == team1)]
    # Matches where team2 played
    t2_df = df_matches[(df_matches['team1'] == team2) | (df_matches['team2'] == team2)]
    
    # Common venues
    common_venues = set(t1_df['venue'].unique()).intersection(set(t2_df['venue'].unique()))
    
    # Extract unique venue-city combinations
    result = []
    for venue in sorted(common_venues):
        city = df_matches[df_matches['venue'] == venue]['city'].iloc[0]
        result.append({"venue": venue, "city": city})
    return result



def predict_match(data):

    input_df = pd.DataFrame([{
        "team1": data.team1,
        "team2": data.team2,
        "toss_winner": data.toss_winner,
        "toss_decision": data.toss_decision,
        "venue": data.venue,
        "city": data.city
    }])

    for column in input_df.columns:
        input_df[column] = encoders[column].transform(
            input_df[column]
        )

    prediction = model.predict(input_df)[0]

    probability = model.predict_proba(input_df)

    confidence = round(
        max(probability[0]) * 100,
        2
    )

    winner = encoders["winner"].inverse_transform(
        [prediction]
    )[0]

    return {
        "winner": winner,
        "confidence": confidence
    }


def get_metadata():
    return {
        "teams": list(encoders["team1"].classes_),
    }