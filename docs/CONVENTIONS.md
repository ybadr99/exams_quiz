# Coding conventions

## Architecture

- `src/app` owns application composition (root component, router, providers).
- `src/pages` contains route-level components. Keep them thin; move reusable
  logic into `features` or `hooks`.
- `src/features/<feature>` contains domain-specific components, hooks, and
  helpers. A feature should not import from another feature's internals; share
  through `components`, `lib`, `hooks`, or `types` instead.
- `src/components/ui` contains reusable, domain-agnostic presentational
  components.
- `src/components/layout` contains application shell components.
- `src/store` contains Zustand stores.
- `src/lib` contains framework-agnostic utilities.
- `src/types` contains shared type definitions.

## Naming

- Components and their files use `PascalCase` (`StatCard.tsx`).
- Hooks use the `use` prefix and `camelCase` (`useDocumentTitle.ts`).
- Utilities, stores, and variables use `camelCase`.
- Types and interfaces use `PascalCase`; prefix interfaces with a domain noun
  (`Exam`, `AppState`).
- Boolean names read as predicates (`isComplete`, `hasStarted`).

## TypeScript

- `strict` mode is enabled. Avoid `any`; prefer `unknown` and narrow.
- Use `import type` for type-only imports. This is enforced by ESLint.
- Prefer `interface` for object shapes and `type` for unions/aliases.
- Define shared types in `src/types`; keep component-local props inline.
- Import from the project root with the `@/` alias instead of long relative
  paths (`@/lib/cn`, not `../../lib/cn`).

## React

- Use function components and named exports. The router imports components by
  name.
- Keep components focused and extract subcomponents when JSX grows.
- Follow the Rules of Hooks (enforced by ESLint).
- Avoid premature memoization; measure before adding `memo`/`useMemo`.
- Side effects belong in `useEffect` or event handlers, not render.

## State

- Use Zustand for shared client state. Keep stores small and domain-focused.
- Use local `useState` for state owned by a single component.
- Select only the state a component needs:
  `useAppStore((state) => state.exams)`.

## Styling

- Use Tailwind utility classes; avoid custom CSS unless utilities are
  insufficient.
- Compose conditional class names with `cn` from `@/lib/cn`.
- Global styles and Tailwind theme tokens live in `src/styles/global.css`.
- Use semantic HTML and include accessible labels (`aria-hidden` for decorative
  icons, `aria-label` for icon-only controls).

## Imports

Order imports as follows, separated by blank lines:

1. Node and third-party packages
2. Project aliases (`@/...`)
3. Relative imports
4. Side-effect imports (for example, global CSS)

## Quality

- Run `npm run lint` and `npm run typecheck` before committing.
- Do not disable lint rules inline unless there is a documented reason.
- Keep files under roughly 200 lines; split when they take on more than one
  responsibility.
