import {
  NgModule,
  Directive,
  ElementRef,
  Renderer,
  OnDestroy,
  Input,
  OnInit,
  OnChanges,
  AfterViewChecked,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[drag-scroll]'
})
export class DragScroll implements OnDestroy, OnInit, OnChanges, AfterViewChecked {

  private _scrollbarHidden: boolean;

  private _disabled: boolean;

  private _xDisabled: boolean;

  private _yDisabled: boolean;

  private _nav: boolean;
  /**
   * Is the user currently pressing the element
   */
  isPressed = false;

  /**
   * The x coordinates on the element
   */
  downX = 0;

  /**
   * The y coordinates on the element
   */
  downY = 0;

  /**
   * The bounding ClientRect on the element
   */
  rect: ClientRect;

  displayType = 'block';

  parentNode: HTMLElement;

  wrapper: HTMLDivElement;

  scrollbarWidth: string;

  onMouseMoveHandler = this.onMouseMove.bind(this);
  onMouseUpHandler = this.onMouseUp.bind(this);

  mouseMoveListener: Function;
  mouseDownListener: Function;


  /*
   * Nav buttons
   */
  prevBtn = document.createElement('button');
  nextBtn = document.createElement('button');
  prevBtnDownListener: Function;
  nextBtnDownListener: Function;
  navBtnDiv: HTMLElement;
  navInterval: number;

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

  @Input('drag-scroll-nav')
  get nav() { return this._nav; }
  set nav(value: boolean) { this._nav = value; };

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    e.preventDefault();
    this.isPressed = true;
    this.downX = e.clientX;
    this.downY = e.clientY;
    return false;
  }


  constructor(
    private el: ElementRef, private renderer: Renderer
  ) {
    this.scrollbarWidth = `${this.getScrollbarWidth()}px`;
    el.nativeElement.style.overflow = 'auto';
    el.nativeElement.style.whiteSpace = 'noWrap';

    this.mouseMoveListener = renderer.listenGlobal('document', 'mousemove', this.onMouseMoveHandler);
    this.mouseDownListener = renderer.listenGlobal('document', 'mouseup', this.onMouseUpHandler);
  }

  ngOnChanges() {
    if (this.scrollbarHidden) {
      this.hideScrollbar();
    } else {
      this.showScrollbar();
    }

    if (this.nav) {
      this.showNavButton();
    } else {
      this.hideNavButton();
    }

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
    this.rect = this.el.nativeElement.getBoundingClientRect();
    this.renderer.setElementAttribute(this.el.nativeElement, 'drag-scroll', 'true');
  }

  ngAfterViewChecked() {
    // avoid extra ckecks
    if (this.wrapper) {
      this.checkScrollbar();
    }
  }

  onMouseMove(e: MouseEvent) {
    if (this.isPressed && !this.disabled) {
      e.preventDefault();
      // Drag X
      if (!this.xDisabled) {
        this.el.nativeElement.scrollLeft =
          this.el.nativeElement.scrollLeft - e.clientX + this.downX;
        this.downX = e.clientX;
      }

      // Drag Y
      if (!this.yDisabled) {
        this.el.nativeElement.scrollTop =
          this.el.nativeElement.scrollTop - e.clientY + this.downY;
        this.downY = e.clientY;
      }
    }
    return false;
  }

  onMouseUp(e: MouseEvent) {
    e.preventDefault();
    window.clearInterval(this.navInterval);
    this.isPressed = false;
    return false;
  }

  private disableScroll(axis: string): void {
    this.el.nativeElement.style[`overflow-${axis}`] = 'hidden';
  }

  private enableScroll(axis: string): void {
    this.el.nativeElement.style[`overflow-${axis}`] = 'auto';
  }

  private hideScrollbar(): void {
    if (this.el.nativeElement.style.display !== 'none') {
      this.parentNode = this.el.nativeElement.parentNode;
      this.wrapper = document.createElement('div');
      this.wrapper.style.width = this.el.nativeElement.offsetWidth + 'px';
      this.wrapper.style.height = this.el.nativeElement.offsetHeight + 'px';
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
      this.el.nativeElement.style.width = this.wrapper.style.width;
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
      this.el.nativeElement.style.width = `calc(100% + ${this.scrollbarWidth})`;
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

  showNavButton() {
    this.navBtnDiv = document.createElement('div');
    this.navBtnDiv.style.position = 'absolute';
    this.navBtnDiv.style.left = '50%';
    this.navBtnDiv.style.transform = 'translate(-50%, 0)';
    this.prevBtn.innerHTML = 'prev';
    this.nextBtn.innerHTML = 'next';

    this.nextBtnDownListener = this.renderer.listen(this.nextBtn, 'mousedown', () => {
      this.navInterval = window.setInterval(() => {
        this.el.nativeElement.scrollLeft += 8;
      }, 10);
    });

    this.prevBtnDownListener = this.renderer.listen(this.prevBtn, 'mousedown', () => {
      this.navInterval = window.setInterval(() => {
        this.el.nativeElement.scrollLeft -= 8;
      }, 10);
    });

    this.navBtnDiv.appendChild(this.prevBtn);
    this.navBtnDiv.appendChild(this.nextBtn);
    this.el.nativeElement.parentNode.appendChild(this.navBtnDiv);
  }

  hideNavButton() {
    if (this.navBtnDiv) {
      this.el.nativeElement.parentNode.removeChild(this.navBtnDiv);
      this.nextBtnDownListener();
      this.prevBtnDownListener();
    }
  }

  ngOnDestroy() {
    this.renderer.setElementAttribute(this.el.nativeElement, 'drag-scroll', 'false');
    this.mouseMoveListener();
    this.mouseDownListener();
    this.hideNavButton();
  }
}

@NgModule({
  exports: [DragScroll],
  declarations: [DragScroll]
})
export class DragScrollModule { }
