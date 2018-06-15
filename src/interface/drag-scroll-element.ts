export interface DragScrollElement extends HTMLElement {
  parentNode: HTMLElement;
  cloneNode: (deep: boolean) => HTMLDivElement;
}
