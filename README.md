# [Angular Draggable Carousel](https://bfwg.github.io/ngx-drag-scroll/)

Lightweight drag to scroll carousel for Angular

## Maintainers wanted

[![npm version](https://img.shields.io/npm/v/ngx-drag-scroll.svg)](https://www.npmjs.com/package/ngx-drag-scroll)
[![Monthly Download](https://img.shields.io/npm/dm/ngx-drag-scroll.svg?style=flat-square)](https://www.npmjs.com/package/ngx-drag-scroll)
[![Build Status](https://travis-ci.org/bfwg/ngx-drag-scroll.svg?branch=master)](https://travis-ci.org/bfwg/ngx-drag-scroll)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/bfwg/ngx-drag-scroll/blob/master/LICENSE)


*Scroll on drag!*

![Scroll](https://user-images.githubusercontent.com/12819525/31459582-73565738-ae78-11e7-8b45-83f686123b63.gif)

Try out the [demo](https://bfwg.github.io/ngx-drag-scroll/)!

# Install

You can get it on npm.

```shell
npm install ngx-drag-scroll --save
```

## Requirements

This project needs `Angular 5+` as dependencies though.

# Setup

You'll need to add `DragScrollModule` to your application module.

```typescript
import { DragScrollModule } from 'ngx-drag-scroll';
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
  <drag-scroll style="width: 100px; height: 10px">
    Big text goes here...
  </drag-scroll>
  `,
  styles: [`
    drag-scroll {
      height: 50px
      width: 100px
    }
    `]
})
class SampleBigText {}
```
That's it! Now you can scroll it by dragging.

If you want to group items into a carousel, you will need to add `drag-scroll-item` to the carsousel items.
```typescript
@Component({
  selector: 'sample',
  template:`
  <drag-scroll>
    <img drag-scroll-item src="some-url" />
    <img drag-scroll-item src="some-url" />
    <img drag-scroll-item src="some-url" />
  </drag-scroll>
  `,
  styles: [`
    drag-scroll {
      height: 50px
      width: 100px
    }
    img {
      height: 50px
      width: 50px
    }
    `]
})
class SampleCarousel {}
```


## API REFERENCE

### DragScrollComponent 

| Name                   | Type    | Description                                                                   |Default|
|------------------------|---------|-------------------------------------------------------------------------------|-------|
| scrollbar-hidden       | @Input  | Whether the scroll bar for this element is hidden.                            | false |
| drag-scroll-disabled   | @Input  | Whether all draging and scrolling events is disabled.                         | false |
| drag-scroll-x-disabled | @Input  | Whether horizontally dragging and scrolling events is disabled.               | false |
| scroll-x-wheel-enabled | @Input  | Whether scrolling horizontally with mouse wheel is enabled                    | false |
| drag-scroll-y-disabled | @Input  | Whether vertically dragging and scrolling events is disabled.                 | false |
| drag-disabled          | @Input  | Whether draging is disabled.                                                  | false |
| snap-disabled          | @Input  | Whether snapping is disabled.                                                 | false |
| snap-offset            | @Input  | Pixels of previous element to show on snap or moving left and right.          |   0   |
| snap-duration          | @Input  | Duration of snap animation in milliseconds.                                   |  500  |
| reachesLeftBound       | @Output | Whether reaching the left carousel bound.                                     |  n/a  |
| reachesRightBound      | @Output | Whether reaching the right carousel bound.                                    |  n/a  |
| dragStart              | @Output | Executes when drag start.                                                     |  n/a  |
| dragEnd                | @Output | Executes when drag end.                                                       |  n/a  |
| snapAnimationFinished  | @Output | The snap animation for the new selection has finished.                        |  n/a  |
| indexChanged           | @Output | Executes when the current index of the carousel changes.                      |  n/a  |
| dsInitialized          | @Output | Executes when the drag scroll component has been initialized.                 |  n/a  |

___

### DragScrollItemDirective 

| Name                   | Type    | Description                                                                   |Default|
|------------------------|---------|-------------------------------------------------------------------------------|-------|
| drag-disabled          | @Input  | Whether draging on the item is disabled.                                      | false |

___

## Add navigation button

```typescript
@Component({
  selector: 'sample',
  template:`
  <drag-scroll #nav>
    <img drag-scroll-item src="some-url" />
    <img drag-scroll-item src="some-url" />
    <img drag-scroll-item src="some-url" />
  </drag-scroll>
  <button (click)="moveLeft()">Left</button>
  <button (click)="moveRight()">Right</button>
  <button (click)="moveTo(2)">Last</button>
  `
})
class Sample {
  @ViewChild('nav', {read: DragScrollComponent}) ds: DragScrollComponent;
  
  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  moveTo(index) {
    this.ds.moveTo(index);
  }

  ngAfterViewInit() {
    // Starting ngx-drag-scroll from specified index(3)
    setTimeout(() => {
      this.ds.moveTo(3);
    }, 0);
  }
}
```


### Contributing
Clone the repository, and run `npm install`, `npm run build ngx-drag-scroll`, `npm start`. The demo app will starts on port :4200. I usually do my development on the demo app.

I'll accept pretty much everything so feel free to open a Pull-Request. 

We use commitlint for managing our commits. Check out [Contributing](CONTRIBUTING.md) for more details.

# License
 [MIT](/LICENSE)
