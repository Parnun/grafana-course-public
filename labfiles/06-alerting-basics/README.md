# 06 Alerting Basics

Lab นี้มี service ตัวอย่างสำหรับสร้าง metric `demo_requests_total` เพื่อใช้ทดสอบ Grafana Alerting

คำสั่งหลัก:

```bash
docker compose up -d --build
./generate-traffic.sh
```

สำหรับ Windows Command Prompt:

```bat
docker compose up -d --build
generate-traffic.cmd
```