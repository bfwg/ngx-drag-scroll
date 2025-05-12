import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [MatToolbar, MatButton, MatRipple, RouterLink]
})
export class HeaderComponent {
  constructor() {}
}
