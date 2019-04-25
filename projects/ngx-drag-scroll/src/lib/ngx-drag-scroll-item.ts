import { Directive, ElementRef, Input, HostBinding, Inject } from '@angular/core';

@Directive({
  selector: '[drag-scroll-item]'
})
export class DragScrollItemDirective {
  @HostBinding('style.display')
  display = 'inline-block';

  @Input('drag-disabled')
  get dragDisabled() { return this._dragDisabled; }
  set dragDisabled(value: boolean) { this._dragDisabled = value; }

  _dragDisabled = false;

  _elementRef: ElementRef;

  constructor(
    @Inject(ElementRef) elementRef: ElementRef,
  ) {
    this._elementRef = elementRef;
  }
}
