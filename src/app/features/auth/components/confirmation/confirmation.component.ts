import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.sass'
})
export class ConfirmationComponent {
  constructor(){}

}
