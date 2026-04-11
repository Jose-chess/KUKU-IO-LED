$frontendPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$vsDevCmd = 'C:\Program Files\Microsoft Visual Studio\18\Community\Common7\Tools\VsDevCmd.bat'
$environmentLines = & cmd /c "`"$vsDevCmd`" -arch=x64 -host_arch=x64 >nul && set"

foreach ($line in $environmentLines) {
    if ($line -match '^(.*?)=(.*)$') {
        $name = $matches[1]
        $value = $matches[2]
        [System.Environment]::SetEnvironmentVariable($name, $value, 'Process')
    }
}

Set-Location $frontendPath
$tauriCli = Join-Path $frontendPath 'node_modules\@tauri-apps\cli\tauri.js'
Start-Process -FilePath 'node.exe' -ArgumentList @($tauriCli, 'dev') -WindowStyle Hidden -WorkingDirectory $frontendPath
