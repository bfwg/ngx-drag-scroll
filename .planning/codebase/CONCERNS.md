# CONCERNS: ngx-drag-scroll

Technical debt, bugs, security, performance, and fragile areas.

---

## 1. DEPENDENCY CONCERNS

### Critical: Angular Material/CDK Version Mismatch

- **Location:** `package.json:14-15`
- **Issue:** Angular CDK/Material v18.0.4 with Angular v19.2.10
- **Risk:** Potential compatibility issues, runtime errors
- **Recommendation:** Upgrade to `@angular/cdk@19.x` and `@angular/material@19.x`

### Outdated Dependencies

- **Location:** `package.json` (devDependencies)
- **Issues:**
  - `eslint@8.57.0` (v10 available)
  - `husky@8.0.3` (v9 available)
  - `@commitlint/cli@19.3.0` (v20 available)
  - `core-js@3.34.0` (v3.48 available)
  - `zone.js@0.15.0` (v0.16 available)
- **Risk:** Missing security patches, newer features
- **Priority:** Medium

### Wide Peer Dependency Range

- **Location:** `projects/ngx-drag-scroll/package.json:29-32`
- **Issue:** `@angular/core: ">=5.0.0 <20.0.0"` is overly broad
- **Risk:** Claims support for Angular 5-19 but likely untested on older versions
- **Recommendation:** Narrow to actually tested versions (e.g., `>=14.0.0 <20.0.0`)

---

## 2. CODE QUALITY ISSUES

### Large Monolithic Component (941 lines)

- **Location:** `projects/ngx-drag-scroll/src/lib/ngx-drag-scroll.component.ts`
- **Issue:** Single component handles all drag, scroll, snap, and animation logic
- **Risk:** Hard to maintain, test, and extend
- **Recommendation:** Extract concerns:
  - `DragHandler` service for mouse/touch events
  - `SnapEngine` for snap calculations
  - `ScrollAnimator` for easing animations

### Timer Type Union Smell

- **Location:** `ngx-drag-scroll.component.ts:72-74`

```typescript
scrollTimer: number | NodeJS.Timer = -1;
scrollToTimer: number | NodeJS.Timer = -1;
```

- **Issue:** Mixed browser/Node.js timer types indicate SSR confusion
- **Risk:** Type safety issues, potential runtime problems
- **Recommendation:** Use `ReturnType<typeof setTimeout>` or `number` with proper SSR handling

### Missing Type Annotations

- **Location:** `src/app/home/home.component.ts:28-31`

```typescript
hideScrollbar;
disabled;
xDisabled;
yDisabled;
```

- **Issue:** Implicit `any` types
- **Risk:** Runtime errors, reduced IDE support
- **Recommendation:** Add explicit boolean types

### Callback Hell Pattern

- **Location:** `ngx-drag-scroll.component.ts:760-806` (`locateCurrentIndex` method)
- **Issue:** Complex callback-based `currentChildWidth` iteration pattern
- **Risk:** Hard to debug, error-prone
- **Recommendation:** Refactor to simple array iteration with early return

---

## 3. PERFORMANCE CONCERNS

### setTimeout in Scroll Handler

- **Location:** `ngx-drag-scroll.component.ts:368-372`

```typescript
this.scrollTimer = setTimeout(() => {
  this.isScrolling = false;
  this.locateCurrentIndex(true);
}, 500);
```

- **Issue:** Creates new timer on every scroll event
- **Risk:** Performance degradation during rapid scrolling
- **Recommendation:** Use debounce utility or `requestAnimationFrame`

### setTimeout-based Animation Loop

- **Location:** `ngx-drag-scroll.component.ts:741-754`

```typescript
const animateScroll = () => {
  currentTime += increment;
  element.scrollLeft = easeInOutQuad(currentTime, start, change, duration);
  if (currentTime < duration) {
    this.scrollToTimer = setTimeout(animateScroll, increment);
  }
};
```

- **Issue:** Uses `setTimeout` with 20ms increment instead of `requestAnimationFrame`
- **Risk:** Jank on 60fps displays, battery drain
- **Recommendation:** Replace with `requestAnimationFrame` for smoother animations

### AfterViewChecked Runs Frequently

- **Location:** `ngx-drag-scroll.component.ts:278-286`
- **Issue:** `ngAfterViewChecked` runs on every change detection cycle
- **Risk:** Performance overhead if children count check is expensive
- **Current mitigation:** Length comparison guard exists but still runs every cycle

### Scrollbar Width Calculation Creates DOM Elements

- **Location:** `ngx-drag-scroll.component.ts:653-690`
- **Issue:** `getScrollbarWidth()` creates/removes DOM elements on every component init
- **Risk:** Layout thrashing if many instances exist
- **Recommendation:** Cache scrollbar width globally or use CSS-based approach

---

## 4. POTENTIAL BUGS

### Event Listener Cleanup Race Condition

- **Location:** `ngx-drag-scroll.component.ts:294-306`
- **Issue:** `ngOnDestroy` nullifies listeners but global listeners (`mousemove`, `mouseup`) on document may still fire
- **Scenario:** Fast unmount during drag operation
- **Recommendation:** Add null checks in handlers or use RxJS `takeUntil` pattern

### Index Boundary Not Enforced

- **Location:** `ngx-drag-scroll.component.ts:122-127`, test at line 863-879

```typescript
set currIndex(value) {
  if (value !== this._index) {
    this._index = value;
    this.indexChanged.emit(value);
  }
}
```

- **Issue:** Allows setting arbitrary index values (test confirms `currIndex = 9001` works)
- **Risk:** Invalid state, out-of-bounds access
- **Note:** Marked as "backwards compatibility" but is still technical debt

### RTL Detection Only at Init

- **Location:** `ngx-drag-scroll.component.ts:272-275`

```typescript
this.rtl = getComputedStyle(this._contentRef.nativeElement).getPropertyValue('direction') === 'rtl';
```

- **Issue:** Direction read once in `ngAfterViewInit`, never updated
- **Risk:** Dynamic RTL/LTR switching won't work
- **Recommendation:** Use `MutationObserver` or check in relevant methods

### Touch/Mouse Event Handler Mismatch

- **Location:** `ngx-drag-scroll.component.ts:352`

```typescript
const isTouchEvent = event.type === 'touchstart';
```

- **Issue:** `onMouseDownHandler` checks for touch but receives `MouseEvent` type
- **Risk:** This check will always be false since handler is bound to `mousedown`
- **Recommendation:** Create separate touch handlers or unify event handling

---

## 5. FRAGILE AREAS

### Scrollbar Hiding via DOM Manipulation

- **Location:** `ngx-drag-scroll.component.ts:563-616`
- **Issue:** Complex DOM restructuring (creating wrapper, moving content)
- **Risk:** Breaks easily with Angular structural changes
- **Recommendation:** Consider CSS-only solutions (`::-webkit-scrollbar`, `scrollbar-width`)

### Global Document Listeners

- **Location:** `ngx-drag-scroll.component.ts:515-532`
- **Issue:** Attaches listeners to `document` for drag tracking
- **Risk:** Memory leaks if cleanup fails, conflicts with other drag libraries
- **Recommendation:** Use `@HostListener` with `window:` prefix or Angular's event manager

### Children Query with Descendants

- **Location:** `ngx-drag-scroll.component.ts:110-111`

```typescript
@ContentChildren(DragScrollItemDirective, { descendants: true })
_children: QueryList<DragScrollItemDirective>;
```

- **Issue:** `descendants: true` searches entire subtree
- **Risk:** May capture unintended nested items
- **Note:** Documented behavior but could surprise users

---

## 6. TEST COVERAGE GAPS

### No SSR Tests

- **Location:** Missing from test suite
- **Issue:** No tests for server-side rendering scenarios
- **Risk:** `window`, `document` access may break SSR
- **Note:** Code has `typeof window !== 'undefined'` guards but untested

### Missing Edge Cases

- **Issues not tested:**
  - Dynamic RTL switching
  - Rapid mount/unmount cycles
  - Multiple drag-scroll instances interacting
  - Touch + mouse simultaneous input
  - Zero-width/height containers

### Test Uses Signal Mocking Hack

- **Location:** `ngx-drag-scroll.component.spec.ts:804-806`

```typescript
fixture.componentInstance.ds.snapDisabled = signal(false) as unknown as typeof fixture.componentInstance.ds.snapDisabled;
```

- **Issue:** Replaces input signal with manual signal, bypasses Angular's input system
- **Risk:** Tests may pass but actual behavior differs

---

## 7. SECURITY CONSIDERATIONS

### No XSS Concerns (Low Risk)

- Component doesn't render user-provided HTML
- Uses Angular's binding system safely

### DOM Manipulation Safety

- **Location:** `ngx-drag-scroll.component.ts:668`

```typescript
this._renderer.appendChild(this._document.body, outer);
```

- **Issue:** Appends elements to `document.body`
- **Risk:** Low, but elements could persist if error occurs during measurement
- **Current state:** Cleanup exists at line 682

---

## 8. MAINTAINABILITY DEBT

### No Strict TypeScript

- **Location:** `tsconfig.json`
- **Missing:** `strict: true`, `strictNullChecks`, `noImplicitAny`
- **Risk:** Type errors slip through

### Unused Interface

- **Location:** `projects/ngx-drag-scroll/src/lib/interface/drag-scroll-option.ts`
- **Issue:** `DragScrollOption` interface exported but not used internally
- **Risk:** API contract drift

### Inconsistent Input Naming

- **Issue:** Mix of kebab-case aliases with camelCase property names
  - `scrollbar-hidden` -> `scrollbarHidden`
  - `drag-scroll-disabled` -> `disabled`
  - `snap-duration` -> `snapDuration`
- **Risk:** API inconsistency for consumers

### Magic Numbers

- **Location:** `ngx-drag-scroll.component.ts:372`, `720-721`
- **Issues:**
  - `500` ms scroll debounce
  - `20` ms animation increment
  - `20` px default scrollbar width fallback
- **Recommendation:** Extract to named constants

---

## 9. CI/CD CONCERNS

### Single Node Version

- **Location:** `.github/workflows/*.yml`
- **Issue:** Only tests on `lts/iron` (Node 20)
- **Risk:** Compatibility issues with other Node versions

### Missing Coverage Reporting

- **Location:** CI workflow
- **Issue:** Tests run but no coverage threshold enforcement
- **Recommendation:** Add `karma-coverage` with minimum threshold

### Outdated Travis Badge

- **Location:** `README.md:7`
- **Issue:** Travis CI badge but project uses GitHub Actions
- **Risk:** Misleading build status

---

## 10. RECOMMENDED PRIORITY

### High Priority

1. Fix Angular CDK/Material version mismatch
2. Replace `setTimeout` animation with `requestAnimationFrame`
3. Add strict TypeScript mode

### Medium Priority

4. Refactor large component into services
5. Add SSR tests
6. Fix timer type annotations
7. Update outdated dependencies

### Low Priority

8. CSS-only scrollbar hiding
9. Narrow peer dependency range
10. Add coverage thresholds
