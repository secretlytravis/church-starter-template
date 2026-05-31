$ErrorActionPreference = "Stop"

$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
  throw "Node.js was not found on PATH. Install Node.js from https://nodejs.org, then reopen PowerShell."
}

$script = Join-Path $PSScriptRoot "tools\local-sermons-server.js"
& $node.Source $script
