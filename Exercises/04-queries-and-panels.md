---
lab:
    title: 'สร้าง Dashboard แรกด้วย PromQL และ Panel พื้นฐานใน Grafana'
    description: 'ผู้เรียนจะสร้าง Dashboard จาก Prometheus metrics และปรับแต่ง Panel แบบ Time series กับ Stat'
    topic: 'Queries and Panels'
    level: 200
    duration: 45
    islab: true
---

# สร้าง Dashboard แรกด้วย PromQL และ Panel พื้นฐานใน Grafana

ใน exercise นี้ คุณจะใช้ Prometheus เป็นแหล่งข้อมูลหลักเพื่อสร้าง Dashboard แรกใน Grafana โดยเริ่มจาก dashboard skeleton ที่เตรียมไว้ แล้วเพิ่ม Panel แบบ Time series และ Stat พร้อมทั้งเขียน PromQL ให้ตรงกับคำถามทางธุรกิจที่ต้องการตอบ

This exercise takes approximately **45** minutes.

## Learning Objectives

1. เปิด stack สำหรับการสร้าง Dashboard ใน GitHub Codespaces
2. นำเข้า dashboard skeleton สำหรับ lab
3. สร้าง Panel แบบ Time series และ Stat จาก Prometheus metrics
4. ปรับแต่งชื่อ panel, legend, และมุมมองให้ dashboard อ่านง่ายขึ้น

## Prerequisites

- ทำ exercise 02 หรือเข้าใจการเพิ่ม Prometheus Data source แล้ว
- ใช้งาน Grafana UI และหน้า **Explore** เบื้องต้นได้
- เข้าใจ PromQL ขั้นพื้นฐาน

## Scenario

ทีม platform ต้องการ dashboard สั้น ๆ สำหรับตรวจสอบว่าส่วนประกอบหลักของ monitoring stack ยังทำงานอยู่หรือไม่ โดยต้องมีทั้งกราฟเชิงเวลาและค่าปัจจุบันแบบอ่านเร็ว ผู้เรียนจึงต้องสร้าง dashboard ที่ตอบคำถามได้ทันทีว่า target ยัง `up` อยู่ไหม และเวอร์ชันของ Prometheus ที่กำลังรันคืออะไร

---

## เปิด environment สำหรับ dashboard lab

1. เปิด Terminal แล้วไปที่โฟลเดอร์ lab นี้

   ```bash
   cd labfiles/04-queries-and-panels
   ```

1. รัน stack ของ Grafana และ Prometheus

   ```bash
   docker compose up -d
   ```

1. เปิด Grafana ผ่าน port `3000` แล้ว login ด้วย `admin` / `grafanaadmin`

1. หากยังไม่มี Prometheus Data source ให้เพิ่มใหม่ด้วย URL `http://prometheus:9090`

## นำเข้า dashboard skeleton

1. ไปที่ **Dashboards** > **New** > **Import**

1. เลือกไฟล์ `dashboards/starter.json` จากโฟลเดอร์ lab นี้

1. ตั้งชื่อ dashboard ใหม่เป็น `Platform Health Overview`

1. คลิก **Import**

> 📸 **Screenshot**: หน้า Import dashboard ใน Grafana พร้อมไฟล์ `starter.json` ก่อนคลิก **Import**

## สร้าง Time series panel

1. ใน dashboard ที่เพิ่ง import ให้คลิก **Add visualization**

1. เลือก Prometheus Data source

1. ใส่ query ต่อไปนี้

   ```promql
   up{job="prometheus"}
   ```

1. ตั้งชื่อ panel เป็น `Prometheus Availability`

1. ตรวจสอบว่า panel แสดงค่า `1` ตลอดช่วงเวลา แปลว่า target ยังตอบสนองปกติ

1. ปรับ legend ให้แสดง `{{instance}}`

> 📸 **Screenshot**: หน้า panel editor ที่มี query `up{job="prometheus"}` และกราฟแสดงเส้นค่า `1`

## สร้าง Stat panel สำหรับ metadata

1. เพิ่ม visualization ใหม่อีกหนึ่งรายการ

1. ใช้ query ต่อไปนี้

   ```promql
   prometheus_build_info
   ```

1. เปลี่ยน visualization เป็น **Stat**

1. ตั้งชื่อ panel เป็น `Prometheus Build Info`

1. อธิบายว่าค่า metric นี้ใช้ยืนยัน metadata ของ binary ที่กำลังรันอยู่ ไม่ได้ใช้วัดโหลดแบบ time series ทั่วไป

> 📸 **Screenshot**: หน้า panel editor ของ Stat panel ที่ใช้ query `prometheus_build_info`

## จัดหน้า dashboard และบันทึก

1. จัดวาง Time series panel และ Stat panel ให้อยู่ใน layout ที่อ่านง่าย

1. คลิก **Save dashboard**

1. ใส่คำอธิบายสั้น ๆ เช่น `Starter dashboard for platform health checks`

1. อธิบายว่าการเลือก panel ให้เหมาะกับคำถามสำคัญพอ ๆ กับการเขียน query ให้ถูกต้อง

## Result

คุณควรมี dashboard แรกที่ประกอบด้วยอย่างน้อยหนึ่ง Time series panel และหนึ่ง Stat panel ซึ่งดึงข้อมูลจาก Prometheus ได้จริง