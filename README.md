# 🚗 SmartRide BD — AI-Powered Ride Fare & Transport Platform

> Intelligent ride planning and fare estimation for Dhaka, Bangladesh.
> All fares verified from official published sources.

---

## ✅ Real Verified Fares

| Transport | Base | Per KM | Min | Source |
|-----------|------|--------|-----|--------|
| 🏍️ Uber Moto | ৳30 | ৳12/km | ৳50 | Uber Bangladesh official |
| 🛵 Pathao Bike | ৳25 | ৳15/km | ৳50 | Pathao official (Aug 2022) |
| 🚗 UberX Car | ৳40 | ৳21/km + ৳3/min | ৳80 | Uber Dhaka official |
| 🛺 CNG Auto | ৳40/2km | ৳12/km + ৳2/min | ৳60 | BRTA govt meter (Feb 2025) |
| 🚲 Rickshaw | Negotiated | ~৳22/km | ৳30 | Common Dhaka street rate |
| 🚌 Local Bus | Flat ৳10 | ~৳2/km | ৳10 | BRTC approximate |

> **CNG note:** BRTA meter rate applies officially. Real street rate is typically 1.5–2× meter as most drivers don't follow the meter. Always negotiate before boarding.

> **Rickshaw note:** No official meter. Agree fare before boarding.

---

## 🏗️ Project Structure

```
smartride-bd/
├── backend/
│   ├── app.py            ← Flask REST API (6 endpoints)
│   ├── fare_engine.py    ← Real fare calculator with GPS Haversine distance
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── pages/        ← Home, Compare, Surge, Analytics
│       ├── components/   ← RideCard, LocationInput, ComparisonTable…
│       ├── data/
│       │   └── constants.js  ← Real fares + 53 Dhaka GPS locations
│       └── utils/api.js
├── smartride-mobile/
│   └── smartride-bd.html ← Standalone mobile app (no server needed!)
├── start.bat             ← Windows one-click start
└── start.sh              ← Mac/Linux one-click start
```

---

## 🚀 Quick Start

### Option A — Mobile HTML (No Setup Required)
Open `smartride-mobile/smartride-bd.html` directly in any browser.
Works on iPhone/Android. Save to home screen for app-like experience.

### Option B — Full React + Flask App

**Windows:**
```
start.bat
```

**Mac/Linux:**
```bash
chmod +x start.sh && ./start.sh
```

**Manual:**
```bash
# Terminal 1 — Backend
cd backend
pip install -r requirements.txt
python app.py          # http://localhost:5000

# Terminal 2 — Frontend
cd frontend
npm install
npm start              # http://localhost:3000
```

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| POST | /api/predict-fare | Single transport fare |
| POST | /api/compare-rides | All 6 transports + recommendation |
| GET | /api/surge | Current surge multiplier |
| GET | /api/analytics | Dashboard data |
| GET | /api/locations?q= | Location search |
| GET | /api/fare-info | Official fare reference |

### POST /api/compare-rides
```json
{
  "pickup": "Dhanmondi",
  "destination": "Gulshan 2",
  "weather": "rain",
  "hour": 18,
  "day_of_week": 1
}
```

---

## 🧠 Fare Calculation Logic

```
App rides (Uber/Pathao):
  Fare = (Base + Distance×PerKm + Time×PerMin) × SurgeMultiplier

CNG:
  Fare = (BRTA meter: ৳40/2km then ৳12/km + ৳2/min wait) × 1.6 (street reality)

Rickshaw:
  Fare = Base + Distance × ৳22/km  (rush hour: ×1.15)

Bus:
  Flat: ৳10 (<5km) / ৳15 (<12km) / ৳20 (longer)

Surge = TrafficFactor × WeatherFactor
  Morning rush (8–10am):  1.45×
  Evening rush (5–8pm):   1.55×
  Rain:                   1.35×
  Heavy rain:             1.65×
  Storm:                  2.0×
```

---

## 📦 Deployment

**Frontend → Vercel**
```bash
cd frontend && npm run build
# Deploy build/ to Vercel
# Set: REACT_APP_API_URL=https://your-backend.onrender.com
```

**Backend → Render**
- Build: `pip install -r requirements.txt`
- Start: `python app.py`

---

## 📝 Resume Bullets

- Built AI fare prediction platform with verified real-world Bangladesh transport pricing (Uber, Pathao, BRTA)
- Implemented Haversine GPS-based distance calculation for 53 Dhaka neighborhoods with Dhaka-specific road factor
- Developed dynamic surge pricing engine incorporating traffic patterns (rush hours, Jummah) and weather conditions
- Designed context-aware recommendation system selecting optimal transport based on rain, rush hour, and cost factors
- Created standalone mobile HTML app (no server) alongside full React + Flask stack for flexible deployment

---

## 📄 License
MIT
