@echo off
echo Setting up Git repository for Vehicle Damage Detection System...
echo.

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from: https://git-scm.com/
    pause
    exit /b 1
)

echo Git is installed. Version:
git --version
echo.

REM Initialize Git repository if not already initialized
if not exist ".git" (
    echo Initializing Git repository...
    git init
    echo.
) else (
    echo Git repository already initialized.
    echo.
)

REM Add all files
echo Adding files to Git...
git add .
echo.

REM Check if there are changes to commit
git status --porcelain >nul 2>&1
if %errorlevel% neq 0 (
    echo No changes to commit.
    echo.
) else (
    echo Changes detected. Creating initial commit...
    git commit -m "Initial commit: Vehicle Damage Detection System

- FastAPI backend with computer vision algorithms
- Next.js frontend with TypeScript
- Comprehensive documentation and deployment guides
- MIT License"
    echo.
)

echo Git repository setup complete!
echo.
echo Next steps:
echo 1. Create a new repository on GitHub
echo 2. Add your GitHub repository as remote origin:
echo    git remote add origin https://github.com/yourusername/vehicle-damage-detector.git
echo 3. Push your code:
echo    git push -u origin main
echo.
echo Repository status:
git status
echo.
pause
