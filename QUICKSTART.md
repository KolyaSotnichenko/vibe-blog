## Vibe Blog Frontend

This repository contains the frontend for the Vibe Blog project, built with Next.js and TypeScript.

### Requirements
- Node.js >= 18
- pnpm

### Install
```bash
pnpm install
```

### Development
```bash
pnpm dev
```

The app will be available at http://localhost:3000

### Backend URL configuration

To connect frontend to backend, define environment variable:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

This value is used by the API client as a base URL for all backend requests.

### Scripts
- `pnpm dev` – start development server
- `pnpm build` – production build
- `pnpm lint` – run ESLint
- `pnpm typecheck` – run TypeScript checks

### Project Structure
- `frontend/app` – Next.js app router
- `frontend/public` – static assets
