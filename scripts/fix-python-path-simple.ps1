# Simple Python PATH Fix for Town of Wiley Website Project
param(
    [switch]$Permanent,
    [switch]$Test
)

Write-Host "=== Town of Wiley - Python PATH Fix ===" -ForegroundColor Green

# Define Python paths
$PythonBase = "C:\Users\biges\AppData\Local\Programs\Python\Python312"
$PythonScripts = "$PythonBase\Scripts"

# Function to test if Python is accessible
function Test-Python {
    try {
        $version = & python --version 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Python is accessible: $version" -ForegroundColor Green
            return $true
        } else {
            Write-Host "Python not accessible" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "Python not found in PATH" -ForegroundColor Red
        return $false
    }
}

# Function to add to current session PATH
function Set-SessionPath {
    Write-Host "Adding Python to current session PATH..." -ForegroundColor Yellow
    
    $currentPath = $env:PATH
    
    # Check if Python paths are already in PATH
    if ($currentPath -notlike "*$PythonBase*") {
        $env:PATH = "$PythonBase;$PythonScripts;$currentPath"
        Write-Host "Added Python paths to session PATH" -ForegroundColor Green
    } else {
        Write-Host "Python paths already in session PATH" -ForegroundColor Green
    }
}

# Function to verify Python installation
function Test-PythonInstallation {
    Write-Host "Verifying Python installation..." -ForegroundColor Cyan
    
    if (Test-Path "$PythonBase\python.exe") {
        Write-Host "Python executable found at: $PythonBase\python.exe" -ForegroundColor Green
        
        # Get version directly from executable
        $version = & "$PythonBase\python.exe" --version 2>&1
        Write-Host "Version: $version" -ForegroundColor Green
        
        # Check pip
        if (Test-Path "$PythonScripts\pip.exe") {
            Write-Host "pip found at: $PythonScripts\pip.exe" -ForegroundColor Green
        } else {
            Write-Host "pip not found - may need to reinstall Python with pip" -ForegroundColor Yellow
        }
        
        return $true
    } else {
        Write-Host "Python executable not found at expected location" -ForegroundColor Red
        return $false
    }
}

# Function to test Jekyll integration
function Test-JekyllIntegration {
    Write-Host "Testing Jekyll integration..." -ForegroundColor Cyan
    
    # Test Ruby path
    $rubyPath = "C:\Ruby31-x64\bin"
    if (Test-Path "$rubyPath\ruby.exe") {
        Write-Host "Ruby found at: $rubyPath" -ForegroundColor Green
        
        # Test Jekyll
        if (Test-Path "$rubyPath\jekyll.bat") {
            Write-Host "Jekyll found at: $rubyPath\jekyll.bat" -ForegroundColor Green
        } else {
            Write-Host "Jekyll not found" -ForegroundColor Red
        }
    } else {
        Write-Host "Ruby not found at expected location" -ForegroundColor Red
    }
}

# Main execution
Write-Host "Starting Python PATH diagnosis and fix..." -ForegroundColor Cyan

# 1. Verify Python installation
if (-not (Test-PythonInstallation)) {
    Write-Host "ERROR: Python installation not found at expected location" -ForegroundColor Red
    Write-Host "Please verify Python 3.12 is installed correctly" -ForegroundColor Red
    exit 1
}

# 2. Test current Python accessibility
Write-Host "Testing current Python accessibility..." -ForegroundColor Cyan
$pythonWorking = Test-Python

if (-not $pythonWorking) {
    # 3. Fix session PATH
    Set-SessionPath
    
    # 4. Test again
    Write-Host "Testing Python after PATH fix..." -ForegroundColor Cyan
    $pythonWorking = Test-Python
}

# 5. Test Jekyll integration
if ($pythonWorking) {
    Test-JekyllIntegration
}

# 6. Provide summary and next steps
Write-Host "=== Summary ===" -ForegroundColor Green
if ($pythonWorking) {
    Write-Host "Python is now accessible" -ForegroundColor Green
    Write-Host "Next steps for Town of Wiley website:" -ForegroundColor Cyan
    Write-Host "1. Run: bundle exec jekyll build" -ForegroundColor White
    Write-Host "2. Edit files in _pages/ folder (e.g., _pages/services.md)" -ForegroundColor White
    Write-Host "3. Run: bundle exec jekyll build (to rebuild after changes)" -ForegroundColor White
    Write-Host "4. Use tasks: 'Start Town Development Server' to preview" -ForegroundColor White
} else {
    Write-Host "Python setup incomplete" -ForegroundColor Red
    Write-Host "Manual steps needed:" -ForegroundColor Yellow
    Write-Host "1. Add to Windows PATH: $PythonBase" -ForegroundColor White
    Write-Host "2. Add to Windows PATH: $PythonScripts" -ForegroundColor White
    Write-Host "3. Restart PowerShell and run this script again" -ForegroundColor White
}

if ($Test) {
    Write-Host "=== Test Mode Complete ===" -ForegroundColor Magenta
}
