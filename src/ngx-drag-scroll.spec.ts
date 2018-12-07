import {
  Component,
  ViewChild
} from '@angular/core';
import {
  By
} from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

import { DragScrollComponent } from './ngx-drag-scroll';
import { DragScrollModule } from './ngx-drag-scroll.module';

import {
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
  @ViewChild('nav', {read: DragScrollComponent}) ds: DragScrollComponent;
  elementClicked = false;

  elementOnClicked() {
    this.elementClicked = true;
  }

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  onIndexChanged(idx) {
    console.log('current index: ' + idx);
  }
}

describe('DragScrollComponent', () => {
  const scrollbarWidth = '15px';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DragScrollModule],
      declarations: [TestComponent],
      providers: [
        { provide: DOCUMENT, useValue: document }
      ]
    });
  });

  it('should drag to scroll horizontally and vertically', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<drag-scroll style="width: 50px; height: 50px;">
                   <div drag-scroll-item style="width: 300px; height: 300px;"></div>
                 </drag-scroll>`
    }});

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));

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
      template: `<drag-scroll style="width: 50px; height: 50px;" drag-scroll-disabled="true">
                   <div drag-scroll-item style="width: 300px; height: 300px;"></div>
                 </drag-scroll>`
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
      template: `<drag-scroll style="width: 50px; height: 50px;" drag-scroll-x-disabled="true">
                   <div drag-scroll-item style="width: 300px; height: 300px;"></div>
                 </drag-scroll>`
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
      template: `<drag-scroll style="width: 50px; height: 50px;" drag-scroll-y-disabled="true">
                   <div drag-scroll-item style="width: 300px; height: 300px;"></div>
                 </drag-scroll>`
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
      template: `<drag-scroll style="width: 50px; height: 350px;" scrollbar-hidden="true">
                   <div drag-scroll-item style="width: 300px; height: 300px;"></div>
                 </drag-scroll>`
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
      template: `<drag-scroll style="width: 350px; height: 50px;" scrollbar-hidden="true">
                   <div drag-scroll-item style="width: 300px; height: 300px;"></div>
                 </drag-scroll>`
    }});
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
      template: `<drag-scroll style="width: 50px; height: 50px;" scrollbar-hidden="true">
                   <div drag-scroll-item style="width: 300px; height: 300px;"></div>
                 </drag-scroll>`
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
      template: `<drag-scroll scrollbar-hidden="true" style="width: 50px; height: 50px;">
                   <div drag-scroll-item style="width: 49px; height: 49px;"></div>
                 </drag-scroll>`
    }});
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));

      expect(window.getComputedStyle(compiled.nativeElement).height).toBe('50px');
      expect(window.getComputedStyle(compiled.nativeElement).width).toBe('50px');
    });
  }));

  it('should not show part of previous element on snap when snap-offset is not set', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<drag-scroll style="width: 100px; height: 100px;" scrollbar-hidden="true">
                   <img drag-scroll-item style="width: 50px; height: 100px;"/>
                   <img drag-scroll-item style="width: 50px; height: 100px;"/>
                   <img drag-scroll-item style="width: 50px; height: 100px;"/>
                 </drag-scroll>`
    }});
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));

      compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove', {bubbles: true, clientX: -45}));
      document.dispatchEvent(new MouseEvent('mouseup'));
      // compiled.componentInstance.locateCurrentIndex(true);

      compiled.componentInstance.snapAnimationFinished.subscribe(() => expect(compiled.nativeElement.scrollLeft).toBe(50));
    });
  }));

  it('should show part of previous element on snap when snap-offset is set', async(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<drag-scroll style="width: 100px; height: 100px;" snap-offset="10">
                   <img drag-scroll-item style="width: 50px; height: 100px;"/>
                   <img drag-scroll-item style="width: 50px; height: 100px;"/>
                   <img drag-scroll-item style="width: 50px; height: 100px;"/>
                 </drag-scroll>`
    }});
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));

      compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove', {bubbles: true, clientX: -45}));
      document.dispatchEvent(new MouseEvent('mouseup'));

      compiled.componentInstance.snapAnimationFinished.subscribe(() => expect(compiled.nativeElement.scrollLeft).toBe(40));
    });
  }));

  it('should not show part of previous element on moveRight/moveLeft when snap-offset is not set', fakeAsync(() => {
    TestBed.overrideComponent(TestComponent, {set: {
      template: `<drag-scroll style="width: 100px; height: 100px; font-size: 0;" #nav>
                   <div drag-scroll-item style="width: 50px; height: 100px; display: inline-block;"></div>
                   <div drag-scroll-item style="width: 50px; height: 100px; display: inline-block;"></div>
                   <div drag-scroll-item style="width: 50px; height: 100px; display: inline-block;"></div>
                 </drag-scroll>`
    }});
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));

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
      template: `<drag-scroll style="width: 100px; height: 100px; font-size: 0;" #nav snap-offset="10">
                   <div drag-scroll-item style="width: 50px; height: 100px; display: inline-block;"></div>
                   <div drag-scroll-item style="width: 50px; height: 100px; display: inline-block;"></div>
                   <div drag-scroll-item style="width: 50px; height: 100px; display: inline-block;"></div>
                 </drag-scroll>`
    }});
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));

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
      template: `<drag-scroll style="width: 50px; height: 50px;">
                   <div drag-scroll-item class="item" (click)="elementOnClicked()" style="width: 300px; height: 300px;"></div>
                 </drag-scroll>`
    }});

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));

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

  it('should trigger snapAnimationFinished event with currentIndex when snap is enabled', async(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<drag-scroll style="width: 100px; height: 50px;" #nav>
                   <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
                   <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
                   <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
                   <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
                 </drag-scroll>`
      }
    });
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));
      compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: -101  }));
      document.dispatchEvent(new MouseEvent('mouseup'));

      compiled.componentInstance.snapAnimationFinished.subscribe((result) => expect(result).toBe(2));
    });
  }));

  it('should not trigger snapAnimationFinished event when snap is disabled', async(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<drag-scroll snap-disabled="true" style="width: 100px; height: 50px;" #nav>
                   <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
                   <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
                   <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
                   <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
                 </drag-scroll>`
      }
    });
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));
      spyOn(fixture.componentInstance.ds.snapAnimationFinished, 'emit');
      compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: -101  }));
      document.dispatchEvent(new MouseEvent('mouseup'));
      fixture.whenRenderingDone().then(() => expect(fixture.componentInstance.ds.snapAnimationFinished.emit).toHaveBeenCalledTimes(0));
    });
  }));

  it('should trigger currentIndex once on navigation button click', async(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `
        <drag-scroll
          (indexChanged)="onIndexChanged($event)"
          style="width: 100px; height: 50px;" #nav>
          <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
          <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
          <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
          <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
        </drag-scroll>
        <button (click)="moveLeft()">left</button>
        <button (click)="moveRight()">right</button>
        `
      }
    });
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      spyOn(fixture.componentInstance.ds.indexChanged, 'emit');
      fixture.componentInstance.moveRight();
      expect(fixture.componentInstance.ds.indexChanged.emit).toHaveBeenCalledWith(1);
      fixture.componentInstance.moveRight();
      expect(fixture.componentInstance.ds.indexChanged.emit).toHaveBeenCalledWith(2);
      fixture.componentInstance.moveRight();
      expect(fixture.componentInstance.ds.indexChanged.emit).toHaveBeenCalledWith(3);
      expect(fixture.componentInstance.ds.indexChanged.emit).toHaveBeenCalledTimes(3);
    });
  }));

  it('should not listen to mousemove when mousedown is not triggered', async(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<drag-scroll style="width: 100px; height: 50px;" #nav>
                   <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
                   <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
                   <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
                   <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
                 </drag-scroll>`
      }
    });
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);

      const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));
      spyOn(fixture.componentInstance.ds, 'onMouseMove');

      document.dispatchEvent(new MouseEvent('mousemove', {bubbles: true, clientX: -45}));
      document.dispatchEvent(new MouseEvent('mousemove', {bubbles: true, clientX: -45}));
      document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: -20  }));
      fixture.whenRenderingDone().then(() => expect(fixture.componentInstance.ds.onMouseMove).toHaveBeenCalledTimes(0));
    });
  }) );

  it('should listen to mousemove when mousedown is triggered', async(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<drag-scroll style="width: 100px; height: 50px;" #nav>
                   <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
                   <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
                   <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
                   <div drag-scroll-item class="item" style="width: 50px; height: 50px;"></div>
                 </drag-scroll>`
      }
    });
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);

      const compiled = fixture.debugElement.query(By.css('.drag-scroll-content'));
      spyOn(fixture.componentInstance.ds, 'onMouseMove');

      compiled.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: -101  }));
      document.dispatchEvent(new MouseEvent('mouseup'));
      fixture.whenRenderingDone().then(() => expect(fixture.componentInstance.ds.onMouseMove).toHaveBeenCalledTimes(1));
    });
  }) );
});
