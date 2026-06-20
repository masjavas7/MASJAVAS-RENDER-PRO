# Build Automation Script for MASJAVAS RENDER PRO Installer
# Version 1.7.2

$ErrorActionPreference = "Stop"

$nsisPath = "C:\Users\DELL\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4.1\makensis.exe"
$projectRoot = "C:\Users\DELL\Documents\MASJAVAS-RENDER-PRO"
$scriptPath = Join-Path $projectRoot "installer.nsi"
$outputPath = Join-Path $projectRoot "MASJAVAS-RENDER-PRO-Setup-v1.7.2.exe"

Write-Host "=== STEP 1: SECURITY AUDIT & PRE-BUILD CHECKS ===" -ForegroundColor Cyan

# 1. Search for credentials/keys
Write-Host "Scanning app directory for .env, .key, and token files..."
$suspiciousFiles = Get-ChildItem -Path (Join-Path $projectRoot "$PLUGINSDIR\app-64\resources\app") -Recurse -Include *.env, *.key, *.token, *secret* -ErrorAction SilentlyContinue
if ($suspiciousFiles) {
    Write-Host "[WARNING] Suspicious files found:" -ForegroundColor Yellow
    $suspiciousFiles | ForEach-Object { Write-Host " - $_.FullName" }
    throw "Security audit failed: suspicious files found inside app bundle."
} else {
    Write-Host "✓ Security audit passed: No env/key/token files found inside the app resources." -ForegroundColor Green
}

# 2. Check if NSIS compiler is available
if (-not (Test-Path $nsisPath)) {
    throw "NSIS compiler not found at $nsisPath. Please check paths."
}
Write-Host "✓ NSIS compiler found at $nsisPath." -ForegroundColor Green

Write-Host "`n=== STEP 2: COMPIING INSTALLER WITH NSIS ===" -ForegroundColor Cyan
Write-Host "Running makensis.exe..."
& $nsisPath $scriptPath

# 3. Check output file
if (-not (Test-Path $outputPath)) {
    throw "Installer build failed: Setup file was not created at $outputPath"
}

Write-Host "`n=== STEP 3: GENERATING SHA256 CHECKSUM ===" -ForegroundColor Cyan
$hash = Get-FileHash -Path $outputPath -Algorithm SHA256
$checksum = $hash.Hash
Write-Host "✓ Installer build successful!" -ForegroundColor Green
Write-Host "Output File: $outputPath"
Write-Host "SHA256 Checksum: $checksum" -ForegroundColor Green

# Save checksum to a helper text file for easy referencing
$checksumPath = Join-Path $projectRoot "MASJAVAS-RENDER-PRO-Setup-v1.7.2.exe.sha256"
$checksum | Out-File -FilePath $checksumPath -Encoding ascii -Force
Write-Host "✓ Saved checksum to: $checksumPath"

Write-Host "`n=== BUILD COMPLETELY SUCCESSFUL! ===" -ForegroundColor Green
