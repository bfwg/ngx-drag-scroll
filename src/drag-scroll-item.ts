import { Directive, ElementRef, Input } from '@angular/core';

/** Coerces a data-bound value (typically a string) to a boolean. */
function coerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}


@Directive({
  selector: '[drag-scroll-item], [dragScrollItem]',
  exportAs: 'dragScrollSnap'
})
export class DragScrollItem {

  _enabled = true;

  @Input('drag-scroll-item')
  get enabled(): boolean {
    return this._enabled;
  }
  set enabled(value: boolean) {
    this._enabled = coerceBooleanProperty(value);
  }


  constructor(public _elementRef: ElementRef) {

  }
}
