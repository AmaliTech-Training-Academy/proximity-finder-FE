import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SvgService } from '../../../../shared/services/svg.service';
import { ProfileService } from '../../../profile-management/services/profile.service';
import { User } from '../../../profile-management/models/user';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass'
})
export class SidebarComponent {
  loggedInUser: User | null = null
  constructor(private svgService: SvgService, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.loggedInUser$.subscribe((user) => {
      this.loggedInUser = user
    })
  }
}
