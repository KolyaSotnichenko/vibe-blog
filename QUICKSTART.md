## Quickstart

This repository contains frontend project scaffolding guidance and an OpenAPI specification.

## Prerequisites
- Node.js >= 18
- npm, yarn, or pnpm

## Setup
1. Install dependencies:
   - `cd frontend && pnpm install`
2. (Optional) Generate the OpenAPI client from `.vibe/openapi/openapi.json` if required by features.
3. Start the development server:
   - `cd frontend && pnpm dev`

## Notes
- Use the generated client exclusively through a centralized API layer.
- Follow mandatory rules in `AGENT.md`.

See `AGENT.md` for mandatory implementation rules.
