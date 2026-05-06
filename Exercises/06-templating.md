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

## เพิ่ม Prometheus Data source

1. ไปที่ **Connections** > **Add new connection**

1. ค้นหา `Prometheus` แล้วเลือก **Add new data source**

1. กรอก URL เป็น `http://prometheus:9090`

1. คลิก **Save & test**



## นำเข้า dashboard template เริ่มต้น

1. ไปที่ **Dashboards** > **New** > **Import**

1. เลือกไฟล์ `dashboards/starter.json` จากโฟลเดอร์ `labfiles/06-templating`

1. ตั้งชื่อ dashboard เป็น `Service Template Dashboard`

1. คลิก **Import**



## สร้าง Variables สำหรับ Templating

### สร้าง **service** variable

1. คลิกปุ่ม **Edit** ที่มุมซ้ายบนของ dashboard

1. จาก right-toolbar ให้เปิด **Dashboard options**

1. ไปที่ section **Variables** แล้วคลิก **+ Add variable** เพื่อสร้าง variable แรก

1. ในช่อง **Select variable type** ให้เลือก `Query`
2. ตั้งค่า Name เป็น `service`


1. เลือก Data source เป็น `Prometheus`

2. ใน Query options ให้เลือก Query type เป็น `Label values`

3. ตั้งค่า Label เป็น `job` 
4. ตั้งค่า Metric เป็น `up`

5. เปิด  **Include All option** เพื่อให้ผู้ใช้เลือกได้มากกว่าหนึ่ง service และมีตัวเลือก `All`

6. กด `Preview` เพื่อดูค่าที่จะได้จาก query นี้ ควรเห็นรายการของ service ที่มีอยู่ใน Prometheus
7. คลิก **Close** เพื่อบันทึก variable นี้

### สร้าง **instance** variable

7.  กลับไปที่ section **Variables** แล้วคลิก **+ Add variable** อีกครั้งเพื่อสร้าง variable ชื่อ `instance`

8.  ในช่อง **Select variable type** ให้เลือก `Query`

9.  เลือก Data source เป็น `Prometheus`

10. ใน Query options ให้เลือก Query type เป็น `Label values`

11. ตั้งค่า Label เป็น `instance` 
12. ตั้งค่า Metric เป็น `up`
13. ตั้งค่า Label filter เป็น `{job=~"$service"}` เพื่อให้ `instance` variable ขึ้นกับค่าที่เลือกใน `service` โดยเราจะเห็นค่าของ service ให้เลือกในรายการ เช่น `grafana` และ `prometheus` 

14. เปิด **Include All option** 


15. คลิก **Preview** เพื่อดูค่าที่จะได้จาก query นี้ ควรเห็นรายการของ instance ที่ขึ้นกับ service ที่เลือก เช่น `grafana:3000` หรือ `prometheus:9090`
16. คลิก **Close**

### สร้าง **window** variable

15. กลับไปที่ section **Variables** แล้วคลิก **+ Add variable** 
16. ในช่อง **Select variable type** ให้เลือก `Custom`
17. ตั้งค่า Name เป็น `window`

18. ใส่ Values เป็น `1m,5m,15m` และ `Custom` เหมาะกับค่าที่เรากำหนดเองและไม่ต้อง query จาก data source

19. คลิก **Apply** และตรวจสอบว่า dropdown ทั้ง `service`, `instance`, `window` แสดงที่ด้านบน dashboard


## ใช้ Variables ใน Panel query และเปิด panel repeat

1. คลิก **Edit** ที่มุมขวาบนเพื่อเข้าสู่ edit mode

1. คลิก **Add new element** แล้วเลือก **Configure visualization**

1. เลือก Data source เป็น `Prometheus` และใส่ code query

   ```promql
   rate(process_cpu_seconds_total{job=~"$service", instance=~"$instance"}[$window])
   ```

   > **ทำไมไม่ใช้ `up` metric?** `up` คืนค่าเป็น `0` หรือ `1` เท่านั้น ดังนั้น `avg_over_time(up[...])` จะได้ค่าเท่ากับ `1` ตลอดเมื่อ service ทำงานปกติ ทำให้การเปลี่ยน `$window` ไม่มีผลต่อกราฟ เราใช้ `rate(process_cpu_seconds_total[$window])` แทน เพราะเป็น metric ที่เปลี่ยนแปลงตามเวลาจริงและมีอยู่ทั้งใน `prometheus` และ `grafana` jobs ทำให้เห็นชัดเจนว่า window ที่ใหญ่กว่าให้เส้นกราฟที่เรียบกว่า

1. คลิก **Run query** แล้วทดลองเปลี่ยนค่า dropdown ด้านบนเพื่อดูว่า panel เปลี่ยนผลลัพธ์ตาม variable

1. เลือก visualization เป็น **Time series**

1. ตั้งชื่อ panel เป็น `CPU Rate (templated)`




## ตรวจสอบพฤติกรรม template ใน URL

1. สลับค่า `service` และ `instance` ที่ด้านบน dashboard

1. สังเกต URL ว่ามีพารามิเตอร์รูปแบบ `var-service=` และ `var-instance=`

1. refresh หน้าแล้วตรวจสอบว่าค่าที่เลือกไว้ยังคงอยู่

1. บันทึก dashboard โดยคลิก **Save dashboard**



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
