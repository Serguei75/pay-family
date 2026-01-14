@echo off
REM Pay Family - Quick Start Script (Windows)
REM This script automates the initial setup

echo.
echo ========================================
echo   Pay Family - Quick Start Setup
echo ========================================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Node.js is not installed
    echo   Download from: https://nodejs.org
    exit /b 1
)

for /f "tokens=*" %%A in ('node --version') do set NODE_VERSION=%%A
for /f "tokens=*" %%A in ('npm --version') do set NPM_VERSION=%%A

echo + Node.js %NODE_VERSION%
echo + npm %NPM_VERSION%
echo.

REM Install dependencies
echo Installing dependencies...
call npm install
echo + Dependencies installed
echo.

REM Create .env.local
if not exist ".env.local" (
    echo Creating .env.local...
    copy .env.puter.example .env.local
    echo + .env.local created
    echo.
    echo IMPORTANT: Update .env.local with your Puter App ID
    echo   1. Visit: https://puter.com/developers
    echo   2. Create application and copy App ID
    echo   3. Edit .env.local and set VITE_PUTER_APP_ID
    echo.
) else (
    echo + .env.local already exists
)

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo   1. Update .env.local with your Puter App ID
echo   2. Run: npm run dev
echo   3. Open: http://localhost:5173
echo.
echo For more information:
echo   - Installation: see INSTALL.md
echo   - Security: see SECURITY.md
echo   - Mobile setup: see MOBILE_SETUP.md
echo.
pause
