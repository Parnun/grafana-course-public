---
lab:
    title: 'เริ่มต้นสร้าง Grafana Panel plugin ใน GitHub Codespaces'
    description: 'ผู้เรียนจะ scaffold Panel plugin ด้วย create-plugin และปรับแต่ง panel ตัวอย่างใน Grafana'
    topic: 'Grafana Plugins'
    level: 300
    duration: 60
    islab: true
---

# เริ่มต้นสร้าง Grafana Panel plugin ใน GitHub Codespaces

ใน exercise นี้ เราจะเริ่มต้นสร้าง Grafana Panel plugin จาก tooling ทางการของ Grafana โดยใช้ `@grafana/create-plugin` ภายใน GitHub Codespaces จากนั้นจะเปิด Grafana ที่มาพร้อมกับ plugin scaffold และแก้ไข Panel ตัวอย่างเพื่อยืนยันว่า development workflow ทำงานจริง


> **Important**: Exercise นี้ใช้ Node.js LTS และ Docker Compose ตามแนวทางของ Grafana plugin tools หากใน Codespace ของเรายังไม่มี Node.js เวอร์ชันที่เหมาะสม ให้ตรวจสอบไฟล์ `.nvmrc` ในโฟลเดอร์ lab นี้ก่อนเริ่ม

## Learning Objectives

1. Scaffold Grafana Panel plugin ด้วย `@grafana/create-plugin`
2. รัน development workflow ของ plugin ใน GitHub Codespaces
3. ตรวจสอบว่า Grafana ตรวจพบ plugin ใหม่แล้ว
4. ปรับแก้ source code ของ panel ตัวอย่างและดูผลใน Grafana

## Prerequisites

- ใช้งาน Terminal ใน GitHub Codespaces ได้
- เข้าใจ TypeScript หรือ React ในระดับพื้นฐาน
- Docker Compose พร้อมใช้งานใน Codespace

## Scenario

ทีมของเราต้องการ visualization แบบเฉพาะทางที่ไม่มีอยู่ใน Panel มาตรฐานของ Grafana เราจึงเริ่มจากการสร้าง Panel plugin ใหม่ด้วย generator ทางการเพื่อให้ได้โครงสร้างโปรเจกต์, Docker Compose, และ development workflow ที่ถูกต้องตั้งแต่ต้น

---

## เตรียม workspace สำหรับ plugin

1. เปิด Terminal แล้วไปที่โฟลเดอร์ lab นี้

   ```bash
   cd labfiles/09-panel-plugin-basics
   ```

1. สร้างโฟลเดอร์ย่อยสำหรับ plugin work

   ```bash
   mkdir -p workspace
   cd workspace
   ```

1. รัน generator ทางการของ Grafana

   ```bash
   npx @grafana/create-plugin@latest
   ```

1. เมื่อตัว generator ถาม ให้เลือกค่าที่ใกล้เคียงนี้

   - Organization: `student`
   - Plugin name: `codespace-panel`
   - Plugin type: `panel`


## รัน plugin ในโหมดพัฒนา

1. เข้าไปยังโฟลเดอร์ plugin ที่ generator สร้างให้

   ```bash
   cd student-codespace-panel
   ```

1. ติดตั้ง dependencies

   ```bash
   npm install
   ```

1. เปิด watcher สำหรับ frontend build

   ```bash
   npm run dev
   ```

1. เปิด Terminal ใหม่อีกแท็บหนึ่ง แล้วรัน Grafana ที่มากับ scaffold

   ```bash
   docker compose up
   ```

1. เปิด Grafana ผ่าน port `3000` ใน GitHub Codespaces

## ตรวจสอบว่า plugin ถูกโหลดแล้ว

1. ไปที่ **Administration** > **Plugins**

1. ค้นหา plugin ที่ชื่อใกล้เคียงกับ `codespace-panel`

1. หากต้องการยืนยันเพิ่ม ให้ดู log ใน Terminal ที่รัน `docker compose up` และสังเกตข้อความลักษณะ `Plugin registered`


## แก้ไข panel ตัวอย่าง

1. เปิดไฟล์ `src/components/SimplePanel.tsx`

1. เปลี่ยนข้อความหรือสีของ panel ตามโจทย์ที่ผู้สอนกำหนด

1. บันทึกไฟล์ แล้ว refresh หน้า Grafana

1. ไปที่ **Dashboards** > **New** > **New dashboard** แล้วคลิก **Edit** ที่มุมบนขวาเพื่อเข้าสู่ edit mode

1. คลิกปุ่ม **Add new element** (ไอคอน "+" สีน้ำเงิน) ในแถบ toolbar

1. panel ใหม่จะปรากฏบน canvas ให้คลิกที่ panel นั้น แล้วเลือก **Configure visualization**

1. ในหน้า panel editor ให้คลิกแท็บ **Queries** ด้านล่าง จากนั้นคลิก dropdown ของ Data source แล้วเลือก **TestData DB**

1. ในแผง properties ด้านขวา ให้เลือก panel plugin ที่เราสร้างขึ้นจากรายการ visualizations

1. ยืนยันว่าการแก้ไขใน source code สะท้อนใน Grafana ได้จริง


## Result

เราควรมี Grafana Panel plugin ที่ scaffold จาก tool ทางการ, รันได้ใน GitHub Codespaces, และแก้ไข source code แล้วเห็นผลใน Grafana ได้จริง

## เตรียม environment สำหรับ exercise ถัดไป

1. ใน Terminal ที่รัน `npm run dev` ให้กด `Ctrl+C` เพื่อหยุด frontend watcher

1. ใน Terminal ที่รัน `docker compose up` ให้กด `Ctrl+C` เพื่อหยุด foreground process

1. กลับมาที่โฟลเดอร์ plugin ที่ scaffold ขึ้นมา

   ```bash
   cd labfiles/09-panel-plugin-basics/workspace/student-codespace-panel
   ```

1. ล้าง container และ network ของ plugin dev stack

   ```bash
   docker compose down
   ```

1. หากต้องการเริ่มใหม่ในภายหลัง ให้กลับมาเปิด `npm run dev` และ `docker compose up` อีกครั้งตามลำดับเดิม