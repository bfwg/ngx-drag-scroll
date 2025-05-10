import {
  Directive,
  ElementRef,
  HostBinding,
  inject,
  input
} from '@angular/core';

@Directive({
  selector: '[drag-scroll-item]'
})
export class DragScrollItemDirective {
  @HostBinding('style.display')
  display = 'inline-block';

  dragDisabled = input<boolean>(false, { alias: 'drag-disabled' });

  elementRef = inject(ElementRef);
}
