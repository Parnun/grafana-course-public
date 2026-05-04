---
lab:
    title: 'เชื่อมต่อ InfluxDB แบบ Flux Data source และ query ข้อมูล time series'
    description: 'ผู้เรียนจะเปิด InfluxDB 2.x, เติมข้อมูลตัวอย่าง, และเชื่อมต่อ Data source แบบ Flux เข้ากับ Grafana'
    topic: 'Working with Data Sources'
    level: 200
    duration: 45
    islab: true
---

# เชื่อมต่อ InfluxDB แบบ Flux Data source และ query ข้อมูล time series

ใน exercise นี้ คุณจะเปิด InfluxDB 2.x คู่กับ Grafana ภายใน GitHub Codespaces แล้วเติมข้อมูลตัวอย่างสำหรับ lab ด้วย script ที่เตรียมไว้ หลังจากนั้นจะสร้าง InfluxDB Data source แบบ Flux และทดสอบ query ผ่านหน้า Explore

This exercise takes approximately **45** minutes.

> **Important**: Exercise นี้ใช้ InfluxDB 2.x และเลือก query language เป็น `Flux` ดังนั้นค่าที่ต้องใช้หลัก ๆ คือ URL, Organization, Default Bucket และ Token

## Learning Objectives

1. เปิด InfluxDB 2.x และ Grafana ใน GitHub Codespaces
2. เติมข้อมูลตัวอย่างลงใน bucket สำหรับ lab
3. สร้าง InfluxDB Data source แบบ Flux ใน Grafana
4. ใช้ Flux query เบื้องต้นเพื่อตรวจสอบข้อมูล time series

## Prerequisites

- ใช้งาน Docker Compose และ Terminal ใน GitHub Codespaces ได้
- เข้าใจว่า InfluxDB 2.x ใช้ Token สำหรับ authentication
- เคยใช้งาน Grafana UI เบื้องต้นมาแล้ว

## Scenario

อีกทีมหนึ่งในองค์กรของคุณส่ง metrics เข้ามาเก็บใน InfluxDB และต้องการให้ผู้เรียนเห็นความแตกต่างระหว่าง PromQL กับ Flux โดยใช้ข้อมูลชุดเล็กที่ควบคุมได้ คุณจึงเตรียม InfluxDB 2.x พร้อม bucket และ token สำหรับ lab ไว้ล่วงหน้า

เป้าหมายคือให้ผู้เรียนเชื่อมต่อ InfluxDB ผ่าน Grafana ได้จริง และ query ข้อมูลที่เพิ่ง seed เข้าไปในระบบได้สำเร็จ

---

## เตรียม environment และ seed data

1. เปิด Terminal แล้วไปที่โฟลเดอร์ lab นี้

   ```bash
   cd labfiles/03-influxdb-flux-data-source
   ```

1. คัดลอกไฟล์ `.env.example` ไปเป็น `.env`

   ```bash
   cp .env.example .env
   ```

1. เปิด stack ของ Grafana และ InfluxDB

   ```bash
   docker compose up -d
   ```

1. รัน script สำหรับเติมข้อมูลตัวอย่าง

   ```bash
   ./scripts/seed-influx.sh
   ```

1. ตรวจสอบว่า script รายงานข้อความว่าการเขียนข้อมูลเสร็จสมบูรณ์

> 📸 **Screenshot**: Terminal ใน GitHub Codespaces หลังรัน `docker compose up -d` และ `./scripts/seed-influx.sh` สำเร็จ

## เพิ่ม InfluxDB Data source

1. เปิด Grafana จาก port `3000` และ login ด้วย `admin` / `grafanaadmin`

1. ไปที่ **Connections** > **Add new connection**

1. ค้นหาคำว่า `InfluxDB`

1. เลือก **InfluxDB** แล้วคลิก **Add new data source**

1. ตั้งค่าดังนี้

   - URL: `http://influxdb:8086`
   - Product: `InfluxDB OSS 2.x`
   - Query language: `Flux`
   - Organization: `grafana-lab`
   - Default Bucket: `system`
   - Token: `lab-super-token`

1. คลิก **Save & test** และยืนยันว่าผลลัพธ์สำเร็จ

> 📸 **Screenshot**: หน้า configuration ของ InfluxDB Data source แบบ Flux พร้อมค่าที่กรอกครบถ้วนและผลลัพธ์หลังคลิก **Save & test**

## ทดลอง query ด้วย Flux

1. ไปที่ **Explore**

1. เลือก InfluxDB Data source ที่เพิ่งสร้าง

1. รัน query ต่อไปนี้

   ```flux
   from(bucket: "system")
     |> range(start: -30m)
     |> filter(fn: (r) => r._measurement == "lab_metrics")
     |> filter(fn: (r) => r._field == "cpu")
   ```

1. ตรวจสอบว่ามีข้อมูล time series แสดงขึ้นมา

1. เปลี่ยน `_field` จาก `cpu` เป็น `memory` แล้วรันอีกครั้ง

1. อธิบายกับผู้เรียนว่า exercise นี้ใช้ data ชุดเดียวกันแต่เลือก field ต่างกันเพื่อแสดงรูปแบบการ query ใน Flux

> 📸 **Screenshot**: หน้า **Explore** ที่แสดงผลจาก Flux query กับ measurement `lab_metrics`

## ตรวจสอบโครงสร้างข้อมูลที่ seed ไว้

1. เปิดไฟล์ `scripts/seed-influx.sh`

1. สังเกตว่าข้อมูลถูกเขียนเข้า measurement `lab_metrics` พร้อม tags เช่น `service` และ `region`

1. อธิบายว่าข้อมูลลักษณะนี้เหมาะกับการสร้าง Dashboard และ filter ผ่าน variable ใน exercise ถัดไป

## Result

คุณควรมี InfluxDB Data source แบบ Flux ที่พร้อมใช้งานใน Grafana และ query ข้อมูลตัวอย่างที่เพิ่ง seed เข้าไปได้สำเร็จ