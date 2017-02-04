import {
  Directive,
  ElementRef,
  Renderer,
  OnDestroy,
  Input,
  OnInit,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


@Directive({
  selector: '[dragon]',
  host: {
    '(mousedown)': 'onDragStart($event)'
  }
})
export class Dragon implements OnDestroy, OnInit {
  @Input() dragX: boolean = true;
  @Input() dragY: boolean = true;
  down: boolean = false;
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

  public ngOnInit(): void {
    this.rect = this.el.nativeElement.getBoundingClientRect();
    console.log(this.rect);
    this.renderer.setElementAttribute(this.el.nativeElement, 'dragon', 'true');
  }

  onDragStart(e: MouseEvent) {
    e.preventDefault();
    this.down = true;
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

    if (this.down) {
      // Drag X
      if (this.dragX === true) {
        let rectRight = this.rect.left + this.el.nativeElement.offsetWidth;
        let offsetX = e.pageX > rectRight ? e.pageX - rectRight :
          e.pageX < this.rect.left ? e.pageX - this.rect.left : 0;
        this.el.nativeElement.scrollLeft = this.el.nativeElement.scrollLeft - e.clientX + this.downX - offsetX;
        this.downX = e.clientX + offsetX;
      }

      // Drag Y
      if (this.dragY === true) {
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
    this.down = false;
    return false;
  }

}



const DRAGON_DIRECTIVES: any[] = [Dragon];

@NgModule({
  imports: [BrowserModule],
  exports: [Dragon],
  declarations: [Dragon]
})
export class DragonModule { }
