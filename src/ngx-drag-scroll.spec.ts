import {
  Component,
  Output,
  Renderer2,
  ElementRef,
  ViewChild
} from '@angular/core';
import { DragScrollDirective } from './ngx-drag-scroll';

import {
  By
} from '@angular/platform-browser';

import {
  inject,
  async,
  TestBed,
  fakeAsync,
  flush
} from '@angular/core/testing';

@Component({
  selector: 'app-test-component',
  template: ''
})
class TestComponent {
  @ViewChild('nav', {read: DragScrollDirective}) ds: DragScrollDirective;
  elementClicked = false;

  elementOnClicked(event) {
    console.log('clicked');
    this.elementClicked = true;
  }
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

  it('should not show part of previous element on snap when snap-offset is not set', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<div style="width: 100px; height: 100px;" dragScroll>
                  <img style="width: 50px; height: 100px;"/>
                  <img style="width: 50px; height: 100px;"/>
                  <img style="width: 50px; height: 100px;"/>
                </div>`
    }});
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.directive(DragScrollDirective));

      compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove', {bubbles: true, clientX: -45}));
      document.dispatchEvent(new MouseEvent('mouseup'));

      fixture.whenRenderingDone().then(() => expect(compiled.nativeElement.scrollLeft).toBe(50));
    });
  }));

  it('should show part of previous element on snap when snap-offset is set', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<div style="width: 100px; height: 100px;" dragScroll snap-offset="10">
                  <img style="width: 50px; height: 100px;"/>
                  <img style="width: 50px; height: 100px;"/>
                  <img style="width: 50px; height: 100px;"/>
                </div>`
    }});
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.directive(DragScrollDirective));

      compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove', {bubbles: true, clientX: -45}));
      document.dispatchEvent(new MouseEvent('mouseup'));

      fixture.whenRenderingDone().then(() => expect(compiled.nativeElement.scrollLeft).toBe(40));
    });
  }));

  it('should not show part of previous element on moveRight/moveLeft when snap-offset is not set', fakeAsync(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<div style="width: 100px; height: 100px; font-size: 0;" dragScroll #nav>
      <div style="width: 50px; height: 100px; display: inline-block;"></div>
      <div style="width: 50px; height: 100px; display: inline-block;"></div>
      <div style="width: 50px; height: 100px; display: inline-block;"></div>
    </div>`
    }});
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.directive(DragScrollDirective));

      fixture.componentInstance.ds.moveRight();
      flush(500);
      expect(compiled.nativeElement.scrollLeft).toBe(50);

      fixture.componentInstance.ds.moveLeft();
      flush(500);
      expect(compiled.nativeElement.scrollLeft).toBe(0);
    });
  }));

  it('should show part of previous element on moveRight/moveLeft when snap-offset is set', fakeAsync(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<div style="width: 100px; height: 100px; font-size: 0;" dragScroll #nav snap-offset="10">
      <div style="width: 50px; height: 100px; display: inline-block;"></div>
      <div style="width: 50px; height: 100px; display: inline-block;"></div>
      <div style="width: 50px; height: 100px; display: inline-block;"></div>
    </div>`
    }});
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.directive(DragScrollDirective));

      fixture.componentInstance.ds.moveRight();
      flush(500);
      expect(compiled.nativeElement.scrollLeft).toBe(40);

      fixture.componentInstance.ds.moveRight();
      flush(500);
      expect(compiled.nativeElement.scrollLeft).toBe(50);

      fixture.componentInstance.ds.moveLeft();
      flush(500);
      expect(compiled.nativeElement.scrollLeft).toBe(40);

      fixture.componentInstance.ds.moveLeft();
      flush(500);
      expect(compiled.nativeElement.scrollLeft).toBe(0);
    });
  }));

  it('should not trigger onclick event on elements when drag', () => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<div style="width: 50px; height: 50px;" dragScroll>
                  <div class="item" (click)="elementOnClicked()" style="width: 300px; height: 300px;"></div>
                </div>`
    }});

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.directive(DragScrollDirective));

      fixture.nativeElement.querySelector('.item').click();
      expect(fixture.componentInstance.elementClicked).toBeTruthy();
      // reset
      fixture.componentInstance.elementClicked = false;

      compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove', {bubbles: true, clientX: -100}));
      document.dispatchEvent(new MouseEvent('mouseup'));
      expect(fixture.componentInstance.elementClicked).toBeFalsy();
    });
  });
});

