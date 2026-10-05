<#
.SYNOPSIS
    Photoshop Automation Orchestrator for Antigravity CLI.
.DESCRIPTION
    Launches Adobe Photoshop detached via Win32_Process and optionally executes ExtendScript (.jsx) scripts.
.EXAMPLE
    .\automate_photoshop.ps1 -RunScript ".\scripts\setup_pro_pipeline.jsx"
#>

param(
    [string]$PhotoshopPath = "C:\Program Files\Adobe\Adobe Photoshop 2026\Photoshop.exe",
    [string]$RunScript = "$PSScriptRoot\scripts\setup_pro_pipeline.jsx"
)

if (-not (Test-Path $PhotoshopPath)) {
    Write-Error "Photoshop executable not found at: $PhotoshopPath"
    exit 1
}

Write-Host ">>> Starting Photoshop Automation..." -ForegroundColor Cyan

if ($RunScript -and (Test-Path $RunScript)) {
    $scriptFullPath = (Resolve-Path $RunScript).Path
    Write-Host ">>> Launching Photoshop and executing script: $scriptFullPath" -ForegroundColor Green
    
    # Launch detached via Win32_Process with script argument
    $cmd = "`"$PhotoshopPath`" -r `"$scriptFullPath`""
    $res = Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{ CommandLine = $cmd }
    
    if ($res.ReturnValue -eq 0) {
        Write-Host ">>> Photoshop process started detached with Process ID: $($res.ProcessId)" -ForegroundColor Cyan
    } else {
        Write-Error "Failed to launch Photoshop. Return code: $($res.ReturnValue)"
    }
} else {
    Write-Host ">>> Launching Photoshop GUI detached..." -ForegroundColor Green
    $cmd = "`"$PhotoshopPath`""
    $res = Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{ CommandLine = $cmd }
    Write-Host ">>> Photoshop process ID: $($res.ProcessId)" -ForegroundColor Cyan
}
