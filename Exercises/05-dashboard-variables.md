---
lab:
    title: 'สร้าง Dashboard แบบ interactive ด้วย Variables ใน Grafana'
    description: 'ผู้เรียนจะสร้าง query variables จาก InfluxDB เพื่อสลับดู service และ region ได้จาก Dashboard เดียว'
    topic: 'Advanced Dashboard Features'
    level: 200
    duration: 45
    islab: true
---

# สร้าง Dashboard แบบ interactive ด้วย Variables ใน Grafana

ใน exercise นี้ เราจะใช้ Variables เพื่อเปลี่ยน dashboard ธรรมดาให้กลายเป็น dashboard แบบ interactive ที่สลับมุมมองตาม `service` และ `region` ได้จาก dropdown ด้านบนของหน้า โดยใช้ metrics จาก InfluxDB 2.x ที่มีข้อมูล multi-region สำหรับการทดลอง

This exercise takes approximately **45** minutes.

> **Important**: Exercise นี้ใช้ InfluxDB 2.x และ Flux query language Variables จะดึงค่า tag จาก bucket โดยตรงผ่าน Flux query ทำให้ dropdown เปลี่ยนตาม tag ที่มีอยู่ใน data จริง

## Learning Objectives

1. เตรียม InfluxDB และ seed ข้อมูลตัวอย่างที่มีหลาย `service` และ `region`
2. สร้าง query variable สำหรับ `service` ด้วย Flux
3. สร้าง query variable แบบ chained สำหรับ `region` ที่กรองตาม `service` ที่เลือก
4. ใช้ Variables ใน Flux query เพื่อทำ dashboard แบบ interactive

## Prerequisites

- เคยสร้าง InfluxDB Data source แบบ Flux ใน Grafana แล้ว (exercise 03)
- เข้าใจ Flux query เบื้องต้น
- ใช้ Dashboard editor ของ Grafana ได้

## Scenario

ทีมสังเกตการณ์ระบบต้องการ dashboard ชุดเดียวที่เลือกดูแต่ละ service และ region ได้ผ่าน dropdown โดยไม่ต้องสร้าง panel แยกต่างหาก ข้อมูลใน InfluxDB มีการแยก tag `service` (api, worker, web) และ `region` (ap-southeast, eu-west, us-east) โดยแต่ละ service ปรากฏอยู่ใน region ที่ต่างกัน ซึ่งทำให้ chained variable มีความหมายในเชิงปฏิบัติจริง

---

## เตรียม environment และ seed data

1. เปิด Terminal แล้วไปที่โฟลเดอร์ lab นี้

   ```bash
   cd labfiles/05-dashboard-variables
   ```

1. คัดลอกไฟล์ `.env.example` ไปเป็น `.env`

   ```bash
   cp .env.example .env
   ```

   หากรันบน Windows Command Prompt ให้ใช้คำสั่งนี้แทน:

   ```bat
   copy .env.example .env
   ```

1. เปิด stack ของ Grafana และ InfluxDB

   ```bash
   docker compose up -d
   ```

1. รัน script สำหรับเติมข้อมูลตัวอย่าง

   ```bash
   ./scripts/seed-influx.sh
   ```

   หากรันบน Windows Command Prompt ให้ใช้คำสั่งนี้แทน:

   ```bat
   scripts\seed-influx.cmd
   ```

1. ตรวจสอบว่า script รายงานข้อความว่าการเขียนข้อมูลเสร็จสมบูรณ์


## เพิ่ม InfluxDB Data source

1. เปิด Grafana จาก port `3000` และ login ด้วย `admin` / `grafanaadmin`

1. ไปที่ **Connections** > **Add new connection**

1. ค้นหาคำว่า `InfluxDB` แล้วเลือก **InfluxDB** จากนั้นคลิก **Add new data source**

1. ตั้งค่าดังนี้

   - URL: `http://influxdb:8086`
   - Product: `InfluxDB OSS 2.x`
   - Query language: `Flux`
   - Organization: `grafana-lab`
   - Default Bucket: `system`
   - Token: `lab-super-token`

1. คลิก **Save & test** และยืนยันว่าผลลัพธ์สำเร็จ


## สร้าง dashboard สำหรับ interactive view

1. ไปที่ **Dashboards** > **New** > **New dashboard**

1. บันทึก dashboard ชื่อ
   ```
   Interactive Service Overview
   ```

1. คลิกปุ่ม **Edit** ที่มุมซ้ายบนของ dashboard

1. จาก right-toolbar ให้เปิด **Dashboard options**

1. ไปที่ section **Variables** แล้วคลิก **+ Add variable**


## สร้าง variable `service`

1. ในฟอร์มที่เปิดจาก **+ Add variable** ให้ตั้งค่า Name เป็น `service`

1. ในช่อง **Select variable type** ให้เลือก `Query`

1. เลือก Data source เป็น `InfluxDB`

1. ในช่อง Query ให้ใส่ Flux query ต่อไปนี้

   ```flux
   import "influxdata/influxdb/schema"

   schema.tagValues(bucket: "system", tag: "service")
   ```

   > **Note**: `schema.tagValues()` เป็น Flux function ที่ดึงค่า tag ที่มีอยู่ใน bucket โดยตรง Grafana จะใช้คอลัมน์ `_value` จากผลลัพธ์เป็นตัวเลือกใน dropdown

1. ถ้าเห็นตัวเลือก **Refresh** ให้เลือก `On dashboard load`; ถ้าไม่เห็นตัวเลือกนี้ ให้ข้ามขั้นตอนนี้ได้

1. กด **Preview of values** เพื่อยืนยันว่ามีค่า `api`, `worker`, `web` ถูกดึงมา

1. คลิก **Apply**


## สร้าง variable `region`

1. กลับไปที่ section **Variables** แล้วคลิก **+ Add variable** อีกครั้ง

1. ตั้งค่า Name เป็น `region`

1. ในช่อง **Select variable type** ให้เลือก `Query`

1. เลือก Data source เป็น `InfluxDB`

1. ในช่อง Query ให้ใส่ Flux query ต่อไปนี้

   ```flux
   from(bucket: "system")
     |> range(start: -1h)
     |> filter(fn: (r) => r._measurement == "lab_metrics")
     |> filter(fn: (r) => r.service == "${service}")
     |> keep(columns: ["region"])
     |> distinct(column: "region")
   ```

   > **Note**: Query นี้กรอง data ตาม `service` ที่เลือกจาก variable `$service` แล้วดึงเฉพาะค่า tag `region` ที่ไม่ซ้ำ ทำให้ dropdown `region` เปลี่ยนตาม service ที่เลือก

1. ถ้าเห็นตัวเลือก **Refresh** ให้เลือก `On dashboard load`; ถ้าไม่เห็นตัวเลือกนี้ ให้ข้ามขั้นตอนนี้ได้

1. กด **Preview of values** เพื่อยืนยันว่ามีค่า region ถูกดึงมาอย่างน้อย 1 ค่า

1. คลิก **Apply**

1. ยืนยันว่าด้านบนของ dashboard มี dropdown สำหรับ `service` และ `region`

1. ลองเปลี่ยนค่า `service` แล้วสังเกตว่า dropdown `region` เปลี่ยนตัวเลือกตาม


## ใช้ Variables ใน panel query

1. คลิกปุ่ม **Edit** ที่มุมบนขวาเพื่อเข้าสู่ edit mode

1. คลิกปุ่ม **Add new element** (ไอคอน "+" สีน้ำเงิน) ในแถบ toolbar

1. panel ใหม่จะปรากฏบน canvas ให้คลิกที่ panel นั้น แล้วเลือก **Configure visualization**

1. ในหน้า panel editor ให้คลิกแท็บ **Queries** ด้านล่าง จากนั้นคลิก dropdown ของ Data source แล้วเลือก **InfluxDB**

1. ในช่อง query ให้พิมพ์ Flux query ต่อไปนี้

   ```flux
   from(bucket: "system")
     |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
     |> filter(fn: (r) => r._measurement == "lab_metrics")
     |> filter(fn: (r) => r.service == "${service}")
     |> filter(fn: (r) => r.region == "${region}")
     |> filter(fn: (r) => r._field == "cpu")
   ```

   > **Note**: `v.timeRangeStart` และ `v.timeRangeStop` คือค่า built-in ของ Grafana ที่ส่งช่วงเวลาที่เลือกบน dashboard เข้ามา ส่วน `${service}` และ `${region}` คือ variable ที่เราสร้างไว้

1. คลิก **Run Query** จากนั้นเลือก **Time series** จาก visualization suggestions

1. ในแผง properties ด้านขวา ให้ขยาย **Panel options** แล้วกรอกชื่อ panel ในช่อง **Title** ว่า `CPU Usage`

1. สลับค่าของ dropdown `service` และ `region` แล้วสังเกตว่าผลลัพธ์ใน panel เปลี่ยนตาม

1. Grafana sync ค่า variable ไปกับ URL ในรูปแบบ `var-<name>=value` เพื่อช่วยในการแชร์ลิงก์ที่คง state เดิมไว้


## Result

เราควรมี dashboard แบบ interactive ที่ผู้เรียนสามารถสลับดู service และ region ต่าง ๆ ได้จาก dropdown โดยไม่ต้องแก้ query เอง และ dropdown `region` จะแสดงเฉพาะ region ที่มีข้อมูลของ service นั้นจริง

## เตรียม environment สำหรับ exercise ถัดไป

1. กลับมาที่โฟลเดอร์ของ lab นี้

   ```bash
   cd labfiles/05-dashboard-variables
   ```

1. หยุด stack ของ Grafana และ InfluxDB

   ```bash
   docker compose down
   ```

1. ย้ำกับผู้เรียนว่าการปิด stack หลังจบ exercise จะช่วยให้ค่าจาก dashboard variables และ port ที่ใช้งานอยู่ไม่ปะปนกับ lab ถัดไป