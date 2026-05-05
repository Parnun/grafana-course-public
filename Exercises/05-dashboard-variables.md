---
lab:
    title: 'สร้าง Dashboard แบบ interactive ด้วย Variables ใน Grafana'
    description: 'ผู้เรียนจะสร้าง query variables เพื่อสลับดู job และ instance ได้จาก Dashboard เดียว'
    topic: 'Advanced Dashboard Features'
    level: 200
    duration: 45
    islab: true
---

# สร้าง Dashboard แบบ interactive ด้วย Variables ใน Grafana

ใน exercise นี้ เราจะใช้ Variables เพื่อเปลี่ยน dashboard ธรรมดาให้กลายเป็น dashboard แบบ interactive ที่สลับมุมมองตาม `job` และ `instance` ได้จาก dropdown ด้านบนของหน้า โดยใช้ metrics จาก Prometheus ที่มีหลาย scrape targets สำหรับการทดลอง

This exercise takes approximately **45** minutes.

## Learning Objectives

1. เตรียม Prometheus targets หลายชุดเพื่อใช้กับ Variables
2. สร้าง query variable สำหรับ `job`
3. สร้าง query variable แบบอ้างอิงกันสำหรับ `instance`
4. ใช้ Variables ใน PromQL เพื่อทำ dashboard แบบ interactive

## Prerequisites

- เคยเพิ่ม Prometheus Data source แล้ว
- เข้าใจ PromQL ระดับพื้นฐาน
- ใช้ Dashboard editor ของ Grafana ได้

## Scenario

ทีมสังเกตการณ์ระบบไม่ต้องการสร้าง dashboard แยกสำหรับทุก service เพราะจะทำให้ดูแลยากเกินไป พวกเขาต้องการ dashboard ชุดเดียวที่เลือกดูได้หลาย target ผ่าน dropdown โดยไม่ต้องแก้ panel ทีละตัว

Exercise นี้จะทำให้ผู้เรียนเข้าใจว่า Variables ช่วยลดการ hard-code ค่าใน query และเพิ่มความยืดหยุ่นของ dashboard ได้อย่างไร

---

## เปิด stack สำหรับ variable lab

1. เปิด Terminal แล้วไปที่โฟลเดอร์ lab นี้

   ```bash
   cd labfiles/05-dashboard-variables
   ```

1. รัน stack

   ```bash
   docker compose up -d
   ```

1. เปิด Grafana จาก port `3000` และ login ด้วย `admin` / `grafanaadmin`

1. เพิ่ม Prometheus Data source ด้วย URL `http://prometheus:9090` หากยังไม่มี

## สร้าง dashboard สำหรับ interactive view

1. ไปที่ **Dashboards** > **New** > **New dashboard**

1. บันทึก dashboard ชื่อ `Interactive Service Overview`

1. ไปที่ **Dashboard settings** > **Variables**

> 📸 **Screenshot**: หน้า **Dashboard settings** > **Variables** ก่อนเริ่มสร้าง variable ตัวแรก

## สร้าง variable `job`

1. คลิก **Add variable**

1. ตั้งค่า Name เป็น `job`

1. เลือก Type เป็น `Query`

1. เลือก Data source เป็น Prometheus

1. ใส่ Query ดังนี้

   ```promql
   label_values(up, job)
   ```

1. เปิด option `Include All option` เพื่อให้ผู้เรียนสลับดูทุก job ได้

1. คลิก **Apply**

## สร้าง variable `instance`

1. คลิก **Add variable** อีกครั้ง

1. ตั้งค่า Name เป็น `instance`

1. เลือก Type เป็น `Query`

1. ใช้ Query ต่อไปนี้

   ```promql
   label_values(up{job="$job"}, instance)
   ```

1. คลิก **Apply**

1. ยืนยันว่าด้านบนของ dashboard มี dropdown สำหรับ `job` และ `instance`

> 📸 **Screenshot**: dashboard ที่แสดง dropdown ของ `job` และ `instance` ด้านบนเรียบร้อยแล้ว

## ใช้ Variables ใน panel query

1. คลิกปุ่ม **Edit** ที่มุมบนขวาเพื่อเข้าสู่ edit mode

1. คลิกปุ่ม **Add new element** (ไอคอน "+" สีน้ำเงิน) ในแถบ toolbar

1. panel ใหม่จะปรากฏบน canvas ให้คลิกที่ panel นั้น แล้วเลือก **Configure visualization**

1. ในหน้า panel editor ให้คลิกแท็บ **Queries** ด้านล่าง จากนั้นคลิก dropdown ของ Data source แล้วเลือก **Prometheus**

1. ในช่อง query ให้คลิกปุ่ม **Code** เพื่อสลับเป็น code mode แล้วพิมพ์ query ต่อไปนี้

   ```promql
   up{job=~"$job", instance=~"$instance"}
   ```

1. คลิก **Run Query** จากนั้นเลือก **Time series** จาก visualization suggestions

1. ในแผง properties ด้านขวา ให้ขยาย **Panel options** แล้วกรอกชื่อ panel ในช่อง **Title** ว่า `Target Availability`

1. สลับค่าของ dropdown `job` และ `instance` แล้วสังเกตว่าผลลัพธ์ใน panel เปลี่ยนตาม

1. อธิบายว่า Grafana sync ค่า variable ไปกับ URL ในรูปแบบ `var-<name>=value` เพื่อช่วยในการแชร์ลิงก์ที่คง state เดิมไว้

## Result

เราควรมี dashboard แบบ interactive ที่ผู้เรียนสามารถสลับดู target ต่าง ๆ ได้จาก dropdown โดยไม่ต้องแก้ query เอง

## เตรียม environment สำหรับ exercise ถัดไป

1. กลับมาที่โฟลเดอร์ของ lab นี้

   ```bash
   cd labfiles/05-dashboard-variables
   ```

1. หยุด stack ของ Grafana และ Prometheus

   ```bash
   docker compose down
   ```

1. ย้ำกับผู้เรียนว่าการปิด stack หลังจบ exercise จะช่วยให้ค่าจาก dashboard variables และ port ที่ใช้งานอยู่ไม่ปะปนกับ lab ถัดไป