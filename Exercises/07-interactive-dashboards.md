---
lab:
    title: 'สร้าง Interactive Dashboard ด้วย Dashboard links และ Data links'
    description: 'ผู้เรียนจะสร้าง dashboard แบบ drill-down ที่คลิกจาก overview ไป detail ได้ทันที'
    topic: 'Advanced Dashboard Features'
    level: 200
    duration: 45
    islab: true
---

# สร้าง Interactive Dashboard ด้วย Dashboard links และ Data links

ใน exercise นี้ เราจะออกแบบ Interactive dashboard โดยเริ่มจากหน้า Overview แล้วเชื่อมไปหน้า Detail ผ่าน Dashboard links และ Data links เพื่อให้ผู้ใช้งานคลิกสำรวจปัญหาจากภาพรวมลงสู่รายละเอียดได้อย่างรวดเร็ว แนวทางนี้ช่วยให้ dashboard ใช้งานเชิงวิเคราะห์ได้จริงมากกว่าการดูกราฟแบบ static


> **Note**: Lab นี้ใช้เมนูและชื่อ option ตาม Grafana 13.x

## Learning Objectives

1. สร้างหน้า Overview และ Detail dashboard ที่เชื่อมกัน
2. เพิ่ม Variables เพื่อรับค่าจากหน้า Overview ไปหน้า Detail
3. ตั้งค่า Dashboard links ให้คง time range และ context ระหว่างหน้า
4. ตั้งค่า Data links ใน Table panel เพื่อ drill-down ตามแถวที่คลิก
5. ทดสอบ flow การใช้งานแบบ Interactive end-to-end

## Prerequisites

- ใช้งาน GitHub Codespaces และ Docker Compose ได้
- เคยสร้าง Prometheus Data source และ panel พื้นฐานใน Grafana แล้ว
- เข้าใจ PromQL เบื้องต้น

## Scenario

ทีม SRE ต้องการ dashboard สำหรับ on-call ที่เริ่มจากภาพรวม CPU usage ของทุก service แล้วคลิกลงไปดูกราฟ CPU rate ของ instance ที่สนใจได้ทันที โดยไม่ต้องพิมพ์ query ใหม่ทุกครั้ง เนื่องจากใช้ `process_cpu_seconds_total` ซึ่งเป็น metric ที่เปลี่ยนแปลงตามเวลาจริง กราฟ detail จึงแสดงค่าที่มีความหมายและสังเกตได้ชัดเจนกว่าการใช้ `up` ซึ่งคืนค่าแค่ `0` หรือ `1`

ใน lab นี้ ผู้เรียนจะสร้าง workflow แบบ drill-down ด้วย dashboard สองหน้า และกำหนดลิงก์เชิงโต้ตอบเพื่อให้การตรวจสอบระบบเร็วขึ้นในสถานการณ์จริง

---

## เปิด environment สำหรับ interactive dashboards lab

1. เปิด Terminal แล้วไปที่โฟลเดอร์ lab นี้

   ```bash
   cd labfiles/07-interactive-dashboards
   ```

1. รัน stack

   ```bash
   docker compose up -d
   ```

1. เปิด Grafana ผ่าน port `3000` ที่ GitHub Codespaces forward ให้

1. login ด้วย `admin` / `grafanaadmin`


## เพิ่ม Prometheus Data source

1. ไปที่ **Connections** > **Add new connection**

1. เลือก Prometheus แล้วตั้ง URL เป็น `http://prometheus:9090`

1. คลิก **Save & test**


## สร้าง Overview dashboard

1. ไปที่ **Dashboards** > **New** > **New dashboard**

1. คลิก **Add new element** เลือก Panel แล้วเลือก **Configure visualization**

1. เลือก Data source เป็น `Prometheus`

1. ใน query editor ใส่ query

   ```promql
   sum by (job, instance) (rate(process_cpu_seconds_total[5m]))
   ```

   > query นี้แสดงค่า CPU rate ล่าสุดของแต่ละ `job` และ `instance` ซึ่งเปลี่ยนแปลงตามเวลาจริง ทำให้ table ที่เหมาะสำหรับการทำ drill down

2.  ด้านล่างของ query editor ให้คลิก **+ Add query** เพื่อเพิ่ม query อีกหนึ่งชุด แล้วใส่ query

   ```promql
   sum by (job) (rate(process_cpu_seconds_total[5m]))
   ```


3. ด้านล่างของ query editor ให้คลิก เปิด **Query options** แล้วตั้งค่า **Format as** เป็น `Table` เพื่อให้ผลลัพธ์แสดงในรูปแบบตารางที่เหมาะกับการทำ Data links
4. เปลี่ยน visualization เป็น **Table**

5. ตั้งชื่อ panel เป็น `CPU Rate Overview`

6. บันทึก dashboard ชื่อ `Ops Overview`



## สร้าง Detail dashboard พร้อม Variables

### สร้าง **job** Variable

1. สร้าง dashboard ใหม่อีกหนึ่งหน้า แล้วตั้งชื่อ `Target Detail`

1. คลิกปุ่ม **Edit** ที่มุมซ้ายบนของ dashboard

1. จาก right-toolbar ให้เปิด **Dashboard options**

1. ไปที่ section **Variables** แล้วคลิก **+ Add variable** เพื่อสร้าง variable ชื่อ `job`

1. ในช่อง **Select variable type** ให้เลือก `Query` และประเภทนี้ใช้ดึงค่าจาก Prometheus แบบ dynamic

2. เลือก Data source เป็น `Prometheus`

3. ใน Query options ให้เลือก Query type เป็น `Label values`

4. ตั้งค่า Label เป็น `job`
5. ตั้งค่า Metric เป็น `up`
6. กด `Preview` เพื่อดูค่าที่จะได้จาก query นี้ ควรเห็นรายการของ service ที่มีอยู่ใน Prometheus เช่น `grafana` และ `prometheus`
7. คลิก **Close** เพื่อบันทึก variable นี้

### สร้าง **instance** Variable

8. กลับไปที่ section **Variables** แล้วคลิก **+ Add variable** อีกครั้งเพื่อสร้าง variable ชื่อ `instance`

9. ในช่อง **Select variable type** ให้เลือก `Query`

10. เลือก Data source เป็น `Prometheus`

11. ใน Query options ให้เลือก Query type เป็น `Label values`

12. ตั้งค่า Label เป็น `instance`
13. ตั้งค่า Metric เป็น `up`
14. ตั้งค่า Label Filter เป็น`job=~"$job"`
15. กด `Preview` เพื่อดูค่าที่จะได้จาก query นี้ ควรเห็นรายการของ instance ที่ขึ้นกับ service ที่เลือก เช่น `grafana:3000` หรือ `prometheus:9090`


17. ถ้าเห็นตัวเลือก **Refresh** ให้เลือก `On dashboard load`; ถ้าไม่เห็นตัวเลือกนี้ ให้ข้ามขั้นตอนนี้ได้
18. คลิก **Close** เพื่อบันทึก variable นี้

### สร้าง Time Series Panel

17. เพิ่ม panel แบบ **Time series** โดยใช้ query

   ```promql
   rate(process_cpu_seconds_total{job=~"$job", instance=~"$instance"}[5m])
   ```

   > เมื่อผู้ใช้คลิก drill-down มาจากหน้า Overview ค่า `$job` และ `$instance` จะถูกส่งมาใน URL อัตโนมัติ กราฟนี้จะแสดง CPU rate ของ instance นั้นในช่วงเวลาที่เลือก

18. ตั้งชื่อ panel เป็น `CPU Rate — Selected Instance`

19. บันทึก dashboard

1. หลังจากบันทึกแล้ว สังเกต URL ใน browser จะมีรูปแบบประมาณนี้

   ```
   http://localhost:3000/d/abc1234/target-detail
   ```

   ส่วนที่อยู่ระหว่าง `/d/` กับ `/target-detail` คือ **UID** ที่ Grafana สร้างให้อัตโนมัติ เช่น `abc1234` — **จดค่านี้ไว้** เพราะต้องใช้ใน Data link ในขั้นตอนถัดไป


## ตั้งค่า Dashboard links จาก Overview ไป Detail

1. กลับไปหน้า `Ops Overview` แล้วเข้า **Dashboard settings**

1. ไปที่ส่วน **Links** แล้วคลิก **Add dashboard link**

1. ตั้งชื่อ link เป็น `Open Target Detail`

1. เลือกปลายทางเป็น dashboard `Target Detail`

1. เปิดตัวเลือกสำหรับ include current time range และ include current template variable values

1. คลิก **Save** หรือกลับมาที่ Dashboard options เพื่อบันทึกการตั้งค่า


## ตั้งค่า Data links ใน Table panel

1. เปิด panel `CPU Rate Overview` แล้วเข้า panel editor

1. ไปที่ **Field** > **Data links** แล้วคลิก **Add link**

1. ตั้งชื่อ link เป็น `Drill down by row`

1. ใส่ URL โดยแทนที่ `<UID>` ด้วย UID ที่จดไว้จาก URL ของ dashboard `Target Detail`

   ```text
   /d/<UID>/target-detail?var-job=${__data.fields.job}&var-instance=${__data.fields.instance}
   ```

   ตัวอย่าง ถ้า UID คือ `abc1234`

   ```text
   /d/abc1234/target-detail?var-job=${__data.fields.job}&var-instance=${__data.fields.instance}
   ```

1. บันทึก panel แล้วคลิกค่าจากแถวข้อมูลใน table เพื่อเปิดหน้า detail

1. ตรวจสอบว่า dashboard `Target Detail` รับค่า `job` และ `instance` จากแถวที่คลิก และกราฟ Time series แสดง CPU rate ของ instance นั้น



## Result

เราควรมี Interactive dashboard flow ที่เริ่มจากภาพรวมและ drill-down ไปสู่รายละเอียดได้ทั้งจาก Dashboard links และ Data links ทำให้การวิเคราะห์ปัญหาเร็วและเป็นขั้นตอนมากขึ้น

## เตรียม environment สำหรับ exercise ถัดไป

1. กลับมาที่โฟลเดอร์ของ lab นี้

   ```bash
   cd labfiles/07-interactive-dashboards
   ```

1. หยุด stack

   ```bash
   docker compose down
   ```

1. ยืนยันว่าไม่มี container ค้างจาก lab นี้ก่อนเริ่ม exercise ถัดไป
