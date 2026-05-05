const fs = require('fs');
const path = require('path');
const PptxGenJS = require('pptxgenjs');

const ROOT = path.resolve(__dirname, '..');
const ASSET_DIR = path.join(__dirname, 'assets');
const OUTLINE_PATH = path.join(ROOT, 'grafana-for-developer-presentation-outline.md');
const PPTX_PATH = path.join(ROOT, 'grafana-for-developer-course-presentation.pptx');

const COLORS = {
  navy: '153B6D',
  blue: '2F6FEB',
  blueSoft: 'EAF2FF',
  blueMid: 'C9DCFF',
  text: '17324D',
  muted: '5E748C',
  border: 'D8E6FF',
  white: 'FFFFFF',
  card: 'F7FAFF',
  success: '0E9384',
};
const SHAPE = new PptxGenJS().ShapeType;

const slides = [
  {
    section: 'Docker Basics',
    title: 'Docker และ Container คืออะไร',
    bullets: [
      'Container คือการแพ็กแอปพร้อม dependency ให้รันซ้ำได้เหมือนกัน',
      'แยก environment ของแต่ละงานออกจากกันโดยไม่ต้องสร้าง VM เต็มรูปแบบ',
      'เหมาะกับงาน lab เพราะเริ่มต้นเร็วและ reset ได้ง่าย',
    ],
    note:
      'เปิดด้วยภาพใหญ่ก่อนว่าเราใช้ Container เพื่อให้ผู้เรียนทุกคนเริ่มจาก baseline เดียวกัน ไม่ต้องเสียเวลากับการติดตั้งที่เครื่องแต่ละคนต่างกัน จากนั้นค่อยย้ำว่า Docker เป็นเครื่องมือที่นิยมใช้จัดการ container เหล่านี้.',
    visual: { type: 'image', asset: 'docker-vs-vm', caption: 'เปรียบเทียบ VM กับ Container' },
  },
  {
    section: 'Docker Basics',
    title: 'Container ทำงานบนคอมพิวเตอร์อย่างไร',
    bullets: [
      'Container ใช้ kernel ของ host ร่วมกัน แต่แยก process, network และ filesystem',
      'หลาย container รันพร้อมกันได้บนเครื่องเดียว',
      'แต่ละ service จึงถูกแยกบทบาทชัดเจนและดูแลได้ง่ายขึ้น',
    ],
    note:
      'สไลด์นี้ช่วยแก้ความเข้าใจผิดว่า container คือเครื่องเสมือนอีกเครื่องหนึ่ง ให้ชี้ว่าจริง ๆ แล้วมันคือ process ที่ถูก isolate และจัดการทรัพยากรผ่าน engine เดียวกัน.',
    visual: { type: 'image', asset: 'host-engine-containers', caption: 'Host → Docker Engine → หลาย Containers' },
  },
  {
    section: 'Docker Basics',
    title: 'ส่วนประกอบสำคัญ: Image, Container, Volume, Network',
    bullets: [
      'Image คือแม่แบบสำหรับสร้าง container',
      'Container คือ instance ที่กำลังรันจริง',
      'Volume เก็บข้อมูลถาวร และ Network ทำให้ service คุยกันได้',
    ],
    note:
      'ให้ใช้สไลด์นี้เป็นคำศัพท์กลางของทั้งคอร์ส เพราะหลังจากนี้ผู้เรียนจะเห็นคำเหล่านี้ตลอดใน Docker Compose และ lab ของ Grafana.',
    visual: { type: 'image', asset: 'image-container-volume-network', caption: 'องค์ประกอบหลักของระบบแบบ container' },
  },
  {
    section: 'Docker Basics',
    title: 'Docker Desktop คืออะไร',
    bullets: [
      'Docker Desktop คือเครื่องมือใช้งาน Docker บนเครื่องผู้ใช้แบบ local',
      'มีทั้ง UI, resource settings และดู container ได้สะดวก',
      'ในคอร์สนี้เราจะใช้ GitHub Codespaces เป็นหลัก แต่แนวคิดเหมือนกัน',
    ],
    note:
      'บอกผู้เรียนว่าถ้ากลับไปทำต่อบนเครื่องตัวเอง Docker Desktop คือหน้าตาที่จะพบเจอบ่อย แต่ในห้องเรียนวันนี้ workflow หลักจะเกิดใน Codespaces เพื่อให้ทุกคนเห็นสภาพแวดล้อมเดียวกัน.',
    visual: { type: 'image', asset: 'docker-desktop-mock', caption: 'ตัวอย่างหน้าตาเครื่องมือสำหรับดู containers' },
  },
  {
    section: 'Docker Basics',
    title: 'คำสั่ง Docker พื้นฐานที่ควรรู้',
    bullets: [
      'ดู container ที่กำลังรันด้วย `docker ps`',
      'ดู image ในเครื่องด้วย `docker images`',
      'ดู log ด้วย `docker logs <name>` และเข้า shell ด้วย `docker exec -it <name> sh`',
    ],
    note:
      'ไม่ต้องสอนทุกคำสั่งลึกมาก จุดประสงค์ของสไลด์นี้คือให้ผู้เรียนมี survival kit สำหรับดูสถานะและ debug lab เบื้องต้นได้ด้วยตัวเอง.',
    visual: {
      type: 'commands',
      title: 'Command quick list',
      items: [
        ['docker ps', 'ดู container ที่กำลังรัน'],
        ['docker images', 'ดู image ที่มีในเครื่อง'],
        ['docker logs grafana', 'ดู log ของ service'],
        ['docker exec -it grafana sh', 'เข้า shell ใน container'],
      ],
    },
  },
  {
    section: 'Docker Basics',
    title: 'Docker Compose สำหรับงานหลาย service',
    bullets: [
      'ใช้ไฟล์เดียวกำหนดหลาย service พร้อมกัน',
      'เริ่ม stack ด้วย `docker compose up -d`',
      'หยุดและล้าง network ด้วย `docker compose down`',
    ],
    note:
      'สไลด์นี้เป็นสะพานไปสู่ lab ของ Grafana โดยตรง เพราะแทบทุก exercise ใน repo ใช้ Compose เพื่อยก Grafana, Prometheus และ InfluxDB ขึ้นมาพร้อมกัน.',
    visual: { type: 'image', asset: 'compose-stack', caption: 'Compose เหมาะกับระบบที่มีหลาย service' },
  },
  {
    section: 'Introduction to Grafana',
    title: 'Grafana คืออะไร',
    bullets: [
      'Grafana ใช้สำรวจข้อมูล สร้าง dashboard และ monitor ระบบ',
      'รองรับ data source ได้หลายแบบ เช่น Prometheus และ InfluxDB',
      'เหมาะทั้งกับนักพัฒนา ทีม platform และงาน observability',
    ],
    note:
      'เริ่มหัวข้อ Grafana ด้วยมุมมองระดับธุรกิจว่า Grafana ไม่ใช่แค่เครื่องมือทำกราฟ แต่เป็นจุดรวมของการ query, visualize และตอบคำถามจากข้อมูล.',
    visual: { type: 'image', asset: 'grafana-capabilities', caption: 'Data หลายแหล่งไหลเข้าสู่ Grafana' },
  },
  {
    section: 'Introduction to Grafana',
    title: 'ความสามารถหลักของ Grafana',
    bullets: [
      'Explore ใช้ทดลอง query และดูข้อมูลสด',
      'Dashboard และ Panel ใช้จัดข้อมูลให้อ่านเร็ว',
      'Alerting ใช้จับเงื่อนไขสำคัญ และ Plugins ใช้ขยายความสามารถ',
    ],
    note:
      'ให้โยง 4 คำนี้กับสิ่งที่ผู้เรียนจะได้ทำจริงในคอร์ส เพื่อสร้าง mental map ตั้งแต่ต้นว่าแต่ละ exercise อยู่ตรงไหนของภาพรวมทั้งหมด.',
    visual: {
      type: 'steps',
      title: '4 แกนหลักของคอร์ส',
      items: ['Explore', 'Dashboard', 'Alerting', 'Plugins'],
    },
  },
  {
    section: 'Introduction to Grafana',
    title: 'Grafana Architecture แบบพื้นฐาน',
    bullets: [
      'ผู้ใช้เข้าผ่าน browser ไปยัง Grafana UI',
      'Grafana ส่ง query ไปยัง data source ที่เลือก',
      'ผลลัพธ์ถูกใช้ทั้งใน dashboard, explore และ alerting',
    ],
    note:
      'ใช้สไลด์นี้ทำให้ data flow ชัดเจนก่อนเริ่มติดตั้งจริง โดยเน้นว่า Grafana ไม่ได้เก็บ metrics ทั้งหมดไว้เอง แต่ทำหน้าที่เชื่อมและแสดงผลจากระบบข้อมูลต่าง ๆ.',
    visual: { type: 'image', asset: 'grafana-architecture', caption: 'Browser → Grafana → Data Sources → Insight' },
  },
  {
    section: 'Installation and Configuration',
    title: 'การเตรียมระบบสำหรับติดตั้ง Grafana',
    bullets: [
      'คอร์สนี้ใช้ GitHub Codespaces เป็น lab environment กลาง',
      'ต้องมี Docker, Docker Compose และ port forwarding พร้อมใช้งาน',
      'ไฟล์สำคัญที่พบได้บ่อยคือ `.env` และ `docker-compose.yml`',
    ],
    note:
      'อธิบายเหตุผลเชิงการสอนว่าการใช้ Codespaces ลดความเสี่ยงเรื่องเครื่องผู้เรียนไม่เหมือนกัน และทำให้ผู้สอน support ได้ง่ายกว่า local setup แบบกระจัดกระจาย.',
    visual: { type: 'image', asset: 'codespaces-setup', caption: 'Codespaces + Docker + Port 3000' },
  },
  {
    section: 'Installation and Configuration',
    title: 'การติดตั้งและเปิดใช้งาน Grafana',
    bullets: [
      'เข้าโฟลเดอร์ lab แล้วรัน `docker compose up -d`',
      'ตรวจสอบสถานะด้วย `docker compose ps`',
      'เปิด Grafana ผ่าน forwarded port `3000` และ login ด้วยค่าของ lab',
    ],
    note:
      'เล่าขั้นตอนแบบสั้น กระชับ และย้ำว่าผู้เรียนจะเห็น pattern เดิมซ้ำ ๆ ในหลาย exercise จึงควรจดจำ flow นี้ให้ได้.',
    visual: {
      type: 'commands',
      title: 'Flow สั้น ๆ',
      items: [
        ['cd labfiles/01-setup-grafana-codespaces', 'เข้าโฟลเดอร์ lab'],
        ['docker compose up -d', 'เริ่ม Grafana'],
        ['docker compose ps', 'ตรวจสอบสถานะ'],
        ['เปิด port 3000', 'เข้าใช้งานจาก browser'],
      ],
    },
  },
  {
    section: 'Installation and Configuration',
    title: 'สลับไปทำ Exercise 01: Setup Grafana',
    bullets: [
      'เปิดไฟล์ `Exercises/01-setup-grafana-codespaces.md`',
      'เริ่ม Grafana ใน Codespaces และตรวจสอบ port `3000`',
      'ยืนยันว่า login ได้และเข้าใจบทบาทของ Docker volume',
    ],
    note:
      'หยุดบรรยายที่สไลด์นี้แล้วพาผู้เรียนลงมือทำทันที เป้าหมายคือให้ทุกคนมี Grafana ที่พร้อมใช้งานก่อนเข้าสู่หัวข้อ data source.',
    kind: 'exercise',
    exerciseFile: 'Exercises/01-setup-grafana-codespaces.md',
    outcomes: ['เปิด Grafana ได้', 'เข้าใจ port forwarding', 'เห็น persistent volume'],
  },
  {
    section: 'Working with Data Sources',
    title: 'Data Source ใน Grafana คืออะไร',
    bullets: [
      'Data source คือจุดเชื่อมระหว่าง Grafana กับระบบข้อมูลจริง',
      'แต่ละ data source ใช้รูปแบบ query และ auth ต่างกัน',
      'การเลือก data source ที่เหมาะสมทำให้ dashboard ตอบโจทย์ได้ดีขึ้น',
    ],
    note:
      'ใช้สไลด์นี้ก่อนลงรายละเอียดแต่ละระบบ เพื่อให้ผู้เรียนเข้าใจว่ากราฟใน Grafana เริ่มจากการเลือกแหล่งข้อมูลที่เหมาะ ไม่ใช่เริ่มจากหน้าตา panel.',
    visual: { type: 'image', asset: 'datasource-hub', caption: 'Grafana เชื่อมหลาย Data Sources ได้ในจุดเดียว' },
  },
  {
    section: 'Working with Data Sources',
    title: 'Prometheus Data Source',
    bullets: [
      'Prometheus เหมาะกับ metrics แบบ time series และใช้ PromQL',
      'ใน lab ใช้ URL เป็น `http://prometheus:9090`',
      'เริ่มสำรวจข้อมูลได้ทันทีผ่านหน้า Explore',
    ],
    note:
      'จุดที่ควรย้ำคือเรื่อง service name ใน Docker Compose ว่าภายใน network เดียวกันเราใช้ `prometheus` แทน `localhost` เพื่อให้ผู้เรียนไม่สับสนเวลา config.',
    visual: { type: 'image', asset: 'prometheus-flow', caption: 'Prometheus → Grafana Explore' },
  },
  {
    section: 'Working with Data Sources',
    title: 'สลับไปทำ Exercise 02: Prometheus Data Source',
    bullets: [
      'เปิดไฟล์ `Exercises/02-prometheus-data-source.md`',
      'เพิ่ม Prometheus ผ่าน Grafana UI แล้วกด Save & test',
      'ทดลอง query `up` และ `prometheus_build_info`',
    ],
    note:
      'นี่คือ data source ตัวแรกที่ผู้เรียนจะเชื่อมเอง ให้ช่วยดูว่าทุกคนใช้ URL ถูกเป็น `http://prometheus:9090` และเห็นผลลัพธ์ใน Explore จริง.',
    kind: 'exercise',
    exerciseFile: 'Exercises/02-prometheus-data-source.md',
    outcomes: ['เพิ่ม Prometheus สำเร็จ', 'ทดสอบการเชื่อมต่อได้', 'เห็นผลลัพธ์ PromQL แรก'],
  },
  {
    section: 'Working with Data Sources',
    title: 'InfluxDB Data Source แบบ Flux',
    bullets: [
      'InfluxDB 2.x ใช้ URL, Organization, Bucket และ Token',
      'ใน lab นี้เลือก query language เป็น Flux',
      'เหมาะกับการเปรียบเทียบแนวคิด query คนละแบบกับ PromQL',
    ],
    note:
      'อธิบายให้ผู้เรียนเห็นว่าต่อให้ data source ต่างชนิดกัน Grafana ก็ยังใช้ pattern การเชื่อมต่อคล้ายเดิม คือเลือกปลายทาง ใส่ credential และทดสอบการเชื่อมต่อ.',
    visual: { type: 'image', asset: 'influxdb-flow', caption: 'Seed data → InfluxDB → Grafana' },
  },
  {
    section: 'Working with Data Sources',
    title: 'สลับไปทำ Exercise 03: InfluxDB + Flux',
    bullets: [
      'เปิดไฟล์ `Exercises/03-influxdb-flux-data-source.md`',
      'seed ข้อมูลตัวอย่าง แล้วเพิ่ม InfluxDB Data Source',
      'ทดลอง query measurement `lab_metrics` ผ่าน Explore',
    ],
    note:
      'ให้ผู้เรียนเห็นความต่างของภาษา query แต่ยังอยู่ใน Grafana workflow เดิม ช่วยย้ำว่าเครื่องมือหน้าบ้านคงเดิม แต่แหล่งข้อมูลและภาษาคุยกับมันต่างกัน.',
    kind: 'exercise',
    exerciseFile: 'Exercises/03-influxdb-flux-data-source.md',
    outcomes: ['seed data สำเร็จ', 'เชื่อม InfluxDB ได้', 'อ่าน Flux query ได้เบื้องต้น'],
  },
  {
    section: 'Queries and Panels',
    title: 'Queries ใน Grafana',
    bullets: [
      'เริ่มทดลอง query ได้จากหน้า Explore',
      'เลือก data source ก่อน แล้วค่อยเขียน query ให้ตอบคำถามที่ชัดเจน',
      'query เดียวกันสามารถนำไปต่อยอดเป็น panel บน dashboard ได้',
    ],
    note:
      'สไลด์นี้ช่วยเปลี่ยนมุมคิดจาก “อยากได้กราฟแบบไหน” ไปเป็น “อยากตอบคำถามอะไรจากข้อมูล” เพราะ query ที่ชัดคือฐานของ dashboard ที่ดี.',
    visual: { type: 'image', asset: 'explore-to-panel', caption: 'Explore เป็นพื้นที่ทดลองก่อนนำขึ้น Dashboard' },
  },
  {
    section: 'Queries and Panels',
    title: 'การออกแบบและสร้าง Panel',
    bullets: [
      'Time series เหมาะกับแนวโน้มตามเวลา',
      'Stat เหมาะกับค่าปัจจุบันที่ต้องอ่านเร็ว',
      'ชื่อ panel, legend และ layout ส่งผลต่อความเข้าใจไม่แพ้ query',
    ],
    note:
      'ย้ำกับผู้เรียนว่าการเลือก visualization ไม่ใช่แค่เรื่องสวยงาม แต่เป็นการออกแบบคำตอบให้ตรงกับสิ่งที่คนดูต้องตัดสินใจจากข้อมูล.',
    visual: { type: 'image', asset: 'panel-types', caption: 'เลือก panel ให้ตรงกับคำถาม' },
  },
  {
    section: 'Queries and Panels',
    title: 'สลับไปทำ Exercise 04: Queries and Panels',
    bullets: [
      'เปิดไฟล์ `Exercises/04-queries-and-panels.md`',
      'นำเข้า dashboard skeleton และสร้าง Time series กับ Stat panel',
      'ตั้งชื่อ panel และปรับ layout ให้ดูง่าย',
    ],
    note:
      'ช่วงนี้ควรปล่อยเวลาลงมือทำมากขึ้น เพราะผู้เรียนจะเริ่มเห็นภาพว่า query ที่เขียนไว้เปลี่ยนเป็น dashboard ที่ใช้งานได้จริงอย่างไร.',
    kind: 'exercise',
    exerciseFile: 'Exercises/04-queries-and-panels.md',
    outcomes: ['สร้าง dashboard แรกได้', 'เข้าใจ panel ต่างชนิด', 'อ่านผลจาก PromQL บน dashboard ได้'],
  },
  {
    section: 'Working with Alerting',
    title: 'ระบบ Alerting ของ Grafana',
    bullets: [
      'Alerting ใช้ตรวจเงื่อนไขจาก query และประเมินซ้ำตามช่วงเวลา',
      'สถานะหลักคือ Normal, Pending และ Firing',
      'Grafana-managed Alert rule สร้างได้จาก UI โดยไม่ต้องเขียนระบบเพิ่ม',
    ],
    note:
      'ให้ผู้เรียนเข้าใจก่อนว่า alerting คือขั้นต่อจาก dashboard เมื่อเราไม่ได้อยากรอให้คนมาเปิดดูกราฟเอง แต่ต้องการให้ระบบคอยเฝ้าระวังให้.',
    visual: { type: 'image', asset: 'alert-states', caption: 'สถานะของ Alert Rule เปลี่ยนตามการประเมินผล' },
  },
  {
    section: 'Working with Alerting',
    title: 'การตั้ง Alert Rule และ Notification',
    bullets: [
      'เริ่มจาก query ที่วัดสิ่งสำคัญจริง',
      'กำหนด threshold, evaluation interval และ pending period',
      'ใน lab นี้จะโฟกัสที่การเปลี่ยนสถานะของ rule เป็นหลัก',
    ],
    note:
      'สไลด์นี้ไม่ต้องลงลึกระบบ notification ภายนอกมาก เพราะเป้าหมายของคอร์สคือให้ผู้เรียนเข้าใจแกนหลักของ rule evaluation ก่อน.',
    visual: {
      type: 'commands',
      title: 'ตัวอย่างแนวคิดของ Rule',
      items: [
        ['Query', 'increase(demo_requests_total[1m])'],
        ['Condition', '> 10'],
        ['Interval', '10s'],
        ['Pending', '0s'],
      ],
    },
  },
  {
    section: 'Working with Alerting',
    title: 'สลับไปทำ Exercise 06: Alerting Basics',
    bullets: [
      'เปิดไฟล์ `Exercises/06-alerting-basics.md`',
      'สร้าง rule จาก `increase(demo_requests_total[1m])`',
      'ยิง traffic แล้วดูสถานะเปลี่ยนจาก Normal ไปเป็น Pending หรือ Firing',
    ],
    note:
      'ตรงนี้ผู้เรียนจะเห็นว่า query ที่เคยใช้ดูข้อมูล สามารถกลายเป็นเงื่อนไขแจ้งเตือนได้จริง ซึ่งเป็นจุดเชื่อมสำคัญระหว่าง observability กับ operations.',
    kind: 'exercise',
    exerciseFile: 'Exercises/06-alerting-basics.md',
    outcomes: ['สร้าง rule สำเร็จ', 'trigger alert ได้จริง', 'เข้าใจ state transition'],
  },
  {
    section: 'Advanced Dashboard Features',
    title: 'Dashboard Variables และ Templating',
    bullets: [
      'Variables ช่วยลดการ hard-code ค่าใน query',
      'สร้าง dropdown เช่น `job` และ `instance` ได้',
      'panel หลายตัวใช้ variable เดียวกันเพื่อเปลี่ยนมุมมองพร้อมกัน',
    ],
    note:
      'ให้ชี้ว่า variables ทำให้ dashboard เดียวดูหลาย service ได้ จึงช่วยลดการทำ dashboard ซ้ำจำนวนมากและดูแลง่ายขึ้น.',
    visual: { type: 'image', asset: 'variables-flow', caption: 'Dropdown → Query filter → Dashboard update' },
  },
  {
    section: 'Advanced Dashboard Features',
    title: 'Interactive Dashboards',
    bullets: [
      'ผู้ใช้สลับค่าผ่าน dropdown แล้ว panel จะ refresh ตามทันที',
      'ค่า variable ถูก sync ไปกับ URL เพื่อแชร์มุมมองเดิมได้',
      'เหมาะกับ dashboard ที่ต้องใช้ซ้ำกับหลาย target หรือหลายทีม',
    ],
    note:
      'สไลด์นี้ช่วยให้ผู้เรียนเห็นประโยชน์เชิงใช้งานจริง ว่าการทำ dashboard แบบ interactive ทำให้ dashboard ชุดเดียวตอบคำถามได้หลายสถานการณ์.',
    visual: {
      type: 'steps',
      title: 'Interactive flow',
      items: ['เลือก job', 'เลือก instance', 'Panels refresh', 'แชร์ลิงก์พร้อม state'],
    },
  },
  {
    section: 'Advanced Dashboard Features',
    title: 'สลับไปทำ Exercise 05: Dashboard Variables',
    bullets: [
      'เปิดไฟล์ `Exercises/05-dashboard-variables.md`',
      'สร้าง variable `job` และ `instance`',
      'ใช้ variable ใน PromQL เพื่อให้ dashboard โต้ตอบได้',
    ],
    note:
      'แม้หัวข้อนี้อยู่ในส่วน advanced แต่ผู้เรียนมักเห็นผลเร็วและสนุก เพราะเปลี่ยนค่า dropdown แล้ว dashboard ตอบสนองทันที.',
    kind: 'exercise',
    exerciseFile: 'Exercises/05-dashboard-variables.md',
    outcomes: ['สร้าง variable ได้', 'ทำ dashboard interactive ได้', 'เข้าใจ templating เบื้องต้น'],
  },
  {
    section: 'Grafana Plugins',
    title: 'Grafana Plugins คืออะไร',
    bullets: [
      'Plugin ใช้เพิ่ม Data Source, Panel หรือ App ให้ Grafana',
      'ช่วยขยายความสามารถให้ตรงกับโจทย์เฉพาะทาง',
      'เป็นจุดที่นักพัฒนาสามารถต่อยอด Grafana ได้มากที่สุด',
    ],
    note:
      'ใช้สไลด์นี้เปลี่ยนบทบาทของผู้เรียนจากผู้ใช้ Grafana ไปเป็นคนที่เริ่มขยายความสามารถของ Grafana เองได้.',
    visual: { type: 'image', asset: 'plugin-types', caption: '3 กลุ่ม plugin ที่พบได้บ่อยใน Grafana' },
  },
  {
    section: 'Grafana Plugins',
    title: 'การติดตั้ง ใช้งาน และตั้งค่า Plugin',
    bullets: [
      'เลือก plugin จาก catalog หรือ build ใช้เองในองค์กร',
      'หลังติดตั้งควรตรวจสอบสิทธิ์ การตั้งค่า และ compatibility',
      'บาง plugin ใช้เพิ่ม data source และบาง plugin ใช้เพิ่ม panel ใหม่',
    ],
    note:
      'อธิบายให้ผู้เรียนเห็นว่าก่อนจะเขียน plugin เอง เราควรรู้ก่อนว่า plugin ถูกใช้และถูกตั้งค่าใน Grafana อย่างไร เพราะเป็นประสบการณ์ที่ผู้ใช้ปลายทางจะเจอจริง.',
    visual: { type: 'image', asset: 'plugin-lifecycle', caption: 'เลือก → ติดตั้ง → ตั้งค่า → ใช้งาน' },
  },
  {
    section: 'Grafana Plugins',
    title: 'การพัฒนา Panel Plugin แบบพื้นฐาน',
    bullets: [
      'ใช้ `@grafana/create-plugin` scaffold โปรเจกต์เริ่มต้น',
      'พัฒนาด้วย TypeScript/React ตามแนวทางของ Grafana',
      'รัน watcher และ Grafana dev stack เพื่อทดสอบได้ทันที',
    ],
    note:
      'สไลด์นี้ควรสร้างความมั่นใจให้ผู้เรียนว่า plugin development มี workflow ที่ชัดเจนและเริ่มต้นได้เร็ว ไม่จำเป็นต้องเริ่มจากศูนย์.',
    visual: { type: 'image', asset: 'plugin-workflow', caption: 'create-plugin → code → watch → Grafana' },
  },
  {
    section: 'Grafana Plugins',
    title: 'สลับไปทำ Exercise 07: Panel Plugin Basics',
    bullets: [
      'เปิดไฟล์ `Exercises/07-panel-plugin-basics.md`',
      'scaffold panel plugin ใหม่ แล้วรัน workflow สำหรับพัฒนา',
      'แก้ไข `SimplePanel.tsx` และ refresh ดูผลใน Grafana',
    ],
    note:
      'นี่คือช่วงที่ทำให้ผู้เรียนเห็นความเป็น developer ของคอร์สนี้ชัดที่สุด ควรช่วยให้ทุกคนไปถึงจุดที่ plugin แสดงผลใน Grafana ได้อย่างน้อยหนึ่งครั้ง.',
    kind: 'exercise',
    exerciseFile: 'Exercises/07-panel-plugin-basics.md',
    outcomes: ['scaffold plugin สำเร็จ', 'Grafana โหลด plugin ได้', 'เห็นผลจากการแก้โค้ดจริง'],
  },
  {
    section: 'Conclusion',
    title: 'สรุปภาพรวมของคอร์ส',
    bullets: [
      'เปิด Grafana ได้ใน Codespaces ด้วย Docker Compose',
      'เชื่อมต่อ Prometheus และ InfluxDB ได้จริง',
      'สร้าง dashboard, variables, alert และเริ่มพัฒนา plugin ได้',
    ],
    note:
      'ใช้สไลด์นี้ทบทวนภาพรวมทั้งหมดอย่างกระชับ เพื่อให้ผู้เรียนเชื่อมโยงว่าทุกหัวข้อที่ผ่านมาเป็นเส้นทางเดียวกันจากการเปิดระบบไปจนถึงการต่อยอดเอง.',
    visual: { type: 'image', asset: 'course-roadmap', caption: 'จาก Setup ไปสู่ Plugin Development' },
  },
  {
    section: 'Conclusion',
    title: 'Q&A และ Next Steps',
    bullets: [
      'ทบทวนคำถามหรือจุดติดขัดจากแต่ละ exercise',
      'ลองทำ exercise ซ้ำตามลำดับเพื่อเสริมความเข้าใจ',
      'ต่อยอด dashboard และ plugin จากโจทย์ของทีมตัวเอง',
    ],
    note:
      'ปิดท้ายแบบเปิดพื้นที่ให้ถามต่อ และชวนให้ผู้เรียนกลับไปลองปรับใช้กับงานจริง เช่น เปลี่ยน data source, เพิ่ม panel หรือทดลองแก้ plugin ต่อเอง.',
    visual: {
      type: 'steps',
      title: 'หลังจบคอร์ส',
      items: ['ทบทวน labs', 'ต่อยอด dashboard', 'ลองสร้าง plugin ใหม่'],
    },
  },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeSvg(name, width, height, body) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" rx="24" fill="#F7FAFF"/>
  ${body}
</svg>`;
  const filePath = path.join(ASSET_DIR, `${name}.svg`);
  fs.writeFileSync(filePath, svg, 'utf8');
  return filePath;
}

function box(x, y, w, h, fill, stroke, text, size = 22) {
  const parts = String(text).split(/\\n|\n/);
  const startY = y + h / 2 - ((parts.length - 1) * (size * 0.62)) / 2;
  const tspans = parts
    .map(
      (part, index) =>
        `<tspan x="${x + w / 2}" y="${startY + index * (size * 1.15) + 7}">${part}</tspan>`
    )
    .join('');
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
    <text text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${size}" fill="#17324D">${tspans}</text>
  `;
}

function arrow(x1, y1, x2, y2, color = '#2F6FEB') {
  return `
    <defs>
      <marker id="arrow-${x1}-${y1}-${x2}-${y2}" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
        <path d="M0,0 L12,6 L0,12 z" fill="${color}"/>
      </marker>
    </defs>
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="4" marker-end="url(#arrow-${x1}-${y1}-${x2}-${y2})"/>
  `;
}

function generateAssets() {
  ensureDir(ASSET_DIR);

  writeSvg(
    'docker-vs-vm',
    920,
    520,
    `
      ${box(60, 70, 330, 340, '#FFFFFF', '#C9DCFF', 'Virtual Machine', 30)}
      ${box(120, 150, 210, 70, '#EAF2FF', '#2F6FEB', 'Guest OS', 24)}
      ${box(120, 250, 210, 70, '#EAF2FF', '#2F6FEB', 'App + Dependencies', 24)}
      ${box(530, 70, 330, 340, '#FFFFFF', '#C9DCFF', 'Container', 30)}
      ${box(590, 150, 210, 70, '#EAF2FF', '#2F6FEB', 'App + Dependencies', 24)}
      ${box(590, 250, 210, 70, '#FFFFFF', '#91B4FF', 'Shared Host Kernel', 24)}
      <text x="225" y="455" text-anchor="middle" font-family="Arial" font-size="22" fill="#5E748C">หนักกว่า / มี OS แยก</text>
      <text x="695" y="455" text-anchor="middle" font-family="Arial" font-size="22" fill="#5E748C">เบากว่า / เริ่มเร็ว</text>
    `
  );

  writeSvg(
    'host-engine-containers',
    920,
    520,
    `
      ${box(70, 90, 780, 340, '#FFFFFF', '#C9DCFF', 'Host Machine', 30)}
      ${box(170, 170, 580, 90, '#EAF2FF', '#2F6FEB', 'Docker Engine', 32)}
      ${box(120, 300, 180, 80, '#FFFFFF', '#91B4FF', 'Grafana', 24)}
      ${box(370, 300, 180, 80, '#FFFFFF', '#91B4FF', 'Prometheus', 24)}
      ${box(620, 300, 180, 80, '#FFFFFF', '#91B4FF', 'InfluxDB', 24)}
      ${arrow(210, 260, 210, 300)}
      ${arrow(460, 260, 460, 300)}
      ${arrow(710, 260, 710, 300)}
    `
  );

  writeSvg(
    'image-container-volume-network',
    920,
    520,
    `
      ${box(60, 190, 170, 100, '#EAF2FF', '#2F6FEB', 'Image', 28)}
      ${box(290, 190, 190, 100, '#FFFFFF', '#91B4FF', 'Container', 28)}
      ${box(550, 100, 280, 90, '#FFFFFF', '#91B4FF', 'Volume\\nเก็บข้อมูลถาวร', 24)}
      ${box(550, 300, 280, 90, '#FFFFFF', '#91B4FF', 'Network\\nเชื่อมหลาย service', 24)}
      ${arrow(230, 240, 290, 240)}
      ${arrow(480, 220, 550, 145)}
      ${arrow(480, 260, 550, 345)}
      <text x="380" y="160" text-anchor="middle" font-family="Arial" font-size="22" fill="#5E748C">สร้างจาก</text>
    `
  );

  writeSvg(
    'docker-desktop-mock',
    920,
    520,
    `
      <rect x="70" y="60" width="780" height="400" rx="24" fill="#FFFFFF" stroke="#C9DCFF" stroke-width="2"/>
      <rect x="70" y="60" width="780" height="56" rx="24" fill="#EAF2FF"/>
      <circle cx="110" cy="88" r="8" fill="#91B4FF"/>
      <circle cx="138" cy="88" r="8" fill="#91B4FF"/>
      <circle cx="166" cy="88" r="8" fill="#91B4FF"/>
      <text x="240" y="95" font-family="Arial" font-size="22" fill="#17324D">Docker Desktop</text>
      ${box(110, 150, 190, 250, '#F7FAFF', '#D8E6FF', 'Containers\\nImages\\nVolumes', 26)}
      ${box(340, 150, 430, 110, '#FFFFFF', '#91B4FF', 'grafana  |  Running  |  Port 3000', 24)}
      ${box(340, 290, 430, 110, '#FFFFFF', '#91B4FF', 'prometheus  |  Running  |  Port 9090', 24)}
      <text x="555" y="440" text-anchor="middle" font-family="Arial" font-size="22" fill="#5E748C">ดูสถานะ service และจัดการ resource ได้สะดวก</text>
    `
  );

  writeSvg(
    'compose-stack',
    920,
    520,
    `
      ${box(80, 90, 250, 320, '#FFFFFF', '#C9DCFF', 'docker-compose.yml', 30)}
      <text x="205" y="190" text-anchor="middle" font-family="Arial" font-size="24" fill="#5E748C">services:</text>
      <text x="205" y="235" text-anchor="middle" font-family="Arial" font-size="24" fill="#5E748C">grafana</text>
      <text x="205" y="275" text-anchor="middle" font-family="Arial" font-size="24" fill="#5E748C">prometheus</text>
      <text x="205" y="315" text-anchor="middle" font-family="Arial" font-size="24" fill="#5E748C">influxdb</text>
      ${box(470, 90, 170, 90, '#EAF2FF', '#2F6FEB', 'Grafana', 26)}
      ${box(680, 90, 170, 90, '#EAF2FF', '#2F6FEB', 'Prometheus', 26)}
      ${box(575, 250, 170, 90, '#EAF2FF', '#2F6FEB', 'InfluxDB', 26)}
      ${arrow(330, 250, 470, 135)}
      ${arrow(330, 250, 680, 135)}
      ${arrow(330, 250, 575, 295)}
    `
  );

  writeSvg(
    'grafana-capabilities',
    920,
    520,
    `
      ${box(345, 180, 230, 120, '#EAF2FF', '#2F6FEB', 'Grafana', 34)}
      ${box(70, 90, 190, 90, '#FFFFFF', '#91B4FF', 'Prometheus', 24)}
      ${box(70, 320, 190, 90, '#FFFFFF', '#91B4FF', 'InfluxDB', 24)}
      ${box(660, 90, 190, 90, '#FFFFFF', '#91B4FF', 'Dashboard', 24)}
      ${box(660, 210, 190, 90, '#FFFFFF', '#91B4FF', 'Explore', 24)}
      ${box(660, 330, 190, 90, '#FFFFFF', '#91B4FF', 'Alerting', 24)}
      ${arrow(260, 135, 345, 210)}
      ${arrow(260, 365, 345, 270)}
      ${arrow(575, 210, 660, 135)}
      ${arrow(575, 240, 660, 255)}
      ${arrow(575, 270, 660, 375)}
    `
  );

  writeSvg(
    'grafana-architecture',
    920,
    520,
    `
      ${box(120, 210, 170, 90, '#FFFFFF', '#91B4FF', 'Browser', 28)}
      ${box(375, 210, 170, 90, '#EAF2FF', '#2F6FEB', 'Grafana', 30)}
      ${box(650, 110, 170, 80, '#FFFFFF', '#91B4FF', 'Prometheus', 24)}
      ${box(650, 220, 170, 80, '#FFFFFF', '#91B4FF', 'InfluxDB', 24)}
      ${box(650, 330, 170, 80, '#FFFFFF', '#91B4FF', 'Alert Rules', 24)}
      ${arrow(290, 255, 375, 255)}
      ${arrow(545, 235, 650, 150)}
      ${arrow(545, 255, 650, 260)}
      ${arrow(545, 275, 650, 370)}
    `
  );

  writeSvg(
    'codespaces-setup',
    920,
    520,
    `
      ${box(70, 90, 220, 300, '#FFFFFF', '#C9DCFF', 'GitHub\\nCodespaces', 32)}
      ${box(350, 110, 230, 90, '#EAF2FF', '#2F6FEB', 'Docker Compose', 28)}
      ${box(350, 240, 230, 90, '#FFFFFF', '#91B4FF', 'Grafana :3000', 28)}
      ${box(650, 175, 180, 90, '#FFFFFF', '#91B4FF', 'Browser\\nPreview', 26)}
      ${arrow(290, 240, 350, 155)}
      ${arrow(465, 200, 465, 240)}
      ${arrow(580, 285, 650, 220)}
    `
  );

  writeSvg(
    'datasource-hub',
    920,
    520,
    `
      ${box(350, 180, 220, 120, '#EAF2FF', '#2F6FEB', 'Data Source\\nLayer', 30)}
      ${box(90, 100, 170, 80, '#FFFFFF', '#91B4FF', 'Prometheus', 22)}
      ${box(90, 220, 170, 80, '#FFFFFF', '#91B4FF', 'InfluxDB', 22)}
      ${box(90, 340, 170, 80, '#FFFFFF', '#91B4FF', 'Other APIs', 22)}
      ${box(670, 140, 160, 70, '#FFFFFF', '#91B4FF', 'Explore', 22)}
      ${box(670, 250, 160, 70, '#FFFFFF', '#91B4FF', 'Dashboards', 22)}
      ${box(670, 360, 160, 70, '#FFFFFF', '#91B4FF', 'Alerting', 22)}
      ${arrow(260, 140, 350, 210)}
      ${arrow(260, 260, 350, 240)}
      ${arrow(260, 380, 350, 270)}
      ${arrow(570, 215, 670, 175)}
      ${arrow(570, 240, 670, 285)}
      ${arrow(570, 265, 670, 395)}
    `
  );

  writeSvg(
    'prometheus-flow',
    920,
    520,
    `
      ${box(80, 210, 180, 90, '#FFFFFF', '#91B4FF', 'Prometheus', 28)}
      ${box(370, 210, 180, 90, '#EAF2FF', '#2F6FEB', 'Grafana', 28)}
      ${box(660, 210, 180, 90, '#FFFFFF', '#91B4FF', 'Explore', 28)}
      ${arrow(260, 255, 370, 255)}
      ${arrow(550, 255, 660, 255)}
      <text x="460" y="185" text-anchor="middle" font-family="Arial" font-size="24" fill="#5E748C">URL: http://prometheus:9090</text>
      <text x="460" y="355" text-anchor="middle" font-family="Arial" font-size="24" fill="#5E748C">เริ่ม query ด้วย PromQL</text>
    `
  );

  writeSvg(
    'influxdb-flow',
    920,
    520,
    `
      ${box(70, 210, 180, 90, '#FFFFFF', '#91B4FF', 'Seed Script', 26)}
      ${box(360, 210, 180, 90, '#FFFFFF', '#91B4FF', 'InfluxDB', 28)}
      ${box(650, 210, 180, 90, '#EAF2FF', '#2F6FEB', 'Grafana', 28)}
      ${arrow(250, 255, 360, 255)}
      ${arrow(540, 255, 650, 255)}
      <text x="450" y="170" text-anchor="middle" font-family="Arial" font-size="24" fill="#5E748C">Organization + Bucket + Token + Flux</text>
      <text x="450" y="355" text-anchor="middle" font-family="Arial" font-size="24" fill="#5E748C">query time series จาก measurement ที่ seed ไว้</text>
    `
  );

  writeSvg(
    'explore-to-panel',
    920,
    520,
    `
      ${box(90, 170, 200, 120, '#FFFFFF', '#91B4FF', 'Explore\\nทดลอง query', 28)}
      ${box(360, 170, 200, 120, '#FFFFFF', '#91B4FF', 'Query\\nที่ตอบคำถามได้', 28)}
      ${box(630, 170, 200, 120, '#EAF2FF', '#2F6FEB', 'Panel\\nบน Dashboard', 28)}
      ${arrow(290, 230, 360, 230)}
      ${arrow(560, 230, 630, 230)}
    `
  );

  writeSvg(
    'panel-types',
    920,
    520,
    `
      ${box(120, 110, 280, 260, '#FFFFFF', '#91B4FF', 'Time series\\nเหมาะกับแนวโน้มตามเวลา', 30)}
      <polyline points="160,315 215,255 275,280 335,205" fill="none" stroke="#2F6FEB" stroke-width="6"/>
      ${box(520, 110, 280, 260, '#FFFFFF', '#91B4FF', 'Stat\\nเหมาะกับค่าปัจจุบัน', 30)}
      <text x="660" y="255" text-anchor="middle" font-family="Arial" font-size="72" fill="#2F6FEB">1</text>
    `
  );

  writeSvg(
    'alert-states',
    920,
    520,
    `
      ${box(80, 210, 180, 90, '#FFFFFF', '#91B4FF', 'Normal', 30)}
      ${box(370, 210, 180, 90, '#FFFFFF', '#91B4FF', 'Pending', 30)}
      ${box(660, 210, 180, 90, '#EAF2FF', '#2F6FEB', 'Firing', 30)}
      ${arrow(260, 255, 370, 255)}
      ${arrow(550, 255, 660, 255)}
      <text x="460" y="185" text-anchor="middle" font-family="Arial" font-size="22" fill="#5E748C">query เข้าเงื่อนไข</text>
      <text x="750" y="185" text-anchor="middle" font-family="Arial" font-size="22" fill="#5E748C">ผ่านช่วงประเมินผล</text>
    `
  );

  writeSvg(
    'variables-flow',
    920,
    520,
    `
      ${box(90, 190, 180, 100, '#FFFFFF', '#91B4FF', 'Dropdown\\njob / instance', 26)}
      ${box(370, 190, 180, 100, '#FFFFFF', '#91B4FF', 'PromQL\\nใช้ $job, $instance', 24)}
      ${box(650, 190, 180, 100, '#EAF2FF', '#2F6FEB', 'Dashboard\\nเปลี่ยนมุมมอง', 26)}
      ${arrow(270, 240, 370, 240)}
      ${arrow(550, 240, 650, 240)}
    `
  );

  writeSvg(
    'plugin-types',
    920,
    520,
    `
      ${box(115, 180, 200, 120, '#FFFFFF', '#91B4FF', 'Data Source\\nPlugin', 28)}
      ${box(360, 180, 200, 120, '#EAF2FF', '#2F6FEB', 'Panel\\nPlugin', 28)}
      ${box(605, 180, 200, 120, '#FFFFFF', '#91B4FF', 'App\\nPlugin', 28)}
    `
  );

  writeSvg(
    'plugin-lifecycle',
    920,
    520,
    `
      ${box(70, 190, 170, 100, '#FFFFFF', '#91B4FF', 'เลือก', 28)}
      ${box(290, 190, 170, 100, '#FFFFFF', '#91B4FF', 'ติดตั้ง', 28)}
      ${box(510, 190, 170, 100, '#FFFFFF', '#91B4FF', 'ตั้งค่า', 28)}
      ${box(730, 190, 120, 100, '#EAF2FF', '#2F6FEB', 'ใช้', 28)}
      ${arrow(240, 240, 290, 240)}
      ${arrow(460, 240, 510, 240)}
      ${arrow(680, 240, 730, 240)}
    `
  );

  writeSvg(
    'plugin-workflow',
    920,
    520,
    `
      ${box(60, 190, 180, 100, '#FFFFFF', '#91B4FF', 'create-plugin', 24)}
      ${box(280, 190, 140, 100, '#FFFFFF', '#91B4FF', 'Code', 28)}
      ${box(460, 190, 160, 100, '#FFFFFF', '#91B4FF', 'Watch', 28)}
      ${box(660, 190, 180, 100, '#EAF2FF', '#2F6FEB', 'Grafana', 28)}
      ${arrow(240, 240, 280, 240)}
      ${arrow(420, 240, 460, 240)}
      ${arrow(620, 240, 660, 240)}
    `
  );

  writeSvg(
    'course-roadmap',
    920,
    520,
    `
      ${box(40, 210, 120, 90, '#FFFFFF', '#91B4FF', 'Setup', 24)}
      ${box(190, 210, 130, 90, '#FFFFFF', '#91B4FF', 'Sources', 24)}
      ${box(350, 210, 130, 90, '#FFFFFF', '#91B4FF', 'Panels', 24)}
      ${box(510, 210, 130, 90, '#FFFFFF', '#91B4FF', 'Alerts', 24)}
      ${box(670, 210, 130, 90, '#FFFFFF', '#91B4FF', 'Variables', 24)}
      ${box(810, 210, 80, 90, '#EAF2FF', '#2F6FEB', 'Plugins', 22)}
      ${arrow(160, 255, 190, 255)}
      ${arrow(320, 255, 350, 255)}
      ${arrow(480, 255, 510, 255)}
      ${arrow(640, 255, 670, 255)}
      ${arrow(800, 255, 810, 255)}
    `
  );
}

function addChrome(slide, current, total, section, title) {
  slide.background = { color: COLORS.white };
  slide.addShape(SHAPE.rect, { x: 0, y: 0, w: 13.333, h: 0.18, fill: { color: COLORS.blue } });
  slide.addText(section, {
    x: 0.6,
    y: 0.35,
    w: 4.2,
    h: 0.28,
    fontFace: 'Aptos',
    fontSize: 13,
    color: COLORS.blue,
    bold: true,
  });
  slide.addText(title, {
    x: 0.6,
    y: 0.68,
    w: 6.2,
    h: 0.7,
    fontFace: 'Aptos',
    fontSize: 24,
    color: COLORS.text,
    bold: true,
  });
  slide.addText(`${current}/${total}`, {
    x: 12.2,
    y: 0.35,
    w: 0.6,
    h: 0.25,
    align: 'right',
    fontFace: 'Aptos',
    fontSize: 11,
    color: COLORS.muted,
  });
}

function addBulletList(slide, bullets) {
  let y = 1.65;
  bullets.forEach((bullet) => {
    slide.addShape(SHAPE.ellipse, {
      x: 0.72,
      y: y + 0.08,
      w: 0.12,
      h: 0.12,
      fill: { color: COLORS.blue },
      line: { color: COLORS.blue },
    });
    slide.addText(bullet, {
      x: 0.92,
      y,
      w: 5.2,
      h: 0.52,
      fontFace: 'Aptos',
      fontSize: 18,
      color: COLORS.text,
      breakLine: false,
      margin: 0,
      valign: 'mid',
    });
    y += 0.8;
  });
}

function addCaption(slide, caption) {
  if (!caption) return;
  slide.addText(caption, {
    x: 7.0,
    y: 5.95,
    w: 5.4,
    h: 0.3,
    fontFace: 'Aptos',
    fontSize: 10.5,
    color: COLORS.muted,
    italic: true,
    align: 'center',
  });
}

function addVisualCard(slide, visual) {
  slide.addShape(SHAPE.roundRect, {
    x: 6.45,
    y: 1.45,
    w: 6.15,
    h: 4.4,
    rectRadius: 0.08,
    fill: { color: COLORS.card },
    line: { color: COLORS.border, pt: 1.2 },
    shadow: { type: 'outer', color: 'B7CCE8', blur: 1, angle: 45, distance: 1, opacity: 0.12 },
  });

  if (visual.type === 'image') {
    slide.addImage({
      path: path.join(ASSET_DIR, `${visual.asset}.svg`),
      x: 6.72,
      y: 1.72,
      w: 5.62,
      h: 3.6,
      sizing: { type: 'contain', x: 6.72, y: 1.72, w: 5.62, h: 3.6 },
    });
    addCaption(slide, visual.caption);
    return;
  }

  if (visual.type === 'commands') {
    slide.addText(visual.title, {
      x: 6.85,
      y: 1.75,
      w: 4.9,
      h: 0.3,
      fontFace: 'Aptos',
      fontSize: 16,
      bold: true,
      color: COLORS.text,
    });

    let y = 2.15;
    visual.items.forEach(([command, desc]) => {
      slide.addShape(SHAPE.roundRect, {
        x: 6.82,
        y,
        w: 5.4,
        h: 0.72,
        rectRadius: 0.04,
        fill: { color: COLORS.white },
        line: { color: COLORS.blueMid, pt: 0.8 },
      });
      slide.addText(command, {
        x: 7.02,
        y: y + 0.09,
        w: 2.3,
        h: 0.18,
        fontFace: 'Courier New',
        fontSize: 14,
        bold: true,
        color: COLORS.blue,
      });
      slide.addText(desc, {
        x: 9.55,
        y: y + 0.08,
        w: 2.25,
        h: 0.2,
        fontFace: 'Aptos',
        fontSize: 12.5,
        color: COLORS.muted,
      });
      y += 0.9;
    });
    return;
  }

  if (visual.type === 'steps') {
    slide.addText(visual.title, {
      x: 6.95,
      y: 1.8,
      w: 4.9,
      h: 0.3,
      fontFace: 'Aptos',
      fontSize: 16,
      bold: true,
      color: COLORS.text,
      align: 'center',
    });
    let y = 2.35;
    visual.items.forEach((item, index) => {
      slide.addShape(SHAPE.roundRect, {
        x: 7.15,
        y,
        w: 4.8,
        h: 0.58,
        rectRadius: 0.06,
        fill: { color: index % 2 === 0 ? COLORS.white : COLORS.blueSoft },
        line: { color: COLORS.blueMid, pt: 0.8 },
      });
      slide.addText(`${index + 1}. ${item}`, {
        x: 7.38,
        y: y + 0.11,
        w: 4.2,
        h: 0.2,
        fontFace: 'Aptos',
        fontSize: 15,
        color: COLORS.text,
      });
      y += 0.78;
    });
    return;
  }
}

function addExerciseSlide(slide, slideDef, current, total) {
  slide.background = { color: COLORS.white };
  slide.addShape(SHAPE.rect, { x: 0, y: 0, w: 13.333, h: 0.18, fill: { color: COLORS.blue } });
  slide.addShape(SHAPE.roundRect, {
    x: 0.9,
    y: 0.95,
    w: 11.5,
    h: 5.55,
    rectRadius: 0.08,
    fill: { color: COLORS.blueSoft },
    line: { color: COLORS.blueMid, pt: 1.4 },
  });
  slide.addText('Hands-on Transition', {
    x: 1.25,
    y: 1.25,
    w: 2.2,
    h: 0.28,
    fontFace: 'Aptos',
    fontSize: 13,
    bold: true,
    color: COLORS.blue,
  });
  slide.addText(slideDef.title, {
    x: 1.25,
    y: 1.58,
    w: 7.8,
    h: 0.7,
    fontFace: 'Aptos',
    fontSize: 26,
    bold: true,
    color: COLORS.text,
  });
  slide.addText(`ไฟล์ที่ใช้: ${slideDef.exerciseFile}`, {
    x: 1.25,
    y: 2.35,
    w: 6.8,
    h: 0.35,
    fontFace: 'Courier New',
    fontSize: 13,
    color: COLORS.navy,
  });

  slide.addShape(SHAPE.roundRect, {
    x: 1.25,
    y: 2.95,
    w: 4.85,
    h: 2.25,
    rectRadius: 0.05,
    fill: { color: COLORS.white },
    line: { color: COLORS.blueMid, pt: 1 },
  });
  slide.addText('สิ่งที่ผู้เรียนควรทำ', {
    x: 1.5,
    y: 3.2,
    w: 2.2,
    h: 0.25,
    fontFace: 'Aptos',
    fontSize: 15,
    bold: true,
    color: COLORS.text,
  });
  let leftY = 3.58;
  slideDef.bullets.forEach((bullet) => {
    slide.addShape(SHAPE.ellipse, {
      x: 1.54,
      y: leftY + 0.06,
      w: 0.1,
      h: 0.1,
      fill: { color: COLORS.blue },
      line: { color: COLORS.blue },
    });
    slide.addText(bullet, {
      x: 1.74,
      y: leftY,
      w: 4.0,
      h: 0.44,
      fontFace: 'Aptos',
      fontSize: 15,
      color: COLORS.text,
      margin: 0,
    });
    leftY += 0.55;
  });

  slide.addShape(SHAPE.roundRect, {
    x: 6.45,
    y: 2.95,
    w: 4.85,
    h: 2.25,
    rectRadius: 0.05,
    fill: { color: COLORS.white },
    line: { color: COLORS.blueMid, pt: 1 },
  });
  slide.addText('ผลลัพธ์ที่ควรเห็น', {
    x: 6.7,
    y: 3.2,
    w: 2.2,
    h: 0.25,
    fontFace: 'Aptos',
    fontSize: 15,
    bold: true,
    color: COLORS.text,
  });
  let rightY = 3.58;
  slideDef.outcomes.forEach((outcome, index) => {
    slide.addShape(SHAPE.roundRect, {
      x: 6.72,
      y: rightY,
      w: 4.25,
      h: 0.42,
      rectRadius: 0.04,
      fill: { color: index % 2 === 0 ? COLORS.white : COLORS.blueSoft },
      line: { color: COLORS.blueMid, pt: 0.8 },
    });
    slide.addText(outcome, {
      x: 6.95,
      y: rightY + 0.08,
      w: 3.9,
      h: 0.18,
      fontFace: 'Aptos',
      fontSize: 14,
      color: COLORS.text,
      align: 'center',
    });
    rightY += 0.55;
  });

  slide.addText(`${current}/${total}`, {
    x: 12.2,
    y: 0.35,
    w: 0.6,
    h: 0.25,
    align: 'right',
    fontFace: 'Aptos',
    fontSize: 11,
    color: COLORS.muted,
  });
}

function buildOutline() {
  const lines = [
    '# Grafana for Developer Presentation Outline',
    '',
    '- Language: Thai',
    '- Style: minimal, clean, white-blue',
    '- Outputs:',
    `  - \`${path.relative(ROOT, OUTLINE_PATH)}\``,
    `  - \`${path.relative(ROOT, PPTX_PATH)}\``,
    '',
    '## Slide List',
    '',
  ];

  slides.forEach((slide, index) => {
    lines.push(`### ${index + 1}. ${slide.title}`);
    lines.push('');
    lines.push(`- Section: ${slide.section}`);
    slide.bullets.forEach((bullet) => lines.push(`- ${bullet}`));
    if (slide.kind === 'exercise') {
      lines.push(`- Exercise file: \`${slide.exerciseFile}\``);
      lines.push(`- Expected outcomes: ${slide.outcomes.join(' / ')}`);
    }
    if (slide.visual) {
      lines.push(`- Visual: ${slide.visual.asset || slide.visual.title}`);
    }
    lines.push(`- Speaker note: ${slide.note}`);
    lines.push('');
  });

  fs.writeFileSync(OUTLINE_PATH, `${lines.join('\n')}\n`, 'utf8');
}

async function buildDeck() {
  generateAssets();
  buildOutline();

  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'GitHub Copilot';
  pptx.company = 'GitHub Copilot CLI';
  pptx.subject = 'Grafana for Developer course presentation';
  pptx.title = 'Grafana for Developer';
  pptx.lang = 'th-TH';
  pptx.theme = {
    headFontFace: 'Aptos',
    bodyFontFace: 'Aptos',
    lang: 'th-TH',
  };

  slides.forEach((slideDef, index) => {
    const slide = pptx.addSlide();
    if (slideDef.kind === 'exercise') {
      addExerciseSlide(slide, slideDef, index + 1, slides.length);
    } else {
      addChrome(slide, index + 1, slides.length, slideDef.section, slideDef.title);
      addBulletList(slide, slideDef.bullets);
      addVisualCard(slide, slideDef.visual);
    }
    slide.addText('Grafana for Developer', {
      x: 0.62,
      y: 6.83,
      w: 2.4,
      h: 0.18,
      fontFace: 'Aptos',
      fontSize: 9.5,
      color: COLORS.muted,
    });
    slide.addNotes(slideDef.note);
  });

  await pptx.writeFile({ fileName: PPTX_PATH });
}

buildDeck().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
