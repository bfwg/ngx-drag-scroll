import {
  NgModule,
  Directive,
  ElementRef,
  Renderer,
  OnDestroy,
  Input,
  OnInit,
  OnChanges,
  HostListener,
  SimpleChange
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Directive({
  selector: '[drag-scroll]'
})
export class DragScroll implements OnDestroy, OnInit, OnChanges {

  private _disabled: boolean;

  private _xDisabled: boolean;

  private _yDisabled: boolean;

  /**
   * Is the user currently pressing the element
   */
  isPressed: boolean = false;

  /**
   * The x coordinates on the element
   */
  downX: number = 0;

  /**
   * The y coordinates on the element
   */
  downY: number = 0;

  /**
   * The bounding ClientRect on the element
   */
  rect: ClientRect;

  /**
   * Whether horizontally and vertically draging and scrolling events will be disabled
   */
  @Input('drag-scroll-disabled')
  get disabled() { return this._disabled; }
  set disabled(value: boolean) { this._disabled = value; };

  /**
   * Whether horizontally dragging and scrolling events will be disabled
   */
  @Input('drag-scroll-x-disabled')
  get xDisabled() { return this._xDisabled; }
  set xDisabled(value: boolean) { this._xDisabled = value; };

  /**
   * Whether vertically dragging and scrolling events will be disabled
   */
  @Input('drag-scroll-y-disabled')
  get yDisabled() { return this._yDisabled; }
  set yDisabled(value: boolean) { this._yDisabled = value; };

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    e.preventDefault();
    this.isPressed = true;
    this.downX = e.clientX;
    this.downY = e.clientY;
    return false;
  }

  onMouseMoveHandler = this.onMouseMove.bind(this);
  onMouseUpHandler = this.onMouseUp.bind(this);

  constructor(
    private el: ElementRef, private renderer: Renderer
  ) {
    el.nativeElement.style.overflow = 'scroll';
    el.nativeElement.style.whiteSpace = 'noWrap';
    document.addEventListener('mousemove', this.onMouseMoveHandler, false);
    document.addEventListener('mouseup', this.onMouseUpHandler, false);
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

    if (this.xDisabled || this.disabled) {
      this.el.nativeElement.style['overflow-x'] = 'hidden';
    }
    if (this.yDisabled || this.disabled) {
      this.el.nativeElement.style['overflow-y'] = 'hidden';
    }
  }

  ngOnInit(): void {
    this.rect = this.el.nativeElement.getBoundingClientRect();
    this.renderer.setElementAttribute(this.el.nativeElement, 'drag-scroll', 'true');
  }

  ngOnDestroy() {
    this.renderer.setElementAttribute(this.el.nativeElement, 'drag-scroll', 'false');
    document.removeEventListener('mousemove', this.onMouseMoveHandler, false);
    document.removeEventListener('mouseup', this.onMouseUpHandler, false);
  }

  onMouseMove(e: MouseEvent) {
    if (this.isPressed && !this.disabled) {
      e.preventDefault();
      // Drag X
      if (!this.xDisabled) {
        let rectRight = this.rect.left + this.el.nativeElement.offsetWidth;
        let offsetX = e.pageX > rectRight ? e.pageX - rectRight :
          e.pageX < this.rect.left ? e.pageX - this.rect.left : 0;
        this.el.nativeElement.scrollLeft = this.el.nativeElement.scrollLeft - e.clientX + this.downX - offsetX;
        this.downX = e.clientX + offsetX;
      }

      // Drag Y
      if (!this.yDisabled) {
        let rectBottom = this.rect.top + this.el.nativeElement.offsetHeight;
        let offsetY = e.pageY > rectBottom ? e.pageY - rectBottom :
          e.pageY < this.rect.top ? e.pageY - this.rect.top : 0;
        this.el.nativeElement.scrollTop = this.el.nativeElement.scrollTop - e.clientY + this.downY - offsetY;
        this.downY = e.clientY + offsetY;
      }
    }
    return false;
  }

  onMouseUp(e: MouseEvent) {
    e.preventDefault();
    this.isPressed = false;
    return false;
  }

}

@NgModule({
  imports: [BrowserModule],
  exports: [DragScroll],
  declarations: [DragScroll]
})
export class DragScrollModule { }
