import { NgModule } from '@angular/core';

import { DragScroll } from './drag-scroll';
import { DragScrollItem } from './drag-scroll-item';
import { DeviceDetectorModule } from './device-info/index';

@NgModule({
  imports: [
    DeviceDetectorModule
  ],
  exports: [
    DragScroll,
    DragScrollItem
  ],
  declarations: [
    DragScroll,
    DragScrollItem
  ]
})
export class DragScrollModule { }

export { DragScroll } from './drag-scroll';
export { DragScrollItem } from './drag-scroll-item';
