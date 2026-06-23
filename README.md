# IPL Match Prediction

A full-stack Machine Learning web application that predicts the winner of an IPL match using historical IPL data.

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios

### Backend

* FastAPI
* Python
* LightGBM
* Scikit-Learn
* Pandas

### Machine Learning

* LightGBM Classifier
* Label Encoding
* Historical IPL Match Data (2008–2020)

---

## Project Structure

```text
IPL-Match-Prediction/

├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── predictor.py
│   │   ├── schemas.py
│   │   └── train_model.py
│   │
│   ├── data/
│   ├── model/
│   ├── requirements.txt
│   └── venv/
│
└── README.md
```

---

## Features

* Predict IPL match winners
* Machine Learning powered predictions
* FastAPI REST API
* React frontend
* Dynamic metadata loading
* Confidence score for predictions
* Responsive UI

---

## Backend Setup

### Navigate to backend

```bash
cd backend
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

Windows:

```bash
venv\Scripts\activate
```

Linux / Mac:

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Train Model

```bash
python app/train_model.py
```

This generates:

```text
backend/model/ipl_model.pkl
```

### Start Backend Server

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

---

## Frontend Setup

### Navigate to frontend

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Start Frontend

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## API Endpoints

### Health Check

```http
GET /
```

### Metadata

```http
GET /metadata
```

Returns:

```json
{
  "teams": [],
  "cities": [],
  "venues": []
}
```

### Predict Match Winner

```http
POST /predict
```

Request:

```json
{
  "team1": "Mumbai Indians",
  "team2": "Chennai Super Kings",
  "toss_winner": "Mumbai Indians",
  "toss_decision": "bat",
  "venue": "Wankhede Stadium",
  "city": "Mumbai"
}
```

Response:

```json
{
  "winner": "Mumbai Indians",
  "confidence": 82.54
}
```

---

## Future Improvements

* Team logos
* Prediction history
* Probability charts
* Docker support
* Deployment on Render and Vercel
* Live IPL match integrations

---

## Author

Ganji Venkat Rohit

GitHub:
https://github.com/GanjiVenkatRohit
