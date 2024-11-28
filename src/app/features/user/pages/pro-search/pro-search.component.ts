import { Component } from '@angular/core';
import { ProInfoCardComponent } from "../../../../shared/components/pro-info-card/pro-info-card.component";
import { UserProfileHeaderComponent } from "../../../../shared/components/user-profile-header/user-profile-header.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pro-search',
  standalone: true,
  imports: [ProInfoCardComponent, UserProfileHeaderComponent, NavbarComponent, MatIconModule],
  templateUrl: './pro-search.component.html',
  styleUrl: './pro-search.component.sass'
})
export class ProSearchComponent {

}
