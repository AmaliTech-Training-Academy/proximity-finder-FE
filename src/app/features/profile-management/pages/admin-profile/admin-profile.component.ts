import { Component } from '@angular/core';
import { AdminProfileInfoComponent } from "../../components/admin-profile-info/admin-profile-info.component";
import {MatTabsModule} from '@angular/material/tabs';
import { ChangePasswordComponent } from "../../components/change-password/change-password.component";

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [AdminProfileInfoComponent, MatTabsModule, ChangePasswordComponent],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.sass'
})
export class AdminProfileComponent {

}
