import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[drag-scroll-snap], [dragScrollSnap]',
  exportAs: 'dragScrollSnap'
})
export class DragScrollSnap {

  constructor(public _elementRef: ElementRef) {

  }
}
