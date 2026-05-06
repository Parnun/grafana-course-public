---
lab:
    title: 'สร้าง Grafana-managed Alert rule จาก Prometheus metrics'
    description: 'ผู้เรียนจะสร้าง Alert rule จาก metric ตัวอย่างและทดลองทำให้ alert เปลี่ยนสถานะจริง'
    topic: 'Working with Alerting'
    level: 300
    duration: 45
    islab: true
---

# สร้าง Grafana-managed Alert rule จาก Prometheus metrics

ใน exercise นี้ เราจะสร้าง Grafana-managed Alert rule จาก metric ที่เก็บใน Prometheus แล้วทดลองกระตุ้น metric ให้เงื่อนไข alert เป็นจริงผ่าน script ภายใน GitHub Codespaces เพื่อดูการเปลี่ยนสถานะจาก `Normal` ไปเป็น `Pending` หรือ `Firing`


> **Note**: Lab นี้โฟกัสที่การสร้างและตรวจสอบสถานะของ Alert rule ใน Grafana เป็นหลัก ไม่ได้เน้นการส่ง notification ออกภายนอกจริง

## Learning Objectives

1. เปิด stack สำหรับ alerting พร้อม metric source ตัวอย่าง
2. เพิ่ม Prometheus Data source เพื่อใช้กับ Alert rule
3. สร้าง Grafana-managed Alert rule จาก query ที่วัดปริมาณ request
4. กระตุ้น metric และสังเกตการเปลี่ยนสถานะของ alert

## Prerequisites

- เข้าใจ PromQL ขั้นพื้นฐาน
- ใช้งาน Grafana UI ได้ในระดับสร้าง dashboard หรือ data source
- ใช้ Terminal ใน GitHub Codespaces ได้

## Scenario

ทีม backend มี endpoint สำคัญที่ต้องการจับตาว่ามี request spike เกิดขึ้นหรือไม่ ใน lab นี้เราจะใช้ service ตัวอย่างที่ export metric ชื่อ `demo_requests_total` ออกมาให้ Prometheus scrape จากนั้นสร้าง Alert rule ให้ Grafana แจ้งเตือนเมื่อจำนวน request ใน 1 นาทีสูงเกินค่าที่กำหนด

---

## เปิด stack สำหรับ alert lab

1. เปิด Terminal แล้วไปที่โฟลเดอร์ lab นี้

   ```bash
   cd labfiles/08-alerting-basics
   ```

1. รัน stack ทั้งหมด

   ```bash
   docker compose up -d --build
   ```

1. ตรวจสอบว่า service `demo-metrics`, `prometheus`, และ `grafana` อยู่ในสถานะ `Up`

   ```bash
   docker compose ps
   ```

1. เปิด Grafana จาก port `3000` และ login ด้วย `admin` / `grafanaadmin`

## เพิ่ม Prometheus Data source

1. ไปที่ **Connections** > **Add new connection**

1. เพิ่ม Prometheus Data source ด้วย URL `http://prometheus:9090`

1. คลิก **Save & test** และยืนยันว่าเชื่อมต่อสำเร็จ

## สร้าง Alert rule

1. ไปที่ **Alerting** > **Alert rules** > **New alert rule**

2. ตั้งชื่อ rule เป็น `High Demo Traffic`

3. ในส่วน query ให้ใช้ Prometheus Data source และใส่ query นี้

   ```promql
   increase(demo_requests_total[1m])
   ```

4. ตั้งเงื่อนไขให้ alert ทำงานเมื่อค่ามากกว่า `10`

5. ในส่วน **Add folder and labels** กดสร้าง folder ใหม่ชื่อ `Demo Alerts`
6. สร้าง **evaluation group** ใหม่โดยใช้ชื่อว่า **interval** และกำหนดเป็น `10s`

7. ตั้ง pending period เป็น `0s`

   > - **Evaluation interval `10s`**: กำหนดว่า Grafana จะรัน query เพื่อตรวจสอบเงื่อนไข alert ทุกๆ กี่วินาที ค่าปกติในระบบจริงมักใช้ `1m` หรือ `5m` แต่ใน lab นี้ใช้ `10s` เพื่อให้เห็นผลเร็ว 

   > - **Pending period `0s`**: คือช่วงเวลาที่เงื่อนไขต้องเป็นจริงต่อเนื่องก่อนที่ alert จะเปลี่ยนสถานะเป็น `Firing` ค่าปกติเช่น `5m` ใช้เพื่อกรอง false positive ที่เกิดขึ้นแค่ชั่วคราว แต่ใน lab นี้ตั้งเป็น `0s` เพื่อให้ alert เปลี่ยนสถานะทันทีที่เงื่อนไขเป็นจริงครั้งแรก ทำให้ทดสอบได้สะดวก

1. ลงมาที่ **Configure notifications** > เลือก **Create Contact points**

> **Note สำหรับ Grafana OSS**: Email contact point ต้องการการตั้งค่า SMTP ใน `grafana.ini` ก่อน ใน lab นี้เราจะ **สร้างและทดสอบ contact point ผ่าน Test button** แทนการรับ email จริง เพื่อให้เห็น flow ทั้งหมดโดยไม่ต้องพึ่ง SMTP server ภายนอก

1. คลิก **+ New contact point**

2. ตั้งชื่อ contact point เป็น `Demo Email`

3. ในช่อง **Integration** เลือก `Email`

4. ในช่อง **Addresses** ใส่ email address ตัวอย่าง เช่น `training@nextflow.in.th`

   > ใส่ address อะไรก็ได้ในขั้นตอนนี้ เพราะเราจะใช้ปุ่ม **Test** แทนการส่ง email จริง

5. คลิก **Save contact point**
6. กลับมาที่หน้า Alert rule แล้วเลือก contact point `Demo Email` ในส่วน **Configure notifications**
   
7. คลิก **Save rule**

## กระตุ้น metric ให้ alert ทำงาน

1. กลับมาที่ Terminal แล้วรัน script นี้เพื่อยิง request ไปยัง service ตัวอย่าง

   ```bash
   ./generate-traffic.sh
   ```

   หากรันบน Windows Command Prompt ให้ใช้คำสั่งนี้แทน:

   ```bat
   generate-traffic.cmd
   ```

1. เปิดหน้า **Alert rules** ใน Grafana และรอสักครู่ให้มีการ evaluate ตาม interval ที่กำหนด

1. สังเกตว่าสถานะของ `High Demo Traffic` เปลี่ยนจาก `Normal` ไปเป็น `Pending` หรือ `Firing`

1. อธิบายกับผู้เรียนว่า query ใช้ `increase()` เพื่อรวมจำนวน request ที่เกิดขึ้นในช่วงเวลา 1 นาที ทำให้เห็น spike ได้ง่ายกว่าใช้ค่าดิบของ counter


## Result

เราควรมี Grafana-managed Alert rule ที่อ้างอิง Prometheus metric จริง และสามารถเปลี่ยนสถานะตาม traffic ที่เราสร้างขึ้นจากภายใน GitHub Codespaces ได้

## เตรียม environment สำหรับ exercise ถัดไป

1. หาก script กระตุ้น traffic (`./generate-traffic.sh` หรือ `generate-traffic.cmd`) ยังทำงานอยู่ใน Terminal ให้หยุดด้วย `Ctrl+C`

1. กลับมาที่โฟลเดอร์ของ lab นี้

   ```bash
   cd labfiles/08-alerting-basics
   ```

1. หยุด stack ของ Grafana, Prometheus และ service ตัวอย่าง

   ```bash
   docker compose down
   ```

1. การ cleanup นี้ช่วยหยุด alert evaluation และคืน port ที่ใช้ใน exercise นี้ก่อนเริ่ม lab ถัดไป