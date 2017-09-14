import {
  Component,
  Output,
  Renderer,
  ElementRef
} from '@angular/core';
import { DragScroll, DragScrollSnap } from '../../src/index';

import {
  By
} from '@angular/platform-browser';

import {
  inject,
  async,
  TestBed
} from '@angular/core/testing';


function getScrollbarWidth(): number {
  /**
   * Browser Scrollbar Widths (2016)
   * OSX (Chrome, Safari, Firefox) - 15px
   * Windows XP (IE7, Chrome, Firefox) - 17px
   * Windows 7 (IE10, IE11, Chrome, Firefox) - 17px
   * Windows 8.1 (IE11, Chrome, Firefox) - 17px
   * Windows 10 (IE11, Chrome, Firefox) - 17px
   * Windows 10 (Edge 12/13) - 12px
   */
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  // force scrollbars
  outer.style.overflow = 'scroll';

  // add innerdiv
  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;

  // remove divs
  outer.parentNode.removeChild(outer);
  /**
   * Scrollbar width will be 0 on Mac OS with the
   * default "Only show scrollbars when scrolling" setting (Yosemite and up).
   * setting defult with to 20;
   */
  return widthNoScroll - widthWithScroll || 20;
}



@Component({
  selector: 'app-test-component',
  template: ''
})
export class TestComponent {
}

describe('Component: DragScroll', () => {
  const scrollbarWidth = getScrollbarWidth() + 'px';
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, DragScroll, DragScrollSnap]
    });
  });

  it('should drag to scroll horizontally and vertically', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<div style="width: 50px; height: 50px;" drag-scroll>
                  <div style="width: 300px; height: 300px;"></div>
                </div>`
    }});

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      // const compiled = fixture.debugElement.query(By.directive(DragScroll));
      const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));


      compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove', {bubbles: true, clientX: -100}));
      document.dispatchEvent(new MouseEvent('mouseup'));

      // expect(compiled.nativeElement.scrollLeft).toBe(100);
      expect(compiled.nativeElement.scrollLeft).toBe(100);

      compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove', {bubbles: true, clientY: -123}));
      document.dispatchEvent(new MouseEvent('mouseup'));

      expect(compiled.nativeElement.scrollTop).toBe(123);
    });
  }));

  it('should disable drag and scroll horizontally and vertically', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<div style="width: 50px; height: 50px;" drag-scroll drag-scroll-disabled="true">
                  <div style="width: 300px; height: 300px;"></div>
                </div>`
    }});

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));

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
      template: `<div style="width: 50px; height: 50px;" drag-scroll drag-scroll-x-disabled="true">
                  <div style="width: 300px; height: 300px;"></div>
                </div>`
    }});

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));

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
      template: `<div style="width: 50px; height: 50px;" drag-scroll drag-scroll-y-disabled="true">
                  <div style="width: 300px; height: 300px;"></div>
                </div>`
    }});

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));

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
      template: `<div style="width: 50px; height: 350px;" drag-scroll scrollbar-hidden="true">
                  <div style="width: 300px; height: 300px;"></div>
                </div>`
    }});
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));
      expect(compiled.nativeElement.style.width).toBe('100%');
      expect(compiled.nativeElement.style.height).toBe(`calc(100% + ${scrollbarWidth})`);
    });
  }));

  it('should only hide vertical scroll bar', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<div style="width: 350px; height: 50px;" drag-scroll scrollbar-hidden="true">
                  <div style="width: 300px; height: 300px;"></div>
                </div>`
    }})
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));
      expect(compiled.nativeElement.style.width).toBe(`calc(100% + ${scrollbarWidth})`);
      expect(compiled.nativeElement.style.height).toBe('100%');
    });
  }));

  it('should hide all scroll bars', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<div style="width: 50px; height: 50px;" drag-scroll scrollbar-hidden="true">
                  <div style="width: 300px; height: 300px;"></div>
                </div>`
    }});
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));
      expect(compiled.nativeElement.style.width).toBe(`calc(100% + ${scrollbarWidth})`);
      expect(compiled.nativeElement.style.height).toBe(`calc(100% + ${scrollbarWidth})`);
    });
  }));

  it('should not trying to hide the scrollbar when there are nothing to hide', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<div style="width: 50px; height: 50px;" drag-scroll>
                  <div style="width: 49px; height: 49px;"></div>
                </div>`
    }});
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const compiled = fixture.debugElement.query(By.directive(DragScroll));
      expect(compiled.nativeElement.style.width).toBe('50px');
      expect(compiled.nativeElement.style.height).toBe('50px');
    });
  }));

});

