import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminProfileInfoComponent } from "./features/profile-management/components/admin-profile-info/admin-profile-info.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'proximity-finder';
}
