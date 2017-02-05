import {
  Directive,
  ElementRef,
  Renderer,
  OnDestroy,
  Input,
  OnInit,
  OnChanges,
  SimpleChange
} from '@angular/core';


@Directive({
  selector: '[dragon]',
  host: {
    '(mousedown)': 'onDragStart($event)'
  }
})
export class Dragon implements OnDestroy, OnInit, OnChanges {

  /** Set this to 'disabled' will disable drag/scroll horizontally and vertically */
  @Input() dragon: string = 'active';

  /** Set this to 'disabled' will disable drag/scroll horizontally */
  @Input() dragX: string = 'active';

  /** Set this to 'disabled' will disable drag/scroll vertically */
  @Input() dragY: string = 'active';

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
    const changedInputs = Object.keys(changes);
    // Only update the css attributes  if the inputs changed, to avoid unnecessary DOM operations.
    if (changedInputs.indexOf('disableX') != -1 ||
        changedInputs.indexOf('disableY') != -1 ||
        changedInputs.indexOf('dragon') != -1) {
      if (this.dragX === 'disabled' || this.dragon === 'disabled') {
        this.el.nativeElement.style['overflow-x'] = 'hidden';
      }
      if (this.dragY === 'disabled' || this.dragon === 'disabled') {
        this.el.nativeElement.style['overflow-y'] = 'hidden';
      }
    }
  }


  public ngOnInit(): void {
    this.rect = this.el.nativeElement.getBoundingClientRect();
    this.renderer.setElementAttribute(this.el.nativeElement, 'dragon', 'true');
  }

  onDragStart(e: MouseEvent) {
    e.preventDefault();
    this.isPressed = true;
    this.downX = e.clientX;
    this.downY = e.clientY;
    return false;
  }

  ngOnDestroy() {
    this.renderer.setElementAttribute(this.el.nativeElement, 'dragon', 'false');
    document.removeEventListener('mousemove', this.onDragHandler, false);
    document.removeEventListener('mouseup', this.onDragEndHandler, false);
  }

  onDrag(e: MouseEvent) {
    e.preventDefault();

    if (this.isPressed) {
      // Drag X
      if (this.dragX !== 'disabled' && this.dragon !== 'disabled') {
        let rectRight = this.rect.left + this.el.nativeElement.offsetWidth;
        let offsetX = e.pageX > rectRight ? e.pageX - rectRight :
          e.pageX < this.rect.left ? e.pageX - this.rect.left : 0;
        this.el.nativeElement.scrollLeft = this.el.nativeElement.scrollLeft - e.clientX + this.downX - offsetX;
        this.downX = e.clientX + offsetX;
      }

      // Drag Y
      if (this.dragY !== 'disabled' && this.dragon !== 'disabled') {
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
  exports: [Dragon],
  declarations: [Dragon]
})
export class DragonModule { }
