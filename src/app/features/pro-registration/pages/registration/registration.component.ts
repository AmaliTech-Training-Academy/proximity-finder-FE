import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoComponent } from "../../components/info/info.component";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterOutlet, InfoComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.sass'
})
export class RegistrationComponent {

}
