import { Component, OnInit, ElementRef, Renderer, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { DragScroll } from '../../../src/angular2-drag-scroll';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  viewProviders: [MdIconRegistry]
})
export class HomeComponent implements OnInit {
  title = 'app works!';
  hideScrollbar;
  disabled;
  xDisabled;
  yDisabled;
  imagelist = [
    'luke.png',
    'chubaka.png',
    'boba.png',
    'c3po.png' ,
    'leia.png',
    'obi.png',
    'r2d2.png',
    'storm.png',
    'varder.png',
    'yoda.png',
    'yolo.png'
  ];
  leftNavDisabled = false;
  rightNavDisabled = false;

  dragScrollDom: any;
  dragScrollRef: ElementRef;
  dragScroll: DragScroll;

  @ViewChild('nav', {read: DragScroll}) ds:DragScroll;

  constructor(
    mdIconRegistry: MdIconRegistry,
    sanitizer: DomSanitizer,
    private element: ElementRef,
    private renderer: Renderer
  ) {
    mdIconRegistry
        .addSvgIcon('github',
            sanitizer.bypassSecurityTrustResourceUrl('/assets/img/github.svg'))
        .registerFontClassAlias('fontawesome', 'fa');
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.dragScrollDom = this.element.nativeElement.querySelector('.nav-tabs');
    // this.dragScrollRef = new ElementRef(this.dragScrollDom );

    // this.dragScroll = new DragScroll(this.dragScrollRef, this.renderer);
    // this.dragScroll.attach({
      // disabled: false,
      // scrollbarHidden: true,
      // yDisabled: true,
      // xDisabled: false,
      // nav: false
    // });
  }

  clickItem(item) {
    console.log('itmen clicked');
  }

  remove() {
    this.imagelist.pop();
  }

  toggleHideSB() {
    this.hideScrollbar = !this.hideScrollbar;
  }

  toggleDisable() {
    this.disabled = !this.disabled;
  }
  toggleXDisable() {
    this.xDisabled = !this.xDisabled;
  }
  toggleYDisable() {
    this.yDisabled = !this.yDisabled;
  }

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }

  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  }

}
