import { Component } from '@angular/core';
import { HeaderComponent } from "../../../service-provider/components/header/header.component";
import { RouterOutlet } from '@angular/router';
import { AdminProfileComponent } from "../../../profile-management/pages/admin-profile/admin-profile.component";
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet, AdminProfileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

}
