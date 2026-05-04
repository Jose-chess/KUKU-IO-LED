# Script de inicio para el backend KUKU-IO-LED
# Este script arranca el backend C# automáticamente

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  KUKU-IO-LED - Backend Starter" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar si el puerto 5200 está en uso
Write-Host "[1/3] Verificando puerto 5200..." -ForegroundColor Yellow
$connection = Get-NetTCPConnection -LocalPort 5200 -ErrorAction SilentlyContinue

if ($connection) {
    $process = Get-Process -Id $connection.OwningProcess -ErrorAction SilentlyContinue
    if ($process) {
        Write-Host "  Puerto 5200 ocupado por proceso: $($process.ProcessName) (PID: $($process.Id))" -ForegroundColor Red
        Write-Host "  Matando proceso..." -ForegroundColor Yellow
        Stop-Process -Id $process.Id -Force
        Write-Host "  Proceso terminado." -ForegroundColor Green
    }
} else {
    Write-Host "  Puerto 5200 disponible." -ForegroundColor Green
}

Write-Host ""

# 2. Navegar al backend y arrancar
Write-Host "[2/3] Iniciando backend..." -ForegroundColor Yellow
$backendPath = Join-Path $PSScriptRoot "backend"

if (-not (Test-Path $backendPath)) {
    Write-Host "  ERROR: No se encontró la carpeta backend en: $backendPath" -ForegroundColor Red
    exit 1
}

# 3. Verificar que existe el proyecto .csproj
$csproj = Get-ChildItem -Path $backendPath -Filter "*.csproj" | Select-Object -First 1
if (-not $csproj) {
    Write-Host "  ERROR: No se encontró archivo .csproj en $backendPath" -ForegroundColor Red
    exit 1
}

Write-Host "  Proyecto encontrado: $($csproj.Name)" -ForegroundColor Green
Write-Host "  Iniciando servidor..." -ForegroundColor Yellow
Write-Host ""

# Arrancar dotnet run
Set-Location $backendPath
try {
    dotnet run --verbosity quiet
} catch {
    Write-Host "  ERROR al iniciar el backend: $_" -ForegroundColor Red
    exit 1
}
