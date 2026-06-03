# SmartRide BD — Backend API

## Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

API runs at: http://localhost:5000

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| POST | /api/predict-fare | Predict fare for single transport |
| POST | /api/compare-rides | Compare all transport types |
| GET | /api/analytics | Analytics dashboard data |
| GET | /api/surge?hour=&weather= | Get current surge info |
| GET | /api/locations?q= | Search locations |

## POST /api/predict-fare

```json
{
  "pickup": "Dhanmondi",
  "destination": "Gulshan",
  "transport_type": "car",
  "weather": "clear",
  "hour": 18,
  "day_of_week": 1
}
```

## POST /api/compare-rides

```json
{
  "pickup": "Dhanmondi",
  "destination": "Gulshan",
  "weather": "rain",
  "hour": 18,
  "day_of_week": 1
}
```

## Transport Types
- `bike` — Motorcycle taxi
- `pathao` — Pathao bike
- `cng` — CNG Auto-rickshaw
- `rickshaw` — Cycle rickshaw
- `car` — Uber Car
- `bus` — Local bus

## Weather Options
- `clear`, `cloudy`, `rain`, `heavy_rain`, `storm`, `fog`
