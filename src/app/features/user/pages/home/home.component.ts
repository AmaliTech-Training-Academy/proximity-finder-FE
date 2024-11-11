import { Component } from '@angular/core';
import { UserProfileHeaderComponent } from "../../../../shared/components/user-profile-header/user-profile-header.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserProfileHeaderComponent, NavbarComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

}
