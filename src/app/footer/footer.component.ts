import { Component } from '@angular/core';
import { MatIconAnchor } from '@angular/material/button';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [MatIconAnchor]
})
export class FooterComponent {
  constructor() {}
}
