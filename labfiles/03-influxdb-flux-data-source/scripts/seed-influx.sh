#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -f .env ]]; then
  echo "Missing .env file. Run: cp .env.example .env"
  exit 1
fi

set -a
source .env
set +a

for _ in {1..20}; do
  if docker compose exec -T influxdb influx ping >/dev/null 2>&1; then
    break
  fi
  sleep 2
done

points='lab_metrics,service=api,region=ap-southeast cpu=42.1,memory=68.2
lab_metrics,service=api,region=ap-southeast cpu=47.6,memory=71.3
lab_metrics,service=worker,region=ap-southeast cpu=61.2,memory=55.8
lab_metrics,service=worker,region=ap-southeast cpu=59.8,memory=57.1
lab_metrics,service=web,region=ap-southeast cpu=35.5,memory=48.9
lab_metrics,service=web,region=ap-southeast cpu=38.0,memory=52.4'

printf "%s\n" "$points" | docker compose exec -T influxdb influx write \
  --bucket "$DOCKER_INFLUXDB_INIT_BUCKET" \
  --org "$DOCKER_INFLUXDB_INIT_ORG" \
  --token "$DOCKER_INFLUXDB_INIT_ADMIN_TOKEN" \
  --precision s \
  --format lp

echo "Seeded sample data into InfluxDB bucket '$DOCKER_INFLUXDB_INIT_BUCKET'."