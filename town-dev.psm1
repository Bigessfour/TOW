# Town of Wiley Jekyll Environment Setup
# This file ensures Ruby/Jekyll paths are correctly set

$RubyPath = "C:\Ruby31-x64"
$env:PATH = "$RubyPath\bin;$env:PATH"

# Test server script with proper Ruby environment
function Start-TownServer {
    Write-Host "Starting Town of Wiley development server..." -ForegroundColor Green
    
    # Build site first
    Write-Host "Building Jekyll site..." -ForegroundColor Yellow
    & bundle exec jekyll build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Starting server on http://localhost:8080..." -ForegroundColor Green
        
        # Start Node.js server for testing
        node -e "
        const http = require('http');
        const fs = require('fs');
        const path = require('path');
        
        const server = http.createServer((req, res) => {
            let filePath = path.join('_site', req.url === '/' ? 'index.html' : req.url);
            
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end('Not found');
                } else {
                    const ext = path.extname(filePath);
                    const contentType = ext === '.css' ? 'text/css' : 
                                      ext === '.js' ? 'application/javascript' : 
                                      'text/html';
                    res.writeHead(200, {'Content-Type': contentType});
                    res.end(data);
                }
            });
        });
        
        server.listen(8080, () => {
            console.log('Server running on http://localhost:8080');
            console.log('Server is ready and listening');
        });
        "
    } else {
        Write-Host "Jekyll build failed!" -ForegroundColor Red
    }
}

function Test-TownSite {
    Write-Host "Running Lighthouse CI tests..." -ForegroundColor Green
    Start-TownServer
    Start-Sleep -Seconds 3
    npx lhci autorun
}

# Export functions
Export-ModuleMember -Function Start-TownServer, Test-TownSite

Write-Host "Town of Wiley development environment loaded!" -ForegroundColor Green
Write-Host "Available commands:" -ForegroundColor Yellow
Write-Host "  Start-TownServer  - Build and start development server" -ForegroundColor Cyan
Write-Host "  Test-TownSite     - Run Lighthouse CI tests" -ForegroundColor Cyan
