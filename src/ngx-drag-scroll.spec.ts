import {
  Component,
  Output,
  Renderer2,
  ElementRef
} from '@angular/core';
import { DragScrollDirective } from './ngx-drag-scroll';

import {
  By
} from '@angular/platform-browser';

import {
  inject,
  async,
  TestBed
} from '@angular/core/testing';

@Component({
  selector: 'app-test-component',
  template: ''
})
class TestComponent {
}

describe('Directive: DragScrollDirective', () => {
  const scrollbarWidth = '15px';
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, DragScrollDirective]
    });
  });

  it('should drag to scroll horizontally and vertically', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<div style="width: 50px; height: 50px;" dragScroll>
                  <div style="width: 300px; height: 300px;"></div>
                </div>`
    }});

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.directive(DragScrollDirective));


      compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove', {bubbles: true, clientX: -100}));
      document.dispatchEvent(new MouseEvent('mouseup'));

      expect(compiled.nativeElement.scrollLeft).toBe(100);

      compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove', {bubbles: true, clientY: -123}));
      document.dispatchEvent(new MouseEvent('mouseup'));

      expect(compiled.nativeElement.scrollTop).toBe(123);
    });
  }));

  it('should disable drag and scroll horizontally and vertically', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<div style="width: 50px; height: 50px;" dragScroll drag-scroll-disabled="true">
                  <div style="width: 300px; height: 300px;"></div>
                </div>`
    }});

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.directive(DragScrollDirective));

      compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove', {bubbles: true, clientX: -100}));
      document.dispatchEvent(new MouseEvent('mouseup'));

      expect(compiled.nativeElement.style['overflow-x']).toBe('hidden');
      expect(compiled.nativeElement.scrollLeft).toBe(0);

      compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove', {bubbles: true, clientY: -123}));
      document.dispatchEvent(new MouseEvent('mouseup'));

      expect(compiled.nativeElement.style['overflow-y']).toBe('hidden');
      expect(compiled.nativeElement.scrollTop).toBe(0);
    });
  }));

  it('should disable drag and scroll horizontally', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<div style="width: 50px; height: 50px;" dragScroll drag-scroll-x-disabled="true">
                  <div style="width: 300px; height: 300px;"></div>
                </div>`
    }});

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.directive(DragScrollDirective));

      compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove', {bubbles: true, clientX: -100}));
      document.dispatchEvent(new MouseEvent('mouseup'));

      expect(compiled.nativeElement.style['overflow-x']).toBe('hidden');
      expect(compiled.nativeElement.scrollLeft).toBe(0);

      compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove', {bubbles: true, clientY: -123}));
      document.dispatchEvent(new MouseEvent('mouseup'));

      expect(compiled.nativeElement.style['overflow-y']).toBe('auto');
      expect(compiled.nativeElement.scrollTop).toBe(123);
    });
  }));

  it('should disable drag and scroll horizontally', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<div style="width: 50px; height: 50px;" dragScroll drag-scroll-y-disabled="true">
                  <div style="width: 300px; height: 300px;"></div>
                </div>`
    }});

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.directive(DragScrollDirective));

      compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove', {bubbles: true, clientX: -100}));
      document.dispatchEvent(new MouseEvent('mouseup'));

      expect(compiled.nativeElement.style['overflow-x']).toBe('auto');
      expect(compiled.nativeElement.scrollLeft).toBe(100);

      compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove', {bubbles: true, clientY: -123}));
      document.dispatchEvent(new MouseEvent('mouseup'));

      expect(compiled.nativeElement.style['overflow-y']).toBe('hidden');
      expect(compiled.nativeElement.scrollTop).toBe(0);
    });
  }));

  it('should only hide horizontal scroll bar', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<div style="width: 50px; height: 350px;" dragScroll scrollbar-hidden="true">
                  <div style="width: 300px; height: 300px;"></div>
                </div>`
    }});
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.directive(DragScrollDirective));
      expect(compiled.nativeElement.style.width).toBe('100%');
      expect(compiled.nativeElement.style.height).toBe(`calc(100% + ${scrollbarWidth})`);
    });
  }));

  it('should only hide vertical scroll bar', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<div style="width: 350px; height: 50px;" dragScroll scrollbar-hidden="true">
                  <div style="width: 300px; height: 300px;"></div>
                </div>`
    }});
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.directive(DragScrollDirective));
      expect(compiled.nativeElement.style.width).toBe(`calc(100% + ${scrollbarWidth})`);
      expect(compiled.nativeElement.style.height).toBe('100%');
    });
  }));

  it('should hide all scroll bars', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<div style="width: 50px; height: 50px;" dragScroll scrollbar-hidden="true">
                  <div style="width: 300px; height: 300px;"></div>
                </div>`
    }});
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const compiled = fixture.debugElement.query(By.directive(DragScrollDirective));
      expect(compiled.nativeElement.style.width).toBe(`calc(100% + ${scrollbarWidth})`);
      expect(compiled.nativeElement.style.height).toBe(`calc(100% + ${scrollbarWidth})`);
    });
  }));

  it('should not trying to hide the scrollbar when there are nothing to hide', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<div style="width: 50px; height: 50px;" dragScroll>
                  <div style="width: 49px; height: 49px;"></div>
                </div>`
    }});
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const compiled = fixture.debugElement.query(By.directive(DragScrollDirective));
      expect(compiled.nativeElement.style.width).toBe('50px');
      expect(compiled.nativeElement.style.height).toBe('50px');
    });
  }));

});

