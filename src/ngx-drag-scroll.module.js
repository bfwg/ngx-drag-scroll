"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ngx_drag_scroll_1 = require("./ngx-drag-scroll");
var ngx_drag_scroll_item_1 = require("./ngx-drag-scroll-item");
var DragScrollModule = (function () {
    function DragScrollModule() {
    }
    DragScrollModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [
                        ngx_drag_scroll_1.DragScrollComponent,
                        ngx_drag_scroll_item_1.DragScrollItemDirective
                    ],
                    declarations: [
                        ngx_drag_scroll_1.DragScrollComponent,
                        ngx_drag_scroll_item_1.DragScrollItemDirective
                    ]
                },] },
    ];
    return DragScrollModule;
}());
exports.DragScrollModule = DragScrollModule;
function DragScrollModule_tsickle_Closure_declarations() {
    DragScrollModule.decorators;
    DragScrollModule.ctorParameters;
}
//# sourceMappingURL=ngx-drag-scroll.module.js.map