import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceService } from './device.service';
import { ReTree } from './retree.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ReTree,
    DeviceService
  ]
})
export class DeviceDetectorModule {
}

export { DeviceService } from './device.service';
export { ReTree } from './retree.service';
