import { NgModule } from '@angular/core';

import { DragScroll } from './drag-scroll';
import { DragScrollSnap } from './drag-scroll-snap';
import { DeviceDetectorModule } from './device-info/index';

@NgModule({
  imports: [
    DeviceDetectorModule
  ],
  exports: [
    DragScroll,
    DragScrollSnap
  ],
  declarations: [
    DragScroll,
    DragScrollSnap
  ]
})
export class DragScrollModule { }

export { DragScroll } from './drag-scroll';
export { DragScrollSnap } from './drag-scroll-snap';
