import { NgModule } from '@angular/core';

import { DragScroll } from './drag-scroll';
import { DragScrollSnap } from './drag-scroll-snap';

@NgModule({
  exports: [DragScroll, DragScrollSnap],
  declarations: [DragScroll, DragScrollSnap]
})
export class DragScrollModule { }

export { DragScroll } from './drag-scroll';
export { DragScrollSnap } from './drag-scroll-snap';
