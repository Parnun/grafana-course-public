# 03 InfluxDB Flux Data Source

Lab นี้เปิด InfluxDB 2.x พร้อมค่าเริ่มต้นสำหรับการสอน และมี script สำหรับ seed ข้อมูลตัวอย่างให้ query ได้ทันที

คำสั่งหลัก:

```bash
cp .env.example .env
docker compose up -d
./scripts/seed-influx.sh
```

สำหรับ Windows Command Prompt:

```bat
copy .env.example .env
docker compose up -d
scripts\seed-influx.cmd
```