"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DragScrollItemDirective = (function () {
    function DragScrollItemDirective(elementRef) {
        this._elementRef = elementRef;
    }
    DragScrollItemDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[drag-scroll-item]'
                },] },
    ];
    DragScrollItemDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    return DragScrollItemDirective;
}());
exports.DragScrollItemDirective = DragScrollItemDirective;
function DragScrollItemDirective_tsickle_Closure_declarations() {
    DragScrollItemDirective.decorators;
    DragScrollItemDirective.ctorParameters;
    DragScrollItemDirective.prototype._elementRef;
}
//# sourceMappingURL=ngx-drag-scroll-item.js.map