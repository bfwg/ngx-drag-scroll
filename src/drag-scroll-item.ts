import { Component, Directive, ElementRef, Input } from '@angular/core';

/** Coerces a data-bound value (typically a string) to a boolean. */
function coerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}

@Component({
  selector: 'drag-scroll-item, [dragScrollItem]',
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class DragScrollItem {

  _elementRef: ElementRef;
  _enabled = true;

  @Input('dragScrollSnap')
  get enabled(): boolean {
    return this._enabled;
  }
  set enabled(value: boolean) {
    this._enabled = coerceBooleanProperty(value);
  }

  constructor(elementRef: ElementRef) {
    this._elementRef = elementRef;
  }
}
