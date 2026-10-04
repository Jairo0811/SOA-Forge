param(
    [switch]$NoPortalInstall,
    [int]$StartupTimeoutSeconds = 90
)

$ErrorActionPreference = 'Stop'

$repoRoot = $PSScriptRoot
if ([string]::IsNullOrWhiteSpace($repoRoot)) {
    $repoRoot = (Get-Location).Path
}

$runtimeRoot = Join-Path $env:TEMP 'SOAForge'
$logsRoot = Join-Path $runtimeRoot 'logs'
$runtimeFile = Join-Path $runtimeRoot 'runtime.json'

New-Item -ItemType Directory -Path $logsRoot -Force | Out-Null

function Start-SOAForgeProcess {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name,

        [Parameter(Mandatory = $true)]
        [string]$WorkingDirectory,

        [Parameter(Mandatory = $true)]
        [string]$Command
    )

    $bootstrap = @"
`$ErrorActionPreference = 'Stop'
$Command
"@

    # Windows PowerShell expects EncodedCommand as UTF-16LE.
    # Using a hidden child process keeps all five services running without
    # opening five additional terminal windows.
    $encodedCommand = [Convert]::ToBase64String(
        [Text.Encoding]::Unicode.GetBytes($bootstrap)
    )

    $stdout = Join-Path $logsRoot ("{0}.out.log" -f $Name)
    $stderr = Join-Path $logsRoot ("{0}.err.log" -f $Name)

    Remove-Item $stdout, $stderr -Force -ErrorAction SilentlyContinue

    $process = Start-Process `
        -FilePath 'powershell.exe' `
        -WorkingDirectory $WorkingDirectory `
        -ArgumentList @(
            '-NoLogo',
            '-NoProfile',
            '-ExecutionPolicy', 'Bypass',
            '-EncodedCommand', $encodedCommand
        ) `
        -WindowStyle Hidden `
        -RedirectStandardOutput $stdout `
        -RedirectStandardError $stderr `
        -PassThru

    return [pscustomobject]@{
        Name = $Name
        Id = $process.Id
        StdOut = $stdout
        StdErr = $stderr
    }
}

function Wait-SOAForgeEndpoint {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name,

        [Parameter(Mandatory = $true)]
        [string]$Url,

        [int]$TimeoutSeconds = 90
    )

    $deadline = (Get-Date).AddSeconds($TimeoutSeconds)

    while ((Get-Date) -lt $deadline) {
        try {
            $response = Invoke-WebRequest `
                -UseBasicParsing `
                -Uri $Url `
                -TimeoutSec 2 `
                -ErrorAction Stop

            if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
                Write-Host ("  [OK] {0,-18} {1}" -f $Name, $Url) -ForegroundColor Green
                return $true
            }
        }
        catch {
            Start-Sleep -Milliseconds 800
        }
    }

    Write-Host ("  [ERROR] {0,-15} no respondio en {1}s -> {2}" -f $Name, $TimeoutSeconds, $Url) -ForegroundColor Red
    return $false
}

$requiredCommands = @('dotnet', 'npm')
foreach ($commandName in $requiredCommands) {
    if (-not (Get-Command $commandName -ErrorAction SilentlyContinue)) {
        throw "No se encontro '$commandName' en PATH. Instalalo o agregalo al PATH antes de iniciar SOAForge."
    }
}

$customerPath = Join-Path $repoRoot 'src\Services\CustomerService'
$orderPath = Join-Path $repoRoot 'src\Services\OrderService'
$paymentPath = Join-Path $repoRoot 'src\Services\PaymentService'
$gatewayPath = Join-Path $repoRoot 'src\Gateway'
$portalPath = Join-Path $repoRoot 'src\Portal'

$requiredPaths = @($customerPath, $orderPath, $paymentPath, $gatewayPath, $portalPath)
foreach ($path in $requiredPaths) {
    if (-not (Test-Path $path)) {
        throw "No se encontro la ruta requerida: $path"
    }
}

Write-Host ''
Write-Host 'SOAForge - iniciando stack local en segundo plano...' -ForegroundColor Cyan
Write-Host ''

$processes = @()

$processes += Start-SOAForgeProcess `
    -Name 'CustomerService' `
    -WorkingDirectory $customerPath `
    -Command "`$env:ASPNETCORE_ENVIRONMENT='Development'; `$env:ASPNETCORE_URLS='http://localhost:5101'; dotnet run --no-launch-profile"

$processes += Start-SOAForgeProcess `
    -Name 'OrderService' `
    -WorkingDirectory $orderPath `
    -Command "`$env:ASPNETCORE_ENVIRONMENT='Development'; `$env:ASPNETCORE_URLS='http://localhost:5102'; dotnet run --no-launch-profile"

$processes += Start-SOAForgeProcess `
    -Name 'PaymentService' `
    -WorkingDirectory $paymentPath `
    -Command "`$env:ASPNETCORE_ENVIRONMENT='Development'; `$env:ASPNETCORE_URLS='http://localhost:5103'; dotnet run --no-launch-profile"

$processes += Start-SOAForgeProcess `
    -Name 'Gateway' `
    -WorkingDirectory $gatewayPath `
    -Command "`$env:ASPNETCORE_ENVIRONMENT='Development'; `$env:ASPNETCORE_URLS='http://localhost:5100'; dotnet run --no-launch-profile"

$portalCommand = if ($NoPortalInstall) {
    'npm run dev -- --host localhost --port 5173'
}
else {
    'if (-not (Test-Path node_modules)) { npm install }; npm run dev -- --host localhost --port 5173'
}

$processes += Start-SOAForgeProcess `
    -Name 'Portal' `
    -WorkingDirectory $portalPath `
    -Command $portalCommand

@{
    StartedAt = (Get-Date).ToString('o')
    Processes = $processes
} | ConvertTo-Json -Depth 5 | Set-Content -Path $runtimeFile -Encoding UTF8

Write-Host 'Esperando que los 5 procesos queden disponibles...' -ForegroundColor Yellow
Write-Host ''

$checks = @(
    (Wait-SOAForgeEndpoint -Name 'CustomerService' -Url 'http://localhost:5101/health' -TimeoutSeconds $StartupTimeoutSeconds),
    (Wait-SOAForgeEndpoint -Name 'OrderService' -Url 'http://localhost:5102/health' -TimeoutSeconds $StartupTimeoutSeconds),
    (Wait-SOAForgeEndpoint -Name 'PaymentService' -Url 'http://localhost:5103/health' -TimeoutSeconds $StartupTimeoutSeconds),
    (Wait-SOAForgeEndpoint -Name 'Gateway' -Url 'http://localhost:5100/health' -TimeoutSeconds $StartupTimeoutSeconds),
    (Wait-SOAForgeEndpoint -Name 'Portal' -Url 'http://localhost:5173' -TimeoutSeconds $StartupTimeoutSeconds)
)

Write-Host ''
if ($checks -notcontains $false) {
    Write-Host 'SOAForge listo.' -ForegroundColor Green
    Write-Host '  Gateway          http://localhost:5100'
    Write-Host '  CustomerService  http://localhost:5101'
    Write-Host '  OrderService     http://localhost:5102'
    Write-Host '  PaymentService   http://localhost:5103'
    Write-Host '  Portal           http://localhost:5173'
    Write-Host ''
    Write-Host 'Los 5 procesos estan ejecutandose ocultos en segundo plano.' -ForegroundColor DarkGray
    Write-Host "Logs: $logsRoot" -ForegroundColor DarkGray
    Write-Host 'Para detener todo: .\stop-soaforge.ps1' -ForegroundColor DarkGray
}
else {
    Write-Host 'SOAForge inicio con errores.' -ForegroundColor Red
    Write-Host "Revisa los logs en: $logsRoot" -ForegroundColor Yellow
    Write-Host 'Para detener los procesos iniciados: .\stop-soaforge.ps1' -ForegroundColor Yellow
}
