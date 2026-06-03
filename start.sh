#!/bin/bash

echo "============================================="
echo "  SmartRide BD - Starting Development Server"
echo "============================================="

# Start backend
echo ""
echo "[1/2] Starting Flask Backend..."
cd backend
pip install -r requirements.txt -q
python app.py &
BACKEND_PID=$!
cd ..

sleep 2

# Start frontend
echo ""
echo "[2/2] Starting React Frontend..."
cd frontend
npm install --silent
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "============================================="
echo "  SmartRide BD is running!"
echo "  Backend:  http://localhost:5000"
echo "  Frontend: http://localhost:3000"
echo "============================================="
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait and handle exit
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Servers stopped.'; exit" INT
wait
