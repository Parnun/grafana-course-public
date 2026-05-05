# Grafana for Developer Presentation Outline

- Language: Thai
- Style: minimal, clean, white-blue
- Outputs:
  - `grafana-for-developer-presentation-outline.md`
  - `grafana-for-developer-course-presentation.pptx`

## Slide List

### 1. Docker และ Container คืออะไร

- Section: Docker Basics
- Container คือการแพ็กแอปพร้อม dependency ให้รันซ้ำได้เหมือนกัน
- แยก environment ของแต่ละงานออกจากกันโดยไม่ต้องสร้าง VM เต็มรูปแบบ
- เหมาะกับงาน lab เพราะเริ่มต้นเร็วและ reset ได้ง่าย
- Visual: docker-vs-vm
- Speaker note: เปิดด้วยภาพใหญ่ก่อนว่าเราใช้ Container เพื่อให้ผู้เรียนทุกคนเริ่มจาก baseline เดียวกัน ไม่ต้องเสียเวลากับการติดตั้งที่เครื่องแต่ละคนต่างกัน จากนั้นค่อยย้ำว่า Docker เป็นเครื่องมือที่นิยมใช้จัดการ container เหล่านี้.

### 2. Container ทำงานบนคอมพิวเตอร์อย่างไร

- Section: Docker Basics
- Container ใช้ kernel ของ host ร่วมกัน แต่แยก process, network และ filesystem
- หลาย container รันพร้อมกันได้บนเครื่องเดียว
- แต่ละ service จึงถูกแยกบทบาทชัดเจนและดูแลได้ง่ายขึ้น
- Visual: host-engine-containers
- Speaker note: สไลด์นี้ช่วยแก้ความเข้าใจผิดว่า container คือเครื่องเสมือนอีกเครื่องหนึ่ง ให้ชี้ว่าจริง ๆ แล้วมันคือ process ที่ถูก isolate และจัดการทรัพยากรผ่าน engine เดียวกัน.

### 3. ส่วนประกอบสำคัญ: Image, Container, Volume, Network

- Section: Docker Basics
- Image คือแม่แบบสำหรับสร้าง container
- Container คือ instance ที่กำลังรันจริง
- Volume เก็บข้อมูลถาวร และ Network ทำให้ service คุยกันได้
- Visual: image-container-volume-network
- Speaker note: ให้ใช้สไลด์นี้เป็นคำศัพท์กลางของทั้งคอร์ส เพราะหลังจากนี้ผู้เรียนจะเห็นคำเหล่านี้ตลอดใน Docker Compose และ lab ของ Grafana.

### 4. Docker Desktop คืออะไร

- Section: Docker Basics
- Docker Desktop คือเครื่องมือใช้งาน Docker บนเครื่องผู้ใช้แบบ local
- มีทั้ง UI, resource settings และดู container ได้สะดวก
- ในคอร์สนี้เราจะใช้ GitHub Codespaces เป็นหลัก แต่แนวคิดเหมือนกัน
- Visual: docker-desktop-mock
- Speaker note: บอกผู้เรียนว่าถ้ากลับไปทำต่อบนเครื่องตัวเอง Docker Desktop คือหน้าตาที่จะพบเจอบ่อย แต่ในห้องเรียนวันนี้ workflow หลักจะเกิดใน Codespaces เพื่อให้ทุกคนเห็นสภาพแวดล้อมเดียวกัน.

### 5. คำสั่ง Docker พื้นฐานที่ควรรู้

- Section: Docker Basics
- ดู container ที่กำลังรันด้วย `docker ps`
- ดู image ในเครื่องด้วย `docker images`
- ดู log ด้วย `docker logs <name>` และเข้า shell ด้วย `docker exec -it <name> sh`
- Visual: Command quick list
- Speaker note: ไม่ต้องสอนทุกคำสั่งลึกมาก จุดประสงค์ของสไลด์นี้คือให้ผู้เรียนมี survival kit สำหรับดูสถานะและ debug lab เบื้องต้นได้ด้วยตัวเอง.

### 6. Docker Compose สำหรับงานหลาย service

- Section: Docker Basics
- ใช้ไฟล์เดียวกำหนดหลาย service พร้อมกัน
- เริ่ม stack ด้วย `docker compose up -d`
- หยุดและล้าง network ด้วย `docker compose down`
- Visual: compose-stack
- Speaker note: สไลด์นี้เป็นสะพานไปสู่ lab ของ Grafana โดยตรง เพราะแทบทุก exercise ใน repo ใช้ Compose เพื่อยก Grafana, Prometheus และ InfluxDB ขึ้นมาพร้อมกัน.

### 7. Grafana คืออะไร

- Section: Introduction to Grafana
- Grafana ใช้สำรวจข้อมูล สร้าง dashboard และ monitor ระบบ
- รองรับ data source ได้หลายแบบ เช่น Prometheus และ InfluxDB
- เหมาะทั้งกับนักพัฒนา ทีม platform และงาน observability
- Visual: grafana-capabilities
- Speaker note: เริ่มหัวข้อ Grafana ด้วยมุมมองระดับธุรกิจว่า Grafana ไม่ใช่แค่เครื่องมือทำกราฟ แต่เป็นจุดรวมของการ query, visualize และตอบคำถามจากข้อมูล.

### 8. ความสามารถหลักของ Grafana

- Section: Introduction to Grafana
- Explore ใช้ทดลอง query และดูข้อมูลสด
- Dashboard และ Panel ใช้จัดข้อมูลให้อ่านเร็ว
- Alerting ใช้จับเงื่อนไขสำคัญ และ Plugins ใช้ขยายความสามารถ
- Visual: 4 แกนหลักของคอร์ส
- Speaker note: ให้โยง 4 คำนี้กับสิ่งที่ผู้เรียนจะได้ทำจริงในคอร์ส เพื่อสร้าง mental map ตั้งแต่ต้นว่าแต่ละ exercise อยู่ตรงไหนของภาพรวมทั้งหมด.

### 9. Grafana Architecture แบบพื้นฐาน

- Section: Introduction to Grafana
- ผู้ใช้เข้าผ่าน browser ไปยัง Grafana UI
- Grafana ส่ง query ไปยัง data source ที่เลือก
- ผลลัพธ์ถูกใช้ทั้งใน dashboard, explore และ alerting
- Visual: grafana-architecture
- Speaker note: ใช้สไลด์นี้ทำให้ data flow ชัดเจนก่อนเริ่มติดตั้งจริง โดยเน้นว่า Grafana ไม่ได้เก็บ metrics ทั้งหมดไว้เอง แต่ทำหน้าที่เชื่อมและแสดงผลจากระบบข้อมูลต่าง ๆ.

### 10. การเตรียมระบบสำหรับติดตั้ง Grafana

- Section: Installation and Configuration
- คอร์สนี้ใช้ GitHub Codespaces เป็น lab environment กลาง
- ต้องมี Docker, Docker Compose และ port forwarding พร้อมใช้งาน
- ไฟล์สำคัญที่พบได้บ่อยคือ `.env` และ `docker-compose.yml`
- Visual: codespaces-setup
- Speaker note: อธิบายเหตุผลเชิงการสอนว่าการใช้ Codespaces ลดความเสี่ยงเรื่องเครื่องผู้เรียนไม่เหมือนกัน และทำให้ผู้สอน support ได้ง่ายกว่า local setup แบบกระจัดกระจาย.

### 11. การติดตั้งและเปิดใช้งาน Grafana

- Section: Installation and Configuration
- เข้าโฟลเดอร์ lab แล้วรัน `docker compose up -d`
- ตรวจสอบสถานะด้วย `docker compose ps`
- เปิด Grafana ผ่าน forwarded port `3000` และ login ด้วยค่าของ lab
- Visual: Flow สั้น ๆ
- Speaker note: เล่าขั้นตอนแบบสั้น กระชับ และย้ำว่าผู้เรียนจะเห็น pattern เดิมซ้ำ ๆ ในหลาย exercise จึงควรจดจำ flow นี้ให้ได้.

### 12. สลับไปทำ Exercise 01: Setup Grafana

- Section: Installation and Configuration
- เปิดไฟล์ `Exercises/01-setup-grafana-codespaces.md`
- เริ่ม Grafana ใน Codespaces และตรวจสอบ port `3000`
- ยืนยันว่า login ได้และเข้าใจบทบาทของ Docker volume
- Exercise file: `Exercises/01-setup-grafana-codespaces.md`
- Expected outcomes: เปิด Grafana ได้ / เข้าใจ port forwarding / เห็น persistent volume
- Speaker note: หยุดบรรยายที่สไลด์นี้แล้วพาผู้เรียนลงมือทำทันที เป้าหมายคือให้ทุกคนมี Grafana ที่พร้อมใช้งานก่อนเข้าสู่หัวข้อ data source.

### 13. Data Source ใน Grafana คืออะไร

- Section: Working with Data Sources
- Data source คือจุดเชื่อมระหว่าง Grafana กับระบบข้อมูลจริง
- แต่ละ data source ใช้รูปแบบ query และ auth ต่างกัน
- การเลือก data source ที่เหมาะสมทำให้ dashboard ตอบโจทย์ได้ดีขึ้น
- Visual: datasource-hub
- Speaker note: ใช้สไลด์นี้ก่อนลงรายละเอียดแต่ละระบบ เพื่อให้ผู้เรียนเข้าใจว่ากราฟใน Grafana เริ่มจากการเลือกแหล่งข้อมูลที่เหมาะ ไม่ใช่เริ่มจากหน้าตา panel.

### 14. Prometheus Data Source

- Section: Working with Data Sources
- Prometheus เหมาะกับ metrics แบบ time series และใช้ PromQL
- ใน lab ใช้ URL เป็น `http://prometheus:9090`
- เริ่มสำรวจข้อมูลได้ทันทีผ่านหน้า Explore
- Visual: prometheus-flow
- Speaker note: จุดที่ควรย้ำคือเรื่อง service name ใน Docker Compose ว่าภายใน network เดียวกันเราใช้ `prometheus` แทน `localhost` เพื่อให้ผู้เรียนไม่สับสนเวลา config.

### 15. สลับไปทำ Exercise 02: Prometheus Data Source

- Section: Working with Data Sources
- เปิดไฟล์ `Exercises/02-prometheus-data-source.md`
- เพิ่ม Prometheus ผ่าน Grafana UI แล้วกด Save & test
- ทดลอง query `up` และ `prometheus_build_info`
- Exercise file: `Exercises/02-prometheus-data-source.md`
- Expected outcomes: เพิ่ม Prometheus สำเร็จ / ทดสอบการเชื่อมต่อได้ / เห็นผลลัพธ์ PromQL แรก
- Speaker note: นี่คือ data source ตัวแรกที่ผู้เรียนจะเชื่อมเอง ให้ช่วยดูว่าทุกคนใช้ URL ถูกเป็น `http://prometheus:9090` และเห็นผลลัพธ์ใน Explore จริง.

### 16. InfluxDB Data Source แบบ Flux

- Section: Working with Data Sources
- InfluxDB 2.x ใช้ URL, Organization, Bucket และ Token
- ใน lab นี้เลือก query language เป็น Flux
- เหมาะกับการเปรียบเทียบแนวคิด query คนละแบบกับ PromQL
- Visual: influxdb-flow
- Speaker note: อธิบายให้ผู้เรียนเห็นว่าต่อให้ data source ต่างชนิดกัน Grafana ก็ยังใช้ pattern การเชื่อมต่อคล้ายเดิม คือเลือกปลายทาง ใส่ credential และทดสอบการเชื่อมต่อ.

### 17. สลับไปทำ Exercise 03: InfluxDB + Flux

- Section: Working with Data Sources
- เปิดไฟล์ `Exercises/03-influxdb-flux-data-source.md`
- seed ข้อมูลตัวอย่าง แล้วเพิ่ม InfluxDB Data Source
- ทดลอง query measurement `lab_metrics` ผ่าน Explore
- Exercise file: `Exercises/03-influxdb-flux-data-source.md`
- Expected outcomes: seed data สำเร็จ / เชื่อม InfluxDB ได้ / อ่าน Flux query ได้เบื้องต้น
- Speaker note: ให้ผู้เรียนเห็นความต่างของภาษา query แต่ยังอยู่ใน Grafana workflow เดิม ช่วยย้ำว่าเครื่องมือหน้าบ้านคงเดิม แต่แหล่งข้อมูลและภาษาคุยกับมันต่างกัน.

### 18. Queries ใน Grafana

- Section: Queries and Panels
- เริ่มทดลอง query ได้จากหน้า Explore
- เลือก data source ก่อน แล้วค่อยเขียน query ให้ตอบคำถามที่ชัดเจน
- query เดียวกันสามารถนำไปต่อยอดเป็น panel บน dashboard ได้
- Visual: explore-to-panel
- Speaker note: สไลด์นี้ช่วยเปลี่ยนมุมคิดจาก “อยากได้กราฟแบบไหน” ไปเป็น “อยากตอบคำถามอะไรจากข้อมูล” เพราะ query ที่ชัดคือฐานของ dashboard ที่ดี.

### 19. การออกแบบและสร้าง Panel

- Section: Queries and Panels
- Time series เหมาะกับแนวโน้มตามเวลา
- Stat เหมาะกับค่าปัจจุบันที่ต้องอ่านเร็ว
- ชื่อ panel, legend และ layout ส่งผลต่อความเข้าใจไม่แพ้ query
- Visual: panel-types
- Speaker note: ย้ำกับผู้เรียนว่าการเลือก visualization ไม่ใช่แค่เรื่องสวยงาม แต่เป็นการออกแบบคำตอบให้ตรงกับสิ่งที่คนดูต้องตัดสินใจจากข้อมูล.

### 20. สลับไปทำ Exercise 04: Queries and Panels

- Section: Queries and Panels
- เปิดไฟล์ `Exercises/04-queries-and-panels.md`
- นำเข้า dashboard skeleton และสร้าง Time series กับ Stat panel
- ตั้งชื่อ panel และปรับ layout ให้ดูง่าย
- Exercise file: `Exercises/04-queries-and-panels.md`
- Expected outcomes: สร้าง dashboard แรกได้ / เข้าใจ panel ต่างชนิด / อ่านผลจาก PromQL บน dashboard ได้
- Speaker note: ช่วงนี้ควรปล่อยเวลาลงมือทำมากขึ้น เพราะผู้เรียนจะเริ่มเห็นภาพว่า query ที่เขียนไว้เปลี่ยนเป็น dashboard ที่ใช้งานได้จริงอย่างไร.

### 21. ระบบ Alerting ของ Grafana

- Section: Working with Alerting
- Alerting ใช้ตรวจเงื่อนไขจาก query และประเมินซ้ำตามช่วงเวลา
- สถานะหลักคือ Normal, Pending และ Firing
- Grafana-managed Alert rule สร้างได้จาก UI โดยไม่ต้องเขียนระบบเพิ่ม
- Visual: alert-states
- Speaker note: ให้ผู้เรียนเข้าใจก่อนว่า alerting คือขั้นต่อจาก dashboard เมื่อเราไม่ได้อยากรอให้คนมาเปิดดูกราฟเอง แต่ต้องการให้ระบบคอยเฝ้าระวังให้.

### 22. การตั้ง Alert Rule และ Notification

- Section: Working with Alerting
- เริ่มจาก query ที่วัดสิ่งสำคัญจริง
- กำหนด threshold, evaluation interval และ pending period
- ใน lab นี้จะโฟกัสที่การเปลี่ยนสถานะของ rule เป็นหลัก
- Visual: ตัวอย่างแนวคิดของ Rule
- Speaker note: สไลด์นี้ไม่ต้องลงลึกระบบ notification ภายนอกมาก เพราะเป้าหมายของคอร์สคือให้ผู้เรียนเข้าใจแกนหลักของ rule evaluation ก่อน.

### 23. สลับไปทำ Exercise 06: Alerting Basics

- Section: Working with Alerting
- เปิดไฟล์ `Exercises/08-alerting-basics.md`
- สร้าง rule จาก `increase(demo_requests_total[1m])`
- ยิง traffic แล้วดูสถานะเปลี่ยนจาก Normal ไปเป็น Pending หรือ Firing
- Exercise file: `Exercises/08-alerting-basics.md`
- Expected outcomes: สร้าง rule สำเร็จ / trigger alert ได้จริง / เข้าใจ state transition
- Speaker note: ตรงนี้ผู้เรียนจะเห็นว่า query ที่เคยใช้ดูข้อมูล สามารถกลายเป็นเงื่อนไขแจ้งเตือนได้จริง ซึ่งเป็นจุดเชื่อมสำคัญระหว่าง observability กับ operations.

### 24. Dashboard Variables และ Templating

- Section: Advanced Dashboard Features
- Variables ช่วยลดการ hard-code ค่าใน query
- สร้าง dropdown เช่น `job` และ `instance` ได้
- panel หลายตัวใช้ variable เดียวกันเพื่อเปลี่ยนมุมมองพร้อมกัน
- Visual: variables-flow
- Speaker note: ให้ชี้ว่า variables ทำให้ dashboard เดียวดูหลาย service ได้ จึงช่วยลดการทำ dashboard ซ้ำจำนวนมากและดูแลง่ายขึ้น.

### 25. Interactive Dashboards

- Section: Advanced Dashboard Features
- ผู้ใช้สลับค่าผ่าน dropdown แล้ว panel จะ refresh ตามทันที
- ค่า variable ถูก sync ไปกับ URL เพื่อแชร์มุมมองเดิมได้
- เหมาะกับ dashboard ที่ต้องใช้ซ้ำกับหลาย target หรือหลายทีม
- Visual: Interactive flow
- Speaker note: สไลด์นี้ช่วยให้ผู้เรียนเห็นประโยชน์เชิงใช้งานจริง ว่าการทำ dashboard แบบ interactive ทำให้ dashboard ชุดเดียวตอบคำถามได้หลายสถานการณ์.

### 26. สลับไปทำ Exercise 05: Dashboard Variables

- Section: Advanced Dashboard Features
- เปิดไฟล์ `Exercises/05-dashboard-variables.md`
- สร้าง variable `job` และ `instance`
- ใช้ variable ใน PromQL เพื่อให้ dashboard โต้ตอบได้
- Exercise file: `Exercises/05-dashboard-variables.md`
- Expected outcomes: สร้าง variable ได้ / ทำ dashboard interactive ได้ / เข้าใจ templating เบื้องต้น
- Speaker note: แม้หัวข้อนี้อยู่ในส่วน advanced แต่ผู้เรียนมักเห็นผลเร็วและสนุก เพราะเปลี่ยนค่า dropdown แล้ว dashboard ตอบสนองทันที.

### 27. Grafana Plugins คืออะไร

- Section: Grafana Plugins
- Plugin ใช้เพิ่ม Data Source, Panel หรือ App ให้ Grafana
- ช่วยขยายความสามารถให้ตรงกับโจทย์เฉพาะทาง
- เป็นจุดที่นักพัฒนาสามารถต่อยอด Grafana ได้มากที่สุด
- Visual: plugin-types
- Speaker note: ใช้สไลด์นี้เปลี่ยนบทบาทของผู้เรียนจากผู้ใช้ Grafana ไปเป็นคนที่เริ่มขยายความสามารถของ Grafana เองได้.

### 28. การติดตั้ง ใช้งาน และตั้งค่า Plugin

- Section: Grafana Plugins
- เลือก plugin จาก catalog หรือ build ใช้เองในองค์กร
- หลังติดตั้งควรตรวจสอบสิทธิ์ การตั้งค่า และ compatibility
- บาง plugin ใช้เพิ่ม data source และบาง plugin ใช้เพิ่ม panel ใหม่
- Visual: plugin-lifecycle
- Speaker note: อธิบายให้ผู้เรียนเห็นว่าก่อนจะเขียน plugin เอง เราควรรู้ก่อนว่า plugin ถูกใช้และถูกตั้งค่าใน Grafana อย่างไร เพราะเป็นประสบการณ์ที่ผู้ใช้ปลายทางจะเจอจริง.

### 29. การพัฒนา Panel Plugin แบบพื้นฐาน

- Section: Grafana Plugins
- ใช้ `@grafana/create-plugin` scaffold โปรเจกต์เริ่มต้น
- พัฒนาด้วย TypeScript/React ตามแนวทางของ Grafana
- รัน watcher และ Grafana dev stack เพื่อทดสอบได้ทันที
- Visual: plugin-workflow
- Speaker note: สไลด์นี้ควรสร้างความมั่นใจให้ผู้เรียนว่า plugin development มี workflow ที่ชัดเจนและเริ่มต้นได้เร็ว ไม่จำเป็นต้องเริ่มจากศูนย์.

### 30. สลับไปทำ Exercise 07: Panel Plugin Basics

- Section: Grafana Plugins
- เปิดไฟล์ `Exercises/09-panel-plugin-basics.md`
- scaffold panel plugin ใหม่ แล้วรัน workflow สำหรับพัฒนา
- แก้ไข `SimplePanel.tsx` และ refresh ดูผลใน Grafana
- Exercise file: `Exercises/09-panel-plugin-basics.md`
- Expected outcomes: scaffold plugin สำเร็จ / Grafana โหลด plugin ได้ / เห็นผลจากการแก้โค้ดจริง
- Speaker note: นี่คือช่วงที่ทำให้ผู้เรียนเห็นความเป็น developer ของคอร์สนี้ชัดที่สุด ควรช่วยให้ทุกคนไปถึงจุดที่ plugin แสดงผลใน Grafana ได้อย่างน้อยหนึ่งครั้ง.

### 31. สรุปภาพรวมของคอร์ส

- Section: Conclusion
- เปิด Grafana ได้ใน Codespaces ด้วย Docker Compose
- เชื่อมต่อ Prometheus และ InfluxDB ได้จริง
- สร้าง dashboard, variables, alert และเริ่มพัฒนา plugin ได้
- Visual: course-roadmap
- Speaker note: ใช้สไลด์นี้ทบทวนภาพรวมทั้งหมดอย่างกระชับ เพื่อให้ผู้เรียนเชื่อมโยงว่าทุกหัวข้อที่ผ่านมาเป็นเส้นทางเดียวกันจากการเปิดระบบไปจนถึงการต่อยอดเอง.

### 32. Q&A และ Next Steps

- Section: Conclusion
- ทบทวนคำถามหรือจุดติดขัดจากแต่ละ exercise
- ลองทำ exercise ซ้ำตามลำดับเพื่อเสริมความเข้าใจ
- ต่อยอด dashboard และ plugin จากโจทย์ของทีมตัวเอง
- Visual: หลังจบคอร์ส
- Speaker note: ปิดท้ายแบบเปิดพื้นที่ให้ถามต่อ และชวนให้ผู้เรียนกลับไปลองปรับใช้กับงานจริง เช่น เปลี่ยน data source, เพิ่ม panel หรือทดลองแก้ plugin ต่อเอง.

