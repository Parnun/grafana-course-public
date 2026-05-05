@echo off
setlocal EnableExtensions

for /L %%I in (1,1,20) do (
  curl -s http://localhost:8000/work >nul
)

echo Generated 20 demo requests against demo-metrics service.
exit /b 0
