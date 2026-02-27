# Technology Stack

## Languages

| Language   | Version       | Usage                        |
| ---------- | ------------- | ---------------------------- |
| TypeScript | ^5.8.3        | Primary development language |
| SCSS       | N/A           | Component styling            |
| HTML       | N/A           | Templates                    |
| JavaScript | ES2022 target | Runtime target               |

## Runtime

| Runtime | Version          | Notes                                                 |
| ------- | ---------------- | ----------------------------------------------------- |
| Node.js | lts/iron (v20.x) | Specified in `.nvmrc`                                 |
| Browser | See browserslist | Supports >0.5%, last 2 versions, Firefox ESR, IE 9-11 |

## Frameworks

### Core Framework

| Framework   | Version | Purpose               |
| ----------- | ------- | --------------------- |
| Angular     | 19.2.10 | Application framework |
| Angular CLI | 19.2.11 | Build tooling         |

### Angular Packages

| Package                           | Version |
| --------------------------------- | ------- |
| @angular/core                     | 19.2.10 |
| @angular/common                   | 19.2.10 |
| @angular/compiler                 | 19.2.10 |
| @angular/platform-browser         | 19.2.10 |
| @angular/platform-browser-dynamic | 19.2.10 |
| @angular/router                   | 19.2.10 |
| @angular/forms                    | 19.2.10 |
| @angular/animations               | 19.2.10 |
| @angular/cdk                      | 18.0.4  |
| @angular/material                 | 18.0.4  |

## Dependencies

### Production Dependencies

| Package  | Version | Purpose                  |
| -------- | ------- | ------------------------ |
| rxjs     | ~7.8.1  | Reactive extensions      |
| zone.js  | ~0.15.0 | Angular change detection |
| tslib    | ^2.6.2  | TypeScript helpers       |
| core-js  | ~3.34.0 | Polyfills                |
| hammerjs | ^2.0.8  | Touch gesture support    |

### Development Dependencies

| Package         | Version | Purpose                |
| --------------- | ------- | ---------------------- |
| ng-packagr      | ^19.2.2 | Library packaging      |
| karma           | ~6.4.2  | Test runner            |
| jasmine-core    | ~5.1.1  | Testing framework      |
| eslint          | ^8.57.0 | Linting                |
| prettier        | ^3.1.1  | Code formatting        |
| husky           | ^8.0.3  | Git hooks              |
| lint-staged     | ^15.2.0 | Pre-commit linting     |
| @commitlint/cli | ^19.3.0 | Commit message linting |
| typescript      | ^5.8.3  | TypeScript compiler    |

### Optional Dependencies (Nx Platform Support)

| Package               | Version | Platform    |
| --------------------- | ------- | ----------- |
| @nx/nx-darwin-arm64   | 19.3.2  | macOS ARM64 |
| @nx/nx-darwin-x64     | 19.3.2  | macOS x64   |
| @nx/nx-linux-x64-gnu  | 19.3.2  | Linux x64   |
| @nx/nx-win32-x64-msvc | 19.3.2  | Windows x64 |

## Configuration

### TypeScript Configuration

| Setting                 | Value                                         |
| ----------------------- | --------------------------------------------- |
| Target                  | ES2022                                        |
| Module                  | esnext                                        |
| Module Resolution       | node                                          |
| Decorators              | experimentalDecorators, emitDecoratorMetadata |
| useDefineForClassFields | false                                         |

### ESLint Configuration

- Extends: eslint:recommended, @typescript-eslint/recommended, @angular-eslint/recommended
- Integrates Prettier via eslint-plugin-prettier
- Custom sort-imports rule enabled
- Template linting via @angular-eslint/template

### Prettier Configuration

```json
{
  "singleQuote": true,
  "trailingComma": "none",
  "endOfLine": "auto"
}
```

### Git Hooks (Husky)

- Pre-commit: lint-staged runs Prettier on staged files
- Commit message: commitlint with conventional commits

### Commit Linting

- Uses @commitlint/config-conventional

## Project Structure

| Project              | Type        | Path                     |
| -------------------- | ----------- | ------------------------ |
| ngx-drag-scroll      | Library     | projects/ngx-drag-scroll |
| ngx-drag-scroll-demo | Application | src/                     |

### Library Details

| Property          | Value                                                          |
| ----------------- | -------------------------------------------------------------- |
| Name              | ngx-drag-scroll                                                |
| Version           | 19.0.0-rc.0                                                    |
| Peer Dependencies | @angular/common >=5.0.0 <20.0.0, @angular/core >=5.0.0 <20.0.0 |
| Build Tool        | ng-packagr                                                     |
| Entry Point       | src/public-api.ts                                              |

## Build Configuration

### Application Build

- Builder: @angular-devkit/build-angular:application
- Output: dist/ngx-drag-scroll-demo
- Production optimizations: enabled
- Budget: 2MB warning, 5MB error (initial bundle)

### Library Build

- Builder: @angular-devkit/build-angular:ng-packagr
- Output: dist/ngx-drag-scroll
- Production config: tsconfig.lib.prod.json

### Test Configuration

- Test Framework: Jasmine
- Test Runner: Karma
- Browser: Chrome (ChromeHeadless in CI)
- Coverage: Istanbul reporter

## CI/CD

- Platform: GitHub Actions
- Workflow: `.github/workflows/ci.yml`
- Triggers: push/PR to develop branch
- Node version: lts/iron
- Steps: npm ci, lint, test (ChromeHeadless), build
