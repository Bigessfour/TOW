# PowerShell script to start Chrome with debugging
Write-Host "🚀 Starting Chrome with remote debugging..." -ForegroundColor Green
Write-Host ""

# Get the current directory
$currentDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$workspaceDir = Split-Path -Parent $currentDir
$indexPath = Join-Path $workspaceDir "index.html"
$userDataDir = Join-Path $currentDir "chrome-debug-profile"

# Kill existing Chrome processes
Write-Host "🔄 Closing existing Chrome instances..." -ForegroundColor Yellow
Get-Process chrome -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Find Chrome executable
$chromePaths = @(
    "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "${env:LOCALAPPDATA}\Google\Chrome\Application\chrome.exe"
)

$chromeExe = $null
foreach ($path in $chromePaths) {
    if (Test-Path $path) {
        $chromeExe = $path
        break
    }
}

if (-not $chromeExe) {
    Write-Host "❌ Chrome not found! Please install Google Chrome." -ForegroundColor Red
    Write-Host "Download from: https://www.google.com/chrome/" -ForegroundColor Yellow
    pause
    exit 1
}

# Start Chrome with debugging
Write-Host "🌐 Starting Chrome with debugging on port 9222..." -ForegroundColor Green
Write-Host "📁 User data directory: $userDataDir" -ForegroundColor Cyan
Write-Host "📄 Opening file: file:///$($indexPath.Replace('\', '/'))" -ForegroundColor Cyan

$arguments = @(
    "--remote-debugging-port=9222",
    "--new-window",
    "--disable-web-security",
    "--user-data-dir=`"$userDataDir`"",
    "file:///$($indexPath.Replace('\', '/'))"
)

Start-Process -FilePath $chromeExe -ArgumentList $arguments

Write-Host ""
Write-Host "✅ Chrome started successfully!" -ForegroundColor Green
Write-Host "🔗 Debug endpoint: http://localhost:9222" -ForegroundColor Yellow
Write-Host "🎯 In VS Code, select 'Attach to Chrome (Port 9222)' and press F5" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
