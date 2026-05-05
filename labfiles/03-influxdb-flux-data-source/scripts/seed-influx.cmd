@echo off
setlocal EnableExtensions EnableDelayedExpansion

set "ROOT_DIR=%~dp0.."
pushd "%ROOT_DIR%" >nul

if not exist ".env" (
  echo Missing .env file. Run: copy .env.example .env
  popd >nul
  exit /b 1
)

for /f "usebackq tokens=1,* delims==" %%A in (".env") do (
  if not "%%A"=="" if /i not "%%A:~0,1%%"=="#" set "%%A=%%B"
)

for /L %%I in (1,1,20) do (
  docker compose exec -T influxdb influx ping >nul 2>&1
  if not errorlevel 1 goto :ready
  timeout /t 2 /nobreak >nul
)

echo InfluxDB is not ready after waiting.
popd >nul
exit /b 1

:ready
docker compose exec -T influxdb influx delete ^
  --bucket "%DOCKER_INFLUXDB_INIT_BUCKET%" ^
  --org "%DOCKER_INFLUXDB_INIT_ORG%" ^
  --token "%DOCKER_INFLUXDB_INIT_ADMIN_TOKEN%" ^
  --start "1970-01-01T00:00:00Z" ^
  --stop "2100-01-01T00:00:00Z"
if errorlevel 1 (
  popd >nul
  exit /b 1
)

for /f %%T in ('powershell -NoProfile -Command "[int][DateTimeOffset]::UtcNow.AddMinutes(-4).ToUnixTimeSeconds()"') do set "timestamp_1=%%T"
set /a timestamp_2=timestamp_1+60
set /a timestamp_3=timestamp_1+120
set /a timestamp_4=timestamp_1+180
set /a timestamp_5=timestamp_1+240

set "POINTS_FILE=%TEMP%\lab_metrics_points_%RANDOM%%RANDOM%.lp"
(
  echo lab_metrics,service=api,region=ap-southeast cpu=42.0,memory=68.0 !timestamp_1!
  echo lab_metrics,service=api,region=ap-southeast cpu=44.0,memory=69.0 !timestamp_2!
  echo lab_metrics,service=api,region=ap-southeast cpu=46.0,memory=70.0 !timestamp_3!
  echo lab_metrics,service=api,region=ap-southeast cpu=48.0,memory=72.0 !timestamp_4!
  echo lab_metrics,service=api,region=ap-southeast cpu=50.0,memory=73.0 !timestamp_5!
  echo lab_metrics,service=worker,region=ap-southeast cpu=61.0,memory=56.0 !timestamp_1!
  echo lab_metrics,service=worker,region=ap-southeast cpu=60.0,memory=57.0 !timestamp_2!
  echo lab_metrics,service=worker,region=ap-southeast cpu=62.0,memory=58.0 !timestamp_3!
  echo lab_metrics,service=worker,region=ap-southeast cpu=64.0,memory=59.0 !timestamp_4!
  echo lab_metrics,service=worker,region=ap-southeast cpu=63.0,memory=60.0 !timestamp_5!
  echo lab_metrics,service=web,region=ap-southeast cpu=35.0,memory=49.0 !timestamp_1!
  echo lab_metrics,service=web,region=ap-southeast cpu=36.0,memory=50.0 !timestamp_2!
  echo lab_metrics,service=web,region=ap-southeast cpu=38.0,memory=51.0 !timestamp_3!
  echo lab_metrics,service=web,region=ap-southeast cpu=39.0,memory=52.0 !timestamp_4!
  echo lab_metrics,service=web,region=ap-southeast cpu=41.0,memory=53.0 !timestamp_5!
) > "%POINTS_FILE%"

type "%POINTS_FILE%" | docker compose exec -T influxdb influx write ^
  --bucket "%DOCKER_INFLUXDB_INIT_BUCKET%" ^
  --org "%DOCKER_INFLUXDB_INIT_ORG%" ^
  --token "%DOCKER_INFLUXDB_INIT_ADMIN_TOKEN%" ^
  --precision s ^
  --format lp
set "write_exit=%ERRORLEVEL%"

del "%POINTS_FILE%" >nul 2>&1

if not "%write_exit%"=="0" (
  popd >nul
  exit /b %write_exit%
)

echo Seeded sample data into InfluxDB bucket '%DOCKER_INFLUXDB_INIT_BUCKET%'.

popd >nul
exit /b 0
