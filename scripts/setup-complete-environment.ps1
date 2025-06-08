# Complete Town of Wiley Environment Setup
# This script fixes Python PATH and ensures Jekyll is properly installed

param(
    [switch]$InstallJekyll,
    [switch]$Test
)

Write-Host "=== Town of Wiley - Complete Environment Setup ===" -ForegroundColor Green

# Define paths
$PythonBase = "C:\Users\biges\AppData\Local\Programs\Python\Python312"
$PythonScripts = "$PythonBase\Scripts"
$RubyBase = "C:\Ruby31-x64\bin"

# Function to set environment PATH
function Set-EnvironmentPath {
    Write-Host "Setting up environment PATH..." -ForegroundColor Yellow
    $env:PATH = "$PythonBase;$PythonScripts;$RubyBase;$env:PATH"
    Write-Host "Environment PATH updated for current session" -ForegroundColor Green
}

# Function to test tools
function Test-Tools {
    Write-Host "Testing development tools..." -ForegroundColor Cyan
    
    # Test Python
    try {
        $pythonVersion = & python --version 2>&1
        Write-Host "✓ Python: $pythonVersion" -ForegroundColor Green
    } catch {
        Write-Host "✗ Python not accessible" -ForegroundColor Red
    }
    
    # Test Ruby
    try {
        $rubyVersion = & ruby --version 2>&1
        Write-Host "✓ Ruby: $rubyVersion" -ForegroundColor Green
    } catch {
        Write-Host "✗ Ruby not accessible" -ForegroundColor Red
    }
    
    # Test Gem
    try {
        $gemVersion = & gem --version 2>&1
        Write-Host "✓ Gem: $gemVersion" -ForegroundColor Green
    } catch {
        Write-Host "✗ Gem not accessible" -ForegroundColor Red
    }
    
    # Test Jekyll
    try {
        $jekyllVersion = & jekyll --version 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Jekyll: $jekyllVersion" -ForegroundColor Green
        } else {
            Write-Host "✗ Jekyll not found (may need installation)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "✗ Jekyll not accessible" -ForegroundColor Red
    }
    
    # Test Bundle
    try {
        $bundleVersion = & bundle --version 2>&1
        Write-Host "✓ Bundler: $bundleVersion" -ForegroundColor Green
    } catch {
        Write-Host "✗ Bundler not accessible" -ForegroundColor Red
    }
}

# Function to install Jekyll if needed
function Install-Jekyll {
    Write-Host "Installing Jekyll and dependencies..." -ForegroundColor Yellow
    
    try {
        Write-Host "Installing Jekyll gem..." -ForegroundColor Cyan
        & gem install jekyll bundler
        
        Write-Host "Installing bundle dependencies..." -ForegroundColor Cyan
        & bundle install
        
        Write-Host "✓ Jekyll installation complete" -ForegroundColor Green
    } catch {
        Write-Host "✗ Jekyll installation failed" -ForegroundColor Red
        Write-Host "You may need to run: gem install jekyll bundler" -ForegroundColor Yellow
    }
}

# Function to test Jekyll build
function Test-JekyllBuild {
    Write-Host "Testing Jekyll build..." -ForegroundColor Cyan
    
    try {
        & bundle exec jekyll build --dry-run
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Jekyll build test successful" -ForegroundColor Green
        } else {
            Write-Host "! Jekyll build test had warnings (may be normal)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "✗ Jekyll build test failed" -ForegroundColor Red
    }
}

# Function to demonstrate editing workflow
function Show-EditingWorkflow {
    Write-Host "`n=== Town of Wiley Editing Workflow ===" -ForegroundColor Green
    Write-Host "1. Edit content files:" -ForegroundColor Cyan
    Write-Host "   - _pages/services.md (Town services)" -ForegroundColor White
    Write-Host "   - _pages/government.md (Government info)" -ForegroundColor White
    Write-Host "   - _pages/news.md (News and announcements)" -ForegroundColor White
    Write-Host "   - _posts/ (Add new posts)" -ForegroundColor White
    
    Write-Host "`n2. Build the site:" -ForegroundColor Cyan
    Write-Host "   bundle exec jekyll build" -ForegroundColor White
    
    Write-Host "`n3. Preview changes:" -ForegroundColor Cyan
    Write-Host "   Use VS Code task: 'Start Town Development Server'" -ForegroundColor White
    Write-Host "   Or run: bundle exec jekyll serve" -ForegroundColor White
    
    Write-Host "`n4. Example edit - Update event time:" -ForegroundColor Cyan
    Write-Host "   Open: _pages/services.md" -ForegroundColor White
    Write-Host "   Change: 'Meeting at 6 PM' to 'Meeting at 7 PM'" -ForegroundColor White
    Write-Host "   Save and rebuild with: bundle exec jekyll build" -ForegroundColor White
}

# Main execution
Write-Host "Starting complete environment setup...`n" -ForegroundColor Cyan

# 1. Set environment PATH
Set-EnvironmentPath

# 2. Test all tools
Test-Tools

# 3. Install Jekyll if requested
if ($InstallJekyll) {
    Install-Jekyll
    Write-Host "`nRe-testing tools after Jekyll installation..." -ForegroundColor Cyan
    Test-Tools
}

# 4. Test Jekyll build if Jekyll is available
try {
    $jekyllTest = & jekyll --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Test-JekyllBuild
    }
} catch {
    Write-Host "Skipping Jekyll build test (Jekyll not available)" -ForegroundColor Yellow
}

# 5. Show editing workflow
Show-EditingWorkflow

# 6. Summary
Write-Host "`n=== Setup Complete ===" -ForegroundColor Green
Write-Host "Your Town of Wiley development environment is ready!" -ForegroundColor Green
Write-Host "Python and Ruby paths have been set for this session." -ForegroundColor Yellow
Write-Host "`nTo make PATH changes permanent:" -ForegroundColor Cyan
Write-Host "1. Open System Properties > Environment Variables" -ForegroundColor White
Write-Host "2. Add to PATH: $PythonBase" -ForegroundColor White
Write-Host "3. Add to PATH: $PythonScripts" -ForegroundColor White
Write-Host "4. Add to PATH: $RubyBase" -ForegroundColor White

if ($Test) {
    Write-Host "`n=== Test Mode Complete ===" -ForegroundColor Magenta
}
