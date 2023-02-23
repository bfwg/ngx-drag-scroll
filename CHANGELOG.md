#### 15.0.0
feat: Support for angular 15 (#313)
#### 14.0.0-beta.2
feat(*): Support angular 14
#### 13.0.2
fix: patch to direction:rtl flipped the content. fixing logic instead
#### 13.0.1
fix: when direction:rtl style applied, move functions failed to work
#### 12.0.0-beta.1
feat(*): Support angular 12
#### 11.0.0-beta.1
feat(*): Support angular 11 (#278)
#### 8.0.0-beta.3
fix: limit drag restriction of other elements to the contents of drag-scroll (#262)
#### 8.0.0-beta.2
fix: prevent error in case of no content or drag-scroll-item is used (#245)
ci: update travis config to latest xenial dist and use xvfb as service (#246)
#### 8.0.0-beta.1
feat: update packages (#243)
#### 7.4.3
fix: handle first child undifined issue (#241)
#### 7.4.2
fix: prevent click on drag end (close #154) (#230)
#### 7.4.1
fix: forward snap should not happen when the scroll left is 0
#### 7.4.0
feat: add dragStart and dragEnd events (close #222) (#237)
fix: prevent scroll stuck if browser lost focus on Windows (#236)
fix: error in the demo console log (#239)
fix: copy artifacts on package build (#238)
#### 7.3.7
fix: resolved a dragging bug in iOS devices
#### 7.3.6
fix: add README.md to npm
#### 7.3.5
feat: allow to work wit angular 8 (#228)
#### 7.3.4
fix: help npm to find README.md
#### 7.3.3
fix: prevent scroll stuck if browser lost focus (#231)
#### 7.3.2
fix: issue #226 making drag-scroll work properly with touch-input
#### 7.3.1
- feat: build library as universal angular package (#224)
#### 7.2.9
- fix: moveTo doesn't include the margin of the last item when the scroll bars are hidden.
#### 7.1.6
- fix: cannot compile with aot (#220)
#### 7.1.5
- fix the issue where method moveTo can cause currIndex to enter undesired state (#217)
#### 7.1.4
- fix last image gets cut when hide X scroll
#### 7.1.3
- remove debug console log
#### 7.1.2
- allow to scroll horizontally using mouse wheel
#### 7.1.1
- refresh wrapper's dimensions after window resize when scrollbar is hidden
#### 7.1.0
- add index bound (#202)
- drag-scroll-disabled alternative for children (#144)
k
#### 7.0.1
- renderer listen document dragstart (#200)

#### 7.0.0
- support Angular 7.1.4 (#198)
- resolve ngDevMode issue (#199)

#### 2.1.1
- Angular 7 support (#182)

#### 2.0.4
- feat: bind global handlers (mouseup, mousemove) on mousedown (#193)

#### 2.0.3
- feat: add output for ds initialization (#192)
    Closes ##185
- fix: scrollReachesRightEnd should be recalculated (#191)
    Closes #184
- refactor: lagging on mobile device (#190)
    * refactor: remove the lag when dragging on mobile devices
- fix: fixed a bug window is not defined (#189)
- fix: document is not defined, resolve providers on node for lazy loading (#188)

#### 2.0.2
- Resolve method indexChanged / moveRight doesn't work (#171)

#### 2.0.1
- Resolve right click and left click not working (#174)

#### 2.0.0-bate.7
- Resolve method index changed and move right does not work (#173).

#### 2.0.0-bate.6
- Added EventEmitter for the indexChanged event (#168).

#### 2.0.0-bate.5
- Change build target to es5 (#165).

#### 2.0.0-bate.4
- Notify consumers when snap animation has finished (#162).

#### 2.0.0-bate.3
- Fix build aot ngModule not found issue.

#### 2.0.0-bate.2
- Window on resizing affect scrollbar hide/show.
- Scroll content wrapper inherits the display style from the component element.

#### 2.0.0-bate.1
- Refactor host directive to a componet.
- Add drag scroll item directive to mark children elements.
- Refactor code to Angular Style.

#### 1.8.2
Issue #54 - fix: prevent click propagation immediately after drag and drop

#### 1.8.1

Issue #140 - fix: auto reset scroll position on iOS and Android
#### 1.8.0

Issue #138 - feat: angular6 support
#### 1.7.9

Issue #137 - feat: snap-offset to optionally show portion of previous elements

#### 1.7.8

Issue #133 - Do not reset scroll location on disabling/enabling the drag.

#### 1.7.7

Issue #129 - fix onMouseUp stops all propagation when selecting text
Issue #125 - fix Drag-scroll not working on Firefox Quantum
Add Github templates

#### 1.7.6

Issue #124 - fix npm install module not found issue

#### 1.7.5

Issue #122 - rightNavDisabled false after reaching end of carousel

#### 1.7.3

Issue #109 - fix Positioning after moveLeft()/moveRight()
Issue #112 - Commitlint 6 and commitlint/travis and commitlint/angular added.

#### 1.7.2

Issue #106 - fix mouseMoveListener affecting entire document

#### 1.7.1

Issue #104 - fix tslint config and refactor accordingly.

### 1.7.0

Issue #103 - style: The name of the class DragScroll should end with the suffix Directive

 1. ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `Important: The directive attribute changes from drag-scroll to dragScroll`
 1. ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `Important: DragScroll  renamed to DragScrollDirective`

#### 1.6.3

Issue #99 - fix stepped scrolling issue


#### 1.6.2

Issue #101 - tslint updated to the defaults as of angular cli 1.6.2



#### 1.6.1

Issue #95 #96 - Introduce commitlint

Issue #97  - Upgrade angular cli to 1.6.1 / flex-layout to 2.0.0-beta.12 and downgrade typescript to 2.4.2

### 1.6.0

Issue #94 - Upgrade to Material 5 / Angular 5.1.0

#### 1.5.5

Issue #91 - Regenerate package-lock.json (as part of changes in Issue #89)

Issue #92 - Update README and remove misleading Angular2+ keyword.

#### 1.5.4

Issue #89 - Remove unused dependency.

#### 1.5.3

Change compile target to es5 which will make the library work on IE 11.

#### 1.5.2

Issue #55  - Use strict mode in tsconfig.

#### 1.5.1

Issue #40 - Rename library name to ngx-drag-scroll.

Issue #79 - Fix build issue.

### 1.5.0

Issue #75  - Fix npm distribution issue. See #69 and #72 for more details.

#### 1.4.5

Issue #71 - angular5 dependency

### 1.4.0

## 1.0.0
