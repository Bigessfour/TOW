# PowerShell script to permanently add Node.js to system PATH
# Run this as Administrator to fix Node.js command line access

Write-Host "Fixing Node.js PATH configuration..." -ForegroundColor Cyan

# Check if Node.js is installed
$nodePath = "C:\Program Files\nodejs"
if (Test-Path $nodePath) {
    Write-Host "Node.js found at: $nodePath" -ForegroundColor Green
    
    # Get current system PATH
    $currentPath = [System.Environment]::GetEnvironmentVariable("PATH", "Machine")
    
    # Check if Node.js is already in PATH
    if ($currentPath -split ";" -contains $nodePath) {
        Write-Host "Node.js is already in system PATH" -ForegroundColor Green
    } else {
        try {
            # Add Node.js to system PATH
            $newPath = $currentPath + ";" + $nodePath
            [System.Environment]::SetEnvironmentVariable("PATH", $newPath, "Machine")
            Write-Host "Node.js added to system PATH successfully!" -ForegroundColor Green
            Write-Host "Please restart your PowerShell/Command Prompt for changes to take effect" -ForegroundColor Yellow
        } catch {
            Write-Host "Failed to update system PATH. Please run as Administrator." -ForegroundColor Red
            Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    
    # Add to current session PATH
    $env:PATH += ";$nodePath"
    Write-Host "Node.js added to current session PATH" -ForegroundColor Green
    
    # Test Node.js and npm
    Write-Host "`nTesting Node.js installation..." -ForegroundColor Cyan
    
    try {
        $nodeVersion = & node --version
        $npmVersion = & npm --version
        Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
        Write-Host "npm version: $npmVersion" -ForegroundColor Green
    } catch {
        Write-Host "Error testing Node.js: $($_.Exception.Message)" -ForegroundColor Red
    }
    
} else {
    Write-Host "Node.js not found at expected location: $nodePath" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
}

Write-Host "`nSetup complete! You can now run:" -ForegroundColor Green
Write-Host "  • node --version" -ForegroundColor White
Write-Host "  • npm --version" -ForegroundColor White
Write-Host "  • npm test" -ForegroundColor White
Write-Host "  • npm run test:yaml" -ForegroundColor White
Write-Host "  • npm run validate" -ForegroundColor White
