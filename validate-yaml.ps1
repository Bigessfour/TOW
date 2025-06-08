# Simple YAML validation using basic parsing
$yamlFiles = @(
    ".github\workflows\qa.yml",
    ".github\workflows\release.yml",
    ".github\ISSUE_TEMPLATE\config.yml"
)

function Test-YamlBasicSyntax {
    param([string]$filePath)
    
    Write-Host "Validating $filePath..." -ForegroundColor Yellow
    
    if (-not (Test-Path $filePath)) {
        Write-Host "  ❌ File not found" -ForegroundColor Red
        return $false
    }
    
    $content = Get-Content $filePath -Raw
    $lines = Get-Content $filePath
    $isValid = $true
    
    # Check for basic indentation issues
    for ($i = 0; $i -lt $lines.Count; $i++) {
        $line = $lines[$i]
        $lineNum = $i + 1
        
        # Skip empty lines and comments
        if ($line -match '^\s*$' -or $line -match '^\s*#') {
            continue
        }
        
        # Check for tabs (should be spaces)
        if ($line -match '\t') {
            Write-Host "  ❌ Line $lineNum contains tabs (should be spaces)" -ForegroundColor Red
            $isValid = $false
        }
        
        # Check for trailing spaces
        if ($line -match '\s+$') {
            Write-Host "  ⚠️  Line $lineNum has trailing spaces" -ForegroundColor Yellow
        }
        
        # Check for common YAML syntax issues
        if ($line -match ':\s*$' -and $lines[$i+1] -match '^\s*-') {
            # This is likely a sequence under a mapping, check indentation
            $currentIndent = ($line -replace '^(\s*).*', '$1').Length
            $nextIndent = ($lines[$i+1] -replace '^(\s*).*', '$1').Length
            if ($nextIndent -le $currentIndent) {
                Write-Host "  ❌ Line $($lineNum+1): Sequence item not properly indented" -ForegroundColor Red
                $isValid = $false
            }
        }
    }
    
    if ($isValid) {
        Write-Host "  ✅ Basic syntax validation passed" -ForegroundColor Green
    }
    
    return $isValid
}

$allValid = $true
foreach ($file in $yamlFiles) {
    $result = Test-YamlBasicSyntax $file
    $allValid = $allValid -and $result
    Write-Host ""
}

if ($allValid) {
    Write-Host "All YAML files passed basic validation! ✅" -ForegroundColor Green
} else {
    Write-Host "Some YAML files have issues that need fixing! ❌" -ForegroundColor Red
}
