# ng2-dragon
Angular2 library for one-directional content dragging with mouse or touch.

[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=1.6.0&x2=0)](https://www.npmjs.com/package/ng2-dragon)
[![Maintenance Status][status-image]][status-url]
[status-image]: https://img.shields.io/badge/status-maintained-brightgreen.svg
[status-url]: https://github.com/bfwg/relay-gallery

# Install

You can get it on npm.

```shell
npm install ng2-dragon --save
```

# Setup

You'll need to add `DragonModule` to your application module.

```typescript
import { DragonModule } from 'ng2-dragon';
...

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DragonModule,
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
  <div dragging>
    <!-- content here can be drag around -->
  </div>
  `
})
class Sample {}
```
## Special Inputs for ng2-dragon

| Event Name |      Listener Arguments      |  Event Description | Default Value
| :---------: |:---|:-----|:---|
| dragX | boolean | disable drag horizontally | true |
| dragY | boolean | disable drag vertically | true |

```typescript
@Component({
  selector: 'sample',
  template:`
  <div dragging dragX="false">
    <!-- content here can be drag around vertically -->
  </div>
  `
})
class Sample {}
```
