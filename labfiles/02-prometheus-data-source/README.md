# 02 Prometheus Data Source

Lab นี้ใช้ Prometheus แบบ self-scrape เพื่อให้ query ได้ทันทีโดยไม่ต้องพึ่งระบบภายนอก

คำสั่งเริ่มต้น:

```bash
docker compose up -d
```

URL สำคัญ:

- Grafana: `http://localhost:3000`
- Prometheus ภายใน Docker network: `http://prometheus:9090`