# Grafana for Developer Presentation Outline

- Language: English
- Style: minimal, clean, white-blue
- Outputs:
  - `grafana-for-developer-presentation-outline.md`
  - `grafana-for-developer-course-presentation.pptx`

## Slide List

### 1. What is Docker and Containers?

- Section: Docker Basics
- A container packages an app with its dependencies so it runs identically anywhere
- Isolates each service environment without the overhead of a full VM
- Ideal for labs: fast to start, easy to reset
- Visual: docker-vs-vm
- Speaker note: Open with the big picture — we use containers so every learner starts from the same baseline without spending time on machine-specific installs. Then reinforce that Docker is the tool we use to manage these containers throughout the course.

### 2. How Containers Work on a Computer

- Section: Docker Basics
- Containers share the host kernel but isolate their process, network, and filesystem
- Many containers can run simultaneously on a single machine
- Each service has a clear, separate role and is easier to maintain
- Visual: host-engine-containers
- Speaker note: This slide corrects the common misconception that a container is just another virtual machine. Point out that it is really an isolated process managed through the same engine.

### 3. Key Components: Image, Container, Volume, Network

- Section: Docker Basics
- An Image is the template used to create a container
- A Container is the live, running instance
- A Volume stores persistent data; a Network lets services communicate
- Visual: image-container-volume-network
- Speaker note: Establish this as the shared vocabulary for the entire course. Learners will see these terms throughout every Docker Compose file and every Grafana lab.

### 4. Docker Desktop

- Section: Docker Basics
- Docker Desktop is the local GUI tool for running Docker on your own machine
- Provides UI, resource settings, and a convenient container overview
- This course uses GitHub Codespaces primarily, but the concepts are identical
- Visual: docker-desktop-mock
- Speaker note: Tell learners that Docker Desktop is what they will see when working locally after the course. In the classroom today the main workflow happens inside Codespaces so everyone sees the same environment.

### 5. Essential Docker Commands

- Section: Docker Basics
- List running containers with `docker ps`
- List local images with `docker images`
- Read logs with `docker logs <name>`; open a shell with `docker exec -it <name> sh`
- Visual: Command Quick List
- Speaker note: No need to go deep on every command. The goal is to give learners a survival kit so they can check status and do basic debugging on their own during labs.

### 6. Docker Compose for Multi-Service Stacks

- Section: Docker Basics
- One file defines all services together
- Start the stack with `docker compose up -d`
- Stop and clean up the network with `docker compose down`
- Visual: compose-stack
- Speaker note: This slide is the direct bridge to the Grafana labs. Almost every exercise in this repo uses Compose to bring up Grafana, Prometheus, and InfluxDB together.

### 7. What is Grafana?

- Section: Introduction to Grafana
- Grafana is used to explore data, build dashboards, and monitor systems
- Supports multiple data source types such as Prometheus and InfluxDB
- Suitable for developers, platform teams, and observability workflows
- Visual: grafana-capabilities
- Speaker note: Introduce Grafana from a business perspective — it is not just a charting tool but a central place for querying, visualizing, and answering questions from data.

### 8. Core Capabilities of Grafana

- Section: Introduction to Grafana
- Explore: experiment with queries and view live data
- Dashboards and Panels: organize data for fast reading
- Alerting: detect important conditions; Plugins: extend capabilities
- Visual: 4 Pillars of the Course
- Speaker note: Connect these four pillars to what learners will actually do in the course. This builds a mental map from the start so they know where each exercise fits in the overall picture.

### 9. Basic Grafana Architecture

- Section: Introduction to Grafana
- Users reach Grafana UI through a browser
- Grafana sends queries to the selected data source
- Results are used across dashboards, Explore, and alerting
- Visual: grafana-architecture
- Speaker note: Use this slide to make the data flow clear before the first real installation. Emphasize that Grafana does not store all metrics itself — it connects to and visualizes data from external systems.

### 10. Preparing the System for Grafana

- Section: Installation and Configuration
- This course uses GitHub Codespaces as the shared lab environment
- Docker, Docker Compose, and port forwarding must be available
- Key files you will see in every lab: `.env` and `docker-compose.yml`
- Visual: codespaces-setup
- Speaker note: Explain the pedagogical reason for using Codespaces — it reduces risk from machine differences and makes instructor support easier than scattered local setups.

### 11. Installing and Running Grafana

- Section: Installation and Configuration
- Navigate to the lab folder and run `docker compose up -d`
- Check status with `docker compose ps`
- Open Grafana via forwarded port `3000` and log in with the lab credentials
- Visual: Startup Flow
- Speaker note: Keep this brief and reinforce that learners will see this same pattern repeating in most exercises, so they should internalize this flow.

### 12. Lab: Exercise 01 — Setup Grafana

- Section: Installation and Configuration
- Open `Exercises/01-setup-grafana-codespaces.md`
- Start Grafana in Codespaces and verify port `3000` is forwarded
- Confirm login works and understand the role of Docker volumes for persistence
- Exercise file: `Exercises/01-setup-grafana-codespaces.md`
- Expected outcomes: Grafana running / Port forwarding understood / Persistent volume observed
- Speaker note: Pause the lecture here and have learners work hands-on immediately. The goal is for everyone to have a working Grafana instance before moving to data sources.

### 13. What is a Data Source in Grafana?

- Section: Working with Data Sources
- A data source is the connection point between Grafana and a real data system
- Each data source has its own query language and authentication method
- Choosing the right data source helps dashboards answer the right questions
- Visual: datasource-hub
- Speaker note: Use this slide before diving into individual systems so learners understand that graphs in Grafana always start with picking the right data source, not with choosing a panel type.

### 14. Prometheus Data Source

- Section: Working with Data Sources
- Prometheus is ideal for time-series metrics and uses PromQL
- In the lab, the URL is `http://prometheus:9090`
- Start exploring data immediately through the Explore page
- Visual: prometheus-flow
- Speaker note: The key point to reinforce is that inside a Docker Compose network we use the service name `prometheus` instead of `localhost`. Make sure learners do not get confused when configuring the data source.

### 15. Lab: Exercise 02 — Prometheus Data Source

- Section: Working with Data Sources
- Open `Exercises/02-prometheus-data-source.md`
- Add Prometheus via the Grafana UI and click Save & test
- Try querying `up` and `prometheus_build_info` in Explore
- Exercise file: `Exercises/02-prometheus-data-source.md`
- Expected outcomes: Prometheus added / Connection test passed / First PromQL result visible
- Speaker note: This is the first data source learners connect themselves. Ensure everyone uses the correct URL `http://prometheus:9090` and actually sees a result in Explore.

### 16. InfluxDB Data Source with Flux

- Section: Working with Data Sources
- InfluxDB 2.x requires URL, Organization, Default Bucket, and Token
- In this lab we select Flux as the query language
- Great for comparing a completely different query paradigm to PromQL
- Visual: influxdb-flow
- Speaker note: Explain that even though the data source type is different, Grafana still uses the same connection pattern — pick the target, enter credentials, test the connection.

### 17. Lab: Exercise 03 — InfluxDB + Flux

- Section: Working with Data Sources
- Open `Exercises/03-influxdb-flux-data-source.md`
- Run the seed script, then add the InfluxDB data source with Flux
- Query the `lab_metrics` measurement in Explore
- Exercise file: `Exercises/03-influxdb-flux-data-source.md`
- Expected outcomes: Data seeded / InfluxDB connected / Basic Flux query readable
- Speaker note: Help learners see the difference in query language while staying in the same Grafana workflow. The front-end experience is identical; only the language for talking to the backend changes.

### 18. PromQL: What is it?

- Section: PromQL Basics
- PromQL is the query language built into Prometheus
- A functional language for selecting, filtering, and aggregating time-series metrics
- Used in Grafana Explore, panel editors, and alert rule definitions
- Visual: promql-intro
- Speaker note: Make it clear that PromQL is not a SQL dialect — it is built around the idea of time-series data streams. Every expression returns an instant vector, a range vector, or a scalar value.

### 19. PromQL: Basic Metric Selectors

- Section: PromQL Basics
- `up` — returns 1 when a scrape target is reachable, 0 when it is not
- `{job="prometheus"}` — label selector that filters results to a specific job
- `up{job="prometheus", instance="localhost:9090"}` — combine selectors for precision
- `prometheus_build_info` — returns build metadata for each Prometheus instance
- Visual: Selector Examples
- Speaker note: Start with `up` because every Prometheus instance exposes it and learners have already queried it in Exercise 02. Show how adding label selectors narrows the result set — this is the foundation of all more complex queries.

### 20. PromQL: Useful Functions and Aggregations

- Section: PromQL Basics
- `rate(metric[5m])` — per-second rate of a counter; use for request/error rates
- `increase(metric[1m])` — total counter increase; useful for alert thresholds
- `sum by (label) (metric)` — aggregate across instances grouped by a label
- `avg_over_time(metric[5m])` — average gauge value over a rolling window
- Visual: Common Functions
- Speaker note: These four patterns cover the majority of real-world PromQL queries. Key rule: always use `rate` or `increase` for counters — never plot raw counter values. Use `sum by` to collapse multi-instance results into one meaningful number.

### 21. PromQL in Grafana Explore

- Section: PromQL Basics
- Select Prometheus as the data source in Explore
- Switch to Code mode to type queries directly
- Use the time range picker to zoom; use Query inspector to see raw response data
- Visual: explore-promql
- Speaker note: Demonstrate switching between Builder and Code mode. Builder mode is great for discovery; Code mode is needed for complex expressions. By the end of this section learners should feel confident reading and editing raw PromQL.

### 22. Queries in Grafana

- Section: Queries and Panels
- Start experimenting with queries from the Explore page
- Choose the data source first, then write a query that answers a specific question
- The same query can be reused directly as a panel on a dashboard
- Visual: explore-to-panel
- Speaker note: This slide shifts the mindset from "what kind of graph do I want?" to "what question am I trying to answer?" A clear query is the foundation of a good dashboard.

### 23. Designing and Building Panels

- Section: Queries and Panels
- Time series: best for trends and changes over time
- Stat: best for a current single value that must be read at a glance
- Panel title, legend, and layout matter as much as the query itself
- Visual: panel-types
- Speaker note: Reinforce that choosing a visualization type is not just about aesthetics — it is designing the answer to match what the viewer needs to decide from the data.

### 24. Lab: Exercise 04 — Queries and Panels

- Section: Queries and Panels
- Open `Exercises/04-queries-and-panels.md`
- Import the dashboard skeleton and build Time series and Stat panels
- Use `up{job="prometheus"}` and `prometheus_build_info`; set titles and layout
- Exercise file: `Exercises/04-queries-and-panels.md`
- Expected outcomes: First dashboard built / Panel type differences understood / PromQL results on dashboard
- Speaker note: Allow more hands-on time here. Learners will start to see how the queries they wrote become real, usable dashboards.

### 25. Dashboard Variables and Templating — Concepts

- Section: Advanced Dashboard Features
- Variables eliminate hard-coded values in queries
- Create dropdowns for dimensions like `job`, `service`, or `instance`
- Multiple panels share the same variable and update simultaneously
- Visual: variables-flow
- Speaker note: Point out that variables let one dashboard cover many services. This prevents dashboard sprawl and makes long-term maintenance much easier.

### 26. Lab: Exercise 05 — Dashboard Variables with InfluxDB

- Section: Advanced Dashboard Features
- Open `Exercises/05-dashboard-variables.md`
- Seed multi-region InfluxDB data, then create `service` and `region` query variables
- Build chained variables so `region` filters by the selected `service`
- Exercise file: `Exercises/05-dashboard-variables.md`
- Expected outcomes: Query variables created from Flux / Chained variable filters correctly / Dashboard reacts to dropdowns
- Speaker note: The chained variable pattern is highly practical — changing `service` immediately narrows the `region` options. The InfluxDB data deliberately places different services in different regions to make the chain meaningful.

### 27. Templating: Reusable Dashboards with Prometheus

- Section: Advanced Dashboard Features
- Use Query, Custom, Interval variable types to build templates
- Insert `$variable` syntax inside PromQL to make queries fully dynamic
- Panel Repeat auto-expands one panel definition into N panels based on a variable
- Visual: Templating Flow
- Speaker note: Show the contrast between a static dashboard that always shows one service and a templated one that shows any service chosen from a dropdown. The panel repeat feature is particularly impressive in demos.

### 28. Lab: Exercise 06 — Templating

- Section: Advanced Dashboard Features
- Open `Exercises/06-templating.md`
- Import `starter.json`, create a `service` Query variable and a custom `interval` variable
- Use `$service` in PromQL; enable Panel Repeat to expand panels per service
- Exercise file: `Exercises/06-templating.md`
- Expected outcomes: Query variable drives panel content / Custom interval variable works / Panel Repeat expands per service
- Speaker note: The key insight is that the Prometheus data source supports label-based variable queries, so the dropdown values come directly from real metric labels — not hard-coded lists.

### 29. Interactive Dashboards: Dashboard Links and Data Links

- Section: Advanced Dashboard Features
- Dashboard links: navigate from overview to detail, preserving time range and context
- Data links: click a row or data point to open a related view with context passed automatically
- Building a drill-down flow makes dashboards useful for real incident investigation
- Visual: Drill-Down Flow
- Speaker note: SRE and on-call engineers need to go quickly from "something is wrong" to "exactly what and where." This slide sets up the mental model before learners build the flow themselves.

### 30. Lab: Exercise 07 — Interactive Dashboards

- Section: Advanced Dashboard Features
- Open `Exercises/07-interactive-dashboards.md`
- Create `Ops Overview` with a Table panel using `sum by (job, instance) (up)`
- Create `Target Detail`; add a Dashboard link and a Data link between the two dashboards
- Exercise file: `Exercises/07-interactive-dashboards.md`
- Expected outcomes: Dashboard link navigates and preserves time range / Data link in Table opens detail view / Variables carry context
- Speaker note: The payoff of this exercise is clicking a row in the overview table and landing directly on the detail dashboard with the correct target pre-selected.

### 31. Grafana Alerting System

- Section: Working with Alerting
- Alerting evaluates conditions from a query on a repeating schedule
- Main states: Normal, Pending, and Firing
- Grafana-managed Alert rules are created from the UI — no extra infrastructure required
- Visual: alert-states
- Speaker note: Help learners understand that alerting is the natural next step beyond dashboards — instead of waiting for someone to open a graph, the system watches automatically.

### 32. Setting Up Alert Rules and Notifications

- Section: Working with Alerting
- Start from a query that measures something operationally meaningful
- Set a threshold, evaluation interval, and pending period
- In this lab the focus is on observing state transitions, not external channels
- Visual: Alert Rule Concept
- Speaker note: No need to configure external notification channels in depth. The objective is for learners to understand the core rule evaluation cycle first.

### 33. Lab: Exercise 08 — Alerting Basics

- Section: Working with Alerting
- Open `Exercises/08-alerting-basics.md`
- Build a rule from `increase(demo_requests_total[1m])` with threshold `> 10`
- Run `./generate-traffic.sh`, then watch: Normal → Pending → Firing
- Exercise file: `Exercises/08-alerting-basics.md`
- Expected outcomes: Alert rule created / Traffic script triggers condition / State transition observed in UI
- Speaker note: Learners will see that a PromQL expression they already know becomes an alert condition with just a threshold. This is the key bridge between observability and operations.

### 34. What are Grafana Plugins?

- Section: Grafana Plugins
- Plugins add Data Sources, Panels, or complete Apps to Grafana
- They extend capabilities to match specialized or internal requirements
- For developers, plugins are the primary way to customize the platform
- Visual: plugin-types
- Speaker note: Use this slide to shift learners from Grafana users to Grafana extenders. They are now looking at the platform from a developer point of view.

### 35. Installing and Configuring Plugins

- Section: Grafana Plugins
- Choose from the public plugin catalog or build your own for internal use
- After installation, verify permissions, settings, and version compatibility
- Some plugins add data source types; others add entirely new panel visualizations
- Visual: plugin-lifecycle
- Speaker note: Explain that before writing a plugin, learners should understand how plugins are installed and configured from the end-user perspective, since that is the experience their users will have.

### 36. Developing a Basic Panel Plugin

- Section: Grafana Plugins
- Scaffold a new project with `@grafana/create-plugin`
- Develop using TypeScript and React following Grafana official conventions
- Run the file watcher and the Grafana dev stack to see changes in real time
- Visual: plugin-workflow
- Speaker note: Build confidence by showing that plugin development has a well-tooled, clear workflow. The generator provides the correct project structure, Docker Compose setup, and TypeScript config from the start.

### 37. Lab: Exercise 09 — Panel Plugin Basics

- Section: Grafana Plugins
- Open `Exercises/09-panel-plugin-basics.md`
- Run `npx @grafana/create-plugin@latest` inside `labfiles/09-panel-plugin-basics/workspace`
- Run `npm install && npm run dev`; edit `SimplePanel.tsx` to confirm live reload
- Exercise file: `Exercises/09-panel-plugin-basics.md`
- Expected outcomes: Plugin scaffolded successfully / Grafana detects and loads the plugin / Code edit reflected in rendered panel
- Speaker note: This exercise makes the developer identity of the course most visible. Help every learner reach the point where their own plugin renders in Grafana at least once.

### 38. Course Summary

- Section: Conclusion
- Launched Grafana in Codespaces using Docker Compose
- Connected Prometheus and InfluxDB; mastered PromQL essentials
- Built dashboards, variables, templated views, alert rules, and a custom panel plugin
- Visual: course-roadmap
- Speaker note: Use this slide for a crisp recap. Every topic covered is part of a single path from system setup all the way to self-directed platform extension.

### 39. Q&A and Next Steps

- Section: Conclusion
- Review questions and blockers from each exercise
- Revisit the exercises in order to reinforce understanding
- Extend your dashboards and plugins using your team real data and requirements
- Visual: After the Course
- Speaker note: Close with an open invitation to ask questions, and encourage learners to take what they built today back to real work — swap in different data sources, add new panels, or experiment with plugin customization.

