# 05 Dashboard Variables

Lab นี้ใช้ InfluxDB 2.x เป็น data source เพื่อสาธิตการสร้าง dashboard variables โดยข้อมูลใน bucket `system` มี tag `service` (api, worker, web) และ `region` (ap-southeast, eu-west, us-east) ที่กระจายต่างกันต่อ service เพื่อให้ chained variables มีความหมาย

คำสั่งเริ่มต้น:

```bash
cp .env.example .env
docker compose up -d
./scripts/seed-influx.sh
```

Windows:

```bat
copy .env.example .env
docker compose up -d
scripts\seed-influx.cmd
```