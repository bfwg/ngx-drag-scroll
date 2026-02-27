# Code Conventions

## Project Structure

```
ngx-drag-scroll/
├── projects/ngx-drag-scroll/     # Library source (publishable)
│   └── src/lib/                  # Core library code
├── src/                          # Demo application
│   └── app/                      # Demo app components
└── dist/                         # Build outputs
```

## Code Style

### Formatting

- **Prettier** enforces formatting with config in `.prettierrc.json`:
  - Single quotes for strings
  - No trailing commas
  - Auto line endings
- **EditorConfig** (`.editorconfig`):
  - UTF-8 charset
  - 2-space indentation
  - Insert final newline
  - Trim trailing whitespace (except markdown)

### Linting

- **ESLint** with Angular-specific rules
- TypeScript strict mode features enabled
- Sort imports required (alphabetical, grouped by type)
- Prettier integration (`eslint-plugin-prettier`)

### TypeScript Configuration

- Target: ES2022
- Module: ESNext
- Experimental decorators enabled
- `esModuleInterop` enabled
- `useDefineForClassFields: false` (Angular compatibility)

## Naming Conventions

### Files

- Components: `kebab-case.component.ts` (e.g., `home.component.ts`)
- Directives: `kebab-case.ts` (e.g., `ngx-drag-scroll-item.ts`)
- Interfaces: `kebab-case.ts` in `interface/` subdirectory
- Tests: `*.spec.ts` alongside source files

### Classes

- Components: PascalCase with `Component` suffix (e.g., `HomeComponent`)
- Directives: PascalCase with `Directive` suffix (e.g., `DragScrollItemDirective`)
- Interfaces: PascalCase with descriptive name (e.g., `DragScrollOption`)

### Properties & Methods

- Private fields: underscore prefix (e.g., `_index`, `_isDragging`)
- Public methods: camelCase (e.g., `moveLeft()`, `moveTo()`)
- Event handlers: `on` prefix + action (e.g., `onMouseDownHandler`, `onScrollHandler`)
- Output signals: camelCase verbs/states (e.g., `indexChanged`, `dragStart`)
- Input signals: camelCase with HTML alias (e.g., `scrollbarHidden` with alias `scrollbar-hidden`)

### Selectors

- Component selectors: kebab-case without prefix (e.g., `drag-scroll`)
- Directive selectors: kebab-case attribute (e.g., `[drag-scroll-item]`)
- App prefix: `app-` for demo components (e.g., `app-header`)

## Angular Patterns

### Modern Angular Features (v19+)

- **Standalone components** with `imports` array (no NgModules)
- **Signal inputs**: `input<T>(defaultValue, { alias: 'html-name' })`
- **Signal outputs**: `output<T>()` for events
- **View queries**: `viewChild()` signal-based queries
- **inject() function**: For dependency injection (e.g., `elementRef = inject(ElementRef)`)

### Component Structure

```typescript
@Component({
  selector: 'component-name',
  template: `...`, // Inline for small templates
  templateUrl: '...', // External for larger
  styles: [`...`], // Inline styles
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Dependencies]
})
export class ComponentName implements OnDestroy, AfterViewInit {
  // 1. Private fields (underscore prefix)
  private _index = 0;

  // 2. Public properties
  isPressed = false;

  // 3. Outputs (signal-based)
  indexChanged = output<number>();

  // 4. Inputs (signal-based)
  disabled = input<boolean>(false, { alias: 'html-alias' });

  // 5. Constructor
  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  // 6. Lifecycle hooks
  ngAfterViewInit() {}
  ngOnDestroy() {}

  // 7. Public methods
  moveLeft() {}

  // 8. Private methods (underscore prefix optional)
  private _startGlobalListening() {}
}
```

### Dependency Injection

- Use `inject()` function for directives and simple cases
- Constructor injection with visibility modifiers for components
- `@Inject(DOCUMENT)` for platform-agnostic document access

### Event Handling

- `Renderer2.listen()` for DOM event registration (returns cleanup function)
- Store listener references for cleanup in `ngOnDestroy`
- `@HostListener` for component-level events (wheel, resize)
- `@HostBinding` for dynamic style binding

## Error Handling

### Defensive Patterns

- Null/undefined checks before property access
- Optional chaining where appropriate
- `typeof window !== 'undefined'` for SSR compatibility

### Cleanup

- Store listener references and call them in `ngOnDestroy`
- Clear timeouts/intervals on destroy
- Set references to `null` after cleanup

## Import Organization

Imports are sorted with the following order:

1. Angular core imports
2. Angular common/platform imports
3. Third-party library imports
4. Local/relative imports

Groups are separated by blank lines:

```typescript
import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { DragScrollItemDirective } from './ngx-drag-scroll-item';
```

## Git Conventions

### Commit Messages

- Conventional Commits format (commitlint enforced)
- Format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Pre-commit Hooks

- **Husky** manages git hooks
- **lint-staged** runs Prettier on staged files:
  - TypeScript, JavaScript, JSON, Markdown, SCSS, HTML, YAML

## Build & Package

### Library Build

- `ng-packagr` for library packaging
- Public API exported via `public-api.ts`
- Production build: `ng build ngx-drag-scroll --configuration production`

### Demo App

- Standard Angular CLI build
- SCSS for styling
- Environment-based configuration
