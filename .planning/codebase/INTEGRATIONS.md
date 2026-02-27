# External Integrations

## Overview

This is a standalone Angular UI library (ngx-drag-scroll) with minimal external integrations. The library provides drag-to-scroll functionality for Angular applications and operates entirely client-side without backend dependencies.

## External APIs

**None identified.**

The library is a pure UI component that:

- Handles DOM events (mouse, touch, wheel, scroll)
- Manages scrolling behavior programmatically
- Does not make HTTP requests
- Does not integrate with external services

## Databases

**None.**

This is a client-side only library with no data persistence requirements.

## Authentication Providers

**None.**

The library does not implement or require authentication.

## Webhooks

**None.**

No webhook integrations exist in this codebase.

## Third-Party Services

### Package Registry

| Service | Purpose                | Configuration                           |
| ------- | ---------------------- | --------------------------------------- |
| npm     | Package distribution   | `projects/ngx-drag-scroll/package.json` |
| GitHub  | Source control, Issues | `.github/`                              |

### CI/CD Services

| Service        | Purpose                | Configuration              |
| -------------- | ---------------------- | -------------------------- |
| GitHub Actions | Continuous Integration | `.github/workflows/ci.yml` |

## Browser APIs Used

The library interfaces with these browser APIs:

| API                     | Purpose                    | Location                           |
| ----------------------- | -------------------------- | ---------------------------------- |
| DOM Events              | Mouse/touch/wheel handling | `ngx-drag-scroll.component.ts`     |
| Element.scrollLeft      | Scroll position management | `ngx-drag-scroll.component.ts`     |
| Window.getComputedStyle | Style detection            | `ngx-drag-scroll.component.ts:217` |
| Document API            | DOM manipulation           | Injected via DOCUMENT token        |
| setTimeout/clearTimeout | Animation timing           | Scroll animations                  |

## Angular Platform Integrations

| Integration              | Purpose                         |
| ------------------------ | ------------------------------- |
| @angular/common DOCUMENT | DOM document injection          |
| Renderer2                | Cross-platform DOM manipulation |
| ElementRef               | Element access                  |

## Touch/Gesture Support

| Library  | Version | Purpose                                   |
| -------- | ------- | ----------------------------------------- |
| hammerjs | ^2.0.8  | Touch gesture recognition (optional peer) |

Note: HammerJS is included as a dependency but the core drag-scroll functionality uses native mouse/touch events.

## Environment Configuration

### Demo Application

| File                                   | Purpose                 |
| -------------------------------------- | ----------------------- |
| `src/environments/environment.ts`      | Development environment |
| `src/environments/environment.prod.ts` | Production environment  |

No external API keys or service configurations were found in environment files.

## NPM Scripts Integration

| Script      | External Tool          | Purpose                         |
| ----------- | ---------------------- | ------------------------------- |
| `changelog` | conventional-changelog | Generate CHANGELOG from commits |
| `lint`      | ESLint                 | Code quality                    |
| `format`    | Prettier               | Code formatting                 |

## Summary

This codebase is a self-contained Angular UI library with:

- **Zero external API dependencies**
- **Zero database connections**
- **Zero authentication requirements**
- **GitHub-based CI/CD only**
- **Standard npm package distribution**

The library is designed to be dependency-light and operates purely on browser APIs for its drag-scroll functionality.
