import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from fare_engine import FareEngine, TRANSPORT_CONFIG, LOCATION_COORDS
from datetime import datetime

app = Flask(__name__)

# Allow requests from any origin (Vercel frontend)
CORS(app, resources={r"/api/*": {"origins": "*"}})

engine = FareEngine()


@app.route("/")
def index():
    return jsonify({"service": "SmartRide BD API", "version": "2.0.0", "status": "running"})


@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "service": "SmartRide BD API", "version": "2.0.0"})


@app.route("/api/predict-fare", methods=["POST"])
def predict_fare():
    d = request.get_json() or {}
    pickup   = d.get("pickup", "").strip()
    dest     = d.get("destination", "").strip()
    t_type   = d.get("transport_type", "uber_x")
    weather  = d.get("weather", "clear")
    hour     = int(d.get("hour", datetime.now().hour))
    dow      = int(d.get("day_of_week", datetime.now().weekday()))
    if not pickup or not dest:
        return jsonify({"error": "pickup and destination required"}), 400
    return jsonify(engine.predict(pickup, dest, t_type, weather, hour, dow))


@app.route("/api/compare-rides", methods=["POST"])
def compare_rides():
    d = request.get_json() or {}
    pickup  = d.get("pickup", "").strip()
    dest    = d.get("destination", "").strip()
    weather = d.get("weather", "clear")
    hour    = int(d.get("hour", datetime.now().hour))
    dow     = int(d.get("day_of_week", datetime.now().weekday()))
    if not pickup or not dest:
        return jsonify({"error": "pickup and destination required"}), 400
    comparisons    = engine.compare_all(pickup, dest, weather, hour, dow)
    recommendation = engine.recommend(comparisons, weather, hour)
    return jsonify({"comparisons": comparisons, "recommendation": recommendation})


@app.route("/api/surge")
def surge():
    hour    = request.args.get("hour",    datetime.now().hour, type=int)
    weather = request.args.get("weather", "clear")
    dow     = request.args.get("dow",     datetime.now().weekday(), type=int)
    return jsonify(engine.get_surge_info(weather, hour, dow))


@app.route("/api/analytics")
def analytics():
    return jsonify(engine.get_analytics())


@app.route("/api/locations")
def locations():
    q = request.args.get("q", "").lower().strip()
    all_locs = [k.title() for k in LOCATION_COORDS]
    filtered = [l for l in all_locs if q in l.lower()] if q else all_locs
    return jsonify({"locations": filtered[:15]})


@app.route("/api/fare-info")
def fare_info():
    return jsonify({
        t: {
            "name":       cfg["name"],
            "base_fare":  cfg["base_fare"],
            "per_km":     cfg["per_km"],
            "per_min":    cfg.get("per_min", 0),
            "min_fare":   cfg["min_fare"],
            "fare_note":  cfg["fare_note"],
            "source":     cfg["source"],
            "negotiated": cfg["negotiated"],
            "fixed_fare": cfg["fixed_fare"],
        }
        for t, cfg in TRANSPORT_CONFIG.items()
    })


if __name__ == "__main__":
    # Use PORT env variable — required by Render
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
