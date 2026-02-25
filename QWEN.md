# SDK Flex UI — Project Context

## Project Overview

**sdk-flex-ui** is a React + TypeScript application built with Vite. It serves as a frontend UI project with a focus on:

- **Modern React** (v19.2.0) with hooks and functional components
- **TypeScript** (~5.9.3) with strict type-checking
- **Vite** (v7.3.1) for fast development and optimized builds
- **Testing** with Vitest and React Testing Library
- **Code Quality** enforced via ESLint and Prettier

The project follows a minimal, clean architecture suitable for building scalable UI components.

---

## Directory Structure

```
sdk-flex-ui/
├── src/
│   ├── assets/          # Static assets (images, SVGs)
│   ├── test/            # Test utilities and setup files
│   ├── App.tsx          # Main application component
│   ├── App.css          # Component-specific styles
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles
│   └── App.test.tsx     # Component tests
├── public/              # Public static assets
├── dist/                # Production build output
├── node_modules/        # Dependencies
├── index.html           # HTML entry point
├── package.json         # Project configuration and scripts
├── tsconfig.json        # TypeScript root configuration
├── tsconfig.app.json    # TypeScript app configuration
├── tsconfig.node.json   # TypeScript Node configuration
├── vite.config.ts       # Vite build configuration
├── eslint.config.js     # ESLint configuration
├── prettier.config.js   # Prettier configuration
└── yarn.lock            # Yarn lock file
```

---

## Building and Running

### Prerequisites

- **Node.js** (v18+ recommended)
- **Yarn** package manager

### Installation

```bash
yarn install
```

### Development

Start the development server with hot module replacement (HMR):

```bash
yarn dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Production Build

```bash
yarn build
```

This runs TypeScript compilation followed by Vite build. Output is placed in `dist/`.

### Preview Production Build

```bash
yarn preview
```

### Testing

```bash
# Run tests in watch mode
yarn test

# Run tests with UI
yarn test:ui

# Run tests with coverage report
yarn test:coverage
```

### Code Quality

```bash
# Run ESLint
yarn lint

# Fix ESLint issues automatically
yarn lint:fix

# Check code formatting
yarn format:check

# Format code
yarn format
```

---

## Development Conventions

### TypeScript

- **Strict mode** enabled (`strict: true`)
- **No unused locals/parameters** enforced
- **No fallthrough cases** in switch statements
- **Module resolution**: bundler mode
- **JSX**: react-jsx
- **Target**: ES2022

### ESLint Configuration

The project uses a comprehensive ESLint setup with:

- `@eslint/js` — JavaScript recommended rules
- `typescript-eslint` — TypeScript-specific rules
- `eslint-plugin-react-hooks` — React Hooks rules
- `eslint-plugin-react-refresh` — Vite-specific React refresh rules
- `eslint-config-prettier` — Disables conflicting formatting rules

**Key rules:**
- 2-space indentation
- Single quotes for strings
- Semicolons required
- `const` over `let` (prefer-const)
- No `var` declarations
- No implicit coercion
- No `eval` or implied eval
- Shadowing allowed only via `@typescript-eslint/no-shadow`
- `@typescript-eslint/no-explicit-any` — warned (not error)
- Unused variables starting with `_` are allowed

### Prettier Configuration

```js
{
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 80,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf'
}
```

### Testing Practices

- **Framework**: Vitest with globals enabled
- **Environment**: jsdom (browser-like)
- **Testing Library**: `@testing-library/react` for component testing
- **Setup file**: `src/test/setup.ts` — configures test environment and mocks
- **Coverage**: v8-based coverage with text, JSON, and HTML reporters
- **Test files**: Co-located with source code (`*.test.tsx`)

### Code Style Summary

| Aspect | Convention |
|--------|------------|
| Indentation | 2 spaces |
| Quotes | Single (`'`) |
| Semicolons | Required |
| Line length | 80 characters |
| Trailing commas | ES5 (objects/arrays, not functions) |
| Arrow function parens | Always (`(x) => x`) |
| Line endings | LF (Unix-style) |

---

## Key Dependencies

### Runtime

- `react` ^19.2.0
- `react-dom` ^19.2.0

### Development

- `typescript` ~5.9.3
- `vite` ^7.3.1
- `vitest` ^3.x
- `eslint` ^9.39.1
- `prettier` ^3.8.1
- `@testing-library/react` ^16.3.2
- `@vitejs/plugin-react` ^5.1.1

---

## Architecture Notes

- **Entry point**: `src/main.tsx` renders `<App />` into `#root`
- **Component structure**: Functional components with hooks
- **State management**: React `useState` for local state (no global state library)
- **Styling**: Plain CSS (no CSS-in-JS library)
- **Imports**: ES modules with `.tsx`/`.ts` extensions

---

## Common Tasks

### Adding a New Component

1. Create `src/components/ComponentName.tsx`
2. Create accompanying test `src/components/ComponentName.test.tsx`
3. Create styles `src/components/ComponentName.css` (if needed)

### Adding a New Dependency

```bash
yarn add package-name          # Runtime dependency
yarn add -D package-name       # Development dependency
```

### Updating TypeScript Types

Ensure types are installed for new dependencies:

```bash
yarn add -D @types/package-name
```

---

## Troubleshooting

### Type Errors During Build

Run `yarn lint` to identify TypeScript and ESLint issues before building.

### Test Failures

- Ensure test setup file is loaded: `src/test/setup.ts`
- Mock SVG imports in tests (see setup file for examples)
- Use `yarn test:ui` for interactive test debugging

### HMR Not Working

- Ensure file extensions are correct (`.tsx` for React components)
- Check that components are exported as default for HMR
