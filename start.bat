@echo off
setlocal

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found.
  echo.
  echo Please install Node.js from:
  echo https://nodejs.org
  echo.
  echo After installing Node.js, close this window and double-click start.bat again.
  pause
  exit /b 1
)

node "%~dp0tools\startup-wizard.js"
pause
