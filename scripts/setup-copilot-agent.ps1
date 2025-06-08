# Town of Wiley - GitHub Copilot Agentic Workflow Setup

Write-Host "Setting up GitHub Copilot Agentic Workflow for Town of Wiley..." -ForegroundColor Green

# Check if VS Code is installed
$vscodeExists = Get-Command code -ErrorAction SilentlyContinue
if (-not $vscodeExists) {
    Write-Host "❌ VS Code not found. Please install VS Code first." -ForegroundColor Red
    exit 1
}

# Check if GitHub CLI is installed
$ghExists = Get-Command gh -ErrorAction SilentlyContinue
if (-not $ghExists) {
    Write-Host "❌ GitHub CLI not found. Installing..." -ForegroundColor Yellow
    winget install GitHub.cli
}

# Check Git configuration
$gitUser = git config user.name
$gitEmail = git config user.email

if (-not $gitUser -or -not $gitEmail) {
    Write-Host "❌ Git not configured. Please run:" -ForegroundColor Red
    Write-Host "git config --global user.name 'Your Name'"
    Write-Host "git config --global user.email 'your.email@example.com'"
    exit 1
}

Write-Host "✅ Git configured for: $gitUser <$gitEmail>" -ForegroundColor Green

# Check GitHub authentication
try {
    $authStatus = gh auth status 2>&1
    if ($authStatus -match "Logged in") {
        Write-Host "✅ GitHub CLI authenticated" -ForegroundColor Green
    } else {
        Write-Host "❌ Please authenticate with GitHub CLI:" -ForegroundColor Red
        Write-Host "gh auth login"
        exit 1
    }
} catch {
    Write-Host "❌ Please authenticate with GitHub CLI:" -ForegroundColor Red
    Write-Host "gh auth login"
    exit 1
}

# Check VS Code extensions
Write-Host "Checking VS Code extensions..." -ForegroundColor Yellow

$requiredExtensions = @(
    "GitHub.copilot",
    "GitHub.copilot-chat",
    "GitHub.vscode-pull-request-github"
)

foreach ($extension in $requiredExtensions) {
    $installed = code --list-extensions | Select-String $extension
    if ($installed) {
        Write-Host "✅ $extension installed" -ForegroundColor Green
    } else {
        Write-Host "Installing $extension..." -ForegroundColor Yellow
        code --install-extension $extension
    }
}

Write-Host "`n🎉 Agentic Workflow Setup Complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Open VS Code: code ." -ForegroundColor White
Write-Host "2. Open Copilot Chat (Ctrl+Alt+I)" -ForegroundColor White
Write-Host "3. Create a GitHub issue or use existing ones" -ForegroundColor White
Write-Host "4. Assign the issue to GitHub Copilot" -ForegroundColor White
Write-Host "5. Give instructions in Copilot Chat" -ForegroundColor White

Write-Host "`nExample commands:" -ForegroundColor Cyan
Write-Host "@github Improve the header design with a smaller font size and green background" -ForegroundColor White
Write-Host "@github Fix accessibility issues in the navigation menu" -ForegroundColor White
Write-Host "@github Add a new section for community events" -ForegroundColor White
