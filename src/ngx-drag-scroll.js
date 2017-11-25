"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
class DragScroll {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.reachesLeftBound = new core_1.EventEmitter();
        this.reachesRightBound = new core_1.EventEmitter();
        this.isPressed = false;
        this.isScrolling = false;
        this.downX = 0;
        this.downY = 0;
        this.displayType = 'block';
        this.onMouseMoveHandler = this.onMouseMove.bind(this);
        this.onMouseDownHandler = this.onMouseDown.bind(this);
        this.onScrollHandler = this.onScroll.bind(this);
        this.onMouseUpHandler = this.onMouseUp.bind(this);
        this.currIndex = 0;
        this.isAnimating = false;
        this.scrollReachesRightEnd = false;
        this.prevChildrenLength = 0;
        this.childrenArr = [];
        this.scrollbarWidth = `${this.getScrollbarWidth()}px`;
        el.nativeElement.style.overflow = 'auto';
        el.nativeElement.style.whiteSpace = 'noWrap';
        this.mouseDownListener = renderer.listen(el.nativeElement, 'mousedown', this.onMouseDownHandler);
        this.scrollListener = renderer.listen(el.nativeElement, 'scroll', this.onScrollHandler);
        this.mouseMoveListener = renderer.listen('document', 'mousemove', this.onMouseMoveHandler);
        this.mouseUpListener = renderer.listen('document', 'mouseup', this.onMouseUpHandler);
    }
    get scrollbarHidden() { return this._scrollbarHidden; }
    set scrollbarHidden(value) { this._scrollbarHidden = value; }
    ;
    get disabled() { return this._disabled; }
    set disabled(value) { this._disabled = value; }
    ;
    get xDisabled() { return this._xDisabled; }
    set xDisabled(value) { this._xDisabled = value; }
    ;
    get yDisabled() { return this._yDisabled; }
    set yDisabled(value) { this._yDisabled = value; }
    ;
    get dragDisabled() { return this._dragDisabled; }
    set dragDisabled(value) { this._dragDisabled = value; }
    ;
    get snapDisabled() { return this._snapDisabled; }
    set snapDisabled(value) { this._snapDisabled = value; }
    ;
    onResize() {
        this.markElDimension();
        this.resetScrollLocation();
        this.checkNavStatus();
    }
    attach({ disabled, scrollbarHidden, yDisabled, xDisabled }) {
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
        }
        else {
            this.enableScroll('x');
        }
        if (this.yDisabled || this.disabled) {
            this.disableScroll('y');
        }
        else {
            this.enableScroll('y');
        }
    }
    ngOnInit() {
        this.displayType = window.getComputedStyle(this.el.nativeElement).display;
        this.el.nativeElement.style.display = this.displayType;
        this.markElDimension();
        this.renderer.setAttribute(this.el.nativeElement, 'drag-scroll', 'true');
    }
    ngDoCheck() {
        this.childrenArr = this.el.nativeElement.children || [];
        if (this.childrenArr.length !== this.prevChildrenLength) {
            if (this.wrapper) {
                this.checkScrollbar();
            }
            this.prevChildrenLength = this.childrenArr.length;
            this.checkNavStatus();
        }
    }
    ngOnDestroy() {
        this.renderer.setAttribute(this.el.nativeElement, 'drag-scroll', 'false');
        this.mouseMoveListener();
        this.mouseUpListener();
    }
    onMouseMove(e) {
        if (this.isPressed && !this.disabled) {
            e.preventDefault();
            if (!this.xDisabled && !this.dragDisabled) {
                this.el.nativeElement.scrollLeft =
                    this.el.nativeElement.scrollLeft - e.clientX + this.downX;
                this.downX = e.clientX;
            }
            if (!this.yDisabled && !this.dragDisabled) {
                this.el.nativeElement.scrollTop =
                    this.el.nativeElement.scrollTop - e.clientY + this.downY;
                this.downY = e.clientY;
            }
        }
        return false;
    }
    onMouseDown(e) {
        this.isPressed = true;
        this.downX = e.clientX;
        this.downY = e.clientY;
        clearTimeout(this.scrollToTimer);
    }
    onScroll() {
        const ele = this.el.nativeElement;
        if ((ele.scrollLeft + ele.offsetWidth) >= ele.scrollWidth && this.currIndex !== 0) {
            this.scrollReachesRightEnd = true;
        }
        else {
            this.scrollReachesRightEnd = false;
        }
        this.checkNavStatus();
        if (!this.isPressed && !this.isAnimating && !this.snapDisabled) {
            this.isScrolling = true;
            clearTimeout(this.scrollTimer);
            this.scrollTimer = window.setTimeout(() => {
                this.isScrolling = false;
                this.snapToCurrentIndex();
            }, 500);
        }
    }
    onMouseUp(e) {
        e.preventDefault();
        if (this.isPressed) {
            this.isPressed = false;
            if (!this.snapDisabled) {
                this.snapToCurrentIndex();
            }
        }
        return false;
    }
    disableScroll(axis) {
        this.el.nativeElement.style[`overflow-${axis}`] = 'hidden';
    }
    enableScroll(axis) {
        this.el.nativeElement.style[`overflow-${axis}`] = 'auto';
    }
    hideScrollbar() {
        if (this.el.nativeElement.style.display !== 'none' && !this.wrapper) {
            this.parentNode = this.el.nativeElement.parentNode;
            this.wrapper = this.el.nativeElement.cloneNode(true);
            if (this.wrapper !== null) {
                while (this.wrapper.hasChildNodes()) {
                    if (this.wrapper.lastChild !== null) {
                        this.wrapper.removeChild(this.wrapper.lastChild);
                    }
                }
                this.wrapper.style.overflow = 'hidden';
                this.el.nativeElement.style.width = `calc(100% + ${this.scrollbarWidth})`;
                this.el.nativeElement.style.height = `calc(100% + ${this.scrollbarWidth})`;
                this.parentNode.replaceChild(this.wrapper, this.el.nativeElement);
                this.wrapper.appendChild(this.el.nativeElement);
            }
        }
    }
    showScrollbar() {
        if (this.wrapper) {
            this.el.nativeElement.style.width = this.elWidth;
            this.el.nativeElement.style.height = this.elHeight;
            this.parentNode.removeChild(this.wrapper);
            this.parentNode.appendChild(this.el.nativeElement);
            this.wrapper = null;
        }
    }
    checkScrollbar() {
        if (this.el.nativeElement.scrollWidth <= this.el.nativeElement.clientWidth) {
            this.el.nativeElement.style.height = '100%';
        }
        else {
            this.el.nativeElement.style.height = `calc(100% + ${this.scrollbarWidth})`;
        }
        if (this.el.nativeElement.scrollHeight <= this.el.nativeElement.clientHeight) {
            this.el.nativeElement.style.width = '100%';
        }
        else {
            this.el.nativeElement.style.width = `calc(100% + ${this.scrollbarWidth})`;
        }
    }
    setScrollBar() {
        if (this.scrollbarHidden) {
            this.hideScrollbar();
        }
        else {
            this.showScrollbar();
        }
    }
    getScrollbarWidth() {
        let widthNoScroll = 0;
        let widthWithScroll = 0;
        const outer = document.createElement('div');
        if (outer !== null) {
            outer.style.visibility = 'hidden';
            outer.style.width = '100px';
            outer.style.msOverflowStyle = 'scrollbar';
            document.body.appendChild(outer);
            widthNoScroll = outer.offsetWidth;
            outer.style.overflow = 'scroll';
            const inner = document.createElement('div');
            inner.style.width = '100%';
            outer.appendChild(inner);
            widthWithScroll = inner.offsetWidth;
            if (outer.parentNode !== null) {
                outer.parentNode.removeChild(outer);
            }
        }
        return widthNoScroll - widthWithScroll || 20;
    }
    moveLeft() {
        const ele = this.el.nativeElement;
        if (this.currIndex !== 0) {
            this.currIndex--;
            clearTimeout(this.scrollToTimer);
            this.scrollTo(ele, this.toChildrenLocation(), 500);
        }
    }
    moveRight() {
        const ele = this.el.nativeElement;
        if (!this.scrollReachesRightEnd && this.childrenArr[this.currIndex + 1]) {
            this.currIndex++;
            clearTimeout(this.scrollToTimer);
            this.scrollTo(ele, this.toChildrenLocation(), 500);
        }
    }
    moveTo(index) {
        const ele = this.el.nativeElement;
        if (index >= 0 && index !== this.currIndex && this.childrenArr[index]) {
            this.currIndex = index;
            clearTimeout(this.scrollToTimer);
            this.scrollTo(ele, this.toChildrenLocation(), 500);
        }
    }
    checkNavStatus() {
        const ele = this.el.nativeElement;
        let childrenWidth = 0;
        for (let i = 0; i < ele.children.length; i++) {
            childrenWidth += ele.children[i].clientWidth;
        }
        if (this.childrenArr.length <= 1 || ele.scrollWidth <= ele.clientWidth) {
            this.reachesLeftBound.emit(true);
            this.reachesRightBound.emit(true);
        }
        else if (this.scrollReachesRightEnd) {
            this.reachesLeftBound.emit(false);
            this.reachesRightBound.emit(true);
        }
        else if (ele.scrollLeft === 0 &&
            ele.scrollWidth > ele.clientWidth) {
            this.reachesLeftBound.emit(true);
            this.reachesRightBound.emit(false);
        }
        else {
            this.reachesLeftBound.emit(false);
            this.reachesRightBound.emit(false);
        }
    }
    scrollTo(element, to, duration) {
        const self = this;
        self.isAnimating = true;
        const start = element.scrollLeft, change = to - start, increment = 20;
        let currentTime = 0;
        const easeInOutQuad = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) {
                return c / 2 * t * t + b;
            }
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
        const animateScroll = function () {
            currentTime += increment;
            element.scrollLeft = easeInOutQuad(currentTime, start, change, duration);
            if (currentTime < duration) {
                self.scrollToTimer = window.setTimeout(animateScroll, increment);
            }
            else {
                setTimeout(() => {
                    self.isAnimating = false;
                }, increment);
            }
        };
        animateScroll();
    }
    snapToCurrentIndex() {
        let childrenWidth = 0;
        const ele = this.el.nativeElement;
        for (let i = 0; i < this.childrenArr.length; i++) {
            if (i === this.childrenArr.length - 1) {
                this.currIndex = this.childrenArr.length;
                break;
            }
            const nextChildrenWidth = childrenWidth + this.childrenArr[i + 1].clientWidth;
            const currentClildWidth = this.childrenArr[i].clientWidth;
            const nextClildWidth = this.childrenArr[i + 1].clientWidth;
            if (ele.scrollLeft >= childrenWidth &&
                ele.scrollLeft <= nextChildrenWidth) {
                if (nextChildrenWidth - ele.scrollLeft > currentClildWidth / 2 && !this.scrollReachesRightEnd) {
                    this.currIndex = i;
                    this.scrollTo(ele, childrenWidth, 500);
                }
                else {
                    this.currIndex = i + 1;
                    this.scrollTo(ele, childrenWidth + currentClildWidth, 500);
                }
                break;
            }
            childrenWidth += this.childrenArr[i].clientWidth;
        }
    }
    toChildrenLocation() {
        let to = 0;
        for (let i = 0; i < this.currIndex; i++) {
            to += this.childrenArr[this.currIndex].clientWidth;
        }
        return to;
    }
    resetScrollLocation() {
        const ele = this.el.nativeElement;
        this.scrollTo(ele, 0, 0);
        this.currIndex = 0;
    }
    markElDimension() {
        if (this.wrapper) {
            this.elWidth = this.wrapper.style.width;
            this.elHeight = this.wrapper.style.height;
        }
        else {
            this.elWidth = this.el.nativeElement.style.width;
            this.elHeight = this.el.nativeElement.style.height;
        }
    }
}
DragScroll.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[drag-scroll]'
            },] },
];
DragScroll.ctorParameters = () => [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
];
DragScroll.propDecorators = {
    "reachesLeftBound": [{ type: core_1.Output },],
    "reachesRightBound": [{ type: core_1.Output },],
    "scrollbarHidden": [{ type: core_1.Input, args: ['scrollbar-hidden',] },],
    "disabled": [{ type: core_1.Input, args: ['drag-scroll-disabled',] },],
    "xDisabled": [{ type: core_1.Input, args: ['drag-scroll-x-disabled',] },],
    "yDisabled": [{ type: core_1.Input, args: ['drag-scroll-y-disabled',] },],
    "dragDisabled": [{ type: core_1.Input, args: ['drag-disabled',] },],
    "snapDisabled": [{ type: core_1.Input, args: ['snap-disabled',] },],
    "onResize": [{ type: core_1.HostListener, args: ['window:resize', ['$event'],] },],
};
exports.DragScroll = DragScroll;
function DragScroll_tsickle_Closure_declarations() {
    DragScroll.decorators;
    DragScroll.ctorParameters;
    DragScroll.propDecorators;
    DragScroll.prototype.reachesLeftBound;
    DragScroll.prototype.reachesRightBound;
    DragScroll.prototype._scrollbarHidden;
    DragScroll.prototype._disabled;
    DragScroll.prototype._xDisabled;
    DragScroll.prototype._yDisabled;
    DragScroll.prototype._dragDisabled;
    DragScroll.prototype._snapDisabled;
    DragScroll.prototype.isPressed;
    DragScroll.prototype.isScrolling;
    DragScroll.prototype.scrollTimer;
    DragScroll.prototype.scrollToTimer;
    DragScroll.prototype.downX;
    DragScroll.prototype.downY;
    DragScroll.prototype.displayType;
    DragScroll.prototype.elWidth;
    DragScroll.prototype.elHeight;
    DragScroll.prototype.parentNode;
    DragScroll.prototype.wrapper;
    DragScroll.prototype.scrollbarWidth;
    DragScroll.prototype.onMouseMoveHandler;
    DragScroll.prototype.onMouseDownHandler;
    DragScroll.prototype.onScrollHandler;
    DragScroll.prototype.onMouseUpHandler;
    DragScroll.prototype.mouseMoveListener;
    DragScroll.prototype.mouseDownListener;
    DragScroll.prototype.scrollListener;
    DragScroll.prototype.mouseUpListener;
    DragScroll.prototype.currIndex;
    DragScroll.prototype.isAnimating;
    DragScroll.prototype.scrollReachesRightEnd;
    DragScroll.prototype.prevChildrenLength;
    DragScroll.prototype.childrenArr;
    DragScroll.prototype.el;
    DragScroll.prototype.renderer;
}
class DragScrollModule {
}
DragScrollModule.decorators = [
    { type: core_1.NgModule, args: [{
                exports: [DragScroll],
                declarations: [DragScroll]
            },] },
];
DragScrollModule.ctorParameters = () => [];
exports.DragScrollModule = DragScrollModule;
function DragScrollModule_tsickle_Closure_declarations() {
    DragScrollModule.decorators;
    DragScrollModule.ctorParameters;
}
//# sourceMappingURL=ngx-drag-scroll.js.map