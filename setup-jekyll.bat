@echo off
REM Set Ruby and Jekyll paths for Town of Wiley project
set RUBY_PATH=C:\Ruby31-x64
set PATH=%RUBY_PATH%\bin;%PATH%

REM Verify Ruby is available
echo Checking Ruby installation...
ruby --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Ruby not found at %RUBY_PATH%
    pause
    exit /b 1
)

REM Check if bundle is available
bundle --version
if %ERRORLEVEL% NEQ 0 (
    echo Installing bundler...
    gem install bundler
)

REM Install Jekyll dependencies
echo Installing Jekyll dependencies...
bundle install

REM Build Jekyll site
echo Building Jekyll site...
bundle exec jekyll build

echo.
echo Jekyll build complete! Site built in _site directory.
echo.
pause
