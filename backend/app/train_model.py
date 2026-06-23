from pathlib import Path
from pathlib import Path
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from lightgbm import LGBMClassifier
from sklearn.metrics import accuracy_score
import joblib

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_PATH = BASE_DIR / "data" / "IPL Matches 2008-2020 (2).csv"
MODEL_PATH = BASE_DIR / "model" / "ipl_model.pkl"

df = pd.read_csv(DATA_PATH)

# Keep only columns needed for prediction
df = df[
    [
        "team1",
        "team2",
        "toss_winner",
        "toss_decision",
        "venue",
        "city",
        "winner",
    ]
]

# Remove null values
df = df.dropna()

# Create encoders
encoders = {}

for column in df.columns:
    encoder = LabelEncoder()
    df[column] = encoder.fit_transform(df[column])
    encoders[column] = encoder

# Features and Target
X = df.drop("winner", axis=1)
y = df["winner"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Model
model = LGBMClassifier(
    random_state=42
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    predictions
)

print(f"Accuracy: {accuracy * 100:.2f}%")

# Save model
joblib.dump(
    {
        "model": model,
        "encoders": encoders
    },
    MODEL_PATH
)

print("Model saved successfully")