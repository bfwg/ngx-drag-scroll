(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../src/index.ts":
/*!***********************!*\
  !*** ../src/index.ts ***!
  \***********************/
/*! exports provided: DragScrollModule, DragScrollComponent, DragScrollItemDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ngx_drag_scroll_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ngx-drag-scroll.module */ "../src/ngx-drag-scroll.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DragScrollModule", function() { return _ngx_drag_scroll_module__WEBPACK_IMPORTED_MODULE_0__["DragScrollModule"]; });

/* harmony import */ var _ngx_drag_scroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ngx-drag-scroll */ "../src/ngx-drag-scroll.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DragScrollComponent", function() { return _ngx_drag_scroll__WEBPACK_IMPORTED_MODULE_1__["DragScrollComponent"]; });

/* harmony import */ var _ngx_drag_scroll_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ngx-drag-scroll-item */ "../src/ngx-drag-scroll-item.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DragScrollItemDirective", function() { return _ngx_drag_scroll_item__WEBPACK_IMPORTED_MODULE_2__["DragScrollItemDirective"]; });






/***/ }),

/***/ "../src/ngx-drag-scroll-item.ts":
/*!**************************************!*\
  !*** ../src/ngx-drag-scroll-item.ts ***!
  \**************************************/
/*! exports provided: DragScrollItemDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragScrollItemDirective", function() { return DragScrollItemDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DragScrollItemDirective = /** @class */ (function () {
    function DragScrollItemDirective(elementRef) {
        this.elementRef = elementRef;
        this.display = 'inline-block';
        this._elementRef = elementRef;
    }
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"])('style.display'),
        __metadata("design:type", Object)
    ], DragScrollItemDirective.prototype, "display", void 0);
    DragScrollItemDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[drag-scroll-item]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], DragScrollItemDirective);
    return DragScrollItemDirective;
}());



/***/ }),

/***/ "../src/ngx-drag-scroll.module.ts":
/*!****************************************!*\
  !*** ../src/ngx-drag-scroll.module.ts ***!
  \****************************************/
/*! exports provided: DragScrollModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragScrollModule", function() { return DragScrollModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngx_drag_scroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ngx-drag-scroll */ "../src/ngx-drag-scroll.ts");
/* harmony import */ var _ngx_drag_scroll_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ngx-drag-scroll-item */ "../src/ngx-drag-scroll-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DragScrollModule = /** @class */ (function () {
    function DragScrollModule() {
    }
    DragScrollModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            exports: [
                _ngx_drag_scroll__WEBPACK_IMPORTED_MODULE_1__["DragScrollComponent"],
                _ngx_drag_scroll_item__WEBPACK_IMPORTED_MODULE_2__["DragScrollItemDirective"]
            ],
            declarations: [
                _ngx_drag_scroll__WEBPACK_IMPORTED_MODULE_1__["DragScrollComponent"],
                _ngx_drag_scroll_item__WEBPACK_IMPORTED_MODULE_2__["DragScrollItemDirective"]
            ]
        })
    ], DragScrollModule);
    return DragScrollModule;
}());



/***/ }),

/***/ "../src/ngx-drag-scroll.ts":
/*!*********************************!*\
  !*** ../src/ngx-drag-scroll.ts ***!
  \*********************************/
/*! exports provided: DragScrollComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragScrollComponent", function() { return DragScrollComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngx_drag_scroll_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ngx-drag-scroll-item */ "../src/ngx-drag-scroll-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DragScrollComponent = /** @class */ (function () {
    function DragScrollComponent(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._index = 0;
        this._scrollbarHidden = false;
        this._disabled = false;
        this._xDisabled = false;
        this._yDisabled = false;
        this._dragDisabled = false;
        this._snapDisabled = false;
        this._snapOffset = 0;
        this._snapDuration = 500;
        /**
         * Is the user currently pressing the element
         */
        this.isPressed = false;
        /**
         * Is the user currently scrolling the element
         */
        this.isScrolling = false;
        this.scrollTimer = -1;
        this.scrollToTimer = -1;
        /**
         * The x coordinates on the element
         */
        this.downX = 0;
        /**
         * The y coordinates on the element
         */
        this.downY = 0;
        this.displayType = 'block';
        this.elWidth = null;
        this.elHeight = null;
        this.scrollbarWidth = null;
        this.isAnimating = false;
        this.scrollReachesRightEnd = false;
        this.prevChildrenLength = 0;
        this.indexChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.reachesLeftBound = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.reachesRightBound = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.snapAnimationFinished = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.scrollbarWidth = this.getScrollbarWidth() + "px";
    }
    Object.defineProperty(DragScrollComponent.prototype, "currIndex", {
        get: function () { return this._index; },
        set: function (value) {
            if (value !== this._index) {
                this._index = value;
                this.indexChanged.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragScrollComponent.prototype, "scrollbarHidden", {
        /**
         * Whether the scrollbar is hidden
         */
        get: function () { return this._scrollbarHidden; },
        set: function (value) { this._scrollbarHidden = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragScrollComponent.prototype, "disabled", {
        /**
         * Whether horizontally and vertically draging and scrolling is be disabled
         */
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragScrollComponent.prototype, "xDisabled", {
        /**
         * Whether horizontally dragging and scrolling is be disabled
         */
        get: function () { return this._xDisabled; },
        set: function (value) { this._xDisabled = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragScrollComponent.prototype, "yDisabled", {
        /**
         * Whether vertically dragging and scrolling events is disabled
         */
        get: function () { return this._yDisabled; },
        set: function (value) { this._yDisabled = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragScrollComponent.prototype, "dragDisabled", {
        get: function () { return this._dragDisabled; },
        set: function (value) { this._dragDisabled = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragScrollComponent.prototype, "snapDisabled", {
        get: function () { return this._snapDisabled; },
        set: function (value) { this._snapDisabled = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragScrollComponent.prototype, "snapOffset", {
        get: function () { return this._snapOffset; },
        set: function (value) { this._snapOffset = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragScrollComponent.prototype, "snapDuration", {
        get: function () { return this._snapDuration; },
        set: function (value) { this._snapDuration = value; },
        enumerable: true,
        configurable: true
    });
    DragScrollComponent.prototype.ngOnChanges = function () {
        this.setScrollBar();
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
    };
    DragScrollComponent.prototype.ngAfterViewInit = function () {
        // auto assign computed css
        this._renderer.setAttribute(this._contentRef.nativeElement, 'drag-scroll', 'true');
        this.displayType = window.getComputedStyle(this._elementRef.nativeElement).display;
        this._renderer.setStyle(this._contentRef.nativeElement, 'display', this.displayType);
        this._renderer.setStyle(this._contentRef.nativeElement, 'whiteSpace', 'noWrap');
        // store ele width height for later user
        this.markElDimension();
        this._renderer.setStyle(this._contentRef.nativeElement, 'width', this.elWidth);
        this._renderer.setStyle(this._contentRef.nativeElement, 'height', this.elHeight);
        if (this.wrapper) {
            this.checkScrollbar();
        }
        this._renderer.listen(this._contentRef.nativeElement, 'mousedown', this.onMouseDownHandler.bind(this));
        this._renderer.listen(this._contentRef.nativeElement, 'scroll', this.onScrollHandler.bind(this));
        this._renderer.listen('document', 'mousemove', this.onMouseMoveHandler.bind(this));
        this._renderer.listen('document', 'mouseup', this.onMouseUpHandler.bind(this));
        // prevent Firefox from dragging images
        this._renderer.listen('document', 'dragstart', function (e) {
            e.preventDefault();
        });
        this.checkNavStatus();
    };
    DragScrollComponent.prototype.ngAfterViewChecked = function () {
        // avoid extra checks
        if (this._children['_results'].length !== this.prevChildrenLength) {
            this.markElDimension();
            this.checkScrollbar();
            this.prevChildrenLength = this._children['_results'].length;
            this.checkNavStatus();
        }
    };
    DragScrollComponent.prototype.ngOnDestroy = function () {
        this._renderer.setAttribute(this._contentRef.nativeElement, 'drag-scroll', 'false');
    };
    DragScrollComponent.prototype.onMouseMoveHandler = function (event) {
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
    DragScrollComponent.prototype.onMouseDownHandler = function (event) {
        this.isPressed = true;
        this.downX = event.clientX;
        this.downY = event.clientY;
        clearTimeout(this.scrollToTimer);
    };
    DragScrollComponent.prototype.onScrollHandler = function () {
        var _this = this;
        var scrollLeftPos = this._contentRef.nativeElement.scrollLeft + this._contentRef.nativeElement.offsetWidth;
        if (scrollLeftPos >= this._contentRef.nativeElement.scrollWidth) {
            this.scrollReachesRightEnd = true;
        }
        else {
            this.scrollReachesRightEnd = false;
        }
        this.checkNavStatus();
        if (!this.isPressed && !this.isAnimating && !this.snapDisabled) {
            this.isScrolling = true;
            clearTimeout(this.scrollTimer);
            this.scrollTimer = window.setTimeout(function () {
                _this.isScrolling = false;
                _this.locateCurrentIndex(true);
            }, 500);
        }
        else {
            this.locateCurrentIndex();
        }
    };
    DragScrollComponent.prototype.onMouseUpHandler = function (event) {
        if (this.isPressed) {
            this.isPressed = false;
            if (!this.snapDisabled) {
                this.locateCurrentIndex(true);
            }
            else {
                this.locateCurrentIndex();
            }
        }
    };
    /*
     * Nav button
     */
    DragScrollComponent.prototype.moveLeft = function () {
        if ((this.currIndex !== 0 || this.snapDisabled)) {
            this.currIndex--;
            clearTimeout(this.scrollToTimer);
            this.scrollTo(this._contentRef.nativeElement, this.toChildrenLocation(), this.snapDuration);
        }
    };
    DragScrollComponent.prototype.moveRight = function () {
        var container = this.wrapper || this.parentNode;
        var containerWidth = container ? container.clientWidth : 0;
        if (!this.scrollReachesRightEnd && this.currIndex < this.maximumIndex(containerWidth, this._children)) {
            this.currIndex++;
            clearTimeout(this.scrollToTimer);
            this.scrollTo(this._contentRef.nativeElement, this.toChildrenLocation(), this.snapDuration);
        }
    };
    DragScrollComponent.prototype.moveTo = function (index) {
        var container = this.wrapper || this.parentNode;
        var containerWidth = container ? container.clientWidth : 0;
        if (index >= 0 &&
            index !== this.currIndex &&
            this.currIndex < this.maximumIndex(containerWidth, this._children)) {
            this.currIndex = index;
            clearTimeout(this.scrollToTimer);
            this.scrollTo(this._contentRef.nativeElement, this.toChildrenLocation(), this.snapDuration);
        }
    };
    DragScrollComponent.prototype.checkNavStatus = function () {
        var _this = this;
        setTimeout(function () {
            var onlyOneItem = Boolean(_this._children['_results'].length <= 1);
            var containerIsLargerThanContent = Boolean(_this._contentRef.nativeElement.scrollWidth <=
                _this._contentRef.nativeElement.clientWidth);
            if (onlyOneItem || containerIsLargerThanContent) {
                // only one element
                _this.reachesLeftBound.emit(true);
                _this.reachesRightBound.emit(true);
            }
            else if (_this.scrollReachesRightEnd) {
                // reached right end
                _this.reachesLeftBound.emit(false);
                _this.reachesRightBound.emit(true);
            }
            else if (_this._contentRef.nativeElement.scrollLeft === 0 &&
                _this._contentRef.nativeElement.scrollWidth > _this._contentRef.nativeElement.clientWidth) {
                // reached left end
                _this.reachesLeftBound.emit(true);
                _this.reachesRightBound.emit(false);
            }
            else {
                // in the middle
                _this.reachesLeftBound.emit(false);
                _this.reachesRightBound.emit(false);
            }
        }, 0);
    };
    DragScrollComponent.prototype.disableScroll = function (axis) {
        this._renderer.setStyle(this._contentRef.nativeElement, "overflow-" + axis, 'hidden');
    };
    DragScrollComponent.prototype.enableScroll = function (axis) {
        this._renderer.setStyle(this._contentRef.nativeElement, "overflow-" + axis, 'auto');
    };
    DragScrollComponent.prototype.hideScrollbar = function () {
        if (this._contentRef.nativeElement.style.display !== 'none' && !this.wrapper) {
            this.parentNode = this._contentRef.nativeElement.parentNode;
            // create container element
            this.wrapper = this._renderer.createElement('div');
            this._renderer.setAttribute(this.wrapper, 'class', 'drag-scroll-wrapper');
            this._renderer.addClass(this.wrapper, 'drag-scroll-container');
            this._renderer.setStyle(this.wrapper, 'width', '100%');
            this._renderer.setStyle(this.wrapper, 'height', this._elementRef.nativeElement.style.height
                || this._elementRef.nativeElement.offsetHeight + 'px');
            this._renderer.setStyle(this.wrapper, 'overflow', 'hidden');
            this._renderer.setStyle(this._contentRef.nativeElement, 'width', "calc(100% + " + this.scrollbarWidth + ")");
            this._renderer.setStyle(this._contentRef.nativeElement, 'height', "calc(100% + " + this.scrollbarWidth + ")");
            // Append container element to component element.
            this._renderer.appendChild(this._elementRef.nativeElement, this.wrapper);
            // Append content element to container element.
            this._renderer.appendChild(this.wrapper, this._contentRef.nativeElement);
        }
    };
    DragScrollComponent.prototype.showScrollbar = function () {
        if (this.wrapper) {
            this._renderer.setStyle(this._contentRef.nativeElement, 'width', '100%');
            this._renderer.setStyle(this._contentRef.nativeElement, 'height', this.wrapper.style.height);
            if (this.parentNode !== null) {
                this.parentNode.removeChild(this.wrapper);
                this.parentNode.appendChild(this._contentRef.nativeElement);
            }
            this.wrapper = null;
        }
    };
    DragScrollComponent.prototype.checkScrollbar = function () {
        if (this._contentRef.nativeElement.scrollWidth <= this._contentRef.nativeElement.clientWidth) {
            this._renderer.setStyle(this._contentRef.nativeElement, 'height', '100%');
        }
        else {
            this._renderer.setStyle(this._contentRef.nativeElement, 'height', "calc(100% + " + this.scrollbarWidth + ")");
        }
        if (this._contentRef.nativeElement.scrollHeight <= this._contentRef.nativeElement.clientHeight) {
            this._renderer.setStyle(this._contentRef.nativeElement, 'width', '100%');
        }
        else {
            this._renderer.setStyle(this._contentRef.nativeElement, 'width', "calc(100% + " + this.scrollbarWidth + ")");
        }
    };
    DragScrollComponent.prototype.setScrollBar = function () {
        if (this.scrollbarHidden) {
            this.hideScrollbar();
        }
        else {
            this.showScrollbar();
        }
    };
    DragScrollComponent.prototype.getScrollbarWidth = function () {
        /**
         * Browser Scrollbar Widths (2016)
         * OSX (Chrome, Safari, Firefox) - 15px
         * Windows XP (IE7, Chrome, Firefox) - 17px
         * Windows 7 (IE10, IE11, Chrome, Firefox) - 17px
         * Windows 8.1 (IE11, Chrome, Firefox) - 17px
         * Windows 10 (IE11, Chrome, Firefox) - 17px
         * Windows 10 (Edge 12/13) - 12px
         */
        var outer = this._renderer.createElement('div');
        this._renderer.setStyle(outer, 'visibility', 'hidden');
        this._renderer.setStyle(outer, 'width', '100px');
        this._renderer.setStyle(outer, 'msOverflowStyle', 'scrollbar'); // needed for WinJS apps
        // document.body.appendChild(outer);
        this._renderer.appendChild(document.body, outer);
        // this._renderer.appendChild(this._renderer.selectRootElement('body'), outer);
        var widthNoScroll = outer.offsetWidth;
        // force scrollbars
        this._renderer.setStyle(outer, 'overflow', 'scroll');
        // add innerdiv
        var inner = this._renderer.createElement('div');
        this._renderer.setStyle(inner, 'width', '100%');
        this._renderer.appendChild(outer, inner);
        var widthWithScroll = inner.offsetWidth;
        // remove divs
        this._renderer.removeChild(document.body, outer);
        /**
         * Scrollbar width will be 0 on Mac OS with the
         * default "Only show scrollbars when scrolling" setting (Yosemite and up).
         * setting default width to 20;
         */
        return widthNoScroll - widthWithScroll || 20;
    };
    /*
    * The below solution is heavily inspired from
    * https://gist.github.com/andjosh/6764939
    */
    DragScrollComponent.prototype.scrollTo = function (element, to, duration) {
        var self = this;
        self.isAnimating = true;
        var start = element.scrollLeft, change = to - start - this.snapOffset, increment = 20;
        var currentTime = 0;
        // t = current time
        // b = start value
        // c = change in value
        // d = duration
        var easeInOutQuad = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) {
                return c / 2 * t * t + b;
            }
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
        var animateScroll = function () {
            currentTime += increment;
            element.scrollLeft = easeInOutQuad(currentTime, start, change, duration);
            if (currentTime < duration) {
                self.scrollToTimer = window.setTimeout(animateScroll, increment);
            }
            else {
                // run one more frame to make sure the animation is fully finished
                setTimeout(function () {
                    self.isAnimating = false;
                    self.snapAnimationFinished.emit(self.currIndex);
                }, increment);
            }
        };
        animateScroll();
    };
    DragScrollComponent.prototype.locateCurrentIndex = function (snap) {
        var _this = this;
        this.currentChildWidth(function (currentChildWidth, nextChildrenWidth, childrenWidth, idx, stop) {
            if ((_this._contentRef.nativeElement.scrollLeft >= childrenWidth &&
                _this._contentRef.nativeElement.scrollLeft <= nextChildrenWidth)) {
                if (nextChildrenWidth - _this._contentRef.nativeElement.scrollLeft > currentChildWidth / 2 && !_this.scrollReachesRightEnd) {
                    // roll back scrolling
                    if (!_this.isAnimating) {
                        _this.currIndex = idx;
                    }
                    if (snap) {
                        _this.scrollTo(_this._contentRef.nativeElement, childrenWidth, _this.snapDuration);
                    }
                }
                else {
                    // forward scrolling
                    if (!_this.isAnimating) {
                        _this.currIndex = idx + 1;
                    }
                    if (snap) {
                        _this.scrollTo(_this._contentRef.nativeElement, childrenWidth + currentChildWidth, _this.snapDuration);
                    }
                }
                stop();
            }
            else if ((idx + 1) === (_this._children['_results'].length - 1)) {
                // reaches last index
                if (!_this.isAnimating) {
                    _this.currIndex = idx + 1;
                }
                stop();
            }
        });
    };
    DragScrollComponent.prototype.currentChildWidth = function (cb) {
        var childrenWidth = 0;
        var shouldBreak = false;
        var breakFunc = function () {
            shouldBreak = true;
        };
        for (var i = 0; i < this._children['_results'].length; i++) {
            if (i === this._children['_results'].length - 1) {
                break;
            }
            if (shouldBreak) {
                break;
            }
            var nextChildrenWidth = childrenWidth + this._children['_results'][i + 1]._elementRef.nativeElement.clientWidth;
            var currentClildWidth = this._children['_results'][i]._elementRef.nativeElement.clientWidth;
            cb(currentClildWidth, nextChildrenWidth, childrenWidth, i, breakFunc);
            childrenWidth += currentClildWidth;
        }
    };
    DragScrollComponent.prototype.toChildrenLocation = function () {
        var to = 0;
        for (var i = 0; i < this.currIndex; i++) {
            to += this._children['_results'][i]._elementRef.nativeElement.clientWidth;
        }
        return to;
    };
    DragScrollComponent.prototype.markElDimension = function () {
        if (this.wrapper) {
            this.elWidth = this.wrapper.style.width;
            this.elHeight = this.wrapper.style.height;
        }
        else {
            this.elWidth = this._elementRef.nativeElement.style.width || (this._elementRef.nativeElement.offsetWidth + 'px');
            this.elHeight = this._elementRef.nativeElement.style.height || (this._elementRef.nativeElement.offsetHeight + 'px');
        }
    };
    DragScrollComponent.prototype.maximumIndex = function (containerWidth, childrenElements) {
        var count = 0;
        var childrenWidth = 0;
        for (var i = 0; i <= childrenElements['_results'].length; i++) {
            // last N element
            var dragScrollItemDirective = childrenElements['_results'][childrenElements['_results'].length - 1 - i];
            childrenWidth += dragScrollItemDirective._elementRef.nativeElement.clientWidth;
            if (childrenWidth < containerWidth) {
                count++;
            }
            else {
                break;
            }
        }
        return childrenElements.length - count;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('contentRef'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], DragScrollComponent.prototype, "_contentRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChildren"])(_ngx_drag_scroll_item__WEBPACK_IMPORTED_MODULE_1__["DragScrollItemDirective"]),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["QueryList"])
    ], DragScrollComponent.prototype, "_children", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], DragScrollComponent.prototype, "indexChanged", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], DragScrollComponent.prototype, "reachesLeftBound", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], DragScrollComponent.prototype, "reachesRightBound", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], DragScrollComponent.prototype, "snapAnimationFinished", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('scrollbar-hidden'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Boolean])
    ], DragScrollComponent.prototype, "scrollbarHidden", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('drag-scroll-disabled'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Boolean])
    ], DragScrollComponent.prototype, "disabled", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('drag-scroll-x-disabled'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Boolean])
    ], DragScrollComponent.prototype, "xDisabled", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('drag-scroll-y-disabled'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Boolean])
    ], DragScrollComponent.prototype, "yDisabled", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('drag-disabled'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Boolean])
    ], DragScrollComponent.prototype, "dragDisabled", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('snap-disabled'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Boolean])
    ], DragScrollComponent.prototype, "snapDisabled", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('snap-offset'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Number])
    ], DragScrollComponent.prototype, "snapOffset", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('snap-duration'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Number])
    ], DragScrollComponent.prototype, "snapDuration", null);
    DragScrollComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'drag-scroll',
            template: "\n    <div class=\"drag-scroll-content\" #contentRef>\n      <ng-content></ng-content>\n    </div>\n  ",
            styles: ["\n    :host {\n      overflow: hidden;\n      display: block;\n    }\n    .drag-scroll-content {\n      height: 100%;\n      overflow: auto;\n      white-space: nowrap;\n    }\n    "]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]])
    ], DragScrollComponent);
    return DragScrollComponent;
}());



/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./app/app-routing.module.ts":
/*!***********************************!*\
  !*** ./app/app-routing.module.ts ***!
  \***********************************/
/*! exports provided: routes, AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home/home.component */ "./app/home/home.component.ts");
/* harmony import */ var _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./not-found/not-found.component */ "./app/not-found/not-found.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: '',
        component: _home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"],
        pathMatch: 'full'
    },
    {
        path: '404',
        component: _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_3__["NotFoundComponent"]
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
            providers: []
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./app/app.component.css":
/*!*******************************!*\
  !*** ./app/app.component.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: #fafafa;\n  color: rgba(0,0,0,.54);\n  font-family: Roboto,\"Helvetica Neue\";\n}\n\n"

/***/ }),

/***/ "./app/app.component.html":
/*!********************************!*\
  !*** ./app/app.component.html ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n<div class=\"content\">\n  <router-outlet></router-outlet>\n</div>\n<app-footer></app-footer>\n"

/***/ }),

/***/ "./app/app.component.ts":
/*!******************************!*\
  !*** ./app/app.component.ts ***!
  \******************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./app/app.module.ts":
/*!***************************!*\
  !*** ./app/app.module.ts ***!
  \***************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./app/app.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./header/header.component */ "./app/header/header.component.ts");
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../src */ "../src/index.ts");
/* harmony import */ var _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./not-found/not-found.component */ "./app/not-found/not-found.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app-routing.module */ "./app/app-routing.module.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./home/home.component */ "./app/home/home.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./footer/footer.component */ "./app/footer/footer.component.ts");
/* harmony import */ var _github_github_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./github/github.component */ "./app/github/github.component.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/flex-layout */ "../node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _header_header_component__WEBPACK_IMPORTED_MODULE_6__["HeaderComponent"],
                _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_8__["NotFoundComponent"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_11__["FooterComponent"],
                _github_github_component__WEBPACK_IMPORTED_MODULE_12__["GithubComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_10__["HomeComponent"]
            ],
            imports: [
                _app_routing_module__WEBPACK_IMPORTED_MODULE_9__["AppRoutingModule"],
                _src__WEBPACK_IMPORTED_MODULE_7__["DragScrollModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCommonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatBadgeModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_13__["FlexLayoutModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./app/footer/footer.component.html":
/*!******************************************!*\
  !*** ./app/footer/footer.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p style=\"margin: 0px auto; padding: 0px; color: rgba(255, 255, 255, 0.541176); max-width: 356px;\"><!-- react-text: 103 -->\n  Hand crafted with love by <!-- /react-text -->\n  <a href=\"https://github.com/bfwg\" style=\"color: rgba(255, 255, 255, 0.870588);\">Fan Jin</a>\n  <!-- react-text: 105 --> and our awesome <!-- /react-text -->\n  <a href=\"https://github.com/bfwg/ngx-drag-scroll/graphs/contributors\" style=\"color: rgba(255, 255, 255, 0.870588);\">contributors</a><!-- react-text: 107 -->.<!-- /react-text -->\n</p>\n<a style=\"margin-top: 22px;\" mat-icon-button href=\"https://github.com/bfwg/ngx-drag-scroll\">\n  <img src=\"assets/img/github.png\"/>\n</a>\n"

/***/ }),

/***/ "./app/footer/footer.component.scss":
/*!******************************************!*\
  !*** ./app/footer/footer.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  font-weight: 300;\n  font-size: 15px;\n  display: block;\n  background-color: #212121;\n  height: 236px;\n  padding: 72px 24px;\n  box-sizing: border-box;\n  text-align: center; }\n  :host a {\n    text-decoration: none;\n    cursor: auto;\n    color: #FFFFFF;\n    margin-top: 32px; }\n  :host h3 {\n    margin: 0px;\n    padding: 0px;\n    font-weight: 300;\n    font-size: 22px; }\n"

/***/ }),

/***/ "./app/footer/footer.component.ts":
/*!****************************************!*\
  !*** ./app/footer/footer.component.ts ***!
  \****************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./app/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.scss */ "./app/footer/footer.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./app/github/github.component.html":
/*!******************************************!*\
  !*** ./app/github/github.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h3>Want to help make this project awesome? Check out our repo.</h3>\n<a href=\"https://github.com/bfwg/ngx-drag-scroll\" mat-raised-button matRipple>\n  <span>GITHUB</span>\n</a>\n"

/***/ }),

/***/ "./app/github/github.component.scss":
/*!******************************************!*\
  !*** ./app/github/github.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  height: 236px;\n  padding: 72px 24px;\n  box-sizing: border-box;\n  background-color: #eeeeee;\n  text-align: center; }\n\n:host h3 {\n  margin: 0px;\n  padding: 0px;\n  font-weight: 300;\n  font-size: 22px; }\n\n:host a {\n  color: #000;\n  margin-top: 32px; }\n"

/***/ }),

/***/ "./app/github/github.component.ts":
/*!****************************************!*\
  !*** ./app/github/github.component.ts ***!
  \****************************************/
/*! exports provided: GithubComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GithubComponent", function() { return GithubComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GithubComponent = /** @class */ (function () {
    function GithubComponent() {
    }
    GithubComponent.prototype.ngOnInit = function () {
    };
    GithubComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-github',
            template: __webpack_require__(/*! ./github.component.html */ "./app/github/github.component.html"),
            styles: [__webpack_require__(/*! ./github.component.scss */ "./app/github/github.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], GithubComponent);
    return GithubComponent;
}());



/***/ }),

/***/ "./app/header/header.component.css":
/*!*****************************************!*\
  !*** ./app/header/header.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  position: relative;\n  z-index: 10;\n  color: #fff;\n}\n\n.app-navbar {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap;\n\n  .right {\n    margin-left: auto;\n    float: right;\n  }\n}\n\n.app-navbar span {\n  text-transform: uppercase !important;\n}\n\n.app-angular-logo {\n  margin: 0 4px 3px 0;\n  height: 26px;\n}\n\n.greeting-button {\n  display: inline-block;\n}\n\n@media screen and (max-width: 600px) {\n  .greeting-button {\n    display: none;\n  }\n}\n"

/***/ }),

/***/ "./app/header/header.component.html":
/*!******************************************!*\
  !*** ./app/header/header.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\" class=\"app-navbar\">\n  <button mat-button matRipple routerLink=\"/\">\n    <img alt=\"Angular\" class=\"app-angular-logo\" src=\"assets/img/angular-white-transparent.svg\">\n    <span>ngx-drag-scroll</span>\n  </button>\n</mat-toolbar>\n"

/***/ }),

/***/ "./app/header/header.component.ts":
/*!****************************************!*\
  !*** ./app/header/header.component.ts ***!
  \****************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./app/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./app/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./app/home/home.component.css":
/*!*************************************!*\
  !*** ./app/home/home.component.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".title {\n  margin-top: 60px;\n}\n\n.demo-one {\n  height: 260px;\n  background-color: #FFFFFF;\n}\n\n.demo-one img {\n  height: 260px;\n  width: 260px;\n}\n\n.demo-two {\n  height: 500px;\n}\n\n.demo-border {\n  padding: 10px 10px 10px 10px;\n  box-sizing: border-box;\n  border: 1px solid;\n  border-color: #CFCFCF;\n  margin-bottom: 20px;\n}\n\n.toggle-box {\n  width: 49%;\n  display: inline-block;\n}\n\n.toggle-box mat-slide-toggle {\n  width: 100%;\n  margin-bottom: 15px;\n}\n\n.footer {\n  font-weight: 300;\n  font-size: 15px;\n  background-color: rgb(33, 33, 33);\n}\n\n.footer a {\n  background-color: transparent;\n  text-decoration: none;\n  cursor: auto;\n}\n\n.docs-api-properties-table {\n  border-collapse: collapse;\n  border-radius: 2px;\n  border-spacing: 0;\n  margin: 0 0 32px;\n  width: 100%;\n  box-shadow: 0 2px 2px rgba(0,0,0,.24), 0 0 2px rgba(0,0,0,.12);\n}\n\n.docs-api-properties-table p {\n  margin: 0;\n}\n\n.docs-api-properties-table th {\n  max-width: 100px;\n  padding: 13px 32px;\n  text-align: left;\n}\n\n.docs-api-properties-table td {\n  font-weight: 400;\n  padding: 8px 30px;\n  color: rgba(0,0,0,.54);\n  border: 1px solid rgba(0,0,0,.03);\n}\n\n@media only screen and  (max-width: 960px) {\n  .toggle-box {\n    width: 100%;\n    display: block;\n  }\n\n  .demo-content {\n    margin: 16px;\n  }\n}\n\n.content {\n  margin: 50px 70px;\n}\n\n@media screen and (min-width: 600px) and (max-width: 1279px) {\n  .content {\n    margin: 20px 30px;\n  }\n}\n\n@media screen and (max-width: 599px) {\n  .content {\n    margin: 8px 12px;\n  }\n  .api-table-containter {\n    display: none;\n  }\n}\n\n"

/***/ }),

/***/ "./app/home/home.component.html":
/*!**************************************!*\
  !*** ./app/home/home.component.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content\">\n  <p class=\"title\">DRAG AND SCROLL!</p>\n  <div class=\"demo-border\" [matBadge]=\"index\">\n    <drag-scroll class=\"demo-one\"\n      drag-scroll-y-disabled=\"true\"\n      scrollbar-hidden=\"true\"\n      (indexChanged)=\"onIndexChanged($event)\"\n      (reachesLeftBound)=\"leftBoundStat($event)\"\n      (reachesRightBound)=\"rightBoundStat($event)\"\n      (snapAnimationFinished)=\"onSnapAnimationFinished()\"\n      #nav\n      >\n      <img drag-scroll-item *ngFor=\"let image of imagelist\" [src]=\"'assets/img/' + image\" (click)=\"clickItem(image)\"/>\n    </drag-scroll>\n  </div>\n  <div fxLayout=\"row\" fxLayoutGap=\"5px\" fxLayoutAlign=\"center center\">\n    <button mat-raised-button color=\"primary\" [disabled]=\"leftNavDisabled\" (click)=\"moveLeft()\">left</button>\n    <button mat-raised-button color=\"primary\" [disabled]=\"rightNavDisabled\" (click)=\"moveRight()\">right</button>\n  </div>\n  <p class=\"title\">PLAY WITH IT!</p>\n  <div class=\"toggle-box\">\n    <mat-slide-toggle (change)=\"toggleHideSB()\">Hide scrollbar</mat-slide-toggle>\n    <mat-slide-toggle (change)=\"toggleDisable()\">Disable drag/scroll</mat-slide-toggle>\n  </div>\n  <div class=\"toggle-box\">\n    <mat-slide-toggle (change)=\"toggleXDisable()\">Disable horizontal drag/scroll</mat-slide-toggle>\n    <mat-slide-toggle (change)=\"toggleYDisable()\">Disable vertical drag/scroll</mat-slide-toggle>\n  </div>\n  <div class=\"demo-border\">\n    <drag-scroll class=\"demo-two\"\n        [scrollbar-hidden]=\"hideScrollbar\"\n        [drag-scroll-disabled]=\"disabled\"\n        [drag-scroll-x-disabled]=\"xDisabled\"\n        [drag-scroll-y-disabled]=\"yDisabled\"\n      >\n      <img drag-scroll-item src='assets/img/star-wars-big.jpg' />\n    </drag-scroll>\n  </div>\n  <div class=\"api-table-containter\">\n    <p class=\"title\">API REFERENCE</p>\n    <table class=\"docs-api-properties-table\">\n      <tbody>\n        <tr class=\"docs-api-properties-header-row\">\n          <th class=\"docs-api-properties-th\">Name</th>\n          <th class=\"docs-api-properties-th\">Description</th>\n          <th class=\"docs-api-properties-th\">Default</th>\n        </tr>\n        <tr class=\"docs-api-properties-row\">\n          <td class=\"docs-api-properties-name-cell\">\n            <div class=\"docs-api-input-marker\"> @Input()</div>\n            <p class=\"docs-api-property-name\"> scrollbar-hidden </p>\n            <code class=\"docs-api-property-type\"></code>\n          </td>\n          <td class=\"docs-api-property-description\"> Whether the scroll bar for this element is hidden.</td>\n          <td class=\"docs-api-property-description\">false</td>\n        </tr>\n        <tr class=\"docs-api-properties-row\">\n          <td class=\"docs-api-properties-name-cell\">\n            <div class=\"docs-api-input-marker\"> @Input()</div>\n            <p class=\"docs-api-property-name\"> drag-scroll-disabled </p>\n            <code class=\"docs-api-property-type\"></code>\n          </td>\n          <td class=\"docs-api-property-description\"> Whether horizontally and vertically draging and scrolling events is disabled.</td>\n          <td class=\"docs-api-property-description\">false</td>\n        </tr>\n        <tr class=\"docs-api-properties-row\">\n          <td class=\"docs-api-properties-name-cell\">\n            <div class=\"docs-api-input-marker\"> @Input()</div>\n            <p class=\"docs-api-property-name\"> drag-scroll-x-disabled </p>\n            <code class=\"docs-api-property-type\"></code>\n          </td>\n          <td class=\"docs-api-property-description\"> Whether horizontally dragging and scrolling events is disabled.  </td>\n          <td class=\"docs-api-property-description\">false</td>\n        </tr>\n        <tr class=\"docs-api-properties-row\">\n          <td class=\"docs-api-properties-name-cell\">\n            <div class=\"docs-api-input-marker\"> @Input()</div>\n            <p class=\"docs-api-property-name\"> drag-scroll-y-disabled </p>\n            <code class=\"docs-api-property-type\"></code>\n          </td>\n          <td class=\"docs-api-property-description\"> Whether vertically dragging and scrolling events is disabled. </td>\n          <td class=\"docs-api-property-description\">false</td>\n        </tr>\n        <tr class=\"docs-api-properties-row\">\n          <td class=\"docs-api-properties-name-cell\">\n            <div class=\"docs-api-input-marker\"> @Input()</div>\n            <p class=\"docs-api-property-name\"> drag-disabled </p>\n            <code class=\"docs-api-property-type\"></code>\n          </td>\n          <td class=\"docs-api-property-description\"> Whether draging is disabled.</td>\n          <td class=\"docs-api-property-description\">false</td>\n        </tr>\n        <tr class=\"docs-api-properties-row\">\n          <td class=\"docs-api-properties-name-cell\">\n            <div class=\"docs-api-input-marker\"> @Input()</div>\n            <p class=\"docs-api-property-name\"> snap-disabled </p>\n            <code class=\"docs-api-property-type\"></code>\n          </td>\n          <td class=\"docs-api-property-description\"> Whether snapping is disabled.</td>\n          <td class=\"docs-api-property-description\">false</td>\n        </tr>\n        <tr class=\"docs-api-properties-row\">\n          <td class=\"docs-api-properties-name-cell\">\n            <div class=\"docs-api-input-marker\"> @Input()</div>\n            <p class=\"docs-api-property-name\"> snap-offset </p>\n            <code class=\"docs-api-property-type\"></code>\n          </td>\n          <td class=\"docs-api-property-description\"> Pixels of previous element to show on snap or moving left and right. </td>\n          <td class=\"docs-api-property-description\">0</td>\n        </tr>\n        <tr class=\"docs-api-properties-row\">\n          <td class=\"docs-api-properties-name-cell\">\n            <div class=\"docs-api-input-marker\"> @Output()</div>\n            <p class=\"docs-api-property-name\"> reachesLeftBound </p>\n            <code class=\"docs-api-property-type\"></code>\n          </td>\n          <td class=\"docs-api-property-description\"> Whether reaching the left carousel bound. </td>\n          <td class=\"docs-api-property-description\">n/a</td>\n        </tr>\n        <tr class=\"docs-api-properties-row\">\n          <td class=\"docs-api-properties-name-cell\">\n            <div class=\"docs-api-input-marker\"> @Output()</div>\n            <p class=\"docs-api-property-name\"> reachesRightBound </p>\n            <code class=\"docs-api-property-type\"></code>\n          </td>\n          <td class=\"docs-api-property-description\"> Whether reaching the right carousel bound. </td>\n          <td class=\"docs-api-property-description\">n/a</td>\n        </tr>\n        <tr class=\"docs-api-properties-row\">\n          <td class=\"docs-api-properties-name-cell\">\n            <div class=\"docs-api-input-marker\"> @Output()</div>\n            <p class=\"docs-api-property-name\"> indexChanged </p>\n            <code class=\"docs-api-property-type\"></code>\n          </td>\n          <td class=\"docs-api-property-description\"> Executes when the current index of the carousel changes. </td>\n          <td class=\"docs-api-property-description\">n/a</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n<app-github></app-github>\n"

/***/ }),

/***/ "./app/home/home.component.ts":
/*!************************************!*\
  !*** ./app/home/home.component.ts ***!
  \************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _src_ngx_drag_scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../src/ngx-drag-scroll */ "../src/ngx-drag-scroll.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomeComponent = /** @class */ (function () {
    function HomeComponent(matIconRegistry, sanitizer, element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.title = 'app works!';
        this.imagelist = [
            'luke.png',
            'chubaka.png',
            'boba.png',
            'c3po.png',
            'leia.png',
            'obi.png',
            'r2d2.png',
            'storm.png',
            'varder.png',
            'yoda.png',
            'yolo.png'
        ];
        this.leftNavDisabled = false;
        this.rightNavDisabled = false;
        this.index = 0;
        matIconRegistry
            .addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('/assets/img/github.svg'))
            .registerFontClassAlias('fontawesome', 'fa');
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.clickItem = function (item) {
        console.log('item clicked');
    };
    HomeComponent.prototype.remove = function () {
        this.imagelist.pop();
    };
    HomeComponent.prototype.toggleHideSB = function () {
        this.hideScrollbar = !this.hideScrollbar;
    };
    HomeComponent.prototype.toggleDisable = function () {
        this.disabled = !this.disabled;
    };
    HomeComponent.prototype.toggleXDisable = function () {
        this.xDisabled = !this.xDisabled;
    };
    HomeComponent.prototype.toggleYDisable = function () {
        this.yDisabled = !this.yDisabled;
    };
    HomeComponent.prototype.moveLeft = function () {
        this.ds.moveLeft();
    };
    HomeComponent.prototype.moveRight = function () {
        this.ds.moveRight();
    };
    HomeComponent.prototype.leftBoundStat = function (reachesLeftBound) {
        this.leftNavDisabled = reachesLeftBound;
    };
    HomeComponent.prototype.rightBoundStat = function (reachesRightBound) {
        this.rightNavDisabled = reachesRightBound;
    };
    HomeComponent.prototype.onSnapAnimationFinished = function () {
        console.log('snap animation finished');
    };
    HomeComponent.prototype.onIndexChanged = function (idx) {
        this.index = idx;
        console.log('current index: ' + idx);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('nav', { read: _src_ngx_drag_scroll__WEBPACK_IMPORTED_MODULE_3__["DragScrollComponent"] }),
        __metadata("design:type", _src_ngx_drag_scroll__WEBPACK_IMPORTED_MODULE_3__["DragScrollComponent"])
    ], HomeComponent.prototype, "ds", void 0);
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./app/home/home.component.css")],
            viewProviders: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatIconRegistry"]]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatIconRegistry"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./app/not-found/not-found.component.css":
/*!***********************************************!*\
  !*** ./app/not-found/not-found.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./app/not-found/not-found.component.html":
/*!************************************************!*\
  !*** ./app/not-found/not-found.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  not-found works!\n</p>\n"

/***/ }),

/***/ "./app/not-found/not-found.component.ts":
/*!**********************************************!*\
  !*** ./app/not-found/not-found.component.ts ***!
  \**********************************************/
/*! exports provided: NotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFoundComponent", function() { return NotFoundComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotFoundComponent = /** @class */ (function () {
    function NotFoundComponent() {
    }
    NotFoundComponent.prototype.ngOnInit = function () {
    };
    NotFoundComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-not-found',
            template: __webpack_require__(/*! ./not-found.component.html */ "./app/not-found/not-found.component.html"),
            styles: [__webpack_require__(/*! ./not-found.component.css */ "./app/not-found/not-found.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], NotFoundComponent);
    return NotFoundComponent;
}());



/***/ }),

/***/ "./environments/environment.ts":
/*!*************************************!*\
  !*** ./environments/environment.ts ***!
  \*************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environments/environment */ "./environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./app/app.module.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hammerjs */ "../node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_4__);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_0__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"]);


/***/ }),

/***/ 0:
/*!***********************!*\
  !*** multi ./main.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/fan.jin/bfwg/ngx-drag-scroll/demo/main.ts */"./main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map