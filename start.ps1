$ErrorActionPreference = "Stop"

$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
  Write-Host ""
  Write-Host "Node.js was not found."
  Write-Host ""
  Write-Host "Please install Node.js from:"
  Write-Host "https://nodejs.org"
  Write-Host ""
  Write-Host "After installing Node.js, reopen PowerShell and run .\start.ps1 again."
  Read-Host "Press Enter to close"
  exit 1
}

& $node.Source (Join-Path $PSScriptRoot "tools\startup-wizard.js")
