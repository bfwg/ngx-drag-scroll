# Architecture Overview

## Pattern

**Angular Library + Demo Application Workspace**

This repository follows the Angular workspace pattern with a publishable library (`ngx-drag-scroll`) and a demo application (`ngx-drag-scroll-demo`). The library provides drag-to-scroll functionality as reusable Angular components.

## Technology Stack

| Layer           | Technology              |
| --------------- | ----------------------- |
| Framework       | Angular 19.2.x          |
| Language        | TypeScript 5.8.x        |
| Build System    | Angular CLI, ng-packagr |
| Package Manager | npm                     |
| Testing         | Karma + Jasmine         |
| Linting         | ESLint + Prettier       |
| CI/CD           | GitHub Actions          |

## Layers

### 1. Library Layer (`projects/ngx-drag-scroll/`)

The core publishable library providing drag-scroll functionality.

**Components:**

- `DragScrollComponent` - Main container component (`<drag-scroll>`) handling mouse/touch events, scrolling logic, snap behavior, and navigation
- `DragScrollItemDirective` - Directive (`[drag-scroll-item]`) marking individual scrollable items within the container

**Interfaces:**

- `DragScrollElement` - Extended HTMLElement interface for DOM operations
- `DragScrollOption` - Configuration options interface

**Public API:** Exposed via `public-api.ts` entry point

### 2. Demo Application Layer (`src/`)

Standalone Angular application demonstrating library usage.

**Components:**

- `AppComponent` - Root shell with header, router outlet, footer
- `HomeComponent` - Main demo page showcasing drag-scroll features
- `HeaderComponent` - Application header
- `FooterComponent` - Application footer
- `NotFoundComponent` - 404 page
- `GithubComponent` - GitHub integration UI

## Data Flow

```
User Interaction (mouse/touch)
       │
       ▼
┌─────────────────────────────────┐
│   DragScrollComponent           │
│   - Event listeners (mousedown, │
│     mousemove, mouseup, scroll) │
│   - Track isPressed, isDragging │
└───────────────┬─────────────────┘
                │
       ┌────────┴────────┐
       │                 │
       ▼                 ▼
┌──────────────┐  ┌──────────────────┐
│ Scroll Logic │  │ Snap Animation   │
│ scrollLeft   │  │ easeInOutQuad    │
│ scrollTop    │  │ scrollTo()       │
└──────────────┘  └──────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│   Output Events                 │
│   - indexChanged                │
│   - reachesLeftBound            │
│   - reachesRightBound           │
│   - dragStart / dragEnd         │
│   - snapAnimationFinished       │
│   - dsInitialized               │
└─────────────────────────────────┘
```

## Key Abstractions

### DragScrollComponent

Central abstraction managing:

- **State:** `isPressed`, `isDragging`, `isScrolling`, `isAnimating`, `currIndex`
- **Configuration:** Input signals for `disabled`, `xDisabled`, `yDisabled`, `scrollbarHidden`, `snapDisabled`, `snapOffset`, `snapDuration`, `dragDisabled`, `xWheelEnabled`
- **Navigation:** `moveLeft()`, `moveRight()`, `moveTo(index)`
- **Bounds Detection:** Emits when reaching left/right scroll boundaries

### DragScrollItemDirective

Lightweight directive:

- Marks elements as scrollable items within container
- Provides per-item `dragDisabled` control
- Sets `display: inline-block` for horizontal layout

## Entry Points

### Library Entry Point

- `projects/ngx-drag-scroll/src/public-api.ts` - Exports all public API

### Demo Application Entry Point

- `src/main.ts` - Bootstrap using `bootstrapApplication()` with standalone components

### Build Entry Points

- `npm run package` - Build library for publishing
- `npm run build` - Build demo application
- `npm run start` - Serve demo application

### Test Entry Points

- `npm run test` - Run Karma tests
- Library tests: `projects/ngx-drag-scroll/src/test.ts`
- Demo tests: `src/test.ts`

## Component Communication

| From                                           | To                    | Mechanism                                            |
| ---------------------------------------------- | --------------------- | ---------------------------------------------------- |
| Parent → DragScrollComponent                   | Input signals         | `[scrollbar-hidden]`, `[drag-scroll-disabled]`, etc. |
| DragScrollComponent → Parent                   | Output signals        | `(indexChanged)`, `(reachesLeftBound)`, etc.         |
| DragScrollComponent ↔ DragScrollItemDirective | ContentChildren query | `@ContentChildren(DragScrollItemDirective)`          |
| Parent → DragScrollComponent                   | ViewChild reference   | Call methods like `moveLeft()`, `moveTo()`           |

## Build Pipeline

```
Source (TypeScript)
       │
       ▼
ng-packagr (Library Build)
       │
       ▼
dist/ngx-drag-scroll/ (ES modules, type declarations)
       │
       ▼
copy-artifacts.js (Copies README, LICENSE, CHANGELOG)
       │
       ▼
npm publish ready package
```

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`):

1. Checkout code
2. Install dependencies (`npm ci`)
3. Run linting (`npm run lint`)
4. Run tests (`npm run test ngx-drag-scroll`)
5. Build library (`npm run build ngx-drag-scroll`)

Triggered on push/PR to `develop` branch.
