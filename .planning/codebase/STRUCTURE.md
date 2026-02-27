# Directory Structure

## Root Layout

```
ngx-drag-scroll/
├── .github/workflows/      # CI/CD configuration
├── .husky/                 # Git hooks (commit lint)
├── .planning/              # Planning documentation
├── dist/                   # Build output (gitignored)
├── node_modules/           # Dependencies (gitignored)
├── projects/               # Angular workspace projects
│   └── ngx-drag-scroll/    # Publishable library
├── src/                    # Demo application source
├── angular.json            # Angular workspace config
├── package.json            # Root package config
├── tsconfig.json           # Root TypeScript config
└── [config files]          # ESLint, Prettier, etc.
```

## Key Locations

### Library Source (`projects/ngx-drag-scroll/`)

```
projects/ngx-drag-scroll/
├── src/
│   ├── lib/
│   │   ├── interface/
│   │   │   ├── drag-scroll-element.ts    # HTMLElement extension interface
│   │   │   └── drag-scroll-option.ts     # Configuration options interface
│   │   ├── ngx-drag-scroll.component.ts  # Main component (941 lines)
│   │   ├── ngx-drag-scroll.component.spec.ts  # Component tests
│   │   └── ngx-drag-scroll-item.ts       # Item directive (19 lines)
│   ├── public-api.ts                     # Public exports
│   └── test.ts                           # Test bootstrap
├── karma.conf.js           # Test runner config
├── ng-package.json         # ng-packagr config
├── package.json            # Library package.json (published)
├── tsconfig.lib.json       # Library TS config
├── tsconfig.lib.prod.json  # Production TS config
└── tsconfig.spec.json      # Test TS config
```

### Demo Application Source (`src/`)

```
src/
├── app/
│   ├── footer/
│   │   ├── footer.component.html
│   │   ├── footer.component.scss
│   │   └── footer.component.ts
│   ├── github/
│   │   └── github.component.ts           # GitHub button/link
│   ├── header/
│   │   ├── header.component.css
│   │   ├── header.component.html
│   │   └── header.component.ts
│   ├── home/
│   │   ├── home.component.css
│   │   ├── home.component.html           # Demo showcase
│   │   └── home.component.ts             # Demo logic
│   ├── not-found/
│   │   └── not-found.component.ts
│   ├── app-routing.module.ts             # Routes configuration
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   └── app.component.ts                  # Root component
├── assets/
│   └── img/                              # Demo images
├── environments/
│   ├── environment.prod.ts
│   └── environment.ts
├── favicon.ico
├── index.html
├── main.ts                               # Application bootstrap
├── polyfills.ts
├── styles.scss                           # Global styles
└── test.ts                               # Test bootstrap
```

### Configuration Files (Root)

| File                     | Purpose                         |
| ------------------------ | ------------------------------- |
| `angular.json`           | Angular workspace configuration |
| `package.json`           | Dependencies, scripts, metadata |
| `tsconfig.json`          | Base TypeScript configuration   |
| `.eslintrc.json`         | ESLint rules                    |
| `.eslintignore`          | ESLint ignore patterns          |
| `.prettierrc.json`       | Prettier formatting rules       |
| `commitlint.config.js`   | Commit message linting          |
| `lint-staged.config.mjs` | Pre-commit lint-staged config   |
| `browserslist`           | Supported browsers              |
| `.nvmrc`                 | Node version specification      |

### Build Artifacts

| Location                     | Contents                          |
| ---------------------------- | --------------------------------- |
| `dist/ngx-drag-scroll/`      | Built library (ES modules, types) |
| `dist/ngx-drag-scroll-demo/` | Built demo application            |

## Naming Conventions

### Files

| Type      | Pattern                     | Example                   |
| --------- | --------------------------- | ------------------------- |
| Component | `<name>.component.ts`       | `home.component.ts`       |
| Directive | `<name>.ts` (library)       | `ngx-drag-scroll-item.ts` |
| Interface | `<name>.ts`                 | `drag-scroll-option.ts`   |
| Test      | `<name>.spec.ts`            | `app.component.spec.ts`   |
| Template  | `<name>.component.html`     | `home.component.html`     |
| Styles    | `<name>.component.scss/css` | `app.component.scss`      |
| Module    | `<name>.module.ts`          | `app-routing.module.ts`   |

### Angular Elements

| Type               | Pattern           | Example                   |
| ------------------ | ----------------- | ------------------------- |
| Component selector | `<prefix>-<name>` | `drag-scroll`, `app-home` |
| Directive selector | `[<name>]`        | `[drag-scroll-item]`      |
| Input alias        | kebab-case        | `scrollbar-hidden`        |
| Output name        | camelCase         | `indexChanged`            |

### Classes

| Type      | Pattern           | Example                   |
| --------- | ----------------- | ------------------------- |
| Component | `<Name>Component` | `DragScrollComponent`     |
| Directive | `<Name>Directive` | `DragScrollItemDirective` |
| Interface | `<Name>`          | `DragScrollOption`        |

## Module Boundaries

```
┌─────────────────────────────────────────────────────────┐
│                    Angular Workspace                     │
│                                                         │
│  ┌─────────────────────┐  ┌─────────────────────────┐  │
│  │  ngx-drag-scroll    │  │  ngx-drag-scroll-demo   │  │
│  │  (library)          │  │  (application)          │  │
│  │                     │  │                         │  │
│  │  - Standalone       │◄─┤  - Imports library      │  │
│  │  - No external deps │  │  - Uses Material UI     │  │
│  │  - @angular/core    │  │  - Demo showcase        │  │
│  │  - @angular/common  │  │                         │  │
│  └─────────────────────┘  └─────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Import Paths

### Within Demo Application

```typescript
// Library import (via tsconfig path mapping)
import { DragScrollComponent } from 'ngx-drag-scroll';

// Local imports
import { HeaderComponent } from './header/header.component';
```

### Library Public API

```typescript
// projects/ngx-drag-scroll/src/public-api.ts
export * from './lib/ngx-drag-scroll.component';
export * from './lib/ngx-drag-scroll-item';
export * from './lib/interface/drag-scroll-element';
export * from './lib/interface/drag-scroll-option';
```

## Testing Structure

| Test Location                                | Target             |
| -------------------------------------------- | ------------------ |
| `projects/ngx-drag-scroll/src/lib/*.spec.ts` | Library components |
| `src/app/**/*.spec.ts`                       | Demo application   |

Tests use Karma + Jasmine. Run with `npm run test`.
