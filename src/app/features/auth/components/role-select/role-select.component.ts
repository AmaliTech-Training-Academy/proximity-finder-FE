import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-role-select',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './role-select.component.html',
  styleUrl: './role-select.component.sass'
})
export class RoleSelectComponent {

  selectedRole: 'client' | 'provider' | null = null;

    selectRole(role: 'client' | 'provider') {
        this.selectedRole = role;
    }

}
