import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[drag-scroll-item]',
  standalone: true
})
export class DragScrollItemDirective {
  @HostBinding('style.display')
  display = 'inline-block';

  @Input('drag-disabled')
  get dragDisabled() {
    return this._dragDisabled;
  }
  set dragDisabled(value: boolean) {
    this._dragDisabled = value;
  }

  _dragDisabled = false;

  _elementRef: ElementRef;

  constructor(private elementRef: ElementRef) {
    this._elementRef = elementRef;
  }
}
