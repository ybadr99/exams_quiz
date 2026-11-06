# Exams App

Plan, track, and prepare for your exams.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Zustand
- Lucide React
- Recharts
- ESLint (flat config) + typescript-eslint

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Script              | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start the Vite dev server                |
| `npm run build`     | Type-check and create a production build |
| `npm run preview`   | Preview the production build             |
| `npm run lint`      | Run ESLint                               |
| `npm run lint:fix`  | Run ESLint and apply safe fixes          |
| `npm run typecheck` | Run the TypeScript compiler              |

## Folder structure

```text
src/
├── app/                 # App composition: root component, router
├── components/
│   ├── layout/          # Layout and navigation components
│   └── ui/              # Reusable presentational components
├── features/            # Feature modules, grouped by domain
├── hooks/               # Reusable React hooks
├── lib/                 # Framework-agnostic helpers
├── pages/               # Route-level page components
├── store/               # Zustand stores
├── styles/              # Global styles and Tailwind entrypoint
└── types/               # Shared TypeScript types
```

See [docs/CONVENTIONS.md](docs/CONVENTIONS.md) for coding conventions.
