@echo off
echo ========================================
echo Town of Wiley - Node.js Setup
echo ========================================
echo.

echo Checking if Node.js is already installed...
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Node.js is already installed!
    node --version
    npm --version
    echo.
    echo Proceeding to install project dependencies...
    goto :install_deps
)

echo Node.js not found. Setting up Node.js installation...
echo.

echo Option 1: Download and install Node.js automatically
echo Option 2: Manual installation instructions
echo.
set /p choice="Choose option (1 or 2): "

if "%choice%"=="1" goto :auto_install
if "%choice%"=="2" goto :manual_install

:auto_install
echo.
echo Downloading Node.js LTS (Latest Stable Version)...
echo This will download and install Node.js v20.x LTS

:: Create temp directory
if not exist "%TEMP%\nodejs_setup" mkdir "%TEMP%\nodejs_setup"
cd /d "%TEMP%\nodejs_setup"

echo.
echo Downloading Node.js installer...
powershell -Command "& {Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.13.1/node-v20.13.1-x64.msi' -OutFile 'nodejs-installer.msi'}"

if exist "nodejs-installer.msi" (
    echo.
    echo Starting Node.js installation...
    echo Please follow the installer prompts and accept default settings.
    echo.
    pause
    msiexec /i nodejs-installer.msi /passive
    
    echo.
    echo Installation complete! Please restart your command prompt.
    echo Then run this script again to install project dependencies.
    echo.
    pause
    exit /b 0
) else (
    echo Download failed. Please use manual installation.
    goto :manual_install
)

:manual_install
echo.
echo ========================================
echo Manual Node.js Installation Instructions
echo ========================================
echo.
echo 1. Open your web browser
echo 2. Go to: https://nodejs.org/
echo 3. Click "Download Node.js (LTS)" - the green button
echo 4. Run the downloaded installer (.msi file)
echo 5. Follow the installation wizard with default settings
echo 6. Restart your command prompt
echo 7. Run this script again: setup-nodejs.bat
echo.
echo The LTS version includes both Node.js and npm automatically.
echo.
pause
exit /b 0

:install_deps
echo.
echo ========================================
echo Installing Project Dependencies
echo ========================================
echo.

echo Installing development tools for testing...
npm install

if %errorlevel% == 0 (
    echo.
    echo ✅ Setup complete! Node.js and project dependencies installed.
    echo.
    echo Available commands:
    echo   npm start          - Start local development server
    echo   npm run validate   - Run HTML/CSS validation
    echo   npm run lighthouse - Run accessibility audit
    echo   npm test          - Run all tests
    echo.
    echo Starting local development server...
    echo Your website will open at: http://localhost:3000
    echo.
    npm start
) else (
    echo.
    echo ❌ Error installing dependencies. Please check your internet connection.
    echo.
    pause
)

echo.
pause
