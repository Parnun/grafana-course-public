# GitHub Copilot Instructions

## Context: Grafana for Developer Course

This workspace is used to create **course content, hands-on exercises, and documentation** for a Grafana developer training course (2-day format).

## Primary Reference Repository

- **Grafana OSS**: https://github.com/grafana/grafana
- **Grafana Docs**: https://grafana.com/docs/grafana/latest/

When generating content, suggesting solutions, fixing the exercise's step that not work, or writing exercises, always:
- Base examples on Grafana's official codebase and APIs from the grafana/grafana repo
- Use the latest grafana UI reference
- Reference real file paths and patterns from grafana/grafana when relevant
- Use Grafana's actual plugin SDK, data source APIs, and panel development patterns
- Prefer TypeScript/Go examples consistent with what grafana/grafana uses

## Use Cases

- **README generation**: Follow structure from grafana/grafana repo docs
- **Hands-on exercises**: Use real Grafana APIs, dashboards-as-code (Grafonnet), and plugin patterns from the repo
- **Solution suggestions**: Base answers on actual grafana/grafana implementation patterns
- **Code samples**: Match the coding style and tooling (React, TypeScript, Go) used in grafana/grafana
