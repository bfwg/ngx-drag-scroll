import { Directive, ElementRef, Renderer2, HostBinding } from '@angular/core';
@Directive({
  selector: '[drag-scroll-item]'
})
export class DragScrollItemDirective {
  @HostBinding('style.display')
  display = 'inline-block';

  _elementRef: ElementRef;

  constructor(
    private elementRef: ElementRef,
  ) {
    this._elementRef = elementRef;
  }
}
