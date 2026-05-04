# Grafana Labfiles

ชุดไฟล์ในโฟลเดอร์นี้ออกแบบสำหรับใช้งานใน GitHub Codespaces เป็นหลัก โดยหลีกเลี่ยงขั้นตอนที่ต้องพึ่ง Kubernetes หรือการตั้งค่าเครื่อง local เพิ่มเติม

ลำดับที่แนะนำสำหรับการสอน:

1. `../Exercises/01-setup-grafana-codespaces.md`
2. `../Exercises/02-prometheus-data-source.md`
3. `../Exercises/03-influxdb-flux-data-source.md`
4. `../Exercises/04-queries-and-panels.md`
5. `../Exercises/05-dashboard-variables.md`
6. `../Exercises/06-alerting-basics.md`
7. `../Exercises/07-panel-plugin-basics.md`

ข้อกำหนดร่วม:

- เปิดใช้งาน exercise แต่ละข้อจากโฟลเดอร์ของตัวเอง
- หาก GitHub Codespaces ถามเรื่อง port visibility ให้เลือกเปิดเป็น preview หรือ browser tab ได้ตามสะดวก
- หากมี Container ค้างจาก exercise ก่อนหน้า ให้รัน `docker compose down` ในโฟลเดอร์นั้นก่อนเริ่ม exercise ถัดไป