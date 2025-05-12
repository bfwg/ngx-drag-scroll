import { Component } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss'],
  imports: [MatAnchor, MatRipple]
})
export class GithubComponent {
  constructor() {}
}
