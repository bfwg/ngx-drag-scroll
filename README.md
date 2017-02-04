# ng2-dragon
Angular2 library for one-directional scrolling and dragging content.

[![npm version](https://www.npmjs.com/package/ng2-dragon)](https://www.npmjs.com/package/ng2-dragon)

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
  <div dragon >
    <ul></ul>
  </div>
  `
})
class Sample {}
```
