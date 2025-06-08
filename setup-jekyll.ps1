# PowerShell script to set up Ruby/Jekyll environment for Town of Wiley
$RubyPath = "C:\Ruby31-x64"
$env:PATH = "$RubyPath\bin;$env:PATH"

Write-Host "Setting up Ruby environment..." -ForegroundColor Green
Write-Host "Ruby Path: $RubyPath" -ForegroundColor Yellow

# Verify Ruby
try {
    $rubyVersion = & ruby --version
    Write-Host "Ruby found: $rubyVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Ruby not found at $RubyPath" -ForegroundColor Red
    exit 1
}

# Check bundler
try {
    $bundleVersion = & bundle --version
    Write-Host "Bundle found: $bundleVersion" -ForegroundColor Green
} catch {
    Write-Host "Installing bundler..." -ForegroundColor Yellow
    & gem install bundler
}

# Install dependencies
Write-Host "Installing Jekyll dependencies..." -ForegroundColor Yellow
& bundle install

# Build site
Write-Host "Building Jekyll site..." -ForegroundColor Yellow
& bundle exec jekyll build

Write-Host "Jekyll build complete! Site built in _site directory." -ForegroundColor Green
