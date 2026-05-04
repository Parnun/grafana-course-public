# 01 Setup Grafana Codespaces

ใช้โฟลเดอร์นี้สำหรับเริ่มต้น Grafana แบบพื้นฐานใน GitHub Codespaces

คำสั่งหลัก:

```bash
cp .env.example .env
docker compose up -d
docker compose ps
```

หลังจาก Container ทำงานแล้ว ให้เปิด port `3000` จากแท็บ **Ports** ใน GitHub Codespaces