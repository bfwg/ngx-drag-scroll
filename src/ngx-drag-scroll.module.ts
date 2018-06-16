import { NgModule } from '@angular/core';

import { DragScrollComponent } from './ngx-drag-scroll';
import { DragScrollItemDirective } from './ngx-drag-scroll-item';

@NgModule({
  exports: [
    DragScrollComponent,
    DragScrollItemDirective
  ],
  declarations: [
    DragScrollComponent,
    DragScrollItemDirective
  ]
})
export class DragScrollModule { }
