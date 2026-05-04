# การเตรียมตัวก่อนเริ่มทำ Grafana Labs

เอกสารนี้สรุปสิ่งที่ผู้เรียนควรเตรียมก่อนเริ่มใช้งานไฟล์ในโฟลเดอร์ `labfiles/` และเอกสารในโฟลเดอร์ `Exercises/` เพื่อให้สามารถทำ lab ได้ต่อเนื่องภายใน GitHub Codespaces โดยลดปัญหาด้าน environment ให้มากที่สุด

## เป้าหมายของ environment นี้

lab ชุดนี้ออกแบบมาให้ทำงานใน **GitHub Codespaces** เป็นหลัก โดยใช้ `Docker Compose`, browser preview, forwarded ports, และไฟล์ตัวอย่างที่อยู่ใน repository เดียวกัน

ผู้เรียนไม่จำเป็นต้องติดตั้ง Grafana, Prometheus, หรือ InfluxDB ลงบนเครื่องส่วนตัวก่อนเริ่ม lab เหล่านี้ แต่ต้องพร้อมใช้งาน GitHub Codespaces และสามารถใช้ Terminal ภายใน Codespace ได้

## สิ่งที่ผู้เรียนต้องเตรียม

### 1. บัญชีและการเข้าถึง

- มีบัญชี GitHub ที่สามารถเปิด GitHub Codespaces ได้ หากยังไม่มีบัญชี สามารถสมัครได้ที่ https://github.com/signup
- สามารถเข้าถึง course repository นี้ได้
- สามารถเปิด Codespace ใหม่หรือใช้งาน Codespace ที่ผู้สอนเตรียมไว้ให้

### 2. อุปกรณ์และ browser

- ใช้งาน laptop หรือ desktop ที่มี browser รุ่นปัจจุบัน เช่น Chrome, Edge, หรือ Firefox
- มีอินเทอร์เน็ตที่เสถียรพอสำหรับ pull image ของ `Docker` และเปิด browser preview ของ Codespaces
- เปิดหลายแท็บได้สะดวก เพราะระหว่างทำ lab จะสลับระหว่าง VS Code, Terminal, Grafana UI, และบางครั้งหน้า port preview

### 3. ทักษะพื้นฐานที่ควรมี

- ใช้คำสั่งพื้นฐานใน shell ได้ เช่น `cd`, `cp`, `ls`, `cat`
- เข้าใจการทำงานเบื้องต้นของ `Docker` และ `Docker Compose`
- รู้วิธีเปิด Terminal ใน VS Code
- พร้อมแก้ไขไฟล์ `.env`, `docker-compose.yml`, และไฟล์ config ขนาดเล็ก


## สิ่งที่ควรตรวจสอบก่อนเริ่มคลาส

1. เปิด GitHub Codespaces ได้สำเร็จ
2. เปิด VS Code Terminal ภายใน Codespace ได้
3. รันคำสั่งต่อไปนี้ได้โดยไม่ error

```bash
docker --version
docker compose version
```

4. มองเห็นโฟลเดอร์ `labfiles/` และ `Exercises/` ใน repository
5. พร้อมเปิด forwarded ports จากแท็บ **Ports** ใน VS Code ได้

## โครงสร้างของไฟล์ในคอร์สนี้

- โฟลเดอร์ `Exercises/` เก็บเอกสารขั้นตอนของแต่ละ exercise
- โฟลเดอร์ `labfiles/` เก็บไฟล์ประกอบของแต่ละ lab เช่น `docker-compose.yml`, `prometheus.yml`, `.env.example`, script และ starter assets

รูปแบบการใช้งานโดยทั่วไปคือ:

1. เปิดเอกสารจาก `Exercises/`
2. เข้าไปยังโฟลเดอร์ที่เกี่ยวข้องใน `labfiles/`
3. รันคำสั่งตามขั้นตอนใน exercise
4. เปิด Grafana หรือ service ที่เกี่ยวข้องผ่าน port ที่ Codespaces forward ให้

## พฤติกรรมที่ผู้เรียนจะเจอบ่อยใน GitHub Codespaces

### Forwarded ports

หลาย lab จะเปิด service ผ่าน port เช่น:

- `3000` สำหรับ `Grafana`
- `9090` สำหรับ `Prometheus`
- `8086` สำหรับ `InfluxDB`
- `8000` สำหรับ demo service ในบาง lab

เมื่อ Codespaces ตรวจพบ port ใหม่ อาจมี notification ให้เปิดผ่าน browser preview หรือ browser tab ได้ทันที ถ้าไม่เห็น notification ให้ไปที่แท็บ **Ports** แล้วเปิด port เอง

### Container ที่ค้างจาก lab ก่อนหน้า

ถ้าเริ่ม lab ใหม่แล้วเจอปัญหา port ชน หรือ service ทำงานไม่ตรงที่คาดไว้ ให้กลับไปยังโฟลเดอร์ lab เดิมแล้วรัน:

```bash
docker compose down
```

จากนั้นค่อยเริ่ม lab ถัดไป

### การใช้ไฟล์ `.env.example`

หลาย lab จะมีไฟล์ `.env.example` ให้คัดลอกเป็น `.env` ก่อนเริ่มใช้งาน:

```bash
cp .env.example .env
```

ผู้เรียนควรตรวจสอบค่าต่าง ๆ ใน `.env` ก่อนรัน `docker compose up -d` ทุกครั้ง

## ขอบเขตของ lab ชุดนี้

- ใช้ GitHub Codespaces เป็น environment หลัก
- เน้น `Docker Compose` และ browser-based workflow
- เน้น Grafana OSS workflow ที่ทำได้จริงใน environment ขนาดเล็ก
- **ยังไม่รวม Kubernetes-related exercises** ในชุดปัจจุบัน

## คำแนะนำเพื่อให้ทำ lab ได้ราบรื่น

- อ่านหัวข้อ `Prerequisites` ของแต่ละ exercise ก่อนเริ่มเสมอ
- อย่ารันหลาย lab พร้อมกันหากใช้ port ชุดเดียวกัน
- หาก browser preview เปิดไม่ขึ้น ให้ตรวจสอบว่า Container อยู่ในสถานะ `Up`
- หาก login เข้า Grafana ไม่ได้ ให้กลับไปดูค่าใน `.env` หรือคำอธิบายของ exercise นั้นอีกครั้ง
- หาก script รันไม่ได้ ให้ตรวจสอบว่าอยู่ในโฟลเดอร์ถูกต้องตาม exercise

## ลำดับการเริ่มต้นที่แนะนำ

ผู้เรียนควรเริ่มตามลำดับนี้:

1. `Exercises/01-setup-grafana-codespaces.md`
2. `Exercises/02-prometheus-data-source.md`
3. `Exercises/03-influxdb-flux-data-source.md`
4. `Exercises/04-queries-and-panels.md`
5. `Exercises/05-dashboard-variables.md`
6. `Exercises/06-alerting-basics.md`
7. `Exercises/07-panel-plugin-basics.md`

หากผู้เรียนเตรียมรายการข้างต้นครบ จะสามารถเริ่มทำ lab ได้ทันทีโดยไม่ต้องเสียเวลาตั้งค่า environment เพิ่มระหว่างคลาส