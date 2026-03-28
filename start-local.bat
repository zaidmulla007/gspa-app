@echo off
echo ========================================
echo   WBM Constructions - Local Development
echo ========================================
echo.
echo Starting servers...
echo.
echo [1/2] Starting PHP Server on port 8000...
start "PHP Server" cmd /k "cd public && php -S localhost:8000"
timeout /t 2 /nobreak >nul
echo.
echo [2/2] Starting Next.js Dev Server on port 3000...
start "Next.js Server" cmd /k "npm run dev"
echo.
echo ========================================
echo   Servers Started Successfully!
echo ========================================
echo.
echo   Next.js:  http://localhost:3000
echo   PHP API:  http://localhost:8000
echo.
echo Press any key to stop all servers...
pause >nul
taskkill /FI "WINDOWTITLE eq PHP Server*" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq Next.js Server*" /T /F >nul 2>&1
echo.
echo Servers stopped.
pause
