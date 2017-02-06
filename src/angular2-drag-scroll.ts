import {
  NgModule,
  Directive,
  ElementRef,
  Renderer,
  OnDestroy,
  Input,
  OnInit,
  OnChanges,
  SimpleChange
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Directive({
  selector: '[drag-scroll]',
  host: {
    '(mousedown)': 'onDragStart($event)'
  }
})
export class DragScroll implements OnDestroy, OnInit, OnChanges {

  /**
   * Whether horizontally and vertically draging and scrolling events will be disabled
   */
  @Input('dragScrollDisabled') disabled: boolean;

  /** @deprecated */
  @Input('drag-scroll-disabled')
  get _dragScrollDisabledDeprecated() { return this.disabled; }
  set _dragScrollDisabledDeprecated(value: boolean) { this.disabled = value; };

  /**
   * Whether horizontally dragging and scrolling events will be disabled
   */
  @Input('dragScrollXDisabled') xDisabled: boolean;

  /** @deprecated */
  @Input('drag-scroll-x-disabled')
  get _dragScrollXDisabledDeprecated() { return this.xDisabled; }
  set _dragScrollXDisabledDeprecated(value: boolean) { this.xDisabled = value; };

  /**
   * Whether vertically dragging and scrolling events will be disabled
   */
  @Input('dragScrollYDisabled') yDisabled: boolean;

  /** @deprecated */
  @Input('drag-scroll-y-disabled')
  get _dragScrollYDisabledDeprecated() { return this.yDisabled; }
  set _dragScrollYDisabledDeprecated(value: boolean) { this.yDisabled = value; };

  isPressed: boolean = false;
  downX: number = 0;
  downY: number = 0;
  rect: ClientRect;

  onDragHandler = this.onDrag.bind(this);
  onDragEndHandler = this.onDragEnd.bind(this);

  constructor(
    private el: ElementRef, private renderer: Renderer
  ) {
    el.nativeElement.style.overflow = 'scroll';
    el.nativeElement.style.whiteSpace = 'noWrap';
    document.addEventListener('mousemove', this.onDragHandler, false);
    document.addEventListener('mouseup', this.onDragEndHandler, false);
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
    document.removeEventListener('mousemove', this.onDragHandler, false);
    document.removeEventListener('mouseup', this.onDragEndHandler, false);
  }

  onDragStart(e: MouseEvent) {
    e.preventDefault();
    this.isPressed = true;
    this.downX = e.clientX;
    this.downY = e.clientY;
    return false;
  }


  onDrag(e: MouseEvent) {
    e.preventDefault();

    if (this.isPressed && !this.disabled) {
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

  onDragEnd(e: MouseEvent) {
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
