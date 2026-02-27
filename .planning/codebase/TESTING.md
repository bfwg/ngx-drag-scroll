# Testing Guide

## Framework Stack

| Tool                             | Version | Purpose                     |
| -------------------------------- | ------- | --------------------------- |
| Jasmine                          | ~5.1.1  | Test framework & assertions |
| Karma                            | ~6.4.2  | Test runner                 |
| karma-chrome-launcher            | ~3.2.0  | Browser execution           |
| karma-jasmine-html-reporter      | ^2.1.0  | HTML test results           |
| karma-coverage-istanbul-reporter | ^3.0.3  | Code coverage               |

## Test Commands

```bash
# Run tests once (CI mode)
npm test              # Runs: ng test --watch=false

# Run tests in watch mode
ng test
```

## Test File Structure

### Location

- Tests co-located with source files
- Naming: `*.spec.ts` suffix
- Library tests: `projects/ngx-drag-scroll/src/lib/*.spec.ts`
- App tests: `src/app/*.spec.ts`

### Directory Layout

```
projects/ngx-drag-scroll/src/lib/
├── ngx-drag-scroll.component.ts
├── ngx-drag-scroll.component.spec.ts    # ~1000 lines
├── ngx-drag-scroll-item.ts
└── interface/
    ├── drag-scroll-element.ts
    └── drag-scroll-option.ts

src/app/
├── app.component.ts
└── app.component.spec.ts                # ~48 lines
```

## Test Environment Setup

### Test Bootstrap (`test.ts`)

```typescript
import 'zone.js/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { getTestBed } from '@angular/core/testing';

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
```

### Karma Configuration (`karma.conf.js`)

```javascript
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    browsers: ['Chrome'],
    reporters: ['progress', 'kjhtml'],
    coverageIstanbulReporter: {
      dir: 'coverage/ngx-drag-scroll',
      reports: ['html', 'lcovonly']
    }
  });
};
```

## Test Patterns

### Test Structure

```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Component, Directive, ...],
      providers: [{ provide: DOCUMENT, useValue: document }]
    });
  });

  it('should do something', waitForAsync(() => {
    // Arrange
    TestBed.overrideComponent(TestComponent, {
      set: { template: `<component></component>` }
    });

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      // Act
      // ...

      // Assert
      expect(result).toBe(expected);
    });
  }));
});
```

### Host Component Pattern

Tests use a wrapper `TestComponent` for complex component testing:

```typescript
@Component({
  selector: 'app-test-component',
  template: '',
  imports: [DragScrollItemDirective, DragScrollComponent]
})
class TestComponent {
  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;
  elementClicked = false;

  elementOnClicked() {
    this.elementClicked = true;
  }

  moveLeft() {
    this.ds.moveLeft();
  }
}
```

### Template Override Pattern

Dynamically override templates per test:

```typescript
TestBed.overrideComponent(TestComponent, {
  set: {
    template: `
      <drag-scroll style="width: 50px; height: 50px;">
        <div drag-scroll-item style="width: 300px; height: 300px;"></div>
      </drag-scroll>
    `
  }
});
```

## Async Testing

### `waitForAsync` (Recommended)

For tests with async operations and promises:

```typescript
it('should handle async', waitForAsync(() => {
  TestBed.compileComponents().then(() => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(something).toBeTruthy();
  });
}));
```

### `fakeAsync` + `flush`

For testing timing-dependent code (animations, timeouts):

```typescript
it('should animate scroll', fakeAsync(() => {
  // ...setup...
  fixture.componentInstance.ds.moveRight();
  flush(500); // Fast-forward 500ms
  expect(compiled.nativeElement.scrollLeft).toBe(50);
}));
```

### Callback-based (`done`)

For event subscriptions and observables:

```typescript
it('should emit on snap finish', (done) => {
  compiled.componentInstance.snapAnimationFinished.subscribe((result) => {
    expect(result).toBe(2);
    done();
  });
  // trigger action
});
```

## DOM Event Simulation

### Mouse Events

```typescript
// Trigger on element
compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));

// Dispatch on document
document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: -100 }));
document.dispatchEvent(new MouseEvent('mouseup'));
```

### Wheel Events

```typescript
const fakeWheelEvent = new WheelEvent('wheel');
spyOnProperty(fakeWheelEvent, 'deltaY').and.returnValue(-1);
dragScroll.dispatchEvent(fakeWheelEvent);
```

### Window Events

```typescript
window.dispatchEvent(new Event('resize'));
```

## Mocking Patterns

### Provider Mocking

```typescript
TestBed.configureTestingModule({
  providers: [{ provide: DOCUMENT, useValue: document }]
});
```

### Signal Mocking

For input signals that need dynamic values:

```typescript
fixture.componentInstance.ds.snapDisabled = signal(true) as unknown as typeof fixture.componentInstance.ds.snapDisabled;
fixture.detectChanges();
```

### Spies

```typescript
// Method spy
spyOn(fixture.componentInstance.ds, 'onMouseMove');

// Output spy
spyOn(fixture.componentInstance.ds.indexChanged, 'emit');
expect(fixture.componentInstance.ds.indexChanged.emit).toHaveBeenCalledWith(1);

// Property spy
spyOnProperty(fakeWheelEvent, 'deltaY').and.returnValue(-1);
```

## Query Selectors

### Debug Element Queries

```typescript
// By CSS selector
const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));
const items = fixture.debugElement.queryAll(By.css('.ds-item'));

// By directive
const dragScroll = fixture.debugElement.query(By.css('drag-scroll'));
```

### Native Element Access

```typescript
fixture.nativeElement.querySelector('.item').click();
const dragScrollWrapper = fixture.nativeElement.querySelector('.drag-scroll-wrapper');
```

## Assertion Patterns

### Basic Assertions

```typescript
expect(app).toBeTruthy();
expect(compiled.nativeElement.scrollLeft).toBe(100);
expect(fixture.componentInstance.elementClicked).toBeFalsy();
```

### Style Assertions

```typescript
expect(compiled.nativeElement.style['overflow-x']).toBe('hidden');
expect(compiled.nativeElement.style.width).toBe('calc(100% + 15px)');
expect(window.getComputedStyle(compiled.nativeElement).height).toBe('50px');
```

### Spy Assertions

```typescript
expect(handler.emit).toHaveBeenCalledWith(1);
expect(handler.emit).toHaveBeenCalledTimes(3);
expect(handler.emit).not.toHaveBeenCalled();
```

### No-op Assertions

For tests that verify no errors thrown:

```typescript
expect().nothing();
```

## Coverage

### Configuration

Coverage output: `coverage/ngx-drag-scroll/`
Reports: HTML and lcovonly formats

### Running with Coverage

```bash
ng test --code-coverage
```

## Test Categories

### Unit Tests Present

1. **Component initialization** - Empty content, items without directives
2. **Drag behavior** - Horizontal, vertical, disabled states
3. **Scroll control** - X/Y disabled, drag disabled per item
4. **Scrollbar visibility** - Hide/show, dimension calculations
5. **Snap behavior** - Offset, duration, animation events
6. **Navigation** - moveLeft, moveRight, moveTo
7. **Event emissions** - indexChanged, snapAnimationFinished, dragStart/End
8. **Mouse event lifecycle** - mousedown, mousemove, mouseup
9. **Wheel scrolling** - With/without snap
10. **Window resize** - Wrapper dimension updates
11. **Pointer events** - Propagation control during drag

### Integration Patterns

- Tests verify component interactions with DOM
- Event sequences (mousedown -> mousemove -> mouseup)
- Parent-child component communication via ViewChild
