import { Component } from '@angular/core';
import { HeaderComponent } from "../../../service-provider/components/header/header.component";
import { SidebarComponent } from "../../../service-provider/components/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { AdminProfileComponent } from "../../../profile-management/pages/admin-profile/admin-profile.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet, AdminProfileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

}
