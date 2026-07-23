@echo off
setlocal

REM Always run from repository root (location of this .bat file)
cd /d "%~dp0"

set "BUN_CMD=bun"
where bun >nul 2>nul
if errorlevel 1 (
	if exist "%USERPROFILE%\.bun\bin\bun.exe" (
		set "BUN_CMD=%USERPROFILE%\.bun\bin\bun.exe"
	) else (
		echo [ERROR] Bun is not installed or not available in PATH.
		echo Install Bun from https://bun.sh and try again.
		exit /b 1
	)
)

echo Starting frontend dev server...
echo Command: %BUN_CMD% run frontend:dev
"%BUN_CMD%" run frontend:dev

exit /b %errorlevel%
