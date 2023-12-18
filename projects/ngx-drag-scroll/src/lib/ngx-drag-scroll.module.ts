import { NgModule } from '@angular/core';

import { DragScrollComponent } from './ngx-drag-scroll.component';
import { DragScrollItemDirective } from './ngx-drag-scroll-item';

@NgModule({
  declarations: [DragScrollComponent, DragScrollItemDirective],
  exports: [DragScrollComponent, DragScrollItemDirective]
})
export class DragScrollModule {}
