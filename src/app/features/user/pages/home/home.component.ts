import { Component } from '@angular/core';
import { UserProfileHeaderComponent } from "../../../../shared/components/user-profile-header/user-profile-header.component";
import { HeroComponent } from "../../components/hero/hero.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserProfileHeaderComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

}
