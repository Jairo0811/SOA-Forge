$ErrorActionPreference = 'SilentlyContinue'

$runtimeRoot = Join-Path $env:TEMP 'SOAForge'
$runtimeFile = Join-Path $runtimeRoot 'runtime.json'

Write-Host ''
Write-Host 'SOAForge - deteniendo stack local...' -ForegroundColor Cyan
Write-Host ''

if (-not (Test-Path $runtimeFile)) {
    Write-Host 'No se encontro informacion de una ejecucion activa.' -ForegroundColor Yellow
    Write-Host 'Si algun proceso sigue abierto, puedes cerrarlo manualmente desde el Administrador de tareas.' -ForegroundColor DarkGray
    exit 0
}

try {
    $runtime = Get-Content $runtimeFile -Raw | ConvertFrom-Json
}
catch {
    Write-Host 'No fue posible leer el archivo de runtime.' -ForegroundColor Red
    exit 1
}

foreach ($process in $runtime.Processes) {
    $pidValue = [int]$process.Id

    if (Get-Process -Id $pidValue -ErrorAction SilentlyContinue) {
        & taskkill.exe /PID $pidValue /T /F | Out-Null
        Write-Host ("  [OK] {0}" -f $process.Name) -ForegroundColor Green
    }
    else {
        Write-Host ("  [--] {0} ya estaba detenido" -f $process.Name) -ForegroundColor DarkGray
    }
}

Remove-Item $runtimeFile -Force -ErrorAction SilentlyContinue

Write-Host ''
Write-Host 'SOAForge detenido.' -ForegroundColor Green
