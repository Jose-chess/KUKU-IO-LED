# Liberar puertos
$ports = @(5200, 5173)
foreach ($port in $ports) {
    $result = netstat -ano | findstr ":$port "
    if ($result) {
        $pidNum = ($result -split '\s+')[-1]
        taskkill /PID $pidNum /F 2>$null
    }
}

# Arrancar backend en segundo plano
$backend = Start-Job -ScriptBlock { cd C:\KUKU-IO-LED\backend; dotnet run }

Write-Host "Esperando que el backend arranque..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "Backend listo. Arrancando frontend..." -ForegroundColor Green

# Arrancar frontend en la misma terminal
cd C:\KUKU-IO-LED
npm run tauri:dev
