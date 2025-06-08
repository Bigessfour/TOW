@echo off
echo ========================================
echo Town of Wiley Website - Git Setup
echo ========================================
echo.

echo Initializing Git repository...
git init

echo.
echo Adding all files...
git add .

echo.
echo Creating initial commit...
git commit -m "Initial commit: Complete Town of Wiley website implementation

Features implemented:
- ADA/WCAG 2.1 Level AA compliant design
- Emergency alerts and mass notification system
- Online payment portal and digital forms
- Local business directory with search
- Comprehensive privacy policy and cookie consent
- Multi-language support and accessibility controls
- Responsive design for all devices
- GitHub Actions for automated testing
- Complete documentation and deployment guides"

echo.
echo Adding remote repository...
git remote add origin https://github.com/Bigessfour/TOW.git

echo.
echo Setting main branch...
git branch -M main

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Your website is now available at:
echo https://github.com/Bigessfour/TOW
echo.
echo To enable GitHub Pages:
echo 1. Go to repository Settings
echo 2. Scroll to Pages section
echo 3. Set source to "Deploy from branch"
echo 4. Select "main" branch
echo 5. Your site will be live at:
echo    https://bigessfour.github.io/TOW/
echo.
echo For local development:
echo   npm install
echo   npm start
echo.
pause
