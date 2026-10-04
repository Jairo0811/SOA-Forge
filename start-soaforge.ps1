param(
    [switch]$NoPortalInstall,
    [int]$StartupTimeoutSeconds = 90
)

$ErrorActionPreference = 'Stop'

$repoRoot = $PSScriptRoot
if ([string]::IsNullOrWhiteSpace($repoRoot)) {
    $repoRoot = (Get-Location).Path
}

function Start-SOAForgeProcess {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Title,

        [Parameter(Mandatory = $true)]
        [string]$WorkingDirectory,

        [Parameter(Mandatory = $true)]
        [string]$Command
    )

    $safeTitle = $Title.Replace("'", "''")

    $bootstrap = @"
`$Host.UI.RawUI.WindowTitle = '$safeTitle'
`$ErrorActionPreference = 'Stop'
$Command
"@

    # Windows PowerShell expects EncodedCommand as UTF-16LE.
    # This avoids quoting issues with paths that contain spaces (for example OneDrive folders).
    $encodedCommand = [Convert]::ToBase64String(
        [Text.Encoding]::Unicode.GetBytes($bootstrap)
    )

    Start-Process `
        -FilePath 'powershell.exe' `
        -WorkingDirectory $WorkingDirectory `
        -ArgumentList @(
            '-NoExit',
            '-NoLogo',
            '-ExecutionPolicy', 'Bypass',
            '-EncodedCommand', $encodedCommand
        ) `
        -PassThru
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
Write-Host 'SOAForge - iniciando stack local...' -ForegroundColor Cyan
Write-Host ''

$processes = @()

$processes += Start-SOAForgeProcess `
    -Title 'SOAForge - CustomerService :5101' `
    -WorkingDirectory $customerPath `
    -Command "`$env:ASPNETCORE_ENVIRONMENT='Development'; `$env:ASPNETCORE_URLS='http://localhost:5101'; dotnet run --no-launch-profile"

$processes += Start-SOAForgeProcess `
    -Title 'SOAForge - OrderService :5102' `
    -WorkingDirectory $orderPath `
    -Command "`$env:ASPNETCORE_ENVIRONMENT='Development'; `$env:ASPNETCORE_URLS='http://localhost:5102'; dotnet run --no-launch-profile"

$processes += Start-SOAForgeProcess `
    -Title 'SOAForge - PaymentService :5103' `
    -WorkingDirectory $paymentPath `
    -Command "`$env:ASPNETCORE_ENVIRONMENT='Development'; `$env:ASPNETCORE_URLS='http://localhost:5103'; dotnet run --no-launch-profile"

$processes += Start-SOAForgeProcess `
    -Title 'SOAForge - Gateway :5100' `
    -WorkingDirectory $gatewayPath `
    -Command "`$env:ASPNETCORE_ENVIRONMENT='Development'; `$env:ASPNETCORE_URLS='http://localhost:5100'; dotnet run --no-launch-profile"

$portalCommand = if ($NoPortalInstall) {
    'npm run dev -- --host localhost --port 5173'
}
else {
    'if (-not (Test-Path node_modules)) { npm install }; npm run dev -- --host localhost --port 5173'
}

$processes += Start-SOAForgeProcess `
    -Title 'SOAForge - Portal :5173' `
    -WorkingDirectory $portalPath `
    -Command $portalCommand

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
}
else {
    Write-Host 'SOAForge inicio con errores.' -ForegroundColor Red
    Write-Host 'Revisa la ventana del proceso marcado como [ERROR]; ahora permanecera abierta mostrando el error real.' -ForegroundColor Yellow
}

Write-Host ''
Write-Host 'Se abrieron 5 ventanas de PowerShell. Cierra cada una para detener su proceso.' -ForegroundColor DarkGray
