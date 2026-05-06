# Grafana for Developer — คอร์สแลปฝึกปฏิบัติ

repository นี้รวบรวมแบบฝึกหัดภาคปฏิบัติและไฟล์ประกอบสำหรับหลักสูตร **Grafana for Developer** โดยแต่ละ lab ออกแบบให้ทำตามลำดับภายใน GitHub Codespaces

## ก่อนเริ่มต้น

กรุณาอ่าน [lab-preparation.md](lab-preparation.md) ให้ครบก่อนเริ่ม lab แรก

---

## รายการแบบฝึกหัด

| # | แบบฝึกหัด | ไฟล์ประกอบ |
|---|-----------|------------|
| 01 | [ติดตั้ง Grafana บน Codespaces](Exercises/01-setup-grafana-codespaces.md) | [labfiles/01-setup-grafana-codespaces](labfiles/01-setup-grafana-codespaces/README.md) |
| 02 | [Prometheus Data Source](Exercises/02-prometheus-data-source.md) | [labfiles/02-prometheus-data-source](labfiles/02-prometheus-data-source/README.md) |
| 03 | [InfluxDB Flux Data Source](Exercises/03-influxdb-flux-data-source.md) | [labfiles/03-influxdb-flux-data-source](labfiles/03-influxdb-flux-data-source/README.md) |
| 04 | [Queries และ Panels](Exercises/04-queries-and-panels.md) | [labfiles/04-queries-and-panels](labfiles/04-queries-and-panels/README.md) |
| 05 | [Dashboard Variables](Exercises/05-dashboard-variables.md) | [labfiles/05-dashboard-variables](labfiles/05-dashboard-variables/README.md) |
| 06 | [Templating](Exercises/06-templating.md) | [labfiles/06-templating](labfiles/06-templating/README.md) |
| 07 | [Interactive Dashboards](Exercises/07-interactive-dashboards.md) | [labfiles/07-interactive-dashboards](labfiles/07-interactive-dashboards/README.md) |
| 08 | [พื้นฐานการแจ้งเตือน (Alerting)](Exercises/08-alerting-basics.md) | [labfiles/08-alerting-basics](labfiles/08-alerting-basics/README.md) |
| 09 | [พื้นฐาน Panel Plugin](Exercises/09-panel-plugin-basics.md) | [labfiles/09-panel-plugin-basics](labfiles/09-panel-plugin-basics/README.md) |

---

## โครงสร้าง Repository

```
Exercises/          คำอธิบายขั้นตอนการทำแบบฝึกหัดแต่ละ lab
labfiles/           Docker Compose environment และไฟล์ starter สำหรับแต่ละ lab
lab-preparation.md  คู่มือเตรียม environment ก่อนเริ่ม lab แรก
```

---

## หมายเหตุ

- ทุก lab environment ใช้ Docker Compose และเหมาะสำหรับรันบน GitHub Codespaces เป็นหลัก
- แต่ละโฟลเดอร์ใน `labfiles/` มี `README.md` ของตัวเองที่อธิบายคำสั่งเริ่มต้นและการตั้งค่า
- ควรทำแบบฝึกหัดตามลำดับที่กำหนด เนื่องจาก lab ที่อยู่ถัดไปอาจต่อยอดจากเนื้อหาของ lab ก่อนหน้า
