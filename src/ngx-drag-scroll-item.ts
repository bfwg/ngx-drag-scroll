import { Directive, ElementRef } from '@angular/core';
@Directive({
  selector: '[dragScrollItem]'
})
export class DragScrollItemDirective {
  _elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this._elementRef = elementRef;
  }
}
