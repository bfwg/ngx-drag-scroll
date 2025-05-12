import { Component, viewChild } from '@angular/core';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { DomSanitizer } from '@angular/platform-browser';
import { GithubComponent } from '../github/github.component';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  viewProviders: [MatIconRegistry],
  imports: [
    MatBadge,
    NgFor,
    DragScrollComponent,
    DragScrollItemDirective,
    MatButton,
    MatSlideToggle,
    GithubComponent
  ]
})
export class HomeComponent {
  title = 'app works!';
  hideScrollbar;
  disabled;
  xDisabled;
  yDisabled;
  imagelist = [
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
  leftNavDisabled = false;
  rightNavDisabled = false;
  index = 0;

  readonly ds = viewChild('nav', { read: DragScrollComponent });

  constructor(matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    matIconRegistry
      .addSvgIcon(
        'github',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/img/github.svg')
      )
      .registerFontClassAlias('fontawesome', 'fa');
  }

  clickItem(item) {
    console.log('item clicked: ', item);
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
    this.ds().moveLeft();
  }

  moveRight() {
    this.ds().moveRight();
  }

  moveTo(idx: number) {
    this.ds().moveTo(idx);
  }

  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }

  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  }

  onSnapAnimationFinished() {
    console.log('snap animation finished');
  }

  onIndexChanged(idx) {
    this.index = idx;
    console.log('current index: ' + idx);
  }

  onDragScrollInitialized() {
    console.log('first demo drag scroll has been initialized.');
  }

  onDragStart() {
    console.log('drag start');
  }

  onDragEnd() {
    console.log('drag end');
  }
}
