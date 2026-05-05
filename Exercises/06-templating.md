---
lab:
    title: 'ใช้ Templating เพื่อทำ Dashboard เดียวให้รองรับหลายบริการ'
    description: 'ผู้เรียนจะสร้าง Variables หลายแบบและนำไปใช้ใน query เพื่อทำ Dashboard แบบ reusable'
    topic: 'Advanced Dashboard Features'
    level: 200
    duration: 45
    islab: true
---

# ใช้ Templating เพื่อทำ Dashboard เดียวให้รองรับหลายบริการ

ใน exercise นี้ เราจะโฟกัสเรื่อง Templating โดยสร้าง Variables หลายรูปแบบใน Grafana แล้วนำไปใช้ใน query ของ Panel เพื่อให้ Dashboard เดียวสามารถเลือกดูข้อมูลตาม service, instance และช่วงเวลาได้ทันที เป้าหมายคือทำให้ dashboard ยืดหยุ่นและนำกลับไปใช้ซ้ำได้ง่ายในงานจริง

This exercise takes approximately **45** minutes.

> **Note**: ขั้นตอนใน lab นี้อ้างอิง Grafana 13.x โดยชื่อปุ่มหรือเมนูอาจต่างเล็กน้อยหากใช้เวอร์ชันอื่น

## Learning Objectives

1. เปิด lab environment ใน GitHub Codespaces และตรวจสอบการเข้าถึง Grafana
2. สร้าง Query variable และ Custom variable สำหรับงาน Templating
3. ใช้ Variables ใน PromQL เพื่อทำ Panel ที่เปลี่ยนตามค่า dropdown
4. ตั้งค่า panel repeat เพื่อขยายมุมมองอัตโนมัติตาม Variable
5. อธิบายหลักการออกแบบ Dashboard template ที่นำกลับมาใช้ซ้ำได้

## Prerequisites

- ใช้งาน GitHub Codespaces และ Terminal ได้
- เคยเพิ่ม Prometheus Data source ใน Grafana มาแล้ว
- เข้าใจ PromQL เบื้องต้น เช่น `up` และ selector รูปแบบ `{label="value"}`

## Scenario

ทีม Platform ต้องดูสถานะของหลาย service จาก Dashboard เดียว โดยไม่ต้องทำ dashboard แยกต่อ service เพราะจะดูแลยากเมื่อระบบโตขึ้น ทีมต้องการใช้ Templating เพื่อเลือกมุมมองจาก dropdown และแชร์ลิงก์ที่คง context เดิมได้

ใน lab นี้ ผู้เรียนจะสร้าง Variables แบบ query chain และ custom interval จากนั้นนำไปใช้กับ panel query และ panel repeat เพื่อสร้าง dashboard ที่ flexible และพร้อมใช้กับหลายทีม

---

## เปิด environment สำหรับ templating lab

1. เปิด Terminal แล้วไปที่โฟลเดอร์ lab นี้

   ```bash
   cd labfiles/06-templating
   ```

1. รัน stack ของ Grafana และ Prometheus

   ```bash
   docker compose up -d
   ```

1. รอให้ GitHub Codespaces แจ้งว่า port `3000` ถูก forward แล้วเปิด Grafana ผ่าน browser preview หรือเปิดใน browser tab

1. login ด้วย `admin` / `grafanaadmin`

> 📸 **Screenshot**: หน้า Grafana หลัง login สำเร็จใน GitHub Codespaces โดยเห็น URL ของ forwarded port `3000`

## เพิ่ม Prometheus Data source

1. ไปที่ **Connections** > **Add new connection**

1. ค้นหา `Prometheus` แล้วเลือก **Add new data source**

1. กรอก URL เป็น `http://prometheus:9090`

1. คลิก **Save & test**

> 📸 **Screenshot**: หน้า Prometheus Data source พร้อมผลลัพธ์หลังคลิก **Save & test**

## นำเข้า dashboard template เริ่มต้น

1. ไปที่ **Dashboards** > **New** > **Import**

1. เลือกไฟล์ `dashboards/starter.json` จากโฟลเดอร์ `labfiles/06-templating`

1. ตั้งชื่อ dashboard เป็น `Service Template Dashboard`

1. คลิก **Import**

> 📸 **Screenshot**: หน้า Import dashboard ที่เลือกไฟล์ `starter.json` และตั้งชื่อ `Service Template Dashboard`

## สร้าง Variables สำหรับ Templating

1. คลิกปุ่ม **Edit** ที่มุมซ้ายบนของ dashboard

1. จาก right-toolbar ให้เปิด **Dashboard options**

1. ไปที่ section **Variables** แล้วคลิก **+ Add variable** เพื่อสร้าง variable แรก

1. ตั้งค่า Name เป็น `service`

1. ในช่อง **Select variable type** ให้เลือก `Query`

1. สำหรับการสอน ให้ชี้ให้ผู้เรียนเห็นว่าจากเอกสารล่าสุดของ Grafana มีตัวเลือกหลัก เช่น `Query`, `Custom`, `Text box`, `Constant`, `Data source`, `Interval`, `Filters`, และ `Switch`; สำหรับ `service` ต้องใช้ `Query` เพราะค่ามาจาก Prometheus

1. เลือก Data source เป็น `Prometheus`

1. ใน Query options ให้เลือก Query type เป็น `Label values`

1. ตั้งค่า Label เป็น `job` และ Metric เป็น `up`

1. เปิด `Include All option` แล้วคลิก **Apply**

1. ถ้าเห็นตัวเลือก **Refresh** ให้เลือก `On dashboard load`; ถ้าไม่เห็นตัวเลือกนี้ ให้ข้ามขั้นตอนนี้ได้

1. กลับไปที่ section **Variables** แล้วคลิก **+ Add variable** อีกครั้งเพื่อสร้าง variable ชื่อ `instance`

1. ในช่อง **Select variable type** ให้เลือก `Query`

1. เลือก Data source เป็น `Prometheus`

1. ใน Query options ให้เลือก Query type เป็น `Label values`

1. ตั้งค่า Label เป็น `instance` และ Metric เป็น `up{job=~"$service"}`

1. คลิก **Apply**

1. ถ้าเห็นตัวเลือก **Refresh** ให้เลือก `On dashboard load`; ถ้าไม่เห็นตัวเลือกนี้ ให้ข้ามขั้นตอนนี้ได้ โดย `instance` ยังเป็น chained variable ที่ขึ้นกับ `$service`

1. กลับไปที่ section **Variables** แล้วคลิก **+ Add variable** อีกครั้งเพื่อสร้าง variable ชื่อ `window`

1. ในช่อง **Select variable type** ให้เลือก `Custom`

1. ใส่ Values เป็น `1m,5m,15m` และ `Custom` เหมาะกับค่าที่เรากำหนดเองและไม่ต้อง query จาก data source

1. คลิก **Apply** และตรวจสอบว่า dropdown ทั้ง `service`, `instance`, `window` แสดงที่ด้านบน dashboard

> 📸 **Screenshot**: หน้า dashboard ในโหมด **Edit** ที่เปิด **Dashboard options** จาก right-toolbar และ section **Variables** มี `service`, `instance`, และ `window` ครบแล้ว

## ใช้ Variables ใน Panel query และเปิด panel repeat

1. คลิก **Edit** ที่มุมขวาบนเพื่อเข้าสู่ edit mode

1. คลิก **Add new element** แล้วเลือก **Configure visualization**

1. เลือก Data source เป็น `Prometheus` และใส่ query

   ```promql
   avg_over_time(up{job=~"$service", instance=~"$instance"}[$window])
   ```

1. เลือก visualization เป็น **Time series**

1. ตั้งชื่อ panel เป็น `Availability (templated)`

1. ในส่วน panel options ให้ตั้งค่า repeat by variable เป็น `instance`

1. คลิก **Run query** แล้วทดลองเปลี่ยนค่า dropdown ด้านบนเพื่อดูว่า panel เปลี่ยนผลลัพธ์ตาม variable

> 📸 **Screenshot**: หน้า panel editor ที่ใช้ query พร้อมตัวแปร `$service`, `$instance`, `$window` และตั้งค่า repeat ตาม `instance`

## ตรวจสอบพฤติกรรม template ใน URL

1. สลับค่า `service` และ `instance` ที่ด้านบน dashboard

1. สังเกต URL ว่ามีพารามิเตอร์รูปแบบ `var-service=` และ `var-instance=`

1. refresh หน้าแล้วตรวจสอบว่าค่าที่เลือกไว้ยังคงอยู่

1. บันทึก dashboard โดยคลิก **Save dashboard**

> 📸 **Screenshot**: Dashboard หลังบันทึก โดยเห็น dropdown และ URL ที่มี `var-` parameters

## Result

เราควรมี Dashboard template ที่ใช้ Variables หลายแบบได้จริง และสามารถเปลี่ยนมุมมองตาม service/instance/time window ได้จาก dropdown โดยไม่ต้องแก้ query ทุกครั้ง

## เตรียม environment สำหรับ exercise ถัดไป

1. กลับมาที่โฟลเดอร์ของ lab นี้

   ```bash
   cd labfiles/06-templating
   ```

1. หยุด stack ของ Grafana และ Prometheus

   ```bash
   docker compose down
   ```

1. ตรวจสอบว่าไม่มี container ค้างก่อนเริ่ม exercise ถัดไป
