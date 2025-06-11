@echo off
echo ===================================================
echo    Town of Wiley - Tailwind CSS Build Process
echo ===================================================
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    goto :error
)

REM Check if tailwindcss is installed
call npm list tailwindcss --depth=0 >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: tailwindcss not found in local dependencies
    echo Installing tailwindcss...
    call npm install tailwindcss@^2.2.19 --save-dev
    if %ERRORLEVEL% NEQ 0 goto :error
)

echo.
echo Building Tailwind CSS for government website...
echo Input:  ./assets/css/tailwind.css
echo Output: ./assets/css/styles.css
echo.

REM Build the CSS
echo Building development version first...
call npx tailwindcss -i ./assets/css/tailwind.css -o ./assets/css/styles.css
if %ERRORLEVEL% NEQ 0 goto :error

echo.
echo Building production version with minification...
call npx tailwindcss -i ./assets/css/tailwind.css -o ./assets/css/styles.css --minify
if %ERRORLEVEL% NEQ 0 goto :error

REM Check if the output file exists and has content
if not exist "./assets/css/styles.css" goto :filenotfound
for %%A in ("./assets/css/styles.css") do if %%~zA==0 goto :emptyfile

echo.
echo ✅ SUCCESS: Tailwind CSS built successfully!
echo File size: 
dir /Q "./assets/css/styles.css" | findstr /C:"styles.css"
echo.
echo Your government website now has locally-built Tailwind CSS.
echo No CDN dependencies needed!
goto :end

:filenotfound
echo.
echo ❌ ERROR: Output file was not created.
echo Please check your tailwind.config.js and assets/css/tailwind.css
goto :error

:emptyfile
echo.
echo ❌ ERROR: Output file is empty.
echo This might indicate an issue with your configuration or source file.
goto :error

:error
echo.
echo Build failed. Please check the errors above.
echo.
pause
exit /b 1

:end
echo.
echo Press any key to exit...
pause >nul
exit /b 0
