---
lab:
    title: 'เชื่อมต่อ Prometheus Data source และสำรวจ metrics แรกใน Grafana'
    description: 'ผู้เรียนจะเชื่อมต่อ Prometheus เข้ากับ Grafana และทดลอง query metrics ผ่าน Explore'
    topic: 'Working with Data Sources'
    level: 200
    duration: 40
    islab: true
---

# เชื่อมต่อ Prometheus Data source และสำรวจ metrics แรกใน Grafana

ใน exercise นี้ คุณจะเปิด Grafana พร้อม Prometheus ภายใน GitHub Codespaces แล้วเพิ่ม Prometheus เป็น Data source ผ่าน Grafana UI จากนั้นจะทดลอง query metrics ชุดแรกด้วย PromQL เพื่อให้เห็นเส้นทางข้อมูลตั้งแต่ Prometheus ไปจนถึง Grafana Explore

This exercise takes approximately **40** minutes.

> **Important**: เมื่อ Grafana และ Prometheus รันอยู่คนละ Container คำว่า `localhost` ภายใน Grafana จะไม่ชี้ไปที่ Prometheus ดังนั้นใน exercise นี้ต้องใช้ URL เป็น `http://prometheus:9090`

## Learning Objectives

1. เปิด Grafana และ Prometheus ด้วย Docker Compose ใน GitHub Codespaces
2. เพิ่ม Prometheus Data source ผ่าน Grafana UI
3. ทดสอบการเชื่อมต่อด้วย **Save & test**
4. ใช้ PromQL เบื้องต้นในหน้า **Explore**

## Prerequisites

- ทำ exercise 01 เสร็จแล้ว หรือเข้าใจการเปิด port ใน GitHub Codespaces
- ใช้งาน Docker Compose ได้
- เข้าใจแนวคิดเบื้องต้นของ metrics และ time series

## Scenario

ทีมของคุณมี Prometheus อยู่แล้วและต้องการให้นักพัฒนาสามารถสำรวจ metrics ด้วย Grafana ได้โดยไม่ต้องพึ่ง infrastructure ภายนอก เพื่อให้ทุกคนเห็นภาพเหมือนกัน คุณจะใช้ Prometheus แบบ self-contained ภายใน GitHub Codespaces และเชื่อมต่อเข้ากับ Grafana โดยตรง

เป้าหมายคือสร้าง Data source ที่ใช้งานได้จริง และตรวจสอบว่า query จาก Grafana ไปยัง Prometheus คืนค่ากลับมาได้สำเร็จ

---

## เริ่มต้น stack สำหรับ Prometheus

1. เปิด Terminal แล้วไปที่โฟลเดอร์ lab นี้

   ```bash
   cd labfiles/02-prometheus-data-source
   ```

1. รัน stack ของ Grafana และ Prometheus

   ```bash
   docker compose up -d
   ```

1. ตรวจสอบสถานะ Container

   ```bash
   docker compose ps
   ```

1. เปิด Grafana ผ่าน forwarded port `3000` ของ GitHub Codespaces แล้ว login ด้วย `admin` / `grafanaadmin`

> 📸 **Screenshot**: หน้า Grafana login หรือ Home page หลังจาก stack ของ Prometheus เริ่มทำงานแล้ว

## เพิ่ม Prometheus Data source

1. ไปที่ **Connections** > **Add new connection**

1. ค้นหาคำว่า `Prometheus`

1. เลือก **Prometheus** แล้วคลิก **Add new data source**

1. กรอกค่า URL เป็น `http://prometheus:9090`

1. เลื่อนลงด้านล่างแล้วคลิก **Save & test**

1. ยืนยันว่ามีข้อความสำเร็จลักษณะใกล้เคียงกับ `Successfully queried the Prometheus API.`

> 📸 **Screenshot**: หน้า configuration ของ Prometheus Data source พร้อมค่า URL `http://prometheus:9090` และผลลัพธ์หลังคลิก **Save & test**

## ทดลอง query metrics ใน Explore

1. ไปที่ **Explore**

1. เลือก Data source เป็น Prometheus ที่เพิ่งสร้าง

1. รัน query แรกเพื่อตรวจสอบ target ที่ตอบกลับอยู่

   ```promql
   up
   ```

   ตัวอย่างผลลัพธ์ในมุมมองแบบ Table:

   ```text
   up{instance="localhost:9090", job="prometheus"} 1
   ```

1. สังเกตผลลัพธ์แบบ Table หรือ Time series ว่ามีค่า `1` สำหรับ target ที่ตอบสนองปกติ

1. รัน query เพิ่มเติมเพื่อดู metadata ของ Prometheus เอง

   ```promql
   prometheus_build_info
   ```

   ตัวอย่างผลลัพธ์ในมุมมองแบบ Table:

   ```text
   prometheus_build_info{branch="HEAD", instance="localhost:9090", job="prometheus", version="3.3.1", ...} 1
   ```

1. ทดลอง query แบบมี aggregation เบื้องต้น

   ```promql
   rate(prometheus_http_requests_total[5m])
   ```

   ตัวอย่างผลลัพธ์ในมุมมองแบบ Table:

   ```text
   {code="200", handler="/", instance="localhost:9090", job="prometheus"} 0
   {code="200", handler="/api/v1/*path", instance="localhost:9090", job="prometheus"} 0
   ```

   ในช่วงที่เพิ่งเริ่ม stack ใหม่ ๆ ค่า rate อาจเป็น `0` หรือมีเพียงไม่กี่ series เพราะยังมี request เข้า Prometheus ไม่มาก

> 📸 **Screenshot**: หน้า **Explore** ที่แสดงผลลัพธ์จาก query `up` หรือ `prometheus_build_info`

## อธิบายสิ่งที่เกิดขึ้น

1. เปิดไฟล์ `prometheus.yml` ในโฟลเดอร์ lab แล้วอธิบายว่า Prometheus scrape ตัวเองผ่าน target `localhost:9090`

1. อธิบายว่าฝั่ง Grafana ใช้ชื่อ service `prometheus` เพราะทั้งสอง Container อยู่ใน Docker Compose network เดียวกัน

1. ย้ำว่าจุดสำคัญของ exercise นี้คือแยกความเข้าใจระหว่าง `localhost` ของ host กับชื่อ service ภายใน network ของ Compose

## Result

คุณควรมี Prometheus Data source ที่ใช้งานได้ใน Grafana และสามารถ query metrics แรกผ่านหน้า **Explore** ได้สำเร็จ

## เตรียม environment สำหรับ exercise ถัดไป

1. กลับมาที่โฟลเดอร์ของ lab นี้

   ```bash
   cd labfiles/02-prometheus-data-source
   ```

1. หยุด stack ของ Grafana และ Prometheus

   ```bash
   docker compose down
   ```

1. ยืนยันว่าคุณไม่เหลือ container ที่ใช้ port `3000` หรือ `9090` จาก exercise นี้ เพื่อให้ exercise ถัดไปเริ่มได้โดยไม่มี port conflict