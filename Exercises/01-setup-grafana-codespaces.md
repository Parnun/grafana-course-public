---
lab:
    title: 'เริ่มต้นใช้งาน Grafana บน GitHub Codespaces ด้วย Docker Compose'
    description: 'ผู้เรียนจะเปิด Grafana ใน GitHub Codespaces และตรวจสอบการเข้าถึงผ่าน browser preview'
    topic: 'Installation and Configuration'
    level: 100
    duration: 30
    islab: true
---

# เริ่มต้นใช้งาน Grafana บน GitHub Codespaces ด้วย Docker Compose

ใน exercise นี้ เราจะเตรียมสภาพแวดล้อม Grafana สำหรับ lab ทั้งชุดโดยใช้ Docker Compose ภายใน GitHub Codespaces และตรวจสอบว่า browser preview, port forwarding และ persistent storage ทำงานครบตามที่คาดไว้



## Learning Objectives

1. เปิดใช้งาน Grafana ด้วย Docker Compose ภายใน GitHub Codespaces
2. ตรวจสอบสถานะ Container และ forwarded port ที่จำเป็น
3. เข้าสู่ระบบ Grafana ด้วยค่าที่กำหนดจาก environment variables
4. อธิบายโครงสร้างพื้นฐานเบื้องต้นของ Grafana ใน lab environment นี้

## Prerequisites

- มี GitHub Codespace ของ course repository นี้อยู่แล้ว
- สามารถใช้ VS Code Terminal ภายใน Codespace ได้
- มี Docker และ Docker Compose พร้อมใช้งานใน Codespace
- เข้าใจคำสั่งพื้นฐาน `cd`, `cp`, `docker compose`

## Scenario

ทีมพัฒนาของเราต้องการ environment กลางสำหรับทดลองสร้าง Dashboard, เชื่อมต่อ Data source, และสร้าง Alert rule โดยไม่ต้องติดตั้ง Grafana ลงบนเครื่องส่วนตัวของผู้เรียนแต่ละคน เราจึงเลือกใช้ GitHub Codespaces เพื่อให้ทุกคนเริ่มจาก baseline เดียวกัน

เป้าหมายของ exercise นี้คือเปิด Grafana ให้พร้อมใช้งาน, ยืนยันว่า port `3000` เปิดถูกต้อง, และตรวจสอบว่าข้อมูลของ Grafana ถูกเก็บใน Docker volume เพื่อรองรับ exercise ถัดไป

---

## เตรียมไฟล์ environment

1. เปิด VS Code Terminal ใน GitHub Codespaces แล้วไปที่โฟลเดอร์ lab นี้

   ```bash
   cd labfiles/01-setup-grafana-codespaces
   ```

1. คัดลอกไฟล์ `.env.example` ไปเป็น `.env`

   ```bash
   cp .env.example .env
   ```

1. เปิดไฟล์ `docker-compose.yml` และสังเกตว่า Grafana ถูก publish ออกมาที่ port `3000`

1. ตรวจสอบค่าผู้ใช้และรหัสผ่านในไฟล์ `.env`


## เริ่มต้น Grafana

1. รัน Docker Compose แบบ background

   ```bash
   docker compose up -d
   ```

1. ตรวจสอบว่า Container ของ Grafana อยู่ในสถานะ `Up`

   ```bash
   docker compose ps
   ```

1. ถ้า GitHub Codespaces แจ้งเตือนเรื่อง forwarded port `3000` ให้เปิดผ่าน browser preview หรือ browser tab

1. หากไม่มี notification ให้เปิดแท็บ **Ports** ใน VS Code และตรวจสอบว่า port `3000` ถูก forward แล้ว



## เข้าสู่ระบบ Grafana

1. เปิด Grafana จาก forwarded port `3000`

1. ลงชื่อเข้าใช้ด้วยค่าต่อไปนี้

   - Username: `admin`
   - Password: `grafanaadmin`

1. หลังจากเข้าสู่ระบบสำเร็จ ให้สังเกตเมนูหลักทางซ้าย เช่น **Dashboards**, **Connections**, และ **Alerts & IRM**

2. lab นี้ Grafana รันอยู่ใน `Container`, ถูกเข้าถึงผ่าน forwarded port ของ GitHub Codespaces และเก็บข้อมูลไว้ใน Docker volume แยกต่างหาก


## ตรวจสอบ persistent storage

1. กลับมาที่ Terminal และดูรายการ Docker volumes

   ```bash
   docker volume ls | grep grafana
   ```

1. volume นี้ช่วยเก็บข้อมูลจำพวก configuration, user, dashboard, และ metadata ของ Grafana

1. หากจะทำ exercise ถัดไปทันที เราอาจปล่อย stack นี้ไว้ชั่วคราวได้ แต่ถ้าต้องการ reset environment ให้ทำตามขั้นตอนในหัวข้อท้าย exercise นี้

## ผลลัพธ์

เราควรมี Grafana ที่เปิดใช้งานได้ใน GitHub Codespaces, login ได้ผ่าน port `3000`, และมี Docker volume สำหรับเก็บข้อมูลเรียบร้อยแล้ว

## เตรียม environment สำหรับ exercise ถัดไป

1. กลับมาที่โฟลเดอร์ของ lab นี้

   ```bash
   cd labfiles/01-setup-grafana-codespaces
   ```

1. หยุด container ของ Grafana

   ```bash
   docker compose down
   ```

2. คำสั่งนี้จะหยุด container และ network ของ lab นี้ แต่จะยังเก็บ Docker volume ไว้ ทำให้เริ่มใหม่ได้ภายหลังโดยไม่ต้องเตรียมข้อมูลใหม่ทั้งหมด