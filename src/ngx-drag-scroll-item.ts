import { Directive, ElementRef, Renderer2, HostBinding, Inject } from '@angular/core';
@Directive({
  selector: '[drag-scroll-item]'
})
export class DragScrollItemDirective {
  @HostBinding('style.display')
  display = 'inline-block';

  _elementRef: ElementRef;

  constructor(
    @Inject(ElementRef) private elementRef: ElementRef,
  ) {
    this._elementRef = elementRef;
  }
}
