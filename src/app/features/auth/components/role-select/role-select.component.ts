import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type Role = 'client' | 'provider' | null;

@Component({
  selector: 'app-role-select',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './role-select.component.html',
  styleUrl: './role-select.component.sass'
})
export class RoleSelectComponent {

  selectedRole: Role= null;

    
  selectRole(role: Exclude<Role, null>) {
    this.selectedRole = role;
  }
}


