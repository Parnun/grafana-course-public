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

## สำหรับผู้เรียนที่ต้องการรันบนเครื่อง Windows

แม้ว่า lab นี้ออกแบบมาสำหรับ GitHub Codespaces แต่สามารถรันบน Windows ได้เช่นกัน โดยในหัวข้อนี้จะอ้างอิงการใช้งานผ่าน `Command Prompt (cmd)` เป็นหลัก

### 1. เครื่องมือที่แนะนำบน Windows

- ติดตั้ง `Docker Desktop` และเปิดใช้งาน `WSL 2 backend`
	ดาวน์โหลด: https://www.docker.com/products/docker-desktop/
	คู่มือติดตั้งบน Windows: https://docs.docker.com/desktop/setup/install/windows-install/
- ติดตั้ง `Git for Windows`
	ดาวน์โหลด: https://git-scm.com/download/win
- ติดตั้ง `VS Code` พร้อมส่วนเสริม Docker (ถ้าต้องการดู container ง่ายขึ้น)
	ดาวน์โหลด VS Code: https://code.visualstudio.com/download
	ส่วนเสริม Docker: https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker
- ใช้ `Command Prompt` เป็น terminal หลักสำหรับทำ lab

> แนะนำให้ติดตั้งเครื่องมือทั้งหมดให้เสร็จก่อนเริ่ม exercise แรก เพื่อหลีกเลี่ยงการหยุดกลางคันระหว่าง lab

### 2. ขั้นตอนเตรียม environment แบบ local

1. Clone repository ลงเครื่อง Windows

1. เปิดโฟลเดอร์โปรเจกต์ใน VS Code

1. ตรวจสอบว่า Docker ทำงานปกติ

	 ```bash
	 docker version
	 docker compose version
	 ```

1. ทำตามเอกสารในโฟลเดอร์ `Exercises/` ได้ตามลำดับเดิม โดยรันคำสั่งจากโฟลเดอร์ `labfiles/<exercise-name>` ของแต่ละ lab

### 3. ความแตกต่างจาก GitHub Codespaces ที่ควรรู้

- เรื่องการเปิดเว็บ Grafana/Prometheus/InfluxDB:
	ใน Windows local ไม่ต้องใช้ forwarded ports ของ Codespaces ให้เปิดผ่าน `http://localhost:<port>` เช่น `http://localhost:3000`
- เรื่องคำสั่ง copy ไฟล์ `.env`:
	เมื่อใช้ Command Prompt ให้เปลี่ยนจาก `cp .env.example .env` เป็น `copy .env.example .env`
- เรื่อง script `.sh`:
	สำหรับ lab นี้มีไฟล์ `.cmd` ให้ใช้โดยตรงใน Command Prompt เช่น `scripts\seed-influx.cmd` และ `generate-traffic.cmd`
- เรื่องคำสั่งพื้นฐานอื่น ๆ:
	ใน Command Prompt ให้ใช้ `dir` แทน `ls` และใช้ `type <filename>` แทน `cat <filename>`

### 4. ปัญหาที่พบบ่อยบน Windows

- Port ชน (`3000`, `8086`, `9090`):
	ให้หยุด service เดิมหรือรัน `docker compose down` ของ lab ก่อนหน้า
- Docker Desktop ยังไม่พร้อม:
	รอให้สถานะ Docker เป็น Running ก่อนเริ่ม lab
- Line ending ทำให้ script มีปัญหา:
	แนะนำให้ตั้งค่าไฟล์ shell script เป็น `LF` ใน VS Code

### 5. ก่อนเริ่ม exercise ถัดไป

ทุกครั้งหลังจบแต่ละ exercise ให้รัน:

```bash
docker compose down
```

เพื่อคืน port และลดผลกระทบข้าม lab


