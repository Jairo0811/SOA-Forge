param(
    [switch]$NoPortalInstall
)

$ErrorActionPreference = 'Stop'

$repoRoot = $PSScriptRoot
if ([string]::IsNullOrWhiteSpace($repoRoot)) {
    $repoRoot = (Get-Location).Path
}

function Escape-SingleQuotedString([string]$value) {
    return $value.Replace("'", "''")
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

    $escapedDirectory = Escape-SingleQuotedString $WorkingDirectory
    $escapedTitle = Escape-SingleQuotedString $Title

    $bootstrap = @"
`$Host.UI.RawUI.WindowTitle = '$escapedTitle'
Set-Location '$escapedDirectory'
$Command
"@

    Start-Process powershell.exe -ArgumentList @(
        '-NoExit',
        '-NoLogo',
        '-ExecutionPolicy', 'Bypass',
        '-Command', $bootstrap
    ) | Out-Null
}

$requiredCommands = @('dotnet', 'npm')
foreach ($commandName in $requiredCommands) {
    if (-not (Get-Command $commandName -ErrorAction SilentlyContinue)) {
        throw "No se encontró '$commandName' en PATH. Instálalo o agrégalo al PATH antes de iniciar SOAForge."
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
        throw "No se encontró la ruta requerida: $path"
    }
}

Write-Host ''
Write-Host 'SOAForge — iniciando stack local...' -ForegroundColor Cyan
Write-Host ''

Start-SOAForgeProcess `
    -Title 'SOAForge - CustomerService :5101' `
    -WorkingDirectory $customerPath `
    -Command 'dotnet run'

Start-SOAForgeProcess `
    -Title 'SOAForge - OrderService :5102' `
    -WorkingDirectory $orderPath `
    -Command 'dotnet run'

Start-SOAForgeProcess `
    -Title 'SOAForge - PaymentService :5103' `
    -WorkingDirectory $paymentPath `
    -Command 'dotnet run'

Start-SOAForgeProcess `
    -Title 'SOAForge - Gateway :5100' `
    -WorkingDirectory $gatewayPath `
    -Command 'dotnet run'

$portalCommand = if ($NoPortalInstall) {
    'npm run dev'
}
else {
    'if (-not (Test-Path node_modules)) { npm install }; npm run dev'
}

Start-SOAForgeProcess `
    -Title 'SOAForge - Portal :5173' `
    -WorkingDirectory $portalPath `
    -Command $portalCommand

Write-Host 'Procesos iniciados:' -ForegroundColor Green
Write-Host '  Gateway          http://localhost:5100'
Write-Host '  CustomerService  http://localhost:5101'
Write-Host '  OrderService     http://localhost:5102'
Write-Host '  PaymentService   http://localhost:5103'
Write-Host '  Portal            http://localhost:5173'
Write-Host ''
Write-Host 'Se abrieron 5 ventanas de PowerShell. Cierra cada una para detener su proceso.' -ForegroundColor DarkGray
