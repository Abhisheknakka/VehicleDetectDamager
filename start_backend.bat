@echo off
echo Starting Vehicle Damage Detection Backend...
echo.
cd backend
echo Installing Python dependencies...
pip install -r requirements.txt
echo.
echo Starting FastAPI server...
python main.py
pause
