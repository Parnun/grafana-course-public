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

docker compose exec -T influxdb influx delete \
  --bucket "$DOCKER_INFLUXDB_INIT_BUCKET" \
  --org "$DOCKER_INFLUXDB_INIT_ORG" \
  --token "$DOCKER_INFLUXDB_INIT_ADMIN_TOKEN" \
  --start '1970-01-01T00:00:00Z' \
  --stop '2100-01-01T00:00:00Z'

start_timestamp=$(( $(date +%s) - 240 ))
timestamp_1=$start_timestamp
timestamp_2=$(( start_timestamp + 60 ))
timestamp_3=$(( start_timestamp + 120 ))
timestamp_4=$(( start_timestamp + 180 ))
timestamp_5=$(( start_timestamp + 240 ))

points=$(cat <<EOF
lab_metrics,service=api,region=ap-southeast cpu=42.0,memory=68.0 $timestamp_1
lab_metrics,service=api,region=ap-southeast cpu=44.0,memory=69.0 $timestamp_2
lab_metrics,service=api,region=ap-southeast cpu=46.0,memory=70.0 $timestamp_3
lab_metrics,service=api,region=ap-southeast cpu=48.0,memory=72.0 $timestamp_4
lab_metrics,service=api,region=ap-southeast cpu=50.0,memory=73.0 $timestamp_5
lab_metrics,service=api,region=eu-west cpu=38.0,memory=64.0 $timestamp_1
lab_metrics,service=api,region=eu-west cpu=39.0,memory=65.0 $timestamp_2
lab_metrics,service=api,region=eu-west cpu=41.0,memory=66.0 $timestamp_3
lab_metrics,service=api,region=eu-west cpu=43.0,memory=67.0 $timestamp_4
lab_metrics,service=api,region=eu-west cpu=45.0,memory=68.0 $timestamp_5
lab_metrics,service=worker,region=ap-southeast cpu=61.0,memory=56.0 $timestamp_1
lab_metrics,service=worker,region=ap-southeast cpu=60.0,memory=57.0 $timestamp_2
lab_metrics,service=worker,region=ap-southeast cpu=62.0,memory=58.0 $timestamp_3
lab_metrics,service=worker,region=ap-southeast cpu=64.0,memory=59.0 $timestamp_4
lab_metrics,service=worker,region=ap-southeast cpu=63.0,memory=60.0 $timestamp_5
lab_metrics,service=worker,region=us-east cpu=55.0,memory=52.0 $timestamp_1
lab_metrics,service=worker,region=us-east cpu=57.0,memory=53.0 $timestamp_2
lab_metrics,service=worker,region=us-east cpu=58.0,memory=54.0 $timestamp_3
lab_metrics,service=worker,region=us-east cpu=59.0,memory=55.0 $timestamp_4
lab_metrics,service=worker,region=us-east cpu=60.0,memory=56.0 $timestamp_5
lab_metrics,service=web,region=eu-west cpu=35.0,memory=49.0 $timestamp_1
lab_metrics,service=web,region=eu-west cpu=36.0,memory=50.0 $timestamp_2
lab_metrics,service=web,region=eu-west cpu=38.0,memory=51.0 $timestamp_3
lab_metrics,service=web,region=eu-west cpu=39.0,memory=52.0 $timestamp_4
lab_metrics,service=web,region=eu-west cpu=41.0,memory=53.0 $timestamp_5
lab_metrics,service=web,region=us-east cpu=29.0,memory=45.0 $timestamp_1
lab_metrics,service=web,region=us-east cpu=31.0,memory=46.0 $timestamp_2
lab_metrics,service=web,region=us-east cpu=32.0,memory=47.0 $timestamp_3
lab_metrics,service=web,region=us-east cpu=33.0,memory=48.0 $timestamp_4
lab_metrics,service=web,region=us-east cpu=34.0,memory=49.0 $timestamp_5
EOF
)

printf "%s\n" "$points" | docker compose exec -T influxdb influx write \
  --bucket "$DOCKER_INFLUXDB_INIT_BUCKET" \
  --org "$DOCKER_INFLUXDB_INIT_ORG" \
  --token "$DOCKER_INFLUXDB_INIT_ADMIN_TOKEN" \
  --precision s \
  --format lp

echo "Seeded sample data into InfluxDB bucket '$DOCKER_INFLUXDB_INIT_BUCKET'."
