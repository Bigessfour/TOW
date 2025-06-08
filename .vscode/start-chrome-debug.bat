@echo off
echo Starting Chrome with remote debugging enabled...
echo.

REM Kill any existing Chrome processes to avoid conflicts
taskkill /f /im chrome.exe >nul 2>&1

REM Wait a moment for processes to close
timeout /t 2 /nobreak >nul

REM Start Chrome with debugging enabled
echo Starting Chrome on port 9222...
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" ^
    --remote-debugging-port=9222 ^
    --new-window ^
    --user-data-dir="%~dp0chrome-debug-profile" ^
    "file://%~dp0..\index.html"

echo.
echo Chrome started with remote debugging on port 9222
echo You can now use "Attach to Chrome (Port 9222)" in VS Code
echo.
echo To check if debugging is working, open: http://localhost:9222
echo.
pause
