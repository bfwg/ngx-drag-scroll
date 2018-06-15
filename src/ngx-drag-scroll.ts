import {
  NgModule,
  Directive,
  ElementRef,
  Component,
  Renderer2,
  OnDestroy,
  Input,
  Output,
  AfterViewInit,
  OnChanges,
  EventEmitter,
  HostListener,
  ViewChild,
  ContentChildren,
  QueryList
} from '@angular/core';

import { DragScrollElement, DragScrollOption } from './interface';
import { DragScrollItemDirective } from './ngx-drag-scroll-item';

@Component({
  selector: 'drag-scroll',
  templateUrl: './ngx-drag-scroll.html',
  styles: [`
    :host {
      display: block;
      overflow: hidden;
    }
    .drag-scroll-content {
      overflow: hidden;
      white-space: nowrap;
    }
    `]
})
export class DragScrollComponent implements OnDestroy, AfterViewInit, OnChanges {

  private _scrollbarHidden = false;

  private _disabled = false;

  private _xDisabled = false;

  private _yDisabled = false;

  private _dragDisabled = false;

  private _snapDisabled = false;

  private _snapOffset = 0;
  /**
   * Is the user currently pressing the element
   */
  isPressed = false;

  /**
   * Is the user currently scrolling the element
   */
  isScrolling = false;

  scrollTimer = -1;

  scrollToTimer = -1;

  /**
   * The x coordinates on the element
   */
  downX = 0;

  /**
   * The y coordinates on the element
   */
  downY = 0;

  displayType: string | null = 'block';

  elWidth: string | null = null;

  elHeight: string | null = null;

  /**
   * The parentNode of carousel Element
   */
  parentNode: HTMLElement | null = null;

  /**
   * The carousel Element
   */

  @ViewChild('contentRef') _contentRef: ElementRef;

  @ContentChildren(DragScrollItemDirective) _children: QueryList<DragScrollItemDirective>;

  wrapper: HTMLDivElement | null = null;

  scrollbarWidth: string | null = null;

  currIndex = 0;

  isAnimating = false;

  scrollReachesRightEnd = false;

  prevChildrenLength = 0;

  mouseMoveListener: Function;
  mouseDownListener: Function;
  scrollListener: Function;
  mouseUpListener: Function;

  @Output() reachesLeftBound = new EventEmitter<boolean>();

  @Output() reachesRightBound = new EventEmitter<boolean>();

  /**
   * Whether the scrollbar is hidden
   */
  @Input('scrollbar-hidden')
  get scrollbarHidden() { return this._scrollbarHidden; }
  set scrollbarHidden(value: boolean) { this._scrollbarHidden = value; }

  /**
   * Whether horizontally and vertically draging and scrolling is be disabled
   */
  @Input('drag-scroll-disabled')
  get disabled() { return this._disabled; }
  set disabled(value: boolean) { this._disabled = value; }

  /**
   * Whether horizontally dragging and scrolling is be disabled
   */
  @Input('drag-scroll-x-disabled')
  get xDisabled() { return this._xDisabled; }
  set xDisabled(value: boolean) { this._xDisabled = value; }

  /**
   * Whether vertically dragging and scrolling events is disabled
   */
  @Input('drag-scroll-y-disabled')
  get yDisabled() { return this._yDisabled; }
  set yDisabled(value: boolean) { this._yDisabled = value; }

  @Input('drag-disabled')
  get dragDisabled() { return this._dragDisabled; }
  set dragDisabled(value: boolean) { this._dragDisabled = value; }

  @Input('snap-disabled')
  get snapDisabled() { return this._snapDisabled; }
  set snapDisabled(value: boolean) { this._snapDisabled = value; }

  @Input('snap-offset')
  get snapOffset() { return this._snapOffset; }
  set snapOffset(value: number) { this._snapOffset = value; }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.markElDimension();
    this.checkNavStatus();
  }

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
  ) {
    this.scrollbarWidth = `${this.getScrollbarWidth()}px`;
  }

  ngOnChanges() {
    this.setScrollBar();

    if (this.xDisabled || this.disabled) {
      this.disableScroll('x');
    } else {
      this.enableScroll('x');
    }

    if (this.yDisabled || this.disabled) {
      this.disableScroll('y');
    } else {
      this.enableScroll('y');
    }
  }

  ngAfterViewInit() {
    // auto assign computed css
    this.displayType = window.getComputedStyle(this._contentRef.nativeElement).display;
    this._renderer.setStyle(this._contentRef.nativeElement, 'display', this.displayType);
    this._renderer.setAttribute(this._contentRef.nativeElement, 'drag-scroll', 'true');

    // store ele width height for later user
    this.markElDimension();

    // set content element the same height as the component
    this._renderer.setStyle(this._contentRef.nativeElement, 'height', this.elHeight);

    if (this.wrapper) {
      this.checkScrollbar();
    }

    this.mouseDownListener = this._renderer.listen(this._contentRef.nativeElement, 'mousedown', this.onMouseDownHandler.bind(this));
    this.scrollListener = this._renderer.listen(this._contentRef.nativeElement, 'scroll', this.onScrollHandler.bind(this));
    this.mouseMoveListener = this._renderer.listen('document', 'mousemove', this.onMouseMoveHandler.bind(this));
    this.mouseUpListener = this._renderer.listen('document', 'mouseup', this.onMouseUpHandler.bind(this));

    // prevent Firefox from dragging images
    this._renderer.listen('document', 'dragstart', (e) => {
      e.preventDefault();
    });
    this.checkNavStatus();
  }

  ngOnDestroy() {
    this._renderer.setAttribute(this._contentRef.nativeElement, 'drag-scroll', 'false');
  }

  onMouseMoveHandler(event: MouseEvent) {
    if (this.isPressed && !this.disabled) {
      // // Drag X
      if (!this.xDisabled && !this.dragDisabled) {
        this._contentRef.nativeElement.scrollLeft =
          this._contentRef.nativeElement.scrollLeft - event.clientX + this.downX;
        this.downX = event.clientX;
      }

      // Drag Y
      if (!this.yDisabled && !this.dragDisabled) {
        this._contentRef.nativeElement.scrollTop =
          this._contentRef.nativeElement.scrollTop - event.clientY + this.downY;
        this.downY = event.clientY;
      }
    }
  };

  onMouseDownHandler(event: MouseEvent) {
    this.isPressed = true;
    this.downX = event.clientX;
    this.downY = event.clientY;
    clearTimeout(this.scrollToTimer);
  };

  onScrollHandler(event: Event) {
    if ((this._contentRef.nativeElement.scrollLeft + this._contentRef.nativeElement.offsetWidth) >= this._contentRef.nativeElement.scrollWidth) {
      this.scrollReachesRightEnd = true;
    } else {
      this.scrollReachesRightEnd = false;
    }
    this.checkNavStatus();
    if (!this.isPressed && !this.isAnimating && !this.snapDisabled) {
      this.isScrolling = true;
      clearTimeout(this.scrollTimer);
      this.scrollTimer = window.setTimeout(() => {
        this.isScrolling = false;
        this.locateCurrentIndex(true);
      }, 500);
    } else {
      this.locateCurrentIndex();
    }
  };

  onMouseUpHandler(event: MouseEvent) {
    if (this.isPressed) {
      this.isPressed = false;
      if (!this.snapDisabled) {
        this.locateCurrentIndex(true);
      } else {
        this.locateCurrentIndex();
      }
    }
  };

  private disableScroll(axis: string): void {
    this._renderer.setStyle(this._contentRef.nativeElement, `overflow-${axis}`, 'hidden');
  }

  private enableScroll(axis: string): void {
    this._renderer.setStyle(this._contentRef.nativeElement, `overflow-${axis}`, 'auto');
  }

  private hideScrollbar(): void {
    if (this._contentRef.nativeElement.style.display !== 'none' && !this.wrapper) {
      this.parentNode = this._contentRef.nativeElement.parentNode;

      // clone
      this.wrapper = this._contentRef.nativeElement.cloneNode(true);
      // remove all children
      if (this.wrapper !== null) {
        while (this.wrapper.hasChildNodes()) {
          if (this.wrapper.lastChild !== null) {
            this.wrapper.removeChild(this.wrapper.lastChild);
          }
        }
        this._renderer.setStyle(this.wrapper, 'overflow', 'hidden');

        this._renderer.setStyle(this._contentRef.nativeElement, 'width', `calc(100% + ${this.scrollbarWidth})`);
        this._renderer.setStyle(this._contentRef.nativeElement, 'height', `calc(100% + ${this.scrollbarWidth})`);
        // set the wrapper as child (instead of the element)
        if (this.parentNode !== null) {
          this.parentNode.replaceChild(this.wrapper, this._contentRef.nativeElement);
        }
        // set element as child of wrapper
        this.wrapper.appendChild(this._contentRef.nativeElement);
      }
    }
  }

  private showScrollbar(): void {
    if (this.wrapper) {
      this._renderer.setStyle(this._contentRef.nativeElement, 'width', '100%');
      this._renderer.setStyle(this._contentRef.nativeElement, 'height', this.wrapper.style.height);
      if (this.parentNode !== null) {
        this.parentNode.removeChild(this.wrapper);
        this.parentNode.appendChild(this._contentRef.nativeElement);
      }
      this.wrapper = null;
    }
  }

  private checkScrollbar() {
    if (this._contentRef.nativeElement.scrollWidth <= this._contentRef.nativeElement.clientWidth) {
      this._renderer.setStyle(this._contentRef.nativeElement, 'height', '100%');
    } else {
      this._renderer.setStyle(this._contentRef.nativeElement, 'height', `calc(100% + ${this.scrollbarWidth})`);
    }
    if (this._contentRef.nativeElement.scrollHeight <= this._contentRef.nativeElement.clientHeight) {
      this._renderer.setStyle(this._contentRef.nativeElement, 'width', '100%');
    } else {
      this._renderer.setStyle(this._contentRef.nativeElement, 'width', `calc(100% + ${this.scrollbarWidth})`);
    }
  }

  private setScrollBar(): void {
    if (this.scrollbarHidden) {
      this.hideScrollbar();
    } else {
      this.showScrollbar();
    }
  }

  private getScrollbarWidth(): number {
    /**
     * Browser Scrollbar Widths (2016)
     * OSX (Chrome, Safari, Firefox) - 15px
     * Windows XP (IE7, Chrome, Firefox) - 17px
     * Windows 7 (IE10, IE11, Chrome, Firefox) - 17px
     * Windows 8.1 (IE11, Chrome, Firefox) - 17px
     * Windows 10 (IE11, Chrome, Firefox) - 17px
     * Windows 10 (Edge 12/13) - 12px
     */
    const outer = this._renderer.createElement('div');
    this._renderer.setStyle(outer, 'visibility', 'hidden');
    this._renderer.setStyle(outer, 'width', '100px');
    this._renderer.setStyle(outer, 'msOverflowStyle', 'scrollbar');  // needed for WinJS apps
    // document.body.appendChild(outer);
    this._renderer.appendChild(document.body, outer);
    // this._renderer.appendChild(this._renderer.selectRootElement('body'), outer);
    const widthNoScroll = outer.offsetWidth;
    // force scrollbars
    this._renderer.setStyle(outer, 'overflow', 'scroll');

    // add innerdiv
    const inner = this._renderer.createElement('div');
    this._renderer.setStyle(inner, 'width', '100%');
    this._renderer.appendChild(outer, inner);

    const widthWithScroll = inner.offsetWidth;

    // remove divs
    this._renderer.removeChild(document.body, outer);

    /**
     * Scrollbar width will be 0 on Mac OS with the
     * default "Only show scrollbars when scrolling" setting (Yosemite and up).
     * setting default width to 20;
     */
    return widthNoScroll - widthWithScroll || 20;
  }

  /*
  * The below solution is heavily inspired from
  * https://gist.github.com/andjosh/6764939
  */
  private scrollTo(element: Element, to: number, duration: number) {
    const self = this;
    self.isAnimating = true;
    const start = element.scrollLeft,
      change = to - start - this.snapOffset,
      increment = 20;
    let currentTime = 0;

    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    const easeInOutQuad = function (t: number, b: number, c: number, d: number) {
      t /= d / 2;
      if (t < 1) {
        return c / 2 * t * t + b;
      }
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animateScroll = function() {
      currentTime += increment;
      element.scrollLeft = easeInOutQuad(currentTime, start, change, duration);
      if (currentTime < duration) {
          self.scrollToTimer = window.setTimeout(animateScroll, increment);
      } else {
        // run one more frame to make sure the animation is fully finished
        setTimeout(() => {
          self.isAnimating = false;
        }, increment);
      }
    };
    animateScroll();
  }

  private locateCurrentIndex(snap?: boolean) {
    this.currentChildWidth((currentClildWidth, nextChildrenWidth, childrenWidth, idx, stop) => {
      if (this._contentRef.nativeElement.scrollLeft >= childrenWidth &&
          this._contentRef.nativeElement.scrollLeft <= nextChildrenWidth) {

        if (nextChildrenWidth - this._contentRef.nativeElement.scrollLeft > currentClildWidth / 2 && !this.scrollReachesRightEnd) {
          // roll back scrolling
          this.currIndex = idx;
          if (snap) {
            this.scrollTo(this._contentRef.nativeElement, childrenWidth, 500);
          }
        } else {
          // forward scrolling
          this.currIndex = idx + 1;
          if (snap) {
            this.scrollTo(this._contentRef.nativeElement, childrenWidth + currentClildWidth, 500);
          }
        }
        stop();
      }
    });
  }

  private currentChildWidth(cb: (
    currentClildWidth: number,
    nextChildrenWidth: number,
    childrenWidth: number,
    index: number,
    breakFunc: () => void) => void) {
    let childrenWidth = 0;
    let shouldBreak = false;
    const breakFunc = function() {
      shouldBreak = true;
    };
    for (let i = 0; i < this._children['_results'].length; i++) {
      if (i === this._children['_results'].length - 1) {
        this.currIndex = this._children['_results'].length;
        break;
      }
      if (shouldBreak) {
        break;
      }

      const nextChildrenWidth = childrenWidth + this._children['_results'][i + 1]._elementRef.nativeElement.clientWidth;
      const currentClildWidth = this._children['_results'][i]._elementRef.nativeElement.clientWidth;
      cb(currentClildWidth, nextChildrenWidth, childrenWidth, i, breakFunc);

      childrenWidth += currentClildWidth;
    }
  }

  private toChildrenLocation(): number {
    let to = 0;
    for (let i = 0; i < this.currIndex; i++) {
      to += this._children['_results'][i]._elementRef.nativeElement.clientWidth;
    }
    return to;
  }

  private markElDimension() {
    if (this.wrapper) {
      this.elWidth = this.wrapper.style.width;
      this.elHeight = this.wrapper.style.height;
    } else {
      this.elWidth = this._elementRef.nativeElement.style.width || this._elementRef.nativeElement.offsetWidth + 'px';
      this.elHeight = this._elementRef.nativeElement.style.height || this._elementRef.nativeElement.offsetHeight + 'px';
    }
  }

  /*
   * Nav button
   */
  moveLeft() {
    if (this.currIndex !== 0 || this.snapDisabled) {
      this.currIndex--;
      clearTimeout(this.scrollToTimer);
      this.scrollTo(this._contentRef.nativeElement, this.toChildrenLocation(), 500);
    }
  }

  moveRight() {
    if (!this.scrollReachesRightEnd && this._children['_results'][this.currIndex + 1]) {
      this.currIndex++;
      clearTimeout(this.scrollToTimer);
      this.scrollTo(this._contentRef.nativeElement, this.toChildrenLocation(), 500);
    }
  }

  moveTo(index: number) {
    if (index >= 0 && index !== this.currIndex && this._children['_results'][index]) {
      this.currIndex = index;
      clearTimeout(this.scrollToTimer);
      this.scrollTo(this._contentRef.nativeElement, this.toChildrenLocation(), 500);
    }
  }

  checkNavStatus() {
    let childrenWidth = 0;
    for (let i = 0; i < this._children['_results'].length; i++) {
      childrenWidth += this._children['_results'][i]._elementRef.nativeElement.clientWidth;
    }
    setTimeout(() => {
      if (this._children['_results'].length <= 1 || this._contentRef.nativeElement.scrollWidth <= this._contentRef.nativeElement.clientWidth) {
        // only one element
        this.reachesLeftBound.emit(true);
        this.reachesRightBound.emit(true);
      } else if (this.scrollReachesRightEnd) {
        // reached right end
        this.reachesLeftBound.emit(false);
        this.reachesRightBound.emit(true);
      } else if (this._contentRef.nativeElement.scrollLeft === 0 &&
                this._contentRef.nativeElement.scrollWidth > this._contentRef.nativeElement.clientWidth) {
        // reached left end
        this.reachesLeftBound.emit(true);
        this.reachesRightBound.emit(false);
      } else {
        // in the middle
        this.reachesLeftBound.emit(false);
        this.reachesRightBound.emit(false);
      }
    }, 0)
  }
}
