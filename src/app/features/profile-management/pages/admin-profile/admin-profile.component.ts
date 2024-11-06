import { Component } from '@angular/core';
import { AdminProfileInfoComponent } from "../../components/admin-profile-info/admin-profile-info.component";

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [AdminProfileInfoComponent],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.sass'
})
export class AdminProfileComponent {

}
