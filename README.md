# Angular2 Drag to Scroll

*Scroll on drag!*

Lightweight drag to scroll directive for Angular2

[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=1.1.4&x2=0)](https://www.npmjs.com/package/angular2-drag-scroll)
[![Maintenance Status][status-image]][status-url]
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/bfwg/angular2-drag-scroll/blob/master/LICENSE)

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

```typescript
@Component({
  selector: 'sample',
  template:`
  <div drag-scroll>
    <!-- content here can be drag around -->
  </div>
  `
})
class Sample {}
```
## Special Inputs for Angular2 Drag to Scroll Driective

| Event Name |      Listener Arguments      |  Event Description | Default Value
| :---------: |:---|:-----|:---|
| drag-scroll-disabled | boolean | Whether horizontally and vertically draging and scrolling events will be disabled | false |
| drag-scroll-x-disabled | boolean | Whether horizontally dragging and scrolling events will be disabled | false |
| drag-scroll-y-disabled | boolean | Whether vertically dragging and scrolling events will be disabled | false |

```typescript
@Component({
  selector: 'sample',
  template:`
  <div drag-scroll drag-scroll-disabled="true">
    <!-- content here can be drag around vertically -->
  </div>
  <div drag-scroll drag-scroll-x-disabled="true">
    <!-- content here can be drag around vertically -->
  </div>
  <div drag-scroll drag-scroll-y-disabled="true">
    <!-- content here can be drag around vertically -->
  </div>
  `
})
class Sample {}
```

[status-image]: https://img.shields.io/badge/status-maintained-brightgreen.svg
[status-url]: https://github.com/bfwg/relay-gallery
