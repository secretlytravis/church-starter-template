@echo off
setlocal

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found on PATH.
  echo Install Node.js from https://nodejs.org, then reopen this terminal.
  exit /b 1
)

node "%~dp0tools\local-sermons-server.js"
