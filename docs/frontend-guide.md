## Frontend run guide

This document explains how to run the frontend locally, which environment variables are required, and common workflows.

### Prerequisites

- Node.js 18+ (recommended for Next.js 16)
- npm (comes with Node.js)

### Install dependencies

```bash
npm install
```

### Environment variables

The frontend uses Next.js environment variables. Create a `.env.local` file in the repo root.

Required:

- `NEXT_PUBLIC_API_BASE_URL` – base URL of the backend API (must match the OpenAPI contract).
  - Example: `http://localhost:3001`

Notes:

- Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.
- Do not put secrets or tokens into frontend env files.

Example `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

### Run in development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Production build

```bash
npm run build
npm run start
```

### API types (OpenAPI)

API types are generated from `.vibe/openapi/openapi.json`.

Regenerate types after backend contract changes:

```bash
npm run generate:api
```

### Useful scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run start` – run built app
- `npm run lint` – eslint
- `npm run test` – run tests

### Troubleshooting

- API requests fail: check `NEXT_PUBLIC_API_BASE_URL` and that backend is running.
- Type errors after backend changes: re-run API generation.
