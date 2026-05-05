#!/usr/bin/env bash

set -euo pipefail

for _ in {1..20}; do
  curl -s http://localhost:8000/work >/dev/null
done

echo "Generated 20 demo requests against demo-metrics service."