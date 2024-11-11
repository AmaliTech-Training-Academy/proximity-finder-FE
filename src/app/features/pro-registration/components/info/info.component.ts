import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './info.component.html',
  styleUrl: './info.component.sass'
})
export class InfoComponent {

}
