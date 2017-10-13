# [Angular2+ Draggable Carousel](https://bfwg.github.io/angular2-drag-scroll/)

Lightweight drag to scroll carousel for Angular2+

[![npm version](https://img.shields.io/npm/v/angular2-drag-scroll.svg)](https://www.npmjs.com/package/angular2-drag-scroll)
[![Build Status](https://travis-ci.org/bfwg/angular2-drag-scroll.svg?branch=master)](https://travis-ci.org/bfwg/angular2-drag-scroll)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/bfwg/angular2-drag-scroll/blob/master/LICENSE)

*Scroll on drag!*

![Scroll](https://user-images.githubusercontent.com/12819525/31459582-73565738-ae78-11e7-8b45-83f686123b63.gif)

Try out the [demo](https://bfwg.github.io/angular2-drag-scroll/)!

# Install

You can get it on npm.

```shell
npm install angular2-drag-scroll --save
```

# Setup

You'll need to add `DragScrollModule` to your application module.

```typescript
import { DragScrollModule } from 'angular2-drag-scroll';
...

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DragScrollModule,
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}

```
Add the `drag-scroll` attribute to a scrollable element:
```typescript
@Component({
  selector: 'sample',
  template:`
  <div drag-scroll>
    Big text goes here...
  </div>
  `
})
class Sample {}
```
That's it! Now you can scroll it by dragging.


## API REFERENCE

| Name                   | Type    | Description                                                                   |Default|
|------------------------|---------|-------------------------------------------------------------------------------|-------|
| scrollbar-hidden       | @Input  | Whether the scroll bar for this element is hidden.                            | false |
| drag-scroll-disabled   | @Input  | Whether all draging and scrolling events is disabled.                         | false |
| drag-scroll-x-disabled | @Input  | Whether horizontally dragging and scrolling events is disabled.               | false |
| drag-scroll-y-disabled | @Input  | Whether vertically dragging and scrolling events is disabled.                 | false |
| drag-disabled          | @Input  | Whether draging is disabled.                                                  | false |
| snap-disabled          | @Input  | Whether snapping is disabled.                                                 | false |
| reachesLeftBound       | @Output | Whether reaching the left carousel bound.                                     |  n/a  |
| reachesRightBound      | @Output | Whether reaching the right carousel bound.                                    |  n/a  |

___

## Add navigation button

```typescript
@Component({
  selector: 'sample',
  template:`
  <div drag-scroll #nav>
    Big text goes here...
  </div>
  <button (click)="moveLeft()">Left</button>
  <button (click)="moveRight()">Right</button>
  `
})
class Sample {
  @ViewChild('nav', {read: DragScroll}) ds: DragScroll;
  
  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }
}
```

## Dynamically apply the plugin to a DOM element

This was brought by @tommykamkcm. The below code block demonstrates how to attach the directive dynamically on a DOM i.e. deep rendered element.
```javascript

constructor(
  private cdr: ChangeDetectorRef,
  private element: ElementRef,
  private renderer: Renderer
) {}
dragScrollDom: any;
dragScrollRef: ElementRef;
dragScroll: DragScroll;

ngAfterViewInit() {
  // attach to .nav-tabs element
  this.dragScrollDom = this.element.nativeElement.querySelector('.nav-tabs');
  this.dragScrollRef = new ElementRef(this.dragScrollDom );

  this.dragScroll = new DragScroll(this.dragScrollRef, this.renderer, this.cdr);
  this.dragScroll.attach({
    disabled: false,
    scrollbarHidden: true,
    yDisabled: true,
    xDisabled: false,
  });
}
```

### Contributing
Clone the repository, and run `npm install`, `npm start`. The demo app will starts on port :4200. I usually do my development on the demo app.

I'll accept pretty much everything so feel free to open a Pull-Request

# License
 [MIT](/LICENSE)
