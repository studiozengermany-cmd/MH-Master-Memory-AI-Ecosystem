[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$source = Join-Path $repoRoot "skills\prompt-master"

if (-not (Test-Path (Join-Path $source "SKILL.md"))) {
    throw "Khong tim thay skills\prompt-master\SKILL.md trong repository."
}

$destinations = @(
    [PSCustomObject]@{
        Name = "Claude Code"
        Path = Join-Path $HOME ".claude\skills\prompt-master"
    },
    [PSCustomObject]@{
        Name = "Google Antigravity"
        Path = Join-Path $HOME ".gemini\config\skills\prompt-master"
    }
)

foreach ($target in $destinations) {
    New-Item -ItemType Directory -Path $target.Path -Force | Out-Null
    Copy-Item -Path (Join-Path $source "*") -Destination $target.Path -Recurse -Force

    if (-not (Test-Path (Join-Path $target.Path "SKILL.md"))) {
        throw "Cai dat that bai cho $($target.Name): thieu SKILL.md."
    }

    Write-Host "[OK] $($target.Name): $($target.Path)"
}

Write-Host ""
Write-Host "Prompt Master da duoc cai cho Claude Code va Google Antigravity."
Write-Host "Hay mo mot phien moi neu cong cu dang chay chua nhan skill moi."
