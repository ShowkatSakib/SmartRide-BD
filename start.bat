@echo off
echo =============================================
echo   SmartRide BD - Starting Development Server
echo =============================================

echo.
echo [1/2] Starting Flask Backend...
cd backend
start cmd /k "pip install -r requirements.txt && python app.py"
cd ..

timeout /t 3 /nobreak >nul

echo.
echo [2/2] Starting React Frontend...
cd frontend
start cmd /k "npm install && npm start"
cd ..

echo.
echo =============================================
echo   SmartRide BD is starting up!
echo   Backend: http://localhost:5000
echo   Frontend: http://localhost:3000
echo =============================================
