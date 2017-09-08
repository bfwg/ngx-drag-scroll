import {
  NgModule,
  Directive,
  ElementRef,
  Renderer,
  OnDestroy,
  Input,
  Output,
  OnInit,
  OnChanges,
  AfterViewChecked,
  EventEmitter,
  HostListener
} from '@angular/core';
import { DragScrollOption } from './interface/drag-scroll-option';

@Directive({
  selector: '[drag-scroll]'
})
export class DragScroll implements OnDestroy, OnInit, OnChanges, AfterViewChecked {

  private _scrollbarHidden: boolean;

  private _disabled: boolean;

  private _xDisabled: boolean;

  private _yDisabled: boolean;

  private _dragDisabled: boolean;
  /**
   * Is the user currently pressing the element
   */
  isPressed = false;

  /**
   * Is the user currently scrolling the element
   */
  isScrolling = false;

  scrollTimer;

  /**
   * The x coordinates on the element
   */
  downX = 0;

  /**
   * The y coordinates on the element
   */
  downY = 0;

  displayType = 'block';

  parentNode: HTMLElement;

  wrapper: HTMLDivElement;

  scrollbarWidth: string;

  onMouseMoveHandler = this.onMouseMove.bind(this);
  onMouseDownHandler = this.onMouseDown.bind(this);
  onScrollHandler = this.onScroll.bind(this);
  onMouseUpHandler = this.onMouseUp.bind(this);

  mouseMoveListener: Function;
  mouseDownListener: Function;
  scrollListener: Function;
  mouseUpListener: Function;

  currIndex = 0;

  isAnimating = false;

  scrollReachesRightEnd = false;



  /**
   * Whether the scrollbar is hidden
   */
  @Input('scrollbar-hidden')
  get scrollbarHidden() { return this._scrollbarHidden; }
  set scrollbarHidden(value: boolean) { this._scrollbarHidden = value; };

  /**
   * Whether horizontally and vertically draging and scrolling is be disabled
   */
  @Input('drag-scroll-disabled')
  get disabled() { return this._disabled; }
  set disabled(value: boolean) { this._disabled = value; };

  /**
   * Whether horizontally dragging and scrolling is be disabled
   */
  @Input('drag-scroll-x-disabled')
  get xDisabled() { return this._xDisabled; }
  set xDisabled(value: boolean) { this._xDisabled = value; };

  /**
   * Whether vertically dragging and scrolling events is disabled
   */
  @Input('drag-scroll-y-disabled')
  get yDisabled() { return this._yDisabled; }
  set yDisabled(value: boolean) { this._yDisabled = value; };

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setScrollBar(true);
    this.resetScrollLocation();
  }

  @Output('leftBound') reachesLeftBound = new EventEmitter<boolean>();
  @Output('rightBound') reachesRightBound = new EventEmitter<boolean>();

  @Input('drag-disabled')
  get dragDisabled() { return this._dragDisabled; }
  set dragDisabled(value: boolean) { this._dragDisabled = value; };


  constructor(
    private el: ElementRef, private renderer: Renderer
  ) {
    this.scrollbarWidth = `${this.getScrollbarWidth()}px`;
    el.nativeElement.style.overflow = 'auto';
    el.nativeElement.style.whiteSpace = 'noWrap';

    this.mouseDownListener = renderer.listenGlobal(el.nativeElement, 'mousedown', this.onMouseDownHandler);
    this.scrollListener = renderer.listenGlobal(el.nativeElement, 'scroll', this.onScrollHandler);
    this.mouseMoveListener = renderer.listenGlobal('document', 'mousemove', this.onMouseMoveHandler);
    this.mouseUpListener = renderer.listenGlobal('document', 'mouseup', this.onMouseUpHandler);
  }

  public attach({disabled, scrollbarHidden, yDisabled, xDisabled}: DragScrollOption): void {
    this.disabled = disabled;
    this.scrollbarHidden = scrollbarHidden;
    this.yDisabled = yDisabled;
    this.xDisabled = xDisabled;
    this.ngOnChanges();
  }

  ngOnChanges() {
    this.setScrollBar();
    this.resetScrollLocation();

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

  ngOnInit(): void {
    // auto assign computed css
    this.displayType = window.getComputedStyle(this.el.nativeElement).display;
    this.el.nativeElement.style.display = this.displayType;

    this.renderer.setElementAttribute(this.el.nativeElement, 'drag-scroll', 'true');
  }

  ngAfterViewChecked() {
    // avoid extra ckecks
    if (this.wrapper) {
      this.checkScrollbar();
    }
  }

  ngOnDestroy() {
    this.renderer.setElementAttribute(this.el.nativeElement, 'drag-scroll', 'false');
    this.mouseMoveListener();
    this.mouseUpListener();
  }

  onMouseMove(e: MouseEvent) {
    if (this.isPressed && !this.disabled) {
      e.preventDefault();
      // Drag X
      if (!this.xDisabled && !this.dragDisabled) {
        this.el.nativeElement.scrollLeft =
          this.el.nativeElement.scrollLeft - e.clientX + this.downX;
        this.downX = e.clientX;
      }

      // Drag Y
      if (!this.yDisabled && !this.dragDisabled) {
        this.el.nativeElement.scrollTop =
          this.el.nativeElement.scrollTop - e.clientY + this.downY;
        this.downY = e.clientY;
      }
    }
    return false;
  }


  onMouseDown(e: MouseEvent) {
    this.isPressed = true;
    this.downX = e.clientX;
    this.downY = e.clientY;
  }

  onScroll(e) {
    const ele = this.el.nativeElement;
    if ((ele.scrollLeft + ele.offsetWidth) >= ele.scrollWidth) {
      this.scrollReachesRightEnd = true;
    } else {
      this.scrollReachesRightEnd = false;
    }
    // if (!this.isPressed && !this.isAnimating) {
    if (!this.isPressed && !this.isAnimating) {
      this.isScrolling = true;
      clearTimeout(this.scrollTimer);
      this.scrollTimer = setTimeout(() => {
        this.isScrolling = false;
        this.snapToCurrentIndex();
      }, 500);
    }
    // }
  }

  onMouseUp(e: MouseEvent) {
    e.preventDefault();
    if (this.isPressed) {
      this.isPressed = false;
      this.snapToCurrentIndex();
    }
    return false;
  }

  private disableScroll(axis: string): void {
    this.el.nativeElement.style[`overflow-${axis}`] = 'hidden';
  }

  private enableScroll(axis: string): void {
    this.el.nativeElement.style[`overflow-${axis}`] = 'auto';
  }

  private hideScrollbar(): void {
    if (this.el.nativeElement.style.display !== 'none' && !this.wrapper) {
      this.parentNode = this.el.nativeElement.parentNode;
      this.wrapper = document.createElement('div');
      this.wrapper.style.width = '100%';
      this.wrapper.style.height = this.el.nativeElement.style.height || this.el.nativeElement.offsetHeight + 'px';
      this.wrapper.style.overflow = 'hidden';
      this.el.nativeElement.style.width = `calc(100% + ${this.scrollbarWidth})`;
      this.el.nativeElement.style.height = `calc(100% + ${this.scrollbarWidth})`;
      // set the wrapper as child (instead of the element)
      this.parentNode.replaceChild(this.wrapper, this.el.nativeElement);
      // set element as child of wrapper
      this.wrapper.appendChild(this.el.nativeElement);
    }
  }

  private showScrollbar(): void {
    if (this.wrapper) {
      this.el.nativeElement.style.width = '100%';
      this.el.nativeElement.style.height = this.wrapper.style.height;
      this.parentNode.removeChild(this.wrapper);
      this.parentNode.appendChild(this.el.nativeElement);
      this.wrapper = null;
    }
  }

  private checkScrollbar() {
    if (this.el.nativeElement.scrollWidth <= this.el.nativeElement.clientWidth) {
      this.el.nativeElement.style.height = '100%';
    } else {
      this.el.nativeElement.style.height = `calc(100% + ${this.scrollbarWidth})`;
    }
    if (this.el.nativeElement.scrollHeight <= this.el.nativeElement.clientHeight) {
      this.el.nativeElement.style.width = '100%';
    } else {
      let lastChild = this.el.nativeElement.children[this.el.nativeElement.children.length - 1];
      lastChild.style['padding-right'] = this.scrollbarWidth;
      this.el.nativeElement.style.width = `calc(100% + ${this.scrollbarWidth})`;
    }
  }

  private setScrollBar(reset?: boolean): void {
    if (this.scrollbarHidden && reset) {
      this.showScrollbar();
      this.hideScrollbar();
    } else if (this.scrollbarHidden) {
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
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

    document.body.appendChild(outer);

    const widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    const inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    const widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);
    /**
     * Scrollbar width will be 0 on Mac OS with the
     * default "Only show scrollbars when scrolling" setting (Yosemite and up).
     * setting defult with to 20;
     */
    return widthNoScroll - widthWithScroll || 20;
  }


  /*
   * Nav button
   */
  moveLeft() {
    const childrenArr = this.el.nativeElement.children;
    const ele = this.el.nativeElement;
    if (this.currIndex !== 0) {
      // reach left most
      const scrollTo = ele.scrollLeft - childrenArr[this.currIndex - 1].clientWidth;
      this.scrollTo(ele, scrollTo, 500, () => {
        this.currIndex--;
      });
    }
  }

  moveRight() {
    const childrenArr = this.el.nativeElement.children;
    const ele = this.el.nativeElement;
    if (!this.scrollReachesRightEnd) {
      const scrollTo = ele.scrollLeft + childrenArr[this.currIndex].clientWidth;
      this.scrollTo(ele, scrollTo, 500, () => {
        this.currIndex++;
      });
    }
  }

  /*
  * The below solution is heavily inspired from
  * https://gist.github.com/andjosh/6764939
  */
  private scrollTo(element, to, duration, animationFinished?) {
    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    let self = this;
    if (!self.isAnimating) {
      self.isAnimating = true;
      let start = element.scrollLeft,
        change = to - start,
        currentTime = 0,
        increment = 20;

      let animateScroll = function() {
        currentTime += increment;
        let val = easeInOutQuad(currentTime, start, change, duration);
        element.scrollLeft = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        } else {
          // run one more frame to make sure the animation is fully finished
          setTimeout(() => {
            self.isAnimating = false;
            if (animationFinished) {
              animationFinished();
            }
            self.setNavStatus();
          }, increment);
        }
      };

      let easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };
      animateScroll();
    }
  }

  private snapToCurrentIndex() {
    const childrenArr = this.el.nativeElement.children;
    let childrenWidth = 0;
    const ele = this.el.nativeElement;
    for (let i = 0; i < childrenArr.length; i++) {
      if (i === childrenArr.length - 1) {
        this.currIndex = childrenArr.length;
        break;
      }

      const nextChildrenWidth = childrenWidth + childrenArr[i + 1].clientWidth;

      const currentClildWidth = childrenArr[i].clientWidth;
      const nextClildWidth = childrenArr[i + 1].clientWidth;

      if (ele.scrollLeft >= childrenWidth &&
          ele.scrollLeft <= nextChildrenWidth) {

        if (nextChildrenWidth - ele.scrollLeft > currentClildWidth / 2) {
          // roll back scrolling
          this.currIndex = i;
          this.scrollTo(ele, childrenWidth, 500);
        } else {
          // forward scrolling
          this.currIndex = i + 1;
          this.scrollTo(ele, childrenWidth + currentClildWidth, 500);
        }
        break;

      }
      childrenWidth += childrenArr[i].clientWidth;
    }
  }

  private setNavStatus() {
    const childrenArr = this.el.nativeElement.children;
    const ele = this.el.nativeElement;
    if (childrenArr.length <= 1) {
      // only one element
      this.reachesLeftBound.emit(true);
      this.reachesRightBound.emit(true);
    } else if (this.scrollReachesRightEnd) {
      // reached right end
      this.reachesLeftBound.emit(false);
      this.reachesRightBound.emit(true);
    } else if (this.currIndex === 0) {
      // reached left end
      this.reachesRightBound.emit(false);
      this.reachesLeftBound.emit(true);
    } else {
      // in the middle
      this.reachesLeftBound.emit(false);
      this.reachesRightBound.emit(false);
    }
  }

  private resetScrollLocation() {
    const ele = this.el.nativeElement;
    this.scrollTo(ele, 0, 0);
    this.currIndex = 0;
  }
}

@NgModule({
  exports: [DragScroll],
  declarations: [DragScroll]
})
export class DragScrollModule { }
