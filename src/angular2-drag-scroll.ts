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
import { DragScrollOption } from './interface/drag-scroll-option';

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
  onMouseDownHandler = this.onMouseDown.bind(this);
  onMouseUpHandler = this.onMouseUp.bind(this);

  mouseMoveListener: Function;
  mouseDownListener: Function;
  mouseUpListener: Function;
  nextMouseUpListener: Function;
  prevMouseUpListener: Function;
  nextTouchEndListener: Function;
  prevTouchEndListener: Function;


  /*
   * Nav buttons
   */
  prevBtn = document.createElement('button');
  nextBtn = document.createElement('button');
  prevBtnDownListener: Function;
  prevTouchStartListener: Function;
  nextBtnDownListener: Function;
  nextTouchStartListener: Function;
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setScrollBar(true);
  }

  constructor(
    private el: ElementRef, private renderer: Renderer
  ) {
    this.scrollbarWidth = `${this.getScrollbarWidth()}px`;
    el.nativeElement.style.overflow = 'auto';
    el.nativeElement.style.whiteSpace = 'noWrap';

    this.mouseMoveListener = renderer.listenGlobal('document', 'mousemove', this.onMouseMoveHandler);
    this.mouseDownListener = renderer.listenGlobal(el.nativeElement, 'mousedown', this.onMouseDownHandler);
    this.mouseUpListener = renderer.listenGlobal('document', 'mouseup', this.onMouseUpHandler);
  }

  public attach({disabled, scrollbarHidden, yDisabled, xDisabled, nav}: DragScrollOption): void {
    this.disabled = disabled;
    this.scrollbarHidden = scrollbarHidden;
    this.yDisabled = yDisabled;
    this.xDisabled = xDisabled;
    this.nav = nav;
    this.ngOnChanges();
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

    if (this.nav) {
      this.showNavButton();
    } else {
      this.hideNavButton();
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

  ngOnDestroy() {
    this.renderer.setElementAttribute(this.el.nativeElement, 'drag-scroll', 'false');
    this.mouseMoveListener();
    this.mouseUpListener();
    this.hideNavButton();
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

  onMouseDown(e: MouseEvent) {
    this.isPressed = true;
    this.downX = e.clientX;
    this.downY = e.clientY;
  }

  onMouseUp(e: MouseEvent) {
    e.preventDefault();
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
    if (this.el.nativeElement.style.display !== 'none' && !this.wrapper) {
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

  showNavButton() {
    this.navBtnDiv = document.createElement('div');
    this.navBtnDiv.style.position = 'absolute';
    this.navBtnDiv.style.left = '50%';
    this.navBtnDiv.style.transform = 'translate(-50%, 0)';

    this.prevBtn.innerHTML = 'prev';
    this.prevBtn.style['-moz-user-select'] = 'none';
    this.prevBtn.style['-webkit-user-select'] = 'none';

    this.nextBtn.innerHTML = 'next';
    this.nextBtn.style['-moz-user-select'] = 'none';
    this.nextBtn.style['-webkit-user-select'] = 'none';

    if (this.mobileAndTabletcheck()) {
      this.registerNavMobileListeners();
    } else {
      this.registerNavBrowserListeners();
    }

    this.navBtnDiv.appendChild(this.prevBtn);
    this.navBtnDiv.appendChild(this.nextBtn);
    this.el.nativeElement.appendChild(this.navBtnDiv);
  }

  moveLeft(speed: number, stop?: boolean) {
    this.navInterval = window.setInterval(() => {
      this.el.nativeElement.scrollLeft -= 8;
    }, speed);
  }

  moveRight(speed: number, stop?: boolean) {
    this.navInterval = window.setInterval(() => {
      this.el.nativeElement.scrollLeft += 8;
    }, speed);
  }

  stopNavMov() {
    clearInterval(this.navInterval);
    this.navInterval = null;
  }

  hideNavButton() {
    if (this.navBtnDiv) {
      this.el.nativeElement.parentNode.removeChild(this.navBtnDiv);
      this.nextBtnDownListener();
      this.prevBtnDownListener();
      this.nextMouseUpListener();
      this.prevMouseUpListener();
      this.prevTouchStartListener();
      this.nextTouchStartListener();
      this.prevTouchEndListener();
      this.nextTouchEndListener();
    }
  }

  registerNavBrowserListeners() {
    this.nextBtnDownListener = this.renderer.listen(this.nextBtn, 'mousedown', () => {
      this.moveRight(10);
    });
    this.prevBtnDownListener = this.renderer.listen(this.prevBtn, 'mousedown', () => {
      this.moveLeft(10);
    });
    this.nextMouseUpListener = this.renderer.listen(this.nextBtn, 'mouseup', this.stopNavMov.bind(this));
    this.prevMouseUpListener = this.renderer.listen(this.prevBtn, 'mouseup', this.stopNavMov.bind(this));
  }

  registerNavMobileListeners() {
    this.nextTouchStartListener = this.renderer.listen(this.nextBtn, 'touchstart', () => {
      this.moveRight(10);
    });
    this.prevTouchStartListener = this.renderer.listen(this.prevBtn, 'touchstart', () => {
      this.moveLeft(10);
    });
    this.nextTouchEndListener = this.renderer.listen(this.nextBtn, 'touchend', this.stopNavMov.bind(this));
    this.prevTouchEndListener = this.renderer.listen(this.prevBtn, 'touchend', this.stopNavMov.bind(this));
  }

  mobileAndTabletcheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window['opera']);
    return check;
  };
}

@NgModule({
  exports: [DragScroll],
  declarations: [DragScroll]
})
export class DragScrollModule { }
