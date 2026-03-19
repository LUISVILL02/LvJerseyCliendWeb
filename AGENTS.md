# AGENTS.md — LVJersey-client

## Project Overview

Angular 20.3 e-commerce client (jersey store) with SSR, standalone components, zoneless change detection, and Tailwind CSS v4. Package manager is **Bun**.

## Build / Serve / Test Commands

```bash
# Install dependencies
bun install

# Development server (with SSR, defaults to development config)
bun run start          # or: npx ng serve

# Production build
bun run build          # or: npx ng build

# Run all tests
bun run test           # or: npx jest

# Run a single test file
npx jest src/app/featured/jerseys/components/card-jersey/card-jersey.spec.ts

# Run tests matching a pattern
npx jest --testPathPattern="card-jersey"

# Run tests with coverage
npx jest --coverage

# Serve the SSR production build
bun run serve:ssr:LVJersey-client
```

There is **no ESLint** configured. Prettier is configured inline in `package.json` (100 char width, single quotes, Angular HTML parser). No lint command exists.

## Path Aliases

Defined in `tsconfig.json` and mirrored in `jest.config.ts`:

| Alias | Maps to |
|-------|---------|
| `@src/*` | `./src/*` |
| `@app/*` | `./src/app/*` |

Prefer `@src/` for cross-feature imports. Use relative imports only within the same feature folder.

## Project Structure

```
src/
  environments/              # environment.ts, environment.development.ts, environment.prod.ts
  interceptors/              # HTTP interceptors (functional)
  app/
    app.ts                   # Root component
    app.config.ts            # App providers, interceptors, routing
    app.routes.ts            # Top-level routes with lazy loading
    featured/                # Feature modules (feature-based organization)
      auth/                  # adapters/, components/, guards/, model/, pages/, services/, utilities/
      categories/            # components/, models/
      home/                  # pages/
      jerseys/               # components/, models/, pages/
    shared/                  # Cross-feature reusable code
      components/            # Generic UI components (button, input, etc.)
      header/                # App header + navbar + search
      layout/                # Page layout wrapper
      services/              # App-wide services
      theme/                 # Dark/light theme service
    icon/                    # SVG icon components (inline templates)
```

Each component/page gets its own folder containing a `.ts` file, an `.html` template, and optionally a `.spec.ts` test.

## Code Style Guidelines

### TypeScript

- **Strict mode** is enabled with `noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noPropertyAccessFromIndexSignature`
- **Never use `any`** — use `unknown` when the type is uncertain
- Prefer **type inference** when the type is obvious
- Use **`interface`** for data models (not `type`, unless defining a union)
- Target is ES2022; use modern JS features freely

### Formatting (Prettier)

- Print width: **100** characters
- **Single quotes** for TypeScript
- HTML files use the **Angular parser**
- Indent: **2 spaces** (from `.editorconfig`)
- Insert final newline, trim trailing whitespace

### Angular Components

- **All components are standalone** — do NOT set `standalone: true` (it is the default in Angular 20)
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in every `@Component` decorator
- Use `input()` and `output()` signal functions — NOT `@Input()` / `@Output()` decorators
- Use `computed()` for derived state
- Use native control flow in templates: `@if`, `@for`, `@switch` — NOT `*ngIf`, `*ngFor`, `*ngSwitch`
- Do NOT use `ngClass` or `ngStyle` — use `class` and `style` bindings instead
- Do NOT use `@HostBinding` or `@HostListener` — use the `host` property in the decorator
- Use `NgOptimizedImage` for all static images (does not work for inline base64)
- Small icon components use **inline templates**; all others use `templateUrl`
- Prefer **Reactive forms** over Template-driven forms
- Selector prefix: `app-`

### Services & Dependency Injection

- Use `providedIn: 'root'` for singleton services
- Use the `inject()` function — NOT constructor injection
- Use `InjectionToken` for abstracting implementations (see `injection-tokens.ts`)

### State Management

- Use **Angular Signals** (`signal()`, `computed()`) for reactive state
- Do NOT use `mutate` on signals — use `update()` or `set()`
- No external state library (no NgRx, no Redux)
- Services act as centralized stores holding signals

### API / HTTP

- Use Angular `HttpClient` via `inject(HttpClient)`
- Base URL comes from `environment.apiUrl`
- Always pipe with `takeUntilDestroyed(this.destroyRef)` on HTTP subscriptions
- Use `catchError` + `EMPTY` for error handling inside services
- Adapter pattern for response mapping (see `authAdapter.ts`)

### Error Handling

- Catch HTTP errors with RxJS `catchError` in services
- Set an error signal, auto-clear after 3 seconds with `setTimeout`
- Display error banners in templates via `@if(errorResponse().error)`
- Global error transformation is in `src/interceptors/responseTransformInterceptor.ts`

### Styling

- **Tailwind CSS v4** — utility classes directly in HTML templates
- No component CSS files, no CSS modules, no SCSS
- Custom theme tokens defined in `src/styles.css` via `@theme` directives
- Dark mode via `data-theme` attribute and `dark:` variant classes
- Custom breakpoint: `3xl: 120rem`

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Files & folders | kebab-case | `card-jersey.ts`, `login-api.ts` |
| Classes (components) | PascalCase | `CardJersey`, `HomePage`, `Login` |
| Classes (services) | PascalCase | `LoginApi`, `UserAuthentication` |
| Interfaces | PascalCase | `JerseyCard`, `ResponseAuth` |
| Variables & methods | camelCase | `selectedSize`, `toggleFavorite()` |
| Signals | camelCase (no suffix required) | `loading`, `tokenSignal` |
| Component selectors | `app-` prefix, kebab-case | `app-card-jersey` |
| Route files | `*.routes.ts` | `auth.routes.ts`, `jersey.routes.ts` |
| Model files | kebab-case in `model/` or `models/` folder | `jersey-card.ts` |
| Test files | Co-located `*.spec.ts` | `card-jersey.spec.ts` |

### Imports

1. Angular framework (`@angular/core`, `@angular/common`, `@angular/router`, `@angular/forms`)
2. Third-party libraries (`rxjs`, `@fortawesome/*`)
3. Application imports (`@src/...` alias for cross-feature, relative for same-feature)

### Testing

- **Jest 30** with `jest-preset-angular` and zoneless setup
- Test files are **co-located** with source files as `*.spec.ts`
- Standalone components are imported directly in `TestBed.configureTestingModule({ imports: [...] })`
- Standard structure: `describe` > `beforeEach` (TestBed setup) > `it` blocks

### Route Definitions

- Feature routes are defined in `*.routes.ts` files and lazy-loaded from `app.routes.ts`
- Use `loadComponent` with dynamic imports: `loadComponent: () => import('./path').then(m => m.Component)`
- Use `loadChildren` to lazy-load entire feature route sets

## Environment Configuration

Environment files are in `src/environments/`. Angular CLI handles file replacement at build time (configured in `angular.json`). Do NOT use `.env` files.

## SSR

Server-side rendering is enabled via `@angular/ssr` with Express 5. Entry point: `src/server.ts`. Use `SsrCookieService` (wrapping `ngx-cookie-service`) for cookie access that works in both browser and server contexts.
